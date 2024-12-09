import React from 'react'
import Weight from './weights'
import {useState} from 'react'


const ProductCard = (product) => {
    const [isWeightOpen,setIsWeightOpen]=useState(false)
  return (
    <>
    <div
    key={product.id}
    className="product-card capitalize shadow-md hover:scale-105 transform transition-all duration-300 rounded-lg bg-white overflow-hidden"
  >
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-24 object-cover"
    />
    <div className="p-3">
      <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
      <p className="text-xs text-gray-500">{product.description}</p>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-sm font-bold text-green-600">{product.isPacket?product.packetPrice:product.pricePerKg}{product.isPacket? "/p":" /kg"}</span>
        <button onClick={()=>setIsWeightOpen(true)}  className="px-3 py-1 bg-green-500 text-white text-xs rounded-md hover:bg-green-600 transition-all">
          Add
        </button>
        
      </div>
    </div>
   
  </div>
  <Weight open={isWeightOpen} onClose={()=>setIsWeightOpen(false)} product={product}/>
    
  
  </>
  )
}

export default ProductCard
