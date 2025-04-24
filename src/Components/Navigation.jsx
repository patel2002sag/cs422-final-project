import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Box,
  Button,
  Typography,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navigation = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/login");
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Button
          color="inherit"
          onClick={() => navigate("/")}
          sx={{ fontSize: "1.2rem" }}
        >
          Rastro
        </Button>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit" onClick={handleProfileClick}>
            <PersonIcon />
          </IconButton>

          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
