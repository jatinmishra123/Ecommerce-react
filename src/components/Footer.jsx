import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand Section */}
        <div className="footer-col brand-col">
          <h3 className="footer-logo">CLOTH<span>STORE</span></h3>
          <p>Elevate your everyday style with our curated collections. Quality meets trend at ClothStore.</p>
          <div className="social">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Pinterest"><FaPinterestP /></a>
          </div>
        </div>

        {/* Links Sections */}
        <div className="footer-col">
          <h4>Shop</h4>
          <a href="#">Men's Wear</a>
          <a href="#">Women's Wear</a>
          <a href="#">Kid's Collection</a>
          <a href="#" className="sale-link">Season Sale</a>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
            <a href="#">About us</a>

          <a href="#">Track Order</a>
          <a href="#">Shipping Policy</a>
          <a href="#">Return & Exchange</a>
          <a href="#">FAQs</a>
        </div>

        {/* Newsletter Section */}
        <div className="footer-col newsletter">
          <h4>Stay in the Loop</h4>
          <p>Subscribe to get special offers and first look at new arrivals.</p>
          <div className="subscribe-box">
            <input type="email" placeholder="Your email address" />
            <button type="button">Join</button>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="bottom-container">
          <p>© 2026 ClothStore. Crafted with passion.</p>
          <div className="payment-icons">
            {/* You can add payment icons/images here later */}
            <span>Visa</span> • <span>Mastercard</span> • <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;