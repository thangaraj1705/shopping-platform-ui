import React, { useState } from 'react';
import axios from 'axios';
import './ProductForm.css';  

const UploadOfferForm = () => {
    const [offerProductName, setOfferProductName] = useState("");
    const [fromAmount, setFromAmount] = useState("");
    const [offerPercentage, setOfferPercentage] = useState("");
    const [offerImage, setOfferImage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("offerProductName", offerProductName);
        formData.append("fromAmount", fromAmount);
        formData.append("offerPercentage", offerPercentage);
        formData.append("offerImage", offerImage);

        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                console.error('No JWT token found.');
                return;
            }

            const response = await axios.post('http://localhost:8085/uploadOffer', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Ad saved successfully:', response.data);

            setOfferProductName('');
            setFromAmount('');
            setOfferPercentage('');
            setOfferImage('');


        } catch (error) {
            console.error('Error saving Advertisement:', error);
        }
    };

    return (
        <div className="product-form-container">
            <h1 className="form-title">Upload Offer</h1>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="offerProductName"><i className="fas fa-tag"></i> Product Name</label>
                    <input
                        type="text"
                        id="offerProductName"
                        value={offerProductName}
                        onChange={(e) => setOfferProductName(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fromAmount"><i className="fas fa-tag"></i> From Amount</label>
                    <input
                        type="text"
                        id="fromAmount"
                        value={fromAmount}
                        onChange={(e) => setFromAmount(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="offerPercentage"><i className="fas fa-percent"></i> Discount (%)</label>
                    <input
                        type="number"
                        id="offerPercentage"
                        value={offerPercentage}
                        onChange={(e) => setOfferPercentage(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="offerImage"><i className="fas fa-upload"></i> Upload Image</label>
                    <input
                        type="file"
                        id="offerImage"
                        onChange={(e) => setOfferImage(e.target.files[0])}
                        className="form-input"
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-button">
                        <i className="fas fa-save"></i> Upload Offer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploadOfferForm;
