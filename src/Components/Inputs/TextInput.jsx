

const TextInput = ({ value, onChange, placeholder, placeholderSize = false, borderColor = "none", paddinLeft = 'pl-2', paddinRight = 'pr-2' }) => {
       return (
              <>
                     <div className="w-full h-14">
                            <input type="text"
                                   value={value}
                                   onChange={onChange}
                                   className={`w-full border-2 rounded-2xl border-${borderColor}
                                   outline-none px-2 py-3 ${paddinLeft} ${paddinRight}
                                   ${placeholderSize ? 'text-lg' : 'text-2xl'} 
                                   font-TextFontRegular  bg-secoundBgColor text-2xl text-thirdColor
                                   valueInput`}
                                   placeholder={placeholder}
                            />
                     </div>


              </>

       )
}

export default TextInput