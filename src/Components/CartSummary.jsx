import React from "react";
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
  Card,
  CardContent,
  CardMedia,
  Divider,
  FormControl,
  InputLabel,
  TablePagination,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
} from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import { useSavedItems } from "../context/SavedItemsContext";
import { useNavigate } from "react-router-dom";

const CartSummary = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, addToCart } =
    useCart();
  const { savedItems, addToSavedItems, removeFromSavedItems, moveToCart } =
    useSavedItems();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, currentQuantity, increment) => {
    const newQuantity = currentQuantity + increment;
    if (newQuantity >= 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleSaveForLater = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      addToSavedItems(item);
      removeFromCart(item.id);
    }
  };

  const handleMoveToCart = (itemId) => {
    const item = savedItems.find((item) => item.id === itemId);
    if (item) {
      addToCart(moveToCart(item));
    }
  };

  const handleDelete = (itemId) => {
    removeFromCart(itemId);
  };

  const handleDeleteSaved = (itemId) => {
    removeFromSavedItems(itemId);
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
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 80, height: 80, objectFit: "cover" }}
                      image={item.image}
                      alt={item.name}
                    />
                    <Box>
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.category}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                  >
                    <Tooltip title="Save for Later">
                      <IconButton
                        size="small"
                        onClick={() => handleSaveForLater(item.id)}
                      >
                        <BookmarkBorderIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
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
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {savedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <CardMedia
                          component="img"
                          sx={{ width: 80, height: 80, objectFit: "cover" }}
                          image={item.image}
                          alt={item.name}
                        />
                        <Box>
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.category}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 1,
                        }}
                      >
                        <Tooltip title="Move to Cart">
                          <IconButton
                            size="small"
                            onClick={() => handleMoveToCart(item.id)}
                          >
                            <BookmarkIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteSaved(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
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
