import React, { useEffect, useRef, useState } from 'react'
import { usePost } from '../../../../Hooks/usePostJson';
import { StaticButton, StaticLoader, SubmitButton, Switch, TextInput } from '../../../../Components/Components';
import { useAuth } from '../../../../Context/Auth';

const AddLanguageSection = ({ update, setUpdate }) => {
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { postData, loadingPost, response } = usePost({
              url: `${apiUrl}/admin/translation/add`
       });

       const auth = useAuth();

       const [languageName, setLanguageName] = useState('');

       const [activeLanguage, setActiveLanguage] = useState(0);


       const handleStatusLanguage = () => {
              const currentState = activeLanguage;
              { currentState === 0 ? setActiveLanguage(1) : setActiveLanguage(0) }
       }


       useEffect(() => {
              console.log('response', response)
              if (!loadingPost) {
                     handleReset()
              }
              setUpdate(!update)
       }, [response])

       const handleReset = () => {
              setLanguageName('')
              setActiveLanguage(0)
       }


       const handleLanguageAdd = (e) => {
              e.preventDefault();

              if (!languageName) {
                     auth.toastError('Please Enter Language Name')
                     return;
              }


              const formData = new FormData();


              formData.append('name', languageName)
              formData.append('status', activeLanguage)



              postData(formData, 'Language Added Success');

       };
       return (
              <>
                     {loadingPost ? (
                            <>
                                   <div className="w-full h-56 flex justify-center items-center">
                                          <StaticLoader />
                                   </div>
                            </>
                     ) : (
                            <section>
                                   <form onSubmit={handleLanguageAdd}>
                                          {/* Content*/}
                                          <div className="sm:py-3 lg:py-6">
                                                 <div
                                                        className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4">
                                                        {/* Zone Name */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                               <span className="text-xl font-TextFontRegular text-thirdColor">Language Name:</span>
                                                               <TextInput
                                                                      value={languageName}
                                                                      onChange={(e) => setLanguageName(e.target.value)}
                                                                      placeholder="Language Name"
                                                               />
                                                        </div>

                                                        <div className="sm:w-full xl:w-[30%] flex items-center justify-start gap-3 pt-10">
                                                               <span className="text-xl font-TextFontRegular text-thirdColor">Active:</span>
                                                               <Switch handleClick={handleStatusLanguage} checked={activeLanguage} />
                                                        </div>

                                                 </div>


                                          </div>

                                          {/* Buttons*/}
                                          <div className="w-full flex items-center justify-end gap-x-4">
                                                 <div className="">
                                                        <StaticButton text={'Reset'} handleClick={handleReset} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
                                                 </div>
                                                 <div className="">
                                                        <SubmitButton
                                                               text={'Submit'}
                                                               rounded='rounded-full'
                                                               handleClick={handleLanguageAdd}
                                                        />
                                                 </div>

                                          </div>
                                   </form>
                            </section>
                     )}
              </>
       )
}

export default AddLanguageSection