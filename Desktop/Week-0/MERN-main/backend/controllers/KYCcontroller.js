// /backend/controllers/kycController.js
const axios = require('axios');
const KYC = require('../models/KYCmodel');

const headers = {
    appId: 'yvdxyy',
    appKey: '9epukpvlpl1asl3bym4j',
    transactionId: 'driverkyc'
};

// Validate Driver's License
const validateDL = async (req, res) => {
    const { driverLicense } = req.body;
    const formData = new FormData();
    formData.append('image', req.file.path); // Assuming file is uploaded

    try {
        const response = await axios.post('https://ind.idv.hyperverge.co/v1/readId', formData, { headers });

        const details = response.data.result?.details?.[0]?.fieldsExtracted;

        if (details) {
            const dateOfExpiry = details.dateOfExpiry?.value;

            // Check if dateOfExpiry exists and is valid
            if (dateOfExpiry && new Date(dateOfExpiry.split('-').reverse().join('-')) > new Date()) {
                const kyc = new KYC({ driverLicense: req.file.path, step: 2, status: 'Driver\'s License validated successfully' });
                await kyc.save();
                return res.status(200).json({ status: 'success', message: 'Driver\'s License validated successfully!' });
            } else {
                return res.status(400).json({ status: 'fail', message: 'Driver\'s License is invalid or expired.' });
            }
        } else {
            return res.status(400).json({ status: 'fail', message: 'Unable to fetch Driver\'s License details.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'fail', message: 'Error validating Driver\'s License.' });
    }
};

// Validate ID Card
const validateID = async (req, res) => {
    const { selectedDocument } = req.body;
    const formData = new FormData();
    formData.append('image', req.file.path); // Assuming file is uploaded
    formData.append('documentId', selectedDocument);
    formData.append('countryId', 'ind');
    formData.append('expectedDocumentSide', 'front');

    try {
        const response = await axios.post('https://ind.idv.hyperverge.co/v1/readId', formData, { headers });

        const details = response.data.result?.details?.[0]?.fieldsExtracted;

        if (details) {
            const { fullName, dateOfBirth, idNumber } = details;

            if (fullName && dateOfBirth && idNumber) {
                const kyc = await KYC.findOneAndUpdate({ step: 1 }, { selectedDocument, idCard: req.file.path, step: 3 }, { new: true });
                return res.status(200).json({ status: 'success', message: `${selectedDocument} validated successfully!` });
            } else {
                return res.status(400).json({ status: 'fail', message: 'Missing important details in the ID card.' });
            }
        } else {
            return res.status(400).json({ status: 'fail', message: 'Unable to fetch ID card details.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'fail', message: 'Error validating ID Card.' });
    }
};

// Validate Selfie
const validateSelfie = async (req, res) => {
    const formData = new FormData();
    formData.append('image', req.file.path);

    try {
        const response = await axios.post('https://ind.idv.hyperverge.co/v1/checkLiveness', formData, { headers });

        const liveFace = response.data.result?.details?.liveFace;

        if (liveFace && liveFace.value === 'yes') {
            const kyc = await KYC.findOneAndUpdate({ step: 2 }, { selfie: req.file.path, step: 4 }, { new: true });
            return res.status(200).json({ status: 'success', message: 'Selfie validated successfully!' });
        } else {
            return res.status(400).json({ status: 'fail', message: 'Selfie validation failed. The face is not detected as live.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'fail', message: 'Error validating selfie.' });
    }
};

// Match Face
const matchFace = async (req, res) => {
    const formData = new FormData();
    formData.append('selfie', req.files.selfie[0].path);
    formData.append('id', req.files.id[0].path);

    try {
        const response = await axios.post('https://ind.idv.hyperverge.co/v1/matchFace', formData, { headers });

        const match = response.data.result?.details?.match;

        if (match && match.value === 'yes') {
            const kyc = await KYC.findOneAndUpdate({ step: 4 }, { status: 'KYC Process Successful! Face match successful.' });
            return res.status(200).json({ status: 'success', message: 'KYC Process Successful! Face match successful.' });
        } else {
            return res.status(400).json({ status: 'fail', message: 'Face match failed.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'fail', message: 'Error in face match process.' });
    }
};

module.exports = {
    validateDL,
    validateID,
    validateSelfie,
    matchFace
};
