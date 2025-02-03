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

const CategoryPage = ({ refetch, setUpdate }) => {
       const dispatch = useDispatch();
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchCategory, loading: loadingCategory, data: dataCategory } = useGet({
              url: `${apiUrl}/admin/category`
       });
       const { changeState, loadingChange, responseChange } = useChangeState();
       const { deleteData, loadingDelete, responseDelete } = useDelete();
       const dropDownRefs = useRef([]); // Array to store multiple refs

       const [categories, setCategories] = useState([]);
       const [categoryAddons, setCategoryAddons] = useState([]);
       const [openMenuIndex, setOpenMenuIndex] = useState(null); // Track the index of the open dropdown
       const [selectedOptions, setSelectedOptions] = useState({}); // Store selected options for each row
       const [priorityChange, setPriorityChange] = useState(''); // Store selected options for each row

       const [openSupCategory, setOpenSupCategory] = useState(null);
       const [openPriority, setOpenPriority] = useState(null);
       const [openSupDelete, setOpenSupDelete] = useState(null);
       const [openDelete, setOpenDelete] = useState(null);

       const [currentPage, setCurrentPage] = useState(1); // Track the current page
       const categoriesPerPage = 20; // Limit to 20 categories per page

       // Calculate total number of pages
       const totalPages = Math.ceil(categories.length / categoriesPerPage);

       // Get the categories for the current page
       const currentCategories = categories.slice(
              (currentPage - 1) * categoriesPerPage,
              currentPage * categoriesPerPage
       );

       // handle page change
       const handlePageChange = (pageNumber) => {
              setCurrentPage(pageNumber);
       };

       // Fetch categories when the component mounts or when refetch is called
       useEffect(() => {
              refetchCategory();
       }, [refetchCategory, refetch]); // Empty dependency array to only call refetch once on mount


       // View supp category

       const handleOpenSupCategory = (item) => {
              setOpenSupCategory(item);
       };
       const handleCloseSupCategory = () => {
              setOpenSupCategory(null);
       };
       const handleOpenPriority = (item) => {
              setOpenPriority(item);
       };
       const handleClosePriority = () => {
              setOpenPriority(null);
       };
       const handleOpenSupDelete = (item) => {
              setOpenSupDelete(item);
       };
       const handleCloseSupDelete = () => {
              setOpenSupDelete(null);
       };
       const handleOpenDelete = (item) => {
              setOpenDelete(item);
       };
       const handleCloseDelete = () => {
              setOpenDelete(null);
       };
       // Change categories status 
       const handleChangeStaus = async (id, name, status) => {
              const response = await changeState(
                     `${apiUrl}/admin/category/status/${id}`,
                     `${name} Changed Status.`,
                     { status } // Pass status as an object if changeState expects an object
              );

              if (response) {
                     // Update categories only if changeState succeeded
                     setCategories((prevCategories) =>
                            prevCategories.map((category) =>
                                   category.id === id ? { ...category, status: status } : category
                            )
                     );
              }

       };
       const handleChangeActive = async (id, name, status) => {
              const response = await changeState(
                     `${apiUrl}/admin/category/active/${id}`,
                     `${name} Changed Active.`,
                     { active: status } // Pass status as an object if changeState expects an object
              );

              if (response) {
                     // Update categories only if changeState succeeded
                     setCategories((prevCategories) =>
                            prevCategories.map((category) =>
                                   category.id === id ? { ...category, active: status } : category
                            )
                     );
                     setUpdate(!refetch)
              }

              // Log the updated categories after the state update
              setCategories((prevCategories) => {
                     const updatedCategories = prevCategories.map((category) =>
                            category.id === id ? { ...category, active: status } : category
                     );
                     console.log('Updated categories:', updatedCategories);
                     return updatedCategories;
              });
       };

       // Change categories priority 
       const handleChangePriority = async (id, name) => {
              const response = await changeState(
                     `${apiUrl}/admin/category/priority/${id}`,
                     `${name} Changed Priority.`,
                     { priority: priorityChange } // Pass priority as an object if changeState expects an object
              );

              if (response) {
                     setPriorityChange('')
                     setOpenPriority(null)
                     refetchCategory()
                     setUpdate(!refetch)
              }

       };

       // Delete Category
       const handleSupDelete = async (id, name) => {
              const success = await deleteData(`${apiUrl}/admin/category/delete/${id}`, `${name} Deleted Success.`);

              if (success) {
                     // Update categories only if changeState succeeded
                     setCategories(
                            categories.map((category) => {
                                   if (category.id === id) {
                                          // Filter out the deleted subcategory
                                          return {
                                                 ...category,
                                                 sub_categories: category.sub_categories.filter(
                                                        (sub) => sub.id !== subcategoryId
                                                 ),
                                          };
                                   }
                                   return category;
                            })
                     );
                     setOpenSupCategory(null)
                     setUpdate(!refetch)
              }
              console.log('categories', categories)
       };
       const handleDelete = async (id, name) => {
              const success = await deleteData(`${apiUrl}/admin/category/delete/${id}`, `${name} Deleted Success.`);

              if (success) {
                     // Update categories only if changeState succeeded
                     setCategories(
                            categories.filter((category) =>
                                   category.id !== id
                            )
                     );
                     setUpdate(!refetch)
              }
              console.log('categories', categories)
       };

       // Update categories when `data` changes
       useEffect(() => {
              if (dataCategory && dataCategory.categories) {
                     // setCategories(dataCategory.categories);
                     setCategories(dataCategory.parent_categories || []);
                     // dispatch(setCategory)
                     setCategoryAddons(dataCategory.addons);
              }
       }, [dataCategory]); // Only run this effect when `data` changes


       const handleOpen = (index) => {
              setOpenMenuIndex(prevIndex => (prevIndex === index ? null : index)); // Toggle the dropdown
       };

       // const handleSelectOption = (index, option) => {
       //        setSelectedOptions(prev => ({ ...prev, [index]: option.name })); // Update selected option for the dropdown
       //        setOpenMenuIndex(null); // Close the dropdown after selecting
       // };

       useEffect(() => {
              const handleClickOutside = (event) => {
                     // Close dropdown if clicked outside
                     if (!dropDownRefs.current.some(ref => ref && ref.contains(event.target))) {
                            setOpenMenuIndex(null);
                     }
              };

              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);

       const headers = ['SL', 'Image', "Banner", 'Name', 'Subcategory', 'Status', 'Active', 'Priority', 'Action'];

       return (
              <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
                     {loadingCategory || loadingChange || loadingDelete ? (
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
                                                 {categories.length === 0 ? (
                                                        <tr>
                                                               <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find categories</td>
                                                        </tr>
                                                 ) : (


                                                        currentCategories.map((category, index) => ( // Example with two rows
                                                               <tr className="w-full border-b-2" key={index}>
                                                                      <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {(currentPage - 1) * categoriesPerPage + index + 1}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 overflow-hidden">
                                                                             <div className="flex justify-center">
                                                                                    <img src={category.image_link}
                                                                                           className="bg-mainColor border-2 border-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                                                                                           alt="Photo"
                                                                                    />
                                                                             </div>
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 overflow-hidden">
                                                                             <div className="flex justify-center">
                                                                                    <img src={category.banner_link}
                                                                                           className="bg-mainColor border-2 border-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                                                                                           loading="lazy"
                                                                                           alt="Photo"
                                                                                    />
                                                                             </div>
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {category.name}

                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             <span className='text-mainColor text-xl border-b-2 border-mainColor font-TextFontSemiBold cursor-pointer'
                                                                                    onClick={() => handleOpenSupCategory(category.id)}>
                                                                                    View
                                                                             </span>

                                                                             {openSupCategory === category.id && (
                                                                                    <Dialog open={true} onClose={handleCloseSupCategory} className="relative z-10">
                                                                                           <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                           <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                         <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                                                                                                {/* Permissions List */}
                                                                                                                <div className="w-full flex flex-wrap items-center justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                                                                                                       {category.sub_categories.length === 0 ? (
                                                                                                                              <div className="w-full text-center text-lg font-TextFontSemiBold text-gray-500 my-4">
                                                                                                                                     No subcategory available for this category.
                                                                                                                              </div>
                                                                                                                       ) : (
                                                                                                                              category.sub_categories.map((supcategory, index) => {
                                                                                                                                     const displayIndex = index + 1;
                                                                                                                                     return (
                                                                                                                                            <div
                                                                                                                                                   key={index}
                                                                                                                                                   className=" flex items-center justify-between shadow-md hover:shadow-none duration-300 py-3 px-3 rounded-xl bg-gray-50 gap-x-2"
                                                                                                                                            >
                                                                                                                                                   <span className="text-mainColor text-lg lg:text-xl font-TextFontSemiBold capitalize">
                                                                                                                                                          {displayIndex}. {supcategory.name}
                                                                                                                                                   </span>
                                                                                                                                                   <Link to={`edit/${supcategory.id}`}  ><EditIcon /></Link>
                                                                                                                                                   <button
                                                                                                                                                          type="button"
                                                                                                                                                          onClick={() => handleOpenSupDelete(supcategory.id)}
                                                                                                                                                   >
                                                                                                                                                          <DeleteIcon />
                                                                                                                                                   </button>
                                                                                                                                                   {openSupDelete === supcategory.id && (
                                                                                                                                                          <Dialog
                                                                                                                                                                 open={true}
                                                                                                                                                                 onClose={handleCloseSupDelete}
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
                                                                                                                                                                                                           You will delete supcategory {supcategory?.name || "-"}
                                                                                                                                                                                                    </div>
                                                                                                                                                                                             </div>
                                                                                                                                                                                      </div>
                                                                                                                                                                                      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                                                                                             <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-TextFontSemiBold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleSupDelete(supcategory.id, supcategory.name)}>
                                                                                                                                                                                                    Delete
                                                                                                                                                                                             </button>

                                                                                                                                                                                             <button
                                                                                                                                                                                                    type="button"
                                                                                                                                                                                                    data-autofocus
                                                                                                                                                                                                    onClick={handleCloseSupDelete}
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
                                                                                                                                     );
                                                                                                                              })
                                                                                                                       )}

                                                                                                                </div>

                                                                                                                {/* Dialog Footer */}
                                                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                       <button
                                                                                                                              type="button"
                                                                                                                              onClick={handleCloseSupCategory}
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
                                                                                    checked={category.status === 1}
                                                                                    handleClick={() => {
                                                                                           handleChangeStaus(category.id, category.name, category.status === 1 ? 0 : 1);
                                                                                    }}
                                                                             />
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             <Switch
                                                                                    checked={category.active === 1}
                                                                                    handleClick={() => {
                                                                                           handleChangeActive(category.id, category.name, category.active === 1 ? 0 : 1);
                                                                                    }}
                                                                             />
                                                                      </td>
                                                                      <td className="relative min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">
                                                                             <span className='text-mainColor text-xl border-b-2 border-mainColor font-TextFontSemiBold cursor-pointer'
                                                                                    onClick={() => handleOpenPriority(category.id)}>
                                                                                    {category.priority}
                                                                             </span>
                                                                             {openPriority === category.id && (
                                                                                    <Dialog open={true} onClose={handleClosePriority} className="relative z-10">
                                                                                           <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                           <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                         <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                                                                                                {/* Permissions List */}
                                                                                                                <div className="w-8/12 flex items-baseline justify-center mx-auto gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                                                                                                       <span className="text-2xl font-TextFontRegular text-thirdColor">Priority:</span>
                                                                                                                       <NumberInput
                                                                                                                              value={priorityChange} // Access category_name property
                                                                                                                              onChange={(e) => setPriorityChange(e.target.value)}
                                                                                                                              placeholder={category.priority || "Priority Num"}
                                                                                                                       />

                                                                                                                </div>

                                                                                                                {/* Dialog Footer */}
                                                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-x-2">
                                                                                                                       {/* <AddButton /> */}
                                                                                                                       <button
                                                                                                                              type="button"
                                                                                                                              onClick={handleClosePriority}
                                                                                                                              className="inline-flex w-full justify-center rounded-xl bg-mainColor px-6 py-3 text-sm font-TextFontMedium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark focus:outline-none"
                                                                                                                       >
                                                                                                                              Close
                                                                                                                       </button>
                                                                                                                       <button
                                                                                                                              type="button"
                                                                                                                              onClick={() => handleChangePriority(category.id, category.name)} // Renamed 'handleClick' to 'onClick'
                                                                                                                              className="inline-flex w-full justify-center rounded-xl bg-white px-6 py-3 text-sm font-TextFontMedium text-mainColor border-2 shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark focus:outline-none"
                                                                                                                       >
                                                                                                                              Change Priority
                                                                                                                       </button>

                                                                                                                </div>

                                                                                                         </DialogPanel>
                                                                                                  </div>
                                                                                           </div>
                                                                                    </Dialog>
                                                                             )}
                                                                      </td>
                                                                      <td className="px-4 py-3 text-center">
                                                                             <div className="flex items-center justify-center gap-2">
                                                                                    <Link to={`edit/${category.id}`}  ><EditIcon /></Link>
                                                                                    <button
                                                                                           type="button"
                                                                                           onClick={() => handleOpenDelete(category.id)}
                                                                                    >
                                                                                           <DeleteIcon />
                                                                                    </button>
                                                                                    {openDelete === category.id && (
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
                                                                                                                                            {/* <DialogTitle
                                                                                                                                            as="h3"
                                                                                                                                            className="text-xl font-TextFontSemiBold leading-10 text-gray-900"
                                                                                                                                     > */}
                                                                                                                                            You will delete category {category?.name || "-"}
                                                                                                                                            {/* </DialogTitle> */}
                                                                                                                                     </div>
                                                                                                                              </div>
                                                                                                                       </div>
                                                                                                                       <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                              <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-TextFontSemiBold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(category.id, category.name)}>
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
                                   {categories.length > 0 && (
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

export default CategoryPage;
