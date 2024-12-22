import React, { useRef, useState } from 'react'
import { EmailInput, NumberInput, PasswordInput, StaticButton, SubmitButton, TextInput, TitleSection, UploadInput } from '../../../../Components/Components';

const MainBranchSetupPage = () => {
       const BranchImageRef = useRef();
       const BranchCoverRef = useRef();

       const [name, setName] = useState('');
       const [foodPreparationTime, setFoodPreparationTime] = useState('00:00');
       const [address, setAddress] = useState('');
       const [email, setEmail] = useState('');
       const [phone, setPhone] = useState('');
       const [password, setPassword] = useState('');
       
       const [branchImage, setBranchImage] = useState('');
       const [branchImageFile, setBranchImageFile] = useState(null);
       const [branchCover, setBranchCover] = useState('');
       const [branchCoverFile, setBranchCoverFile] = useState(null);

       const [latitude, setLatitude] = useState('');
       const [longitude, setLongitude] = useState('');
       const [coverage, setCoverage] = useState('');

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
                     <form
                            className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-4"
                            onSubmit={(e) => e.preventDefault()}
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
                                                 handleClick={(e) => e.preventDefault()}
                                          />
                                   </div>

                            </div>
                     </form>
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