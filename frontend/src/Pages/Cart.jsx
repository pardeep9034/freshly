import React, { useContext, useState } from "react";
import { useCart } from "../utils/GeneralContext";
import { UserContext } from "../utils/GeneralContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import PrintableBill from "../components/Shared/BillFormat";

const Cart = () => {
  const Base_URL = import.meta.env.VITE_BACKEND_URL;
  const { user } = useContext(UserContext);
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [billOpen, setBillOpen] = useState(false);
  const [custumerInfo, setCustumerInfo] = useState({ name: "", contact: "" });

  if (!user) {
    navigate("/login");
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
        Please login...
      </Typography>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Typography variant="h4" align="center" mt={5}>
          Your cart is empty!
        </Typography>
        <button
          onClick={() => navigate("/products")}
          className="bg-emerald-300 px-5 py-1 text-center m-8 rounded text-2xl"
        >
          Click
        </button>
      </div>
    );
  }

  const calculateItemTotal = (item) => {
    return item.isPacket
      ? (item.price * item.quantity).toFixed(2)
      : ((item.price / 1000) * item.weightInGrams).toFixed(2);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + parseFloat(calculateItemTotal(item)), 0)
      .toFixed(2);
  };

  const formatWeight = (weightInGrams) => {
    if (weightInGrams === undefined) return "N/A";
    const kg = Math.floor(weightInGrams / 1000);
    const g = weightInGrams % 1000;
    return kg > 0 && g > 0 ? `${kg}kg ${g}g` : kg > 0 ? `${kg}kg` : `${g}g`;
  };

  const handleCheckoutOpen = () => setCheckoutOpen(true);
  const handleCheckoutClose = () => setCheckoutOpen(false);

  const handlePaymentSubmit = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }

    const orderData = {
      seller: user._id,
      sellername: user.username,
      orderItems: cartItems.map((item) => ({
        name: item.name,
        product: item.id,
        quantity: item.isPacket ? item.quantity : formatWeight(item.weightInGrams),
        price: item.price,
        weightInGrams: item.weightInGrams,
      })),
      totalPrice: calculateTotal(),
      isPaid: true,
      paidAt: new Date(),
      method: paymentMethod,
    };

    try {
      const response = await axios.post(`${Base_URL}/order/add`, orderData, {
        withCredentials: true,
      });
      if (response.data) {
        alert(`Order placed successfully with ${paymentMethod} payment!`);
        setCartItems([]);
      }
    } catch (error) {
      // console.error("Error placing order:", error);
      alert("Order failed. Please try again.");
    } finally {
      setPaymentMethod("");
      setCheckoutOpen(false);
    }
  };

  return (
    <Paper sx={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column",backgroundColor:"#f9faef" }} className="bg-surface">
      <TableContainer sx={{ flex: 1, overflowX: "auto" }}>
        <Table >
          <TableHead >
            <TableRow className="bg-primary" >
              <TableCell sx={{color:"#ffffff",fontWeight:"600",fontSize:"1rem"}}>Name</TableCell>
              <TableCell sx={{color:"#ffffff",fontWeight:"600",fontSize:"1rem"}}>Price</TableCell>
              {/* <TableCell sx={{color:"#ffffff",fontWeight:"600",fontSize:"1rem"}}>Weight</TableCell> */}
              <TableCell sx={{color:"#ffffff",fontWeight:"600",fontSize:"1rem"}}>Quantity</TableCell>
              <TableCell sx={{color:"#ffffff",fontWeight:"600",fontSize:"1rem"}}>Total (₹)</TableCell>
              <TableCell sx={{color:"#ffffff",fontWeight:"600",fontSize:"1rem"}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id} alignItems="center"className=" bg-surface">
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.isPacket ? `₹${item.price.toFixed(2)} (Packet)` : `₹${item.price.toFixed(2)} / Kg`}</TableCell>
                <TableCell>{item.isPacket ? item.quantity : formatWeight(item.weightInGrams)}</TableCell>
                {/* <TableCell>{item.quantity}</TableCell> */}
                <TableCell>₹{calculateItemTotal(item)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#f44336", color: "white" }}
                    onClick={() => setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== item.id))}
                  >
                    <DeleteIcon  />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ borderTop: "1px solid #ddd", backgroundColor: "#dce7c8", p: 2, display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "fixed", bottom:"0",width:"100%",zIndex:"100"
       }}>
        <Typography variant="h5">Total: ₹ {calculateTotal()}</Typography>
        <div className="flex flex-row gap-3">
          <Button variant="contained" sx={
            {backgroundColor:"#1a1c16", color:"white"}
          } onClick={() => setBillOpen(true)}>
            Send Bill
          </Button>
          <Button variant="contained" sx={{
            backgroundColor: "#4caf50",
          }} onClick={handleCheckoutOpen}>
            Checkout
          </Button>
        </div>
      </Box>

      <Dialog open={checkoutOpen} onClose={handleCheckoutClose}>
        <DialogTitle>Select Payment Method</DialogTitle>
        <DialogContent>
          <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
            <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCheckoutClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePaymentSubmit} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={billOpen} onClose={() => setBillOpen(false)}>
        <DialogTitle>Send Bill</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            type="text"
            required
            value={custumerInfo.name}
            onChange={(e) => setCustumerInfo((prev) => ({ ...prev, name: e.target.value }))}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Contact Number"
            variant="outlined"
            type="text"
            value={custumerInfo.contact}
            required
            onChange={(e) => setCustumerInfo((prev) => ({ ...prev, contact: e.target.value }))}
            margin="dense"
          />
           <div className="flex justify-center"><PrintableBill name={custumerInfo.name}/></div>
        </DialogContent>
       
        <DialogActions>
          <Button onClick={() => setBillOpen(false)} color="secondary">
            Close
          </Button>
          <Button
            onClick={() => {
              if (!custumerInfo.name || !custumerInfo.contact) {
                alert("Please fill in all fields.");
              } else {
                alert("Printing...");
              }
            }}
            variant="contained"
            color="primary"
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Cart;
