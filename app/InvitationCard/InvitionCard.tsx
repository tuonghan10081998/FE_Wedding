import React, { useState ,useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
interface InvitionCardProps {
  views: React.ReactNode[];
  data: any;
  checkxttruoc:boolean
}

const InvitionCard: React.FC<InvitionCardProps> = ({ views, data,checkxttruoc = false }) => {
     const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(checkxttruoc);
    const [isRSVPOpen, setIsRSVPOpen] = useState(false);
    
    // RSVP Form states
    const [rsvpName, setRsvpName] = useState("");
    const [rsvpPhone, setRsvpPhone] = useState("");
    const [rsvpGuests, setRsvpGuests] = useState("1");
    const [rsvpAttending, setRsvpAttending] = useState("yes");
    const [rsvpMessage, setRsvpMessage] = useState("");

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
         if(checkxttruoc)
          navigate(`/layout/Invitation`);
        else setIsOpen(false)
    };
    const handleRSVPOpen = () => setIsRSVPOpen(true);
    const handleRSVPClose = () => setIsRSVPOpen(false);
    
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
        setTuGia("TẠI TƯ GIA NHÀ "); // 👈 giữ nguyên mặc định
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
        setRsvpName("");
        setRsvpPhone("");
        setRsvpGuests("1");
        setRsvpAttending("yes");
        setRsvpMessage("");
    };

    const handleRSVPSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý submit form RSVP ở đây
        console.log({
            name: rsvpName,
            phone: rsvpPhone,
            guests: rsvpGuests,
            attending: rsvpAttending,
            message: rsvpMessage
        });
        
        // Hiển thị thông báo thành công
        alert("Cảm ơn bạn đã xác nhận tham dự!");
        resetRSVPForm();
        handleRSVPClose();
    };

    useEffect(() => {
        if (!data) return;
        try {
            const  layoutData = JSON.parse(data[0].layout.toString());
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

    return (
        <>
            {/* Thiệp nhỏ (preload) */}
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
                                Kính gửi: <span>Kiến Văn</span>
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
                <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
                    <div className="bg-[#595265] w-[100%] h-[100%]  overflow-auto relative p-4"
                    >
                        
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
                        <button
                            onClick={handleRSVPOpen}
                            className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 z-10"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            <span className="font-semibold">Xác nhận tham dự</span>
                        </button>
                        
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
                                                const typeName = (view.type as any).name;

                                                if (typeName === "SaveTheDateCard1" || typeName === "SaveTheDateCard2" || typeName === "SaveTheDateCard3" || typeName === "SaveTheDateCard4") {
                                                    return React.cloneElement(view as React.ReactElement<{
                                                        groomName?: string;
                                                        brideName?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>, { groomName, brideName});
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
         {/* Modal RSVP */}
                {isRSVPOpen && (
                    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[60]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-white w-[95%] max-w-2xl rounded-2xl p-8 relative shadow-2xl max-h-[95vh] overflow-y-auto"
                        >
                            {/* Header */}
                            <div className="text-center mb-6">
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
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={handleRSVPClose}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Form */}
                            <form onSubmit={handleRSVPSubmit} className="space-y-6">
                                {/* Row 1: Tên và Số điện thoại */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Họ và tên *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={rsvpName}
                                            onChange={(e) => setRsvpName(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-base"
                                            placeholder="Nhập họ và tên"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="tel"
                                            value={rsvpPhone}
                                            onChange={(e) => setRsvpPhone(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-base"
                                            placeholder="Nhập số điện thoại"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Số người tham dự và Xác nhận tham dự */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Số người tham dự *
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            max="20"
                                            value={rsvpGuests}
                                            onChange={(e) => setRsvpGuests(e.target.value)}
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

                                {/* Lời nhắn */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Lời chúc / Ghi chú
                                    </label>
                                    <textarea
                                        value={rsvpMessage}
                                        onChange={(e) => setRsvpMessage(e.target.value)}
                                        rows={1}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors resize-none text-base"
                                        placeholder="Gửi lời chúc đến cô dâu chú rể..."
                                    />
                                </div>

                                {/* QR Code Section */}
                                <div className="border-t pt-4">
                                    <div className="text-center mb-4">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-center">
                                            <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v1a1 1 0 001 1h.01a1 1 0 001-1V6a1 1 0 011-1h1a1 1 0 100-2H4zm0 8a2 2 0 00-2 2v1a1 1 0 001 1h.01a1 1 0 001-1v-1a1 1 0 011-1h1a1 1 0 100-2H4zm8-8a2 2 0 012-2h1a1 1 0 110 2h-1a1 1 0 00-1 1v1a1 1 0 11-2 0V6a2 2 0 012-2zm0 8a2 2 0 012-2h1a1 1 0 110 2h-1a1 1 0 00-1 1v1a1 1 0 11-2 0v-1a2 2 0 012-2z" clipRule="evenodd" />
                                            </svg>
                                            Quét mã QR để chuyển khoản
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4">Mừng cưới cô dâu chú rể</p>
                                    </div>

                                    {/* QR Code và Bank Info trong 1 row */}
                                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                                        {/* QR Code Image */}
                                        <div className="flex-shrink-0">
                                            <div className="bg-white p-3 rounded-xl border-2 border-gray-200 shadow-lg">
                                                <img 
                                                    src="https://via.placeholder.com/150x150/000000/FFFFFF?text=QR+CODE" 
                                                    alt="QR Code chuyển khoản"
                                                    className="w-32 h-32 sm:w-36 sm:h-36 object-contain"
                                                />
                                            </div>
                                        </div>

                                        {/* Bank Info */}
                                        <div className="flex-1 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                                            <div className="space-y-2">
                                                <div className="flex items-center text-sm">
                                                    <svg className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M4 4a2 2 0 00-2 2v1a1 1 0 001 1h.01a1 1 0 001-1V6a1 1 0 011-1h1a1 1 0 100-2H4z"/>
                                                        <path d="M4 12a2 2 0 00-2 2v1a1 1 0 001 1h.01a1 1 0 001-1v-1a1 1 0 011-1h1a1 1 0 100-2H4z"/>
                                                    </svg>
                                                    <span className="font-semibold text-gray-700 min-w-fit">Ngân hàng: </span>
                                                    <span className="text-gray-800 ml-1">Vietcombank</span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <svg className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                    </svg>
                                                    <span className="font-semibold text-gray-700 min-w-fit">STK: </span>
                                                    <span className="text-gray-800 font-mono ml-1">1234567890</span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <svg className="w-4 h-4 mr-2 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                                                    </svg>
                                                    <span className="font-semibold text-gray-700 min-w-fit">Chủ TK: </span>
                                                    <span className="text-gray-800 ml-1">NGUYEN VAN A</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center mt-3">
                                        <p className="text-xs text-gray-500">
                                            💝 Cảm ơn tấm lòng của bạn! 💝
                                        </p>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex space-x-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={handleRSVPClose}
                                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-base font-medium"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all transform hover:scale-105 shadow-lg text-base font-medium"
                                    >
                                        Gửi xác nhận
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
        </>
    );
};

export default InvitionCard;