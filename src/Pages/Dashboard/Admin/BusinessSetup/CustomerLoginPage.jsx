import React, { useEffect, useState } from "react";
import {
  LoaderLogin,
  StaticButton,
  SubmitButton,
  Switch,
  TitleSection,
} from "../../../../Components/Components";
import { useGet } from "../../../../Hooks/useGet";
import { usePost } from "../../../../Hooks/usePostJson";
import { useAuth } from "../../../../Context/Auth";

const CustomerLoginPage = () => {
  const [manualLogin, setManualLogin] = useState(0);
  const [oTPLogin, setOTPLogin] = useState(0);
  const [emailVerification, setEmailVerification] = useState(0);
  const [phoneNumberVerification, setPhoneNumberVerification] = useState(0);
  const auth = useAuth()

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const {
    refetch: refetchLogin,
    loading: loadingLogin,
    data: dataLogin,
  } = useGet({
    url: `${apiUrl}/admin/settings/business_setup/customer_login`,
  });
  const [Loign, setLogin] = useState([]);

  const { postData, loadingPost, response } = usePost({
    url: `${apiUrl}/admin/settings/business_setup/customer_login/add`,
  });
  useEffect(() => {
    if (dataLogin && dataLogin.customer_login) {
      setLogin(dataLogin.customer_login);

      // Parse the 'setting' JSON
      const settings = JSON.parse(dataLogin.customer_login.setting);
      console.log("dataLogin fetch setting:", settings);
      // Login condition
      if (settings.login === "manuel") {
        setManualLogin(1);
      } else if (settings.login === "otp") {
        setOTPLogin(1);
      }

      // Verification conditions
      if (settings.verification === "email") {
        setEmailVerification(1);
      } else if (settings.verification === "phone") {
        setPhoneNumberVerification(1);
      }
    }

    console.log("dataLogin fetch:", dataLogin);
  }, [dataLogin]);

  const handleClickManualLogin = (e) => {
    const isChecked = e.target.checked;
    setManualLogin(isChecked ? 1 : 0);
    setOTPLogin(0);
  };
  const handleClickOTPLogin = (e) => {
    const isChecked = e.target.checked;
    setOTPLogin(isChecked ? 1 : 0);
    setManualLogin(0);
    setEmailVerification(0);
    setPhoneNumberVerification(0);
  };
  // const currentState = activeBranch;
  // { currentState === 0 ? setActiveBranch(1) : setActiveBranch(0) }

  const handleClickEmailVerification = (e) => {
    const isChecked = e.target.checked;
    setEmailVerification(isChecked ? 1 : 0);
    setPhoneNumberVerification(0);
  };
  const handleClickPhoneNumberVerification = (e) => {
    const isChecked = e.target.checked;
    setPhoneNumberVerification(isChecked ? 1 : 0);
    setEmailVerification(0);
  };

  const handleReset = () => {
    setManualLogin(0);
    setOTPLogin(0);
    setEmailVerification(0);
    setPhoneNumberVerification(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Error check for login method
    if (oTPLogin === 0 && manualLogin === 0) {
      auth.toastError("Please select a login method.");
      return;
    }

    const formData = new FormData();

    // Set login method
    if (manualLogin === 1) {
      formData.append("login", "manuel");

    } else if (oTPLogin === 1) {
      formData.append("login", "otp");

      // Set verification method for OTP login
      if (emailVerification === 1) {
        formData.append("verification", "email");
      } else if (phoneNumberVerification === 1) {
        formData.append("verification", "phone");
      }
    }

    // Post data with success message
    postData(formData, "Branch Added Successfully");
    console.log("all data submit ", formData)
  };


  return (
    <>
      {loadingLogin || loadingPost ? (
        <>
          <div className="w-full h-56 flex justify-center items-center">
            <LoaderLogin />
          </div>
        </>
      ) :
        <form
          className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-4"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <TitleSection text={"Restaurant Closing Schedules"} />
            <p className="text-xl font-TextFontMedium text-secoundColor">
              The option you select customer will have the to option to login
            </p>
          </div>

          <div className="sm:w-full xl:w-[30%] flex items-center justify-start gap-3">
            <span className="text-xl font-TextFontRegular text-thirdColor">
              Manual Login:
            </span>
            <div>
              <Switch
                checked={manualLogin}
                handleClick={handleClickManualLogin}
              />
            </div>
          </div>
          <div className="sm:w-full xl:w-[30%] flex items-center justify-start gap-3">
            <span className="text-xl font-TextFontRegular text-thirdColor">
              OTP Login:
            </span>
            <div>
              <Switch checked={oTPLogin} handleClick={handleClickOTPLogin} />
            </div>
          </div>
          {oTPLogin === 1 && (
            <>
              <div className="w-full">
                <TitleSection text={"OTP Verification"} />
                <p className="text-xl font-TextFontMedium text-secoundColor">
                  The option you select will need to be verified by the customer
                </p>
              </div>
              <div className="sm:w-full xl:w-[30%] flex items-center justify-start gap-3">
                <span className="text-xl font-TextFontRegular text-thirdColor">
                  Email Verification:
                </span>
                <div>
                  <Switch
                    checked={emailVerification}
                    handleClick={handleClickEmailVerification}
                  />
                </div>
              </div>
              <div className="sm:w-full xl:w-[30%] flex items-center justify-start gap-3">
                <span className="text-xl font-TextFontRegular text-thirdColor">
                  Phone Number Verification:
                </span>
                <div>
                  <Switch
                    checked={phoneNumberVerification}
                    handleClick={handleClickPhoneNumberVerification}
                  />
                </div>
              </div>
            </>
          )}
          {/* Buttons */}
          <div className="w-full flex items-center justify-end gap-x-4 ">
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
                handleClick={handleSubmit}
              />
            </div>
          </div>
        </form>
      }
    </>
  );
};

export default CustomerLoginPage;
