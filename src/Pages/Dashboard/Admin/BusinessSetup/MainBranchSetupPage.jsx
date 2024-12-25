import React, { useEffect, useRef, useState } from 'react'
import { DropDown, EmailInput, LoaderLogin, NumberInput, PasswordInput, StaticButton, StaticLoader, SubmitButton, TextInput, TitleSection, UploadInput } from '../../../../Components/Components';
import { Dropdown } from 'primereact/dropdown';
import { usePost } from '../../../../Hooks/usePostJson';
import { useGet } from '../../../../Hooks/useGet';
import axios from 'axios';
import { useAuth } from '../../../../Context/Auth';

const MainBranchSetupPage = ({ refetch }) => {
       const { refetch: refetchBranch, loading: loadingBranch, data: dataBranch } = useGet({ url: 'https://bcknd.food2go.online/admin/settings/business_setup/branch' });
       const [branch, setBranch] = useState([])

       const { postData, loadingPost, response } = usePost({ url: 'https://bcknd.food2go.online/admin/settings/business_setup/branch/add' });

       const {
              refetch: refetchCity,
              loading: loadingCity,
              data: dataCity,
            } = useGet({ url: "https://bcknd.food2go.online/admin/settings/city" });
            
       useEffect(() => {
              refetchBranch();
              refetchCity();

       }, [refetchBranch,refetchCity]);

     useEffect(() => {
        if (dataCity && dataCity.cities) {
          const cityNames = dataCity.cities.map((city) => ({ name: city.name }));
          setCities(cityNames);
        }
        console.log("data city ", dataCity?.cities?.[0]?.name);
      }, [dataCity]);

       useEffect(() => {
              if (dataBranch) {
                     setBranch(dataBranch)
                     setName(dataBranch.branches.name)
                     setAddress(dataBranch.branches.address)
                     setBranchCover(dataBranch.branches.cover_image_link)
                     setBranchImage(dataBranch.branches.image_link)
                     setLatitude(dataBranch.branches.latitude)
                     setCoverage(dataBranch.branches.coverage)
                     setLongitude(dataBranch.branches.longitude)
                     setPhone(dataBranch.branches.phone)
                     setEmail(dataBranch.branches.email)
                     setFoodPreparationTime(dataBranch.branches.food_preparion_time)
                     setCities([dataBranch.branches.city.name]);

                     console.log("data fetch branch : ", dataBranch);
              }
       }, [dataBranch])

     

       const auth = useAuth();
       const BranchImageRef = useRef();
       const BranchCoverRef = useRef();
       const CountriesRef = useRef();

       const [name, setName] = useState('');
       const [foodPreparationTime, setFoodPreparationTime] = useState('00:00');
       const [address, setAddress] = useState('');
       const [email, setEmail] = useState('');
       const [phone, setPhone] = useState('');
       const [password, setPassword] = useState('');
       const [stateCountries, setStateCountries] = useState('Select City');
       const [selectedCity, setSelectedCity] = useState('');
       const [city_id,setCityID] = useState();

       const [cities, setCities] = useState([
              // { name: 'Afghanistan' }, { name: 'Albania' }, { name: 'Algeria' }, { name: 'Andorra' }, { name: 'Angola' },
              // { name: 'Antigua and Barbuda' }, { name: 'Argentina' }, { name: 'Armenia' }, { name: 'Australia' }, { name: 'Austria' },
              // { name: 'Azerbaijan' }, { name: 'Bahamas' }, { name: 'Bahrain' }, { name: 'Bangladesh' }, { name: 'Barbados' },
       ]);
       const [branchImage, setBranchImage] = useState('');
       const [branchImageFile, setBranchImageFile] = useState(null);
       const [branchCover, setBranchCover] = useState('');
       const [branchCoverFile, setBranchCoverFile] = useState(null);

       const [latitude, setLatitude] = useState('');
       const [longitude, setLongitude] = useState('');
       const [coverage, setCoverage] = useState('');

       const handleChangeCity = (e) => {
              const selected = e.value;
              const city_id = selected.id;  // Extract city ID
              if (selected === dataBranch.branches.city.name) {
                     setSelectedCity(dataBranch.branches.city.name)
                     const city_id = dataBranch.branches.city.id;
                     setCityID(city_id);  // Store city_id in state
              }
        
          };
       //  post formdata in postdata
       const handleBranchAdd = async (e) => {
              e.preventDefault();

              // Validation for required fields
              if (!name) {
                     auth.toastError('Please enter first name');
                     return;
              }
              if (foodPreparationTime === '00:00') {
                     auth.toastError('Please enter preparation time');
                     return;
              }
              if (!address) {
                     auth.toastError('Please enter address');
                     return;
              }
              if (!email) {
                     auth.toastError('Please enter email');
                     return;
              }
              if (!phone) {
                     auth.toastError('Please enter phone number');
                     return;
              }
              // if (!password) {
              //        auth.toastError('Please enter password');
              //        return;
              // }
              if (!branchImageFile) {
                     auth.toastError('Please upload branch image file');
                     return;
              }
              if (!branchCoverFile) {
                     auth.toastError('Please upload branch cover file');
                     return;
              }
              if (!latitude) {
                     auth.toastError('Please enter latitude');
                     return;
              }
              if (!longitude) {
                     auth.toastError('Please enter longitude');
                     return;
              }
              if (!coverage) {
                     auth.toastError('Please enter coverage');
                     return;
              }

              const formData = new FormData();
              formData.append('name', name);
              formData.append('food_preparion_time', foodPreparationTime);
              formData.append('address', address);
              formData.append('email', email);
              formData.append('phone', phone);
              formData.append('password', password?password:"");
              formData.append('image', branchImageFile);  // File Upload
              formData.append('cover_image', branchCoverFile);  // File Upload
              formData.append('latitude', latitude);
              formData.append('longitude', longitude);
              formData.append('coverage', coverage);
              formData.append('status', 1);
              formData.append('city_id', city_id);

              postData(formData, 'Branch Added Success done');

              // try {
              //     const response = await 

              //     if (response?.status === 200) {
              //         auth.toastSuccess('Branch successfully added!');
              //     } else {
              //         auth.toastError('Failed to add branch. Please try again.');
              //     }

              // } catch (error) {
              //     auth.toastError('An error occurred. Please check your input.');
              //     console.error('Error during post:', error);
              // }


       };


       const handleBranchImageChange = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setBranchImageFile(file);
                     setBranchImage(file.name);
              }
       };

       const handleBranchImageClick = (ref) => {
              if (ref.current) {
                     ref.current.click();
              }
       };

       const handleBranchCoverChange = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setBranchCoverFile(file);
                     setBranchCover(file.name);
              }
       };

       const handleBranchCoverClick = (ref) => {
              if (ref.current) {
                     ref.current.click();
              }
       };
       const handleReset = () => {
              setName('');
              setFoodPreparationTime('00:00');
              setAddress('');
              setEmail('');
              setPhone('');
              setPassword('');
              setStateCountries('Select City');
              setBranchImage('');
              setBranchImageFile(null);
              setBranchCover('');
              setBranchCoverFile(null);
              setLatitude('');
              setLongitude('');
              setCoverage('');
       }

       return (
              <>
                     {loadingBranch || loadingPost ? (
                            <>
                                   <div className="w-full h-56 flex justify-center items-center">
                                          <LoaderLogin />
                                   </div>
                            </>
                     ) :
                         <div className="flex flex-col">
                               <form
                                   className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-4"
                                   onSubmit={handleBranchAdd}
                            >
                                   {/* Name */}
                                   <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">Name:</span>
                                          <TextInput
                                                 value={name}
                                                 onChange={(e) => setName(e.target.value)}
                                                 placeholder="Name"
                                          />
                                   </div>
                                   {/* Food Preparation Time */}
                                   <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">Food Preparation Time:</span>
                                          <CustomTimeInput
                                                 value={foodPreparationTime}
                                                 onChange={(newTime) => setFoodPreparationTime(newTime)}
                                          />
                                   </div>
                                   {/* Address */}
                                   <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">Address:</span>
                                          <TextInput
                                                 value={address}
                                                 onChange={(e) => setAddress(e.target.value)}
                                                 placeholder="Address"
                                          />
                                   </div>
                                   {/* Email */}
                                   <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">Email:</span>
                                          <EmailInput
                                                 backgound='white'
                                                 value={email}
                                                 onChange={(e) => setEmail(e.target.value)}
                                                 placeholder="Email"
                                          />
                                   </div>
                                   {/* Phone */}
                                   <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">Phone:</span>
                                          <NumberInput
                                                 value={phone}
                                                 onChange={(e) => setPhone(e.target.value)}
                                                 placeholder="Phone"
                                          />
                                   </div>
                                   {/* Password */}
                                   <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">Password:</span>
                                          <PasswordInput
                                                 backgound='white'
                                                 value={password}
                                                 onChange={(e) => setPassword(e.target.value)}
                                                 placeholder="Password"
                                          />
                                   </div>
                                   {/* Branch Image */}
                                   <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">Branch Photo:</span>
                                          <UploadInput
                                                 value={branchImage}
                                                 uploadFileRef={BranchImageRef}
                                                 placeholder="Branch Photo"
                                                 handleFileChange={handleBranchImageChange}
                                                 onChange={(e) => setBranchImage(e.target.value)}
                                                 onClick={() => handleBranchImageClick(BranchImageRef)}
                                          />
                                   </div>
                                   {/* Branch Image Cover*/}
                                   <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">Branch Cover Photo:</span>
                                          <UploadInput
                                                 value={branchCover}
                                                 uploadFileRef={BranchCoverRef}
                                                 placeholder="Branch Cover Photo"
                                                 handleFileChange={handleBranchCoverChange}
                                                 onChange={(e) => setBranchCover(e.target.value)}
                                                 onClick={() => handleBranchCoverClick(BranchCoverRef)}
                                          />
                                   </div>
                                   <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">Cities:</span>
                                          <Dropdown
                                                 value={selectedCity}
                                                 onChange={handleChangeCity}
                                                 options={cities}
                                                 optionLabel="name"
                                                 placeholder={stateCountries}
                                                 filter
                                                 className="w-full md:w-14rem" />
                                   </div>

                                   <TitleSection text={'Store Location'} />
                                   {/* Latitude */}
                                   <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">Latitude:</span>
                                          <TextInput
                                                 value={latitude}
                                                 onChange={(e) => setLatitude(e.target.value)}
                                                 placeholder="Latitude"
                                          />
                                   </div>
                                   {/* Longitude */}
                                   <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">Longitude:</span>
                                          <TextInput
                                                 value={longitude}
                                                 onChange={(e) => setLongitude(e.target.value)}
                                                 placeholder="Longitude"
                                          />
                                   </div>

                                   {/* Coverage */}
                                   <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">Coverage (km):</span>
                                          <TextInput
                                                 value={coverage}
                                                 onChange={(e) => setCoverage(e.target.value)}
                                                 placeholder="Coverage (km)"
                                          />
                                   </div>
                                   {/* Buttons */}
                                   <div className="w-full flex items-center justify-end gap-x-4 mb-32">
                                          <div className="">
                                                 <StaticButton text={'Reset'} handleClick={handleReset} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
                                          </div>
                                          <div className="">
                                                 <SubmitButton
                                                        text={'Submit'}
                                                        rounded='rounded-full'
                                                        handleClick={handleBranchAdd}
                                                 />
                                          </div>

                                   </div>
                            </form>

                         </div>
                     }
              </>
       )
}

