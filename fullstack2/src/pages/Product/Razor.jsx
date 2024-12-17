// src/components/RazorpayComponent.js

import { useEffect, useState } from "react";

const RazorpayComponent = ({ amount }) => {
  const [rzp, setRzp] = useState(null);

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error('Failed to load Razorpay script'));
        document.body.appendChild(script);
      });
    };

    const initializeRazorpay = () => {
      if (window.Razorpay) {
        const options = {
          key: "rzp_test_9u3kMcqchK88zT", 
          amount: amount * 100, // Convert amount to paise
          currency: "INR",
          name: "My Dummy Store",
          description: "Test Transaction",
          handler: function (response) {
            alert(
              "Payment Successful! Payment ID: " + response.razorpay_payment_id
            );
            // Optionally handle payment success (e.g., update order status)
          },
          prefill: {
            name: "John Doe",
            email: "john@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Dummy Store Address",
          },
        };
        const rzpInstance = new window.Razorpay(options);
        setRzp(rzpInstance);
      } else {
        console.error("Razorpay script not loaded.");
      }
    };

    loadRazorpayScript()
      .then(() => {
        initializeRazorpay();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [amount]);

  const handleClick = () => {
    if (rzp) {
      rzp.open();
    } else {
      console.error("Razorpay instance is not initialized.");
    }
  };

  return (
    <div>
      <h2>ORDER</h2>
      <p>Price: ₹{amount}</p>
      <button onClick={handleClick}>Pay Now</button>
    </div>
  );
};

export default RazorpayComponent;
