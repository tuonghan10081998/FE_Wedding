import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import type { Guest } from './layoutEven';

interface GuestInfoModalProps {
   table: Guest;
   onClickSeat:(customerid:string,checkseatid:boolean) => void;
   onDelete:(customerid:string,customer:string) => void;
   onReset:(customerid:string) => void;
}

const GuestInfoModal: React.FC<GuestInfoModalProps> = ({  table,onClickSeat ,onDelete,onReset}) => {
//   if (!isOpen) return null;
  return (
      <div className="bg-white shadow-md rounded-lg max-w-xs w-full p-0 space-y-5">
      <div className="bg-white shadow-md rounded-lg max-w-3xl w-full p-2 relative">
        {/* Nút đóng
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
          
        >
          &times;
        </button> */}

        {/* Tiêu đề */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Thông tin khách mời
        </h2>

        {/* Grid hiển thị thông tin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                   Tên
                </label>
                <p className="text-gray-900 text-lg border border-gray-300 rounded-md px-3 py-2 bg-white">
                {table.name}
                </p>
         </div>
         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SĐT
          </label>
          <p className="text-gray-700 text-lg border border-gray-300 rounded-md px-3 py-2 bg-white">
            {table.phone}
          </p>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Giới tính
          </label>
          <p className="text-gray-700 text-lg border border-gray-300 rounded-md px-3 py-2 bg-white">
            {table.gender}
          </p>
        </div>

        {/* Nhóm */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nhóm 
          </label>
          <p className="text-gray-700 text-lg border border-gray-300 rounded-md px-3 py-2 bg-white">
            {table.groupInfo?.groupName}
          </p>
        </div>

        {/* Bàn */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bàn 
          </label>
          <p className="text-gray-700 text-lg border border-gray-300 rounded-md px-3 py-2 bg-white">
            {table.tableName}
          </p>
        </div>

        {/* Ghế */}
        <div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">QR cá nhân </label>
             <QRCodeCanvas value={`${table.guestID}-${table.name}`} size={80} />
          </div>
         
           <div className="flex space-x-6">
         
        </div>
        </div>
        
        </div>
      </div>
      <div className='mb-2 pb-2 ps-3'>
         <label className="block text-sm font-medium text-gray-700 mb-1">
                Hành động
              </label>
              <div className="flex space-x-6">
              <button
              onClick={() => onClickSeat(table.guestID,true)}
                type="button"
                className="flex items-center justify-center w-14 h-[45px] rounded-lg bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 text-white shadow-md transition"
                aria-label="Add item"
              >
                <i className="fas fa-plus text-2xl"></i>
              </button>
            <button
           onClick={() => onReset(table.guestID)}
            type="button"
            className="flex items-center justify-center w-14 h-[45px] rounded-lg bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 text-white shadow-md transition"
            aria-label="reset"
          >
           <i className="fa-solid fa-rotate-right"></i>
          </button>
              <button
              onClick={() => onDelete(table.guestID,table.name)}
                type="button"
                className="flex items-center justify-center w-14 h-[45px] rounded-lg bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 text-white shadow-md transition"
                aria-label="Delete item"
              >
                <i className="fas fa-trash-alt text-2xl"></i>
              </button>
           </div>
       </div>
           
         
    </div>
  );
};

export default GuestInfoModal;
