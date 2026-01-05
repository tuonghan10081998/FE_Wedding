import React from 'react';

interface TutorialGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const TutorialGuide: React.FC<TutorialGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

 const sections = [
   {
      title: '🖱️ PHẦN 1: KÉO THẢ & SẮP XẾP',
      steps: [
        {
          number: 1,
          title: 'Kéo thả đối tượng',
          description: 'Di chuyển sân khấu, cổng hoa, bàn ghế theo ý muốn',
          details: [
            'Click và giữ chuột vào đối tượng',
            'Kéo đến vị trí mong muốn',
            'Thả chuột để đặt đối tượng',
            'Sắp xếp lại bất cứ lúc nào'
          ]
        },
        {
          number: 2,
          title: 'Kéo khách vào ghế',
          description: 'Xếp khách mời vào từng ghế cụ thể',
          details: [
            'Mở danh sách khách mời',
            'Click giữ tên khách từ danh sách',
            'Kéo và thả vào ghế trên sơ đồ',
            'Khách sẽ được gán vào bàn/ghế đó'
          ]
        },
        {
          number: 3,
          title: 'Di chuyển khách giữa các ghế',
          description: 'Thay đổi vị trí ngồi của khách',
          details: [
            'Click vào khách đã ngồi trên sơ đồ',
            'Kéo sang ghế khác',
            'Thả để chuyển vị trí',
            'Hoặc kéo ra ngoài để bỏ ghế'
          ]
        },
        {
          number: 4,
          title: 'Lưu layout - QUAN TRỌNG!',
          description: 'Nhấn nút LƯU để không mất dữ liệu',
          details: [
            '⚠️ Phải nhấn LƯU sau mỗi lần thay đổi',
            'Tìm nút "Lưu" trên thanh công cụ',
            'Lưu thường xuyên để tránh mất dữ liệu',
            'Nên lưu ngay khi xong 1 phần công việc'
          ]
        }
      ]
    },
    {
      title: '📋 PHẦN 2: TẠO SƠ ĐỒ BÀN GHẾ',
      steps: [
        {
          number: 1,
          title: 'Tạo đối tượng',
          description: 'Nhấn nút "Tạo layout" hoặc "Thêm đối tượng"',
          details: ['Click "Tạo layout" trên thanh công cụ', 'Hoặc "Thêm đối tượng" để thêm nhiều']
        },
        {
          number: 2,
          title: 'Chọn loại đối tượng',
          description: 'Chọn Sân khấu, Cổng hoa hoặc Bàn ghế',
          details: ['🎭 Sân khấu: Nơi diễn ra nghi lễ', '🚪 Cổng hoa: Lối vào', '🪑 Bàn ghế: Chỗ ngồi khách']
        },
        {
          number: 3,
          title: 'Chọn bên',
          description: 'Chọn Cô dâu, Chú rể hoặc Khách',
          details: ['👰 Cô dâu: Nhà gái', '🤵 Chú rể: Nhà trai', '👥 Khách: Khách chung/VIP']
        },
        {
          number: 4,
          title: 'Nhập dãy và SL bàn',
          description: 'Thiết lập số dãy và tổng số bàn (chỉ khi chọn Bàn ghế)',
          details: ['Dãy: Số hàng (VD: 3 dãy)', 'SL bàn: Tổng số (VD: 10 bàn)']
        },
        {
          number: 5,
          title: 'Chọn vị trí',
          description: 'Chọn Trái (bên cô dâu) hoặc Phải (bên chú rể)',
          details: ['← Trái: Bên trái sân khấu', '→ Phải: Bên phải sân khấu']
        },
        {
          number: 6,
          title: 'Chọn kiểu bàn',
          description: 'Chọn hình dạng: Tròn, Vuông, Ghế dài hoặc Ghế đơn',
          details: ['⭕ Tròn: 10-12 người', '⬜ Vuông/Chữ nhật', '▬ Ghế dài', '● Ghế đơn: 1 người']
        },
        {
          number: 7,
          title: 'Hoàn tất',
          description: 'Nhấn "Hoàn tất" và kéo thả để sắp xếp',
          details: ['Click "Hoàn tất" để tạo', 'Kéo thả để di chuyển', 'Click để chỉnh sửa/xóa']
        }
      ]
    },
    {
      title: '👥 PHẦN 3: QUẢN LÝ KHÁCH MỜI',
      steps: [
        {
          number: 1,
          title: 'Mở danh sách khách',
          description: 'Nhấn nút "Khách mới" trên thanh công cụ',
          details: ['Hiển thị modal "Danh sách khách mời"', 'Có 3 tab: Tất cả, Đã có ghế, Chưa có ghế']
        },
        {
          number: 2,
          title: 'Chọn bên và nhóm',
          description: 'Chọn bên Cô dâu, Chú rể hoặc Khách từ dropdown "Chọn bên (*)"',
          details: ['Dropdown hiển thị các nhóm đã tạo', 'Mỗi bên có thể có nhiều nhóm khác nhau']
        },
        {
          number: 3,
          title: 'Import khách từ file',
          description: 'Nhấn "File mẫu import khách" để tải file Excel mẫu',
          details: [
            'Tải file mẫu về máy',
            'Điền thông tin: Tên, SĐT, Giới tính, Nhóm',
            'Nhấn "📄 Nhập khách mới" để chọn file đã điền',
            'Hệ thống tự động import danh sách khách'
          ]
        },
        {
          number: 4,
          title: 'Thêm khách thủ công',
          description: 'Nhấn "👤 Thêm khách mới" để nhập từng khách',
          details: [
            'Điền Tên, SĐT, Giới tính',
            'Chọn Nhóm (VD: Nhóm chú rể bc, Nhóm chú rể)',
            'Nhấn nút ➕ màu xanh để đưa khách vào ghế đang được click'
          ]
        },
        {
          number: 5,
          title: 'Xuất file khách mời',
          description: 'Xuất danh sách khách ra file Excel',
          details: [
            'Nhấn "Xuất file khách mời": Xuất tất cả khách',
            'Hoặc "📄 Xuất file import khách mời": File có định dạng để import lại'
          ]
        },
        {
          number: 6,
          title: 'Chia tự động khách',
          description: 'Tự động phân bổ khách vào bàn',
          details: [
            'Chọn nhóm cần chia từ dropdown',
            'Nhấn "✓ Chia tự động"',
            'Hệ thống tự động xếp khách theo: Nhóm → Dãy → Vị trí',
            'Ưu tiên: Cùng nhóm ngồi cùng bàn'
          ]
        },
        {
          number: 7,
          title: 'Reset ghế',
          description: 'Xóa tất cả khách khỏi bàn để sắp xếp lại',
          details: [
            'Nhấn "🔄 Reset ghế"',
            'Tất cả khách sẽ chuyển sang trạng thái "Chưa có ghế"',
            'Dùng khi muốn phân bổ lại từ đầu'
          ]
        },
        {
          number: 8,
          title: 'Xóa khách',
          description: 'Xóa khách khỏi danh sách',
          details: [
            'Nhấn nút 🗑️ màu đỏ ở cuối mỗi dòng',
            'Khách bị xóa sẽ mất khỏi hệ thống',
            'Cẩn thận khi xóa!'
          ]
        }
      ]
    },
   
    {
      title: '🎯 PHẦN 4: KHOANH VÙNG NHÓM',
      steps: [
        {
          number: 1,
          title: 'Bắt đầu khoanh vùng',
          description: 'Giữ phím Ctrl và kéo chuột để tạo vùng',
          details: [
            'Giữ phím Ctrl trên bàn phím',
            'Nhấn giữ chuột trái và kéo',
            'Thả chuột để hoàn thành vùng',
            'Vùng sẽ tự động bao quanh các bàn trong khu vực'
          ]
        },
        {
          number: 2,
          title: 'Đặt tên vùng',
          description: 'Đổi tên vùng để dễ nhận biết',
          details: [
            'Click vào vùng vừa tạo',
            'Chọn "Đổi tên vùng"',
            'Nhập tên mới (VD: "Khu VIP", "Nhóm họ hàng")',
            'Tên sẽ hiển thị ở góc vùng'
          ]
        },
        {
          number: 3,
          title: 'Đổi màu vùng',
          description: 'Thay đổi màu để phân biệt các nhóm',
          details: [
            'Click vào vùng cần đổi màu',
            'Chọn "Đổi màu vùng"',
            'Chọn màu từ bảng màu',
            'Màu giúp phân biệt các khu vực rõ ràng hơn'
          ]
        },
        {
          number: 4,
          title: 'Xóa vùng',
          description: 'Xóa vùng không cần thiết',
          details: [
            'Click vào vùng muốn xóa',
            'Chọn "Xóa vùng"',
            'Vùng sẽ bị xóa nhưng bàn ghế vẫn giữ nguyên',
            'Có thể tạo vùng mới bất cứ lúc nào'
          ]
        }
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="text-white">
            <h2 className="text-xl font-bold">📖 Hướng dẫn sử dụng</h2>
            <p className="text-sm opacity-90">Tạo sơ đồ tiệc cưới & quản lý khách mời</p>
          </div>
          <button
            onClick={() => onClose()}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {sections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-6">
              {/* Section Title */}
              <h3 className={`text-lg font-bold text-gray-800 mb-3 pb-2 border-b-2 ${
                section.title.includes('PHẦN 1') ? 'border-red-500' : 'border-blue-500'
              }`}>
                {section.title}
                {section.title.includes('PHẦN 1') && (
                  <span className="ml-2 text-sm text-red-600 font-normal">⚠️ QUAN TRỌNG!</span>
                )}
              </h3>

              {/* Steps in 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.steps.map((step, stepIdx) => (
                  <div
                    key={stepIdx}
                    className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm leading-tight">
                          {step.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>

                    {/* Details */}
                    <ul className="ml-11 space-y-1">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-1 text-xs text-gray-700">
                          <span className="text-blue-500 mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Tips */}
          <div className="mt-6 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span>💡</span> Mẹo sử dụng
            </h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Tạo sân khấu và cổng hoa trước để định hướng</li>
              <li>• Dùng file Excel để import hàng loạt khách nhanh hơn</li>
              <li>• <strong className="text-red-600">⚠️ Nhớ nhấn LƯU sau mỗi lần kéo thả và sắp xếp!</strong></li>
              <li>• Kéo thả trực tiếp khách vào ghế nhanh hơn chia tự động</li>
              <li>• Chia tự động sẽ ưu tiên xếp cùng nhóm ngồi gần nhau</li>
              <li>• Khoanh vùng giúp tổ chức bàn ghế theo khu vực rõ ràng</li>
              <li>• Dùng màu sắc khác nhau cho từng vùng để dễ phân biệt</li>
              <li>• Lưu layout thường xuyên để tránh mất dữ liệu</li>
              <li>• Nhấn nút ? góc dưới để xem lại hướng dẫn</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={() => onClose()}
            className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            ✓ Đã hiểu, bắt đầu sử dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialGuide;