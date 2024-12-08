import React from 'react'
import { TitlePage } from '../../../Components/Components'
import { EditTaxPage } from '../../../Pages/Pages'

const EditTaxLayout = () => {
       return (
              <>
                     <TitlePage text={'Edit Tax'} />
                     <EditTaxPage />
              </>
       )
}

export default EditTaxLayout