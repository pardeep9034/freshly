import React from 'react';
import TotalOrders from './shared/TotalOrders';
import TotalSales from './shared/TotalSales';
import AddProduct from './shared/AddProduct';
import AddUser from './shared/AddUser';
import EditPrice from './shared/EditPrice';
import ShowProduct from './shared/ShowProduct';

const Content = () => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-10 gap-3 min-h-screen ">
      {/* TotalOrders */}
      <div className="col-span- sm:col-span-1 lg:col-span-2 row-span-1 sm:row-span-1 lg:row-span-2 bg-white shadow rounded p-4 text-center">
        <TotalOrders />
      </div>

      {/* TotalSales */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-2 row-span-1 sm:row-span-1 lg:row-span-2 bg-white shadow rounded p-4 text-center">
        <TotalSales />
      </div>

      {/* AddProduct */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-2 row-span-1 sm:row-span-1 lg:row-span-2 bg-white shadow rounded p-4 text-center">
        <AddProduct />
      </div>

      {/* AddUser */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-2 row-span-1 sm:row-span-1 lg:row-span-2 bg-white shadow rounded p-4 text-center">
        <AddUser />
      </div>

      {/* EditPrice */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-2 row-span-1 sm:row-span-1 lg:row-span-2 bg-white shadow rounded p-4 text-center">
        <EditPrice />
      </div>

      {/* ShowProduct */}
      <div className="col-span-3 sm:col-span-2 lg:col-span-10 row-span-2 sm:row-span-2 lg:row-span-8 bg-white shadow rounded p-4">
        <ShowProduct />
      </div>
    </div>
  );
};

export default Content;
