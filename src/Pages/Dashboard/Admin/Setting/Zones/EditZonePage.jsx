import React, { useEffect, useRef, useState } from 'react'
import { DropDown, LoaderLogin, NumberInput, StaticButton, StaticLoader, SubmitButton, Switch, TextInput } from '../../../../../Components/Components';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useAuth } from '../../../../../Context/Auth';
import { useGet } from '../../../../../Hooks/useGet';
import { useNavigate, useParams } from 'react-router-dom';



const EditZonePage = () => {
       const { zoneId } = useParams();
       const navigate = useNavigate();

       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchCities, loading: loadingCities, data: dataCities } = useGet({
              url: `${apiUrl}/admin/settings/city`
       });
       const { refetch: refetchBranches, loading: loadingBranches, data: dataBranches } = useGet({ url: `${apiUrl}/admin/branch` });
       const { refetch: refetchZone, loading: loadingZone, data: dataZone } = useGet({ url: `${apiUrl}/admin/settings/zone/item/${zoneId}` });
       const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/admin/settings/zone/update/${zoneId}` });

       const dropDownCities = useRef();
       const dropDownBranches = useRef();
       const auth = useAuth();

       const [cities, setCities] = useState([])
       const [branches, setBranches] = useState([])
       const [filterBranches, setFilterBranches] = useState([])
       const [zone, setZone] = useState([])

       const [zoneName, setZoneName] = useState('');
       const [zonePrice, setZonePrice] = useState('');

       const [stateCity, setStateCity] = useState('Select City');
       const [cityId, setCityId] = useState('');
       const [isOpenCity, setIsOpenCity] = useState(false);

       const [stateBranch, setStateBranch] = useState('Select Branch');
       const [branchId, setBranchId] = useState('');
       const [isOpenBranch, setIsOpenBranch] = useState(false);

       const [activeZone, setActiveZone] = useState(0);


       useEffect(() => {
              refetchCities(); // Refetch data when the component mounts
              refetchBranches(); // Refetch data when the component mounts
              refetchZone(); // Refetch data when the component mounts
       }, [refetchCities, refetchBranches, refetchZone]);


       useEffect(() => {
              if (dataCities) {
                     setCities([{ id: '', name: 'Select City' }, ...dataCities.cities] || []);
              }

              if (dataBranches) {
                     setBranches([{ id: '', name: 'Select Branch' }, ...dataBranches.branches] || []);
              }
              if (dataZone) {
                     setZone(dataZone.zones);

                     setZoneName(dataZone.zones?.zone || '');
                     setZonePrice(dataZone.zones?.price || '');

                     setStateCity(dataZone.zones?.city?.name || 'Select City');
                     setCityId(dataZone.zones?.city?.id || '');

                     setStateBranch(dataZone.zones?.branch?.name || 'Select Branch');
                     setBranchId(dataZone.zones?.branch?.id || '');

                     const filterBranchs = branches.filter((branch, index) => branch.city_id == dataZone.city_id);
                     setFilterBranches(filterBranchs)

                     setActiveZone(dataZone.zones?.status || 0);
              }
              console.log('cities', cities)
              console.log('Branches', branches)
              console.log('dataZone', dataZone)
       }, [dataCities, dataBranches, dataZone]);




       const handleOpenCities = () => {
              setIsOpenCity(!isOpenCity)
              setIsOpenBranch(false)
       };
       const handleOpenOptionCities = () => setIsOpenCity(false);

       const handleSelectCity = (option) => {
              setCityId(option.id);
              setStateCity(option.name);

              setStateBranch('Select Branch')
              setBranchId('');

              const filterBranchs = branches.filter((branch, index) => branch.city_id == option.id);
              setFilterBranches(filterBranchs)
       };

       const handleOpenBranches = () => {
              setIsOpenCity(false)
              setIsOpenBranch(!isOpenBranch)
       };
       const handleOpenOptionBranches = () => setIsOpenBranch(false);

       const handleSelectBranch = (option) => {
              setBranchId(option.id);
              setStateBranch(option.name);
       };

       const handleStatusZone = () => {
              const currentState = activeZone;
              { currentState === 0 ? setActiveZone(1) : setActiveZone(0) }
       }


       useEffect(() => {
              console.log('response', response)
              if (response) {
                     handleBack()
              }
       }, [response])

       const handleBack = () => {
              navigate(-1)
       }



       useEffect(() => {
              const handleClickOutside = (event) => {
                     // Close dropdown if clicked outside
                     if (
                            dropDownCities.current && !dropDownCities.current.contains(event.target) &&
                            dropDownBranches.current && !dropDownBranches.current.contains(event.target)
                     ) {
                            setIsOpenCity(null);
                            setIsOpenBranch(null);
                     }
              };

              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);



       const handleZoneEdit = (e) => {
              e.preventDefault();

              if (!zoneName) {
                     auth.toastError('Please Enter Zone Name')
                     return;
              }
              if (!zonePrice) {
                     auth.toastError('Please Enter Zone Price')
                     return;
              }
              if (!cityId) {
                     auth.toastError('Please Select City')
                     return;
              }
              // if (!branchId) {
              //        auth.toastError('Please Select Branch')
              //        return;
              // }


              const formData = new FormData();


              formData.append('zone', zoneName)
              formData.append('city_id', cityId)
              formData.append('branch_id', branchId)
              formData.append('price', zonePrice)
              formData.append('status', activeZone)



              postData(formData, 'Zone Added Success');

       };
       return (
              <>
                     {loadingCities || loadingBranches || loadingPost ? (
                            <>
                                   <div className="w-full flex justify-center items-center">
                                          <LoaderLogin />
                                   </div>
                            </>
                     ) : (
                            <section>
                                   <form onSubmit={handleZoneEdit}>
                                          {/* Content*/}
                                          <div className="sm:py-3 lg:py-6">
                                                 <div
                                                        className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4">
                                                        {/* Zone Name */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                               <span className="text-xl font-TextFontRegular text-thirdColor">Zone Name:</span>
                                                               <TextInput
                                                                      value={zoneName}
                                                                      onChange={(e) => setZoneName(e.target.value)}
                                                                      placeholder="Zone Name"
                                                               />
                                                        </div>
                                                        {/* Zone Price */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                               <span className="text-xl font-TextFontRegular text-thirdColor">Zone Price:</span>
                                                               <NumberInput
                                                                      value={zonePrice}
                                                                      onChange={(e) => setZonePrice(e.target.value)}
                                                                      placeholder="Zone Price"
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
                                                                      handleOpenOption={handleOpenOptionCities}
                                                                      onSelectOption={handleSelectCity}
                                                                      options={cities}
                                                                      border={false}
                                                               />
                                                        </div>
                                                        {/* Branches */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                               <span className="text-xl font-TextFontRegular text-thirdColor">Branch:</span>
                                                               <DropDown
                                                                      ref={dropDownBranches}
                                                                      handleOpen={handleOpenBranches}
                                                                      stateoption={stateBranch}
                                                                      openMenu={isOpenBranch}
                                                                      handleOpenOption={handleOpenOptionBranches}
                                                                      onSelectOption={handleSelectBranch}
                                                                      options={filterBranches}
                                                                      border={false}
                                                               />
                                                        </div>

                                                        <div className="sm:w-full xl:w-[30%] flex items-center justify-start gap-3 pt-10">
                                                               <span className="text-xl font-TextFontRegular text-thirdColor">Active:</span>
                                                               <Switch handleClick={handleStatusZone} checked={activeZone} />
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
                                                               handleClick={handleZoneEdit}
                                                        />
                                                 </div>

                                          </div>
                                   </form>
                            </section>
                     )}
              </>
       )
}

export default EditZonePage