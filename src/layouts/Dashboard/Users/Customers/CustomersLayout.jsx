import React, { useEffect, useState } from 'react'
import { TitlePage, TitleSection } from '../../../../Components/Components'
import { AddCustomersSection, CustomersPage } from '../../../../Pages/Pages'

const CustomersLayout = () => {
    const [update, setUpdate] = useState(false)

    return (
        <>
            <TitlePage text={'Add Customer'} />
            <AddCustomersSection update={update} setUpdate={setUpdate} />
            <TitleSection text={'Customer Table'} />
            <CustomersPage update={update} setUpdate={setUpdate} />
        </>
    )
}

export default CustomersLayout
