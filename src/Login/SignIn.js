import React, { useState } from 'react';
import axios from 'axios';
import styles from './SignIn.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post('http://localhost:8085/signin', {
        usernameOrEmail,
        password,
      });

      const responseData = response.data;
      const token = response.data.token;
      const userRole = responseData.userrole;
      if (response.data.status === 'success') {
        localStorage.setItem('jwtToken', token);
        setMessage(responseData.message);
        setIsSuccess(responseData.status === 'success');
        console.log('Login successful:', responseData);
        console.log('Role  ', userRole);
        if (userRole === 'admin') {
          navigate('/dashboard');
        }
        else {
          navigate('/home');
        }

      }
      else {
        setMessage(responseData.message);
      }

    } catch (err) {
      if (err.response) {

        setMessage(err.response.data.message);
        setIsSuccess(false);
      } else {

        setMessage('An unexpected error occurred. Please try again later.');
        setIsSuccess(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.blurOverlay}></div>
      <div className={styles.formContainer}>
        {message && (
          <p className={`${styles.message} ${isSuccess ? styles.success : styles.error}`}>
            {message}
          </p>
        )}
        <h2 className={styles.title}>Sign In</h2>
        <form onSubmit={handleSubmit}>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Username or Email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <div className="text">
            New Registration?{" "}
            <Link to="/SignUp" className="link">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
