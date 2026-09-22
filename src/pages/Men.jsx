import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaFilter, FaTimes } from "react-icons/fa";
import "./Men.css";

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} />);
    else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} />);
    else stars.push(<FaRegStar key={i} />);
  }
  return stars;
};

const menProducts = [
  { id: 1, name: "Urban Bomber Jacket", price: 129, rating: 4.5, badge: "NEW", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80" },
  { id: 2, name: "Slim Fit Oxford Shirt", price: 65, rating: 4, img: "https://images.unsplash.com/photo-1602810318383-e386cc2a7a3c?auto=format&fit=crop&w=500&q=80" },
  { id: 3, name: "Selvedge Denim Jeans", price: 89, oldPrice: 120, rating: 4.5, badge: "SALE", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80" },
  { id: 4, name: "Classic Leather Loafers", price: 145, rating: 5, img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=500&q=80" },
  { id: 5, name: "Merino Wool Sweater", price: 95, rating: 4, badge: "NEW", img: "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=500&q=80" },
  { id: 6, name: "Tailored Chino Pants", price: 75, rating: 3.5, img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=500&q=80" },
  { id: 7, name: "Canvas Low-Top Sneakers", price: 60, rating: 4.5, img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80" },
  { id: 8, name: "Full-Grain Leather Belt", price: 40, oldPrice: 55, rating: 4, badge: "SALE", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80" },
];

const Men = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="collection-page men-theme">
      <header className="collection-hero">
        <div className="hero-content">
          <span className="breadcrumb">Home / Men</span>
          <h1>Men's Essentials</h1>
          <p>Modern silhouettes designed for the contemporary man.</p>
        </div>
      </header>

      <div className="collection-toolbar">
        <button className="filter-toggle" onClick={() => setIsFilterOpen(true)}>
          <FaFilter /> Filters
        </button>
        <span className="result-count">{menProducts.length} products</span>
        <div className="sort-box">
          <label htmlFor="men-sort">Sort by</label>
          <select id="men-sort" defaultValue="featured">
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
            <label>Category</label>
            <div className="options">
              {["Outerwear", "Shirts", "Denim", "Footwear", "Accessories"].map((c) => (
                <label key={c} className="checkbox-option">
                  <input type="checkbox" /> {c}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Price</label>
            <div className="options">
              {["Under $50", "$50 - $100", "$100 - $200", "$200 & Above"].map((p) => (
                <label key={p} className="checkbox-option">
                  <input type="checkbox" /> {p}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Size</label>
            <div className="size-options">
              {["S", "M", "L", "XL"].map((s) => (
                <button key={s} type="button" className="size-btn">{s}</button>
              ))}
            </div>
          </div>

          <button className="apply-filter-btn" onClick={() => setIsFilterOpen(false)}>
            Apply Filters
          </button>
        </aside>

        {isFilterOpen && <div className="filter-overlay" onClick={() => setIsFilterOpen(false)} />}

        <main className="product-grid">
          {menProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="image-wrapper">
                {product.badge && (
                  <span className={`badge ${product.badge === "SALE" ? "badge-sale" : "badge-new"}`}>
                    {product.badge}
                  </span>
                )}
                <img src={product.img} alt={product.name} />
                <button className="add-btn">Quick Add</button>
              </div>
              <div className="info">
                <h4>{product.name}</h4>
                <div className="rating">{renderStars(product.rating)}</div>
                <div className="price-row">
                  <span className="price">${product.price}</span>
                  {product.oldPrice && <span className="old-price">${product.oldPrice}</span>}
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>

      <div className="load-more-wrap">
        <button className="load-more-btn">Load More</button>
      </div>
    </div>
  );
};

export default Men;
