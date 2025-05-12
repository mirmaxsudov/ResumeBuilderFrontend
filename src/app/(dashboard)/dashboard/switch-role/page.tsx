'use client'
import React, { useEffect, useMemo, useState } from 'react'
import SwitchRoleCard from '@/components/dashboard/swich-role/SwitchRoleCard'
import clsx from 'clsx'
import SwitchRoleModal from '@/components/dashboard/swich-role/SwitchRoleModal'
import NotFound from '@/components/dashboard/swich-role/NotFound'

const roles = [
  { role: 'ADMIN', lastTime: '4 days ago' },
  { role: 'HR', lastTime: '6 days ago' },
  { role: 'MANAGER', lastTime: '1 week ago' },
  { role: 'Software Engineer', lastTime: '2 days ago' },
  { role: 'Product Manager', lastTime: '3 days ago' },
  { role: 'UI/UX Designer', lastTime: '5 days ago' }
  // { role: 'QA Engineer', lastTime: '1 day ago' },
  // { role: 'DevOps Engineer', lastTime: '2 weeks ago' },
  // { role: 'Data Scientist', lastTime: '6 hours ago' },
  // { role: 'Mobile Developer', lastTime: '1 month ago' },
  // { role: 'Business Analyst', lastTime: '3 weeks ago' },
  // { role: 'Scrum Master', lastTime: '4 days ago' },
  // { role: 'Marketing Specialist', lastTime: '2 weeks ago' },
  // { role: 'Support Engineer', lastTime: '5 hours ago' },
  // { role: 'Technical Writer', lastTime: '1 day ago' },
  // { role: 'System Architect', lastTime: '3 days ago' }
]

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [modalItem, setModalItem] = useState(null)
  const [filteredRoles, setFilteredRoles] = useState(roles)

  useEffect(() => {
    const res = roles.filter(role =>
      role.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredRoles(res)
  }, [searchTerm])

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
                  'transition-all duration-300 border border-gray-300 rounded-lg shadow-sm px-2 py-1',
                  isFocused ? 'w-72' : 'w-[108px]'
                )}
              >
                <input
                  type='text'
                  placeholder='Search role...'
                  defaultValue={searchTerm}
                  value={searchTerm}
                  autoComplete='off'
                  onChange={e => {
                    if (!isOpen) {
                      setSearchTerm(e.target.value)
                    }
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className='bg-transparent outline-none w-full'
                />
                {/* <input type="search" placeholder="Search role..." className="bg-transparent outline-none w-full" /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Cards or Empty State */}
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
        <SwitchRoleModal item={modalItem} setIsOpen={setIsOpen} />
      )}
    </>
  )
}

export default Page
