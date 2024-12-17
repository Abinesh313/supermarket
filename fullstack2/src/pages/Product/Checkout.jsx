import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';
import { useCart } from './CartContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import RazorpayComponent from './Razor';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, calculateCartTotal } = useCart();
  const totalPrice = calculateCartTotal();

  const handlePlaceOrder = () => {
    console.log("Order placed:", cart);
    navigate('/ordersuccess');
  };

  // Function to generate the PDF of the entire page
  const generatePDF = () => {
    const input = document.getElementById('checkout-page'); // Selects the entire checkout page
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 page width in mm
      const pageHeight = 295; // A4 page height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('checkout-page.pdf');
    });
  };

  return (
    <div className={styles.checkoutWrapper} id="checkout-page">
      <button
        className={`${styles.returnButton} pdf-hide`}
        onClick={() => navigate('/cart')}
        aria-label="Back to Cart"
      >
        Back to Cart
      </button>
      <h1 className={styles.checkoutHeading}>Checkout</h1>
      <div className={styles.checkoutContent}>
        <h2 className={styles.orderSummaryTitle}>Order Summary</h2>
        <div className={styles.checkoutItems}>
          {cart.map(item => (
            <div key={item.productId} className={styles.checkoutItem}>
              <img src={item.image} alt={item.name} className={styles.checkoutItemImage} />
              <div className={styles.checkoutItemDetails}>
                <div className={styles.checkoutItemName}>{item.name}</div>
                <div className={styles.checkoutItemPrice}>₹{item.price * item.quantity}</div>
                <div className={styles.checkoutItemQuantity}>Quantity: {item.quantity}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.checkoutTotal}>
          <strong>Total: ₹{totalPrice}</strong>
        </div>
        <button
          className={styles.orderButton}
          onClick={generatePDF}
          aria-label="Download Order Summary as PDF"
        >
          Download Page as PDF
        </button>
      </div>
      <RazorpayComponent amount={totalPrice} />
    </div>
  );
};

export default Checkout;
