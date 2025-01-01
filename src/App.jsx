import './index.css';
import { Outlet } from 'react-router-dom';
import { useAuth } from './Context/Auth';
import { Navbar, NewOrdersComponent, Sidebar } from './Components/Components';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setNewOrders } from './Store/CreateSlices';
import { usePost } from './Hooks/usePostJson';
import { useNavigate } from 'react-router-dom';
import { useGet } from './Hooks/useGet';

const App = () => {
  const auth = useAuth();
  const hideSide = auth.hideSidebar;

  const { refetch: refetchSong, loading: loadingSong, data: dataSong } = useGet({
    url: 'https://bcknd.food2go.online/admin/settings/notification_sound',
  });
  const { postData, loadingPost, response } = usePost({ url: 'https://bcknd.food2go.online/admin/order/notification' });
  const ordersAll = useSelector((state) => state.ordersAll.data);
  const newOrders = useSelector((state) => state.newOrders);
  const soundNotification = useSelector((state) => state.soundNotification);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [isOpen, setIsOpen] = useState(false);
  const [orderCounts, setOrderCounts] = useState(0);

  // Fetch data from the API
  useEffect(() => {
    refetchSong();
  }, [refetchSong]);

  // Update song source when API data is received
  useEffect(() => {
    if (dataSong && dataSong.notification_sound) {
      // setSoundNotification(dataSong.notification_sound);
      console.log('Fetched song from API:', dataSong.notification_sound);
    }
  }, [dataSong]);

  const audio = new Audio(soundNotification); // Create an audio object


  const handleClose = () => setIsOpen(false);

  // Poll the notification endpoint every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Sending request to notification endpoint...");
      const formData = new FormData();
      formData.append('orders', ordersAll?.length || 0);
      postData(formData);
    }, 8000);

    return () => clearInterval(interval); // Cleanup interval
  }, [ordersAll, postData]);

  // Update `orderCounts` when a response is received
  useEffect(() => {
    if (response?.data?.new_orders !== undefined) {
      console.log('Response received:', response);
      setOrderCounts(response.data.new_orders);
    }
  }, [response]);

  // Update `newOrders` in Redux store
  useEffect(() => {
    if (orderCounts > 0) {
      dispatch(setNewOrders({ count: orderCounts }));

      // Play sound notification
      audio.play().catch((err) => console.error('Audio play failed:', err));
    }
  }, [orderCounts, dispatch]);

  // Open/close modal based on `newOrders` count
  useEffect(() => {
    setIsOpen(newOrders?.count > 0);
  }, [newOrders]);

  return (
    <PrimeReactProvider>
      {isOpen && (
        <NewOrdersComponent
          isOpen={isOpen}
          onClose={() => {
            handleClose();
          }}
        />
      )}
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
            <Outlet />
          </div>
        </div>
      </div>
    </PrimeReactProvider>
  );
};

export default App;
