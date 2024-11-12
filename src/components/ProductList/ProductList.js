import React, { useState } from "react";
import productItems from "../../data/ProductItems";
import ModelViewer from "../ModelViewer/ModelViewer";
import "./ProductList.css";
import bedroomImg from "../../assets/bedroom.png";
import decorImg from "../../assets/floor-lamp.png";
import livingRoomImg from "../../assets/living-room.png";
import officeImg from "../../assets/working-man.png";

const categories = [
  { name: "Bedroom", image: bedroomImg },
  { name: "Decor", image: decorImg },
  { name: "Living Room", image: livingRoomImg },
  { name: "Office", image: officeImg },
];

const ProductList = ({ addToWishlist, wishlist, removeFromWishlist }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? productItems.filter(item => item.category === selectedCategory)
    : productItems;

  return (
    <div className="shop-page">
      {/* Parallax Banner Section */}
      <section className="parallax-banner">
        <div className="parallax-text">
          <h1>Up to 50% off</h1>
          <p>Hundreds of styles available</p>
          <button
            className="shop-now-button"
            onClick={() => setSelectedCategory(null)} // Reset to show all products
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Category Section */}
      <h2 className="shop-title">Shop by Category</h2>
      <div className="category-grid">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className="category-card"
            onClick={() => setSelectedCategory(category.name)}
          >
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
            <p>
              {productItems.filter(item => item.category === category.name).length}{" "}
              PRODUCTS
            </p>
          </div>
        ))}
      </div>

      {/* Product List */}
      <section className="product-list">
        {filteredProducts.map((item, idx) => (
          <ModelViewer
            key={idx}
            item={item}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
            removeFromWishlist={removeFromWishlist}
          />
        ))}
      </section>
    </div>
  );
};

export default ProductList;
