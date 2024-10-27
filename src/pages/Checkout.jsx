import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components';

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);

  const calculateTotalPrice = () => {
    return state.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const EmptyCart = () => {
    return (
      <>
        <Navbar />
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 py-5 bg-light text-center'>
              <h4 className='p-3 display-5'>No item in Cart</h4>
              <Link to='/' className='btn btn-outline-dark mx-4'>
                <i className='fa fa-arrow-left'></i> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  };

  const ShowCheckout = () => {
    return (
      <>
        <Navbar />
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 py-5 bg-light text-center'>
              <h4 className='p-3 display-5'>Checkout</h4>
              <ul className='list-group'>
                {state.map((item) => (
                  <li key={item.id} className='list-group-item'>
                    <div className='row'>
                      <div className='col-md-2'>
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{ height: '50px' }}
                        />
                      </div>
                      <div className='col-md-4'>
                        <h5>{item.title}</h5>
                      </div>
                      <div className='col-md-2'>
                        <h5>${item.price}</h5>
                      </div>
                      <div className='col-md-2'>
                        <h5>Qty: {item.qty}</h5>
                      </div>
                      <div className='col-md-2'>
                        <h5>Total: ${item.price * item.qty}</h5>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <h5 className='mt-4'>Total Price: ${calculateTotalPrice()}</h5>
              <Link to='/payment' className='btn btn-dark mt-3'>
                Proceed to Payment
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  };

  return <>{state.length > 0 ? <ShowCheckout /> : <EmptyCart />}</>;
};

export default Checkout;
