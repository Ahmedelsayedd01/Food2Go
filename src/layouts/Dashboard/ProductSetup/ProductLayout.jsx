import React from 'react'
import { TitleSection } from '../../../Components/Components'
import { ProductPage } from '../../../Pages/Pages'

const ProductLayout = () => {
       return (
              <>
                     <TitleSection text={'Product Table'} />
                     <ProductPage />
              </>
       )
}

export default ProductLayout