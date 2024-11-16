import React, { useEffect, useRef, useState } from 'react'
import { useGet } from '../../../../Hooks/useGet';
import { DropDown, LoaderLogin, NumberInput, StaticButton, SubmitButton, Switch, TextInput, TimeInput, TitlePage, UploadInput } from '../../../../Components/Components';
import { usePost } from '../../../../Hooks/usePostJson';
import { MultiSelect } from 'primereact/multiselect';
import ButtonAdd from '../../../../Components/Buttons/AddButton';

/* 
if  stock_type="fixed || daily" 
  set key
   "number":'',
  at formData

if  product_time_status = 1   true  || false
  set key 
    "from": "100",
    "to": "100",
  at formData

if type in vairtion = single 
  set key 
    "min": "0",
    "max": "0",
  at formData
*/


/* {
  "success": {

      "product_names": [
        {
          "product_name": "Pizza Margherita",
          "product_description": "Classic Margherita pizza with tomato and mozzarella",
          "tranlation_id": "1",
          "tranlation_name": "en"
        },
        {
          "product_name": "بيتزا مارغريتا",
          "product_description": "بيتزا مارغريتا الكلاسيكية مع الطماطم وجبنة الموزاريلا",
          "tranlation_id": "5",
          "tranlation_name": "ar"
        }
     ],

      "description_names": [
        {
          "product_description": "Classic Margherita pizza with tomato and mozzarella",
          "tranlation_id": "1",
          "tranlation_name": "en"
        },
        {
          "product_description": "بيتزا مارغريتا الكلاسيكية مع الطماطم وجبنة الموزاريلا",
          "tranlation_id": "5",
          "tranlation_name": "ar"
        }
     ],

    "extra":[
        {
         "names":[
            {
               "extra_name":"Extra 1",
               "tranlation_id":"1",
               "tranlation_name":"en"
            },
            {
               "extra_name":"زيادة 1",
               "tranlation_id":"5",
               "tranlation_name":"ar"
            }
         ],
         "extra_price":"100"
        }
   ],

    "excludes":[
        {
         "names":[
            {
               "exclude_name":"Extra 1",
               "tranlation_id":"1",
               "tranlation_name":"en"
            },
            {
               "exclude_name":"زيادة 1",
               "tranlation_id":"5",
               "tranlation_name":"ar"
            }
         ],
        }
      ],

    "category_id": "4",
    "sub_category_id": "5",
    "discount_id": "5",
    "tax_id": "5",
    
    
    "item_type": "all , offline, online",
    "stock_type": "unlimited, daily, fixed",
    "price": "100",

    
    "status": "1",
    "recommended": "1",
    "product_time_status": "0",
    "points": "100",
    "image": {}
    "addons": []


    "variations": [
      {
        "type": "single || multiple ",
        "required": "1",
        "points": "100",
        main,
        max,  
        "names": [
          {
            "name": "Size",
            "tranlation_id": "1",
            "tranlation_name": "en"
          },
          {
            "name": "المقاس",
            "tranlation_id": "5",
            "tranlation_name": "ar"
          }
        ],
          "options":[
              {
               "names":[
                  {
                     "name":"Small",
                     "tranlation_id":"1",
                     "tranlation_name":"en"
                  },
                  {
                     "name":"صغير",
                     "tranlation_id":"5",
                     "tranlation_name":"ar"
                  }
               ],
               "extra_names":[
                  {
                     "extra_name":"Exatra 00",
                     "tranlation_id":"1",
                     "tranlation_name":"en"
                  },
                  {
                     "extra_name":"زيادة 00",
                     "tranlation_id":"5",
                     "tranlation_name":"ar"
                  }
                ],
              "price":"100",
              "status":"1",
              "extra_price":"1000",
            }
         ]
      }
    ],

  }
}

*/
const AddProductPage = () => {
  /* Get Data */
  const { refetch: refetchTranslation, loading: loadingTranslation, data: dataTranslation } = useGet({ url: 'https://Bcknd.food2go.online/admin/translation' });
  const { refetch: refetchCategory, loading: loadingCategory, data: dataCategory } = useGet({ url: 'https://Bcknd.food2go.online/admin/category' });
  const { refetch: refetchProduct, loading: loadingProduct, data: dataProduct } = useGet({ url: 'https://Bcknd.food2go.online/admin/product' });
  const { postData, loadingPost, response } = usePost({ url: 'https://Bcknd.food2go.online/admin/product/add' });
  /* Refs */
  const variationTypeRef = useRef([]);
  const [openVariationIndex, setOpenVariationIndex] = useState(null); // Tracks which variation's dropdown is open


  const categoryRef = useRef();
  const subCategoryRef = useRef();
  const itemTypeRef = useRef();
  const stockTypeRef = useRef();
  const discountRef = useRef();
  const taxRef = useRef();
  const productImageRef = useRef();
  /* States */
  const [taps, setTaps] = useState([])
  const [currentProductNamesTap, setCurrentProductNamesTap] = useState(0);
  const [currentExcludeNamesTap, setCurrentExcludeNamesTap] = useState(0);
  const [currentExtraNamesTap, setCurrentExtraNamesTap] = useState(0);
  const [currentVariationTap, setCurrentVariationTap] = useState(0);
  const [currentVariationOptionTap, setCurrentVariationOptionTap] = useState(0);

  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [addons, setAddons] = useState([])
  const [discounts, setDiscounts] = useState([])
  const [taxes, setTaxes] = useState([])

  const [itemTypes, setItemTypes] = useState([{ name: 'online' }, { name: 'offline' }, { name: 'all' }])
  const [stockTypes, setStockTypes] = useState([{ name: 'unlimited' }, { name: 'daily' }, { name: 'fixed' }])

  // Selected Data 
  // Product Names
  const [productNames, setProductNames] = useState([]);

  // Product Description
  const [descriptionNames, setDescriptionNames] = useState([]);

  // Product Exclude
  const [productExclude, setProductExclude] = useState([]);

  // Product Extra
  const [productExtra, setProductExtra] = useState([]);

  // Product Variations
  const [productVariations, setProductVariations] = useState([]);

  // Product Category
  const [selectedCategoryState, setSelectedCategoryState] = useState('Selected Category')
  const [selectedCategoryName, setSelectedCategoryName] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState('')

  // Product SubCategory
  const [selectedSubCategoryState, setSelectedSubCategoryState] = useState('Selected SubCategory')
  const [selectedSubCategoryName, setSelectedSubCategoryName] = useState('')
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('')

  // Product Discount
  const [selectedDiscountState, setSelectedDiscountState] = useState('Selected Discount')
  const [selectedDiscountName, setSelectedDiscountName] = useState('')
  const [selectedDiscountId, setSelectedDiscountId] = useState('')

  // Product Tax
  const [selectedTaxState, setSelectedTaxState] = useState('Selected Tax')
  const [selectedTaxName, setSelectedTaxName] = useState('')
  const [selectedTaxId, setSelectedTaxId] = useState('')

  // Product Addons
  const [selectedAddonsState, setSelectedAddonsState] = useState('Selected Addons')
  const [selectedAddonsName, setSelectedAddonsName] = useState('')
  const [selectedAddonsId, setSelectedAddonsId] = useState([])

  // Product Item Types
  const [selectedItemTypeState, setSelectedItemTypeState] = useState('Selected Item Type')
  const [selectedItemTypeName, setSelectedItemTypeName] = useState('')

  // Product Stock Types
  const [selectedStockTypeState, setSelectedStockTypeState] = useState('Selected Stock Type')
  const [selectedStockTypeName, setSelectedStockTypeName] = useState('')
  // Product Stock Number
  const [productStockNumber, setProductStockNumber] = useState('')

  // Product Price && Point
  const [productPrice, setProductPrice] = useState('')
  const [productPoint, setProductPoint] = useState('')


  // Product From && To Status
  const [productStatusFrom, setProductStatusFrom] = useState(null)
  const [productStatusTo, setProductStatusTo] = useState(null)

  // Product Status && Recommended && Time Status
  const [productStatus, setProductStatus] = useState(0)
  const [productRecommended, setProductRecommended] = useState(0)
  const [productTimeStatus, setProductTimeStatus] = useState(0)

  // Product Image
  const [productImage, setProductImage] = useState(null)
  const [productImageName, setProductImageName] = useState('Choose Photo')
  /* dropdown Status */
  const [isOPenProductCategory, setIsOPenProductCategory] = useState(false)
  const [isOPenProductSubCategory, setIsOPenProductSubCategory] = useState(false)
  const [isOPenProductItemType, setIsOPenProductItemType] = useState(false)
  const [isOPenProductStockType, setIsOPenProductStockType] = useState(false)
  const [isOPenProductDiscount, setIsOPenProductDiscount] = useState(false)
  const [isOPenProductTax, setIsOPenProductTax] = useState(false)


  /* Refetch Data */
  useEffect(() => {
    refetchTranslation(); // Get Language Translation data when the component mounts
    refetchCategory(); // Get Categories && Addons && SubCategories data when the component mounts
    refetchProduct(); // Get Discounts && Taxes data when the component mounts
  }, [refetchTranslation, refetchCategory, refetchProduct]);

  useEffect(() => {
    /* Set data to Taps Languages Translation */
    if (dataTranslation) {
      setTaps(dataTranslation?.translation || []); // Update taps if dataTranslation exists
    }
    /* Set data to Categories && Addons && SubCategories */
    if (dataCategory) {
      setCategories(dataCategory?.categories || [])
      setSubCategories(dataCategory?.sub_categories || [])
      setAddons(dataCategory?.addons || [])
    }
    /* Set data to Discounts && Taxes */
    if (dataProduct) {
      setDiscounts(dataProduct?.discounts || []);
      setTaxes(dataProduct?.taxes || []);
    }
    /* Log Data */
    console.log('dataTranslation', dataTranslation)
    console.log('dataCategory', dataCategory)
    console.log('dataProduct', dataProduct)
  }, [dataTranslation, dataCategory, dataProduct]);

  /* Handle Function */

  // Exclude Product
  const handleAddExclude = () => {
    const newExclude = {
      names: taps.map((tap) => ({
        exclude_name: "",
        tranlation_id: tap.id,
        tranlation_name: tap.name
      })),
    };

    setProductExclude((prevProductnewExclude) => [...prevProductnewExclude, newExclude]);
  };

  const handleRemoveExclude = (index) => {
    setProductExclude((prevProductExclude) => prevProductExclude.filter((_, idx) => idx !== index));
  };

  //Extra Product
  const handleAddExtra = () => {
    const newExtra = {
      names: taps.map((tap) => ({
        extra_name: "",
        tranlation_id: tap.id,
        tranlation_name: tap.name
      })),
      extra_price: '' // Default price, can be updated by the user
    };

    setProductExtra((prevProductExtra) => [...prevProductExtra, newExtra]);
    console.log('tastMap', tastMap);
  };

  const handleRemoveExtra = (index) => {
    setProductExtra((prevProductExtra) => prevProductExtra.filter((_, idx) => idx !== index));
  };

  const handleVariationNameChange = (updatedValue, indexVariation, tapName) => {
    setProductVariations((prevProductVariations) =>
      prevProductVariations.map((item, idx) =>
        idx === indexVariation
          ? {
            ...item,
            names: item.names.map((name) =>
              name.tranlation_name === tapName
                ? { ...name, name: updatedValue }
                : name
            ),
          }
          : item
      )
    );
  };


  useEffect(() => {
    console.log('ProductExclude', productExclude)
    console.log('ProductExtra', productExtra)
  }, [productExtra, productExclude])



  // Add a new Variation
  const handleAddVariation = () => {
    const newVariation = {
      type: '',
      required: 0,
      points: '',
      min: '',
      max: '',
      names: taps.map(tap => ({
        name: '',
        tranlation_id: tap.id,
        tranlation_name: tap.name,
      })),
      options: [
        {
          names: taps.map((tap) => ({
            name: '',
            tranlation_id: tap.id,
            tranlation_name: tap.name,
          })),
          extra: [
            {
              extra_names: taps.map((tap) => ({
                extra_name: '',
                tranlation_id: tap.id,
                tranlation_name: tap.name,
              })),
              extra_price: '',
            },
          ],
          price: '',
          status: 0,
        },
      ],
    };
    setProductVariations((prevVariations) => [...prevVariations, newVariation]);
  };


  // Remove a Variation
  const handleRemoveVariation = (index) => {
    setProductVariations((prevVariations) =>
      prevVariations.filter((_, idx) => idx !== index)
    );
  };
  // Option

  // Example for updating nested options array
  const updateVariationState = (setProductVariations, variationIndex, field, tapName, updatedValue) => {
    setProductVariations(prevProductVariations =>
      prevProductVariations.map((item, idx) =>
        idx === variationIndex
          ? {
            ...item,
            [field]: item[field].map(subField =>
              subField.tranlation_name === tapName
                ? { ...subField, name: updatedValue }
                : subField
            ),
          }
          : item
      )
    );
  };

  const updateVariationOptionState = (setProductVariations, indexVariation, indexOption, translationName, value) => {
    setProductVariations((prev) =>
      prev.map((variation, vIdx) =>
        vIdx === indexVariation
          ? {
            ...variation,
            options: variation.options.map((opt, oIdx) =>
              oIdx === indexOption ? { ...opt, name: value } : opt
            ),
          }
          : variation
      )
    );
  };




  // Add a new Option to a specific Variation
  const handleAddOption = (variationIndex) => {
    const newOption = {
      names: taps.map((tap) => ({
        name: '',
        tranlation_id: tap.id,
        tranlation_name: tap.name,
      })),
      extra: [
        {
          extra_names: taps.map((tap) => ({
            extra_name: '',
            tranlation_id: tap.id,
            tranlation_name: tap.name,
          })),
          extra_price: '',
        },
      ],
      price: '',
      status: 0,
    };

    setProductVariations((prevVariations) =>
      prevVariations.map((variation, idx) =>
        idx === variationIndex
          ? { ...variation, options: [...variation.options, newOption] }
          : variation
      )
    );
  };


  const handleRemoveOption = (variationIndex, optionIndex) => {
    setProductVariations((prevProductVariations) =>
      prevProductVariations.map((variation, idx) =>
        idx === variationIndex
          ? {
            ...variation,
            options: variation.options.filter((_, optIdx) => optIdx !== optionIndex),
          }
          : variation
      )
    );
  };


  // Add a new Extra to a specific Option within a Variation
  const handleAddExtraAtOption = (variationIndex, optionIndex) => {
    const newExtra = {
      extra_names: taps.map((tap) => ({
        extra_name: '',
        tranlation_id: tap.id,
        tranlation_name: tap.name,
      })),
      extra_price: '',
    };

    setProductVariations((prevVariations) =>
      prevVariations.map((variation, vIdx) =>
        vIdx === variationIndex
          ? {
            ...variation,
            options: variation.options.map((option, oIdx) =>
              oIdx === optionIndex
                ? { ...option, extra: [...option.extra, newExtra] }
                : option
            ),
          }
          : variation
      )
    );
  };

  // Remove an Extra from a specific Option within a Variation
  const handleRemoveExtraAtOption = (variationIndex, optionIndex, extraIndex) => {
    setProductVariations((prevVariations) =>
      prevVariations.map((variation, vIdx) =>
        vIdx === variationIndex
          ? {
            ...variation,
            options: variation.options.map((option, oIdx) =>
              oIdx === optionIndex
                ? {
                  ...option,
                  extra: option.extra.filter((_, eIdx) => eIdx !== extraIndex),
                }
                : option
            ),
          }
          : variation
      )
    );
  };



  useEffect(() => {
    console.log('productVariations', productVariations)
  }, [productVariations])

  // DropDowns
  const handleOpenVariationType = (index) => {
    setOpenVariationIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle open state for the selected index
  };

  const handleOpenOptionProductVariationType = () => {
    setOpenVariationIndex(null); // Close the dropdown
  };


  const handleOpenCategory = () => {
    setIsOPenProductCategory(!isOPenProductCategory);
  };
  const handleOpenSubCategory = () => {
    setIsOPenProductSubCategory(!isOPenProductSubCategory);
  };
  const handleOpenItemType = () => {
    setIsOPenProductItemType(!isOPenProductItemType);
  };
  const handleOpenStockType = () => {
    setIsOPenProductStockType(!isOPenProductStockType);
  };
  const handleOpenDiscount = () => {
    setIsOPenProductDiscount(!isOPenProductDiscount);
  };
  const handleOpenTax = () => {
    setIsOPenProductTax(!isOPenProductTax);
  };


  const handleOpenOptionProductCategory = () => setIsOPenProductCategory(false);
  const handleOpenOptionProductSubCategory = () => setIsOPenProductSubCategory(false);
  const handleOpenOptionProductItemType = () => setIsOPenProductItemType(false);
  const handleOpenOptionProductStockType = () => setIsOPenProductStockType(false);
  const handleOpenOptionProductDiscount = () => setIsOPenProductDiscount(false);
  const handleOpenOptionProductTax = () => setIsOPenProductTax(false);

  const handleSelectProductVariationType = (option, variationIndex) => {
    // Update the `type` of the variation at `variationIndex`
    setProductVariations((prevProductVariations) =>
      prevProductVariations.map((ele, index) =>
        index === variationIndex
          ? { ...ele, type: option.name, min: '', max: '' } // Update type with selected value
          : ele
      )
    );
  };




  const handleSelectProductCategory = (option) => {
    setSelectedCategoryId(option.id);
    setSelectedCategoryState(option.name);
  };
  const handleSelectProductSubCategory = (option) => {
    setSelectedSubCategoryId(option.id);
    setSelectedSubCategoryState(option.name);
  };
  const handleSelectProductItemType = (option) => {
    setSelectedItemTypeName(option.id);
    setSelectedItemTypeState(option.name);
  };
  const handleSelectProductStockType = (option) => {
    setSelectedStockTypeName(option.name);
    setSelectedStockTypeState(option.name);
    setProductStockNumber('');
  };
  const handleSelectProductDiscount = (option) => {
    setSelectedDiscountId(option.name);
    setSelectedDiscountState(option.name);
  };
  const handleSelectProductTax = (option) => {
    setSelectedTaxId(option.id);
    setSelectedTaxState(option.name);
  };

  const handleProductStatus = () => {
    const currentState = productStatus;
    { currentState === 0 ? setProductStatus(1) : setProductStatus(0) }
  }

  const handleProductRecommended = () => {
    const currentState = productRecommended;
    { currentState === 0 ? setProductRecommended(1) : setProductRecommended(0) }
  }

  const handleProductTimeStatus = () => {
    const currentState = productTimeStatus;
    { currentState === 0 ? setProductTimeStatus(1) : setProductTimeStatus(0) }
    setProductStatusFrom(null)
    setProductStatusTo(null)
  }

  // Image
  const handleProductImageClick = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };
  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setProductImageName(file.name);
    }
  };


  // Close All dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryRef.current && !categoryRef.current.contains(event.target) &&
        subCategoryRef.current && !subCategoryRef.current.contains(event.target) &&
        itemTypeRef.current && !itemTypeRef.current.contains(event.target) &&
        stockTypeRef.current && !stockTypeRef.current.contains(event.target) &&
        discountRef.current && !discountRef.current.contains(event.target) &&
        taxRef.current && !taxRef.current.contains(event.target)
      ) {
        setIsOPenProductCategory(null);
        setIsOPenProductSubCategory(null);
        setIsOPenProductItemType(null);
        setIsOPenProductStockType(null);
        setIsOPenProductDiscount(null);
        setIsOPenProductTax(null);
      }

      // Handle closing variation dropdowns
      if (variationTypeRef.current) {
        let clickedInsideAnyVariation = false;
        for (let i = 0; i < variationTypeRef.current.length; i++) {
          const ref = variationTypeRef.current[i];
          if (ref && ref.contains(event.target)) {
            clickedInsideAnyVariation = true;
            break;
          }
        }

        if (!clickedInsideAnyVariation) {
          setOpenVariationIndex(null); // Close the variation dropdown
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOPenProductCategory, setIsOPenProductSubCategory, setIsOPenProductItemType, setIsOPenProductStockType, setIsOPenProductDiscount, setIsOPenProductTax, setOpenVariationIndex]);



  // Go To Languages Tap About Product Names
  const handleProductNamesTap = (index) => {
    setCurrentProductNamesTap(index)
  }
  // Go To Languages Tap About Exclude Names
  const handleExcludeNamesTap = (index) => {
    setCurrentExcludeNamesTap(index)
  }
  // Go To Languages Tap About Extra Names
  const handleExtraNamesTap = (index) => {
    setCurrentExtraNamesTap(index)
  }
  // Go To Languages Tap About Product Variation
  const handleVariationTap = (index) => {
    setCurrentVariationTap(index)
  }
  // Go To Languages Tap About Product Variation
  const handleVariationOptionTap = (index) => {
    setCurrentVariationOptionTap(index)
  }

  const handleReset = () => { };
  const handleproductAdd = () => { };
  return (
    <>
      {loadingTranslation || loadingCategory || loadingProduct || loadingPost ? (
        <>
          <div className="w-full flex justify-center items-center">
            <LoaderLogin />
          </div>
        </>
      ) : (

        <form onSubmit={handleproductAdd} className='w-full flex flex-col items-center justify-center pb-24 gap-5'>
          <div className="w-full flex flex-col items-start justify-start gap-5">

            {/* Product Names && Description */}
            <div className="w-full pb-4 border-b-4 border-gray-300 flex flex-col items-start justify-start gap-4">

              <div className="w-full flex items-center justify-start gap-x-6">
                {taps.map((tap, index) => (
                  <span
                    key={tap.id}
                    onClick={() => handleProductNamesTap(index)}
                    className={`${currentProductNamesTap === index ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor'}  pb-1 text-xl font-TextFontMedium transition-colors duration-300 cursor-pointer hover:text-mainColor`}
                  >
                    {tap.name}
                  </span>

                ))}
              </div>

              <div className="w-full">
                {taps.map((tap, index) => (
                  currentProductNamesTap === index && (
                    <div
                      className="w-full flex sm:flex-col lg:flex-row items-center justify-start gap-4"
                      key={tap.id}
                    >
                      {/* Product Name Input */}
                      <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                        <span className="text-xl font-TextFontRegular text-thirdColor">Product Name {tap.name}:</span>
                        <TextInput
                          value={productNames[index]?.product_name || ''} // Access category_name property
                          onChange={(e) => {
                            const inputValue = e.target.value; // Ensure this is a string
                            setProductNames(prev => {
                              const updatedProductNames = [...prev];

                              // Ensure the array is long enough
                              if (updatedProductNames.length <= index) {
                                updatedProductNames.length = index + 1; // Resize array
                              }

                              // Create or update the object at the current index
                              updatedProductNames[index] = {
                                ...updatedProductNames[index], // Retain existing properties if any
                                'tranlation_id': tap.id, // Use the ID from tap
                                'product_name': inputValue, // Use the captured string value
                                'tranlation_name': tap.name || 'Default Name', // Use tap.name for tranlation_name
                              };

                              return updatedProductNames;
                            });
                          }}
                          placeholder="Product Name"
                        />
                      </div>

                      {/* Product Description Input */}
                      <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                        <span className="text-xl font-TextFontRegular text-thirdColor">Product Description {tap.name}:</span>
                        <TextInput
                          value={descriptionNames[index]?.description_name || ''} // Access category_name property
                          onChange={(e) => {
                            const inputValue = e.target.value; // Ensure this is a string
                            setDescriptionNames(prev => {
                              const updatedDescriptionNames = [...prev];

                              // Ensure the array is long enough
                              if (updatedDescriptionNames.length <= index) {
                                updatedDescriptionNames.length = index + 1; // Resize array
                              }

                              // Create or update the object at the current index
                              updatedDescriptionNames[index] = {
                                ...updatedDescriptionNames[index], // Retain existing properties if any
                                'tranlation_id': tap.id, // Use the ID from tap
                                'description_name': inputValue, // Use the captured string value
                                'tranlation_name': tap.name || 'Default Name', // Use tap.name for tranlation_name
                              };

                              return updatedDescriptionNames;
                            });
                          }}
                          placeholder="Product Name"
                        />
                      </div>

                      {/* Conditional Rendering for First Tab Only */}
                    </div>
                  )
                ))}


              </div>

            </div>

            {/* Exclude Names */}
            <div className="w-full pb-4 border-b-4 border-gray-300 flex flex-col items-start justify-start gap-4">

              {productExclude.length !== 0 && (


                <div className="w-full flex items-center justify-start gap-x-6">
                  {taps.map((tap, index) => (
                    <span
                      key={tap.id}
                      onClick={() => handleExcludeNamesTap(index)}
                      className={`${currentExcludeNamesTap === index ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor'}  pb-1 text-xl font-TextFontMedium transition-colors duration-300 cursor-pointer hover:text-mainColor`}
                    >
                      {tap.name}
                    </span>
                  ))}
                </div>
              )}
              <div className="w-full">
                {taps.map((tap, index) => (
                  currentExcludeNamesTap === index && (
                    <div className="w-full flex flex-col items-center justify-center gap-4" key={tap.id}>
                      {(productExclude || []).map((ele, indexMap) => (
                        <div
                          className="w-full flex items-center justify-start gap-5"
                          key={`${tap.id}-${indexMap}`}
                        >
                          {/* Exclude Name Input */}
                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                            <span className="text-xl font-TextFontRegular text-thirdColor">
                              Exclude Name {tap.name}:
                            </span>
                            <TextInput
                              value={ele.names.find(name => name.tranlation_name === tap.name)?.exclude_name || ''}
                              onChange={(e) => {
                                const updatedValue = e.target.value;
                                setProductExclude((prevProductExclude) =>
                                  prevProductExclude.map((item, idx) =>
                                    idx === indexMap
                                      ? {
                                        ...item,
                                        names: item.names.map((name) =>
                                          name.tranlation_name === tap.name
                                            ? { ...name, exclude_name: updatedValue }
                                            : name
                                        ),
                                      }
                                      : item
                                  )
                                );
                              }}
                              placeholder="Exclude Name"
                            />
                          </div>

                          {/* Remove Button */}
                          {index === 0 && (
                            <div className="flex items-end mt-10">
                              <StaticButton
                                text="Remove"
                                handleClick={() => handleRemoveExclude(indexMap)}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                      {index === 0 && (
                        <div className={`w-full flex items-center ${productExclude.length === 0 ? 'justify-center' : 'justify-start'}`}>
                          <ButtonAdd
                            isWidth={true}
                            Color="mainColor"
                            Text={productExclude.length === 0 ? 'Add Exclude' : 'Add More Exclude'}
                            handleClick={handleAddExclude}
                          />
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>

            </div>

            {/* Extra Names && Price */}
            <div className="w-full pb-4 border-b-4 border-gray-300 flex flex-col items-start justify-start gap-4">

              {productExtra.length !== 0 && (


                <div className="w-full flex items-center justify-start gap-x-6">
                  {taps.map((tap, index) => (
                    <span
                      key={tap.id}
                      onClick={() => handleExtraNamesTap(index)}
                      className={`${currentExtraNamesTap === index ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor'}  pb-1 text-xl font-TextFontMedium transition-colors duration-300 cursor-pointer hover:text-mainColor`}
                    >
                      {tap.name}
                    </span>
                  ))}
                </div>
              )}
              <div className="w-full">
                {taps.map((tap, index) => (
                  currentExtraNamesTap === index && (
                    <div className="w-full flex flex-col items-center justify-center gap-4" key={tap.id}>
                      {(productExtra || []).map((ele, indexMap) => (
                        <div
                          className="w-full flex items-center justify-start gap-5"
                          key={`${tap.id}-${indexMap}`}
                        >
                          {/* Extra Name Input */}
                          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                            <span className="text-xl font-TextFontRegular text-thirdColor">
                              Extra Name {tap.name}:
                            </span>
                            <TextInput
                              value={ele.names.find(name => name.tranlation_name === tap.name)?.extra_name || ''}
                              onChange={(e) => {
                                const updatedValue = e.target.value;
                                setProductExtra((prevProductExtra) =>
                                  prevProductExtra.map((item, idx) =>
                                    idx === indexMap
                                      ? {
                                        ...item,
                                        names: item.names.map((name) =>
                                          name.tranlation_name === tap.name
                                            ? { ...name, extra_name: updatedValue }
                                            : name
                                        ),
                                      }
                                      : item
                                  )
                                );
                              }}
                              placeholder="Extra Name"
                            />
                          </div>

                          {/* Extra Price Input (only for the first language tab) */}
                          {index === 0 && (
                            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                              <span className="text-xl font-TextFontRegular text-thirdColor">
                                Price:
                              </span>
                              <NumberInput
                                value={ele.extra_price || ''}
                                onChange={(e) => {
                                  const updatedPrice = e.target.value;
                                  setProductExtra((prevProductExtra) =>
                                    prevProductExtra.map((item, idx) =>
                                      idx === indexMap
                                        ? { ...item, extra_price: updatedPrice }
                                        : item
                                    )
                                  );
                                }}
                                placeholder="Price"
                              />
                            </div>
                          )}

                          {/* Remove Button */}
                          {index === 0 && (
                            <div className="flex items-end mt-10">
                              <StaticButton
                                text="Remove"
                                handleClick={() => handleRemoveExtra(indexMap)}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                      {index === 0 && (
                        <div className={`w-full flex items-center ${productExtra.length === 0 ? 'justify-center' : 'justify-start'}`}>
                          <ButtonAdd
                            isWidth={true}
                            Color="mainColor"
                            Text={productExtra.length === 0 ? 'Add Extra' : 'Add More Extra'}
                            handleClick={handleAddExtra}
                          />
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>

            </div>

            {/* Product Variations */}
            <div className="w-full pb-4 border-b-4 border-gray-300 flex flex-col items-start justify-start gap-4">

              {productVariations.length !== 0 && (


                <div className="w-full flex items-center justify-start gap-x-6">
                  {taps.map((tap, index) => (
                    <span
                      key={tap.id}
                      onClick={() => handleVariationTap(index)}
                      className={`${currentVariationTap === index ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor'}  pb-1 text-xl font-TextFontMedium transition-colors duration-300 cursor-pointer hover:text-mainColor`}
                    >
                      {tap.name}
                    </span>
                  ))}
                </div>
              )}
              <div className="w-full">
                {taps.map((tap, index) => (
                  currentVariationTap === index && (
                    <div className="w-full flex flex-col items-center justify-center gap-4" key={tap.id}>
                      {(productVariations || []).map((ele, indexVariation) => (
                        <div
                          className="w-full border-4 border-mainColor p-3 rounded-2xl  flex sm:flex-col lg:flex-row flex-wrap shadow  items-start justify-start gap-5"
                          key={`${tap.id}-${indexVariation}`}
                        >
                          {/* Variation Name */}
                          <div className="sm:w-full lg:w-[30%] flex sm:flex-col lg:flex-row items-start justify-start gap-5">
                            <div className="w-full flex flex-col items-start justify-center gap-y-1">
                              <span className="text-xl font-TextFontRegular text-thirdColor">
                                Variation Name {tap.name}:
                              </span>
                              <TextInput
                                value={ele.names.find(name => name.tranlation_name === tap.name)?.name || ''}
                                onChange={(e) => updateVariationState(setProductVariations, indexVariation, 'names', tap.name, e.target.value)}
                                placeholder="Variation Name"
                              />
                            </div>
                          </div>
                          {index === 0 && (
                            <>
                              <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                                <span className="text-xl font-TextFontRegular text-thirdColor">Variation Type:</span>
                                <DropDown
                                  ref={(el) => (variationTypeRef.current[indexVariation] = el)} // Ensure correct indexing for refs
                                  handleOpen={() => handleOpenVariationType(indexVariation)} // Pass index of current variation
                                  stateoption={ele.type || 'Select Type'}
                                  openMenu={openVariationIndex === indexVariation} // Open only if index matches the open state
                                  handleOpenOption={handleOpenOptionProductVariationType}
                                  options={[{ name: 'single' }, { name: 'multiple' }]}
                                  onSelectOption={(option) => handleSelectProductVariationType(option, indexVariation)}
                                />
                              </div>

                              {ele.type === 'single' && (
                                <>
                                  <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                                    <span className="text-xl font-TextFontRegular text-thirdColor">Min:</span>
                                    <NumberInput
                                      value={ele.min || ''}  // Ensure `ele.points` has a default if undefined
                                      onChange={(e) => {
                                        const updatedValue = e.target.value;
                                        setProductVariations((prevProductVariations) =>
                                          prevProductVariations.map((item, idx) =>
                                            idx === indexVariation
                                              ? {
                                                ...item,
                                                min: updatedValue, // Ensure this sets `points` correctly
                                              }
                                              : item
                                          )
                                        );
                                      }}
                                      placeholder={'Min'}
                                    />
                                  </div>

                                  <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                                    <span className="text-xl font-TextFontRegular text-thirdColor">Max:</span>
                                    <NumberInput
                                      value={ele.max || ''}  // Ensure `ele.points` has a default if undefined
                                      onChange={(e) => {
                                        const updatedValue = e.target.value;
                                        setProductVariations((prevProductVariations) =>
                                          prevProductVariations.map((item, idx) =>
                                            idx === indexVariation
                                              ? {
                                                ...item,
                                                max: updatedValue, // Ensure this sets `points` correctly
                                              }
                                              : item
                                          )
                                        );
                                      }}
                                      placeholder={'Max'}
                                    />
                                  </div>
                                </>
                              )}

                              <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                                <span className="text-xl font-TextFontRegular text-thirdColor">Point:</span>
                                <NumberInput
                                  value={ele.points || ''}  // Ensure `ele.points` has a default if undefined
                                  onChange={(e) => {
                                    const updatedValue = e.target.value;
                                    setProductVariations((prevProductVariations) =>
                                      prevProductVariations.map((item, idx) =>
                                        idx === indexVariation
                                          ? {
                                            ...item,
                                            points: updatedValue, // Ensure this sets `points` correctly
                                          }
                                          : item
                                      )
                                    );
                                  }}
                                  placeholder={'Point'}
                                />
                              </div>

                              <div className='w-[32%] flex items-center justify-start gap-x-3'>
                                <span className="text-xl font-TextFontRegular text-thirdColor">Required:</span>
                                <Switch
                                  handleClick={() => {
                                    setProductVariations((prevProductVariations) =>
                                      prevProductVariations.map((item, idx) =>
                                        idx === indexVariation
                                          ? {
                                            ...item,
                                            required: item.required === 1 ? 0 : 1,  // Toggle between 1 and 0
                                          }
                                          : item
                                      )
                                    );
                                  }}
                                  checked={ele.required === 1}  // Consider it checked if `required` is 1
                                />

                              </div>
                              <div className="w-full">
                                <TitlePage text={'Options Variation'} />
                              </div>
                            </>
                          )}


                          {index === 0 && (
                            <>
                              {/* Options */}
                              <div className="w-full flex items-center justify-start gap-x-6">
                                {/* Tabs for variation options */}
                                {taps.map((tap, index) => (
                                  <span
                                    key={tap.id}
                                    onClick={() => handleVariationOptionTap(index)}
                                    className={`${currentVariationOptionTap === index ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor'} 
                  pb-1 text-xl font-TextFontMedium transition-colors duration-300 cursor-pointer hover:text-mainColor`}
                                  >
                                    {tap.name}
                                  </span>
                                ))}
                              </div>

                              {/* Render each variation's options */}
                              {taps.map((tapOption, indexOptionTap) => (
                                currentVariationOptionTap === indexOptionTap && (
                                  <div className="w-full flex flex-col items-start justify-start gap-4" key={tapOption.id}>
                                    <div className="sm:w-full flex flex-wrap items-start justify-start gap-5">
                                      {/* Render options */}
                                      {ele.options.map((option, indexOption) => (
                                        <div className="sm:w-full flex flex-wrap items-start justify-start gap-5 shadow-md p-5 pt-0 rounded-xl" key={`${indexOption}-${tapOption.id}`}>
                                          {/* Option Name */}
                                          <div className="w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                            <span className="text-xl font-TextFontRegular text-thirdColor">
                                              Option Name {tapOption.name}:
                                            </span>
                                            <TextInput
                                              value={
                                                option.names.find(nameObj => nameObj.tranlation_name === tapOption.name)?.name || ''
                                              }
                                              onChange={(e) => {
                                                const updatedValue = e.target.value;
                                                setProductVariations((prevVariations) =>
                                                  prevVariations.map((variation, idx) =>
                                                    idx === indexVariation
                                                      ? {
                                                        ...variation,
                                                        options: variation.options.map((opt, optIdx) =>
                                                          optIdx === indexOption
                                                            ? {
                                                              ...opt,
                                                              names: opt.names.map((nameObj) =>
                                                                nameObj.tranlation_name === tapOption.name
                                                                  ? { ...nameObj, name: updatedValue }
                                                                  : nameObj
                                                              ),
                                                            }
                                                            : opt
                                                        ),
                                                      }
                                                      : variation
                                                  )
                                                );
                                              }}
                                              placeholder="Option Name"
                                            />
                                          </div>
                                          {indexOptionTap === 0 && (
                                            <>
                                              {/* Option Price */}
                                              <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                                                <span className="text-xl font-TextFontRegular text-thirdColor">Price:</span>
                                                <NumberInput
                                                  value={option.price || ''}
                                                  onChange={(e) => {
                                                    const updatedValue = e.target.value;
                                                    setProductVariations((prevProductVariations) =>
                                                      prevProductVariations.map((item, idx) =>
                                                        idx === indexVariation
                                                          ? {
                                                            ...item,
                                                            options: item.options.map((opt, optIdx) =>
                                                              optIdx === indexOption
                                                                ? { ...opt, price: updatedValue }
                                                                : opt
                                                            ),
                                                          }
                                                          : item
                                                      )
                                                    );
                                                  }}
                                                  placeholder="Price"
                                                />
                                              </div>

                                              {/* Option Status */}
                                              <div className="w-[20%] flex items-center justify-start gap-x-3 lg:mt-10">
                                                <span className="text-xl font-TextFontRegular text-thirdColor">Status:</span>
                                                <Switch
                                                  handleClick={() =>
                                                    setProductVariations((prevProductVariations) =>
                                                      prevProductVariations.map((item, idx) =>
                                                        idx === indexVariation
                                                          ? {
                                                            ...item,
                                                            options: item.options.map((opt, optIdx) =>
                                                              optIdx === indexOption
                                                                ? { ...opt, status: opt.status ? 0 : 1 }
                                                                : opt
                                                            ),
                                                          }
                                                          : item
                                                      )
                                                    )
                                                  }
                                                  checked={option.status === 1}
                                                />
                                              </div>

                                            </>
                                          )}


                                          {/* Render extras for this option */}
                                          {option.extra.map((extra, extraIndex) => (
                                            <div className="w-full flex flex-wrap items-start justify-start gap-5" key={`${tapOption.id}-${indexOption}-${extraIndex}`}>
                                              {/* Extra Name */}
                                              <div className="w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                <span className="text-xl font-TextFontRegular text-thirdColor">
                                                  Extra Name {tapOption.name}:
                                                </span>
                                                <TextInput
                                                  value={
                                                    extra.extra_names.find(
                                                      (extraNameObj) => extraNameObj.tranlation_name === tapOption.name
                                                    )?.extra_name || ''
                                                  }
                                                  onChange={(e) => {
                                                    const updatedValue = e.target.value;
                                                    setProductVariations((prevVariations) =>
                                                      prevVariations.map((variation, idx) =>
                                                        idx === indexVariation
                                                          ? {
                                                            ...variation,
                                                            options: variation.options.map((opt, optIdx) =>
                                                              optIdx === indexOption
                                                                ? {
                                                                  ...opt,
                                                                  extra: opt.extra.map((ext, extIdx) =>
                                                                    extIdx === extraIndex
                                                                      ? {
                                                                        ...ext,
                                                                        extra_names: ext.extra_names.map((nameObj) =>
                                                                          nameObj.tranlation_name === tapOption.name
                                                                            ? { ...nameObj, extra_name: updatedValue }
                                                                            : nameObj
                                                                        ),
                                                                      }
                                                                      : ext
                                                                  ),
                                                                }
                                                                : opt
                                                            ),
                                                          }
                                                          : variation
                                                      )
                                                    );
                                                  }}
                                                  placeholder="Extra Name"
                                                />
                                              </div>

                                              {indexOptionTap === 0 && (
                                                <>
                                                  {/* Extra Price */}
                                                  <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                                                    <span className="text-xl font-TextFontRegular text-thirdColor">Extra Price:</span>
                                                    <NumberInput
                                                      value={extra.extra_price || ''}
                                                      onChange={(e) => {
                                                        const updatedValue = e.target.value;
                                                        setProductVariations((prevVariations) =>
                                                          prevVariations.map((variation, idx) =>
                                                            idx === indexVariation
                                                              ? {
                                                                ...variation,
                                                                options: variation.options.map((opt, optIdx) =>
                                                                  optIdx === indexOption
                                                                    ? {
                                                                      ...opt,
                                                                      extra: opt.extra.map((ext, extIdx) =>
                                                                        extIdx === extraIndex
                                                                          ? { ...ext, extra_price: updatedValue }
                                                                          : ext
                                                                      ),
                                                                    }
                                                                    : opt
                                                                ),
                                                              }
                                                              : variation
                                                          )
                                                        );
                                                      }}
                                                      placeholder="Extra Price"
                                                    />
                                                  </div>

                                                  {/* Remove Extra Button */}
                                                  <div className="sm:w-full lg:w-[20%] flex items-center justify-center lg:mt-8">
                                                    <StaticButton
                                                      text="Remove Extra"
                                                      handleClick={() =>
                                                        handleRemoveExtraAtOption(indexVariation, indexOption, extraIndex)
                                                      }
                                                    />
                                                  </div>
                                                </>
                                              )}
                                            </div>
                                          ))}

                                          {/* Add Extra Button */}
                                          <div className="sm:w-full flex items-center justify-center">
                                            <ButtonAdd
                                              isWidth={true}
                                              Color="mainColor"
                                              Text="Add Extra"
                                              handleClick={() => handleAddExtraAtOption(indexVariation, indexOption)}
                                            />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )
                              ))}



                              <div className="w-full flex flex-col gap-y-3">

                                <div className='sm:w-full flex items-center justify-center'>
                                  <ButtonAdd
                                    isWidth={true}
                                    Color="mainColor"
                                    Text={'Add Option'}
                                    handleClick={() => handleAddOption(indexVariation)}
                                  />
                                </div>

                                <div className='sm:w-full flex items-center justify-end'>
                                  <div className='sm:w-full lg:w-auto'>
                                    <StaticButton
                                      text={'Remove Variation'}
                                      handleClick={() => handleRemoveVariation(indexVariation)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                        </div>
                      ))}
                      {index === 0 && (
                        <div className={`w-full flex items-center ${productVariations.length === 0 ? 'justify-center' : 'justify-start'}`}>
                          <ButtonAdd
                            isWidth={true}
                            Color="mainColor"
                            Text={productVariations.length === 0 ? 'Add Variation' : 'Add More Variation'}
                            handleClick={handleAddVariation}
                          />
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>

            </div>

            {/* More Details */}
            <div className="w-full sm:flex-col lg:flex-row flex items-start justify-start  gap-5">
              {/* Product Category  */}
              <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                <span className="text-xl font-TextFontRegular text-thirdColor">Category Name:</span>
                <DropDown
                  ref={categoryRef}
                  handleOpen={handleOpenCategory}
                  stateoption={selectedCategoryState}
                  openMenu={isOPenProductCategory}
                  handleOpenOption={handleOpenOptionProductCategory}
                  options={categories}
                  onSelectOption={handleSelectProductCategory}
                />
              </div>
              {/* Product SubCategory  */}
              <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                <span className="text-xl font-TextFontRegular text-thirdColor">SubCategory Name:</span>
                <DropDown
                  ref={subCategoryRef}
                  handleOpen={handleOpenSubCategory}
                  stateoption={selectedSubCategoryState}
                  openMenu={isOPenProductSubCategory}
                  handleOpenOption={handleOpenOptionProductSubCategory}
                  options={subCategories}
                  onSelectOption={handleSelectProductSubCategory}
                />
              </div>
              {/* Product Addons  */}
              <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                <span className="text-xl font-TextFontRegular text-thirdColor">Addons Names:</span>
                <MultiSelect
                  value={selectedAddonsId}
                  onChange={(e) => setSelectedAddonsId(e.value)} // Assigns entire selected array
                  options={addons}
                  optionLabel="name"
                  display="chip"
                  placeholder={selectedAddonsState}
                  maxSelectedLabels={3}
                  className="w-full md:w-20rem bg-white shadow"
                />
              </div>
            </div>

            <div className="w-full sm:flex-col lg:flex-row flex items-start justify-start gap-5">
              {/* Product Item Type  */}
              <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                <span className="text-xl font-TextFontRegular text-thirdColor">Item Type:</span>
                <DropDown
                  ref={itemTypeRef}
                  handleOpen={handleOpenItemType}
                  stateoption={selectedItemTypeState}
                  openMenu={isOPenProductItemType}
                  handleOpenOption={handleOpenOptionProductItemType}
                  options={itemTypes}
                  onSelectOption={handleSelectProductItemType}
                />
              </div>
              {/* Product Stock Type  */}
              <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                <span className="text-xl font-TextFontRegular text-thirdColor">Stock Type:</span>
                <DropDown
                  ref={stockTypeRef}
                  handleOpen={handleOpenStockType}
                  stateoption={selectedStockTypeState}
                  openMenu={isOPenProductStockType}
                  handleOpenOption={handleOpenOptionProductStockType}
                  options={stockTypes}
                  onSelectOption={handleSelectProductStockType}
                />
              </div>

              {selectedStockTypeState === 'daily' || selectedStockTypeState === 'fixed' && (
                <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                  <span className="text-xl font-TextFontRegular text-thirdColor">Number:</span>
                  <NumberInput
                    value={productStockNumber}
                    onChange={(e) => setProductStockNumber(e.target.value)}
                    placeholder={'Number'}
                  />
                </div>
              )}

              {/* Product Price */}
              <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                <span className="text-xl font-TextFontRegular text-thirdColor">Price:</span>
                <NumberInput
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder={'Price'}
                />
              </div>
            </div>

            <div className="w-full sm:flex-col lg:flex-row flex items-start justify-start gap-5">
              {/* Product Discount  */}
              <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                <span className="text-xl font-TextFontRegular text-thirdColor">Discount Name:</span>
                <DropDown
                  ref={discountRef}
                  handleOpen={handleOpenDiscount}
                  stateoption={selectedDiscountState}
                  openMenu={isOPenProductDiscount}
                  handleOpenOption={handleOpenOptionProductDiscount}
                  options={discounts}
                  onSelectOption={handleSelectProductDiscount}
                />
              </div>
              {/* Product Tax  */}
              <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                <span className="text-xl font-TextFontRegular text-thirdColor">Tax Name:</span>
                <DropDown
                  ref={taxRef}
                  handleOpen={handleOpenTax}
                  stateoption={selectedTaxState}
                  openMenu={isOPenProductTax}
                  handleOpenOption={handleOpenOptionProductTax}
                  options={taxes}
                  onSelectOption={handleSelectProductTax}
                />
              </div>
              {/* Product Point */}
              <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                <span className="text-xl font-TextFontRegular text-thirdColor">Point:</span>
                <NumberInput
                  value={productPoint}
                  onChange={(e) => setProductPoint(e.target.value)}
                  placeholder={'Point'}
                />
              </div>
            </div>

            <div className="w-full flex sm:flex-col lg:flex-row items-start justify-start mt-2 gap-5">
              {/* Product Image */}
              {/* <div className="sm:w-full lg:w-[33%]  sm:flex-col lg:flex-row flex sm:items-start lg:items-center justify-start gap-x-3"> */}
              <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                <span className="text-xl font-TextFontRegular text-thirdColor">Product Image:</span>
                <UploadInput
                  value={productImageName}
                  uploadFileRef={productImageRef}
                  placeholder="Product Image"
                  handleFileChange={handleProductImageChange}
                  onChange={(e) => setProductImage(e.target.value)}
                  onClick={() => handleProductImageClick(productImageRef)}
                />
              </div>

              {productTimeStatus === 1 && (
                <>

                  <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                    <span className="text-xl font-TextFontRegular text-thirdColor">From:</span>
                    {/* <NumberInput
                      value={productStatusFrom}
                      onChange={(e) => setProductStatusFrom(e.target.value)}
                      placeholder={'From'}
                      /> */}
                    <TimeInput
                      value={productStatusFrom}
                      onChange={(e) => setProductStatusFrom(e.target.value)}
                    />
                    {/* <input type="time" /> */}
                  </div>

                  <div className="sm:w-full lg:w-[33%] flex flex-col items-start justify-center gap-y-1">
                    <span className="text-xl font-TextFontRegular text-thirdColor">To:</span>
                    <TimeInput
                      value={productStatusTo}
                      onChange={(e) => setProductStatusTo(e.target.value)}
                    />
                    {/* <NumberInput
                      value={productStatusTo}
                      onChange={(e) => setProductStatusTo(e.target.value)}
                      placeholder={'To'}
                      /> */}
                    {/* <input type="time" /> */}
                  </div>
                </>
              )}
            </div>

            <div className="w-full sm:flex-col lg:flex-row flex items-start justify-start gap-4">

              {/* Product Status */}
              <div className='sm:w-full lg:w-[20%] flex items-center justify-start gap-x-3'>
                <span className="text-xl font-TextFontRegular text-thirdColor">Status:</span>
                <Switch handleClick={handleProductStatus} checked={productStatus} />
              </div>
              {/* Product Product Recommended */}
              <div className='sm:w-full lg:w-[40%] flex items-center justify-start gap-x-3'>
                <span className="text-xl font-TextFontRegular text-thirdColor">Product Recommended:</span>
                <Switch handleClick={handleProductRecommended} checked={productRecommended} />
              </div>
              {/* Product Time Status */}
              <div className='sm:w-full lg:w-[35%] flex items-center justify-start gap-x-3'>
                <span className="text-xl font-TextFontRegular text-thirdColor">Product Time Status:</span>
                <Switch handleClick={handleProductTimeStatus} checked={productTimeStatus} />
              </div>

            </div>

          </div>



          {/* Buttons*/}
          <div className="w-full flex items-center justify-end gap-x-4">
            <div>
              <StaticButton text={'Reset'} handleClick={handleReset} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
            </div>
            <div>
              <SubmitButton
                text={'Add Product'}
                rounded='rounded-full'
                handleClick={handleproductAdd}
              />
            </div>

          </div>

        </form>
      )}
    </>
  )
}

export default AddProductPage