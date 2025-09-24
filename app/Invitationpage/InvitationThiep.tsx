
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
const InvitationCard: React.FC = () => {
    const navigate = useNavigate(); 
    const [searchParams] = useSearchParams();
    const handlePreview = () => {
       navigate(`/layout/Invitation?select=${select ?? false}`);
    };
    const thiep = searchParams.get("thiep");
    const user = searchParams.get("user");
    const xt = searchParams.get("xt");
    const customer = searchParams.get("customer");
     const select = searchParams.get("select");
    const [views, setViews] = useState<React.ReactNode[]>(() => {
      switch (thiep) {
        case "1":
          return [<SaveTheDateCard1 />, <WeddingInvitationCard1 />, <WeddingInvitation1 />];
        case "2":
          return [<SaveTheDateCard2 />, <WeddingInvitationCard2 />, <WeddingInvitation2 />];
        case "3":
          return [<WeddingInvitationCard1 />, <WeddingInvitation1 />];
        default:
          return [];
      }
    });
    const [data,setData]= useState<any>([])
   
    
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
    <InvitionCard  views={views} data={data} checkxttruoc={false}/>
    </div>
  );
};

export default InvitationCard;
