import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBoxOpen,
  FaHeart,
  FaMapMarkerAlt,
  FaLock,
  FaSignOutAlt,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaPen,
  FaGift,
  FaCalendarAlt,
  FaCheckCircle,
  FaTruck,
  FaClock,
  FaTimesCircle,
  FaPlus,
} from "react-icons/fa";
import { useAuth } from "../context/useAuth";
import { getCustomerOrders, updateCustomerProfile, changeCustomerPassword } from "../api";
import "./Profile.css";

const navItems = [
  { key: "profile", label: "Profile", icon: <FaUser /> },
  { key: "orders", label: "My Orders", icon: <FaBoxOpen /> },
  { key: "wishlist", label: "Wishlist", icon: <FaHeart /> },
  { key: "addresses", label: "Addresses", icon: <FaMapMarkerAlt /> },
  { key: "password", label: "Change Password", icon: <FaLock /> },
];

const statusClass = (status) => `status-badge status-${(status || "pending").toLowerCase()}`;

const statusIcon = (status) => {
  switch ((status || "").toLowerCase()) {
    case "completed": return <FaCheckCircle />;
    case "shipped": return <FaTruck />;
    case "pending": return <FaClock />;
    default: return <FaTimesCircle />;
  }
};

const formatDate = (value) => {
  const d = new Date(value);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
};

