import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Product.module.css';
import cartImage from './cart.png'; // Path to the cart image
import { useCart } from './CartContext';
import Navbar from '../Components/Navbar';
import RangeFilter from './RangeFilter'; // Import the RangeFilter component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [products, setProducts] = useState([]);
  const { cart, addToCart, updateCartQuantity } = useCart();
  const [popupMessage, setPopupMessage] = useState(null);
  const navigate = useNavigate();

  const categoryRefs = {
    Fruits: useRef(null),
    Vegetables: useRef(null),
    Dairy: useRef(null),
    Beverages: useRef(null),
    Meat: useRef(null),
    Snacks: useRef(null),
    Health: useRef(null)
  };

  const accessToken = localStorage.getItem('accessToken');

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  useEffect(() => {
    axiosInstance.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [axiosInstance]);

  const filteredProducts = products.filter(product => {
    const productPrice = parseFloat(product.price);
    return (
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      productPrice >= minPrice &&
      productPrice <= maxPrice
    );
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.productName} added to cart`, {
      autoClose: 3000, // Auto-close after 3 seconds
      position: 'bottom-right', // Updated to string format for position
      onClick: () => {
        navigate('/cart'); // Navigate to cart when the toast is clicked
      }
    });
  };

  const handleQuantityChange = (product, quantityChange) => {
    updateCartQuantity(product, quantityChange);
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const handleCategoryClick = (category) => {
    categoryRefs[category].current.scrollIntoView({ behavior: 'smooth' });
  };

  const renderProductSection = (category, categoryRef) => (
    <div className={styles.productSection} ref={categoryRef} key={category}>
      <h2>{category}</h2>
      <div className={styles.productGrid}>
        {filteredProducts
          .filter(product => product.category === category)
          .map(product => {
            const cartItem = cart.find(item => item.productId === product.productId);
            return (
              <div key={product.productId} className={styles.productItem}>
                <img src={product.image} alt={product.productName} className={styles.productImage} />
                <div className={styles.productName}>{product.productName}</div>
                <div className={styles.productPrice}>₹{product.price}</div>
                <div className={styles.cartControls}>
                  {cartItem ? (
                    <div className={styles.quantityControls}>
                      <button
                        className={styles.quantityButton}
                        onClick={() => handleQuantityChange(product, -1)}
                        disabled={cartItem.quantity <= 1}
                      >
                        -
                      </button>
                      <span className={styles.quantityDisplay}>{cartItem.quantity}</span>
                      <button
                        className={styles.quantityButton}
                        onClick={() => handleQuantityChange(product, 1)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className={styles.addToCartButton}
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );

  const sidebarStyle = {
    width: '250px',
    backgroundColor: '#cdf7d5',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    height: '118%',
    top: '180px',
    left: '0',
    zIndex: '1'
  };

  const sidebarHeaderStyle = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px'
  };

  const categoryListStyle = {
    listStyleType: 'none',
    padding: '0'
  };

  const categoryItemStyle = {
    display: 'block',
    width: '210px',
    padding: '10px',
    fontSize: '1.1em',
    cursor: 'pointer',
    border: '1px solid rgba(0, 0, 0, 0.3)',
    borderRadius: '5px',
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
    color: '#333',
    textAlign: 'center',
    marginBottom: '10px',
    transition: 'background-color 0.3s, box-shadow 0.3s'
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Sorry, your browser does not support speech recognition.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
    };
  };

  return (
    <div className='sbody'>
      <div className={styles.supermarketContainer}>
        <Navbar />
        <aside style={sidebarStyle}>
          <div style={sidebarHeaderStyle}>Categories</div>
          <ul style={categoryListStyle}>
            {Object.keys(categoryRefs).map(category => (
              <li key={category}>
                <button
                  style={categoryItemStyle}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <main className={styles.mainContent}>
          <div className={styles.searchBar}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button className={styles.searchButton}>Search</button>
            <button className={styles.voiceSearchButton} onClick={handleVoiceSearch}>
              <i className="fas fa-microphone"></i>
            </button>
            <button className={styles.cartButton} onClick={goToCart}>
              <img src={cartImage} alt="Cart" className={styles.cartIcon} />
            </button>
          </div>
          <RangeFilter
            min={minPrice}
            max={maxPrice}
            onMinChange={setMinPrice}
            onMaxChange={setMaxPrice}
            minLabel={`Min ₹${minPrice}`}
            maxLabel={`Max ₹${maxPrice}`}
          />
          {popupMessage && <div className={styles.popup}>{popupMessage}</div>}
          {Object.entries(categoryRefs).map(([category, ref]) => 
            renderProductSection(category, ref)
          )}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Product;
