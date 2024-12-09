import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaTimes } from "react-icons/fa";


// Validation Schema
const AddUserSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  phoneno: Yup.number()
  .min(10, "Phone number must be at least 10 digits")
    .typeError("Phone number must be a number")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string().required("Role is required"),
  isActive: Yup.boolean(),
});

const AddUserModal = ({ Opens, handleClose, managerId }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = async (values, { resetForm }) => {
    console.log(values, managerId._id);
    try {
      const response = await axios.post("http://localhost:3000/user/add", {
        ...values,
        addedBy: managerId,
      });
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      resetForm();
      handleClose();
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setSuccessMessage("");
    }
  };

  return (
    <Modal open={Opens} onClose={handleClose} aria-labelledby="add-user-modal">
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
        <Typography variant="h6" id="add-user-modal" gutterBottom>
          Add New User
        </Typography>
        <button onClick={handleClose} className="absolute top-1 right-0">
          <FaTimes size={30} />
        </button>
        {errorMessage && (
          <Typography color="error" variant="body2" gutterBottom>
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography color="success" variant="body2" gutterBottom>
            {successMessage}
          </Typography>
        )}
        <Formik
          initialValues={{
            username: "",
            phoneno: "",
            password: "",
            role: "employee",
            isActive: true,
          }}
          validationSchema={AddUserSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
                {/* Username */}
                <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="username"
                label="Username"
                error={touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                />
              {/* Phone Number */}
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="phoneno"
                label="Phone Number"
                type="number"
                error={touched.phoneno && !!errors.phoneno}
                helperText={touched.phoneno && errors.phoneno}
              />
              {/* Password */}
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                type="password"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              {/* Role */}
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="role"
                label="Role"
                select
                error={touched.role && !!errors.role}
                helperText={touched.role && errors.role}
              >
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Field>
              {/* Is Active */}
              <FormControlLabel
                control={
                  <Field as={Checkbox} name="isActive" color="primary" />
                }
                label="Active User"
              />
              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Add User
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
