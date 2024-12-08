import React, { useEffect, useRef, useState } from 'react';
import { useGet } from '../../../../Hooks/useGet';
import { useDelete } from '../../../../Hooks/useDelete';
import { StaticLoader } from '../../../../Components/Components';
import { Link } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '../../../../Assets/Icons/AllIcons';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Warning from '../../../../Assets/Icons/AnotherIcons/WarningIcon';

const TaxesPage = ({ refetch, setUpdate }) => {
       const { refetch: refetchTaxes, loading: loadingTaxes, data: dataTaxes } = useGet({ url: 'https://bcknd.food2go.online/admin/settings/tax' });
       // const { changeState, loadingChange, responseChange } = useChangeState();
       const { deleteData, loadingDelete, responseDelete } = useDelete();

       const [taxes, setTaxes] = useState([]);
       const [openDelete, setOpenDelete] = useState(null);

       // Fetch taxes when the component mounts or when refetch is called
       useEffect(() => {
              refetchTaxes();
       }, [refetchTaxes, refetch]); // Empty dependency array to only call refetch once on mount


       const handleOpenDelete = (item) => {
              setOpenDelete(item);
       };
       const handleCloseDelete = () => {
              setOpenDelete(null);
       };

       // const handleChangeActive = async (id, name, status) => {
       //        const response = await changeState(
       //               `https://Bcknd.food2go.online/admin/translation/active/${id}`,
       //               `${name} Changed Active.`,
       //               { active: status } // Pass status as an object if changeState expects an object
       //        );

       //        if (response) {
       //               // Update categories only if changeState succeeded
       //               setLanguages((prevLanguages) =>
       //                      prevLanguages.map((language) =>
       //                             language.id === id ? { ...language, status: status } : language
       //                      )
       //               );
       //               setUpdate(!refetch)
       //        }

       //        // Log the updated Languages after the state update

       //        // setLanguages((prevLanguages) => {
       //        //   const updatedLanguages = prevLanguages.map((language) =>
       //        //     language.id === id ? { ...language, status: status } : language
       //        //   );
       //        //   console.log('Updated Languages:', updatedLanguages);
       //        //   return updatedLanguages;
       //        // });
       // };

       // Delete Language
       const handleDelete = async (id, name) => {
              const success = await deleteData(`https://Bcknd.food2go.online/admin/settings/tax/delete/${id}`, `${name} Deleted Success.`);

              if (success) {
                     // Update taxes only if changeState succeeded
                     setTaxes(
                            taxes.filter((tax) =>
                                   tax.id !== id
                            )
                     );
                     setUpdate(!refetch)
              }
              console.log('taxes', taxes)
       };

       // Update taxes when `data` changes
       useEffect(() => {
              if (dataTaxes && dataTaxes.taxes) {
                     setTaxes(dataTaxes.taxes);
              }
       }, [dataTaxes]); // Only run this effect when `data` changes


       const headers = ['SL', 'Name', 'Type', 'Amount', 'Action'];

       return (
              <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
                     {loadingTaxes || loadingDelete ? (
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
                                          {taxes.length === 0 ? (
                                                 <tr>
                                                        <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find taxes</td>
                                                 </tr>
                                          ) : (


                                                 taxes.map((tax, index) => ( // Example with two rows
                                                        <tr className="w-full border-b-2" key={index}>
                                                               <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {index + 1}
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {tax?.name || '-'}
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {tax?.type || '-'}
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {tax?.amount || '-'}
                                                               </td>
                                                               <td className="px-4 py-3 text-center">
                                                                      <div className="flex items-center justify-center gap-2">
                                                                             <Link to={`edit/${tax.id}`}  ><EditIcon /></Link>
                                                                             <button
                                                                                    type="button"
                                                                                    onClick={() => handleOpenDelete(tax.id)}
                                                                             >
                                                                                    <DeleteIcon />
                                                                             </button>
                                                                             {openDelete === tax.id && (
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
                                                                                                                                     You will delete {tax.name}
                                                                                                                              </div>
                                                                                                                       </div>
                                                                                                                </div>
                                                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                       <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(tax.id, tax.name)}>
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

export default TaxesPage;
