import { Typography } from '@mui/material'
import React from 'react'
import{useCart} from '../../../utils/GeneralContext'

const TotalSales = () => {
  const{orders}=useCart();
  const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  return (
    <div className='grid grid-rows-2'>
     <Typography variant="h6">Total Sales</Typography>
        <div className="total flex justify-center  p-3 items-center">
            <Typography variant="h5" >{totalSales}</Typography>
            </div>
    </div>
  )
}

export default TotalSales
