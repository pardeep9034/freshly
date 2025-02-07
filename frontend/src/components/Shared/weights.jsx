import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useCart } from "../../utils/GeneralContext";

const AddProductModal = ({ open, onClose, product }) => {
  const [selectedWeight, setSelectedWeight] = useState(""); // For predefined weight
  const [customWeight, setCustomWeight] = useState(""); // For custom weight input
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState(1); // For packet items

  const handleAddProduct = () => {
    if (!selectedWeight && !customWeight) {
      setError("Please select a weight");
      return;
    }
    const finalWeight = customWeight || selectedWeight;

    const weightInGrams = product.isPacket
      ? product.weight
      : finalWeight.includes("kg")
      ? parseFloat(finalWeight) * 1000
      : parseFloat(finalWeight.replace("g", ""));

    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.isPacket ? product.packetPrice : product.pricePerKg,
      image: product.image,
      description: product.description,
      weightInGrams: weightInGrams,
      isPacket: product.isPacket,
      quantity: product.isPacket ? quantities : 1,
    };

    addToCart(cartItem);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
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
          bgcolor: "#dce7c8",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="add-product-modal"
          variant="h6"
          component="h2"
          sx={{
            mb: 2,
            textAlign: "center",
            color: "#102000",
            fontWeight: "600",
          }}
        >
          Add Product
        </Typography>
        <Typography className="m-2 pb-4 text-red-700 text-center">{error}</Typography>

        {/* Select Weight */}
        {product.isPacket ? (
          <Box sx={{ mb: 2 }}>
            {[1, 2, 3, 4].map((quantity) => (
              <Button
                key={quantity}
                onClick={() => setQuantities(quantity)}
                variant={quantities === quantity ? "contained" : "outlined"}
                sx={{
                  mr: 1,
                  bgcolor: quantities === quantity ? "#102000" : "#586249",
                  color: "#ffffff",
                  "&:hover": {
                    bgcolor: "#15310b",
                    color: "#ffffff",
                  },
                }}
              >
                {quantity}
              </Button>
            ))}
          </Box>
        ) : (
          <Box sx={{ mb: 2 }}>
            {["250g", "500g", "1kg", "2kg"].map((weight) => (
              <Button
                key={weight}
                onClick={() => setSelectedWeight(weight)}
                // variant={selectedWeight === weight ? "contained" : "outlined"}
                
                sx={{
                  mr: 1,
                  border: "1px solid #102000",
                  bgcolor: selectedWeight === weight ? "#102000" : "#586249",
                  color:"#ffffff",
                  "&:hover": {
                    bgcolor: "#15310b",
                    color: "#ffffff",
                  },
                }}
              >
                {weight}
              </Button>
            ))}
          </Box>
        )}

        {/* Custom Weight */}
        {product.isPacket ? null : (
          <TextField
            label="Custom Weight (e.g., 1.5kg)"
            fullWidth
            value={customWeight}
            onChange={(e) => {
              setCustomWeight(e.target.value);
              setSelectedWeight(""); // Clear predefined weight when custom weight is entered
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#102000" },
                
                "&:hover fieldset": { borderColor: "#15310b" },
                "&.Mui-focused fieldset": { borderColor: "#102000" },
              },
              "& .MuiInputLabel-root": { color: "#102000" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#102000" },
            }}
          />
        )}

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button onClick={onClose} variant="outlined" sx={{ border:"1px solid #102000", bgcolor: "#ffdad6", color: "#410002" ,transition: "all 0.2s " }}>
            Cancel
          </Button>
          <Button onClick={handleAddProduct} variant="contained" sx={{ bgcolor: "#102000", color: "#fff" ,transition: "all 0.2s " }}>
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
  product: PropTypes.object.isRequired,
};

export default AddProductModal;
