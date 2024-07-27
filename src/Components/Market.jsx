import React, { useState } from 'react';
import Grid from './Grid';
import Tabuler from './Tabuler';

function Market() {
  const [cardStyle, setCardStyle] = useState('grid');

  return (
    <>
      <div className='w-full bg-slate-900 flex border-t-2 border-slate-800'>
        <div
          onClick={() => setCardStyle('grid')}
          className={`w-1/2 p-4 text-center font-semibold text-slate-50 text-xl cursor-pointer ${cardStyle === 'grid' ? 'border-b border-blue-700' : ''
            }`}
        >
          Grid
        </div>
        <div
          onClick={() => setCardStyle('list')}
          className={`w-1/2 p-4 text-center font-semibold text-slate-50 text-xl cursor-pointer ${cardStyle === 'list' ? 'border-b border-blue-700' : ''
            }`}
        >
          List
        </div>
      </div>
      {cardStyle === 'grid' && <Grid />}
      {cardStyle === 'list' && <Tabuler />}
    </>
  );
}

export default Market;
