import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  History as HistoryIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleIconClick = (path) => {
    if (path === "/cart") {
      navigate("/cart");
    } else if (path === "/orders") {
      navigate("/orders");
    } else if (path === "/account") {
      navigate("/account");
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Rastro
        </Typography>

        {user ? (
          <>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                color="inherit"
                onClick={() => handleIconClick("/cart")}
              >
                <Badge badgeContent={cartItems.length} color="error">
                  <CartIcon />
                </Badge>
              </IconButton>

              <IconButton
                color="inherit"
                onClick={() => handleIconClick("/orders")}
              >
                <HistoryIcon />
              </IconButton>

              <IconButton
                color="inherit"
                onClick={() => handleIconClick("/account")}
              >
                <PersonIcon />
              </IconButton>

              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Box>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
