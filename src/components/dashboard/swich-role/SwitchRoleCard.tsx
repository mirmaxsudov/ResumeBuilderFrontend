import React, { useEffect, useState } from 'react'
import SwitchRoleModal from './SwitchRoleModal'

export interface SwitchRoleCardProps {
  role: string
  lastTime: string
}

const SwitchRoleCard: React.FC<SwitchRoleCardProps> = ({
  role,
  lastTime,
  setIsOpen,
  setModalItem
}: any) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <div className='bg-gray-100 p-6 rounded-2xl shadow-md text-center'>
        <div className='text-lg font-bold text-gray-700 mb-2'>{role}</div>
        <div className='text-sm text-gray-500 mb-4'>Last Time: {lastTime}</div>
        <button
          onClick={() => {
            setIsOpen(true)
            setModalItem({ role, lastTime })
          }}
          className='px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition'
        >
          Switch
        </button>
      </div>
    </>
  )
}

export default SwitchRoleCard
