import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Modal,
  Box,
  TextField,
} from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    _id: "",
    name: "",
    price: 0,
    quantity: 0,
  });

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setProducts(response.data);
      } catch (err) {
        console.error("Fetch products failed:", err);
        setError("Failed to load products. Please try again.");
      }
    };
    fetchProducts();
  }, []);

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/product/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("Product deleted successfully.");
        setProducts(products.filter((product) => product._id !== id));
      }
    } catch (error) {
      console.error("Delete product failed:", error);
      setError("Failed to delete product. Please try again.");
    }
  };

  // Open the modal for editing
  const handleOpen = (product) => {
    console.log("Editing product:", product);
    setCurrentProduct(product);
    setOpen(true);
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
    setCurrentProduct({ _id: "", name: "", price: 0, quantity: 0 });
  };

  // Handle input change in the modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Save the edited product
  const saveProduct = async () => {
    console.log("Saving product:", currentProduct);
    try {
      const response = await axios.put(
        `http://localhost:3000/product/${currentProduct._id}`,
        currentProduct,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === currentProduct._id ? currentProduct : product
          )
        );
        handleClose();
      }
    } catch (error) {
      console.error("Update product failed:", error);
      setError("Failed to update product. Please try again.");
    }
  };

  return (
    <div>
      <Typography variant="h4" className="mb-4 text-center">
        Product Management
      </Typography>

      {error && (
        <Typography
          variant="body1"
          color="error"
          className="text-center mb-4"
        >
          {error}
        </Typography>
      )}

      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Product Name</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Primary Category</strong></TableCell>
              <TableCell><strong>Secondary Category</strong></TableCell>
              <TableCell><strong>Stock</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    {product.isPacket
                      ? `${product.packetPrice} / packets`
                      : `${product.pricePerKg} / Kg`}
                  </TableCell>
                  <TableCell>{product.primaryCategory}</TableCell>
                  <TableCell>{product.secondaryCategory}</TableCell>
                  <TableCell>
                    {product.isPacket
                      ? `${product.quantity} packets`
                      : `${product.quantity} Kg`}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleOpen(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <Typography>No products available.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          className="bg-white rounded-lg shadow-lg p-6"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            
          }}
        >
          <Typography variant="h6" className="pb-4">
            Edit Product
          </Typography>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={currentProduct.name}
            onChange={handleChange}
            
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Price"
            name={currentProduct.isPacket ? "packetPrice" : "pricePerKg"}
            type="number"
            value={currentProduct.isPacket ? currentProduct.packetPrice : currentProduct.pricePerKg}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            type="number"
            value={currentProduct.quantity}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={saveProduct}>
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Products;
