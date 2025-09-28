import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./layout.css";

const Layout: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // mở/đóng mobile menu
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false);
  const [isviews, setview] = useState(true); // true = navbar, false = sidebar
  const [isCollapsed, setIsCollapsed] = useState(false); // collapse sidebar desktop
  const [isMobile, setIsMobile] = useState(false); // có phải mobile không
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  const [isOpen, setIsOpen] = useState(false);
    const [isUser, setUser] = useState<string | null>(null);
    const [isUserName, setUserName] = useState<string | null>("");
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
      setIsCollapsed(window.innerWidth < 1200)
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
   useEffect(() => {
      const storedUser = localStorage.getItem("userInvitation");
      console.log(storedUser)
       !storedUser && navigate("/");
      setUser(storedUser);
  }, []);
   const getDataUser = async () => {
    if (isUser == "") return;
    const url = `${import.meta.env.VITE_API_URL}/api/User`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      var dataUser = data.find((x:any) => x.mail === isUser)
      setUserName(dataUser.userName)
      
    } catch (error) {
        console.error(error);
    }
  };
    useEffect(() => {
      isUser && getDataUser()
    },[isUser])
  const handleLogOut= () => {
    console.log(1)
      localStorage.removeItem("userInvitation");
      localStorage.removeItem("passwordInvitation");
      navigate("/");
  }
  return (
    <>
      {/* ----------- NAVBAR (khi isviews = true) ----------- */}
      {isviews && (
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
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>

              {/* Logo */}
              <div className="flex items-center space-x-1">
                {/* <span className="font-pacifico text-cyan-400 logo-text text-2xl">
                  invite
                </span>
                <span className="font-pacifico text-purple-600 logo-text text-2xl">
                  Pro
                </span> */}
              </div>

              {/* Desktop Menu */}
              <ul className="hidden md:flex space-x-8 text-white text-sm font-semibold">
                <li className={isActive("/layout/LayoutLanding") ? "active" : ""}>
                  <Link to="/layout/LayoutLanding">TRANG CHỦ</Link>
                </li>
                <li className={isActive("/layout/layoutEven") ? "active" : ""}>
                  <Link to="/layout/layoutEven">TẠO LAYOUT</Link>
                </li>
                <li className={isActive("/layout/Invitation") ? "active" : ""}>
                  <Link to="/layout/Invitation">THIỆP CƯỚI</Link>
                </li>
                <li className={isActive("/layout/Plan") ? "active" : ""}>
                  <Link to="/layout/Plan">GÓI DỊCH VỤ</Link>
                </li>
                <li className="relative hidden">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center focus:outline-none"
                  >
                    THIỆP KHÁC
                    <svg
                      className={`ml-1 w-3 h-3 fill-current transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.516 7.548l4.484 4.484 4.484-4.484z" />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute mt-2 w-44 bg-[#1f1f38] border border-purple-600 rounded-lg shadow-lg z-20">
                      <li
                        className={isActive("/khac/item1") ? "active" : ""}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Link
                          to="/khac/item1"
                          className="block px-5 py-2 hover:bg-purple-600"
                        >
                          Item con 1
                        </Link>
                      </li>
                      <li
                        className={isActive("/khac/item2") ? "active" : ""}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Link
                          to="/khac/item2"
                          className="block px-5 py-2 hover:bg-purple-600"
                        >
                          Item con 2
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>

              {/* User Avatar */}
               <button  onClick={() => setIsOpen(!isOpen)} className="relative flex justify-center items-center gap-[7px] from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                <img
                 
                  className="rounded-full border-2 border-purple-600"
                  width="32"
                  height="32"
                  src="https://storage.googleapis.com/a1aa/image/6d06e5fb-9656-43f0-52d4-6719f873aab5.jpg"
                  alt="User"
                />
               {isUserName}
                  {isOpen && (
               <div
                 className="absolute  right-0 top-12 bg-gray-800 rounded-lg shadow-xl 
                         min-w-[130px] py-1 z-50 animate-in fade-in slide-in-from-top-2 
                         duration-200"
               >
                 <button onClick={handleLogOut}
                   className="w-full cursor-pointer flex items-center  px-4 py-3 text-white 
                           transition-colors duration-200 text-left text-sm"
                 >
                 <i className="fa-solid fa-right-from-bracket text-[16px] mr-3 text-red-400"></i>
                   <span>Đăng xuất</span>
                 </button>
               </div>
             )}
           </button>
             
            </div>
          </nav>

          {/* Mobile Slide Menu */}
          <nav
            className={`md:hidden fixed top-0 left-0 h-screen w-[75%] bg-[#1a1a2e] z-50 transform transition-transform duration-300 ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              &times;
            </button>
            <ul className="flex flex-col text-white text-base font-semibold pt-16 pb-6 px-6 space-y-3">
              <li
                className={isActive("/layout/LayoutLanding") ? "active" : ""}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link
                  to="/layout/LayoutLanding"
                  className="block px-3 py-2 rounded hover:bg-purple-600"
                >
                  TRANG CHỦ
                </Link>
              </li>
              <li
                className={isActive("/layout/layoutEven") ? "active" : ""}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link
                  to="/layout/layoutEven"
                  className="block px-3 py-2 rounded hover:bg-purple-600"
                >
                  TẠO LAYOUT
                </Link>
              </li>
              <li
                className={isActive("/layout/Invitation") ? "active" : ""}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link
                  to="/layout/Invitation"
                  className="block px-3 py-2 rounded hover:bg-purple-600"
                >
                  THIỆP CƯỚI
                </Link>
              </li>
              <li
                className={isActive("/layout/Plan") ? "active" : ""}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link
                  to="/layout/Plan"
                  className="block px-3 py-2 rounded hover:bg-purple-600"
                >
                  GÓI DỊCH VỤ
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsMobileSubMenuOpen(!isMobileSubMenuOpen)}
                  className="w-full flex justify-between items-center px-3 py-2 hover:bg-purple-600"
                >
                  THIỆP KHÁC
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform ${
                      isMobileSubMenuOpen ? "rotate-180" : ""
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
                    <li
                      className={isActive("/khac/item1") ? "active" : ""}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link
                        to="/khac/item1"
                        className="block px-3 py-2 rounded hover:bg-purple-700"
                      >
                        Item con 1
                      </Link>
                    </li>
                    <li
                      className={isActive("/khac/item2") ? "active" : ""}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link
                        to="/khac/item2"
                        className="block px-3 py-2 rounded hover:bg-purple-700"
                      >
                        Item con 2
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </>
      )}

      {/* ----------- SIDEBAR (khi isviews = false) ----------- */}
      {!isviews && (
        <>
          {/* Mobile Sidebar */}
          {isMobile ? (
            <nav
              className={`fixed top-0 left-0 h-screen w-[75%] bg-[#0f172a] text-white shadow-lg z-50 transform transition-transform duration-300 ${
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 text-white text-2xl"
              >
                &times;
              </button>

              <ul className="mt-16 space-y-2 px-4">
               <li className="flex flex-col">
                  <div
                    className={`flex items-center space-x-2 p-2 rounded hover:bg-blue-600 cursor-pointer`}
                    onClick={() => setOpenMenu(!openMenu)}
                  >
                    <i className="fa fa-home text-lg"></i>
                    <span className="whitespace-nowrap">Dashboard</span>
                     <i className={`fa fa-chevron-${openMenu ? "down" : "right"} ml-auto`}></i>
                  </div>

                  {/* Submenu */}
                  {openMenu && (
                   <ul className={`ml-8 mt-1 space-y-1`}>
                      <li className="p-2 hover:bg-blue-500 rounded cursor-pointer">
                       <i className="fa fa-tasks text-lg mr-2"></i>
                          <span className="whitespace-nowrap">Công việc</span>
                      </li>
                      <li className="p-2 hover:bg-blue-500 rounded cursor-pointer">
                       <i className="fa fa-tasks text-lg mr-2"></i>
                          <span className="whitespace-nowrap">Nhân viên</span>
                      </li>
                    </ul>
                  )}
                </li>

                <li
                  className={`flex items-center space-x-2 p-2 rounded hover:bg-blue-600 cursor-pointer 
                  ${isActive("/congviec") ? "bg-blue-700" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to="/congviec" className="flex items-center space-x-2">
                    <i className="fa fa-tasks text-lg"></i>
                    <span className="whitespace-nowrap">Danh sách công việc</span>
                  </Link>
                </li>

                <li
                  className={`flex items-center space-x-2 p-2 rounded hover:bg-blue-600 cursor-pointer 
                  ${isActive("/duan") ? "bg-blue-700" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to="/duan" className="flex items-center space-x-2">
                    <i className="fa fa-project-diagram text-lg"></i>
                    <span className="whitespace-nowrap">Danh sách dự án</span>
                  </Link>
                </li>
              </ul>
            </nav>
          ) : (
            /* Desktop Sidebar */
            <div
              className={`fixed top-0 left-0 h-screen bg-[#0f172a] text-white shadow-lg z-50 
              transition-all duration-300 ${isCollapsed ? "w-[70px]" : "w-[260px]"}`}
            >
              <div className="flex items-center justify-center h-16 border-b border-gray-700">
                {!isCollapsed && <span className="text-xl font-bold"></span>}
                {isCollapsed && <i className="fa fa-users text-2xl"></i>}
              </div>

              <ul className="mt-4 space-y-2 px-4">
               <li className="flex flex-col">
                  <div
                    className={`flex items-center space-x-2 p-2 rounded hover:bg-blue-600 cursor-pointer`}
                    onClick={() => setOpenMenu(!openMenu)}
                  >
                    <i className="fa fa-home text-lg "></i>
                    {!isCollapsed && <span className="whitespace-nowrap">Dashboard</span>}
                    {!isCollapsed && <i className={`fa fa-chevron-${openMenu ? "down" : "right"} ml-auto`}></i>}
                  </div>

                  {/* Submenu */}
                  {openMenu && (
                    <ul className={`${!isCollapsed ? "ml-8" : "ml-0"}  mt-1 space-y-1`}>
                      <li className="p-2 hover:bg-blue-500 rounded cursor-pointer">
                       <i className="fa fa-tasks text-lg mr-2"></i>
                        {!isCollapsed && (
                          <span className="whitespace-nowrap">Công việc</span>
                        )}
                      </li>
                      <li className="p-2 hover:bg-blue-500 rounded cursor-pointer">
                       <i className="fa fa-tasks text-lg mr-2"></i>
                        {!isCollapsed && (
                          <span className="whitespace-nowrap">Nhân viên</span>
                        )}
                      </li>
                    </ul>
                  )}
                </li>

                <li
                  className={`flex items-center space-x-2 p-2 rounded hover:bg-blue-600 cursor-pointer 
                  ${isActive("/congviec") ? "bg-blue-700" : ""}`}
                >
                  <Link to="/congviec" className="flex items-center space-x-2">
                    <i className="fa fa-tasks text-lg"></i>
                    {!isCollapsed && (
                      <span className="whitespace-nowrap">Danh sách công việc</span>
                    )}
                  </Link>
                </li>

                <li
                  className={`flex items-center space-x-2 p-2 rounded hover:bg-blue-600 cursor-pointer 
                  ${isActive("/duan") ? "bg-blue-700" : ""}`}
                >
                  <Link to="/duan" className="flex items-center space-x-2">
                    <i className="fa fa-project-diagram text-lg"></i>
                    {!isCollapsed && (
                      <span className="whitespace-nowrap">Danh sách dự án</span>
                    )}
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </>
      )}

      {/* ----------- MAIN CONTENT ----------- */}
      <main  onClick={() => setIsOpen(false)}
        className={`${!isviews ? isMobile ? "ml-0": isCollapsed ? "ml-[70px]": "ml-[260px]": "mt-[65px]" } `}
      >
        <div className="flex items-center">
          {!isviews && !isMobile && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label="Toggle menu"
              className="text-white bg-gradient-to-r from-cyan-400 to-purple-600 p-2 rounded shadow-lg"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          )}
          {!isviews && isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="text-white bg-gradient-to-r from-cyan-400 to-purple-600 p-2 rounded shadow-lg"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          )}
        </div>
        <Outlet  />
      </main>
    </>
  );
};

export default Layout;
