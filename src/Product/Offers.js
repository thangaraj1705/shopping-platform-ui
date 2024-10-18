import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Offers.module.css';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          throw new Error('No JWT token found.');
        }
        const response = await axios.get('http://localhost:8085/offerProducts', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
        setError('Failed to load offers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleOfferClick = async (offerProductName, productPrice) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get('http://localhost:8085/filter-offers-by-starting-price', {
        params: {
          productName: offerProductName,
          productPrice: productPrice,
        },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const filteredProducts = response.data;
      navigate('/search-results', { state: { products: filteredProducts } });
    } catch (error) {
      console.error('Error filtering offers: ', error);
      setError('Failed to filter offers. Please try again later!!!');
    }

  };

  if (loading) {
    return <div>Loading offers...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (offers.length === 0) {
    return <div>No offers available at the moment.</div>;
  }

  return (
    <div className={styles.offersContainer}>
      {offers.map((offer) => (
        <div className={styles.offerCard} key={offer.id}
          onClick={() => handleOfferClick(offer.offerProductName, offer.fromAmount)}
        >
          <img
            src={`/OfferPoster/${offer.offerImage}`}
            alt={offer.offerProductName}
            className={styles.offerImage}
            onError={(e) => e.target.src = '/OfferPoster/default.png'}
            loading="lazy"
          />
          <div className={styles.offerInfo}>
            <h3 className={styles.offerProductName}>{offer.offerProductName}</h3>
            <p className={styles.offerAmount}>Starting from: ₹{offer.fromAmount}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Offers;
