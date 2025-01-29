import React, { useEffect, useRef, useState } from 'react'
import { StaticButton, StaticLoader, SubmitButton, Switch, TextInput, UploadInput } from '../../../../../Components/Components';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useAuth } from '../../../../../Context/Auth';
import { useNavigate, useParams } from 'react-router-dom';
import { useGet } from '../../../../../Hooks/useGet';


const EditCityPage = () => {
       const { cityId } = useParams();
       const navigate = useNavigate();
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchCity, loading: loadingCity, data: dataCity } = useGet({ url: `${apiUrl}/admin/settings/city/item/${cityId}` });
       const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/admin/settings/city/update/${cityId}` });

       const auth = useAuth();

       const [cityName, setCityName] = useState('');
       const [cityStatus, setCityStatus] = useState(0);

       useEffect(() => {
              refetchCity();
       }, [refetchCity]);

       useEffect(() => {
              if (dataCity && dataCity.city) {
                     setCityName(dataCity.city.name);
                     setCityStatus(dataCity.city.status);
              }
              console.log('dataCity', dataCity)
       }, [dataCity]); // Only run this effect when `data` changes


       const handleCityStatus = () => {
              const currentState = cityStatus;
              { currentState === 0 ? setCityStatus(1) : setCityStatus(0) }
       }

       useEffect(() => {
              console.log('response', response)
              if (response) {
                     handleBack()
              }
       }, [response])

       const handleBack = () => {
              navigate(-1, { replace: true });
       }

       const handleCityEdit = (e) => {
              e.preventDefault();


              if (!cityName) {
                     auth.toastError('please Enter City Name')
                     return;
              }
              const formData = new FormData();


              formData.append('name', cityName);
              formData.append('status', cityStatus);
              postData(formData, 'City Edited Success');

       };
       return (
              <>
                     {loadingCity || loadingPost ? (
                            <>
                                   <div className="w-full h-56 flex justify-center items-center">
                                          <StaticLoader />
                                   </div>
                            </>
                     ) : (
                            <section>
                                   <form onSubmit={handleCityEdit}>
                                          <div className="sm:py-3 lg:py-6">
                                                 <div
                                                        className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4">
                                                        {/* Name Input */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                               <span className="text-xl font-TextFontRegular text-thirdColor">City Name:</span>
                                                               <TextInput
                                                                      value={cityName}
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
                                                        <StaticButton text={'Cancel'} handleClick={handleBack} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
                                                 </div>
                                                 <div className="">
                                                        <SubmitButton
                                                               text={'Edit'}
                                                               rounded='rounded-full'
                                                               handleClick={handleCityEdit}
                                                        />
                                                 </div>

                                          </div>
                                   </form>
                            </section>
                     )}
              </>
       )
}

export default EditCityPage