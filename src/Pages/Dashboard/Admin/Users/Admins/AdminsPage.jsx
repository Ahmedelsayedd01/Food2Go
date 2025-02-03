import React, { useEffect, useState } from 'react';
import { useChangeState } from '../../../../../Hooks/useChangeState';
import { useDelete } from '../../../../../Hooks/useDelete';
import { StaticLoader, Switch } from '../../../../../Components/Components';
import { Link } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '../../../../../Assets/Icons/AllIcons';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Warning from '../../../../../Assets/Icons/AnotherIcons/WarningIcon';

const AdminsPage = ({ loadingAdmins, adminsData }) => {

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { changeState, loadingChange, responseChange } = useChangeState();
  const { deleteData, loadingDelete, responseDelete } = useDelete();
  const [openDelete, setOpenDelete] = useState(null);
  const [admins, setAdmins] = useState([])

  useEffect(() => { setAdmins(adminsData) }, [adminsData])

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const adminsPerPage = 20; // Limit to 20 admins per page

  // Calculate total number of pages
  const totalPages = Math.ceil(admins.length / adminsPerPage);

  // Get the admins for the current page
  const currentAdmins = admins.slice(
    (currentPage - 1) * adminsPerPage,
    currentPage * adminsPerPage
  );

  // handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  // Change Admins status 
  const handleChangeStaus = async (id, name, status) => {
    const response = await changeState(
      `${apiUrl}/admin/admin/status/${id}`,
      `${name} Changed Status.`,
      { status } // Pass status as an object if changeState expects an object
    );

    if (response) {
      // Update Admins only if changeState succeeded
      setAdmins((prevAdmins) =>
        prevAdmins.map((admins) =>
          admins.id === id ? { ...admins, status: status } : admins
        )
      );
    }
  };

  const handleOpenDelete = (item) => {
    setOpenDelete(item);
  };
  const handleCloseDelete = () => {
    setOpenDelete(null);
  };

  // Delete Admin
  const handleDelete = async (id, name) => {
    const success = await deleteData(`${apiUrl}/admin/admin/delete/${id}`, `${name} Deleted Success.`);

    if (success) {
      // Update Deliveries only if changeState succeeded
      setAdmins(
        admins.filter((admin) =>
          admin.id !== id
        )
      );
    }
    console.log('data admins', data)
  };

  const headers = ['SL', 'Image', "Name", 'Role', 'Email', 'Phone', "Identity Image", "Identity Type", "Identity Number", 'Status', 'Action'];

  return (
    <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingAdmins || loadingChange || loadingDelete ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <div className='w-full flex flex-col'>
          <table className="w-full sm:min-w-0 block overflow-x-scroll scrollPage">
            <thead className="w-full">
              <tr className="w-full border-b-2">
                {headers.map((name, index) => (
                  <th className="min-w-[100px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3" key={index}>
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="w-full">
              {admins.length === 0 ? (
                <tr>
                  <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find Admins</td>
                </tr>
              ) : (
                currentAdmins.map((admin, index) => (
                  <tr className="w-full border-b-2" key={index}>
                    <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {(currentPage - 1) * adminsPerPage + index + 1}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 overflow-hidden">
                      <div className="flex justify-center">
                        <img src={admin.image_link}
                          className="bg-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                          alt="Photo"
                        />
                      </div>
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {admin?.name || '-'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-3/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {admin?.user_positions?.name || '-'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-3/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {admin?.email || '-'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {admin?.phone || '-'}
                    </td>
                    <td className="px-4 py-2 text-center text-sm lg:text-base">
                      <div className="flex justify-center">
                        <img src={admin.identity_image}
                          className="bg-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                          alt="Photo"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center text-sm lg:text-base">
                      <span
                        className={`${admin?.identity_type === 'Passport'
                          ? 'text-green-500 bg-green-100'
                          : 'text-blue-500 bg-blue-100'
                          } rounded-md px-2 py-1`}
                      >
                        {admin?.identity_type || '-'}
                      </span>
                    </td>

                    <td className="px-4 py-2 text-center text-sm lg:text-base">
                      <span
                        className={`${admin?.identity_number
                          ? 'text-red-500 bg-red-100'
                          : 'text-gray-500 bg-gray-100'
                          } rounded-md px-2 py-1`}
                      >
                        {admin?.identity_number || '-'}
                      </span>
                    </td>

                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      <Switch
                        checked={admin.status}
                        handleClick={() => {
                          handleChangeStaus(admin.id, admin.name, admin.status === 1 ? 0 : 1);
                        }}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link to={`edit/${admin.id}`}  ><EditIcon /></Link>
                        <button
                          type="button"
                          onClick={() => handleOpenDelete(admin.id)}
                        >
                          <DeleteIcon />
                        </button>
                        {openDelete === admin.id && (
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
                                        You will delete {admin?.name || "-"}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-TextFontSemiBold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(admin.id, admin?.f_name + ' ' + admin?.l_name)}>
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

          {admins.length > 0 && (
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

export default AdminsPage