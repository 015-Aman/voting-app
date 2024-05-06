import React, { useState } from 'react';

const CandidateInformation = ({ data }) => {
  const [verified, setVerified] = useState(data.verified);
  console.log('cadidate data')
  console.log(data)
  const toggleVerification = () => {
    setVerified(!verified);
    // You can also update the backend here to reflect the change in verification status
  };

  return (
    <div>
      <h2>Candidate Information</h2>
      <p>Name: {data.name}</p>
      <p>Aadhar Number: {data.aadharNumber}</p>
      <p>Date of Birth: {new Date(data.dateOfBirth).toLocaleDateString()}</p>
      <p>Address: {data.address}</p>
      <p>Country: {data.country}</p>
      <p>State: {data.state}</p>
      <p>District: {data.district}</p>
      <p>Constituency: {data.constituency}</p>
      <p>Pincode: {data.pincode}</p>
      <p>Verified: {verified ? 'True' : 'False'}</p>
      <button onClick={toggleVerification}>
        {verified ? 'Mark as Unverified' : 'Mark as Verified'}
      </button>
      <br />
      <img src={data.file} alt="Candidate ID" />
    </div>
  );
};

export default CandidateInformation;
