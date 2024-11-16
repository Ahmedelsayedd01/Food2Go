import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/Auth';
import { IoIosArrowForward } from 'react-icons/io';
import { CategoryIcon, HomeIcon, ProductIcon } from '../../Assets/Icons/AllIcons';
import { RiVipDiamondLine } from 'react-icons/ri';

const LinksSidebar = () => {
       const auth = useAuth();
       const navigate = useNavigate();
       const location = useLocation();
       const pathName = location.pathname;
       const hideSide = auth.hideSidebar;

       const stateLink = auth.sidebar ? JSON.parse(auth.sidebar) : {};
       console.log('stateLink', stateLink)

       // Initialize component state from `auth.sidebar` state
       /* Home */
       const [isActiveHome, setIsActiveHome] = useState(stateLink.isActiveHome ?? true);
       const [isActiveHomeIcon, setIsActiveHomeIcon] = useState(stateLink.isActiveHomeIcon ?? true);
       /* Addons */
       const [isActiveAddons, setIsActiveAddons] = useState(stateLink.isActiveAddons ?? false);
       const [isActiveAddonsIcon, setIsActiveAddonsIcon] = useState(stateLink.isActiveAddonsIcon ?? false);
       /* Category */
       const [isOpenCategory, setIsOpenCategory] = useState(stateLink.isOpenCategory ?? false);
       const [isActiveCategory, setIsActiveCategory] = useState(stateLink.isActiveCategory ?? false);
       const [isActiveCategoryIcon, setIsActiveCategoryIcon] = useState(stateLink.isActiveCategoryIcon ?? false);
       /* Product */
       const [isOpenProductSetup, setIsOpenProductSetup] = useState(stateLink.isOpenProductSetup ?? false);
       const [isActiveProductSetupIcon, setIsActiveProductSetupIcon] = useState(stateLink.isActiveProductSetupIcon ?? false);
       const [isActiveProductSetup, setIsActiveProductSetup] = useState(stateLink.isActiveProductSetup ?? false);
       const [isActiveProduct, setIsActiveProduct] = useState(stateLink.isActiveProduct ?? false);
       const [isActiveAddProduct, setIsActiveAddProduct] = useState(stateLink.isActiveAddProduct ?? false);

       // Helper function to save the current active links state
       const saveActiveLinksState = useCallback(() => {
              const activeLinks = {
                     isActiveHome,
                     isActiveHomeIcon,
                     isActiveAddons,
                     isActiveAddonsIcon,
                     isOpenCategory,
                     isActiveCategory,
                     isActiveCategoryIcon,
                     isOpenProductSetup,
                     isActiveProductSetupIcon,
                     isActiveProduct,
                     isActiveAddProduct,
              };
              auth.sidebar = JSON.stringify(activeLinks);
       }, [
              isActiveHome,
              isActiveHomeIcon,
              isActiveAddons,
              isActiveAddonsIcon,
              isOpenCategory,
              isActiveCategory,
              isActiveCategoryIcon,
              isOpenProductSetup,
              isActiveProductSetupIcon,
              isActiveProduct,
              isActiveAddProduct,
       ]);

       // Save state to sidebar at auth when any link state changes
       useEffect(() => {
              saveActiveLinksState();
       }, [
              isActiveHome,
              isActiveHomeIcon,
              isActiveAddons,
              isActiveAddonsIcon,
              isOpenCategory,
              isActiveCategory,
              isActiveCategoryIcon,
              isOpenProductSetup,
              isActiveProductSetupIcon,
              isActiveProduct,
              isActiveAddProduct,
              saveActiveLinksState
       ]);

       // Handler functions to manage navigation state
       /* Home */
       const handleClickHome = useCallback(() => {
              setIsActiveHome(true);
              setIsActiveHomeIcon(true);
              setIsActiveAddons(false);
              setIsOpenCategory(false);
              setIsActiveCategory(false);
              setIsActiveCategoryIcon(false);
              setIsOpenProductSetup(false);
              setIsActiveProductSetup(false);
              setIsActiveProductSetupIcon(false);
              setIsActiveProduct(false);
              setIsActiveAddProduct(false);
       }, []);
       useEffect(() => {
              // const pathName = location.pathname;
              const part = pathName.split('/');
              const result = part.slice(0, 2).join('/');
              if (result == "/dashboard") {
                     handleClickHome()
              }
       }, [location])

       /* Addons */
       const handleClickAddons = useCallback(() => {
              setIsActiveHome(false);
              setIsActiveHomeIcon(false);
              setIsActiveAddons(true);
              setIsOpenCategory(false);
              setIsActiveCategory(false);
              setIsActiveCategoryIcon(false);
              setIsOpenProductSetup(false);
              setIsActiveProductSetup(false);
              setIsActiveProductSetupIcon(false);
              setIsActiveProduct(false);
              setIsActiveAddProduct(false);
       }, []);
       useEffect(() => {
              // const pathName = location.pathname;
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard/addons") {
                     handleClickAddons()
              }
       }, [location])
       /* Category */
       const handleClickCategory = useCallback(() => {
              setIsActiveHome(false);
              setIsActiveHomeIcon(false);
              setIsActiveAddons(false);
              setIsOpenCategory(true);
              setIsActiveCategory(true);
              setIsActiveCategoryIcon(true);
              setIsOpenProductSetup(false);
              setIsActiveProductSetup(false);
              setIsActiveProductSetupIcon(false);
              setIsActiveProduct(false);
              setIsActiveAddProduct(false);
       }, []);
       useEffect(() => {
              // const pathName = location.pathname;
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard/category") {
                     handleClickCategory()
              }
       }, [location])
       /* Product */
       const handleClickProductSetup = useCallback(() => {
              setIsActiveHome(false);
              setIsActiveHomeIcon(false);
              setIsActiveAddons(false);
              setIsOpenCategory(false);
              setIsActiveCategory(false);
              setIsActiveCategoryIcon(false);
              setIsOpenProductSetup(true);
              setIsActiveProductSetup(true);
              setIsActiveProductSetupIcon(true);
              setIsActiveProduct(true);
              setIsActiveAddProduct(false);
       }, []);
       // useEffect(() => {
       //        const part = pathName.split('/');
       //        const result = part.slice(0, 3).join('/');

       //        // Only navigate if on `/dashboard/setup_product` and not already on `/dashboard/setup_product/product`
       //        if (result === "/dashboard/setup_product" && pathName !== "/dashboard/setup_product/product") {
       //               handleClickProductSetup();
       //               navigate('/dashboard/setup_product/product');  // ensure this path is absolute
       //        }
       //        console.log('result', result);
       // }, [pathName]);

       const handleClickProduct = useCallback(() => {
              setIsActiveHome(false);
              setIsActiveHomeIcon(false);
              setIsActiveAddons(false);
              setIsOpenCategory(false);
              setIsActiveCategory(false);
              setIsActiveCategoryIcon(false);
              setIsOpenProductSetup(true);
              setIsActiveProductSetup(true);
              setIsActiveProductSetupIcon(true);
              setIsActiveProduct(true);
              setIsActiveAddProduct(false);
       }, []);
       // useEffect(() => {
       //        // const pathName = location.pathname;
       //        const part = pathName.split('/');
       //        const result = part.slice(0, 4).join('/');
       //        if (result == "/dashboard/setup_product/product") {
       //               handleClickProduct()
       //        }
       // }, [location])
       const handleClickAddProduct = useCallback(() => {
              setIsActiveHome(false);
              setIsActiveHomeIcon(false);
              setIsActiveAddons(false);
              setIsOpenCategory(false);
              setIsActiveCategory(false);
              setIsActiveCategoryIcon(false);
              setIsOpenProductSetup(true);
              setIsActiveProductSetup(true);
              setIsActiveProductSetupIcon(true);
              setIsActiveProduct(false);
              setIsActiveAddProduct(true);
       }, []);
       // useEffect(() => {
       //        const part = pathName.split('/');
       //        const result = part.slice(0, 5).join('/');
       //        console.log('product/add', result)
       //        if (result == "/dashboard/setup_product/product/add") {
       //               handleClickAddProduct()
       //        }
       // }, [location])
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 5).join('/'); // Adjusted to check full path for 'add'

              if (result === "/dashboard/setup_product/product/add") {
                     handleClickAddProduct();
              } else if (result === "/dashboard/setup_product/product") {
                     handleClickProduct();
              } else if (part.slice(0, 3).join('/') === "/dashboard/setup_product" && pathName !== "/dashboard/setup_product/product") {
                     handleClickProductSetup();
                     navigate('/dashboard/setup_product/product');
              }

              console.log('Current path:', pathName);
       }, [pathName]);






       return (
              <div className="LinksSidebar w-full h-full flex flex-col items-center justify-start gap-y-3">
                     <Link to="/dashboard"
                            onMouseMove={() => setIsActiveHomeIcon(true)}
                            onMouseOut={() => setIsActiveHomeIcon(false)}
                            onClick={handleClickHome}
                            className={`
                            ${isActiveHome ? 'active' : ''}
                            ${hideSide ? 'justify-between' : 'justify-center'} 
                            hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                            hover:text-mainColor w-full flex items-center 
                            transition-all duration-300 group`}
                     >
                            <div className="flex items-center gap-x-2">
                                   <HomeIcon isActive={isActiveHomeIcon || isActiveHome} />
                                   <span className={`${hideSide ? 'block' : 'hidden'} 
                                   ${isActiveHome ? "text-mainColor" : "text-white"}
                                      text-base font-TextFontRegular transition-all duration-300
                                    group-hover:text-mainColor`}
                                   >
                                          Home
                                   </span>
                            </div>
                     </Link>
                     <Link to="addons"
                            onMouseMove={() => setIsActiveAddonsIcon(true)}
                            onMouseOut={() => setIsActiveAddonsIcon(false)}
                            onClick={handleClickAddons}
                            className={`
                                   ${isActiveAddons ? 'active' : ''}
                                   ${hideSide ? 'justify-between' : 'justify-center'} 
                                   hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                   hover:text-mainColor w-full flex items-center 
                                   transition-all duration-300 group`}
                     >
                            <div className="flex items-center gap-x-2">
                                   <RiVipDiamondLine
                                          className={`${isActiveAddonsIcon || isActiveAddons ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`}
                                   />
                                   <span
                                          className={`${hideSide ? 'block' : 'hidden'}
                                           ${isActiveAddons ? "text-mainColor" : "text-white"}
                                          text-lg font-TextFontRegular transition-all duration-300
                                          group-hover:text-mainColor`}
                                   >
                                          Addons
                                   </span>
                            </div>
                     </Link>
                     <Link to="category"
                            onMouseMove={() => setIsActiveCategoryIcon(true)}
                            onMouseOut={() => setIsActiveCategoryIcon(false)}
                            onClick={handleClickCategory}
                            className={`
                            ${isActiveCategory ? 'active' : ''}
                            ${hideSide ? 'justify-between' : 'justify-center'} 
                            hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                            hover:text-mainColor w-full flex items-center 
                            transition-all duration-300 group`}
                     >
                            <div className="flex items-center gap-x-2">
                                   <CategoryIcon isActive={isActiveCategoryIcon || isActiveCategory} />
                                   <span className={`
                                   ${hideSide ? 'block' : 'hidden'}
                                    ${isActiveCategory ? "text-mainColor" : "text-white"}
                                   text-lg font-TextFontRegular transition-all duration-300
                                   group-hover:text-mainColor`}
                                   >
                                          Category Setup
                                   </span>
                            </div>
                            <div className={`${hideSide ? 'block' : 'hidden'}`}>
                                   <IoIosArrowForward className={`${isActiveCategory ? 'text-mainColor rotate-90' : 'text-white rotate-0'} text-xl transition-all duration-300 group-hover:text-mainColor`} />
                            </div>
                     </Link>
                     <Link to="setup_product"
                            onMouseMove={() => setIsActiveProductSetupIcon(true)}
                            onMouseOut={() => setIsActiveProductSetupIcon(false)}
                            onClick={handleClickProductSetup}
                            className={`
                            ${isActiveProductSetup ? 'active' : ''}
                            ${hideSide ? 'justify-between' : 'justify-center'} 
                            hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                            hover:text-mainColor w-full flex items-center 
                            transition-all duration-300 group`}
                     >
                            <div className="flex items-center gap-x-2">
                                   <ProductIcon isActive={isActiveProductSetupIcon || isActiveProductSetup} />
                                   <span className={`
                                   ${hideSide ? 'block' : 'hidden'}
                                    ${isActiveProductSetup ? "text-mainColor" : "text-white"}
                                   text-lg font-TextFontRegular transition-all duration-300
                                   group-hover:text-mainColor`}
                                   >
                                          Product Setup
                                   </span>
                            </div>
                            <div className={`${hideSide ? 'block' : 'hidden'}`}>
                                   <IoIosArrowForward className={`${isActiveProductSetup ? 'text-mainColor rotate-90' : 'text-white rotate-0'} text-xl transition-all duration-300 group-hover:text-mainColor`} />
                            </div>
                     </Link>
                     {/* <div aria-expanded={isOpenProductSetup} className={`${isOpenProductSetup ? "h-auto" : "h-0 overflow-hidden"} w-full transition-all duration-300`}>

                            <ul className={`${isOpenProductSetup ? "mt-0 " : "-mt-20 "} list-disc ml-[15%] transition-all duration-700 flex flex-col gap-y-2`} > */}
                     <div className={`${isOpenProductSetup && hideSide ? "h-24" : "h-0 overflow-hidden"} overflow-hidden flex items-start justify-end  w-full transition-all duration-300`}>
                            {/* <ul className={`${isOpenProductSetup ? "h-full" : "h-0"}  w-full overflow-hidden list-disc bg-black  bg-blacks transition-all duration-700 flex flex-col gap-y-2`} > */}
                            <ul className='list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2'>
                                   <Link to={"setup_product/product"} onClick={handleClickProduct}>
                                          <li
                                                 className={`${isActiveProduct ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                 }>
                                                 Product
                                          </li>
                                   </Link>
                                   <Link to={"setup_product/product/add"} onClick={handleClickAddProduct}>
                                          <li
                                                 className={`${isActiveAddProduct ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}>
                                                 Add Product
                                          </li>
                                   </Link>
                            </ul>

                            {/* </ul> */}
                     </div>
              </div>
       );
};

export default LinksSidebar;


/* const handleClickProductSetup = useCallback(() => {
    setIsActiveHome(false);
    setIsActiveHomeIcon(false);
    setIsActiveAddons(false);
    setIsOpenCategory(false);
    setIsActiveCategory(false);
    setIsActiveCategoryIcon(false);
    setIsOpenProductSetup(true);
    setIsActiveProductSetup(true);
    setIsActiveProductSetupIcon(true);
    setIsActiveProduct(true);
    setIsActiveAddProduct(false);
}, []);

const handleClickProduct = useCallback(() => {
    setIsActiveHome(false);
    setIsActiveHomeIcon(false);
    setIsActiveAddons(false);
    setIsOpenCategory(false);
    setIsActiveCategory(false);
    setIsActiveCategoryIcon(false);
    setIsOpenProductSetup(true);
    setIsActiveProductSetup(true);
    setIsActiveProductSetupIcon(true);
    setIsActiveProduct(true);
    setIsActiveAddProduct(false);
}, []);

const handleClickAddProduct = useCallback(() => {
    setIsActiveHome(false);
    setIsActiveHomeIcon(false);
    setIsActiveAddons(false);
    setIsOpenCategory(false);
    setIsActiveCategory(false);
    setIsActiveCategoryIcon(false);
    setIsOpenProductSetup(true);
    setIsActiveProductSetup(true);
    setIsActiveProductSetupIcon(true);
    setIsActiveProduct(false);
    setIsActiveAddProduct(true);
}, []);

// Monitor route changes and update link states
useEffect(() => {
    const pathSegments = location.pathname.split('/').slice(0, 3).join('/');
    if (pathSegments === "/dashboard") {
        handleClickHome();
    } else if (pathSegments === "/dashboard/addons") {
        handleClickAddons();
    } else if (pathSegments === "/dashboard/category") {
        handleClickCategory();
    } else if (pathSegments === "/dashboard/product") {
        handleClickProductSetup();
        // handleClickProduct(); // Optional, if needed
    } else if (pathSegments === "/dashboard/product/add") {
        handleClickAddProduct();
    }
}, [location, handleClickHome, handleClickAddons, handleClickCategory]);

<div aria-expanded={isOpenProductSetup} className={`${isOpenProductSetup ? "h-auto" : "h-0 overflow-hidden"} bg-black w-full transition-all duration-300`}>
    <ul className={`${isOpenProductSetup ? "mt-0 " : "-mt-20 "} list-disc ml-[15%] transition-all duration-700 flex flex-col gap-y-2`}>
        <li className={`${isActiveProduct ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
            text-xl font-TextFontLight rounded-xl px-4 py-1 hover:bg-white transition-all duration-300 hover:text-mainColor`}>
            <Link to={"product"} onClick={handleClickProduct}>Product</Link>
        </li>
        <li className={`${isActiveAddProduct ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
            text-xl font-TextFontLight rounded-xl px-4 py-1 hover:bg-white transition-all duration-300 hover:text-mainColor`}>
            <Link to={"product/add"} onClick={handleClickAddProduct}>Add Product</Link>
        </li>
    </ul>
</div>
 */