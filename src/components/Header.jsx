import React, { useState } from "react";
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header">
      <div className="header-container">
        {/* Hamburger Menu Icon (Mobile Only) */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Logo Section */}
        <div className="logo">
          CLOTH<span>STORE</span>
        </div>

        {/* Navigation Links - Added 'active' class based on state */}
        <nav className={`nav ${isMenuOpen ? "nav-active" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          <NavLink to="/men" className="nav-link" onClick={() => setIsMenuOpen(false)}>Men</NavLink>
          <NavLink to="/women" className="nav-link" onClick={() => setIsMenuOpen(false)}>Women</NavLink>
          <Link to="/kids" className="nav-link" onClick={() => setIsMenuOpen(false)}>Kids</Link>
          <Link to="/sale" className="nav-link sale" onClick={() => setIsMenuOpen(false)}>Sale</Link>
        </nav>

        {/* Action Icons & Search */}
        <div className="right">
          <div className="search-box mobile-hide">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
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