import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import { useOrder } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TimelineIcon from "@mui/icons-material/Timeline";

const OrderHistory = () => {
  const { orders } = useOrder();
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "info";
      case "shipped":
        return "primary";
      case "delivered":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return <InventoryIcon />;
      case "shipped":
        return <LocalShippingIcon />;
      case "delivered":
        return <CheckCircleIcon />;
      case "cancelled":
        return <CancelIcon />;
      default:
        return <InventoryIcon />;
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const getOrderSteps = (order) => {
    const steps = [
      {
        label: "Order Placed",
        completed: true,
        date: order.createdAt,
      },
      {
        label: "Processing",
        completed: ["processing", "shipped", "delivered"].includes(
          order.status.toLowerCase()
        ),
        date: order.createdAt,
      },
      {
        label: "Shipped",
        completed: ["shipped", "delivered"].includes(
          order.status.toLowerCase()
        ),
        date: order.estimatedDelivery,
      },
      {
        label: "Delivered",
        completed: order.status.toLowerCase() === "delivered",
        date: order.estimatedDelivery,
      },
    ];

    if (order.status.toLowerCase() === "cancelled") {
      steps.push({
        label: "Cancelled",
        completed: true,
        date: order.updatedAt,
      });
    }

    return steps;
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <ReceiptIcon fontSize="large" />
        Order History
      </Typography>
      {orders.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            No orders found
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate("/")}
          >
            Start Shopping
          </Button>
        </Paper>
      ) : (
        orders.map((order) => (
          <Paper key={order.id} sx={{ p: 3, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <ReceiptIcon />
                  Order #{order.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Placed on {formatDate(order.createdAt)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
                <Chip
                  icon={getStatusIcon(order.status)}
                  label={order.status}
                  color={getStatusColor(order.status)}
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Estimated Delivery: {formatDate(order.estimatedDelivery)}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <LocalShippingIcon />
                  Delivery Method
                </Typography>
                <Typography variant="body2">
                  {order.deliveryMethod === "pickup"
                    ? `Store Pickup - ${order.selectedStore}`
                    : "Shipping"}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <LocationOnIcon />
                  Tracking Number
                </Typography>
                <Typography variant="body2">{order.trackingNumber}</Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <InventoryIcon />
                Items
              </Typography>
              {order.items.map((item) => (
                <Grid container key={item.id} sx={{ mb: 1 }}>
                  <Grid item xs={8}>
                    <Typography variant="body2">{item.name}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2">x{item.quantity}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <TimelineIcon />
                Order Progress
              </Typography>
              <Stepper orientation="vertical">
                {getOrderSteps(order).map((step, index) => (
                  <Step
                    key={index}
                    active={!step.completed}
                    completed={step.completed}
                  >
                    <StepLabel>{step.label}</StepLabel>
                    <StepContent>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(step.date)}
                      </Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h6">
                Total: ${order.total.toFixed(2)}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<TimelineIcon />}
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                Track Order
              </Button>
            </Box>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default OrderHistory;
