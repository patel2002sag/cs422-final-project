import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { useOrder } from "../context/OrderContext";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById } = useOrder();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6" color="error">
            Order not found
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate("/orders")}
          >
            Back to Orders
          </Button>
        </Paper>
      </Container>
    );
  }

  const steps = [
    {
      label: "Order Placed",
      description: `Order #${order.id} was placed on ${format(
        new Date(order.createdAt),
        "MMM dd, yyyy"
      )}`,
    },
    {
      label: "Processing",
      description: "Your order is being processed",
    },
    {
      label: order.deliveryMethod === "pickup" ? "Ready for Pickup" : "Shipped",
      description:
        order.deliveryMethod === "pickup"
          ? `Your order is ready for pickup at ${order.selectedStore}`
          : `Your order has been shipped with tracking number ${order.trackingNumber}`,
    },
    {
      label: "Delivered",
      description: `Estimated delivery date: ${format(
        new Date(order.estimatedDelivery),
        "MMM dd, yyyy"
      )}`,
    },
  ];

  const getActiveStep = () => {
    switch (order.status.toLowerCase()) {
      case "processing":
        return 1;
      case "shipped":
        return 2;
      case "delivered":
        return 3;
      case "cancelled":
        return -1;
      default:
        return 0;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Order Tracking
        </Typography>
        <Typography variant="h6" gutterBottom>
          Order #{order.id}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Stepper activeStep={getActiveStep()} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Delivery Details
            </Typography>
            <Typography variant="body1">
              Method:{" "}
              {order.deliveryMethod === "pickup" ? "Store Pickup" : "Shipping"}
            </Typography>
            {order.deliveryMethod === "pickup" ? (
              <Typography variant="body1">
                Store: {order.selectedStore}
              </Typography>
            ) : (
              <Typography variant="body1">
                Tracking Number: {order.trackingNumber}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Typography variant="body1">
              Total Items:{" "}
              {order.items.reduce((acc, item) => acc + item.quantity, 0)}
            </Typography>
            <Typography variant="body1">
              Total Amount: ${order.total.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={() => navigate("/orders")}>
            Back to Orders
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderTracking;
