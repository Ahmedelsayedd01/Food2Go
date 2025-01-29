import React, { useEffect, useRef, useState } from 'react'

import { Dropdown } from 'primereact/dropdown';
import { useNavigate, useParams } from 'react-router-dom';
import { AddButton, DateInput, LoaderLogin, NumberInput, StaticButton, SubmitButton, Switch, TextInput, TimeInput, UploadInput } from '../../../../Components/Components';
import { DeleteIcon } from '../../../../Assets/Icons/AllIcons';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';
import { useAuth } from '../../../../Context/Auth';


const EditDealPage = () => {
  const { dealId } = useParams();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { refetch: refetchTranslation, loading: loadingTranslation, data: dataTranslation } = useGet({
    url: `${apiUrl}/admin/translation`
  });
  const { refetch: refetchDeal, loading: loadingDeal, data: dataDeal } = useGet({ url: `${apiUrl}/admin/deal/item/${dealId}` });
  const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/admin/deal/update/${dealId}` });

  const auth = useAuth();
  const navigate = useNavigate();

  const ImageRef = useRef();

  const [taps, setTaps] = useState([])
  const [currentTap, setCurrentTap] = useState(0);

  const [dealTitle, setDealTitle] = useState([]);
  const [dealDescription, setDealDescription] = useState([]);

  const [days] = useState(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

  const [times, setTimes] = useState([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [price, setPrice] = useState('');

  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const [daily, setDaily] = useState(0);
  const [activeDeal, setActiveDeal] = useState(0);

  useEffect(() => {
    refetchTranslation(); // Refetch data when the component mounts
    refetchDeal(); // Refetch data when the component mounts
  }, [refetchTranslation, refetchDeal]);

  useEffect(() => {
    if (dataTranslation && dataDeal) {

      const deal = dataDeal.deal;

      setTaps(dataTranslation.translation);

      setDealTitle(deal.deal_names || [])
      setDealDescription(deal.deal_descriptions || [])
      setTimes(deal.times || [])
      setStartDate(deal.start_date || '')
      setEndDate(deal.end_date || '')
      setPrice(deal.price || '')
      setImage(deal.image_link || "")
      setImageFile(deal.image_link || null)
      setDaily(deal.daily || 0)
      setActiveDeal(deal.status || 0)
    }
  }, [dataTranslation, dataDeal]);


  const handleAddDay = () => {
    console.log('times', times)
    const newTime = {
      day: "",
      from: "",
      to: "",
    }
    setTimes(prevTimes => [...prevTimes, newTime])
  }

  const handleTimeDay = (index, value) => {
    setTimes(prevTimes =>
      prevTimes.map((time, i) => i === index ? { ...time, day: value } : time)
    );
  };
  const handleTimeFrom = (index, value) => {
    setTimes(prevTimes =>
      prevTimes.map((time, i) => i === index ? { ...time, from: value } : time)
    );
  };

  const handleTimeTo = (index, value) => {
    setTimes(prevTimes =>
      prevTimes.map((time, i) => i === index ? { ...time, to: value } : time)
    );
  };

  const handleDeleteDay = (index) => {
    setTimes(prevTimes => prevTimes.filter((_, i) => i !== index));
  };


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

  const handleDaily = () => {
    setTimes([])
    const currentState = daily;
    { currentState === 0 ? setDaily(1) : setDaily(0) }
  }
  const handleActiveDeal = () => {
    const currentActive = activeDeal;
    { currentActive === 0 ? setActiveDeal(1) : setActiveDeal(0) }
  }

  const handleTap = (index) => {
    setCurrentTap(index)
  }

  useEffect(() => {
    console.log('dealTitle', dealTitle)
    console.log('dealDescription', dealDescription)
  }, [dealTitle, dealDescription])

  useEffect(() => {
    console.log('response', response)
    if (!loadingPost && response) {
      handleCancel()
    }
  }, [loadingPost, response])

  const handleCancel = () => {
    navigate(-1, { replace: true });
  };


  const handleDealEdit = (e) => {
    e.preventDefault();

    if (dealTitle.length === 0) {
      auth.toastError('please Enter Deal Title')
      return;
    }
    // if (dealTitle.length !== taps.length) {
    //   auth.toastError('please Enter All Deal Titles')
    //   return;
    // }
    if (dealDescription.length === 0) {
      auth.toastError('please Enter Deal Description')
      return;
    }
    // if (dealDescription.length !== taps.length) {
    //   auth.toastError('please Enter All Deal Descriptions')
    //   return;
    // }

    if (daily === 0) {

      if (times.length === 0) {
        auth.toastError('please Set Day')
        return;
      }
    }

    if (daily === 0) {
      // Loop through times to validate
      for (let i = 0; i < times.length; i++) {
        const time = times[i];

        // Check if 'day' is empty or falsy
        if (!time.day) {
          auth.toastError('Please Select Day');
          return;  // Stop further validation after showing the error
        }

        // Optionally, you could add more validation checks for 'from' and 'to' times if needed
        if (!time.from || !time.to) {
          auth.toastError('Please select both From and To times');
          return;
        }

        // Optional: Check if 'from' is later than 'to' (if that's a requirement)
        if (time.from > time.to) {
          auth.toastError('From time cannot be later than To time');
          return;
        }
      }
    }


    if (!startDate) {
      auth.toastError('please Enter Start Date')
      return;
    }
    if (!endDate) {
      auth.toastError('please Enter End Date')
      return;
    }
    if (!imageFile) {
      auth.toastError('please Set Deal Image')
      return;
    }
    if (!price) {
      auth.toastError('please Enter Price')
      return;
    }

    const formData = new FormData();

    dealTitle.forEach((name, index) => {
      formData.append(`deal_names[${index}][deal_title]`, name.deal_title);
      formData.append(`deal_names[${index}][tranlation_id]`, name.tranlation_id);
      formData.append(`deal_names[${index}][tranlation_name]`, name.tranlation_name);
    });

    dealDescription.forEach((name, index) => {
      formData.append(`deal_descriptions[${index}][deal_description]`, name.deal_description);
      formData.append(`deal_descriptions[${index}][tranlation_id]`, name.tranlation_id);
      formData.append(`deal_descriptions[${index}][tranlation_name]`, name.tranlation_name);
    });

    times.forEach((time, index) => {
      formData.append(`times[${index}][day]`, time.day);
      formData.append(`times[${index}][from]`, time.from);
      formData.append(`times[${index}][to]`, time.to);
    });

    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('image', imageFile);
    formData.append('price', price);
    formData.append('daily', daily);
    formData.append('status', activeDeal);


    postData(formData, 'Deal Edited Success');

  };
  return (
    <>
      {loadingTranslation || loadingDeal || loadingPost ? (
        <>
          <div className="w-full flex justify-center items-center">
            <LoaderLogin />
          </div>
        </>
      ) : (
        <section>
          <form onSubmit={handleDealEdit} className='mb-24'>
            {/* Taps */}
            <div className="w-full flex items-center justify-start py-2 gap-x-6">
              {taps.map((tap, index) => (
                <span
                  key={tap.id}
                  onClick={() => handleTap(index)}
                  className={`${currentTap === index ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor'}  pb-1 text - xl font - TextFontMedium transition - colors duration - 300 cursor - pointer hover: text - mainColor`}
                >
                  {tap.name}
                </span>

              ))}
            </div>
            {/* Content*/}
            <div className="sm:py-3 lg:py-6">
              {taps.map((tap, index) => (
                currentTap === index && (
                  <div
                    className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4"
                    key={tap.id}
                  >
                    {/* Product Name Input */}
                    <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                      <span className="text-xl font-TextFontRegular text-thirdColor">Product Name {tap.name}:</span>
                      <TextInput
                        value={dealTitle[index]?.deal_title} // Access category_name property
                        onChange={(e) => {
                          const inputValue = e.target.value; // Ensure this is a string
                          setDealTitle(prev => {
                            const updatedDealTitle = [...prev];

                            // Ensure the array is long enough
                            if (updatedDealTitle.length <= index) {
                              updatedDealTitle.length = index + 1; // Resize array
                            }

                            // Create or update the object at the current index
                            updatedDealTitle[index] = {
                              ...updatedDealTitle[index], // Retain existing properties if any
                              'tranlation_id': tap.id, // Use the ID from tap
                              'deal_title': inputValue, // Use the captured string value
                              'tranlation_name': tap.name || 'Default Name', // Use tap.name for tranlation_name
                            };

                            return updatedDealTitle;
                          });
                        }}
                        placeholder="Deal Title"
                      />
                    </div>

                    {/* Product Description Input */}
                    <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                      <span className="text-xl font-TextFontRegular text-thirdColor">Product Description {tap.name}:</span>
                      <TextInput
                        value={dealDescription[index]?.deal_description} // Access category_name property
                        onChange={(e) => {
                          const inputValue = e.target.value; // Ensure this is a string
                          setDealDescription(prev => {
                            const updatedDealDsetDealDescription = [...prev];

                            // Ensure the array is long enough
                            if (updatedDealDsetDealDescription.length <= index) {
                              updatedDealDsetDealDescription.length = index + 1; // Resize array
                            }

                            // Create or update the object at the current index
                            updatedDealDsetDealDescription[index] = {
                              ...updatedDealDsetDealDescription[index], // Retain existing properties if any
                              'tranlation_id': tap.id, // Use the ID from tap
                              'deal_description': inputValue, // Use the captured string value
                              'tranlation_name': tap.name || 'Default Name', // Use tap.name for tranlation_name
                            };

                            return updatedDealDsetDealDescription;
                          });
                        }}
                        placeholder="Deal Description"
                      />
                    </div>
                  </div>
                )
              ))}
            </div>

            {daily === 0 && (
              <>

                <div className="w-full flex flex-col">
                  {times.map((time, index) => (
                    <div key={index} className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-between border-b-4 pb-4">
                      {/* Days */}
                      <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                        <span className="text-xl font-TextFontRegular text-thirdColor">Day {index + 1}:</span>
                        <Dropdown
                          value={time.day || ''}
                          onChange={(e) => handleTimeDay(index, e.value)}
                          options={days}
                          optionLabel="day"
                          placeholder="Select a Day"
                          className="w-full md:w-14rem"
                        />
                      </div>
                      {/* From */}
                      <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                        <span className="text-xl font-TextFontRegular text-thirdColor">From:</span>
                        <TimeInput
                          value={time.from || ''}
                          onChange={(e) => handleTimeFrom(index, e.target.value)}
                        />
                      </div>
                      {/* To */}
                      <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                        <span className="text-xl font-TextFontRegular text-thirdColor">To:</span>
                        <TimeInput
                          value={time.to || ''}
                          onChange={(e) => handleTimeTo(index, e.target.value)}
                        />
                      </div>
                      <div className="sm:w-full lg:w-[4%] mt-8 px-3 py-3 rounded-lg flex items-center justify-center bg-red-300">
                        <button
                          type="button"
                          onClick={() => handleDeleteDay(index)}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {times.length < 7 && (
                  <div className="w-full mt-5 mb-3">
                    <AddButton
                      isWidth={true}
                      BgColor='mainColor'
                      Color='white'
                      iconColor='white'
                      Text='Add Day'
                      handleClick={handleAddDay}
                    />
                  </div>
                )}
              </>
            )}


            <div className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4">
              <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                <span className="text-xl font-TextFontRegular text-thirdColor">Start Date :</span>
                <DateInput
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  minDate={true}
                  maxDate={false}
                />
              </div>
              <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                <span className="text-xl font-TextFontRegular text-thirdColor">End Date :</span>
                <DateInput
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  minDate={true}
                  maxDate={false}
                />
              </div>
              {/* Deal Image */}
              <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                <span className="text-xl font-TextFontRegular text-thirdColor">Deal Image:</span>
                <UploadInput
                  value={image}
                  uploadFileRef={ImageRef}
                  placeholder="Deal Image"
                  handleFileChange={handleImageChange}
                  onChange={(e) => setImage(e.target.value)}
                  onClick={() => handleImageClick(ImageRef)}
                />
              </div>
              {/* Price */}
              <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                <span className="text-xl font-TextFontRegular text-thirdColor">Price :</span>
                <NumberInput
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                />
              </div>


              <div className="sm:w-full xl:w-[30%] flex items-start justify-start gap-x-1 pt-9">
                <div className='w-2/4 flex items-center justify-start gap-x-3'>
                  <span className="text-xl font-TextFontRegular text-thirdColor">Daily:</span>
                  <Switch handleClick={handleDaily} checked={daily} />
                </div>
                <div className='w-2/4 flex items-center justify-start gap-x-3'>
                  <span className="text-xl font-TextFontRegular text-thirdColor">Active:</span>
                  <Switch handleClick={handleActiveDeal} checked={activeDeal} />
                </div>
              </div>

            </div>


            {/* Buttons*/}
            <div className="w-full flex items-center justify-end gap-x-4 mt-4">
              <div className="">
                <StaticButton text={'Cancel'} handleClick={handleCancel} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
              </div>
              <div className="">
                <SubmitButton
                  text={'Edit'}
                  rounded='rounded-full'
                  handleClick={handleDealEdit}
                />
              </div>

            </div>
          </form>
        </section>
      )}
    </>
  )
}

export default EditDealPage