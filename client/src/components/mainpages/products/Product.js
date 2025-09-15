import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductList from '../utils/ProductLists/ProductList'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './Product.css'

const Product = () => {
  const state = useContext(GlobalState)
  const [products, setProducts] = state.productsAPI.products
  const [isAdmin] = state.userAPI.isAdmin
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const productsPerPage = 9

  // Fetch all products without pagination
  const fetchAllProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/products?limit=1000') // Get all products
      const data = await response.json()
      setAllProducts(data.products)
      setTotalPages(Math.ceil(data.products.length / productsPerPage))
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  // Get current page products
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    return allProducts.slice(startIndex, endIndex)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  const renderPagination = () => {
    const pages = []
    const maxVisiblePages = 5
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      )
    }

    return (
      <div className="pagination">
        <button
          className="pagination-btn prev-btn"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <FiChevronLeft size={18} />
          Previous
        </button>
        
        {startPage > 1 && (
          <>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
            {startPage > 2 && <span className="pagination-ellipsis">...</span>}
          </>
        )}
        
        {pages}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button
          className="pagination-btn next-btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
          <FiChevronRight size={18} />
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="products-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    )
  }

  return (
    <div className='products-container'>
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Showing {getCurrentPageProducts().length} of {allProducts.length} products</p>
      </div>
      
      <div className='products'>      
        {
          getCurrentPageProducts().map(product => {
            return <ProductList key={product._id} product={product} isAdmin={isAdmin}/>
          })
        }      
      </div>

      {totalPages > 1 && (
        <div className="pagination-container">
          {renderPagination()}
        </div>
      )}
    </div>
  )
}

export default Product
