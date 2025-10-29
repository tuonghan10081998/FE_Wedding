// WeddingCard.tsx
import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import LayoutModalDelete from "~/Invitationpage/ModalDelete";
interface WeddingCardCreateProps {
  title: string;
  images: React.ReactNode[];
  onCreateCard: () => void;
  onPreview:() => void;
  onDelete:() => void;
  onSent:() => void
  layoutData:any
  userID:string
}

const WeddingCardCreate: React.FC<WeddingCardCreateProps> = ({ 
    images,
    title,
    onCreateCard,
    onPreview,
    onDelete,
    onSent,
    layoutData,
    userID
}) => {
      const [isOpenDelete,setOpenDelete] = useState<boolean>(false)
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
      const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    console.log(layoutData)
    if(!layoutData) return
     setProject(layoutData.projectID)
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
  },[layoutData])
 useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    // Kiểm tra xem click có nằm trong dropdown-container không
    if (!target.closest('.dropdown-container')) {
      setIsOpen(false);
    }
  };

  if (isOpen) {
    // Delay nhỏ để tránh đóng ngay khi vừa mở
    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [isOpen]);
console.log(images)
return (
    <div className="w-full max-w-sm rounded-2xl shadow-lg bg-white p-4 relative">
      <div className="absolute right-2 top-1 text-red-500 ">
        <div className="relative">
           <button 
               onClick={() => setIsOpen(true)}
               className="hover:text-red-600 focus:outline-none transition-colors p-2 rounded cursor-pointer"
                title="Xóa thiệp" >
               <i className="fa-solid fa-ellipsis-vertical"></i>
           </button>
            {isOpen && (
              <div 
                className="dropdown-container absolute right-[0px] top-[35px] bg-white border border-gray-200 
                          rounded-lg shadow-xl min-w-[150px] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                {/* Xuất file mẫu */}
                <button 
                  className="w-full cursor-pointer flex items-center px-4 py-3 text-gray-700 
                            hover:bg-gray-50 focus:bg-gray-100 focus:outline-none transition-colors duration-200 
                            text-left text-sm group"
                  onClick={() => {
                    setOpenDelete(true)
                    setIsOpen(false);
                  }}
                >
                  <i className="fa-solid fa-trash text-[16px] mr-3 text-red-500 group-hover:text-red-600"></i>
                  <span className="font-medium">Xóa thiệp</span>
                </button>
              </div>
            )}
        </div>

      </div>
      
      <div className="h-[190px]">
        <div className="grid grid-cols-3 gap-4 absolute top-[-200px] right-[15px] left-[15px]  items-center justify-items-center "
          style={{
            transform: "scale(0.9)"
          }}>
              {images.map((View, idx) => (
                  <div
                     style={{
                        transform: "scale(0.2)"
                      }}
                      key={idx}
                      className="rounded-xl flex justify-center transform transition-transform duration-300 "
                  >
                      <div className={``} >
                          {(() => {
                              const view = View;
                            
                              if (React.isValidElement(view)) {
                                  const typeName = (view.props as any).type
                                  if (typeName === "SaveTheDateCard1" || typeName === "SaveTheDateCard2" || typeName === "SaveTheDateCard3" || typeName === "SaveTheDateCard4") {
                                      return React.cloneElement(view as React.ReactElement<{
                                          groomName?: string;
                                          brideName?: string;
                                          width?: number;
                                          height?: number;
                                          nameCutomer?:string
                                      }>,
                                      { groomName, brideName});
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
      <h3 className=" text-center font-semibold text-base text-gray-800 mb-4">{title}</h3>
    

      <div className="relative z-1 flex gap-3 justify-center">
        <button
          onClick={onPreview}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Xem lại
        </button>
        <button
          onClick={onCreateCard} // gọi callback lên cha
          className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700"
        >
          Cập nhật
        </button>
        
           <button
         onClick={onSent}
          className="px-4 py-2 rounded-lg border bg-pink-500 hover:bg-pink-600 text-white"
        >
         Gửi thiệp
        </button>
      </div>
      {isOpenDelete && (
        <LayoutModalDelete
          isOpen={isOpenDelete}
          onClose={() => setOpenDelete(false)}
          onConfirm={() => {
            onDelete();          // gọi hàm xoá thật sự
            setOpenDelete(false) // đóng modal sau khi xoá
          }}
          invitationname={title}
        />
      )}
    </div>
  );
};

export default WeddingCardCreate;
