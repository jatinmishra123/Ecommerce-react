import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaLock, FaTag } from "react-icons/fa";
import { useCart } from "../context/useCart";
import { placeOrder } from "../api";
import "./Cart.css";

const FREE_SHIPPING_THRESHOLD = 200;

const Cart = () => {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const applyPromo = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    setPromoMessage(
      promoCode.trim().toUpperCase() === "SEASON20"
        ? "Promo code applied! 20% off will reflect at checkout."
        : "Invalid promo code."
    );
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setCheckingOut(true);
    setCheckoutError("");

    try {
      await placeOrder({
        customerName,
        customerEmail,
        amount: total,
        status: "pending",
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.qty
        }))
      });
      clearCart();
      navigate("/", { state: { orderPlaced: true } });
    } catch (err) {
      setCheckoutError(err.message || "Failed to place order. Please try again.");
    } finally {
      setCheckingOut(false);
    }
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
            <div key={`${item.id}-${item.size}`} className="cart-item">
              <Link to={`/product/${item.id}`}>
                <img src={item.img} alt={item.name} />
              </Link>
              <div className="cart-item-details">
                <Link to={`/product/${item.id}`} className="cart-item-name">
                  <h4>{item.name}</h4>
                </Link>
                {item.size && <span className="variant">Size: {item.size}</span>}
                <div className="qty-stepper">
                  <button onClick={() => updateQty(item.id, item.size, -1)} aria-label="Decrease quantity">
                    <FaMinus />
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.size, 1)} aria-label="Increase quantity">
                    <FaPlus />
                  </button>
                </div>
              </div>
              <div className="cart-item-price">
                <span className="line-total">${(item.price * item.qty).toFixed(2)}</span>
                <button className="remove-item-btn" onClick={() => removeFromCart(item.id, item.size)}>
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

          {!showCheckoutForm ? (
            <button className="checkout-btn" onClick={() => setShowCheckoutForm(true)}>
              Proceed to Checkout
            </button>
          ) : (
            <form className="promo-form" style={{ flexDirection: "column", alignItems: "stretch", gap: "0.5rem" }} onSubmit={handlePlaceOrder}>
              <input
                type="text"
                placeholder="Your name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Your email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
              />
              <button type="submit" className="checkout-btn" disabled={checkingOut}>
                {checkingOut ? "Placing order..." : `Place Order - $${total.toFixed(2)}`}
              </button>
            </form>
          )}
          {checkoutError && <p className="promo-message">{checkoutError}</p>}

          <p className="secure-note"><FaLock /> Secure checkout &bull; Easy 30-day returns</p>

          <Link to="/" className="continue-link">Continue Shopping</Link>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
