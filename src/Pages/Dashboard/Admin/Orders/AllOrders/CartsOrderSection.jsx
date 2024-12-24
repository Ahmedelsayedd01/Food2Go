import React from 'react'
import { Cart } from '../../../../../Components/Components'
import { CanceledIcon, ConfirmedIcon, DeliveredIcon, FailedToDeliverIcon, OutForDeliveryIcon, PendingIcon, ProcessingIcon, ReturnedIcon } from '../../../../../Assets/Icons/AllIcons'

const CartsOrderSection = ({ ordersNum }) => {
  console.log('ordersNum', ordersNum)
  return (
    <>
      <div className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-center gap-4 mt-4">
        <Cart
          route={'/dashboard/orders/pending'}
          icon={<PendingIcon />}
          title={'Pending'}
          count={ordersNum.ordersPending || 0}
        />
        <Cart
          route={'/dashboard/orders/confirmed'}
          icon={<ConfirmedIcon />}
          title={'Confirmed'}
          count={ordersNum.ordersConfirmed || 0}
        />
        <Cart
          route={'/dashboard/orders/processing'}
          icon={<ProcessingIcon />}
          title={'Processing'}
          count={ordersNum.ordersProcessing || 0}
        />
        <Cart
          route={'/dashboard/orders/out_for_delivery'}
          icon={<OutForDeliveryIcon />}
          title={'Out For Delivery'}
          count={ordersNum.OutForDelivery || 0}
        />
        <Cart
          route={'/dashboard/orders/delivered'}
          icon={<DeliveredIcon />}
          title={'Delivered'}
          count={ordersNum.ordersDelivered || 0}
        />
        <Cart
          route={'/dashboard/orders/canceled'}
          icon={<CanceledIcon />}
          title={'Canceled'}
          count={ordersNum.ordersCanceled || 0}
        />
        <Cart
          route={'/dashboard/orders/returned'}
          icon={<ReturnedIcon />}
          title={'Returned'}
          count={ordersNum.ordersReturned || 0}
        />
        <Cart
          route={'/dashboard/orders/failed_to_deliver'}
          icon={<FailedToDeliverIcon />}
          title={'Failed To Deliver'}
          count={ordersNum.FailedToDeliver || 0}
        />
      </div>
    </>
  )
}

export default CartsOrderSection