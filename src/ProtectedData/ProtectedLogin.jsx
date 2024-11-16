import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/Auth';
import { useSelector } from 'react-redux';

const ProtectedLogin = () => {
       const auth = useAuth();
       const navigate = useNavigate();
       const location = useLocation();
       const user = useSelector(state => state.user)
       useEffect(() => {
              const isAuthRoute = location.pathname === '/login' || location.pathname === '/forget_password';

              if (user && isAuthRoute) {
                     // If user is logged in and trying to access `/login` or `/forget_password`, redirect to dashboard
                     navigate('/dashboard', { replace: true });
              } else if (!user && !isAuthRoute) {
                     // If user is not logged in and trying to access a protected route, redirect to login
                     navigate('/login', { state: { from: location }, replace: true });
              }
              // Otherwise, allow the requested route to render
       }, [user, location.pathname]);

       return <Outlet />;
};

export default ProtectedLogin;
