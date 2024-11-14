import React, { useState } from 'react';
import axios from 'axios';
import './TopNavbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
<link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Roboto:wght@700&display=swap" rel="stylesheet"></link>

const TopNavbar = () => {
    const [searchProduct, setSearchProduct] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearchProduct(e.target.value);
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('jwtToken');

            if (!token) {
                console.error('No JWT token found.');
                return;
            }

            const response = await axios.get(`http://localhost:8085/search`, {
                params: { name: searchProduct },
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });


            navigate('/search-results', { state: { products: response.data } });

        } catch (err) {
            setError('Failed to fetch products. Please try again.');
            console.error('Error fetching search results:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="top-navbar">
            <div className="logo">
                <span className="logo-symbol">👨‍🍳</span>
                <span className="logo-text">Kitchen Hub</span>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for products"
                    value={searchProduct}
                    onChange={handleInputChange}
                />
                <button className="search-btn" onClick={handleSearch}>Search</button>

                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
            </div>
            <div className="nav-icons">
                <Link to="/SignIn"> <div className="login-icon"> <FaUserCircle /></div></Link>
                <div className="cart-icon"><FaShoppingCart /></div>
            </div>
        </div>
    );
};

export default TopNavbar;
