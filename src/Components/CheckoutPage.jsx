import React, { useState, useCallback } from "react";
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
  CircularProgress,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import {
  isValidCreditCard,
  isValidPhoneNumber,
  isValidFullName,
  isValidAddress,
  isValidCity,
  isValidState,
  isValidZipCode,
  isValidCVV,
  isValidExpiryDate,
} from "../utils/validation";

// Step titles
const steps = ["Delivery Method", "Payment Details", "Review Order"];

// Store locations data
const storeLocations = [
  { id: 1, name: "Downtown Store", address: "123 Main St, Downtown, CA 90001", hours: "Mon-Sat: 10AM-8PM, Sun: 11AM-6PM" },
  { id: 2, name: "Westside Location", address: "456 Ocean Ave, Westside, CA 90002", hours: "Mon-Sat: 9AM-9PM, Sun: 10AM-7PM" },
  { id: 3, name: "Eastside Store", address: "789 Valley Rd, Eastside, CA 90003", hours: "Mon-Sat: 10AM-7PM, Sun: 12PM-6PM" },
];

// DeliveryMethodForm
const DeliveryMethodForm = ({
  formData, setFormData,
  deliveryMethod, setDeliveryMethod,
  handleSubmit,
  selectedStore, setSelectedStore,
  formErrors
}) => {
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [setFormData]
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" sx={{ width: "100%", mb: 3 }}>
        <FormLabel>Choose Delivery Method</FormLabel>
        <RadioGroup value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
          <FormControlLabel value="shipping" control={<Radio />} label="Ship to Address" />
          <FormControlLabel value="pickup" control={<Radio />} label="Store Pickup" />
        </RadioGroup>
      </FormControl>

      {deliveryMethod === "shipping" ? (
        <Grid container spacing={3}>
          {["firstName", "lastName"].map((field, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <TextField
                required fullWidth variant="outlined"
                label={field === "firstName" ? "First Name" : "Last Name"}
                name={field} value={formData[field]} onChange={handleInputChange}
                error={Boolean(formErrors[field])} helperText={formErrors[field]}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <TextField
              required fullWidth label="Address" name="address"
              value={formData.address} onChange={handleInputChange}
              variant="outlined"
              error={Boolean(formErrors.address)} helperText={formErrors.address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required fullWidth label="City" name="city"
              value={formData.city} onChange={handleInputChange}
              variant="outlined"
              error={Boolean(formErrors.city)} helperText={formErrors.city}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required fullWidth label="State" name="state"
              value={formData.state} onChange={handleInputChange}
              variant="outlined"
              error={Boolean(formErrors.state)} helperText={formErrors.state}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required fullWidth label="ZIP Code" name="zipCode"
              value={formData.zipCode} onChange={handleInputChange}
              variant="outlined"
              error={Boolean(formErrors.zipCode)} helperText={formErrors.zipCode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required fullWidth label="Phone Number" name="phoneNumber"
              value={formData.phoneNumber} onChange={handleInputChange}
              variant="outlined"
              error={Boolean(formErrors.phoneNumber)} helperText={formErrors.phoneNumber}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormLabel>Select Store Location</FormLabel>
            <RadioGroup value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
              {storeLocations.map((store) => (
                <Paper key={store.id} elevation={selectedStore === store.id.toString() ? 3 : 1}
                  sx={{ p: 2, mb: 2, cursor: "pointer", border: selectedStore === store.id.toString() ? "2px solid #1976d2" : "none" }}
                  onClick={() => setSelectedStore(store.id.toString())}
                >
                  <FormControlLabel
                    value={store.id.toString()}
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1">{store.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{store.address}</Typography>
                        <Typography variant="body2" color="text.secondary">{store.hours}</Typography>
                      </Box>
                    }
                  />
                </Paper>
              ))}
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required fullWidth label="Phone Number for Pickup" name="phoneNumber"
              value={formData.phoneNumber} onChange={handleInputChange}
              variant="outlined"
              error={Boolean(formErrors.phoneNumber)} helperText={formErrors.phoneNumber}
            />
          </Grid>
        </Grid>
      )}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit" variant="contained" color="primary">Next</Button>
      </Box>
    </form>
  );
};

// PaymentForm
const PaymentForm = ({ formData, setFormData, handleSubmit, handleBack, formErrors }) => {
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [setFormData]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {["cardNumber", "expiryDate", "cvv", "cardholderName"].map((field, i) => (
          <Grid item xs={12} sm={field === "expiryDate" || field === "cvv" ? 6 : 12} key={i}>
            <TextField
              required fullWidth variant="outlined"
              label={
                field === "cardNumber" ? "Card Number" :
                field === "expiryDate" ? "Expiry Date" :
                field === "cvv" ? "CVV" : "Cardholder Name"
              }
              name={field} value={formData[field]} onChange={handleInputChange}
              error={Boolean(formErrors[field])} helperText={formErrors[field]}
              placeholder={field === "expiryDate" ? "MM/YY" : ""}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleBack}>Back</Button>
        <Button type="submit" variant="contained" color="primary">Next</Button>
      </Box>
    </form>
  );
};

// OrderReview
const OrderReview = ({ cartItems, cartTotal, deliveryMethod, selectedStore, handlePlaceOrder, orderComplete, handleBack }) => (
  <div>
    <Typography variant="h6" gutterBottom>Order Summary</Typography>
    {cartItems.map((item) => (
      <Box key={item.id} sx={{ mb: 2 }}>
        <Grid container>
          <Grid item xs={8}><Typography>{item.name}</Typography></Grid>
          <Grid item xs={2}><Typography>x{item.quantity}</Typography></Grid>
          <Grid item xs={2}><Typography>${(item.price * item.quantity).toFixed(2)}</Typography></Grid>
        </Grid>
      </Box>
    ))}
    <Divider sx={{ my: 2 }} />
    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Delivery Details</Typography>
    <Box sx={{ mb: 3 }}>
      <Typography variant="body1">Method: {deliveryMethod === "shipping" ? "Ship to Address" : "Store Pickup"}</Typography>
      {deliveryMethod === "pickup" && selectedStore && (
        <Typography variant="body2" color="text.secondary">
          {storeLocations.find((s) => s.id.toString() === selectedStore)?.name}<br />
          {storeLocations.find((s) => s.id.toString() === selectedStore)?.address}
        </Typography>
      )}
    </Box>
    <Grid container>
      <Grid item xs={10}><Typography variant="h6">Total</Typography></Grid>
      <Grid item xs={2}><Typography variant="h6">${cartTotal.toFixed(2)}</Typography></Grid>
    </Grid>
    <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
      <Button onClick={handleBack}>Back</Button>
      <Button variant="contained" color="primary" onClick={handlePlaceOrder} disabled={orderComplete}>
        {orderComplete ? "Processing..." : "Place Order"}
      </Button>
    </Box>
    {orderComplete && (
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <CircularProgress size={24} sx={{ mr: 1 }} />
        <Typography color="primary">Processing your order...</Typography>
      </Box>
    )}
  </div>
);

// CheckoutPage
const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder } = useOrder();
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState("shipping");
  const [selectedStore, setSelectedStore] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", address: "", city: "", state: "", zipCode: "", phoneNumber: "",
    cardNumber: "", expiryDate: "", cvv: "", cardholderName: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleNext = () => {
    let errors = {};

    if (activeStep === 0) {
      if (deliveryMethod === "pickup" && !selectedStore) {
        errors.selectedStore = "Please select a store for pickup";
      }
    } else if (activeStep === 1) {
      if (deliveryMethod === "shipping") {
        errors = { ...errors, ...validateShippingForm() };
      }
      errors = { ...errors, ...validatePaymentForm() };
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  const handlePlaceOrder = () => {
    const order = {
      items: cartItems,
      total: cartTotal,
      deliveryMethod,
      selectedStore: deliveryMethod === "pickup" ? selectedStore : null,
      shippingAddress: deliveryMethod === "shipping" ? formData : null,
      trackingNumber: `TRK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    };

    addOrder(order);
    clearCart();
    setOrderComplete(true);
    setTimeout(() => {
      navigate("/", { state: { orderSuccess: true, message: "Order placed successfully! Thank you for shopping with Rastro." } });
    }, 1500);
  };

  const validateShippingForm = () => {
    const errors = {};
    if (!isValidFullName(formData.firstName + " " + formData.lastName)) errors.firstName = "Enter a valid first and last name.";
    if (!isValidPhoneNumber(formData.phoneNumber)) errors.phoneNumber = "Enter a valid phone number.";
    if (!isValidAddress(formData.address)) errors.address = "Enter a valid address.";
    if (!isValidCity(formData.city)) errors.city = "Enter a valid city.";
    if (!isValidState(formData.state)) errors.state = "Enter a 2-letter state code.";
    if (!isValidZipCode(formData.zipCode)) errors.zipCode = "Enter a valid ZIP code.";
    return errors;
  };

  const validatePaymentForm = () => {
    const errors = {};
    if (!isValidCreditCard(formData.cardNumber)) errors.cardNumber = "Enter a valid card number.";
    if (!isValidFullName(formData.cardholderName)) errors.cardholderName = "Enter the name as on card.";
    if (!isValidExpiryDate(formData.expiryDate)) errors.expiryDate = "Enter valid expiry date (MM/YY).";
    if (!isValidCVV(formData.cvv)) errors.cvv = "Enter a valid CVV.";
    return errors;
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <DeliveryMethodForm {...{ formData, setFormData, deliveryMethod, setDeliveryMethod, handleSubmit, selectedStore, setSelectedStore, formErrors }} />;
      case 1:
        return <PaymentForm {...{ formData, setFormData, handleSubmit, handleBack, formErrors }} />;
      case 2:
        return <OrderReview {...{ cartItems, cartTotal, deliveryMethod, selectedStore, handlePlaceOrder, orderComplete, handleBack }} />;
      default:
        return "Unknown Step";
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Checkout</Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
      </Paper>
    </Container>
  );
};

export default CheckoutPage;

