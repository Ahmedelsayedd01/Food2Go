import React, { useEffect, useRef, useState } from 'react';
import { DeleteIcon, EditIcon } from '../../../../Assets/Icons/AllIcons';
import { Link } from 'react-router-dom';
import { AddButton, DropDown, NumberInput, StaticLoader, Switch, TextInput } from '../../../../Components/Components';
import { useGet } from '../../../../Hooks/useGet';
import { useChangeState } from '../../../../Hooks/useChangeState';
import { useDelete } from '../../../../Hooks/useDelete';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../../../Store/CreateSlices';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Warning from '../../../../Assets/Icons/AnotherIcons/WarningIcon';

const CouponPage = ({ refetch, setUpdate }) => {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const { refetch: refetchCoupon, loading: loadingCoupon, data: dataCoupon } = useGet({
            url: `${apiUrl}/admin/coupon`
      });
      const { deleteData, loadingDelete, responseDelete } = useDelete();
      const { changeState, loadingChange, responseChange } = useChangeState();

      const [coupons, setCoupons] = useState([]);
      const [openDelete, setOpenDelete] = useState(null);
      const [openProduct, setOpenProduct] = useState(null);

      const [currentPage, setCurrentPage] = useState(1); // Track the current page
      const couponsPerPage = 20; // Limit to 20 coupons per page

      // Calculate total number of pages
      const totalPages = Math.ceil(coupons.length / couponsPerPage);

      // Get the coupons for the current page
      const currentCoupons = coupons.slice(
            (currentPage - 1) * couponsPerPage,
            currentPage * couponsPerPage
      );

      // handle page change
      const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber);
      };

      const handleOpenProduct = (item) => {
            setOpenProduct(item);
      };
      const handleCloseProduct = () => {
            setOpenProduct(null);
      };

      // Change coupon status 
      const handleChangeStaus = async (id, name, status) => {
            const response = await changeState(
                  ` ${apiUrl}/admin/coupon/status/${id}`,
                  `${name} Changed Status.`,
                  { status } // Pass status as an object if changeState expects an object
            );

            if (response) {
                  // Update categories only if changeState succeeded
                  setCoupons((prevCoupon) =>
                        prevCoupon.map((coupon) =>
                              coupon.id === id ? { ...coupon, status: status } : coupon
                        )
                  );
            }

      };

      useEffect(() => {
            refetchCoupon();
      }, [refetchCoupon, refetch]);

      const handleOpenDelete = (item) => {
            setOpenDelete(item);
      };
      const handleCloseDelete = () => {
            setOpenDelete(null);
      };

      // Delete Language
      const handleDelete = async (id, name) => {
            const success = await deleteData(`${apiUrl}/admin/coupon/delete/${id}`, `${name} Deleted Success.`);

            if (success) {
                  // Update Discounts only if changeState succeeded
                  setCoupons(
                        coupons.filter((coupon) =>
                              coupon.id !== id
                        )
                  );
                  setUpdate(!refetch)
            }
            console.log('Coupons', coupons)
      };

      // Update Discounts when `data` changes
      useEffect(() => {
            if (dataCoupon && dataCoupon.coupons) {
                  console.log("Coupon Data:", dataCoupon);
                  setCoupons(dataCoupon.coupons);
            }
      }, [dataCoupon]); // Only run this effect when `data` changes


      const headers = ['SL', 'Title', 'Code', 'Amount', 'Amount Type', 'Start Date', 'End Date', 'Product Included', 'Status', 'Action'];

      return (
            <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
                  {loadingCoupon || loadingChange || loadingDelete ? (
                        <div className="w-full h-56 flex justify-center items-center">
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
                                          {coupons.length === 0 ? (
                                                <tr>
                                                      <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find discounts</td>
                                                </tr>
                                          ) : (
                                                currentCoupons.map((coupon, index) => ( // Example with two rows
                                                      <tr className="w-full border-b-2" key={index}>
                                                            <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                  {(currentPage - 1) * couponsPerPage + index + 1}
                                                            </td>
                                                            <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                  {coupon?.title || '-'}
                                                            </td>
                                                            <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                  {coupon?.code || '-'}
                                                            </td>
                                                            <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                  {coupon?.discount || '-'}
                                                            </td>
                                                            <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                  {coupon?.discount_type || '-'}
                                                            </td>
                                                            <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                  {coupon?.start_date || '-'}
                                                            </td>
                                                            <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                  {coupon?.expire_date || '-'}
                                                            </td>
                                                            <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                  {coupon.product === "all" ? (
                                                                        <span className="text-mainColor text-xl font-TextFontSemiBold">All Products</span>
                                                                  ) : (
                                                                        <>
                                                                              <span className='text-mainColor text-xl border-b-2 border-mainColor font-TextFontSemiBold cursor-pointer'
                                                                                    onClick={() => handleOpenProduct(coupon.id)}>
                                                                                    View
                                                                              </span>

                                                                              {openProduct === coupon.id && (
                                                                                    <Dialog open={true} onClose={handleCloseProduct} className="relative z-10">
                                                                                          <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                      <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                                                                                            <div className="w-full flex flex-wrap items-center justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                                                                                                  {coupon.products.length === 0 ? (
                                                                                                                        <div className="w-full text-center text-lg font-TextFontSemiBold text-gray-500 my-4">
                                                                                                                              No Products available for this Coupon.
                                                                                                                        </div>
                                                                                                                  ) : (
                                                                                                                        coupon.products.map((product, index) => {
                                                                                                                              const displayIndex = index + 1;
                                                                                                                              return (
                                                                                                                                    <div
                                                                                                                                          key={index}
                                                                                                                                          className=" flex items-center justify-between shadow-md hover:shadow-none duration-300 py-3 px-3 rounded-xl bg-gray-50 gap-x-2"
                                                                                                                                    >
                                                                                                                                          <span className="text-mainColor text-lg lg:text-xl font-TextFontSemiBold capitalize">
                                                                                                                                                {displayIndex}. {product.name}
                                                                                                                                          </span>
                                                                                                                                    </div>
                                                                                                                              );
                                                                                                                        })
                                                                                                                  )}

                                                                                                            </div>

                                                                                                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                  <button
                                                                                                                        type="button"
                                                                                                                        onClick={handleCloseProduct}
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
                                                                        </>
                                                                  )}
                                                            </td>
                                                            <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                  <Switch
                                                                        checked={coupon.status === 1}
                                                                        handleClick={() => {
                                                                              handleChangeStaus(coupon.id, coupon.title, coupon.status === 1 ? 0 : 1);
                                                                        }}
                                                                  />
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                  <div className="flex items-center justify-center gap-2">
                                                                        <Link to={`edit/${coupon.id}`}  ><EditIcon /></Link>
                                                                        <button
                                                                              type="button"
                                                                              onClick={() => handleOpenDelete(coupon.id)}
                                                                        >
                                                                              <DeleteIcon />
                                                                        </button>
                                                                        {openDelete === coupon.id && (
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
                                                                                                                        You will delete {coupon.title}
                                                                                                                  </div>
                                                                                                            </div>
                                                                                                      </div>
                                                                                                      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                            <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-TextFontSemiBold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(coupon.id, coupon.title)}>
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
                              {coupons.length > 0 && (
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

export default CouponPage;