import React from "react";
import "./Men.css";

const Men = () => {
  const menProducts = [
    { id: 1, name: "Urban Bomber Jacket", price: "$129", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Slim Fit Oxford Shirt", price: "$65", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Selvedge Denim Jeans", price: "$89", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Classic Leather Loafers", price: "$145", img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=500&q=80" },
  ];

  return (
    <div className="collection-page men-theme">
      <header className="collection-hero">
        <div className="hero-content">
          <h1>Men's Essentials</h1>
          <p>Modern silhouettes designed for the contemporary man.</p>
        </div>
      </header>

      <div className="collection-layout">
        <aside className="filter-sidebar">
          <h3>Filters</h3>
          <div className="filter-group">
            <label>Categories</label>
            <div className="options">
              <span>Outerwear</span>
              <span>Shirts</span>
              <span>Denim</span>
            </div>
          </div>
        </aside>

        <main className="product-grid">
          {menProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="image-wrapper">
                <img src={product.img} alt={product.name} />
                <button className="add-btn">Quick Add</button>
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

export default Men;
