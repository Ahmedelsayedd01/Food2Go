import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ContextProvider } from './Context/Auth.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
)
