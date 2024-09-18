import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const imagePath = require(`../img/${product.productImgPath}`);
    console.log('Image path:',imagePath); 
    return (
        <div className="product-card">
            <div className="image-wrapper">
            <img 
                    src={imagePath} 
                    alt={product.productName} 
                    className="product-image" 
                />
                {product.productDiscount > 0 && (
                    <div className="discount-badge">-{product.productDiscount}%</div>
                )}
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.productName}</h3>
                <p className="product-description">{product.productDescription}</p>
                <div className="price-section">
                    <span className="product-price">₹{product.productPrice.toFixed(2)}</span>
                    {product.productOriginalPrice > product.productPrice && (
                        <span className="original-price">${product.productOriginalPrice.toFixed(2)}</span>
                    )}
                </div>
                <button className="add-to-cart-button">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;
