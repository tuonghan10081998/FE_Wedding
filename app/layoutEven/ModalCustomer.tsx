import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import type { Guest, GroupGuest, ImportResult } from './layoutEven';
import ExcelImporter from '~/layoutEven/ImportExCustomer';
import Select from "react-select";
import type { SingleValue } from "react-select";
import GuestModal from "./GuestModal";
import ModalResetSeat from '~/layoutEven/ModalResetSeat';
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from 'xlsx';
interface ModalCustomerProps {
  onClose: () => void;
  table: Guest[];
  onAddSeat: () => void;
  onClickSeat: (customerid: string, checkSeatID: boolean) => void;
  onDelete: (customerid: string, customer: string) => void;
  handleDataImported: (result: ImportResult) => void;
  data?: GroupGuest[]
  setParentGroup: (v: string) => void
  setGuest: (data: Guest[]) => void;
  onResetGhe: () => void
  selectedValue: string;
  onSelectedChange: (v: string) => void;
  isView: boolean
  onSetLimit:() => void
  maxGuest:number
  onClickFile:() => void
}

interface OptionType {
  value: string;
  label: string;
}

const ModalCustomer: React.FC<ModalCustomerProps> = ({ 
  onResetGhe, onClose, table,
  onAddSeat, onClickSeat, onDelete, handleDataImported,
  data, setParentGroup, setGuest, selectedValue, onSelectedChange,
  isView,onSetLimit,maxGuest,onClickFile
}) => {
  const filterOptions: OptionType[] = [
    ...(data?.map((card) => ({
      value: card.parentID.toString() ?? "",
      label: card.parentName,
    })) ?? []),
  ];

  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>();
  const [filters, setFilters] = useState({ name: '', phone: '', gender: '', groupName: '', tableName: '' });
  const [isGuestModalOpen, setIsGuestModalOpen] = useState<boolean>(false);
  const [isResetModal, setResetModal] = useState<boolean>(false);
  const [editingGuest, setEditingGuest] = useState<Guest | undefined>(undefined);
  const [listData, setListData] = useState<Guest[]>([])
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    selectedOption && setParentGroup(selectedOption.value ?? "")
  }, [selectedOption])

  useEffect(() => {
    if (!table) return;
    const tableFilter = table.filter(x => x.groupInfo?.parentID === parseInt(selectedValue ?? "0"))

    const sortedTable = [...tableFilter].sort((a, b) => {
      const maNhomA = Number(a.sort) || 0;
      const maNhomB = Number(b.sort) || 0;
      return maNhomA - maNhomB;
    });
    const filteredTable = sortedTable.filter((guest) => {
      const matchName = guest.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchPhone = guest.phone.includes(filters.phone);
      const matchGender = guest.gender?.toLowerCase().includes(filters.gender?.toLowerCase());
      const matchNhom = filters.groupName === '' || guest.groupInfo?.groupName?.toString().includes(filters.groupName);
      const matchBan = filters.tableName === '' || (guest.tableName ?? '').toLowerCase().includes(filters.tableName.toLowerCase());

      return matchName && matchPhone && matchGender && matchNhom && matchBan;
    });
    setListData(filteredTable);
    
    // Mặc định expand tất cả các nhóm khi load dữ liệu
    const groups: { [key: string]: boolean } = {};
    filteredTable.forEach((guest) => {
      const groupName = guest.groupInfo?.groupName || 'Chưa phân nhóm';
      if (!(groupName in groups)) {
        groups[groupName] = true; // Mặc định mở tất cả
      }
    });
    setExpandedGroups(groups);
  }, [table, filters, selectedValue]);

  const handleSaveGuest = (guest: Guest) => {
    const maxTableNumber = table.length > 0
      ? Math.max(...table.map(t => t.sort ?? 0)) + 1
      : 1;
    const currentGuestCount = table.length + 1;
     const maxGuestLimit = maxGuest;
    if (currentGuestCount >  maxGuestLimit) {
      onSetLimit();
      return [];
    }
    const newGuest = { ...guest, sort: maxTableNumber };
    const newTable = [...table, newGuest];
    setGuest(newTable);
  };

  const handleImportClick = (e: React.MouseEvent) => {
    if (!selectedValue || selectedValue === "" || selectedValue === "0") {
      e.preventDefault();
      toast.error("Vui lòng chọn bên trước khi import file!");
      return false;
    }
  };

  // Toggle expand/collapse nhóm
  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  // Nhóm dữ liệu theo mã nhóm và sắp xếp theo min sort
  const groupedByGroupName = () => {
    const grouped: { [key: string]: Guest[] } = {};
    
    listData.forEach((guest) => {
      const groupName = guest.groupInfo?.groupName || 'Chưa phân nhóm';
      if (!grouped[groupName]) {
        grouped[groupName] = [];
      }
      grouped[groupName].push(guest);
    });
    
    // Sắp xếp các nhóm theo min sort của từng nhóm
    return Object.entries(grouped).sort(([aName, aGuests], [bName, bGuests]) => {
      const minSortA = Math.min(...aGuests.map(g => Number(g.sort) || 0));
      const minSortB = Math.min(...bGuests.map(g => Number(g.sort) || 0));
      return minSortA - minSortB;
    });
  };
