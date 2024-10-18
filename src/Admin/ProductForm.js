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
    const [flavour, setFlavour] = useState('');
    const [productLife, setProductLife] = useState('');
    const [storageInstructions, setStorageInstructions] = useState('');
    const [veg, setVeg] = useState('');
    const [nonVeg, setNonVeg] = useState('');

    //Nutrition info
    const [calories, setCalories] = useState('');
    const [fats, setFats] = useState('');
    const [proteins, setProteins] = useState('');
    const [carbohydrates, setCarbohydrates] = useState('');
    const [sugar, setSugar] = useState('');

    //Unit Measurement
    const [calorieUnit, setCalorieUnit] = useState('kcal');
    const [fatUnit, setFatUnit] = useState('g');
    const [proteinUnit, setProteinUnit] = useState('g');
    const [carbohydrateUnit, setCarbohydrateUnit] = useState('g');
    const [sugarUnit, setSugarUnit] = useState('g');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('productPrice', productPrice);
        formData.append('productDiscount', productDiscount);
        formData.append('quantityInStock', quantityInStock);
        formData.append('flavour', flavour);
        formData.append('productLife', productLife);
        formData.append('storageInstructions', storageInstructions);
        formData.append('veg', veg);
        formData.append('nonVeg', nonVeg);
        formData.append('calories', `${calories} ${calorieUnit}`);
        formData.append('fats', `${fats} ${fatUnit}`);
        formData.append('proteins', `${proteins} ${proteinUnit}`);
        formData.append('carbohydrates', `${carbohydrates} ${carbohydrateUnit}`);
        formData.append('sugar', `${sugar} ${sugarUnit}`);
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
            setQuantityInStock('')
            setFile('');
            setFlavour('');
            setProductLife('');
            setStorageInstructions('');
            setVeg('');
            setNonVeg('');
            setCalories('');
            setFats('');
            setProteins('');
            setCarbohydrates('');
            setSugar('');



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
                        value={flavour}
                        onChange={(e) => setFlavour(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productLife"><i className="fas fa-hourglass"></i> Product Life</label>
                    <input
                        type="text"
                        id="productLife"
                        value={productLife}
                        onChange={(e) => setProductLife(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="storageInstructions"><i className="fas fa-box"></i> Storage Instructions</label>
                    <input
                        type="text"
                        id="storageInstructions"
                        value={storageInstructions}
                        onChange={(e) => setStorageInstructions(e.target.value)}
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
                                checked={veg === 'Yes'}
                                onChange={() => setVeg('Yes')}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="No"
                                checked={veg === 'No'}
                                onChange={() => setVeg('No')}
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
                                checked={nonVeg === 'Yes'}
                                onChange={() => setNonVeg('Yes')}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="No"
                                checked={nonVeg === 'No'}
                                onChange={() => setNonVeg('No')}
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
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            className="form-input-nutrition"
                        />
                        <select
                            value={calorieUnit}
                            onChange={(e) => setCalorieUnit(e.target.value)}
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
                            value={fats}
                            onChange={(e) => setFats(e.target.value)}
                            className="form-input-nutrition"
                        />
                        <select
                            value={fatUnit}
                            onChange={(e) => setFatUnit(e.target.value)}
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
                            value={proteins}
                            onChange={(e) => setProteins(e.target.value)}
                            className="form-input-nutrition"
                        />
                        <select
                            value={proteinUnit}
                            onChange={(e) => setProteinUnit(e.target.value)}
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
                            value={carbohydrates}
                            onChange={(e) => setCarbohydrates(e.target.value)}
                           className="form-input-nutrition"
                        />
                        <select
                            value={carbohydrateUnit}
                            onChange={(e) => setCarbohydrateUnit(e.target.value)}
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
                            value={sugar}
                            onChange={(e) => setSugar(e.target.value)}
                            className="form-input-nutrition"
                        />
                        <select
                            value={sugarUnit}
                            onChange={(e) => setSugarUnit(e.target.value)}
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
