// Invitation.tsx
import React, { useState,useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import WeddingCard from "~/Invitationpage/WeddingCard";
import SaveTheDateCard1 from "~/Invitationpage/SaveTheDateCard1";
import WeddingInvitationCard1 from "~/Invitationpage/WeddingInvitationCard1";
import WeddingInvitation1 from "~/Invitationpage/WeddingInvitation1";
import WeddingCardViewer from "~/Invitationpage/WeddingCardViewer";
import { ToastContainer, toast } from "react-toastify";
import '../layoutEven/layoutEven.css';
import '../Invitationpage/Invitation.css';
import InvitationList from "~/Invitationpage/InvitationList";
import SaveTheDateCard2 from "~/Invitationpage/SaveTheDateCard2";
import WeddingInvitationCard2 from "~/Invitationpage/WeddingInvitationCard2";
import WeddingInvitation2 from "~/Invitationpage/WeddingInvitation2";
import SaveTheDateCard3 from "~/Invitationpage/SaveTheDateCard3";
import WeddingInvitationCard3 from "~/Invitationpage/WeddingInvitationCard3";
import WeddingInvitation3 from "~/Invitationpage/WeddingInvitation3";
import SaveTheDateCard4 from "~/Invitationpage/SaveTheDateCard4";
import WeddingInvitation4 from "~/Invitationpage/WeddingInvitation4";
import WeddingInvitationCard4 from "~/Invitationpage/WeddingInvitationCard4";
import WeddingCardCreate from "~/Invitationpage/WeddingCardCreate";
import type { Project } from "~/layoutEven/layoutEven";
import InvitationSender from "~/Invitationpage/InvitationSender";
import type { Guest } from '~/layoutEven/layoutEven';
import EventInvitationCard from "~/Invitationpage/EventInvitationCard ";
export interface InvitationProps {
  name: string;
  layout:Project;
  invitationID:string
  saveTheDateBG :string
  qrCode :string
  statusInvi:number
}
const Invitation = () => {
  const navigate = useNavigate();
  const [isUser, setUser] = useState<string | null>(null);
  const [isUserID, setUserID] = useState<string | null>("");
  const [searchParams] = useSearchParams();
  const select = searchParams.get("select");
  const [isModalOpenSelect, setIsModalOpenSelect] = useState(select === "true");
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [isModalOpenSent, setModalOpenSent] = useState<boolean>(false);
  // State modal viewer
  const [selectedViews, setSelectedViews] = useState<React.ReactNode[]>([]);
  const [selectedCheckForm, setSelectedCheckForm] = useState<number>(1);
  const [data,setData] = useState<Project[]>([])
  const [dataInvatition,setInvatition] = useState<InvitationProps[]>([])
  const [isCheckSave,setCheckSave] = useState<boolean>(false)
  const [dataInvatitionEdit,setInvatitionEdit] = useState<InvitationProps[]>([])
  const [guests,setGuests] = useState<Guest[]>([])
  const [isProject,setProject] = useState<string>("")
  const [planID,setPlanID] = useState<string>("")
   useEffect(() => {
      const storedUser = localStorage.getItem("userInvitation");
       !storedUser && navigate("/");
      setUser(storedUser);
  }, []);
   useEffect(()=> {
    if( !isUserID) return
      getDataProject()  
  },[isUserID])
  useEffect(() => {
      isUser && getDataUser()
  },[isUser])
   useEffect(() => {
    if( !isUserID) return
      getDataInvation()
  },[isUserID,isCheckSave])
  const getDataUser = async () => {
    if (isUser == "") return;
    const url = `${import.meta.env.VITE_API_URL}/api/User`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      var dataUser = data.find((x:any) => x.mail === isUser)
      setUserID(dataUser.userID)
      setPlanID(dataUser.planID)
    } catch (error) {
        console.error(error);
    }
  };
       // GetData
  const getDataProject = async () => {
    if (isUser == "") return;
    const url = `${import.meta.env.VITE_API_URL}/api/Project/user/${isUserID}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      setData(data)
    } catch (error) {
        console.error(error);
    }
  };
  const GetGuest = async (projectid:string) => {
    setProject(projectid)
    const url = `${import.meta.env.VITE_API_URL}/api/Guest/project/${projectid}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      console.log(data)
      if(data.length > 0)
         setGuests(data.map((x:any) => ({
          ...x,
          status:x.sentStatus === 0 ? "pending" : "sent",
        })))
    } catch (error) {
        console.error(error);
    }
  };
  const getDataInvation = async () => {
    if (isUser == "") return;
    const url = `${import.meta.env.VITE_API_URL}/api/Invitation`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();

      const filtered = data.filter((item: any) => {
        if (typeof item.layout !== "string") return false; // layout phải là string

        try {
          const layoutObj = JSON.parse(item.layout); // parse thử
          return layoutObj.userID === isUserID; // so sánh userID
        } catch (e) {
          return false;
        }
      });
     setInvatition(filtered)
    } catch (error) {
        console.error(error);
    }
  };
  const cards = [
     {
      title: "Mẫu thiệp 1",
      subtitle: "Gồm 3 mẫu thiệp",
      checkForm: 4,
      images: [
        { src: "/image/image1_6.png", alt: "Thiệp 1" },
      ],
      views: [
        <SaveTheDateCard4 width={600} height={650} type={"SaveTheDateCard4"}/>,
        <WeddingInvitationCard4 width={600} height={650} type={"WeddingInvitationCard4"}/>,
        <WeddingInvitation4 width={600} height={650} type={"WeddingInvitation4"}/>,
      
      ],
    },
    
    {
      title: "Mẫu thiệp 2",
      subtitle: "Gồm 3 mẫu thiệp",
      checkForm: 2,
      images: [
        { src: "/image/image1_5.png", alt: "Thiệp 1" },
      ],
      views: [
        <SaveTheDateCard2 width={600} height={650} type={"SaveTheDateCard2"}/>,
        <WeddingInvitationCard2 width={600} height={650} type={"WeddingInvitationCard2"}/>,
        <WeddingInvitation2 width={600} height={650} type={"WeddingInvitation2"}/>,
      
      ],
    },
    {
     title: "Mẫu thiệp 3",
      subtitle: "Gồm 3 mẫu thiệp",
      checkForm: 3,
      images: [
        { src: "/image/image1_4.png", alt: "Thiệp 1" },
      ],
      views: [
        <SaveTheDateCard3 width={600} height={650} type={"SaveTheDateCard3"}/>,
        <WeddingInvitationCard3 width={600} height={650} type={"WeddingInvitationCard3"}/>,
        <WeddingInvitation3 width={600} height={650} type={"WeddingInvitation3"}/>,
      
      ],
    },
    {
      title: "Mẫu thiệp 4",
      subtitle: "Gồm 3 mẫu thiệp",
      checkForm: 1,
      images: [
        { src: "/image/image1_1.png", alt: "Thiệp 1" },],
      views: [
        <SaveTheDateCard1 width={600} height={650} type={"SaveTheDateCard1"}/>,
        <WeddingInvitationCard1 width={600} height={650} type={"WeddingInvitationCard1"}/>,
        <WeddingInvitation1 width={600} height={650} type={"WeddingInvitation1"}/>,
      ],
    },
    
  ];
    const cardsEvent = [
     {
      title: "Mẫu Event 1",
      subtitle: "Thiệp mời sự kiện",
      checkForm: 5,
      images: [
        { src: "/image/bg_event1.jpg", alt: "Thiệp Event 1" },
      ],
      views: [
        <EventInvitationCard  width={600} height={650} type={"EventInvitationCard"} />,
      ],
    },
  ];

  // Lọc thiệp cưới và thiệp event
  const weddingInvitations = dataInvatition.filter((inva) => {
    try {
      const layoutData = typeof inva.layout === 'string' ? JSON.parse(inva.layout) : inva.layout;
      return layoutData?.checkForm >= 1 && layoutData?.checkForm <= 4;
    } catch {
      return false;
    }
  });

  const eventInvitations = dataInvatition.filter((inva) => {
    try {
      const layoutData = typeof inva.layout === 'string' ? JSON.parse(inva.layout) : inva.layout;
      return layoutData?.checkForm === 5;
    } catch {
      return false;
    }
  });

  // Khi nhấn Tạo thiệp ở card nào
 const handleCreateCardView = (checkForm: number) => {
  const allCards = [...cards, ...cardsEvent];
  const card = allCards.find(c => c.checkForm === checkForm);
  if (card) {
    setSelectedViews(card.views ?? []);
    setSelectedCheckForm(card.checkForm);
    setIsModalOpen(true);
    setInvatitionEdit([])
  } else {
    console.warn(`Không tìm thấy card với checkForm = ${checkForm}`);
  }
};
const handleDeleteInvitation = (invitationid:string) => {
    const dataDelete = dataInvatition.filter((x:InvitationProps) => x.invitationID !== invitationid)
    setInvatition(dataDelete)
    Delete(invitationid)
}
const Delete = async (projectId: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/Invitation/${projectId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok)  throw new Error(`Lỗi xoá: ${response.status}`);
    
    if (response.status === 204) {
      toast.success("Đã xoá thiệp mời");
      
    }

  } catch (error) {
    console.error("Delete error:", error);
  }
};
const handleCreateCard = (checkForm: number,invatition:string) => {
  const allCards = [...cards, ...cardsEvent];
  const card = allCards.find(c => c.checkForm === checkForm);
  if (card) {
    setSelectedViews(card.views ?? []);
    setSelectedCheckForm(card.checkForm);
    setIsModalOpen(true);
    var dataEdit = dataInvatition.filter(x => x.invitationID === invatition)
    setInvatitionEdit(dataEdit)
  } else {
    console.warn(`Không tìm thấy card với checkForm = ${checkForm}`);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
       <ToastContainer position="top-right" autoClose={2000} theme="colored" />

     {/* Progress Steps */}
     <div className="flex items-center justify-center mb-7 mt-2">
  {[
    { num: 1, label: 'Nhấn tạo thiệp' },
    { num: 2, label: 'Nhập đầy đủ thông tin 2 bên' },
    { num: 3, label: 'Lưu thiệp' }
  ].map((step, index) => (
    <React.Fragment key={step.num}>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg">
          {step.num}
        </div>
        <span className="text-sm mt-3 text-purple-700 font-semibold max-w-[120px] text-center">
          {step.label}
        </span>
      </div>
      {index < 2 && (
        <div className="flex items-center mx-4">
          <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 12H78M78 12L70 4M78 12L70 20" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="gradient" x1="0" y1="12" x2="78" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9333EA"/>
                <stop offset="1" stopColor="#DB2777"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </React.Fragment>
  ))}
</div>

   {/* Thiệp Cưới Đã Tạo */}
   <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Thiệp Cưới Đã Tạo</h1>
      <p className="text-gray-600 text-lg">Danh sách các thiệp cưới mà bạn đã tạo</p>
    </div>
   
    {weddingInvitations.length === 0 ? (
      <div className="text-center mb-18">
        <p className="text-2xl font-[roboto] text-pink-600 ">
          Bạn chưa có thiệp cưới nào cả. Hãy bắt đầu tạo một tấm thiệp thật đẹp nhé! 💌
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center mb-8">
        {weddingInvitations.map((inva, index) => {
          let layoutData: any = null;
          try {
            if (typeof inva.layout === 'string') {
              layoutData = JSON.parse(inva.layout);
            } else {
              layoutData = inva.layout;
            }
          } catch (error) {
            console.error("Parse layout error:", error);
            return null;
          }

          const card = cards.find(c => c.checkForm === layoutData?.checkForm);
          var bg = inva?.saveTheDateBG;
          bg =  bg ? `${import.meta.env.VITE_API_URL}/${bg}` : "" 
          return (
            <WeddingCardCreate
              key={inva.invitationID}
              title={inva.name || `Thiệp cưới ${index + 1}`}
              images={card?.views ?? []}
              layoutData={layoutData}
                bg={bg ?? ""}
              userID={isUserID ??""}
              onPreview={() => {
                navigate(
                  `/layout/InvitationCard?thiep=${layoutData?.checkForm}&xt=0&id=${inva.invitationID}`
                );
              }}
              onDelete={() => {
                handleDeleteInvitation(inva.invitationID);
              }}
              onCreateCard={() =>
                handleCreateCard(layoutData?.checkForm, inva.invitationID)
              }
              onSent={() => {
                GetGuest(layoutData?.projectID)
                setModalOpenSent(true)
              }}
            />
          );
        })}
      </div>
    )}

    {/* Thiệp Event Đã Tạo */}
    <div className="text-center mb-8 mt-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Thiệp Event Đã Tạo</h1>
      <p className="text-gray-600 text-lg">Danh sách các thiệp sự kiện mà bạn đã tạo</p>
    </div>
   
    {eventInvitations.length === 0 ? (
      <div className="text-center mb-18">
        <p className="text-2xl font-[roboto] text-blue-600 ">
          Bạn chưa có thiệp event nào cả. Hãy bắt đầu tạo thiệp mời sự kiện nhé! 🎉
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center mb-8">
        {eventInvitations.map((inva, index) => {
          let layoutData: any = null;
          try {
            if (typeof inva.layout === 'string') {
              layoutData = JSON.parse(inva.layout);
            } else {
              layoutData = inva.layout;
            }
          } catch (error) {
            console.error("Parse layout error:", error);
            return null;
          }
          const card = cardsEvent.find(c => c.checkForm === layoutData?.checkForm);
          var bg = inva?.saveTheDateBG;
          bg =  bg ? `${import.meta.env.VITE_API_URL}/${bg}` : "" 
          return (
            <WeddingCardCreate
              key={inva.invitationID}
              title={inva.name || `Thiệp event ${index + 1}`}
              images={card?.views ?? []}
              layoutData={layoutData}
              userID={isUserID ??""}
              checkThiep={1}
              bg={bg ?? ""}
              onPreview={() => {
                navigate(
                  `/layout/InvitationCard?thiep=${layoutData?.checkForm}&xt=0&id=${inva.invitationID}`
                );
              }}
              onDelete={() => {
                handleDeleteInvitation(inva.invitationID);
              }}
              onCreateCard={() =>
                handleCreateCard(layoutData?.checkForm, inva.invitationID)
              }
              onSent={() => {
                GetGuest(layoutData?.projectID)
                setModalOpenSent(true)
              }}
            />
          );
        })}
      </div>
    )}

      {/* Thiệp Mẫu Cưới */}
      <div className="text-center mb-8 mt-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Thiệp Mẫu Cưới</h1>
        <p className="text-gray-600 text-lg">Chọn mẫu thiệp cưới yêu thích của bạn</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center mb-8">
        {cards.map((card, index) => (
          <WeddingCard
            key={index}
            title={card.title}
            subtitle={card.subtitle}
            images={card.images}
            views={card.views}
            checkForm={card.checkForm}
            onCreateCard={() => handleCreateCardView(card.checkForm)}
          />
        ))}
      </div>

      {/* Thiệp Mẫu Event */}
      <div className="text-center mb-8 mt-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Thiệp Mẫu Event</h1>
        <p className="text-gray-600 text-lg">Chọn mẫu thiệp sự kiện phù hợp</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center mb-8">
        {cardsEvent.map((card, index) => (
          <WeddingCard
            key={index}
            title={card.title}
            subtitle={card.subtitle}
            images={card.images}
            views={card.views}
            checkForm={card.checkForm}
            onCreateCard={() => handleCreateCardView(card.checkForm)}
          />
        ))}
      </div>

      {/* Modal Viewer */}
      {isModalOpen && selectedViews.length > 0 && (
        <div className="fixed inset-0 bg-white z-50">
          <button
            type="button"
            aria-label="Quay lại"
            className="text-gray-700 absolute top-4 left-4 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2"
            onClick={() => setIsModalOpen(false)}
          >
            <i className="fas fa-arrow-left text-2xl"></i>
          </button>

          <WeddingCardViewer
                 isUserID={isUserID ?? ""}
                data={data} views={selectedViews} 
                checkForm={selectedCheckForm} 
                dataInvatitionEdit={dataInvatitionEdit}
                setCheckSave={setCheckSave}
                isCheckSave={isCheckSave}
           />
        </div>
      )}
      {isModalOpenSent && (
        <InvitationSender 
          isOpen={isModalOpenSent}
          onClose={() => setModalOpenSent(false)}
          data={guests}
          project={isProject}
          userID={isUserID ??""}
          planID={planID}
        />
      )}
    </div>
  );
};

export default Invitation;