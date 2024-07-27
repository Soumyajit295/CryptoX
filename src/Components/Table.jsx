import React from 'react';
import { useNavigate } from 'react-router-dom';

function Table({ crypto, currency }) {
    const { image, id, low_24h, high_24h, current_price, price_change_percentage_24h } = crypto;
    const navigate = useNavigate()

    function navigateToSingleCryptoPage(id){
        navigate(`/crypto/${id}`)
    }
    return (
        <tr 
        onClick={()=>navigateToSingleCryptoPage(id)}
        key={id} className='cursor-pointer hover:bg-gray-800'>
            <td className='px-4 py-4 whitespace-nowrap'>
                <img src={image} alt={id} className='w-8 h-8 md:w-10 md:h-10 rounded-full' />
            </td>
            <td className='px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-50'>{id}</td>
            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-400'>{currency === 'inr' ? '₹ ' : '$ '} {current_price}</td>
            <td className='px-4 py-4 whitespace-nowrap text-sm text-red-500'>{currency === 'inr' ? '₹ ' : '$ '}  {low_24h}</td>
            <td className='px-4 py-4 whitespace-nowrap text-sm text-green-500'>{currency === 'inr' ? '₹ ' : '$ '} {high_24h}</td>
            <td className={`px-4 py-4 whitespace-nowrap text-sm font-semibold ${price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {price_change_percentage_24h}%
            </td>
        </tr>
    );
}

export default Table;
