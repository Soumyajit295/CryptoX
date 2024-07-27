import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ crypto , currency}) {
  const { image, id, low_24h, high_24h, current_price, price_change_percentage_24h } = crypto;
  const navigate = useNavigate()

  useEffect(()=>{
    window.scrollTo(0,0)
  })

  return (
    <div 
    onClick={()=>navigate(`/crypto/${id}`)}
    className='bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer'>
      <div className='flex items-center mb-4'>
        <img src={image} alt={id} className='w-16 h-16 mr-4 rounded-full border border-gray-600' />
        <h2 className='text-2xl font-bold text-white'>{id}</h2>
      </div>
      <div className='text-white'>
        <p className='mb-3 text-lg'>Current Price: <span className='font-bold text-yellow-300'>{}{currency == 'usd' ? '$ ' : '₹ '}{current_price}</span></p>
        <p className='mb-3 text-lg'>24h Low: <span className='font-bold text-red-500'>{currency == 'usd' ? '$ ' : '₹ '}{low_24h}</span></p>
        <p className='mb-3 text-lg'>24h High: <span className='font-bold text-green-400'>{currency == 'usd' ? '$ ' : '₹ '}{high_24h}</span></p>
        <p className={`text-lg font-semibold ${price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
          24h Change: {price_change_percentage_24h}%
        </p>
      </div>
    </div>
  );
}

export default Card;
