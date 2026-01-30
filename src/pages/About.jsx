import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay">
          <h1>Redefining Modern Fashion</h1>
          <p>Where quality meets affordability. Established 2024.</p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="about-story">
        <div className="section-header">
          <h2>Our Journey</h2>
          <div className="underline"></div>
        </div>
        <p>
          Founded in 2024, ClothStore started with a simple idea – make stylish
          clothing available for everyone. Today, we serve thousands of happy
          customers across India, bridging the gap between luxury and daily wear.
        </p>
      </section>

      {/* Values Section (New) */}
      <section className="about-values">
        <div className="value-card">
          <div className="icon">🌿</div>
          <h3>Eco-Friendly</h3>
          <p>We prioritize sustainable fabrics and ethical manufacturing.</p>
        </div>
        <div className="value-card">
          <div className="icon">💎</div>
          <h3>Premium Quality</h3>
          <p>Every stitch is inspected to ensure it meets our high standards.</p>
        </div>
        <div className="value-card">
          <div className="icon">🤝</div>
          <h3>Community</h3>
          <p>We donate 1% of all profits to local garment workers' funds.</p>
        </div>
      </section>

      {/* Meet the Team (New) */}
      <section className="about-team">
        <h2>Meet Our Creators</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-photo"></div>
            <h4>Arjun Sharma</h4>
            <span>Founder & CEO</span>
          </div>
          <div className="team-member">
            <div className="member-photo"></div>
            <h4>Priya Das</h4>
            <span>Creative Director</span>
          </div>
          <div className="team-member">
            <div className="member-photo"></div>
            <h4>Vikram Singh</h4>
            <span>Head of Logistics</span>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="about-trust">
        <div className="trust-stats">
          <div className="stat-item">
            <h3>10K+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-item">
            <h3>5K+</h3>
            <p>Products</p>
          </div>
          <div className="stat-item">
            <h3>20+</h3>
            <p>Cities Served</p>
          </div>
          <div className="stat-item">
            <h3>24/7</h3>
            <p>Support</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <div className="cta-content">
          <h2>Ready to upgrade your style?</h2>
          <p>Join our fashion community and get 10% off your first order.</p>
          <div className="cta-btns">
            <button className="shop-btn">Shop Now</button>
            <button className="contact-btn">Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;