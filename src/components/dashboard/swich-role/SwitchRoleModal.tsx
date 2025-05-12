'use client'

import React from 'react'
import { SwitchRoleCardProps } from './SwitchRoleCard'

const SwitchRoleModal = ({
  setIsOpen,
  item
}: {
  setIsOpen: any
  item: SwitchRoleCardProps
}) => {
  return (
    <>
      <div
        id='modal'
        className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-filter backdrop-blur-[5px]'
        onClick={e => {
          if (e.target.id === 'modal') setIsOpen(false)
        }}
      >
        <div className='bg-white p-6 rounded-xl shadow-lg w-96'>
          <h2 className='text-xl font-semibold mb-4'>Salohiddin</h2>
          <div className='flex items-center justify-between mb-4'>
            <p className='border border-gray-300 w-32 px-4 py-2 rounded-lg text-center'>
              Admin
            </p>

            <p>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <path
                  fill-rule='evenodd'
                  d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8'
                />
              </svg>
            </p>
            <p className='border border-gray-300 w-32 px-4 py-2 rounded-lg text-center'>
              User
            </p>
          </div>
          <div className='mb-4'>
            <input
              type='password'
              autoComplete='off'
              className='border border-gray-300 w-full px-4 py-2 rounded-lg'
              placeholder='Enter password'
            />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className='w-full px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition'
          >
            Yopish
          </button>
        </div>
      </div>
    </>
  )
}

export default SwitchRoleModal
