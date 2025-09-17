import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface ModalSaveNameInvitationProps {
  isOpen: boolean;
  onClose: () => void;
  setInvitaion:(v:string) => void
  onSaveInvatitaion:()=> void
  isNewInvitation:string
  checkUpdate:boolean
}
const ModalSaveNameInvitation: React.FC<ModalSaveNameInvitationProps> = ({ isOpen, 
  onClose,setInvitaion,onSaveInvatitaion,isNewInvitation,checkUpdate }) => {
  const handleConfirm = () => {
      if(isNewInvitation == ""){
          toast.warning("Vui lòng nhập tên thiệp cưới!")
          return
      }
      onClose();
      onSaveInvatitaion()
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-30">
        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
         
         <div className="mb-5">
              <div className="mb-2">Tên thiệp cưới </div>
              <input
                type="text"
                value={isNewInvitation}
                onChange={(e) => {
                   setInvitaion(e.target.value)
                } }
                className="w-full border border-[#CCCCCC] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder=""
              />
            </div>
          <div className="flex justify-end gap-2"> 
          <button
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            type="button"
          >
            <i className="fas fa-times mr-2"></i>
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="inline-flex items-center px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            type="button"
          >
            <i className="fa-solid fa-floppy-disk mr-2"></i>
           {checkUpdate ? "Cập nhật" : "Save"}
          </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default ModalSaveNameInvitation;
