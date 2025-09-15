import React, { useContext, useState } from 'react'
import { MdOutlineMenu, MdClose, MdOutlineAddShoppingCart, MdSearch, MdPerson, MdAdminPanelSettings } from "react-icons/md";
import { FiShoppingBag, FiUser, FiLogOut, FiClock } from "react-icons/fi";
import {Link} from 'react-router-dom'
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
import './header.css';

const Header = () => {
    const state = useContext(GlobalState)
    const [isLogged,setIsLogged] = state.userAPI.isLogged
    const [isAdmin,setIsAdmin] = state.userAPI.isAdmin 
    const [cart] = state.userAPI.cart
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const logoutUser = async() => {
        await axios.get('/user/logout')
        localStorage.clear()
        setIsAdmin(false)
        setIsLogged(false)
        setIsMenuOpen(false)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        // Implement search functionality here
        console.log('Searching for:', searchQuery)
    }

    const adminRouter = () => {
        return (
            <>
                <li className="nav-item">
                    <Link to='/create_product' className="nav-link">
                        <FiShoppingBag className="nav-icon" />
                        Create Product
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/category' className="nav-link">
                        <MdAdminPanelSettings className="nav-icon" />
                        Categories
                    </Link>
                </li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <>
                <li className="nav-item">
                    <Link to='/history' className="nav-link">
                        <FiClock className="nav-icon" />
                        History
                    </Link>
                </li>
                <li className="nav-item">
                    <button onClick={logoutUser} className="nav-link logout-btn">
                        <FiLogOut className="nav-icon" />
                        Logout
                    </button>
                </li>
            </>
        )
    }

    return (
        <header className="modern-header">
            <div className="header-container">
                {/* Mobile Menu Button */}
                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    {isMenuOpen ? <MdClose size={24} /> : <MdOutlineMenu size={24} />}
                </button>

                {/* Logo */}
                <div className="logo-section">
                    <Link to="/" className="logo-link">
                        <div className="logo-icon">
                            <FiShoppingBag size={32} />
                        </div>
                        <h1 className="logo-text">
                            {isAdmin ? 'Admin Panel' : 'ShopHub'}
                        </h1>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="search-section">
                    <form onSubmit={handleSearch} className="search-form">
                        <div className="search-input-group">
                            <MdSearch className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </form>
                </div>

                {/* Navigation */}
                <nav className={`main-nav ${isMenuOpen ? 'nav-open' : ''}`}>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                {isAdmin ? 'Products' : 'Shop'}
                            </Link>
                        </li>

                        {isAdmin && adminRouter()}
                        
                        {isLogged ? (
                            loggedRouter()
                        ) : (
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    <FiUser className="nav-icon" />
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>

                {/* Cart Icon */}
                {!isAdmin && (
                    <div className="cart-section">
                        <Link to='/cart' className="cart-link">
                            <div className="cart-icon">
                                <MdOutlineAddShoppingCart size={24} />
                                {cart.length > 0 && (
                                    <span className="cart-badge">{cart.length}</span>
                                )}
                            </div>
                        </Link>
                    </div>
                )}

                {/* User Profile */}
                {isLogged && (
                    <div className="user-section">
                        <div className="user-avatar">
                            <MdPerson size={24} />
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="mobile-overlay" onClick={toggleMenu}></div>
            )}
        </header>
    )
}

export default Header
