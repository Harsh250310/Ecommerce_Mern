import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import { 
  FiClock, 
  FiPackage, 
  FiTruck, 
  FiCheckCircle, 
  FiXCircle,
  FiEye,
  FiDownload,
  FiStar,
  FiMessageCircle,
  FiRefreshCw,
  FiFilter,
  FiSearch
} from 'react-icons/fi'
import './History.css'

const History = () => {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [isLoading, setIsLoading] = useState(false)

  // Mock order history data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 299.99,
      items: [
        {
          id: 'ELEC001',
          name: 'iPhone 15 Pro Max',
          price: 1199,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'
        }
      ],
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-01-18',
      actualDelivery: '2024-01-17'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 89.99,
      items: [
        {
          id: 'FASH001',
          name: 'Nike Air Jordan 1 Retro',
          price: 170,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'
        }
      ],
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-01-14'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      total: 549.99,
      items: [
        {
          id: 'HOME001',
          name: 'Dyson V15 Detect Vacuum',
          price: 749,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
        }
      ],
      estimatedDelivery: '2024-01-12'
    },
    {
      id: 'ORD-004',
      date: '2023-12-28',
      status: 'cancelled',
      total: 199.99,
      items: [
        {
          id: 'SPORT001',
          name: 'Peloton Bike+',
          price: 2495,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'
        }
      ],
      cancellationReason: 'Customer requested cancellation'
    }
  ])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FiCheckCircle className="status-icon delivered" />
      case 'shipped':
        return <FiTruck className="status-icon shipped" />
      case 'processing':
        return <FiPackage className="status-icon processing" />
      case 'cancelled':
        return <FiXCircle className="status-icon cancelled" />
      default:
        return <FiClock className="status-icon" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Delivered'
      case 'shipped':
        return 'Shipped'
      case 'processing':
        return 'Processing'
      case 'cancelled':
        return 'Cancelled'
      default:
        return 'Unknown'
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.items.some(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || order.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date)
      case 'oldest':
        return new Date(a.date) - new Date(b.date)
      case 'total-high':
        return b.total - a.total
      case 'total-low':
        return a.total - b.total
      default:
        return 0
    }
  })

  const handleReorder = (orderId) => {
    setIsLoading(true)
    // Simulate reorder process
    setTimeout(() => {
      alert('Items have been added to your cart!')
      setIsLoading(false)
    }, 1500)
  }

  const handleTrackOrder = (trackingNumber) => {
    window.open(`https://tracking.example.com/${trackingNumber}`, '_blank')
  }

  const handleDownloadInvoice = (orderId) => {
    // Simulate invoice download
    alert(`Downloading invoice for order ${orderId}`)
  }

  const handleWriteReview = (itemId) => {
    alert(`Opening review form for item ${itemId}`)
  }

  if (!isLogged) {
    return (
      <div className="history-login-required">
        <div className="login-required-content">
          <FiClock size={80} className="login-icon" />
          <h2>Login Required</h2>
          <p>Please log in to view your order history.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h1>Order History</h1>
        <p>Track and manage your past orders</p>
      </div>

      <div className="history-filters">
        <div className="search-section">
          <div className="search-input-group">
            <FiSearch className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search orders or products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label>Status:</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Orders</option>
              <option value="delivered">Delivered</option>
              <option value="shipped">Shipped</option>
              <option value="processing">Processing</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="total-high">Highest Total</option>
              <option value="total-low">Lowest Total</option>
            </select>
          </div>
        </div>
      </div>

      <div className="orders-list">
        {sortedOrders.length === 0 ? (
          <div className="no-orders">
            <FiPackage size={60} className="no-orders-icon" />
            <h3>No orders found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          sortedOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">Placed on {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="order-status">
                  {getStatusIcon(order.status)}
                  <span className={`status-text ${order.status}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p className="item-price">${item.price.toFixed(2)}</p>
                    </div>
                    {order.status === 'delivered' && (
                      <button 
                        className="review-btn"
                        onClick={() => handleWriteReview(item.id)}
                      >
                        <FiStar size={16} />
                        Write Review
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <span>Total: <strong>${order.total.toFixed(2)}</strong></span>
                </div>

                <div className="order-actions">
                  <button 
                    className="action-btn view-btn"
                    onClick={() => alert(`Viewing details for order ${order.id}`)}
                  >
                    <FiEye size={16} />
                    View Details
                  </button>

                  {order.trackingNumber && (
                    <button 
                      className="action-btn track-btn"
                      onClick={() => handleTrackOrder(order.trackingNumber)}
                    >
                      <FiTruck size={16} />
                      Track Package
                    </button>
                  )}

                  <button 
                    className="action-btn download-btn"
                    onClick={() => handleDownloadInvoice(order.id)}
                  >
                    <FiDownload size={16} />
                    Invoice
                  </button>

                  {order.status !== 'cancelled' && (
                    <button 
                      className="action-btn reorder-btn"
                      onClick={() => handleReorder(order.id)}
                      disabled={isLoading}
                    >
                      <FiRefreshCw size={16} />
                      Reorder
                    </button>
                  )}
                </div>
              </div>

              {order.estimatedDelivery && (
                <div className="delivery-info">
                  <p>
                    <strong>Estimated Delivery:</strong> {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </p>
                  {order.actualDelivery && (
                    <p>
                      <strong>Delivered on:</strong> {new Date(order.actualDelivery).toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}

              {order.cancellationReason && (
                <div className="cancellation-info">
                  <p><strong>Cancellation Reason:</strong> {order.cancellationReason}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default History
