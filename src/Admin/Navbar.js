
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; 
import { FaUserCircle  } from 'react-icons/fa';

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <nav className="navbar">
            <div className="navbar-content">

                <ul className="navbar-menu">
                    <li>
                        <Link to="/dashboard" className={`nav-link ${currentPath === '/dashboard' ? 'active' : ''}`}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/add-product" className={`nav-link ${currentPath === '/add-product' ? 'active' : ''}`}>
                            Add Product
                        </Link>
                    </li>
                    <li>
                        <Link to="/add-advertisement" className={`nav-link ${currentPath === '/add-advertisement' ? 'active' : ''}`}>
                            Add Advertisement
                        </Link>
                    </li>
                    <li>
                        <Link to="/add-offer" className={`nav-link ${currentPath === '/add-offer' ? 'active' : ''}`}>
                            Add Offer
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="nav-icons">
            <Link to="/SignIn"> <div className="login-icon"> <FaUserCircle /></div></Link> 
            </div>
        </nav>
    );
};

export default Navbar;
