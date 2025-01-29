import React, { useEffect, useRef, useState } from 'react'
import { EmailInput, NumberInput, PasswordInput, StaticButton, StaticLoader, SubmitButton, Switch, TextInput, UploadInput } from '../../../../../Components/Components'
import { usePost } from '../../../../../Hooks/usePostJson';
import { useAuth } from '../../../../../Context/Auth';

const AddCustomersSection = ({ update, setUpdate }) => {
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { postData, loadingPost, response } = usePost({
              url: `${apiUrl}/admin/customer/add`
       });

       const auth = useAuth();
       const ImageRef = useRef();

       const [customerFname, setCustomerFname] = useState('');
       const [customerLname, setCustomerLname] = useState('');
       const [customerPhone, setCustomerPhone] = useState('');
       const [customerEmail, setCustomerEmail] = useState('');
       const [customerPassword, setCustomerPassword] = useState('');

       const [customerImage, setCustomerImage] = useState('');
       const [customerImageFile, setCustomerImageFile] = useState(null);

       const [customerStatus, setCustomerStatus] = useState(0)

       const handleCustomerImageChange = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setCustomerImageFile(file);
                     setCustomerImage(file.name);
              }
       };
       const handleCustomerImageClick = (ref) => {
              if (ref.current) {
                     ref.current.click();
              }
       };
       const handleCustomerStatus = () => {
              const currentActive = customerStatus;
              { currentActive === 0 ? setCustomerStatus(1) : setCustomerStatus(0) }
       }

       const handleReset = () => {
              setCustomerFname('')
              setCustomerLname('')
              setCustomerPhone('')
              setCustomerImage('')
              setCustomerImageFile(null)
              setCustomerEmail('')
              setCustomerPassword('')
              setCustomerStatus(0)
       }

       useEffect(() => {
              if (!loadingPost) {
                     handleReset()
                     setUpdate(!update)
              }
       }, [response])

       const handleCustomerAdd = async (e) => {
              e.preventDefault();

              if (!customerFname) {
                     auth.toastError('please Enter First Name')
                     return;
              }
              if (!customerLname) {
                     auth.toastError('please Enter Last Name')
                     return;
              }
              if (!customerPhone) {
                     auth.toastError('please Enter The Phone')
                     return;
              }
              if (!customerImageFile) {
                     auth.toastError('please Enter Customer Photo')
                     return;
              }
              if (!customerEmail) {
                     auth.toastError('please Enter The Email')
                     return;
              }
              if (!customerEmail.includes('@')) {
                     auth.toastError("please Enter '@' After The Email")
                     return;
              }
              if (!customerPassword) {
                     auth.toastError('please Enter The Password')
                     return;
              }

              const formData = new FormData();

              formData.append('f_name', customerFname)
              formData.append('l_name', customerLname)
              formData.append('phone', customerPhone)
              formData.append('image', customerImageFile)
              formData.append('email', customerEmail)
              formData.append('password', customerPassword)
              formData.append('status', customerStatus)

              postData(formData, 'Customer Added Success');
       }


       return (
              <>
                     {loadingPost ? (
                            <div className="w-full h-56 flex justify-center items-center">
                                   <StaticLoader />
                            </div>
                     ) : (
                            <>
                                   <form
                                          className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-4"
                                          onSubmit={handleCustomerAdd}
                                   >
                                          {/* First Name */}
                                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">First Name:</span>
                                                 <TextInput
                                                        value={customerFname}
                                                        onChange={(e) => setCustomerFname(e.target.value)}
                                                        placeholder="First Name"
                                                 />
                                          </div>
                                          {/* Last Name */}
                                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Last Name:</span>
                                                 <TextInput
                                                        value={customerLname}
                                                        onChange={(e) => setCustomerLname(e.target.value)}
                                                        placeholder="Last Name"
                                                 />
                                          </div>
                                          {/* Customer Phone */}
                                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Customer Phone:</span>
                                                 <NumberInput
                                                        value={customerPhone}
                                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                                        placeholder="Delivery Phone"
                                                 />
                                          </div>
                                          {/* Customer Image */}
                                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Customer Photo:</span>
                                                 <UploadInput
                                                        value={customerImage}
                                                        uploadFileRef={ImageRef}
                                                        placeholder="Customer Photo"
                                                        handleFileChange={handleCustomerImageChange}
                                                        onChange={(e) => setCustomerImage(e.target.value)}
                                                        onClick={() => handleCustomerImageClick(ImageRef)}
                                                 />
                                          </div>
                                          {/* Email */}
                                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Email:</span>
                                                 <EmailInput
                                                        backgound='white'
                                                        value={customerEmail}
                                                        onChange={(e) => setCustomerEmail(e.target.value)}
                                                        placeholder="Email"
                                                 />
                                          </div>
                                          {/* Password */}
                                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Password:</span>
                                                 <PasswordInput
                                                        backgound='white'
                                                        value={customerPassword}
                                                        onChange={(e) => setCustomerPassword(e.target.value)}
                                                        placeholder="Password"
                                                 />
                                          </div>
                                          {/* Customer Status */}
                                          <div className="xl:w-[30%] flex items-center justify-start gap-x-4 ">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Customer Status:</span>
                                                 <Switch handleClick={handleCustomerStatus} checked={customerStatus} />
                                          </div>

                                          {/* Buttons */}
                                          <div className="w-full flex items-center justify-end gap-x-4">
                                                 <div className="">
                                                        <StaticButton text={'Reset'} handleClick={handleReset} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
                                                 </div>
                                                 <div className="">
                                                        <SubmitButton
                                                               text={'Add'}
                                                               rounded='rounded-full'
                                                               handleClick={handleCustomerAdd}
                                                        />
                                                 </div>
                                          </div>
                                   </form>
                            </>
                     )
                     }
              </>
       )
}

export default AddCustomersSection;