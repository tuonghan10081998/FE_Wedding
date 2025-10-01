import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Sparkles, Users, Layout, Edit, Trash2, Plus, X } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Plan } from '~/Plan/PlanSelection';
import PlanModal from '~/PlanEditor/PlanModal';
import DeleteModal from '~/PlanEditor/DeleteModalPlan';
import '../layoutEven/layoutEven.css'
import '../PlanEditor/admin.css'

// Main Component
const AdminPlanEditor = () => {
  const navigate = useNavigate();
  const [isUser, setUser] = useState<string | null>(null);
  const [isUserID, setUserID] = useState<string | null>("");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [planToDelete, setPlanToDelete] = useState<Plan | null>(null);
  const [currentPlan, setCurrentPlan] = useState<Plan>({
    planID: '',
    planName: '',
    price: 0,
    maxLayOut: 0,
    maxGuests: 0,
    maxTable: 0,
    sendInvitation: 0,
    isExport: 0
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("userInvitation");
    !storedUser && navigate("/");
    setUser(storedUser);
  }, []);

  const getDataUser = async () => {
    if (isUser == "") return;
    const url = `${import.meta.env.VITE_API_URL}/api/User`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      var dataUser = data.find((x: any) => x.mail === isUser);
      setUserID(dataUser.userID);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    isUser && getDataUser();
  }, [isUser]);

  const getDataPlan = async () => {
    if (isUser == "") return;
    const url = `${import.meta.env.VITE_API_URL}/api/Plan`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    isUserID && getDataPlan();
  }, [isUserID]);

  const handleOpenModal = (mode: 'add' | 'edit', plan?: Plan) => {
    setModalMode(mode);
    if (mode === 'edit' && plan) {
      setCurrentPlan(plan);
    } else {
      setCurrentPlan({
        planID: '',
        planName: '',
        price: 0,
        maxLayOut: 0,
        maxGuests: 0,
        maxTable: 0,
        sendInvitation: 0,
        isExport: 0
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPlan({
      planID: '',
      planName: '',
      price: 0,
      maxLayOut: 0,
      maxGuests: 0,
      maxTable: 0,
      sendInvitation: 0,
      isExport: 0
    });
  };

  const handleInputChange = (field: keyof Plan, value: string | number) => {
    setCurrentPlan(prev => ({
      ...prev,
      [field]: field === 'planName' ? value : Number(value)
    }));
  };

  const handleSave = async (plan: Plan) => {
    const method = modalMode === 'add' ? 'POST' : 'PUT';
    
    try {
      const request = new Request(`${import.meta.env.VITE_API_URL}/api/Plan`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plan),
      });

      let response = await fetch(request);
      let data = await response.json();
      
      if (response.status === 201 || response.status === 200) {
        toast.success(modalMode === 'add' ? "Thêm gói thành công" : "Cập nhật thành công");
        handleCloseModal();
        getDataPlan();
      } else {
        toast.warning(modalMode === 'add' ? "Thêm gói thất bại" : "Cập nhật thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  // Mở modal xóa
  const handleOpenDeleteModal = (plan: Plan) => {
    setPlanToDelete(plan);
    setShowModalDelete(true);
  };

  // Đóng modal xóa
  const handleCloseDeleteModal = () => {
    setShowModalDelete(false);
    setPlanToDelete(null);
  };

  // Xác nhận xóa
  const handleConfirmDelete = async () => {
    if (!planToDelete) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/Plan/${planToDelete.planID}`, {
        method: 'DELETE',
      });

      if (response.status === 200 || response.status === 204) {
        toast.success("Xóa gói thành công");
        handleCloseDeleteModal();
        getDataPlan();
      } else {
        toast.warning("Xóa gói thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <div className="bg-gray-50 px-2 py-2 main-admin">
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      
      <div className="mx-auto">
        <div className="mb-3 flex justify-between items-center">
          <div>
            
            <p className="text-gray-600">
              Chỉnh sửa các thông số của từng gói dịch vụ
            </p>
          </div>
          <button
            onClick={() => handleOpenModal('add')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Thêm gói mới
          </button>
        </div>

        <div className="bg-white rounded-md shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-150 border-b border-slate-200 text-black">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Tên gói</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Giá (VNĐ)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Bố cục</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Khách mời</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Số bàn</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Gửi thiệp</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Xuất file</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {plans.map((plan) => (
                  <tr key={plan.planID} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold text-gray-800">{plan.planName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      {plan.price === 0 ? 'Miễn phí' : `${Number(plan.price).toLocaleString('vi-VN')}đ`}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{plan.maxLayOut}</td>
                    <td className="px-6 py-4 text-gray-700">{plan.maxGuests}</td>
                    <td className="px-6 py-4 text-gray-700">{plan.maxTable}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {plan.sendInvitation === 1 ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {plan.isExport === 1 ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenModal('edit', plan)}
                          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(plan)}
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal chỉnh sửa/thêm gói */}
      <PlanModal
        show={showModal}
        mode={modalMode}
        plan={currentPlan}
        onClose={handleCloseModal}
        onSave={handleSave}
        onChange={handleInputChange}
      />

      {/* Modal xóa gói */}
      <DeleteModal
        show={showModalDelete}
        planName={planToDelete?.planName || ''}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteModal}
      />

    </div>
  );
};

export default AdminPlanEditor;