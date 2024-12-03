

const EmailInput = ({ value, onChange, required = true, placeholder, backgound = 'secoundBgColor', placeholderSize = false, borderColor = "none", paddinLeft = 'pl-2', paddinRight = 'pr-2' }) => {
       return (
              <>
                     <div className="w-full h-14">
                            <input type="email"
                                   value={value}
                                   onChange={onChange}
                                   required={required}
                                   className={`w-full border-2 rounded-2xl border-${borderColor}
                                   outline-none px-2 py-3 shadow ${paddinLeft} ${paddinRight}
                                   ${placeholderSize ? 'text-lg' : 'text-2xl'} 
                                   font-TextFontRegular bg-${backgound} text-2xl text-thirdColor
                                   valueInput`}
                                   placeholder={placeholder}
                            />
                     </div>


              </>

       )
}

export default EmailInput