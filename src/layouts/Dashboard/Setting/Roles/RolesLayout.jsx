import React, { useEffect, useState } from 'react'
import { TitlePage, TitleSection } from '../../../../Components/Components'
import { AddRoleSection, RolesPage } from '../../../../Pages/Pages'
import { useGet } from '../../../../Hooks/useGet'

const RolesLayout = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { refetch: refetchRoles, loading: loadingRoles, data: dataRoles } = useGet({
    url: `${apiUrl}/admin/admin_roles`
  });

  const [update, setUpdate] = useState(false)
  const [roles, setRoles] = useState([])
  const [permissionRoles, setPermissionRoles] = useState([])

  useEffect(() => {
    refetchRoles();
  }, [refetchRoles, update]);

  useEffect(() => {
    setRoles(dataRoles?.user_positions || []);
    setPermissionRoles(dataRoles?.roles || []);
  }, [dataRoles]);


  useEffect(() => { console.log('dataRoles', dataRoles) }, [dataRoles])
  return (
    <>
      <TitlePage text={'Add New Role'} />
      <AddRoleSection update={update} setUpdate={setUpdate} permissionRoles={permissionRoles} />
      <TitleSection text={'Roles Table'} />
      <RolesPage loadingRoles={loadingRoles} roles={roles} />
    </>
  )
}

export default RolesLayout