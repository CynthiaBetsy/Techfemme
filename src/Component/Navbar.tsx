import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 
import Logo from '../assets/Logo.TF.jpg';

interface NavbarProps {
  setShowAuthModal: (type: 'signin' | 'signup') => void;
}

const Navbar: React.FC<NavbarProps> = ({ setShowAuthModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleRegisterClick = () => {
    navigate("/regform");
  };

  return (
    <nav className="bg-purple-50 shadow-md px-6 py-4 h-18 left-0 sticky w-full top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-14 w-30" />
        </Link>

        <button
          className="md:hidden text-purple-600 focus:outline-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/courses" className="text-purple-700 hover:text-purple-400">Dashboard</Link>
          <Link to="/admin" className="text-purple-700 hover:text-purple-400">Courses</Link>
          <Link to="/certification" className="text-purple-700 hover:text-purple-400">Certification</Link>
          <button
            onClick={() => setShowAuthModal('signin')}
            className="px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-100 cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={handleRegisterClick}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-600 cursor-pointer"
          >
            Signup
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col bg-amber-50 items-start space-y-4 mt-4 px-4">
          <Link to="/courses" className="text-gray-700 hover:text-purple-600" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-purple-600" onClick={() => setMenuOpen(false)}>Courses</Link>
          <Link to="/certification" className="text-gray-700 hover:text-purple-600" onClick={() => setMenuOpen(false)}>Certification</Link>
          <button
            onClick={() => { setShowAuthModal('signin'); setMenuOpen(false); }}
            className="w-full text-left px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-blue-100 cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => { handleRegisterClick(); setMenuOpen(false); }}
            className="w-full text-left px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-600 cursor-pointer"
          >
            Signup
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
