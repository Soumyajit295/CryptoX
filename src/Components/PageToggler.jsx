import React from 'react'

function PageToggler({handleNextPage,handlePreviousPage , page , showCaseCryptos}) {
  return (
    <div className='flex justify-between mt-6'>
        <button
          onClick={handlePreviousPage}
          className='px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-blue-400'
          disabled={page === 1}
        >
          Previous
        </button>
        <span className='text-white text-lg'>{`Page ${page}`}</span>
        <button
          onClick={handleNextPage}
          className='px-4 py-2 bg-blue-600 text-white rounded-lg'
          disabled={showCaseCryptos.length < 8}
        >
          Next
        </button>
      </div>
  )
}

export default PageToggler