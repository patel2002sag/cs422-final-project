import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Divider,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const steps = ["Shipping Address", "Payment Details", "Review Order"];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNext();
  };

  const ShippingForm = () => (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth label="First Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth label="Last Name" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField required fullWidth label="Address" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth label="City" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField required fullWidth label="State" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField required fullWidth label="ZIP Code" variant="outlined" />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </form>
  );

  const PaymentForm = () => (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Card Number"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Expiry Date"
            placeholder="MM/YY"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth label="CVV" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Cardholder Name"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleBack}>Back</Button>
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </form>
  );

  const OrderReview = () => (
    <div>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      {cartItems.map((item) => (
        <Box key={item.id} sx={{ mb: 2 }}>
          <Grid container>
            <Grid item xs={8}>
              <Typography>{item.name}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>x{item.quantity}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Grid container>
        <Grid item xs={10}>
          <Typography variant="h6">Total</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">${cartTotal.toFixed(2)}</Typography>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleBack}>Back</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Handle order completion
            navigate("/");
          }}
        >
          Place Order
        </Button>
      </Box>
    </div>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ShippingForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <OrderReview />;
      default:
        return "Unknown step";
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
      </Paper>
    </Container>
  );
};

export default CheckoutPage;
