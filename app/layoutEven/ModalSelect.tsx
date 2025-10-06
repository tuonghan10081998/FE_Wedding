import React, { useState,useEffect} from "react";
import Select from "react-select";
import type { SingleValue } from "react-select";
import type { GroupGuest } from './layoutEven';
interface ModalSelectProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    row: number | string,
    layout: string,
    type: string,
    seatCount: number | string,
    checkrow: string,
    position: string,
    groupParentID:string
  ) => void;
   data?:GroupGuest[]
   onComBack:() => void
   selectedValue: string;
    onSelectedChange: (v: string) => void;
}
interface OptionType {
  value: string;
  label: string;
}
const ModalSelect: React.FC<ModalSelectProps> = ({
  isOpen,
  onClose,
  onConfirm,
  data,
  onComBack,
  selectedValue,
  onSelectedChange
}) => {
  const [row, setRow] = useState<number | string>("");
  const [layout, setLayout] = useState<string>("ngang");
  const [type, setType] = useState<string>("tron");
  const [seatCount, setSeatCount] = useState<number | string>("");
  const [checkRow, setCheckRow] = useState<string>("nhieuday");
  const [position, setPosition] = useState<string>("left");

   const filterOptions: OptionType[] = [
          ...(data?.map((card) => ({
            value: card.parentID.toString() ?? "",
            label: card.parentName,
          })) ?? []),
   ];
  const handleConfirm = () => {
    onConfirm(row, layout, type, seatCount, checkRow, position,selectedValue ?? "");
  };
if (!isOpen) return null;
  return (
    <div
      className="fixed top-27 right-0 z-30 w-[295px] h-full"
      onWheel={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="bg-white rounded-lg p-6 px-2 py-1 overflow-auto max-h-[calc(100vh-122px)]" style={{ width: "297px" }}>
        <h2 className="text-lg font-bold border-b mb-5">Tạo Bàn Mới</h2>
          {/* Dãy + SL bàn */}
        <div className="mb-2 flex gap-4 mb-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-sm mb-1">Chọn bên <span className="text-red-500">(*)</span></label>
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
          <div className="mb-2 flex gap-4 mb-2">
          {/* Dãy */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-sm mb-1">Dãy:</label>
            <input
              type="number"
              value={row}
              onChange={(e) => setRow(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none"
            />
          </div>

          {/* SL bàn */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-sm mb-1">SL bàn:</label>
            <input
              type="number"
              min={1}
              value={seatCount}
              onChange={(e) => setSeatCount(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none"
            />
          </div>
        </div>
        {/* Kiểu dãy */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-sm mb-1">Chọn kiểu dãy:</label>
          <div className="flex space-x-4">
            {/* Nhiều dãy */}
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="dayType"
                value="nhieuday"
                checked={checkRow === "nhieuday"}
                onChange={(e) => setCheckRow(e.target.value)}
                className="hidden peer"
              />
              <div className="border border-gray-300 rounded-lg p-4 py-1 text-center text-gray-700 
                              peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600 transition">
                <i className="fas fa-th-large text-1xl mb-2"></i>
                <div className="font-medium text-sm">Nhiều dãy</div>
              </div>
            </label>

            {/* Từng dãy */}
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="dayType"
                value="tungday"
                checked={checkRow === "tungday"}
                onChange={(e) => setCheckRow(e.target.value)}
                className="hidden peer"
              />
              <div className="border border-gray-300 rounded-lg p-4 py-1 text-center text-gray-700 
                              peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600 transition">
                <i className="fas fa-th-list text-1xl mb-2"></i>
                <div className="font-medium text-sm">Từng dãy</div>
              </div>
            </label>
          </div>
        </div>

       
        {/* Vị trí */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-sm mb-1">Vị trí:</label>
          <div className="flex space-x-4">
            {/* Trái */}
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="position"
                value="left"
                checked={position === "left"}
                onChange={(e) => setPosition(e.target.value)}
                className="hidden peer"
              />
              <div className="border border-gray-300 rounded-lg p-4 py-1 text-center text-gray-700 
                              peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600 transition">
                <i className="fas fa-arrow-left text-1xl mb-2"></i>
                <div className="font-medium text-sm">Trái</div>
              </div>
            </label>

            {/* Phải */}
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="position"
                value="right"
                checked={position === "right"}
                onChange={(e) => setPosition(e.target.value)}
                className="hidden peer"
              />
              <div className="border border-gray-300 rounded-lg p-4 py-1 text-center text-gray-700 
                              peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600 transition">
                <i className="fas fa-arrow-right text-1xl mb-2"></i>
                <div className="font-medium text-sm">Phải</div>
              </div>
            </label>
          </div>
        </div>

        {/* Hình bàn */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-sm mb-1">Hình bàn:</label>
          <div className="flex space-x-4">
            {/* Ngang */}
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="layout"
                value="ngang"
                checked={layout === "ngang"}
                onChange={(e) => setLayout(e.target.value)}
                className="hidden peer"
              />
              <div className="border border-gray-300 rounded-lg p-4 py-1 text-center text-gray-700 
                              peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600 transition">
                <i className="fas fa-arrows-alt-h text-1xl mb-2"></i>
                <div className="font-medium text-sm">Ngang</div>
              </div>
            </label>

            {/* Dọc */}
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="layout"
                value="doc"
                checked={layout === "doc"}
                onChange={(e) => setLayout(e.target.value)}
                className="hidden peer"
              />
              <div className="border border-gray-300 rounded-lg p-4 py-1 text-center text-gray-700 
                              peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600 transition">
                <i className="fas fa-arrows-alt-v text-1xl mb-2"></i>
                <div className="font-medium text-sm">Dọc</div>
              </div>
            </label>
          </div>
        </div>

        {/* Kiểu bàn */}
        <div className="mb-2">
         
          <div className="mb-2">
            <label className="block text-sm font-medium text-sm mb-1">Kiểu bàn:</label>

            <div className="grid grid-cols-3 gap-2">
              {/* Tròn */}
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="tron"
                  checked={type === "tron"}
                  onChange={(e) => setType(e.target.value)}
                  className="hidden peer"
                />
                <div className="border border-gray-300 rounded-lg p-3 py-1 text-center text-gray-700
                                peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600 transition">
                  <i className="fas fa-circle text-2xl mb-1"></i>
                  <div className="text-sm font-medium text-sm">Tròn</div>
                </div>
              </label>

              {/* Vuông */}
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="vuong"
                  checked={type === "vuong"}
                  onChange={(e) => setType(e.target.value)}
                  className="hidden peer"
                />
                <div className="border border-gray-300 rounded-lg p-3 py-1 text-center text-gray-700
                                peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600 transition">
                  <i className="fas fa-square text-2xl mb-1"></i>
                  <div className="text-sm font-medium text-sm">Vuông</div>
                </div>
              </label>

              {/* Ghế dài */}
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="ghedai"
                  checked={type === "ghedai"}
                  onChange={(e) => setType(e.target.value)}
                  className="hidden peer"
                />
                <div className="border border-gray-300 rounded-lg p-3 py-1 text-center text-gray-700
                                peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600 transition">
                  <i className="fas fa-couch text-2xl mb-1"></i>
                  <div className="text-sm font-medium text-sm">Ghế dài</div>
                </div>
              </label>
            </div>
          </div>
        </div>
       

        {/* Buttons */}
        <div className="flex justify-between border-t pt-4">
          <div className="flex flex-col items-center space-y-2">
            <button
             onClick={onComBack}
             className="flex items-center space-x-2 px-3 py-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-pink-300 transform hover:rotate-1">
              Quay lại
            </button>
        </div>
         <div className="flex ">
           <button
            onClick={onClose}
            className="px-4 py-1 mr-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Xác nhận
          </button>
         </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSelect;
