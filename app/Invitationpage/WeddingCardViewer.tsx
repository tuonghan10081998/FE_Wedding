import React, { useState, useEffect } from "react";
import SaveTheDateCard1 from "~/Invitationpage/SaveTheDateCard1";
import WeddingInvitationCard1 from "~/Invitationpage/WeddingInvitationCard1";
import WeddingInvitation1 from "~/Invitationpage/WeddingInvitation1";
import WeddingFormModal from "~/Invitationpage/WeddingFormModal";
import type { Project } from "~/layoutEven/layoutEven";
import ModalSaveNameInvitation from "~/Invitationpage/ModalSaveNameInvitation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { InvitationProps } from "~/Invitationpage/Invitation";
import { useNavigate } from "react-router-dom"; 
interface WeddingCardViewerProps {
  views: React.ReactNode[];
  checkForm?:number
  data:Project[]
  isUserID:string
   dataInvatitionEdit: InvitationProps[];
   setCheckSave:(v:boolean) => void
   isCheckSave:boolean
}

const WeddingCardViewer: React.FC<WeddingCardViewerProps> = ({ views,checkForm,data,isUserID,dataInvatitionEdit,setCheckSave,isCheckSave }) => {
 const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showModalName, setShowModalName] = useState(false);
  const [userID, setUserID] = useState(isUserID);
  const [isNewInvitation, setNewInvitation] = useState("");
  const [projectID, setProjectID] = useState("");
  const [isCheckUpdate, setCheckUpdate] = useState<boolean>(false);
  const [isInvitation,setInvitation] = useState<string>("")
  // State form
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
  const [isFormData,setFormData] = useState<string>("")
    useEffect(() => {
    isUserID && setUserID(isUserID)
  },[isUserID])
  const fieldLabels: Record<string, string> = {
        projectID: "dự án",
        groomName: "Tên chú rể",
        groomParents: "Cha mẹ chú rể",
        groomMother: "Mẹ chú rể",
        groomAddress: "Địa chỉ chú rể",

        brideName: "Tên cô dâu",
        brideParents: "Cha mẹ cô dâu",
        brideMother: "Mẹ cô dâu",
        brideAddress: "Địa chỉ cô dâu",

        weddingDateTime: "Ngày giờ cưới",
        weddingTime: "Giờ cưới",
        weddingDateTimeAm: "Ngày âm cưới",
        tuGia: "Tư gia",
        weddingVenue: "Địa điểm cưới",
        // weddingRank BỎ QUA

        partyDateTime: "Ngày giờ đãi tiệc",
        partyTime: "Giờ đãi tiệc",
        partyDateTimeAm: "Ngày âm đãi tiệc",
        partyVenue: "Địa điểm đãi tiệc",
        partyAddress: "Địa chỉ đãi tiệc",
        // partyRank BỎ QUA
      };
   // Option 1: Nếu dataInvatitionEdit là single object
  useEffect(() => {
    if (!dataInvatitionEdit) return;
    try {

      const  layoutData = JSON.parse(dataInvatitionEdit[0].layout.toString());
      setInvitation(dataInvatitionEdit[0].invitationID)
      setNewInvitation(dataInvatitionEdit[0].name)
      setProjectID(layoutData.projectID || "");
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
      setCheckUpdate(true)
    }catch{
      resetForm()
    }
  }, [dataInvatitionEdit]);

  const handleSummit = (e: React.FormEvent) => {
    e.preventDefault();
  }
    const handleSave = (e: React.FormEvent) => {
      e.preventDefault();
      const formData: Record<string, any> = {
          projectID,
          groomName,
          groomParents,
          groomMother,
          groomAddress,
          brideName,
          brideParents,
          brideMother,
          brideAddress,
          weddingDateTime,
          weddingTime,
          weddingDateTimeAm,
          tuGia,
          weddingVenue,
          weddingRank,
          partyDateTime,
          partyTime,
          partyDateTimeAm,
          partyVenue,
          partyRank,
          partyAddress,
          checkNhaHang,
          checkForm,
          userID
        };

        // check từng field theo fieldLabels
        for (const key of Object.keys(fieldLabels)) {
          if (formData[key] === "") {
            toast.warning(`Vui lòng ${key === "projectID" ? "chọn" : "nhập"} ${fieldLabels[key]}`);
            return; 
          }
        }
      setShowModalName(true)
       const jsonString = JSON.stringify(formData);
       setFormData(jsonString)
  }
  const handleSaveInvitation = () => {
    const object = {
            name: isNewInvitation,
            layout: isFormData,
            projectID: projectID,
            invitationID:isInvitation
        }
        PostInvitation(object)
  }
   const PostInvitation = async (save: any) => {
    const request = new Request(`${import.meta.env.VITE_API_URL}/api/Invitation`, {
      method:  isCheckUpdate ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(save), // 👈 stringify object Save
    });

    let response = await fetch(request);
    let data = await response.json();
     if (response.status === 201 || response.status === 200) {
        //  !isCheckUpdate &&  resetForm()
         toast.success(` ${isCheckUpdate ? "Cập nhật" : "Lưu"} thiệp thành công`)
         setCheckSave(!isCheckSave)
         console.log(data.invitationID)
       isCheckUpdate &&  navigate(`/layout/InvitationCard?thiep=${checkForm}&xt=0&id=${isInvitation}&customer=&selectxt=true`);
        !isCheckUpdate && navigate(`/layout/InvitationCard?thiep=${checkForm}&xt=0&id=${data.invitationID}&customer=&selectxt=true`);
     }
  };
     const resetForm = () => {
            setNewInvitation("");
            setInvitation("");
            setProjectID("");
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
            setCheckNhaHang(true); // 👈 giữ nguyên mặc định
            setCheckUpdate(false)
          };
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Display */}
         <ToastContainer position="top-right" autoClose={1500} theme="colored" />
       <div className="flex gap-3 justify-center mt-4" style={{position: "absolute",
    top: "0",
    right: "156px",}}>
        <button
          type="button"
          aria-label="Lưu thiệp"
          className="flex items-center space-x-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-1 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSave}
        >
          <i className="fas fa-save text-lg"></i>
          <span>{isCheckUpdate ? "Cập nhật" : "Lưu"} thiệp</span>
        </button>

        {/* Input Information Icon Only */}
        <button
          type="button"
          aria-label="Nhập thông tin"
          className="text-green-600 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 rounded p-2"
       
        onClick={() => setShowModal(true)}>
          <i className="fas fa-edit text-2xl"></i>
        </button>
      
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-4xl max-h-full relative w-full h-full">
          <div
            className="flex items-center justify-center w-full h-full overflow-hidden relative"
            style={{ transform: `scale(${zoom})` }}
          >
            {(() => {
                const view = views[currentIndex];
                if (React.isValidElement(view)) {
                  const typeName = (view.type as any).name;

                  if (typeName === "SaveTheDateCard1" || typeName === "SaveTheDateCard2" || typeName === "SaveTheDateCard3" || typeName === "SaveTheDateCard4") {
                    return React.cloneElement(view as React.ReactElement<{
                      groomName?: string;
                      brideName?: string;
                      width?: number;
                      height?: number;
                    }>, { groomName, brideName, width: 600, height: 650 });
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
                      weddingVenue,weddingRank, width: 600, height: 650,
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
                      partyDateTime,partyTime,width: 600, height: 650,partyDateTimeAm,
                      partyVenue,partyRank,partyAddress,checkNhaHang
                    });
                   }
                  return view;
                 
                }
                return null;
              })()}
          </div>

          {/* Zoom Slider */}
          <div className="absolute bottom-0 left-0 right-0 p-3 hidden">
            <div className="bg-black bg-opacity-70 rounded-xl px-4 py-2 flex items-center space-x-3 w-full">
              <span className="text-white text-sm">🔍</span>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-white text-xs">{Math.round(zoom * 100)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
    <div className="w-[150px] p-4 flex flex-col justify-start space-y-4 bg-white bg-opacity-50"
    style={{alignItems:"center"}}>
       <div  style={{
            display: "flex",
            justifyContent: "flex-start", // 👈 tương ứng với justify-content: start
            alignItems: "center",
            flexDirection: "column",
            gap: "38px",
            overflow: "auto",
            height: "100vh",
          }}>
        {views.map((view, i) => {
           let element = view;

            if (React.isValidElement(view)) {
              const typeName = (view.type as any).name;

              if (typeName === "SaveTheDateCard1" || typeName === "SaveTheDateCard2" || typeName === "SaveTheDateCard3" || typeName === "SaveTheDateCard4") {
                element = React.cloneElement(view as React.ReactElement<{
                  groomName?: string;
                  brideName?: string;
                  width?: number;
                  height?: number;
                }>, {
                  groomName,
                  brideName,
                  width: 600,
                  height: 650,
                });
              }
              else if (typeName === "WeddingInvitationCard1" || typeName === "WeddingInvitationCard2" || typeName === "WeddingInvitationCard3" || typeName === "WeddingInvitationCard4") {
                element = React.cloneElement(view as React.ReactElement<{
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
                }>, {
                  groomName,groomParents, groomMother,groomAddress,
                  brideName, brideParents, brideMother,
                  brideAddress, weddingTime, weddingDateTime, weddingDateTimeAm,
                  tuGia, weddingVenue, width: 600, height: 650,
                });
              }
               else if (typeName === "WeddingInvitation1" || typeName === "WeddingInvitation2"|| typeName === "WeddingInvitation3"|| typeName === "WeddingInvitation4") {
                element = React.cloneElement(view as React.ReactElement<{
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
                      partyDateTime,partyTime,width: 600, height: 650,partyDateTimeAm,
                      partyVenue,partyRank,partyAddress,checkNhaHang
                });
              }
            }

            return (
              <div
                key={i}
                onClick={() => setCurrentIndex(i)}
                style={{
                  transform: "scale(0.2)", // 👈 scale cho thumbnail
                  height: "100px",
                  cursor: "pointer"
                }}
              >
                {element}
              </div>
            );
          })}
       </div>
      </div>
     {showModal && (
          <WeddingFormModal
            onClose={() => setShowModal(false)}
            groomName={groomName}
            setGroomName={setGroomName}
            groomParents={groomParents}
            setGroomParents={setGroomParents}
            groomMother={groomMother}
            setGroomMother={setGroomMother}
            groomAddress={groomAddress}
            setGroomAddress={setGroomAddress}
            brideName={brideName}
            setBrideName={setBrideName}
            brideParents={brideParents}
            setBrideParents={setBrideParents}
            brideMother={brideMother}
            setBrideMother={setBrideMother}
            brideAddress={brideAddress}
            setBrideAddress={setBrideAddress}
            weddingDateTime={weddingDateTime}
            setWeddingDateTime={setWeddingDateTime}
            weddingDateTimeAm={weddingDateTimeAm}
            setWeddingDateTimeAm={setWeddingDateTimeAm}  // ← check đây
            weddingVenue={weddingVenue}
            setWeddingVenue={setWeddingVenue}
            partyDateTime={partyDateTime}
            setPartyDateTime={setPartyDateTime}
            partyDateTimeAm={partyDateTimeAm}
            setPartyDateTimeAm={setPartyDateTimeAm}
            partyVenue={partyVenue}
            setPartyVenue={setPartyVenue}
            weddingTime={weddingTime}
            setWeddingTime={setWeddingTime}
            tuGia={tuGia}
            setTuGia={setTuGia}
            partyTime={partyTime}
            setPartyTime={setPartyTime}
            weddingRank={weddingRank}
            setWeddingRank={setWeddingRank}
            partyRank={partyRank}
            setPartyRank={setPartyRank}
            checkNhaHang={checkNhaHang}
            setCheckNhaHang={setCheckNhaHang}
            partyAddress={partyAddress}
            setpartyAddress={setpartyAddress}
            data={data}
            setProjectID={setProjectID}
            projectID={projectID}
            onSummit={handleSummit} // <-- chắc chắn đây là function
          />
        )}
        {showModalName && (
             <ModalSaveNameInvitation 
              setInvitaion={setNewInvitation} 
              isOpen={showModalName} 
              onClose={() => setShowModalName(false)} 
              onSaveInvatitaion={handleSaveInvitation}
              isNewInvitation={isNewInvitation}
              checkUpdate={isCheckUpdate}
              />
        )}
    </div>
  );
};

export default WeddingCardViewer;
