import React, { useState } from "react";
import { useCart } from "../../utils/GeneralContext";
import { useNavigate } from "react-router-dom";
import { formatWeight } from "../../utils/Functions"
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const CartButton = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
 


  
 
  


  // Calculate Total Price
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        if (item.isPacket) {
          return total + item.price * item.quantity;
        } else {
          return total + (item.price / 1000) * item.weightInGrams;
        }
      }, 0)
      .toFixed(2);
  };

  // Toggle Dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Remove Item Handler
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Total Quantity
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Hide Button if Cart is Empty
  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50  shadow-lg flex justify-between items-center px-4 py-3" style={{backgroundColor:"#dce7c8"}}>
      <div className="relative">

        <button
          onClick={toggleDropdown}
          className="font-semibold hover:underline text-accent-light"
        >
          {dropdownOpen ? <KeyboardDoubleArrowUpIcon/> : <KeyboardDoubleArrowDownIcon/>}
          {totalQuantity} items | ₹{calculateTotal()}
        </button>
        {dropdownOpen && (
          <div className="absolute bottom-full left-0 bg-surface shadow-lg border rounded-lg w-64 overflow-y-auto max-h-64">
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center px-4 py-2"
                >
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.isPacket
                        ? `Packet x ${item.quantity}`
                        : `${formatWeight(item.weightInGrams)} x ${item.quantity}`}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        onClick={() => navigate("/cart")}
        className="bg-accent-light text-white py-2 px-4 rounded-lg font-medium shadow-md hover:bg-emerald-600 transition-all"
      >
        View Cart
      </button>
    </div>
  );
};

export default CartButton;
