import React from 'react';
import './Banner.css';

const Banner = () => {
    return (
        <section className="banner">
            <div className="banner-content">
                <p className="subheading">Black Friday in July</p>
                <h1>Up to 50% off</h1>
                <p className="description">Hundreds of styles available</p>
                <button className="shop-now-button">Shop Now</button>
            </div>
        </section>
    );
};

export default Banner;
