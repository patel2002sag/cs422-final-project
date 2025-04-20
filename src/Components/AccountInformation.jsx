import React, { useState, useEffect } from "react";
import "../Styles/styles.css";

const AccountInformation = () => {
  // Default user data
  const defaultUserData = {
    username: "johnsmith",
    email: "john.smith@example.com",
    firstName: "John",
    lastName: "Smith",
    address: "123 University Ave",
    city: "Chicago",
    state: "IL",
    zipCode: "60607",
    phone: "(312) 555-1234",
  };

  // Load user data from localStorage or use default
  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem("userData");
    return savedUserData ? JSON.parse(savedUserData) : defaultUserData;
  });

  // Copy of user data for editing
  const [editData, setEditData] = useState({ ...userData });
  
  // Save to localStorage whenever userData changes
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  
  // Success message state
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({ ...editData });
    setIsEditing(false);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  return (
    <div className="container">
      <div className="app-header">
        <div className="app-title">Account Information</div>
      </div>
      
      {showSuccess && (
        <div className="success-message">
          Your account information has been successfully updated!
        </div>
      )}

      <div className="account-container">
        {!isEditing ? (
          <div className="account-info">
            <div className="account-section">
              <h2 className="section-title">Personal Information</h2>
              <div className="info-row">
                <span className="info-label">Username:</span>
                <span className="info-value">{userData.username}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{userData.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">First Name:</span>
                <span className="info-value">{userData.firstName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Last Name:</span>
                <span className="info-value">{userData.lastName}</span>
              </div>
            </div>

            <div className="account-section">
              <h2 className="section-title">Contact Information</h2>
              <div className="info-row">
                <span className="info-label">Address:</span>
                <span className="info-value">{userData.address}</span>
              </div>
              <div className="info-row">
                <span className="info-label">City:</span>
                <span className="info-value">{userData.city}</span>
              </div>
              <div className="info-row">
                <span className="info-label">State:</span>
                <span className="info-value">{userData.state}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Zip Code:</span>
                <span className="info-value">{userData.zipCode}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Phone:</span>
                <span className="info-value">{userData.phone}</span>
              </div>
            </div>

            <button
              className="btn edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Information
            </button>
          </div>
        ) : (
          <form className="edit-form" onSubmit={handleSubmit}>
            <div className="account-section">
              <h2 className="section-title">Personal Information</h2>
              
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  value={editData.username}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={editData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  value={editData.firstName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  value={editData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="account-section">
              <h2 className="section-title">Contact Information</h2>
              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  value={editData.address}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="form-control"
                  value={editData.city}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="form-control"
                  value={editData.state}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  className="form-control"
                  value={editData.zipCode}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={editData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="button-group">
              <button type="submit" className="btn save-btn">
                Save Changes
              </button>
              <button
                type="button"
                className="btn cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AccountInformation;