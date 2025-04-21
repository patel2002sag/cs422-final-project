import React, { useState } from "react";
import "../Styles/cartStyles.css";
const CartSummary = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product Item 1",
      price: 25.99,
      quantity: 2,
      totalPrice: 51.98,
      status: "active",
    },
    {
      id: 2,
      name: "Product Item 2",
      price: 14.5,
      quantity: 1,
      totalPrice: 14.5,
      status: "active",
    },
    {
      id: 3,
      name: "Product Item 3",
      price: 32.75,
      quantity: 3,
      totalPrice: 98.25,
      status: "active",
    },
  ]);

  const cartTotal = cartItems
    .filter((item) => item.status === "active")
    .reduce((total, item) => total + item.totalPrice, 0);

  const handleRemoveItem = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, status: "removed" } : item
      )
    );
  };
  
  const handleSaveForLater = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, status: "saved" } : item
      )
    );
  };

  const handleNone = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, status: "active" } : item
      )
    );
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const updatedQuantity = parseInt(newQuantity);
          return {
            ...item,
            quantity: updatedQuantity,
            totalPrice: parseFloat((item.price * updatedQuantity).toFixed(2)),
          };
        }
        return item;
      })
    );
  };

  const handleActionSelect = (id, action) => {
    if (action === "save") {
      handleSaveForLater(id);
    } else if (action === "remove") {
      handleRemoveItem(id);
    }
    else if (action === "none") {
      handleNone(id);
    }
  };

  const handleCheckout = () => {
    window.location.href = "temp"; // change to checkout page
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Shopping Cart</h1>

      <div className="cart-summary">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-header">
              <div className="cart-header-item">Item</div>
              <div className="cart-header-price">Price</div>
              <div className="cart-header-quantity">Quantity</div>
              <div className="cart-header-total">Total</div>
              <div className="cart-header-actions">Actions</div>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <div className="cart-item-image-placeholder"></div>
                  <div className="cart-item-name">{item.name}</div>
                </div>
                <div className="cart-item-price">${item.price.toFixed(2)}</div>
                <div className="cart-item-quantity">
                  <div className="quantity-control">
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                      className="quantity-input"
                    />
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-total">
                  ${item.totalPrice.toFixed(2)}
                </div>
                <div className="cart-item-actions">
                <select
                    className="action-dropdown"
                    defaultValue=""
                    onChange={(e) => handleActionSelect(item.id, e.target.value)}>
                    <option value="" disabled>Select action</option>
                    <option value="save">Save for Later</option>
                    <option value="remove">Remove</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
            ))}

            <div className="cart-footer">
              <div className="cart-total">
                <span className="cart-total-label">Total:</span>
                <span className="cart-total-amount">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
