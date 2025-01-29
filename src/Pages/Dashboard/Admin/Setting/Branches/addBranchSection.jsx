import React, { useEffect, useRef, useState } from 'react'
import { DropDown, EmailInput, NumberInput, PasswordInput, StaticButton, StaticLoader, SubmitButton, Switch, TextInput, TimeInput, UploadInput } from '../../../../../Components/Components';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useAuth } from '../../../../../Context/Auth';
import { useGet } from '../../../../../Hooks/useGet';



const AddBannerSection = ({ update, setUpdate }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { refetch: refetchCities, loading: loadingCities, data: dataCities } = useGet({
    url: `${apiUrl}/admin/settings/city`
  });
  const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/admin/branch/add` });

  const dropDownCities = useRef();
  const ImageRef = useRef();
  const CoverRef = useRef();
  const auth = useAuth();

  const [cities, setCities] = useState([])

  const [branchName, setBranchName] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [branchEmail, setBranchEmail] = useState('');
  const [branchPhone, setBranchPhone] = useState('');
  const [branchPassword, setBranchPassword] = useState('');
  const [foodPreparationTime, setFoodPreparationTime] = useState('00:00');
  const [branchLatitude, setBranchLatitude] = useState('');
  const [branchLongitude, setBranchLongitude] = useState('');
  const [branchCoverage, setBranchCoverage] = useState('');

  const [activeBranch, setActiveBranch] = useState(0);

  const [stateCity, setStateCity] = useState('Select City');
  const [cityId, setCityId] = useState('');
  const [isOpenCity, setIsOpenCity] = useState(false);

  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const [cover, setCover] = useState('');
  const [coverFile, setCoverFile] = useState(null);


  useEffect(() => {
    refetchCities(); // Refetch data when the component mounts
  }, [refetchCities]);


  useEffect(() => {
    if (dataCities) {
      setCities([{ id: '', name: 'Select City' }, ...dataCities.cities] || []);

    }
    console.log('cities', cities)
  }, [dataCities]);




  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(file.name);
    }
  };
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setCover(file.name);
    }
  };

  const handleImageClick = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };
  const handleCoverClick = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };


  const handleOpenCities = () => setIsOpenCity(!isOpenCity);
  const handleOpenOptionCites = () => setIsOpenCity(false);

  const handleSelectCity = (option) => {
    setCityId(option.id);
    setStateCity(option.name);
  };

  const handleStatusBranch = () => {
    const currentState = activeBranch;
    { currentState === 0 ? setActiveBranch(1) : setActiveBranch(0) }
  }


  useEffect(() => {
    console.log('response', response)
    if (!loadingPost) {
      handleReset()
    }
    // refetchCategory()
    setUpdate(!update)
  }, [response])

  const handleTimeChange = (e) => {
    const timeValue = e.target.value; // This will always be in "hh:mm" format from the browser
    setFoodPreparationTime(timeValue); // Save it directly
    console.log('Formatted Time:', timeValue); // Verify it's "hh:mm"
  };


  const handleReset = () => {
    setBranchName('')
    setBranchAddress('')
    setBranchEmail('')
    setBranchPhone('')
    setBranchPassword('')
    setFoodPreparationTime('00:00')
    setBranchLatitude('')
    setBranchLongitude('')
    setBranchCoverage('')
    setActiveBranch(0)
    setStateCity('Select City')
    setCityId('')
    setIsOpenCity(false)
    setImage('')
    setImageFile(null)
    setCover('')
    setCoverFile(null)
  }



  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown if clicked outside
      if (
        dropDownCities.current && !dropDownCities.current.contains(event.target)
      ) {
        setIsOpenCity(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  const handleBranchAdd = (e) => {
    e.preventDefault();

    if (!branchName) {
      auth.toastError('Please Enter Branch Name')
      return;
    }
    if (!branchAddress) {
      auth.toastError('Please Enter Branch Address')
      return;
    }
    if (!branchPhone) {
      auth.toastError('Please Enter Branch Phone')
      return;
    }
    if (!branchEmail) {
      auth.toastError('Please Enter Branch Email')
      return;
    }
    if (!branchEmail.includes('@')) {
      auth.toastError('Please Add @ after branch email')
      return;
    }
    if (!branchPassword) {
      auth.toastError('Please Enter Branch Password')
      return;
    }
    if (!branchCoverage) {
      auth.toastError('Please Enter Branch Coverage')
      return;
    }
    if (!cityId) {
      auth.toastError('Please Select City')
      return;
    }
    if (!branchLatitude) {
      auth.toastError('Please Enter Branch Latitude')
      return;
    }
    if (!branchLongitude) {
      auth.toastError('Please Enter Branch Longitude')
      return;
    }
    if (foodPreparationTime == '00:00') {
      auth.toastError('Please Enter Food Preparion Time')
      return;
    }
    if (!imageFile) {
      auth.toastError('Please Enter Image')
      return;
    }
    if (!coverFile) {
      auth.toastError('Please Enter Cover File')
      return;
    }


    const formData = new FormData();


    formData.append('name', branchName)
    formData.append('address', branchAddress)
    formData.append('email', branchEmail)
    formData.append('phone', branchPhone)
    formData.append('password', branchPassword)
    formData.append('food_preparion_time', foodPreparationTime)
    formData.append('latitude', branchLatitude)
    formData.append('longitude', branchLongitude)
    formData.append('coverage', branchCoverage)
    formData.append('city_id', cityId)
    formData.append('status', activeBranch)
    formData.append('image', imageFile)
    formData.append('cover_image', coverFile)



    postData(formData, 'Branch Added Success');

  };
  return (
    <>
      {loadingCities || loadingPost ? (
        <>
          <div className="w-full h-56 flex justify-center items-center">
            <StaticLoader />
          </div>
        </>
      ) : (
        <section>
          <form onSubmit={handleBranchAdd}>
            {/* Content*/}
            <div className="sm:py-3 lg:py-6">
              <div
                className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4">
                {/* Branch Name */}
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">Branch Name:</span>
                  <TextInput
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    placeholder="Branch Name"
                  />
                </div>
                {/* Branch Address */}
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">Branch Address:</span>
                  <TextInput
                    value={branchAddress}
                    onChange={(e) => setBranchAddress(e.target.value)}
                    placeholder="Branch Address"
                  />
                </div>
                {/* Branch Phone */}
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">Branch Phone:</span>
                  <NumberInput
                    value={branchPhone}
                    onChange={(e) => setBranchPhone(e.target.value)}
                    placeholder="Branch Phone"
                  />
                </div>
                {/* Branch Email */}
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">Branch Email:</span>
                  <TextInput
                    // backgound='white'
                    value={branchEmail}
                    onChange={(e) => setBranchEmail(e.target.value)}
                    placeholder="Branch Email"
                  />
                </div>
                {/* Branch Password */}
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">Branch Password:</span>
                  <PasswordInput
                    backgound='white'
                    value={branchPassword}
                    onChange={(e) => setBranchPassword(e.target.value)}
                    placeholder="Branch Password"
                  />
                </div>
                {/* Branch Coverage */}
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">Branch Coverage:</span>
                  <NumberInput
                    value={branchCoverage}
                    onChange={(e) => setBranchCoverage(e.target.value)}
                    placeholder="Branch Coverage"
                  />
                </div>
                {/* Cities */}
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">City:</span>
                  <DropDown
                    ref={dropDownCities}
                    handleOpen={handleOpenCities}
                    stateoption={stateCity}
                    openMenu={isOpenCity}
                    handleOpenOption={handleOpenOptionCites}
                    onSelectOption={handleSelectCity}
                    options={cities}
                    border={false}
                  />
                </div>
                {/* Branch Latitude */}
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">Branch Latitude:</span>
                  <NumberInput
                    value={branchLatitude}
                    onChange={(e) => setBranchLatitude(e.target.value)}
                    placeholder="Branch Latitude"
                  />
                </div>
                {/* Branch Longitude */}
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">Branch Longitude:</span>
                  <NumberInput
                    value={branchLongitude}
                    onChange={(e) => setBranchLongitude(e.target.value)}
                    placeholder="Branch Longitude"
                  />
                </div>

                {/* Branch Preparion Time */}
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">Food Preparation Time:</span>
                  <CustomTimeInput
                    value={foodPreparationTime}
                    onChange={(newTime) => setFoodPreparationTime(newTime)}
                  />
                </div>

                {/* Branch Image */}
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">Image:</span>
                  <UploadInput
                    value={image}
                    uploadFileRef={ImageRef}
                    placeholder="Category Image"
                    handleFileChange={handleImageChange}
                    onChange={(e) => setImage(e.target.value)}
                    onClick={() => handleImageClick(ImageRef)}
                  />
                </div>

                {/* Banner Cover Image */}
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">Cover Image:</span>
                  <UploadInput
                    value={cover}
                    uploadFileRef={CoverRef}
                    placeholder="Cover Image"
                    handleFileChange={handleCoverChange}
                    onChange={(e) => setCover(e.target.value)}
                    onClick={() => handleCoverClick(CoverRef)}
                  />
                </div>

                <div className="sm:w-full xl:w-[30%] flex items-center justify-start gap-3">
                  <span className="text-xl font-TextFontRegular text-thirdColor">Active:</span>
                  <Switch handleClick={handleStatusBranch} checked={activeBranch} />
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
                  handleClick={handleBranchAdd}
                />
              </div>

            </div>
          </form>
        </section>
      )}
    </>
  )
}

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
    <div className="flex gap-2">
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



export default AddBannerSection