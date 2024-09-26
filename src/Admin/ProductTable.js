import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductTable.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleDelete = (id) => {
    const token = localStorage.getItem('jwtToken');
    if (window.confirm(`Are you sure want to delete the product with ID : ${id}?`)) {
      axios.delete(`http://localhost:8085/delete`,
        {
          params: { productId: id },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then((response) => {
          console.log(response.data);
          fetchProducts();
        })
        .catch((error) => console.error('Error :', error));
    }

  };

  const handleUpdate = (id) => {
    console.log(`Update product with ID: ${id}`);
    // Add update logic here
  };

  return (
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>
                <img src={`/ProductsImg/${product.productImgPath}`} alt={product.productName} className="product-img" />
              </td>
              <td>{product.productName}</td>
              <td>{product.productDescription}</td>
              <td>₹{product.productPrice.toFixed(2)}</td>
              <td>{product.productDiscount}%</td>
              <td>{product.productRating}</td>
              <td>
                <button className="btn update-btn" onClick={() => handleUpdate(product.productId)}>
                  <FaEdit /> Update
                </button>
                <button className="btn delete-btn" onClick={() => handleDelete(product.productId)}>
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
