import React, { useState } from 'react'
import { AddCouponSection, CouponPage } from '../../../Pages/Pages'
import { TitlePage, TitleSection } from '../../../Components/Components'

const CouponLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Add New Coupon'} />
      <AddCouponSection update={update} setUpdate={setUpdate} />
      <TitleSection text={'Coupon Table'} />
      <CouponPage refetch={update} setUpdate={setUpdate} />
    </>
  )
}

export default CouponLayout