import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGet } from '../../../../../Hooks/useGet';
import { useChangeState } from '../../../../../Hooks/useChangeState';
import { useDelete } from '../../../../../Hooks/useDelete';
import { StaticLoader, Switch } from '../../../../../Components/Components';
import { DeleteIcon, EditIcon } from '../../../../../Assets/Icons/AllIcons';

const PaymentMethodPage = () => {
  const { refetch: refetchPaymentMethods, loading: loadingPaymentMethods, data: dataPaymentMethods } = useGet({ url: 'https://Bcknd.food2go.online/admin/settings/payment_methods' });
  const { changeState, loadingChange, responseChange } = useChangeState();
  const { deleteData, loadingDelete, responseDelete } = useDelete();
  const [paymentMethods, setPaymentMethods] = useState([]);
  // Fetch categories when the component mounts or when refetch is called
  useEffect(() => {
    refetchPaymentMethods();
  }, [refetchPaymentMethods]); // Empty dependency array to only call refetch once on mount


  // Change paymentMethod status 
  const hangleChangeStaus = async (id, name, status) => {
    const response = await changeState(
      `https://Bcknd.food2go.online/admin/settings/payment_methods/status/${id}`,
      `${name} Changed Status.`,
      { status } // Pass status as an object if changeState expects an object
    );

    if (response) {
      setPaymentMethods((prevPaymentMethods) =>
        prevPaymentMethods.map((paymentMethod) =>
          paymentMethod.id === id ? { ...paymentMethod, status: status } : paymentMethod
        )
      );
    }


    // Log the updated categories after the state update
    setPaymentMethods((prevPaymentMethods) => {
      const updatedPaymentMethod = prevPaymentMethods.map((paymentMthod) =>
        paymentMthod.id === id ? { ...paymentMthod, status: status } : paymentMthod
      );
      console.log('Updated Payment Method:', updatedPaymentMethod);
      return updatedPaymentMethod;
    });
  };

  // Delete payment Method
  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://Bcknd.food2go.online/admin/settings/payment_methods/delete/${id}`, `${name} Deleted Success.`);

    if (success) {
      // Update categories only if changeState succeeded
      setPaymentMethods(
        paymentMethods.filter((paymentMethod) =>
          paymentMethod.id !== id
        )
      );
    }
    console.log('payment Methods', paymentMethods)
  };

  // Update categories when `data` changes
  useEffect(() => {
    if (dataPaymentMethods && dataPaymentMethods.payment_methods) {
      setPaymentMethods(dataPaymentMethods.payment_methods);
    }
    console.log('dataPaymentMethods', dataPaymentMethods)
  }, [dataPaymentMethods]); // Only run this effect when `data` changes



  const headers = ['#', 'Name', "Image", 'Description', 'Status', 'Action'];

  return (
    <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingPaymentMethods || loadingChange || loadingDelete ? (
        <div className='w-full mt-40'>
          <StaticLoader />
        </div>
      ) : (
        <table className="w-full sm:min-w-0">
          <thead className="w-full">
            <tr className="w-full border-b-2">
              {headers.map((name, index) => (
                <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3" key={index}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full">
            {paymentMethods.length === 0 ? (
              <tr>
                <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find Payment Methods</td>
              </tr>
            ) : (


              paymentMethods.map((paymentMethod, index) => ( // Example with two rows
                <tr className="w-full border-b-2" key={index}>
                  <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {index + 1}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {paymentMethod.name}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 overflow-hidden">
                    <div className="flex justify-center">
                      <img src={paymentMethod.logo_link}
                        className="bg-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                        alt="Photo"
                      />
                    </div>
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {paymentMethod.description}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    <Switch
                      checked={paymentMethod.status === 1}
                      handleClick={() => {
                        hangleChangeStaus(paymentMethod.id, paymentMethod.name, paymentMethod.status === 1 ? 0 : 1);
                      }}
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link to={`edit/${paymentMethod.id}`} className="text-blue-500 hover:underline"><EditIcon /></Link>
                      <button className="text-red-500" onClick={() => handleDelete(paymentMethod.id, paymentMethod.name)}><DeleteIcon /></button>
                    </div>
                  </td>
                </tr>
              ))

            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentMethodPage;
