import React, { useState } from 'react';

interface Plan {
  planID: string;
  planName: string;
  price: number;
  maxLayOut: number;
  maxGuests: number;
  maxTable: number;
  isExport: number;
}

interface PlanSelectionProps {
  plans?: Plan[];
  onSelectPlan?: (plan: Plan) => void;
  selectedPlanId?: string;
}

const PlanSelection: React.FC<PlanSelectionProps> = ({ 
  plans = [
    {
      "planID": "55ae1dc2-d98d-4389-38ab-08ddfabdc134",
      "planName": "VIP1",
      "price": 200,
      "maxLayOut": 5,
      "maxGuests": 100,
      "maxTable": 20,
      "isExport": 1
    },
    {
      "planID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "planName": "Free",
      "price": 0,
      "maxLayOut": 2,
      "maxGuests": 100,
      "maxTable": 10,
      "isExport": 0
    }
  ],
  onSelectPlan,
  selectedPlanId
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>(selectedPlanId || '');

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan.planID);
    onSelectPlan?.(plan);
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Miễn phí';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price * 1000); // Assuming price is in thousands
  };

  const getPlanDisplayName = (planName: string) => {
    const nameMap: { [key: string]: string } = {
      'Free': 'Gói Miễn Phí',
      'VIP1': 'Gói VIP Premium',
      'VIP2': 'Gói VIP Pro',
      'Basic': 'Gói Cơ Bản'
    };
    return nameMap[planName] || planName;
  };

  const getPlanIcon = (planName: string) => {
    if (planName === 'Free') {
      return (
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      );
    }
    return (
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
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
      { icon: '📊', label: 'Bố cục tối đa', value: `${plan.maxLayOut} mẫu` },
      { icon: '👥', label: 'Số khách mời', value: `${plan.maxGuests} người` },
      { icon: '🪑', label: 'Số bàn tiệc', value: `${plan.maxTable} bàn` },
      { icon: plan.isExport ? '📤' : '❌', label: 'Xuất dữ liệu', value: plan.isExport ? 'Có' : 'Không' }
    ];
  };

  return (
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
              {/* Popular Badge cho gói VIP */}
              {isPremium && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Phổ Biến
                  </span>
                </div>
              )}

              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}

              <div className="flex flex-col items-center text-center">
                {getPlanIcon(plan.planName)}
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {getPlanDisplayName(plan.planName)}
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

              {/* Features */}
              <div className="space-y-3 mb-6">
                {getFeatures(plan).map((feature, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-2 text-lg">{feature.icon}</span>
                      <span className="text-gray-700 text-sm">{feature.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">
                      {feature.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Select Button */}
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

      {/* Additional Info */}
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
  );
};

export default PlanSelection;