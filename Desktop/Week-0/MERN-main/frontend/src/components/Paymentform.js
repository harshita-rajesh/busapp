// PaymentForm.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PaymentForm = () => {
  const { sessionId } = useParams();

  useEffect(() => {
    const loadStripe = async () => {
      const stripe = window.Stripe('your_public_key_here'); // Replace with your actual public key
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error(error);
      }
    };

    loadStripe();
  }, [sessionId]);

  return <div>Redirecting to payment...</div>;
};

export default PaymentForm;
