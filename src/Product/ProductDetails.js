import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
    const location = useLocation();
    const { product } = location.state || {};
    console.log('Received location state:', location.state);

    console.log('Received product:', product);
    if (!product) {
        return <div>Product details not available</div>;
    }

    return (
        <div className={styles.productDetailsContainer}>
            <div className={styles.leftSide}>
                <img
                    src={`/ProductsImg/${product.productImgPath}`}
                    alt={product.productName}
                    className={styles.productImage}
                />
                <div className={styles.buttonContainer}>
                <Link to="/viewcart" state={{ product }}><button className={styles.addToCartButton}>Add to Cart</button></Link>
                    <button className={styles.buyNowButton}>Buy Now</button>
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.productInfo}>
                    <p className={styles.productName}>{product.productName}</p>
                    <div className={styles.priceSection}>
                        <p className={styles.productPrice}><b>₹{product.productPrice}</b></p>
                        <p className={styles.productDiscount}>{product.productDiscount}% off</p>
                    </div>
                    <p className={styles.productRating}>
                        {product.productRating} ★
                    </p>

                </div>

                <div className={styles.productDetails}>
                    <h2>Product Details</h2>
                    <p>Name : {product.productDescription}</p>
                    <p>In Stock : {product.quantityInStock}</p>
                    <div className={styles.productFeatures}>
                        <h3>Product Features</h3>
                        {product.productFeatures ? (
                            <div>
                                <p>Flavour : {product.productFeatures.flavour || 'N/A'}</p>
                                <p>Product Life : {product.productFeatures.productLife || 'N/A'}</p>
                                <p>Storage Instructions : {product.productFeatures.storageInstructions || 'N/A'}</p>
                                {product.productFeatures.veg === 'Yes' ? (
                                    <p>Veg : Yes</p>
                                ) : (
                                    <p>Non-Veg : Yes</p>
                                )}
                            </div>
                        ) : (
                            <p>No features available</p>
                        )}

                    </div>
                    <div className={styles.nutritionInfo}>
                        <h3>Nutrition Info</h3>
                        {product.nutritionInfo ? (
                            <div>
                                <p>Calories : {product.nutritionInfo.calories || 'N/A'}</p>
                                <p>Fats : {product.nutritionInfo.fats || 'N/A'}</p>
                                <p>Proteins : {product.nutritionInfo.proteins || 'N/A'}</p>
                                <p>carbohydrates : {product.nutritionInfo.carbohydrates || 'N/A'}</p>
                                <p>sugar : {product.nutritionInfo.sugar || 'N/A'}</p>
                            </div>
                        ) : (
                            <p>No features available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
