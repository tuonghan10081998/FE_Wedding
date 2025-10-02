import { useNavigate } from "react-router-dom";
import React, { useState,useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage: React.FC = () => {
  const initialRegisterForm = {
  name: "",
  user: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState({
    login: false,
    register: false,
    confirm: false,
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
 const [loginForm, setLoginForm] = useState({
    user: "",
    password: "",
  });
  const handleTogglePassword = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };
    useEffect(() => {
    const cachedUser = localStorage.getItem("userInvitationR");
    const cachedPass = localStorage.getItem("passwordInvitationR");
    if (cachedUser && cachedPass) {
      setLoginForm({
        user: cachedUser,
        password: cachedPass,
      });
      setRememberMe(true); // set lại trạng thái checkbox
    }
  }, []);
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }
    const objectRegister = {
        userName: registerForm.name,
        password: registerForm.password,
        mail: registerForm.email,
        phone: registerForm.phone,
        planId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
    PostRegister(objectRegister)
  };
  const PostRegister = async (object: any) => {
      try {
        const request = new Request(`${import.meta.env.VITE_API_URL}/api/User`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(object),
        });

        let response = await fetch(request);

        // ✅ Nếu trả về 201 -> đọc json
        if (response.status === 201) {
          const data = await response.json();

          toast.success("Tạo tài khoản thành công");
          setActiveTab("login");
          setRegisterForm(initialRegisterForm);
        } else {
          // ❌ Nếu fail -> đọc text
          const errorText = await response.text();
          toast.error(errorText || "Tạo tài khoản thất bại");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Có lỗi kết nối server");
      }
    };

 const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const objectLogin = {
      mail:loginForm.user,
      password:loginForm.password
    }
    PostLogin(objectLogin)
  };
    const PostLogin = async (object: any) => {
      try {
        const request = new Request(`${import.meta.env.VITE_API_URL}/api/User/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(object),
        });

        let response = await fetch(request);

        // ✅ Nếu trả về 201 -> đọc json
        if (response.status === 200) {
          const data = await response.json();

         if (rememberMe) {
            localStorage.setItem("userInvitation", loginForm.user);
            localStorage.setItem("passwordInvitation", loginForm.password);
            localStorage.setItem("userInvitationR", loginForm.user);
            localStorage.setItem("passwordInvitationR", loginForm.password);
          } else {
            // ❌ Xóa cache nếu không tick
            localStorage.removeItem("userInvitationR");
            localStorage.removeItem("passwordInvitationR");
          }
          localStorage.setItem("role", data.role);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("senderInvatition", data.plan.isExport);
          if(data.role === "Admin"){
            navigate("/layout/PlanEditor"); // chuyển <trang>  </trang>
          }else{
            navigate("/layout/LayoutLanding"); // chuyển trang
          }
         
        } else {
          // ❌ Nếu fail -> đọc text
          const errorText = await response.text();
          toast.error(errorText || "Đăng nhập thất bại");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Có lỗi kết nối server");
      }
    };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Background với gradient và pattern */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 192, 203, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(221, 160, 221, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 100%)
          `,
        }}
      />
      
      {/* Floating hearts decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Trái tim lớn */}
        <div className="absolute top-10 left-10 text-pink-400 opacity-70 animate-pulse">
          <i className="fas fa-heart text-4xl"></i>
        </div>
        <div className="absolute top-20 right-20 text-rose-400 opacity-80 animate-pulse delay-1000">
          <i className="fas fa-heart text-3xl"></i>
        </div>
        <div className="absolute bottom-20 left-20 text-pink-500 opacity-60 animate-pulse delay-500">
          <i className="fas fa-heart text-5xl"></i>
        </div>
        <div className="absolute bottom-10 right-10 text-rose-500 opacity-75 animate-pulse delay-1500">
          <i className="fas fa-heart text-2xl"></i>
        </div>
        <div className="absolute top-1/3 left-1/4 text-pink-300 opacity-50 animate-pulse delay-2000">
          <i className="fas fa-heart text-6xl"></i>
        </div>
        <div className="absolute top-2/3 right-1/4 text-rose-300 opacity-65 animate-pulse delay-700">
          <i className="fas fa-heart text-4xl"></i>
        </div>
        
        {/* Thêm nhiều trái tim nhỏ */}
        <div className="absolute top-16 left-1/3 text-pink-400 opacity-60 animate-pulse delay-300">
          <i className="fas fa-heart text-xl"></i>
        </div>
        <div className="absolute top-32 right-1/3 text-rose-400 opacity-55 animate-pulse delay-800">
          <i className="fas fa-heart text-2xl"></i>
        </div>
        <div className="absolute top-48 left-16 text-pink-500 opacity-70 animate-pulse delay-1200">
          <i className="fas fa-heart text-sm"></i>
        </div>
        <div className="absolute top-56 right-16 text-rose-500 opacity-65 animate-pulse delay-400">
          <i className="fas fa-heart text-lg"></i>
        </div>
        <div className="absolute bottom-32 left-1/2 text-pink-400 opacity-75 animate-pulse delay-1800">
          <i className="fas fa-heart text-2xl"></i>
        </div>
        <div className="absolute bottom-48 right-1/2 text-rose-400 opacity-50 animate-pulse delay-600">
          <i className="fas fa-heart text-xl"></i>
        </div>
        
        {/* Trái tim ở giữa */}
        <div className="absolute top-1/2 left-12 text-pink-300 opacity-60 animate-pulse delay-900">
          <i className="fas fa-heart text-3xl"></i>
        </div>
        <div className="absolute top-1/2 right-12 text-rose-300 opacity-70 animate-pulse delay-1100">
          <i className="fas fa-heart text-2xl"></i>
        </div>
        <div className="absolute top-40 left-1/2 text-pink-400 opacity-55 animate-pulse delay-1600">
          <i className="fas fa-heart text-lg"></i>
        </div>
        <div className="absolute bottom-40 left-1/3 text-rose-400 opacity-80 animate-pulse delay-200">
          <i className="fas fa-heart text-xl"></i>
        </div>
        
        {/* Trái tim góc */}
        <div className="absolute top-6 left-6 text-pink-500 opacity-45 animate-pulse delay-1400">
          <i className="fas fa-heart text-sm"></i>
        </div>
        <div className="absolute top-6 right-6 text-rose-500 opacity-60 animate-pulse delay-100">
          <i className="fas fa-heart text-lg"></i>
        </div>
        <div className="absolute bottom-6 left-6 text-pink-400 opacity-70 animate-pulse delay-1700">
          <i className="fas fa-heart text-xl"></i>
        </div>
        <div className="absolute bottom-6 right-6 text-rose-400 opacity-55 animate-pulse delay-1900">
          <i className="fas fa-heart text-sm"></i>
        </div>
        
        {/* Trái tim bay lơ lửng random */}
        <div className="absolute top-24 left-20 text-pink-300 opacity-65 animate-pulse delay-500">
          <i className="fas fa-heart text-base"></i>
        </div>
        <div className="absolute top-36 right-24 text-rose-300 opacity-50 animate-pulse delay-1300">
          <i className="fas fa-heart text-2xl"></i>
        </div>
        <div className="absolute bottom-24 left-32 text-pink-500 opacity-75 animate-pulse delay-800">
          <i className="fas fa-heart text-lg"></i>
        </div>
        <div className="absolute bottom-36 right-32 text-rose-500 opacity-60 animate-pulse delay-300">
          <i className="fas fa-heart text-base"></i>
        </div>
        <div className="absolute top-72 left-2/3 text-pink-400 opacity-55 animate-pulse delay-1500">
          <i className="fas fa-heart text-xl"></i>
        </div>
        <div className="absolute bottom-72 right-2/3 text-rose-400 opacity-70 animate-pulse delay-400">
          <i className="fas fa-heart text-lg"></i>
        </div>
      </div>

      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff69b4' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="sm:max-w-[500px] md:max-w-4xl w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 border border-white/20">
        {/* Left side image */}
        <ToastContainer position="top-right" autoClose={2000} theme="colored" />
        <div className="md:w-1/2 relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br  z-10"></div>
          <img
            src="image/imageCoDauChuRe.jpg"
            alt="Cặp đôi cưới nắm tay nhau dưới ánh hoàng hôn lãng mạn"
            className="w-full h-full object-contain relative z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-200/20 to-transparent z-20"></div>
        </div>

        {/* Right side forms */}
        <div className="md:w-1/2 p-8 relative bg-white/95 backdrop-blur-sm">
          {/* Logo or Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              <i className="fas fa-heart text-pink-400 mr-2"></i>
               Tạo layout của bạn
            </h1>
            {/* <p className="text-gray-600 mt-2"></p> */}
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8 space-x-8 border-b border-pink-200 relative z-10">
            <button
              className={`pb-2 font-semibold focus:outline-none transition-all duration-300 ${
                activeTab === "login"
                  ? "text-pink-600 border-b-4 border-pink-600"
                  : "text-gray-400 hover:text-pink-600"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Đăng nhập
            </button>
            <button
              className={`pb-2 font-semibold focus:outline-none transition-all duration-300 ${
                activeTab === "register"
                  ? "text-pink-600 border-b-4 border-pink-600"
                  : "text-gray-400 hover:text-pink-600"
              }`}
              onClick={() => setActiveTab("register")}
            >
              Đăng ký
            </button>
          </div>

          {/* Forms */}
          <div className="form-container relative">
            {activeTab === "login" && (
              <form
                onSubmit={handleLoginSubmit}
                className="space-y-2 visible"
              >
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder=""
                      value={loginForm.user}
                      onInvalid={(e) => {
                        e.currentTarget.setCustomValidity("Vui lòng nhập email");
                      }}
                      onInput={(e) => {
                        e.currentTarget.setCustomValidity(''); // Clear message khi user typing
                      }}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, user: e.target.value })
                      }
                      className="w-full border border-pink-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-600 bg-white/80 backdrop-blur-sm transition-all duration-300"
                    />
                    <i className="fas fa-user absolute right-3 top-[9px] text-pink-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.login ? "text" : "password"}
                      required
                      placeholder=""
                      value={loginForm.password}
                      onInvalid={(e) => {
                        e.currentTarget.setCustomValidity("Vui lòng nhập mật khẩu");
                      }}
                      onInput={(e) => {
                        e.currentTarget.setCustomValidity(''); // Clear message khi user typing
                      }}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                      className="w-full border border-pink-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-600 bg-white/80 backdrop-blur-sm transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleTogglePassword("login")}
                      className="absolute right-3 top-3.5 text-pink-400 hover:text-pink-600 focus:outline-none transition-colors duration-300"
                    >
                      <i className={`fas ${showPassword.login ? "fa-eye-slash" : "fa-eye"}`} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 py-3">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="text-gray-700 select-none">
                    Ghi nhớ mật khẩu
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Đăng nhập
                </button>
              </form>
            )}

            {activeTab === "register" && (
              <form
                onSubmit={handleRegisterSubmit}
                className="space-y-2 visible"
              >
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    required
                    placeholder=""
                    onInvalid={(e) => {
                      e.currentTarget.setCustomValidity("Vui lòng nhập họ và tên");
                    }}
                    onInput={(e) => {
                      e.currentTarget.setCustomValidity(''); // Clear message khi user typing
                    }}
                    value={registerForm.name}
                    onChange={(e) =>
                      setRegisterForm({ ...registerForm, name: e.target.value })
                    }
                    className="w-full border border-pink-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-600 bg-white/80 backdrop-blur-sm transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder=""
                    value={registerForm.email}
                    onInvalid={(e) => {
                      e.currentTarget.setCustomValidity("Vui lòng nhập email");
                    }}
                    onInput={(e) => {
                      e.currentTarget.setCustomValidity(''); // Clear message khi user typing
                    }}
                    onChange={(e) =>
                      setRegisterForm({ ...registerForm, email: e.target.value })
                    }
                    className="w-full border border-pink-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-600 bg-white/80 backdrop-blur-sm transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9\\s\\-+()]{9,15}"
                    placeholder=""
                    value={registerForm.phone}
                    onInvalid={(e) => {
                      e.currentTarget.setCustomValidity("Vui lòng nhập số điện thoại");
                    }}
                    onInput={(e) => {
                      e.currentTarget.setCustomValidity(''); // Clear message khi user typing
                    }}
                    onChange={(e) =>
                    {
                         let value = e.target.value;
                        if (!/^\+?\d*$/.test(value)) return;
                        if (value.length > 10) return;
                     setRegisterForm({ ...registerForm, phone: value })
                    }
                     
                    }
                    className="w-full border border-pink-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-600 bg-white/80 backdrop-blur-sm transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.register ? "text" : "password"}
                      required
                      placeholder=""
                      value={registerForm.password}
                      onInvalid={(e) => {
                        e.currentTarget.setCustomValidity("Vui lòng nhập mật khẩu");
                      }}
                      onInput={(e) => {
                        e.currentTarget.setCustomValidity(''); // Clear message khi user typing
                      }}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, password: e.target.value })
                      }
                      className="w-full border border-pink-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-600 bg-white/80 backdrop-blur-sm transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleTogglePassword("register")}
                      className="absolute right-3 top-[10px] text-pink-400 hover:text-pink-600 focus:outline-none transition-colors duration-300"
                    >
                      <i className={`fas ${showPassword.register ? "fa-eye-slash" : "fa-eye"}`} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      required
                      placeholder=""
                      onInvalid={(e) => {
                        e.currentTarget.setCustomValidity("Vui lòng nhập xác nhận mật khẩu");
                      }}
                      onInput={(e) => {
                        e.currentTarget.setCustomValidity(''); // Clear message khi user typing
                      }}
                      value={registerForm.confirmPassword}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full border border-pink-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-600 bg-white/80 backdrop-blur-sm transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleTogglePassword("confirm")}
                      className="absolute right-3 top-[10px] text-pink-400 hover:text-pink-600 focus:outline-none transition-colors duration-300"
                    >
                      <i className={`fas ${showPassword.confirm ? "fa-eye-slash" : "fa-eye"}`} />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold py-3 mt-3 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Đăng ký
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;