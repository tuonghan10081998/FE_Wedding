import { useState } from 'react';
import { X, Users, Table2, FileDown } from 'lucide-react';

interface LimitNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  limitType: 'tables' | 'guests' | 'export';
  currentCount?: number;
  maxLimit?: number;
}

const LimitNotificationModal: React.FC<LimitNotificationModalProps> = ({ 
  isOpen, 
  onClose, 
  limitType,
  currentCount = 0,
  maxLimit = 0
}) => {
  if (!isOpen) return null;

  const config = {
    tables: {
      icon: Table2,
      title: 'Đã đạt giới hạn bàn',
      message: `Gói dịch vụ của bạn chỉ cho phép tạo tối đa ${maxLimit} bàn.`,
      gradient: 'from-purple-400 via-pink-400 to-red-400',
      iconColor: 'text-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 border-purple-100',
      showCount: true
    },
    guests: {
      icon: Users,
      title: 'Đã đạt giới hạn khách mời',
      message: `Gói dịch vụ của bạn chỉ cho phép thêm tối đa ${maxLimit} khách mời.`,
      gradient: 'from-blue-400 via-cyan-400 to-teal-400',
      iconColor: 'text-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 border-cyan-100',
      showCount: true
    },
    export: {
      icon: FileDown,
      title: 'Tính năng xuất file không khả dụng',
      message: 'Gói dịch vụ của bạn không bao gồm tính năng xuất file layout.',
      gradient: 'from-green-400 via-emerald-400 to-teal-400',
      iconColor: 'text-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50 border-emerald-100',
      showCount: false
    }
  };

  const { icon: Icon, title, message, gradient, iconColor, bgGradient, showCount } = config[limitType];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      <div 
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className={`relative h-32 bg-gradient-to-br ${gradient} overflow-hidden`}>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-all duration-200"
          >
            <X size={20} />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-full blur-xl opacity-50`}></div>
              <div className="relative flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg">
                <Icon className={iconColor} size={32} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 pb-6 px-6">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
            {title}
          </h3>

          <p className="text-gray-600 text-center mb-2 leading-relaxed">
            {message}
          </p>
          <p className="text-gray-600 text-center mb-4 leading-relaxed">
            Vui lòng nâng cấp để tiếp tục sử dụng! 🚀
          </p>

          {/* Limit display - only show for tables and guests */}
          {showCount && (
            <div className={`bg-gradient-to-br ${bgGradient} rounded-xl p-4 mb-6 border`}>
              <div className="flex items-center justify-center gap-3">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {currentCount}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Đã sử dụng</div>
                </div>
                <div className="text-2xl text-gray-300 font-light">/</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-400">
                    {maxLimit}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Giới hạn</div>
                </div>
              </div>
            </div>
          )}

          {/* Feature unavailable badge for export */}
          {!showCount && (
            <div className={`bg-gradient-to-br ${bgGradient} rounded-xl p-4 mb-6 border`}>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-600">
                  Tính năng chưa được kích hoạt
                </span>
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full px-6 py-3.5 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            Đã hiểu
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

export default LimitNotificationModal