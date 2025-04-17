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
    },
    {
      id: 2,
      name: "Product Item 2",
      price: 14.5,
      quantity: 1,
      totalPrice: 14.5,
    },
    {
      id: 3,
      name: "Product Item 3",
      price: 32.75,
      quantity: 3,
      totalPrice: 98.25,
    },
  ]);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleSaveForLater = (id) => {
    console.log(`Item ${id} saved for later`);
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
                  <button
                    className="save-later-btn"
                    onClick={() => handleSaveForLater(item.id)}
                  >
                    Save for Later
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
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
              <button className="checkout-btn">Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
