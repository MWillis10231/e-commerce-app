import { CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import React from 'react';
import { useHistory } from "react-router";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  let history = useHistory();

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      alert('Payment was not accepted')
    } else {
      alert('Payment worked!')
      console.log('[PaymentMethod]', paymentMethod);
      history.push({pathname: '/cart/finalise', payment: true})
    }
  };

  return (
    <React.Fragment>
      <form className="Payment" onSubmit={handleSubmit}>
          <CardElement
    options={cardElementOptions}
/>
      <button type="submit" disabled={!stripe}>Pay</button>
      </form>
      </React.Fragment>
  );
};
