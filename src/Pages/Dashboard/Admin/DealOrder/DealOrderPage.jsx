import React, { useEffect, useRef, useState } from 'react';
import { usePost } from '../../../../Hooks/usePostJson';
import { LoaderLogin, SearchBar, SubmitButton } from '../../../../Components/Components';
import { useAuth } from '../../../../Context/Auth';

const DealOrdePage = () => {
       const auth = useAuth();
       const { postData, loadingPost, response } = usePost({
              url: 'https://Bcknd.food2go.online/admin/dealOrder',
       });

       const [code, setCode] = useState('');

       useEffect(() => {
              console.log('response', response)
              console.log('response faild', response?.data?.faild || 'sdf')
       }, [response])
       const handleSearch = (e) => {
              e.preventDefault();

              if (!code) {
                     auth.toastError('Please Enter Your Code.'); // Replace with toast or better notification
                     return;
              }

              const formData = new FormData();
              formData.append('code', code);

              console.log('FormData:', ...formData.entries());
              postData(formData, '');
       };
       const headers = ['SL', 'Deal name ', "Description", 'Start Date', 'Start Date', 'Price', 'Active', 'Priority', 'Action'];
       return (
              <>
                     <section>
                            <form onSubmit={handleSearch}>
                                   <div className="w-full flex items-center justify-center">
                                          <div className="w-full flex items-center justify-center gap-x-4">
                                                 <div className="w-3/4">
                                                        <SearchBar
                                                               value={code}
                                                               handleChange={(e) => setCode(e.target.value)}
                                                               placeholder='Search Order Code'
                                                        />
                                                 </div>
                                                 <div className="">
                                                        <SubmitButton
                                                               text={'Search'}
                                                               rounded="rounded-2xl"
                                                               handleClick={handleSearch}
                                                        />
                                                 </div>
                                          </div>
                                   </div>
                                   <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
                                          {loadingPost ? (
                                                 <div className="w-full h-56 mt-10 flex justify-center items-center">
                                                        <LoaderLogin />
                                                 </div>
                                          ) : (
                                                 <>
                                                        {!response ? '' : (
                                                               response.data.faild === "Code is expired" ? (
                                                                      <span className='font-TextFontMedium text-mainColor text-xl mx-auto mt-5'>Code Is Expired</span>
                                                               ) : (
                                                                      '124s'
                                                               )
                                                        )}

                                                 </>
                                          )}

                                   </div>

                            </form>
                     </section>
                     {/* )} */}
              </>
       );
};

export default DealOrdePage;