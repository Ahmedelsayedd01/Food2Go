import React from 'react'
import { DealOrderPage, SongPage } from '../../../Pages/Pages'
import { TitlePage } from '../../../Components/Components'

const SongLayout = () => {
       return (
              <>
                     <TitlePage text={'Deal Order'} />
                     <DealOrderPage />
              </>
       )
}

export default SongLayout