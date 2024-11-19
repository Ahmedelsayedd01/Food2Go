import { useEffect, useState } from 'react'
import { useGet } from '../../../../Hooks/useGet';
import { AddButton, LoaderLogin, StaticLoader } from '../../../../Components/Components';
import { DeleteIcon, EditIcon } from '../../../../Assets/Icons/AllIcons';
import { useDelete } from '../../../../Hooks/useDelete';
import { Link } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

const ProductPage = () => {
       const { refetch: refetchProducts, loading: loadingProducts, data: dataProducts } = useGet({ url: 'https://Bcknd.food2go.online/admin/product' });
       const { deleteData, loadingDelete, responseDelete } = useDelete();
       const [products, setProducts] = useState([])
       const [openAddonsView, setOpenAddonsView] = useState(null);
       const [openVariationsView, setOpenVariationsView] = useState(null);
       const [openExcludesView, setOpenExcludesView] = useState(null);
       const [openExtraView, setOpenExtraView] = useState(null);

       const handleOpenAddonsView = (productId) => {
              setOpenAddonsView(productId);
       };
       const handleOpenVariationsView = (productId) => {
              setOpenVariationsView(productId);
       };
       const handleOpenExcludesView = (productId) => {
              setOpenExcludesView(productId);
       };
       const handleOpenExtraView = (productId) => {
              setOpenExtraView(productId);
       };

       const handleCloseAddonsView = () => {
              setOpenAddonsView(null);
       };
       const handleCloseVariationsView = () => {
              setOpenVariationsView(null);
       };
       const handleCloseExcludesView = () => {
              setOpenExcludesView(null);
       };
       const handleCloseExtraView = () => {
              setOpenExtraView(null);
       };
       useEffect(
              () => {
                     refetchProducts()
              }, [refetchProducts]
       )
       useEffect(() => {
              if (dataProducts && dataProducts.products) {
                     setProducts(dataProducts.products)
              }

              console.log('dataProducts', dataProducts)
              console.log('products', products)
       }, [dataProducts])

       // Delete Product
       const handleDelete = async (id, name) => {
              const success = await deleteData(`https://Bcknd.food2go.online/admin/product/delete/${id}`, `${name} Deleted Success.`);

              if (success) {
                     setProducts(
                            products.filter((product) =>
                                   product.id !== id
                            )
                     );
              }
              console.log('products', products)
       };

       const headers = [
              '#',
              'Name',
              'Image',
              'Price',
              'Description',
              "Category",
              'Subcategory',
              'Addons',
              'Variations',
              'Discount',
              'Tax',
              'Excludes',
              'Extra',
              'Item Type',
              'Number',
              'Points',
              'Stock Type',
              'From',
              'To',
              'Action'
              // 'SL',
              // 'name',
              // 'image',
              // 'price',
              // 'description',
              // "category_id",
              // 'sub_category_id',
              // 'addons',
              // 'variations',
              // 'discount_id',
              // 'tax_id',
              // 'excludes',
              // 'extra',
              // 'item_type',
              // 'number',
              // 'stock_type',
              // 'from',
              // 'to',
              // 'points',
       ];
       return (
              <>
                     <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
                            {loadingProducts || loadingDelete ? (
                                   <><LoaderLogin /></>
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
                                                 {products.length === 0 ? (
                                                        <tr>
                                                               <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find products</td>
                                                        </tr>
                                                 ) : (


                                                        products.map((product, index) => ( // Example with two rows
                                                               <tr className="w-full border-b-2" key={index}>
                                                                      <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {index + 1}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product?.name || ''}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 overflow-hidden">
                                                                             <div className="flex justify-center">
                                                                                    <img src={product.image_link}
                                                                                           className="bg-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                                                                                           alt="Photo"
                                                                                    />
                                                                             </div>
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product?.price || ''}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product?.description || ''}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product.category?.name || ''}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product.sub_category?.name || ''}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             <span className='text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer'
                                                                                    onClick={() => handleOpenAddonsView(product.id)}>
                                                                                    View
                                                                             </span>
                                                                      </td>

                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             <span className='text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer'
                                                                                    onClick={() => handleOpenVariationsView(product.id)}>
                                                                                    View
                                                                             </span>
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product.discount?.name || ''}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product.tax?.name || ''}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             <span className='text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer'
                                                                                    onClick={() => handleOpenExcludesView(product.id)}>
                                                                                    View
                                                                             </span>
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             <span className='text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer'
                                                                                    onClick={() => handleOpenExtraView(product.id)}>
                                                                                    View
                                                                             </span>
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product?.item_type || ''}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product?.number || ''}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product?.points || ''}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product?.stock_type || ''}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product?.from || ''}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product?.to || ''}
                                                                      </td>
                                                                      <td className="px-4 py-3 text-center">
                                                                             <div className="flex items-center justify-center gap-2">
                                                                                    <Link to={`edit/${product.id}`} className="text-blue-500 hover:underline"><EditIcon /></Link>
                                                                                    <button className="text-red-500" onClick={() => handleDelete(product.id, product.name)}><DeleteIcon /></button>
                                                                                    {openAddonsView === product.id && (
                                                                                           <Dialog open={true} onClose={handleCloseAddonsView} className="relative z-10">
                                                                                                  <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                                                                                                       {/* Permissions List */}
                                                                                                                       <div className="w-full flex flex-wrap items-center justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                                                                                                              {product.addons.length === 0 ? (
                                                                                                                                     <div className="w-full text-center text-lg font-semibold text-gray-500 my-4">
                                                                                                                                            No Addons available for this product.
                                                                                                                                     </div>
                                                                                                                              ) : (
                                                                                                                                     product.addons.map((addon, index) => {
                                                                                                                                            const displayIndex = index + 1;
                                                                                                                                            return (
                                                                                                                                                   <div
                                                                                                                                                          key={index}
                                                                                                                                                          className="sm:w-full lg:w-5/12 xl:w-3/12 flex items-center justify-center shadow-md hover:shadow-none duration-300 py-3 px-4 rounded-xl bg-gray-50"
                                                                                                                                                   >
                                                                                                                                                          <span className="text-mainColor text-lg lg:text-xl font-semibold capitalize">
                                                                                                                                                                 {displayIndex}. {addon.name}
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
                                                                                                                                     onClick={handleCloseAddonsView}
                                                                                                                                     className="mt-3 inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-medium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark focus:outline-none"
                                                                                                                              >
                                                                                                                                     Close
                                                                                                                              </button>
                                                                                                                       </div>

                                                                                                                </DialogPanel>
                                                                                                         </div>
                                                                                                  </div>
                                                                                           </Dialog>
                                                                                    )}

                                                                                    {openVariationsView === product.id && (
                                                                                           <Dialog open={true} onClose={handleCloseVariationsView} className="relative z-10">
                                                                                                  <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                                                                                                       {/* Permissions List */}
                                                                                                                       <div className="w-full flex flex-col items-start justify-start gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                                                                                                              {product.variations.length === 0 ? (
                                                                                                                                     <div className="w-full text-center text-lg font-semibold text-gray-500 my-4">
                                                                                                                                            No Variations available for this product.
                                                                                                                                     </div>
                                                                                                                              ) : (
                                                                                                                                     product.variations.map((variation, index) => {
                                                                                                                                            const displayIndex = index + 1;
                                                                                                                                            return (
                                                                                                                                                   <>
                                                                                                                                                          <div
                                                                                                                                                                 key={index}
                                                                                                                                                                 className="sm:w-full lg:w-auto flex items-start justify-start shadow-md p-2 rounded-xl bg-mainColor "
                                                                                                                                                          >
                                                                                                                                                                 <div className="w-full flex flex-col items-start justify-start gap-3">

                                                                                                                                                                        <span className="text-white text-lg lg:text-xl font-semibold capitalize">
                                                                                                                                                                               {displayIndex}. {variation.name}
                                                                                                                                                                        </span>
                                                                                                                                                                 </div>
                                                                                                                                                          </div>
                                                                                                                                                          {variation.options.map((option, indexOption) => {
                                                                                                                                                                 return (<div className="w-full flex flex-wrap items-start justify-start gap-5" key={`${option.id}-${indexOption}`}>
                                                                                                                                                                        <div className="">
                                                                                                                                                                               <span>option Name: {option.name}</span>
                                                                                                                                                                        </div>
                                                                                                                                                                        <div className="">
                                                                                                                                                                               <span>option Price: {option.price}</span>
                                                                                                                                                                        </div>
                                                                                                                                                                 </div>)
                                                                                                                                                          })}
                                                                                                                                                   </>
                                                                                                                                            );
                                                                                                                                     })
                                                                                                                              )}

                                                                                                                       </div>

                                                                                                                       {/* Dialog Footer */}
                                                                                                                       <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                              <button
                                                                                                                                     type="button"
                                                                                                                                     onClick={handleCloseVariationsView}
                                                                                                                                     className="mt-3 inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-medium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark focus:outline-none"
                                                                                                                              >
                                                                                                                                     Close
                                                                                                                              </button>
                                                                                                                       </div>

                                                                                                                </DialogPanel>
                                                                                                         </div>
                                                                                                  </div>
                                                                                           </Dialog>
                                                                                    )}

                                                                                    {openExcludesView === product.id && (
                                                                                           <Dialog open={true} onClose={handleCloseExcludesView} className="relative z-10">
                                                                                                  <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                                                                                                       {/* Permissions List */}
                                                                                                                       <div className="w-full flex flex-wrap items-center justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                                                                                                              {product.excludes.length === 0 ? (
                                                                                                                                     <div className="w-full text-center text-lg font-semibold text-gray-500 my-4">
                                                                                                                                            No Excludes available for this product.
                                                                                                                                     </div>
                                                                                                                              ) : (
                                                                                                                                     product.excludes.map((exclude, index) => {
                                                                                                                                            const displayIndex = index + 1;
                                                                                                                                            return (
                                                                                                                                                   <div
                                                                                                                                                          key={index}
                                                                                                                                                          className="sm:w-full lg:w-5/12 xl:w-3/12 flex items-center justify-center shadow-md hover:shadow-none duration-300 py-3 px-4 rounded-xl bg-gray-50"
                                                                                                                                                   >
                                                                                                                                                          <span className="text-mainColor text-lg lg:text-xl font-semibold capitalize">
                                                                                                                                                                 {displayIndex}. {exclude.name}
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
                                                                                                                                     onClick={handleCloseExcludesView}
                                                                                                                                     className="mt-3 inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-medium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark focus:outline-none"
                                                                                                                              >
                                                                                                                                     Close
                                                                                                                              </button>
                                                                                                                       </div>

                                                                                                                </DialogPanel>
                                                                                                         </div>
                                                                                                  </div>
                                                                                           </Dialog>
                                                                                    )}

                                                                                    {openExtraView === product.id && (
                                                                                           <Dialog open={true} onClose={handleCloseExtraView} className="relative z-10">
                                                                                                  <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                                                                                                       {/* Permissions List */}
                                                                                                                       <div className="w-full flex flex-wrap items-center justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                                                                                                              {product.extra.length === 0 ? (
                                                                                                                                     <div className="w-full text-center text-lg font-semibold text-gray-500 my-4">
                                                                                                                                            No extra available for this product.
                                                                                                                                     </div>
                                                                                                                              ) : (
                                                                                                                                     product.extra.map((ext, index) => {
                                                                                                                                            const displayIndex = index + 1;
                                                                                                                                            return (
                                                                                                                                                   <div
                                                                                                                                                          key={index}
                                                                                                                                                          className="sm:w-full lg:w-5/12 xl:w-3/12 flex items-center justify-center shadow-md hover:shadow-none duration-300 py-3 px-4 rounded-xl bg-gray-50"
                                                                                                                                                   >
                                                                                                                                                          <span className="text-mainColor text-lg lg:text-xl font-semibold capitalize">
                                                                                                                                                                 {displayIndex}. {ext.name}
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
                                                                                                                                     onClick={handleCloseExtraView}
                                                                                                                                     className="mt-3 inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-medium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark focus:outline-none"
                                                                                                                              >
                                                                                                                                     Close
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
              </>
       );
}

export default ProductPage