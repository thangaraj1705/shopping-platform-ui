import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductTable.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdvertisementDetailsTable = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const token = localStorage.getItem('jwtToken');

      if (!token) {
        console.error('No JWT token found.');
        return;
      }
      const response = await axios.get('http://localhost:8085/advertisements', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Fetched Ads:', response.data);
      setAds(response.data);
    } catch (error) {
      console.error('Error fetching Ads:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (advertisementId) => {
    const token = localStorage.getItem('jwtToken');
    if (window.confirm(`Are you sure you want to delete the Ad with ID: ${advertisementId}?`)) {
      try {
        await axios.delete(`http://localhost:8085/ads/${advertisementId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(`Advertisement with ID ${advertisementId} deleted.`);
        fetchAds(); 
      } catch (error) {
        console.error('Error deleting Ad:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleUpdate = (id) => {
    console.log(`Update ad with ID: ${id}`);
    // Add update logic here
  };

  return (
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
          <th>Image</th>
            <th>Advertisement Name</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((ad) => (
            <tr key={ad.advertisementId}>
             <td>
                <img src={`/AdvertisementPoster/${ad.poster}`} alt={ad.productAd} className="product-img" />
              </td>
              <td>{ad.productAd}</td>
              <td>{ad.discountPercentage}</td>
              <td>
                <button className="btn update-btn" onClick={() => handleUpdate(ad.advertisementId)}>
                  <FaEdit /> Update
                </button>
                <button className="btn delete-btn" onClick={() => handleDelete(ad.advertisementId)}>
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

export default AdvertisementDetailsTable;
