import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../utils/GeneralContext";

const categories = [
  { label: "All ",value:null, icon:"::" },
  { label: "All Veggies",value:"vegetables", icon: "🥗" },
  { label: "All Fruits",value:"fruits", icon: "🍎" },
  { label: "Root Vegetables",value:"root", icon: "🥕" },
  { label: "Leafy Greens",value:"leafy", icon: "🥬" },
  { label: "Exotic Vegetables",value:"exotic", icon: "🥦" },
  { label: "Packed Items",value:"packets", icon: "📦" },
];

const CategoryFilterBar = ({ onFilter, activeCategory }) => {
  const{selectedcategory, setSelectedCategory} = useContext(UserContext);
 if(selectedcategory){
  console.log(selectedcategory);
 }
  return (
    
    <Box
    //   sx={{
    //     display: "flex",
    //     gap: 2,
        
    //     padding: "10px 20px",
    //     backgroundColor: "#f8f8f8",
    //     borderBottom: "1px solid #ddd",
    //     overflowX: "auto", // Enables horizontal scroll for small screens
    //   }}
      className=" justify-center sm: flex gap-2   pl-14 pr-2 bg-gray-100 border-b border-gray-300 overflow-x-auto fixed w-full z-10 py-3"
    >
      {categories.map((category) => (
        <Button
          key={category.label}
          onClick={() => setSelectedCategory(category.value)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
            borderRadius: "12px",
            backgroundColor: activeCategory === category.label ? "#dcedc8" : "#ffffff",
            boxShadow: activeCategory === category.label ? "0 4px 6px rgba(0,0,0,0.2)" : "0 2px 4px rgba(0,0,0,0.1)",
            "&:hover": {
              backgroundColor: "#f1f8e9",
            },
          }}
        >
          <Typography fontSize="20px" >{category.icon}</Typography>
          <Typography
            fontSize="10px"
            fontWeight="600"
            color={activeCategory === category.label ? "primary.main" : "text.secondary"}
            sx={{ marginTop: "4px" }}
          >
            {category.label}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

export default CategoryFilterBar;
