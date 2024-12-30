import React, { useEffect, useRef, useState } from 'react'
import { AddButton, DateInput, DropDown, StaticButton, SubmitButton, TimeInput, TitleSection } from '../../../../Components/Components';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';

const RestaurantTimeSlotPage = () => {
       const dropDown = useRef();
       const [allClosestTime, setAllClosestTime] = useState([{ closingTimeAm: '', closingTimePm: '' }]);

       const [day, setDay] = useState('');

       const [options, setOptions] = useState([
              { id: "", name: 'Select Option' },
              { id: "daily", name: 'daily' },
              { id: "customize", name: 'customize' }
       ]);

       const [stateOption, setStateOption] = useState('Select Option');
       const [optionName, setOptionName] = useState('');
       const [isOpenOption, setIsOpenOption] = useState(false);

       const handleOpen = () => setIsOpenOption(!isOpenOption);
       const handleOpenOptions = () => setIsOpenOption(false);

       const handleSelectOption = (option) => {
              setOptionName(option.id);
              setStateOption(option.name);
       };

       useEffect(() => {
              const handleClickOutside = (event) => {
                     // Close dropdown if clicked outside
                     if (
                            dropDown.current && !dropDown.current.contains(event.target)
                     ) {
                            setIsOpenOption(null);
                     }
              };

              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);

       const handleAddMore = () => {
              const newTime = { closingTimeAm: '', closingTimePm: '' };

              setAllClosestTime([...allClosestTime, newTime]);
       };


       const handleReset = () => {
              setAllClosestTime([{ closingTimeAm: '', closingTimePm: '' }]);
              setStateOption('Select Option');
              setOptionName('');
       }

       return (
              <>
                     <form
                            className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-4"
                            onSubmit={(e) => e.preventDefault()}
                     >
                            <TitleSection text={'Restaurant Closing Schedules'} />

                            {/* Options */}
                            <div className="w-full">

                                   <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">Options:</span>
                                          <DropDown
                                                 ref={dropDown}
                                                 handleOpen={handleOpen}
                                                 stateoption={stateOption}
                                                 openMenu={isOpenOption}
                                                 handleOpenOption={handleOpenOptions}
                                                 onSelectOption={handleSelectOption}
                                                 options={options}
                                                 border={false}
                                          />
                                   </div>
                            </div>

                            {optionName === 'daily' && (
                                   <>

                                          {allClosestTime.map((time, index) => (
                                                 <div key={index} className="w-full flex flex-wrap items-center gap-8 mt-3">
                                                        <div className="sm:w-full lg:w-[35%] flex sm:flex-col xl:flex-row items-center justify-center gap-2">
                                                               <span className="w-9/12 text-xl font-TextFontRegular text-thirdColor">Closing Time Am:</span>
                                                               <TimeInput
                                                                      value={time.closingTimeAm}
                                                                      onChange={(e) => {
                                                                             const newTime = [...allClosestTime];
                                                                             newTime[index].closingTimeAm = e.target.value;
                                                                             setAllClosestTime(newTime);
                                                                      }}
                                                               />
                                                        </div>
                                                        <div className="sm:w-full lg:w-[35%] flex sm:flex-col xl:flex-row items-center justify-center gap-2">
                                                               <span className="w-9/12 text-xl font-TextFontRegular text-thirdColor">Closing Time Pm:</span>
                                                               <TimeInput
                                                                      value={time.closingTimePm}
                                                                      onChange={(e) => {
                                                                             const newTime = [...allClosestTime];
                                                                             newTime[index].closingTimePm = e.target.value;
                                                                             setAllClosestTime(newTime);
                                                                      }}
                                                               />
                                                        </div>
                                                 </div>
                                          ))}

                                          {/* Add More */}

                                          <div className="mt-9">
                                                 <AddButton
                                                        Text={'Add More'}
                                                        BgColor='mainColor'
                                                        Color='white'
                                                        iconColor='white'
                                                        rounded='rounded-full'
                                                        handleClick={handleAddMore}
                                                 />
                                          </div>
                                   </>
                            )}
                            {optionName === 'customize' && (
                                   <>
                                          {/* Day */}
                                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Day:</span>
                                                 <DateInput
                                                        value={day}
                                                        onChange={(e) => setDay(e.target.value)}
                                                        minDate={true}
                                                        maxDate={false}
                                                 />
                                          </div>
                                   </>
                            )}
                            {/* Buttons */}
                            <div className="w-full flex items-center justify-end gap-x-4 ">
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

export default RestaurantTimeSlotPage