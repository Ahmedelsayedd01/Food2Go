import React, { useState } from 'react'
import { TitlePage, TitleSection } from '../../../Components/Components'
import { AddBannerSection, BannersPage } from '../../../Pages/Pages'

const BannersLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Add Banner'} />
      <AddBannerSection update={update} setUpdate={setUpdate} />
      <TitleSection text={'Banners Table'} />
      <BannersPage refetch={update} />
    </>
  )
}

export default BannersLayout