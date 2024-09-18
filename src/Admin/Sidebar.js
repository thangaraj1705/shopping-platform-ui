import React from 'react';
import { Link } from 'react-router-dom';
import './dash.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Admin Menu</h3>
      <ul>
        <li><Link to="/add-product">Add Product</Link></li>
        <li><Link to="/add-advertisement">Add Advertisement</Link></li>
        <li><Link to="/statistics">Total Product Count Statistics</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
