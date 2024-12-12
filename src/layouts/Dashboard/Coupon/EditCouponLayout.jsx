import React from 'react'
import { TitlePage } from '../../../Components/Components'
import { EditCouponPage } from '../../../Pages/Pages'

const EditCouponLayout = () => {
       return (
              <>
                     <TitlePage text={'Edit Coupon'} />
                     <EditCouponPage />
              </>
       )
}

export default EditCouponLayout