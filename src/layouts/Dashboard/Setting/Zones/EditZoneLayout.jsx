import React from 'react'
import { TitlePage } from '../../../../Components/Components'
import { EditZonePage } from '../../../../Pages/Pages'

const EditZoneLayout = () => {
       return (
              <>
                     <TitlePage text={'Edit Zone'} />
                     <EditZonePage />
              </>
       )
}

export default EditZoneLayout