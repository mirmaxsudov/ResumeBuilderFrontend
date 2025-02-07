import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CategoryCard from './components/CategoryCard'
import Nav from './components/Nav'
import ProductCard from './components/ProductCard'

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<CategoryCard />} />
        <Route path='/all-categories' element={<ProductCard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
