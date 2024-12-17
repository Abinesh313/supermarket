    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import styles from './Product.module.css';
    import cartImage from './cart.png'; // Path to the cart image
    import { useCart } from './CartContext';
    import RangeFilter from './RangeFilter'; // Import the RangeFilter component

    // Import images
    // Importing all image files
    import appleImg from './apple.webp';
    import grapeImg from './grapes.jpg';
    import orangeImg from './orange.jpg';
    import strawberryImg from './strawberry.jpg';
    import bananaImg from './banana.jpg';
    import blueberryImg from './blueberry.jpg';
    import pineappleImg from './pineapple.jpg';
    import mangoImg from './mango.jpg';
    import watermelonImg from './watermelon.jpg';
    import peachImg from './peach.jpg';
    import plumImg from './plum.jpg';
    import pearImg from './pear.jpg';
    import cherryImg from './cherry.jpg';
    import kiwiImg from './kiwi.jpg';
    import apricotImg from './apricot.jpg';
    import lemonImg from './lemon.jpg';
    import limeImg from './lime.jpg';
    import papayaImg from './papaya.jpg';
    import figImg from './fig.jpg';
    import dateImg from './date.jpg';
    import raspberryImg from './raspberry.jpg';
    import blackberryImg from './blackberry.jpg';
    import pomegranateImg from './pomegranate.jpg';
    import coconutImg from './coconut.jpg';
    import grapefruitImg from './grapefruit.jpg';

    // Define the array with imported images
    const predefinedProducts = [
    { id: 1, name: 'Apple', price: '180.00', image: appleImg },
    { id: 2, name: 'Grapes', price: '50.00', image: grapeImg },
    { id: 3, name: 'Orange', price: '120.00', image: orangeImg },
    { id: 4, name: 'Strawberry', price: '300.00', image: strawberryImg },
    { id: 5, name: 'Banana', price: '150.00', image: bananaImg },
    { id: 6, name: 'Blueberry', price: '500.00', image: blueberryImg },
    { id: 7, name: 'Pineapple', price: '80.00', image: pineappleImg },
    { id: 8, name: 'Mango', price: '150.00', image: mangoImg },
    { id: 9, name: 'Watermelon', price: '30.00', image: watermelonImg },
    { id: 10, name: 'Peach', price: '200.00', image: peachImg },
    { id: 11, name: 'Plum', price: '250.00', image: plumImg },
    { id: 12, name: 'Pear', price: '180.00', image: pearImg },
    { id: 13, name: 'Cherry', price: '400.00', image: cherryImg },
    { id: 14, name: 'Kiwi', price: '300.00', image: kiwiImg },
    { id: 15, name: 'Apricot', price: '350.00', image: apricotImg },
    { id: 16, name: 'Lemon', price: '60.00', image: lemonImg },
    { id: 17, name: 'Lime', price: '50.00', image: limeImg },
    { id: 18, name: 'Papaya', price: '100.00', image: papayaImg },
    { id: 19, name: 'Fig', price: '600.00', image: figImg },
    { id: 20, name: 'Date', price: '800.00', image: dateImg },
    { id: 21, name: 'Raspberry', price: '600.00', image: raspberryImg },
    { id: 22, name: 'Blackberry', price: '700.00', image: blackberryImg },
    { id: 23, name: 'Pomegranate', price: '150.00', image: pomegranateImg },
    { id: 24, name: 'Coconut', price: '60.00', image: coconutImg },
    { id: 25, name: 'Grapefruit', price: '250.00', image: grapefruitImg }
    ];
    const Fruit = () => {
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

    export default Fruit;
