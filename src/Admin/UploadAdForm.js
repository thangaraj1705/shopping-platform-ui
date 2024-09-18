import React, { useState } from 'react';
import axios from 'axios';
import './ProductForm.css';  

const UploadAdForm = () => {
    const [productAd, setProductAd] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [poster, setPoster] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("productAd", productAd);
        formData.append("discountPercentage", discountPercentage);
        formData.append("poster", poster);

        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                console.error('No JWT token found.');
                return;
            }

            const response = await axios.post('http://localhost:8085/uploadAd', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Ad saved successfully:', response.data);

            setProductAd('');
            setDiscountPercentage('');
            setPoster('');


        } catch (error) {
            console.error('Error saving Advertisement:', error);
        }
    };

    return (
        <div className="product-form-container">
            <h1 className="form-title">Upload Advertisement</h1>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="productAd"><i className="fas fa-tag"></i> Product Name</label>
                    <input
                        type="text"
                        id="productAd"
                        value={productAd}
                        onChange={(e) => setProductAd(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="discountPercentage"><i className="fas fa-percent"></i> Discount (%)</label>
                    <input
                        type="number"
                        id="discountPercentage"
                        value={discountPercentage}
                        onChange={(e) => setDiscountPercentage(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="poster"><i className="fas fa-upload"></i> Upload Image</label>
                    <input
                        type="file"
                        id="poster"
                        onChange={(e) => setPoster(e.target.files[0])}
                        className="form-input"
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-button">
                        <i className="fas fa-save"></i> Upload Ad
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploadAdForm;