export default MainBranchSetupPage


const CustomTimeInput = ({ value, onChange }) => {
       const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')); // Pad hours to 2 digits
       const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')); // Pad minutes to 2 digits

       const handleTimeChange = (type, newValue) => {
              const [currentHours, currentMinutes] = value.split(':');
              const updatedTime = type === 'hours'
                     ? `${newValue}:${currentMinutes}`
                     : `${currentHours}:${newValue}`;
              onChange(updatedTime);  // Ensure value is always in HH:mm format
       };

       return (
              <div className="flex gap-2 mt-3">
                     <span className="text-xl font-TextFontRegular text-thirdColor">
                            Hours:
                     </span><select
                            value={value.split(':')[0]}  // Get hours part from the value
                            onChange={(e) => handleTimeChange('hours', e.target.value)}
                            className="border rounded px-2 py-1"
                     >
                            {hours.map((hour) => (
                                   <option key={hour} value={hour}>{hour}</option>
                            ))}
                     </select>
                     <span className="text-xl font-TextFontRegular text-thirdColor">
                            Minutes:
                     </span>
                     <select
                            value={value.split(':')[1]}  // Get minutes part from the value
                            onChange={(e) => handleTimeChange('minutes', e.target.value)}
                            className="border rounded px-2 py-1"
                     >
                            {minutes.map((minute) => (
                                   <option key={minute} value={minute}>{minute}</option>
                            ))}
                     </select>
              </div>
       );
};