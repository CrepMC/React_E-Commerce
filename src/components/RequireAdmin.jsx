import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

const RequireAdmin = ({ children }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || !user.admin) {
        navigate('/not-authorized');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return <>{children}</>;
};

export default RequireAdmin;
