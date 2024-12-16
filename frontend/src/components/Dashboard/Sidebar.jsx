import React from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const Base_URL = import.meta.env.VITE_BACKEND_URL;
  const links = [
    { path: "main", label: "Dashboard", icon: <DashboardIcon />, isAvailable: true },
    { path: "orders", label: "Orders", icon: <ShoppingCartIcon />, isAvailable: true },
    { path: "product", label: "Products", icon: <ArticleIcon />, isAvailable: true },
    { path: "sales", label: "Sales", icon: <CurrencyRupeeIcon />, isAvailable: false },
    { path: "employee", label: "Employee", icon: <PersonIcon />, isAvailable: true },
    {path: "customer", label: "Customer", icon: <PersonIcon />, isAvailable: false},
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-20 w-64 bg-gray-800 text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.path} className="relative">
              {link.isAvailable ? (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`
                  }
                  onClick={toggleSidebar}
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ) : (
                <div className="flex items-center gap-3 px-3 py-2 rounded-md cursor-not-allowed">
                  {link.icon}
                  {link.label}
                  <span className="absolute top-0 right-0 mt-1 mr-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              )}
            </li>
          ))}
          <li>
            <button
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700"
              onClick={async () => {
                try {
                  await axios.get(`${Base_URL}/use/logout`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                  });
                  window.location.href = "/login";
                } catch (error) {
                  console.error("Logout failed:", error);
                }
              }}
            >
              <LogoutIcon />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
