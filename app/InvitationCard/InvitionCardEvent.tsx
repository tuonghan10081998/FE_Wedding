// InvitionCardEvent.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, Heart, XCircle, Sparkles, ArrowRight } from 'lucide-react';

interface InvitionCardEventProps {
  views: React.ReactNode[];
  data: any;
  checkxttruoc?: boolean;
  guestid?: string;
  guest?: string;
  phone?: string;
  parentcount?: number;
  tableName?: string;
  setSave?: (v: boolean) => void;
  isSave?: boolean | null;
  message?: string;
  dataProject?: any;
}

const PaymentResultModal = ({ isOpen, onClose, isSuccess }: { isOpen: boolean; onClose: () => void; isSuccess: boolean }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform animate-slideUp">
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

        <div className="p-8 text-center">
          <h2 className={`text-2xl font-bold mb-3 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {isSuccess ? 'Thanh Toán Thành Công!' : 'Thanh Toán Thất Bại'}
          </h2>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {isSuccess ? (
              <div className="flex flex-col items-center text-center space-y-3">
                <p className="text-lg font-semibold text-gray-800 mt-5">
                  Cảm ơn bạn đã đóng góp cho sự kiện
                </p>
                <p className="text-gray-600">
                  Chúng tôi rất trân trọng sự ủng hộ của bạn!
                </p>
                <div className="flex space-x-3 text-blue-500">
                  <Sparkles className="w-6 h-6" />
                  <Heart className="w-6 h-6" />
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>
            ) : (
              <>
                Rất tiếc, giao dịch của bạn không thành công. 😔
                <br />
                Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp diễn.
              </>
            )}
          </p>

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

          <div className="flex gap-3">
            {isSuccess ? (
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Đóng
              </button>
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
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 20%, 40%, 60%, 80% { transform: translateX(5px); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-bounce { animation: bounce 0.6s ease-in-out; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      `}</style>
    </div>
  );
};

