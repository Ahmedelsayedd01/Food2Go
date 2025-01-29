import React, { useEffect, useRef, useState } from 'react'
import { StaticButton, StaticLoader, SubmitButton, Switch, TextInput, UploadInput } from '../../../../../Components/Components';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useAuth } from '../../../../../Context/Auth';


const AddCitySection = ({ update, setUpdate }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { postData, loadingPost, response } = usePost({
    url: `${apiUrl}/admin/settings/city/add`
  });

  const auth = useAuth();

  const [cityName, setCityName] = useState('');
  const [cityStatus, setCityStatus] = useState(0);


  const handleCityStatus = () => {
    const currentState = cityStatus;
    { currentState === 0 ? setCityStatus(1) : setCityStatus(0) }
  }

  useEffect(() => {
    console.log('response', response)
    if (!loadingPost) {
      handleReset()
    }
    setUpdate(!update)
  }, [response])

  const handleReset = () => {
    setCityName('')
    setCityStatus(0)
  }

  const handleCityAdd = (e) => {
    e.preventDefault();


    if (!cityName) {
      auth.toastError('please Enter City Name')
      return;
    }
    const formData = new FormData();


    formData.append('name', cityName);
    formData.append('status', cityStatus);
    postData(formData, 'City Added Success');

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
          <form onSubmit={handleCityAdd}>
            <div className="sm:py-3 lg:py-6">
              <div
                className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4">
                {/* Name Input */}
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">City Name:</span>
                  <TextInput
                    value={cityName} // Access category_name property
                    onChange={(e) => setCityName(e.target.value)}
                    placeholder="payment Method Name"
                  />
                </div>
                <div className="sm:w-full xl:w-[30%] flex items-start justify-start gap-x-1 pt-10">
                  <div className='w-2/4 flex items-center justify-start gap-x-1'>
                    <span className="text-xl font-TextFontRegular text-thirdColor">Active:</span>
                    <Switch handleClick={handleCityStatus} checked={cityStatus} />
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
                  handleClick={handleCityAdd}
                />
              </div>

            </div>
          </form>
        </section>
      )}
    </>
  )
}

export default AddCitySection