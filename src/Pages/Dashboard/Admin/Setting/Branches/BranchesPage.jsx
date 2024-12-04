import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGet } from '../../../../../Hooks/useGet';
import { useChangeState } from '../../../../../Hooks/useChangeState';
import { useDelete } from '../../../../../Hooks/useDelete';
import { StaticLoader, Switch } from '../../../../../Components/Components';
import { DeleteIcon, EditIcon } from '../../../../../Assets/Icons/AllIcons';

const BranchesPage = ({ refetch }) => {
       const { refetch: refetchBranches, loading: loadingBranches, data: dataBranches } = useGet({ url: 'https://Bcknd.food2go.online/admin/branch' });
       const { changeState, loadingChange, responseChange } = useChangeState();
       const { deleteData, loadingDelete, responseDelete } = useDelete();
       const [branches, setBranches] = useState([]);

       useEffect(() => {
              refetchBranches();
       }, [refetchBranches, refetch]); // Empty dependency array to only call refetch once on mount


       // Change paymentMethod status 
       const handleChangeStaus = async (id, name, status) => {
              const response = await changeState(
                     `https://Bcknd.food2go.online/admin/branch/status/${id}`,
                     `${name} Changed Status.`,
                     { status } // Pass status as an object if changeState expects an object
              );

              if (response) {
                     setBranches((prevBranches) =>
                            prevBranches.map((branch) =>
                                   branch.id === id ? { ...branch, status: status } : branch
                            )
                     );
              }

       };

       // Delete payment Method
       const handleDelete = async (id, name) => {
              const success = await deleteData(`https://Bcknd.food2go.online/admin/branch/delete/${id}`, `${name} Deleted Success.`);

              if (success) {
                     setBranches(
                            branches.filter((branch) =>
                                   branch.id !== id
                            )
                     );
              }
              console.log('Branches', branches)
       };

       useEffect(() => {
              if (dataBranches && dataBranches.branches) {
                     setBranches(dataBranches.branches);
              }
              console.log('dataBranches', dataBranches)
       }, [dataBranches]); // Only run this effect when `data` changes



       const headers = ['#', 'Image', 'Name', 'City', 'Address', 'Phone', 'Preparation Time', 'Status', 'Action'];

       return (
              <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
                     {loadingBranches || loadingChange || loadingDelete ? (
                            <div className='w-full mt-40'>
                                   <StaticLoader />
                            </div>
                     ) : (
                            <table className="w-full sm:min-w-0">
                                   <thead className="w-full">
                                          <tr className="w-full border-b-2">
                                                 {headers.map((name, index) => (
                                                        <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3" key={index}>
                                                               {name}
                                                        </th>
                                                 ))}
                                          </tr>
                                   </thead>
                                   <tbody className="w-full">
                                          {branches.length === 0 ? (
                                                 <tr>
                                                        <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find Branches</td>
                                                 </tr>
                                          ) : (


                                                 branches.map((branch, index) => ( // Example with two rows
                                                        <tr className="w-full border-b-2" key={index}>
                                                               <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {index + 1}
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      <div className="flex justify-center">
                                                                             <img src={branch.image_link}
                                                                                    className="bg-mainColor border-2 border-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                                                                                    loading="lazy"
                                                                                    alt="Photo"
                                                                             />
                                                                      </div>
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {branch?.name || '-'}
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {branch?.city?.name || '-'}
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {branch?.address || '-'}
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {branch?.phone || '-'}
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {branch?.food_preparion_time || '-'}
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      <Switch
                                                                             checked={branch.status === 1}
                                                                             handleClick={() => {
                                                                                    handleChangeStaus(branch.id, branch.name, branch.status === 1 ? 0 : 1);
                                                                             }}
                                                                      />
                                                               </td>
                                                               <td className="px-4 py-3 text-center">
                                                                      <div className="flex items-center justify-center gap-2">
                                                                             <Link to={`edit/${branch.id}`} className="text-blue-500 hover:underline"><EditIcon /></Link>
                                                                             <button className="text-red-500" onClick={() => handleDelete(branch.id, branch.name)}><DeleteIcon /></button>
                                                                      </div>
                                                               </td>
                                                        </tr>
                                                 ))

                                          )}
                                   </tbody>
                            </table>
                     )}
              </div>
       );
};

export default BranchesPage;
