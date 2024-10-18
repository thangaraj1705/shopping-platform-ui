import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductTable.css';
import { FaTrash } from 'react-icons/fa';

const UserDetailsTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('jwtToken');

      if (!token) {
        console.error('No JWT token found.');
        return;
      }
      const response = await axios.get('http://localhost:8085/listuserdetails', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Fetched users:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('jwtToken');
    if (window.confirm(`Are you sure you want to delete the user with ID: ${id}?`)) {
      try {
        await axios.delete(`http://localhost:8085/deleteuser`, {
          params: { userId: id }, 
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(`User with ID ${id} deleted.`);
        fetchUsers(); 
      } catch (error) {
        console.error('Error deleting user:', error.response ? error.response.data : error.message);
      }
    }
  };


  return (
    <div className="table-container">
      <table className="product-table">
        <thead className="table-head">
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td> 
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.mobileNumber}</td> 
              <td>
                <button className="btn delete-btn" onClick={() => handleDelete(user.id)}>
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

export default UserDetailsTable;
