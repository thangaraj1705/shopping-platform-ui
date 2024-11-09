import React, { useState } from 'react';
import axios from 'axios';
import './ProductForm.css';

const ProductForm = () => {
    //product details
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDiscount, setProductDiscount] = useState('');
    const [quantityInStock, setQuantityInStock] = useState('');
    const [file, setFile] = useState(null);

    //product features
    const [productFeaturesDTO, setProductFeaturesDTO] = useState({
        flavour: '',
        productLife: '',
        storageInstructions: '',
        veg: '',
        nonVeg: ''
    });

    //Nutrition info
    const [nutritionInfoDTO, setNutritionInfoDTO] = useState({
        calories: '',   
        fats: '',
        proteins: '',
        carbohydrates: '',
        sugar: '',
        calorieUnit: 'kcal',
        fatUnit: 'g',
        proteinUnit: 'g',
        carbohydrateUnit: 'g',
        sugarUnit: 'g'
    });


    const handleSubmit = async (event) => {
        event.preventDefault();

        const productRequestDTO = {
            productName,
            productDescription,
            productPrice,
            productDiscount,
            quantityInStock,
            productFeaturesDTO,
            nutritionInfoDTO
        };

        const formData = new FormData();
        formData.append('ProductRequestDTO', new Blob([JSON.stringify(productRequestDTO)], { type: "application/json" }));
        
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
            resetForm();
           


        } catch (error) {
            console.error('Error saving product:', error);
        }
    };
    const resetForm = () => {
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductDiscount('');
        setQuantityInStock('');
        setFile(null);
        setProductFeaturesDTO({
            flavour: '',
            productLife: '',
            storageInstructions: '',
            veg: '',
            nonVeg: ''
        });
        setNutritionInfoDTO({
            calories: '',
            fats: '',
            proteins: '',
            carbohydrates: '',
            sugar: '',
            calorieUnit: 'kcal',
            fatUnit: 'g',
            proteinUnit: 'g',
            carbohydrateUnit: 'g',
            sugarUnit: 'g'
        });
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
                    <label htmlFor="quantityInStock"><i className="fas fa-percent"></i> Stock</label>
                    <input
                        type="number"
                        id="quantityInStock"
                        value={quantityInStock}
                        onChange={(e) => setQuantityInStock(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="flavour"><i className="fas fa-flask"></i> Flavour</label>
                    <input
                        type="text"
                        id="flavour"
                        value={productFeaturesDTO.flavour}
                        onChange={(e) => setProductFeaturesDTO({ ...productFeaturesDTO, flavour: e.target.value })}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productLife"><i className="fas fa-hourglass"></i> Product Life</label>
                    <input
                        type="text"
                        id="productLife"
                        value={productFeaturesDTO.productLife}
                        onChange={(e) => setProductFeaturesDTO({ ...productFeaturesDTO, productLife: e.target.value })}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="storageInstructions"><i className="fas fa-box"></i> Storage Instructions</label>
                    <input
                        type="text"
                        id="storageInstructions"
                        value={productFeaturesDTO.storageInstructions}
                        onChange={(e) => setProductFeaturesDTO({ ...productFeaturesDTO, storageInstructions: e.target.value })}
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
                                checked={productFeaturesDTO.veg === 'Yes'}
                                onChange={(e) => setProductFeaturesDTO({ ...productFeaturesDTO, veg: e.target.value })}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="No"
                                checked={productFeaturesDTO.veg === 'No'}
                                onChange={(e) => setProductFeaturesDTO({ ...productFeaturesDTO, veg: e.target.value })}
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
                                checked={productFeaturesDTO.nonVeg === 'Yes'}
                                onChange={(e) => setProductFeaturesDTO({ ...productFeaturesDTO, nonVeg: e.target.value })}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="No"
                                checked={productFeaturesDTO.nonVeg === 'No'}
                                onChange={(e) => setProductFeaturesDTO({ ...productFeaturesDTO, nonVeg: e.target.value })}
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
                            value={nutritionInfoDTO.calories}
                            onChange={(e) => setNutritionInfoDTO({ ...nutritionInfoDTO, calories: e.target.value })}
                            className="form-input-nutrition"
                        />
                        <select
                            value={nutritionInfoDTO.calorieUnit}
                            onChange={(e) => setNutritionInfoDTO({ ...nutritionInfoDTO, calorieUnit: e.target.value })}
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
                            value={nutritionInfoDTO.fats}
                            onChange={(e) => setNutritionInfoDTO({ ...nutritionInfoDTO, fats: e.target.value })}
                            className="form-input-nutrition"
                        />
                        <select
                            value={nutritionInfoDTO.fatUnit}
                            onChange={(e) => setNutritionInfoDTO({ ...nutritionInfoDTO, fatUnit: e.target.value })}
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
                            value={nutritionInfoDTO.proteins}
                            onChange={(e) => setNutritionInfoDTO({ ...nutritionInfoDTO, proteins: e.target.value })}
                            className="form-input-nutrition"
                        />
                        <select
                            value={nutritionInfoDTO.proteinUnit}
                            onChange={(e) => setNutritionInfoDTO({ ...nutritionInfoDTO, proteinUnit: e.target.value })}
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
                            value={nutritionInfoDTO.carbohydrates}
                            onChange={(e) => setNutritionInfoDTO({ ...nutritionInfoDTO, carbohydrates: e.target.value })}
                           className="form-input-nutrition"
                        />
                        <select
                            value={nutritionInfoDTO.carbohydrateUnit}
                            onChange={(e) => setNutritionInfoDTO({ ...nutritionInfoDTO, carbohydrateUnit: e.target.value })}
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
                            value={nutritionInfoDTO.sugar}
                            onChange={(e) => setNutritionInfoDTO({ ...nutritionInfoDTO, sugar: e.target.value })}
                            className="form-input-nutrition"
                        />
                        <select
                            value={nutritionInfoDTO.sugarUnit}
                            onChange={(e) => setNutritionInfoDTO({ ...nutritionInfoDTO, sugarUnit: e.target.value })}
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
