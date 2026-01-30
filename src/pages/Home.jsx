import React from "react";
import "./Home.css";

const Home = () => {
  // Sample data for images to ensure they show up
  const arrivals = [
    { id: 1, name: "Tailored Wool Coat", price: "$180", img:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Silk Evening Dress", price: "$240", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Classic Leather Boot", price: "$150", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Minimalist Watch", price: "$310", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80" },
  ];

  return (
    <div className="home-container">
      {/* 1. HERO SECTION */}
      <header className="hero-section">
        <div className="hero-text">
          <span className="pre-title">New Season 2026</span>
          <h1>Luxury is in <br />the details.</h1>
          <p>Explore our curated collection of premium essentials.</p>
          <button className="primary-btn">Shop Collection</button>
        </div>
        <div className="hero-image-wrapper">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80" alt="Fashion Hero" />
        </div>
      </header>

      {/* 2. CATEGORY TILES (Corrected Design) */}
      <section className="category-grid-section">
        <div className="cat-card">
          <img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=600&q=80" alt="Men" />
          <div className="cat-info">
            <h3>Menswear</h3>
            <button className="text-link">Explore</button>
          </div>
        </div>
        <div className="cat-card">
          <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80" alt="Women" />
          <div className="cat-info">
            <h3>Womenswear</h3>
            <button className="text-link">Explore</button>
          </div>
        </div>
        <div className="cat-card">
          <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80" alt="Women" />
          <div className="cat-info">
            <h3>Accessories</h3>
            <button className="text-link">Explore</button>
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS (Product Cards) */}
      <section className="arrivals-section">
        <div className="section-title">
          <h2>New Arrivals</h2>
          <p>Handpicked styles for your wardrobe.</p>
        </div>
        <div className="product-container">
          {arrivals.map((item) => (
            <div key={item.id} className="product-item">
              <div className="product-img-box">
                <img src={item.img} alt={item.name} />
                <button className="quick-shop">+ Quick Add</button>
              </div>
              <div className="product-details">
                <h4>{item.name}</h4>
                <span className="product-price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. NEWSLETTER (Modern Clean) */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay in the loop</h2>
          <p>Get early access to sales and new arrivals.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button type="submit">Join</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;