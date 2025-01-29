import React, { useEffect, useRef, useState } from 'react'
import { StaticButton, StaticLoader, SubmitButton, Switch, TextInput, UploadInput } from '../../../../../Components/Components';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useAuth } from '../../../../../Context/Auth';
import { MultiSelect } from 'primereact/multiselect';


const AddRoleSection = ({ update, setUpdate, permissionRoles }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { postData, loadingPost, response } = usePost({
    url: `${apiUrl}/admin/admin_roles/add`
  });

  const auth = useAuth();

  const [roleName, setRoleName] = useState('');
  const [permissionsData, setPermissionsData] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [roleStatus, setRoleStatus] = useState(0);


  const handleRoleStatus = () => {
    const currentState = roleStatus;
    { currentState === 0 ? setRoleStatus(1) : setRoleStatus(0) }
  }

  useEffect(() => {
    console.log('response', response)
    if (!loadingPost) {
      handleReset()
    }
    setUpdate(!update)
  }, [response])

  useEffect(() => {
    setPermissionsData(permissionRoles.map((permission) => ({ name: permission })))
  }, [permissionRoles])

  useEffect(() => {
    console.log('permissionRoles', permissionRoles)
    console.log('permissionRolesdata', permissionsData)
  }, [])

  const handleReset = () => {
    setRoleName('')
    setSelectedPermissions([])
    setRoleStatus(0)
  }

  const handleRoleAdd = (e) => {
    e.preventDefault();


    if (!roleName) {
      auth.toastError('please Enter Role Name')
      return;
    }
    if (!selectedPermissions.length === 0) {
      auth.toastError('please Select Role Permissions')
      return;
    }
    const formData = new FormData();


    formData.append('name', roleName);
    formData.append('roles', JSON.stringify(selectedPermissions.map((permission) => permission.name)));
    formData.append('status', roleStatus);
    postData(formData, 'Role Added Success');

  };
  return (
    <>
      {loadingPost ? (
        <>
          <div className="w-full h-56 flex justify-center items-center">
            <StaticLoader />
          </div>
        </>
      ) : (
        <section>
          <form onSubmit={handleRoleAdd}>
            <div className="sm:py-3 lg:py-6">
              <div
                className="w-full flex flex-wrap items-center justify-start gap-4">

                {/* Name Input */}
                <div className="sm:w-full md:w-[40%] lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">Role Name:</span>
                  <TextInput
                    value={roleName} // Access category_name property
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="Role Name"
                  />
                </div>
                {/* Permissions */}
                <div className="sm:w-full md:w-[40%] lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">Role Name:</span>
                  <MultiSelect
                    value={selectedPermissions}
                    onChange={(e) => setSelectedPermissions(e.value)}
                    options={permissionsData}
                    optionLabel="name"
                    placeholder="Select Permissions"
                    maxSelectedLabels={3}
                    className="w-full text-xl text-secoundColor font-TextFontRegular shadow-sm"
                  />
                </div>

                <div className="sm:w-full lg:w-[30%] flex items-start justify-start gap-x-1 pt-10">
                  <div className='w-2/4 flex items-center justify-start gap-x-1'>
                    <span className="text-xl font-TextFontRegular text-thirdColor">Active:</span>
                    <Switch handleClick={handleRoleStatus} checked={roleStatus} />
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons*/}
            <div className="w-full flex items-center justify-end gap-x-4">
              <div className="">
                <StaticButton text={'Reset'} handleClick={handleReset} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
              </div>
              <div className="">
                <SubmitButton
                  text={'Submit'}
                  rounded='rounded-full'
                  handleClick={handleRoleAdd}
                />
              </div>

            </div>
          </form>
        </section>
      )}
    </>
  )
}

export default AddRoleSection