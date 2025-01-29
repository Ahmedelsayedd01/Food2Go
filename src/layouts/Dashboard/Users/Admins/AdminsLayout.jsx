import React, { useEffect, useState } from 'react'
import { TitlePage, TitleSection } from '../../../../Components/Components'
import { AddAdminSection, AdminsPage } from '../../../../Pages/Pages'
import { useGet } from '../../../../Hooks/useGet';

const AdminsLayout = () => {
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchAdmins, loading: loadingAdmins, data: dataAdmins } = useGet({
              url: `${apiUrl}/admin/admin`
       });

       const [admins, setAdmins] = useState([])
       const [update, setUpdate] = useState(false)
       const [positions, setPositions] = useState([])

       useEffect(() => {
              refetchAdmins();
       }, [refetchAdmins, update]);

       useEffect(() => {
              setAdmins(dataAdmins?.admins || []);
              setPositions(dataAdmins?.user_positions || []);
       }, [dataAdmins]);


       // useEffect(() => { console.log('dataAdmins', dataAdmins) }, [dataAdmins])
       return (
              <>
                     <TitlePage text={'Add Admin'} />
                     <AddAdminSection update={update} setUpdate={setUpdate} dataPositions={positions} />
                     <TitleSection text={'Admins Table'} />
                     <AdminsPage adminsData={admins} loadingAdmins={loadingAdmins} />
              </>
       )
}

export default AdminsLayout
