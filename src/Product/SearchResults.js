import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import axios from 'axios';
import './SearchResults.css';   
import './ProductCard.css';

const SearchResults = () => {
    const location = useLocation();
    const products = location.state?.products || [];
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleProductDetailsClick = async (productId, productName) => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get(`http://localhost:8085/product-details/${productName}`, {
                params: {
                    productId: productId,
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const filteredProducts = response.data;

            if (!filteredProducts) {
                throw new Error('No product data found');
            }
            console.log('Product to navigate:', filteredProducts);
            navigate(`/product-details/${productName}`, { state: { product: filteredProducts } });
        } catch (error) {
            console.error('Error filtering : ', error);
            setError('Failed to filter offers. Please try again later!!!');
        }

    };
    if (error) {
        return <div>{error}</div>;
    }

    if (products.length === 0) {
        return <div>No details available at the moment.</div>;
    }


    return (
        <div className="search-results-page">
            <h2>Search Results</h2>
            <div className="product-results">
                {products.length > 0 ? (
                    products.map(product => (
                        <div
                            key={product.productId}
                            onClick={() => handleProductDetailsClick(product.productId, product.productName)}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
