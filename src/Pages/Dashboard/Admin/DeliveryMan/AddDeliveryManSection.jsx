import React, { useEffect, useRef, useState } from 'react'
import { DropDown, EmailInput, NumberInput, PasswordInput, StaticButton, StaticLoader, SubmitButton, Switch, TextInput, UploadInput } from '../../../../Components/Components'
import { usePost } from '../../../../Hooks/usePostJson';
import { useAuth } from '../../../../Context/Auth';

const AddDeliveryManSection = ({ data, refetch, setRefetch }) => {
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { postData, loadingPost, response } = usePost({
              url: `${apiUrl}/admin/delivery/add`
       });

       const auth = useAuth();
       const BranchesRef = useRef();
       const IdentityTypeRef = useRef();
       const DeliveryImageRef = useRef();
       const IdentityImageRef = useRef();

       const [deliveryFname, setDeliveryFname] = useState('');
       const [deliveryLname, setDeliveryLname] = useState('');
       const [deliveryPhone, setDeliveryPhone] = useState('');

       const [deliveryImage, setDeliveryImage] = useState('');
       const [deliveryImageFile, setDeliveryImageFile] = useState(null);

       const [deliveryEmail, setDeliveryEmail] = useState('')
       const [deliveryPassword, setDeliveryPassword] = useState('')
       const [deliveryStatus, setDeliveryStatus] = useState(0)
       const [chatStatus, setChatStatus] = useState(0)
       const [phoneStatus, setPhoneStatus] = useState(0)

       const [deliveryBranchState, setDeliveryBranchState] = useState('Select Branche')
       const [deliveryBranchName, setDeliveryBranchName] = useState('')
       const [deliveryBranchId, setDeliveryBranchId] = useState('')

       const [identityTypes, setIdentityTypes] = useState([{ id: '', name: 'Select Identity Type' }, { id: 'Card', name: 'Card' }, { id: 'Passport', name: 'Passport' }])
       const [identityTypeState, setIdentityTypeState] = useState('Select Identity Type')
       const [identityTypeName, setIdentityTypeName] = useState('')

       const [identityNumber, setIdentityNumber] = useState('')

       const [identityImage, setIdentityImage] = useState('');
       const [identityImageFile, setIdentityImageFile] = useState(null);

       const [isOpenBranch, setIsOpenBranch] = useState(false)
       const [isOpenIdentityType, setIsOpenIdentityType] = useState(false)


       const handleOpenBranch = () => {
              setIsOpenBranch(!isOpenBranch);
              setIsOpenIdentityType(false);
       };
       const handleOpenOptionBranch = () => setIsOpenBranch(false);

       const handleSelectBranch = (option) => {
              setDeliveryBranchId(option.id);
              setDeliveryBranchState(option.name);
              setDeliveryBranchName(option.name);
       };

       const handleOpenIdentityType = () => {
              setIsOpenBranch(false);
              setIsOpenIdentityType(!isOpenIdentityType);
       };
       const handleOpenOptionIdentityType = () => setIsOpenIdentityType(false);

       const handleSelectIdentityType = (option) => {
              setIdentityTypeState(option.name);
              setIdentityTypeName(option.id);
       };


       const handleDeliveryImageChange = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setDeliveryImageFile(file);
                     setDeliveryImage(file.name);
              }
       };
       const handleIdentityImageChange = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setIdentityImageFile(file);
                     setIdentityImage(file.name);
              }
       };

       const handleDeliveryImageClick = (ref) => {
              if (ref.current) {
                     ref.current.click();
              }
       };
       const handleIdentityImageClick = (ref) => {
              if (ref.current) {
                     ref.current.click();
              }
       };

       const handleDeliveryStatus = () => {
              const currentActive = deliveryStatus;
              { currentActive === 0 ? setDeliveryStatus(1) : setDeliveryStatus(0) }
       }
       const handleChatStatus = () => {
              const currentActive = chatStatus;
              { currentActive === 0 ? setChatStatus(1) : setChatStatus(0) }
       }
       const handlePhoneStatus = () => {
              const currentActive = phoneStatus;
              { currentActive === 0 ? setPhoneStatus(1) : setPhoneStatus(0) }
       }

       useEffect(() => {
              const handleClickOutside = (event) => {
                     // Close dropdown if clicked outside
                     if (
                            BranchesRef.current && !BranchesRef.current.contains(event.target)
                     ) {
                            setIsOpenBranch(null);
                     }
              };

              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);

       const handleReset = () => {
              setDeliveryFname('')
              setDeliveryLname('')
              setDeliveryPhone('')
              setDeliveryImage('')
              setDeliveryImageFile(null)
              setDeliveryEmail('')
              setDeliveryPassword('')
              setDeliveryStatus(0)
              setChatStatus(0)
              setPhoneStatus(0)
              setDeliveryBranchState('Select Branche')
              setDeliveryBranchName('')
              setDeliveryBranchId('')
              setIdentityTypeState('Select Identity Type')
              setIdentityTypeName('')
              setIdentityNumber('')
              setIdentityImage('')
              setIdentityImageFile(null)
       }
       useEffect(() => {
              if (!loadingPost) {
                     handleReset()
                     setRefetch(!refetch)
              }
       }, [response])


       const handleDeliveryAdd = async (e) => {
              e.preventDefault();

              if (!deliveryFname) {
                     auth.toastError('please Enter First Name')
                     return;
              }
              if (!deliveryLname) {
                     auth.toastError('please Enter Last Name')
                     return;
              }
              if (!deliveryPhone) {
                     auth.toastError('please Enter The Phone')
                     return;
              }
              if (!deliveryBranchId) {
                     auth.toastError('please Select Branch')
                     return;
              }
              if (!deliveryImageFile) {
                     auth.toastError('please Enter Delivery Photo')
                     return;
              }
              if (!identityTypeName) {
                     auth.toastError('please Select Identity')
                     return;
              }
              if (!identityImageFile) {
                     auth.toastError('please Enter Identity Photo')
                     return;
              }
              if (!identityNumber) {
                     auth.toastError('please Enter Identity Number')
                     return;
              }
              if (!deliveryEmail) {
                     auth.toastError('please Enter The Email')
                     return;
              }
              if (!deliveryEmail.includes('@')) {
                     auth.toastError("please Enter '@' After The Email")
                     return;
              }
              if (!deliveryPassword) {
                     auth.toastError('please Enter The Password')
                     return;
              }

              const formData = new FormData();

              formData.append('f_name', deliveryFname)
              formData.append('l_name', deliveryLname)
              formData.append('phone', deliveryPhone)
              formData.append('image', deliveryImageFile)
              formData.append('email', deliveryEmail)
              formData.append('password', deliveryPassword)
              formData.append('branch_id', deliveryBranchId)
              formData.append('identity_type', identityTypeName)
              formData.append('identity_number', identityNumber)
              formData.append('identity_image', identityImageFile)
              formData.append('chat_status', chatStatus)
              formData.append('phone_status', phoneStatus)
              formData.append('status', deliveryStatus)

              postData(formData, 'Delivery Added Success');
       }


       return (
              <>
                     {data.length === 0 || loadingPost ? (
                            <div className="w-full h-56 flex justify-center items-center">
                                   <StaticLoader />
                            </div>
                     ) : (
                            <>
                                   <form
                                          className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-4"
                                          onSubmit={handleDeliveryAdd}
                                   >
                                          {/* First Name */}
                                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">First Name:</span>
                                                 <TextInput
                                                        value={deliveryFname}
                                                        onChange={(e) => setDeliveryFname(e.target.value)}
                                                        placeholder="First Name"
                                                 />
                                          </div>
                                          {/* Last Name */}
                                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Last Name:</span>
                                                 <TextInput
                                                        value={deliveryLname}
                                                        onChange={(e) => setDeliveryLname(e.target.value)}
                                                        placeholder="Last Name"
                                                 />
                                          </div>
                                          {/* Delivery Phone */}
                                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Delivery Phone:</span>
                                                 <NumberInput
                                                        value={deliveryPhone}
                                                        onChange={(e) => setDeliveryPhone(e.target.value)}
                                                        placeholder="Delivery Phone"
                                                 />
                                          </div>
                                          {/* Branches */}
                                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Branches:</span>
                                                 <DropDown
                                                        ref={BranchesRef}
                                                        handleOpen={handleOpenBranch}
                                                        stateoption={deliveryBranchState}
                                                        openMenu={isOpenBranch}
                                                        handleOpenOption={handleOpenOptionBranch}
                                                        options={data}
                                                        onSelectOption={handleSelectBranch}
                                                        border={false}
                                                 />
                                          </div>
                                          {/* Delivery Image */}
                                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Delivery Photo:</span>
                                                 <UploadInput
                                                        value={deliveryImage}
                                                        uploadFileRef={DeliveryImageRef}
                                                        placeholder="Delivery Photo"
                                                        handleFileChange={handleDeliveryImageChange}
                                                        onChange={(e) => setDeliveryImage(e.target.value)}
                                                        onClick={() => handleDeliveryImageClick(DeliveryImageRef)}
                                                 />
                                          </div>
                                          {/* Identity Type */}
                                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Identity Type:</span>
                                                 <DropDown
                                                        ref={IdentityTypeRef}
                                                        handleOpen={handleOpenIdentityType}
                                                        stateoption={identityTypeState}
                                                        openMenu={isOpenIdentityType}
                                                        handleOpenOption={handleOpenOptionIdentityType}
                                                        options={identityTypes}
                                                        onSelectOption={handleSelectIdentityType}
                                                        border={false}
                                                 />
                                          </div>
                                          {/* Identity Image */}
                                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Identity Photo:</span>
                                                 <UploadInput
                                                        value={identityImage}
                                                        uploadFileRef={IdentityImageRef}
                                                        placeholder="Identity Photo"
                                                        handleFileChange={handleIdentityImageChange}
                                                        onChange={(e) => setIdentityImage(e.target.value)}
                                                        onClick={() => handleIdentityImageClick(IdentityImageRef)}
                                                 />
                                          </div>
                                          {/* Identity Number */}
                                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Identity Number:</span>
                                                 <NumberInput
                                                        value={identityNumber}
                                                        onChange={(e) => setIdentityNumber(e.target.value)}
                                                        placeholder="Identity Number"
                                                 />
                                          </div>
                                          {/* Email */}
                                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Email:</span>
                                                 <EmailInput
                                                        backgound='white'
                                                        value={deliveryEmail}
                                                        onChange={(e) => setDeliveryEmail(e.target.value)}
                                                        placeholder="Email"
                                                 />
                                          </div>
                                          {/* Password */}
                                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Password:</span>
                                                 <PasswordInput
                                                        backgound='white'
                                                        value={deliveryPassword}
                                                        onChange={(e) => setDeliveryPassword(e.target.value)}
                                                        placeholder="Password"
                                                 />
                                          </div>
                                          {/* Chat Status */}
                                          <div className="xl:w-[30%] flex items-center justify-start gap-x-4 lg:pt-10">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Chat Status:</span>
                                                 <Switch handleClick={handleChatStatus} checked={chatStatus} />
                                          </div>
                                          {/* Phone Status */}
                                          <div className="xl:w-[30%] flex items-center justify-start gap-x-4 lg:pt-10">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Phone Status:</span>
                                                 <Switch handleClick={handlePhoneStatus} checked={phoneStatus} />
                                          </div>
                                          {/* delivery Status */}
                                          <div className="xl:w-[30%] flex items-center justify-start gap-x-4 ">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Delivery Status:</span>
                                                 <Switch handleClick={handleDeliveryStatus} checked={deliveryStatus} />
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
                                                               handleClick={handleDeliveryAdd}
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

export default AddDeliveryManSection