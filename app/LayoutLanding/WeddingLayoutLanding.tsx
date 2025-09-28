import { useState, useEffect } from 'react';
import { Heart, Star, Palette, Smartphone, Users, Award, ArrowRight, Play, CheckCircle, Sparkles } from 'lucide-react';

export default function WeddingLayoutLanding() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const testimonials = [
    {
      name: "Nguyễn Thị Mai",
      role: "Cô dâu xinh đẹp",
      content: "Website này đã giúp chúng tôi tạo ra thiệp cưới online tuyệt đẹp. Rất dễ sử dụng và có nhiều template lựa chọn!",
      rating: 5
    },
    {
      name: "Trần Văn Nam",
      role: "Chú rể phong độ", 
      content: "Giao diện đẹp, tính năng đa dạng. Bạn bè đều khen ngợi thiệp cưới của chúng tôi. Rất hài lòng!",
      rating: 5
    },
    {
      name: "Lê Thị Hoa",
      role: "Wedding Planner",
      content: "Tôi thường giới thiệu website này cho các cặp đôi. Chất lượng template cao, dễ customize theo ý muốn.",
      rating: 5
    }
  ];

  const layoutImages = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const invitationImages = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1594736797933-d0ea1b2e8db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const plans = [
    {
      planID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      planName: "Free",
      price: 0,
      maxLayOut: 2,
      maxGuests: 100,
      maxTable: 10,
      isExport: 0
    },
    {
      planID: "55ae1dc2-d98d-4389-38ab-08ddfabdc134",
      planName: "VIP1",
      price: 200,
      maxLayOut: 5,
      maxGuests: 100,
      maxTable: 20,
      isExport: 1
    }
  ];

  const formatPrice = (price: number) => {
    if (price === 0) return 'Miễn phí';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price * 1000);
  };

  const getPlanDisplayName = (planName: string) => {
    const nameMap: { [key: string]: string } = {
      'Free': 'Gói Miễn Phí',
      'VIP1': 'Gói VIP Premium'
    };
    return nameMap[planName] || planName;
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Tạo thiệp cưới online đẹp nhất</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
              Tạo layout đám cưới{' '}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                tuyệt đẹp
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Biến ngày trọng đại của bạn thành kỷ niệm vĩnh cửu với những thiết kế thiệp cưới online 
              độc đáo, hiện đại và đầy cảm xúc. Dễ dàng tùy chỉnh, chia sẻ và quản lý khách mời.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="group bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
                <span>Bắt đầu miễn phí</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Hero Image/Preview */}
          <div className="relative">
            <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 rounded-3xl p-8 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="text-center space-y-4">
                  <Heart className="w-16 h-16 text-pink-500 mx-auto" />
                  <h3 className="text-2xl font-bold text-gray-800">Mai & Nam</h3>
                  <p className="text-gray-600">Save The Date</p>
                  <div className="text-3xl font-bold text-pink-500">15.12.2024</div>
                  <p className="text-sm text-gray-500">Nhà hàng Palace • TP.HCM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layout Templates Section - Simple Images */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Bộ Sưu Tập Template Layout
            </h2>
            <p className="text-xl text-gray-600">
              Chọn từ những mẫu thiết kế website đám cưới đẹp nhất
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {layoutImages.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <img
                    src={item.image}
                    alt={`Layout Template ${item.id}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invitation Templates Section - Simple Images */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Bộ Sưu Tập Template Thiệp Cưới
            </h2>
            <p className="text-xl text-gray-600">
              Thiệp mời điện tử đẹp mắt, dễ dàng chia sẻ
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {invitationImages.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <img
                    src={item.image}
                    alt={`Invitation Template ${item.id}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Chọn Gói Dịch Vụ Phù Hợp
            </h2>
            <p className="text-xl text-gray-600">
              Lựa chọn gói dịch vụ tốt nhất cho sự kiện của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.planID;
              const isPremium = plan.planName !== 'Free';
              
              return (
                <div
                  key={plan.planID}
                  className={`relative bg-white rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${
                    isSelected
                      ? isPremium 
                        ? 'border-purple-500 shadow-purple-200 shadow-lg'
                        : 'border-green-500 shadow-green-200 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleSelectPlan(plan.planID)}
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
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    {/* Icon */}
                    <div className="mb-6">
                      {plan.planName === 'Free' ? (
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <Heart className="w-8 h-8 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                          <Award className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">
                      {getPlanDisplayName(plan.planName)}
                    </h4>
                    
                    <div className="mb-6">
                      <span className={`text-4xl font-bold ${plan.price === 0 ? 'text-green-600' : 'text-purple-600'}`}>
                        {formatPrice(plan.price)}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-500 text-lg ml-1">/tháng</span>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 flex items-center">
                          <Palette className="w-4 h-4 mr-2 text-purple-500" />
                          Bố cục tối đa
                        </span>
                        <span className="font-semibold text-gray-900">{plan.maxLayOut} mẫu</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 flex items-center">
                          <Users className="w-4 h-4 mr-2 text-blue-500" />
                          Số khách mời
                        </span>
                        <span className="font-semibold text-gray-900">{plan.maxGuests} người</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 flex items-center">
                          <Heart className="w-4 h-4 mr-2 text-pink-500" />
                          Số bàn tiệc
                        </span>
                        <span className="font-semibold text-gray-900">{plan.maxTable} bàn</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 flex items-center">
                          <ArrowRight className="w-4 h-4 mr-2 text-green-500" />
                          Xuất dữ liệu
                        </span>
                        <span className={`font-semibold ${plan.isExport ? 'text-green-600' : 'text-red-500'}`}>
                          {plan.isExport ? 'Có' : 'Không'}
                        </span>
                      </div>
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
                </div>
              );
            })}
          </div>

          {/* Get Started Button */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 mx-auto">
              <span>Bắt đầu tạo ngay</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Khách hàng nói gì về chúng tôi
            </h2>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8 md:p-12">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-gray-700 text-center mb-6 italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div className="text-center">
                <div className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</div>
                <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-pink-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Sẵn sàng tạo thiệp cưới trong mơ?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Bắt đầu miễn phí ngay hôm nay và khám phá vô số khả năng sáng tạo
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
              <span>Tạo thiệp ngay</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 text-pink-100">
              <CheckCircle className="w-5 h-5" />
              <span>Không cần thẻ tín dụng</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="w-6 h-6 text-pink-500" />
              <span className="text-xl font-bold">Wedding Layout</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Wedding Layout. Tất cả quyền được bảo lưu.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}