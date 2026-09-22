import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaTshirt } from "react-icons/fa";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About Us" },
  { to: "/men", label: "Men" },
  { to: "/women", label: "Women" },
  { to: "/kids", label: "Kids" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header-container">
        {/* Hamburger Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-mark"><FaTshirt /></span>
          <span className="logo-text">CLOTH<span className="accent">STORE</span></span>
        </Link>

        {/* Nav */}
        <nav className={`nav ${isMenuOpen ? "nav-active" : ""}`}>
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Backdrop for mobile menu */}
        {isMenuOpen && <div className="nav-overlay" onClick={closeMenu} />}

        {/* Right Section */}
        <div className="right">
          <div className="search-box mobile-hide">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>

          <div className="icon-group">
            {/* Profile */}
            <Link to="/profile" className="icon-wrapper">
              <FaUser className="icon" />
              <span className="icon-label">Profile</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="icon-wrapper cart">
              <FaShoppingCart className="icon" />
              <span className="count">2</span>
              <span className="icon-label">Bag</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
