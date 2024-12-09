import { Typography } from '@mui/material'
import React from 'react'
import{useCart} from '../../../utils/GeneralContext'

const TotalOrders = () => {
  const{orders}=useCart();
  return (
    <div className='grid grid-rows-2'>
     <Typography variant="h6">Total Orders</Typography>
     <div className="total flex justify-center  p-3 ">
         <Typography variant="h5">{orders.length}</Typography>
     </div>
    
    </div>
  )
}

export default TotalOrders
