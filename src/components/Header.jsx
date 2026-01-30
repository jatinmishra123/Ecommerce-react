import React from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import "./Header.css";
import { Link, NavLink } from "react-router-dom"; 

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo">
          CLOTH<span>STORE</span>
        </div>

        {/* Navigation Links */}
       <nav className="nav">
  <Link to="/" className="nav-link">Home</Link>
  <Link to="/about" className="nav-link">About Us</Link>
  <NavLink to="/men" className="nav-link">Men</NavLink>
  <NavLink to="/women" className="nav-link">Women</NavLink>
  <Link to="/kids" className="nav-link">Kids</Link>
  <Link to="/sale" className="nav-link sale">Sale</Link>
</nav>

        {/* Action Icons & Search */}
        <div className="right">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search for brands, styles..." />
          </div>

          <div className="icon-group">
            <div className="icon-wrapper">
              <FaUser className="icon" />
              <span className="icon-label">Profile</span>
            </div>
            
            <div className="icon-wrapper cart">
              <FaShoppingCart className="icon" />
              <span className="count">2</span>
              <span className="icon-label">Bag</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;