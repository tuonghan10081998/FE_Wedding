import React, { useState, useEffect } from "react";
import type { Guest } from "~/layoutEven/layoutEven";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (guest: Guest) => void;
  initialData?: Guest; // dùng để update
  table:Guest[]
  parentgroupid:string | undefined
}

const GuestModal: React.FC<GuestModalProps> = ({ isOpen, onClose, onSave, initialData,table,parentgroupid}) => {
const [formData, setFormData] = useState<Guest>(
  initialData || {
    guestID: "",
    name: "",
    phone: "",
    seatID: null,
    gender: "Nam",
    qr: "",
    groupID: 1,
    isActive: true,
    groupInfo: {
      parentID: parseInt(parentgroupid ?? "0"),
      groupName:`Nhóm`
    }
  }
);

// useEffect
useEffect(() => {
  if (isOpen) {
    setFormData(
      initialData || {
        guestID: uuidv4(),
        name: "",
        phone: "",
        seatID: null,
        gender: "Nam",
        qr: "",
        groupID: 1,
        isActive: true,
        groupInfo: {
          parentID: parseInt(parentgroupid ?? "0"),
          groupName:`${formData.groupInfo?.groupName}`
        }
      }
    );
  }
}, [isOpen, initialData, parentgroupid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "nhom" ? Number(value) : value, // ép kiểu number cho nhóm
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const exists = table.some((g) => g.phone === formData.phone);

    if (exists) {
       toast.warning(`Số điện thoại đã tồn tại`,);
        return; 
    }
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50  flex items-center justify-center z-50"
      
    >
      <div className="bg-white rounded-lg shadow-lg w-96 max-w-full p-6 relative">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {initialData ? "Cập nhật khách mời" : "Thêm khách mời"}
        </h2>
  <ToastContainer position="top-right" autoClose={2000} theme="colored" />
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên khách mời */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên khách mời
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Giới tính */}
          <fieldset className="space-y-2">
            <legend className="block text-sm font-medium text-gray-700 mb-1">
              Giới tính
            </legend>
            <div className="flex gap-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Nam"
                  checked={formData.gender === "Nam"}
                  onChange={handleChange}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2 text-gray-700">Nam</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Nữ"
                  checked={formData.gender === "Nữ"}
                  onChange={handleChange}
                  className="form-radio text-pink-600"
                />
                <span className="ml-2 text-gray-700">Nữ</span>
              </label>
            </div>
          </fieldset>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
               onChange={(e) => {
                    let value = e.target.value;
                    if (!/^\+?\d*$/.test(value)) return;
                    if (value.length > 10) return;

                    setFormData((prev) => ({ ...prev, phone: value }));
              }}
              pattern="[0-9]{9,11}"
              placeholder=""
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Nhóm bàn */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nhóm bàn
            </label>
            <input
              type="text"
              name="nhom"
              value={formData.groupInfo?.groupName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuestModal;
