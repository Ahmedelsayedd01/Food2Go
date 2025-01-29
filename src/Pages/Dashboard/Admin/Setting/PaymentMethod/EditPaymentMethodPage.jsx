import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGet } from '../../../../../Hooks/useGet';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useAuth } from '../../../../../Context/Auth';
import { LoaderLogin, StaticButton, SubmitButton, Switch, TextInput, UploadInput } from '../../../../../Components/Components';


const EditPaymentMethodPage = () => {
  const { paymentMethodId } = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { refetch: refetchPaymentMethod, loading: loadingPaymentMethod, data: dataPaymentMethod } = useGet({ url: `${apiUrl}/admin/settings/payment_methods/item/${paymentMethodId}` });
  const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/admin/settings/payment_methods/update/${paymentMethodId}` });

  const auth = useAuth();
  const navigate = useNavigate();

  const ImageRef = useRef();

  const [paymentMethodName, setPaymentMethodName] = useState('');
  const [paymentMethodDescription, setPaymentMethodDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [paymentMethodStatus, setPaymentMethodStatus] = useState(0);

  useEffect(() => {
    refetchPaymentMethod(); // Refetch data when the component mounts
  }, [refetchPaymentMethod]);

  useEffect(() => {
    if (dataPaymentMethod && dataPaymentMethod.payment_method) {
      console.log('dataPaymentMethod', dataPaymentMethod)
      const data = dataPaymentMethod.payment_method;
      setPaymentMethodName(data?.name || '')
      setPaymentMethodDescription(data?.description || '')
      setImage(data?.logo_link || '')
      setImageFile(data?.logo_link || null)
      setPaymentMethodStatus(data?.status || 0)
    }
  }, [dataPaymentMethod]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(file.name);
    }
  };
  const handleImageClick = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handlePaymentMethodStatus = () => {
    const currentState = paymentMethodStatus;
    { currentState === 0 ? setPaymentMethodStatus(1) : setPaymentMethodStatus(0) }
  }

  useEffect(() => {
    console.log('response', response);
    if (!loadingPost && response) {
      handleCancel();
    }
  }, [loadingPost, response]);


  const handleCancel = () => {
    navigate(-1, { replace: true });
  };



  const handlePaymentMethodEdit = (e) => {
    e.preventDefault();


    if (!paymentMethodName) {
      auth.toastError('please Enter Payment Method Name')
      return;
    }
    if (!paymentMethodDescription) {
      auth.toastError('please Enter Payment Method Description')
      return;
    }
    if (!imageFile) {
      auth.toastError('please Set Payment Method Image')
      return;
    }
    const formData = new FormData();


    formData.append('name', paymentMethodName);
    formData.append('description', paymentMethodDescription);
    formData.append('logo', imageFile);
    formData.append('status', paymentMethodStatus);
    postData(formData, 'Payment Method Added Success');

  };
  return (
    <>
      {loadingPaymentMethod || loadingPost ? (
        <>
          <div className="w-full flex justify-center items-center">
            <LoaderLogin />
          </div>
        </>
      ) : (
        <section>
          <form onSubmit={handlePaymentMethodEdit}>
            <div className="sm:py-3 lg:py-6">
              <div
                className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4">
                {/* Name Input */}
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">payment Method Name:</span>
                  <TextInput
                    value={paymentMethodName} // Access category_name property
                    onChange={(e) => setPaymentMethodName(e.target.value)}
                    placeholder="payment Method Name"
                  />
                </div>
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">payment Method Description:</span>
                  <TextInput
                    value={paymentMethodDescription} // Access category_Des property
                    onChange={(e) => setPaymentMethodDescription(e.target.value)}
                    placeholder="payment Method Description"
                  />
                </div>
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">Payment Method Image:</span>
                  <UploadInput
                    value={image}
                    uploadFileRef={ImageRef}
                    placeholder="payment Method Image"
                    handleFileChange={handleImageChange}
                    onChange={(e) => setImage(e.target.value)}
                    onClick={() => handleImageClick(ImageRef)}
                  />
                </div>
                <div className="sm:w-full xl:w-[30%] flex items-start justify-start gap-x-1 pt-8">
                  <div className='w-2/4 flex items-center justify-start gap-x-1'>
                    <span className="text-xl font-TextFontRegular text-thirdColor">Status:</span>
                    <Switch handleClick={handlePaymentMethodStatus} checked={paymentMethodStatus} />
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons*/}
            <div className="w-full flex items-center justify-end gap-x-4">
              <div className="">
                <StaticButton text={'Cancel'} handleClick={handleCancel} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
              </div>
              <div className="">
                <SubmitButton
                  text={'Edit'}
                  rounded='rounded-full'
                  handleClick={handlePaymentMethodEdit}
                />
              </div>

            </div>
          </form>
        </section>
      )}
    </>
  )
}

export default EditPaymentMethodPage