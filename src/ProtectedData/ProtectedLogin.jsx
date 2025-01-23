import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/Auth';

const ProtectedLogin = () => {
       const auth = useAuth();
       const navigate = useNavigate();
       const location = useLocation();

       useEffect(() => {
              const currentPath = location.pathname.split('?')[0];
              const isAuthRoute = currentPath === '/login' || currentPath === '/forget_password';

              if (auth.user && isAuthRoute) {
                     // If logged in and accessing public route, redirect to dashboard
                     navigate('/dashboard', { replace: true });
              } else if (!auth.user && !isAuthRoute) {
                     // If not logged in and accessing a protected route, redirect to login
                     navigate('/login', { state: { from: location }, replace: true });
              }
       }, [auth, location]);

       return <Outlet />;
};

export default ProtectedLogin;

