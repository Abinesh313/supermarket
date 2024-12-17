import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Product.module.css';
import cartImage from './cart.png'; // Path to the cart image
import { useCart } from './CartContext';
import RangeFilter from './RangeFilter'; // Import the RangeFilter component

// Import images
// Import images for vegetables
import carrotImg from './veges/carrot.jpg';
import broccoliImg from './veges/broccoli.jpg';
import spinachImg from './veges/spinach.jpg';
import potatoImg from './veges/potato.jpg';
import tomatoImg from './veges/tomato.jpg';
import onionImg from './veges/onion.jpg';
import cucumberImg from './veges/cucumber.jpg';
import bellPepperImg from './veges/bellPepper.jpg';
import cauliflowerImg from './veges/cauliflower.jpg';
import eggplantImg from './veges/eggplant.jpg';
import okraImg from './veges/okra.jpg';
import bitterGourdImg from './veges/bitterGourd.jpg';
import bottleGourdImg from './veges/bottleGourd.jpg';
import pumpkinImg from './veges/pumpkin.jpg';
import radishImg from './veges/radish.jpg';
import cabbageImg from './veges/cabbage.jpg';

// Define the array with imported images
const predefinedProducts = [
    { id: 1, name: 'Carrot', price: '40.00', image: carrotImg },
    { id: 2, name: 'Broccoli', price: '120.00', image: broccoliImg },
    { id: 3, name: 'Spinach', price: '30.00', image: spinachImg },
    { id: 4, name: 'Potato', price: '20.00', image: potatoImg },
    { id: 5, name: 'Tomato', price: '25.00', image: tomatoImg },
    { id: 6, name: 'Onion', price: '15.00', image: onionImg },
    { id: 7, name: 'Cucumber', price: '35.00', image: cucumberImg },
    { id: 8, name: 'Bell Pepper', price: '80.00', image: bellPepperImg },
    { id: 9, name: 'Cauliflower', price: '50.00', image: cauliflowerImg },
    { id: 10, name: 'Eggplant', price: '60.00', image: eggplantImg },
    { id: 11, name: 'Okra', price: '45.00', image: okraImg },
    { id: 12, name: 'Bitter Gourd', price: '30.00', image: bitterGourdImg },
    { id: 13, name: 'Bottle Gourd', price: '25.00', image: bottleGourdImg },
    { id: 14, name: 'Pumpkin', price: '20.00', image: pumpkinImg },
    { id: 15, name: 'Radish', price: '15.00', image: radishImg },
    { id: 16, name: 'Cabbage', price: '30.00', image: cabbageImg },
  ];
const Vegetables = () => {
const [searchTerm, setSearchTerm] = useState('');
const [minPrice, setMinPrice] = useState(0);
const [maxPrice, setMaxPrice] = useState(1000);
const { cart, addToCart, updateCartQuantity } = useCart();
const [popupMessage, setPopupMessage] = useState(null);
const navigate = useNavigate();

const filteredProducts = predefinedProducts.filter(product => {
    const productPrice = parseFloat(product.price);
    return (
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    productPrice >= minPrice &&
    productPrice <= maxPrice
    );
});

const handleAddToCart = (product) => {
    addToCart(product);
    setPopupMessage(`${product.name} added to cart`);
    setTimeout(() => setPopupMessage(null), 2000); // Hide popup after 2 seconds
};

const handleQuantityChange = (product, quantityChange) => {
    if (quantityChange === -1) {
    updateCartQuantity(product, quantityChange); // Decrement quantity
    } else if (quantityChange === 1) {
    updateCartQuantity(product, quantityChange); // Increment quantity
    }
};

const goToCart = () => {
    navigate('/cart');
};

const handleCategoryClick = (category) => {
    navigate(`/${category.toLowerCase()}`);
};

// Inline styles for sidebar
const sidebarStyle = {
    width: '250px',
    backgroundColor: '#cdf7d5',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    height: '100%',
    top: '0',
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

const categoryItemHoverStyle = {
    backgroundColor: 'rgba(0, 255, 0, 0.4)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
};

// Web Speech API: Speech Recognition setup
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
    <div className={styles.supermarketContainer}>
    <aside style={sidebarStyle}>
        <div style={sidebarHeaderStyle}>Categories</div>
        <ul style={categoryListStyle}>
        <li>
            <button 
            style={categoryItemStyle}
            onClick={() => handleCategoryClick('Fruits')}
            >
            Fruits
            </button>
        </li>
        <li>
            <button 
            style={categoryItemStyle}
            onClick={() => handleCategoryClick('Vegetables')}
            >
            Vegetables
            </button>
        </li>
        <li>
            <button 
            style={categoryItemStyle}
            onClick={() => handleCategoryClick('Dairy')}
            >
            Dairy
            </button>
        </li>
        <li>
            <button 
            style={categoryItemStyle}
            onClick={() => handleCategoryClick('Bakery')}
            >
            Bakery
            </button>
        </li>
        <li>
            <button 
            style={categoryItemStyle}
            onClick={() => handleCategoryClick('Beverages')}
            >
            Beverages
            </button>
        </li>
        <li>
            <button 
              style={categoryItemStyle}
              onClick={() => handleCategoryClick('Meat & Seafood')}
            >
              Meat & Seafood
            </button>
          </li>
          <li>
            <button 
              style={categoryItemStyle}
              onClick={() => handleCategoryClick('Pantry Staples')}
            >
              Pantry Staples
            </button>
          </li>
          <li>
            <button 
              style={categoryItemStyle}
              onClick={() => handleCategoryClick('Frozen Foods')}
            >
              Frozen Foods
            </button>
          </li>
          <li>
            <button 
              style={categoryItemStyle}
              onClick={() => handleCategoryClick('Snacks & Confectionery')}
            >
              Snacks & Confectionery
            </button>
          </li>
          <li>
            <button 
              style={categoryItemStyle}
              onClick={() => handleCategoryClick('Health & Wellness')}
            >
              Health & Wellness
            </button>
          </li>
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
            🎤 Voice Search
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
        <div className={styles.productGrid}>
        {filteredProducts.length > 0 ? (
            filteredProducts.map(product => {
            const cartItem = cart.find(item => item.id === product.id);
            return (
                <div key={product.id} className={styles.productItem}>
                <img src={product.image} alt={product.name} className={styles.productImage} />
                <div className={styles.productName}>{product.name}</div>
                <div className={styles.productPrice}>₹{product.price}</div>
                <div className={styles.cartControls}>
                    {cartItem ? (
                    <div className={styles.quantityControls}>
                        <button 
                        className={styles.quantityButton}
                        onClick={() => handleQuantityChange(product, -1)}
                        disabled={cartItem.quantity <= 1} // Disable if quantity is 1
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
            })
        ) : (
            <div className={styles.noResults}>No products found</div>
        )}
        </div>
    </main>
    </div>
);
};

export default Vegetables;
