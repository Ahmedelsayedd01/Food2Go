import React from 'react'
import { TitlePage } from '../../../../Components/Components'
import { EditBranchPage } from '../../../../Pages/Pages'

const EditBranchLayout = () => {
       return (
              <>
                     <TitlePage text={'Edit Branch'} />
                     <EditBranchPage />
              </>
       )
}

export default EditBranchLayout