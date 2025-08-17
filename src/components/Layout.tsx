import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2Icon, HomeIcon } from 'lucide-react';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const location = useLocation();
  return <div className="flex flex-col md:flex-row h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <nav className="bg-white shadow-md md:w-64 w-full md:h-full p-4 md:fixed">
        <div className="flex items-center justify-center md:justify-start mb-8 pt-2">
          <h1 className="text-xl font-bold text-blue-600">LeetCode Tracker</h1>
        </div>
        <ul className="space-y-2">
          <li>
            <Link to="/" className={`flex items-center p-3 rounded-lg hover:bg-blue-50 ${location.pathname === '/' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}>
              <HomeIcon className="w-5 h-5 mr-3" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/analytics" className={`flex items-center p-3 rounded-lg hover:bg-blue-50 ${location.pathname === '/analytics' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}>
              <BarChart2Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">Analytics</span>
            </Link>
          </li>
        </ul>
      </nav>
      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 md:ml-64 overflow-y-auto">
        {children}
      </main>
    </div>;
};
export default Layout;