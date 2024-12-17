import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Product.module.css';
import cartImage from './cart.png'; // Path to the cart image
import { useCart } from './CartContext';
import RangeFilter from './RangeFilter'; // Import the RangeFilter component

// Import health product images
import saamaiImg from './health/saamai.jpg';
import varaguImg from './health/varagu.jpg';
import kelviraguImg from './health/kelviragu.jpg';
import thinaiImg from './health/thinai.jpg';
import kuthiraivaliImg from './health/kuthiraivali.jpg';
import ragiImg from './health/ragi.jpg';
import cholamImg from './health/cholam.jpg';
import kambuImg from './health/kambu.jpg';
import mappillaiImg from './health/mappillai.jpg';
import kuthiraImg from './health/kuthira.jpg';

// Define the array with health products
const predefinedProducts = [
  { id: 1, name: 'Saamai (Little Millet)', price: '80.00', image: saamaiImg },
  { id: 2, name: 'Varagu (Kodo Millet)', price: '70.00', image: varaguImg },
  { id: 3, name: 'Kelviragu (Finger Millet)', price: '60.00', image: kelviraguImg },
  { id: 4, name: 'Thinai (Foxtail Millet)', price: '75.00', image: thinaiImg },
  { id: 5, name: 'Kuthiraivali (Barnyard Millet)', price: '85.00', image: kuthiraivaliImg },
  { id: 6, name: 'Ragi (Finger Millet)', price: '90.00', image: ragiImg },
  { id: 7, name: 'Cholam (Sorghum)', price: '65.00', image: cholamImg },
  { id: 8, name: 'Kambu (Pearl Millet)', price: '55.00', image: kambuImg },
  { id: 9, name: 'Mappillai Samba (Traditional Red Rice)', price: '100.00', image: mappillaiImg },
  { id: 10, name: 'Kuthira (Horse Gram)', price: '50.00', image: kuthiraImg }
];

const Health = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOption, setSortOption] = useState(''); // State for sorting option
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

  // Sorting logic
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === 'nameAsc') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'nameDesc') {
      return b.name.localeCompare(a.name);
    } else if (sortOption === 'priceAsc') {
      return a.price - b.price;
    } else if (sortOption === 'priceDesc') {
      return b.price - a.price;
    } else {
      return 0;
    }
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
              onClick={() => handleCategoryClick('Snacks & Confectionery')}
            >
              Snacks
            </button>
          </li>
          <li>
            <button 
              style={categoryItemStyle}
              onClick={() => handleCategoryClick('Health & Wellness')}
            >
              Health
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
        <div className={styles.sortOptions}>
          <select value={sortOption} onChange={e => setSortOption(e.target.value)}>
            <option value="">Sort by</option>
            <option value="nameAsc">Name: A to Z</option>
            <option value="nameDesc">Name: Z to A</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
        {popupMessage && <div className={styles.popup}>{popupMessage}</div>}
        <div className={styles.productGrid}>
          {sortedProducts.length > 0 ? (
            sortedProducts.map(product => {
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

export default Health;
