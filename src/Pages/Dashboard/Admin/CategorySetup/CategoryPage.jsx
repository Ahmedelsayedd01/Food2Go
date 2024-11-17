import React, { useEffect, useRef, useState } from 'react';
import { DeleteIcon, EditIcon } from '../../../../Assets/Icons/AllIcons';
import { Link } from 'react-router-dom';
import { DropDown, StaticLoader, Switch } from '../../../../Components/Components';
import { useGet } from '../../../../Hooks/useGet';
import { useChangeState } from '../../../../Hooks/useChangeState';
import { useDelete } from '../../../../Hooks/useDelete';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../../../Store/CreateSlices';

const CategoryPage = () => {
       const dispatch = useDispatch()
       const { refetch: refetchCategory, loading: loadingCategory, data: dataCategory } = useGet({ url: 'https://Bcknd.food2go.online/admin/category' });
       const { changeState, loadingChange, responseChange } = useChangeState();
       const { deleteData, loadingDelete, responseDelete } = useDelete();
       const dropDownRefs = useRef([]); // Array to store multiple refs
       const [categories, setCategories] = useState([]);
       const [categoryAddons, setCategoryAddons] = useState([]);
       const [openMenuIndex, setOpenMenuIndex] = useState(null); // Track the index of the open dropdown
       const [selectedOptions, setSelectedOptions] = useState({}); // Store selected options for each row

       // Fetch categories when the component mounts or when refetch is called
       useEffect(() => {
              refetchCategory();
       }, [refetchCategory]); // Empty dependency array to only call refetch once on mount


       // Change categories status 
       const hangleChangeStaus = async (id, name, status) => {
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
       // Change categories priority 
       const hangleChangePriority = async (id, name, priority) => {
              const response = await changeState(
                     `https://Bcknd.food2go.online/admin/category/priority/${id}`,
                     `${name} Changed Priority.`,
                     { priority } // Pass priority as an object if changeState expects an object
              );

              if (response) {
                     // Update categories only if changeState succeeded
                     setCategories((prevCategories) =>
                            prevCategories.map((category) =>
                                   category.id === id ? { ...category, priority: priority } : category
                            )
                     );
                     setOpenMenuIndex(null); // Close the dropdown after selecting
              }

              // Log the updated categories after the state update
              setCategories((prevCategories) => {
                     const updatedCategories = prevCategories.map((category) =>
                            category.id === id ? { ...category, priority: priority } : category
                     );
                     console.log('Updated categories:', updatedCategories);
                     return updatedCategories;
              });
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
                     setCategories(dataCategory.categories);
                     dispatch(setCategory)
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

       const headers = ['SL', 'Image', "Banner", 'Name', 'Status', 'Priority', 'Action'];

       return (
              <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
                     {loadingCategory ? (
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
                                                                                    className="bg-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                                                                                    loading="lazy"
                                                                                    alt="Photo"
                                                                             />
                                                                      </div>
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {category.name}
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      <Switch
                                                                             checked={category.status === 1}
                                                                             handleClick={() => {
                                                                                    hangleChangeStaus(category.id, category.name, category.status === 1 ? 0 : 1);
                                                                             }}
                                                                      />
                                                               </td>
                                                               <td className="relative min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">
                                                                      <DropDown
                                                                             ref={(el) => (dropDownRefs.current[index] = el)} // Set ref dynamically
                                                                             handleOpen={() => handleOpen(index)}
                                                                             openMenu={openMenuIndex === index}
                                                                             stateoption={category.priority} // Display selected option
                                                                             options={categoryAddons}
                                                                             // onSelectOption={(option) => handleSelectOption(index, option)}
                                                                             onSelectOption={(option) => hangleChangePriority(category.id, category.name, option.id)}
                                                                      />
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
