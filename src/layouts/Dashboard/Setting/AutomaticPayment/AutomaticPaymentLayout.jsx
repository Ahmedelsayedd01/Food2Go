import React, { useState } from 'react'
import { AutomaticPaymentPage } from '../../../../Pages/Pages'
import { TitlePage, TitleSection } from '../../../../Components/Components'

const AutomaticPaymentLayout = () => {
       const [update, setUpdate] = useState(false)
       return (
              <>
                     {/* <TitlePage text={'Add New Payment Method'} />
                     <AddPaymentMethodSection update={update} setUpdate={setUpdate}/> */}
                     <TitleSection text={'Automatic Payment'} />
                     <AutomaticPaymentPage refetch={update}/>
              </>
       )
}

export default AutomaticPaymentLayout