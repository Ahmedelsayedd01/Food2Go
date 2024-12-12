import React from 'react'
import { IoSearch } from 'react-icons/io5'

const SearchBar = ({ type = "text", bgColor = 'bg-mainBgColor', textColor = 'mainColor', pr = "2", value, handleChange, placeholder = 'Search' }) => {
       return (
              <div className='w-full relative'>
                     <input type={type}
                            name="search"
                            onChange={handleChange}
                            value={value}
                            className={`w-full h-full shadow pl-12 py-3 rounded-3xl outline-none font-TextFontRegular 
                            placeholder-${textColor}
                            ${bgColor}
                            text-${textColor}
                            pr-${pr}`}
                            placeholder={placeholder} />
                     <IoSearch className='absolute top-3 left-4 text-mainColor font-bold text-xl' />
              </div>
       )
}

export default SearchBar