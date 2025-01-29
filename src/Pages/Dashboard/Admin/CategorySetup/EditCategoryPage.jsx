import React, { useEffect, useRef, useState } from 'react'
import { DropDown, LoaderLogin, NumberInput, StaticButton, StaticLoader, SubmitButton, Switch, TextInput, UploadInput } from '../../../../Components/Components';

import { MultiSelect } from 'primereact/multiselect';
import { useNavigate, useParams } from 'react-router-dom';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';
import { useAuth } from '../../../../Context/Auth';


const EditCategoryPage = () => {
       const { categoryId } = useParams();
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchTranslation, loading: loadingTranslation, data: dataTranslation } = useGet({
              url: `${apiUrl}/admin/translation`
       });
       const { refetch: refetchCategories, loading: loadingCategories, data: dataCategories } = useGet({ url: `${apiUrl}/admin/category` });

       const { refetch: refetchCategory, loading: loadingCategory, data: dataCategory } = useGet({ url: `${apiUrl}/admin/category/item/${categoryId}` });
       const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/admin/category/update/${categoryId}` });

       const dropDownCategoriesParent = useRef();
       const ImageRef = useRef();
       const BannerRef = useRef();
       const auth = useAuth();
       const navigate = useNavigate();

       // const [taps, setTaps] = useState([{ id: 1, name: 'English(EN)' }, { id: 2, name: 'Arabic(Ar)' }, { id: 3, name: 'garman' }])
       const [taps, setTaps] = useState([])
       const [categories, setCategories] = useState([])
       const [categoriesParent, setCategoriesParent] = useState([])

       const [selectedCategoriesAddons, setSelectedCategoriesAddons] = useState([])
       const [statecategoriesAddonse, setStatecategoriesAddonse] = useState('Select Category Addons')
       const [categoriesAddonse, setCategoriesAddonse] = useState([])

       const [currentTap, setCurrentTap] = useState(0);

       const [categoryName, setCategoryName] = useState([]);
       const [priority, setPriority] = useState('');

       const [statusCategory, setStatusCategory] = useState(0);
       const [activeCategory, setActiveCategory] = useState(0);

       const [stateCategoriesParent, setStateCategoriesParent] = useState('Select Category Parent');
       const [categoriesParentId, setCategoriesParentId] = useState('');
       const [isOpenCategoriesParent, setIsOpenCategoriesParent] = useState(false);

       const [stateCategoriesPriority, setStateCategoriesPriority] = useState('Select Category Priority');
       const [categoriesPriorityId, setCategoriesPriorityId] = useState('');
       const [isOpenCategoriesPriority, setIsOpenCategoriesPriority] = useState(false);

       const [image, setImage] = useState('');
       const [imageFile, setImageFile] = useState(null);

       const [banner, setBanner] = useState('');
       const [bannerFile, setBannerFile] = useState(null);


       useEffect(() => {
              refetchTranslation(); // Refetch data when the component mounts
              refetchCategories(); // Refetch data when the component mounts
              refetchCategory(); // Refetch data when the component mounts
       }, [refetchTranslation, refetchCategory, refetchCategories]);

       useEffect(() => {
              if (dataTranslation && dataCategories) {
                     setTaps(dataTranslation.translation);
                     setCategories(dataCategories.categories);
                     setCategoriesParent([{ id: '', name: 'Select Category Parent' }, ...dataCategories.parent_categories] || []);
                     setCategoriesAddonse(dataCategories.addons);
              }
       }, [dataTranslation, dataCategories]);

       useEffect(() => {
              if (dataCategory && dataCategory.category_names && dataCategory.category) {
                     const newCategoryNames = [];
                     if (dataCategory.category_names) {
                            dataCategory.category_names.forEach((category) => {
                                   let obj = {
                                          tranlation_id: category.tranlation_id || '-',  // Use '' if id is missing
                                          tranlation_name: category.tranlation_name || 'Default Language',  // Fallback value
                                          category_name: category.category_name || '-',  // Use '' if name is missing
                                   };
                                   newCategoryNames.push(obj);
                            });
                     }

                     setCategoryName(newCategoryNames.length > 0 ? newCategoryNames : []);

                     console.log('categoryName edite', categoryName)


                     setCategories(dataCategory.category.categories);
                     setPriority(dataCategory.category.priority);
                     setImage(dataCategory.category.image_link);
                     setImageFile(dataCategory.category.image_link);
                     setBanner(dataCategory.category.banner_link);
                     setBannerFile(dataCategory.category.banner_link);
                     setStateCategoriesParent(dataCategory?.category?.parent?.name || stateCategoriesParent);
                     setCategoriesParentId(dataCategory?.category?.parent?.id || '');
                     setSelectedCategoriesAddons(dataCategory.category.addons);
                     setStatusCategory(dataCategory.category.status)
                     setActiveCategory(dataCategory.category.active)
              }
              console.log('dataCategory', dataCategory)
       }, [dataCategory]);




       const handleImageChange = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setImageFile(file);
                     setImage(file.name);
              }
       };
       const handleBannerChange = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setBannerFile(file);
                     setBanner(file.name);
              }
       };

       const handleImageClick = (ref) => {
              if (ref.current) {
                     ref.current.click();
              }
       };
       const handleBannerClick = (ref) => {
              if (ref.current) {
                     ref.current.click();
              }
       };

       const handleOpenDropdown = (dropdown) => {
              if (dropdown === 'parent') {
                     setIsOpenCategoriesParent(!isOpenCategoriesParent);
                     setIsOpenCategoriesPriority(false);
              } else if (dropdown === 'priority') {
                     setIsOpenCategoriesParent(false);
                     setIsOpenCategoriesPriority(!isOpenCategoriesPriority);
              }
       };


       const handleOpenOptionCategoriesParent = () => setIsOpenCategoriesParent(false);
       const handleOpenOptionCategoriesPriority = () => setIsOpenCategoriesPriority(false);

       const handleSelectCategoriesParent = (option) => {
              setCategoriesParentId(option.id);
              setStateCategoriesParent(option.name);
       };
       const handleSelectCategoriesPriority = (option) => {
              setCategoriesPriorityId(option.id);
              setStateCategoriesPriority(option.name);
       };




       const HandleStatusCategory = () => {
              const currentState = statusCategory;
              { currentState === 0 ? setStatusCategory(1) : setStatusCategory(0) }
       }
       const HandleActiveCategory = () => {
              const currentActive = activeCategory;
              { currentActive === 0 ? setActiveCategory(1) : setActiveCategory(0) }
       }

       const handleTap = (index) => {
              setCurrentTap(index)
       }

       useEffect(() => {
              console.log('response', response);
              if (!loadingPost && response) {
                     handleCancel();
              }
       }, [loadingPost, response]);


       const handleCancel = () => {
              navigate(-1, { replace: true });
       };



       useEffect(() => {
              const handleClickOutside = (event) => {
                     // Close dropdown if clicked outside
                     if (
                            dropDownCategoriesParent.current && !dropDownCategoriesParent.current.contains(event.target)
                            // dropDownCategoriesPriority.current && !dropDownCategoriesPriority.current.contains(event.target

                            // )
                     ) {
                            setIsOpenCategoriesParent(null);
                            // setIsOpenCategoriesPriority(null);
                     }
              };

              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);



       const handleCategoryEdit = (e) => {
              e.preventDefault();

              if (categoryName.length === 0) {
                     auth.toastError('please Enter Category Names')
                     return;
              }
              // if (categoryName.length !== taps.length) {
              //        auth.toastError('please Enter All Category Names')
              //        return;
              // }

              if (!imageFile) {
                     auth.toastError('please Set Category Image')
                     return;
              }
              if (!bannerFile) {
                     auth.toastError('please Set Category Banner')
                     return;
              }
              const formData = new FormData();

              categoryName.forEach((name, index) => {
                     // Corrected the typo and added translation_id and translation_name
                     formData.append(`category_names[${index}][tranlation_id]`, name.tranlation_id);
                     formData.append(`category_names[${index}][category_name]`, name.category_name);
                     formData.append(`category_names[${index}][tranlation_name]`, name.tranlation_name);
              });


              if (categoriesParentId) {
                     formData.append('category_id', categoriesParentId);
              }

              formData.append('priority', priority);
              // Assuming selectedCategoriesAddons is an array of selected objects with `id` properties
              selectedCategoriesAddons.forEach((addon, index) => {
                     formData.append(`addons_id[${index}]`, addon.id); // Append each ID as an array element in FormData
              });

              formData.append('image', imageFile);
              formData.append('banner_image', bannerFile);


              formData.append('status', statusCategory);
              formData.append('active', activeCategory);

              postData(formData, 'Category Added Success');

       };
       return (
              <>
                     {loadingTranslation || loadingCategories || loadingPost ? (
                            <>
                                   <div className="w-full flex justify-center items-center">
                                          <LoaderLogin />
                                   </div>
                            </>
                     ) : (
                            <section>
                                   <form onSubmit={handleCategoryEdit}>
                                          {/* Taps */}
                                          <div className="w-full flex items-center justify-start py-2 gap-x-6">
                                                 {taps.map((tap, index) => (
                                                        <span
                                                               key={tap.id}
                                                               onClick={() => handleTap(index)}
                                                               className={`${currentTap === index ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor'}  pb-1 text-xl font-TextFontMedium transition-colors duration-300 cursor-pointer hover:text-mainColor`}
                                                        >
                                                               {tap.name}
                                                        </span>

                                                 ))}
                                          </div>
                                          {/* Content*/}
                                          <div className="sm:py-3 lg:py-6">
                                                 {taps.map((tap, index) => (
                                                        currentTap === index && (
                                                               <div
                                                                      className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4"
                                                                      key={tap.id}
                                                               >
                                                                      {/* Name Input */}
                                                                      <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                             <span className="text-xl font-TextFontRegular text-thirdColor">Name {tap.name}:</span>
                                                                             <TextInput
                                                                                    value={categoryName[index]?.category_name} // Access category_name property
                                                                                    onChange={(e) => {
                                                                                           const inputValue = e.target.value; // Ensure this is a string
                                                                                           setCategoryName(prev => {
                                                                                                  const updatedNames = [...prev];

                                                                                                  // Ensure the array is long enough
                                                                                                  if (updatedNames.length <= index) {
                                                                                                         updatedNames.length = index + 1; // Resize array
                                                                                                  }

                                                                                                  // Create or update the object at the current index
                                                                                                  updatedNames[index] = {
                                                                                                         ...updatedNames[index], // Retain existing properties if any
                                                                                                         'tranlation_id': tap.id, // Use the ID from tap
                                                                                                         'category_name': inputValue, // Use the captured string value
                                                                                                         'tranlation_name': tap.name || 'Default Name', // Use tap.name for tranlation_name
                                                                                                  };

                                                                                                  return updatedNames;
                                                                                           });
                                                                                    }}
                                                                                    placeholder="Category Name"
                                                                             />
                                                                      </div>

                                                                      {/* Conditional Rendering for First Tab Only */}
                                                                      {currentTap === 0 && (
                                                                             <>
                                                                                    {/* Category Parent */}
                                                                                    <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                                           <span className="text-xl font-TextFontRegular text-thirdColor">Category Parent:</span>
                                                                                           <DropDown
                                                                                                  ref={dropDownCategoriesParent}
                                                                                                  handleOpen={() => handleOpenDropdown('parent')}
                                                                                                  stateoption={stateCategoriesParent}
                                                                                                  openMenu={isOpenCategoriesParent}
                                                                                                  handleOpenOption={handleOpenOptionCategoriesParent}
                                                                                                  options={categoriesParent}
                                                                                                  onSelectOption={handleSelectCategoriesParent}
                                                                                                  border={false}
                                                                                           />
                                                                                    </div>
                                                                                    <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                                           <span className="text-xl font-TextFontRegular text-thirdColor">Priority Num :</span>
                                                                                           <NumberInput
                                                                                                  value={priority} // Access addon_name property
                                                                                                  onChange={(e) => setPriority(e.target.value)}
                                                                                                  placeholder="Priority Num"
                                                                                           />
                                                                                    </div>
                                                                                    {/* Category Addons */}
                                                                                    <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                                           <span className="text-xl font-TextFontRegular text-thirdColor">Category Addons:</span>
                                                                                           <MultiSelect
                                                                                                  value={selectedCategoriesAddons}
                                                                                                  onChange={(e) => setSelectedCategoriesAddons(e.value)}
                                                                                                  options={categoriesAddonse}
                                                                                                  optionLabel="name"
                                                                                                  display="chip"
                                                                                                  placeholder={statecategoriesAddonse}
                                                                                                  maxSelectedLabels={3}
                                                                                                  className="w-full md:w-20rem bg-white"
                                                                                           />
                                                                                    </div>
                                                                                    {/* Category Image */}
                                                                                    <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                                           <span className="text-xl font-TextFontRegular text-thirdColor">Category Image:</span>
                                                                                           <UploadInput
                                                                                                  value={image}
                                                                                                  uploadFileRef={ImageRef}
                                                                                                  placeholder="Category Image"
                                                                                                  handleFileChange={handleImageChange}
                                                                                                  onChange={(e) => setImage(e.target.value)}
                                                                                                  onClick={() => handleImageClick(ImageRef)}
                                                                                           />
                                                                                    </div>

                                                                                    {/* Banner Image */}
                                                                                    <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                                           <span className="text-xl font-TextFontRegular text-thirdColor">Banner Image:</span>
                                                                                           <UploadInput
                                                                                                  value={banner}
                                                                                                  uploadFileRef={BannerRef}
                                                                                                  placeholder="Banner Image"
                                                                                                  handleFileChange={handleBannerChange}
                                                                                                  onChange={(e) => setBanner(e.target.value)}
                                                                                                  onClick={() => handleBannerClick(BannerRef)}
                                                                                           />
                                                                                    </div>
                                                                                    <div className="sm:w-full xl:w-[30%] flex items-start justify-start gap-x-1 pt-8">
                                                                                           <div className='w-2/4 flex items-center justify-start gap-x-1'>
                                                                                                  <span className="text-xl font-TextFontRegular text-thirdColor">Status:</span>
                                                                                                  <Switch handleClick={HandleStatusCategory} checked={statusCategory} />
                                                                                           </div>
                                                                                           {/* <div classNam/e="w-1/5 flex sm:flex-col sm:items-start lg:flex-row lg:items-center justify-start gap-x-1 pt-2"> */}
                                                                                           <div className='w-2/4 flex items-center justify-start gap-x-1'>
                                                                                                  <span className="text-xl font-TextFontRegular text-thirdColor">Active:</span>
                                                                                                  <Switch handleClick={HandleActiveCategory} checked={activeCategory} />
                                                                                           </div>
                                                                                    </div>
                                                                             </>
                                                                      )}
                                                               </div>
                                                        )
                                                 ))}


                                          </div>

                                          {/* Buttons*/}
                                          <div className="w-full flex items-center justify-end gap-x-4">
                                                 <div className="">
                                                        <StaticButton text={'Cancel'} handleClick={handleCancel} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
                                                 </div>
                                                 <div className="">
                                                        <SubmitButton
                                                               text={'Edit'}
                                                               rounded='rounded-full'
                                                               handleClick={handleCategoryEdit}
                                                        />
                                                 </div>

                                          </div>
                                   </form>
                            </section>
                     )}
              </>
       )
}

export default EditCategoryPage