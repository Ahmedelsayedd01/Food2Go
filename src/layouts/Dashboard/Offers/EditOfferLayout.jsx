import React from 'react'
import { TitlePage } from '../../../Components/Components'
import { EditOfferPage } from '../../../Pages/Pages'

const EditOfferLayout = () => {
       return (
              <>
                     <TitlePage text={'Edit Offer'} />
                     <EditOfferPage />
              </>
       )
}

export default EditOfferLayout