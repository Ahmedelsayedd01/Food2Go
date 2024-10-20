// import React, { createContext, useState, useEffect } from 'react';
// import { toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'; // Import the toastify styles
// // Create a context
// const AuthContext = createContext();

// // Provide the context
// export const ContextProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const userData = localStorage.getItem('user');
//     return userData ? JSON.parse(userData) : null;
//   });

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('user');
//       localStorage.removeItem("sidebarState")
//     }
//   }, [user]);

//   const login = (userData) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("sidebarState")
//     localStorage.removeItem('user');
//   };
//   const toastSuccess = (text) => {
//     toast.success(text);

//   };
//   const toastError = (text) => {
//     toast.error(text);

//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, toastSuccess, toastError }}>
//       <ToastContainer />
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use auth context
// export const useAuth = () => {
//   return React.useContext(AuthContext);
// };


import React, { createContext, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify styles

// Create a context
const AuthContext = createContext();

// Provide the context
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('sidebarState');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    toast.success('Login successful!');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('sidebarState');
    toast.success('Logout successful!');
  };

  const toastSuccess = (text) => {
    toast.success(text, {
      position: 'top-center',  // Use string for position
      autoClose: 3000,
    });
  };

  const toastError = (text) => {
    toast.error(text, {
      position: 'top-center',  // Use string for position
      autoClose: 3000,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, toastSuccess, toastError }}>
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
