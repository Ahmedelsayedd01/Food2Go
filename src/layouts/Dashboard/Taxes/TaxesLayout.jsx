import React, { useState } from 'react'
import { TitlePage, TitleSection } from '../../../Components/Components'
import { AddTaxSection, TaxesPage } from '../../../Pages/Pages'

const TaxesLayout = () => {
       const [update, setUpdate] = useState(false)
       return (
              <>
                     <TitlePage text={'Add Tax'} />
                     <AddTaxSection update={update} setUpdate={setUpdate} />
                     <TitleSection text={'Taxes Table'} />
                     <TaxesPage refetch={update} />
              </>
       )
}

export default TaxesLayout