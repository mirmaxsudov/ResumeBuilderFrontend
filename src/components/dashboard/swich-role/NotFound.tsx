import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center py-12 text-gray-500'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-12 h-12 mb-4'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15.75 9V5.25M8.25 9V5.25M4.5 12.75v6.375A2.625 2.625 0 007.125 21.75h9.75A2.625 2.625 0 0019.5 19.125V12.75m-15 0h15m-15 0l1.5-6h12l1.5 6'
        />
      </svg>
      <h3 className='text-lg font-semibold mb-2'>No roles found</h3>
      <p className='text-sm'>Try a different keyword or reset the search.</p>
    </div>
  )
}

export default NotFound
