import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../utils/GeneralContext";   

const LoginPage = () => {
  const [phoneno, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee"); // Default role is 'employee'
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {  setUser,user } = useContext(UserContext);
 
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:3000"; // Centralized API URL

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error state and validate inputs
    setError("");
    if (!phoneno || !password) {
      setError("Phone number and password are required.");
      return;
    }

    if (!/^\d{10}$/.test(phoneno)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      // Determine the endpoint based on role
      const endpoint =
        role === "manager" ? "/user/manager/login" : "/user/employee/login";

      // Send login request
      const response = await axios.post(
        `${API_BASE_URL}${endpoint}`,
        { phoneno, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Include cookies
        }
      );

      // Handle successful login
      if (response) {
        // Update user context with the logged-in user
        setUser(response.data.user);

        
        

        navigate(role === "manager" ? "/dashboard/main" : "/products");

      }
    } catch (err) {
      // Capture server or network error
      const errorMessage =
        err.response?.data?.message || "Unable to login. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Paper elevation={3} sx={{ padding: 3, width: 400 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          <Grid container spacing={2}>
            {/* Role Selection */}
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Role"
                variant="outlined"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
              </TextField>
            </Grid>

            {/* Phone Number Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone No."
                variant="outlined"
                type="tel"
                value={phoneno}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </Grid>

            {/* Password Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>

            {/* Error Message */}
            {error && (
              <Grid item xs={12}>
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              </Grid>
            )}

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
