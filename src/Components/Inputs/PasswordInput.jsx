import React, { useState } from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import classNames from 'classnames';

const PasswordInput = ({
       borderColor = "none",
       placeholder,
       value,
       required = true,
       onChange,
       backgound = 'secoundBgColor',
       iconDirection = false,
       textDirection = false,
       paddingLeft = 'pl-2',
       paddingRight = 'pr-8'
}) => {
       const [show, setShow] = useState(false);

       return (
              <>
                     <div className="relative w-full h-14">
                            <input
                                   type={show ? "text" : "password"}
                                   placeholder={placeholder}
                                   className={classNames(
                                          `w-full h-full border-2 rounded-2xl outline-none px-2 py-3 text-2xl shadow bg-${backgound} font-TextFontRegular text-thirdColor`,
                                          textDirection ? 'text-right' : 'text-left', // Text alignment logic
                                          paddingLeft, // Dynamic padding left
                                          paddingRight, // Dynamic padding right
                                          {
                                                 'border-none': borderColor === 'none',
                                                 'border-mainColor': borderColor === 'mainColor', // Add more cases for different border colors
                                                 'border-thirdColor': borderColor === 'thirdColor', // Example of another color
                                          }
                                   )}
                                   value={value}
                                   onChange={onChange}
                                   required={required}
                            />
                            {show ? (
                                   <IoMdEye
                                          className={`absolute top-2/4 transform -translate-y-2/4 ${iconDirection ? 'left-2' : 'right-2'} text-2xl text-mainColor cursor-pointer`}
                                          onClick={() => setShow(!show)}
                                   />
                            ) : (
                                   <IoMdEyeOff
                                          className={`absolute top-2/4 transform -translate-y-2/4 ${iconDirection ? 'left-2' : 'right-2'} text-2xl text-mainColor cursor-pointer`}
                                          onClick={() => setShow(!show)}
                                   />
                            )}

                     </div>
              </>
       );
}

export default PasswordInput;
