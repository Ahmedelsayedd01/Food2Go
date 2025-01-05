import React from 'react'
import { TitlePage } from '../../../../Components/Components'
import { EditRolePage } from '../../../../Pages/Pages'

const EditRoleLayout = () => {
       return (
              <>
                     <TitlePage text={'Edit Role'} />
                     <EditRolePage />
              </>
       )
}

export default EditRoleLayout