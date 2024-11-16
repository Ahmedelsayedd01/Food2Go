import React from 'react'
import { LuUpload } from 'react-icons/lu'

const UploadInput = ({ uploadFileRef, handleFileChange, required = true, borderColor = "none", placeholder, placeholderSize = false, value, readonly = true, onChange, iconDirection = false, textDirection = false, onClick, paddinLeft = 'pl-2', paddinRight = 'pr-11', upload = false, source = 'upload' }) => {
       return (
              <>
                     <div className="relative w-full h-12">
                            <input type='text'
                                   placeholder={placeholder}
                                   className={`w-full border-2 ${textDirection ? "text-right" : "text-left"} rounded-2xl border-${borderColor} 
                       outline-none p-2 py-3 shadow cursor-pointer ${paddinLeft} ${paddinRight} text-2xl  ${placeholderSize ? 'text-lg' : 'text-2xl'} font-normal eleValueInput ${upload ? "text-mainColor cursor-pointer pr-10" : "text-thirdColor"}`}
                                   value={value}
                                   onClick={onClick}
                                   onChange={onChange}
                                   readOnly={readonly}
                                   required />
                            {upload ? <LuUpload className={`absolute top-1/3 transform -translate-y-1/3 text-mainColor text-2xl cursor-pointer ${iconDirection ? 'left-4' : 'right-2'} `} /> : ''}
                            {source == 'external' ? <FaExternalLinkAlt className='absolute right-4 top-1/3 text-mainColor text-2xl cursor-pointer' /> :
                                   source == 'embedded' ? <FaLink className='absolute top-1/3 text-mainColor text-2xl cursor-pointer' /> :
                                          source == 'upload' ? <LuUpload className={`absolute right-4 top-1/3 text-mainColor text-2xl cursor-pointer ${iconDirection ? 'left-4' : 'right-2'} `} />
                                                 : ''}
                            {/* external, embedded, upload */}
                     </div>
                     <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            ref={uploadFileRef}
                     />
              </>
       )
}

export default UploadInput