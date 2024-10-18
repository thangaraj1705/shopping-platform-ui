import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductForm.css';

const UpdateProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = location.state;
  const productName = location.pathname.split("/")[2];
  const [selectedFile]=useState(null);

  const [productData, setProductData] = useState({
    productName: '',
    productDescription: '',
    productPrice: 0,
    productDiscount: 0,
    productImgPath: '',
    productRating: 0,
    quantityInStock: 0,
    productFeatures: '',
    nutritionInfo: ''
  });


  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
          console.error('No JWT token found.');
          return;
        }

        const response = await axios.get(`http://localhost:8085/update-product/${productName}`, {
          params: {
            productId: productId,
          },
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setProductData(response.data);
        } else {
          alert('Product not found or no content!');
        }
      } catch (error) {
        console.error('Error fetching product:', error.response ? error.response.data : error.message);
      }
    };

    fetchProductData();
  }, [productId, productName]);


  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProduct = () => {
    // Create FormData to send file along with product data
    const formData = new FormData();
    formData.append('file', selectedFile); // selectedFile is the image file
    formData.append('productRequestDTO', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
  
    axios.put(`/update-product/${productId}/${productData.productName}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
      },
    })
      .then(() => {
        alert('Product updated successfully!');
        navigate('/product-table');
      })
      .catch(error => console.error('Error updating product:', error));
  };
  

  return (
    <div className="product-form-container">
      <h1 className="form-title">Update Product</h1>
      <form className="product-form">
        <div className="form-group">
          <label htmlFor="productName"><i className="fas fa-tag"></i> Product Name</label>
          <input
            type="text"
            id="productName"
            value={productData.productName}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productDescription"><i className="fas fa-info-circle"></i> Description</label>
          <textarea
            id="productDescription"
            value={productData.productDescription}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productPrice"><i className="fas fa-dollar-sign"></i> Price ($)</label>
          <input
            type="number"
            id="productPrice"
            value={productData.productPrice}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productDiscount"><i className="fas fa-percent"></i> Discount (%)</label>
          <input
            type="number"
            id="productDiscount"
            value={productData.productDiscount}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantityInStock"><i className="fas fa-percent"></i> Stock</label>
          <input
            type="number"
            id="quantityInStock"
            value={productData.quantityInStock}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="flavour"><i className="fas fa-flask"></i> Flavour</label>
          <input
            type="text"
            id="flavour"
            value={productData.productFeatures.flavour}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productLife"><i className="fas fa-hourglass"></i> Product Life</label>
          <input
            type="text"
            id="productLife"
            value={productData.productFeatures.productLife}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="storageInstructions"><i className="fas fa-box"></i> Storage Instructions</label>
          <input
            type="text"
            id="storageInstructions"
            value={productData.productFeatures.storageInstructions}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group radio-line">
          <div className="radio-group">
            <label><i className="fas fa-leaf"></i> Veg</label>
            <label>
              <input
                type="radio"
                value="Yes"
                checked={productData.productFeatures.veg === 'Yes'}
                onChange={handleInputChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
                checked={productData.productFeatures.veg === 'No'}
                onChange={handleInputChange}
              />
              No
            </label>
          </div>

          <div className="radio-group">
            <label><i className="fas fa-drumstick-bite"></i> Non-Veg</label>
            <label>
              <input
                type="radio"
                value="Yes"
                checked={productData.productFeatures.nonVeg === 'Yes'}
                onChange={handleInputChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
                checked={productData.productFeatures.nonVeg === 'No'}
                onChange={handleInputChange}
              />
              No
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="calories"><i className="fas fa-fire"></i> Calories</label>
          <div className='input-container'>
            <input
              type="number"
              id="calories"
              value={productData.nutritionInfo.calories}
              onChange={handleInputChange}
              className="form-input-nutrition"
            />
            <select
              value={productData.nutritionInfo.calorieUnit}
              onChange={handleInputChange}
              className="form-select">

              <option value="kcal">kcal</option>
              <option value="cal">cal</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="fats"><i className="fas fa-bacon"></i> Fat</label>
          <div className='input-container'>
            <input
              type="number"
              id="fats"
              value={productData.nutritionInfo.fats}
              onChange={handleInputChange}
              className="form-input-nutrition"
            />
            <select
              value={productData.nutritionInfo.fatUnit}
              onChange={handleInputChange}
              className="form-select">

              <option value="g">g</option>
              <option value="mg">mg</option>
              <option value="mcg">mcg</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="proteins"><i className="fas fa-drumstick-bite"></i> Protein</label>
          <div className='input-container'>
            <input
              type="number"
              id="proteins"
              value={productData.nutritionInfo.proteins}
              onChange={handleInputChange}
              className="form-input-nutrition"
            />
            <select
              value={productData.nutritionInfo.proteinUnit}
              onChange={handleInputChange}
              className="form-select">

              <option value="g">g</option>
              <option value="mg">mg</option>
              <option value="mcg">mcg</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="carbohydrates"><i className="fas fa-drumstick-bite"></i> carbohydrates</label>
          <div className='input-container'>
            <input
              type="number"
              id="carbohydrates"
              value={productData.nutritionInfo.carbohydrates}
              onChange={handleInputChange}
              className="form-input-nutrition"
            />
            <select
              value={productData.nutritionInfo.carbohydrateUnit}
              onChange={handleInputChange}
              className="form-select">

              <option value="g">g</option>
              <option value="mg">mg</option>
              <option value="mcg">mcg</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="sugar"><i className="fas fa-drumstick-bite"></i> Sugar</label>
          <div className='input-container'>
            <input
              type="number"
              id="sugar"
              value={productData.nutritionInfo.sugar}
              onChange={handleInputChange}
              className="form-input-nutrition"
            />
            <select
              value={productData.nutritionInfo.sugarUnit}
              onChange={handleInputChange}
              className="form-select">

              <option value="g">g</option>
              <option value="mg">mg</option>
              <option value="mcg">mcg</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="file"><i className="fas fa-upload"></i> Upload Image</label>
          <input
            type="file"
            id="file"
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="button-group">
          <button type="submit" className="submit-button" onClick={handleUpdateProduct}>
            <i className="fas fa-save"></i> Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductPage;
