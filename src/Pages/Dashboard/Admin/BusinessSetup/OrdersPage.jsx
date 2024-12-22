import { useState } from "react";
import { NumberInput, StaticButton, SubmitButton, TitleSection } from "../../../../Components/Components";

const OrdersPage = () => {

       const [minOrderValue, setMinOrderValue] = useState('');


       const handleReset = () => {
              setMinOrderValue('');
       }

       return (
              <>
                     <form
                            className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-4"
                            onSubmit={(e) => e.preventDefault()}
                     >
                            <TitleSection text={'Order Settings'} />

                            {/* Min Order Value */}
                            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                   <span className="text-xl font-TextFontRegular text-thirdColor">Min Order value (E£):</span>
                                   <NumberInput
                                          value={minOrderValue}
                                          onChange={(e) => setMinOrderValue(e.target.value)}
                                          placeholder="Min Order Value"
                                   />
                            </div>
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

export default OrdersPage