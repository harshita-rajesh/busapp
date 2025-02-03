import React, { useState } from 'react';
import axios from 'axios';

const DriverKYC = () => {
  const [driverLicense, setDriverLicense] = useState(null);
  const [idCard, setIdCard] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [status, setStatus] = useState('');
  const [step, setStep] = useState(1);
  const [selectedDocument, setSelectedDocument] = useState(''); // No default, requires user to select
  const [driverName, setDriverName] = useState('');
  const [phoneNo, setPhoneNo] = useState('+91');
  const [age, setAge] = useState('');

  // Common headers for all API requests
  const headers = {
      appId: 'yvdxyy',
      appKey: '9epukpvlpl1asl3bym4j',
      transactionId: 'driverkyc'
        };


  // File upload handler
  const handleFileUpload = (e, setFile) => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      setFile(file);
    } else {
      alert('Invalid file type. Please upload jpg, png, or pdf.');
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;

    // Allow only digits after '+91' and ensure max 10 digits after country code
    if (/^\+91\d{0,10}$/.test(value)) {
      setPhoneNo(value);
      console.log('');
    } else {
      console.log('Phone number must contain exactly 10 digits after +91');
    }
  };

  // Validate Driver's License
  const validateDL = async () => {
    setStatus('Validating Driver\'s License...');
    const formData = new FormData();
    formData.append('image', driverLicense);
    formData.append('countryId', 'ind'); // Replace with the driver's country ID
    formData.append('documentId', 'dl'); // 'DL' for Driver's License
    formData.append('expectedDocumentSide', 'front');
  
    try {
      const response = await axios.post('https://ind.idv.hyperverge.co/v1/readId', formData, { headers });
      const details = response.data.result?.details?.[0]?.fieldsExtracted;
  
      if (details) {
        const dateOfExpiry = details.dateOfExpiry?.value;
  
        // Check if dateOfExpiry exists and is valid
        if (dateOfExpiry && new Date(dateOfExpiry.split('-').reverse().join('-')) > new Date()) {
          setStep(2);
          setStatus('Driver\'s License validated successfully!');
        } else {
          alert('Driver\'s License is invalid or expired.');
          setStatus('Validation failed.');
        }
      } else {
        alert('Unable to fetch Driver\'s License details.');
        setStatus('Validation failed.');
      }
    } catch (error) {
      console.error(error);
      alert('Error validating Driver\'s License.');
      setStatus('Validation failed.');
    }
  };
  
  // Validate ID Card
  const validateID = async () => {
    if (!selectedDocument) {
      alert('Please select a document type.');
      return;
    }
  
    setStatus('Validating ID Card...');
    const formData = new FormData();
    formData.append('image', idCard);
    formData.append('countryId', 'ind'); // Replace with driver's country ID
  
    // Map selected document to corresponding documentId
    const documentIdMap = {
      Aadhaar: 'id',          // Aadhaar is 'id' in the document API
      Passport: 'passport',   // Passport is 'passport'
      'PAN Card': 'pan',      // PAN Card is 'pan'
    };
  
    formData.append('documentId', documentIdMap[selectedDocument]); // Use mapped documentId
    formData.append('expectedDocumentSide', 'front');
  
    try {
      const response = await axios.post('https://ind.idv.hyperverge.co/v1/readId', formData, { headers });
      
      // Check if the response has valid details and extract the fields
      const details = response.data.result?.details?.[0]?.fieldsExtracted;
      
      if (details) {
        // Check if the full name or other necessary fields are extracted
        const { fullName, dateOfBirth, idNumber } = details;
        
        if (fullName && dateOfBirth && idNumber) {
          // Document is valid
          setStep(3);
          setStatus(`${selectedDocument} validated successfully!`);
        } else {
          alert('Missing important details in the ID card. Please check the uploaded file.');
          setStatus('Validation failed.');
        }
      } else {
        alert('Unable to fetch ID card details. Please try again.');
        setStatus('Validation failed.');
      }
    } catch (error) {
      console.error(error);
      alert('Error validating ID Card. Please try again.');
      setStatus('Validation failed.');
    }
  };

  // Validate Selfie
  const validateSelfie = async () => {
    setStatus('Validating Selfie...');
    const formData = new FormData();
    formData.append('image', selfie);
  
    try {
      const response = await axios.post('https://ind.idv.hyperverge.co/v1/checkLiveness', formData, { headers });
      
      // Log the full API response for debugging
      console.log('API Response:', response.data);
  
      // Extract the necessary fields for basic validation
      const liveFace = response.data.result?.details?.liveFace;
  
      if (liveFace && liveFace.value === 'yes') {
        setStep(4);
        setStatus('Selfie validated successfully!');
      } else {
        alert('Selfie validation failed. The face is not detected as live.');
        setStatus('Validation failed.');
      }
    } catch (error) {
      console.error('Error validating selfie:', error.response ? error.response.data : error.message);
      alert('Error validating selfie. Please check the console for details.');
      setStatus('Validation failed.');
    }
  };

  // Face Match for Driver's License and Selfie
  const matchFace = async () => {
    setStatus('Matching Face...');
    
    // Create a FormData instance to hold the images
    const formData = new FormData();
    formData.append('selfie', selfie);  // Selfie image
    formData.append('id', driverLicense);  // Driver's License image
  
    try {
      // Send a POST request to the Face Match API
      const response = await axios.post('https://ind.idv.hyperverge.co/v1/matchFace', formData, { headers });
  
      // Log the full response for debugging
      console.log('API Response:', response.data);
  
      // Check if the face match value is 'yes'
      const match = response.data.result?.details?.match;
  
      if (match && match.value === 'yes') {
        setStatus('KYC Process Successful! Face match successful.');
      } else {
        alert('Face match failed. Please try again.');
        setStatus('KYC Failed. Face match failed.');
      }
    } catch (error) {
      console.error('Error in face match process:', error.response ? error.response.data : error.message);
      alert('Error in face match process. Please check the console for details.');
      setStatus('KYC Failed.');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) await validateDL();
    else if (step === 2) await validateID();
    else if (step === 3) await validateSelfie();
    else if (step === 4) await matchFace();
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
