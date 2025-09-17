import React, { useState,useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import type { Guest } from '../layoutEven/layoutEven';
import type { GroupGuest } from '../layoutEven/layoutEven';
import ExcelImporter from '~/layoutEven/ImportExCustomer';
import type {ImportResult} from '../layoutEven/layoutEven'
import Select from "react-select";
import type { SingleValue } from "react-select";
import GuestModal from "./GuestModal";
interface ModalCustomerProps {
  onClose: () => void;
  table: Guest[];
  onAddSeat:() => void;
  onClickSeat:(customerid:string,checkSeatID:boolean) => void;
  onDelete:(customerid:string,customer:string) => void;
  handleDataImported: (result: ImportResult) => void;
  data?:GroupGuest[]
  setParentGroup:(v:string) => void
  setGuest: (data: Guest[]) => void;
}
interface OptionType {
  value: string;
  label: string;
}
const ModalCustomer: React.FC<ModalCustomerProps> = ({ onClose, table,
  onAddSeat,onClickSeat,onDelete,handleDataImported,data,setParentGroup,setGuest}) => {
    const filterOptions: OptionType[] = [
        ...(data?.map((card) => ({
          value: card.parentID ?? "",
          label: card.parentName,
        })) ?? []),
      ];
 useEffect(() =>{
    setSelectedOption(filterOptions[0])
  },[data])
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>();
  const [filters, setFilters] = useState({ name: '', phone: '', gender: '', nhom: '', tableName: '' });
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | undefined>(undefined);
  const [listData,setListData] = useState<Guest[]>([])
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    };
    useEffect(() => {
      selectedOption && setParentGroup(selectedOption.value ?? "")
    },[selectedOption])
  useEffect(() => {
  if (!table) return;
     const tableFilter = table.filter(x => x.groupInfo?.parentID === parseInt(selectedOption?.value ?? "0"))

    const sortedTable = [...tableFilter].sort((a, b) => {
    const maNhomA = Number(a.nhom) || 0;
    const maNhomB = Number(b.nhom) || 0;
    return maNhomA - maNhomB;
  });

  const filteredTable = sortedTable.filter((guest) => {
    const matchName = guest.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchPhone = guest.phone.includes(filters.phone);
    const matchGender = guest.gender?.toLowerCase().includes(filters.gender?.toLowerCase());
    const matchNhom = filters.nhom === '' || guest.nhom.toString().includes(filters.nhom);
    const matchBan = filters.tableName === '' || (guest.tableName ?? '').toLowerCase().includes(filters.tableName.toLowerCase());

    return matchName && matchPhone && matchGender && matchNhom && matchBan;
  });
  setListData(filteredTable);
}, [table, filters,selectedOption]);
  const handleSaveGuest = (guest: Guest) => {
    const maxTableNumber = table.length > 0
      ? Math.max(...table.map(t => t.sort ?? 0)) + 1
      : 1;

    const newGuest = { ...guest, sort: maxTableNumber }; // 👈 gán sort

    const newTable = [...table, newGuest];
    setGuest(newTable);
  };
  return (
    <div
      className="fixed top-27 right-0 z-20 w-[750px] h-full  flex justify-end"
      onClick={onClose}
    >
      <div
        className="bg-white max-h-screen shadow-lg relative h-[calc(100vh-115px)] w-full max-w-[750px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header cố định */}
        <div className="sticky top-0 z-10 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Danh sách khách mời</h2>
          <div className="flex gap-4">
             <div className="flex  gap-4 items-center">
            <div className="">Chọn bên</div>
            <Select
              options={filterOptions}
              value={selectedOption}
              onChange={(option: SingleValue<OptionType>) => setSelectedOption(option)}
              className="mb-0 w-[200px]"
              classNamePrefix="react-select"
              isSearchable={true}
              placeholder=""
            />
          </div>
            <button
            className="text-gray-500 hover:text-black text-2xl font-bold"
            onClick={onClose}
          >
            &times;
          </button>
          </div>
        </div>

        {/* Body có thể cuộn */}
        <div className="overflow-y-auto  flex-1"  onWheel={(e) => e.stopPropagation()} onMouseDown ={(e) => e.stopPropagation()}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-600 sticky top-0 z-1">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white whitespace-nowrap  tracking-wider">
                  Tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white whitespace-nowrap tracking-wider">
                  SĐT
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white whitespace-nowrap tracking-wider">
                  Giới tính
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-white whitespace-nowrap tracking-wider">
                   Nhóm
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-white whitespace-nowrap tracking-wider">
                  Bàn
                </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-white whitespace-nowrap tracking-wider">
                  Ghế
                </th>
                 <th className="px-6 py-3 text-center text-xs font-semibold text-white whitespace-nowrap tracking-wider">
                 Hành động
                </th>
               
              </tr>
              {/* Filter row */}
             <tr className="bg-indigo-100">
          <th className="px-6 py-2 border border-gray-300">
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              className="w-full px-2 py-1 text-sm border-none focus:outline-none font-normal"
            />
          </th>
          <th className="px-6 py-2 border border-gray-300">
            <input
              type="text"
              name="phone"
              value={filters.phone}
              onChange={handleFilterChange}
              className="w-full px-2 py-1 text-sm border-none focus:outline-none font-normal"
            />
          </th>
          <th className="px-6 py-2 border border-gray-300">
            <input
              type="text"
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="w-full px-2 py-1 text-sm border-none focus:outline-none font-normal"
            />
          </th>
          <th className="px-6 py-2 border border-gray-300">
            <input
              type="text"
              name="nhom"
              value={filters.nhom}
              onChange={handleFilterChange}
              className="w-full px-2 py-1 text-sm border-none focus:outline-none font-normal"
            />
          </th>
          <th className="px-6 py-2 border border-gray-300">
            <input
              type="text"
              name="ban"
              value={filters.tableName}
              onChange={handleFilterChange}
              className="w-full px-2 py-1 text-sm border-none focus:outline-none font-normal"
            />
          </th>
           <th className="px-6 py-2 border border-gray-300">
           
          </th>
           <th className="px-6 py-2 border border-gray-300">
           
          </th>
         
        </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {listData?.map((guest) => (
                <tr key={guest.guestID} className="hover:bg-indigo-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {guest.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {guest.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {guest.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {guest.nhom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {guest.tableName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {guest.seatName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className='flex gap-2 justify-between items-center'>
                           <button
                            className="cursor-pointer p-0 px-1 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            onClick={() => {
                              onClickSeat(guest.guestID,guest.seatID !== null); 
                            }}
                          >
                          <i className="fa-solid fa-plus"></i>
                          </button>
                          {/* <button
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => {
                                setEditingGuest(guest);
                                setIsGuestModalOpen(true);
                              }}
                            >
                              <i className="fas fa-edit"></i>
                            </button> */}
                          <button
                            className="cursor-pointer p-0 px-1 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            onClick={() => {
                            onDelete(guest.guestID,guest.name)
                            }}
                          >
                          <i className="fas fa-trash-alt "></i>
                          </button>
                    </div>
                 
                </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-between">
           <label className="flex cursor-pointer items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm rounded-md px-4 py-2">
             <ExcelImporter                    
                  startColumn="A"                   
                  startRow={3}                   
                  onDataImported={handleDataImported}                   
                  className="hidden"                  
                />          
                  <i className="fas fa-file-excel fa-lg"></i>     
                  <span>Import EX</span>               
              </label>
            <button
              onClick={() => {
                setEditingGuest(undefined);
                setIsGuestModalOpen(true);
              }}
              className="flex items-center space-x-2 px-4 h-12 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold"
            >
              <i className="fas fa-user-plus"></i>
            </button>
           <button
             onClick={() => onAddSeat()}
              type="button"
              aria-label="Confirm"
              className="flex items-center space-x-2 px-4 h-12 rounded-lg bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 transition font-semibold select-none"
              title="Confirm"
            >
              <i className="fas fa-check fa-lg"></i>
              <span className="whitespace-nowrap"> Xác nhận</span>
         </button>
         
        </div>
      </div>
       <GuestModal
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        onSave={(guest) => {
          handleSaveGuest(guest);
          setIsGuestModalOpen(false);
        }}
        parentgroupid={selectedOption?.value}
        initialData={editingGuest}
        table={table}
      />
    </div>
  );
};

export default ModalCustomer;
