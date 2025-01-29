import React, { useEffect, useRef, useState } from 'react'
import { usePost } from '../../../../Hooks/usePostJson';
import { useAuth } from '../../../../Context/Auth';
import { DropDown, NumberInput, StaticButton, StaticLoader, SubmitButton, TextInput } from '../../../../Components/Components';


const AddTaxSection = ({ update, setUpdate }) => {
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { postData, loadingPost, response } = usePost({
              url: `${apiUrl}/admin/settings/tax/add`
       });

       const dropDownType = useRef();
       const auth = useAuth();

       const [taxName, setTaxName] = useState('');
       const [taxAmount, setTaxAmount] = useState('');
       const [taxType] = useState([
              { id: "", name: 'Select Tax Type' },
              { id: "precentage", name: 'precentage' },
              { id: "value", name: 'value' }
       ])

       const [stateType, setStateType] = useState('Select Tax Type');
       const [typeName, setTypeName] = useState('');

       const [isOpentaxType, setIsOpentaxType] = useState(false);


       const handleOpentaxType = () => {
              setIsOpentaxType(!isOpentaxType)
       };
       const handleOpenOptiontaxType = () => setIsOpentaxType(false);

       const handleSelecttaxType = (option) => {
              setTypeName(option.id);
              setStateType(option.name);
       };


       useEffect(() => {
              console.log('response', response)
              if (!loadingPost) {
                     handleReset()
              }
              setUpdate(!update)
       }, [response])

       const handleReset = () => {
              setTaxName('');
              setTaxAmount('');
              setStateType('Select Tax Type');
              setTypeName('');
       }


       useEffect(() => {
              const handleClickOutside = (event) => {
                     if (
                            dropDownType.current && !dropDownType.current.contains(event.target)
                     ) {
                            setIsOpentaxType(null);
                     }
              };

              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);



       const handleTaxAdd = (e) => {
              e.preventDefault();


              if (!taxName) {
                     auth.toastError('please Enter Tax Name')
                     return;
              }
              if (!taxAmount) {
                     auth.toastError('please Enter Tax Amount')
                     return;
              }
              if (!typeName) {
                     auth.toastError('please Select Tax Type')
                     return;
              }

              const formData = new FormData();

              formData.append("name", taxName);
              formData.append("amount", taxAmount);
              formData.append("type", typeName);


              console.log(...formData.entries());
              postData(formData, "Tax Added Success")
       };


       return (
              <>
                     {loadingPost ? (
                            <>
                                   <div className="w-full h-56 flex justify-center items-center">
                                          <StaticLoader />
                                   </div>
                            </>
                     ) : (
                            <section>
                                   <form onSubmit={handleTaxAdd}>

                                          <div className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4 mb-4">
                                                 {/* Tax Name */}
                                                 <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                        <span className="text-xl font-TextFontRegular text-thirdColor">Tax Name:</span>
                                                        <TextInput
                                                               value={taxName}
                                                               onChange={(e) => setTaxName(e.target.value)}
                                                               placeholder="Tax Name"
                                                        />
                                                 </div>
                                                 {/* Tax Amount */}
                                                 <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                        <span className="text-xl font-TextFontRegular text-thirdColor">Tax Amount:</span>
                                                        <NumberInput
                                                               value={taxAmount}
                                                               onChange={(e) => setTaxAmount(e.target.value)}
                                                               placeholder="Tax Amount"
                                                        />
                                                 </div>
                                                 {/* Tax Types */}
                                                 <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                        <span className="text-xl font-TextFontRegular text-thirdColor">Tax Type:</span>
                                                        <DropDown
                                                               ref={dropDownType}
                                                               handleOpen={handleOpentaxType}
                                                               stateoption={stateType}
                                                               openMenu={isOpentaxType}
                                                               handleOpenOption={handleOpenOptiontaxType}
                                                               onSelectOption={handleSelecttaxType}
                                                               options={taxType}
                                                               border={false}
                                                        />
                                                 </div>
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
                                                               handleClick={handleTaxAdd}
                                                        />
                                                 </div>

                                          </div>
                                   </form>
                            </section>
                     )}
              </>
       )
}

export default AddTaxSection