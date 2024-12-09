import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { useCart } from "../../utils/GeneralContext";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
} from "@mui/material";

const ShowOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null); // Track selected order for modal
  const {orders,setOrders} = useCart(); // Store orders

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/order");
        setOrders(response.data);
      } catch (error) {
        console.error("Fetch orders failed:", error);
      }
    };
    fetchOrders();
  }, []);

  const openOrderDetails = (order) => setSelectedOrder(order); // Open modal
  const closeOrderDetails = () => setSelectedOrder(null); // Close modal

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

      {/* Orders Table */}
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">Order ID</th>
            <th className="p-2">Seller</th>
            <th className="p-2">Total</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order._id}
              className="border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => openOrderDetails(order)}
            >
              <td className="p-2">ORD00{index + 1}</td>
              <td className="p-2">{order.sellername}</td>
              <td className="p-2">₹ {order.totalPrice}</td>
              <td className="p-2">{/* Display time as "2 hours ago", "Yesterday", etc. */}
          {order.paidAt
            ? formatDistanceToNow(parseISO(order.paidAt), { addSuffix: true })
            : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Order Details */}
      <Modal open={!!selectedOrder} onClose={closeOrderDetails}>
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
            py: 2,
            px: 2,
          }}
        >
          <button
            onClick={closeOrderDetails}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          >
            <FaTimes size={20} />
          </button>
          {selectedOrder ? (
            <>
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
                    <strong>Order ID:</strong> ORD00{orders.indexOf(selectedOrder) + 1}
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
                    <strong>Total Amount:</strong> ₹{selectedOrder.totalPrice.toFixed(2)}
                  </Typography>
                  <Typography className="text-gray-700 font-medium">
                    <strong>Payment type:</strong> {selectedOrder.method || "N/A"}
                  </Typography>
                </Box>

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
                          <TableCell className="text-white font-bold">Item Name</TableCell>
                          <TableCell className="text-white font-bold">Quantity</TableCell>
                          <TableCell className="text-white font-bold">Price (₹)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedOrder.orderItems?.map((item, index) => (
                          <TableRow
                            key={index}
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

export default ShowOrders;
