import React from 'react'
import './index.css'
import { Outlet } from 'react-router-dom'
import Sidebar from './Components/Sidebar'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <div className="bg-secoundBgColor w-full flex justify-between">
      {/* Sidebar */}
      <span className='w-2/12'>
        <Sidebar />
      </span>

      {/* Main Content */}
      <div className="w-10/12 min-h-screen overflow-hidden">
        {/* Navbar */}
        <div>
          <Navbar />
        </div>

        {/* Main Content Area */}
        <div className="w-[98%] mx-auto h-full">
          <Outlet /> {/* Outlet for rendering children routes */}
        </div>
      </div>
    </div>
  )
}

export default App
