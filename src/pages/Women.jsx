import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaFilter, FaTimes, FaHeart } from "react-icons/fa";
import { getProducts } from "../api";
import { useCart } from "../context/useCart";
import "./Women.css";

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

const Women = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then((all) => setWomenProducts(all.filter((p) => p.category === "women")))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  const toggleWishlist = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToBag = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0]);
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
            <Link key={product.id} to={`/product/${product.id}`} className="product-card">
              <div className="image-wrapper">
                {product.badge && (
                  <span className={`badge ${product.badge === "SALE" ? "badge-sale" : "badge-new"}`}>
                    {product.badge}
                  </span>
                )}
                <img src={product.img} alt={product.name} />
                <div
                  className={`wishlist-icon ${wishlist.includes(product.id) ? "active" : ""}`}
                  onClick={(e) => toggleWishlist(e, product.id)}
                >
                  <FaHeart />
                </div>
                <button className="add-btn-women" onClick={(e) => handleAddToBag(e, product)}>Add to Bag</button>
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

export default Women;
