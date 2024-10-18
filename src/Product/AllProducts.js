import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductCard.css';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('jwtToken');

                if (!token) {
                    throw new Error('No JWT token found.');
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
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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

    if (loading) {
        return <div>Loading product details...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (products.length === 0) {
        return <div>No details available at the moment.</div>;
    }

    return (

        <div className="homepage">
            <div className="food-grid">

                {products.map(product => (
                    <div
                        key={product.productId}
                        onClick={() => handleProductDetailsClick(product.productId, product.productName)}
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
