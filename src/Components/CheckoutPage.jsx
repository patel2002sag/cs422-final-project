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
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const steps = ["Delivery Method", "Payment Details", "Review Order"];

// Store locations data
const storeLocations = [
  {
    id: 1,
    name: "Downtown Store",
    address: "123 Main St, Downtown, CA 90001",
    hours: "Mon-Sat: 10AM-8PM, Sun: 11AM-6PM",
  },
  {
    id: 2,
    name: "Westside Location",
    address: "456 Ocean Ave, Westside, CA 90002",
    hours: "Mon-Sat: 9AM-9PM, Sun: 10AM-7PM",
  },
  {
    id: 3,
    name: "Eastside Store",
    address: "789 Valley Rd, Eastside, CA 90003",
    hours: "Mon-Sat: 10AM-7PM, Sun: 12PM-6PM",
  },
];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState("shipping");
  const [selectedStore, setSelectedStore] = useState("");

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

  const DeliveryMethodForm = () => (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" sx={{ width: "100%", mb: 3 }}>
        <FormLabel component="legend">Choose Delivery Method</FormLabel>
        <RadioGroup
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value)}
        >
          <FormControlLabel
            value="shipping"
            control={<Radio />}
            label="Ship to Address"
          />
          <FormControlLabel
            value="pickup"
            control={<Radio />}
            label="Store Pickup"
          />
        </RadioGroup>
      </FormControl>

      {deliveryMethod === "shipping" ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="First Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Last Name"
              variant="outlined"
            />
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
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Phone Number"
              variant="outlined"
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl component="fieldset" sx={{ width: "100%" }}>
              <FormLabel component="legend">Select Store Location</FormLabel>
              <RadioGroup
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
              >
                {storeLocations.map((store) => (
                  <Paper
                    key={store.id}
                    elevation={selectedStore === store.id.toString() ? 3 : 1}
                    sx={{
                      p: 2,
                      mb: 2,
                      cursor: "pointer",
                      border:
                        selectedStore === store.id.toString()
                          ? "2px solid #1976d2"
                          : "none",
                    }}
                    onClick={() => setSelectedStore(store.id.toString())}
                  >
                    <FormControlLabel
                      value={store.id.toString()}
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="subtitle1">
                            {store.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {store.address}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {store.hours}
                          </Typography>
                        </Box>
                      }
                    />
                  </Paper>
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Phone Number for Pickup"
              variant="outlined"
            />
          </Grid>
        </Grid>
      )}

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

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Delivery Details
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1">
          Method:{" "}
          {deliveryMethod === "shipping" ? "Ship to Address" : "Store Pickup"}
        </Typography>
        {deliveryMethod === "pickup" && selectedStore && (
          <Typography variant="body2" color="text.secondary">
            {
              storeLocations.find(
                (store) => store.id.toString() === selectedStore
              )?.name
            }
            <br />
            {
              storeLocations.find(
                (store) => store.id.toString() === selectedStore
              )?.address
            }
          </Typography>
        )}
      </Box>

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
        return <DeliveryMethodForm />;
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
