import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../components';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          toast.error('No user data found!');
        }
      } else {
        navigate('/login'); // Redirect to login if not authenticated
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <>
      <Navbar />
      <div className='container my-5'>
        <h2>User Profile</h2>
        <div className='mb-3'>
          <label className='form-label'>Display Name</label>
          <p>{userData.displayName}</p>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Email</label>
          <p>{userData.email}</p>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Phone</label>
          <p>{userData.phone}</p>
        </div>
        {userData.imageUrl && (
          <div className='mb-3'>
            <label className='form-label'>Profile Image</label>
            <img src={userData.imageUrl} alt='Profile' className='img-fluid' />
          </div>
        )}
        <button
          className='btn btn-dark'
          onClick={() => navigate('/user/edit')}>
          Edit Profile
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
