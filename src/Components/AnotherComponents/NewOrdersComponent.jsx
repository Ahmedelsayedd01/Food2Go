import React from 'react';
import { useSelector } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from 'react-icons/md';

const NewOrdersComponent = ({ isOpen, onClose }) => {
       const newOrders = useSelector((state) => state.newOrders);

       return (
              <>
                     {/* {newOrders > 0 && ( */}
                     <Dialog open={isOpen} onClose={onClose} className="relative z-10">
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                   <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                          <div className="relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                                                 <div className="w-full flex items-center justify-center gap-x-4 text-3xl font-semibold text-gray-500 my-5">
                                                        <MdOutlineShoppingCart className='text-4xl' />
                                                        You have {newOrders.count} new orders, Check Please.
                                                 </div>
                                                 <div className="px-4 py-3 mx-auto border-t-4 sm:px-6">
                                                        <Link
                                                               to="/dashboard/orders/all"
                                                               onClick={(e) => {
                                                                      e.preventDefault();
                                                                      onClose();
                                                                      window.location.href = '/dashboard/orders/all';
                                                               }}
                                                               className="mt-3 inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-xl font-TextFontMedium text-white shadow-sm sm:mt-0 sm:w-auto focus:outline-none"
                                                        >
                                                               Ok, let me check
                                                        </Link>
                                                 </div>
                                          </div>
                                   </div>
                            </div>
                     </Dialog>
                     {/* )} */}
              </>
       );
};
export default NewOrdersComponent;
