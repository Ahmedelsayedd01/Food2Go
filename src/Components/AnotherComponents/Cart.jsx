import React from 'react'
import { PendingIcon } from '../../Assets/Icons/AllIcons'
import { Link } from 'react-router-dom'

const Cart = ({ icon, route, title, count }) => {
       return (
              <Link to={route} className="sm:min-w-full  lg:min-w-[18.5rem] max-w-[20rem] flex flex-col items-start justify-start gap-y-1
               bg-white shadow rounded-xl p-4 h-36">
                     <div className="w-full flex items-start justify-start overflow-hidden gap-x-2">
                            {icon}
                            <span className='text-mainColor font-TextFontMedium text-3xl'>{title}</span>
                     </div>
                     <span className="w-full mt-6 text-mainColor text-5xl font-TextFontMedium text-center">{count}</span>
              </Link>
       )
}

export default Cart