import React from 'react'
import { TitlePage } from '../../../Components/Components'
import { SongPage } from '../../../Pages/Pages'

const SongLayout = () => {
       return (
              <>
                     <TitlePage text={'Sound Notification Order '} />
                     <SongPage />
              </>
       )
}

export default SongLayout