'use client'
import React, { useEffect, useMemo, useState, useRef } from 'react'
import SwitchRoleCard from '@/components/dashboard/swich-role/SwitchRoleCard'
import clsx from 'clsx'
import SwitchRoleModal from '@/components/dashboard/swich-role/SwitchRoleModal'
import NotFound from '@/components/dashboard/swich-role/NotFound'
import { Input } from 'antd'
import { useAppSelector } from '@/hooks/hooks';

const roles = [
  { role: 'ADMIN', lastTime: '4 days ago' },
  { role: 'HR', lastTime: '6 days ago' },
  { role: 'USER', lastTime: '1 week ago' },
  { role: 'MODERATOR', lastTime: '20 days ago' }
]

const Page = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalItem, setModalItem] = useState<any>(null)
  const [filteredRoles, setFilteredRoles] = useState<any[]>(roles)
  const searchInputRef = useRef<any>(null)

  useEffect(() => {
    const res = roles.filter(role =>
      role.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredRoles(res)
  }, [searchTerm])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <div>
        <div className='bg-white rounded-xl shadow-sm mb-6 overflow-hidden'>
          <div className='px-6 py-4'>
            <div className='flex justify-between items-center gap-4'>
              <div className='flex justify-center items-center'>
                <p className='text-2xl font-bold text-gray-900 inline-block relative m-0'>
                  Switch Role{' '}
                  <span className='text-gray-500 text-sm absolute bottom-4 ms-1'>
                    ({filteredRoles.length})
                  </span>
                </p>
              </div>
              <div
                className={clsx(
                  'transition-all duration-300',
                  isFocused ? 'w-72' : 'w-[108px]'
                )}
              >
                <Input
                  ref={searchInputRef}
                  type='text'
                  placeholder='Search role... (Ctrl + K)'
                  value={searchTerm}
                  onChange={e => {
                    if (!isOpen) {
                      setSearchTerm(e.target.value)
                    }
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className='bg-transparent outline-none w-full'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white rounded-xl shadow-sm'>
          <div className='px-6 py-4'>
            {filteredRoles.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                {filteredRoles.map((item, index) => (
                  <SwitchRoleCard
                    setIsOpen={setIsOpen}
                    setModalItem={setModalItem}
                    key={index}
                    role={item.role}
                    lastTime={item.lastTime}
                    currentRole={user?.role}
                  />
                ))}
              </div>
            ) : (
              <NotFound />
            )}
          </div>
        </div>
      </div>

      {isOpen && modalItem && (
        <SwitchRoleModal
          item={modalItem}
          setIsOpen={setIsOpen}
          currentRole={user.role}
        />
      )}
    </>
  )
}

export default Page
