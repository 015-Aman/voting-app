import React, { useState } from "react";
import "./CandidateRegisteration.scss";
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload";

function CandidateRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    aadharNumber: "",
    partyname: "",
    slogan: "",
    dateOfBirth: "",
    address: "",
    district: "",
    constituency: "",
    pincode: "",
    password: "",
    file: null, // State for storing the uploaded file
    aadharimg:null
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      file: event.target.files[0], // Update the file state with the selected file
    }));
  };

  const aadharFileChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      
      aadharimg: event.target.files[0]
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert("Password must contain at least one uppercase letter, one lowercase letter, one symbol, one digit, and be at least 8 characters long. Please re-enter.");
      return;
    }

    if (formData.aadharNumber.length !== 12) {
      alert("Aadhar number must be exactly 12 digits long. Please re-enter.");
      return;
    }
    if (formData.pincode.length !== 6) {
      alert("Pincode must be exactly 6 digits long. Please re-enter.");
      return;
    }

    // Upload the file first
    const url = await upload(formData.file);
    const url2 = await upload(formData.aadharimg);

    try {
      // Send the registration data along with the uploaded file URL
      await newRequest.post("/candidate/auth/register", {
        ...formData,
        file: url,

        aadharimg:url2
      });

      console.log("this is", url);
      console.log("Candidate Registration successful!");
      setFormData({
        name: "",
        aadharNumber: "",
        partyname: "",
        slogan: "",
        dateOfBirth: "",
        address: "",
        district: "",
        constituency: "",
        pincode: "",
        password: "",
        file: null, // State for storing the uploaded file
        aadharimg:null
      })
      alert("Candidate registered successfully");
    } catch (error) {
      console.error("Error during candidate registration:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Candidate's Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="partyname">Party Name :</label>
          <input
            type="text"
            id="partyname"
            name="partyname"
            value={formData.partyname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Slogan :</label>
          <input
            type="text"
            id="slogan"
            name="slogan"
            value={formData.slogan}
            onChange={handleChange}
            required
          />
        </div>

        {/* Aadhar Number */}
        <div className="form-group">
          <label htmlFor="aadharNumber">Aadhar Number:</label>
          <input
            type="text"
            id="aadharNumber"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="form-group-date">
          <label htmlFor="dateOfBirth">Date of Birth :</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address */}
        <div className="form-group">
          <label htmlFor="address">Address :</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Country */}
        <div className="form-group">
          <label htmlFor="country">Country :</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Country
            </option>
            <option value="India">India</option>
            {/* Add more country options as needed */}
          </select>
        </div>

        {/* State */}
        <div className="form-group">
          <label htmlFor="state">State :</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select State
            </option>
            <option value="Jharkhand">Jharkhand</option>
            {/* Add more state options as needed */}
          </select>
        </div>

        {/* District */}
        <div className="form-group">
          <label htmlFor="district">District :</label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select District
            </option>
            <option value="Bokaro">Bokaro</option>
            <option value="Chatra">Chatra</option>
            <option value="Dhanbad">Dhanbad</option>
            <option value="Dumka">Dumka</option>
            <option value="East Singhbhum">East Singhbhum</option>
            <option value="Garhwa">Garhwa</option>
            <option value="Giridih">Giridih</option>
            <option value="Godda">Godda</option>
            <option value="Gumla">Gumla</option>
            <option value="Hazaribagh">Hazaribagh</option>
            <option value="Jamtara">Jamtara</option>
            <option value="Khunti">Khunti</option>
            <option value="Koderma">Koderma</option>
            <option value="Latehar">Latehar</option>
            <option value="Lohardaga">Lohardaga</option>
            <option value="Pakur">Pakur</option>
            <option value="Palamu">Palamu</option>
            <option value="Ramgarh">Ramgarh</option>
            <option value="Ranchi">Ranchi</option>
            <option value="Sahebganj">Sahebganj</option>
            <option value="Seraikela Kharsawan">Seraikela Kharsawan</option>
            <option value="Simdega">Simdega</option>
            <option value="West Singhbhum">West Singhbhum</option>
          </select>
        </div>

        {/* Constituency */}
        <div className="form-group">
          <label htmlFor="constituency">Constituency :</label>
          <select
          id="constituency"
          name="constituency"
          value={formData.constituency}
          onChange={handleChange}
          required
          >
          <option value="" disabled>
            Select Constituency
          </option>
          {[
            "Bermo", "Bokaro", "Chandankiyari", "Dhanbad", "Giridih", "Jamua", "Jharia", "Nirsa", "Baghmara", "Baharagora",
            "Chaibasa", "Ghatsila", "Jaganathpur", "Jhinkpani", "Manoharpur", "Potka", "Seraikella", "Sukrui", "Chakradharpur",
            "Jaganathpur", "Kharsawan", "Tamar", "Torpa", "Bandgaon", "Barhait", "Borio", "Litipara", "Maheshpur", "Pakur",
            "Rajmahal", "Bishrampur", "Chhatarpur", "Daltonganj", "Garhwa", "Hussainabad", "Manika", "Panki", "Barkatha",
            "Bishunpur", "Dumka", "Gopikandar", "Jama", "Jamtara", "Nala", "Sarath", "Bahragora", "Ghatshila", "Jugsalai",
            "Jamshedpur East", "Jamshedpur West", "Jharkhand", "Baharagora", "Barhait", "Boiro", "Dumka", "Jama", "Jamtara",
            "Nala", "Sarath", "Bahragora", "Ghatshila", "Jugsalai", "Jamshedpur East", "Jamshedpur West", "Jharkhand",
            "Kharasawan", "Potka", "Seraikella", "Sukrui", "Chaibasa", "Chakradharpur", "Ghatsila", "Jaganathpur", "Jhinkpani",
            "Manoharpur", "Maheshpur", "Torpa", "Bandgaon", "Kharsawan", "Tamar", "Bishrampur", "Chhatarpur", "Daltonganj",
            "Garhwa", "Hussainabad", "Manika", "Panki", "Barkatha", "Bishunpur", "Litipara", "Pakur", "Rajmahal"
          ].map((constituency, index) => (
            <option key={index} value={constituency}>
              {constituency}
            </option>
          ))}
        </select>
        </div>

        {/* Pincode */}
        <div className="form-group">
          <label htmlFor="pincode">Pincode :</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div> */}

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="imageFile">Upload image:</label>
          <input
            type="file"
            id="imageFile"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

            {/* Image Upload */}
            <div className="form-group">
          <label htmlFor="aadharimg">Upload Aadhar:</label>
          <input
            type="file"
            id="aadharimg"
            accept="image/*"
            onChange={aadharFileChange}
            required
          />
        </div>
        </div>

        {/* Submit Button */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default CandidateRegistration;
