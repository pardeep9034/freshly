import { Typography } from "@mui/material";
import React from "react";
import ProductCard from "../components/Shared/ProductCard";
import FilterBar from "../components/Shared/Filter";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/GeneralContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import{ Skeleton} from "@mui/material";
// import { use } from "../../../backend/routes/userRoutes";

// const products = [
//     {
//       id: 1,
//       name: "Fresh Tomatoes",
//       price: "₹50/kg",
//       image: "https://via.placeholder.com/150",
//       description: "Juicy and fresh organic tomatoes.",
//     },
//     {
//       id: 2,
//       name: "Potatoes",
//       price: "₹40/kg",
//       image: "https://via.placeholder.com/150",
//       description: "Farm-fresh golden potatoes.",
//     },
//     {
//       id: 3,
//       name: "Carrots",
//       price: "₹60/kg",
//       image: "https://via.placeholder.com/150",
//       description: "Crunchy and sweet carrots.",
//     },
//     {
//       id: 4,
//       name: "Spinach",
//       price: "₹30/bunch",
//       image: "https://via.placeholder.com/150",
//       description: "Fresh and healthy spinach leaves.",
//     },
//     {
//         id: 5,
//         name: "Apples",
//         price: "₹80/kg",
//         image: "https://via.placeholder.com/150",
//         description: "Sweet and juicy red apples.",
//         },
//         {
//         id: 6,
//         name: "Bananas",
//         price: "₹40/kg",
//         image: "https://via.placeholder.com/150",
//         description: "Ripe and fresh bananas.",
//         },
//         {
//         id: 7,

//         name: "Oranges",
//         price: "₹60/kg",
//         image: "https://via.placeholder.com/150",
//         description: "Sweet and tangy oranges.",
//         },
//         {

//         id: 8,
//         name: "Mangoes",
//         price: "₹100/kg",
//         image: "https://via.placeholder.com/150",
//         description: "Fresh and ripe mangoes.",

//         }
//         ,
//         {
//         id: 9,
//         name: "Pineapples",
//         price: "₹50/kg",
//         image: "https://via.placeholder.com/150",
//         description: "Sweet and juicy pineapples.",
//         },
//         {
//         id: 10,
//         name: "Grapes",
//         price: "₹120/kg",
//         image: "https://via.placeholder.com/150",
//         description: "Fresh and seedless grapes.",
//         },
//         {
//         id: 11,
//         name: "Strawberries",
//         price: "₹150/kg",
//         image: "https://via.placeholder.com/150",
//         description: "Sweet and juicy strawberries.",
//         },
        
    
//   ];
  
 
  //get all products

  

const Products = () => {
  const Base_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
 const[products,setProducts]=useState([]);
 const {selectedCategory, setSelectedCategory} = useContext(UserContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${Base_URL}/product`

          , { 
            headers: { "Content-Type": "application/json" },
            withCredentials: true }

        );
        const data = response.data;
        setProducts(data);
      } catch (error) {
        console.error("Fetch products failed:", error);
      }
    };
    fetchProducts();
  }
  , []
  
);

  if (!user) {
    navigate("/login");
    return <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>please login...</Typography>;
  }
  const filteredProducts = selectedCategory
  ? products.filter(
      (product) =>
        product.primaryCategory === selectedCategory || product.secondaryCategory === selectedCategory
    )
  : products;

  
  
    
  return (
    <>
     <FilterBar />
     {/* skeletion when product is loading */}

      {products.length === 0 && (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols- lg:grid-cols-6 px-5 py-3 ">
          {[...Array(12)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" width={200} height={200} />
          ))}
        </div>
      )}

        
    <div className="products-container mt-28 ">
    
      <div className="grid gap-4 grid-cols-2 sm:grid-cols- lg:grid-cols-6 px-5 py-3 ">
        {filteredProducts.length >0?filteredProducts.map((product) => (
          // console.log(product),
            <ProductCard key={product._id} {...product} />
          
        )):<Typography variant="h6" sx={{  mt: 5 ,ml:65 }}>No products found...</Typography>}
      </div>
    </div>
    </>
  );
};

export default Products;
