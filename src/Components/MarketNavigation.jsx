import React, { useEffect, useState } from 'react';
import ToggleButton from './ToggleButton';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrencyToInr, changeCurrencyToUSD, filterCrypto } from '../Features/cryptoSlice';

function MarketNavigation() {
    const dispatch = useDispatch();
    const [inputCrypto, setInputCrypto] = useState('');

    const { currency } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(filterCrypto(inputCrypto));
    }, [inputCrypto, dispatch]);

    return (
        <div className="w-full flex flex-col md:flex-row p-5 gap-4 md:gap-6 justify-between items-center">
            <div className="text-center mb-4 md:mb-0">
                <h1 className="text-white font-semibold text-2xl md:text-3xl">Crypto Market</h1>
            </div>

            <div className="w-full md:w-auto flex-shrink-0">
                <form className="flex flex-col md:flex-row items-center gap-2">
                    <input
                        onChange={(e) => setInputCrypto(e.target.value)}
                        type="text"
                        placeholder="Search crypto.."
                        className="p-2 rounded-md w-full md:w-48 outline-none"
                    />
                    <button
                        type="button"
                        className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-full md:w-auto font-semibold"
                    >
                        Search
                    </button>
                </form>
            </div>

            <div className="flex-shrink-0">
                <ToggleButton
                    currency={currency}
                    setCurrencyToINR={() => dispatch(changeCurrencyToInr())}
                    setCurrencyToUSD={() => dispatch(changeCurrencyToUSD())}
                />
            </div>
        </div>
    );
}

export default MarketNavigation;
