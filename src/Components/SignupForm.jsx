import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Tab,
  Tabs,
  Grid,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add authentication logic here
    navigate("/");
  };

  const LoginForm = () => (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
          >
            Sign In
          </Button>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Link href="#" variant="body2" onClick={() => setActiveTab(1)}>
            Don't have an account? Sign up
          </Link>
        </Grid>
      </Grid>
    </form>
  );

  const RegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth label="First Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth label="Last Name" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
          >
            Sign Up
          </Button>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Link href="#" variant="body2" onClick={() => setActiveTab(0)}>
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </form>
  );

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to Furniture Store
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
        </Box>
        {activeTab === 0 ? <LoginForm /> : <RegisterForm />}
      </Paper>
    </Container>
  );
};

export default SignupForm;
