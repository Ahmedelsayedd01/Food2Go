import React, { useState } from 'react'
import { TitlePage, TitleSection } from '../../../../Components/Components'
import { AddBranchSection, BranchesPage } from '../../../../Pages/Pages'

const BranchesLayout = () => {
       const [update, setUpdate] = useState(false)
       return (
              <>
                     <TitlePage text={'Add New Branch'} />
                     <AddBranchSection update={update} setUpdate={setUpdate} />
                     <TitleSection text={'Branches Table'} />
                     <BranchesPage refetch={update} />
              </>
       )
}

export default BranchesLayout