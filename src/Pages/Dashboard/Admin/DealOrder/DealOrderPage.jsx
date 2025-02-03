import React, { useEffect, useState } from 'react';
import { usePost } from '../../../../Hooks/usePostJson';
import { LoaderLogin, SearchBar, SubmitButton } from '../../../../Components/Components';
import { useAuth } from '../../../../Context/Auth';
import { Dialog } from '@headlessui/react';

const DealOrderPage = () => {
       const auth = useAuth();
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { postData: postDealOrder, loadingPost: loadingDealOrder, response: responseDealOrder } = usePost({
              url: `${apiUrl}/admin/dealOrder`,
       });

       const { postData: postDealOrderAdd, loadingPost: loadingDealOrderAdd, response: responseDealOrderAdd } = usePost({
              url: `${apiUrl}/admin/dealOrder/add`,
       });


       const [code, setCode] = useState('');
       const [openDescriptionView, setOpenDescriptionView] = useState(false);
       const [currentResponse, setCurrentResponse] = useState(null);

       useEffect(() => {
              console.log('Response DealOrder:', responseDealOrder);
              setCurrentResponse(responseDealOrder);
       }, [responseDealOrder]);

       useEffect(() => {
              console.log('Response DealOrderAdd:', responseDealOrderAdd);
              if (!loadingDealOrderAdd) {
                     setCode('');
                     setCurrentResponse(null);
              }
       }, [responseDealOrderAdd]);

       const handleSearch = (e) => {
              e.preventDefault();

              if (!code) {
                     auth.toastError('Please Enter Your Code.');
                     return;
              }

              const formData = new FormData();
              formData.append('code', code);

              console.log('FormData:', ...formData.entries());
              postDealOrder(formData);
       };

       const handleApprove = (dealId, userId) => {
              const formData = new FormData();
              formData.append('deal_id', dealId);
              formData.append('user_id', userId);

              console.log('FormData:', ...formData.entries());
              postDealOrderAdd(formData, 'Deal Approved Success');
       };

       const headers = ['Deal Image', 'Deal Name', 'Description', 'Start Date', 'End Date', 'Price', 'Action'];

       return (
              <section>
                     <form onSubmit={handleSearch}>
                            <div className="w-full flex items-center justify-center">
                                   <div className="w-full flex items-center justify-center gap-x-4">
                                          <div className="w-3/4">
                                                 <SearchBar
                                                        value={code}
                                                        handleChange={(e) => setCode(e.target.value)}
                                                        placeholder="Enter the code"
                                                 />
                                          </div>
                                          <div>
                                                 <SubmitButton text={'Search'} rounded="rounded-2xl" handleClick={handleSearch} />
                                          </div>
                                   </div>
                            </div>
                            <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
                                   {(loadingDealOrder || loadingDealOrderAdd) ? (
                                          <div className="w-full h-56 mt-10 flex justify-center items-center">
                                                 <LoaderLogin />
                                          </div>
                                   ) : (
                                          currentResponse?.data?.faild === 'Code is expired' ? (
                                                 <span className="font-TextFontMedium text-mainColor text-xl mx-auto mt-5">Code Is Expired</span>
                                          ) : (
                                                 currentResponse && (
                                                        <table className="w-full sm:min-w-0 block overflow-x-scroll scrollPage mt-5">
                                                               <thead className="w-full">
                                                                      <tr className="w-full border-b-2">
                                                                             {headers.map((name, index) => (
                                                                                    <th
                                                                                           className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3"
                                                                                           key={index}
                                                                                    >
                                                                                           {name}
                                                                                    </th>
                                                                             ))}
                                                                      </tr>
                                                               </thead>
                                                               <tbody className="w-full">
                                                                      <tr className="w-full border-b-2">
                                                                             <td className="min-w-[80px] py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    <div className="flex justify-center">
                                                                                           <img
                                                                                                  src={currentResponse.data.deal.image_link}
                                                                                                  className="bg-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                                                                                                  loading="lazy"
                                                                                                  alt="Deal"
                                                                                           />
                                                                                    </div>
                                                                             </td>
                                                                             <td className="min-w-[80px] py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    {currentResponse.data.deal.title}
                                                                             </td>
                                                                             <td className="min-w-[80px] py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    <span
                                                                                           className="text-mainColor text-xl border-b-2 border-mainColor font-TextFontSemiBold cursor-pointer"
                                                                                           onClick={() => setOpenDescriptionView(true)}
                                                                                    >
                                                                                           View
                                                                                    </span>
                                                                                    {openDescriptionView && (
                                                                                           <Dialog open={true} onClose={() => setOpenDescriptionView(false)} className="relative z-10">
                                                                                                  <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                                                                                                                       <div className="w-full flex flex-wrap items-center justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                                                                                                              <ul className="p-4 rounded-xl shadow-md">
                                                                                                                                     <li className="list-disc mx-4 text-mainColor text-lg lg:text-xl font-TextFontSemiBold capitalize">
                                                                                                                                            {currentResponse.data.deal.description}
                                                                                                                                     </li>
                                                                                                                              </ul>
                                                                                                                       </div>
                                                                                                                       <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                              <button
                                                                                                                                     type="button"
                                                                                                                                     onClick={() => setOpenDescriptionView(false)}
                                                                                                                                     className="mt-3 inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-TextFontMedium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark focus:outline-none"
                                                                                                                              >
                                                                                                                                     Close
                                                                                                                              </button>
                                                                                                                       </div>
                                                                                                                </div>
                                                                                                         </div>
                                                                                                  </div>
                                                                                           </Dialog>
                                                                                    )}
                                                                             </td>
                                                                             <td className="min-w-[80px] py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    {currentResponse.data.deal.start_date}
                                                                             </td>
                                                                             <td className="min-w-[80px] py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    {currentResponse.data.deal.end_date}
                                                                             </td>
                                                                             <td className="min-w-[80px] py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    {currentResponse.data.deal.price}
                                                                             </td>
                                                                             <td className="min-w-[80px] py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    <button
                                                                                           type="button"
                                                                                           className="px-4 py-2 text-xl font-TextFontRegular bg-green-400 text-white rounded-xl duration-300 hover:bg-green-500"
                                                                                           onClick={() => handleApprove(currentResponse.data.deal.id, currentResponse.data.user.id)}
                                                                                    >
                                                                                           Approve
                                                                                    </button>
                                                                             </td>
                                                                      </tr>
                                                               </tbody>
                                                        </table>
                                                 )
                                          )
                                   )}
                            </div>
                     </form>
              </section>
       );
};

export default DealOrderPage;
