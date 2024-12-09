import React, { createContext, useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


// Create a context
export const UserContext = createContext();
//create cart context
export const CartContext = createContext();


// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
  // const [products, setProducts] = useState([]); // Store products data
  const[selectedCategory,setSelectedCategory]=useState(null);  


  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/authenticate', {
          withCredentials: true, // Sends cookies
        });

        if (response.data) {
          setUser(response.data); // Set user data
          setIsAuthenticated(true); // Mark as authenticated
        }
      } catch (error) {
        console.error("Token verification failed:", error.response?.data || error.message);
        setIsAuthenticated(false);
        setUser(null);
        // navigate('/login'); // Redirect to login if authentication fails
      }
    };

    checkToken();
  },[user]); // Add dependencies

  return (
    <UserContext.Provider value={{ user, isAuthenticated, setUser ,selectedCategory,setSelectedCategory}}>
      {children}
    </UserContext.Provider>
  );
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };
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

  return (
    <CartContext.Provider value={{ cartItems, addToCart,setCartItems,orders,setOrders }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);