// InvitationModal.tsx
import React, { useState } from "react";
import Select from "react-select";
import type { SingleValue } from "react-select";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom"; 
import type { InvitationProps } from "~/Invitationpage/Invitation";
import LayoutModalDelete from "~/Invitationpage/ModalDelete";
interface OptionType {
  value: string;
  label: string;
}

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCard: (id: number,invatition:string) => void;
  onEditCard?: (invitationData: InvitationProps) => void; // Thêm prop để edit
  data: InvitationProps[];
  onDelete:(invitation:string) => void
}

const InvitationModal: React.FC<InvitationModalProps> = ({ 
  isOpen, 
  onClose, 
  onCreateCard, 
  onEditCard,
  data,
  onDelete
}) => {
  const navigate = useNavigate();
   const [isOpenDelete,setOpenDelete] = useState<boolean>(false)
   const [selectedInvitation, setSelectedInvitation] = useState<any>(null);
  // Tạo option cho select
  const filterOptions: OptionType[] = data.map((inva) => ({
    value: inva.invitationID,
    label: inva.name,
  }));
  filterOptions.unshift({ value: "0", label: "Tất cả thiệp" });
  
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(
    filterOptions[0]
  );

  const handlePreview = (invitationData: InvitationProps) => {
    // Parse layout để lấy thông tin
    let layoutData;
    try {
      layoutData = typeof invitationData.layout === 'string' 
        ? JSON.parse(invitationData.layout) 
        : invitationData.layout;
    } catch (error) {
      console.error('Error parsing layout:', error);
      return;
    }
     navigate(`/layout/InvitationCard?thiep=${layoutData.checkForm}&xt=0&id=${invitationData.invitationID}&customer=&select=true`);
  };

  const handleEdit = (invitationData: InvitationProps) => {
      try {
        let layoutData;
        if (typeof invitationData.layout === 'string') {
          layoutData = JSON.parse(invitationData.layout);
        } else {
          layoutData = invitationData.layout;
        }
        
        const checkForm = layoutData.checkForm || layoutData.templateId || 1;
        onCreateCard(checkForm,invitationData.invitationID);
      } catch (error) {
      }
    
  };

  const filteredCards =
    selectedOption?.value === "0"
      ? data
      : data.filter((inva) => inva.invitationID === selectedOption?.value);
    const handleDelete = (invitation:string) => {
      onDelete(invitation)
    }
    const handleDeleteClick = (invitation: any) => {
      setSelectedInvitation(invitation);
      setOpenDelete(true);
    };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <i className="fas fa-times fa-lg"></i>
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Danh sách thiệp đã tạo
        </h2>

        <Select
          options={filterOptions}
          value={selectedOption}
          onChange={(option: SingleValue<OptionType>) => setSelectedOption(option)}
          className="mb-4"
          classNamePrefix="react-select"
          isSearchable={true}
          placeholder="Chọn thiệp để lọc..."
        />

        <ul className="space-y-4 overflow-y-auto max-h-[360px]">
           {filteredCards.map((inva) => (
            
              <li
                key={inva.invitationID}
                className="flex items-center justify-between bg-gray-100 rounded-md px-4 py-3 hover:bg-gray-200 transition-colors"
              >
                
                <div className="flex-1">
                  <span className="text-gray-700 font-medium">{inva.name}</span>
                 
                </div>
                <div className="flex space-x-1 text-gray-600">
                  <button
                    aria-label={`Xem ${inva.name}`}
                    className="hover:text-blue-600 focus:outline-none transition-colors p-2 rounded"
                    onClick={() => handlePreview(inva)}
                    title="Xem thiệp"
                  >
                    <i className="fas fa-eye fa-lg"></i>
                  </button>
                  <button
                    aria-label={`Sửa ${inva.name}`}
                    className="hover:text-green-600 focus:outline-none transition-colors p-2 rounded"
                    onClick={() => handleEdit(inva)}
                    title="Chỉnh sửa thiệp"
                  >
                    <i className="fas fa-edit fa-lg"></i>
                  </button>
                  <button
                    aria-label={`Xóa ${inva.name}`}
                    className="hover:text-red-600 focus:outline-none transition-colors p-2 rounded"
                    onClick={() => handleDeleteClick(inva)} // Thay đổi này
                    title="Xóa thiệp"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                  
                </div>
              </li>
            ))} 
        </ul>
      </div>
      {isOpenDelete && (
        <LayoutModalDelete
          isOpen={isOpenDelete}
          onClose={() => setOpenDelete(false)}
          onConfirm={() => handleDelete(selectedInvitation?.invitationID)}
          invitationname={selectedInvitation?.name}
        />
      )}
    </div>
  );
};

export default InvitationModal;