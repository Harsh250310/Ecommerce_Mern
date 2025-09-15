import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import { 
  FiTrash2, 
  FiPlus, 
  FiMinus, 
  FiShoppingBag, 
  FiCreditCard,
  FiTruck,
  FiShield,
  FiHeart,
  FiShare2
} from 'react-icons/fi'
import './Cart.css'

const Cart = () => {
  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart
  const [isLoading, setIsLoading] = useState(false)

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return
    
    setCart(cart.map(item => 
      item.product._id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ))
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.product._id !== productId))
  }

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.08 // 8% tax
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + 9.99 // $9.99 shipping
  }

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear cart after successful checkout
      setCart([])
      alert('Order placed successfully!')
    } catch (error) {
      alert('Checkout failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-content">
          <FiShoppingBag size={80} className="empty-cart-icon" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="item-image">
                <img src={item.product.images.url} alt={item.product.title} />
              </div>
              
              <div className="item-details">
                <h3 className="item-title">{item.product.title}</h3>
                <p className="item-category">{item.product.category}</p>
                <p className="item-description">{item.product.description}</p>
                
                <div className="item-actions">
                  <button 
                    className="action-btn wishlist-btn"
                    title="Add to Wishlist"
                  >
                    <FiHeart size={16} />
                  </button>
                  <button 
                    className="action-btn share-btn"
                    title="Share"
                  >
                    <FiShare2 size={16} />
                  </button>
                </div>
              </div>

              <div className="item-quantity">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    className="quantity-btn"
                    disabled={item.quantity <= 1}
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>

              <div className="item-price">
                <span className="price">${(item.product.price * item.quantity).toFixed(2)}</span>
                <span className="unit-price">${item.product.price} each</span>
              </div>

              <button 
                onClick={() => removeFromCart(item.product._id)}
                className="remove-btn"
                title="Remove from cart"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal ({cart.length} items)</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>$9.99</span>
            </div>
            
            <div className="summary-row">
              <span>Tax</span>
              <span>${calculateTax().toFixed(2)}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>

            <div className="checkout-features">
              <div className="feature">
                <FiTruck size={20} />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="feature">
                <FiShield size={20} />
                <span>Secure checkout</span>
              </div>
            </div>

            <button 
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Processing...
                </>
              ) : (
                <>
                  <FiCreditCard size={20} />
                  Proceed to Checkout
                </>
              )}
            </button>

            <Link to="/" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
