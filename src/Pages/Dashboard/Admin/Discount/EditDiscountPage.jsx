import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../../Context/Auth';
import { DropDown, LoaderLogin, NumberInput, StaticButton, SubmitButton, TextInput } from '../../../../Components/Components';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';


const EditDiscountPage = () => {
       const { discountId } = useParams();
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchDiscount, loading: loadingDiscount, data: dataDiscount } = useGet({ url: `${apiUrl}/admin/settings/discount/item/${discountId}` });
       const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/admin/settings/discount/update/${discountId}` });

       const auth = useAuth();
       const navigate = useNavigate();

       const dropDownType = useRef();

       const [discountName, setDiscountName] = useState('');
       const [discountAmount, setDiscountAmount] = useState('');
       const [discountType] = useState([{ name: 'precentage' }, { name: 'value' }])

       const [stateType, setStateType] = useState('Select Discount Type');
       const [typeName, setTypeName] = useState('');

       const [isOpenDiscountType, setIsOpenDiscountType] = useState(false);

       useEffect(() => {
              if (dataDiscount) {
                     setDiscountName(dataDiscount.discount.name || '-')
                     setDiscountAmount(dataDiscount.discount.amount || '-')
                     setStateType(dataDiscount.discount.type || '-')
                     setTypeName(dataDiscount.discount.type || '-')
              }

       }, [dataDiscount]);




       const handleOpenDiscountType = () => {
              setIsOpenDiscountType(!isOpenDiscountType)
       };
       const handleOpenOptionDiscountType = () => setIsOpenDiscountType(false);

       const handleSelectDiscountType = (option) => {
              setTypeName(option.name);
              setStateType(option.name);
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
                            setIsOpenDiscountType(null);
                     }
              };

              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);


       const handleDiscountEdit = (e) => {
              e.preventDefault();


              if (!discountName) {
                     auth.toastError('please Enter Discount Name')
                     return;
              }
              if (!discountAmount) {
                     auth.toastError('please Enter Discount Amount')
                     return;
              }
              if (!typeName) {
                     auth.toastError('please Select Discount Type')
                     return;
              }

              const formData = new FormData();

              formData.append("name", discountName);
              formData.append("amount", discountAmount);
              formData.append("type", typeName);


              console.log(...formData.entries());
              postData(formData, "Discount Edited Success")
       };

       return (
              <>
                     {loadingDiscount || loadingPost ? (
                            <>
                                   <div className="w-full flex justify-center items-center">
                                          <LoaderLogin />
                                   </div>
                            </>
                     ) : (
                            <section>
                                   <form onSubmit={handleDiscountEdit}>
                                          {/* Content*/}
                                          <div className="sm:py-3 lg:py-6">
                                                 <div
                                                        className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4">
                                                        {/* Discount Name */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                               <span className="text-xl font-TextFontRegular text-thirdColor">Discount Name:</span>
                                                               <TextInput
                                                                      value={discountName}
                                                                      onChange={(e) => setDiscountName(e.target.value)}
                                                                      placeholder="Discount Name"
                                                               />
                                                        </div>
                                                        {/* Discount Amount */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                               <span className="text-xl font-TextFontRegular text-thirdColor">Discount Amount:</span>
                                                               <NumberInput
                                                                      value={discountAmount}
                                                                      onChange={(e) => setDiscountAmount(e.target.value)}
                                                                      placeholder="Discount Amount"
                                                               />
                                                        </div>
                                                        {/* Discount Types */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                               <span className="text-xl font-TextFontRegular text-thirdColor">Discount Type:</span>
                                                               <DropDown
                                                                      ref={dropDownType}
                                                                      handleOpen={handleOpenDiscountType}
                                                                      stateoption={stateType}
                                                                      openMenu={isOpenDiscountType}
                                                                      handleOpenOption={handleOpenOptionDiscountType}
                                                                      onSelectOption={handleSelectDiscountType}
                                                                      options={discountType}
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
                                                               handleClick={handleDiscountEdit}
                                                        />
                                                 </div>

                                          </div>
                                   </form>
                            </section>
                     )}
              </>
       )
}

export default EditDiscountPage