import React, { useEffect, useState } from 'react'
import { useGet } from '../../../../../Hooks/useGet';
import { usePost } from '../../../../../Hooks/usePostJson';
import { LoaderLogin, SubmitButton, TextInput } from '../../../../../Components/Components';

const CancelTimePage = () => {
       const { refetch: refetchCancelTime, loading: loadingCancelTime, data: dataCancelTime } = useGet({ url: 'https://bcknd.food2go.online/admin/settings/view_time_cancel' });
       const { postData, loadingPost, response } = usePost({ url: 'https://bcknd.food2go.online/admin/settings/update_time_cancel' });

       const [cancelTime, setCancelTime] = useState('');


       useEffect(() => {
              refetchCancelTime();
       }, [refetchCancelTime]);

       useEffect(() => {
              if (dataCancelTime && dataCancelTime.time) {
                     setCancelTime(dataCancelTime.time.setting || '');
              }
       }, [dataCancelTime]); // Only run this effect when `data` changes


       const handleChangeCancelTime = (e) => {
              e.preventDefault();

              if (!cancelTime) {
                     auth.toastError('please Enter Cancel Time')
                     return;
              }

              const formData = new FormData();

              formData.append("time", cancelTime);


              console.log(...formData.entries());
              postData(formData, "Cancel Time Changed Success")
       };
       return (
              <>
                     {loadingPost || loadingCancelTime ? (
                            <>
                                   <div className="w-full flex justify-center items-center">
                                          <LoaderLogin />
                                   </div>
                            </>
                     ) : (
                            <section>
                                   <form onSubmit={handleChangeCancelTime}>

                                          <div className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4 mb-4">
                                                 {/* Tax Types */}
                                                 <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                        <span className="text-xl font-TextFontRegular text-thirdColor">Time:</span>
                                                        <TextInput
                                                               value={cancelTime}
                                                               onChange={(e) => setCancelTime(e.target.value)}
                                                               placeholder={'Cancel Time'}
                                                        />
                                                 </div>
                                          </div>

                                          {/* Buttons*/}
                                          <div className="w-full flex items-center justify-end gap-x-4">
                                                 <div className="">
                                                        <SubmitButton
                                                               text={'Change'}
                                                               rounded='rounded-full'
                                                               handleClick={handleChangeCancelTime}
                                                        />
                                                 </div>

                                          </div>
                                   </form>
                            </section>
                     )}
              </>
       )
}

export default CancelTimePage