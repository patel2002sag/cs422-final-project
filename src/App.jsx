import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { CartProvider } from "./context/CartContext";
import Navigation from "./Components/Navigation";
import BrowseItems from "./Components/BrowseItems";
import "./Styles/App.css";
import "./Styles/accountStyles.css";
import CartSummary from "./Components/CartSummary";
import SignupForm from "./Components/SignupForm";
import AccountInformation from "./Components/AccountInformation";
import CheckoutPage from "./Components/CheckoutPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <Router>
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Navigation />
            <main style={{ flexGrow: 1, backgroundColor: "#f5f5f5" }}>
              <Routes>
                <Route path="/" element={<BrowseItems />} />
                <Route path="/cart" element={<CartSummary />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/profile" element={<AccountInformation />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<SignupForm />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
