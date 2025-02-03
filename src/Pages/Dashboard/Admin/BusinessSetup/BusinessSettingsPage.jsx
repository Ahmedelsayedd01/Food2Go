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
      'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola',
      'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
      'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados',
      'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
      'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei',
      'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
      'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile',
      'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the',
      'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
      'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador',
      'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia',
      'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France',
      'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana',
      'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
      'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland',
      'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
      'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan',
      'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South',
      'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
      'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
      'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia',
      'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania',
      'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco',
      'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
      'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand',
      'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway',
      'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama',
      'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland',
      'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda',
      'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
      'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles',
      'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
      'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka',
      'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
      'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste',
      'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
      'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
      'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
      'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia',
      'Zimbabwe'
    ]
  );
  const [isOpenCountries, setIsOpenCountries] = useState(false);

  const [stateTimeZone, setStateTimeZone] = useState("Select Time Zone");
  const [selectedTimeZone, setSelectedTimeZone] = useState("");
  const [timeZone, setTimeZone] = useState([]);

  const [isOpenTimeZone, setIsOpenTimeZone] = useState(false);

  const [isOpenTimeFormat, setIsOpenTimeFormat] = useState(false);

  // const [stateCurrency, setStateCurrency] = useState('Select Currency');
  // const [currency, setCurrency] = useState([{ name: 'EGP' }, { name: 'USD' }, { name: 'GBP' }, { name: 'CAD' }]);
  // const [isOpenCurrency, setIsOpenCurrency] = useState(false);

  const [leftCurrency, setLeftCurrency] = useState(0);
  const [rightCurrency, setRightCurrency] = useState(0);

  const [companyCopyrightText, setCompanyCopyrightText] = useState("");

  const [stateTimeFormat, setStateTimeFormat] = useState("Select Time Format");
  const [selectedTimeFormat, setSelectedTimeFormat] = useState("");
  const [timeFormat, setTimeFormat] = useState([
    { name: "am/pm" },
    { name: "24hours" },
  ]);

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

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const {
    refetch: refetchCompany,
    loading: loadingCompany,
    data: dataCompany,
  } = useGet({
    url: `${apiUrl}/admin/settings/business_setup/company`,
  });

  // const {
  //   refetch: refetchMaintenance,
  //   loading: loadingMaintenance,
  //   data: dataMaintennance,
  // } = useGet({
  //   url: `${apiUrl} / admin / settings / business_setup / maintenance``,
  // });

  const {
    refetch: refetchCity,
    loading: loadingCity,
    data: dataCity,
  } = useGet({
    url: `${apiUrl}/admin/settings/city`
  });




  const [dataCompanyInfo, setDataCompanyInfo] = useState([]);

  const [dataCurrency, setDataCurrency] = useState([]);
  const [stateCurrency, setStateCurrency] = useState("Select Currency");
  const [currencyId, setCurrencyId] = useState("");
  const [isOpenCurrency, setIsOpenCurrency] = useState(false);
  const [dataMain, setDataMain] = useState([])
  const [dataMaintennance, setDataMaintenance] = useState({})
  const [formDataMaintenance, setFormDataMaintenance] = useState({});

  const { postData, loadingPost, response } = usePost({
    url: `${apiUrl}/admin/settings/business_setup/company/add`,
  });


  // const { postDataStatus, loadingPostStatus, responseStatus } = usePost({
  //      url: `${apiUrl} / admin / settings / business_setup / maintenance / status",
  //    });

  //  const { postDataMaintenance, loadingPostMaintenance, responseMaintenanace } = usePost({
  //    url: `${apiUrl}/admin/settings/business_setup/maintenance/add",
  //  });

  useEffect(() => {
    refetchCompany();
    refetchCity();
    // refetchMaintenance();
  }, [refetchCompany, refetchCity]);


  useEffect(() => {
    if (dataCompany) {

      // setDataCurrency(dataCompany?.currency || []);
      // setDataCompanyInfo(dataCompany?.company_info || []);
      setCompanyName(dataCompany?.company_info?.name || '');
      setCompanyPhone(dataCompany?.company_info?.phone || '');
      setCompanyEmail(dataCompany?.company_info?.email || '');
      setCompanyAddress(dataCompany?.company_info?.address || '');
      setIcon(dataCompany?.company_info?.fav_icon_link || '');
      setLogo(dataCompany?.company_info?.logo_link || '');
      setStateCountries(dataCompany?.company_info?.country || stateCountries);
      setSelectedCountry(dataCompany?.company_info?.country || selectedCountry)

      setStateTimeZone(dataCompany?.company_info?.time_zone || '');
      setSelectedTimeZone({ name: dataCompany?.company_info?.time_zone || '' });

      setSelectedTimeFormat(dataCompany?.company_info?.time_format || stateTimeFormat)
      setStateTimeFormat(dataCompany?.company_info?.time_format || stateTimeFormat)

      setDataMaintenance(dataCompany?.maintenance || {})
      setAllSystem(dataCompany?.maintenance?.all || 0)
      setBranchPanel(dataCompany?.maintenance?.branch || 0)
      setCustomerApp(dataCompany?.maintenance?.customer || 0)
      setWebApp(dataCompany?.maintenance?.web || 0)
      setDeliverymanApp(dataCompany?.maintenance?.delivery || 0)
      setForDay(dataCompany?.maintenance?.day || 0)
      setForWeek(dataCompany?.maintenance?.week || 0)
      setUntilChange(dataCompany?.maintenance?.until_change || 0)
      setCustomize(dataCompany?.maintenance?.customize || 0)
      setMaintenanceMode(dataCompany?.maintenance?.status || 0)
      setStartDate(dataCompany?.maintenance?.start_date || '')
      setEndDate(dataCompany?.maintenance?.end_date || '')


      if (dataCompany.company_info.currency_id) {
        const matchedCurrency = dataCompany.currency.find(
          (curr) => curr.id === dataCompany.company_info.currency_id
        );

        if (matchedCurrency) {
          setStateCurrency(matchedCurrency.name);
          setCurrencyId(matchedCurrency.id);
        }
      }
      setCompanyCopyrightText(dataCompany.company_info.copy_right);
      if (dataCompany.company_info.currency_position === "right") {
        setLeftCurrency(0);
        setRightCurrency(1);
      } else {
        setLeftCurrency(1);
        setRightCurrency(0);
      }


    }
    // console.log("data fetch maintenance" ,dataCompany.maintenance)
    console.log("data fetch company :", dataCompany);
  }, [dataCompany]);

  // useEffect(() => {
  //   if (dataMaintennance) {

  //     setDataMain(dataMaintennance)
  //     // data maintenance
  //     setMaintenanceMode(dataMaintennance.maintenance.status)
  //     setEndDate(dataMaintennance.maintenance.end_date)
  //     setStartDate(dataMaintennance.maintenance.start_date)
  //     setCustomize(dataMaintennance.maintenance.customize)
  //     setUntilChange(dataMaintennance.maintenance.until_change)
  //     setForWeek(dataMaintennance.maintenance.week)
  //     setForDay(dataMaintennance.maintenance.day)
  //     setDeliverymanApp(dataMaintennance.maintenance.delivery)
  //     setBranchPanel(dataMaintennance.maintenance.branch)
  //     setCustomerApp(dataMaintennance.maintenance.customer)
  //     setAllSystem(dataMaintennance.maintenance.all)
  //     setWebApp(dataMaintennance.maintenance.web)
  //     console.log('data menteneance100', dataMaintennance)
  //   }
  // }, [dataMaintennance])

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

    // if (maintenanceMode === 0) {
    //   auth.toastError("Please enter maintenanceMode ");
    //   return;
    // }
    if (maintenanceMode !== 0) {
      if (allSystem === 0 && branchPanel === 0 && customerApp === 0 && webApp === 0 && deliverymanApp === 0) {
        auth.toastError("Please select at least one system.");
        return;
      }
    }



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
    };

    if (Customize === 1) {
      updatedData.start_date = startDate;
      updatedData.end_date = endDate;
    }






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
    formData.append("time_zone", JSON.stringify(selectedTimeZone?.name || ""));

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


    postData(formData, "Business Setup Success");
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
    setCountries(country.id)
    setStateCountries(country.name);
  };
  const handleSelectTimeZone = (timeZone) => {
    setStateTimeZone(timeZone.name);
  };
  const handleSelectTimeFormat = (timeFormat) => {
    setSelectedTimeFormat(timeFormat.name);
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

    setStartDate(startDate || '')
    setEndDate(endDate || '')
  };
  const handleClickForWeek = (e) => {
    const isChecked = e.target.checked;
    setForDay(0);
    setForWeek(isChecked ? 1 : 0);
    setUntilChange(0);
    setCustomize(0);

    setStartDate(startDate || '')
    setEndDate(endDate || '')
  };
  const handleClickUntilChange = (e) => {
    const isChecked = e.target.checked;
    setForDay(0);
    setForWeek(0);
    setUntilChange(isChecked ? 1 : 0);
    setCustomize(0);

    setStartDate(startDate || '')
    setEndDate(endDate || '')
    console.log(startDate)
    console.log(endDate)
  };
  const handleClickCustomize = (e) => {
    const isChecked = e.target.checked;
    setForDay(0);
    setForWeek(0);
    setUntilChange(0);
    setCustomize(isChecked ? 1 : 0);

    setStartDate(startDate || '')
    setEndDate(endDate || '')
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
    setCompanyName("");
    setCompanyPhone("");
    setCompanyEmail("");
    setCompanyAddress("");
    setLogoFile("");
    setLogo("");
    setIconFile("");
    setStateCountries("Select Country");
    setSelectedCountry("");
    setStateTimeZone("Select Time Zone");
    setSelectedTimeZone("");
    setStateTimeFormat("Select Time Format");
    setSelectedTimeFormat("");
    setStateCurrency('Select Currency');
    setCurrencyId('');
    setLeftCurrency(0);
    setRightCurrency(0);
    setCompanyCopyrightText("");

    setMaintenanceMode(0);
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
            <Dropdown
              value={selectedTimeZone}
              onChange={(e) => setSelectedTimeZone(e.value)}
              options={timeZone}
              optionLabel="name"
              placeholder={stateTimeZone || selectedTimeZone.name}
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
              {Customize === 1 && (

                <>
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
            </>
          )
          }

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