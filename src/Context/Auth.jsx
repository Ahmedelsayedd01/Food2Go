import React, { createContext, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a context
const AuthContext = createContext();

export const ContextProvider = ({ children }) => {

  const [hideSidebar, setHideSidebar] = useState(() => {
    const savedState = localStorage.getItem('stateSidebar');
    return savedState ? JSON.parse(savedState) : true; // Ensure boolean
  });


  //   const saveLinks = localStorage.getItem('stateLinks');
  //   return saveLinks ? JSON.parse(saveLinks) : null;
  // });


  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });


  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    toast.success(`Welcome ${userData.name}`);
  };

  const logout = () => {
    setUser(null);
    setHideSidebar(true);
    localStorage.removeItem('user');
    localStorage.removeItem('stateSidebar');
  };

  // const updateSidebar = (list) => {
  //   setSidebar(list);
  // };

  const hideSide = (isHidden) => {
    setHideSidebar(isHidden);
    localStorage.setItem('stateSidebar', JSON.stringify(isHidden)); // Sync to localStorage
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        toastSuccess: (text) => toast.success(text),
        toastError: (text) => toast.error(text),
        hideSide,
        hideSidebar
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
  if (context === undefined) {
    throw new Error('useAuth must be used within a ContextProvider');
  }
  return context;
};