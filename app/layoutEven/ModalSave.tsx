import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface LayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  checkProject:string
  projectName:string
}

const LayoutModal: React.FC<LayoutModalProps> = ({ isOpen, onClose, onSave,checkProject ,projectName }) => {
 

  // ✅ Đặt showWarning trước khi dùng
  const showWarning = (message: string) => {
    toast(message, {
      style: {
        background: '#facc15', // Tailwind yellow-400
        color: '#1f2937',      // Tailwind gray-800
        fontWeight: 'bold',
      },
       duration: 2000
    });
  };

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

          <p className="mt-4 text-gray-700 leading-relaxed mb-6" >
            Bạn có chắc chắn muốn {checkProject === "0" ? "lưu" : "cập nhật"} dự án <span className="text-red-500 text-[18px] font-bold">{projectName}</span> này ! 
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
              Save
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default LayoutModal;
