import React from 'react'
import './index.css'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className="w-full flex justify-between">
      {/* Sidebar */}
      <span className='w-2/12'>Sidebar</span>

      {/* Main Content */}
      <div className="w-10/12  min-h-screen overflow-hidden">
        {/* Navbar */}
        <div>Navbar</div>

        {/* Main Content Area */}
        <div className="bg-thirdBgColor w-full h-full">
          <div className="w-[95%] mx-auto h-full">
            <Outlet /> {/* Outlet for rendering children routes */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
