import React, { useState, useEffect } from "react"; 
import "../Styles/Checkoutpage.css";
//1
export default function CheckoutPage() {
  const [fulfillment, setFulfillment] = useState("ship");
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
  });
  const [payment, setPayment] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  // Automatic loading of locally saved user data
  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const user = JSON.parse(savedUserData);
      setInfo({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        address: user.address || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["firstName", "lastName", "address", "email", "phone"].includes(name)) {
      setInfo({ ...info, [name]: value });
    } else {
      setPayment({ ...payment, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("The payment was successful!");
  };

  return (
    <div className="checkout-page">
      <h1 className="checkout-header">Information</h1>

      <div className="fulfillment-group">
        <button
          type="button"
          className={`fulfillment-button${fulfillment === "ship" ? " active" : ""}`}
          onClick={() => setFulfillment("ship")}
        >
          Ship
        </button>
        <button
          type="button"
          className={`fulfillment-button${fulfillment === "pickup" ? " active" : ""}`}
          onClick={() => setFulfillment("pickup")}
        >
          Pick Up
        </button>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="checkout-row">
          <input
            className="checkout-input"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={info.firstName}
            onChange={handleChange}
            required
          />
          <input
            className="checkout-input"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={info.lastName}
            onChange={handleChange}
            required
          />
        </div>

        {fulfillment === "ship" && (
          <input
            className="checkout-input"
            type="text"
            name="address"
            placeholder="Address"
            value={info.address}
            onChange={handleChange}
            required
          />
        )}

        <div className="checkout-row">
          <input
            className="checkout-input"
            type="email"
            name="email"
            placeholder="Email"
            value={info.email}
            onChange={handleChange}
            required
          />
          <input
            className="checkout-input"
            type="tel"
            name="phone"
            placeholder="Phone"
            value={info.phone}
            onChange={handleChange}
            required
          />
        </div>

        <h2 className="checkout-header">Payment</h2>
        <input
          className="checkout-input"
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={payment.cardNumber}
          onChange={handleChange}
          required
        />
        <input
          className="checkout-input"
          type="text"
          name="cardHolder"
          placeholder="Name of Holder"
          value={payment.cardHolder}
          onChange={handleChange}
          required
        />

        <div className="checkout-row">
          <input
            className="checkout-input"
            type="text"
            name="expiryDate"
            placeholder="Expiry Date (MM/YY)"
            value={payment.expiryDate}
            onChange={handleChange}
            required
          />
          <input
            className="checkout-input"
            type="password"
            name="cvv"
            placeholder="CVV"
            value={payment.cvv}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="checkout-button">
          Checkout
        </button>
      </form>
    </div>
  );
}


