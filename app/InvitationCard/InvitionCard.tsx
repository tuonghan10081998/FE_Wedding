import React, { useState ,useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle,Heart, XCircle, Sparkles, Users, Layout, Download, ArrowRight, BarChart3, UserPlus, Utensils, FileDown, X } from 'lucide-react';

interface InvitionCardProps {
  views: React.ReactNode[];
  data: any;
  checkxttruoc?:boolean
  guestid?:string
  guest?:string
  phone?:string
  parentcount?:number
  tableName?:string
  setSave?:(v:boolean) => void
  isSave?:boolean | null
  message?:string
  dataProject?:any
}
const PaymentResultModal = ({ isOpen, onClose, isSuccess }: { isOpen: boolean; onClose: () => void; isSuccess: boolean }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30  animate-fadeIn">
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
            <div className="flex flex-col items-center text-center space-y-3">
                {/* Icon thành công */}

                <p className="text-lg font-semibold text-gray-800 mt-5">
                Cảm ơn bạn đã gửi tiền mừng  
                </p>
                <p className="text-gray-600">
                Chúng tôi rất trân trọng tấm lòng của bạn!
                </p>

                {/* Thêm icon trang trí */}
                <div className="flex space-x-3 text-pink-500">
                <Sparkles className="w-6 h-6" />
                <Heart className="w-6 h-6" />
                <Sparkles className="w-6 h-6" />
                </div>
            </div>
            </>
            ) : (
              <>
                Rất tiếc, giao dịch của bạn không thành công. 😔
                <br />
                Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp diễn.
              </>
            )}
          </p>

         
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
                  className="hidden flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
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
const InvitionCard: React.FC<InvitionCardProps> = ({ views, data,checkxttruoc = false,guestid
    ,guest,phone,parentcount,tableName,setSave,isSave,message,
    dataProject
 }) => {
     const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(checkxttruoc);
    const [isRSVPOpen, setIsRSVPOpen] = useState(false);
    // Thêm state cho 2 modal cảm ơn
    const [isThankYouAcceptOpen, setIsThankYouAcceptOpen] = useState(false);
    const [isThankYouDeclineOpen, setIsThankYouDeclineOpen] = useState(false);
    
    // RSVP Form states
    const [rsvpGuests, setRsvpGuests] = useState<number>(0);
    const [rsvpAttending, setRsvpAttending] = useState("yes");
    const [rsvpMessage, setRsvpMessage] = useState("");
    const [giftAmount, setGiftAmount] = useState<string>("");
    const [isWish, setWish] = useState<string>("");
    const [storedGuests,setstoredGuests] = useState(0)
    const [storedMessage,setstoredMessage] = useState("")
   
    
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
         if(checkxttruoc)
          navigate(`/layout/Invitation`);
        else setIsOpen(false)
    };
    const handleRSVPOpen = () => setIsRSVPOpen(true);
    const handleRSVPClose = () => setIsRSVPOpen(false);
    
    // Handlers cho modal cảm ơn
    const handleThankYouAcceptClose = () => setIsThankYouAcceptOpen(false);
    const handleThankYouDeclineClose = () => setIsThankYouDeclineOpen(false);
    const [showModal, setShowModal] = useState(false);
    const [groomName, setGroomName] = useState(""); 
    const [groomParents, setGroomParents] = useState(""); 
    const [groomMother, setGroomMother] = useState(""); 
    const [groomAddress, setGroomAddress] = useState(""); 
    const [brideName, setBrideName] = useState("");
    const [brideParents, setBrideParents] = useState("");
    const [brideMother, setBrideMother] = useState(""); 
    const [brideAddress, setBrideAddress] = useState(""); 
    const [weddingDateTime, setWeddingDateTime] = useState<string>(""); 
    const [weddingTime, setWeddingTime] = useState<string>(""); 
    const [weddingDateTimeAm, setWeddingDateTimeAm] = useState<string>("");
    const [tuGia, setTuGia] = useState("TẠI TƯ GIA NHÀ "); 
    const [weddingVenue, setWeddingVenue] = useState(""); 
    const [weddingRank, setWeddingRank] = useState("");
    const [partyDateTime, setPartyDateTime] = useState<string>(""); 
    const [partyTime, setPartyTime] = useState<string>("");
    const [partyDateTimeAm, setPartyDateTimeAm] = useState<string>(""); 
    const [partyVenue, setPartyVenue] = useState("");
    const [partyRank, setPartyRank] = useState(""); 
    const [partyAddress, setpartyAddress] = useState("");
    const [checkNhaHang,setCheckNhaHang] = useState<boolean>(true)
    const[projectid,setProject] = useState<string>(""); 
    const[userID,setUserID] = useState<string>(""); 
    const [searchParams, setSearchParams] = useSearchParams();
    const resultPayment = searchParams.get("result");
    const [paymentSuccess, setPaymentSuccess] = useState(false);

     useEffect(() => {
        if(!dataProject) return
        if(!resultPayment && !storedGuests){
            setRsvpGuests(dataProject.partnerCount + 1)
            setRsvpMessage(dataProject.message)
        }else{
             setRsvpGuests(storedGuests)
             setRsvpMessage(storedMessage)
        }
       
    },[dataProject,resultPayment,storedGuests])

    const Post = async (save: any) => {
        const request = new Request(`${import.meta.env.VITE_API_URL}/api/Guest`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(save),
        });
    
        let response = await fetch(request);
        let data = await response.json();
        if (response.status === 201 || response.status === 200) {
          handleRSVPClose();
                
          if (rsvpAttending === "yes") {
              setIsThankYouAcceptOpen(true);
          } else {
              setIsThankYouDeclineOpen(true);
          }
                
          resetRSVPForm();
          setSave?.(!isSave)
        }
    };
    
    const resetForm = () => {
        setGroomName("");
        setGroomParents("");
        setGroomMother("");
        setGroomAddress("");
        
        setBrideName("");
        setBrideParents("");
        setBrideMother("");
        setBrideAddress("");
        
        setWeddingDateTime("");
        setWeddingTime("");
        setWeddingDateTimeAm("");
        setTuGia("TẠI TƯ GIA NHÀ "); 
        setWeddingVenue("");
        setWeddingRank("");
        
        setPartyDateTime("");
        setPartyTime("");
        setPartyDateTimeAm("");
        setPartyVenue("");
        setPartyRank("");
        setpartyAddress("");
        setCheckNhaHang(true); 
    };

    const resetRSVPForm = () => {
        setRsvpGuests(parentcount ?? 0);
        setRsvpAttending("yes");
        setRsvpMessage("");
        setGiftAmount("");
    };

    // Hàm chuyển số thành chữ tiếng Việt
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
        if (!giftAmount || parseFloat(giftAmount) <= 0) {
            return;
        }
        
        const formattedAmount = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(parseFloat(giftAmount));
         localStorage.setItem("localrsvpGuests", rsvpGuests.toString()); 
         localStorage.setItem("localrsvpMessage", rsvpMessage);
        createPackagePayment(guestid ?? "",parseFloat(giftAmount),isWish)
        setGiftAmount("");
    };
     const createPackagePayment = (
        userId: string,
        amount: number,
        orderInfo: string
    ) => {
        const url = `${import.meta.env.VITE_API_URL}/api/Payment/create-weddingpayment`;
        const fullUrl = `${url}?userid=${userId}&amount=${amount}&orderinfo=${encodeURIComponent(orderInfo)}`;
        window.location.href = fullUrl;
    };

    const handleRSVPSubmit = (e: React.FormEvent) => {
        e.preventDefault();
  
        var object = {
            name: "string",
            phone: "string",
            mail: "string",
            gender: "string",
            tableID: "string",
            tableName: "string",
            seatID: "string",
            seatName: "string",
            isConfirm:rsvpAttending === "yes" ? 1 : 2,
            partnerCount: rsvpGuests - 1,
            message: rsvpMessage,
            groupName: "string",
            groupParentID: 0,
            sort: 0,
            groupID: 0,
            projectID: projectid,
            userID: userID,
            guestID: guestid
        }
        Post(object)
    };

    useEffect(() => {
        if (!data) return;
        try {
            const  layoutData = JSON.parse(data[0].layout.toString());
            setProject(layoutData.projectID)
            setUserID(layoutData.userID)
            setGroomName(layoutData.groomName || "");
            setGroomParents(layoutData.groomParents || "");
            setGroomMother(layoutData.groomMother || "");
            setGroomAddress(layoutData.groomAddress || "");
            setBrideName(layoutData.brideName || "");
            setBrideParents(layoutData.brideParents || "");
            setBrideMother(layoutData.brideMother || "");
            setBrideAddress(layoutData.brideAddress || "");
            setWeddingDateTime(layoutData.weddingDateTime || "");
            setWeddingTime(layoutData.weddingTime || "");
            setWeddingDateTimeAm(layoutData.weddingDateTimeAm || "");
            setTuGia(layoutData.tuGia || "TẠI TƯ GIA NHÀ ");
            setWeddingVenue(layoutData.weddingVenue || "");
            setWeddingRank(layoutData.weddingRank || "");
            setPartyDateTime(layoutData.partyDateTime || "");
            setPartyTime(layoutData.partyTime || "");
            setPartyDateTimeAm(layoutData.partyDateTimeAm || "");
            setPartyVenue(layoutData.partyVenue || "");
            setPartyRank(layoutData.partyRank || "");
            setpartyAddress(layoutData.partyAddress || "");
            setCheckNhaHang(layoutData.checkNhaHang ?? true);
        }catch{
            resetForm()
        }
    }, [data]);     
    const handleCloseModal = () => {
        setShowModal(false);
        // Remove result param from URL
        searchParams.delete("result");
        setSearchParams(searchParams);
    
    };
    useEffect(() => {
      if (resultPayment) {
        setPaymentSuccess(resultPayment === "1");
        setIsOpen(true)
        setShowModal(true);
        setIsRSVPOpen(true)
        const storedGuests = localStorage.getItem("localrsvpGuests");
        const storedMessage = localStorage.getItem("localrsvpMessage");
        setstoredGuests(parseInt(storedGuests ?? "0"))
        setstoredMessage(storedMessage ?? "")
       
      }
    }, [resultPayment]);
       const vietCharMap: Record<string, string> = {
            // chữ a
            "á": "a", "à": "a", "ả": "a", "ã": "a", "ạ": "a",
            "ă": "aa", "ắ": "aa", "ằ": "aa", "ẳ": "aa", "ẵ": "aa", "ặ": "aa",
            "â": "aa", "ấ": "aa", "ầ": "aa", "ẩ": "aa", "ẫ": "aa", "ậ": "aa",

            // chữ e
            "é": "e", "è": "e", "ẻ": "e", "ẽ": "e", "ẹ": "e",
            "ê": "ee", "ế": "ee", "ề": "ee", "ể": "ee", "ễ": "ee", "ệ": "ee",

            // chữ i
            "í": "i", "ì": "i", "ỉ": "i", "ĩ": "i", "ị": "i",

            // chữ o
            "ó": "o", "ò": "o", "ỏ": "o", "õ": "o", "ọ": "o",
            "ô": "oo", "ố": "oo", "ồ": "oo", "ổ": "oo", "ỗ": "oo", "ộ": "oo",
            "ơ": "oo", "ớ": "oo", "ờ": "oo", "ở": "oo", "ỡ": "oo", "ợ": "oo",

            // chữ u
            "ú": "u", "ù": "u", "ủ": "u", "ũ": "u", "ụ": "u",
            "ư": "uu", "ứ": "uu", "ừ": "uu", "ử": "uu", "ữ": "uu", "ự": "uu",

            // chữ y
            "ý": "y", "ỳ": "y", "ỷ": "y", "ỹ": "y", "ỵ": "y",

            // chữ đ
            "đ": "dd",

            // --- HOA ---
            "Á": "A", "À": "A", "Ả": "A", "Ã": "A", "Ạ": "A",
            "Ă": "AA", "Ắ": "AA", "Ằ": "AA", "Ẳ": "AA", "Ẵ": "AA", "Ặ": "AA",
            "Â": "AA", "Ấ": "AA", "Ầ": "AA", "Ẩ": "AA", "Ẫ": "AA", "Ậ": "AA",

            "É": "E", "È": "E", "Ẻ": "E", "Ẽ": "E", "Ẹ": "E",
            "Ê": "EE", "Ế": "EE", "Ề": "EE", "Ể": "EE", "Ễ": "EE", "Ệ": "EE",

            "Í": "I", "Ì": "I", "Ỉ": "I", "Ĩ": "I", "Ị": "I",

            "Ó": "O", "Ò": "O", "Ỏ": "O", "Õ": "O", "Ọ": "O",
            "Ô": "OO", "Ố": "OO", "Ồ": "OO", "Ổ": "OO", "Ỗ": "OO", "Ộ": "OO",
            "Ơ": "OO", "Ớ": "OO", "Ờ": "OO", "Ở": "OO", "Ỡ": "OO", "Ợ": "OO",

            "Ú": "U", "Ù": "U", "Ủ": "U", "Ũ": "U", "Ụ": "U",
            "Ư": "UU", "Ứ": "UU", "Ừ": "UU", "Ử": "UU", "Ữ": "UU", "Ự": "UU",

            "Ý": "Y", "Ỳ": "Y", "Ỷ": "Y", "Ỹ": "Y", "Ỵ": "Y",

            "Đ": "DD",
            };

            function replaceVietnameseChars(text: string): string {
            return text
                .split("")
                .map((ch) => vietCharMap[ch] || ch)
                .join("");
            }

       
    return (
        <>
            {/* Thiệp nhỏ (preload) */}
            <PaymentResultModal 
                isOpen={showModal} 
                onClose={handleCloseModal} 
                isSuccess={paymentSuccess} 
            />
            <div
                className="invitation-preload-container cursor-pointer"
                onClick={handleOpen}
            >
                <div className="invitation-valentines">
                    <img
                        src="https://biihappy.com/static/img/invitepro/wedding_flower.png"
                        style={{
                            position: "absolute",
                            top: "88px",
                            width: "200px",
                            right: "-90px",
                            zIndex: 11,
                            transform: "rotate(-28deg)",
                        }}
                    />
                    <div className="invitation-preload-envelope"></div>
                    <div className="invitation-front">
                        <img
                            className="max-w-100"
                            src="https://png.pngtree.com/png-clipart/20250128/original/pngtree-little-cute-bride-and-groom-clip-art-image-png-image_20351246.png"
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="#de7676"
                                className="bi bi-heart-fill"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                                ></path>
                            </svg>
                        </div>
                        <div className="invitation-hearts">
                            <div className="invitation-one"></div>
                            <div className="invitation-two"></div>
                            <div className="invitation-three"></div>
                            <div className="invitation-four"></div>
                            <div className="invitation-five"></div>
                        </div>
                    </div>
                    <div className="invitation-shadow"></div>
                </div>
            </div>

            {/* Modal full màn hình */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-10">
                    <div className="bg-[#595265] w-[100%] h-[100%]  overflow-auto relative p-4">
                        
                        {/* Nút đóng */}
                        <button
                            className="absolute top-4 right-4 text-black-600 cursor-pointer hover:text-red-500 text-3xl z-10"
                            onClick={handleClose}
                        >
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Nút xác nhận tham dự */}
                       {guestid && (<button
                            onClick={handleRSVPOpen}
                            className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 z-10"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            <span className="font-semibold">Xác nhận tham dự</span>
                        </button>)} 
                        
                        {/* Grid 3 form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[88vh] items-center justify-items-center ">
                            {views.map((View, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-xl flex justify-center transform transition-transform duration-300 scale-layout"
                                >
                                    <div className={`scale-layout scale-layout${idx}`}>
                                        {(() => {
                                            const view = View;
                                            if (React.isValidElement(view)) {
                                                const typeName = (view.props as any).type
                                                 console.log(typeName)
                                                if (typeName === "SaveTheDateCard1" || typeName === "SaveTheDateCard2" || typeName === "SaveTheDateCard3" || typeName === "SaveTheDateCard4") {
                                                    return React.cloneElement(view as React.ReactElement<{
                                                        groomName?: string;
                                                        brideName?: string;
                                                        width?: number;
                                                        height?: number;
                                                        nameCutomer?:string
                                                    }>,
                                                    { groomName, brideName, nameCutomer: guest });
                                                }
                                               
                                                else if (typeName === "WeddingInvitationCard1" || typeName === "WeddingInvitationCard2" || typeName === "WeddingInvitationCard3" || typeName === "WeddingInvitationCard4") {
                                                    return React.cloneElement(view as React.ReactElement<{
                                                        width?: number;
                                                        height?: number;
                                                        groomName?: string;
                                                        groomParents?: string;
                                                        groomMother?: string;
                                                        groomAddress?: string;
                                                        brideName?: string;
                                                        brideParents?: string;
                                                        brideMother?: string;
                                                        brideAddress?: string;
                                                        weddingTime?: string;
                                                        weddingDateTime?: string;
                                                        weddingDateTimeAm?: string;
                                                        tuGia?: string;
                                                        weddingVenue?: string;
                                                        weddingRank?:string
                                                    }>, {
                                                        groomName, groomParents, groomMother, groomAddress, brideName,
                                                        brideParents, brideMother,
                                                        brideAddress,
                                                        weddingTime, weddingDateTime,weddingDateTimeAm, tuGia,
                                                        weddingVenue,weddingRank,
                                                    });
                                                }
                                                else if (typeName === "WeddingInvitation1" || typeName === "WeddingInvitation2"|| typeName === "WeddingInvitation3"|| typeName === "WeddingInvitation4") {
                                                    return React.cloneElement(view as React.ReactElement<{
                                                        width?: number;
                                                        height?: number;
                                                        partyDateTime?:string;
                                                        partyTime?:string;
                                                        partyDateTimeAm?:string;
                                                        partyVenue?:string;
                                                        partyRank?:string;
                                                        partyAddress?:string
                                                        checkNhaHang?:boolean;
                                                    }>, {
                                                        partyDateTime,partyTime,partyDateTimeAm,
                                                        partyVenue,partyRank,partyAddress,checkNhaHang
                                                    });
                                                }
                                                return view;
                                            }
                                            return null;
                                        })()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal RSVP */}
            {(isRSVPOpen) && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[20] p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-white w-full max-w-2xl rounded-2xl relative shadow-2xl max-h-[95vh] flex flex-col"
                    >
                        {/* Header - Fixed */}
                        <div className="text-center p-6 pb-4 border-b border-gray-100 flex-shrink-0">
                            <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Xác nhận tham dự</h2>
                            <p className="text-gray-600">Vui lòng điền thông tin để xác nhận tham dự đám cưới</p>
                        </div>

                        {/* Nút đóng */}
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                            onClick={handleRSVPClose}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Form Content - Scrollable */}
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            <form id="rsvpForm" onSubmit={handleRSVPSubmit} className="space-y-6">
                                {/* Row 1: Tên và Số điện thoại */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Họ và tên *
                                        </label>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            readOnly
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-base"
                                            placeholder="Nhập số điện thoại"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Số người tham dự và Xác nhận tham dự */}
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
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-base"
                                            placeholder="Nhập số người"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Xác nhận tham dự *
                                        </label>
                                        <div className="flex space-x-3 mt-2">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    value="yes"
                                                    checked={rsvpAttending === "yes"}
                                                    onChange={(e) => setRsvpAttending(e.target.value)}
                                                    className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                                                />
                                                <span className="ml-1 text-sm text-gray-700">Có</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    value="no"
                                                    checked={rsvpAttending === "no"}
                                                    onChange={(e) => setRsvpAttending(e.target.value)}
                                                    className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                                                />
                                                <span className="ml-1 text-sm text-gray-700">Không</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                       Bàn ngồi tại tiệc
                                    </label>
                                    <textarea
                                        value={tableName}
                                        readOnly
                                        rows={1}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 resize-none text-base"
                                        placeholder=""
                                    />
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                           Lời chúc / Ghi chú
                                       </label>
                                       <textarea
                                           value={rsvpMessage}
                                           onChange={(e) => setRsvpMessage(e.target.value)}
                                           rows={1}
                                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none focus:border-pink-500 transition-colors resize-none text-base"
                                           placeholder="Gửi lời chúc đến cô dâu chú rể..."
                                       />
                                   </div>
                                {/* QR Code Section - Chỉ hiện khi đồng ý tham dự */}
                              
                                    <div className="border-t pt-6 border-gray-200">
                                        <div className="text-center mb-5">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center">
                                                <svg className="w-6 h-6 mr-2 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                                Mừng cưới cô dâu chú rể
                                            </h3>
                                            <p className="text-sm text-gray-600 hidden">Quét mã QR hoặc nhập số tiền bên dưới</p>
                                        </div>

                                        {/* QR Code và Bank Info */}
                                        <div className="flex flex-col sm:flex-row gap-5 items-center mb-5 hidden">
                                            {/* QR Code Image */}
                                            <div className="flex-shrink-0">
                                                <div className="bg-white p-3 rounded-xl border-2 border-pink-200 shadow-lg">
                                                    <img 
                                                        src="https://via.placeholder.com/150x150/000000/FFFFFF?text=QR+CODE" 
                                                        alt="QR Code chuyển khoản"
                                                        className="w-36 h-36 sm:w-40 sm:h-40 object-contain"
                                                    />
                                                </div>
                                            </div>

                                            {/* Bank Info */}
                                            <div className="flex-1 w-full bg-gradient-to-br from-pink-50 to-rose-50 p-5 rounded-xl border border-pink-200 shadow-sm">
                                                <div className="space-y-3">
                                                    <div className="flex items-start text-sm">
                                                        <svg className="w-5 h-5 mr-2 text-pink-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M4 4a2 2 0 00-2 2v1a1 1 0 001 1h.01a1 1 0 001-1V6a1 1 0 011-1h1a1 1 0 100-2H4z"/>
                                                        </svg>
                                                        <div className="flex-1">
                                                            <span className="font-semibold text-gray-700">Ngân hàng:</span>
                                                            <span className="text-gray-800 ml-2">Vietcombank</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start text-sm">
                                                        <svg className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                        </svg>
                                                        <div className="flex-1">
                                                            <span className="font-semibold text-gray-700">STK:</span>
                                                            <span className="text-gray-800 font-mono ml-2">1234567890</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start text-sm">
                                                        <svg className="w-5 h-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                                                        </svg>
                                                        <div className="flex-1">
                                                            <span className="font-semibold text-gray-700">Chủ TK:</span>
                                                            <span className="text-gray-800 ml-2">NGUYEN VAN A</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Form nhập tiền mừng */}
                                        <div className="bg-gradient-to-br from-amber-50 to-pink-50 p-5 rounded-xl border-2 border-amber-200 shadow-sm">
                                            <div className="flex items-center justify-center mb-4">
                                                <svg className="w-6 h-6 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                                                </svg>
                                                <h4 className="text-lg font-bold text-amber-900">Gửi tiền mừng</h4>
                                            </div>
                                            
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                                                        Số tiền (VNĐ)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={giftAmount}
                                                        onChange={(e) => setGiftAmount(e.target.value)}
                                                        className="w-full px-4 py-3 border-2 border-pink-300 rounded-lg  focus:ring-pink-500 focus:border-pink-500 focus:outline-none transition-all text-base font-medium"
                                                        placeholder="Nhập số tiền..."
                                                        min="0"
                                                        step="10000"
                                                    />
                                                </div>
                                                
                                                {/* Hiển thị số tiền bằng chữ */}
                                                {giftAmount && parseFloat(giftAmount) > 0 && (
                                                    <div className="bg-white/60 p-3 rounded-lg border border-amber-300">
                                                        <p className="text-sm font-medium text-amber-900 capitalize italic">
                                                            {numberToVietnameseWords(parseFloat(giftAmount))}
                                                        </p>
                                                    </div>
                                                )}
                                                  <div>
                                                 <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Nội dung
                                                    </label>
                                                  <textarea
                                                        value={isWish}
                                                        onChange={(e) => {
                                                            // const replaced = replaceVietnameseChars(e.target.value);
                                                            setWish(e.target.value);
                                                        }}
                                                        rows={1}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none focus:border-pink-500 transition-colors resize-none text-base"
                                                        placeholder="Gui loi chuc den co dau chu re..."
                                                        />
                                                </div>
                                               
                                            </div>
                                        </div>

                                        <div className="text-center mt-4">
                                            <p className="text-xs text-gray-500 italic">
                                                💝 Cảm ơn tấm lòng của bạn! 💝
                                            </p>
                                        </div>
                                    </div>
                            </form>
                        </div>

                        {/* Footer Buttons - Fixed/Sticky */}
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
                                        className=" flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white rounded-lg  shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                                    >
                                       
                                        <span>Gửi tiền mừng</span>
                                    </button>
                                <button
                                    type="submit"
                                    form="rsvpForm"
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all transform hover:scale-105 shadow-lg text-base font-medium"
                                >
                                    Gửi xác nhận
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Modal Cảm ơn - Đồng ý tham dự */}
            {isThankYouAcceptOpen && (
                <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-[70] p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-white w-full max-w-md rounded-2xl shadow-2xl"
                    >
                        {/* Header với icon thành công */}
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Cảm ơn bạn!</h2>
                            <p className="text-gray-600 mb-8">Chúng tôi rất vui khi bạn đến tham dự bữa tiệc</p>
                            
                            {/* Thông tin bổ sung */}
                            <div className="bg-pink-50 p-4 rounded-lg mb-6">
                                <div className="flex items-center justify-center mb-2">
                                    <svg className="w-5 h-5 text-pink-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-semibold text-pink-800">Lưu ý quan trọng</span>
                                </div>
                                <p className="text-sm text-pink-700">
                                    Vui lòng đến đúng giờ và mặc trang phục trang trọng. 
                                    Chúng tôi rất mong được gặp bạn trong ngày trọng đại này!
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 pt-0">
                            <button
                                onClick={handleThankYouAcceptClose}
                                className="w-full px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-lg hover:from-pink-400 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg text-base font-medium"
                            >
                                Đóng
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Modal Cảm ơn - Từ chối tham dự */}
            {isThankYouDeclineOpen && (
                <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-[70] p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-white w-full max-w-md rounded-2xl shadow-2xl"
                    >
                        {/* Header với icon thông cảm */}
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Cảm ơn bạn!</h2>
                            <p className="text-gray-600 mb-2">Chúng tôi hiểu rằng bạn không thể tham dự được.</p>
                            <p className="text-gray-600 mb-4">Cảm ơn bạn đã dành thời gian xác nhận và gửi lời chúc tốt đẹp.</p>
                            
                            {/* Thông tin bổ sung */}
                            <div className="bg-orange-50 p-4 rounded-lg mb-6">
                                <div className="flex items-center justify-center mb-2">
                                    <svg className="w-5 h-5 text-orange-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-semibold text-orange-800">Chia sẻ kỷ niệm</span>
                                </div>
                                <p className="text-sm text-orange-700">
                                    Chúng tôi sẽ chia sẻ những khoảnh khắc đẹp nhất của đám cưới với bạn. 
                                    Hy vọng sẽ có cơ hội gặp mặt bạn trong một dịp khác!
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
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

export default InvitionCard;