import React from 'react'
import LinksSidebar from './LinksSidebar'
import Logo from '../Assets/Images/Logo.Jsx'

const Sidebar = () => {
       return (
              <div className="bg-mainColor py-3 px-3 rounded-tr-[38px] rounded-br-[38px] h-screen">
                     <aside className="">
                            <div className="w-full flex items-center justify-between  border-b-2 border-b-gray-300 pb-1">
                                   <span className='font-TextFontLight text-white text-4xl'>Food2go</span>
                                   <Logo width={50} height={50} />
                            </div>
                            <div className="w-full mt-2">
                                   <LinksSidebar />
                            </div>
                     </aside>
              </div>
       )
}

export default Sidebar