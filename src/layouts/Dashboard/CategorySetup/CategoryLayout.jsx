import React, { useState } from 'react'
import { AddCategorySection, CategoryPage } from '../../../Pages/Pages'
import { TitlePage, TitleSection } from '../../../Components/Components'

const CategoryLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Add New Category'} />
      <AddCategorySection update={update} setUpdate={setUpdate} />
      <TitleSection text={'Category Table'} />
      <CategoryPage refetch={update} setUpdate={setUpdate} />
    </>
  )
}

export default CategoryLayout