const Profile = () => {
  const { customer, loading, token, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [draftData, setDraftData] = useState({ name: "", mobile: "", gender: "" });
  const [saveMessage, setSaveMessage] = useState("");

  const [orders, setOrders] = useState([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (activeTab === "orders" && customer && token) {
      getCustomerOrders(token)
        .then(setOrders)
        .catch((err) => console.error("Failed to load orders:", err))
        .finally(() => setOrdersLoaded(true));
    }
  }, [activeTab, customer, token]);

  if (loading) {
    return <div className="profile-page logged-out"><div className="logout-card"><h2>Loading...</h2></div></div>;
  }

  if (!customer) {
    return (
      <div className="profile-page logged-out">
        <div className="logout-card">
          <h2>You're not signed in</h2>
          <p>Log in to view your profile, orders, and saved details.</p>
          <button className="save-btn" onClick={() => navigate("/login", { state: { from: "/profile" } })}>
            Sign In
          </button>
          <p style={{ marginTop: "14px" }}>
            No account yet? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    );
  }

  const startEditing = () => {
    setDraftData({ name: customer.name || "", mobile: customer.mobile || "", gender: customer.gender || "" });
    setIsEditing(true);
  };

  const cancelEditing = () => setIsEditing(false);

  const handleChange = (e) => {
    setDraftData({ ...draftData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateCustomerProfile(token, draftData);
      refreshProfile();
      setIsEditing(false);
      setSaveMessage("Profile updated successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (err) {
      setSaveMessage(err.message || "Failed to update profile.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    try {
      await changeCustomerPassword(token, { currentPassword, newPassword });
      setPasswordMessage("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setPasswordError(err.message || "Failed to update password.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="profile-page">
      {/* Left Sidebar */}
      <div className="profile-sidebar">
        <div className="sidebar-user">
          <div className="avatar-circle">{customer.name.charAt(0).toUpperCase()}</div>
          <div>
            <h3>{customer.name}</h3>
            <span>{customer.email}</span>
          </div>
        </div>

        <ul>
          {navItems.map((item) => (
            <li
              key={item.key}
              className={activeTab === item.key ? "active" : ""}
              onClick={() => setActiveTab(item.key)}
            >
              <span className="nav-icon">{item.icon}</span> {item.label}
            </li>
          ))}
          <li className="logout-item" onClick={handleLogout}>
            <span className="nav-icon"><FaSignOutAlt /></span> Logout
          </li>
        </ul>
      </div>

      {/* Right Content */}
      <div className="profile-content">
        {activeTab === "profile" && (
          <>
            <div className="profile-banner">
              <div className="banner-avatar-wrap">
                <div className="avatar-circle large">{customer.name.charAt(0).toUpperCase()}</div>
              </div>
              <div className="banner-info">
                <h2>{customer.name}</h2>
                <p>{customer.email}</p>
                <span className="member-since"><FaCalendarAlt /> Member since {formatDate(customer.createdAt)}</span>
              </div>
              {!isEditing && (
                <button type="button" className="edit-profile-btn" onClick={startEditing}>
                  <FaPen /> Edit Profile
                </button>
              )}
            </div>

            <div className="profile-stats">
              <div className="stat-box">
                <FaBoxOpen className="stat-icon" />
                <div>
                  <h4>{orders.length}</h4>
                  <span>Orders</span>
                </div>
              </div>
              <div className="stat-box">
                <FaGift className="stat-icon" />
                <div>
                  <h4>0</h4>
                  <span>Reward Points</span>
                </div>
              </div>
            </div>

            <h3 className="section-heading">Personal Information</h3>
            <form className="profile-card grid-form" onSubmit={handleSave}>
              <div className="profile-row">
                <label><FaUser /> Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={isEditing ? draftData.name : customer.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="profile-row">
                <label><FaEnvelope /> Email</label>
                <input type="email" name="email" value={customer.email} disabled />
              </div>

              <div className="profile-row">
                <label><FaPhone /> Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={isEditing ? draftData.mobile : (customer.mobile || "")}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder={isEditing ? "Add your mobile number" : "Not set"}
                />
              </div>

              <div className="profile-row">
                <label><FaVenusMars /> Gender</label>
                <select
                  name="gender"
                  value={isEditing ? draftData.gender : (customer.gender || "")}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value="">Not set</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button type="submit" className="save-btn">Save Changes</button>
                  <button type="button" className="cancel-btn" onClick={cancelEditing}>Cancel</button>
                </div>
              )}
              {saveMessage && <p className="save-message">{saveMessage}</p>}
            </form>
          </>
        )}

        {activeTab === "orders" && (
          <>
            <div className="section-header">
              <h2>My Orders</h2>
              <p>Track and manage all your past purchases.</p>
            </div>
            {!ordersLoaded ? (
              <p className="empty-state">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="empty-state">You haven't placed any orders yet.</p>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order._id} className={`order-card status-border-${(order.status || "pending").toLowerCase()}`}>
                    <div className="order-icon">{statusIcon(order.status)}</div>
                    <div className="order-info">
                      <h4>{order.items && order.items.length ? order.items.length + " item" + (order.items.length > 1 ? "s" : "") : "Order"}</h4>
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                    <span className={statusClass(order.status)}>{order.status}</span>
                    <span className="order-total">${Number(order.amount).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "wishlist" && (
          <>
            <div className="section-header">
              <h2>My Wishlist</h2>
              <p>Items you've saved for later.</p>
            </div>
            <p className="empty-state">Your wishlist is empty.</p>
          </>
        )}

        {activeTab === "addresses" && (
          <>
            <div className="section-header">
              <h2>Saved Addresses</h2>
              <p>Manage the addresses you ship and bill to.</p>
            </div>
            <div className="address-grid">
              <p className="empty-state">No addresses saved yet.</p>
              <button className="add-address-card" type="button">
                <FaPlus /> Add New Address
              </button>
            </div>
          </>
        )}

        {activeTab === "password" && (
          <>
            <div className="section-header">
              <h2>Change Password</h2>
              <p>Keep your account secure with a strong password.</p>
            </div>
            <div className="password-layout">
              <form className="profile-card" onSubmit={handlePasswordSubmit}>
                <div className="profile-row">
                  <label>Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="profile-row">
                  <label>New Password</label>
                  <input
                    type="password"
                    minLength={6}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="profile-row">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    minLength={6}
                    placeholder="Re-enter new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />
                </div>
                {passwordError && <p className="save-message" style={{ color: "#c0392b" }}>{passwordError}</p>}
                {passwordMessage && <p className="save-message">{passwordMessage}</p>}
                <button type="submit" className="save-btn">Update Password</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
