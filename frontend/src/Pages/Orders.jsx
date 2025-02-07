import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useContext } from "react";
import { UserContext } from "../utils/GeneralContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const Base_URL = import.meta.env.VITE_BACKEND_URL;
  const {user}=useContext(UserContext);
  const navigate=useNavigate();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [openOrderDetails, setOpenOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);

  // Function to open modal with order details
  const handleOpen = (order, index) => {
    setSelectedOrder(order);
    setSelectedOrderIndex(index);
    setOpenOrderDetails(true);
  };

  // Function to close modal
  const handleClose = () => {
    setOpenOrderDetails(false);
    setSelectedOrder(null);
  };

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${Base_URL}/order`, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        
        setOrders(response.data);
      } catch (error) {
        // console.error("Fetch orders failed:", error);
        setError(error);
      }
    };
    fetchOrders();
  }, []);

  if (!user) {
    navigate("/login");
    return <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>please login...</Typography>;
  }

  return (
    
    <div className="p-4 bg-surface min-h-screen">
      {/* Page Header */}
      

      {/* Orders Table */}
      <TableContainer component={Paper} className="shadow-md " >
        <Table>
          <TableHead>
            <TableRow className="bg-primary" alienItems="center">
              <TableCell  sx={{color:"white",fontSize:"1rem",fontWeight:"600"}}>Order ID</TableCell>
              <TableCell  sx={{color:"white",fontSize:"1rem",fontWeight:"600"}}>Seller</TableCell>
              <TableCell  sx={{color:"white",fontSize:"1rem",fontWeight:"600"}}>Total Price</TableCell>
              <TableCell  sx={{color:"white",fontSize:"1rem",fontWeight:"600"}}>Order Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice().reverse().map((order, index) => (
              <TableRow
                key={order._id}
                className="hover:bg-secondary_container transition duration-300 cursor-pointer bg-surface"
                onClick={() => handleOpen(order, index)}
                alienItems="center"
              >
                <TableCell>ORD00{orders.length-index}</TableCell>
                <TableCell>{order.sellername || "N/A"}</TableCell>
                <TableCell>₹{order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  {order.paidAt
                    ? formatDistanceToNow(parseISO(order.paidAt), {
                        addSuffix: true,
                      })
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Error Message */}
      {error && (
        <Typography variant="body1" className="text-red-600 mt-4 text-center">
          Failed to load orders. Please try again later.
        </Typography>
      )}

      {/* Order Details Modal */}
      <Modal open={openOrderDetails} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 400,
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 2,
          }}
        >
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          >
            <FaTimes size={20} />
          </button>

          {selectedOrder ? (
            <>
              {/* Order Details */}
              <Box className="p-4 space-y-4">
                <Typography
                  variant="h5"
                  className="font-semibold text-blue-600 text-center"
                  gutterBottom
                >
                  Order Details
                </Typography>

                <Box className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
                  <Typography className="text-gray-700 font-medium">
                    <strong>Order ID:</strong> ORD00{orders.length-selectedOrderIndex}
                  </Typography>
                  <Typography className="text-gray-700 font-medium">
                    <strong>Seller:</strong> {selectedOrder.sellername || "N/A"}
                  </Typography>
                  <Typography className="text-gray-700 font-medium">
                    <strong>Order Date:</strong>{" "}
                    {selectedOrder.paidAt
                      ? new Date(selectedOrder.paidAt).toLocaleString()
                      : "N/A"}
                  </Typography>
                  <Typography className="text-gray-700 font-medium">
                    <strong>Total Amount:</strong> ₹
                    {selectedOrder.totalPrice.toFixed(2)}
                  </Typography>
                  <Typography className="text-gray-700 font-medium">
                    <strong>Payment Type:</strong> {selectedOrder.method}
                  </Typography>
                </Box>

                {/* Items Ordered */}
                <Box className="bg-white p-4 rounded-lg shadow-md">
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-800 mb-3 text-center"
                  >
                    Items Ordered
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow className="bg-gray-400">
                          <TableCell className="text-white font-bold">
                            Item Name
                          </TableCell>
                          <TableCell className="text-white font-bold">
                            Quantity
                          </TableCell>
                          <TableCell className="text-white font-bold">
                            Price (₹)
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedOrder.orderItems.map((item, idx) => (
                          <TableRow
                            key={idx}
                            className="hover:bg-gray-100 transition duration-300"
                          >
                            <TableCell className="font-medium text-gray-800">
                              {item.name}
                            </TableCell>
                            <TableCell className="font-medium text-gray-800">
                              {item.quantity}
                            </TableCell>
                            <TableCell className="font-medium text-gray-800">
                              ₹{item.price.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </>
          ) : (
            <Typography variant="body1" className="text-center">
              No order details available.
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Orders;
