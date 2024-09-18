import React from 'react';
import { Link } from 'react-router-dom';
import './BottomNavbar.css';

const BottomNavbar = () => {
    return (
        <div className="bottom-navbar">
            <Link to="/All">All</Link>
            <Link to="/upcoming-foods">Upcoming Foods</Link>
            <Link to="/random-foods">Random Foods</Link>
            <Link to="/ongoing">Ongoing</Link>
            <Link to="/newly-added">Newly Added</Link>
            <Link to="/updated-foods">Updated Foods</Link>
        </div>
    );
};

export default BottomNavbar;
