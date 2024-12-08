import React from 'react'
import { TitlePage } from '../../../Components/Components'
import { TaxTypePage } from '../../../Pages/Pages'

const TaxTypeLayout = () => {
       return (
              <>
                     <TitlePage text={'Tax Type'} />
                     <TaxTypePage />
              </>
       )
}

export default TaxTypeLayout