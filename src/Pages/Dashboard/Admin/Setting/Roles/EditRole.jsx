import React, { useEffect, useRef, useState } from 'react'
import { LoaderLogin, StaticButton, StaticLoader, SubmitButton, Switch, TextInput, UploadInput } from '../../../../../Components/Components';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useAuth } from '../../../../../Context/Auth';
import { MultiSelect } from 'primereact/multiselect';
import { useNavigate, useParams } from 'react-router-dom';
import { useGet } from '../../../../../Hooks/useGet';


const EditRolePage = () => {
       const { roleId } = useParams();
       const navigate = useNavigate();

       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchRoles, loading: loadingRoles, data: dataRoles } = useGet({
              url: `${apiUrl}/admin/admin_roles`
       });
       const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/admin/admin_roles/update/${roleId}` });

       const auth = useAuth();

       const [roleName, setRoleName] = useState('');
       const [permissionsData, setPermissionsData] = useState([]);
       const [selectedPermissions, setSelectedPermissions] = useState([]);
       const [roleStatus, setRoleStatus] = useState(0);


       useEffect(() => {
              refetchRoles();
       }, [refetchRoles]);
       useEffect(() => {
              const filterRole = dataRoles?.user_positions?.find((role) => role.id === Number(roleId));

              setRoleName(filterRole?.name || ''); // Default to empty string if undefined
              setRoleStatus(filterRole?.status || 0); // Default to 0 if undefined
              setSelectedPermissions(
                     filterRole?.roles?.map(({ id, role, ...rest }) => ({
                            // id,
                            name: role,
                            // ...rest,
                     })) || [] // Default to empty array if undefined
              );

              console.log('selectedPermissions', selectedPermissions)

              setPermissionsData(dataRoles?.roles?.map((permission) => ({ name: permission })) || []);
       }, [roleId, dataRoles]);


       const handleRoleStatus = () => {
              const currentState = roleStatus;
              { currentState === 0 ? setRoleStatus(1) : setRoleStatus(0) }
       }

       useEffect(() => {
              if (response) {
                     handleBack()
              }
       }, [response])

       const handleBack = () => {
              navigate(-1, { replace: true });
       }

       const handleRoleEdit = (e) => {
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
                     {loadingRoles || loadingPost ? (
                            <>
                                   <div className="w-full flex justify-center items-center">
                                          <LoaderLogin />
                                   </div>
                            </>
                     ) : (
                            <section>
                                   <form onSubmit={handleRoleEdit}>
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
                                                                      value={selectedPermissions || []} // Ensure value is an array
                                                                      onChange={(e) => setSelectedPermissions(e.value)}
                                                                      options={permissionsData || []} // Ensure options is an array
                                                                      optionLabel="name"
                                                                      placeholder='Select Permissions'
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
                                                        <StaticButton text={'Cancal'} handleClick={handleBack} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
                                                 </div>
                                                 <div className="">
                                                        <SubmitButton
                                                               text={'Edit'}
                                                               rounded='rounded-full'
                                                               handleClick={handleRoleEdit}
                                                        />
                                                 </div>

                                          </div>
                                   </form>
                            </section>
                     )}
              </>
       )
}

export default EditRolePage