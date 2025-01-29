import React, { useEffect, useRef, useState } from 'react'
import { StaticButton, StaticLoader, SubmitButton, Switch, TextInput, UploadInput } from '../../../../../Components/Components';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useAuth } from '../../../../../Context/Auth';


const AddPaymentMethodSection = ({ update, setUpdate }) => {
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { postData, loadingPost, response } = usePost({
              url: `${apiUrl}/admin/settings/payment_methods/add`
       });

       const ImageRef = useRef();
       const auth = useAuth();

       const [paymentMethodName, setPaymentMethodName] = useState('');
       const [paymentMethodDescription, setPaymentMethodDescription] = useState('');
       const [image, setImage] = useState('');
       const [imageFile, setImageFile] = useState(null);
       const [paymentMethodStatus, setPaymentMethodStatus] = useState(0);

       const handleImageChange = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setImageFile(file);
                     setImage(file.name);
              }
       };

       const handleImageClick = (ref) => {
              if (ref.current) {
                     ref.current.click();
              }
       };

       const handlePaymentMethodStatus = () => {
              const currentState = paymentMethodStatus;
              { currentState === 0 ? setPaymentMethodStatus(1) : setPaymentMethodStatus(0) }
       }
       useEffect(() => {
              console.log('response', response)
              if (!loadingPost) {
                     handleReset()
              }
              setUpdate(!update)
       }, [response])

       const handleReset = () => {
              setPaymentMethodName('')
              setPaymentMethodDescription('')
              setImage('')
              setImageFile(null)
              setPaymentMethodStatus(0)
       }

       const handlePaymentMethodAdd = (e) => {
              e.preventDefault();


              if (!paymentMethodName) {
                     auth.toastError('please Enter Payment Method Name')
                     return;
              }
              if (!paymentMethodDescription) {
                     auth.toastError('please Enter Payment Method Description')
                     return;
              }
              if (!imageFile) {
                     auth.toastError('please Set Payment Method Image')
                     return;
              }
              const formData = new FormData();


              formData.append('name', paymentMethodName);
              formData.append('description', paymentMethodDescription);
              formData.append('logo', imageFile);
              formData.append('status', paymentMethodStatus);
              postData(formData, 'Payment Method Added Success');

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
                                   <form onSubmit={handlePaymentMethodAdd}>
                                          <div className="sm:py-3 lg:py-6">
                                                 <div
                                                        className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4">
                                                        {/* Name Input */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                               <span className="text-xl font-TextFontRegular text-thirdColor">payment Method Name:</span>
                                                               <TextInput
                                                                      value={paymentMethodName} // Access category_name property
                                                                      onChange={(e) => setPaymentMethodName(e.target.value)}
                                                                      placeholder="payment Method Name"
                                                               />
                                                        </div>
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                               <span className="text-xl font-TextFontRegular text-thirdColor">payment Method Description:</span>
                                                               <TextInput
                                                                      value={paymentMethodDescription} // Access category_Des property
                                                                      onChange={(e) => setPaymentMethodDescription(e.target.value)}
                                                                      placeholder="payment Method Description"
                                                               />
                                                        </div>
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                               <span className="text-xl font-TextFontRegular text-thirdColor">Payment Method Image:</span>
                                                               <UploadInput
                                                                      value={image}
                                                                      uploadFileRef={ImageRef}
                                                                      placeholder="payment Method Image"
                                                                      handleFileChange={handleImageChange}
                                                                      onChange={(e) => setImage(e.target.value)}
                                                                      onClick={() => handleImageClick(ImageRef)}
                                                               />
                                                        </div>
                                                        <div className="sm:w-full xl:w-[30%] flex items-start justify-start gap-x-1 pt-8">
                                                               <div className='w-2/4 flex items-center justify-start gap-x-1'>
                                                                      <span className="text-xl font-TextFontRegular text-thirdColor">Status:</span>
                                                                      <Switch handleClick={handlePaymentMethodStatus} checked={paymentMethodStatus} />
                                                               </div>
                                                        </div>
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
                                                               handleClick={handlePaymentMethodAdd}
                                                        />
                                                 </div>

                                          </div>
                                   </form>
                            </section>
                     )}
              </>
       )
}

export default AddPaymentMethodSection