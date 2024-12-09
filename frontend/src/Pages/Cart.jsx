import React, { useContext, useState } from "react";
import { useCart } from "../utils/GeneralContext";
import { UserContext } from "../utils/GeneralContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";

const Cart = () => {
  const { user } = useContext(UserContext);
  const { cartItems ,setCartItems} = useCart();
 const navigate=useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(""); // Store selected payment method

  //check user is logged in or not
  if (!user) {
    navigate("/login");
    return <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>please login...</Typography>;
  }

  if (cartItems.length === 0) {
    return (
      <>
      <div className="div flex flex-col items-center justify-center">
      <Typography variant="h4" align="center" mt={5}>
        Your cart is empty!
      </Typography>
      <button  onClick={()=>navigate("/products")} className="bg-emerald-300 px-5 py-1 text-center m-8 rounded text-2xl">click</button>
      </div>
      </>
    );
  }

  // Calculate total for individual item
  const calculateItemTotal = (item) => {
    if (item.isPacket) {
      return (item.price * item.quantity).toFixed(2);
    } else {
      return ((item.price / 1000) * item.weightInGrams).toFixed(2);
    }
  };

  // Calculate overall total for the cart
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + parseFloat(calculateItemTotal(item)), 0)
      .toFixed(2);
  };

  // Format weight for display
  const formatWeight = (weightInGrams) => {
    if (weightInGrams === undefined) return "N/A"; // For packet items
    const kg = Math.floor(weightInGrams / 1000);
    const g = weightInGrams % 1000;
    if (kg > 0 && g > 0) return `${kg}kg ${g}g`;
    if (kg > 0) return `${kg}kg`;
    return `${g}g`;
  };

  // Handlers
  const handleCheckoutOpen = () => setCheckoutOpen(true);
  const handleCheckoutClose = () => setCheckoutOpen(false);

  const handlePaymentSubmit = () => {
    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }

    // Prepare the order data dynamically
    const orderData = {
      seller: user._id,
      sellername: user.username,
      orderItems: cartItems.map((item) => ({
        name: item.name,
        product: item.id,
        quantity: item.ispacket?item.quantity:formatWeight(item.weightInGrams),
        price: item.price,
        weightInGrams: item.weightInGrams,
      })),
      totalPrice: calculateTotal(),
      isPaid: true,
      paidAt: new Date(),
      method: paymentMethod,
    };
    const response=axios.post("http://localhost:3000/order/add",orderData,
    {
      withCredentials: true,
    } 
    );
if(response.data){
  console.log(response.data);
}

    // Simulate saving to the database or performing further actions
    alert(`Order placed successfully with ${paymentMethod} payment!`);
    

    // Reset state and close the modal
   
    setPaymentMethod("");
    setCheckoutOpen(false);
    setCartItems([]);
  };

  

  return (
    <Paper
      sx={{
        width: "100%",
        height: "calc(100vh - 138px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Table Container */}
      <TableContainer
        sx={{
          flex: 1,
          overflowX: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total (₹)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id} alignItems="center">
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {item.isPacket
                    ? `₹${item.price.toFixed(2)} (Packet)`
                    : `₹${item.price.toFixed(2)} / Kg`}
                </TableCell>
                <TableCell>
                  {item.isPacket ? "Packet" : formatWeight(item.weightInGrams)}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>₹{calculateItemTotal(item)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Sticky Footer */}
      <Box
        sx={{
          borderTop: "1px solid #ddd",
          backgroundColor: "#f9f9f9",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          bottom: 0,
          width: "100%",
        }}
      >
        <Typography variant="h5">Total: ₹ {calculateTotal()}</Typography>
        <Button variant="contained" color="primary" onClick={handleCheckoutOpen}>
          Checkout
        </Button>
      </Box>

      {/* Checkout Modal */}
      <Dialog open={checkoutOpen} onClose={handleCheckoutClose}>
        <DialogTitle>Select Payment Method</DialogTitle>
        <DialogContent>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
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
    </Paper>
  );
};

export default Cart;
