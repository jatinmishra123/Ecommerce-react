import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-page">
      {/* Left Sidebar */}
      <div className="profile-sidebar">
        <h2>My Account</h2>
        <ul>
          <li className="active">Profile</li>
          <li>My Orders</li>
          <li>Wishlist</li>
          <li>Addresses</li>
          <li>Change Password</li>
          <li>Logout</li>
        </ul>
      </div>

      {/* Right Content */}
      <div className="profile-content">
        <h2>Profile Details</h2>

        <div className="profile-card">
          <div className="profile-row">
            <label>Full Name</label>
            <input type="text" value="Rishabh Mishra" />
          </div>

          <div className="profile-row">
            <label>Email</label>
            <input type="email" value="rishabh@email.com" />
          </div>

          <div className="profile-row">
            <label>Mobile</label>
            <input type="text" value="9876543210" />
          </div>

          <div className="profile-row">
            <label>Gender</label>
            <select>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <button className="save-btn">Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
