import React, { createContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeUser, setUser } from '../Store/CreateSlices';

// Create a context
const AuthContext = createContext(null);

export const authSelector = (state) => state.userFood2go || null;
export const ContextProvider = ({ children }) => {
  const [hideSidebar, setHideSidebar] = useState(() => {
    const savedState = localStorage.getItem('stateSidebar');
    return savedState ? JSON.parse(savedState) : true;
  });

  const dispatch = useDispatch();
  const userStore = useSelector(state => state.userFood2go);

  const [userState, setUserState] = useState(() => {
    const userData = userStore ? userStore : null;
    return userData;
  });

  useEffect(() => {
    if (userState) {
      dispatch(setUser(userState));
    } else {
      dispatch(removeUser());
    }
  }, [userState, dispatch]);

  const login = (userData) => {
    setUserState(userData);
    toast.success(`Welcome ${userData.name}`);
  };

  const logout = () => {
    setUserState(null);
    setHideSidebar(true);
    dispatch(removeUser());
  };

  const hideSide = (isHidden) => {
    setHideSidebar(isHidden);
    localStorage.setItem('stateSidebar', JSON.stringify(isHidden));
  };

  return (
    <AuthContext.Provider
      value={{
        userState,
        login,
        logout,
        toastSuccess: (text) => toast.success(text),
        toastError: (text) => toast.error(text),
        hideSide,
        hideSidebar,
      }}
    >
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within a ContextProvider');
  }
  return context;
};