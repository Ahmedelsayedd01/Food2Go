import React, { useEffect, useRef, useState } from 'react';
import { useChangeState } from '../../../../../Hooks/useChangeState';
import { useDelete } from '../../../../../Hooks/useDelete';
import { StaticLoader, Switch } from '../../../../../Components/Components';
import { Link } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '../../../../../Assets/Icons/AllIcons';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Warning from '../../../../../Assets/Icons/AnotherIcons/WarningIcon';
import { useGet } from '../../../../../Hooks/useGet';

const CustomersPage = ({ refetch, setUpdate }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { refetch: refetchCustomer, loading: loadingCustomer, data: dataCustomer } = useGet({
    url: `${apiUrl}/admin/customer`
  });
  const { changeState, loadingChange, responseChange } = useChangeState();
  const { deleteData, loadingDelete, responseDelete } = useDelete();
  const [openDelete, setOpenDelete] = useState(null);
  const [customers, setCustomers] = useState([])

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const customersPerPage = 20; // Limit to 20 customers per page

  // Calculate total number of pages
  const totalPages = Math.ceil(customers.length / customersPerPage);

  // Get the customers for the current page
  const currentCustomers = customers.slice(
    (currentPage - 1) * customersPerPage,
    currentPage * customersPerPage
  );

  // handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    refetchCustomer();
  }, [refetchCustomer, refetch]);

  useEffect(() => {
    if (dataCustomer && dataCustomer.customers) {
      console.log("Customer Data:", dataCustomer);
      setCustomers(dataCustomer.customers);
    }
  }, [dataCustomer]); // Only run this effect when `data` changes

  // Change Customer status 
  const handleChangeStaus = async (id, name, status) => {
    const response = await changeState(
      `${apiUrl}/admin/customer/status/${id}`,
      `${name} Changed Status.`,
      { status } // Pass status as an object if changeState expects an object
    );

    if (response) {
      // Update Customer only if changeState succeeded
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.id === id ? { ...customer, status: status } : customer
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

  // Delete Customer
  const handleDelete = async (id, name) => {
    const success = await deleteData(`${apiUrl}/admin/customer/delete/${id}`, `${name} Deleted Success.`);

    if (success) {
      // Update Deliveries only if changeState succeeded
      setCustomers(
        customers.filter((customer) =>
          customer.id !== id
        )
      );
    }
    console.log('data customers', data)
  };

  const headers = ['SL', 'Image', "Code", "Name", 'Email', 'Phone', "Total Order", "Total Order Amount", 'Status', 'Action'];

  return (
    <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingCustomer || loadingChange || loadingDelete ? (
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
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find Customers</td>
                </tr>
              ) : (
                currentCustomers.map((customer, index) => (
                  <tr className="w-full border-b-2" key={index}>
                    <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {(currentPage - 1) * customersPerPage + index + 1}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 overflow-hidden">
                      <div className="flex justify-center">
                        <img src={customer.image_link}
                          className="bg-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                          alt="Photo"
                        />
                      </div>
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {customer?.code || '-'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {customer?.f_name + ' ' + customer?.l_name || '-'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {customer?.email || '-'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      {customer?.phone || '-'}
                    </td>
                    <td className="px-4 py-2 text-center text-sm lg:text-base">
                      <span className="text-blue-500 bg-cyan-200 rounded-md px-2 py-1">
                        {customer?.orders_count || '-'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center text-sm lg:text-base">
                      <span className="text-blue-500 bg-cyan-200 rounded-md px-2 py-1">
                        {customer?.orders_sum_amount || '-'}
                      </span>
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                      <Switch
                        checked={customer.status}
                        handleClick={() => {
                          handleChangeStaus(customer.id, customer?.f_name + ' ' + customer?.l_name, customer.status === 1 ? 0 : 1);
                        }}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link to={`edit/${customer.id}`}  ><EditIcon /></Link>
                        <button
                          type="button"
                          onClick={() => handleOpenDelete(customer.id)}
                        >
                          <DeleteIcon />
                        </button>
                        {openDelete === customer.id && (
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
                                        You will delete customer {customer?.f_name + ' ' + customer?.l_name || "-"}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-TextFontSemiBold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(customer.id, customer?.f_name + ' ' + customer?.l_name)}>
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

          {customers.length > 0 && (
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

export default CustomersPage