import React, { useState } from "react";

interface DeleteListProps {
  onDelete: (e: React.MouseEvent) => void;
  onConfirm?: (newTableName:string) => void; // thêm prop confirm cho linh hoạt
}

const DeleteItems: React.FC<DeleteListProps> = ({ onDelete, onConfirm }) => {
  const [newTableName, setnewTableName] = useState<string>("");

  return (
    <div className="space-y-4">
      <div className="bg-white shadow-md rounded-lg max-w-xs w-full p-6 space-y-5">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
          Thông tin
        </h2>

        {/* Input tên bàn */}
        <div className="text-gray-700 text-lg font-medium hidden">
          <label className="block mb-2">Tên nhóm</label>
          <input
            type="text"
            value={newTableName}
            onChange={(e) => setnewTableName(e.target.value)}
            className="w-full border border-[#CCCCCC] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Nhập tên bàn"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-2 mt-6">
          <button
            onClick={(e) => onDelete(e)}
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition"
            aria-label="Xóa thông tin"
          >
            <i className="fas fa-trash-alt"></i>
            Xóa
          </button>

          {/* <button
            onClick={() => {
              onConfirm?.(newTableName ?? "")
              setnewTableName("")
            }}
            type="button"
            aria-label="Confirm"
            className="flex items-center justify-center gap-2 px-3 h-10 rounded-lg bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 transition font-semibold select-none"
            title="Confirm"
          >
            <i className="fas fa-check fa-lg"></i>
            <span className="whitespace-nowrap">Xác nhận</span>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default DeleteItems;
