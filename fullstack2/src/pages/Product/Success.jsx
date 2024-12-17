import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Success.module.css';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.successWrapper}>
      <h1 className={styles.successHeading}>Order Placed Successfully!</h1>
      <p className={styles.successText}>Thank you for your purchase.</p>
      <button
        className={styles.continueButton}
        onClick={() => navigate('/product')}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess;
