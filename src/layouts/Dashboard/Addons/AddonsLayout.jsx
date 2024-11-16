import React from 'react'
import { TitlePage, TitleSection } from '../../../Components/Components'
import { AddAddonsSection, AddonsPage } from '../../../Pages/Pages'

const AddonsLayout = () => {
       return (
              <>
                     <TitlePage text={'Add New Addons'} />
                     <AddAddonsSection />
                     <TitleSection text={'Addons Table'} />
                     <AddonsPage />
              </>
       )
}

export default AddonsLayout