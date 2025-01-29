import React, { useEffect, useRef, useState } from 'react'
import { useGet } from '../../../../../Hooks/useGet';
import { usePost } from '../../../../../Hooks/usePostJson';
import { LoaderLogin, SubmitButton, TimeInput } from '../../../../../Components/Components';

const ResturantTimePage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { refetch: refetchResturantTime, loading: loadingResturantTime, data: dataResturantTime } = useGet({
    url: `${apiUrl}/admin/settings/resturant_time`
  });
  const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/admin/settings/resturant_time_update` });

  const [resturantTimeFrom, setResturantTimeFrom] = useState('');
  const [resturantTimeTo, setResturantTimeTo] = useState('');

  useEffect(() => {
    refetchResturantTime();
  }, [refetchResturantTime]);

  useEffect(() => {
    if (dataResturantTime && dataResturantTime.restuarant_time) {
      setResturantTimeFrom(dataResturantTime.restuarant_time.from || '');
      setResturantTimeTo(dataResturantTime.restuarant_time.to || '');
    }
  }, [dataResturantTime]); // Only run this effect when `data` changes

  const handleOpentaxType = () => {
    setIsOpentaxType(!isOpentaxType)
  };
  const handleOpenOptiontaxType = () => setIsOpentaxType(false);

  const handleSelecttaxType = (option) => {
    // setTaxType(option.name);
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


  const handleChangeResturantTime = (e) => {
    e.preventDefault();

    if (!resturantTimeFrom) {
      auth.toastError('please Enter Start Resturant Time')
      return;
    }
    if (!resturantTimeTo) {
      auth.toastError('please Enter End Resturant Time')
      return;
    }

    const formData = new FormData();

    formData.append("from", resturantTimeFrom);
    formData.append("to", resturantTimeTo);


    console.log(...formData.entries());
    postData(formData, "Resturant Time Changed Success")
  };
  return (
    <>
      {loadingPost || loadingResturantTime ? (
        <>
          <div className="w-full flex justify-center items-center">
            <LoaderLogin />
          </div>
        </>
      ) : (
        <section>
          <form onSubmit={handleChangeResturantTime}>

            <div className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4 mb-4">
              {/* Tax Types */}
              <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                <span className="text-xl font-TextFontRegular text-thirdColor">From:</span>
                <TimeInput
                  value={resturantTimeFrom}
                  onChange={(e) => setResturantTimeFrom(e.target.value)}
                />
              </div>
              {/* Tax Types */}
              <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                <span className="text-xl font-TextFontRegular text-thirdColor">To:</span>
                <TimeInput
                  value={resturantTimeTo}
                  onChange={(e) => setResturantTimeTo(e.target.value)}
                />
              </div>
            </div>

            {/* Buttons*/}
            <div className="w-full flex items-center justify-end gap-x-4">
              <div className="">
                <SubmitButton
                  text={'Change'}
                  rounded='rounded-full'
                  handleClick={handleChangeResturantTime}
                />
              </div>

            </div>
          </form>
        </section>
      )}
    </>
  )
}

export default ResturantTimePage