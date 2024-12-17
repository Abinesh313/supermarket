import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';
import Navbar from '../Components/Navbar';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Retrieve the token from localStorage
  const accessToken = localStorage.getItem('accessToken');

  // Create an axios instance with the token for authorization
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (product, quantityChange) => {
    updateCartQuantity(product, quantityChange);
  };

  // Handle pushing cart data to the backend
  const handlePushCart = async () => {
    setLoading(true);
    try {
      // Ensure the cart data is pushed with the proper token authorization
      for (const item of cart) {
        await axiosInstance.post('/carts', {
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
          accessToken: accessToken,  // Directly pass the access token without decoding
          userId: 1  // Set the userId directly
        });
      }
      alert('Cart items pushed to backend successfully');
      navigate('/checkout');
    } catch (error) {
      console.error('Error pushing cart to backend:', error);
      alert('Failed to push cart items to backend');
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to get cart data from backend if needed
  useEffect(() => {
    if (cart.length === 0) {
      // Optionally fetch cart items from backend if empty
      axiosInstance.get('/carts')
        .then(response => {
          // Assuming the API returns a list of cart items
          // setCart(response.data);  // Un-comment if you need to sync the frontend cart with backend
        })
        .catch(error => {
          console.error('Error fetching cart:', error);
        });
    }
  }, [cart, axiosInstance]);

  return (
    <div className="sbody">
      <Navbar />
      <div className={styles.cartContainer}>
        <button
          className={styles.backButton}
          onClick={() => navigate('/product')}
          aria-label="Back to Products"
        >
          Back to Products
        </button>
        <h1 className={styles.cartTitle}>Shopping Cart</h1>
        {cart.length > 0 ? (
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.productId} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.productName}
                  className={styles.cartImage}
                />
                <div className={styles.cartDetails}>
                  <div className={styles.cartName}>{item.productName}</div>
                  <div className={styles.cartPrice}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className={styles.cartQuantity}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleQuantityChange(item, -1)}
                      aria-label="Decrease quantity"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className={styles.quantityDisplay}>{item.quantity}</span>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleQuantityChange(item, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemove(item.productId)}
                    aria-label="Remove item from cart"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className={styles.cartFooter}>
              <div className={styles.cartTotal}>
                <strong>Total: ₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</strong>
              </div>
              <button
                className={styles.buyNowButton}
                onClick={handlePushCart}
                aria-label="Proceed to Checkout"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.emptyCart}>Your cart is empty</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
