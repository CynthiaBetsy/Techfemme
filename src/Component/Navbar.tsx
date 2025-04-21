import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/TFALogo.png';

interface NavbarProps {
  setShowAuthModal: (type: 'signin' | 'signup') => void;
}

const Navbar: React.FC<NavbarProps> = ({ setShowAuthModal }) => {
  return (
    <nav className="bg-blue-50 shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
        </Link>

        <div className="space-x-4">
              <div className="hidden md:flex space-x-6 items-center">
                      <Link to="/courses" className="text-gray-700 hover:text-blue-600">Courses</Link>
                      <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                      <Link to="/certification" className="text-gray-700 hover:text-blue-600">Certification</Link>
          <button
            onClick={() => setShowAuthModal('signin')}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => setShowAuthModal('signup')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Signup
          </button>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