const InvitionCardEvent: React.FC<InvitionCardEventProps> = ({ 
  views, 
  data, 
  checkxttruoc = false, 
  guestid,
  guest, 
  phone, 
  parentcount, 
  tableName, 
  setSave, 
  isSave, 
  message,
  dataProject 
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(checkxttruoc);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [isThankYouAcceptOpen, setIsThankYouAcceptOpen] = useState(false);
  const [isThankYouDeclineOpen, setIsThankYouDeclineOpen] = useState(false);
  
  // RSVP Form states
  const [rsvpGuests, setRsvpGuests] = useState<number>(0);
  const [rsvpAttending, setRsvpAttending] = useState("yes");
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [giftAmount, setGiftAmount] = useState<string>("");
  const [isWish, setWish] = useState<string>("");
  const [storedGuests, setstoredGuests] = useState(0);
  const [storedMessage, setstoredMessage] = useState("");
  
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    if (checkxttruoc) navigate(`/layout/Invitation`);
    else setIsOpen(false);
  };
  const handleRSVPOpen = () => setIsRSVPOpen(true);
  const handleRSVPClose = () => setIsRSVPOpen(false);
  const handleThankYouAcceptClose = () => setIsThankYouAcceptOpen(false);
  const handleThankYouDeclineClose = () => setIsThankYouDeclineOpen(false);

  // Event states
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [guestName, setGuestName] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [projectid, setProject] = useState<string>("");
  const [userID, setUserID] = useState<string>("");
  const [mapLink, setMapLink] = useState('');
  
  const [searchParams, setSearchParams] = useSearchParams();
  const resultPayment = searchParams.get("result");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!dataProject) return;
    if (!resultPayment && !storedGuests) {
      setRsvpGuests(dataProject.partnerCount + 1);
      setRsvpMessage(dataProject.message);
    } else {
      setRsvpGuests(storedGuests);
      setRsvpMessage(storedMessage);
    }
  }, [dataProject, resultPayment, storedGuests]);

  const Post = async (save: any) => {
    const request = new Request(`${import.meta.env.VITE_API_URL}/api/Guest`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(save),
    });

    let response = await fetch(request);
    if (response.status === 201 || response.status === 200) {
      handleRSVPClose();
      if (rsvpAttending === "yes") {
        setIsThankYouAcceptOpen(true);
      } else {
        setIsThankYouDeclineOpen(true);
      }
      resetRSVPForm();
      setSave?.(!isSave);
    }
  };

  const resetRSVPForm = () => {
    setRsvpGuests(parentcount ?? 0);
    setRsvpAttending("yes");
    setRsvpMessage("");
    setGiftAmount("");
  };

  const numberToVietnameseWords = (num: number): string => {
    if (num === 0) return "không đồng";
    
    const ones = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
    const teens = ["mười", "mười một", "mười hai", "mười ba", "mười bốn", "mười lăm", "mười sáu", "mười bảy", "mười tám", "mười chín"];
    
    const readGroup = (n: number): string => {
      let result = "";
      const hundred = Math.floor(n / 100);
      const ten = Math.floor((n % 100) / 10);
      const one = n % 10;
      
      if (hundred > 0) {
        result += ones[hundred] + " trăm";
        if (ten === 0 && one > 0) result += " lẻ";
      }
      
      if (ten > 1) {
        result += (result ? " " : "") + ones[ten] + " mươi";
        if (one === 1) result += " một";
        else if (one === 5) result += " lăm";
        else if (one > 0) result += " " + ones[one];
      } else if (ten === 1) {
        result += (result ? " " : "") + teens[one];
      } else if (one > 0) {
        result += (result ? " " : "") + ones[one];
      }
      
      return result.trim();
    };
    
    if (num < 20) return readGroup(num) + " đồng";
    if (num < 1000) return readGroup(num) + " đồng";
    if (num < 1000000) {
      const thousand = Math.floor(num / 1000);
      const remainder = num % 1000;
      let result = readGroup(thousand) + " nghìn";
      if (remainder > 0) result += " " + readGroup(remainder);
      return result + " đồng";
    }
    if (num < 1000000000) {
      const million = Math.floor(num / 1000000);
      const remainder = num % 1000000;
      let result = readGroup(million) + " triệu";
      if (remainder >= 1000) {
        const thousand = Math.floor(remainder / 1000);
        result += " " + readGroup(thousand) + " nghìn";
        const last = remainder % 1000;
        if (last > 0) result += " " + readGroup(last);
      } else if (remainder > 0) {
        result += " " + readGroup(remainder);
      }
      return result + " đồng";
    }
    
    const billion = Math.floor(num / 1000000000);
    const remainder = num % 1000000000;
    let result = readGroup(billion) + " tỷ";
    if (remainder >= 1000000) {
      const million = Math.floor(remainder / 1000000);
      result += " " + readGroup(million) + " triệu";
      const lastRemainder = remainder % 1000000;
      if (lastRemainder >= 1000) {
        const thousand = Math.floor(lastRemainder / 1000);
        result += " " + readGroup(thousand) + " nghìn";
        const last = lastRemainder % 1000;
        if (last > 0) result += " " + readGroup(last);
      } else if (lastRemainder > 0) {
        result += " " + readGroup(lastRemainder);
      }
    } else if (remainder > 0) {
      result += " " + readGroup(remainder);
    }
    return result + " đồng";
  };

  const handleSendGift = () => {
    if (!giftAmount || parseFloat(giftAmount) <= 0) return;
    localStorage.setItem("localrsvpGuests", rsvpGuests.toString());
    localStorage.setItem("localrsvpMessage", rsvpMessage);
    createPackagePayment(guestid ?? "", parseFloat(giftAmount), isWish);
    setGiftAmount("");
  };

  const createPackagePayment = (userId: string, amount: number, orderInfo: string) => {
    const url = `${import.meta.env.VITE_API_URL}/api/Payment/create-weddingpayment`;
    const fullUrl = `${url}?userid=${userId}&amount=${amount}&orderinfo=${encodeURIComponent(orderInfo)}`;
    window.location.href = fullUrl;
  };

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const object = {
      name: "string",
      phone: "string",
      mail: "string",
      gender: "string",
      tableID: "string",
      tableName: "string",
      seatID: "string",
      seatName: "string",
      isConfirm: rsvpAttending === "yes" ? 1 : 2,
      partnerCount: rsvpGuests - 1,
      message: rsvpMessage,
      groupName: "string",
      groupParentID: 0,
      sort: 0,
      groupID: 0,
      projectID: projectid,
      userID: userID,
      guestID: guestid
    };
    Post(object);
  };

  useEffect(() => {
    if (!data) return;
    try {
      const layoutData = JSON.parse(data[0].layout.toString());
      setProject(layoutData.projectID);
      setUserID(layoutData.userID);
      setEventName(layoutData.eventName || "");
      setEventDate(layoutData.eventDate || "");
      setEventTime(layoutData.eventTime || "");
      setEventLocation(layoutData.eventLocation || "");
      setGuestName(layoutData.guestName || "");
      setOrganizerName(layoutData.organizerName || "");
      setMapLink(layoutData.mapLink || "");
    } catch (error) {
      console.error("Parse error:", error);
    }
  }, [data]);

  const handleCloseModal = () => {
    setShowModal(false);
    searchParams.delete("result");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (resultPayment) {
      setPaymentSuccess(resultPayment === "1");
      setIsOpen(true);
      setShowModal(true);
      setIsRSVPOpen(true);
      const storedGuests = localStorage.getItem("localrsvpGuests");
      const storedMessage = localStorage.getItem("localrsvpMessage");
      setstoredGuests(parseInt(storedGuests ?? "0"));
      setstoredMessage(storedMessage ?? "");
    }
  }, [resultPayment]);

  return (
    <>
      <PaymentResultModal isOpen={showModal} onClose={handleCloseModal} isSuccess={paymentSuccess} />
      
      {/* Thiệp nhỏ (preload) - Theme Event */}
      <div className="invitation-preload-container cursor-pointer" onClick={handleOpen}>
        <div className="invitation-valentines">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            style={{
              position: "absolute",
              top: "88px",
              width: "200px",
              right: "-90px",
              zIndex: 11,
              transform: "rotate(-28deg)",
            }}
          />
          <div className="invitation-preload-envelope" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}></div>
          <div className="invitation-front">
            <img
              className="max-w-100"
              src="https://cdn-icons-png.flaticon.com/512/3094/3094837.png"
              style={{
                position: "absolute",
                top: "-37px",
                width: "91px",
                right: "-170px",
                zIndex: 11,
              }}
            />
          </div>
          <div className="invitation-preload-card">
            <div className="invitation-text">
              <p className="mt-2 mb-2">
                Kính gửi: <span>{!guest ? "" : guest}</span>
              </p>
              <p className="font-[15px]">( Nhấn vào để mở thiệp )</p>
            </div>
            <div className="invitation-preload-heart">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#667eea" className="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
            </div>
            <div className="invitation-hearts">
              <div className="invitation-one" style={{ background: '#667eea' }}></div>
              <div className="invitation-two" style={{ background: '#764ba2' }}></div>
              <div className="invitation-three" style={{ background: '#667eea' }}></div>
              <div className="invitation-four" style={{ background: '#764ba2' }}></div>
              <div className="invitation-five" style={{ background: '#667eea' }}></div>
            </div>
          </div>
          <div className="invitation-shadow"></div>
        </div>
      </div>

      {/* Modal full màn hình */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-10">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-[100%] h-[100%] overflow-auto relative p-4">
            <button
              className="absolute top-4 right-4 text-black-600 cursor-pointer hover:text-red-500 text-3xl z-10"
              onClick={handleClose}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {guestid && (
              <button
                onClick={handleRSVPOpen}
                className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 z-10"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
                <span className="font-semibold">Xác nhận tham dự</span>
              </button>
            )}

            {/* Grid hiển thị thiệp */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 h-[88vh] items-center justify-items-center">
              {views.map((View, idx) => (
                <div key={idx} className="rounded-xl flex justify-center transform transition-transform duration-300 scale-layout">
                  <div className={`scale-layout scale-layout${idx}`}>
                    {(() => {
                      const view = View;
                      if (React.isValidElement(view)) {
                        const typeName = (view.props as any).type;
                        if (typeName === "EventInvitationCard") {
                          return React.cloneElement(view as React.ReactElement<{
                            eventName?: string;
                            eventDate?: string;
                            eventTime?: string;
                            eventLocation?: string;
                            guestName?: string;
                            organizerName?: string;
                            width?: number;
                            height?: number;
                          }>, {
                            eventName,
                            eventDate,
                            eventTime,
                            eventLocation,
                            guestName: guest,
                            organizerName,
                          });
                        }
                      }
                      return view;
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal RSVP - Theme Event */}
      {isRSVPOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[20] p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white w-full max-w-2xl rounded-2xl relative shadow-2xl max-h-[95vh] flex flex-col"
          >
            {/* Header */}
            <div className="text-center p-6 pb-4 border-b border-gray-100 flex-shrink-0">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Xác nhận tham dự sự kiện</h2>
              <p className="text-gray-600">Vui lòng điền thông tin để xác nhận tham gia</p>
            </div>

            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              onClick={handleRSVPClose}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <form id="rsvpForm" onSubmit={handleRSVPSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                    <input
                      type="text"
                      required
                      value={guest}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-base"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                    <input
                      type="tel"
                      value={phone}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-base"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số người tham dự * (tính cả bạn)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="20"
                      value={rsvpGuests}
                      onChange={(e) => setRsvpGuests(parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                      placeholder="Nhập số người"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận tham dự *</label>
                    <div className="flex space-x-3 gap-3 px-4 py-1 border border-gray-300 rounded-lg">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="yes"
                          checked={rsvpAttending === "yes"}
                          onChange={(e) => setRsvpAttending(e.target.value)}
                          className="w-6 h-10 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-1 text-lg text-gray-700">Có</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="no"
                          checked={rsvpAttending === "no"}
                          onChange={(e) => setRsvpAttending(e.target.value)}
                          className="w-6 h-10 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-1 text-lg text-gray-700">Không</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bàn ngồi tại sự kiện</label>
                  <textarea
                    value={tableName}
                    readOnly
                    rows={1}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 resize-none text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lời nhắn / Ghi chú</label>
                  <textarea
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    rows={1}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition-colors resize-none text-base"
                    placeholder="Gửi lời nhắn đến ban tổ chức..."
                  />
                </div>

                {/* Phần đóng góp */}
                <div className="border-t pt-6 border-gray-200">
                  <div className="text-center mb-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center">
                      <svg className="w-6 h-6 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      Đóng góp cho sự kiện
                    </h3>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-5 rounded-xl border-2 border-blue-200 shadow-sm">
                    <div className="flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                      </svg>
                      <h4 className="text-lg font-bold text-blue-900">Gửi đóng góp</h4>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-semibold text-blue-900 mb-2">Số tiền (VNĐ)</label>
                        <input
                          type="number"
                          value={giftAmount}
                          onChange={(e) => setGiftAmount(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-base font-medium"
                          placeholder="Nhập số tiền..."
                          min="0"
                          step="10000"
                        />
                      </div>
                      
                      {giftAmount && parseFloat(giftAmount) > 0 && (
                        <div className="bg-white/60 p-3 rounded-lg border border-blue-300">
                          <p className="text-sm font-medium text-blue-900 capitalize italic">
                            {numberToVietnameseWords(parseFloat(giftAmount))}
                          </p>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                        <textarea
                          value={isWish}
                          onChange={(e) => setWish(e.target.value)}
                          rows={1}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition-colors resize-none text-base"
                          placeholder="Nội dung chuyển khoản..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-xs text-gray-500 italic">
                      🎉 Cảm ơn sự ủng hộ của bạn! 🎉
                    </p>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer Buttons */}
            <div className="border-t border-gray-100 p-6 bg-white rounded-b-2xl flex-shrink-0">
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleRSVPClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-base font-medium"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSendGift}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Gửi đóng góp</span>
                </button>
                <button
                  type="submit"
                  form="rsvpForm"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg text-base font-medium"
                >
                  Gửi xác nhận
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal Cảm ơn - Đồng ý */}
      {isThankYouAcceptOpen && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-[70] p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl"
          >
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Cảm ơn bạn!</h2>
              <p className="text-gray-600 mb-8">Chúng tôi rất vui khi bạn đến tham dự sự kiện</p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-semibold text-blue-800">Lưu ý quan trọng</span>
                </div>
                <p className="text-sm text-blue-700">
                  Vui lòng đến đúng giờ. Chúng tôi rất mong được gặp bạn trong sự kiện quan trọng này!
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={handleThankYouAcceptClose}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg hover:from-blue-500 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg text-base font-medium"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal Cảm ơn - Từ chối */}
      {isThankYouDeclineOpen && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-[70] p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl"
          >
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Cảm ơn bạn!</h2>
              <p className="text-gray-600 mb-2">Chúng tôi hiểu rằng bạn không thể tham dự được.</p>
              <p className="text-gray-600 mb-4">Cảm ơn bạn đã dành thời gian xác nhận.</p>
              
              <div className="bg-orange-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-orange-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-orange-800">Chia sẻ thông tin</span>
                </div>
                <p className="text-sm text-orange-700">
                  Chúng tôi sẽ cập nhật thông tin sự kiện để bạn có thể theo dõi. Hy vọng gặp bạn trong dịp khác!
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={handleThankYouDeclineClose}
                className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg text-base font-medium"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default InvitionCardEvent;