import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/Auth';
import { IoIosArrowForward } from 'react-icons/io';
import { CategoryIcon, HomeIcon, OrderIcon, ProductIcon } from '../../Assets/Icons/AllIcons';
import { RiVipDiamondLine } from 'react-icons/ri';
import { CiSettings } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { FiUsers } from "react-icons/fi";
import { MdOutlineDeliveryDining, MdDiscount, MdOutlinePayments, MdOutlineSettingsInputComposite } from 'react-icons/md';
import { PiFlagBanner } from 'react-icons/pi';
import { IoLanguage } from 'react-icons/io5';
import { BiSolidDiscount, BiSolidOffer } from 'react-icons/bi';
import { HiReceiptTax } from 'react-icons/hi';
import { TbBorderAll, TbReportSearch } from 'react-icons/tb';
import { BiSolidCoupon } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";

const LinksSidebar = () => {
       const auth = useAuth();
       const navigate = useNavigate();
       const location = useLocation();
       const pathName = location.pathname;
       const hideSide = auth.hideSidebar;

       /* orders length */
       const ordersAllCount = useSelector(state => state.ordersAll.data);
       const ordersPendingCount = useSelector(state => state.ordersPending.data);
       const ordersConfirmedCount = useSelector(state => state.ordersConfirmed.data);
       const ordersProcessingCount = useSelector(state => state.ordersProcessing.data);
       const ordersOutForDeliveryCount = useSelector(state => state.ordersOutForDelivery.data);
       const ordersDeliveredCount = useSelector(state => state.ordersDelivered.data);
       const ordersReturnedCount = useSelector(state => state.ordersReturned.data);
       const ordersFailedCount = useSelector(state => state.ordersFailed.data);
       const ordersCanceledCount = useSelector(state => state.ordersCanceled.data);
       const ordersScheduleCount = useSelector(state => state.ordersSchedule.data);

       const lengths = {
              ordersAll: ordersAllCount.length,
              ordersPending: ordersPendingCount.length,
              ordersConfirmed: ordersConfirmedCount.length,
              ordersProcessing: ordersProcessingCount.length,
              ordersOutForDelivery: ordersOutForDeliveryCount.length,
              ordersDelivered: ordersDeliveredCount.length,
              ordersReturned: ordersReturnedCount.length,
              ordersFailed: ordersFailedCount.length,
              ordersCanceled: ordersCanceledCount.length,
              ordersSchedule: ordersScheduleCount.length,
       }

       // State to hold computed values
       const [permission, setPermission] = useState([]);

       useEffect(() => {
              const computedPermission = auth?.userState?.user_positions?.roles?.map((role) => role.role) || [];

              setPermission(computedPermission);

              // Log the computed values
              console.log('Permission', computedPermission);
       }, [auth?.userState?.user_positions?.roles]);

       /* Home */
       const [isActiveHome, setIsActiveHome] = useState(true);
       const [isActiveHomeIcon, setIsActiveHomeIcon] = useState(true);
       /* Addons */
       const [isActiveAddons, setIsActiveAddons] = useState(false);
       const [isActiveAddonsIcon, setIsActiveAddonsIcon] = useState(false);
       /* Category */
       const [isActiveCategory, setIsActiveCategory] = useState(false);
       const [isActiveCategoryIcon, setIsActiveCategoryIcon] = useState(false);
       /* Banners */
       const [isActiveBanners, setIsActiveBanners] = useState(false);
       const [isActiveBannersIcon, setIsActiveBannersIcon] = useState(false);
       /* Product */
       const [isOpenProductSetup, setIsOpenProductSetup] = useState(false);
       const [isActiveProductSetupIcon, setIsActiveProductSetupIcon] = useState(false);
       const [isActiveProductSetup, setIsActiveProductSetup] = useState(false);
       const [isActiveProduct, setIsActiveProduct] = useState(false);
       const [isActiveAddProduct, setIsActiveAddProduct] = useState(false);

       /* Setting */
       const [isOpenSetting, setIsOpenSetting] = useState(false);
       const [isActiveSettingIcon, setIsActiveSettingIcon] = useState(false);
       const [isActiveSetting, setIsActiveSetting] = useState(false);
       const [isActiveRoles, setIsActiveRoles] = useState(false);
       const [isActivePaymentMethod, setIsActivePaymentMethod] = useState(false);
       const [isActiveCities, setIsActiveCities] = useState(false);
       const [isActiveBranches, setIsActiveBranches] = useState(false);
       const [isActiveZones, setIsActiveZones] = useState(false);

       const [isActiveOrderType, setIsActiveOrderType] = useState(false);
       const [isActiveResturantTime, setIsActiveResturantTime] = useState(false);
       const [isActiveCancelTime, setIsActiveCancelTime] = useState(false);
       const [isActiveDeliveryTime, setIsActiveDeliveryTime] = useState(false);

       const [isActiveAutomaticPayment, setIsActiveAutomaticPayment] = useState(false);
       /* Sound */
       const [isActiveSound, setIsActiveSound] = useState(false);

       /* Taxes */
       const [isOpenTaxes, setIsOpenTaxes] = useState(false);
       const [isActiveTaxesIcon, setIsActiveTaxesIcon] = useState(false);
       const [isActiveTaxes, setIsActiveTaxes] = useState(false);
       const [isActiveTax, setIsActiveTax] = useState(false);
       const [isActiveTaxType, setIsActiveTaxType] = useState(false);

       /* Orders Payment */
       const [isActiveOrdersPayment, setIsActiveOrdersPayment] = useState(false);
       const [isActiveOrdersPaymentIcon, setIsActiveOrdersPaymentIcon] = useState(false);

       /* Delivery Man */
       const [isActiveDeliveryMan, setIsActiveDeliveryMan] = useState(false);
       const [isActiveDeliveryManIcon, setIsActiveDeliveryManIcon] = useState(false);

       /* Customers */
       const [isOpenUsers, setIsOpenUsers] = useState(false);
       const [isActiveUsersIcon, setIsActiveUsersIcon] = useState(false);
       const [isActiveUsers, setIsActiveUsers] = useState(false);
       const [isActiveCustomers, setIsActiveCustomers] = useState(false);
       const [isActiveAdmins, setIsActiveAdmins] = useState(false);

       /* Business Setup */
       const [isActiveBusinessSetup, setIsActiveBusinessSetup] = useState(false);
       const [isActiveBusinessSetupIcon, setIsActiveBusinessSetupIcon] = useState(false);

       /* Deals */
       const [isActiveDeals, setIsActiveDeals] = useState(false);
       const [isActiveDealsIcon, setIsActiveDealsIcon] = useState(false);

       /* Offers */
       const [isActiveOffers, setIsActiveOffers] = useState(false);
       const [isActiveOffersIcon, setIsActiveOffersIcon] = useState(false);

       /* Coupon */
       const [isActiveCoupon, setIsActiveCoupon] = useState(false);
       const [isActiveCouponIcon, setIsActiveCouponIcon] = useState(false);

       /* Languages */
       const [isActiveLanguages, setIsActiveLanguages] = useState(false);
       const [isActiveLanguagesIcon, setIsActiveLanguagesIcon] = useState(false);

       /* Deal Order */
       const [isActiveDealOrderIcon, setIsActiveDealOrderIcon] = useState(false);
       const [isActiveDealOrder, setIsActiveDealOrder] = useState(false);
       /* Buy Offer */
       const [isActiveBuyOfferIcon, setIsActiveBuyOfferIcon] = useState(false);
       const [isActiveBuyOffer, setIsActiveBuyOffer] = useState(false);
       /* Discount */
       const [isActiveDiscount, setIsActiveDiscount] = useState(false);
       const [isActiveDiscountIcon, setIsActiveDiscountIcon] = useState(false);

       /* Order */
       const [isOpenOrders, setIsOpenOrders] = useState(false);
       const [isActiveOrdersIcon, setIsActiveOrdersIcon] = useState(false);
       const [isActiveOrders, setIsActiveOrders] = useState(false);
       const [isActiveOrdersAll, setIsActiveOrdersAll] = useState(false);

       const [isActiveOrdersPending, setIsActiveOrdersPending] = useState(false);
       const [isActiveOrdersConfirmed, setIsActiveOrdersConfirmed] = useState(false);
       const [isActiveOrdersProcessing, setIsActiveOrdersProcessing] = useState(false);
       const [isActiveOrdersOutForDelivery, setIsActiveOrdersOutForDelivery] = useState(false);
       const [isActiveOrdersDelivered, setIsActiveOrdersDelivered] = useState(false);
       const [isActiveOrdersReturned, setIsActiveOrdersReturned] = useState(false);
       const [isActiveOrdersFailed, setIsActiveOrdersFailed] = useState(false);
       const [isActiveOrdersCanceled, setIsActiveOrdersCanceled] = useState(false);
       const [isActiveOrdersSchedule, setIsActiveOrdersSchedule] = useState(false);


       // Handler functions to manage all state
       const handleStateLinks = () => {
              setIsActiveHome(false);
              setIsActiveHomeIcon(false);
              setIsActiveAddons(false);
              setIsActiveCategory(false);
              setIsActiveCategoryIcon(false);
              setIsActiveBanners(false)
              setIsActiveBannersIcon(false)
              setIsOpenProductSetup(false);
              setIsActiveProductSetup(false);
              setIsActiveProductSetupIcon(false);
              setIsActiveProduct(false);
              setIsActiveAddProduct(false);

              setIsOpenTaxes(false)
              setIsActiveTaxesIcon(false)
              setIsActiveTaxes(false)
              setIsActiveTax(false)
              setIsActiveTaxType(false)

              setIsOpenSetting(false);
              setIsActiveSetting(false);
              setIsActiveRoles(false)
              setIsActiveSettingIcon(false);
              setIsActivePaymentMethod(false);
              setIsActiveCities(false)
              setIsActiveBranches(false)
              setIsActiveZones(false)
              setIsActiveOrderType(false)
              setIsActiveResturantTime(false)
              setIsActiveCancelTime(false)
              setIsActiveDeliveryTime(false)
              setIsActiveSound(false)

              setIsActiveOrdersPayment(false)
              setIsActiveOrdersPaymentIcon(false)

              setIsActiveDeliveryMan(false)
              setIsActiveDeliveryManIcon(false)

              setIsActiveOffers(false)
              setIsActiveOffersIcon(false)

              setIsOpenUsers(false)
              setIsActiveUsersIcon(false)
              setIsActiveUsers(false)
              setIsActiveCustomers(false)
              setIsActiveAdmins(false)

              setIsActiveBusinessSetup(false)
              setIsActiveBusinessSetupIcon(false)

              setIsActiveDeals(false)
              setIsActiveDealsIcon(false)

              setIsActiveCoupon(false)
              setIsActiveCouponIcon(false)

              setIsActiveLanguages(false)
              setIsActiveLanguagesIcon(false)

              setIsActiveDealOrderIcon(false)
              setIsActiveDealOrder(false)

              setIsActiveBuyOfferIcon(false)
              setIsActiveBuyOffer(false)

              setIsActiveDiscount(false)
              setIsActiveDiscountIcon(false)

              setIsOpenOrders(false);
              setIsActiveOrders(false);
              setIsActiveOrdersIcon(false);
              setIsActiveOrdersAll(false);

              setIsActiveOrdersPending(false)
              setIsActiveOrdersConfirmed(false)
              setIsActiveOrdersProcessing(false)
              setIsActiveOrdersOutForDelivery(false)
              setIsActiveOrdersDelivered(false)
              setIsActiveOrdersReturned(false)
              setIsActiveOrdersFailed(false)
              setIsActiveOrdersCanceled(false)
              setIsActiveOrdersSchedule(false)

              setIsActiveCoupon(false)
              setIsActiveCouponIcon(false)

              setIsActiveAutomaticPayment(false)

       }


       // Handler functions to manage navigation state
       /* Home */
       const handleClickHome = useCallback(() => {
              handleStateLinks();
              setIsActiveHome(true);
              setIsActiveHomeIcon(true);

       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 2).join('/');
              if (result == "/dashboard") {
                     handleClickHome()
              }
       }, [location])

       /* Addons */
       const handleClickAddons = useCallback(() => {
              handleStateLinks();
              setIsActiveAddons(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard/addons") {
                     handleClickAddons()
              }
       }, [location])

       /* Category */
       const handleClickCategory = useCallback(() => {
              handleStateLinks();
              setIsActiveCategory(true);
              setIsActiveCategoryIcon(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard/category") {
                     handleClickCategory()
              }
       }, [location])

       /* Banners */
       const handleClickBanners = useCallback(() => {
              handleStateLinks();
              setIsActiveBanners(true);
              setIsActiveBannersIcon(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard/banners") {
                     handleClickBanners()
              }
       }, [location])

       /* Product */
       const handleClickProductSetup = useCallback(() => {
              handleStateLinks();
              setIsOpenProductSetup(true);
              setIsActiveProductSetup(true);
              setIsActiveProductSetupIcon(true);
              setIsActiveProduct(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');

              // Only navigate if on `/dashboard/setup_product` but not on paths starting with `/dashboard/setup_product/product`
              if (result === "/dashboard/setup_product" && !pathName.startsWith("/dashboard/setup_product/product")) {
                     handleClickProductSetup();
                     navigate('/dashboard/setup_product/product');
              }

       }, [pathName]);


       const handleClickProduct = useCallback(() => {
              handleStateLinks();
              setIsOpenProductSetup(true);
              setIsActiveProductSetup(true);
              setIsActiveProductSetupIcon(true);
              setIsActiveProduct(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/setup_product/product") {
                     handleClickProduct()
              }
       }, [location])
       const handleClickAddProduct = useCallback(() => {
              handleStateLinks();
              setIsOpenProductSetup(true);
              setIsActiveProductSetup(true);
              setIsActiveProductSetupIcon(true);
              setIsActiveAddProduct(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 5).join('/');
              if (result == "/dashboard/setup_product/product/add") {
                     handleClickAddProduct()
              }
       }, [location])

       /* Setting */
       const handleClickSetting = useCallback(() => {
              handleStateLinks()

              setIsOpenSetting(true);
              setIsActiveSetting(true);
              setIsActiveSettingIcon(true);
              setIsActiveRoles(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');

              // Only navigate if on `/dashboard/setting` but not already on any sub-route
              if (
                     result === "/dashboard/setting" &&
                     !["/dashboard/setting/payment_method",
                            "/dashboard/setting/roles",
                            "/dashboard/setting/cities",
                            "/dashboard/setting/branches",
                            "/dashboard/setting/zones",
                            "/dashboard/setting/order_type",
                            "/dashboard/setting/resturant_time",
                            "/dashboard/setting/cancel_time",
                            "/dashboard/setting/delivery_time",
                            "/dashboard/setting/automatic_payment",
                            "/dashboard/setting/sound"
                     ].some(path => pathName.startsWith(path))
              ) {
                     handleClickSetting();
                     navigate('/dashboard/setting/roles');
              }

       }, [pathName]);

       /* Roles */
       const handleClickRoles = useCallback(() => {
              handleStateLinks()
              setIsOpenSetting(true);
              setIsActiveSetting(true);
              setIsActiveRoles(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/setting/roles") {
                     handleClickRoles()
              }
       }, [location])

       /* Payment Method */
       const handleClickPaymentMethod = useCallback(() => {
              handleStateLinks()

              setIsOpenSetting(true);
              setIsActiveSetting(true);
              setIsActiveSettingIcon(true);
              setIsActivePaymentMethod(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/setting/payment_method") {
                     handleClickPaymentMethod()
              }
       }, [location])

       /* Automatic Payment */
       const handleClickAutomaticPayment = useCallback(() => {
              handleStateLinks()
              setIsOpenSetting(true);
              setIsActiveSetting(true);
              setIsActiveAutomaticPayment(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/setting/automatic_payment") {
                     handleClickAutomaticPayment()
              }
       }, [location])

       /* Cities */
       const handleClickCities = useCallback(() => {
              handleStateLinks()
              setIsOpenSetting(true);
              setIsActiveSetting(true);
              setIsActiveCities(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/setting/cities") {
                     handleClickCities()
              }
       }, [location])
       /* Branches */
       const handleClickBranches = useCallback(() => {
              handleStateLinks()
              setIsOpenSetting(true);
              setIsActiveSetting(true);
              setIsActiveBranches(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/setting/branches") {
                     handleClickBranches()
              }
       }, [location])

       /* Zones */
       const handleClickZones = useCallback(() => {
              handleStateLinks()
              setIsOpenSetting(true);
              setIsActiveSetting(true);
              setIsActiveZones(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/setting/zones") {
                     handleClickZones()
              }
       }, [location])

       /* Order Type */
       const handleClickOrderType = useCallback(() => {
              handleStateLinks()
              setIsOpenSetting(true);
              setIsActiveSetting(true);
              setIsActiveOrderType(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/setting/order_type") {
                     handleClickOrderType()
              }
       }, [location])

       /* Resturant Time */
       const handleClickResturantTime = useCallback(() => {
              handleStateLinks()
              setIsOpenSetting(true);
              setIsActiveSetting(true);
              setIsActiveResturantTime(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/setting/resturant_time") {
                     handleClickResturantTime()
              }
       }, [location])

       /* Cancel Time */
       const handleClickCancelTime = useCallback(() => {
              handleStateLinks()
              setIsOpenSetting(true);
              setIsActiveSetting(true);
              setIsActiveCancelTime(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/setting/cancel_time") {
                     handleClickCancelTime()
              }
       }, [location])
       /* Zones */
       const handleClickDeliveryTime = useCallback(() => {
              handleStateLinks()
              setIsOpenSetting(true);
              setIsActiveSetting(true);
              setIsActiveDeliveryTime(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/setting/delivery_time") {
                     handleClickDeliveryTime()
              }
       }, [location])

       /* Sound */
       const handleClickSound = useCallback(() => {
              handleStateLinks();
              setIsOpenSetting(true);
              setIsActiveSetting(true);
              setIsActiveSound(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/setting/sound") {
                     handleClickSound()
              }
       }, [location])



       /* Orders Payment */
       const handleClickOrdersPayment = useCallback(() => {
              handleStateLinks();
              setIsActiveOrdersPayment(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard/orders_payment") {
                     handleClickOrdersPayment()
              }
       }, [location])

       /* Delivery Man */
       const handleClickDeliveryMan = useCallback(() => {
              handleStateLinks();
              setIsActiveDeliveryMan(true);
              setIsActiveDeliveryManIcon(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard/delivery_man") {
                     handleClickDeliveryMan()
              }
       }, [location])

       /* Orders Payment */
       const handleClickBusinessSetup = useCallback(() => {
              handleStateLinks();
              setIsActiveBusinessSetupIcon(true);
              setIsActiveBusinessSetup(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard/business_setup") {
                     handleClickBusinessSetup()
              }
       }, [location])

       /* Deals */
       const handleClickDeals = useCallback(() => {
              handleStateLinks();
              setIsActiveDeals(true);
              setIsActiveDealsIcon(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard/deals") {
                     handleClickDeals()
              }
       }, [location])

       /* Offers */
       const handleClickOffers = useCallback(() => {
              handleStateLinks();
              setIsActiveOffers(true);
              setIsActiveOffersIcon(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard/offers") {
                     handleClickOffers()
              }
       }, [location])

       /* Coupon */
       const handleClickCoupon = useCallback(() => {
              handleStateLinks();
              setIsActiveCoupon(true);
              setIsActiveCouponIcon(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard/coupon") {
                     handleClickCoupon()
              }
       }, [location])


       /* Taxes */
       const handleClickTaxes = useCallback(() => {
              handleStateLinks()

              setIsOpenTaxes(true);
              setIsActiveTaxes(true);
              setIsActiveTaxesIcon(true);
              setIsActiveTax(true);
       }, []);
       useEffect(() => {
              if (
                     pathName === "/dashboard/taxes" &&
                     !["/dashboard/taxes/all_taxes", "/dashboard/taxes/tax_type"].some(path => pathName.startsWith(path))
              ) {
                     handleClickTaxes();
                     navigate("/dashboard/taxes/all_taxes");
              }
       }, [pathName, handleClickTaxes]);


       const handleClickTax = useCallback(() => {
              handleStateLinks()

              setIsOpenTaxes(true);
              setIsActiveTaxes(true);
              setIsActiveTaxesIcon(true);
              setIsActiveTax(true);
       }, []);

       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/taxes/all_taxes") {
                     handleClickTaxes()
              }
       }, [location])
       const handleClickTaxType = useCallback(() => {
              handleStateLinks()

              setIsOpenTaxes(true);
              setIsActiveTaxes(true);
              setIsActiveTaxesIcon(true);
              setIsActiveTaxType(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/taxes/tax_type") {
                     handleClickTaxType()
              }
       }, [location])


       /* Languages */
       const handleClickLanguages = useCallback(() => {
              handleStateLinks();
              setIsActiveLanguages(true);
              setIsActiveLanguagesIcon(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard/languages") {
                     handleClickLanguages()
              }
       }, [location])

       /* Deal Order */
       const handleClickDealOrder = useCallback(() => {
              handleStateLinks();
              setIsActiveDealOrder(true);
              setIsActiveDealOrderIcon(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard/deal_order") {
                     handleClickDealOrder()
              }
       }, [location])

       /* Buy Offer */
       const handleClickBuyOffer = useCallback(() => {
              handleStateLinks();
              setIsActiveBuyOffer(true);
              setIsActiveBuyOfferIcon(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard/buy_offer") {
                     handleClickBuyOffer()
              }
       }, [location])

       /* Discount */
       const handleClickDiscount = useCallback(() => {
              handleStateLinks();
              setIsActiveDiscount(true);
              setIsActiveDiscountIcon(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 3).join('/');
              if (result == "/dashboard/Discount") {
                     handleClickDiscount()
              }
       }, [location])


       /* Order */
       const handleClickOrders = useCallback(() => {
              handleStateLinks()

              setIsOpenOrders(true);
              setIsActiveOrders(true);
              setIsActiveOrdersIcon(true);
              setIsActiveOrdersAll(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');

              // Only navigate if on `/dashboard/setup_product` but not on paths starting with `/dashboard/setup_product/product`
              if (result === "/dashboard/orders" || result === "/dashboard/orders/") {
                     handleClickOrders();
                     navigate('/dashboard/orders/all');
              }
       }, [pathName]);


       const handleClickOrdersAll = useCallback(() => {
              handleStateLinks()

              setIsOpenOrders(true);
              setIsActiveOrders(true);
              setIsActiveOrdersIcon(true);
              setIsActiveOrdersAll(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/orders/all") {
                     handleClickOrdersAll()
              }
       }, [location])

       const handleClickOrdersPending = useCallback(() => {
              handleStateLinks()

              setIsOpenOrders(true);
              setIsActiveOrders(true);
              setIsActiveOrdersIcon(true);
              setIsActiveOrdersPending(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/orders/pending") {
                     handleClickOrdersPending()
              }
       }, [location])

       const handleClickOrdersConfirmed = useCallback(() => {
              handleStateLinks()

              setIsOpenOrders(true);
              setIsActiveOrders(true);
              setIsActiveOrdersIcon(true);
              setIsActiveOrdersConfirmed(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/orders/confirmed") {
                     handleClickOrdersConfirmed()
              }
       }, [location])

       const handleClickOrdersProcessing = useCallback(() => {
              handleStateLinks()

              setIsOpenOrders(true);
              setIsActiveOrders(true);
              setIsActiveOrdersIcon(true);
              setIsActiveOrdersProcessing(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/orders/processing") {
                     handleClickOrdersProcessing()
              }
       }, [location])

       const handleClickOrdersOutForDelivery = useCallback(() => {
              handleStateLinks()

              setIsOpenOrders(true);
              setIsActiveOrders(true);
              setIsActiveOrdersIcon(true);
              setIsActiveOrdersOutForDelivery(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/orders/out_for_delivery") {
                     handleClickOrdersOutForDelivery()
              }
       }, [location])

       const handleClickOrdersDelivered = useCallback(() => {
              handleStateLinks()

              setIsOpenOrders(true);
              setIsActiveOrders(true);
              setIsActiveOrdersIcon(true);
              setIsActiveOrdersDelivered(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/orders/delivered") {
                     handleClickOrdersDelivered()
              }
       }, [location])

       const handleClickOrdersReturned = useCallback(() => {
              handleStateLinks()

              setIsOpenOrders(true);
              setIsActiveOrders(true);
              setIsActiveOrdersIcon(true);
              setIsActiveOrdersReturned(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/orders/returned") {
                     handleClickOrdersReturned()
              }
       }, [location])

       const handleClickOrdersFailed = useCallback(() => {
              handleStateLinks()

              setIsOpenOrders(true);
              setIsActiveOrders(true);
              setIsActiveOrdersIcon(true);
              setIsActiveOrdersFailed(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/orders/failed") {
                     handleClickOrdersFailed()
              }
       }, [location])

       const handleClickOrdersCanceled = useCallback(() => {
              handleStateLinks()

              setIsOpenOrders(true);
              setIsActiveOrders(true);
              setIsActiveOrdersIcon(true);
              setIsActiveOrdersCanceled(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/orders/canceled") {
                     handleClickOrdersCanceled()
              }
       }, [location])

       const handleClickOrdersSchedule = useCallback(() => {
              handleStateLinks()

              setIsOpenOrders(true);
              setIsActiveOrders(true);
              setIsActiveOrdersIcon(true);
              setIsActiveOrdersSchedule(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/orders/schedule") {
                     handleClickOrdersSchedule()
              }
       }, [location])


       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 5).join('/');
              if (result.startsWith("/dashboard/orders/details/") || result.startsWith("/dashboard/orders/invoice/")) {
                     handleStateLinks();

                     setIsOpenOrders(true);
                     setIsActiveOrders(true);
                     setIsActiveOrdersIcon(true);
              }

       }, [location])

       /* Users */
       const handleClickUsers = useCallback(() => {
              handleStateLinks()

              setIsOpenUsers(true);
              setIsActiveUsers(true);
              setIsActiveUsersIcon(true);
              setIsActiveCustomers(true);
       }, []);
       useEffect(() => {
              if (
                     pathName === "/dashboard/users" &&
                     !["/dashboard/users/customers", "/dashboard/users/admins"].some(path => pathName.startsWith(path))
              ) {
                     handleClickUsers();
                     navigate("/dashboard/users/admins");
              }
       }, [pathName, handleClickUsers]);


       const handleClickCustomers = useCallback(() => {
              handleStateLinks()

              setIsOpenUsers(true);
              setIsActiveUsers(true);
              setIsActiveUsersIcon(true);
              setIsActiveCustomers(true);
       }, []);

       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/users/customers") {
                     handleClickCustomers()
              }
       }, [location])

       const handleClickAdmins = useCallback(() => {
              handleStateLinks()

              setIsOpenUsers(true);
              setIsActiveUsers(true);
              setIsActiveUsersIcon(true);
              setIsActiveAdmins(true);
       }, []);
       useEffect(() => {
              const part = pathName.split('/');
              const result = part.slice(0, 4).join('/');
              if (result == "/dashboard/users/admins") {
                     handleClickAdmins()
              }
       }, [location])

       return (
              <>
                     {auth?.userState?.user_positions?.name === 'Super Admin' ? (
                            <div className="LinksSidebar w-full flex flex-col items-center justify-start gap-y-3">

                                   {/* Dashboard */}
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
                                             text-base font-[400] transition-all duration-300
                                           group-hover:text-mainColor`}
                                                 >
                                                        Home
                                                 </span>
                                          </div>
                                   </Link>

                                   {/* Order */}
                                   <div className="w-full flex flex-col">    
                                          <Link to="orders"
                                                 onMouseMove={() => setIsActiveOrdersIcon(true)}
                                                 onMouseOut={() => setIsActiveOrdersIcon(false)}
                                                 onClick={handleClickOrders}
                                                 className={`
                                   ${isActiveOrders ? 'active mb-2' : 'mb-0'}
                                   ${hideSide ? 'justify-between' : 'justify-center'} 
                                   hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                   hover:text-mainColor w-full flex items-center 
                                   transition-all duration-300 group`}
                                          >
                                                 <div className="flex items-center gap-x-2">
                                                        <OrderIcon isActive={isActiveOrdersIcon || isActiveOrders} />
                                                        <span className={`
                                          ${hideSide ? 'block' : 'hidden'}
                                           ${isActiveOrders ? "text-mainColor" : "text-white"}
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                        >
                                                               Orders
                                                        </span>
                                                 </div>

                                                 <div className={`${hideSide ? 'block' : 'hidden'}`}>
                                                        <IoIosArrowForward className={`${isActiveOrders ? 'text-mainColor rotate-90' : 'text-white rotate-0'} text-xl transition-all duration-300 group-hover:text-mainColor`} />
                                                 </div>
                                          </Link>
                                          <div className={`${isOpenOrders && hideSide ? "h-[29rem]" : "h-0 "}  overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}>
                                                 <ul className='list-disc w-full pl-2 transition-all duration-700 flex flex-col gap-y-2'>
                                                        <Link to={"orders/all"} onClick={handleClickOrdersAll}>
                                                               <li
                                                                      className={`${isActiveOrdersAll ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                        text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                        hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      <span>All</span>
                                                                      <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersAll || 0}</span>
                                                               </li>
                                                        </Link>
                                                        <Link to={"orders/pending"} onClick={handleClickOrdersPending}>
                                                               <li
                                                                      className={`${isActiveOrdersPending ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                        text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                        hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      <span>Pending</span>
                                                                      <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersPending || 0}</span>
                                                               </li>
                                                        </Link>
                                                        <Link to={"orders/confirmed"} onClick={handleClickOrdersConfirmed}>
                                                               <li
                                                                      className={`${isActiveOrdersConfirmed ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                        text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                        hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      <span>Confirmed</span>
                                                                      <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersConfirmed || 0}</span>
                                                               </li>
                                                        </Link>
                                                        <Link to={"orders/processing"} onClick={handleClickOrdersProcessing}>
                                                               <li
                                                                      className={`${isActiveOrdersProcessing ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                        text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                        hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      <span>Processing</span>
                                                                      <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersProcessing || 0}</span>
                                                               </li>
                                                        </Link>
                                                        <Link to={"orders/out_for_delivery"} onClick={handleClickOrdersOutForDelivery}>
                                                               <li
                                                                      className={`${isActiveOrdersOutForDelivery ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                        text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                        hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      <span>OutForDelivery</span>
                                                                      <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersOutForDelivery || 0}</span>
                                                               </li>
                                                        </Link>
                                                        <Link to={"orders/delivered"} onClick={handleClickOrdersDelivered}>
                                                               <li
                                                                      className={`${isActiveOrdersDelivered ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                        text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                        hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      <span>Delivered</span>
                                                                      <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersDelivered || 0}</span>
                                                               </li>
                                                        </Link>
                                                        <Link to={"orders/returned"} onClick={handleClickOrdersReturned}>
                                                               <li
                                                                      className={`${isActiveOrdersReturned ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                        text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                        hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      <span>Returned</span>
                                                                      <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersReturned || 0}</span>
                                                               </li>
                                                        </Link>
                                                        <Link to={"orders/failed"} onClick={handleClickOrdersFailed}>
                                                               <li
                                                                      className={`${isActiveOrdersFailed ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                        text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                        hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      <span>Failed To Delivered</span>
                                                                      <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersFailed || 0}</span>
                                                               </li>
                                                        </Link>
                                                        <Link to={"orders/canceled"} onClick={handleClickOrdersCanceled}>
                                                               <li
                                                                      className={`${isActiveOrdersCanceled ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                        text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                        hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      <span>Canceled</span>
                                                                      <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersCanceled || 0}</span>
                                                               </li>
                                                        </Link>
                                                        <Link to={"orders/schedule"} onClick={handleClickOrdersSchedule}>
                                                               <li
                                                                      className={`${isActiveOrdersSchedule ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                        text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                        hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      <span>Schedule</span>
                                                                      <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersSchedule || 0}</span>
                                                               </li>
                                                        </Link>
                                                 </ul>

                                          </div>
                                   </div>

                                   {/* Category */}
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
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                 >
                                                        Category Setup
                                                 </span>
                                          </div>
                                   </Link>

                                   {/* Product */}
                                   <div className="w-full flex flex-col">
                                          <Link to="setup_product"
                                                 onMouseMove={() => setIsActiveProductSetupIcon(true)}
                                                 onMouseOut={() => setIsActiveProductSetupIcon(false)}
                                                 onClick={handleClickProductSetup}
                                                 className={`
                                   ${isActiveProductSetup ? 'active mb-2' : 'mb-2'}
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
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                        >
                                                               Product Setup
                                                        </span>
                                                 </div>
                                                 <div className={`${hideSide ? 'block' : 'hidden'}`}>
                                                        <IoIosArrowForward className={`${isActiveProductSetup ? 'text-mainColor rotate-90' : 'text-white rotate-0'} text-xl transition-all duration-300 group-hover:text-mainColor`} />
                                                 </div>
                                          </Link>
                                          <div className={`${isOpenProductSetup && hideSide ? "h-20" : "h-0"} overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}>
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

                                          </div>
                                   </div>

                                   {/* Banners */}
                                   <Link to="banners"
                                          onMouseMove={() => setIsActiveBannersIcon(true)}
                                          onMouseOut={() => setIsActiveBannersIcon(false)}
                                          onClick={handleClickBanners}
                                          className={`
                                          ${isActiveBanners ? 'active' : ''}
                                          ${hideSide ? 'justify-between' : 'justify-center'} 
                                          hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                          hover:text-mainColor w-full flex items-center 
                                          transition-all duration-300 group`}
                                   >
                                          <div className="flex items-center gap-x-2">
                                                 <PiFlagBanner
                                                        className={`${isActiveBannersIcon || isActiveBanners ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`}
                                                 />
                                                 <span
                                                        className={`${hideSide ? 'block' : 'hidden'}
                                                  ${isActiveBanners ? "text-mainColor" : "text-white"}
                                                 text-lg font-[400] transition-all duration-300
                                                 group-hover:text-mainColor`}
                                                 >
                                                        Banners
                                                 </span>
                                          </div>
                                   </Link>

                                   {/* Addons */}
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
                                                 text-lg font-[400] transition-all duration-300
                                                 group-hover:text-mainColor`}
                                                 >
                                                        Addons
                                                 </span>
                                          </div>
                                   </Link>

                                   {/* Taxes */}
                                   <div className="w-full flex flex-col">
                                          <Link to="taxes"
                                                 onMouseMove={() => setIsActiveTaxesIcon(true)}
                                                 onMouseOut={() => setIsActiveTaxesIcon(false)}
                                                 onClick={handleClickTaxes}
                                                 className={`
                                   ${isActiveTaxes ? 'active mb-2' : 'mb-0'}
                                   ${hideSide ? 'justify-between' : 'justify-center'} 
                                   hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                   hover:text-mainColor w-full flex items-center 
                                   transition-all duration-300 group`}
                                          >
                                                 <div className="flex items-center gap-x-2">
                                                        <HiReceiptTax className={`${isActiveTaxesIcon || isActiveTaxes ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`} />
                                                        <span className={`
                                          ${hideSide ? 'block' : 'hidden'}
                                           ${isActiveTaxes ? "text-mainColor" : "text-white"}
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                        >
                                                               Taxes
                                                        </span>
                                                 </div>
                                                 <div className={`${hideSide ? 'block' : 'hidden'}`}>
                                                        <IoIosArrowForward className={`${isActiveTaxes ? 'text-mainColor rotate-90' : 'text-white rotate-0'} text-xl transition-all duration-300 group-hover:text-mainColor`} />
                                                 </div>
                                          </Link>
                                          <div className={`${isOpenTaxes && hideSide ? "h-20" : "h-0 "} overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}>
                                                 <ul className='list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2'>
                                                        <Link to={"taxes/all_taxes"} onClick={handleClickTax}>
                                                               <li
                                                                      className={`${isActiveTax ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      All Taxes
                                                               </li>
                                                        </Link>
                                                        <Link to={"taxes/tax_type"} onClick={handleClickTaxType}>
                                                               <li
                                                                      className={`
                                                        ${isActiveTaxType ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                        text-xl font-TextFontLight rounded-xl px-4 py-1 
                                                        hover:bg-white transition-all duration-300 hover:text-mainColor
                                                    `}>
                                                                      Tax Type
                                                               </li>
                                                        </Link>
                                                 </ul>

                                          </div>
                                   </div>

                                   {/* Orders Payment */}
                                   <Link to="orders_payment"
                                          onMouseMove={() => setIsActiveOrdersPaymentIcon(true)}
                                          onMouseOut={() => setIsActiveOrdersPaymentIcon(false)}
                                          onClick={handleClickOrdersPayment}
                                          className={`
                                          ${isActiveOrdersPayment ? 'active' : ''}
                                          ${hideSide ? 'justify-between' : 'justify-center'} 
                                          hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                          hover:text-mainColor w-full flex items-center 
                                          transition-all duration-300 group`}
                                   >
                                          <div className="flex items-center gap-x-2">
                                                 <MdOutlinePayments
                                                        className={`${isActiveOrdersPaymentIcon || isActiveOrdersPayment ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`}
                                                 />
                                                 <span
                                                        className={`${hideSide ? 'block' : 'hidden'}
                                                  ${isActiveOrdersPayment ? "text-mainColor" : "text-white"}
                                                 text-lg font-[400] transition-all duration-300
                                                 group-hover:text-mainColor`}
                                                 >
                                                        Orders Payment
                                                 </span>
                                          </div>
                                   </Link>

                                   {/* Delivery Man */}
                                   <Link to="delivery_man"
                                          onMouseMove={() => setIsActiveDeliveryManIcon(true)}
                                          onMouseOut={() => setIsActiveDeliveryManIcon(false)}
                                          onClick={handleClickDeliveryMan}
                                          className={`
                                          ${isActiveDeliveryMan ? 'active' : ''}
                                          ${hideSide ? 'justify-between' : 'justify-center'} 
                                          hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                          hover:text-mainColor w-full flex items-center 
                                          transition-all duration-300 group`}
                                   >
                                          <div className="flex items-center gap-x-2">
                                                 <MdOutlineDeliveryDining
                                                        className={`${isActiveDeliveryManIcon || isActiveDeliveryMan ? 'text-[#9E090F]' : 'text-[#fff]'} text-3xl`}
                                                 />
                                                 <span
                                                        className={`${hideSide ? 'block' : 'hidden'}
                                                  ${isActiveDeliveryMan ? "text-mainColor" : "text-white"}
                                                 text-lg font-[400] transition-all duration-300
                                                 group-hover:text-mainColor`}
                                                 >
                                                        Delivery Man
                                                 </span>
                                          </div>
                                   </Link>

                                   {/* Users */}
                                   <div className="w-full flex flex-col">
                                          <Link to="users"
                                                 onMouseMove={() => setIsActiveUsersIcon(true)}
                                                 onMouseOut={() => setIsActiveUsersIcon(false)}
                                                 onClick={handleClickUsers}
                                                 className={`
                                   ${isActiveUsers ? 'active mb-2' : 'mb-0'}
                                   ${hideSide ? 'justify-between' : 'justify-center'} 
                                   hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                   hover:text-mainColor w-full flex items-center 
                                   transition-all duration-300 group`}
                                          >
                                                 <div className="flex items-center gap-x-2">
                                                        <FiUsers className={`${isActiveUsersIcon || isActiveUsers ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`} />
                                                        <span className={`
                                          ${hideSide ? 'block' : 'hidden'}
                                           ${isActiveUsers ? "text-mainColor" : "text-white"}
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                        >
                                                               Users
                                                        </span>
                                                 </div>
                                                 <div className={`${hideSide ? 'block' : 'hidden'}`}>
                                                        <IoIosArrowForward className={`${isActiveUsers ? 'text-mainColor rotate-90' : 'text-white rotate-0'} text-xl transition-all duration-300 group-hover:text-mainColor`} />
                                                 </div>
                                          </Link>
                                          <div className={`${isOpenUsers && hideSide ? "h-20" : "h-0 "} overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}>
                                                 <ul className='list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2'>
                                                        <Link to={"users/admins"} onClick={handleClickAdmins}>
                                                               <li
                                                                      className={`
                                                        ${isActiveAdmins ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                        text-xl font-TextFontLight rounded-xl px-4 py-1 
                                                        hover:bg-white transition-all duration-300 hover:text-mainColor
                                                    `}>
                                                                      Admins
                                                               </li>
                                                        </Link>
                                                        <Link to={"users/customers"} onClick={handleClickCustomers}>
                                                               <li
                                                                      className={`${isActiveCustomers ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      Customers
                                                               </li>
                                                        </Link>
                                                 </ul>

                                          </div>
                                   </div>

                                   {/* Setting */}
                                   <div className="w-full flex flex-col">
                                          <Link to="setting"
                                                 onMouseMove={() => setIsActiveSettingIcon(true)}
                                                 onMouseOut={() => setIsActiveSettingIcon(false)}
                                                 onClick={handleClickSetting}
                                                 className={`
                                   ${isActiveSetting ? 'active mb-2' : 'mb-0'}
                                   ${hideSide ? 'justify-between' : 'justify-center'} 
                                   hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                   hover:text-mainColor w-full flex items-center 
                                   transition-all duration-300 group`}
                                          >
                                                 <div className="flex items-center gap-x-2">
                                                        <CiSettings
                                                               className={`${isActiveSettingIcon || isActiveSetting ? 'text-[#9E090F]' : 'text-[#fff]'} text-3xl`}
                                                        />
                                                        <span className={`
                                          ${hideSide ? 'block' : 'hidden'}
                                           ${isActiveSetting ? "text-mainColor" : "text-white"}
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                        >
                                                               Setting
                                                        </span>
                                                 </div>
                                                 <div className={`${hideSide ? 'block' : 'hidden'}`}>
                                                        <IoIosArrowForward className={`${isActiveSetting ? 'text-mainColor rotate-90' : 'text-white rotate-0'} text-xl transition-all duration-300 group-hover:text-mainColor`} />
                                                 </div>
                                          </Link>
                                          <div className={`${isOpenSetting && hideSide ? "h-17" : "h-0 "} overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}>
                                                 <ul className='list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2'>
                                                        <Link to={"setting/roles"} onClick={handleClickRoles}>
                                                               <li
                                                                      className={`${isActiveRoles ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      Admin Roles
                                                               </li>
                                                        </Link>
                                                        <Link to={"setting/payment_method"} onClick={handleClickPaymentMethod}>
                                                               <li
                                                                      className={`${isActivePaymentMethod ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      Payment Method
                                                               </li>
                                                        </Link>
                                                        <Link to={"setting/automatic_payment"} onClick={handleClickAutomaticPayment}>
                                                               <li
                                                                      className={`${isActiveAutomaticPayment ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      Automatic Payment
                                                               </li>
                                                        </Link>
                                                        <Link to={"setting/cities"} onClick={handleClickCities}>
                                                               <li
                                                                      className={`${isActiveCities ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      Cities
                                                               </li>
                                                        </Link>
                                                        <Link to={"setting/branches"} onClick={handleClickBranches}>
                                                               <li
                                                                      className={`${isActiveBranches ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      Branches
                                                               </li>
                                                        </Link>
                                                        <Link to={"setting/zones"} onClick={handleClickZones}>
                                                               <li
                                                                      className={`${isActiveZones ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      Zones
                                                               </li>
                                                        </Link>
                                                        <Link to={"setting/order_type"} onClick={handleClickOrderType}>
                                                               <li
                                                                      className={`${isActiveOrderType ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      Order Type
                                                               </li>
                                                        </Link>
                                                        <Link to={"setting/resturant_time"} onClick={handleClickResturantTime}>
                                                               <li
                                                                      className={`${isActiveResturantTime ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      Resturant Time
                                                               </li>
                                                        </Link>
                                                        <Link to={"setting/cancel_time"} onClick={handleClickCancelTime}>
                                                               <li
                                                                      className={`${isActiveCancelTime ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      Cancel Time
                                                               </li>
                                                        </Link>
                                                        <Link to={"setting/delivery_time"} onClick={handleClickDeliveryTime}>
                                                               <li
                                                                      className={`${isActiveDeliveryTime ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      Delivery Time
                                                               </li>
                                                        </Link>
                                                        <Link to={"setting/sound"} onClick={handleClickDeliveryTime}>
                                                               <li
                                                                      className={`${isActiveSound ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                      }>
                                                                      Sound
                                                               </li>
                                                        </Link>
                                                 </ul>

                                          </div>
                                   </div>

                                   {/* Business Setup */}
                                   <Link to="business_setup"
                                          onMouseMove={() => setIsActiveBusinessSetupIcon(true)}
                                          onMouseOut={() => setIsActiveBusinessSetupIcon(false)}
                                          onClick={handleClickBusinessSetup}
                                          className={`
                                          ${isActiveBusinessSetup ? 'active' : ''}
                                          ${hideSide ? 'justify-between' : 'justify-center'} 
                                          hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                          hover:text-mainColor w-full flex items-center 
                                          transition-all duration-300 group`}
                                   >
                                          <div className="flex items-center gap-x-2">
                                                 <MdOutlineSettingsInputComposite
                                                        className={`${isActiveBusinessSetupIcon || isActiveBusinessSetup ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`}
                                                 />
                                                 <span
                                                        className={`${hideSide ? 'block' : 'hidden'}
                                                  ${isActiveBusinessSetup ? "text-mainColor" : "text-white"}
                                                 text-lg font-[400] transition-all duration-300
                                                 group-hover:text-mainColor`}
                                                 >
                                                        Business Setup
                                                 </span>
                                          </div>
                                   </Link>

                                   {/* Deals */}
                                   <Link to="deals"
                                          onMouseMove={() => setIsActiveDealsIcon(true)}
                                          onMouseOut={() => setIsActiveDealsIcon(false)}
                                          onClick={handleClickDeals}
                                          className={`
                                          ${isActiveDeals ? 'active' : ''}
                                          ${hideSide ? 'justify-between' : 'justify-center'} 
                                          hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                          hover:text-mainColor w-full flex items-center 
                                          transition-all duration-300 group`}
                                   >
                                          <div className="flex items-center gap-x-2">
                                                 <TbBorderAll
                                                        className={`${isActiveDealsIcon || isActiveDeals ? 'text-[#9E090F]' : 'text-[#fff]'} text-3xl`}
                                                 />
                                                 <span
                                                        className={`${hideSide ? 'block' : 'hidden'}
                                                  ${isActiveDeals ? "text-mainColor" : "text-white"}
                                                 text-lg font-[400] transition-all duration-300
                                                 group-hover:text-mainColor`}
                                                 >
                                                        Deals
                                                 </span>
                                          </div>
                                   </Link>

                                   {/* Offers */}
                                   <Link to="offers"
                                          onMouseMove={() => setIsActiveOffersIcon(true)}
                                          onMouseOut={() => setIsActiveOffersIcon(false)}
                                          onClick={handleClickOffers}
                                          className={`
                                          ${isActiveOffers ? 'active' : ''}
                                          ${hideSide ? 'justify-between' : 'justify-center'} 
                                          hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                          hover:text-mainColor w-full flex items-center 
                                          transition-all duration-300 group`}
                                   >
                                          <div className="flex items-center gap-x-2">
                                                 <MdDiscount
                                                        className={`${isActiveOffersIcon || isActiveOffers ? 'text-[#9E090F]' : 'text-[#fff]'} text-3xl`}
                                                 />
                                                 <span
                                                        className={`${hideSide ? 'block' : 'hidden'}
                                                  ${isActiveOffers ? "text-mainColor" : "text-white"}
                                                 text-lg font-[400] transition-all duration-300
                                                 group-hover:text-mainColor`}
                                                 >
                                                        Offers
                                                 </span>
                                          </div>
                                   </Link>

                                   {/* Coupon */}
                                   <Link to="coupon"
                                          onMouseMove={() => setIsActiveCouponIcon(true)}
                                          onMouseOut={() => setIsActiveCouponIcon(false)}
                                          onClick={handleClickCoupon}
                                          className={`
                                          ${isActiveCoupon ? 'active' : ''}
                                          ${hideSide ? 'justify-between' : 'justify-center'} 
                                          hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                          hover:text-mainColor w-full flex items-center 
                                          transition-all duration-300 group`}
                                   >
                                          <div className="flex items-center gap-x-2">
                                                 <BiSolidCoupon
                                                        className={`${isActiveCouponIcon || isActiveCoupon ? 'text-[#9E090F]' : 'text-[#fff]'} text-3xl`}
                                                 />
                                                 <span
                                                        className={`${hideSide ? 'block' : 'hidden'}
                                                  ${isActiveCoupon ? "text-mainColor" : "text-white"}
                                                 text-lg font-[400] transition-all duration-300
                                                 group-hover:text-mainColor`}
                                                 >
                                                        Coupon
                                                 </span>
                                          </div>
                                   </Link>

                                   {/* Languages */}
                                   <Link to="languages"
                                          onMouseMove={() => setIsActiveLanguagesIcon(true)}
                                          onMouseOut={() => setIsActiveLanguagesIcon(false)}
                                          onClick={handleClickLanguages}
                                          className={`
                                          ${isActiveLanguages ? 'active' : ''}
                                          ${hideSide ? 'justify-between' : 'justify-center'} 
                                          hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                          hover:text-mainColor w-full flex items-center 
                                          transition-all duration-300 group`}
                                   >
                                          <div className="flex items-center gap-x-2">
                                                 <IoLanguage
                                                        className={`${isActiveLanguagesIcon || isActiveLanguages ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`}
                                                 />
                                                 <span
                                                        className={`${hideSide ? 'block' : 'hidden'}
                                                  ${isActiveLanguages ? "text-mainColor" : "text-white"}
                                                 text-lg font-[400] transition-all duration-300
                                                 group-hover:text-mainColor`}
                                                 >
                                                        Languages
                                                 </span>
                                          </div>
                                   </Link>

                                   {/* Deal Order */}
                                   <Link to="deal_order"
                                          onMouseMove={() => setIsActiveDealOrderIcon(true)}
                                          onMouseOut={() => setIsActiveDealOrderIcon(false)}
                                          onClick={handleClickDealOrder}
                                          className={`
                                          ${isActiveDealOrder ? 'active' : ''}
                                          ${hideSide ? 'justify-between' : 'justify-center'} 
                                          hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                          hover:text-mainColor w-full flex items-center 
                                          transition-all duration-300 group`}
                                   >
                                          <div className="flex items-center gap-x-2">
                                                 <TbReportSearch
                                                        className={`${isActiveDealOrderIcon || isActiveDealOrder ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`}
                                                 />
                                                 <span
                                                        className={`${hideSide ? 'block' : 'hidden'}
                                                  ${isActiveDealOrder ? "text-mainColor" : "text-white"}
                                                 text-lg font-[400] transition-all duration-300
                                                 group-hover:text-mainColor`}
                                                 >
                                                        Deal Order
                                                 </span>
                                          </div>
                                   </Link>

                                   {/* Buy Offer */}
                                   <Link to="buy_offer"
                                          onMouseMove={() => setIsActiveBuyOfferIcon(true)}
                                          onMouseOut={() => setIsActiveBuyOfferIcon(false)}
                                          onClick={handleClickBuyOffer}
                                          className={`
                                          ${isActiveBuyOffer ? 'active' : ''}
                                          ${hideSide ? 'justify-between' : 'justify-center'} 
                                          hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                          hover:text-mainColor w-full flex items-center 
                                          transition-all duration-300 group`}
                                   >
                                          <div className="flex items-center gap-x-2">
                                                 <BiSolidOffer
                                                        className={`${isActiveBuyOfferIcon || isActiveBuyOffer ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`}
                                                 />
                                                 <span
                                                        className={`${hideSide ? 'block' : 'hidden'}
                                                  ${isActiveBuyOffer ? "text-mainColor" : "text-white"}
                                                 text-lg font-[400] transition-all duration-300
                                                 group-hover:text-mainColor`}
                                                 >
                                                        Buy Offer
                                                 </span>
                                          </div>
                                   </Link>

                                   {/* Discount */}
                                   <Link to="discount"
                                          onMouseMove={() => setIsActiveDiscountIcon(true)}
                                          onMouseOut={() => setIsActiveDiscountIcon(false)}
                                          onClick={handleClickDiscount}
                                          className={`
                                          ${isActiveDiscount ? 'active' : ''}
                                          ${hideSide ? 'justify-between' : 'justify-center'} 
                                          hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                          hover:text-mainColor w-full flex items-center 
                                          transition-all duration-300 group`}
                                   >
                                          <div className="flex items-center gap-x-2">
                                                 <BiSolidDiscount
                                                        className={`${isActiveDiscountIcon || isActiveDiscount ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`}
                                                 />
                                                 <span
                                                        className={`${hideSide ? 'block' : 'hidden'}
                                                  ${isActiveDiscount ? "text-mainColor" : "text-white"}
                                                 text-lg font-[400] transition-all duration-300
                                                 group-hover:text-mainColor`}
                                                 >
                                                        Discount
                                                 </span>
                                          </div>
                                   </Link>

                            </div>
                     ) : (
                            <div className="LinksSidebar w-full flex flex-col items-center justify-start gap-y-3">
                                   {/* Dashboard */}
                                   {permission.includes("Home") && (
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
                                      text-base font-[400] transition-all duration-300
                                    group-hover:text-mainColor`}
                                                        >
                                                               Home
                                                        </span>
                                                 </div>
                                          </Link>
                                   )}

                                   {/* Order */}
                                   {permission.includes('Order') && (
                                          <>
                                                 <div className="w-full flex flex-col">
                                                        <Link to="orders"
                                                               onMouseMove={() => setIsActiveOrdersIcon(true)}
                                                               onMouseOut={() => setIsActiveOrdersIcon(false)}
                                                               onClick={handleClickOrders}
                                                               className={`
                            ${isActiveOrders ? 'active mb-2' : 'mb-0'}
                            ${hideSide ? 'justify-between' : 'justify-center'} 
                            hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                            hover:text-mainColor w-full flex items-center 
                            transition-all duration-300 group`}
                                                        >
                                                               <div className="flex items-center gap-x-2">
                                                                      <OrderIcon isActive={isActiveOrdersIcon || isActiveOrders} />
                                                                      <span className={`
                                   ${hideSide ? 'block' : 'hidden'}
                                    ${isActiveOrders ? "text-mainColor" : "text-white"}
                                   text-lg font-[400] transition-all duration-300
                                   group-hover:text-mainColor`}
                                                                      >
                                                                             Orders
                                                                      </span>
                                                               </div>

                                                               <div className={`${hideSide ? 'block' : 'hidden'}`}>
                                                                      <IoIosArrowForward className={`${isActiveOrders ? 'text-mainColor rotate-90' : 'text-white rotate-0'} text-xl transition-all duration-300 group-hover:text-mainColor`} />
                                                               </div>
                                                        </Link>
                                                        <div className={`${isOpenOrders && hideSide ? "h-[29rem]" : "h-0 "}  overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}>
                                                               <ul className='list-disc w-full pl-2 transition-all duration-700 flex flex-col gap-y-2'>
                                                                      <Link to={"orders/all"} onClick={handleClickOrdersAll}>
                                                                             <li
                                                                                    className={`${isActiveOrdersAll ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                 hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    <span>All</span>
                                                                                    <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersAll || 0}</span>
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"orders/pending"} onClick={handleClickOrdersPending}>
                                                                             <li
                                                                                    className={`${isActiveOrdersPending ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                 hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    <span>Pending</span>
                                                                                    <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersPending || 0}</span>
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"orders/confirmed"} onClick={handleClickOrdersConfirmed}>
                                                                             <li
                                                                                    className={`${isActiveOrdersConfirmed ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                 hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    <span>Confirmed</span>
                                                                                    <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersConfirmed || 0}</span>
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"orders/processing"} onClick={handleClickOrdersProcessing}>
                                                                             <li
                                                                                    className={`${isActiveOrdersProcessing ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                 hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    <span>Processing</span>
                                                                                    <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersProcessing || 0}</span>
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"orders/out_for_delivery"} onClick={handleClickOrdersOutForDelivery}>
                                                                             <li
                                                                                    className={`${isActiveOrdersOutForDelivery ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                 hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    <span>OutForDelivery</span>
                                                                                    <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersOutForDelivery || 0}</span>
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"orders/delivered"} onClick={handleClickOrdersDelivered}>
                                                                             <li
                                                                                    className={`${isActiveOrdersDelivered ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                 hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    <span>Delivered</span>
                                                                                    <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersDelivered || 0}</span>
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"orders/returned"} onClick={handleClickOrdersReturned}>
                                                                             <li
                                                                                    className={`${isActiveOrdersReturned ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                 hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    <span>Returned</span>
                                                                                    <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersReturned || 0}</span>
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"orders/failed"} onClick={handleClickOrdersFailed}>
                                                                             <li
                                                                                    className={`${isActiveOrdersFailed ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                 hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    <span>Failed To Delivered</span>
                                                                                    <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersFailed || 0}</span>
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"orders/canceled"} onClick={handleClickOrdersCanceled}>
                                                                             <li
                                                                                    className={`${isActiveOrdersCanceled ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                 hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    <span>Canceled</span>
                                                                                    <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersCanceled || 0}</span>
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"orders/schedule"} onClick={handleClickOrdersSchedule}>
                                                                             <li
                                                                                    className={`${isActiveOrdersSchedule ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl  pl-3 pr-2 py-1 flex items-center justify-between
                                                 hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    <span>Schedule</span>
                                                                                    <span className='bg-cyan-300 text-cyan-700 px-1 text-sm font-TextFontMedium rounded-2xl'>{lengths.ordersSchedule || 0}</span>
                                                                             </li>
                                                                      </Link>
                                                               </ul>

                                                        </div>
                                                 </div>
                                          </>
                                   )}

                                   {/* Category */}
                                   {permission.includes("Category") && (
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
                                   text-lg font-[400] transition-all duration-300
                                   group-hover:text-mainColor`}
                                                        >
                                                               Category Setup
                                                        </span>
                                                 </div>
                                                 {/* <div className={`${hideSide ? 'block' : 'hidden'}`}>
                                   <IoIosArrowForward className={`${isActiveCategory ? 'text-mainColor rotate-90' : 'text-white rotate-0'} text-xl transition-all duration-300 group-hover:text-mainColor`} />
                            </div> */}
                                          </Link>
                                   )}
                                   {/* Product */}
                                   {permission.includes("Product") && (
                                          <>
                                                 <div className="w-full flex flex-col">
                                                        <Link to="setup_product"
                                                               onMouseMove={() => setIsActiveProductSetupIcon(true)}
                                                               onMouseOut={() => setIsActiveProductSetupIcon(false)}
                                                               onClick={handleClickProductSetup}
                                                               className={`
                            ${isActiveProductSetup ? 'active mb-2' : 'mb-2'}
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
                                   text-lg font-[400] transition-all duration-300
                                   group-hover:text-mainColor`}
                                                                      >
                                                                             Product Setup
                                                                      </span>
                                                               </div>
                                                               <div className={`${hideSide ? 'block' : 'hidden'}`}>
                                                                      <IoIosArrowForward className={`${isActiveProductSetup ? 'text-mainColor rotate-90' : 'text-white rotate-0'} text-xl transition-all duration-300 group-hover:text-mainColor`} />
                                                               </div>
                                                        </Link>
                                                        <div className={`${isOpenProductSetup && hideSide ? "h-20" : "h-0 "} overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}>
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

                                                        </div>
                                                 </div>
                                          </>
                                   )}

                                   {/* Banners */}
                                   {permission.includes("Banner") && (
                                          <Link to="banners"
                                                 onMouseMove={() => setIsActiveBannersIcon(true)}
                                                 onMouseOut={() => setIsActiveBannersIcon(false)}
                                                 onClick={handleClickBanners}
                                                 className={`
                                   ${isActiveBanners ? 'active' : ''}
                                   ${hideSide ? 'justify-between' : 'justify-center'} 
                                   hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                   hover:text-mainColor w-full flex items-center 
                                   transition-all duration-300 group`}
                                          >
                                                 <div className="flex items-center gap-x-2">
                                                        <PiFlagBanner
                                                               className={`${isActiveBannersIcon || isActiveBanners ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`}
                                                        />
                                                        <span
                                                               className={`${hideSide ? 'block' : 'hidden'}
                                           ${isActiveBanners ? "text-mainColor" : "text-white"}
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                        >
                                                               Banners
                                                        </span>
                                                 </div>
                                          </Link>
                                   )}

                                   {/* Addons */}
                                   {permission.includes("Addons") && (
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
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                        >
                                                               Addons
                                                        </span>
                                                 </div>
                                          </Link>
                                   )}

                                   {/* Taxes */}
                                   {permission.includes("Setting") && (
                                          <>
                                                 {/* Taxes */}
                                                 <div className="w-full flex flex-col">
                                                        <Link to="taxes"
                                                               onMouseMove={() => setIsActiveTaxesIcon(true)}
                                                               onMouseOut={() => setIsActiveTaxesIcon(false)}
                                                               onClick={handleClickTaxes}
                                                               className={`
                            ${isActiveTaxes ? 'active mb-2' : 'mb-0'}
                            ${hideSide ? 'justify-between' : 'justify-center'} 
                            hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                            hover:text-mainColor w-full flex items-center 
                            transition-all duration-300 group`}
                                                        >
                                                               <div className="flex items-center gap-x-2">
                                                                      <HiReceiptTax className={`${isActiveTaxesIcon || isActiveTaxes ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`} />
                                                                      <span className={`
                                   ${hideSide ? 'block' : 'hidden'}
                                    ${isActiveTaxes ? "text-mainColor" : "text-white"}
                                   text-lg font-[400] transition-all duration-300
                                   group-hover:text-mainColor`}
                                                                      >
                                                                             Taxes
                                                                      </span>
                                                               </div>
                                                               <div className={`${hideSide ? 'block' : 'hidden'}`}>
                                                                      <IoIosArrowForward className={`${isActiveTaxes ? 'text-mainColor rotate-90' : 'text-white rotate-0'} text-xl transition-all duration-300 group-hover:text-mainColor`} />
                                                               </div>
                                                        </Link>
                                                        <div className={`${isOpenTaxes && hideSide ? "h-20" : "h-0 "} overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}>
                                                               <ul className='list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2'>
                                                                      <Link to={"taxes/all_taxes"} onClick={handleClickTax}>
                                                                             <li
                                                                                    className={`${isActiveTax ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    All Taxes
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"taxes/tax_type"} onClick={handleClickTaxType}>
                                                                             <li
                                                                                    className={`
                                                 ${isActiveTaxType ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl px-4 py-1 
                                                 hover:bg-white transition-all duration-300 hover:text-mainColor
                                             `}>
                                                                                    Tax Type
                                                                             </li>
                                                                      </Link>
                                                               </ul>

                                                        </div>
                                                 </div>
                                          </>
                                   )}

                                   {/* Orders Payment */}
                                   {permission.includes('Payments') && (
                                          <Link to="orders_payment"
                                                 onMouseMove={() => setIsActiveOrdersPaymentIcon(true)}
                                                 onMouseOut={() => setIsActiveOrdersPaymentIcon(false)}
                                                 onClick={handleClickOrdersPayment}
                                                 className={`
                                   ${isActiveOrdersPayment ? 'active' : ''}
                                   ${hideSide ? 'justify-between' : 'justify-center'} 
                                   hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                   hover:text-mainColor w-full flex items-center 
                                   transition-all duration-300 group`}
                                          >
                                                 <div className="flex items-center gap-x-2">
                                                        <MdOutlinePayments
                                                               className={`${isActiveOrdersPaymentIcon || isActiveOrdersPayment ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`}
                                                        />
                                                        <span
                                                               className={`${hideSide ? 'block' : 'hidden'}
                                           ${isActiveOrdersPayment ? "text-mainColor" : "text-white"}
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                        >
                                                               Orders Payment
                                                        </span>
                                                 </div>
                                          </Link>
                                   )}

                                   {/* Delivery Man */}
                                   {permission.includes('Delivery') && (
                                          <Link to="delivery_man"
                                                 onMouseMove={() => setIsActiveDeliveryManIcon(true)}
                                                 onMouseOut={() => setIsActiveDeliveryManIcon(false)}
                                                 onClick={handleClickDeliveryMan}
                                                 className={`
                                   ${isActiveDeliveryMan ? 'active' : ''}
                                   ${hideSide ? 'justify-between' : 'justify-center'} 
                                   hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                   hover:text-mainColor w-full flex items-center 
                                   transition-all duration-300 group`}
                                          >
                                                 <div className="flex items-center gap-x-2">
                                                        <MdOutlineDeliveryDining
                                                               className={`${isActiveDeliveryManIcon || isActiveDeliveryMan ? 'text-[#9E090F]' : 'text-[#fff]'} text-3xl`}
                                                        />
                                                        <span
                                                               className={`${hideSide ? 'block' : 'hidden'}
                                           ${isActiveDeliveryMan ? "text-mainColor" : "text-white"}
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                        >
                                                               Delivery Man
                                                        </span>
                                                 </div>
                                          </Link>
                                   )}

                                   {/* Users */}
                                   <div className="w-full flex flex-col">
                                          <Link to="users"
                                                 onMouseMove={() => setIsActiveUsersIcon(true)}
                                                 onMouseOut={() => setIsActiveUsersIcon(false)}
                                                 onClick={handleClickUsers}
                                                 className={`
                            ${isActiveUsers ? 'active mb-2' : 'mb-0'}
                            ${hideSide ? 'justify-between' : 'justify-center'} 
                            hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                            hover:text-mainColor w-full flex items-center 
                            transition-all duration-300 group`}
                                          >
                                                 <div className="flex items-center gap-x-2">
                                                        <FiUsers className={`${isActiveUsersIcon || isActiveUsers ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`} />
                                                        <span className={`
                                   ${hideSide ? 'block' : 'hidden'}
                                    ${isActiveUsers ? "text-mainColor" : "text-white"}
                                   text-lg font-[400] transition-all duration-300
                                   group-hover:text-mainColor`}
                                                        >
                                                               Users
                                                        </span>
                                                 </div>
                                                 <div className={`${hideSide ? 'block' : 'hidden'}`}>
                                                        <IoIosArrowForward className={`${isActiveUsers ? 'text-mainColor rotate-90' : 'text-white rotate-0'} text-xl transition-all duration-300 group-hover:text-mainColor`} />
                                                 </div>
                                          </Link>
                                          <div className={`${isOpenUsers && hideSide ? "h-20" : "h-0 "} overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}>
                                                 <ul className='list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2'>
                                                        {/* Admins */}
                                                        {permission.includes('Admin') && (
                                                               <Link to={"users/admins"} onClick={handleClickAdmins}>
                                                                      <li
                                                                             className={`
                                                 ${isActiveAdmins ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                                 text-xl font-TextFontLight rounded-xl px-4 py-1 
                                                 hover:bg-white transition-all duration-300 hover:text-mainColor
                                             `}>
                                                                             Admins
                                                                      </li>
                                                               </Link>
                                                        )}

                                                        {/* Customers */}
                                                        {permission.includes('Customer') && (
                                                               <Link to={"users/customers"} onClick={handleClickCustomers}>
                                                                      <li
                                                                             className={`${isActiveCustomers ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                             }>
                                                                             Customers
                                                                      </li>
                                                               </Link>
                                                        )}
                                                 </ul>

                                          </div>
                                   </div>

                                   {/* Setting */}
                                   {permission.includes("Setting") && (
                                          <>
                                                 <div className="w-full flex flex-col">
                                                        <Link to="setting"
                                                               onMouseMove={() => setIsActiveSettingIcon(true)}
                                                               onMouseOut={() => setIsActiveSettingIcon(false)}
                                                               onClick={handleClickSetting}
                                                               className={`
                            ${isActiveSetting ? 'active mb-2' : 'mb-0'}
                            ${hideSide ? 'justify-between' : 'justify-center'} 
                            hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                            hover:text-mainColor w-full flex items-center 
                            transition-all duration-300 group`}
                                                        >
                                                               <div className="flex items-center gap-x-2">
                                                                      <CiSettings
                                                                             className={`${isActiveSettingIcon || isActiveSetting ? 'text-[#9E090F]' : 'text-[#fff]'} text-3xl`}
                                                                      />
                                                                      <span className={`
                                   ${hideSide ? 'block' : 'hidden'}
                                    ${isActiveSetting ? "text-mainColor" : "text-white"}
                                   text-lg font-[400] transition-all duration-300
                                   group-hover:text-mainColor`}
                                                                      >
                                                                             Setting
                                                                      </span>
                                                               </div>
                                                               <div className={`${hideSide ? 'block' : 'hidden'}`}>
                                                                      <IoIosArrowForward className={`${isActiveSetting ? 'text-mainColor rotate-90' : 'text-white rotate-0'} text-xl transition-all duration-300 group-hover:text-mainColor`} />
                                                               </div>
                                                        </Link>
                                                        <div className={`${isOpenSetting && hideSide ? "h-17" : "h-0 "} overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}>
                                                               <ul className='list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2'>
                                                                      <Link to={"setting/roles"} onClick={handleClickRoles}>
                                                                             <li
                                                                                    className={`${isActiveRoles ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    Admin Roles
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"setting/payment_method"} onClick={handleClickPaymentMethod}>
                                                                             <li
                                                                                    className={`${isActivePaymentMethod ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    Payment Method
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"setting/automatic_payment"} onClick={handleClickAutomaticPayment}>
                                                                             <li
                                                                                    className={`${isActiveAutomaticPayment ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    Automatic Payment
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"setting/cities"} onClick={handleClickCities}>
                                                                             <li
                                                                                    className={`${isActiveCities ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    Cities
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"setting/branches"} onClick={handleClickBranches}>
                                                                             <li
                                                                                    className={`${isActiveBranches ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    Branches
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"setting/zones"} onClick={handleClickZones}>
                                                                             <li
                                                                                    className={`${isActiveZones ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    Zones
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"setting/order_type"} onClick={handleClickOrderType}>
                                                                             <li
                                                                                    className={`${isActiveOrderType ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    Order Type
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"setting/resturant_time"} onClick={handleClickResturantTime}>
                                                                             <li
                                                                                    className={`${isActiveResturantTime ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    Resturant Time
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"setting/cancel_time"} onClick={handleClickCancelTime}>
                                                                             <li
                                                                                    className={`${isActiveCancelTime ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    Cancel Time
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"setting/delivery_time"} onClick={handleClickDeliveryTime}>
                                                                             <li
                                                                                    className={`${isActiveDeliveryTime ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    Delivery Time
                                                                             </li>
                                                                      </Link>
                                                                      <Link to={"setting/sound"} onClick={handleClickDeliveryTime}>
                                                                             <li
                                                                                    className={`${isActiveSound ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                                                                    }>
                                                                                    Sound
                                                                             </li>
                                                                      </Link>
                                                               </ul>

                                                        </div>
                                                 </div>
                                          </>
                                   )}

                                   {/* Business Setup */}
                                   {permission.includes('Settings') && (
                                          <Link to="business_setup"
                                                 onMouseMove={() => setIsActiveBusinessSetupIcon(true)}
                                                 onMouseOut={() => setIsActiveBusinessSetupIcon(false)}
                                                 onClick={handleClickBusinessSetup}
                                                 className={`
                                   ${isActiveBusinessSetup ? 'active' : ''}
                                   ${hideSide ? 'justify-between' : 'justify-center'} 
                                   hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                   hover:text-mainColor w-full flex items-center 
                                   transition-all duration-300 group`}
                                          >
                                                 <div className="flex items-center gap-x-2">
                                                        <MdOutlineSettingsInputComposite
                                                               className={`${isActiveBusinessSetupIcon || isActiveBusinessSetup ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`}
                                                        />
                                                        <span
                                                               className={`${hideSide ? 'block' : 'hidden'}
                                           ${isActiveBusinessSetup ? "text-mainColor" : "text-white"}
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                        >
                                                               Business Setup
                                                        </span>
                                                 </div>
                                          </Link>
                                   )}

                                   {/* Deals */}
                                   {permission.includes('Deal') && (
                                          <Link to="deals"
                                                 onMouseMove={() => setIsActiveDealsIcon(true)}
                                                 onMouseOut={() => setIsActiveDealsIcon(false)}
                                                 onClick={handleClickDeals}
                                                 className={`
                                   ${isActiveDeals ? 'active' : ''}
                                   ${hideSide ? 'justify-between' : 'justify-center'} 
                                   hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                   hover:text-mainColor w-full flex items-center 
                                   transition-all duration-300 group`}
                                          >
                                                 <div className="flex items-center gap-x-2">
                                                        <TbBorderAll
                                                               className={`${isActiveDealsIcon || isActiveDeals ? 'text-[#9E090F]' : 'text-[#fff]'} text-3xl`}
                                                        />
                                                        <span
                                                               className={`${hideSide ? 'block' : 'hidden'}
                                           ${isActiveDeals ? "text-mainColor" : "text-white"}
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                        >
                                                               Deals
                                                        </span>
                                                 </div>
                                          </Link>
                                   )}

                                   {/* Offers */}
                                   {permission.includes('PointOffers') && (
                                          <Link to="offers"
                                                 onMouseMove={() => setIsActiveOffersIcon(true)}
                                                 onMouseOut={() => setIsActiveOffersIcon(false)}
                                                 onClick={handleClickOffers}
                                                 className={`
                                   ${isActiveOffers ? 'active' : ''}
                                   ${hideSide ? 'justify-between' : 'justify-center'} 
                                   hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                   hover:text-mainColor w-full flex items-center 
                                   transition-all duration-300 group`}
                                          >
                                                 <div className="flex items-center gap-x-2">
                                                        <MdDiscount
                                                               className={`${isActiveOffersIcon || isActiveOffers ? 'text-[#9E090F]' : 'text-[#fff]'} text-3xl`}
                                                        />
                                                        <span
                                                               className={`${hideSide ? 'block' : 'hidden'}
                                           ${isActiveOffers ? "text-mainColor" : "text-white"}
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                        >
                                                               Offers
                                                        </span>
                                                 </div>
                                          </Link>
                                   )}

                                   {/* Coupon */}
                                   {permission.includes('Coupon') && (
                                          <Link to="coupon"
                                                 onMouseMove={() => setIsActiveCouponIcon(true)}
                                                 onMouseOut={() => setIsActiveCouponIcon(false)}
                                                 onClick={handleClickCoupon}
                                                 className={`
                                   ${isActiveCoupon ? 'active' : ''}
                                   ${hideSide ? 'justify-between' : 'justify-center'} 
                                   hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                   hover:text-mainColor w-full flex items-center 
                                   transition-all duration-300 group`}
                                          >
                                                 <div className="flex items-center gap-x-2">
                                                        <BiSolidCoupon
                                                               className={`${isActiveCouponIcon || isActiveCoupon ? 'text-[#9E090F]' : 'text-[#fff]'} text-3xl`}
                                                        />
                                                        <span
                                                               className={`${hideSide ? 'block' : 'hidden'}
                                           ${isActiveCoupon ? "text-mainColor" : "text-white"}
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                        >
                                                               Coupon
                                                        </span>
                                                 </div>
                                          </Link>
                                   )}

                                   {/* Languages */}
                                   {permission.includes('Settings') && (
                                          <Link to="languages"
                                                 onMouseMove={() => setIsActiveLanguagesIcon(true)}
                                                 onMouseOut={() => setIsActiveLanguagesIcon(false)}
                                                 onClick={handleClickLanguages}
                                                 className={`
                                   ${isActiveLanguages ? 'active' : ''}
                                   ${hideSide ? 'justify-between' : 'justify-center'} 
                                   hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                   hover:text-mainColor w-full flex items-center 
                                   transition-all duration-300 group`}
                                          >
                                                 <div className="flex items-center gap-x-2">
                                                        <IoLanguage
                                                               className={`${isActiveLanguagesIcon || isActiveLanguages ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`}
                                                        />
                                                        <span
                                                               className={`${hideSide ? 'block' : 'hidden'}
                                           ${isActiveLanguages ? "text-mainColor" : "text-white"}
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                        >
                                                               Languages
                                                        </span>
                                                 </div>
                                          </Link>
                                   )}

                                   {/* Deal Order */}
                                   {permission.includes('DealOrder') && (
                                          <Link to="deal_order"
                                                 onMouseMove={() => setIsActiveDealOrderIcon(true)}
                                                 onMouseOut={() => setIsActiveDealOrderIcon(false)}
                                                 onClick={handleClickDealOrder}
                                                 className={`
                                   ${isActiveDealOrder ? 'active' : ''}
                                   ${hideSide ? 'justify-between' : 'justify-center'} 
                                   hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                   hover:text-mainColor w-full flex items-center 
                                   transition-all duration-300 group`}
                                          >
                                                 <div className="flex items-center gap-x-2">
                                                        <TbReportSearch
                                                               className={`${isActiveDealOrderIcon || isActiveDealOrder ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`}
                                                        />
                                                        <span
                                                               className={`${hideSide ? 'block' : 'hidden'}
                                           ${isActiveDealOrder ? "text-mainColor" : "text-white"}
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                        >
                                                               Deal Order
                                                        </span>
                                                 </div>
                                          </Link>
                                   )}

                                   {/* Buy Offer */}
                                   {permission.includes('OfferOrder') && (
                                          <Link to="buy_offer"
                                                 onMouseMove={() => setIsActiveBuyOfferIcon(true)}
                                                 onMouseOut={() => setIsActiveBuyOfferIcon(false)}
                                                 onClick={handleClickBuyOffer}
                                                 className={`
                                   ${isActiveBuyOffer ? 'active' : ''}
                                   ${hideSide ? 'justify-between' : 'justify-center'} 
                                   hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                   hover:text-mainColor w-full flex items-center 
                                   transition-all duration-300 group`}
                                          >
                                                 <div className="flex items-center gap-x-2">
                                                        <BiSolidOffer
                                                               className={`${isActiveBuyOfferIcon || isActiveBuyOffer ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`}
                                                        />
                                                        <span
                                                               className={`${hideSide ? 'block' : 'hidden'}
                                           ${isActiveBuyOffer ? "text-mainColor" : "text-white"}
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                        >
                                                               Buy Offer
                                                        </span>
                                                 </div>
                                          </Link>
                                   )}

                                   {/* Discount */}
                                   {permission.includes('Settings') && (
                                          <Link to="discount"
                                                 onMouseMove={() => setIsActiveDiscountIcon(true)}
                                                 onMouseOut={() => setIsActiveDiscountIcon(false)}
                                                 onClick={handleClickDiscount}
                                                 className={`
                                   ${isActiveDiscount ? 'active' : ''}
                                   ${hideSide ? 'justify-between' : 'justify-center'} 
                                   hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white 
                                   hover:text-mainColor w-full flex items-center 
                                   transition-all duration-300 group`}
                                          >
                                                 <div className="flex items-center gap-x-2">
                                                        <BiSolidDiscount
                                                               className={`${isActiveDiscountIcon || isActiveDiscount ? 'text-[#9E090F]' : 'text-[#fff]'} text-2xl`}
                                                        />
                                                        <span
                                                               className={`${hideSide ? 'block' : 'hidden'}
                                           ${isActiveDiscount ? "text-mainColor" : "text-white"}
                                          text-lg font-[400] transition-all duration-300
                                          group-hover:text-mainColor`}
                                                        >
                                                               Discount
                                                        </span>
                                                 </div>
                                          </Link>
                                   )}

                            </div>
                     )}
              </>

       );
};

export default LinksSidebar;