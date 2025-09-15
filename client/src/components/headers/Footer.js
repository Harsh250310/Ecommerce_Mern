import React from 'react'
import { Link } from 'react-router-dom'
import { 
    FiShoppingBag, 
    FiMail, 
    FiPhone, 
    FiMapPin, 
    FiFacebook, 
    FiTwitter, 
    FiInstagram, 
    FiYoutube,
    FiHeart,
    FiShield,
    FiTruck,
    FiHeadphones
} from 'react-icons/fi'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="modern-footer">
            <div className="footer-container">
                {/* Main Footer Content */}
                <div className="footer-main">
                    {/* Company Info */}
                    <div className="footer-section">
                        <div className="footer-logo">
                            <FiShoppingBag size={32} />
                            <h3>ShopHub</h3>
                        </div>
                        <p className="footer-description">
                            Your one-stop destination for premium products. We bring you the best quality items 
                            with fast delivery and exceptional customer service.
                        </p>
                        <div className="social-links">
                            <a href="https://facebook.com" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                <FiFacebook size={20} />
                            </a>
                            <a href="https://twitter.com" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                                <FiTwitter size={20} />
                            </a>
                            <a href="https://instagram.com" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                <FiInstagram size={20} />
                            </a>
                            <a href="https://youtube.com" className="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                                <FiYoutube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="footer-section">
                        <h4 className="footer-title">Categories</h4>
                        <ul className="footer-links">
                            <li><Link to="/category/electronics">Electronics</Link></li>
                            <li><Link to="/category/fashion">Fashion</Link></li>
                            <li><Link to="/category/home">Home & Garden</Link></li>
                            <li><Link to="/category/sports">Sports & Outdoors</Link></li>
                            <li><Link to="/category/beauty">Beauty & Personal Care</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="footer-section">
                        <h4 className="footer-title">Customer Service</h4>
                        <ul className="footer-links">
                            <li><Link to="/help">Help Center</Link></li>
                            <li><Link to="/shipping">Shipping Info</Link></li>
                            <li><Link to="/returns">Returns & Exchanges</Link></li>
                            <li><Link to="/size-guide">Size Guide</Link></li>
                            <li><Link to="/track-order">Track Your Order</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-section">
                        <h4 className="footer-title">Contact Info</h4>
                        <div className="contact-info">
                            <div className="contact-item">
                                <FiMapPin size={18} />
                                <span>123 Commerce Street, Business District, NY 10001</span>
                            </div>
                            <div className="contact-item">
                                <FiPhone size={18} />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="contact-item">
                                <FiMail size={18} />
                                <span>support@shophub.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="footer-features">
                    <div className="feature-item">
                        <div className="feature-icon">
                            <FiTruck size={24} />
                        </div>
                        <div className="feature-content">
                            <h5>Free Shipping</h5>
                            <p>On orders over $50</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">
                            <FiShield size={24} />
                        </div>
                        <div className="feature-content">
                            <h5>Secure Payment</h5>
                            <p>100% secure checkout</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">
                            <FiHeadphones size={24} />
                        </div>
                        <div className="feature-content">
                            <h5>24/7 Support</h5>
                            <p>Always here to help</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">
                            <FiHeart size={24} />
                        </div>
                        <div className="feature-content">
                            <h5>Quality Guarantee</h5>
                            <p>Premium products only</p>
                        </div>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="newsletter-section">
                    <div className="newsletter-content">
                        <h4>Stay Updated</h4>
                        <p>Subscribe to our newsletter for exclusive deals and new arrivals</p>
                        <form className="newsletter-form">
                            <div className="newsletter-input-group">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email address"
                                    className="newsletter-input"
                                />
                                <button type="submit" className="newsletter-btn">
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <div className="copyright">
                            <p>&copy; 2024 ShopHub. All rights reserved.</p>
                        </div>
                        <div className="footer-bottom-links">
                            <Link to="/privacy">Privacy Policy</Link>
                            <Link to="/terms">Terms of Service</Link>
                            <Link to="/cookies">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
