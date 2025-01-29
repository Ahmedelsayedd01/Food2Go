import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import { useParams } from 'react-router-dom';
import { LoaderLogin } from '../../../../../Components/Components';
import { useSelector } from 'react-redux';

const InvoiceOrderPage = () => {
  const user = useSelector(state => state.user)
  const { orderId } = useParams();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { refetch: refetchInvoiceOrder, loading: loadingInvoiceOrder, data: dataInvoiceOrder } = useGet({ url: `${apiUrl}/admin/order/invoice/${orderId}` });

  const [invoiceData, setInvoiceData] = useState([])

  useEffect(() => {
    refetchInvoiceOrder(); // Refetch data when the component mounts
  }, [refetchInvoiceOrder]);

  useEffect(() => {
    if (dataInvoiceOrder && dataInvoiceOrder.order) {
      setInvoiceData(dataInvoiceOrder.order)
    }

    console.log('dataInvoiceOrder', dataInvoiceOrder); // Refetch data when the component mounts
    console.log('invoiceData', invoiceData); // Refetch data when the component mounts
  }, [dataInvoiceOrder]);
  useEffect(() => {
    console.log('orderId', orderId); // Refetch data when the component mounts
  }, [orderId]);

  let totalAddonPrice = 0;
  let totalItemPrice = 0;

  return (
    <>
      {invoiceData.length === 0 ? (
        <div>
          <LoaderLogin />
        </div>
      ) : (
        <div className="p-6 w-2/4 mx-auto text-black font-sans mb-20">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-lg font-TextFontSemiBold">{user.name}</h1>
            <p className="text-sm">
              {invoiceData?.branch?.name || '-'}
              {invoiceData?.branch?.address || '-'}
            </p>
            <p className="text-sm">
              Phone : {invoiceData?.branch?.phone || '-'}
            </p>
            <hr className="my-2" />
          </div>

          {/* Order Information */}
          <div className="text-sm mb-4">
            <p>
              <strong>Order ID : </strong> {invoiceData.id} &nbsp;&nbsp;&nbsp;
              <strong>Date: </strong> {invoiceData?.order_date || '-'}, {invoiceData?.date || '-'}
            </p>
            <p>
              <strong>Customer Name : </strong> {invoiceData?.user?.f_name || '-'} {invoiceData?.user?.l_name || '-'}
            </p>
            <p>
              <strong>Phone : </strong> {invoiceData?.user?.phone || '-'}
            </p>
            <p>
              <strong>Address : </strong>  {invoiceData?.address?.address || '-'}
            </p>
          </div>

          {/* Items Table */}
          {invoiceData.order_details.map((item, index) => (
            <div className='border-b-2 border-gray-500' key={index} >
              <div className="text-center mb-2">
                <strong>Product Num({index + 1})</strong>
              </div>
              <table className="w-full text-sm border-collapse border-2 border-black mb-4">
                <thead>
                  <tr>
                    <th className="border border-black p-2">QTY</th>
                    <th className="border border-black p-2">DESC</th>
                    <th className="border border-black p-2">Price</th>
                    <th className="border border-black p-2">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {item.product.map((itemProduct, indexProduct) => (
                    <tr key={`product-${itemProduct.id}-${indexProduct}`}>
                      <td className="border border-black p-2 text-center">{indexProduct + 1}</td>
                      <td className="border border-black p-2 text-center">{itemProduct.product.name}</td>
                      <td className="border border-black p-2 text-center">{itemProduct.product.price}</td>
                      <td className="border border-black p-2 text-center">{itemProduct.count}</td>
                    </tr>
                  ))}
                </tbody>

              </table>

              <div className="text-center mb-2">
                <strong>Addons Num({index + 1})</strong>
              </div>
              <table className="w-full text-sm border-collapse border-2 border-black mb-4">
                <thead>
                  <tr>
                    <th className="border border-black p-2">QTY</th>
                    <th className="border border-black p-2">DESC</th>
                    <th className="border border-black p-2">Price</th>
                    <th className="border border-black p-2">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {item.addons.map((itemAddons, indexAddons) => (
                    <tr key={itemAddons.addon.id}>
                      <td className="border border-black p-2 text-center">{indexAddons + 1}</td>
                      <td className="border border-black p-2 text-center">{itemAddons.addon.name}</td>
                      <td className="border border-black p-2 text-center">{itemAddons.addon.price}</td>
                      <td className="border border-black p-2 text-center">{itemAddons.count}</td>
                    </tr>
                  ))}
                </tbody>

              </table>

              <div className="text-center mb-2">
                <strong>Excludes Num({index + 1})</strong>
              </div>
              <table className="w-full text-sm border-collapse border-2 border-black mb-4">
                <thead>
                  <tr>
                    <th className="border border-black p-2">QTY</th>
                    <th className="border border-black p-2">DESC</th>
                  </tr>
                </thead>
                <tbody>
                  {item.excludes.map((itemExclude, indexExclude) => (
                    <tr key={itemExclude.id}>
                      <td className="border border-black p-2 text-center">{indexExclude + 1}</td>
                      <td className="border border-black p-2 text-center">{itemExclude.name}</td>
                    </tr>
                  ))}
                </tbody>

              </table>

              <div className="text-center mb-2">
                <strong>Extras Num({index + 1})</strong>
              </div>
              <table className="w-full text-sm border-collapse border-2 border-black mb-4">
                <thead>
                  <tr>
                    <th className="border border-black p-2">QTY</th>
                    <th className="border border-black p-2">DESC</th>
                    <th className="border border-black p-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {item.extras.map((itemExtra, indexExtra) => (
                    <tr key={itemExtra.id}>
                      <td className="border border-black p-2 text-center">{indexExtra + 1}</td>
                      <td className="border border-black p-2 text-center">{itemExtra.name}</td>
                      <td className="border border-black p-2 text-center">{itemExtra.price}</td>
                    </tr>
                  ))}
                </tbody>

              </table>

              <div className="text-center mb-2">
                <strong>Variations Num({index + 1})</strong>
              </div>
              {item.variations.map((item, indexItem) => (
                <div key={item.variation.id}>

                  <div className="text-center mb-2">
                    <strong>Variation({indexItem + 1})</strong>
                  </div>
                  <table className="w-full text-sm border-collapse border-2 border-black mb-4">
                    <thead>
                      <tr>
                        {/* <th className="border border-black p-2">QTY</th> */}
                        <th className="border border-black p-2">Name</th>
                        <th className="border border-black p-2">Type</th>
                        <th className="border border-black p-2">Max</th>
                        <th className="border border-black p-2">Min</th>
                        {/* <th className="border border-black p-2">Point</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {/* <td className="border border-black p-2 text-center">{indexItem + 1}</td> */}
                        <td className="border border-black p-2 text-center">{item.variation.name || '-'}</td>
                        <td className="border border-black p-2 text-center">{item.variation.type || '-'}</td>
                        <td className="border border-black p-2 text-center">{item.variation.max || '0'}</td>
                        <td className="border border-black p-2 text-center">{item.variation.min || '0'}</td>
                        {/* <td className="border border-black p-2 text-center">{item.variation.point || '0'}</td> */}
                      </tr>
                    </tbody>
                  </table>

                  {item.options.map((option, indexOption) => (
                    <div key={option.id}>

                      <div className="text-center mb-2">
                        <strong>Option({indexOption + 1})</strong>
                      </div>

                      <table className="w-full text-sm border-collapse border-2 border-black mb-4">
                        <thead>
                          <tr>
                            <th className="border border-black p-2">QTY</th>
                            <th className="border border-black p-2">Name</th>
                            <th className="border border-black p-2">Price</th>
                            <th className="border border-black p-2">Points</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-black p-2 text-center">{indexOption + 1}</td>
                            <td className="border border-black p-2 text-center">{option.name || '-'}</td>
                            <td className="border border-black p-2 text-center">{option.price || '0'}</td>
                            <td className="border border-black p-2 text-center">{option.points || '0'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}

          {/* Summary */}
          <div className="text-sm mb-4">
            <p>
              {invoiceData.order_details.forEach((orderDetail) => {
                // Sum extras prices
                orderDetail.extras.forEach((extraItem) => {
                  totalItemPrice += extraItem.price;
                });

                // Sum product prices (price * count)
                orderDetail.product.forEach((productItem) => {
                  totalItemPrice += productItem.product.price * productItem.count;
                });

                // Sum variations' options prices
                orderDetail.variations.forEach((variation) => {
                  variation.options.forEach((optionItem) => {
                    totalItemPrice += optionItem.price;
                  });
                });
              })}

              {/* Display total items price */}
              <strong>Items Price: </strong>
              {totalItemPrice}
            </p>
            <p>
              <strong>Tax / VAT: </strong> {invoiceData?.total_tax || 0}
            </p>
            <div>
              {invoiceData.order_details.map((orderDetail, detailIndex) => (
                <div key={detailIndex}>
                  {orderDetail.addons.map((addonItem, addonIndex) => {
                    // Add the price of each addon to the total
                    totalAddonPrice += addonItem.addon.price * addonItem.count;
                    return;
                  })}
                </div>
              ))}

              {/* console.log('first', first) */}

              {/* Display the total addon price */}
              {/* <div> */}
              <strong>Addons Price: </strong>{totalAddonPrice}
              {/* </div> */}
            </div>
            <p>
              <strong>Subtotal: </strong> {invoiceData?.amount + invoiceData?.total_tax + totalAddonPrice}
            </p>
            <p>
              <strong>Extra Discount: </strong> {invoiceData?.total_discount || 0}
            </p>
            <p>
              <strong>Coupon Discount: </strong> {invoiceData?.coupon_discount || 0}
            </p>
            <p>
              <strong>Delivery Fee: </strong>  {invoiceData?.address?.zone?.price || 0}
            </p>
            <p className="semibold text-lg">
              <strong>Total: </strong>
              {invoiceData?.amount}
            </p>
          </div>

          {/* Footer */}
          <div className="text-center text-sm">
            <p>THANK YOU</p>
            <p>copyright received {user.name} Food</p>
          </div>

        </div>
      )}
    </>
  );
};

export default InvoiceOrderPage;
