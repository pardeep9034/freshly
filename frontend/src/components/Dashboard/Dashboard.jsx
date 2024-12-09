import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Orders from "./Orders";
import Products from "./Products";
import Employee from "./Employee";


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Content */}
        <div className="flex-1  p-4 bg-gray-100 overflow-x-auto ">
          <Routes>
            <Route path="main" element={<Content/>} />
            <Route path="orders" element={<Orders/>} />
            <Route path="product" element={<Products/>} />
            <Route path="employee" element={<Employee/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
