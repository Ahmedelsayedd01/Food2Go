import React, { useState } from 'react'
import { useDelete } from '../../../../Hooks/useDelete';
import { useChangeState } from '../../../../Hooks/useChangeState';
import { StaticLoader, Switch } from '../../../../Components/Components';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Warning from '../../../../Assets/Icons/AnotherIcons/WarningIcon';
import { Link } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '../../../../Assets/Icons/AllIcons';

const DealsPage = ({ data, setDeals, loading }) => {
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { changeState, loadingChange, responseChange } = useChangeState();
       const { deleteData, loadingDelete, responseDelete } = useDelete();

       const [openDescription, setOpenDescription] = useState(null);
       const [openTimes, setOpenTimes] = useState(null);
       const [openDelete, setOpenDelete] = useState(null);

       const [currentPage, setCurrentPage] = useState(1); // Track the current page
       const datasPerPage = 20; // Limit to 20 datas per page

       // Calculate total number of pages
       const totalPages = Math.ceil(data.length / datasPerPage);

       // Get the datas for the current page
       const currentDatas = data.slice(
              (currentPage - 1) * datasPerPage,
              currentPage * datasPerPage
       );

       // handle page change
       const handlePageChange = (pageNumber) => {
              setCurrentPage(pageNumber);
       };

       const handleOpenDescription = (item) => {
              setOpenDescription(item);
       };
       const handleCloseDescription = () => {
              setOpenDescription(null);
       };

       const handleOpenTimes = (item) => {
              setOpenTimes(item);
       };
       const handleCloseTimes = () => {
              setOpenTimes(null);
       };

       const handleOpenDelete = (item) => {
              setOpenDelete(item);
       };
       const handleCloseDelete = () => {
              setOpenDelete(null);
       };


       // Change Deal status 
       const handleChangeStaus = async (id, name, status) => {
              const response = await changeState(
                     `${apiUrl}/admin/deal/status/${id}`,
                     `${name} Changed Status.`,
                     { status } // Pass status as an object if changeState expects an object
              );

              if (response) {
                     // Update categories only if changeState succeeded
                     setDeals((prevDeals) =>
                            prevDeals.map((deal) =>
                                   deal.id === id ? { ...deal, status: status } : deal
                            )
                     );
              }

       };

       // Delete Deal
       const handleDelete = async (id, name) => {
              const success = await deleteData(`${apiUrl}/admin/deal/delete/${id}`, `${name} Deleted Success.`);

              if (success) {
                     // Update Deliveries only if changeState succeeded
                     setDeals(
                            data.filter((deal) =>
                                   deal.id !== id
                            )
                     );
              }
              console.log('data Deals', data)
       };



       const headers = ['SL', 'Image', "Title", 'Description', 'Price', 'Start Date', 'End Date', 'Daily', 'Times', 'Status', 'Action'];

       return (
              <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
                     {loading || loadingChange || loadingDelete ? (
                            <div className="w-full h-56 flex justify-center items-center">
                                   <StaticLoader />
                            </div>
                     ) : (
                            <div className='w-full flex flex-col'>
                                   <table className="w-full sm:min-w-0 block overflow-x-scroll scrollPage">
                                          <thead className="w-full">
                                                 <tr className="w-full border-b-2">
                                                        {headers.map((name, index) => (
                                                               <th className="min-w-[110px] sm:w-[3%] lg:w-[3%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3" key={index}>
                                                                      {name}
                                                               </th>
                                                        ))}
                                                 </tr>
                                          </thead>
                                          <tbody className="w-full">
                                                 {data.length === 0 ? (
                                                        <tr>
                                                               <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find data</td>
                                                        </tr>
                                                 ) : (
                                                        currentDatas.map((deal, index) => ( // Example with two rows
                                                               <tr className="w-full border-b-2" key={index}>
                                                                      <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {(currentPage - 1) * datasPerPage + index + 1}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 overflow-hidden">
                                                                             <div className="flex justify-center">
                                                                                    <img src={deal.image_link}
                                                                                           className="bg-mainColor border-2 border-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                                                                                           alt="Photo"
                                                                                    />
                                                                             </div>
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {deal?.title || '-'}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             <span className='text-mainColor text-xl border-b-2 border-mainColor font-TextFontSemiBold cursor-pointer'
                                                                                    onClick={() => handleOpenDescription(deal.id)}>
                                                                                    View
                                                                             </span>

                                                                             {openDescription === deal.id && (
                                                                                    <Dialog open={true} onClose={handleCloseDescription} className="relative z-10">
                                                                                           <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                           <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                         <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                                                                                                <div className="w-full flex flex-wrap items-center justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                                                                                                       {!deal.description ? (
                                                                                                                              <div className="w-full text-center text-lg font-TextFontSemiBold text-gray-500 my-4">
                                                                                                                                     No description available for this deal.
                                                                                                                              </div>
                                                                                                                       ) : (
                                                                                                                              <div
                                                                                                                                     className="flex items-center justify-center shadow-md hover:shadow-none duration-300 py-3 px-3 rounded-xl bg-gray-50"
                                                                                                                              >
                                                                                                                                     <span className="text-mainColor text-lg lg:text-xl font-TextFontSemiBold capitalize">
                                                                                                                                            {deal.description}
                                                                                                                                     </span>
                                                                                                                              </div>
                                                                                                                       )}

                                                                                                                </div>

                                                                                                                {/* Dialog Footer */}
                                                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                       <button
                                                                                                                              type="button"
                                                                                                                              onClick={handleCloseDescription}
                                                                                                                              className="mt-3 inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-TextFontMedium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark focus:outline-none"
                                                                                                                       >
                                                                                                                              Close
                                                                                                                       </button>
                                                                                                                </div>

                                                                                                         </DialogPanel>
                                                                                                  </div>
                                                                                           </div>
                                                                                    </Dialog>
                                                                             )}

                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {deal?.price || '-'}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {deal?.start_date || '-'}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {deal?.end_date || '-'}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {deal.daily === 1 ? (
                                                                                    <span className='bg-green-500 px-3 py-1 rounded-xl text-white'>Active</span>
                                                                             ) : (
                                                                                    <span className='bg-red-500 px-3 py-1 rounded-xl text-white'>Unactive</span>
                                                                             )}
                                                                      </td>

                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             <span className='text-mainColor text-xl border-b-2 border-mainColor font-TextFontSemiBold cursor-pointer'
                                                                                    onClick={() => handleOpenTimes(deal.id)}>
                                                                                    View
                                                                             </span>

                                                                             {openTimes === deal.id && (
                                                                                    <Dialog open={true} onClose={handleCloseTimes} className="relative z-10">
                                                                                           <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                           <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                         <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                                                                                                {/* Permissions List */}
                                                                                                                <div className="w-full flex flex-wrap items-center justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                                                                                                       {deal.times.length === 0 ? (
                                                                                                                              <div className="w-full text-center text-lg font-TextFontSemiBold text-gray-500 my-4">
                                                                                                                                     No times available for this deal.
                                                                                                                              </div>
                                                                                                                       ) : (
                                                                                                                              deal.times.map((time, index) => {
                                                                                                                                     const displayIndex = index + 1;
                                                                                                                                     return (
                                                                                                                                            <div
                                                                                                                                                   key={index}
                                                                                                                                                   className=" flex items-center justify-between shadow-md hover:shadow-none duration-300 py-3 px-3 rounded-xl bg-gray-50 gap-x-2"
                                                                                                                                            >
                                                                                                                                                   <div className="text-mainColor text-lg lg:text-xl font-TextFontSemiBold capitalize flex items-center justify-between gap-2">
                                                                                                                                                          <span>{index}. {time.day} </span>
                                                                                                                                                          <span> {time.from} </span>
                                                                                                                                                          <span> {time.to} </span>
                                                                                                                                                   </div>
                                                                                                                                            </div>
                                                                                                                                     );
                                                                                                                              })
                                                                                                                       )}

                                                                                                                </div>

                                                                                                                {/* Dialog Footer */}
                                                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                       <button
                                                                                                                              type="button"
                                                                                                                              onClick={handleCloseTimes}
                                                                                                                              className="mt-3 inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-TextFontMedium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark focus:outline-none"
                                                                                                                       >
                                                                                                                              Close
                                                                                                                       </button>
                                                                                                                </div>

                                                                                                         </DialogPanel>
                                                                                                  </div>
                                                                                           </div>
                                                                                    </Dialog>
                                                                             )}

                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             <Switch
                                                                                    checked={deal.status === 1}
                                                                                    handleClick={() => {
                                                                                           handleChangeStaus(deal.id, deal.title, deal.status === 1 ? 0 : 1);
                                                                                    }}
                                                                             />
                                                                      </td>
                                                                      <td className="px-4 py-3 text-center">
                                                                             <div className="flex items-center justify-center gap-2">
                                                                                    <Link to={`edit/${deal.id}`}  ><EditIcon /></Link>
                                                                                    <button
                                                                                           type="button"
                                                                                           onClick={() => handleOpenDelete(deal.id)}
                                                                                    >
                                                                                           <DeleteIcon />
                                                                                    </button>
                                                                                    {openDelete === deal.id && (
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
                                                                                                                                            You will delete deal {deal?.title || "-"}
                                                                                                                                     </div>
                                                                                                                              </div>
                                                                                                                       </div>
                                                                                                                       <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                              <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-TextFontSemiBold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(deal.id, deal.title)}>
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

                                   {data.length > 0 && (
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
              </div>
       );
}

export default DealsPage