import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth, db } from '../firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';

const Navbar = ({ onSearch = () => {} }) => {
  const cartItems = useSelector((state) => state.handleCart);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      navigate(`/search?query=${searchQuery.trim()}`);
      onSearch(searchQuery.trim()); // Call the onSearch prop function
    }
  };

  return (
    <div
      className='buttons sticky-top text-end shadow-sm'
      style={{ width: '100%' }}>
      {user ? (
        <nav className='navbar navbar-expand-lg navbar-light bg-light px-5 py-0 sticky-top shadow-sm d-flex justify-content-between align-items-center'>
          <div className='container-fluid d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
              <NavLink className='navbar-brand py-0' to='/'>
                <div className='container'>
                  <span className='d-inline d-lg-none'>
                    <img
                      src='/assets/logo.jpg'
                      alt='logo'
                      style={{ height: '80px' }}
                    />
                  </span>
                  <span className='d-none d-lg-inline fw-bold text-dark fs-3'>
                    <img
                      src='/assets/brand-logo.jpg'
                      alt='brand-logo'
                      style={{ height: '21px', marginBottom: '7px' }}
                    />
                    ATO shop
                  </span>
                </div>
              </NavLink>
            </div>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'>
              <ul
                className='navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-between align-items-center'
                style={{ gap: '2%' }}>
                <li className='nav-item'>
                  <NavLink className='nav-link text-dark' to='/'>
                    Home
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link text-dark' to='/product'>
                    Products
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link text-dark' to='/about'>
                    About
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link text-dark' to='/contact'>
                    Contact
                  </NavLink>
                </li>
                <li>
                  <div className='search-box'>
                    <form onSubmit={handleSearch} className='d-flex'>
                      <input
                        type='text'
                        className='form-control me-2'
                        placeholder='Search'
                        aria-label='Search'
                        value={searchQuery}
                        style={{ width: '200px' }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button className='btn btn-outline-dark' type='submit'>
                        <i className='fa-solid fa-magnifying-glass'></i>
                      </button>
                    </form>
                  </div>
                </li>
                <li>
                  <div className='d-flex align-items-center'>
                    <img
                      src={userData?.imageUrl || '/assets/anonymous.png'}
                      alt='User'
                      className='rounded-circle'
                      style={{ height: '50px', objectFit: 'cover' }}
                    />
                    <span className='navbar-text mx-2 text-dark'>
                      <NavLink className='nav-link text-dark' to='/user'>
                        Welcome, {user.displayName || 'new user'}
                      </NavLink>
                    </span>
                    <button
                      className='btn btn-sm btn-outline-dark m-2'
                      onClick={handleLogout}>
                      Logout
                    </button>
                    <NavLink
                      to='/cart'
                      className='btn btn-sm btn-outline-dark m-2'>
                      <i className='fa fa-cart-shopping me-1'></i> Cart (
                      {cartItems.length})
                    </NavLink>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : (
        <nav className='navbar navbar-expand-lg navbar-light bg-light px-5 py-0 sticky-top shadow-sm d-flex justify-content-between align-items-center'>
          <div className='container-fluid d-flex justify-content-between align-items-center'>
            <NavLink className='navbar-brand py-0' to='/'>
              <div className='container'>
                <span className='d-inline d-lg-none'>
                  <img
                    src='/assets/logo.jpg'
                    alt='logo'
                    style={{ height: '80px' }}
                  />
                </span>
                <span className='d-none d-lg-inline fw-bold text-dark fs-3'>
                  <img
                    src='/assets/brand-logo.jpg'
                    alt='brand-logo'
                    style={{ height: '20px', marginBottom: '7px' }}
                  />
                  <h5 className='d-inline text-dark fs-3 fw-bold'>ATO shop</h5>
                </span>
              </div>
            </NavLink>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'>
              <ul
                className='navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-between align-items-center'
                style={{ gap: '2%' }}>
                <li className='nav-item'>
                  <NavLink className='nav-link text-dark' to='/'>
                    Home
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link text-dark' to='/product'>
                    Products
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link text-dark' to='/about'>
                    About
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link text-dark' to='/contact'>
                    Contact
                  </NavLink>
                </li>
                <li>
                  <div className='search-box'>
                    <form onSubmit={handleSearch} className='d-flex'>
                      <input
                        type='text'
                        className='form-control me-2'
                        placeholder='Search'
                        aria-label='Search'
                        value={searchQuery}
                        style={{ width: '200px' }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button className='btn btn-outline-dark' type='submit'>
                        <i className='fa-solid fa-magnifying-glass'></i>
                      </button>
                    </form>
                  </div>
                </li>
                <li>
                  <div className='d-flex align-items-center' style={{ padding: '16.5px 0' }}>
                    <div className='btn-group btn-group-sm'>
                      <NavLink to='/login' className='btn btn-outline-dark'>
                        <i className='fa fa-sign-in-alt me-1'></i> Login
                      </NavLink>
                      <NavLink to='/register' className='btn btn-outline-dark'>
                        <i className='fa fa-user-plus me-1'></i> Register
                      </NavLink>
                    </div>
                    <NavLink
                      to='/cart'
                      className='btn btn-sm btn-outline-dark m-2'>
                      <i className='fa fa-cart-shopping me-1'></i> Cart (
                      {cartItems.length})
                    </NavLink>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

Navbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Navbar;
