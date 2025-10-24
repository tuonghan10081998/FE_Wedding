import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface ModalNotiGuestProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  Noti:string
}

const ModalNotiGuest: React.FC<ModalNotiGuestProps> = ({ isOpen, onClose, onSave,Noti  }) => {
 
  const handleSave = () => {
      onSave();
      onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-999999">
        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
          <h2 className="text-lg font-semibold mb-4">Thông báo</h2>

          <p className="mt-4 text-gray-700 leading-relaxed mb-2" >
          ⚠️ Các bàn sau đang có khách mời: {Noti}
          </p>
           <p className="mt-4 text-gray-700 leading-relaxed mb-6" >
           Bạn có muốn xóa không 
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Đồng ý
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default ModalNotiGuest;
