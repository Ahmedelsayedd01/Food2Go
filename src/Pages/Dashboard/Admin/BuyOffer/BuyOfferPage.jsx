import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../Context/Auth';
import { usePost } from '../../../../Hooks/usePostJson';
import { LoaderLogin, SearchBar, SubmitButton } from '../../../../Components/Components';
import { Dialog } from '@headlessui/react';

const BuyOfferPage = () => {
       const auth = useAuth();
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { postData: postBuyOffer, loadingPost: loadingBuyOffer, response: responseBuyOffer } = usePost({
              url: `${apiUrl}/admin/offerOrder`,
       });

       const { postData: postBuyOfferAdd, loadingPost: loadingBuyOfferAdd, response: responseBuyOfferAdd } = usePost({
              url: `${apiUrl}/admin/offerOrder/approve_offer`,
       });


       const [code, setCode] = useState('');
       const [openDescriptionView, setOpenDescriptionView] = useState(false);
       const [currentResponse, setCurrentResponse] = useState(null);

       useEffect(() => {
              console.log('Response BuyOffer:', responseBuyOffer);
              setCurrentResponse(responseBuyOffer);
       }, [responseBuyOffer]);

       useEffect(() => {
              console.log('Response BuyOfferAdd:', responseBuyOfferAdd);
              if (!loadingBuyOfferAdd) {
                     setCode('');
                     setCurrentResponse(null);
              }
       }, [responseBuyOfferAdd]);

       const handleSearch = (e) => {
              e.preventDefault();

              if (!code) {
                     auth.toastError('Please Enter Your Code.');
                     return;
              }

              const formData = new FormData();
              formData.append('code', code);

              console.log('FormData:', ...formData.entries());
              postBuyOffer(formData);
       };

       const handleApprove = (offerId) => {
              const formData = new FormData();
              formData.append('offer_order_id', offerId);

              console.log('FormData:', ...formData.entries());
              postBuyOfferAdd(formData, 'Offer Approved Success');
       };

       const headers = ['Offer Image', 'Offer Name', 'Points', 'Action'];

       return (
              <section>
                     <form onSubmit={handleSearch}>
                            <div className="w-full flex items-center justify-center">
                                   <div className="w-full flex items-center justify-center gap-x-4">
                                          <div className="w-3/4">
                                                 <SearchBar
                                                        value={code}
                                                        handleChange={(e) => setCode(e.target.value)}
                                                        placeholder="Enter The Code"
                                                 />
                                          </div>
                                          <div>
                                                 <SubmitButton text={'Search'} rounded="rounded-2xl" handleClick={handleSearch} />
                                          </div>
                                   </div>
                            </div>
                            <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
                                   {(loadingBuyOffer || loadingBuyOfferAdd) ? (
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
                                                                                                  src={currentResponse.data.offer.
                                                                                                         offer.image_link}
                                                                                                  className="bg-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                                                                                                  loading="lazy"
                                                                                                  alt="Deal"
                                                                                           />
                                                                                    </div>
                                                                             </td>
                                                                             <td className="min-w-[80px] py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    {currentResponse.data.offer.
                                                                                           offer.product}
                                                                             </td>
                                                                             <td className="min-w-[80px] py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    {currentResponse.data.offer.
                                                                                           offer.points}
                                                                             </td>
                                                                             <td className="min-w-[80px] py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    <button
                                                                                           type="button"
                                                                                           className="px-4 py-2 text-xl font-TextFontRegular bg-green-400 text-white rounded-xl duration-300 hover:bg-green-500"
                                                                                           onClick={() => handleApprove(currentResponse.data.offer.id)}
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

export default BuyOfferPage;
