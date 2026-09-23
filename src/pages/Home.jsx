import React from "react";
import { Link } from "react-router-dom";
import {
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaHeadset,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaQuoteLeft,
  FaFire,
} from "react-icons/fa";
import { products } from "../data/products";
import { useCart } from "../context/useCart";
import "./Home.css";

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} />);
    else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} />);
    else stars.push(<FaRegStar key={i} />);
  }
  return stars;
};

const Home = () => {
  const { addToCart } = useCart();

  const arrivals = products.filter((p) => [1, 2, 3, 4].includes(p.id));
  const trending = products.filter((p) => [103, 203, 108, 207].includes(p.id));

  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0]);
  };

  const features = [
    { icon: <FaTruck />, title: "Free Shipping", desc: "On all orders over $75" },
    { icon: <FaUndo />, title: "Easy Returns", desc: "30-day return policy" },
    { icon: <FaShieldAlt />, title: "Secure Payment", desc: "100% protected checkout" },
    { icon: <FaHeadset />, title: "24/7 Support", desc: "Dedicated customer care" },
  ];

  const testimonials = [
    { id: 1, name: "Ananya Kapoor", role: "Verified Buyer", rating: 5, text: "The quality is outstanding for the price. My wool coat still looks brand new after months of wear." },
    { id: 2, name: "Rohan Mehta", role: "Verified Buyer", rating: 4.5, text: "Fast delivery and the fit is exactly as described. ClothStore is now my go-to for everyday wear." },
    { id: 3, name: "Sara Iqbal", role: "Verified Buyer", rating: 5, text: "Loved the packaging and the customer support helped me exchange a size within minutes." },
  ];

  return (
    <div className="home-container">
      {/* PROMO BAR */}
      <div className="promo-bar">
        <p>Free shipping on orders over $75 &nbsp;|&nbsp; Extra 20% off with code <strong>SEASON20</strong></p>
      </div>

      {/* 1. HERO SECTION */}
      <header className="hero-section">
        <div className="hero-text">
          <span className="pre-title"><span className="pre-title-line" />New Season 2026</span>
          <h1>Luxury is in <br />the details.</h1>
          <p>Explore our curated collection of premium essentials.</p>
          <div className="hero-btns">
            <button className="primary-btn">Shop Collection <span className="btn-arrow">→</span></button>
            <button className="secondary-btn">Explore New In</button>
          </div>
          <div className="hero-trust">
            <div className="hero-rating">{renderStars(4.9)}</div>
            <span>4.9/5 from 10,000+ happy customers</span>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80" alt="Fashion Hero" />
          <div className="hero-floating-card">
            <span className="hero-floating-icon">✓</span>
            <div>
              <h4>10K+</h4>
              <p>Orders Delivered</p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. FEATURES / USP BAR */}
      <section className="features-bar">
        {features.map((f) => (
          <div key={f.title} className="feature-item">
            <span className="feature-icon">{f.icon}</span>
            <div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 3. CATEGORY TILES */}
      <section className="category-grid-section">
        <Link to="/men" className="cat-card">
          <img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=600&q=80" alt="Men" />
          <div className="cat-info">
            <h3>Menswear</h3>
            <span className="text-link">Explore</span>
          </div>
        </Link>
        <Link to="/women" className="cat-card">
          <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80" alt="Women" />
          <div className="cat-info">
            <h3>Womenswear</h3>
            <span className="text-link">Explore</span>
          </div>
        </Link>
        <Link to="/kids" className="cat-card">
          <img src="https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&w=600&q=80" alt="Kids" />
          <div className="cat-info">
            <h3>Kids</h3>
            <span className="text-link">Explore</span>
          </div>
        </Link>
      </section>

      {/* 4. FLASH SALE BANNER */}
      <section className="flash-sale-section">
        <div className="flash-sale-card men-sale">
          <div className="flash-sale-content">
            <span className="pre-title">Limited Time</span>
            <h2>Men's Sale <br />Up to 40% Off</h2>
            <Link to="/men" className="primary-btn">Shop Now</Link>
          </div>
        </div>
        <div className="flash-sale-card women-sale">
          <div className="flash-sale-content">
            <span className="pre-title">Just Landed</span>
            <h2>Women's New <br />Collection</h2>
            <Link to="/women" className="primary-btn">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      <section className="arrivals-section">
        <div className="section-title">
          <h2>New Arrivals</h2>
          <p>Handpicked styles for your wardrobe.</p>
        </div>
        <div className="product-container">
          {arrivals.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`} className="product-item">
              <div className="product-img-box">
                {item.badge && <span className="product-badge new-badge">{item.badge}</span>}
                <img src={item.img} alt={item.name} />
                <button className="quick-shop" onClick={(e) => handleQuickAdd(e, item)}>+ Add to Cart</button>
              </div>
              <div className="product-details">
                <h4>{item.name}</h4>
                <div className="product-rating">{renderStars(item.rating)}</div>
                <span className="product-price">${item.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. TRENDING / BEST SELLERS */}
      <section className="arrivals-section trending-section">
        <div className="section-title">
          <h2><FaFire className="fire-icon" /> Trending Now</h2>
          <p>Our best-selling pieces this week.</p>
        </div>
        <div className="product-container">
          {trending.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`} className="product-item">
              <div className="product-img-box">
                <span className="product-badge sale-badge">
                  -{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}%
                </span>
                <img src={item.img} alt={item.name} />
                <button className="quick-shop" onClick={(e) => handleQuickAdd(e, item)}>+ Add to Cart</button>
              </div>
              <div className="product-details">
                <h4>{item.name}</h4>
                <div className="product-rating">{renderStars(item.rating)}</div>
                <div className="price-row">
                  <span className="product-price">${item.price}</span>
                  <span className="old-price">${item.oldPrice}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="section-title">
          <h2>What Our Customers Say</h2>
          <p>Real feedback from real ClothStore shoppers.</p>
        </div>
        <div className="testimonial-container">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <FaQuoteLeft className="quote-icon" />
              <div className="testimonial-rating">{renderStars(t.rating)}</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <span className="avatar">{t.name.charAt(0)}</span>
                <div>
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. NEWSLETTER */}
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
