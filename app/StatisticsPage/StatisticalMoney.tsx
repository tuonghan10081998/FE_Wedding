import React, { useState, useEffect } from 'react';
import type { Order } from '~/StatisticsPage/StatisticsPage';

interface StatisticalMoneyProps {
    data:Order[]
}
const StatisticalMoney:React.FC<StatisticalMoneyProps> = ({data})=>{
    const totalMoney = data.reduce((sum, order) => sum + order.amount, 0);
    const totalTransactions = data.length;
    const avgMoney = totalTransactions > 0 ? totalMoney / totalTransactions : 0;
  
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
    return(
         <>
            {/* Cards thống kê tiền mừng */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-500 text-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Tổng tiền mừng</h3>
                <p className="text-2xl font-bold mt-2">{formatMoney(totalMoney)}</p>
              </div>
              
              <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Số giao dịch</h3>
                <p className="text-3xl font-bold mt-2">{totalTransactions}</p>
              </div>
              
              
              
              <div className="bg-orange-500 text-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Số khách đã gửi</h3>
                <p className="text-3xl font-bold mt-2">
                  {new Set(data.map(o => o.guestId)).size}
                </p>
              </div>
            </div>

            {/* Danh sách giao dịch */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">💳 Danh sách giao dịch</h3>
                <p className="text-sm text-gray-600 mt-1">Hiển thị {data.length} giao dịch</p>
              </div>
              <div className="overflow-auto max-h-[500px]">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Thời gian</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Khách mời</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">SĐT</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Số tiền</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Lời nhắn</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Phương thức</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.map((order, index) => (
                      <tr key={order.orderId || index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {order.guest?.name || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {order.guest?.phone || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-green-600">
                          {formatMoney(order.amount)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                          {order.description}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            {order.paymentType}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {order.orderStatus === 'Success' ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                              ✅ Thành công
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                              ❌ Thất bại
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
                  <p>Chưa có giao dịch nào.</p>
                </div>
              )}
            </div>

            {/* Summary tiền mừng */}
            <div className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg p-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">💰 Tóm tắt tiền mừng</h3>
                <p className="text-lg">
                  Tổng tiền mừng đã nhận: <strong>{formatMoney(totalMoney)}</strong>
                </p>
                <p className="mt-2 opacity-90">
                  {totalTransactions} giao dịch từ {new Set(data.map(o => o.guestId)).size} khách mời • 
                  Trung bình: {formatMoney(avgMoney)}/giao dịch
                </p>
              </div>
            </div>
          </>

    )
}
export default StatisticalMoney