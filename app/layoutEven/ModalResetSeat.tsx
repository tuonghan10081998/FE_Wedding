import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface ModalResetSeatProps {
  isOpen: boolean;
  onClose: () => void;
  onComfirm: () => void;
}

const ModalResetSeat: React.FC<ModalResetSeatProps> = ({ isOpen, onClose, onComfirm  }) => {
   const handleComfirm = () => {
      onComfirm();
      onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-999999">
        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
          <h2 className="text-lg font-semibold mb-4">Thông báo</h2>

          <p className="mt-4 text-gray-700 leading-relaxed mb-6" >
          Bạn chắc chắn muốn reset tất cả các ghế 
        </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              onClick={handleComfirm}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default ModalResetSeat;
