import React, { useEffect, useRef, useState } from 'react'
import { DropDown, DateInput, NumberInput, StaticButton, StaticLoader, SubmitButton, Switch, TextInput, UploadInput } from '../../../../Components/Components';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';
import { useAuth } from '../../../../Context/Auth';
import { MultiSelect } from 'primereact/multiselect';

const AddCouponPage = ({ update, setUpdate }) => {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const { refetch: refetchCoupon, loading: loadingCoupon, data: dataCoupon } = useGet({
                url: `${apiUrl}/admin/coupon`
        });
        const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/admin/coupon/add` });

        const auth = useAuth();

        const [title, setTitle] = useState('');
        const [code, setCode] = useState('');
        const [startDate, setStartDate] = useState('');
        const [expireDate, setExpireDate] = useState('');
        const [minPurchase, setMinPurchase] = useState('');
        const [discountAmount, setDiscountAmount] = useState('');
        const [usageNumber, setUsageNumber] = useState('');
        const [userUsageNumber, setUserUsageNumber] = useState('');

        const [maxDiscountStatus, setMaxDiscountStatus] = useState(0);
        const [maxDiscount, setMaxDiscount] = useState('');

        const [activeCoupon, setActiveCoupon] = useState(0);

        /* Coupon Type */
        const [couponType] = useState([{ name: 'First Order' }, { name: 'Normal' }])
        const [selectedCouponType, setSelectedCouponType] = useState('Select Coupon Type');
        const [couponTypeName, setCouponTypeName] = useState('');
        const [isOpenCouponType, setIsOpenCouponType] = useState(false);
        const dropDownCouponType = useRef();

        /* Coupon Value Type */
        const [valueType] = useState([{ name: 'Percentage' }, { name: 'Value' }])
        const [selectedValueType, setSelectedValueType] = useState('Select Value Type');
        const [valueTypeName, setValueTypeName] = useState('');
        const [isOpenValueType, setIsOpenValueType] = useState(false);
        const dropDownValueType = useRef();

        /* Coupon Product Options */
        const [productOptions] = useState([{ name: 'All' }, { name: 'Selected' }]);
        const [selectedProductOptions, setSelectedProductOptions] = useState('Select Products Options'); // Currently selected state
        const [productOptionsName, setProductOptionsName] = useState(''); // Type name value
        const [isOpenProductOptions, setIsOpenProductOptions] = useState(false); // Dropdown open/close state
        const dropDownProductOptionsRef = useRef(); // Ref for dropdown

        /* Coupon Product */
        const [products, setProducts] = useState([]);
        const [selectedProduct, setSelectedProduct] = useState([]);
        const [stateProduct, setStateProduct] = useState('Select Product')
        const [productId, setProductId] = useState('');
        const [isOpenProduct, setIsOpenProduct] = useState(false);
        const dropDownProductRef = useRef(); // Ref for dropdown

        /* Coupon Usage Type */
        const [usageType] = useState([{ name: 'Fixed' }, { name: 'UnLimited' }])
        const [selectedUsageType, setSelectedUsageType] = useState('Select Usage Type');
        const [usageTypeName, setUsageTypeName] = useState('');
        const [isOpenUsageType, setIsOpenUsageType] = useState(false);
        const dropDownUsageType = useRef();

        /* Coupon User Usage Type*/
        const [userUsageType] = useState([{ name: 'Fixed' }, { name: 'UnLimited' }])
        const [selectedUserUsageType, setSelectedUserUsageType] = useState('Select User Usage Type');
        const [userUsageTypeName, setUserUsageTypeName] = useState('');
        const [isOpenUserUsageType, setIsOpenUserUsageType] = useState(false);
        const dropDownUserUsageType = useRef();


        useEffect(() => {
                refetchCoupon();
        }, [refetchCoupon]);

        useEffect(() => {
                if (dataCoupon) {
                        setProducts(dataCoupon.products);
                }
                console.log('dataCoupon', products)
        }, [dataCoupon]);

        /* Coupon Type */
        const handleOpenCouponType = () => {
                setIsOpenCouponType(!isOpenCouponType)
                setIsOpenValueType(false)
                setIsOpenProductOptions(false)
                setIsOpenProduct(false)
                setIsOpenUsageType(false)
                setIsOpenUserUsageType(false)
        };

        const handleOpenOptionCouponType = () => setIsOpenCouponType(false);

        const handleSelectCouponType = (option) => {
                setCouponTypeName(option.name);
                setSelectedCouponType(option.name);
        };

        /* Coupon Value Type */
        const handleOpenValueType = () => {
                setIsOpenCouponType(false)
                setIsOpenValueType(!isOpenValueType)
                setIsOpenProductOptions(false)
                setIsOpenProduct(false)
                setIsOpenUsageType(false)
                setIsOpenUserUsageType(false)
        };

        const handleOpenOptionValueType = () => setIsOpenValueType(false);

        const handleSelectValueType = (option) => {
                setValueTypeName(option.name);
                setSelectedValueType(option.name);
        };

        /* Coupon Product Options */
        const handleOpenProductOptions = () => {
                setIsOpenCouponType(false)
                setIsOpenValueType(false)
                setIsOpenProductOptions(!isOpenProductOptions)
                setIsOpenProduct(false)
                setIsOpenUsageType(false)
                setIsOpenUserUsageType(false)
        };

        const handleOpenOptionProductOptions = () => setIsOpenProductOptions(false);

        const handleSelectProductOptions = (option) => {
                setProductOptionsName(option.name);
                setSelectedProductOptions(option.name);
        };

        /* Coupon Product */
        const handleOpenProduct = () => {
                setIsOpenCouponType(false)
                setIsOpenValueType(false)
                setIsOpenProductOptions(false)
                setIsOpenProduct(!isOpenProduct)
                setIsOpenUsageType(false)
                setIsOpenUserUsageType(false)
        };

        const handleOpenOptionProduct = () => setIsOpenProduct(false);

        const handleSelectProduct = (option) => {
                setSelectedProduct(option.name);
                setProductId(option.id);
        };

        /* Coupon Usage Type */
        const handleOpenUsageType = () => {
                setIsOpenCouponType(false)
                setIsOpenValueType(false)
                setIsOpenProductOptions(false)
                setIsOpenProduct(false)
                setIsOpenUsageType(!isOpenUsageType)
                setIsOpenUserUsageType(false)
        };

        const handleOpenOptionUsageType = () => setIsOpenUsageType(false);

        const handleSelectUsageType = (option) => {
                setSelectedUsageType(option.name);
                setUsageTypeName(option.name);
        };

        /* Coupon User Usage Type */
        const handleOpenUserUsageType = () => {
                setIsOpenCouponType(false)
                setIsOpenValueType(false)
                setIsOpenProductOptions(false)
                setIsOpenProduct(false)
                setIsOpenUsageType(false)
                setIsOpenUserUsageType(!isOpenUserUsageType)
        };

        const handleOpenOptionUserUsageType = () => setIsOpenUserUsageType(false);

        const handleSelectUserUsageType = (option) => {
                setSelectedUserUsageType(option.name);
                setUserUsageTypeName(option.name);
        };

        /* Coupon Active Min Discount */
        const HandleActiveMinDiscount = () => {
                const currentState = maxDiscountStatus;
                { currentState === 0 ? setMaxDiscountStatus(1) : setMaxDiscountStatus(0) }
        }

        /* Coupon Active Min Discount */
        const HandleActiveCoupon = () => {
                const currentState = activeCoupon;
                { currentState === 0 ? setActiveCoupon(1) : setActiveCoupon(0) }
        }

        useEffect(() => {
                console.log('response', response)
                if (!loadingPost) {
                        setTitle('')
                        setCode('')
                        setStartDate('')
                        setExpireDate('')
                        setCouponTypeName('');
                        setDiscountAmount('')
                        setSelectedProductOptions('Select Products Options')
                        setProducts('')
                        setMinPurchase('')
                        setActiveCoupon(0)
                        setMaxDiscountStatus(0)
                        setMaxDiscount('')
                        setSelectedCouponType('Select Coupon Type')
                        setSelectedUserUsageType('Select User Usage Type');
                        setSelectedUsageType('Select Usage Type');
                        setUsageNumber('')
                        setUserUsageNumber('')
                        setStateProduct('Select Product')
                        setSelectedProduct([]);
                        setValueTypeName('')
                        setSelectedValueType('Select Value Type');
                }
                setUpdate(!update)
        }, [response])


        const handleReset = () => {
                setTitle('')
                setCode('')
                setStartDate('')
                setExpireDate('')
                setCouponTypeName('');
                setDiscountAmount('')
                setSelectedProductOptions('Select Products Options')
                setProducts('')
                setMinPurchase('')
                setActiveCoupon(0)
                setMaxDiscountStatus(0)
                setMaxDiscount('')
                setSelectedCouponType('Select Coupon Type')
                setSelectedUserUsageType('Select User Usage Type');
                setSelectedUsageType('Select Usage Type');
                setUsageNumber('')
                setUserUsageNumber('')
                setStateProduct('Select Product')
                setSelectedProduct([]);
                setValueTypeName('')
                setSelectedValueType('Select Value Type');
        }

        const handleCouponAdd = (e) => {
                e.preventDefault();

                if (!title) {
                        auth.toastError('please Enter Title')
                        return;
                }
                if (!code) {
                        auth.toastError('please Enter Code')
                        return;
                }
                if (!startDate) {
                        auth.toastError('please Enter Start Date')
                        return;
                }
                if (!expireDate) {
                        auth.toastError('please Enter Expire Date')
                        return;
                }
                if (!valueTypeName) {
                        auth.toastError('please Select value Type')
                        return;
                }
                if (!discountAmount) {
                        auth.toastError('please Enter Discount Amount')
                        return;
                }
                if (!productOptionsName) {
                        auth.toastError('please Select Product Option')
                        return;
                }
                if (productOptionsName === "selected" && selectedProduct.length === 0) {
                        auth.toastError('please Select Product')
                        return;
                }
                if (!couponTypeName) {
                        auth.toastError('please Select Coupon Type')
                        return;
                }
                if (!minPurchase) {
                        auth.toastError('please Select Min Purchase')
                        return;
                }

                if (!usageTypeName) {
                        auth.toastError('please Select Usage Type')
                        return;
                }
                if (!userUsageTypeName) {
                        auth.toastError('please Select User Usage Type')
                        return;
                }
                if (usageTypeName === "Fixed" && !usageNumber) {
                        auth.toastError('please Enter Usage Number')
                        return;
                }
                if (userUsageTypeName === "Fixed" && !userUsageNumber) {
                        auth.toastError('please Enter User Usage Number')
                        return;
                }
                if (maxDiscountStatus === 1 && !maxDiscount) {
                        auth.toastError('please Enter Max Discount')
                        return;
                }

                const formData = new FormData();

                formData.append('title', title);
                formData.append('code', code);
                formData.append('start_date', startDate);
                formData.append('expire_date', expireDate);

                if (valueTypeName === "Percentage") {
                        formData.append('discount_type', "percentage");
                }
                else {
                        formData.append('discount_type', "value");
                }

                formData.append('discount', discountAmount);

                if (productOptionsName === "All") {
                        formData.append('product', "all");
                }
                else {
                        formData.append('product', "selected");
                }

                selectedProduct.forEach((product, index) => {
                        formData.append(`products_id[${index}]`, product.id);
                });

                if (couponTypeName === "Normal") {
                        formData.append('type', "normal");
                }
                else {
                        formData.append('type', "first_order");
                }

                formData.append('min_purchase', minPurchase);
                formData.append('status', activeCoupon);

                if (usageTypeName === "Fixed") {
                        formData.append('number_usage_status', "fixed");
                        formData.append('number_usage', usageNumber);
                }
                else {
                        formData.append('number_usage_status', "unlimited");
                }

                if (userUsageTypeName === "Fixed") {
                        formData.append('number_usage_user_status', "fixed");
                        formData.append('number_usage_user', userUsageNumber);
                }
                else {
                        formData.append('number_usage_user_status', "unlimited");
                }

                formData.append('max_discount_status', maxDiscountStatus);
                formData.append('max_discount', maxDiscount);

                for (let pair of formData.entries()) {
                        console.log(pair[0] + ', ' + pair[1]);
                }


                postData(formData, 'Coupon Added Success');

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
                                        <form onSubmit={handleCouponAdd}>
                                                <div className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4 mb-4">
                                                        {/* Coupon Title */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                <span className="text-xl font-TextFontRegular text-thirdColor">Coupon Name:</span>
                                                                <TextInput
                                                                        value={title}
                                                                        onChange={(e) => setTitle(e.target.value)}
                                                                        placeholder="Coupon Name"
                                                                />
                                                        </div>
                                                        {/* Coupon Code */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                <span className="text-xl font-TextFontRegular text-thirdColor">Coupon Code:</span>
                                                                <TextInput
                                                                        value={code}
                                                                        onChange={(e) => setCode(e.target.value)}
                                                                        placeholder="Coupon Code"
                                                                />
                                                        </div>
                                                        {/* Coupon Start Date */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                <span className="text-xl font-TextFontRegular text-thirdColor">Coupon Start Date:</span>
                                                                <DateInput
                                                                        value={startDate}
                                                                        onChange={(e) => setStartDate(e.target.value)}
                                                                        placeholder="Coupon Start Date"
                                                                        maxDate={false}
                                                                />
                                                        </div>
                                                        {/* Coupon Expire Date */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                <span className="text-xl font-TextFontRegular text-thirdColor">Coupon Expire Date:</span>
                                                                <DateInput
                                                                        value={expireDate}
                                                                        onChange={(e) => setExpireDate(e.target.value)}
                                                                        placeholder="Coupon Expire Date"
                                                                        maxDate={false}
                                                                />
                                                        </div>
                                                        {/* Value Types */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                <span className="text-xl font-TextFontRegular text-thirdColor">Select Coupon Value Type:</span>
                                                                <DropDown
                                                                        ref={dropDownValueType}
                                                                        handleOpen={handleOpenValueType}
                                                                        stateoption={selectedValueType}
                                                                        openMenu={isOpenValueType}
                                                                        handleOpenOption={handleOpenOptionValueType}
                                                                        onSelectOption={handleSelectValueType}
                                                                        options={valueType}
                                                                        border={false}
                                                                />
                                                        </div>
                                                        {/* Coupon Discount Amount */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                <span className="text-xl font-TextFontRegular text-thirdColor">Coupon Discount Amount:</span>
                                                                <NumberInput
                                                                        value={discountAmount}
                                                                        onChange={(e) => setDiscountAmount(e.target.value)}
                                                                        placeholder="Coupon Discount Amount"
                                                                        maxDate={false}
                                                                />
                                                        </div>
                                                        {/* Product Options */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                <span className="text-xl font-TextFontRegular text-thirdColor">Select Product Options:</span>
                                                                <DropDown
                                                                        ref={dropDownProductOptionsRef}
                                                                        handleOpen={handleOpenProductOptions}
                                                                        stateoption={selectedProductOptions}
                                                                        openMenu={isOpenProductOptions}
                                                                        handleOpenOption={handleOpenOptionProductOptions}
                                                                        onSelectOption={handleSelectProductOptions}
                                                                        options={productOptions}
                                                                        border={false}
                                                                />
                                                        </div>
                                                        {/* Products */}
                                                        {
                                                                productOptionsName === "Selected" && (
                                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                                <span className="text-xl font-TextFontRegular text-thirdColor">Select Product:</span>
                                                                                <MultiSelect
                                                                                        value={selectedProduct}
                                                                                        onChange={(e) => setSelectedProduct(e.value)}
                                                                                        options={products}
                                                                                        optionLabel="name"
                                                                                        display="chip"
                                                                                        placeholder={stateProduct}
                                                                                        maxSelectedLabels={3}
                                                                                        className="w-full md:w-20rem text-mainColor p-1"
                                                                                        filter
                                                                                />
                                                                        </div>
                                                                )
                                                        }
                                                        {/* Discount Types */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                <span className="text-xl font-TextFontRegular text-thirdColor">Select Coupon Type:</span>
                                                                <DropDown
                                                                        ref={dropDownCouponType}
                                                                        handleOpen={handleOpenCouponType}
                                                                        stateoption={selectedCouponType}
                                                                        openMenu={isOpenCouponType}
                                                                        handleOpenOption={handleOpenOptionCouponType}
                                                                        onSelectOption={handleSelectCouponType}
                                                                        options={couponType}
                                                                        border={false}
                                                                />
                                                        </div>
                                                        {/* Coupon Min Purchase */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                <span className="text-xl font-TextFontRegular text-thirdColor">Coupon Min Purchase:</span>
                                                                <NumberInput
                                                                        value={minPurchase}
                                                                        onChange={(e) => setMinPurchase(e.target.value)}
                                                                        placeholder="Coupon Min Purchase"
                                                                        maxDate={false}
                                                                />
                                                        </div>
                                                        {/* Coupon Usage Type */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                <span className="text-xl font-TextFontRegular text-thirdColor">Select Usage Type:</span>
                                                                <DropDown
                                                                        ref={dropDownUsageType}
                                                                        handleOpen={handleOpenUsageType}
                                                                        stateoption={selectedUsageType}
                                                                        openMenu={isOpenUsageType}
                                                                        handleOpenOption={handleOpenOptionUsageType}
                                                                        onSelectOption={handleSelectUsageType}
                                                                        options={usageType}
                                                                        border={false}
                                                                />
                                                        </div>
                                                        {/* Coupon Usage Number */}
                                                        {
                                                                usageTypeName === "Fixed" && (
                                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                                <span className="text-xl font-TextFontRegular text-thirdColor">Coupon Usage Number:</span>
                                                                                <NumberInput
                                                                                        value={usageNumber}
                                                                                        onChange={(e) => setUsageNumber(e.target.value)}
                                                                                        placeholder="Coupon Usage Number"
                                                                                        maxDate={false}
                                                                                />
                                                                        </div>
                                                                )
                                                        }

                                                        {/* Coupon User Usage Type */}
                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                <span className="text-xl font-TextFontRegular text-thirdColor">Select User Usage Type:</span>
                                                                <DropDown
                                                                        ref={dropDownUserUsageType}
                                                                        handleOpen={handleOpenUserUsageType}
                                                                        stateoption={selectedUserUsageType}
                                                                        openMenu={isOpenUserUsageType}
                                                                        handleOpenOption={handleOpenOptionUserUsageType}
                                                                        onSelectOption={handleSelectUserUsageType}
                                                                        options={userUsageType}
                                                                        border={false}
                                                                />
                                                        </div>
                                                        {/* Coupon User Usage Number */}
                                                        {
                                                                userUsageTypeName === "Fixed" && (
                                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                                <span className="text-xl font-TextFontRegular text-thirdColor">Coupon User Usage Number:</span>
                                                                                <NumberInput
                                                                                        value={userUsageNumber}
                                                                                        onChange={(e) => setUserUsageNumber(e.target.value)}
                                                                                        placeholder="Coupon User Usage Number"
                                                                                        maxDate={false}
                                                                                />
                                                                        </div>
                                                                )
                                                        }

                                                        {/* Coupon Active Max Discount */}
                                                        <div className="sm:w-full xl:w-[30%] flex items-start justify-start gap-x-1 pt-8">
                                                                <div className='flex items-center justify-start gap-x-3'>
                                                                        <span className="text-xl font-TextFontRegular text-thirdColor">Active Max Discount:</span>
                                                                        <Switch handleClick={HandleActiveMinDiscount} checked={maxDiscountStatus} />
                                                                </div>
                                                        </div>

                                                        {/* Coupon Max Discount */}
                                                        {
                                                                maxDiscountStatus === 1 && (
                                                                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                                <span className="text-xl font-TextFontRegular text-thirdColor">Coupon Max Discount:</span>
                                                                                <NumberInput
                                                                                        value={maxDiscount}
                                                                                        onChange={(e) => setMaxDiscount(e.target.value)}
                                                                                        placeholder="Coupon Max Discount"
                                                                                        maxDate={false}
                                                                                />
                                                                        </div>
                                                                )

                                                        }

                                                        {/* Coupon Active  */}
                                                        <div className="sm:w-full xl:w-[30%] flex items-start justify-start gap-x-1 pt-8">
                                                                <div className='flex items-center justify-start gap-x-3'>
                                                                        <span className="text-xl font-TextFontRegular text-thirdColor">Active Coupon:</span>
                                                                        <Switch handleClick={HandleActiveCoupon} checked={activeCoupon} />
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
                                                                        handleClick={handleCouponAdd}
                                                                />
                                                        </div>

                                                </div>
                                        </form>
                                </section>
                        )}
                </>
        )
}

export default AddCouponPage;