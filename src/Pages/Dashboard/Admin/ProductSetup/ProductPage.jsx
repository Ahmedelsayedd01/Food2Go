import { useEffect, useState } from 'react'
import { useGet } from '../../../../Hooks/useGet';
import { AddButton, LoaderLogin, StaticLoader } from '../../../../Components/Components';
import { DeleteIcon, EditIcon } from '../../../../Assets/Icons/AllIcons';
import { useDelete } from '../../../../Hooks/useDelete';
import { Link } from 'react-router-dom';

const ProductPage = () => {
       const { refetch: refetchProducts, loading: loadingProducts, data: dataProducts } = useGet({ url: 'https://Bcknd.food2go.online/admin/product' });
       const { deleteData, loadingDelete, responseDelete } = useDelete();
       const [products, setProducts] = useState([])

       useEffect(
              () => {
                     refetchProducts()
              }, [refetchProducts]
       )
       useEffect(() => {
              if (dataProducts && dataProducts.products) {
                     setProducts(dataProducts.products)
              }

              console.log('dataProducts', dataProducts)
              console.log('products', products)
       }, [dataProducts])

       // Delete Product
       const handleDelete = async (id, name) => {
              const success = await deleteData(`https://Bcknd.food2go.online/admin/product/delete/${id}`, `${name} Deleted Success.`);

              if (success) {
                     setProducts(
                            products.filter((product) =>
                                   product.id !== id
                            )
                     );
              }
              console.log('products', products)
       };

       const headers = [
              '#',
              'Name',
              'Image',
              'Price',
              'Description',
              "Category",
              'Subcategory',
              'Addons',
              'Variations',
              'Discount',
              'Tax',
              'Excludes',
              'Extra',
              'Item Type',
              'Number',
              'Points',
              'Stock Type',
              'From',
              'To',
              'Action'
              // 'SL',
              // 'name',
              // 'image',
              // 'price',
              // 'description',
              // "category_id",
              // 'sub_category_id',
              // 'addons',
              // 'variations',
              // 'discount_id',
              // 'tax_id',
              // 'excludes',
              // 'extra',
              // 'item_type',
              // 'number',
              // 'stock_type',
              // 'from',
              // 'to',
              // 'points',
       ];
       return (
              <>
                     {/* <div className="">
                     </div> */}
                     <div className="w-full pb-28 flex items-start justify-start overflow-x-scroll scrollSection">
                            {loadingProducts || loadingDelete ? (
                                   <><LoaderLogin /></>
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
                                                 {products.length === 0 ? (
                                                        <tr>
                                                               <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find products</td>
                                                        </tr>
                                                 ) : (


                                                        products.map((product, index) => ( // Example with two rows
                                                               <tr className="w-full border-b-2" key={index}>
                                                                      <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {index + 1}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product.name}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 overflow-hidden">
                                                                             <div className="flex justify-center">
                                                                                    <img src={product.image_link}
                                                                                           className="bg-mainColor rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                                                                                           alt="Photo"
                                                                                    />
                                                                             </div>
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product.price}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product.description}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {/* {product.description} */}
                                                                             Category
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {/* {product.description} */}
                                                                             Subcategory
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {/* {product.description} */}
                                                                             Addons
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {/* {product.description} */}
                                                                             Variations
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {/* {product.description} */}
                                                                             Discount
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {/* {product.description} */}
                                                                             Tax
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {/* {product.description} */}
                                                                             Excludes
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {/* {product.description} */}
                                                                             Extra
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product.item_type}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product.number}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product.points}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product.stock_type}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product.from}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {product.to}
                                                                      </td>
                                                                      <td className="px-4 py-3 text-center">
                                                                             <div className="flex items-center justify-center gap-2">
                                                                                    <Link to={`edit/${product.id}`} className="text-blue-500 hover:underline"><EditIcon /></Link>
                                                                                    <button className="text-red-500" onClick={() => handleDelete(product.id, product.name)}><DeleteIcon /></button>
                                                                             </div>
                                                                      </td>
                                                               </tr>
                                                        ))

                                                 )}
                                          </tbody>
                                   </table>
                            )}
                     </div>
              </>
       );
}

export default ProductPage