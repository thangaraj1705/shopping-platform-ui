import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import './SearchResults.css';

const SearchResults = () => {
    const location = useLocation();
    const products = location.state?.products || [];

    return (
        <div className="search-results-page">
            <h2>Search Results</h2>
            <div className="product-results">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product.productId} product={product} />
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
