import { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function ProductCard () {
  const [products, setProducts] = useState([])
  const location = useLocation()

  useEffect(() => {
    fetch('http://localhost:8080/ProductCard')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error))
  }, [])

  const displayedProducts =
    location.pathname === '/' ? products.slice(0, 4) : products

  return (
    <div className='w-full max-w-7xl mx-auto px-4 mt-[100px]'>
      {location.pathname === '/' && (
        <div className='flex flex-col sm:flex-row justify-between items-center mb-[30px]'>
          <b className='text-lg sm:text-2xl font-inter mb-4 sm:mb-0'>
            Новинки на сайте
          </b>
          <Link
            to='/all-categories'
            className='text-sm sm:text-base cursor-pointer text-[#0077B6] font-inter flex justify-center items-center gap-2'
          >
            Смотреть все
            <svg
              width='9'
              height='15'
              viewBox='0 0 9 15'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1.15582 1.15643C1.05593 1.25871 1 1.396 1 1.53896C1 1.68192 1.05593 1.81921 1.15582 1.92149L6.7368 7.64678L1.15582 13.3709C1.05593 13.4732 1 13.6105 1 13.7534C1 13.8964 1.05593 14.0337 1.15582 14.136C1.20438 14.1858 1.26243 14.2255 1.32656 14.2525C1.39068 14.2796 1.45958 14.2936 1.52918 14.2936C1.59879 14.2936 1.66769 14.2796 1.73181 14.2525C1.79594 14.2255 1.85399 14.1858 1.90255 14.136L7.83742 8.04648C7.94166 7.93954 8 7.79611 8 7.64678C8 7.49744 7.94166 7.35401 7.83742 7.24707L1.90255 1.15758C1.85399 1.10771 1.79594 1.06807 1.73181 1.04101C1.66769 1.01394 1.59879 1 1.52918 1C1.45958 1 1.39068 1.01394 1.32656 1.04101C1.26243 1.06807 1.20438 1.10771 1.15582 1.15758V1.15643Z'
                fill='url(#paint0_linear_1_1603)'
                stroke='url(#paint1_linear_1_1603)'
                stroke-width='0.2'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_1_1603'
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
                  id='paint1_linear_1_1603'
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
        </div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4'>
        {displayedProducts.map((product, index) => (
          <div
            key={product.id}
            className={`w-full sm:w-[255px] h-auto sm:h-[401px] rounded-lg border bg-white shadow-sm ${
              index >= 4 ? 'lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1' : ''
            }`}
          >
            <div className='flex items-center justify-center p-6 sm:p-10'>
              <img
                src={product.img}
                alt={product.title}
                className='max-h-36 object-contain'
              />
            </div>
            <p className='mx-4 text-sm w-[195px] sm:text-base font-inter w-full'>
              {product.title}
            </p>
            <b className='mx-4 text-sm sm:text-base'>{product.price}</b>
            <div className='m-4 mt-4'>
              <button className='flex items-center justify-center bg-[#FFB12A] text-white gap-2 border border-[#FFB12A] rounded-lg p-2 w-full sm:w-auto'>
                <ShoppingCart size={20} />В корзину
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
