import React, { useEffect, useRef, useState } from 'react'
import { DateInput, DropDown, StaticButton, StaticLoader, SubmitButton, TitleSection } from '../../../../Components/Components'
import { usePost } from '../../../../Hooks/usePostJson';
import { useDispatch } from 'react-redux';
import { OrdersComponent, setOrdersAll, setOrdersCanceled, setOrdersConfirmed, setOrdersDelivered, setOrdersFailed, setOrdersOutForDelivery, setOrdersPending, setOrdersProcessing, setOrdersReturned, setOrdersSchedule } from '../../../../Store/CreateSlices';

const SelectDateRangeSection = ({ typPage, branchsData }) => {
       const dispatch = useDispatch()

       const apiUrl = import.meta.env.VITE_API_BASE_URL;

       const { postData, loadingPost, response } = usePost({
              url: `${apiUrl}/admin/order/filter`
       });

       const dropDownBranch = useRef();
       const [isOpenBranch, setIsOpenBranch] = useState(false)

       const [branchs, setBranchs] = useState([])
       const [startDate, setStartDate] = useState('')
       const [endDate, setEndDate] = useState('')

       const [stateBranch, setStateBranch] = useState('Select Branch')
       const [branchId, setBranchId] = useState('')

       const handleOpenDropdown = () => {
              setIsOpenBranch(!isOpenBranch);
       }
       const handleOpenOptionBranch = () => { setIsOpenBranch(false) }
       const handleSelectBranch = (option) => {
              setBranchId(option.id);
              setStateBranch(option.name);
       }
       useEffect(() => {
              if (branchsData?.branches) {
                     setBranchs(branchsData.branches);
              }
       }, [branchsData]);


       useEffect(() => {
              if (response !== null) {
                     switch (typPage) {
                            case 'all':
                                   dispatch(setOrdersAll(response.data.orders));
                                   break;
                            case 'pending':
                                   dispatch(setOrdersPending(response.data.orders));
                                   break;
                            case 'confirmed':
                                   dispatch(setOrdersConfirmed(response.data.orders));
                                   break;
                            case 'processing':
                                   dispatch(setOrdersProcessing(response.data.orders));
                                   break;
                            case 'out_for_delivery':
                                   dispatch(setOrdersOutForDelivery(response.data.orders));
                                   break;
                            case 'delivered':
                                   dispatch(setOrdersDelivered(response.data.orders));
                                   break;
                            case 're-turned':
                                   dispatch(setOrdersReturned(response.data.orders));
                                   break;
                            case 'faild_to_deliver':
                                   dispatch(setOrdersFailed(response.data.orders));
                                   break;
                            case 'canceled':
                                   dispatch(setOrdersCanceled(response.data.orders));
                                   break;
                            case 'scheduled':
                                   dispatch(setOrdersSchedule(response.data.orders));
                                   break;
                            default:
                                   console.error('Invalid typPage:', typPage);
                     }
              } else {
                     console.log('No response received yet.');
              }
              console.log('response', response);
       }, [response, typPage, dispatch]);



       useEffect(() => {
              const handleClickOutside = (event) => {
                     // Close dropdown if clicked outside
                     if (
                            dropDownBranch.current && !dropDownBranch.current.contains(event.target)
                     ) {
                            setIsOpenBranch(false);
                     }
              };

              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);

       const handleReset = () => {
              setStateBranch('Select Branch')
              setBranchId('')
              setStartDate('')
              setEndDate('')
       }
       const handleData = (e) => {
              e.preventDefault();
              const formData = new FormData();

              formData.append('branch_id', branchId)
              formData.append('from', startDate)
              formData.append('to', endDate)
              formData.append('type', typPage)

              postData(formData);
       }



       return (
              <>
                     <TitleSection text={'Select Date Range'} />
                     {loadingPost ? (
                            <>
                                   <div className="w-full h-56 flex justify-center items-center">
                                          <StaticLoader />
                                   </div>
                            </>
                     ) : (
                            <form onSubmit={handleData} className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4 py-3 pt-0 px-3 rounded-xl shadow-md">
                                   <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">Select Branch:</span>
                                          <DropDown
                                                 ref={dropDownBranch}
                                                 handleOpen={handleOpenDropdown}
                                                 stateoption={stateBranch}
                                                 openMenu={isOpenBranch}
                                                 handleOpenOption={handleOpenOptionBranch}
                                                 options={branchs}
                                                 onSelectOption={handleSelectBranch}
                                                 border={false}
                                          />
                                   </div>
                                   <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">Start Date:</span>
                                          <DateInput
                                                 value={startDate}
                                                 minDate={false}
                                                 onChange={(e) => setStartDate(e.target.value)}
                                          />
                                   </div>
                                   <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">End Date:</span>
                                          <DateInput
                                                 value={endDate}
                                                 minDate={false}
                                                 onChange={(e) => setEndDate(e.target.value)}
                                          />
                                   </div>

                                   {/* Buttons*/}
                                   <div className="w-full flex items-center justify-end gap-x-4">
                                          <div className="">
                                                 <StaticButton text={'Reset'} handleClick={handleReset} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
                                          </div>
                                          <div className="">
                                                 <SubmitButton
                                                        text={'Show Data'}
                                                        rounded='rounded-full'
                                                        handleClick={handleData}
                                                 />
                                          </div>

                                   </div>
                            </form>
                     )}
              </>
       )
}

export default SelectDateRangeSection