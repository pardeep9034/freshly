import React, { useState, useEffect } from "react";
import { TextField, Button, Avatar, Box, Typography, Container } from "@mui/material";
import axios from "axios";

const Profile = () => {
  const BaseUrl = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState({
    name: "",
    email: "",
    profileImage: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user details from backend
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/user/profile`, { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        // console.error("Error fetching profile:", error);
      }
    };
    fetchUser();
  }, []);

  // Handle image change
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    if (selectedImage) {
      formData.append("profileImage", selectedImage);
    }

    try {
      const response = await axios.post(`${BaseUrl}/user/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Avatar src={user.profileImage} sx={{ width: 100, height: 100, margin: "auto" }} />
        <Typography variant="h5" mt={2}>
          {user.name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {user.email}
        </Typography>
      </Box>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input type="file" name="profileImage" onChange={handleImageChange} />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </form>
      ) : (
        <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => setIsEditing(true)}>
          Edit Profile
        </Button>
      )}
    </Container>
  );
};

export default Profile;
