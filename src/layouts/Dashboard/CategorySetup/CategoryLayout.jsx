import React from 'react'
import { AddCategorySection, CategoryPage } from '../../../Pages/Pages'
import { TitlePage, TitleSection } from '../../../Components/Components'

const CategoryLayout = () => {
  return (
    <>
      <TitlePage text={'Add New Category'} />
      <AddCategorySection />
      <TitleSection text={'Category Table'} />
      <CategoryPage />
    </>
  )
}

export default CategoryLayout