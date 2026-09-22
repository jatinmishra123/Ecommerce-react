import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaFilter, FaTimes } from "react-icons/fa";
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

const kidsProducts = [
  { id: 1, name: "Cartoon T-Shirt", price: 25, rating: 4.5, badge: "NEW", img: "https://images.unsplash.com/photo-1519457851262-4e653eee931e?auto=format&fit=crop&w=500&q=80" },
  { id: 2, name: "Denim Shorts", price: 30, rating: 4, img: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=500&q=80" },
  { id: 3, name: "Kids Hoodie", price: 40, oldPrice: 55, rating: 5, badge: "SALE", img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=500&q=80" },
  { id: 4, name: "Colorful Sneakers", price: 55, rating: 4.5, img: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=500&q=80" },
  { id: 5, name: "Dinosaur Print Pajama Set", price: 28, rating: 4, badge: "NEW", img: "https://images.unsplash.com/photo-1522771753035-54ae3ff30fef?auto=format&fit=crop&w=500&q=80" },
  { id: 6, name: "Rainbow Tutu Dress", price: 35, rating: 5, badge: "NEW", img: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=500&q=80" },
  { id: 7, name: "Superhero Backpack", price: 32, oldPrice: 42, rating: 4.5, badge: "SALE", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80" },
  { id: 8, name: "Velcro Strap Sandals", price: 22, rating: 3.5, img: "https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&w=500&q=80" },
];

const Kids = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="collection-page kids-theme">
      <header className="collection-hero">
        <div className="hero-content">
          <span className="breadcrumb">Home / Kids</span>
          <h1>Kids Collection</h1>
          <p>Fun, colorful & comfortable styles for kids.</p>
        </div>
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
            <label>Category</label>
            <div className="options">
              {["T-Shirts", "Hoodies", "Shoes", "Dresses", "Accessories"].map((c) => (
                <label key={c} className="checkbox-option">
                  <input type="checkbox" /> {c}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Price</label>
            <div className="options">
              {["Under $30", "$30 - $50", "$50 & Above"].map((p) => (
                <label key={p} className="checkbox-option">
                  <input type="checkbox" /> {p}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Age Group</label>
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
          {kidsProducts.map((product) => (
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

export default Kids;
