import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './layout.css';

const Layout: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const handleClickOutside = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
     <nav className="bg-gradient-to-r from-[#1a1a2e] to-[#0f0f19] fixed top-0 left-0 w-full px-4 sm:px-6 lg:px-8 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 relative">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Toggle menu"
            className="md:hidden text-white bg-gradient-to-r from-cyan-400 to-purple-600 p-2 rounded shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-1">
            <span className="font-pacifico text-cyan-400 logo-text" style={{ fontSize: '1.75rem' }}>invite</span>
            <span className="font-pacifico text-purple-600 logo-text" style={{ fontSize: '1.75rem' }}>Pro</span>
          </div>

          {/* Desktop Menu */}
       <ul className="hidden md:flex space-x-8 text-white text-sm font-semibold">
            <li className={isActive('/layout/welcome') ? 'active' : ''}>
              <Link to="/layout/welcome">THIỆP CƯỚI</Link>
            
            </li>
            <li className={isActive('/layout/layoutEven') ? 'active' : ''}>
              <Link to="/layout/layoutEven">THIỆP SINH NHẬT</Link>
            </li>
            <li className={isActive('/thiep-thoi-noi') ? 'active' : ''}>
              <Link to="/thiep-thoi-noi">THIỆP THÔI NÔI</Link>
            </li>
            <li className={isActive('/thiep-tan-gia') ? 'active' : ''}>
              <Link to="/thiep-tan-gia">THIỆP TÂN GIA</Link>
            </li>
            <li className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center focus:outline-none"
              >
                THIỆP KHÁC
                <svg
                  className={`ml-1 w-3 h-3 fill-current transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M5.516 7.548l4.484 4.484 4.484-4.484z" />
                </svg>
              </button>
              {isDropdownOpen && (
                <ul
                  className="absolute mt-2 w-44 bg-[#1f1f38] border border-purple-600 rounded-lg shadow-lg z-20"
                  onMouseLeave={handleClickOutside}
                >
                  <li className={isActive('/khac/item1') ? 'active' : ''}>
                    <Link to="/khac/item1" className="block px-5 py-2 hover:bg-purple-600">Item con 1</Link>
                  </li>
                  <li className={isActive('/khac/item2') ? 'active' : ''}>
                    <Link to="/khac/item2" className="block px-5 py-2 hover:bg-purple-600">Item con 2</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* User Avatar */}
          <div className="hidden md:block">
            <img
              className="rounded-full border-2 border-purple-600"
              width="32"
              height="32"
              src="https://storage.googleapis.com/a1aa/image/6d06e5fb-9656-43f0-52d4-6719f873aab5.jpg"
              alt="User"
            />
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <nav
        className={`md:hidden fixed top-0 left-0 h-screen w-[75%] bg-[#1a1a2e] z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
        >
          &times;
        </button>
        <ul className="flex flex-col text-white text-base font-semibold pt-16 pb-6 px-6 space-y-3">
          <li className={isActive('/layout/welcome') ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
            <Link to="/layout/welcome" className="block px-3 py-2 rounded hover:bg-purple-600">THIỆP CƯỚI</Link>
          </li>
          <li className={isActive('/layout/layoutEven') ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
            <Link to="/layout/layoutEven" className="block px-3 py-2 rounded hover:bg-purple-600">THIỆP SINH NHẬT</Link>
          </li>
          <li className={isActive('/thiep-thoi-noi') ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
            <Link to="/thiep-thoi-noi" className="block px-3 py-2 rounded hover:bg-purple-600">THIỆP THÔI NÔI</Link>
          </li>
          <li className={isActive('/thiep-tan-gia') ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
            <Link to="/thiep-tan-gia" className="block px-3 py-2 rounded hover:bg-purple-600">THIỆP TÂN GIA</Link>
          </li>
          <li>
            <button
              onClick={() => setIsMobileSubMenuOpen(!isMobileSubMenuOpen)}
              className="w-full flex justify-between items-center px-3 py-2 hover:bg-purple-600"
              aria-expanded={isMobileSubMenuOpen}
            >
              THIỆP KHÁC
              <svg
                className={`w-4 h-4 ml-2 transition-transform ${
                  isMobileSubMenuOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isMobileSubMenuOpen && (
              <ul className="mt-1 space-y-1 pl-5">
                <li className={isActive('/khac/item1') ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
                  <Link to="/khac/item1" className="block px-3 py-2 rounded hover:bg-purple-700">Item con 1</Link>
                </li>
                <li className={isActive('/khac/item2') ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
                  <Link to="/khac/item2" className="block px-3 py-2 rounded hover:bg-purple-700">Item con 2</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <main className="" style={{marginTop: "65px"}}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
