import React from "react";
import "./Kids.css";

const Kids = () => {
  const kidsProducts = [
    {
      id: 1,
      name: "Cartoon T-Shirt",
      price: "$25",
      img: "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Denim Shorts",
      price: "$30",
      img: "https://images.unsplash.com/photo-1602810318383-e386cc2a7a3c?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "Kids Hoodie",
      price: "$40",
      img: "https://images.unsplash.com/photo-1602810318383-e386cc2a7a3c?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      name: "Colorful Sneakers",
      price: "$55",
      img: "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <div className="collection-page kids-theme">
      <header className="collection-hero">
        <div className="hero-content">
          <h1>Kids Collection</h1>
          <p>Fun, colorful & comfortable styles for kids.</p>
        </div>
      </header>

      <div className="collection-layout">
        <aside className="filter-sidebar">
          <h3>Filters</h3>
          <div className="filter-group">
            <label>Categories</label>
            <div className="options">
              <span>T-Shirts</span>
              <span>Hoodies</span>
              <span>Shoes</span>
            </div>
          </div>
        </aside>

        <main className="product-grid">
          {kidsProducts.map(product => (
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

export default Kids;
