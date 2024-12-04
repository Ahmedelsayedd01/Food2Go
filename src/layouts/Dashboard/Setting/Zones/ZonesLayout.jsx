import React, { useState } from 'react'
import { TitlePage, TitleSection } from '../../../../Components/Components'
import { AddZoneSection, ZonesPage } from '../../../../Pages/Pages'

const ZonesLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Add New Zone'} />
      <AddZoneSection update={update} setUpdate={setUpdate} />
      <TitleSection text={'Zones Table'} />
      <ZonesPage refetch={update} />
    </>
  )
}

export default ZonesLayout