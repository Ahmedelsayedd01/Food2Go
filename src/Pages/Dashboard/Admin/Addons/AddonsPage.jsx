import React, { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon } from '../../../../Assets/Icons/AllIcons';
import { Link } from 'react-router-dom';
import { useGet } from '../../../../Hooks/useGet';
import { useDelete } from '../../../../Hooks/useDelete';
import { StaticLoader } from '../../../../Components/Components';

const AddonsPage = () => {
       const { refetch: refetchAddons, loading: loadingAddons, data: dataAddons } = useGet({ url: 'https://Bcknd.food2go.online/admin/addons' });
       const { deleteData, loadingDelete, responseDelete } = useDelete();
       const [addons, setAddons] = useState([]);

       // Fetch Addons when the component mounts or when refetch is called
       useEffect(() => {
              refetchAddons();
       }, [refetchAddons]); // Empty dependency array to only call refetch once on mount

       // Delete addon
       const handleDelete = async (id, name) => {
              const success = await deleteData(`https://Bcknd.food2go.online/admin/category/delete/${id}`, `${name} Deleted Success.`);

              if (success) {
                     // Update addons only if changeState succeeded
                     setAddons(
                            addons.filter((addon) =>
                                   addon.id !== id
                            )
                     );
              }
       };

       // Update addons when `data` changes
       useEffect(() => {
              if (dataAddons && dataAddons.addons) {
                     setAddons(dataAddons.addons);
              }
              console.log('addons', addons)
       }, [dataAddons]); // Only run this effect when `data` changes


       const headers = ['SL', 'Name', "Price", 'Tax (%)', 'Action'];

       return (
              <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
                     {loadingAddons ? (
                            <>
                                   <div className="mt-32 mx-auto">
                                          <StaticLoader />
                                   </div>
                            </>
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
                                          {addons.length === 0 ? (
                                                 <tr>
                                                        <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find addons</td>
                                                 </tr>
                                          ) : (


                                                 addons.map((addon, index) => ( // Example with two rows
                                                        <tr className="w-full border-b-2" key={index}>
                                                               <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {index + 1}
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {addon?.name || '-'}
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {addon?.price || '0'}
                                                               </td>
                                                               <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      {addon.tax?.amount || '0'}
                                                                      {addon.tax?.type === "precentage" && (
                                                                             ' %'
                                                                      )}
                                                               </td>
                                                               <td className="px-4 py-3 text-center">
                                                                      <div className="flex items-center justify-center gap-2">
                                                                             <Link to={`edit/${addon.id}`} className="text-blue-500 hover:underline"><EditIcon /></Link>
                                                                             <button className="text-red-500" onClick={() => handleDelete(addon.id, addon.name)}><DeleteIcon /></button>
                                                                      </div>
                                                               </td>
                                                        </tr>
                                                 ))

                                          )}
                                   </tbody>
                            </table >
                     )}
              </div >
       );
};

export default AddonsPage;
