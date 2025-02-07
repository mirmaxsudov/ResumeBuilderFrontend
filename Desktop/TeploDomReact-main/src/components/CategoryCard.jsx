import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const CategoryCard = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const location = useLocation()
  const isCategoryPage = location.pathname === '/categories'

  useEffect(() => {
    fetch('http://localhost:8080/CategoryCard')
      .then(response => {
        if (!response.ok) {
          throw new Error('Server xatosi!')
        }
        return response.json()
      })
      .then(data => {
        setCategories(data)
        setLoading(false)
      })
      .catch(error => {
        setError(error.message)
        setLoading(false)
      })
  }, [])

  const visibleCategories = isCategoryPage ? categories : categories.slice(0, 6)

  return (
    <div className='bg-[#FAFAFA]'>
      <div className='w-full'>
        <header className='max-w-7xl mx-auto px-4 pt-[70px] bg-[#FAFAFA]'>
          <div className='flex justify-between items-center'>
            <b className='text-2xl font-inter'>Категории</b>
            {!isCategoryPage && (
              <Link
                to='/categories'
                className='cursor-pointer flex items-center gap-2 font-inter text-[#0077B6]'
              >
                Все категории
                <svg
                  width='9'
                  height='15'
                  viewBox='0 0 9 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1.15582 1.15643C1.05593 1.25871 1 1.396 1 1.53896C1 1.68192 1.05593 1.81921 1.15582 1.92149L6.7368 7.64678L1.15582 13.3709C1.05593 13.4732 1 13.6105 1 13.7534C1 13.8964 1.05593 14.0337 1.15582 14.136C1.20438 14.1858 1.26243 14.2255 1.32656 14.2525C1.39068 14.2796 1.45958 14.2936 1.52918 14.2936C1.59879 14.2936 1.66769 14.2796 1.73181 14.2525C1.79594 14.2255 1.85399 14.1858 1.90255 14.136L7.83742 8.04648C7.94166 7.93954 8 7.79611 8 7.64678C8 7.49744 7.94166 7.35401 7.83742 7.24707L1.90255 1.15758C1.85399 1.10771 1.79594 1.06807 1.73181 1.04101C1.66769 1.01394 1.59879 1 1.52918 1C1.45958 1 1.39068 1.01394 1.32656 1.04101C1.26243 1.06807 1.20438 1.10771 1.15582 1.15758V1.15643Z'
                    fill='url(#paint0_linear_1_2881)'
                    stroke='url(#paint1_linear_1_2881)'
                    stroke-width='0.2'
                  />
                  <defs>
                    <linearGradient
                      id='paint0_linear_1_2881'
                      x1='4.5'
                      y1='1'
                      x2='4.5'
                      y2='14.2936'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stop-color='#0077B6' />
                      <stop offset='1' stop-color='#003661' />
                    </linearGradient>
                    <linearGradient
                      id='paint1_linear_1_2881'
                      x1='4.5'
                      y1='1'
                      x2='4.5'
                      y2='14.2936'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stop-color='#0077B6' />
                      <stop offset='1' stop-color='#003661' />
                    </linearGradient>
                  </defs>
                </svg>
              </Link>
            )}
          </div>

          {loading && <p className='text-center mt-4'>Загрузка...</p>}
          {error && <p className='text-center mt-4 text-red-500'>{error}</p>}

          {!loading && !error && (
            <div className='grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-10 mt-8'>
              {visibleCategories.map(category => (
                <div
                  key={category.id}
                  className='bg-white w-full max-w-[160px] mx-auto text-center rounded-lg p-5 shadow-md'
                >
                  <img
                    className='mb-6 mx-auto'
                    src={category.image}
                    alt={category.title}
                  />
                  <b className='font-inter'>{category.title}</b>
                </div>
              ))}
            </div>
          )}
        </header>
      </div>
    </div>
  )
}

export default CategoryCard