const exportToExcel = () => {
    

    // Tạo dữ liệu cho Excel
    const excelData: any[] = [];
    
    // Header chính (row 1)
    excelData.push(['Danh sách khách mời']);
    
    // Header cột (row 2)
    excelData.push(['STT', 'Tên (BietDanh)', 'Giới tính', 'SĐT', 'Nhóm bàn', 'Email']);

    let stt = 1;
    
      listData?.forEach((guest) => {
        excelData.push([
          stt,
          guest.name,
          guest.gender || '',
          guest.phone || '',
          guest.groupInfo?.groupName,
          '' // Email column - empty as per your requirement
        ]);
        stt++;
      });

    // Tạo worksheet
    const ws = XLSX.utils.aoa_to_sheet(excelData);

    // Merge cells cho tiêu đề
    ws['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } } // Merge A1:F1
    ];

    // Định dạng độ rộng cột
    ws['!cols'] = [
      { wch: 5 },   // STT
      { wch: 20 },  // Tên
      { wch: 10 },  // Giới tính
      { wch: 15 },  // SĐT
      { wch: 20 },  // Nhóm bàn
      { wch: 25 }   // Email
    ];

    // Tạo workbook và thêm worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách khách mời');

    // Lấy tên bên để đặt tên file
    const selectedSide = filterOptions.find(opt => opt.value === selectedValue);
    const sideName = selectedSide?.label || 'DanhSach';
    const fileName = `DanhSachKhachMoi_${sideName}_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Xuất file
    XLSX.writeFile(wb, fileName);
  };
  const renderTableRows = () => {
    const groupedData = groupedByGroupName();
    let globalIndex = 0;
    
    return groupedData.map(([groupName, guests]) => {
      const isExpanded = expandedGroups[groupName] ?? true;
      
      // Sắp xếp guests trong nhóm theo sort
      const sortedGuests = [...guests].sort((a, b) => {
        const sortA = Number(a.sort) || 0;
        const sortB = Number(b.sort) || 0;
        return sortA - sortB;
      });
      
      return (
        <React.Fragment key={groupName}>
          {/* Header nhóm với icon expand/collapse */}
          <tr className="bg-indigo-200 cursor-pointer hover:bg-indigo-300" onClick={() => toggleGroup(groupName)}>
            <td colSpan={7} className="px-6 py-3 text-left font-bold text-indigo-900">
              <div className="flex items-center gap-2">
                <i className={`fas fa-chevron-${isExpanded ? 'down' : 'right'} transition-transform`}></i>
                <span>Nhóm: {groupName} ({guests.length} khách)</span>
              </div>
            </td>
          </tr>
          {/* Danh sách khách trong nhóm - chỉ hiện khi expanded */}
          {isExpanded && sortedGuests.map((guest) => {
            globalIndex++;
            return (
              <tr key={guest.guestID} className="hover:bg-indigo-50">
                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                  {globalIndex}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                  {guest.name}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700">
                  {guest.phone}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700">
                  {guest.gender}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700 text-center">
                  {guest.groupInfo?.groupName}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700 text-center">
                  {guest.seatID && guest.seatName}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-center">
                  <div className='flex gap-2 justify-center items-center'>
                    <button
                      className="cursor-pointer p-0 px-1 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClickSeat(guest.guestID, guest.seatID !== null);
                      }}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <button
                      className="cursor-pointer p-0 px-1 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(guest.guestID, guest.name)
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </React.Fragment>
      );
    });
  };

  return (
    <div
      className="fixed top-[103px] right-0 z-20 w-[750px] h-full flex justify-end"
      onClick={onClose}
    >
      <div
        className="bg-white max-h-screen shadow-lg relative h-[calc(100vh-100px)] w-full max-w-[750px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header cố định */}
        <div className="sticky top-0 z-10 bg-white border-b p-2 flex justify-between items-center flex-col">
          <div className='flex justify-between items-center w-full'>
           <div className='flex justify-between items-center'>
             <h3 className="text-xl font-bold">Danh sách khách mời</h3>

           </div>
            <button
              className="text-gray-500 hover:text-black text-2xl font-bold"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
        
           <div className='flex  gap-2 flex-wrap w-full justify-between items-center mt-2'>
           <div className='flex  gap-4'>
             <button 
                className="w-[210px] cursor-pointer flex items-center px-4 py-3 border border-[#cccccc] rounded-[7px] text-gray-700 hover:bg-gray-50 focus:bg-gray-100 focus:outline-none transition-colors duration-200 text-left text-sm group"
                onClick={() => {
                 onClickFile()
                }}
              >
                <i className="fa-solid fa-file-lines text-[16px] mr-1 text-blue-500 group-hover:text-blue-600"></i>
                <span className="font-medium">File mẫu import khách</span>
            </button>
            <button 
                className="w-[180px] cursor-pointer flex items-center px-4 py-3 border border-[#cccccc] rounded-[7px] text-gray-700 hover:bg-gray-50 focus:bg-gray-100 focus:outline-none transition-colors duration-200 text-left text-sm group"
                onClick={() => {
                 exportToExcel()
                }}
              >
                <i className="fa-solid fa-file-lines text-[16px] mr-1 text-blue-500 group-hover:text-blue-600"></i>
                <span className="font-medium">Xuất file khách mời</span>
            </button>
           </div>
                  <div className="flex gap-4">
            <div className="flex gap-4 items-center">
              <div className="">Chọn bên <span className="text-red-500">(*)</span></div>
              <Select
                options={filterOptions}
                value={filterOptions.find(opt => opt.value === selectedValue)}
                onChange={(option: SingleValue<OptionType>) =>
                  onSelectedChange(option?.value ?? "")
                }
                className="mb-0 w-[200px]"
                classNamePrefix="react-select"
                isSearchable={true}
                placeholder=""
              />
            </div>
            
          </div>

     
        </div>
       </div>

        {/* Body có thể cuộn */}
        <div className="overflow-y-auto flex-1" onWheel={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-600 sticky top-0 z-1">
              <tr>
                <th className="px-6 py-2 text-left text-xs font-semibold text-white whitespace-nowrap tracking-wider">
                  Stt
                </th>
                <th className="px-6 py-2 text-left text-xs font-semibold text-white whitespace-nowrap tracking-wider">
                  Tên
                </th>
                <th className="px-6 py-2 text-left text-xs font-semibold text-white whitespace-nowrap tracking-wider">
                  SĐT
                </th>
                <th className="px-6 py-2 text-left text-xs font-semibold text-white whitespace-nowrap tracking-wider">
                  Giới tính
                </th>
                <th className="px-6 py-2 text-center text-xs font-semibold text-white whitespace-nowrap tracking-wider">
                  Nhóm
                </th>
                <th className="px-6 py-2 text-center text-xs font-semibold text-white whitespace-nowrap tracking-wider">
                  Ghế
                </th>
                <th className="px-6 py-2 text-center text-xs font-semibold text-white whitespace-nowrap tracking-wider">
                  Hành động
                </th>
              </tr>
              {/* Filter row */}
              <tr className="bg-indigo-100">
                <th className="px-6 py-1 border border-gray-300">
                 
                </th>
                <th className="px-6 py-1 border border-gray-300">
                  <input
                    type="text"
                    name="name"
                    value={filters.name}
                    onChange={handleFilterChange}
                    className="w-full px-2 py-1 text-sm border-none focus:outline-none font-normal"
                  />
                </th>
                <th className="px-6 py-1 border border-gray-300">
                  <input
                    type="text"
                    name="phone"
                    value={filters.phone}
                    onChange={handleFilterChange}
                    className="w-full px-2 py-1 text-sm border-none focus:outline-none font-normal"
                  />
                </th>
                <th className="px-6 py-1 border border-gray-300">
                  <input
                    type="text"
                    name="gender"
                    value={filters.gender}
                    onChange={handleFilterChange}
                    className="w-full px-2 py-1 text-sm border-none focus:outline-none font-normal"
                  />
                </th>
                <th className="px-6 py-1 border border-gray-300">
                  <input
                    type="text"
                    name="groupName"
                    value={filters.groupName}
                    onChange={handleFilterChange}
                    className="w-full px-2 py-1 text-sm border-none focus:outline-none font-normal"
                  />
                </th>
                <th className="px-6 py-1 border border-gray-300">
                </th>
                <th className="px-6 py-1 border border-gray-300">
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {renderTableRows()}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-between">
          <div className='flex gap-[7px]'>
            <label 
              className={`flex cursor-pointer items-center space-x-2 font-semibold text-sm rounded-md px-4 py-2 ${
                !selectedValue || selectedValue === "" || selectedValue === "0" 
                  ? "bg-gray-400 cursor-not-allowed text-gray-200" 
                  : "bg-pink-600 hover:bg-pink-700 text-white"
              }`}
              onClick={handleImportClick}
            >
              <ExcelImporter
                startColumn="A"
                startRow={3}
                onDataImported={handleDataImported}
                className="hidden"
              />
              <i className="fas fa-file-excel fa-lg"></i>
              <span>Import EX</span>
            </label>
            {selectedValue && selectedValue !== "" && selectedValue !== "0" && (
              <button
                onClick={() => {
                  setEditingGuest(undefined);
                  setIsGuestModalOpen(true);
                }}
                className="flex items-center space-x-2 px-4  rounded-lg bg-pink-600 text-white hover:bg-pink-700 font-semibold fs-[15px]"
              >
                <i className="fas fa-user-plus me-1"></i>
                Thêm khách mời
              </button>
            )}
          </div>
          <div className='flex gap-[7px]'>
            <button
              onClick={() => setResetModal(true)}
              type="button"
              aria-label="Confirm"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 fs-[15px] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-1 transition font-semibold select-none"
              title="Confirm"
            >
              <i className="fa-solid fa-rotate-right"></i>
              <span className="whitespace-nowrap"> Reset ghế</span>
            </button>
            <button
              onClick={() => onAddSeat()}
              type="button"
              aria-label="Confirm"
              className="flex items-center space-x-2 py-2 px-4 fs-[15px] rounded-lg bg-pink-600 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-1 transition font-semibold select-none"
              title="Confirm"
            >
              <i className="fas fa-check fa-lg"></i>
              <span className="whitespace-nowrap"> Chia tự động</span>
            </button>
          </div>
        </div>
      </div>
      <GuestModal
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        onSave={(guest) => {
          handleSaveGuest(guest);
          setIsGuestModalOpen(false);
        }}
        parentgroupid={selectedValue}
        initialData={editingGuest}
        table={table}
        isView={isView}
      />
      {isResetModal && (
        <ModalResetSeat
          isOpen={isResetModal}
          onClose={() => setResetModal(false)}
          onComfirm={() => onResetGhe()}
        />
      )}
    </div>
  );
};

export default ModalCustomer;