import React, { useEffect, useState } from "react";
import "./AnnouncementBar.css";

const messages = [
  "🪔 Diwali Dhamaka Sale — Flat 50% OFF Sitewide!",
  "🎉 Dussehra Special — Extra 20% OFF on Your First Order",
  "✨ Festive Season Offer — Use Code FESTIVE30 at Checkout",
  "🚚 Free Shipping on Orders Above $75, This Festive Week Only!",
];

const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="announcement-bar">
      <span key={index} className="announcement-text">
        {messages[index]}
      </span>
    </div>
  );
};

export default AnnouncementBar;
