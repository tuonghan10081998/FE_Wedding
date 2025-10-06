import { useState, useEffect } from 'react';
import { Heart, Star, Palette, Smartphone, Users, Award, ArrowRight, Play, CheckCircle, Sparkles } from 'lucide-react';
import { XCircle, Layout, Download, BarChart3, UserPlus, Utensils, FileDown, X,Facebook,Mail,Phone } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import type { Plan } from '~/Plan/PlanSelection';
import '../layoutEven/layoutEven.css'
export default function WeddingLayoutLanding() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const navigate = useNavigate();
   useEffect(() => {
      const storedUser = localStorage.getItem("userInvitation");
       !storedUser && navigate("/");
       setUser(storedUser);
    }, []);
   const [isUser, setUser] = useState<string | null>(null);
    const [isUserID, setUserID] = useState<string | null>("");
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
      image: "/image/layout4.png"
    },
    {
      id: 2,
      image: "/image/layout3.png"
    },
    {
      id: 3,
      image:  "/image/layout2.png"
    }
  ];

  const invitationImages = [
    {
      id: 1,
      image: "/image/image1_6.png",
      title: "Thiệp Cưới Cổ Điển",
      description: "Phong cách elegant & tinh tế"
    },
    {
      id: 2,
      image: "/image/image1_5.png", 
      title: "Thiệp Cưới Hiện Đại",
      description: "Thiết kế tối giản & sang trọng"
    },
    {
      id: 3,
      image: "/image/image1_4.png",
      title: "Thiệp Cưới Romantique", 
      description: "Hoa văn lãng mạn & ngọt ngào"
    }
  ];
  const getDataUser = async () => {
      if (isUser == "") return;
      const url = `${import.meta.env.VITE_API_URL}/api/User`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Response status: ${response.status}`);
  
        const data = await response.json();
        var dataUser = data.find((x: any) => x.mail === isUser);
        setUserID(dataUser.userID);
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
  const [plans, setPlans] = useState<Plan[]>([]);
  const handleGoCreateLayout = () => {
    navigate("/layout/layoutEvent")
  }
   const handleGoCreatePlan = () => {
    navigate("/layout/Plan")
  }
   const handleGoCreateInvatition = () => {
    navigate("/layout/Invitation")
  }
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
          {/* Invitation Templates Section - With Title and Optimized Images */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
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
                    className="bg-white object-contain w-full h-64  group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <button onClick={handleGoCreateLayout} className="group bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
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
              Bộ Sưu Tập Template Thiệp Cưới
            </h2>
            <p className="text-xl text-gray-600">
              Thiệp mời điện tử đẹp mắt, dễ dàng chia sẻ
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {invitationImages.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-56 object-contain bg-gradient-to-br from-pink-50 to-purple-50 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.description}
                    </p>
                  </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {plans.map((plan) => {
                       const isSelected = selectedPlan === plan.planID;
                       const isPremium = plan.planName !== 'Free';
                       
                       return (
                         <div
                           key={plan.planID}
                           className={getCardStyle(plan.planName, isSelected)}
                           onClick={() => handleGoCreatePlan()}
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
            

          {/* Get Started Button */}
          <div className="text-center mt-12">
            <button onClick={() => handleGoCreatePlan()} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 mx-auto">
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
            <button onClick={handleGoCreateInvatition} className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
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
     {/* Footer */}
<footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
      {/* Brand Section */}
      <div className="text-center md:text-left">
        <div className="flex items-center space-x-2 justify-center md:justify-start mb-4">
          <Heart className="w-8 h-8 text-pink-500" />
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Wedding Layout
          </span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          Tạo nên những khoảnh khắc đáng nhớ cho ngày trọng đại của bạn
        </p>
      </div>

      {/* Contact Info */}
      <div className="text-center md:text-left">
        <h3 className="text-lg font-semibold mb-4 text-pink-400">Liên hệ</h3>
        <div className="space-y-3">
          <a href="tel:+84123456789" className="flex items-center justify-center md:justify-start space-x-3 text-gray-300 hover:text-pink-400 transition-colors group">
            <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>+84 123 456 789</span>
          </a>
          <a href="mailto:contact@weddinglayout.com" className="flex items-center justify-center md:justify-start space-x-3 text-gray-300 hover:text-pink-400 transition-colors group">
            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>contact@weddinglayout.com</span>
          </a>
        </div>
      </div>

      {/* Social Media */}
      <div className="text-center md:text-left">
        <h3 className="text-lg font-semibold mb-4 text-pink-400">Kết nối với chúng tôi</h3>
        <div className="flex justify-center md:justify-start space-x-4">
          <a 
            href="https://zalo.me/your-zalo-id" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
            aria-label="Zalo"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.08 2.45 7.57 5.95 9.08l.45-1.88C6.21 18.03 4.5 15.24 4.5 12c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5c0 3.24-1.71 6.03-4.4 7.2l.45 1.88C18.55 19.57 21 16.08 21 12c0-5.52-4.48-10-10-10zm0 5.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/>
            </svg>
          </a>
          
               <a 
                  href="https://facebook.com/your-page" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-600/50"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                
                <a 
                  href="mailto:contact@weddinglayout.com"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-rose-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50"
                  aria-label="Email"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 pt-8">
            <div className="text-center text-gray-400 text-sm">
              © 2024 Wedding Layout. Tất cả quyền được bảo lưu.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}