import React, { useEffect, useRef, useState } from 'react'
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';
import { DropDown, LoaderLogin, StaticLoader, SubmitButton, TextInput } from '../../../../Components/Components';

const TaxTypePage = () => {
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchTaxType, loading: loadingTaxType, data: dataTaxType } = useGet({
              url: `${apiUrl}/admin/settings/tax_type`
       });
       const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/admin/settings/tax_update` });

       const dropDownType = useRef();
       const [taxType, setTaxType] = useState('');
       const [stateType, setStateType] = useState('Select Tax Type');
       const [taxTypes] = useState([
              { id: "", name: 'Select Tax Type' },
              { id: "included", name: 'included' },
              { id: "excluded", name: 'excluded' }
       ])


       const [isOpentaxType, setIsOpentaxType] = useState(false);

       useEffect(() => {
              console.log('response', response)
              if (!loadingPost) {
                     setStateType(stateType)
                     setTaxType(stateType)
              }
       }, [response])

       useEffect(() => {
              refetchTaxType();
       }, [refetchTaxType]);

       useEffect(() => {
              if (dataTaxType && dataTaxType.tax) {
                     setTaxType(dataTaxType.tax);
                     setStateType(dataTaxType.tax);
              }
       }, [dataTaxType]); // Only run this effect when `data` changes

       const handleOpentaxType = () => {
              setIsOpentaxType(!isOpentaxType)
       };
       const handleOpenOptiontaxType = () => setIsOpentaxType(false);

       const handleSelecttaxType = (option) => {
              setTaxType(option.id);
              setStateType(option.name);
       };



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


       const handleChangeTax = (e) => {
              e.preventDefault();

              if (!taxType) {
                     auth.toastError('please Select Tax Type')
                     return;
              }

              const formData = new FormData();

              formData.append("tax", taxType);


              console.log(...formData.entries());
              postData(formData, "Tax Type Changed Success")
       };
       return (
              <>
                     {loadingPost || loadingTaxType ? (
                            <>
                                   <div className="w-full flex justify-center items-center">
                                          <LoaderLogin />
                                   </div>
                            </>
                     ) : (
                            <section>
                                   <form onSubmit={handleChangeTax}>

                                          <div className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4 mb-4">
                                                 {/* Tax Name */}
                                                 <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                        <span className="text-xl font-TextFontRegular text-thirdColor">Your Tax Type:</span>
                                                        <span className='w-full rounded-2xl outline-none p-2 py-3 shadow
                                                               font-TextFontRegular text-2xl bg-white text-thirdColor
                                                               valueInput'>
                                                               {taxType}
                                                        </span>
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
                                                               options={taxTypes}
                                                               border={false}
                                                        />
                                                 </div>
                                          </div>

                                          {/* Buttons*/}
                                          <div className="w-full flex items-center justify-end gap-x-4">
                                                 <div className="">
                                                        <SubmitButton
                                                               text={'Change'}
                                                               rounded='rounded-full'
                                                               handleClick={handleChangeTax}
                                                        />
                                                 </div>

                                          </div>
                                   </form>
                            </section >
                     )}
              </>
       )
}

export default TaxTypePage