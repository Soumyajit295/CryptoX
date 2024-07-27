import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changeCurrencyToInr, changeCurrencyToUSD, fetchCoins, fetchHistoricalDataInfo, getSingleCryptoData } from '../Features/cryptoSlice';
import ToggleButton from './ToggleButton';
import { Chart } from "react-google-charts";
import { useNavigate } from 'react-router-dom';

function SingleCoin() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [interValDays, setInterValDays] = useState('10');
  const [chartData, setChartData] = useState([["Days", "price"]]);

  const { singleCrypto, currency, historicalData , loading } = useSelector((state) => state.app);


  useEffect(() => {
    dispatch(getSingleCryptoData({ id: id }));
  }, [id, currency])

  useEffect(() => {
    dispatch(fetchHistoricalDataInfo({ id: id, currency: currency, interValDays: interValDays }));
  }, [interValDays, dispatch, id, currency]);

  useEffect(() => {
    let dataCopy = [["Days", "price"]];

    historicalData.forEach((apiData) => {
      let date = new Date(apiData[0]);
      const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      dataCopy.push([formattedDate, apiData[1]]);
    });

    setChartData(dataCopy);
  }, [currency, historicalData]);

  if (loading || Object.keys(singleCrypto).length === 0) {
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
    <>
      <div className='w-full border flex flex-col items-center bg-slate-900 border-t border-slate-800 p-4'>
        <img
          className="sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 h-auto"
          src={singleCrypto.image.large}
          alt={singleCrypto.id}
        />
        <div className='w-full max-w-2xl flex items-center justify-center mt-4'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl text-white font-bold'>{singleCrypto.name}</h1>
        </div>
      </div>
      <div className='w-full p-4 bg-slate-900 flex flex-col sm:flex-row items-center justify-between flex-wrap'>
        <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 flex-wrap'>
          <h1 className='text-white text-xl sm:text-2xl font-semibold'>Select currency</h1>
          <ToggleButton
            currency={currency}
            setCurrencyToINR={() => dispatch(changeCurrencyToInr())}
            setCurrencyToUSD={() => dispatch(changeCurrencyToUSD())}
          />
        </div>

        <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 mt-4 sm:mt-0'>
          <h1 className='text-white text-xl sm:text-2xl font-semibold'>Select chart interval</h1>
          <select
            onChange={(e) => setInterValDays(e.target.value)}
            name="days"
            id="days"
            className='bg-gray-800 border border-gray-600 text-white rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value="">Select days</option>
            <option value="5">last 5 days</option>
            <option value="10">last 10 days</option>
            <option value="15">last 15 days</option>
            <option value="20">last 20 days</option>
            <option value="25">last 25 days</option>
            <option value="30">last 30 days</option>
          </select>
        </div>
      </div>
      <div className='w-full p-4 bg-slate-900 shadow-lg relative overflow-hidden'>
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={chartData}
          options={{
            hAxis: {
              title: 'Date',
              titleTextStyle: { color: '#fff' },
              slantedText: true,
              slantedTextAngle: 45,
              textStyle: { color: '#fff' }
            },
            vAxis: {
              title: `Price in ${currency}`,
              titleTextStyle: { color: '#fff' },
              textStyle: { color: '#fff' }
            },
            curveType: 'function',
            legend: { position: 'bottom', textStyle: { color: '#fff' } },
            backgroundColor: '#1e293b',
            pointSize: 5,
            colors: ['#4a90e2'],
            animation: {
              duration: 1000,
              easing: 'out',
            },
          }}
        />
      </div>
      <div className='w-full p-5 bg-slate-900 shadow-lg'>
        <h1 className='text-2xl text-white font-bold mb-4'>Coin Details</h1>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-slate-800 rounded-lg'>
            <thead>
              <tr className='border-b border-slate-700'>
                <th className='p-4 text-left text-white font-semibold'> Details</th>
                <th className='p-4 text-left text-white font-semibold'>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b border-slate-700 hover:bg-slate-700'>
                <td className='p-4 text-white'>Name</td>
                <td className='p-4 text-white'>{singleCrypto.name}</td>
              </tr>
              <tr className='border-b border-slate-700 hover:bg-slate-700'>
                <td className='p-4 text-white'>Current Price</td>
                <td className='p-4 text-white'>{currency == 'inr' ? '₹ ' : '$ '}{singleCrypto.market_data.current_price[currency]}</td>
              </tr>
              <tr className='border-b border-slate-700 hover:bg-slate-700'>
                <td className='p-4 text-white'>Market Cap</td>
                <td className='p-4 text-white'>{currency == 'inr' ? '₹ ' : '$ '}{singleCrypto.market_data.market_cap[currency]}</td>
              </tr>
              <tr className='border-b border-slate-700 hover:bg-slate-700'>
                <td className='p-4 text-white'>24 Hours High</td>
                <td className='p-4 text-green-500'>{currency == 'inr' ? '₹ ' : '$ '}{singleCrypto.market_data.high_24h[currency]}</td>
              </tr>
              <tr className='border-b border-slate-700 hover:bg-slate-700'>
                <td className='p-4 text-white'>24 Hours Low</td>
                <td className='p-4 text-red-500'>{currency == 'inr' ? '₹ ' : '$ '}{singleCrypto.market_data.low_24h[currency]}</td>
              </tr>
              <tr className='border-b border-slate-700 hover:bg-slate-700'>
                <td className='p-4 text-white'>Price Change (24h)</td>
                <td className={`p-4 ${singleCrypto.market_data.price_change_24h_in_currency[currency] > 0 ? 'text-green-500' : 'text-red-500'}`}>{currency == 'inr' ? '₹ ' : '$ '}{singleCrypto.market_data.price_change_24h_in_currency[currency]}</td>
              </tr>
              <tr className='border-b border-slate-700 hover:bg-slate-700'>
                <td className='p-4 text-white'>Price Change % (24h)</td>
                <td className={`p-4 ${singleCrypto.market_data.market_cap_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {singleCrypto.market_data.market_cap_change_percentage_24h} %
                </td>
              </tr>
              <tr className='border-b border-slate-700 hover:bg-slate-700'>
                <td className='p-4 text-white'>Total Supply</td>
                <td className='p-4 text-white'>{singleCrypto.market_data.total_supply}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
}

export default SingleCoin;
