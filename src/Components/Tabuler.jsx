import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPaginationCrypto, changeCurrencyToInr, changeCurrencyToUSD, decrementPage, fetchCoins, incrementPage } from '../Features/cryptoSlice';
import Table from './Table';
import PageToggler from './PageToggler';
import MarketNavigation from './MarketNavigation';

function Tabuler() {
    const dispatch = useDispatch();
    const { cryptos, loading, showCaseCryptos, currency, page } = useSelector((state) => state.app);

    console.log("ShowcaseCryptos : ",showCaseCryptos)

    useEffect(() => {
        dispatch(fetchCoins(currency))
    }, [currency]);

    useEffect(() => {
        if (cryptos.length > 0) {
            const startIndex = (page - 1) * 8;
            const endIndex = page * 8;
            const paginatedCryptos = cryptos.slice(startIndex, endIndex);
            dispatch(addPaginationCrypto(paginatedCryptos));
        }
    }, [cryptos, page]);

    if (loading) {
        return (
            <div className='flex items-center justify-center w-full h-screen bg-slate-900'>
              <div className='text-white text-center p-5'>
                <div className='text-xl mb-2'>Loading</div>
                <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
              </div>
            </div>
          );
    }

    return (
        <div className='w-full min-h-screen bg-slate-900 p-5'>
            <MarketNavigation />
            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-700 mt-5'>
                    <thead className='bg-gray-800'>
                        <tr>
                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Icon</th>
                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Name</th>
                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Current Price</th>
                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>24h Low</th>
                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>24h High</th>
                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>24h Change</th>
                        </tr>
                    </thead>
                    <tbody className='bg-gray-900 divide-y divide-gray-700'>
                        {showCaseCryptos && Array.isArray(showCaseCryptos) && showCaseCryptos.length > 0 ? (
                            showCaseCryptos.map((crypto) => (
                                <Table key={crypto.id} crypto={crypto} currency={currency} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className='px-6 py-4 text-center text-white'>No cryptocurrencies to display</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <PageToggler
                handleNextPage={() => dispatch(incrementPage())}
                handlePreviousPage={() => dispatch(decrementPage())}
                showCaseCryptos={showCaseCryptos}
                page={page}
            />
        </div>
    );
}

export default Tabuler;
