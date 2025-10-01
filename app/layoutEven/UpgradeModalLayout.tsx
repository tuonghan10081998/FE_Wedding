import { useState } from 'react';
import { AlertTriangle, X, Sparkles, ArrowRight } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      {/* Backdrop với hiệu ứng blur */}
      <div 
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />
      
      {/* Modal với animation */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scaleIn">
        {/* Gradient Header */}
        <div className="relative h-32 bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-all duration-200"
          >
            <X size={20} />
          </button>

          {/* Icon */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-xl opacity-50"></div>
              <div className="relative flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg">
                <AlertTriangle className="text-orange-500" size={32} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-12 pb-6 px-6">
          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            Giới hạn sử dụng
          </h3>

          {/* Message */}
          <p className="text-gray-600 text-center mb-6 leading-relaxed">
            Bạn đã sử dụng hết quyền tạo layout trong gói dịch vụ của bạn. 
            <span className="block mt-2 font-medium text-gray-700">
              Vui lòng nâng cấp để tiếp tục sử dụng! 🚀
            </span>
          </p>

          {/* Feature hints */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-100">
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <Sparkles className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
              <span>Nâng cấp ngay để mở khóa <strong>không giới hạn</strong> layout và nhiều tính năng cao cấp khác</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onUpgrade}
              className="group relative px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="flex items-center justify-center gap-2">
                Xem gói dịch vụ
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200"
            >
              Để sau
            </button>
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
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
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
export default UpgradeModal