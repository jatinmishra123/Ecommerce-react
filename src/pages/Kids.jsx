import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaFilter, FaTimes } from "react-icons/fa";
import { products } from "../data/products";
import { useCart } from "../context/useCart";
import "./Kids.css";

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} />);
    else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} />);
    else stars.push(<FaRegStar key={i} />);
  }
  return stars;
};

const kidsProducts = products.filter((p) => p.category === "kids");

const Kids = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0]);
  };

  return (
    <div className="collection-page kids-theme">
      <header className="collection-hero">
        <div className="hero-content">
          <span className="breadcrumb">Home / Kids</span>
          <h1>🎈 Kids Collection</h1>
          <p>Fun, colorful & comfortable styles for little adventurers.</p>
        </div>
        <svg className="hero-wave" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,32 C240,60 480,0 720,20 C960,40 1200,60 1440,24 L1440,60 L0,60 Z" fill="#fff8f0" />
        </svg>
      </header>

      <div className="collection-toolbar">
        <button className="filter-toggle" onClick={() => setIsFilterOpen(true)}>
          <FaFilter /> Filters
        </button>
        <span className="result-count">{kidsProducts.length} products</span>
        <div className="sort-box">
          <label htmlFor="kids-sort">Sort by</label>
          <select id="kids-sort" defaultValue="featured">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="collection-layout">
        <aside className={`filter-sidebar ${isFilterOpen ? "open" : ""}`}>
          <div className="filter-sidebar-header">
            <h3>Filters</h3>
            <button className="close-filter" onClick={() => setIsFilterOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="filter-group">
            <label>🧸 Category</label>
            <div className="options">
              {["T-Shirts", "Hoodies", "Shoes", "Dresses", "Accessories"].map((c) => (
                <label key={c} className="checkbox-option">
                  <input type="checkbox" /> {c}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>💰 Price</label>
            <div className="options">
              {["Under $30", "$30 - $50", "$50 & Above"].map((p) => (
                <label key={p} className="checkbox-option">
                  <input type="checkbox" /> {p}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>👶 Age Group</label>
            <div className="size-options">
              {["2-4Y", "5-7Y", "8-10Y", "11-13Y"].map((a) => (
                <button key={a} type="button" className="size-btn">{a}</button>
              ))}
            </div>
          </div>

          <button className="apply-filter-btn" onClick={() => setIsFilterOpen(false)}>
            Apply Filters
          </button>
        </aside>

        {isFilterOpen && <div className="filter-overlay" onClick={() => setIsFilterOpen(false)} />}

        <main className="product-grid">
          {kidsProducts.map((product, index) => (
            <Link key={product.id} to={`/product/${product.id}`} className={`product-card pastel-${index % 4}`}>
              <div className="image-wrapper">
                {product.badge && (
                  <span className={`badge ${product.badge === "SALE" ? "badge-sale" : "badge-new"}`}>
                    {product.badge === "NEW" ? "✨ NEW" : "🔥 SALE"}
                  </span>
                )}
                <img src={product.img} alt={product.name} />
                <button className="add-btn" onClick={(e) => handleQuickAdd(e, product)}>+ Quick Add</button>
              </div>
              <div className="info">
                <h4>{product.name}</h4>
                <div className="rating">{renderStars(product.rating)}</div>
                <div className="price-row">
                  <span className="price">${product.price}</span>
                  {product.oldPrice && <span className="old-price">${product.oldPrice}</span>}
                </div>
              </div>
            </Link>
          ))}
        </main>
      </div>

      <div className="load-more-wrap">
        <button className="load-more-btn">Load More</button>
      </div>
    </div>
  );
};

export default Kids;
