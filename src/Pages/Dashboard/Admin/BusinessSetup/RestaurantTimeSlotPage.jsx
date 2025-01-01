import React, { useEffect, useState } from 'react';
import { AddButton, DateInput, LoaderLogin, StaticButton, SubmitButton, TimeInput, TitleSection } from '../../../../Components/Components';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';

const RestaurantTimeSlotPage = ({ refetch }) => {
    const [allClosestTime, setAllClosestTime] = useState([{ closingTimeAm: '', closingTimePm: '' }]);
    const { refetch: refetchTimeSlot, loading: loadingTime, data: dataSlot } = useGet({ url: 'https://bcknd.food2go.online/admin/settings/business_setup/time_slot' });
    const { postData, loadingPost, response } = usePost({ url: 'https://bcknd.food2go.online/admin/settings/business_setup/time_slot/add' });

    const [timeSlot, setTimeSlot] = useState({ daily: [], custom: [] });
    const [day, setDay] = useState('');
    const [optionName, setOptionName] = useState('');

    useEffect(() => {
        refetchTimeSlot();
    }, [refetchTimeSlot]);

    useEffect(() => {
        if (dataSlot) {
            const { time_slot } = dataSlot;
            const setting = JSON.parse(time_slot.setting);

            setTimeSlot({
                daily: setting.daily || [],
                custom: setting.custom || [],
            });

            setDay(setting.custom || '');

            setAllClosestTime(
                (setting.daily || []).map(item => ({
                    closingTimeAm: item.from || '',
                    closingTimePm: item.to || '',
                }))
            );
        }
    }, [dataSlot]);

    const preparePostData = () => {
        const formattedDaily = allClosestTime
            .filter(time => time.closingTimeAm && time.closingTimePm)
            .map(time => ({
                from: time.closingTimeAm,
                to: time.closingTimePm,
            }));

        // Prepare custom times
        const formattedCustom = day ? [day] : timeSlot.custom;  // If 'day' is not updated, fall back to the previous value

        return { daily: formattedDaily, custom: formattedCustom };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = preparePostData();
        postData(formData, 'Time Slot Added Successfully');
        console.log('Submitted Data:', formData);
    };

    const handleAddMore = () => {
        setAllClosestTime([...allClosestTime, { closingTimeAm: '', closingTimePm: '' }]);
    };

    const handleReset = () => {
        setAllClosestTime([{ closingTimeAm: '', closingTimePm: '' }]);
        setOptionName('');
        setDay('');
    };

    return (
        <>
            {loadingTime || loadingPost ? (
                <>
                    <div className="w-full h-56 flex justify-center items-center">
                        <LoaderLogin />
                    </div>
                </>
            ) : (
                <form
                    className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-4"
                    onSubmit={handleSubmit}
                >
                    <TitleSection text={'Restaurant Closing Schedules'} />

                    <div className="w-full flex gap-8 mt-4">
                        <span
                            className={`text-xl font-TextFontRegular cursor-pointer ${optionName === 'daily' ? 'text-mainColor' : 'text-thirdColor'}`}
                            onClick={() => setOptionName('daily')}
                        >Daily</span>
                        <span
                            className={`text-xl font-TextFontRegular cursor-pointer ${optionName === 'customize' ? 'text-mainColor' : 'text-thirdColor'}`}
                            onClick={() => setOptionName('customize')}
                        >Customize</span>
                    </div>

                    {optionName === 'daily' && (
                        <>
                            {allClosestTime.map((time, index) => (
                                <div key={index} className="w-full flex flex-wrap items-center gap-8 mt-3">
                                    <div className="sm:w-full lg:w-[35%] flex sm:flex-col xl:flex-row items-center gap-2">
                                        <span className="w-9/12 text-xl text-thirdColor">Closing Time Am:</span>
                                        <TimeInput
                                            value={time.closingTimeAm}
                                            onChange={(e) => {
                                                const newTime = [...allClosestTime];
                                                newTime[index].closingTimeAm = e.target.value;
                                                setAllClosestTime(newTime);
                                            }}
                                        />
                                    </div>
                                    <div className="sm:w-full lg:w-[35%] flex sm:flex-col xl:flex-row items-center gap-2">
                                        <span className="w-9/12 text-xl text-thirdColor">Closing Time Pm:</span>
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
                            <div className="mt-6">
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
                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start gap-y-1 mt-3">
                            <span className="text-xl text-thirdColor">Day:</span>
                            <DateInput
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                minDate={true}
                                maxDate={false}
                            />
                        </div>
                    )}

                    <div className="w-full flex items-center justify-end gap-x-4 mt-6">
                        <StaticButton
                            text={'Reset'}
                            handleClick={handleReset}
                            bgColor='bg-transparent'
                            Color='text-mainColor'
                            border={'border-2'}
                            borderColor={'border-mainColor'}
                            rounded='rounded-full'
                        />
                        <SubmitButton
                            text={'Submit'}
                            rounded='rounded-full'
                            handleClick={handleSubmit}
                        />
                    </div>
                </form>
            )}
        </>
    );
};

export default RestaurantTimeSlotPage;
