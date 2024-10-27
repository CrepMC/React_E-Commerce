import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/action'; // Adjust the path if necessary

const Payment = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch(); // Initialize dispatch
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return state.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setError('Stripe.js has not yet loaded. Please try again later.');
      return;
    }
    const cardElement = elements.getElement(CardElement);

    try {
      setLoading(true);
      const fakePaymentResponse = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const isSuccess = Math.random() > 0.2; // 80% chance of success
          if (isSuccess) {
            resolve({ success: true });
          } else {
            reject(
              new Error('Payment failed. Please check your card details.')
            );
          }
        }, 2000); // Simulate a 2-second delay
      });

      if (fakePaymentResponse.success) {
        setSuccess('Payment successful! Thank you for your purchase.');
        setError('');
        setTimeout(() => {
          dispatch(clearCart()); // Clear the cart after successful payment
        }, 1000);
        setLoading(false);
        setTimeout(() => {
          navigate('/'); // Redirect to home page
        }, 750);
      }
    } catch (err) {
      setError(err.message);
      setSuccess('');
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className='container my-5'>
        <h2 className='text-center'>Payment</h2>
        <hr />
        {state.length > 0 ? (
          <div>
            <h4 className='text-center'>Order Summary</h4>
            <ul className='list-group'>
              {state.map((item) => (
                <li key={item.id} className='list-group-item'>
                  <div className='row'>
                    <div className='col-md-6'>{item.title}</div>
                    <div className='col-md-2'>Qty: {item.qty}</div>
                    <div className='col-md-2'>${item.price}</div>
                    <div className='col-md-2'>
                      Total: ${item.price * item.qty}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <h5 className='mt-4'>Total Price: ${calculateTotalPrice()}</h5>
            <form onSubmit={handlePayment}>
              <CardElement />
              <button
                className='btn btn-success mt-3'
                type='submit'
                disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Confirm Payment'}
              </button>
            </form>
            {error && <div className='alert alert-danger mt-3'>{error}</div>}
            {success && (
              <div className='alert alert-success mt-3'>{success}</div>
            )}
          </div>
        ) : (
          <div className='text-center'>
            <h4>No items in cart. Please add items to proceed.</h4>
            <Link to='/product' className='btn btn-outline-dark mt-3'>
              Go to Products
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Payment;
