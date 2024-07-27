import React from 'react';

function ToggleButton({ currency, setCurrencyToINR, setCurrencyToUSD }) {

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={setCurrencyToINR}
        className={`px-4 py-2 ${currency === 'inr' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'} font-semibold rounded-md hover:bg-orange-600 transition duration-300`}
      >
        INR
      </button>
      <button
        onClick={setCurrencyToUSD}
        className={`px-4 py-2 ${currency === 'usd' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'} font-semibold rounded-md hover:bg-orange-600 transition duration-300`}
      >
        USD
      </button>
    </div>
  );
}

export default ToggleButton;
