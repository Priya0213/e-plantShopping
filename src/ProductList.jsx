import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "./CartSlice";

const plantsArray = [
  {
    category: "Aromatic Plants",
    plants: [
      {
        name: "Lavender",
        image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec",
        description: "A fragrant plant known for its calming aroma.",
        cost: 15,
      },
      {
        name: "Rosemary",
        image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662",
        description: "An aromatic herb commonly used in cooking.",
        cost: 12,
      },
      {
        name: "Mint",
        image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1",
        description: "A refreshing aromatic herb with a cooling fragrance.",
        cost: 10,
      },
    ],
  },
  {
    category: "Medicinal Plants",
    plants: [
      {
        name: "Aloe Vera",
        image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921",
        description: "A medicinal succulent commonly used for skin care.",
        cost: 18,
      },
      {
        name: "Tulsi",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5",
        description: "A medicinal herb traditionally valued for wellness.",
        cost: 14,
      },
      {
        name: "Chamomile",
        image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11",
        description: "A flowering herb often used for relaxation.",
        cost: 16,
      },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();

  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (product) => {
    dispatch(addItem(product));

    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  return (
    <div className="product-grid">
      {plantsArray.map((category, index) => (
        <div key={index}>
          <h1>
            <div>{category.category}</div>
          </h1>

          <div className="product-list">
            {category.plants.map((plant, plantIndex) => (
              <div className="product-card" key={plantIndex}>
                <img
                  className="product-image"
                  src={plant.image}
                  alt={plant.name}
                />

                <div className="product-title">{plant.name}</div>

                <div className="product-description">
                  {plant.description}
                </div>

                <div className="product-cost">${plant.cost}</div>

                <button
                  className="product-button"
                  onClick={() => handleAddToCart(plant)}
                  disabled={addedToCart[plant.name]}
                >
                  {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;