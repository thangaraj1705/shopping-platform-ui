import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dash.css';
import { FaBox, FaUsers,FaBullhorn  } from 'react-icons/fa';

const Dashboard = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [Users, setUsers] = useState(0); 
    const [Ads, setAds] = useState(0); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('jwtToken');

                if (!token) {
                    console.error('No JWT token found.');
                    return;
                }
                const response = await axios.get('http://localhost:8085/dashboard/statics', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Fetched products:', response.data);
                setTotalProducts(response.data.prodcount);
                setUsers(response.data.userscount);
                setAds(response.data.adscount);

            } catch (error) {
                console.error('Error fetching products:', error.response ? error.response.data : error.message);
            }
        };

        fetchProducts();
    }, []);

    return (
      <div className="dashboard">
          <div className="statistics-chart">           
              <div className="chart-item">
                  <FaUsers className="chart-icon" />
                  <div className="chart-value">{Users}</div>
              </div>
              <div className="chart-item">
                  <FaBox className="chart-icon" />
                  <div className="chart-value">{totalProducts}</div>
              </div>
              <div className="chart-item">
                  <FaBullhorn  className="chart-icon" />
                  <div className="chart-value">{Ads}</div>
              </div>
          </div>
  </div>
);
};
export default Dashboard;
