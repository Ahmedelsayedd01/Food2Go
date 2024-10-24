import React, { useEffect, useRef, useState } from 'react'

import { useAuth } from '../Context/Auth'
import SearchBar from './SearchBar';
import StaticButton from './Buttons/StaticButton';
import { CiGlobe } from 'react-icons/ci';
import { IoBagHandleOutline } from 'react-icons/io5';
import { IoIosArrowDown, IoMdNotificationsOutline } from 'react-icons/io';
import Logo from '../Assets/Images/Logo.Jsx';



const Navbar = () => {
       const auth = useAuth()
       const dropdownRef = useRef(null)

       const [selectedOption, setSelectedOption] = useState('EN');
       const [open, setOpen] = useState(false);


       const handleOptionClick = (value) => {
              setSelectedOption(value);
              setOpen(false)
       };
       const handleClickOpen = () => {
              setOpen(!open);
       };

       const handleClickOutside = (event) => {
              if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                     setOpen(false);
              }
       };

       useEffect(() => {
              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);

       const handleLogout = () => {
              auth.logout()
       }



       return (
              <>
                     <div className="flex items-center justify-between py-2 px-4  border-b-2">
                            <div className='w-4/12 flex items-center justify-start gap-x-4'>
                                   {/* image profile */}
                                   <div className="w-3/12">
                                          {auth.user?.image ? (<img src={auth.user?.image} className='w-14 h-14 rounded-full object-cover object-center' alt="Profile" />)
                                                 : (<Logo width={60} height={60} color={'#9E090F'} />)}
                                   </div>
                                   {/* Name Admin */}
                                   <div className="w-7/12">
                                          <span className='text-2xl text-mainColor font-bold'>Hello, {auth.user?.name || "Ahmed"}</span>
                                   </div>
                            </div>
                            <div className='w-5/12'>
                                   <SearchBar bg={"thirdBgColor"} />
                            </div>
                            <div className='w-3/12 flex items-center justify-center gap-x-6'>
                                   <div className="w-4/12 relative" ref={dropdownRef}>
                                          <button className='flex items-center gap-1 justify-between text-2xl' onClick={handleClickOpen}>
                                                 {selectedOption === 'EN' ? <CiGlobe className='text-mainColor text-2xl' /> : <CiGlobe className='text-mainColor 2xl' />} <span className='flex items-center text-mainColor font-medium'>{selectedOption}<IoIosArrowDown className={`${open ? "rotate-180" : "rotate-0"} mt-1 ml-1 transition-all duration-300`} /></span>

                                          </button>
                                          <div className={`${open ? "block" : "hidden"} absolute w-28 top-14 -left-3.5 bg-white rounded-xl border-2 overflow-hidden`}>
                                                 <div className='flex items-center py-1  gap-1 justify-center text-xl font-medium text-mainColor hover:cursor-pointer hover:bg-mainColor hover:text-white transition-all duration-300	' onClick={() => handleOptionClick('AR')}>
                                                        <CiGlobe /> AR
                                                 </div>
                                                 <div className='flex items-center py-1  gap-1 justify-center text-xl font-medium text-mainColor hover:cursor-pointer hover:bg-mainColor hover:text-white transition-all duration-300	' onClick={() => handleOptionClick('EN')}>
                                                        <CiGlobe /> EN
                                                 </div>
                                          </div>
                                   </div>
                                   <div className="flex items-center justify-between gap-x-5">
                                          <button type='button'>
                                                 <IoBagHandleOutline className='text-mainColor text-3xl' />
                                          </button>
                                          <button type='button'>
                                                 <IoMdNotificationsOutline className='text-mainColor text-3xl' />
                                          </button>
                                   </div>
                            </div>
                            <StaticButton type='button' Text={'Logout'} handleClick={handleLogout} />
                     </div>
              </>
       )
}

export default Navbar