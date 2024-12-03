import React, { useState } from 'react'
import { TitlePage, TitleSection } from '../../../Components/Components'
import { AddAddonsSection, AddonsPage } from '../../../Pages/Pages'

const AddonsLayout = () => {
       const [update, setUpdate] = useState(false)
       return (
              <>
                     <TitlePage text={'Add New Addons'} />
                     <AddAddonsSection update={update} setUpdate={setUpdate} />
                     <TitleSection text={'Addons Table'} />
                     <AddonsPage refetch={update} />
              </>
       )
}

export default AddonsLayout