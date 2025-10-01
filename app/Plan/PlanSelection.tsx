import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Sparkles, Users, Layout, Download, ArrowRight, BarChart3, UserPlus, Utensils, FileDown, X } from 'lucide-react';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface Plan {
  planID: string;
  planName: string;
  price: number;
  maxLayOut: number;
  maxGuests: number;
  maxTable: number;
  isExport: number;
  sendInvitation:number
}

const PaymentResultModal = ({ isOpen, onClose, isSuccess }: { isOpen: boolean; onClose: () => void; isSuccess: boolean }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform animate-slideUp">
        {/* Header with gradient */}
        <div className={`relative h-32 ${isSuccess ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-red-400 to-rose-500'}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            {isSuccess ? (
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <CheckCircle className="w-12 h-12 text-green-500" strokeWidth={3} />
              </div>
            ) : (
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg animate-shake">
                <XCircle className="w-12 h-12 text-red-500" strokeWidth={3} />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <h2 className={`text-2xl font-bold mb-3 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {isSuccess ? 'Thanh Toán Thành Công!' : 'Thanh Toán Thất Bại'}
          </h2>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {isSuccess ? (
              <>
                Cảm ơn bạn đã nâng cấp gói dịch vụ! 🎉
                <br />
                Gói VIP của bạn đã được kích hoạt và sẵn sàng sử dụng.
              </>
            ) : (
              <>
                Rất tiếc, giao dịch của bạn không thành công. 😔
                <br />
                Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp diễn.
              </>
            )}
          </p>

          {/* Features for success */}
          {isSuccess && (
            <div className="bg-green-50 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm font-semibold text-green-800 mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Bạn có thể:
              </p>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-center">
                  <Layout className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                  Tạo nhiều bố cục sự kiện hơn
                </li>
                <li className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                  Mời nhiều khách hơn
                </li>
                <li className="flex items-center">
                  <Download className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                  Xuất dữ liệu sự kiện
                </li>
              </ul>
            </div>
          )}

          {/* Error info for failure */}
          {!isSuccess && (
            <div className="bg-red-50 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm font-semibold text-red-800 mb-2">Có thể do:</p>
              <ul className="space-y-1 text-sm text-red-700">
                <li>• Số dư tài khoản không đủ</li>
                <li>• Thông tin thanh toán không chính xác</li>
                <li>• Lỗi kết nối mạng</li>
              </ul>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            {isSuccess ? (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Đóng
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Bắt Đầu
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl"
                >
                  Thử Lại
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-bounce {
          animation: bounce 0.6s ease-in-out;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

const PlanSelection = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [isUser, setUser] = useState<string | null>(null);
  const [isUserID, setUserID] = useState<string | null>("");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const resultPayment = searchParams.get("result");
  const [showModal, setShowModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInvitation");
    !storedUser && navigate("/");
    setUser(storedUser);
  }, []);

  useEffect(() => {
    if (resultPayment) {
      setPaymentSuccess(resultPayment === "1");
      setShowModal(true);
    }
  }, [resultPayment]);

  const handleCloseModal = () => {
    setShowModal(false);
    // Remove result param from URL
    searchParams.delete("result");
    setSearchParams(searchParams);
    
    if (paymentSuccess) {
      // Refresh user data to get updated plan
      getDataUser();
    }
  };

  const getDataUser = async () => {
    if (isUser == "") return;
    const url = `${import.meta.env.VITE_API_URL}/api/User`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      var dataUser = data.find((x: any) => x.mail === isUser);
      setUserID(dataUser.userID);
      console.log(dataUser.planID)
      setSelectedPlan(dataUser.planID);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    isUser && getDataUser();
  }, [isUser]);

  const getDataPlan = async () => {
    if (isUser == "") return;
    const url = `${import.meta.env.VITE_API_URL}/api/Plan`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      
      setPlans(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    isUserID && getDataPlan();
  }, [isUserID]);

  const handleSelectPlan = (plan: Plan) => {
    const currentPlan = plans.find(p => p.planID === selectedPlan);
    
    // Nếu đang ở gói VIP và click vào gói Free
    if (currentPlan && currentPlan.planName !== 'Free' && plan.planName === 'Free') {
       toast.warning('Bạn đang sử dụng gói VIP nên không thể chuyển về gói thường. Vui lòng liên hệ hỗ trợ nếu muốn hủy gói VIP.');
      return;
    }
    
    // Nếu đang ở gói VIP và click vào chính gói VIP đó
    if (currentPlan && currentPlan.planID === plan.planID && currentPlan.planName !== 'Free') {
      return;
    }
    
    createPackagePayment(isUserID ?? "", plan.planID, plan.price, plan.planName);
  };

  const createPackagePayment = (
    userId: string,
    planId: string,
    amount: number,
    orderInfo: string
  ) => {
    const url = `${import.meta.env.VITE_API_URL}/api/Payment/create-packagepayment`;
    const fullUrl = `${url}?userid=${userId}&planid=${planId}&amount=${amount}&orderinfo=${encodeURIComponent(orderInfo)}`;
    window.location.href = fullUrl;
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Miễn phí';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price * 1);
  };

const getPlanDisplayName = (plan: Plan) => {
  // Nếu miễn phí
  if (plan.price === 0) {
    return 'Gói Miễn Phí';
  }
  
  // Phân loại theo mức giá
  if (plan.price < 100000) {
    return 'Gói Cơ Bản';
  } else if (plan.price >= 100000 && plan.price < 300000) {
    return 'Gói Tiêu Chuẩn';
  } else if (plan.price >= 300000 && plan.price < 500000) {
    return 'Gói Premium';
  } else if (plan.price >= 500000 && plan.price < 1000000) {
    return 'Gói VIP';
  } else {
    return 'Gói VIP Platinum';
  }
};
  const getPlanIcon = (planName: string) => {
    if (planName === 'Free') {
      return (
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
        <Sparkles className="w-6 h-6 text-white" />
      </div>
    );
  };

  const getCardStyle = (planName: string, isSelected: boolean) => {
    const baseStyle = "relative bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2";
    
    if (isSelected) {
      return planName === 'Free' 
        ? `${baseStyle} border-green-500 shadow-green-200 shadow-lg`
        : `${baseStyle} border-purple-500 shadow-purple-200 shadow-lg`;
    }
    
    return `${baseStyle} border-gray-200 hover:border-gray-300`;
  };

  const getFeatures = (plan: Plan) => {
    return [
      { icon: BarChart3, label: 'Bố cục tối đa', value: `${plan.maxLayOut} mẫu` },
      { icon: Users, label: 'Số khách mời', value: `${plan.maxGuests} người` },
      { icon: Utensils, label: 'Số bàn tiệc', value: `${plan.maxTable} bàn` },
      { icon: UserPlus, label: 'Gửi thiệp mời', value: plan.sendInvitation === 1 ? 'Có' : 'Không' },
      { icon: plan.isExport ? FileDown : X, label: 'Xuất dữ liệu', value: plan.isExport ? 'Có' : 'Không' }
    ];
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <PaymentResultModal 
        isOpen={showModal} 
        onClose={handleCloseModal} 
        isSuccess={paymentSuccess} 
      />
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Chọn Gói Dịch Vụ Phù Hợp
          </h2>
          <p className="text-gray-600 text-lg">
            Lựa chọn gói dịch vụ tốt nhất cho sự kiện của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.planID;
            const isPremium = plan.planName !== 'Free';
            
            return (
              <div
                key={plan.planID}
                className={getCardStyle(plan.planName, isSelected)}
                onClick={() => handleSelectPlan(plan)}
              >
                {isPremium && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Phổ Biến
                    </span>
                  </div>
                )}

                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                <div className="flex flex-col items-center text-center">
                  {getPlanIcon(plan.planName)}
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {getPlanDisplayName(plan)}
                  </h3>
                  
                  <div className="mb-6">
                    <span className={`text-3xl font-bold ${plan.price === 0 ? 'text-green-600' : 'text-purple-600'}`}>
                      {formatPrice(plan.price)}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-500 text-sm ml-1">/tháng</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {getFeatures(plan).map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <IconComponent className="mr-2 w-4 h-4 text-gray-600" />
                          <span className="text-gray-700 text-sm">{feature.label}</span>
                        </div>
                        <span className="font-semibold text-gray-900 text-sm">
                          {feature.value}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-green-500 text-white'
                      : plan.planName === 'Free'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                  }`}
                >
                  {isSelected ? 'Đã Chọn' : 'Chọn Gói Này'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-blue-800">Lưu ý</span>
            </div>
            <p className="text-blue-700 text-sm">
              Bạn có thể thay đổi gói dịch vụ bất kỳ lúc nào. 
              Gói VIP sẽ được kích hoạt ngay sau khi thanh toán thành công.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanSelection;