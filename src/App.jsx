import "./Styles/App.css";
import "./Styles/accountStyles.css"; // Import the new account styles
import { useState } from "react";
import CartSummary from "./Components/CartSummary";
import SignupForm from "./Components/SignupForm";
import AccountInformation from "./Components/AccountInformation"; // Import the new component

function App() {
  const [currentView, setCurrentView] = useState("account"); // Default view set to account

  // Function to switch between different views
  const renderView = () => {
    switch (currentView) {
      case "signup":
        return <SignupForm />;
      case "cart":
        return <CartSummary />;
      case "account":
        return <AccountInformation />;
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
      </nav>
      {renderView()}
    </>
  );
}

export default App;