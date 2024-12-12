

// const NumberInput = ({ value, onChange, placeholder, backgound = 'white', placeholderSize = false, borderColor = "none", paddinLeft = 'pl-2', paddinRight = 'pr-2' }) => {
//        return (
//               <>
//                      <div className="w-full h-12">
//                             <input type="text"
//                                    value={value}
//                                    onChange={onChange}
//                                    className={`w-full border-2 rounded-2xl border-${borderColor}
//                                    outline-none p-2 py-3 shadow ${paddinLeft} ${paddinRight}
//                                    ${placeholderSize ? 'text-lg' : 'text-2xl'} 
//                                    font-TextFontRegular  bg-${backgound} text-2xl text-thirdColor
//                                    valueInput`}
//                                    placeholder={placeholder}
//                             />
//                      </div>


//               </>

//        )
// }

// export default NumberInput

const NumberInput = ({
       value,
       onChange,
       placeholder,
       backgound = 'white',
       placeholderSize = false,
       borderColor = "none",
       paddinLeft = 'pl-2',
       paddinRight = 'pr-2'
}) => {
       const handleInputChange = (event) => {
              // Filter non-numeric characters in the value
              const numericValue = event.target.value.replace(/[^0-9]/g, '');
              // Update the value in the event object before passing it up
              event.target.value = numericValue;
              onChange(event); // Pass the modified event to the parent's onChange handler
       };

       return (
              <div className="w-full h-12">
                     <input
                            type="text"
                            value={value}
                            onChange={handleInputChange}
                            className={`w-full border-2 rounded-2xl border-${borderColor}
                       outline-none p-2 py-3 shadow ${paddinLeft} ${paddinRight}
                       ${placeholderSize ? 'text-lg' : 'text-2xl'} 
                       font-TextFontRegular bg-${backgound} text-2xl text-thirdColor
                       valueInput`}
                            placeholder={placeholder}
                     />
              </div>
       );
};

export default NumberInput;

