import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaFilter, FaTimes, FaHeart } from "react-icons/fa";
import "./Women.css";

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} />);
    else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} />);
    else stars.push(<FaRegStar key={i} />);
  }
  return stars;
};

const womenProducts = [
  { id: 1, name: "Silk Wrap Dress", price: 155, rating: 5, badge: "NEW", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=500&q=80" },
  { id: 2, name: "Cashmere Turtleneck", price: 195, rating: 4.5, img: "https://images.unsplash.com/photo-1583845187103-6256f16f562a?auto=format&fit=crop&w=500&q=80" },
  { id: 3, name: "High-Rise Tailored Pants", price: 110, oldPrice: 140, rating: 4, badge: "SALE", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=500&q=80" },
  { id: 4, name: "Leather Crossbody Bag", price: 220, rating: 4.5, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80" },
  { id: 5, name: "Floral Midi Skirt", price: 85, rating: 4, badge: "NEW", img: "https://images.unsplash.com/photo-1583496661160-fb5886a13d1f?auto=format&fit=crop&w=500&q=80" },
  { id: 6, name: "Satin Blouse", price: 70, rating: 3.5, img: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=500&q=80" },
  { id: 7, name: "Ankle Strap Heels", price: 130, oldPrice: 165, rating: 4.5, badge: "SALE", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80" },
  { id: 8, name: "Statement Drop Earrings", price: 45, rating: 5, img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80" },
];

const Women = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="collection-page women-theme">
      <header className="collection-hero-women">
        <div className="hero-content">
          <span className="breadcrumb">Home / Women</span>
          <h1>Women's Edit</h1>
          <p>Timeless pieces for every occasion.</p>
        </div>
      </header>

      <div className="collection-toolbar">
        <button className="filter-toggle" onClick={() => setIsFilterOpen(true)}>
          <FaFilter /> Filters
        </button>
        <span className="result-count">{womenProducts.length} products</span>
        <div className="sort-box">
          <label htmlFor="women-sort">Sort by</label>
          <select id="women-sort" defaultValue="featured">
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
            <label>Collection</label>
            <div className="options">
              {["Dresses", "Knitwear", "Bottoms", "Footwear", "Accessories"].map((c) => (
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
              {["XS", "S", "M", "L"].map((s) => (
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
          {womenProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="image-wrapper">
                {product.badge && (
                  <span className={`badge ${product.badge === "SALE" ? "badge-sale" : "badge-new"}`}>
                    {product.badge}
                  </span>
                )}
                <img src={product.img} alt={product.name} />
                <div
                  className={`wishlist-icon ${wishlist.includes(product.id) ? "active" : ""}`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <FaHeart />
                </div>
                <button className="add-btn-women">Add to Bag</button>
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

export default Women;
