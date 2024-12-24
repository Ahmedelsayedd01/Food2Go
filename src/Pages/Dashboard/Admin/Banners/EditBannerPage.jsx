import React, { useEffect, useRef, useState } from 'react'
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';
import { useNavigate, useParams } from 'react-router-dom';
import { DropDown, LoaderLogin, NumberInput, StaticButton, SubmitButton, UploadInput } from '../../../../Components/Components';
import { useAuth } from '../../../../Context/Auth';


const EditBannerPage = () => {
       const { bannerId } = useParams();
       const navigate = useNavigate();
       const auth = useAuth();

       const { refetch: refetchTranslation, loading: loadingTranslation, data: dataTranslation } = useGet({ url: 'https://Bcknd.food2go.online/admin/translation' });
       const { refetch: refetchCategory, loading: loadingCategory, data: dataCategory } = useGet({ url: 'https://Bcknd.food2go.online/admin/category' });
       const { refetch: refetchData, loading: loadingData, data: allData } = useGet({ url: 'https://Bcknd.food2go.online/admin/banner' });

       const { refetch: refetchBanner, loading: loadingBanner, data: dataBanner } = useGet({ url: `https://Bcknd.food2go.online/admin/banner/item/${bannerId}` });
       const { postData, loadingPost, response } = usePost({ url: `https://Bcknd.food2go.online/admin/banner/update/${bannerId}` });

       const dropDownCategories = useRef();
       const dropDownProducts = useRef();
       const dropDownDeals = useRef();
       const ImageRef = useRef([]);

       // const [taps, setTaps] = useState([{ id: 1, name: 'English(EN)' }, { id: 2, name: 'Arabic(Ar)' }, { id: 3, name: 'garman' }])
       const [taps, setTaps] = useState([])
       const [categories, setCategories] = useState([])
       const [products, setProducts] = useState([])
       const [filterProducts, setFilterProducts] = useState([])
       const [deals, setDeals] = useState([])

       const [currentTap, setCurrentTap] = useState(0);

       const [bannerOrder, setBannerOrder] = useState('');

       const [stateCategories, setStateCategories] = useState('Select Category');
       const [categoryId, setCategoryId] = useState('');
       const [isOpenCategory, setIsOpenCategory] = useState(false);

       const [stateProducts, setStateProducts] = useState('Select Product');
       const [productId, setProductId] = useState('');
       const [isOpenProduct, setIsOpenProduct] = useState(false);

       const [stateDeals, setStateDeals] = useState('Select Deal');
       const [dealId, setDealId] = useState('');
       const [isOpenDeal, setIsOpenDeal] = useState(false);


       const [image, setImage] = useState([]);
       const [imageFile, setImageFile] = useState([]);

       useEffect(() => {
              refetchTranslation(); // Refetch data when the component mounts
              refetchBanner(); // Refetch data when the component mounts

              refetchData(); // Refetch data when the component mounts
              refetchCategory(); // Refetch data when the component mounts
       }, [refetchTranslation, refetchBanner, refetchData, refetchCategory]);

       useEffect(() => {
              if (allData && dataCategory && allData?.translations &&
                     allData?.categories &&
                     allData?.products &&
                     allData?.deals) {
                     setTaps(allData?.translations || []);
                     setCategories(dataCategory?.parent_categories || []);
                     setProducts(allData?.products || []);
                     setFilterProducts(allData?.products || []);
                     setDeals(allData?.deals || []);
              }
       }, [allData, dataCategory]);

       useEffect(() => {
              if (dataBanner && dataBanner.banner) {
                     const data = dataBanner.banner;

                     setStateCategories(data?.category_banner?.name || 'Select Category')
                     setCategoryId(data?.category_banner?.id || '')
                     setStateProducts(data?.product?.name || 'Select Product')
                     setProductId(data?.product?.id || '')
                     setStateDeals(data?.deal?.title || 'Select Deal')
                     setDealId(data?.deal?.id || '')

                     setImage(data?.images || [])
                     setImageFile(data?.images || [])
                     setBannerOrder(data?.order || '')
                     console.log('data', data)

              }
       }, [dataBanner]);



       const handleImageClick = (index) => {
              if (ImageRef.current[index]) {
                     ImageRef.current[index].click(); // Trigger click on the correct input
              }
       };

       const handleOpenCategory = () => {
              setIsOpenCategory(!isOpenCategory)
              setIsOpenProduct(false)
              setIsOpenDeal(false)
       };

       const handleOpenOptionCategory = () => setIsOpenCategory(false);

       const handleSelectCategory = (option) => {
              setCategoryId(option.id);
              setStateCategories(option.name);

              const filterProducts = products.filter((product) => {
                     return product.category_id === option.id
              });

              console.log('filterProducts', filterProducts)
              setFilterProducts(filterProducts)
       };

       const handleOpenProduct = () => {
              setIsOpenCategory(false)
              setIsOpenProduct(!isOpenProduct)
              setIsOpenDeal(false)
       };
       const handleOpenOptionProduct = () => setIsOpenProduct(false);

       const handleSelectProduct = (option) => {
              setProductId(option.id);
              setStateProducts(option.name);
       };

       const handleOpenDeal = () => {
              setIsOpenCategory(false)
              setIsOpenProduct(false)
              setIsOpenDeal(!isOpenDeal)
       };
       const handleOpenOptionDeal = () => setIsOpenDeal(false);

       const handleSelectDeal = (option) => {
              setDealId(option.id);
              setStateDeals(option.name || option.title);
       };



       const handleTap = (index) => {
              setCurrentTap(index)
       }

       useEffect(() => {
              console.log('response', response);
              if (!loadingPost && response) {
                     handleCancel();
              }
       }, [loadingPost, response]);


       const handleCancel = () => {
              navigate(-1, { replace: true });
       };

       useEffect(() => {
              const handleClickOutside = (event) => {
                     // Close dropdown if clicked outside
                     if (
                            dropDownCategories.current && !dropDownCategories.current.contains(event.target) &&
                            dropDownProducts.current && !dropDownProducts.current.contains(event.target) &&
                            dropDownDeals.current && !dropDownDeals.current.contains(event.target)

                            // )
                     ) {
                            setIsOpenCategory(null);
                            setIsOpenProduct(null);
                            setIsOpenDeal(null);
                     }
              };

              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);



       const handleBannerEdit = (e) => {
              e.preventDefault();


              if (imageFile.length === 0) {
                     auth.toastError('Please Enter Banner Image');
                     return;
              }

              if (imageFile.length !== taps.length) {
                     auth.toastError('Please Enter All Banner Image');
                     return;
              }


              if (!categoryId) {
                     auth.toastError('please Select Category')
                     return;
              }
              if (!productId) {
                     auth.toastError('please Select Product')
                     return;
              }
              if (!dealId) {
                     auth.toastError('please Select Deal')
                     return;
              }

              if (!bannerOrder) {
                     auth.toastError('please Enter the Order')
                     return;
              }

              const formData = new FormData();

              imageFile.forEach((img, index) => {
                     formData.append(`images[${index}][image]`, img.image);
                     formData.append(`images[${index}][translation_id]`, img.translation_id);
                     formData.append(`images[${index}][tranlation_name]`, img.tranlation_name);
              })

              formData.append("order", bannerOrder);
              formData.append("category_id", categoryId);
              formData.append("product_id", productId);
              formData.append("deal_id", dealId);


              console.log(...formData.entries());
              postData(formData, "Banner Added Success")
       };

       useEffect(() => {
              console.log('image', image)
              console.log('imageFile', imageFile)
       }, [image, imageFile])

       return (
              <>
                     {loadingData || loadingBanner || loadingCategory || loadingPost ? (
                            <>
                                   <div className="w-full flex justify-center items-center">
                                          <LoaderLogin />
                                   </div>
                            </>
                     ) : (
                            <section>
                                   <form onSubmit={handleBannerEdit}>
                                          {/* Taps */}
                                          <div className="w-full flex items-center justify-start py-2 gap-x-6">
                                                 {taps.map((tap, index) => (
                                                        <span
                                                               key={tap.id}
                                                               onClick={() => handleTap(index)}
                                                               className={`${currentTap === index ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor'}  pb-1 text-xl font-TextFontMedium transition-colors duration-300 cursor-pointer hover:text-mainColor`}
                                                        >
                                                               {tap.name}
                                                        </span>

                                                 ))}
                                          </div>
                                          {/* Content*/}
                                          <div className="sm:py-3 lg:py-6">

                                                 {taps.map((tap, index) => {
                                                        // Ensure the ref array contains a valid ref for each input
                                                        if (!ImageRef.current[index]) {
                                                               ImageRef.current[index] = null; // Initialize as null
                                                        }

                                                        return (
                                                               currentTap === index && (
                                                                      <div
                                                                             className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4"
                                                                             key={tap.id}
                                                                      >
                                                                             {/* Banner Image */}
                                                                             <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                                    <span className="text-xl font-TextFontRegular text-thirdColor">
                                                                                           Banner Image {tap.name}:
                                                                                    </span>
                                                                                    <UploadInput
                                                                                           value={image[index]?.image || ''} // Show the selected image name or default to empty
                                                                                           uploadFileRef={(el) => (ImageRef.current[index] = el)} // Dynamically assign ref
                                                                                           placeholder="Banner Image"
                                                                                           handleFileChange={(e) => {
                                                                                                  const file = e.target.files[0];
                                                                                                  if (file) {
                                                                                                         // Update imageFile state with the file and related data
                                                                                                         setImageFile((prev) => {
                                                                                                                const updatedImages = [...prev];
                                                                                                                updatedImages[index] = {
                                                                                                                       translation_id: tap.id,
                                                                                                                       image: file,
                                                                                                                       tranlation_name: tap.name || 'Default Name',
                                                                                                                };
                                                                                                                return updatedImages;
                                                                                                         });

                                                                                                         // Update image state with the file name
                                                                                                         setImage((prev) => {
                                                                                                                const updatedNames = [...prev];
                                                                                                                updatedNames[index] = { image: file.name }; // Set the file name at the correct index
                                                                                                                return updatedNames;
                                                                                                         });
                                                                                                  }
                                                                                           }}
                                                                                           onClick={() => handleImageClick(index)} // Trigger file input click
                                                                                    />

                                                                             </div>
                                                                      </div>
                                                               )
                                                        );
                                                 })}

                                          </div>

                                          <div className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4 mb-4">
                                                 {/* Categoriess */}
                                                 <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                        <span className="text-xl font-TextFontRegular text-thirdColor">Category:</span>
                                                        <DropDown
                                                               ref={dropDownCategories}
                                                               handleOpen={handleOpenCategory}
                                                               stateoption={stateCategories}
                                                               openMenu={isOpenCategory}
                                                               handleOpenOption={handleOpenOptionCategory}
                                                               onSelectOption={handleSelectCategory}
                                                               options={categories}
                                                               border={false}
                                                        />
                                                 </div>
                                                 {/* Products */}
                                                 <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                        <span className="text-xl font-TextFontRegular text-thirdColor">Product:</span>
                                                        <DropDown
                                                               ref={dropDownProducts}
                                                               handleOpen={handleOpenProduct}
                                                               stateoption={stateProducts}
                                                               openMenu={isOpenProduct}
                                                               handleOpenOption={handleOpenOptionProduct}
                                                               onSelectOption={handleSelectProduct}
                                                               options={filterProducts}
                                                               border={false}
                                                        />
                                                 </div>
                                                 {/* Deals */}
                                                 <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                        <span className="text-xl font-TextFontRegular text-thirdColor">Deal:</span>
                                                        <DropDown
                                                               ref={dropDownDeals}
                                                               handleOpen={handleOpenDeal}
                                                               stateoption={stateDeals}
                                                               openMenu={isOpenDeal}
                                                               handleOpenOption={handleOpenOptionDeal}
                                                               onSelectOption={handleSelectDeal}
                                                               options={deals}
                                                               border={false}
                                                        />
                                                 </div>

                                                 {/* Banner Order */}
                                                 <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                        <span className="text-xl font-TextFontRegular text-thirdColor">Banner Order:</span>
                                                        <NumberInput
                                                               value={bannerOrder}
                                                               onChange={(e) => setBannerOrder(e.target.value)}
                                                               placeholder="Banner Order"
                                                        />
                                                 </div>
                                          </div>



                                          {/* Buttons*/}
                                          <div className="w-full flex items-center justify-end gap-x-4">
                                                 <div className="">
                                                        <StaticButton text={'Cancel'} handleClick={handleCancel} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
                                                 </div>
                                                 <div className="">
                                                        <SubmitButton
                                                               text={'Edit'}
                                                               rounded='rounded-full'
                                                               handleClick={handleBannerEdit}
                                                        />
                                                 </div>

                                          </div>
                                   </form>
                            </section>
                     )}
              </>
       )
}

export default EditBannerPage