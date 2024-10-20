import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/Auth';

const ProtectedLogin = () => {
       const auth = useAuth();
       const navigate = useNavigate();
       const location = useLocation(); // to get the previous location
       const [loading, setLoading] = useState(false); // State to handle async auth

       useEffect(() => {
              // Simulating async check for auth status (if useAuth() does that)
              if (auth.user) {
                     // Redirect to dashboard if user is authenticated
                     // <Navigate to={'/dashboard'} />
                     navigate('/dashboard', { state: { from: location }, replace: true });
              } else {
                     // <Navigate to={'/login'} />
                     auth.toastError('sadasd')
                     navigate('/login', { state: { from: location }, replace: true });
                     setLoading(false); // Set loading to false if no user found
              }
       }, [auth.user]);

       // If loading, we can display a loading screen (or return null to avoid any flashing UI)
       if (loading) {
              return <div>Loading...</div>;
       }

       // If no user is found, render the child routes (Outlet)
       return <Outlet />;
};

export default ProtectedLogin;
