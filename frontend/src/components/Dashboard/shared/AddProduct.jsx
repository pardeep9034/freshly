import React, { useState } from 'react';
import { Modal, Typography, Box, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, MenuItem } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { FaTimes } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProduct = () => {
  const [open, setOpen] = useState(false);
 const navigate = useNavigate();
  // Open and close modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      pricePerKg: '', // For weight-based items
      packetPrice: '', // For packet-based items
      quantity: '',
      description: '',
      primaryCategory: '',
      secondaryCategory: '',
      isPacket: "false", // Default to non-packet item (use boolean)
      weight: '', // Only applicable for packets
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Product name is required'),
      pricePerKg: Yup.number()
        .typeError('Price per Kg must be a number')
        .when('isPacket', {
          isPacket: "false", // Check for boolean value
          then: Yup.number().required('Price per Kg is required for weight-based products'),
        }),
      packetPrice: Yup.number()
        .typeError('Packet price must be a number')
        .when('isPacket', {
          isPacket: "true", // Check for boolean value
          then: Yup.number().required('Packet price is required for packet-based products'),
        }),
      quantity: Yup.number().typeError('Quantity must be a number').required('Product quantity is required'),
      description: Yup.string().required('Product description is required'),
      primaryCategory: Yup.string().required('Primary category is required'),
      secondaryCategory: Yup.string().required('Secondary category is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const response = await axios.post('http://localhost:3000/product/add', values, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        if(response.status === 403){
          navigate('/login')
        }
        console.log('Product added:', response.data);
        handleClose();
        resetForm();
      } catch (error) {
        console.error('Error adding product:', error);
        
      }
    },
  });

  return (
    <div>
      <div className="grid grid-rows-2 cursor-pointer" onClick={handleOpen}>
        <Typography variant="h6">Add Product</Typography>
        <div className="flex justify-center p-3 items-center">
          <AddBoxIcon fontSize="large" />
        </div>
      </div>

      {/* Modal for Adding Product */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 400,
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}
        >
          <div className="relative">
            <Typography variant="h5" textAlign="center" mb={2}>
              Add New Product
            </Typography>
            <button onClick={handleClose} className="absolute top-1 right-0">
              <FaTimes size={30} />
            </button>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Product Name"
              variant="outlined"
              margin="normal"
              name="name"
              {...formik.getFieldProps('name')}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <FormControl fullWidth margin="normal">
              <FormLabel>Is the product sold in packets?</FormLabel>
              <RadioGroup
                row
                name="isPacket"
                value={formik.values.isPacket.toString()} // Convert to string for comparison
                onChange={formik.handleChange}
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {formik.values.isPacket === "true" ? (
              <TextField
                fullWidth
                label="Packet Price"
                variant="outlined"
                margin="normal"
                name="packetPrice"
                {...formik.getFieldProps('packetPrice')}
                error={formik.touched.packetPrice && Boolean(formik.errors.packetPrice)}
                helperText={formik.touched.packetPrice && formik.errors.packetPrice}
              />
            ) : (
              <TextField
                fullWidth
                label="Price Per Kg"
                variant="outlined"
                margin="normal"
                name="pricePerKg"
                {...formik.getFieldProps('pricePerKg')}
                error={formik.touched.pricePerKg && Boolean(formik.errors.pricePerKg)}
                helperText={formik.touched.pricePerKg && formik.errors.pricePerKg}
              />
            )}
            <TextField
              fullWidth
              label="Product Quantity"
              variant="outlined"
              margin="normal"
              name="quantity"
              {...formik.getFieldProps('quantity')}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity}
            />
            <TextField
              fullWidth
              label="Product Description"
              variant="outlined"
              margin="normal"
              name="description"
              multiline
              rows={3}
              {...formik.getFieldProps('description')}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <TextField
              select
              fullWidth
              label="Primary Category"
              variant="outlined"
              margin="normal"
              name="primaryCategory"
              {...formik.getFieldProps('primaryCategory')}
              error={formik.touched.primaryCategory && Boolean(formik.errors.primaryCategory)}
              helperText={formik.touched.primaryCategory && formik.errors.primaryCategory}
            >
              <MenuItem value="fruits">Fruits</MenuItem>
              <MenuItem value="vegetables">Vegetables</MenuItem>
              <MenuItem value="packets">Packets</MenuItem>
            </TextField>
            <TextField
              select
              fullWidth
              label="Secondary Category"
              variant="outlined"
              margin="normal"
              name="secondaryCategory"
              {...formik.getFieldProps('secondaryCategory')}
              error={formik.touched.secondaryCategory && Boolean(formik.errors.secondaryCategory)}
              helperText={formik.touched.secondaryCategory && formik.errors.secondaryCategory}
            >
              <MenuItem value="leafy">Leafy Vegetables</MenuItem>
              <MenuItem value="root">Root Vegetables</MenuItem>
              <MenuItem value="exotic">Exotic Items</MenuItem>
              <MenuItem value="vegetables">Vegetables</MenuItem>
              <MenuItem value="fruits">Fruits</MenuItem>
            </TextField>
            
            {formik.values.isPacket === "true" && (
              <TextField
                fullWidth
                label="Weight (in grams)"
                variant="outlined"
                margin="normal"
                name="weight"
                {...formik.getFieldProps('weight')}
                error={formik.touched.weight && Boolean(formik.errors.weight)}
                helperText={formik.touched.weight && formik.errors.weight}
              />
            )}
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
              Add Product
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddProduct;
