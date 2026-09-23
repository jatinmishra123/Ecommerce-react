import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaBolt,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { getProductById } from "../api";
import { useCart } from "../context/useCart";
import "./ProductDetail.css";

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

const categoryMeta = {
  men: { label: "Men", path: "/men" },
  women: { label: "Women", path: "/women" },
  kids: { label: "Kids", path: "/kids" },
  featured: { label: "Home", path: "/" },
};

const careDetails = [
  "Made from premium, carefully sourced materials for lasting quality.",
  "Machine wash cold with like colors; do not bleach.",
  "Tumble dry low or hang dry to preserve shape and fit.",
  "Iron on low heat if needed; avoid direct heat on prints or embellishments.",
];

const sampleReviews = [
  { id: 1, name: "Ishaan Verma", rating: 5, date: "2 weeks ago", text: "Excellent quality and true to size. Fabric feels premium and the fit is exactly as pictured." },
  { id: 2, name: "Meera Nair", rating: 4.5, date: "1 month ago", text: "Really happy with this purchase. Delivery was quick and the packaging was neat." },
  { id: 3, name: "Aditya Rao", rating: 4, date: "1 month ago", text: "Good value for the price. Would definitely recommend to a friend." },
];

const tabs = [
  { key: "description", label: "Description" },
  { key: "details", label: "Details & Care" },
  { key: "reviews", label: "Reviews" },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    getProductById(id)
      .then((found) => {
        setProduct(found);
        setSelectedSize(found?.sizes?.[0] ?? null);
      })
      .catch((err) => console.error("Failed to load product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="product-detail-page not-found"><h2>Loading...</h2></div>;
  }

  if (!product) {
    return (
      <div className="product-detail-page not-found">
        <h2>Product not found</h2>
        <p>The item you're looking for doesn't exist or may have been removed.</p>
        <Link to="/" className="pd-back-link">Return to Home</Link>
      </div>
    );
  }

  const meta = categoryMeta[product.category] || categoryMeta.featured;
  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(product, qty, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, qty, selectedSize);
    navigate("/cart");
  };

  return (
    <div className="product-detail-page">
      <div className="breadcrumb-row">
        <Link to="/">Home</Link> <span>/</span>{" "}
        <Link to={meta.path}>{meta.label}</Link> <span>/</span>{" "}
        <span className="current">{product.name}</span>
      </div>

      <div className="product-detail-layout">
        <div className="product-gallery">
          {product.badge && (
            <span className={`pd-badge ${product.badge === "SALE" ? "pd-badge-sale" : "pd-badge-new"}`}>
              {product.badge}
            </span>
          )}
          <img src={product.img} alt={product.name} />
        </div>

        <div className="product-info-panel">
          <h1>{product.name}</h1>

          {product.rating && (
            <div className="pd-rating">
              <span className="pd-stars">{renderStars(product.rating)}</span>
              <span className="pd-rating-value">({product.rating})</span>
            </div>
          )}

          <div className="pd-price-row">
            <span className="pd-price">${product.price}</span>
            {product.oldPrice && <span className="pd-old-price">${product.oldPrice}</span>}
            {discountPercent && <span className="pd-discount">{discountPercent}% off</span>}
          </div>

          <p className="pd-description">{product.description}</p>

          {product.sizes && (
            <div className="pd-size-select">
              <label>Select Size</label>
              <div className="pd-size-options">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`pd-size-btn ${selectedSize === s ? "selected" : ""}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pd-qty-row">
            <label>Quantity</label>
            <div className="qty-stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                <FaMinus />
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                <FaPlus />
              </button>
            </div>
          </div>

          <div className="pd-actions">
            <button className="pd-add-btn" onClick={handleAddToCart}>
              <FaShoppingBag /> {added ? "Added to Bag!" : "Add to Cart"}
            </button>
            <button className="pd-buy-btn" onClick={handleBuyNow}>
              <FaBolt /> Buy Now
            </button>
          </div>

          <div className="pd-trust-row">
            <div><FaTruck /> Free shipping over $75</div>
            <div><FaUndo /> 30-day easy returns</div>
            <div><FaShieldAlt /> Secure checkout</div>
          </div>
        </div>
      </div>

      {/* Description / Details / Reviews */}
      <div className="pd-info-tabs">
        <div className="pd-tab-headers">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`pd-tab-btn ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pd-tab-content">
          {activeTab === "description" && (
            <div className="pd-tab-description">
              <p>{product.description}</p>
              <ul className="pd-feature-list">
                <li><FaCheckCircle /> Premium quality fabric, built to last</li>
                <li><FaCheckCircle /> Designed for a comfortable, everyday fit</li>
                <li><FaCheckCircle /> Ethically sourced and responsibly manufactured</li>
              </ul>
            </div>
          )}

          {activeTab === "details" && (
            <ul className="pd-care-list">
              {careDetails.map((line) => (
                <li key={line}><FaCheckCircle /> {line}</li>
              ))}
            </ul>
          )}

          {activeTab === "reviews" && (
            <div className="pd-reviews">
              <div className="pd-reviews-summary">
                <span className="pd-reviews-score">{product.rating}</span>
                <div>
                  <div className="pd-stars">{renderStars(product.rating)}</div>
                  <span className="pd-reviews-count">Based on {sampleReviews.length} reviews</span>
                </div>
              </div>
              {sampleReviews.map((review) => (
                <div key={review.id} className="pd-review-card">
                  <div className="pd-review-header">
                    <span className="pd-review-avatar">{review.name.charAt(0)}</span>
                    <div>
                      <h4>{review.name}</h4>
                      <span className="pd-review-date">{review.date}</span>
                    </div>
                    <div className="pd-review-rating">{renderStars(review.rating)}</div>
                  </div>
                  <p>{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
