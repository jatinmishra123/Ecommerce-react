import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaLock, FaTag } from "react-icons/fa";
import "./Cart.css";

const initialCart = [
  {
    id: 1,
    name: "Tailored Wool Coat",
    size: "M",
    color: "Charcoal",
    price: 180,
    qty: 1,
    img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "Selvedge Denim Jeans",
    size: "32",
    color: "Indigo",
    price: 89,
    qty: 1,
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&q=80",
  },
];

const FREE_SHIPPING_THRESHOLD = 200;

const Cart = () => {
  const [cart, setCart] = useState(initialCart);
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPromo = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    setPromoMessage(
      promoCode.trim().toUpperCase() === "SEASON20"
        ? "Promo code applied! 20% off will reflect at checkout."
        : "Invalid promo code."
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 12;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <FaShoppingBag className="empty-icon" />
          <h2>Your bag is empty</h2>
          <p>Looks like you haven't added anything to your bag yet.</p>
          <Link to="/" className="continue-shopping-btn">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <span className="breadcrumb">Home / Shopping Bag</span>
        <h1>Shopping Bag <span>({totalItems} item{totalItems > 1 ? "s" : ""})</span></h1>
      </div>

      {remainingForFreeShipping > 0 ? (
        <div className="shipping-banner">
          Add <strong>${remainingForFreeShipping}</strong> more to unlock <strong>free shipping</strong>!
          <div className="shipping-progress">
            <div
              className="shipping-progress-fill"
              style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="shipping-banner success">
          🎉 You've unlocked <strong>free shipping</strong>!
        </div>
      )}

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.name} />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <span className="variant">Size: {item.size} &bull; Color: {item.color}</span>
                <div className="qty-stepper">
                  <button onClick={() => updateQty(item.id, -1)} aria-label="Decrease quantity">
                    <FaMinus />
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} aria-label="Increase quantity">
                    <FaPlus />
                  </button>
                </div>
              </div>
              <div className="cart-item-price">
                <span className="line-total">${(item.price * item.qty).toFixed(2)}</span>
                <button className="remove-item-btn" onClick={() => removeItem(item.id)}>
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <aside className="order-summary">
          <h3>Order Summary</h3>

          <form className="promo-form" onSubmit={applyPromo}>
            <FaTag className="promo-icon" />
            <input
              type="text"
              placeholder="Promo code (try SEASON20)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button type="submit">Apply</button>
          </form>
          {promoMessage && <p className="promo-message">{promoMessage}</p>}

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="checkout-btn">Proceed to Checkout</button>
          <p className="secure-note"><FaLock /> Secure checkout &bull; Easy 30-day returns</p>

          <Link to="/" className="continue-link">Continue Shopping</Link>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
