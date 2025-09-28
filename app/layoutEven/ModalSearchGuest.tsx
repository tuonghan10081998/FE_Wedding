import React, { useState, useEffect } from "react";
import Select from "react-select";
import type { SingleValue } from "react-select";
import type { GroupGuest, Guest } from './layoutEven';

interface ModalSearchGuesttProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (guest: string ,tableid:string) => void;
  data: GroupGuest[]
  selectedValue: string
  onSelectedChange: (v: string) => void;
  dataGuest: Guest[]
}

interface OptionType {
  value: string;
  label: string;
}

const ModalSearchGuest: React.FC<ModalSearchGuesttProps> = ({
  isOpen,
  onClose,
  data,
  selectedValue,
  onSelectedChange,
  dataGuest,
  onSearch
}) => {
  const [isData, setData] = useState<Guest[]>([]);
  const [selectedGuestId, setSelectedGuestId] = useState<string>("");
  const [selectedGuestData, setSelectedGuestData] = useState<Guest | null>(null);

  const filterOptions: OptionType[] = [
    ...(data?.map((card) => ({
      value: card.parentID.toString() ?? "",
      label: card.parentName,
    })) ?? []),
  ];

  // Tạo options cho select khách mời
  const filterOptionsGuest: OptionType[] = [
    ...(isData?.map((guest) => ({
      value: guest.guestID ?? "",
      label: `${guest.name} - ${guest.phone}`,
    })) ?? []),
  ];

  const handleGuestChange = (option: SingleValue<OptionType>) => {
    const guestId = option?.value ?? "";
   
    setSelectedGuestId(guestId)
    // Lấy thông tin chi tiết của guest được chọn
    const selectedGuest = isData.find(guest => guest.guestID === guestId);
     onSearch(guestId,selectedGuest?.tableID ?? "");
    setSelectedGuestData(selectedGuest || null);
  };

  useEffect(() => {
    if (!dataGuest) return;

    // Bỏ điều kiện !x.seatID để hiển thị tất cả khách mời (cả đã có ghế và chưa có ghế)
    const tableFilter = dataGuest.filter(x => x.groupInfo?.parentID === parseInt(selectedValue ?? "0"))

    const sortedTable = [...tableFilter].sort((a, b) => {
      const maNhomA = Number(a.sort) || 0;
      const maNhomB = Number(b.sort) || 0;
      return maNhomA - maNhomB;
    });

    setData(sortedTable);
    // Reset selected guest khi đổi bên
    setSelectedGuestId("");
  }, [dataGuest, selectedValue]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-27 right-0 z-20 w-[295px] h-[100vh]"
      onWheel={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="bg-white rounded-lg p-6 px-2 py-2 h-[100vh]" style={{ width: "297px" }}>
        <h2 className="text-lg font-bold border-b mb-5">Tìm Khách Mời</h2>

        {/* Chọn bên */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Chọn bên <span className="text-red-500">(*)</span></label>
          <Select
            options={filterOptions}
            value={filterOptions.find(opt => opt.value === selectedValue)}
            onChange={(option: SingleValue<OptionType>) =>
              onSelectedChange(option?.value ?? "")
            }
            className="mb-0 w-[280px]"
            classNamePrefix="react-select"
            isSearchable={true}
            placeholder="Chọn bên..."
          />
        </div>

        {/* Chọn khách mời */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Tìm khách mời:</label>
          <Select
            options={filterOptionsGuest}
            value={filterOptionsGuest.find(opt => opt.value === selectedGuestId)}
            onChange={handleGuestChange}
            className="mb-0 w-[280px]"
            classNamePrefix="react-select"
            isSearchable={true}
            placeholder="Tìm theo tên hoặc SĐT..."
            isDisabled={selectedValue === "" || selectedValue === "0"}
          />
        </div>

        {/* Hiển thị thông tin khách được chọn */}
        {selectedGuestData && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-sm mb-2">Thông tin khách:</h3>
            <div className="grid grid-cols-1 gap-y-2">
              
              {/* Tên */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Tên khách
                </label>
                <p className="text-gray-700 text-sm border border-gray-300 rounded-md px-2 py-1 bg-white">
                  {selectedGuestData.name}
                </p>
              </div>

              {/* Số điện thoại */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <p className="text-gray-700 text-sm border border-gray-300 rounded-md px-2 py-1 bg-white">
                  {selectedGuestData.phone}
                </p>
              </div>

              {/* Nhóm */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Nhóm
                </label>
                <p className="text-gray-700 text-sm border border-gray-300 rounded-md px-2 py-1 bg-white">
                  {selectedGuestData.groupInfo?.groupName || "Không có"}
                </p>
              </div>

              {/* Bàn */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Bàn
                </label>
                <p className={`text-sm border border-gray-300 rounded-md px-2 py-1 bg-white ${
                  selectedGuestData.tableName ? 'text-gray-700' : 'text-orange-600'
                }`}>
                  {selectedGuestData.tableName || "Chưa có bàn"}
                </p>
              </div>

              {/* Ghế */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Ghế
                </label>
                <p className={`text-sm border border-gray-300 rounded-md px-2 py-1 bg-white ${
                  selectedGuestData.seatName ? 'text-gray-700' : 'text-orange-600'
                }`}>
                  {selectedGuestData.seatName || "Chưa có ghế"}
                </p>
              </div>
              
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Đóng
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ModalSearchGuest;