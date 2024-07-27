import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCoins } from '../Features/cryptoSlice';
import hero from '../../public/heros/hero-banner.png';

function LandingPage() {
  const { cryptos, loading } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currency, setCurrency] = useState('USD');

  console.log(cryptos)
  console.log(loading)

  useEffect(() => {
    dispatch(fetchCoins(currency));
  }, [dispatch, currency]);

  const topCryptos = cryptos.slice(0, 4);

  return (
    <div className='w-full min-h-screen bg-gradient-to-r from-gray-900 to-black'>
      <div className="relative flex flex-col md:flex-row items-center min-h-screen px-6 py-12 md:px-16 md:py-20">
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left space-y-6 md:space-y-8">
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
            Buy & <span className="text-orange-500">Sell Your</span>
          </h1>
          <h2 className="text-white text-3xl md:text-5xl font-semibold">
            Digital Assets
          </h2>
          <h2 className="text-white text-3xl md:text-5xl font-semibold">
            and Get Updates
          </h2>
          <h2 className="text-white text-4xl md:text-6xl font-semibold">
            on Crypto<span className="text-orange-500">X</span>
          </h2>
          <div>
            <button
              onClick={() => navigate('/market')}
              className="inline-block px-8 py-4 bg-orange-500 text-white font-semibold text-lg rounded-md shadow-lg hover:bg-orange-600 transition duration-300"
            >
              Market
            </button>
          </div>
        </div>
        <div className="relative hidden md:flex w-full md:w-1/2 items-center justify-center md:justify-end">
          <img
            src={hero}
            alt="Crypto Assets"
            className="object-cover w-full h-1/2 opacity-80"
          />
        </div>
      </div>
      <div className="relative bg-gray-900 py-6 md:py-12 border">
        <h3 className="text-white text-3xl md:text-4xl font-semibold text-center mb-6 md:mb-8">Top Cryptos</h3>
        <div className="container mx-auto px-6">
          <div className="text-center mb-4 md:mb-6">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 ${currency === 'USD' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'} font-semibold rounded-md hover:bg-orange-600 transition duration-300`}
            >
              USD
            </button>
            <button
              onClick={() => setCurrency('INR')}
              className={`ml-4 px-4 py-2 ${currency === 'INR' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'} font-semibold rounded-md hover:bg-orange-600 transition duration-300`}
            >
              INR
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {topCryptos.map((crypto) => (
              <div key={crypto.id} className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <img 
                    src={crypto.image} 
                    alt={crypto.name} 
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full border-4 border-orange-500"
                  />
                  <div>
                    <h4 className="text-white text-lg md:text-xl font-semibold mb-1">{crypto.name}</h4>
                    <p className="text-gray-400 text-sm mb-1">{crypto.symbol.toUpperCase()}</p>
                    <p className="text-gray-300 text-lg md:text-lg font-medium">{currency === 'USD' ? '$' : '₹'} {crypto.current_price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
