import React from 'react';
import { Link } from 'react-router-dom';

const OptimizedComponent = ({ route, icon, title, count }) => {
       return (
              <Link
                     to={route}
                     className="sm:min-w-full lg:min-w-[18.5rem] max-w-[20rem] flex flex-col items-start justify-start gap-y-1 bg-white shadow rounded-xl p-4 h-36"
              >
                     <div className="w-full flex items-start justify-start overflow-hidden gap-x-2">
                            {icon}
                            {/* Preload the font for faster rendering */}
                            <h1 className="text-mainColor font-TextFontRegular text-3xl">{title}</h1>
                     </div>
                     <span className="w-full mt-6 text-mainColor text-5xl font-TextFontMedium text-center">
                            {count}
                     </span>
              </Link>
       );
};

export default OptimizedComponent;
