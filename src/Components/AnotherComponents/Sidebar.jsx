import React, { useEffect, useState } from 'react'
import { LinksSidebar } from '../Components'
import WhiteLogo from '../../Assets/Images/WhiteLogo'
import { useAuth } from '../../Context/Auth'

const Sidebar = () => {
       const auth = useAuth();
       const [stateSide, setStateSide] = useState(() => {
              // Retrieve initial sidebar state from context or localStorage
              const savedState = auth.hideSidebar ?? localStorage.getItem('stateSidebar');
              return savedState ?? JSON.parse(savedState);
       });

       const handleSidebar = () => {
              setStateSide((prevState) => {
                     const newState = !prevState;
                     localStorage.setItem('stateSidebar', JSON.stringify(newState));
                     auth.hideSide(newState); // Update the context as well
                     return newState;
              });
       };

       useEffect(() => {
              // Keep the context state in sync with the local component state
              auth.hideSide(stateSide);
       }, [stateSide]);

       return (
              <aside className="bg-mainColor py-3 px-3 rounded-tr-[38px] rounded-br-[38px]  overflow-hidden h-screen duration-300">
                     {/* <aside className=""> */}
                     <div className="w-full flex items-center justify-between cursor-pointer border-b-2 border-b-gray-300 pb-1"
                            onClick={handleSidebar}>
                            <span className={`${stateSide ? 'block' : 'hidden'} font-TextFontLight text-white text-4xl`}>Food2go</span>
                            <WhiteLogo width={50} height={50} />
                     </div>
                     <div className="w-full h-[40rem] overflow-scroll scrollSidebar scroll-smooth mt-2">
                            <LinksSidebar />
                     </div>
                     {/* </aside> */}
              </aside>
       )
}

export default Sidebar