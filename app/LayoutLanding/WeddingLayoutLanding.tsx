import { useState, useEffect } from 'react';
import { Heart, Star, Palette, Smartphone, Users, Award, ArrowRight, Play, CheckCircle, Sparkles } from 'lucide-react';

export default function WeddingLayoutLanding() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Templates Đa Dạng",
      description: "Hơn 100+ mẫu thiết kế đẹp mắt từ cổ điển đến hiện đại, phù hợp mọi phong cách đám cưới"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Responsive Design", 
      description: "Thiết kế tự động thích ứng mọi thiết bị, từ điện thoại đến máy tính, luôn hiển thị hoàn hảo"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Quản Lý Khách Mời",
      description: "Tính năng RSVP thông minh, theo dõi phản hồi khách mời và quản lý danh sách một cách dễ dàng"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      {/* <header className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-pink-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                LoveCard
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-pink-500 transition-colors">Tính năng</a>
              <a href="#templates" className="text-gray-700 hover:text-pink-500 transition-colors">Mẫu thiết kế</a>
              <a href="#pricing" className="text-gray-700 hover:text-pink-500 transition-colors">Bảng giá</a>
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                Đăng nhập
              </button>
            </nav>
          </div>
        </div>
      </header> */}

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
              <button className="group flex items-center space-x-3 text-gray-700 hover:text-pink-500 transition-colors">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Play className="w-5 h-5 text-pink-500 ml-1" />
                </div>
                <span className="font-medium">Xem demo</span>
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

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những tính năng vượt trội giúp bạn tạo ra thiệp cưới hoàn hảo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="group p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-pink-500 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-gray-100">
            {[
              { number: "10,000+", label: "Cặp đôi tin tưởng" },
              { number: "150+", label: "Mẫu thiết kế" },
              { number: "99%", label: "Khách hàng hài lòng" },
              { number: "24/7", label: "Hỗ trợ tận tâm" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-pink-500 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section id="templates" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Bộ sưu tập template đẹp mắt
            </h2>
            <p className="text-xl text-gray-600">
              Từ cổ điển thanh lịch đến hiện đại sáng tạo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Classic Rose", style: "Cổ điển", color: "from-pink-300 to-rose-300" },
              { name: "Modern Minimal", style: "Hiện đại", color: "from-purple-300 to-indigo-300" },
              { name: "Garden Party", style: "Thiên nhiên", color: "from-green-300 to-emerald-300" }
            ].map((template, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`bg-gradient-to-br ${template.color} rounded-2xl p-6 h-64 flex flex-col justify-between shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300`}>
                  <div className="flex justify-between items-start">
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white font-medium">
                      {template.style}
                    </div>
                    <Heart className="w-6 h-6 text-white/70 hover:text-white transition-colors" />
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center">
                    <h3 className="font-bold text-gray-800 mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600">Xem trước</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
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
              <span className="text-xl font-bold">LoveCard</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 LoveCard. Tất cả quyền được bảo lưu.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}