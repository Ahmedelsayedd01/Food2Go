import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ContextProvider } from './Context/Auth.jsx';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router.jsx';
import { Provider } from 'react-redux';
import { StoreApp } from './Store/Store.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={StoreApp}>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
);

