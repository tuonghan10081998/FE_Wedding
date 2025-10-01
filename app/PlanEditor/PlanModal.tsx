
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Sparkles, Users, Layout, Edit, Trash2, Plus, X } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Plan } from '~/Plan/PlanSelection';


// Modal Component
interface PlanModalProps {
  show: boolean;
  mode: 'add' | 'edit';
  plan: Plan;
  onClose: () => void;
  onSave: (plan: Plan) => void;
  onChange: (field: keyof Plan, value: string | number) => void;
}


const PlanModal: React.FC<PlanModalProps> = ({ show, mode, plan, onClose, onSave, onChange }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex justify-between items-center sticky top-0">
          <h2 className="text-2xl font-bold">
            {mode === 'add' ? 'Thêm gói mới' : 'Chỉnh sửa gói'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên gói
              </label>
              <input
                type="text"
                value={plan.planName}
                onChange={(e) => onChange('planName', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Nhập tên gói"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giá (VNĐ)
              </label>
              <input
                type="number"
                value={plan.price}
                onChange={(e) => onChange('price', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số bố cục tối đa
              </label>
              <input
                type="number"
                value={plan.maxLayOut}
                onChange={(e) => onChange('maxLayOut', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số khách mời tối đa
              </label>
              <input
                type="number"
                value={plan.maxGuests}
                onChange={(e) => onChange('maxGuests', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số bàn tối đa
              </label>
              <input
                type="number"
                value={plan.maxTable}
                onChange={(e) => onChange('maxTable', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gửi thiệp mời
              </label>
              <select
                value={plan.sendInvitation}
                onChange={(e) => onChange('sendInvitation', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              >
                <option value={0}>Không</option>
                <option value={1}>Có</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Xuất file
              </label>
              <select
                value={plan.isExport}
                onChange={(e) => onChange('isExport', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              >
                <option value={0}>Không</option>
                <option value={1}>Có</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Hủy
            </button>
            <button
              onClick={() => onSave(plan)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              {mode === 'add' ? 'Thêm gói' : 'Lưu thay đổi'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlanModal