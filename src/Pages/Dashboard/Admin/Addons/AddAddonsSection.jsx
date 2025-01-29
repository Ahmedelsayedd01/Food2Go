import React, { useEffect, useRef, useState } from 'react'
import { DropDown, NumberInput, StaticButton, StaticLoader, SubmitButton, Switch, TextInput, UploadInput } from '../../../../Components/Components';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';
import { useAuth } from '../../../../Context/Auth';

import { MultiSelect } from 'primereact/multiselect';


const AddAddonsSection = ({ update, setUpdate }) => {
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchTranslation, loading: loadingTranslation, data: dataTranslation } = useGet({
              url: `${apiUrl}/admin/translation`
       });
       const { refetch: refetchAddons, loading: loadingAddons, data: dataAddons } = useGet({ url: `${apiUrl}/admin/addons` });
       const { postData, loadingPost, response } = usePost({
              url: `${apiUrl}/admin/addons/add`
       });

       const dropDownTax = useRef();
       const auth = useAuth();

       // const [taps, setTaps] = useState([{ id: 1, name: 'English(EN)' }, { id: 2, name: 'Arabic(Ar)' }, { id: 3, name: 'garman' }])
       const [taps, setTaps] = useState([])

       const [currentTap, setCurrentTap] = useState(0);

       const [addonsName, setAddonsName] = useState([]);
       const [addonPrice, setAddonPrice] = useState('');

       const [stateAddonTaxes, setStateAddonTaxes] = useState('Select Tax');
       const [addonTaxes, setAddonTaxes] = useState([])
       const [addonTaxesId, setAddonTaxesId] = useState('');
       const [addonTaxesName, setAddonTaxesName] = useState('');

       const [addonQuantity, setAddonQuantity] = useState(0);

       const [isOpenAddonTaxes, setIsOpenAddonTaxes] = useState(false);

       useEffect(() => {
              refetchTranslation(); // Refetch data when the component mounts
              refetchAddons(); // Refetch data when the component mounts
       }, [refetchTranslation, refetchAddons]);

       useEffect(() => {
              if (dataTranslation) {
                     setTaps(dataTranslation.translation);
              }
       }, [dataTranslation]);


       useEffect(() => {
              if (dataAddons) {
                     setAddonTaxes([{ id: '', name: 'Select Tax' }, ...dataAddons.taxes]);
              }
              console.log('dataAddons', dataAddons)
       }, [dataAddons]);



       const handleQuantityAddon = () => {
              const Active = addonQuantity;
              { Active === 0 ? setAddonQuantity(1) : setAddonQuantity(0) }
       }


       const handleOpenAddonTaxes = () => {
              setIsOpenAddonTaxes(!isOpenAddonTaxes);
       };

       const handleOpenOptionAddonTaxes = () => setIsOpenAddonTaxes(false);

       const handleSelectAddonTaxes = (option) => {
              setAddonTaxesId(option.id);
              setStateAddonTaxes(option.name);
              setAddonTaxesName(option.name);
       };

       const handleTap = (index) => {
              setCurrentTap(index)
       }

       useEffect(() => {
              console.log('addonName', addonsName)
       }, [addonsName])

       useEffect(() => {
              console.log('response', response)
              if (!loadingPost) {
                     handleReset()
              }
              setUpdate(!update)
       }, [response])

       const handleReset = () => {
              setAddonsName([])
              setAddonPrice('')
              setStateAddonTaxes('Select Tax')
              setAddonTaxesId('')
              setAddonTaxesName('')
              setAddonQuantity(0)
       }


       useEffect(() => {
              const handleClickOutside = (event) => {
                     // Close dropdown if clicked outside
                     if (
                            dropDownTax.current && !dropDownTax.current.contains(event.target)
                     ) {
                            setIsOpenAddonTaxes(null);
                     }
              };

              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);



       const handleAddonAdd = (e) => {
              e.preventDefault();

              if (addonsName.length === 0) {
                     auth.toastError('please Enter Addon Names')
                     return;
              }
              // if (addonsName.length !== taps.length) {
              //        auth.toastError('please Enter All Addon Names')
              //        return;
              // }

              // if (!addonTaxesId) {
              //        auth.toastError('please Select Addon Tax')
              //        return;
              // }
              if (!addonPrice) {
                     auth.toastError('please Enter Addon Price')
                     return;
              }
              const formData = new FormData();
              addonsName.forEach((name, index) => {
                     // Corrected the typo and added translation_id and translation_name
                     formData.append(`addon_names[${index}][addon_name]`, name.addon_name);
                     formData.append(`addon_names[${index}][tranlation_id]`, name.tranlation_id);
                     formData.append(`addon_names[${index}][tranlation_name]`, name.tranlation_name);
              });

              formData.append('price', addonPrice)
              formData.append('tax_id', addonTaxesId)
              formData.append('quantity_add', addonQuantity)

              postData(formData, 'Addon Added Success');

       };
       return (
              <>
                     {loadingTranslation || loadingAddons || loadingPost ? (
                            <>
                                   <div className="w-full h-56 flex justify-center items-center">
                                          <StaticLoader />
                                   </div>
                            </>
                     ) : (
                            <section>
                                   <form onSubmit={handleAddonAdd}>
                                          {/* Taps */}
                                          <div className="w-full flex items-center justify-start py-2 gap-x-6">
                                                 {taps.map((tap, index) => (
                                                        <span
                                                               key={tap.id}
                                                               onClick={() => handleTap(index)}
                                                               className={`${currentTap === index ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor'}  pb-1 text - xl font - TextFontMedium transition - colors duration - 300 cursor - pointer hover: text - mainColor`}
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
                                                                                    value={addonsName[index]?.addon_name} // Access addon_name property
                                                                                    onChange={(e) => {
                                                                                           const inputValue = e.target.value; // Ensure this is a string
                                                                                           setAddonsName(prev => {
                                                                                                  const updatedNames = [...prev];

                                                                                                  // Ensure the array is long enough
                                                                                                  if (updatedNames.length <= index) {
                                                                                                         updatedNames.length = index + 1; // Resize array
                                                                                                  }

                                                                                                  // Create or update the object at the current index
                                                                                                  updatedNames[index] = {
                                                                                                         ...updatedNames[index], // Retain existing properties if any
                                                                                                         'tranlation_id': tap.id, // Use the ID from tap
                                                                                                         'addon_name': inputValue, // Use the captured string value
                                                                                                         'tranlation_name': tap.name || 'Default Name', // Use tap.name for tranlation_name
                                                                                                  };

                                                                                                  return updatedNames;
                                                                                           });

                                                                                           console.log('addonsName', addonsName)
                                                                                    }}
                                                                                    placeholder="Addon Name"
                                                                             />
                                                                      </div>

                                                                      {/* Conditional Rendering for First Tab Only */}
                                                                      {currentTap === 0 && (
                                                                             <>
                                                                                    {/* Category Parent */}
                                                                                    <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                                           <span className="text-xl font-TextFontRegular text-thirdColor">Price:</span>
                                                                                           <NumberInput
                                                                                                  value={addonPrice}
                                                                                                  onChange={(e) => setAddonPrice(e.target.value)}
                                                                                                  placeholder={'price'}

                                                                                           />
                                                                                    </div>
                                                                                    {/* Category Priority */}
                                                                                    <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                                           <span className="text-xl font-TextFontRegular text-thirdColor">Tax:</span>
                                                                                           <DropDown
                                                                                                  ref={dropDownTax}
                                                                                                  handleOpen={handleOpenAddonTaxes}
                                                                                                  stateoption={stateAddonTaxes}
                                                                                                  openMenu={isOpenAddonTaxes}
                                                                                                  handleOpenOption={handleOpenOptionAddonTaxes}
                                                                                                  options={addonTaxes}
                                                                                                  onSelectOption={handleSelectAddonTaxes}
                                                                                                  border={false}
                                                                                           />
                                                                                    </div>
                                                                                    <div className='w-2/4 flex items-center justify-start gap-x-1'>
                                                                                           <span className="text-xl font-TextFontRegular text-thirdColor">Quantity:</span>
                                                                                           <Switch handleClick={handleQuantityAddon} checked={addonQuantity} />
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
                                                        <StaticButton text={'Reset'} handleClick={handleReset} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
                                                 </div>
                                                 <div className="">
                                                        <SubmitButton
                                                               text={'Submit'}
                                                               rounded='rounded-full'
                                                               handleClick={handleAddonAdd}
                                                        />
                                                 </div>

                                          </div>
                                   </form>
                            </section>
                     )}
              </>
       )
}

export default AddAddonsSection