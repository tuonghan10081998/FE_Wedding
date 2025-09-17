import React, { useState ,useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InvitionCardProps {
  views: React.ReactNode[];
  data: any;
}

const InvitionCard: React.FC<InvitionCardProps> = ({ views, data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRSVPOpen, setIsRSVPOpen] = useState(false);
    
    // RSVP Form states
    const [rsvpName, setRsvpName] = useState("");
    const [rsvpPhone, setRsvpPhone] = useState("");
    const [rsvpGuests, setRsvpGuests] = useState("1");
    const [rsvpAttending, setRsvpAttending] = useState("yes");
    const [rsvpMessage, setRsvpMessage] = useState("");

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
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
            {isRSVPOpen && (
                <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[60]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-white w-[100%] max-w-md rounded-2xl p-6 relative shadow-2xl"
                    >
                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                        <form onSubmit={handleRSVPSubmit} className="space-y-4">
                            {/* Tên */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Họ và tên *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={rsvpName}
                                    onChange={(e) => setRsvpName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                                    placeholder="Nhập họ và tên của bạn"
                                />
                            </div>

                            {/* Số điện thoại */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    value={rsvpPhone}
                                    onChange={(e) => setRsvpPhone(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                                    placeholder="Nhập số điện thoại"
                                />
                            </div>

                            {/* Số người tham dự */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Số người tham dự *
                                </label>
                                <select
                                    required
                                    value={rsvpGuests}
                                    onChange={(e) => setRsvpGuests(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                                >
                                    <option value="1">1 người</option>
                                    <option value="2">2 người</option>
                                    <option value="3">3 người</option>
                                    <option value="4">4 người</option>
                                    <option value="5+">5+ người</option>
                                </select>
                            </div>

                            {/* Tham dự hay không */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Xác nhận tham dự *
                                </label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="yes"
                                            checked={rsvpAttending === "yes"}
                                            onChange={(e) => setRsvpAttending(e.target.value)}
                                            className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Có, tôi sẽ tham dự</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="no"
                                            checked={rsvpAttending === "no"}
                                            onChange={(e) => setRsvpAttending(e.target.value)}
                                            className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Không thể tham dự</span>
                                    </label>
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
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors resize-none"
                                    placeholder="Gửi lời chúc đến cô dâu chú rể..."
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleRSVPClose}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all transform hover:scale-105 shadow-lg"
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