import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Select,
  MenuItem,
  IconButton,
  TextField,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartSummary = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, addToCart } =
    useCart();
  const navigate = useNavigate();
  const [savedItems, setSavedItems] = useState([]);

  const handleQuantityChange = (productId, currentQuantity, increment) => {
    const newQuantity = currentQuantity + increment;
    if (newQuantity >= 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleActionChange = (event, item) => {
    const action = event.target.value;
    switch (action) {
      case "save-later":
        setSavedItems([...savedItems, item]);
        removeFromCart(item.id);
        break;
      case "delete":
        removeFromCart(item.id);
        break;
      default:
        break;
    }
  };

  const handleMoveToCart = (savedItem) => {
    // Remove from saved items
    setSavedItems(savedItems.filter((item) => item.id !== savedItem.id));
    // Add back to cart with quantity 1
    addToCart({ ...savedItem, quantity: 1 });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0 && savedItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      backgroundColor: "grey.200",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">{item.name}</Typography>
                </TableCell>
                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity, -1)
                      }
                      size="small"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      size="small"
                      value={item.quantity}
                      InputProps={{ readOnly: true }}
                      sx={{ width: 60 }}
                    />
                    <IconButton
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity, 1)
                      }
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <Select
                    size="small"
                    defaultValue=""
                    onChange={(e) => handleActionChange(e, item)}
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="" disabled>
                      Select Action
                    </MenuItem>
                    <MenuItem value="save-later">Save for Later</MenuItem>
                    <MenuItem value="delete">Delete</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {savedItems.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Saved for Later
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {savedItems.map((savedItem) => (
                  <TableRow key={savedItem.id}>
                    <TableCell>
                      <Box
                        component="img"
                        src={savedItem.image}
                        alt={savedItem.name}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          backgroundColor: "grey.200",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {savedItem.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      ${savedItem.price.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleMoveToCart(savedItem)}
                      >
                        Move to Cart
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </Button>
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="h5" gutterBottom>
            Total: ${cartTotal.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CartSummary;
