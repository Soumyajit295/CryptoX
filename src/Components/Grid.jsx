import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoins, addPaginationCrypto, changeCurrencyToInr, changeCurrencyToUSD, incrementPage, decrementPage } from '../Features/cryptoSlice';
import Card from './Card';
import PageToggler from './PageToggler';
import MarketNavigation from './MarketNavigation';

function Grid() {
    const { cryptos, loading, showCaseCryptos, currency, page } = useSelector((state) => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCoins(currency));
    }, [dispatch, currency]);

    useEffect(() => {
        if (cryptos.length > 0) {
            const startIndex = (page - 1) * 8;
            const endIndex = page * 8;
            const paginatedCryptos = cryptos.slice(startIndex, endIndex);
            console.log('Paginated Cryptos:', paginatedCryptos);
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
            <MarketNavigation/>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {showCaseCryptos.map((crypto) => (
                    <Card key={crypto.id} crypto={crypto} currency={currency} />
                ))}
            </div>
            <PageToggler handleNextPage={() => dispatch(incrementPage())} handlePreviousPage={() => dispatch(decrementPage())} page={page} showCaseCryptos={showCaseCryptos} />
        </div>
    );
}

export default Grid;
