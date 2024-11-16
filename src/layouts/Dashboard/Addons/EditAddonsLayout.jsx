import React from 'react'
import { TitlePage } from '../../../Components/Components'
import { EditAddonsPage } from '../../../Pages/Pages'

const EditAddonsLayout = () => {
       return (
              <>
                     <TitlePage text={'Edit Addon'} />
                     <EditAddonsPage />
              </>
       )
}

export default EditAddonsLayout