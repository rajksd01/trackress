import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background w-full flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;