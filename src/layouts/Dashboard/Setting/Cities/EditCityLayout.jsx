import React from 'react'
import { EditCityPage } from '../../../../Pages/Pages'
import { TitlePage } from '../../../../Components/Components'

const EditCityLayout = () => {
       return (
              <>
                     <TitlePage text={'Edit City'} />
                     <EditCityPage />
              </>
       )
}

export default EditCityLayout