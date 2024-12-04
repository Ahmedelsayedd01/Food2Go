import React, { useState } from 'react'
import { TitlePage, TitleSection } from '../../../../Components/Components'
import { AddCitySection, CitiesPage } from '../../../../Pages/Pages'

const CitiesLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Add New City'} />
      <AddCitySection update={update} setUpdate={setUpdate} />
      <TitleSection text={'Cities Table'} />
      <CitiesPage refetch={update} />
    </>
  )
}

export default CitiesLayout