import React from "react";

interface ConfirmDeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  guestName?: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  onClose,
  onConfirm,
  guestName,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[400px] p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Xác nhận xóa
        </h2>
        <p className="text-gray-600 mb-6">
          Bạn có chắc chắn muốn xóa khách mời{" "}
          <span className="font-medium text-red-600">
            {guestName ?? "này"}
          </span>
          ?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;