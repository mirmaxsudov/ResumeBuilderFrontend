import React from 'react'
import Header from '../components/Header'
import CategoryCard from '../components/CategoryCard'
import ProductCard from './../components/ProductCard'

const Home = () => {
  return (
    <div className='bg-[#fafafa]'>
      <Header />
      <CategoryCard />
      <ProductCard />
    </div>
  )
}

export default Home
