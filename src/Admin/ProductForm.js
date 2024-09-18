import React, { useState } from 'react';
import axios from 'axios';
import './ProductForm.css'; 

const ProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDiscount, setProductDiscount] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('productPrice', productPrice);
        formData.append('productDiscount', productDiscount);
        if (file) formData.append('file', file);

        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                console.error('No JWT token found.');
                return;
            }

            const response = await axios.post('http://localhost:8085/addproduct', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Product saved successfully:', response.data);

            setProductName('');
            setProductDescription('');
            setProductPrice('');
            setProductDiscount('');
            setFile('');


        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <div className="product-form-container">
            <h1 className="form-title">Add New Product</h1>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="productName"><i className="fas fa-tag"></i> Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productDescription"><i className="fas fa-info-circle"></i> Description</label>
                    <textarea
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productPrice"><i className="fas fa-dollar-sign"></i> Price ($)</label>
                    <input
                        type="number"
                        id="productPrice"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productDiscount"><i className="fas fa-percent"></i> Discount (%)</label>
                    <input
                        type="number"
                        id="productDiscount"
                        value={productDiscount}
                        onChange={(e) => setProductDiscount(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="file"><i className="fas fa-upload"></i> Upload Image</label>
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="form-input"
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-button">
                        <i className="fas fa-save"></i> Save Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
