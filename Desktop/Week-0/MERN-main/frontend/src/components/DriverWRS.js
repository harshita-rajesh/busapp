import React, { useState } from 'react';
import axios from 'axios';

const DriverKYC = () => {
  const [driverLicense, setDriverLicense] = useState(null);
  const [idCard, setIdCard] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [status, setStatus] = useState('');
  const [step, setStep] = useState(1);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [driverName, setDriverName] = useState('');
  const [phoneNo, setPhoneNo] = useState('+91');
  const [age, setAge] = useState('');

  const headers = {
      appId: 'yvdxyy',
      appKey: '9epukpvlpl1asl3bym4j',
      transactionId: 'driverkyc'
  };

  const handleFileUpload = (e, setFile) => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      setFile(file);
    } else {
      alert('Invalid file type. Please upload jpg, png, or pdf.');
    }
  };

  const validateDL = async () => {
    setStatus('Validating Driver\'s License...');
    const formData = new FormData();
    formData.append('image', driverLicense);
    formData.append('countryId', 'ind'); // Replace with the driver's country ID
    formData.append('documentId', 'dl'); // 'DL' for Driver's License
    formData.append('expectedDocumentSide', 'front');
  
    try {
        const response = await axios.post('https://ind.idv.hyperverge.co/v1/readId', formData, { headers });
        console.log('API Response:', response.data);  // Log the entire response to inspect its structure
        
        // Access the correct structure based on the response
        const action = response.data.result?.summary?.action;
        const details = response.data.result?.details[0]?.fieldsExtracted;
        
        if (action === 'pass' && details) {
            setStep(2);
            setStatus('Driver\'s License validated successfully!');
        } else {
            alert('Driver\'s License is invalid or expired.');
            setStatus('Validation failed.');
        }
    } catch (error) {
        console.error('Error validating Driver\'s License:', error);
        alert('Error validating Driver\'s License.');
        setStatus('Validation failed.');
    }
};

const validateID = async () => {
    setStatus('Validating ID...');
    const formData = new FormData();
    formData.append('image', idCard);
    formData.append('countryId', 'ind'); // Replace with the driver's country ID

    // Map the selected document to its corresponding document ID
    const documentIdMap = {
        Aadhaar: 'id',
        Passport: 'passport',
        'PAN Card': 'pan',
    };

    const selectedDocumentId = documentIdMap[selectedDocument];  // selectedDocument is the state holding the selected document type
    
    if (!selectedDocumentId) {
        alert('Please select a valid document type (Aadhaar, Passport, PAN).');
        return;
    }

    formData.append('documentId', selectedDocumentId);
    formData.append('expectedDocumentSide', 'front');
  
    try {
        const response = await axios.post('https://ind.idv.hyperverge.co/v1/readId', formData, { headers });
        console.log('API Response:', response.data);  // Log the entire response to inspect its structure
        
        // Access the action from the response
        const action = response.data.result?.summary?.action;

        if (action === 'pass') {
            setStep(3); // Proceed to the selfie verification step
            setStatus(`${selectedDocument} validated successfully! Proceeding to Selfie validation...`);
        } else {
            alert(`${selectedDocument} validation failed.`);
            setStatus('Validation failed.');
        }
    } catch (error) {
        console.error('Error validating ID:', error);
        alert('Error validating ID.');
        setStatus('Validation failed.');
    }
};

const validateSelfie = async () => {
    setStatus('Validating Selfie...');
    const formData = new FormData();
    formData.append('image', selfie);
  
    try {
        const response = await axios.post('https://ind.idv.hyperverge.co/v1/checkLiveness', formData, { headers });
        console.log('API Response:', response.data);  // Log the entire response to inspect its structure
        
        // Access the action from the response summary
        const action = response.data.result?.summary?.action;

        // Check if the action is 'pass'
        if (action === 'pass') {
            setStep(5);  // Proceed to the successful KYC completion step
            setStatus('Selfie validated successfully! KYC process complete.');
            alert('KYC Process Completed Successfully!');
        } else {
            alert('Selfie validation failed.');
            setStatus('Validation failed.');
        }
    } catch (error) {
        console.error('Error validating Selfie:', error);
        alert('Error validating Selfie.');
        setStatus('Validation failed.');
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) await validateDL();
    else if (step === 2) await validateID();
    else if (step === 3) await validateSelfie();
  };

  return (
    <div className="kyc-container">
      <h1>Driver KYC Process</h1>
      <form onSubmit={handleSubmit} className="kyc-form">
        {step === 1 && (
          <div className="kyc-step">
            <label>Driver's Name:</label>
            <input type="text" value={driverName} onChange={(e) => setDriverName(e.target.value)} placeholder="Enter Driver's Name" />
            <br />
            <label>Phone Number:</label>
            <input type="text" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} placeholder="Enter Phone Number" />
            <br />
            <label>Age:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter Age" />
            <br />
            <label>Upload Driver's License:</label>
            <input type="file" onChange={(e) => handleFileUpload(e, setDriverLicense)} />
            <br />
            <button type="submit">Validate Driver's License</button>
          </div>
        )}
        {step === 2 && (
          <div className="kyc-step">
            <label>Choose ID Document:</label>
            <select value={selectedDocument} onChange={(e) => setSelectedDocument(e.target.value)}>
              <option value="">Select Document Type</option>
              <option value="Aadhaar">Aadhaar</option>
              <option value="Passport">Passport</option>
              <option value="PAN Card">PAN Card</option>
            </select>
            <br />
            <label>Upload ID Card:</label>
            <input type="file" onChange={(e) => handleFileUpload(e, setIdCard)} />
            <br />
            <button type="submit">Validate ID Card</button>
          </div>
        )}
        {step === 3 && (
          <div className="kyc-step">
            <label>Upload Selfie:</label>
            <input type="file" onChange={(e) => handleFileUpload(e, setSelfie)} />
            <br />
            <button type="submit">Validate Selfie</button>
          </div>
        )}
        {step === 4 && (
          <div className="kyc-step">
            <p>Selfie and ID Card successfully uploaded.</p>
            <button type="submit">Match Face</button>
          </div>
        )}
      </form>
      <p className="status-message">Status: {status}</p>
    </div>
  );
};

export default DriverKYC;
