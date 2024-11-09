import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import './ProductForm.css';  

const UpdateAdPage = () => {
  const location = useLocation();
  const { advertisementId } = location.state || {};  
  const productAd = location.pathname.split("/")[2];  
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [adData, setAdData] = useState({
    productAd:'',
    poster:'',
    discountPercentage:0
  });


  useEffect(() => {
    const fetchAdData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          console.error('No JWT token found.');
          return;
        }

        const response = await axios.get(`http://localhost:8085/update-ad/${productAd}`, {
          params: {
            advertisementId: advertisementId,
          },
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setAdData(response.data);
        } else {
          alert('Product not found or no content!');
        }
      } catch (error) {
        console.error('Error fetching product:', error.response ? error.response.data : error.message);
      }
    };

    fetchAdData();
  }, [advertisementId, productAd]);

  const handleInputChange = (e) => {
    setAdData({
      ...adData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;  
    setSelectedFile(file);
  };


  const handleUpdateProductAd = (e) => {
    e.preventDefault();  
    const formData = new FormData();
    const token = localStorage.getItem('jwtToken');
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    formData.append('Advertisement', new Blob([JSON.stringify(adData)], { type: 'application/json' }));

    axios.put(`http://localhost:8085/update-ad/${adData.productAd}`, formData, {
      params: {
        advertisementId: adData.advertisementId,
      },
      headers: {
        'Authorization': `Bearer ${token}`,
      },              

    })
      .then(() => {
        alert('Product Advertisement updated successfully!');
        navigate(`/advertisement-table`);
      })
      .catch(error => console.error('Error updating product:', error));
  };

  return (
    <div className="product-form-container">
        <h1 className="form-title">Update Advertisement</h1>
        <form className="product-form">
        
            <div className="form-group">
                <label htmlFor="productAd"><i className="fas fa-tag"></i> Product Name</label>
                <input
                    type="text"
                    id="productAd"
                    name="productAd"
                    value={adData.productAd}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label htmlFor="discountPercentage"><i className="fas fa-percent"></i> Discount (%)</label>
                <input
                    type="number"
                    id="discountPercentage"
                    name="discountPercentage"
                    value={adData.discountPercentage}
                    onChange={handleInputChange}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label htmlFor="poster"><i className="fas fa-upload"></i> Upload Image</label>
                <input
                    type="file"
                    id="poster"
                    onChange={handleFileChange}
                    className="form-input"
                />
            </div>
            <div className="button-group">
                <button type="submit" className="submit-button" onClick={handleUpdateProductAd}>
                    <i className="fas fa-save"></i> update Ad
                </button>
            </div>
        </form>
    </div>
);
};

export default UpdateAdPage;