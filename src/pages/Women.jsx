import React from "react";
import "./Women.css";

const Women = () => {
  const womenProducts = [
    { id: 1, name: "Silk Wrap Dress", price: "$155", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Cashmere Turtleneck", price: "$195", img: "https://images.unsplash.com/photo-1583845187103-6256f16f562a?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "High-Rise Tailored Pants", price: "$110", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Leather Crossbody Bag", price: "$220", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80" },
  ];

  return (
    <div className="collection-page women-theme">
      <header className="collection-hero-women">
        <div className="hero-content">
          <h1>Women's Edit</h1>
          <p>Timeless pieces for every occasion.</p>
        </div>
      </header>

      <div className="collection-layout">
        <aside className="filter-sidebar">
          <h3>Collection</h3>
          <div className="filter-group">
            <div className="options">
              <span>Dresses</span>
              <span>Knitwear</span>
              <span>Accessories</span>
            </div>
          </div>
        </aside>

        <main className="product-grid">
          {womenProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="image-wrapper">
                <img src={product.img} alt={product.name} />
                <div className="wishlist-icon">♥</div>
                <button className="add-btn-women">Add to Bag</button>
              </div>
              <div className="info">
                <h4>{product.name}</h4>
                <span className="price">{product.price}</span>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Women;
