import React from 'react'
import { TitlePage } from '../../../Components/Components'
import { EditCategoryPage } from '../../../Pages/Pages'

const EditCategotyLayout = () => {
       return (
              <>
                     <TitlePage text={'Edit Category'} />
                     <EditCategoryPage />
              </>
       )
}

export default EditCategotyLayout