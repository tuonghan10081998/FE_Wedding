import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface LayoutModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  invitationname:string | undefined
}

const LayoutModalDelete: React.FC<LayoutModalDeleteProps> = ({ isOpen, onClose, onConfirm,invitationname }) => {
 
  const handleConfirm = () => {
       onClose();
       onConfirm();
  };


  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-30">
        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
         
          <p className="mt-4 text-gray-700 leading-relaxed mb-6" >
            Bạn có chắc chắn xoá  <span className="text-red-500 text-[18px] font-bold">{invitationname ??""}</span> này ! 
        </p>
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
            <i className="fas fa-trash-alt mr-2"></i>
            Delete
          </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default LayoutModalDelete;
