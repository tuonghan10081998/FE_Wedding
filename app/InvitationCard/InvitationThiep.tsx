
import React, { useState, useEffect } from "react";
import "../Invitationpage/Invitation.css";
import '../layoutEven/layoutEven.css';
import { useSearchParams,useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import InvitionCard from "~/InvitationCard/InvitionCard";
import SaveTheDateCard1 from "~/Invitationpage/SaveTheDateCard1";
import WeddingInvitation1 from "~/Invitationpage/WeddingInvitation1";
import WeddingInvitationCard1 from "~/Invitationpage/WeddingInvitationCard1";
import SaveTheDateCard2 from "~/Invitationpage/SaveTheDateCard2";
import WeddingInvitationCard2 from "~/Invitationpage/WeddingInvitationCard2";
import WeddingInvitation2 from "~/Invitationpage/WeddingInvitation2";
import SaveTheDateCard3 from "~/Invitationpage/SaveTheDateCard3";
import WeddingInvitationCard3 from "~/Invitationpage/WeddingInvitationCard3";
import WeddingInvitation3 from "~/Invitationpage/WeddingInvitation3";
import SaveTheDateCard4 from "~/Invitationpage/SaveTheDateCard4";
import WeddingInvitation4 from "~/Invitationpage/WeddingInvitation4";
import WeddingInvitationCard4 from "~/Invitationpage/WeddingInvitationCard4";
import type { InvitationProps } from "~/Invitationpage/Invitation";
const InvitationCard: React.FC = () => {
    const navigate = useNavigate(); 
    const [searchParams] = useSearchParams();
    const handlePreview = () => {
       navigate(`/layout/Invitation?select=${select ?? false}`);
    };
    const [isThiep,setThiep] = useState<string>("")
    const thiep = searchParams.get("thiep");
    const xt = searchParams.get("xt");
    const select = searchParams.get("select");
    const id = searchParams.get("id");
    const xemthiepsave = searchParams.get("selectxt");
    const [isInvatition,setInvatition] = useState<string>("")
    const guestid = searchParams.get("guestid");
    const [isGuest,setGuest] = useState<string>("")
    const [isPhone,setPhone] = useState<string>("")
    const [isParentCount,setParentCount] = useState<number>(1)
    const[isTableName,setTableName] = useState<string>("")
    const[isMess,setMess] = useState<string>("")
    const [views, setViews] = useState<React.ReactNode[]>([]);
    const [isSave,setSave] = useState<boolean>(false)
    const [dataProject,setDataProject] = useState<any>([])
      useEffect(() => {
        switch (isThiep) {
          case "1":
            setViews([<SaveTheDateCard1 type={"SaveTheDateCard1"}/>, <WeddingInvitationCard1  type={"SaveTheDateCard1"}/>, <WeddingInvitation1 type={"SaveTheDateCard1"} />]);
            break;
          case "2":
            setViews([<SaveTheDateCard2 type={"SaveTheDateCard2"} />, <WeddingInvitationCard2 type={"SaveTheDateCard2"}/>, <WeddingInvitation2 type={"SaveTheDateCard2"}/>]);
            break;
          case "3":
            setViews([<SaveTheDateCard3 type={"SaveTheDateCard3"} />, <WeddingInvitationCard3 type={"SaveTheDateCard3"}/>, <WeddingInvitation3 type={"SaveTheDateCard3"}/>]);
            break;
          case "4":
            setViews([<SaveTheDateCard4 type={"SaveTheDateCard4"} />, <WeddingInvitationCard4 type={"SaveTheDateCard4"}/>, <WeddingInvitation4 type={"SaveTheDateCard4"}/>]);
            break;
          default:
            setViews([]);
        }
      }, [isThiep]); // chạy lại mỗi khi isThiep thay đổi
    useEffect(()=>{
      thiep && setThiep(thiep)
    },[thiep])
    const [data,setData]= useState<InvitationProps[]>([])
   useEffect(() => {
    id && setInvatition(id)
   },[id])
   useEffect(() => {
    isInvatition && getDataInvation(isInvatition)
   },[isInvatition])
  const getDataInvation = async (invitation:string) => {
    const url = `${import.meta.env.VITE_API_URL}/api/Invitation`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();

     const filtered = data.filter((x:InvitationProps) => x.invitationID === invitation)
     setData(filtered)
    } catch (error) {
        console.error(error);
    }
  };
   const getDataInvationGuest = async (guestid:string) => {
    const url = `${import.meta.env.VITE_API_URL}/api/Guest/${guestid}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      setDataProject(data)
      setGuest(data.name)
      setPhone(data.phone)
      setParentCount(data.partnerCount + 1)
      setTableName(data.tableName)
      setMess(data.message)
      const layoutData = JSON.parse(data.project.invitation.layout.toString());
      setThiep(layoutData.checkForm.toString())
      var dataInvatition = []
      dataInvatition.push(data.project.invitation)
      setData(dataInvatition)
    
    } catch (error) {
        console.error(error);
    }
  };
  useEffect(() => {
   if(!guestid) return
    
    getDataInvationGuest(guestid)
   },[guestid,isSave])
  return (
    <div id="page_loader2" className="page_loader2">
     {xt === "0" && (
      <button
        type="button"
        aria-label="Quay lại"
        className="text-gray-700 absolute top-4 left-4 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2"
        onClick={handlePreview}
      >
        <i className="fas fa-arrow-left text-2xl"></i>
      </button>
    )}
    <InvitionCard  views={views} data={data}  checkxttruoc={xemthiepsave === "true"} guestid={guestid ?? ""}
      guest={isGuest} phone={isPhone} parentcount={isParentCount} tableName={isTableName} 
       setSave={setSave} isSave={isSave} message={isMess} dataProject={dataProject}
    />
    </div>
  );
};

export default InvitationCard;
