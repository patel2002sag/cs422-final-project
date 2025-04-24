import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import Navigation from "./Components/Navigation";
import BrowseItems from "./Components/BrowseItems";
import CartSummary from "./Components/CartSummary";
import CheckoutPage from "./Components/CheckoutPage";
import SignupForm from "./Components/SignupForm";
import AccountInformation from "./Components/AccountInformation";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";

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
      <UserProvider>
        <CartProvider>
          <Router>
            <Navigation />
            <Routes>
              <Route path="/" element={<BrowseItems />} />
              <Route path="/cart" element={<CartSummary />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/login" element={<SignupForm />} />
              <Route path="/profile" element={<AccountInformation />} />
            </Routes>
          </Router>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
