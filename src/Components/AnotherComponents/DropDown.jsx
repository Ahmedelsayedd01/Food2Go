import React, { forwardRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

// Dropdown component to display options with customizable icon and styles
const DropDown = forwardRef(({
       iconMenu, // Custom icon
       iconDirection = false,
       handleOpen,
       stateoption,
       openMenu,
       handleOpenOption,
       border = true,
       options = [], // Options array, defaulting to an empty array
       onSelectOption, // Callback for when an option is selected
}, ref) => {

       const handleOptionClick = (option) => {
              if (onSelectOption) onSelectOption(option);
              handleOpenOption();
       };

       return (
              <div className="w-full mx-auto relative h-12 " ref={ref}>
                     <button
                            type="button"
                            aria-expanded={openMenu}
                            aria-haspopup="listbox"
                            className={`flex ${iconDirection ? 'flex-row-reverse' : 'flex-row'} items-center justify-between w-full py-2 px-3 h-14 shadow ${border ? "border-2 border-gray-400" : ''} rounded-xl outline-none font-TextFontRegular text-thirdColor bg-white`}
                            onClick={handleOpen}
                     >
                            <div className="text-mainColor text-2xl">{iconMenu}</div>
                            <span className="eleValueDropDown">{stateoption}</span>
                            <IoIosArrowDown className={`${openMenu ? "rotate-180" : "rotate-0"} text-thirdColor text-2xl transition-transform duration-300`} />
                     </button>

                     <div className={`${openMenu ? "block" : "hidden"} scrollSection absolute w-full min-h-10 max-h-32 sm:top-16 bg-white rounded-xl shadow-lg overflow-y-scroll scrollDrop z-20`}> {/* Higher z-index */}
                            {options.map((option, index) => (
                                   <div
                                          key={`${option.id}-${index}`}
                                          className="flex items-center py-1 px-2 gap-2 justify-center text-xl font-medium text-mainColor hover:cursor-pointer hover:bg-mainColor hover:text-white transition-colors duration-300"
                                          onClick={() => handleOptionClick(option)}
                                   >
                                          {option.name || option.title}
                                          <input type="hidden" value={option?.id || option.name || option.job} className="inputVal" />
                                   </div>
                            ))}
                     </div>
              </div>

       );
});

export default DropDown;
