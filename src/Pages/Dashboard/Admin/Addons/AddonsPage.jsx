import React, { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon } from '../../../../Assets/Icons/AllIcons';
import { Link } from 'react-router-dom';
import { useGet } from '../../../../Hooks/useGet';
import { useDelete } from '../../../../Hooks/useDelete';
import { StaticLoader } from '../../../../Components/Components';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Warning from '../../../../Assets/Icons/AnotherIcons/WarningIcon';

const AddonsPage = ({ refetch }) => {
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchAddons, loading: loadingAddons, data: dataAddons } = useGet({
              url: `${apiUrl}/admin/addons`
       });
       const { deleteData, loadingDelete, responseDelete } = useDelete();
       const [addons, setAddons] = useState([]);

       const [openDelete, setOpenDelete] = useState(null);

       const [currentPage, setCurrentPage] = useState(1); // Track the current page
       const addonsPerPage = 20; // Limit to 20 addons per page

       // Calculate total number of pages
       const totalPages = Math.ceil(addons.length / addonsPerPage);

       // Get the addons for the current page
       const currentAddons = addons.slice(
              (currentPage - 1) * addonsPerPage,
              currentPage * addonsPerPage
       );

       // handle page change
       const handlePageChange = (pageNumber) => {
              setCurrentPage(pageNumber);
       };


       // Fetch Addons when the component mounts or when refetch is called
       useEffect(() => {
              refetchAddons();
       }, [refetchAddons, refetch]); // Empty dependency array to only call refetch once on mount

       const handleOpenDelete = (item) => {
              setOpenDelete(item);
       };
       const handleCloseDelete = () => {
              setOpenDelete(null);
       };
       // Delete addon
       const handleDelete = async (id, name) => {
              const success = await deleteData(`${apiUrl}/admin/addons/delete/${id}`, `${name} Deleted Success.`);

              if (success) {
                     // Update addons only if changeState succeeded
                     setAddons(
                            addons.filter((addon) =>
                                   addon.id !== id
                            )
                     );
              }
       };

       // Update addons when `data` changes
       useEffect(() => {
              if (dataAddons && dataAddons.addons) {
                     setAddons(dataAddons.addons);
              }
              console.log('addons', addons)
       }, [dataAddons]); // Only run this effect when `data` changes


       const headers = ['SL', 'Name', "Price", 'Tax (%)', 'Action'];

       return (
              <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
                     {loadingAddons || loadingDelete ? (
                            <>
                                   <div className="mt-32 mx-auto">
                                          <StaticLoader />
                                   </div>
                            </>
                     ) : (
                            <div className='w-full flex flex-col'>
                                   <table className="w-full sm:min-w-0 block overflow-x-scroll scrollPage">
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
                                                 {addons.length === 0 ? (
                                                        <tr>
                                                               <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find addons</td>
                                                        </tr>
                                                 ) : (


                                                        currentAddons.map((addon, index) => ( // Example with two rows
                                                               <tr className="w-full border-b-2" key={index}>
                                                                      <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {(currentPage - 1) * addonsPerPage + index + 1}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {addon?.name || '-'}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {addon?.price || '0'}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {addon.tax?.amount || '0'}
                                                                             {addon.tax?.type === "precentage" && (
                                                                                    ' %'
                                                                             )}
                                                                      </td>
                                                                      <td className="px-4 py-3 text-center">
                                                                             <div className="flex items-center justify-center gap-2">
                                                                                    <Link to={`edit/${addon.id}`}  ><EditIcon /></Link>
                                                                                    {/* <button className="text-red-500" onClick={() => handleDelete(addon.id, addon.name)}><DeleteIcon /></button> */}

                                                                                    <button
                                                                                           type="button"
                                                                                           onClick={() => handleOpenDelete(addon.id)}
                                                                                    >
                                                                                           <DeleteIcon />
                                                                                    </button>
                                                                                    {openDelete === addon.id && (
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
                                                                                                                                            You will delete addon {addon?.name || "-"}
                                                                                                                                     </div>
                                                                                                                              </div>
                                                                                                                       </div>
                                                                                                                       <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                              <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-TextFontSemiBold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(addon.id, addon.name)}>
                                                                                                                                     Delete
                                                                                                                              </button>

                                                                                                                              <button
                                                                                                                                     type="button"
                                                                                                                                     data-autofocus
                                                                                                                                     onClick={handleCloseDelete}
                                                                                                                                     className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-TextFontMedium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
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
                                   {addons.length > 0 && (
                                          <div className="my-6 flex flex-wrap items-center justify-center gap-x-4">
                                                 {currentPage !== 1 && (
                                                        <button type='button' className='text-lg px-4 py-2 rounded-xl bg-mainColor text-white font-TextFontMedium' onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
                                                 )}
                                                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                        <button
                                                               key={page}
                                                               onClick={() => handlePageChange(page)}
                                                               className={`px-4 py-2 mx-1 text-lg font-TextFontSemiBold rounded-full duration-300 ${currentPage === page ? 'bg-mainColor text-white' : ' text-mainColor'}`}
                                                        >
                                                               {page}
                                                        </button>
                                                 ))}
                                                 {totalPages !== currentPage && (
                                                        <button type='button' className='text-lg px-4 py-2 rounded-xl bg-mainColor text-white font-TextFontMedium' onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                                                 )}
                                          </div>
                                   )}
                            </div>
                     )}
              </div >
       );
};

export default AddonsPage;
