import React, { useState, useEffect } from 'react';
import type { Guest } from '~/layoutEven/layoutEven';

interface StatisticalGuestProps {
    data:Guest[]
    guestLength:number
}
const StatisticalGuest:React.FC<StatisticalGuestProps> = ({data,guestLength}) => 
{
    const totalGuests = data.length;
    const totalSubGuests = data.reduce((sum, guest) => sum + (guest.subGuests?.length || 0), 0);
    const totalAttendees = totalGuests + totalSubGuests;
    const confirmedGuests = data.filter(g => g.isConfirm === 1).length;
    const maleGuests = data.filter(g => g.gender === 'Nam').length;
    const femaleGuests = data.filter(g => g.gender === 'Nữ').length;
    return (
       <div>  
        {/* Cards thống kê */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Khách mời chính</h3>
                <p className="text-3xl font-bold mt-2">{totalGuests}</p>
              </div>
              
              <div className="bg-green-500 text-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Khách đi cùng</h3>
                <p className="text-3xl font-bold mt-2">{totalSubGuests}</p>
              </div>
              
              <div className="bg-purple-500 text-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Tổng tham dự</h3>
                <p className="text-3xl font-bold mt-2">{totalAttendees}</p>
              </div>
              
              <div className="bg-orange-500 text-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Đã xác nhận</h3>
                <p className="text-3xl font-bold mt-2">{confirmedGuests}</p>
              </div>
            </div>

            {/* Danh sách khách mời */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">📋 Danh sách khách mời</h3>
                <p className="text-sm text-gray-600 mt-1">Hiển thị {data.length} / {guestLength} khách mời</p>
              </div>
              <div className="overflow-auto max-h-[500px]">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tên</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">SĐT</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Giới tính</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Nhóm</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Bàn</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Đi cùng</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Trạng thái</th>
                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">CheckIn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.map((guest, index) => (
                      <tr key={guest.guestID || index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{guest.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{guest.phone}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {guest.gender === 'Nam' ? '👨' : '👩'} {guest.gender}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {guest.groupInfo?.groupName || 'Chưa phân nhóm'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {guest.tableName || 'Chưa xếp bàn'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {guest.subGuests?.length ? `${guest.subGuests.length} Người` : ""}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {guest.isConfirm === 1 ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                              ✅ Đã xác nhận
                            </span>
                          ) : guest.isConfirm === 2 ? (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                              ❌ Xác nhận không đi
                            </span>
                          ) : (
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                              ⏳ Chờ xác nhận
                            </span>
                          )}
                        </td>
                         <td className="px-4 py-3 text-sm">
                          {guest.isCheckin === 1 ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                              ✅ Đã check in
                            </span>
                          ) :(
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                              ⏳ Chờ check in
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {data.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <p>Không tìm thấy khách mời nào phù hợp với bộ lọc.</p>
                </div>
              )}
            </div>

            {/* Summary footer */}
            <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">🎉 Tóm tắt dự án</h3>
                <p className="text-lg">
                  Tổng cộng <strong>{totalAttendees} người</strong> sẽ tham dự 
                  ({totalGuests} khách chính + {totalSubGuests} đi cùng)
                </p>
                <p className="mt-2 opacity-90">
                  Đã xác nhận: {confirmedGuests}/{totalGuests} khách • 
                  Tỷ lệ: {totalGuests > 0 ? Math.round((confirmedGuests/totalGuests) * 100) : 0}%
                </p>
              </div>
            </div>
         </div>
     )
}
export default StatisticalGuest