import React, { useState } from 'react'
import { TitlePage, TitleSection } from '../../../Components/Components'
import { AddDiscountSection, DiscountPage } from '../../../Pages/Pages'

const DiscountLayout = () => {
       const [update, setUpdate] = useState(false)
       return (
              <>
                     <TitlePage text={'Add Discount'} />
                     <AddDiscountSection update={update} setUpdate={setUpdate} />
                     <TitleSection text={'Discounts Table'} />
                     <DiscountPage refetch={update} />
              </>
       )
}

export default DiscountLayout