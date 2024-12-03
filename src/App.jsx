import './index.css';
import { Outlet } from 'react-router-dom';
import { useAuth } from './Context/Auth';
import { Navbar, NewOrdersComponent, Sidebar } from './Components/Components';
import { PrimeReactProvider } from 'primereact/api';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import { setNewOrders } from './Store/CreateSlices';
import { usePost } from './Hooks/usePostJson';

const App = () => {
  const auth = useAuth();
  const hideSide = auth.hideSidebar;

  const { postData, loadingPost, response } = usePost({ url: 'https://Bcknd.food2go.online/admin/order/notification' });
  const ordersAll = useSelector((state) => state.ordersAll.data);
  const newOrders = useSelector((state) => state.newOrders);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [orderCounts, setOrderCounts] = useState(0);

  const handleClose = () => setIsOpen(false);

  // Send a notification request every 8 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("Sending request to notification endpoint...");
      const formData = new FormData();
      formData.append('orders', ordersAll?.length || 0);
      postData(formData);
    }, 8000); // 8 seconds delay

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [ordersAll, postData]);

  // Update `orderCounts` when a response is received
  useEffect(() => {
    if (response?.data) {
      console.log('Response received:', response);
      setOrderCounts(response.data.new_orders || 0);
    }
  }, [response]);

  // Update `newOrders` in Redux store
  useEffect(() => {
    if (orderCounts > 0) {
      dispatch(setNewOrders({ count: orderCounts }));
    }
  }, [orderCounts, dispatch]);

  // Handle modal open/close logic
  useEffect(() => {
    console.log('New orders state:', newOrders);
    console.log('Modal state:', isOpen);

    if (newOrders?.count > 0 && !isOpen) {
      setIsOpen(true);
    } else if (newOrders?.count === 0 && isOpen) {
      setIsOpen(false);
    }
  }, [newOrders, isOpen]);

  return (
    <PrimeReactProvider>
      {isOpen && <NewOrdersComponent isOpen={isOpen} onClose={handleClose} />}
      <div className="relative w-full flex h-screen overflow-hidden bg-secoundBgColor">
        
        {/* Sidebar */}
        <div className={`${hideSide ? 'w-60' : 'w-16'} fixed left-0 z-10 duration-300 overflow-hidden`}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className={`${hideSide ? 'pl-60' : 'pl-16'} w-full duration-300`}>
          {/* Navbar */}
          <div className="sticky top-0 z-10 bg-secoundBgColor">
            <Navbar />
          </div>

          {/* Main Content Area */}
          <div className="relative w-full px-3 h-full overflow-y-scroll scrollPage">
            <Outlet /> {/* Outlet for rendering child routes */}
          </div>
        </div>
      </div>
    </PrimeReactProvider>
  );
};

export default App;
