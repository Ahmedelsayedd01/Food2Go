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

const CategoryPage = ({ refetch }) => {
       const dispatch = useDispatch()
       const { refetch: refetchCategory, loading: loadingCategory, data: dataCategory } = useGet({ url: 'https://Bcknd.food2go.online/admin/category' });
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
       // Change categories status 
       const handleChangeStaus = async (id, name, status) => {
              const response = await changeState(
                     `https://Bcknd.food2go.online/admin/category/status/${id}`,
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

              // Log the updated categories after the state update
              setCategories((prevCategories) => {
                     const updatedCategories = prevCategories.map((category) =>
                            category.id === id ? { ...category, status: status } : category
                     );
                     console.log('Updated categories:', updatedCategories);
                     return updatedCategories;
              });
       };
       const handleChangeActive = async (id, name, status) => {
              const response = await changeState(
                     `https://Bcknd.food2go.online/admin/category/active/${id}`,
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
                     `https://Bcknd.food2go.online/admin/category/priority/${id}`,
                     `${name} Changed Priority.`,
                     { priority: priorityChange } // Pass priority as an object if changeState expects an object
              );

              if (response) {
                     setPriorityChange('')
                     setOpenPriority(null)
                     refetchCategory()
              }

       };

       // Delete Category
       const handleDelete = async (id, name) => {
              const success = await deleteData(`https://Bcknd.food2go.online/admin/category/delete/${id}`, `${name} Deleted Success.`);

              if (success) {
                     // Update categories only if changeState succeeded
                     setCategories(
                            categories.filter((category) =>
                                   category.id !== id
                            )
                     );
              }
              console.log('categories', categories)
       };

       // Update categories when `data` changes
       useEffect(() => {
              if (dataCategory && dataCategory.categories) {
                     // setCategories(dataCategory.categories);
                     setCategories(dataCategory.parent_categories);
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

       const headers = ['SL', 'Image', "Banner", 'Name', 'Sup Category', 'Status', 'Active', 'Priority', 'Action'];

       return (
              <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
                     {loadingCategory || loadingChange || loadingDelete ? (
                            <><StaticLoader /></>
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
                                          {categories.length === 0 ? (
                                                 <tr>
                                                        <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find categories</td>
                                                 </tr>
                                          ) : (


                                                 categories.map((category, index) => ( // Example with two rows
                                                        <tr className="w-full border-b-2" key={index}>
                                                               <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {index + 1}
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 overflow-hidden">
                                                                      <div className="flex justify-center">
                                                                             <img src={category.image_link}
                                                                                    className="bg-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
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
                                                                      <span className='text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer'
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
                                                                                                                       <div className="w-full text-center text-lg font-semibold text-gray-500 my-4">
                                                                                                                              No subcategory available for this category.
                                                                                                                       </div>
                                                                                                                ) : (
                                                                                                                       category.sub_categories.map((supcategory, index) => {
                                                                                                                              const displayIndex = index + 1;
                                                                                                                              return (
                                                                                                                                     <div
                                                                                                                                            key={index}
                                                                                                                                            className="sm:w-full lg:w-5/12 xl:w-3/12 flex items-center justify-center shadow-md hover:shadow-none duration-300 py-3 px-4 rounded-xl bg-gray-50"
                                                                                                                                     >
                                                                                                                                            <span className="text-mainColor text-lg lg:text-xl font-semibold capitalize">
                                                                                                                                                   {displayIndex}. {supcategory.name}
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
                                                                                                                       onClick={handleCloseSupCategory}
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
                                                                      <span className='text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer'
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
                                                                                                                       className="inline-flex w-full justify-center rounded-xl bg-mainColor px-6 py-3 text-sm font-medium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark focus:outline-none"
                                                                                                                >
                                                                                                                       Close
                                                                                                                </button>
                                                                                                                <button
                                                                                                                       type="button"
                                                                                                                       onClick={() => handleChangePriority(category.id, category.name)} // Renamed 'handleClick' to 'onClick'
                                                                                                                       className="inline-flex w-full justify-center rounded-xl bg-white px-6 py-3 text-sm font-medium text-mainColor border-2 shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark focus:outline-none"
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
                                                                             <Link to={`edit/${category.id}`} className="text-blue-500 hover:underline"><EditIcon /></Link>
                                                                             <button className="text-red-500" onClick={() => handleDelete(category.id, category.name)}><DeleteIcon /></button>
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

export default CategoryPage;
