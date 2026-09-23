import React, { useState } from "react";
import {
  FaUser,
  FaBoxOpen,
  FaHeart,
  FaMapMarkerAlt,
  FaLock,
  FaSignOutAlt,
  FaTrash,
  FaPlus,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaCamera,
  FaPen,
  FaGift,
  FaCalendarAlt,
  FaCheckCircle,
  FaTruck,
  FaClock,
  FaTimesCircle,
  FaHome,
  FaBriefcase,
  FaShieldAlt,
} from "react-icons/fa";
import "./Profile.css";

const orders = [
  { id: "#ORD-2451", date: "14 Aug 2026", items: 3, total: 245, status: "Delivered" },
  { id: "#ORD-2398", date: "02 Jul 2026", items: 1, total: 89, status: "Shipped" },
  { id: "#ORD-2340", date: "18 Jun 2026", items: 2, total: 178, status: "Processing" },
  { id: "#ORD-2310", date: "21 May 2026", items: 2, total: 155, status: "Cancelled" },
];

const initialWishlist = [
  { id: 1, name: "Silk Wrap Dress", price: 155, img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=300&q=80" },
  { id: 2, name: "Classic Leather Loafers", price: 145, img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=300&q=80" },
  { id: 3, name: "Leather Crossbody Bag", price: 220, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=300&q=80" },
];

const initialAddresses = [
  { id: 1, label: "Home", name: "Rishabh Mishra", address: "221B Baker Street, New Delhi, 110001", phone: "9876543210", isDefault: true },
  { id: 2, label: "Work", name: "Rishabh Mishra", address: "Cyber Hub, Gurugram, Haryana 122002", phone: "9876543210", isDefault: false },
];

const navItems = [
  { key: "profile", label: "Profile", icon: <FaUser /> },
  { key: "orders", label: "My Orders", icon: <FaBoxOpen /> },
  { key: "wishlist", label: "Wishlist", icon: <FaHeart /> },
  { key: "addresses", label: "Addresses", icon: <FaMapMarkerAlt /> },
  { key: "password", label: "Change Password", icon: <FaLock /> },
];

const statusClass = (status) => `status-badge status-${status.toLowerCase()}`;

const statusIcon = (status) => {
  switch (status) {
    case "Delivered": return <FaCheckCircle />;
    case "Shipped": return <FaTruck />;
    case "Processing": return <FaClock />;
    default: return <FaTimesCircle />;
  }
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loggedOut, setLoggedOut] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [formData, setFormData] = useState({
    fullName: "Rishabh Mishra",
    email: "rishabh@email.com",
    mobile: "9876543210",
    gender: "Male",
  });
  const [draftData, setDraftData] = useState(formData);

  const handleChange = (e) => {
    setDraftData({ ...draftData, [e.target.name]: e.target.value });
  };

  const startEditing = () => {
    setDraftData(formData);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraftData(formData);
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setFormData(draftData);
    setIsEditing(false);
    setSaveMessage("Profile updated successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  if (loggedOut) {
    return (
      <div className="profile-page logged-out">
        <div className="logout-card">
          <h2>You've been logged out</h2>
          <p>Come back soon to track your orders and wishlist.</p>
          <button className="save-btn" onClick={() => setLoggedOut(false)}>
            Log In Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Left Sidebar */}
      <div className="profile-sidebar">
        <div className="sidebar-user">
          <div className="avatar-circle">{formData.fullName.charAt(0)}</div>
          <div>
            <h3>{formData.fullName}</h3>
            <span>{formData.email}</span>
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
          <li className="logout-item" onClick={() => setLoggedOut(true)}>
            <span className="nav-icon"><FaSignOutAlt /></span> Logout
          </li>
        </ul>
      </div>

      {/* Right Content */}
      <div className="profile-content">
        {activeTab === "profile" && (
          <>
            {/* Profile Banner */}
            <div className="profile-banner">
              <div className="banner-avatar-wrap">
                <div className="avatar-circle large">{formData.fullName.charAt(0)}</div>
                <button type="button" className="avatar-edit-btn" title="Change photo">
                  <FaCamera />
                </button>
              </div>
              <div className="banner-info">
                <h2>{formData.fullName}</h2>
                <p>{formData.email}</p>
                <span className="member-since"><FaCalendarAlt /> Member since Jan 2025</span>
              </div>
              {!isEditing && (
                <button type="button" className="edit-profile-btn" onClick={startEditing}>
                  <FaPen /> Edit Profile
                </button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="profile-stats">
              <div className="stat-box">
                <FaBoxOpen className="stat-icon" />
                <div>
                  <h4>{orders.length}</h4>
                  <span>Orders</span>
                </div>
              </div>
              <div className="stat-box">
                <FaHeart className="stat-icon" />
                <div>
                  <h4>{wishlist.length}</h4>
                  <span>Wishlist Items</span>
                </div>
              </div>
              <div className="stat-box">
                <FaGift className="stat-icon" />
                <div>
                  <h4>320</h4>
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
                  name="fullName"
                  value={isEditing ? draftData.fullName : formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="profile-row">
                <label><FaEnvelope /> Email</label>
                <input
                  type="email"
                  name="email"
                  value={isEditing ? draftData.email : formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="profile-row">
                <label><FaPhone /> Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={isEditing ? draftData.mobile : formData.mobile}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="profile-row">
                <label><FaVenusMars /> Gender</label>
                <select
                  name="gender"
                  value={isEditing ? draftData.gender : formData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
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
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className={`order-card status-border-${order.status.toLowerCase()}`}>
                  <div className="order-icon">{statusIcon(order.status)}</div>
                  <div className="order-info">
                    <h4>{order.id}</h4>
                    <span>{order.date} &bull; {order.items} item{order.items > 1 ? "s" : ""}</span>
                  </div>
                  <span className={statusClass(order.status)}>{order.status}</span>
                  <span className="order-total">${order.total}</span>
                  <button className="view-btn">View</button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "wishlist" && (
          <>
            <div className="section-header">
              <h2>My Wishlist</h2>
              <p>Items you've saved for later.</p>
            </div>
            {wishlist.length === 0 ? (
              <p className="empty-state">Your wishlist is empty.</p>
            ) : (
              <div className="wishlist-grid">
                {wishlist.map((item) => (
                  <div key={item.id} className="wishlist-card">
                    <button className="remove-btn" onClick={() => removeFromWishlist(item.id)}>
                      <FaTrash />
                    </button>
                    <img src={item.img} alt={item.name} />
                    <h4>{item.name}</h4>
                    <span className="wishlist-price">${item.price}</span>
                    <button className="add-to-bag-btn">Move to Bag</button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "addresses" && (
          <>
            <div className="section-header">
              <h2>Saved Addresses</h2>
              <p>Manage the addresses you ship and bill to.</p>
            </div>
            <div className="address-grid">
              {initialAddresses.map((addr) => (
                <div key={addr.id} className="address-card">
                  <div className="address-header">
                    <span className="address-icon">{addr.label === "Home" ? <FaHome /> : <FaBriefcase />}</span>
                    <h4>{addr.label}</h4>
                    {addr.isDefault && <span className="default-tag">Default</span>}
                  </div>
                  <p>{addr.name}</p>
                  <p>{addr.address}</p>
                  <p>Phone: {addr.phone}</p>
                  <div className="address-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Remove</button>
                  </div>
                </div>
              ))}
              <button className="add-address-card">
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
              <form className="profile-card" onSubmit={(e) => e.preventDefault()}>
                <div className="profile-row">
                  <label>Current Password</label>
                  <input type="password" placeholder="Enter current password" />
                </div>
                <div className="profile-row">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>
                <div className="profile-row">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Re-enter new password" />
                </div>
                <button type="submit" className="save-btn">Update Password</button>
              </form>

              <div className="security-tip-card">
                <FaShieldAlt className="security-icon" />
                <h4>Password tips</h4>
                <ul>
                  <li>Use at least 8 characters</li>
                  <li>Mix uppercase, numbers & symbols</li>
                  <li>Avoid reusing old passwords</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
