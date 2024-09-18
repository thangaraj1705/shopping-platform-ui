import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [productName, setProductName] = useState('');

  const handleAddProduct = () => {
    axios.post('/api/products', { name: productName })
      .then(response => {
        console.log('Product added:', response.data);
      })
      .catch(error => {
        console.error('There was an error adding the product!', error);
      });
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Product Name"
      />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;
