import React, { useState } from 'react'
import { TitlePage, TitleSection } from '../../../Components/Components'
import { AddLanguagesSection, LanguagesPage } from '../../../Pages/Pages'

const LanguagesLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Add language'} />
      <AddLanguagesSection update={update} setUpdate={setUpdate} />
      <TitleSection text={'Languages Table'} />
      <LanguagesPage refetch={update} />
    </>
  )
}

export default LanguagesLayout