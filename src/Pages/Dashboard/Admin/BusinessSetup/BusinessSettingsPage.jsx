import React, { useEffect, useRef, useState } from 'react'
import { DateInput, DropDown, EmailInput, NumberInput, StaticButton, SubmitButton, Switch, TextInput, TitleSection, UploadInput } from '../../../../Components/Components';

const BusinessSettingsPage = () => {
       const LogoRef = useRef();
       const IconRef = useRef();

       const CountriesRef = useRef();
       const TimeZoneRef = useRef();
       const TimeFormatRef = useRef();
       const CurrencyRef = useRef();

       const [maintenanceMode, setMaintenanceMode] = useState(0);

       const [companyName, setCompanyName] = useState('');
       const [companyPhone, setCompanyPhone] = useState('');
       const [companyEmail, setCompanyEmail] = useState('');
       const [companyAddress, setCompanyAddress] = useState('');

       const [logo, setLogo] = useState('');
       const [logoFile, setLogoFile] = useState(null);

       const [icon, setIcon] = useState('');
       const [iconFile, setIconFile] = useState(null);


       const [stateCountries, setStateCountries] = useState('Select Country');
       const [countries, setCountries] = useState([{ name: 'Egypt' }, { name: 'USA' }, { name: 'UK' }, { name: 'Canada' }]);
       const [isOpenCountries, setIsOpenCountries] = useState(false);

       const [stateTimeZone, setStateTimeZone] = useState('Select Time Zone');
       const [timeZone, setTimeZone] = useState([{ name: 'Cairo' }, { name: 'New York' }, { name: 'London' }, { name: 'Toronto' }]);
       const [isOpenTimeZone, setIsOpenTimeZone] = useState(false);

       const [stateTimeFormat, setStateTimeFormat] = useState('Select Time Format');
       const [timeFormat, setTimeFormat] = useState([{ name: 'am/pm' }, { name: '24hours' }]);
       const [isOpenTimeFormat, setIsOpenTimeFormat] = useState(false);

       const [stateCurrency, setStateCurrency] = useState('Select Currency');
       const [currency, setCurrency] = useState([{ name: 'EGP' }, { name: 'USD' }, { name: 'GBP' }, { name: 'CAD' }]);
       const [isOpenCurrency, setIsOpenCurrency] = useState(false);


       const [leftCurrency, setLeftCurrency] = useState(0);
       const [rightCurrency, setRightCurrency] = useState(0);

       const [companyCopyrightText, setCompanyCopyrightText] = useState('');

       const [allSystem, setAllSystem] = useState(0);
       const [branchPanel, setBranchPanel] = useState(0);
       const [customerApp, setCustomerApp] = useState(0);
       const [webApp, setWebApp] = useState(0);
       const [deliverymanApp, setDeliverymanApp] = useState(0);

       const [forDay, setForDay] = useState(0);
       const [forWeek, setForWeek] = useState(0);
       const [untilChange, setUntilChange] = useState(0);
       const [Customize, setCustomize] = useState(0);

       const [startDate, setStartDate] = useState('');
       const [endDate, setEndDate] = useState('');


       const closeAll = () => {
              setIsOpenCountries(false)
              setIsOpenTimeZone(false)
              setIsOpenTimeFormat(false)
              setIsOpenCurrency(false)
       };
       const handleOpenCountries = () => {
              closeAll();
              setIsOpenCountries(!isOpenCountries)
       };
       const handleOpenTimeZone = () => {
              closeAll();
              setIsOpenTimeZone(!isOpenTimeZone)
       };
       const handleOpenTimeFormat = () => {
              closeAll();
              setIsOpenTimeFormat(!isOpenTimeFormat)
       };
       const handleOpenCurrency = () => {
              closeAll();
              setIsOpenCurrency(!isOpenCurrency)
       };

       const handleSelectCountry = (country) => {
              setStateCountries(country.name);
       };
       const handleSelectTimeZone = (timeZone) => {
              setStateTimeZone(timeZone.name);
       };
       const handleSelectTimeFormat = (timeFormat) => {
              setStateTimeFormat(timeFormat.name);
       };
       const handleSelectCurrency = (currency) => {
              setStateCurrency(currency.name);
       };

       const handleClickLeftCurrency = (e) => {
              const isChecked = e.target.checked;
              setLeftCurrency(isChecked ? 1 : 0);
              setRightCurrency(0);
       }
       const handleClickRightCurrency = (e) => {
              const isChecked = e.target.checked;
              setRightCurrency(isChecked ? 1 : 0);
              setLeftCurrency(0);
       };

       const handleClickAllSystem = (e) => {
              const isChecked = e.target.checked;
              setAllSystem(isChecked ? 1 : 0);
       };
       const handleClickBranchPanel = (e) => {
              const isChecked = e.target.checked;
              setBranchPanel(isChecked ? 1 : 0);
       };
       const handleClickCustomerApp = (e) => {
              const isChecked = e.target.checked;
              setCustomerApp(isChecked ? 1 : 0);
       };
       const handleClickWebApp = (e) => {
              const isChecked = e.target.checked;
              setWebApp(isChecked ? 1 : 0);
       };
       const handleClickDeliverymanApp = (e) => {
              const isChecked = e.target.checked;
              setDeliverymanApp(isChecked ? 1 : 0);
       };


       const handleClickMaintenanceMode = (e) => {
              const isChecked = e.target.checked;
              setMaintenanceMode(isChecked ? 1 : 0);

              if (!isChecked) {
                     setAllSystem(0)
                     setBranchPanel(0)
                     setCustomerApp(0)
                     setWebApp(0)
                     setDeliverymanApp(0)
                     setForDay(0)
                     setForWeek(0)
                     setUntilChange(0)
                     setCustomize(0)
                     setStartDate('')
                     setEndDate('')
              }
       }


       const handleClickForDay = (e) => {
              const isChecked = e.target.checked;
              setForDay(isChecked ? 1 : 0);
              setForWeek(0)
              setUntilChange(0)
              setCustomize(0)
       };
       const handleClickForWeek = (e) => {
              const isChecked = e.target.checked;
              setForDay(0)
              setForWeek(isChecked ? 1 : 0);
              setUntilChange(0)
              setCustomize(0)
       };
       const handleClickUntilChange = (e) => {
              const isChecked = e.target.checked;
              setForDay(0)
              setForWeek(0);
              setUntilChange(isChecked ? 1 : 0)
              setCustomize(0)
       };
       const handleClickCustomize = (e) => {
              const isChecked = e.target.checked;
              setForDay(0)
              setForWeek(0);
              setUntilChange(0)
              setCustomize(isChecked ? 1 : 0)
       };

       const handleLogo = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setLogoFile(file);
                     setLogo(file.name);
              }
       };
       const handleIcon = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setIconFile(file);
                     setIcon(file.name);
              }
       };

       const handleLogoClick = (ref) => {
              if (ref.current) {
                     ref.current.click();
              }
       };
       const handleIconClick = (ref) => {
              if (ref.current) {
                     ref.current.click();
              }
       };

       useEffect(() => {
              const handleClickOutside = (event) => {
                     // Close dropdown if clicked outside
                     if (
                            CountriesRef.current && !CountriesRef.current.contains(event.target) &&
                            TimeZoneRef.current && !TimeZoneRef.current.contains(event.target) &&
                            TimeFormatRef.current && !TimeFormatRef.current.contains(event.target) &&
                            CurrencyRef.current && !CurrencyRef.current.contains(event.target)
                     ) {
                            setIsOpenCountries(false);
                            setIsOpenTimeZone(false);
                            setIsOpenTimeFormat(false);
                            setIsOpenCurrency(false);
                     }
              };

              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);

       const handleReset = () => {
              setMaintenanceMode(0);
              setCompanyName('');
              setCompanyPhone('');
              setCompanyEmail('');
              setCompanyAddress('');
              setLogo('');
              setIcon('');
              setLogoFile(null);
              setIconFile(null);
              setStateCountries('Select Country');
              setStateTimeZone('Select Time Zone');
              setStateTimeFormat('Select Time Format');
              setStateCurrency('Select Currency');
              setLeftCurrency(0);
              setRightCurrency(0);
              setCompanyCopyrightText('');
              setAllSystem(0);
              setBranchPanel(0);
              setCustomerApp(0);
              setWebApp(0);
              setDeliverymanApp(0);
              setForDay(0);
              setForWeek(0);
              setUntilChange(0);
              setCustomize(0);
              setStartDate('');
              setEndDate('');
       }

       return (
              <>
                     <form
                            className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-4"
                            onSubmit={(e) => e.preventDefault()}
                     >
                            <div className="w-full">
                                   <TitleSection text={'System Maintenance'} />
                                   <p className='text-xl font-TextFontMedium text-secoundColor'>*By turning on maintenance mode Control your all system & function</p>
                            </div>
                            {/* Maintenance Mode */}
                            <div className="sm:w-full xl:w-[30%] flex items-center justify-start gap-3">
                                   <span className="text-xl font-TextFontRegular text-thirdColor">Maintenance Mode:</span>
                                   <div>
                                          <Switch
                                                 checked={maintenanceMode}
                                                 handleClick={handleClickMaintenanceMode}
                                          />
                                   </div>
                            </div>

                            <TitleSection text={'Company Information'} />
                            {/* Company Name */}
                            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                   <span className="text-xl font-TextFontRegular text-thirdColor">Company Name:</span>
                                   <TextInput
                                          value={companyName}
                                          onChange={(e) => setCompanyName(e.target.value)}
                                          placeholder="Company Name"
                                   />
                            </div>
                            {/* Company Phone */}
                            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                   <span className="text-xl font-TextFontRegular text-thirdColor">Company Phone:</span>
                                   <NumberInput
                                          value={companyPhone}
                                          onChange={(e) => setCompanyPhone(e.target.value)}
                                          placeholder="Company Phone"
                                   />
                            </div>
                            {/* Company Email */}
                            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                   <span className="text-xl font-TextFontRegular text-thirdColor">Company Email:</span>
                                   <EmailInput
                                          backgound='white'
                                          value={companyEmail}
                                          onChange={(e) => setCompanyEmail(e.target.value)}
                                          placeholder="Company Email"
                                   />
                            </div>
                            {/* Company Address */}
                            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                   <span className="text-xl font-TextFontRegular text-thirdColor">Company Address:</span>
                                   <TextInput
                                          value={companyAddress}
                                          onChange={(e) => setCompanyAddress(e.target.value)}
                                          placeholder="Company Address"
                                   />
                            </div>
                            {/* Logo */}
                            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                   <span className="text-xl font-TextFontRegular text-thirdColor">Logo:</span>
                                   <UploadInput
                                          value={logo}
                                          uploadFileRef={LogoRef}
                                          placeholder="Logo"
                                          handleFileChange={handleLogo}
                                          onChange={(e) => setLogo(e.target.value)}
                                          onClick={() => handleLogoClick(LogoRef)}
                                   />
                            </div>
                            {/* Icon */}
                            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                   <span className="text-xl font-TextFontRegular text-thirdColor">Fav Icon:</span>
                                   <UploadInput
                                          value={icon}
                                          uploadFileRef={IconRef}
                                          placeholder="Fav Icon"
                                          handleFileChange={handleIcon}
                                          onChange={(e) => setIcon(e.target.value)}
                                          onClick={() => handleIconClick(IconRef)}
                                   />
                            </div>

                            <TitleSection text={'Business Information'} />

                            {/* Countries */}
                            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                   <span className="text-xl font-TextFontRegular text-thirdColor">Countries:</span>
                                   <DropDown
                                          ref={CountriesRef}
                                          handleOpen={handleOpenCountries}
                                          stateoption={stateCountries}
                                          openMenu={isOpenCountries}
                                          handleOpenOption={handleOpenCountries}
                                          onSelectOption={handleSelectCountry}
                                          options={countries}
                                          border={false}
                                   />
                            </div>
                            {/* Time Zone */}
                            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                   <span className="text-xl font-TextFontRegular text-thirdColor">Time Zone:</span>
                                   <DropDown
                                          ref={TimeZoneRef}
                                          handleOpen={handleOpenTimeZone}
                                          stateoption={stateTimeZone}
                                          openMenu={isOpenTimeZone}
                                          handleOpenOption={handleOpenTimeZone}
                                          onSelectOption={handleSelectTimeZone}
                                          options={timeZone}
                                          border={false}
                                   />
                            </div>
                            {/* Time Format */}
                            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                   <span className="text-xl font-TextFontRegular text-thirdColor">Time Format:</span>
                                   <DropDown
                                          ref={TimeFormatRef}
                                          handleOpen={handleOpenTimeFormat}
                                          stateoption={stateTimeFormat}
                                          openMenu={isOpenTimeFormat}
                                          handleOpenOption={handleOpenTimeFormat}
                                          onSelectOption={handleSelectTimeFormat}
                                          options={timeFormat}
                                          border={false}
                                   />
                            </div>
                            {/* Currency */}
                            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                   <span className="text-xl font-TextFontRegular text-thirdColor">Currency:</span>
                                   <DropDown
                                          ref={CurrencyRef}
                                          handleOpen={handleOpenCurrency}
                                          stateoption={stateCurrency}
                                          openMenu={isOpenCurrency}
                                          handleOpenOption={handleOpenCurrency}
                                          onSelectOption={handleSelectCurrency}
                                          options={currency}
                                          border={false}
                                   />
                            </div>

                            <div className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4">

                                   {/* Currency Position */}
                                   <span className="text-xl font-TextFontRegular text-thirdColor">Currency Position:</span>
                                   <div className="sm:w-full xl:w-[30%] flex items-center justify-start gap-3">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">(E£) Left:</span>
                                          <div>
                                                 <Switch
                                                        checked={leftCurrency}
                                                        handleClick={handleClickLeftCurrency}
                                                 />
                                          </div>
                                   </div>
                                   <div className="sm:w-full xl:w-[30%] flex items-center justify-start gap-3">
                                          <span className="text-xl font-TextFontRegular text-thirdColor">(E£) Right:</span>
                                          <div>
                                                 <Switch
                                                        checked={rightCurrency}
                                                        handleClick={handleClickRightCurrency}
                                                 />
                                          </div>
                                   </div>
                            </div>

                            {/* Company Copyright Text */}
                            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                   <span className="text-xl font-TextFontRegular text-thirdColor">Company Copyright Text:</span>
                                   <TextInput
                                          value={companyCopyrightText}
                                          onChange={(e) => setCompanyCopyrightText(e.target.value)}
                                          placeholder="Company Copyright Text"
                                   />
                            </div>

                            {maintenanceMode === 1 && (
                                   <>
                                          <div className="w-full">
                                                 <TitleSection text={'Select System'} />
                                                 <p className='text-xl font-TextFontMedium text-secoundColor'>Select the systems you want to temporarily deactivate for maintenance</p>
                                          </div>
                                          {/* All System */}
                                          <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">All System:</span>
                                                 <div>
                                                        <Switch
                                                               checked={allSystem}
                                                               handleClick={handleClickAllSystem}
                                                        />
                                                 </div>
                                          </div>
                                          {/* Branch Panel */}
                                          <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Branch Panel:</span>
                                                 <div>
                                                        <Switch
                                                               checked={branchPanel}
                                                               handleClick={handleClickBranchPanel}
                                                        />
                                                 </div>
                                          </div>
                                          {/* Customer App */}
                                          <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Customer App:</span>
                                                 <div>
                                                        <Switch
                                                               checked={customerApp}
                                                               handleClick={handleClickCustomerApp}
                                                        />
                                                 </div>
                                          </div>
                                          {/* Web App */}
                                          <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Web App:</span>
                                                 <div>
                                                        <Switch
                                                               checked={webApp}
                                                               handleClick={handleClickWebApp}
                                                        />
                                                 </div>
                                          </div>
                                          {/* Deliveryman App */}
                                          <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Deliveryman App:</span>
                                                 <div>
                                                        <Switch
                                                               checked={deliverymanApp}
                                                               handleClick={handleClickDeliverymanApp}
                                                        />
                                                 </div>
                                          </div>

                                          <div className="w-full">
                                                 <TitleSection text={'Maintenance Date & Time'} />
                                                 <p className='text-xl font-TextFontMedium text-secoundColor'>Choose the maintenance mode duration for your selected system.</p>
                                          </div>

                                          {/* For 24 Hours */}
                                          <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">For 24 Hours:</span>
                                                 <div>
                                                        <Switch
                                                               checked={forDay}
                                                               handleClick={handleClickForDay}
                                                        />
                                                 </div>
                                          </div>
                                          {/*  For 1 Week */}
                                          <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">For 1 Week:</span>
                                                 <div>
                                                        <Switch
                                                               checked={forWeek}
                                                               handleClick={handleClickForWeek}
                                                        />
                                                 </div>
                                          </div>
                                          {/* Until I Change */}
                                          <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Until I Change:</span>
                                                 <div>
                                                        <Switch
                                                               checked={untilChange}
                                                               handleClick={handleClickUntilChange}
                                                        />
                                                 </div>
                                          </div>
                                          {/* Customize */}
                                          <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Customize:</span>
                                                 <div>
                                                        <Switch
                                                               checked={Customize}
                                                               handleClick={handleClickCustomize}
                                                        />
                                                 </div>
                                          </div>
                                          {/* Start Date */}
                                          <div className="sm:w-full xl:w-[30%] flex items-center justify-start gap-3">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">Start Date:</span>
                                                 <div>
                                                        <DateInput
                                                               value={startDate}
                                                               onChange={e => setStartDate(e.target.value)}
                                                               maxDate={false}
                                                               minDate={true}
                                                        />
                                                 </div>
                                          </div>
                                          {/* End Date */}
                                          <div className="sm:w-full xl:w-[30%] flex items-center justify-start gap-3">
                                                 <span className="text-xl font-TextFontRegular text-thirdColor">End Date:</span>
                                                 <div>
                                                        <DateInput
                                                               value={endDate}
                                                               onChange={e => setEndDate(e.target.value)}
                                                               maxDate={false}
                                                               minDate={true}
                                                        />
                                                 </div>
                                          </div>

                                   </>
                            )}


                            {/* Buttons */}
                            <div className="w-full flex items-center justify-end gap-x-4 mb-32">
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

export default BusinessSettingsPage