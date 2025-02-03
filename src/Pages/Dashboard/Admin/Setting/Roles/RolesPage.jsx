import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGet } from '../../../../../Hooks/useGet';
import { useChangeState } from '../../../../../Hooks/useChangeState';
import { useDelete } from '../../../../../Hooks/useDelete';
import { StaticLoader, Switch } from '../../../../../Components/Components';
import { DeleteIcon, EditIcon } from '../../../../../Assets/Icons/AllIcons';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Warning from '../../../../../Assets/Icons/AnotherIcons/WarningIcon';

const RolesPage = ({ loadingRoles, roles }) => {
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { changeState, loadingChange, responseChange } = useChangeState();
       const { deleteData, loadingDelete, responseDelete } = useDelete();

       const [rolesData, setRolesData] = useState([]);

       const [openPermissionsView, setOpenPermissionsView] = useState(null);
       const [openDelete, setOpenDelete] = useState(null);

       useEffect(() => { setRolesData(roles) }, [roles])

       const [currentPage, setCurrentPage] = useState(1); // Track the current page
       const rolesPerPage = 20; // Limit to 20 roles per page

       // Calculate total number of pages
       const totalPages = Math.ceil(rolesData.length / rolesPerPage);

       // Get the roles for the current page
       const currentRoles = rolesData.slice(
              (currentPage - 1) * rolesPerPage,
              currentPage * rolesPerPage
       );

       // handle page change
       const handlePageChange = (pageNumber) => {
              setCurrentPage(pageNumber);
       };

       // Change paymentMethod status 
       const handleChangeStaus = async (id, name, status) => {
              const response = await changeState(
                     `${apiUrl}/admin/admin_roles/status/${id}`,
                     `${name} Changed Status.`,
                     { status } // Pass status as an object if changeState expects an object
              );

              if (response) {
                     setRolesData((prevRoles) =>
                            prevRoles.map((role) =>
                                   role.id === id ? { ...role, status: status } : role
                            )
                     );
              }

       };

       const handleOpenPermissionsView = (item) => {
              setOpenPermissionsView(item);
       };
       const handleClosePermissionsView = () => {
              setOpenPermissionsView(null);
       };

       const handleOpenDelete = (item) => {
              setOpenDelete(item);
       };
       const handleCloseDelete = () => {
              setOpenDelete(null);
       };

       // Delete payment Method
       const handleDelete = async (id, name) => {
              const success = await deleteData(`${apiUrl}/admin/admin_roles/delete/${id}`, `${name} Deleted Success.`);

              if (success) {
                     setRolesData(
                            roles.filter((role) =>
                                   role.id !== id
                            )
                     );
              }
              console.log('roles', roles)
       };

       const headers = ['#', 'Name', 'permissions', 'Status', 'Action'];

       return (
              <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
                     {loadingRoles || loadingChange || loadingDelete ? (
                            <div className='w-full mt-40'>
                                   <StaticLoader />
                            </div>
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
                                                 {rolesData.length === 0 ? (
                                                        <tr>
                                                               <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find Roles</td>
                                                        </tr>
                                                 ) : (


                                                        currentRoles.map((role, index) => ( // Example with two rows
                                                               <tr className="w-full border-b-2" key={index}>
                                                                      <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {(currentPage - 1) * rolesPerPage + index + 1}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {role.name}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             <span className='text-mainColor text-xl border-b-2 border-mainColor font-TextFontSemiBold cursor-pointer'
                                                                                    onClick={() => handleOpenPermissionsView(role.id)}>
                                                                                    View
                                                                             </span>

                                                                             {openPermissionsView === role.id && (
                                                                                    <Dialog open={true} onClose={handleClosePermissionsView} className="relative z-10">
                                                                                           <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                           <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                         <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                                                                                                {/* Permissions List */}
                                                                                                                <div className="w-full flex flex-wrap items-center justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                                                                                                       {role.roles.length === 0 ? (
                                                                                                                              <div className="w-full text-center text-lg font-TextFontSemiBold text-gray-500 my-4">
                                                                                                                                     No Permissions for this Role.
                                                                                                                              </div>
                                                                                                                       ) : (
                                                                                                                              role.roles.map((permission, index) => {
                                                                                                                                     const displayIndex = index + 1;
                                                                                                                                     return (
                                                                                                                                            <div
                                                                                                                                                   key={index}
                                                                                                                                                   className="sm:w-full lg:w-5/12 xl:w-3/12 flex items-center justify-center shadow-md hover:shadow-none duration-300 py-3 px-4 rounded-xl bg-gray-50"
                                                                                                                                            >
                                                                                                                                                   <span className="text-mainColor text-lg lg:text-xl font-TextFontSemiBold capitalize">
                                                                                                                                                          {displayIndex}. {permission.role}
                                                                                                                                                   </span>
                                                                                                                                            </div>
                                                                                                                                     );
                                                                                                                              })
                                                                                                                       )}

                                                                                                                </div>

                                                                                                                {/* Dialog Footer */}
                                                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                       <button
                                                                                                                              type="button"
                                                                                                                              onClick={handleClosePermissionsView}
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
                                                                                    checked={role?.status === 1 || 0}
                                                                                    handleClick={() => {
                                                                                           handleChangeStaus(role.id, role.name, role.status === 1 ? 0 : 1);
                                                                                    }}
                                                                             />
                                                                      </td>
                                                                      <td className="px-4 py-3 text-center">
                                                                             <div className="flex items-center justify-center gap-2">
                                                                                    <Link to={`edit/${role.id}`}  ><EditIcon /></Link>
                                                                                    <button
                                                                                           type="button"
                                                                                           onClick={() => handleOpenDelete(role.id)}
                                                                                    >
                                                                                           <DeleteIcon />
                                                                                    </button>
                                                                                    {openDelete === role.id && (
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
                                                                                                                                            You will delete role {role?.name || "-"}
                                                                                                                                     </div>
                                                                                                                              </div>
                                                                                                                       </div>
                                                                                                                       <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                              <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-TextFontSemiBold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(role.id, role.name)}>
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

                                   {roles.length > 0 && (
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
};

export default RolesPage;
