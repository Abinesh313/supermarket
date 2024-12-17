// src/components/Home.js
import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from 'scrollreveal';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import headerImage from './9Aug.gif';
import appleImage from './apple.webp'; 
import orangeImage from './orange.jpg'; 
import grapesImage from './grapes.jpg';
import tomatoImage from './tomato.jpg';
import onionImage from './onion.webp';
import eggImage from './egg.jpg';
import shirtImage from './shirt.jpg';
import pantImage from './pant.webp'; 
import shoeImage from './shoe.jpg';
import './Home.css';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRefs = useRef([]);

  useEffect(() => {
    const scrollRevealOption = {
      distance: '50px',
      origin: 'bottom',
      duration: 1000,
    };

    ScrollReveal().reveal('.header__image img', {
      ...scrollRevealOption,
      origin: 'right',
    });

    ScrollReveal().reveal('.header__content h1', {
      ...scrollRevealOption,
      delay: 500,
    });

    ScrollReveal().reveal('.header__content p', {
      ...scrollRevealOption,
      delay: 1000,
    });

    ScrollReveal().reveal('.header__content form', {
      ...scrollRevealOption,
      delay: 1500,
    });

    ScrollReveal().reveal('.header__content .bar', {
      ...scrollRevealOption,
      delay: 2000,
    });

    ScrollReveal().reveal('.header_image_card', {
      duration: 1000,
      interval: 500,
      delay: 2500,
    });
  }, []);

  const categories = [
    {
      name: 'Fruits',
      products: [
        { name: 'Apple', image: appleImage, discount: '10% OFF' },
        { name: 'Orange', image: orangeImage, discount: '15% OFF' },
        { name: 'Grapes', image: grapesImage, discount: '5% OFF' },
      ],
    },
    {
      name: 'Groceries',
      products: [
        { name: 'Tomatos', image: tomatoImage, discount: '20% OFF' },
        { name: 'Onion', image: onionImage, discount: '10% OFF' },
        { name: 'Eggs', image: eggImage, discount: '25% OFF' },
      ],
    },
    {
      name: 'Clothing',
      products: [
        { name: 'Shirt', image: shirtImage, discount: '30% OFF' },
        { name: 'Pants', image: pantImage, discount: '20% OFF' },
        { name: 'Shoes', image: shoeImage, discount: '10% OFF' },
      ],
    },
  ];

  useEffect(() => {
    const scrollIntervals = scrollRefs.current.map((ref, index) => {
      if (ref) {
        return setInterval(() => {
          ref.scrollBy({ left: ref.scrollWidth / ref.children.length, behavior: 'smooth' });
        }, 3000); // Adjust the interval time as needed
      }
      return null;
    });

    return () => {
      scrollIntervals.forEach(interval => clearInterval(interval));
    };
  }, []);

  return (
    <div className='sbody'>
      <Navbar />
      <header className="header__container">
        <div className="header__image">
          <img src={headerImage} alt="IMG" />
        </div>
        <div className="header__content">
          <h1><br />REFINE YOUR DEALS WITH<span> QUALITY</span> FILL YOUR HOUSE</h1>
          <p>
            Embark on Your Shopping Journey Today and Discover Unmatched Deals Around the Store - Your Savings Await with Exciting Offers, Unforgettable Quality, and Endless Variety
          </p>
          <div className="bar">
            by G.Abinesh
          </div>
        </div>
      </header>
      <section className="products-section">
        {categories.map((category, index) => (
          <div key={index} className="product-category">
            <h2 className="category-title">{category.name}</h2>
            <div className="product-list" ref={el => scrollRefs.current[index] = el}>
              {category.products.map((product, idx) => (
                <Link key={idx} to={`/product`} className="product-item">
                  <img src={product.image} alt={product.name} />
                  <div className="discount-info">{product.discount}</div>
                  <p>{product.name}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
