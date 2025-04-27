import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Alert,
} from "@mui/material";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  isValidEmail,
  isValidPassword,
  isValidFullName,
  isValidPhoneNumber,
} from "../utils/validation";

const SignupForm = () => {
  const navigate = useNavigate();
  const { login, signup } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    major: "",
    academicYear: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const errors = {};

    if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!isValidPassword(formData.password)) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
      if (!isValidFullName(formData.fullName)) {
        errors.fullName = "Please enter your full name (first and last name)";
      }
      if (!isValidPhoneNumber(formData.phone)) {
        errors.phone = "Please enter a valid phone number (e.g., 123-456-7890)";
      }
      if (!formData.major) {
        errors.major = "Please select your major";
      }
      if (!formData.academicYear) {
        errors.academicYear = "Please select your academic year";
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (isLogin) {
        // Handle login
        await login(formData.email, formData.password);
        navigate("/");
      } else {
        // Handle signup
        const userData = {
          email: formData.email,
          fullName: formData.fullName,
          phone: formData.phone,
          major: formData.major,
          academicYear: formData.academicYear,
        };
        await signup(userData);
        setSuccessMessage("Account created successfully! Please log in.");
        setIsLogin(true);
        // Clear form data except email
        const email = formData.email;
        setFormData({
          email,
          password: "",
          confirmPassword: "",
          fullName: "",
          phone: "",
          major: "",
          academicYear: "",
        });
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 500,
          width: "100%",
          mx: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {isLogin ? "Login" : "Sign Up"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
              />
            </Grid>

            {!isLogin && (
              <>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={!!formErrors.confirmPassword}
                    helperText={formErrors.confirmPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    error={!!formErrors.fullName}
                    helperText={formErrors.fullName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={!!formErrors.phone}
                    helperText={formErrors.phone}
                    placeholder="123-456-7890"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Major"
                    name="major"
                    value={formData.major}
                    onChange={handleInputChange}
                    error={!!formErrors.major}
                    helperText={formErrors.major}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Academic Year"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    error={!!formErrors.academicYear}
                    helperText={formErrors.academicYear}
                  />
                </Grid>
              </>
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>

          <Button
            fullWidth
            onClick={() => {
              setIsLogin(!isLogin);
              setFormErrors({});
              setError("");
            }}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignupForm;
