import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useCart } from "../../utils/GeneralContext";

const AddProductModal = ({ open, onClose, product }) => {
  const [selectedWeight, setSelectedWeight] = useState(""); // For predefined weight
  const [customWeight, setCustomWeight] = useState(""); // For custom weight input
  const { addToCart } = useCart();
  // for packet items
  const[quantities, setQuantity] = useState(1);

  const handleAddProduct = () => {
    const finalWeight = customWeight || selectedWeight;
    
  
    // Convert weight into grams
    const weightInGrams = product.isPacket ?product.weight  :finalWeight.includes("kg")
    ? parseFloat(finalWeight) * 1000
    : parseFloat(finalWeight.replace("g", ""));
  
    // Prepare the cart item in the desired format
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.isPacket ? product.packetPrice : product.pricePerKg, // Use packetPrice for packets, pricePerKg for weight-based
      image: product.image, // Product image
      description: product.description, // Product description
      weightInGrams: weightInGrams,
      isPacket: product.isPacket,
      quantity: product.isPacket ? quantities:1, // Default quantity is 1
    };
  
    // Add the formatted item to the cart
    addToCart(cartItem);
    console.log("Product added to cart:", cartItem);
    onClose();
  };
  

  return (
    <Modal
      open={open} // Pass the `open` prop to control visibility
      onClose={onClose} // Pass the `onClose` handler for closing the modal
      aria-labelledby="add-product-modal"
      aria-describedby="add-product-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="add-product-modal" variant="h6" component="h2" sx={{ mb: 2 }}>
          Add Product
        </Typography>

        {/* Select Weight */}
       {product.isPacket ? <Box sx={{ mb: 2 }}>
          <Button onClick={() => setQuantity("1") } variant="outlined" color="primary" sx={{ mr: 1 }}>
            1
          </Button>
          <Button onClick={() => setQuantity("2")} variant="outlined" color="primary" sx={{ mr: 1 }}>
            2
          </Button>
          <Button onClick={() => setQuantity("3")} variant="outlined" color="primary" sx={{ mr: 1 }}>
            3
          </Button>
          <Button onClick={() => setQuantity("4")} variant="outlined" color="primary" sx={{ mr: 1 }}>
            4
          </Button>
        </Box>  :<Box sx={{ mb: 2 }}>
          <Button onClick={() => setSelectedWeight("250g")} variant="outlined" color="primary" sx={{ mr: 1 }}>
            250g
          </Button>
          <Button onClick={() => setSelectedWeight("500g")} variant="outlined" color="primary" sx={{ mr: 1 }}>
            500g
          </Button>
          <Button onClick={() => setSelectedWeight("1kg")} variant="outlined" color="primary" sx={{ mr: 1 }}>
            1kg
          </Button>
          <Button onClick={() => setSelectedWeight("2kg")} variant="outlined" color="primary" sx={{ mr: 1 }}>
            2kg
          </Button>
        </Box> }
        

        {/* Custom Weight */}
        {product.isPacket ? <Typography></Typography> : <TextField
          label="Custom Weight (e.g., 1.5kg)"
          fullWidth
          value={customWeight}
          onChange={(e) => {
            setCustomWeight(e.target.value);
            setSelectedWeight(""); // Clear predefined weight when custom weight is entered
          }}
          sx={{ mb: 2 }}
        />}

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} variant="contained" color="primary">
            Add Product
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

AddProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired, // Ensure product prop is passed
};

export default AddProductModal;
