import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductCard.css';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('jwtToken');

                if (!token) {
                    console.error('No JWT token found.');
                    return;
                }
                const response = await axios.get('http://localhost:8085/listProducts', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Fetched products:', response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error.response ? error.response.data : error.message);
            }
        };

        fetchProducts();
    }, []);

    return (

        <div className="homepage">
            <div className="food-grid">
                {products.map(product => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
