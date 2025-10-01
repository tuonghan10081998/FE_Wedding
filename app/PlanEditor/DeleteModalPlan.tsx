import React, { useState, useEffect } from 'react';

import { CheckCircle, XCircle, Sparkles, Users, Layout, Edit, Trash2, Plus, X } from 'lucide-react';


//Delete Confirmation Modal Component
interface DeleteModalProps {
  show: boolean;
  planName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ show, planName, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Xác nhận xóa gói
          </h3>
          
          <p className="text-gray-600 text-center mb-6">
            Bạn có chắc chắn muốn xóa gói <span className="font-semibold text-gray-900">"{planName}"</span>?
            <br />
            <span className="text-sm text-red-600 mt-2 block">Hành động này không thể hoàn tác!</span>
          </p>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal