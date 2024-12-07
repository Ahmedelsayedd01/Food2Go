import React, { useEffect, useRef, useState } from 'react';
import { DeleteIcon, EditIcon } from '../../../../Assets/Icons/AllIcons';
import { Link } from 'react-router-dom';
import { StaticLoader, } from '../../../../Components/Components';
import { useGet } from '../../../../Hooks/useGet';
import { useChangeState } from '../../../../Hooks/useChangeState';
import { useDelete } from '../../../../Hooks/useDelete';
import Warning from '../../../../Assets/Icons/AnotherIcons/WarningIcon';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

const BannersPage = ({ refetch, setUpdate }) => {
       const { refetch: refetchBanners, loading: loadingBanners, data: dataBanners } = useGet({ url: 'https://bcknd.food2go.online/admin/banner' });
       const { changeState, loadingChange, responseChange } = useChangeState();
       const { deleteData, loadingDelete, responseDelete } = useDelete();

       const [banners, setBanners] = useState([]);
       const [openDelete, setOpenDelete] = useState(null);
       // Fetch categories when the component mounts or when refetch is called
       useEffect(() => {
              refetchBanners();
       }, [refetchBanners, refetch]); // Empty dependency array to only call refetch once on mount


       // View supp category

       const handleOpenDelete = (item) => {
              setOpenDelete(item);
       };
       const handleCloseDelete = () => {
              setOpenDelete(null);
       };

       // Delete Category
       const handleDelete = async (id, name) => {
              const success = await deleteData(`https://Bcknd.food2go.online/admin/banner/delete/${id}`, `${name} Deleted Success.`);

              if (success) {
                     // Update categories only if changeState succeeded
                     setBanners(
                            banners.filter((category) =>
                                   category.id !== id
                            )
                     );
                     setUpdate(!refetch)
              }
              console.log('banners', banners)
       };

       // Update categories when `data` changes
       useEffect(() => {
              if (dataBanners && dataBanners.banners) {
                     setBanners(dataBanners.banners);
              }
       }, [dataBanners]); // Only run this effect when `data` changes


       const headers = ['SL', 'Image', 'Category', 'Product', 'Deal', 'Action'];

       return (
              <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
                     {loadingBanners || loadingChange || loadingDelete ? (
                            <div className="w-full h-56 flex justify-center items-center">
                                   <StaticLoader />
                            </div>
                     ) : (
                            <table className="w-full sm:min-w-0">
                                   <thead className="w-full">
                                          <tr className="w-full border-b-2">
                                                 {headers.map((name, index) => (
                                                        <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3" key={index}>
                                                               {name}
                                                        </th>
                                                 ))}
                                          </tr>
                                   </thead>
                                   <tbody className="w-full">
                                          {banners.length === 0 ? (
                                                 <tr>
                                                        <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find Banners</td>
                                                 </tr>
                                          ) : (


                                                 banners.map((banner, index) => ( // Example with two rows
                                                        <tr className="w-full border-b-2" key={index}>
                                                               <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {index + 1}
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 overflow-hidden">
                                                                      <div className="flex justify-center">
                                                                             <img src={banner?.image_link || '-'}
                                                                                    className="bg-mainColor border-2 border-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                                                                                    loading="lazy"
                                                                                    alt="Photo"
                                                                             />
                                                                      </div>
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {banner?.category_banner?.name || '-'}
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {banner?.product?.name || '-'}
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {banner?.deal?.title || '-'}
                                                               </td>
                                                               <td className="px-4 py-3 text-center">
                                                                      <div className="flex items-center justify-center gap-2">
                                                                             <Link to={`edit/${banner.id}`} className="text-blue-500 hover:underline"><EditIcon /></Link>
                                                                             <button
                                                                                    type="button"
                                                                                    onClick={() => handleOpenDelete(banner.id)}
                                                                             >
                                                                                    <DeleteIcon />
                                                                             </button>
                                                                             {openDelete === banner.id && (
                                                                                    <Dialog
                                                                                           open={true}
                                                                                           onClose={handleCloseDelete}
                                                                                           className="relative z-10"
                                                                                    >
                                                                                           <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                           <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                         <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                                                                                <div className="flex  flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                                                                                       <Warning
                                                                                                                              width="28"
                                                                                                                              height="28"
                                                                                                                              aria-hidden="true"
                                                                                                                       />
                                                                                                                       <div className="flex items-center">
                                                                                                                              <div className="mt-2 text-center">
                                                                                                                                     You will delete this banner
                                                                                                                              </div>
                                                                                                                       </div>
                                                                                                                </div>
                                                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                       <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(banner.id, "Banner")}>
                                                                                                                              Delete
                                                                                                                       </button>

                                                                                                                       <button
                                                                                                                              type="button"
                                                                                                                              data-autofocus
                                                                                                                              onClick={handleCloseDelete}
                                                                                                                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                                                                                                       >
                                                                                                                              Cancel
                                                                                                                       </button>
                                                                                                                </div>
                                                                                                         </DialogPanel>
                                                                                                  </div>
                                                                                           </div>
                                                                                    </Dialog>
                                                                             )}
                                                                      </div>
                                                               </td>
                                                        </tr>
                                                 ))

                                          )}
                                   </tbody>
                            </table>
                     )}
              </div>
       );
};

export default BannersPage;
