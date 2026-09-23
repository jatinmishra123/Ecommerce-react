import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaFilter, FaTimes } from "react-icons/fa";
import { getProducts } from "../api";
import { useCart } from "../context/useCart";
import "./Men.css";

const renderStars = (rating) => {
  if (!rating) return null;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} />);
    else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} />);
    else stars.push(<FaRegStar key={i} />);
  }
  return stars;
};

const Men = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [menProducts, setMenProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then((all) => setMenProducts(all.filter((p) => p.category === "men")))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0]);
  };

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
            <Link key={product.id} to={`/product/${product.id}`} className="product-card">
              <div className="image-wrapper">
                {product.badge && (
                  <span className={`badge ${product.badge === "SALE" ? "badge-sale" : "badge-new"}`}>
                    {product.badge}
                  </span>
                )}
                <img src={product.img} alt={product.name} />
                <button className="add-btn" onClick={(e) => handleQuickAdd(e, product)}>Quick Add</button>
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

export default Men;
