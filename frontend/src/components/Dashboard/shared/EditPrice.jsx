import React, { useState, useEffect } from "react";
import { Typography, Modal, Box, TextField, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const EditPrice = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [error, setError] = useState("");
  const Base_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${Base_URL}/product`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setProducts(response.data); // Populate products
      } catch (err) {
        // console.error("Fetch products failed:", err);
        setError("Failed to load products. Please try again.");
      }
    };
    fetchProducts();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearch("");
    setSelectedProduct(null);
    setNewPrice("");
    setError("");
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);

    // Filter products based on the search term
    const matchedProduct = products.find((prod) =>
      prod.name.toLowerCase().includes(searchValue)
    );

    {searchValue==""?
    setSelectedProduct(null):
    setSelectedProduct(matchedProduct)
    } // Update the selected product
  };

  const handlePriceUpdate = async () => {
    if (selectedProduct && newPrice) {
      try {
        const response = await axios.put(
          `${Base_URL}/product/${selectedProduct._id}`,
          {
            [selectedProduct.isPacket ? "packetPrice" : "pricePerKg"]: newPrice,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          alert("Price updated successfully!");
          handleClose(); // Close the modal after success
        }
      } catch (error) {
        // console.error("Error updating price:", error);
        setError("Failed to update price. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className='grid grid-rows-2 cursor-pointer' onClick={handleOpen}>
        <Typography variant="h6">Edit Price</Typography>
        <div className="total flex justify-center p-3 items-center">
          <Typography variant="h5" onClick={handleOpen}><EditIcon fontSize='large' /></Typography>
        </div>
      </div>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white shadow-lg rounded-lg"
          style={{ width: 400 }}
        >
          <Typography variant="h6" className="mb-4">
            Edit Price
          </Typography>
          <TextField
            label="Search Product"
            variant="outlined"
            fullWidth
            value={search}
            onChange={handleSearch}
            className="mb-4"
          />
          {selectedProduct ? (
            <>
              <Typography variant="body1" className="mb-2">
                <strong>Selected Product:</strong> {selectedProduct.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" className="mb-2">
                <strong>Old Price:</strong> {selectedProduct.isPacket ? selectedProduct.packetPrice : selectedProduct.pricePerKg}
              </Typography>
              <TextField
                label="New Price"
                type="number"
                variant="outlined"
                fullWidth
                name={selectedProduct.isPacket ? "packetPrice" : "pricePerKg"}
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="mb-4"
              />
              {error && (
                <Typography variant="body2" color="error" className="mb-4">
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handlePriceUpdate}
                fullWidth
              >
                Update Price
              </Button>
            </>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No product found. Try searching for another product.
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default EditPrice;
