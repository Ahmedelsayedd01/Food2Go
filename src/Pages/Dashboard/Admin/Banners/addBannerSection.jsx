import React, { useEffect, useRef, useState } from 'react'
import { DropDown, NumberInput, StaticButton, StaticLoader, SubmitButton, Switch, TextInput, UploadInput } from '../../../../Components/Components';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';
import { useAuth } from '../../../../Context/Auth';

import { MultiSelect } from 'primereact/multiselect';


const AddBannerSection = ({ update, setUpdate }) => {
  const { refetch: refetchData, loading: loadingData, data: allData } = useGet({ url: 'https://bcknd.food2go.online/admin/banner' });
  const { postData, loadingPost, response } = usePost({ url: 'https://bcknd.food2go.online/admin/banner/add' });

  const dropDownCategories = useRef();
  const dropDownProducts = useRef();
  const dropDownDeals = useRef();
  const ImageRef = useRef([]);
  const auth = useAuth();

  // const [taps, setTaps] = useState([{ id: 1, name: 'English(EN)' }, { id: 2, name: 'Arabic(Ar)' }, { id: 3, name: 'garman' }])
  const [taps, setTaps] = useState([])
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [deals, setDeals] = useState([])

  const [currentTap, setCurrentTap] = useState(0);

  const [bannerOrder, setBannerOrder] = useState('');

  const [stateCategories, setStateCategories] = useState('Select Category');
  const [categoryId, setCategoryId] = useState('');
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const [stateProducts, setStateProducts] = useState('Select Product');
  const [productId, setProductId] = useState('');
  const [isOpenProduct, setIsOpenProduct] = useState(false);

  const [stateDeals, setStateDeals] = useState('Select Product');
  const [DealId, setDealId] = useState('');
  const [isOpenDeal, setIsOpenDeal] = useState(false);


  const [image, setImage] = useState([]);
  const [imageFile, setImageFile] = useState([]);

  useEffect(() => {
    refetchData(); // Refetch data when the component mounts
  }, [refetchData]);

  useEffect(() => {
    if (allData && allData?.translations &&
      allData?.categories &&
      allData?.products &&
      allData?.deals) {
      setTaps(allData?.translations || []);
      setCategories(allData?.categories || []);
      setProducts(allData?.products || []);
      setDeals(allData?.deals || []);
    }
    console.log('taps', taps)
    console.log('categories', categories)
    console.log('products', products)
    console.log('deals', deals)
  }, [allData]);



  const handleImageClick = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(file.name);
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
    setStateDeals(option.name);
  };



  const handleTap = (index) => {
    setCurrentTap(index)
  }

  useEffect(() => {
    console.log('response', response)
    if (!loadingPost) {
      handleReset()
    }
    refetchData()
    setUpdate(!update)
  }, [response])

  const handleReset = () => {
    setCurrentTap(0);
    setBannerOrder('');
    setStateCategories('Select Category');
    setCategoryId('');
    setStateProducts('Select Product');
    setProductId('');
    setStateDeals('Select Product');
    setDealId('');
    setImage([]);
    setImageFile([]);
  }



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



  const handleBannerAdd = (e) => {
    e.preventDefault();

    const formData = new FormData();

    categoryName.forEach((name, index) => {
      // Corrected the typo and added translation_id and translation_name
      formData.append(`category_names[${index}][tranlation_id]`, name.translation_id);
      formData.append(`category_names[${index}][category_name]`, name.category_name);
      formData.append(`category_names[${index}][tranlation_name]`, name.translation_name);
    });


    if (categoriesParentId) {
      formData.append('category_id', categoriesParentId);
    }

    formData.append('priority', priority);
    // Assuming selectedCategoriesAddons is an array of selected objects with `id` properties
    selectedCategoriesAddons.forEach((addon, index) => {
      formData.append(`addons[${index}]`, addon.id); // Append each ID as an array element in FormData
    });

    formData.append('image', imageFile);
    formData.append('banner_image', bannerFile);


    formData.append('status', statusCategory);
    formData.append('active', activeCategory);

    postData(formData, 'Category Added Success');

  };
  return (
    <>
      {loadingData || loadingPost ? (
        <>
          <div className="w-full h-56 flex justify-center items-center">
            <StaticLoader />
          </div>
        </>
      ) : (
        <section>
          <form onSubmit={handleBannerAdd}>
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
              {taps.map((tap, index) => (
                currentTap === index && (
                  <div
                    className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4"
                    key={tap.id}
                  >

                    {/* Banner Image */}
                    <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                      <span className="text-xl font-TextFontRegular text-thirdColor">Banner Image {tap.name}:</span>
                      <UploadInput
                        value={image}
                        uploadFileRef={ImageRef}
                        placeholder="Banner Image"
                        handleFileChange={handleImageChange}
                        onChange={(e) => setImage(e.target.value)}
                        onClick={() => handleImageClick(ImageRef)}
                      />
                    </div>

                  </div>
                )
              ))}


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
                  handleClick={handleBannerAdd}
                />
              </div>

            </div>
          </form>
        </section>
      )}
    </>
  )
}

export default AddBannerSection