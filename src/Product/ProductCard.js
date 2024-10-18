import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="image-wrapper">
            <img 
                    src={`/ProductsImg/${product.productImgPath}`} 
                    alt={product.productName} 
                    className="product-image" 
                />
                {product.productDiscount > 0 && (
                    <div className="discount-badge">-{product.productDiscount}%</div>
                )}
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.productName}</h3>
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
