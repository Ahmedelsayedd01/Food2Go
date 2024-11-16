import './index.css';
import { Outlet } from 'react-router-dom';
import { useAuth } from './Context/Auth';
import { Navbar, Sidebar } from './Components/Components';
import { PrimeReactProvider } from 'primereact/api';

import "primereact/resources/themes/lara-light-blue/theme.css";

const App = () => {
  const auth = useAuth();
  const hideSide = auth.hideSidebar;
  console.log('hideSide22', hideSide)

  return (
    <PrimeReactProvider >
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
            <Outlet /> {/* Outlet for rendering children routes */}
          </div>
        </div>
      </div>
    </PrimeReactProvider>
  );
};

export default App;
