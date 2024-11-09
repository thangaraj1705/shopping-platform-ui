import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ProductForm.css';

const UpdateProductPage = () => {
  const location = useLocation();
  const { productId } = location.state || {};
  const productName = location.pathname.split("/")[2];

  const [selectedFile, setSelectedFile] = useState(null);
  const [productData, setProductData] = useState({
    productName: '',
    productDescription: '',
    productPrice: 0,
    productDiscount: 0,
    productImgPath: '',
    quantityInStock: 0,
    productFeaturesDTO: { flavour: '', productLife: '', storageInstructions: '', veg: '', nonVeg: '' },
    nutritionInfoDTO: { calories: 0, calorieUnit: 'kcal', fats: 0, fatUnit: '', proteins: 0, proteinUnit: 'g', carbohydrates: 0, carbohydrateUnit: 'g', sugar: 0, sugarUnit: 'g' }
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          console.error('No JWT token found.');
          return;
        }

        const response = await axios.get(`http://localhost:8085/populate-product/${productName}`, {
          params: { productId: productId },
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.status === 200) {
          const data = response.data;

          setProductData({
            productName: data.productName || '',
            productDescription: data.productDescription || '',
            productPrice: data.productPrice || 0,
            productDiscount: data.productDiscount || 0,
            productImgPath: data.productImgPath || '',
            quantityInStock: data.quantityInStock || 0,
            productFeaturesDTO: {
              flavour: data.productFeatures?.flavour || '',
              productLife: data.productFeatures?.productLife || '',
              storageInstructions: data.productFeatures?.storageInstructions || '',
              veg: data.productFeatures?.veg || null,
              nonVeg: data.productFeatures?.nonVeg || null
            },
            nutritionInfoDTO: {
              calories: data.nutritionInfo?.calories || 0,
              calorieUnit: data.nutritionInfo?.calorieUnit || 'kcal',
              fats: data.nutritionInfo?.fats || 0,
              fatUnit: data.nutritionInfo?.fatUnit || 'g',
              proteins: data.nutritionInfo?.proteins || 0,
              proteinUnit: data.nutritionInfo?.proteinUnit || 'g',
              carbohydrates: data.nutritionInfo?.carbohydrates || 0,
              carbohydrateUnit: data.nutritionInfo?.carbohydrateUnit || 'g',
              sugar: data.nutritionInfo?.sugar || 0,
              sugarUnit: data.nutritionInfo?.sugarUnit || 'g'
            }
          });
          console.log('Features dto data : ',data.productFeaturesDTO);
          console.log('nutrition dto data : ',data.nutritionInfoDTO);
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
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProductData((prevState) => ({
        ...prevState,
        [parent]: { ...prevState[parent], [child]: value }
      }));
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setSelectedFile(file);
  };

  const handleUpdateProduct = async () => {
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("productName", productData.productName);

    const productRequestDTO = {
      productName: productData.productName,
      productDescription: productData.productDescription,
      productPrice: productData.productPrice,
      productDiscount: productData.productDiscount,
      productImgPath: productData.productImgPath,
      quantityInStock: productData.quantityInStock,
      productFeaturesDTO: productData.productFeaturesDTO,
      nutritionInfoDTO: productData.nutritionInfoDTO
    };
    formData.append("ProductRequestDTO", new Blob([JSON.stringify(productRequestDTO)], { type: 'application/json' }));

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.put(
        `http://localhost:8085/update-product/${productName}`,
        formData,
        {
          params: { productId: productId },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      );

      if (response.status === 200) {
        alert('Product updated successfully!');
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
    }
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
            name="productName"
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
            name="productDescription"
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
            name="productPrice"
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
            name="productDiscount"
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
            name="quantityInStock"
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
            name="productFeaturesDTO.flavour"
            value={productData.productFeaturesDTO?.flavour || ''}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productLife"><i className="fas fa-hourglass"></i> Product Life</label>
          <input
            type="text"
            id="productLife"
            name="productFeaturesDTO.productLife"
            value={productData.productFeaturesDTO.productLife}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="storageInstructions"><i className="fas fa-box"></i> Storage Instructions</label>
          <input
            type="text"
            id="storageInstructions"
            name="productFeaturesDTO.storageInstructions"
            value={productData.productFeaturesDTO.storageInstructions}
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
                name="productFeaturesDTO.veg"
                checked={productData.productFeaturesDTO.veg === 'Yes'}
                onChange={handleInputChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
                name="productFeaturesDTO.veg"
                checked={productData.productFeaturesDTO.veg === 'No'}
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
                name="productFeaturesDTO.nonVeg"
                checked={productData.productFeaturesDTO.nonVeg === 'Yes'}
                onChange={handleInputChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
                name="productFeaturesDTO.nonVeg"
                checked={productData.productFeaturesDTO.nonVeg === 'No'}
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
              name="nutritionInfoDTO.calories"
              value={productData.nutritionInfoDTO.calories}
              onChange={handleInputChange}
              className="form-input-nutrition"
            />
            <select
              name="nutritionInfoDTO.calorieUnit"
              value={productData.nutritionInfoDTO.calorieUnit}
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
              name="nutritionInfoDTO.fats"
              value={productData.nutritionInfoDTO.fats}
              onChange={handleInputChange}
              className="form-input-nutrition"
            />
            <select
              name="nutritionInfoDTO.fatUnit"
              value={productData.nutritionInfoDTO.fatUnit}
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
              name="nutritionInfoDTO.proteins"
              value={productData.nutritionInfoDTO.proteins}
              onChange={handleInputChange}
              className="form-input-nutrition"
            />
            <select
              name="nutritionInfoDTO.proteinUnit"
              value={productData.nutritionInfoDTO.proteinUnit}
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
              name="nutritionInfoDTO.carbohydrates"
              value={productData.nutritionInfoDTO.carbohydrates}
              onChange={handleInputChange}
              className="form-input-nutrition"
            />
            <select
              name="nutritionInfoDTO.carbohydrateUnit"
              value={productData.nutritionInfoDTO.carbohydrateUnit}
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
              name="nutritionInfoDTO.sugar"
              value={productData.nutritionInfoDTO.sugar}
              onChange={handleInputChange}
              className="form-input-nutrition"
            />
            <select
              name="nutritionInfoDTO.sugarUnit"
              value={productData.nutritionInfoDTO.sugarUnit}
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
            onChange={handleFileChange}
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
