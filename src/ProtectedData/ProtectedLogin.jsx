import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/Auth';

const ProtectedLogin = () => {
       const auth = useAuth();
       const navigate = useNavigate();
       const location = useLocation();

       useEffect(() => {
              const currentPath = location.pathname.split('?')[0];
              const isAuthRoute = currentPath === '/' || currentPath === '/forget_password';

              console.log('firstPath', isAuthRoute);
              console.log('auth', auth);

              if (auth?.userState && isAuthRoute) {
                     // If logged in and accessing public route, redirect to dashboard
                     navigate('/dashboard', { replace: true });
              } else if (!auth?.userState && !isAuthRoute) {
                     // If not logged in and accessing a protected route, redirect to login
                     navigate('/', { state: { from: location }, replace: true });
              }
       }, [auth]);
       // }, [auth, location.pathname, navigate]);

       return <Outlet />;
};

export default ProtectedLogin;
