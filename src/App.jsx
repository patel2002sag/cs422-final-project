import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Navigation from "./Components/Navigation";
import BrowseItems from "./Components/BrowseItems";
import CartSummary from "./Components/CartSummary";
import CheckoutPage from "./Components/CheckoutPage";
import SignupForm from "./Components/SignupForm";
import AccountInformation from "./Components/AccountInformation";
import OrderHistory from "./Components/OrderHistory";
import OrderTracking from "./Components/OrderTracking";
import ProtectedRoute from "./Components/ProtectedRoute";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";

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
      <CssBaseline />
      <UserProvider>
        <CartProvider>
          <OrderProvider>
            <Router>
              <Navigation />
              <Routes>
                <Route path="/login" element={<SignupForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <BrowseItems />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <CartSummary />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/account"
                  element={
                    <ProtectedRoute>
                      <AccountInformation />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <OrderHistory />
                    </ProtectedRoute>
                  }
                />
                <Route path="/orders/:orderId" element={<OrderTracking />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </OrderProvider>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
