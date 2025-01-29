import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';
import { useAuth } from '../../../../Context/Auth';
import { DropDown, LoaderLogin, NumberInput, StaticButton, SubmitButton, TextInput } from '../../../../Components/Components';


const EditTaxPage = () => {
       const { taxId } = useParams();
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchTax, loading: loadingTax, data: dataTax } = useGet({ url: `${apiUrl}/admin/settings/tax/item/${taxId}` });
       const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/admin/settings/tax/update/${taxId}` });

       const auth = useAuth();
       const navigate = useNavigate();

       const dropDownType = useRef();

       const [taxName, setTaxName] = useState('');
       const [taxAmount, setTaxAmount] = useState('');
       const [taxType] = useState([
              { id: "", name: '' },
              { id: "precentage", name: 'precentage' },
              { id: "value", name: 'value' }
       ])

       const [stateType, setStateType] = useState('Select Tax Type');
       const [typeName, setTypeName] = useState('');

       const [isOpenTaxType, setIsOpenTaxType] = useState(false);

       useEffect(() => {
              if (dataTax) {
                     setTaxName(dataTax.tax.name || '-')
                     setTaxAmount(dataTax.tax.amount || '-')
                     setStateType(dataTax.tax.type || '-')
                     setTypeName(dataTax.tax.type || '-')
              }

       }, [dataTax]);




       const handleOpentaxType = () => {
              setIsOpenTaxType(!isOpenTaxType)
       };
       const handleOpenOptiontaxType = () => setIsOpenTaxType(false);

       const handleSelecttaxType = (option) => {
              setTypeName(option.name);
              setStateType(option.id);
       };

       useEffect(() => {
              console.log('response', response)
              if (response) {
                     handleBack()
              }
       }, [response])

       const handleBack = () => {
              navigate(-1, { replace: true });
       }

       useEffect(() => {
              const handleClickOutside = (event) => {
                     if (
                            dropDownType.current && !dropDownType.current.contains(event.target)
                     ) {
                            setIsOpenTaxType(null);
                     }
              };

              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);


       const handleTaxEdit = (e) => {
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
              postData(formData, "Tax Edited Success")
       };

       return (
              <>
                     {loadingTax || loadingPost ? (
                            <>
                                   <div className="w-full flex justify-center items-center">
                                          <LoaderLogin />
                                   </div>
                            </>
                     ) : (
                            <section>
                                   <form onSubmit={handleTaxEdit}>
                                          {/* Content*/}
                                          <div className="sm:py-3 lg:py-6">
                                                 <div
                                                        className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4">
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
                                                                      openMenu={isOpenTaxType}
                                                                      handleOpenOption={handleOpenOptiontaxType}
                                                                      onSelectOption={handleSelecttaxType}
                                                                      options={taxType}
                                                                      border={false}
                                                               />
                                                        </div>

                                                 </div>


                                          </div>

                                          {/* Buttons*/}
                                          <div className="w-full flex items-center justify-end gap-x-4">
                                                 <div className="">
                                                        <StaticButton text={'Cancel'} handleClick={handleBack} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
                                                 </div>
                                                 <div className="">
                                                        <SubmitButton
                                                               text={'Edit'}
                                                               rounded='rounded-full'
                                                               handleClick={handleTaxEdit}
                                                        />
                                                 </div>

                                          </div>
                                   </form>
                            </section>
                     )}
              </>
       )
}

export default EditTaxPage