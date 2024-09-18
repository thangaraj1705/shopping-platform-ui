import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './Advertisements.css';

const Advertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          console.error('No JWT token found.');
          return;
        }

        const response = await axios.get('http://localhost:8085/advertisements', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setAdvertisements(response.data);
      } catch (error) {
        console.error('Error fetching advertisements:', error);
      }
    };

    fetchAdvertisements();
  }, []);

  const handleAdvertisementClick = (productname,discount) => {
    window.location.href = `/advertisement/${productname}+${discount}`;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, 
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {advertisements.map((ad) => (
          <div 
            key={ad.advertisementId} 
            className="advertisement-slide"
            onClick={() => handleAdvertisementClick(ad.productAd,ad.discountPercentage)}
          >
            <img
              src={`/AdvertisementPoster/${ad.poster}`} 
              alt={ad.productAd}
              className="advertisement-image"
              onError={(e)=>e.target.src='/AdvertisementPoster/default.png'}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-next`}
      onClick={onClick}
    />
  );
};

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-prev`}
      onClick={onClick}
    />
  );
};

export default Advertisements;
