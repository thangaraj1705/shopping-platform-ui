import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ViewCart.module.css';

const ViewCart = () => {
    const location = useLocation();
    const { product } = location.state || {};
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <div>Product details not available</div>;
    }

    const discountAmount = (product.productPrice * product.productDiscount) / 100;
    const finalPrice = product.productPrice - discountAmount;

    const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(prevQuantity => prevQuantity - 1);
    };

    return (
        <div className={styles.cartItemContainer}>
            <div className={styles.imageContainer}>
                <img
                    src={`/ProductsImg/${product.productImgPath}`}
                    alt={product.productName}
                    className={styles.productImage}
                />
            </div>
            <div className={styles.productInfo}>
                <p className={styles.productName}>{product.productName}</p>

                <div className={styles.priceSection}>
                    <span className={styles.originalPrice}>₹{product.productPrice}</span>
                    <span className={styles.discountedPrice}><b>₹{finalPrice.toFixed(2)}</b></span>
                    <span className={styles.discount}>{product.productDiscount}% Off</span>
                </div>

                <div className={styles.quantityControl}>
                    <button onClick={decreaseQuantity} className={styles.quantityButton}>-</button>
                    <span className={styles.quantity}>{quantity}</span>
                    <button onClick={increaseQuantity} className={styles.quantityButton}>+</button>
                </div>

                <button className={styles.addToCartButton}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ViewCart;
