import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Header = () => {
  const navigationLinks = [
    { label: "Home", Path: "/" }, // Home as landing page
    { label: "Shop", Path: "/shop" }, // Shop page
    { label: "WishList", Path: "/wishlist" },
    { label: "Feedback", Path: "/feedback" },
    { label: "Contact", Path: "/contact" },
    { label: "SignIn", Path: "/sign-in" }
  ];

  const [showMobileSidebar, setShowMobileSidebar] = useState(true);
  const handleItemClick = () => {
    setShowMobileSidebar(true);
  };

  return (
    <header>
      <nav>
        <div className="navtop">
          <h3>
            <Link
              to="/"
              onClick={() => showMobileSidebar && setShowMobileSidebar(false)}
              className="project-title"
            >
              AR Webstore
            </Link>
          </h3>
          <div
            className={`mobile-menu-icon ${!showMobileSidebar ? "active" : ""}`}
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
          >
            {Array.from({ length: 2 + showMobileSidebar }, (_, i) => (
              <div
                key={i}
                className={i === 0 ? "firstbar" : i === 1 ? "secondbar" : "lastbar"}
              />
            ))}
          </div>
        </div>
      </nav>
      <ul className={`desktop-nav ${showMobileSidebar ? "" : "show"}`}>
        {navigationLinks.map((items, key) => (
          <li key={key} onClick={handleItemClick}>
            <Link to={items.Path}>{items.label}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
