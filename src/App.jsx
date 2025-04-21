import "./Styles/App.css";
import "./Styles/accountStyles.css";
import { useState } from "react";
import CartSummary from "./Components/CartSummary";
import SignupForm from "./Components/SignupForm";
import AccountInformation from "./Components/AccountInformation";
import CheckoutPage from "./Components/CheckoutPage";

function App() {
  const [currentView, setCurrentView] = useState("account");

  const renderView = () => {
    switch (currentView) {
      case "signup":
        return <SignupForm />;
      case "cart":
        //return <CartSummary />;
        return <CartSummary setCurrentView={setCurrentView}/>;
      case "account":
        return <AccountInformation />;
      case "checkout":
        return <CheckoutPage />;
      default:
        return <AccountInformation />;
    }
  };

  return (
    <>
      <nav className="app-nav">
        <button onClick={() => setCurrentView("signup")}>Signup</button>
        <button onClick={() => setCurrentView("cart")}>Cart</button>
        <button onClick={() => setCurrentView("account")}>Account</button>
        <button onClick={() => setCurrentView("checkout")}>Checkout</button>
      </nav>
      {renderView()}
    </>
  );
}

export default App;
