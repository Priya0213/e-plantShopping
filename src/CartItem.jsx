import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const getNumericCost = (cost) => {
    if (typeof cost === "number") {
      return cost;
    }

    return parseFloat(cost.substring(1));
  };

  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach((item) => {
      const itemCost = getNumericCost(item.cost);
      total += itemCost * item.quantity;
    });

    return total;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    const itemCost = getNumericCost(item.cost);
    return itemCost * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>

      <div className="cart-items">
        {cart.length === 0 ? (
          <h3>Your cart is empty.</h3>
        ) : (
          cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                <h3>{item.name}</h3>

                <p>
                  Unit Price: $
                  {getNumericCost(item.cost).toFixed(2)}
                </p>

                <div className="cart-item-quantity">
                  <button onClick={() => handleDecrement(item)}>-</button>

                  <span>{item.quantity}</span>

                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>

                <p>
                  Total: ${calculateTotalCost(item).toFixed(2)}
                </p>

                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-buttons">
        <button onClick={handleContinueShopping}>
          Continue Shopping
        </button>

        <button onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;