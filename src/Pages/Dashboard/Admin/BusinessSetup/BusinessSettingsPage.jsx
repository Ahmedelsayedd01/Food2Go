import React, { useEffect, useRef, useState } from "react";
import {
  DateInput,
  DropDown,
  EmailInput,
  LoaderLogin,
  NumberInput,
  StaticButton,
  StaticLoader,
  SubmitButton,
  Switch,
  TextInput,
  TitleSection,
  UploadInput,
} from "../../../../Components/Components";
import { Dropdown } from "primereact/dropdown";

import moment from "moment-timezone";
import { useGet } from "../../../../Hooks/useGet";
import { usePost } from "../../../../Hooks/usePostJson";
import { useAuth } from "../../../../Context/Auth";

const BusinessSettingsPage = () => {
  const LogoRef = useRef();
  const IconRef = useRef();

  const auth = useAuth();
  const CountriesRef = useRef();
  const TimeZoneRef = useRef();
  const TimeFormatRef = useRef();
  const CurrencyRef = useRef();

  const [maintenanceMode, setMaintenanceMode] = useState(0);

  const [companyName, setCompanyName] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");

  const [logo, setLogo] = useState("");
  const [logoFile, setLogoFile] = useState(null);

  const [icon, setIcon] = useState("");
  const [iconFile, setIconFile] = useState(null);

  const [stateCountries, setStateCountries] = useState("Select Country");
  const [selectedCountry, setSelectedCountry] = useState("");

  const [countries, setCountries] = useState(
    [
      { name: 'Afghanistan' }, { name: 'Albania' }, { name: 'Algeria' }, { name: 'Andorra' }, { name: 'Angola' },
      { name: 'Antigua and Barbuda' }, { name: 'Argentina' }, { name: 'Armenia' }, { name: 'Australia' }, { name: 'Austria' },
      { name: 'Azerbaijan' }, { name: 'Bahamas' }, { name: 'Bahrain' }, { name: 'Bangladesh' }, { name: 'Barbados' },
      { name: 'Belarus' }, { name: 'Belgium' }, { name: 'Belize' }, { name: 'Benin' }, { name: 'Bhutan' },
      { name: 'Bolivia' }, { name: 'Bosnia and Herzegovina' }, { name: 'Botswana' }, { name: 'Brazil' }, { name: 'Brunei' },
      { name: 'Bulgaria' }, { name: 'Burkina Faso' }, { name: 'Burundi' }, { name: 'Cabo Verde' }, { name: 'Cambodia' },
      { name: 'Cameroon' }, { name: 'Canada' }, { name: 'Central African Republic' }, { name: 'Chad' }, { name: 'Chile' },
      { name: 'China' }, { name: 'Colombia' }, { name: 'Comoros' }, { name: 'Congo, Democratic Republic of the' }, { name: 'Congo, Republic of the' },
      { name: 'Costa Rica' }, { name: 'Croatia' }, { name: 'Cuba' }, { name: 'Cyprus' }, { name: 'Czech Republic' },
      { name: 'Denmark' }, { name: 'Djibouti' }, { name: 'Dominica' }, { name: 'Dominican Republic' }, { name: 'Ecuador' },
      { name: 'Egypt' }, { name: 'El Salvador' }, { name: 'Equatorial Guinea' }, { name: 'Eritrea' }, { name: 'Estonia' },
      { name: 'Eswatini' }, { name: 'Ethiopia' }, { name: 'Fiji' }, { name: 'Finland' }, { name: 'France' },
      { name: 'Gabon' }, { name: 'Gambia' }, { name: 'Georgia' }, { name: 'Germany' }, { name: 'Ghana' },
      { name: 'Greece' }, { name: 'Grenada' }, { name: 'Guatemala' }, { name: 'Guinea' }, { name: 'Guinea-Bissau' },
      { name: 'Guyana' }, { name: 'Haiti' }, { name: 'Honduras' }, { name: 'Hungary' }, { name: 'Iceland' },
      { name: 'India' }, { name: 'Indonesia' }, { name: 'Iran' }, { name: 'Iraq' }, { name: 'Ireland' },
      { name: 'Israel' }, { name: 'Italy' }, { name: 'Jamaica' }, { name: 'Japan' }, { name: 'Jordan' },
      { name: 'Kazakhstan' }, { name: 'Kenya' }, { name: 'Kiribati' }, { name: 'Korea, North' }, { name: 'Korea, South' },
      { name: 'Kosovo' }, { name: 'Kuwait' }, { name: 'Kyrgyzstan' }, { name: 'Laos' }, { name: 'Latvia' },
      { name: 'Lebanon' }, { name: 'Lesotho' }, { name: 'Liberia' }, { name: 'Libya' }, { name: 'Liechtenstein' },
      { name: 'Lithuania' }, { name: 'Luxembourg' }, { name: 'Madagascar' }, { name: 'Malawi' }, { name: 'Malaysia' },
      { name: 'Maldives' }, { name: 'Mali' }, { name: 'Malta' }, { name: 'Marshall Islands' }, { name: 'Mauritania' },
      { name: 'Mauritius' }, { name: 'Mexico' }, { name: 'Micronesia' }, { name: 'Moldova' }, { name: 'Monaco' },
      { name: 'Mongolia' }, { name: 'Montenegro' }, { name: 'Morocco' }, { name: 'Mozambique' }, { name: 'Myanmar' },
      { name: 'Namibia' }, { name: 'Nauru' }, { name: 'Nepal' }, { name: 'Netherlands' }, { name: 'New Zealand' },
      { name: 'Nicaragua' }, { name: 'Niger' }, { name: 'Nigeria' }, { name: 'North Macedonia' }, { name: 'Norway' },
      { name: 'Oman' }, { name: 'Pakistan' }, { name: 'Palau' }, { name: 'Palestine' }, { name: 'Panama' },
      { name: 'Papua New Guinea' }, { name: 'Paraguay' }, { name: 'Peru' }, { name: 'Philippines' }, { name: 'Poland' },
      { name: 'Portugal' }, { name: 'Qatar' }, { name: 'Romania' }, { name: 'Russia' }, { name: 'Rwanda' },
      { name: 'Saint Kitts and Nevis' }, { name: 'Saint Lucia' }, { name: 'Saint Vincent and the Grenadines' }, { name: 'Samoa' }, { name: 'San Marino' },
      { name: 'Sao Tome and Principe' }, { name: 'Saudi Arabia' }, { name: 'Senegal' }, { name: 'Serbia' }, { name: 'Seychelles' },
      { name: 'Sierra Leone' }, { name: 'Singapore' }, { name: 'Slovakia' }, { name: 'Slovenia' }, { name: 'Solomon Islands' },
      { name: 'Somalia' }, { name: 'South Africa' }, { name: 'South Sudan' }, { name: 'Spain' }, { name: 'Sri Lanka' },
      { name: 'Sudan' }, { name: 'Suriname' }, { name: 'Sweden' }, { name: 'Switzerland' }, { name: 'Syria' },
      { name: 'Taiwan' }, { name: 'Tajikistan' }, { name: 'Tanzania' }, { name: 'Thailand' }, { name: 'Timor-Leste' },
      { name: 'Togo' }, { name: 'Tonga' }, { name: 'Trinidad and Tobago' }, { name: 'Tunisia' }, { name: 'Turkey' },
      { name: 'Turkmenistan' }, { name: 'Tuvalu' }, { name: 'Uganda' }, { name: 'Ukraine' }, { name: 'United Arab Emirates' },
      { name: 'United Kingdom' }, { name: 'United States' }, { name: 'Uruguay' }, { name: 'Uzbekistan' }, { name: 'Vanuatu' },
      { name: 'Vatican City' }, { name: 'Venezuela' }, { name: 'Vietnam' }, { name: 'Yemen' }, { name: 'Zambia' },
      { name: 'Zimbabwe' }
    ]
  );

  const [isOpenCountries, setIsOpenCountries] = useState(false);

  const [stateTimeZone, setStateTimeZone] = useState("Select Time Zone");
  const [selectedTimeZone, setSelectedTimeZone] = useState("");
  const [timeZone, setTimeZone] = useState([]);
  const [isOpenTimeZone, setIsOpenTimeZone] = useState(false);

  const [stateTimeFormat, setStateTimeFormat] = useState("Select Time Format");
  const [timeFormat, setTimeFormat] = useState([
    { name: "am/pm" },
    { name: "24hours" },
  ]);
  const [isOpenTimeFormat, setIsOpenTimeFormat] = useState(false);

  // const [stateCurrency, setStateCurrency] = useState('Select Currency');
  // const [currency, setCurrency] = useState([{ name: 'EGP' }, { name: 'USD' }, { name: 'GBP' }, { name: 'CAD' }]);
  // const [isOpenCurrency, setIsOpenCurrency] = useState(false);

  const [leftCurrency, setLeftCurrency] = useState(0);
  const [rightCurrency, setRightCurrency] = useState(0);

  const [companyCopyrightText, setCompanyCopyrightText] = useState("");
  const [timeFormats, setTimeFormats] = useState([]);

  const [allSystem, setAllSystem] = useState(0);
  const [branchPanel, setBranchPanel] = useState(0);
  const [customerApp, setCustomerApp] = useState(0);
  const [webApp, setWebApp] = useState(0);
  const [deliverymanApp, setDeliverymanApp] = useState(0);

  const [forDay, setForDay] = useState(0);
  const [forWeek, setForWeek] = useState(0);
  const [untilChange, setUntilChange] = useState(0);
  const [Customize, setCustomize] = useState(0);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    refetch: refetchCompany,
    loading: loadingCompany,
    data: dataCompany,
  } = useGet({
    url: "https://bcknd.food2go.online/admin/settings/business_setup/company",
  });

  const {
    refetch: refetchMaintenance,
    loading: loadingMaintenance,
    data: dataMaintennance,
  } = useGet({
    url: "https://bcknd.food2go.online/admin/settings/business_setup/maintenance",
  });

  const {
    refetch: refetchCity,
    loading: loadingCity,
    data: dataCity,
  } = useGet({ url: "https://bcknd.food2go.online/admin/settings/city" });

  const [dataCompany2, setDataCompany] = useState(null);


  const [dataCompanyInfo, setDataCompanyInfo] = useState([]);

  const [dataCurrency, setDataCurrency] = useState([]);
  const [stateCurrency, setStateCurrency] = useState("Select Currency");
  const [currencyId, setCurrencyId] = useState("");
  const [isOpenCurrency, setIsOpenCurrency] = useState(false);
  const [dataMain, setDataMain] = useState([])
  const [formDataMaintenance, setFormDataMaintenance] = useState({})

  const { postData, loadingPost, response } = usePost({
    url: "https://bcknd.food2go.online/admin/settings/business_setup/company/add",
  });


  // const { postDataStatus, loadingPostStatus, responseStatus } = usePost({
  //      url: "https://bcknd.food2go.online/admin/settings/business_setup/maintenance/status",
  //    });

  //  const { postDataMaintenance, loadingPostMaintenance, responseMaintenanace } = usePost({
  //    url: "https://bcknd.food2go.online/admin/settings/business_setup/maintenance/add",
  //  });

  useEffect(() => {
    refetchCompany();
    refetchCity();
    refetchMaintenance();
  }, [refetchCompany, refetchCity, refetchMaintenance]);


  useEffect(() => {
    if (dataCompany) {
      setDataCompany(dataCompany);
      // setDataCurrency(dataCompany?.currency || []);
      // setDataCompanyInfo(dataCompany?.company_info || []);
      setCompanyName(dataCompanyInfo?.name || '');
      setCompanyPhone(dataCompanyInfo?.phone || '');
      setCompanyEmail(dataCompanyInfo?.email || '');
      setCompanyAddress(dataCompanyInfo?.address || '');
      setIcon(dataCompanyInfo?.fav_icon_link || '');
      setLogo(dataCompanyInfo?.logo_link || '');
      setStateCountries(dataCompanyInfo?.country || stateCountries);
      setSelectedCountry(dataCompanyInfo?.country || selectedCountry)
      setSelectedTimeZone(dataCompanyInfo?.time_zone || selectedTimeZone);
      setStateTimeFormat(dataCompanyInfo?.time_format || stateTimeFormat)

      if (dataCompanyInfo.currency_id) {
        const matchedCurrency = dataCompany.currency.find(
          (curr) => curr.id === dataCompanyInfo.currency_id
        );

        if (matchedCurrency) {
          setStateCurrency(matchedCurrency.name);
        }
      }
      setTimeFormats(dataCompanyInfo.time_format)
      setCompanyCopyrightText(dataCompanyInfo.copy_right);
      if (dataCompanyInfo.currency_position === "right") {
        setLeftCurrency(0);
        setRightCurrency(1);
      } else {
        setLeftCurrency(1);
        setRightCurrency(0);
      }


    }

    console.log("data fetch company :", dataCompany);
  }, [dataCompany, dataCompanyInfo]);

  useEffect(() => {
    if (dataMaintennance) {

      setDataMain(dataMaintennance)
      // data maintenance
      setMaintenanceMode(dataMaintennance.maintenance.status)
      setEndDate(dataMaintennance.maintenance.end_date)
      setStartDate(dataMaintennance.maintenance.start_date)
      setCustomize(dataMaintennance.maintenance.customize)
      setUntilChange(dataMaintennance.maintenance.until_change)
      setForWeek(dataMaintennance.maintenance.week)
      setForDay(dataMaintennance.maintenance.day)
      setDeliverymanApp(dataMaintennance.maintenance.delivery)
      setBranchPanel(dataMaintennance.maintenance.branch)
      setCustomerApp(dataMaintennance.maintenance.customer)
      setAllSystem(dataMaintennance.maintenance.all)
      setWebApp(dataMaintennance.maintenance.web)
      console.log('data menteneance100', dataMaintennance)
    }
  }, [dataMaintennance])

  // useEffect(() => {
  //   if (dataCity && dataCity.cities) {
  //     const cityNames = dataCity.cities.map((city) => ({ name: city.name }));
  //     setCountries(cityNames);
  //   }
  //   console.log("data city ", dataCity?.cities?.[0]?.name);
  // }, [dataCity]);

  // useEffect(() => {
  //      if (dataMain ) {
  //             setDataMaintenance(dataMain)
  //             setMaintenanceMode(dataMain.status)
  //             setEndDate(dataMain.end_date)
  //             setStartDate(dataMain.start_date)
  //             setCustomize(dataMain.customize)
  //             setUntilChange(dataMain.until_change)
  //             setForWeek(dataMain.week)
  //             setForDay(dataMain.day)
  //             setDeliverymanApp(dataMain.delivery)
  //             setBranchPanel(dataMain.branch)
  //             setCustomerApp(dataMain.customer)
  //             setAllSystem(dataMain.all)
  //             setWebApp(dataMain.web)

  //      }
  //      console.log("data maintence2 ",formDataMaintenance );
  //    }, [formDataMaintenance,dataMain]);


  useEffect(() => {
    // Log updated dataCurrency when it changes
    console.log("data fetch currency :", dataCurrency);

    console.log("data fetch company info :", dataCompanyInfo);
    console.log("data fetch maintenenn :", dataMain);
  }, [dataCurrency, dataCompanyInfo, dataMain]);




  // useEffect(() => {

  // }, [maintenanceMode,allSystem,branchPanel,customerApp,webApp,deliverymanApp,forDay,forWeek,untilChange,Customize,startDate,endDate])

  const handelAddCompany = async (e) => {
    e.preventDefault();


    // Validation for required fields

    if (!companyName) {
      auth.toastError("Please enter companyName ");
      return;
    }
    if (!companyPhone) {
      auth.toastError("Please enter companyPhone");
      return;
    }
    if (!companyEmail) {
      auth.toastError("Please enter companyEmail ");
      return;
    }
    if (!companyAddress) {
      auth.toastError("Please enter companyAddress");
    }
    if (!logo) {
      auth.toastError("Please enter logo");
    }
    if (!icon) {
      auth.toastError("Please enter icon");
    }
    if (!selectedTimeZone) {
      auth.toastError("Please enter timeZone");
    }
    if (!timeFormat) {
      auth.toastError("Please enter timeFormat");
    }

    //      if (!currency) {
    //        auth.toastError('Please enter currency');
    //      }

    if (!companyCopyrightText) {
      auth.toastError("Please enter companyCopyrightText");
    }


    if (leftCurrency === 0 && rightCurrency === 0) {
      auth.toastError("Please enter either leftCurrency or rightCurrency");
    }
    // -----------------------------------
    if (maintenanceMode === 0) {
      auth.toastError("Please enter maintenanceMode ");
      return;
    }

    if (allSystem === 0 && branchPanel === 0 && customerApp === 0 && webApp === 0 && deliverymanApp === 0) {
      auth.toastError("Please select at least one system.");
    }

    // const formDataMaintenance = new FormData();
    // formDataMaintenance.append("status",maintenanceMode)
    // formDataMaintenance.append("all",allSystem)
    // formDataMaintenance.append("branch",branchPanel)
    // formDataMaintenance.append("customer",customerApp)
    // formDataMaintenance.append("web",webApp)
    // formDataMaintenance.append("delivery",deliverymanApp)
    // formDataMaintenance.append("day",forDay)
    // formDataMaintenance.append("week",forWeek)
    // formDataMaintenance.append("until_change",untilChange)
    // formDataMaintenance.append("customize",Customize)
    // formDataMaintenance.append("start_date",startDate)
    // formDataMaintenance.append("end_date",endDate)




    // const updatedData = [
    //   ["status", maintenanceMode],
    //   ["all", allSystem],
    //   ["branch", branchPanel],
    //   ["customer", customerApp],
    //   ["web", webApp],
    //   ["delivery", deliverymanApp],
    //   ["day", forDay],
    //   ["week", forWeek],
    //   ["until_change", untilChange],
    //   ["customize", Customize],
    //   ["start_date", startDate],
    //   ["end_date", endDate]
    // ];

    // // Update the state with the new array
    // setFormDataMaintenance(updatedData);

    //    { postDataMaintenance(formDataMaintenance,"System Added Success")}


    //     postDataMain(formDataMaintenance, "Branch Added Success");

    //  ----------------------------------
    const updatedData = {
      status: maintenanceMode,
      all: allSystem,
      branch: branchPanel,
      customer: customerApp,
      web: webApp,
      delivery: deliverymanApp,
      day: forDay,
      week: forWeek,
      until_change: untilChange,
      customize: Customize,
      start_date: startDate,
      end_date: endDate
    };

    // Update the state with the new object

    // setFormDataMaintenance(updatedData);


    const formData = new FormData();

    formData.append("name", companyName);
    formData.append("phone", companyPhone);
    formData.append("email", companyEmail);
    formData.append("address", companyAddress);
    formData.append("address", companyAddress);

    formData.append("logo", logo);
    formData.append("fav_icon", icon);
    formData.append("time_zone", selectedTimeZone);

    formData.append("time_format", stateTimeFormat);
    formData.append("currency_id", currencyId);
    formData.append("country", selectedCountry);

    if (leftCurrency === 0 && rightCurrency === 0) {
      formData.append("currency_position", "");
    } else if (leftCurrency === 0 && rightCurrency === 1) {
      formData.append("currency_position", "right");
    } else if (leftCurrency === 1 && rightCurrency === 0) {
      formData.append("currency_position", "left");
    }


    formData.append("copy_right", companyCopyrightText);
    for (const [key, value] of Object.entries(updatedData)) {
      formData.append(`maintenance[${key}]`, value);
    }


    postData(formData, "Branch Added Success");
    console.log("all data ", formData)
  };

  useEffect(() => {
    const timeZones = moment.tz.names().map((name) => ({ name: name }));
    setTimeZone(timeZones);
    console.log("moment", moment.tz.names());
  }, []);

  const closeAll = () => {
    setIsOpenCountries(false);
    setIsOpenTimeZone(false);
    setIsOpenTimeFormat(false);
    // setIsOpenCurrency(false)
    setIsOpenCurrency(false);
  };
  const handleOpenCurrency = () => {
    closeAll();
    setIsOpenCurrency(!isOpenCurrency);
  };

  const handleOpenOptionCurrency = () => setIsOpenCurrency(false);

  const handleOpenCountries = () => {
    closeAll();
    setIsOpenCountries(!isOpenCountries);
  };
  const handleOpenTimeZone = () => {
    closeAll();
    setIsOpenTimeZone(!isOpenTimeZone);
  };
  const handleOpenTimeFormat = () => {
    closeAll();
    setIsOpenTimeFormat(!isOpenTimeFormat);
  };

  const handleSelectCurrency = (option) => {
    setCurrencyId(option.id);
    setStateCurrency(option.name);
  };

  const handleSelectCountry = (country) => {
    setStateCountries(country.name);
  };
  const handleSelectTimeZone = (timeZone) => {
    setStateTimeZone(timeZone.name);
  };
  const handleSelectTimeFormat = (timeFormat) => {
    setTimeFormat(timeFormat.id);
    setStateTimeFormat(timeFormat.name);
  };
  // const handleSelectCurrency = (currency) => {
  //        setStateCurrency(currency.name );
  // };

  const handleClickLeftCurrency = (e) => {
    const isChecked = e.target.checked;
    setLeftCurrency(isChecked ? 1 : 0);
    setRightCurrency(0);
  };
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
      setAllSystem(0);
      setBranchPanel(0);
      setCustomerApp(0);
      setWebApp(0);
      setDeliverymanApp(0);
      setForDay(0);
      setForWeek(0);
      setUntilChange(0);
      setCustomize(0);
      setStartDate("");
      setEndDate("");
    }
  };

  const handleClickForDay = (e) => {
    const isChecked = e.target.checked;
    setForDay(isChecked ? 1 : 0);
    setForWeek(0);
    setUntilChange(0);
    setCustomize(0);
  };
  const handleClickForWeek = (e) => {
    const isChecked = e.target.checked;
    setForDay(0);
    setForWeek(isChecked ? 1 : 0);
    setUntilChange(0);
    setCustomize(0);
  };
  const handleClickUntilChange = (e) => {
    const isChecked = e.target.checked;
    setForDay(0);
    setForWeek(0);
    setUntilChange(isChecked ? 1 : 0);
    setCustomize(0);
  };
  const handleClickCustomize = (e) => {
    const isChecked = e.target.checked;
    setForDay(0);
    setForWeek(0);
    setUntilChange(0);
    setCustomize(isChecked ? 1 : 0);
  };

  // Logo handler
  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file); // Assuming setLogoFile is defined elsewhere
      setLogo(file.name); // Set the file name as the value for logo
    } else {
      setLogo(''); // Reset logo value if no file is selected
    }
  };

  // Icon handler
  const handleIcon = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file); // Assuming setIconFile is defined elsewhere
      setIcon(file.name); // Set the file name as the value for icon
    } else {
      setIcon(''); // Reset icon value if no file is selected
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
        CountriesRef.current &&
        !CountriesRef.current.contains(event.target) &&
        TimeZoneRef.current &&
        !TimeZoneRef.current.contains(event.target) &&
        TimeFormatRef.current &&
        !TimeFormatRef.current.contains(event.target) &&
        CurrencyRef.current &&
        !CurrencyRef.current.contains(event.target)
      ) {
        setIsOpenCountries(false);
        setIsOpenTimeZone(false);
        setIsOpenTimeFormat(false);
        setIsOpenCurrency(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleReset = () => {
    setMaintenanceMode(0);
    setCompanyName("");
    setCompanyPhone("");
    setCompanyEmail("");
    setCompanyAddress("");
    setLogo("");
    setIcon("");
    setLogoFile(null);
    setIconFile(null);
    setStateCountries("Select Country");
    setStateTimeZone("Select Time Zone");
    setStateTimeFormat("Select Time Format");
    // setStateCurrency('Select Currency');
    setStateCurrency("Select Currency");
    setCurrencyId("");
    setLeftCurrency(0);
    setRightCurrency(0);
    setCompanyCopyrightText("");
    setAllSystem(0);
    setBranchPanel(0);
    setCustomerApp(0);
    setWebApp(0);
    setDeliverymanApp(0);
    setForDay(0);
    setForWeek(0);
    setUntilChange(0);
    setCustomize(0);
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
      {loadingCompany || loadingPost ? (
        <>
          <div className="w-full h-56 flex justify-center items-center">
            <LoaderLogin />
          </div>
        </>
      ) : (
        <form
          className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-4"
          onSubmit={handelAddCompany}
        >
          <div className="w-full">
            <TitleSection text={"System Maintenance"} />
            <p className="text-xl font-TextFontMedium text-secoundColor">
              *By turning on maintenance mode Control your all system & function
            </p>
          </div>
          {/* Maintenance Mode */}
          <div className="sm:w-full xl:w-[30%] flex items-center justify-start gap-3">
            <span className="text-xl font-TextFontRegular text-thirdColor">
              Maintenance Mode:
            </span>
            <div>
              <Switch
                checked={maintenanceMode}
                handleClick={handleClickMaintenanceMode}
              />
            </div>
          </div>

          <TitleSection text={"Company Information"} />
          {/* Company Name */}
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <span className="text-xl font-TextFontRegular text-thirdColor">
              Company Name:
            </span>
            <TextInput
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
            />
          </div>
          {/* Company Phone */}
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <span className="text-xl font-TextFontRegular text-thirdColor">
              Company Phone:
            </span>
            <NumberInput
              value={companyPhone}
              onChange={(e) => setCompanyPhone(e.target.value)}
              placeholder="Company Phone"
            />
          </div>
          {/* Company Email */}
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <span className="text-xl font-TextFontRegular text-thirdColor">
              Company Email:
            </span>
            <EmailInput
              backgound="white"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              placeholder="Company Email"
            />
          </div>
          {/* Company Address */}
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <span className="text-xl font-TextFontRegular text-thirdColor">
              Company Address:
            </span>
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

          <TitleSection text={"Business Information"} />

          {/* Countries */}
          {/* <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
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
                            </div> */}
          {/* Countries 2 */}
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <span className="text-xl font-TextFontRegular text-thirdColor">
              Countries:
            </span>
            <Dropdown
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.value)}
              options={countries}
              optionLabel="name"
              placeholder="Select a Country"
              filter
              className="w-full md:w-14rem"
            />
          </div>
          {/* Time Zone */}
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <span className="text-xl font-TextFontRegular text-thirdColor">
              Time Zone:
            </span>
            {/* <DropDown
                                          ref={TimeZoneRef}
                                          handleOpen={handleOpenTimeZone}
                                          stateoption={stateTimeZone}
                                          openMenu={isOpenTimeZone}
                                          handleOpenOption={handleOpenTimeZone}
                                          onSelectOption={handleSelectTimeZone}
                                          options={timeZone}
                                          border={false}
                                   /> */}
            <Dropdown
              value={selectedTimeZone}
              onChange={(e) => setSelectedTimeZone(e.value)}
              options={timeZone}
              optionLabel="name"
              placeholder="Select a Time Zone"
              filter
              className="w-full md:w-14rem"
            />
          </div>
          {/* Time Format */}
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <span className="text-xl font-TextFontRegular text-thirdColor">
              Time Format:
            </span>
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
            <span className="text-xl font-TextFontRegular text-thirdColor">
              Currency:
            </span>
            <DropDown
              ref={CurrencyRef}
              handleOpen={handleOpenCurrency}
              stateoption={stateCurrency}
              openMenu={isOpenCurrency}
              handleOpenOption={handleOpenOptionCurrency}
              onSelectOption={handleSelectCurrency}
              options={[{ id: '', name: 'Select Currency' }, ...dataCompany.currency] || []}
              border={false}
            />
          </div>

          <div className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4">
            {/* Currency Position */}
            <span className="text-xl font-TextFontRegular text-thirdColor">
              Currency Position:
            </span>
            <div className="sm:w-full xl:w-[30%] flex items-center justify-start gap-3">
              <span className="text-xl font-TextFontRegular text-thirdColor">
                (E£) Left:
              </span>
              <div>
                <Switch
                  checked={leftCurrency}
                  handleClick={handleClickLeftCurrency}
                />
              </div>
            </div>
            <div className="sm:w-full xl:w-[30%] flex items-center justify-start gap-3">
              <span className="text-xl font-TextFontRegular text-thirdColor">
                (E£) Right:
              </span>
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
            <span className="text-xl font-TextFontRegular text-thirdColor">
              Company Copyright Text:
            </span>
            <TextInput
              value={companyCopyrightText}
              onChange={(e) => setCompanyCopyrightText(e.target.value)}
              placeholder="Company Copyright Text"
            />
          </div>

          {maintenanceMode === 1 && (
            <>
              <div className="w-full">
                <TitleSection text={"Select System"} />
                <p className="text-xl font-TextFontMedium text-secoundColor">
                  Select the systems you want to temporarily deactivate for
                  maintenance
                </p>
              </div>
              {/* All System */}
              <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                <span className="text-xl font-TextFontRegular text-thirdColor">
                  All System:
                </span>
                <div>
                  <Switch
                    checked={allSystem}
                    handleClick={handleClickAllSystem}
                  />
                </div>
              </div>
              {/* Branch Panel */}
              <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                <span className="text-xl font-TextFontRegular text-thirdColor">
                  Branch Panel:
                </span>
                <div>
                  <Switch
                    checked={branchPanel}
                    handleClick={handleClickBranchPanel}
                  />
                </div>
              </div>
              {/* Customer App */}
              <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                <span className="text-xl font-TextFontRegular text-thirdColor">
                  Customer App:
                </span>
                <div>
                  <Switch
                    checked={customerApp}
                    handleClick={handleClickCustomerApp}
                  />
                </div>
              </div>
              {/* Web App */}
              <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                <span className="text-xl font-TextFontRegular text-thirdColor">
                  Web App:
                </span>
                <div>
                  <Switch checked={webApp} handleClick={handleClickWebApp} />
                </div>
              </div>
              {/* Deliveryman App */}
              <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                <span className="text-xl font-TextFontRegular text-thirdColor">
                  Deliveryman App:
                </span>
                <div>
                  <Switch
                    checked={deliverymanApp}
                    handleClick={handleClickDeliverymanApp}
                  />
                </div>
              </div>

              <div className="w-full">
                <TitleSection text={"Maintenance Date & Time"} />
                <p className="text-xl font-TextFontMedium text-secoundColor">
                  Choose the maintenance mode duration for your selected system.
                </p>
              </div>

              {/* For 24 Hours */}
              <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                <span className="text-xl font-TextFontRegular text-thirdColor">
                  For 24 Hours:
                </span>
                <div>
                  <Switch checked={forDay} handleClick={handleClickForDay} />
                </div>
              </div>
              {/*  For 1 Week */}
              <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                <span className="text-xl font-TextFontRegular text-thirdColor">
                  For 1 Week:
                </span>
                <div>
                  <Switch checked={forWeek} handleClick={handleClickForWeek} />
                </div>
              </div>
              {/* Until I Change */}
              <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                <span className="text-xl font-TextFontRegular text-thirdColor">
                  Until I Change:
                </span>
                <div>
                  <Switch
                    checked={untilChange}
                    handleClick={handleClickUntilChange}
                  />
                </div>
              </div>
              {/* Customize */}
              <div className="sm:w-full xl:w-[20%] flex items-center justify-start gap-3">
                <span className="text-xl font-TextFontRegular text-thirdColor">
                  Customize:
                </span>
                <div>
                  <Switch
                    checked={Customize}
                    handleClick={handleClickCustomize}
                  />
                </div>
              </div>
              {/* Start Date */}
              <div className="sm:w-full xl:w-[30%] flex items-center justify-start gap-3">
                <span className="text-xl font-TextFontRegular text-thirdColor">
                  Start Date:
                </span>
                <div>
                  <DateInput
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    maxDate={false}
                    minDate={true}
                  />
                </div>
              </div>
              {/* End Date */}
              <div className="sm:w-full xl:w-[30%] flex items-center justify-start gap-3">
                <span className="text-xl font-TextFontRegular text-thirdColor">
                  End Date:
                </span>
                <div>
                  <DateInput
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
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
              <StaticButton
                text={"Reset"}
                handleClick={handleReset}
                bgColor="bg-transparent"
                Color="text-mainColor"
                border={"border-2"}
                borderColor={"border-mainColor"}
                rounded="rounded-full"
              />
            </div>
            <div className="">
              <SubmitButton
                text={"Submit"}
                rounded="rounded-full"
                handleClick={handelAddCompany}
              />
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default BusinessSettingsPage;
