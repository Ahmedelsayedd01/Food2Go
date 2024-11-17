import React from 'react'
import { AddButton, TitleSection } from '../../../Components/Components'
import { ProductPage } from '../../../Pages/Pages'
import { useNavigate } from 'react-router-dom'

const ProductLayout = () => {
       const navigate = useNavigate()
       return (
              <div className="w-full flex flex-col items-start gap-y-3">
                     <div className='sm:w-full lg:w-52 mt-4'>
                            <AddButton
                                   Text='Add Product'
                                   isWidth={true}
                                   handleClick={() => navigate('add', { replace: true })}
                            />
                     </div>
                     <TitleSection text={'Product Table'} />
                     <ProductPage />
              </div>
       )
}

export default ProductLayout