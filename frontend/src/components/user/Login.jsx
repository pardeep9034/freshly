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
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
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
      const endpoint =
        role === "manager" ? "/user/manager/login" : "/user/employee/login";

      const response = await axios.post(
        `${API_BASE_URL}${endpoint}`,
        { phoneno, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response) {
        setUser(response.data.user);
        navigate(role === "manager" ? "/dashboard/main" : "/products");
      }
    } catch (err) {
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
        backgroundColor: "#dce7c8",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          width: 400,
          backgroundColor: "#d4e7c5",
          color: "#15310b",
        }}
      >
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
    color="success"
    value={role}
    onChange={(e) => setRole(e.target.value)}
    required
    sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#4c662b" },
        "&:hover fieldset": { borderColor: "#3a5223" },
        "&.Mui-focused fieldset": { borderColor: "#4c662b" },
      },
      "& .MuiSelect-select": {
        backgroundColor: "#eaf4dc",
      },
      "& .MuiSelect-icon": {
        color: "#4c662b",
      },
    }}
    SelectProps={{
      MenuProps: {
        PaperProps: {
          sx: {
            backgroundColor: "#dce7c8", // Background color of the dropdown
            "& .MuiMenuItem-root": {
              "&:hover": {
                backgroundColor: "#c9dbb1", // Hover effect for dropdown options
              },
              "&.Mui-selected": {
                backgroundColor: "#b7c99e", // Background for selected option
                "&:hover": {
                  backgroundColor: "#a9bc8f", // Hover effect for selected option
                },
              },
            },
          },
        },
      },
    }}
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
  type="text"
  value={phoneno}
  onChange={(e) => setPhoneNo(e.target.value)}
  required
  sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#4c662b",
      },
      "&:hover fieldset": {
        borderColor: "#6a874a",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4c662b",
      },
      backgroundColor: role === "manager" ? "#f0f4ff" : "#eaf4dc", // Manager and Employee colors
    },
    "& .MuiInputLabel-root": {
      color: "#4c662b",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#6a874a",
    },
  }}
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#4c662b",
                    },
                    "&:hover fieldset": {
                      borderColor: "#6a874a",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4c662b",
                    },
                    backgroundColor: role === "manager" ? "#f0f4ff" : "#eaf4dc", // Manager and Employee colors
                  },
                  "& .MuiInputLabel-root": {
                    color: "#4c662b",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#6a874a",
                  },
                }}
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
                sx={{ backgroundColor: "#4c662b", color: "#ffffff" }}
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
