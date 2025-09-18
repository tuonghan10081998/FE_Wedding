
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
    const thiep = searchParams.get("thiep");
    const xt = searchParams.get("xt");
    const select = searchParams.get("select");
    const id = searchParams.get("id");
    const xemthiepsave = searchParams.get("selectxt");
    const [isInvatition,setInvatition] = useState<string>("")
    const [views, setViews] = useState<React.ReactNode[]>(() => {
      switch (thiep) {
        case "1":
          return [<SaveTheDateCard1 />, <WeddingInvitationCard1 />, <WeddingInvitation1 />];
        case "2":
          return [<SaveTheDateCard2 />, <WeddingInvitationCard2 />, <WeddingInvitation2 />];
        case "3":
          return [<SaveTheDateCard3 />, <WeddingInvitationCard3 />,<WeddingInvitation3/>];
           case "4":
          return [<SaveTheDateCard4 />, <WeddingInvitationCard4 />,<WeddingInvitation4/>];
        default:
          return [];
      }
    });
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
    <InvitionCard  views={views} data={data}  checkxttruoc={xemthiepsave === "true"} />
    </div>
  );
};

export default InvitationCard;
