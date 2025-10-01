import React, { useState, useMemo, useEffect } from 'react';
import type { Guest, Project } from '~/layoutEven/layoutEven';
import { useNavigate, useParams } from "react-router-dom";
import '../layoutEven/layoutEven.css';
import StatisticalGuest from '~/StatisticsPage/StatisticalGuest';
import StatisticalMoney from '~/StatisticsPage/StatisticalMoney';
// Type mới cho Order
export interface Order {
  orderId: string;
  description: string;
  bankCode: string;
  amount: number;
  responseCode: string;
  transactionStatus: string;
  orderStatus: string;
  txnRef: string;
  paymentType: string;
  orderType: string;
  guestId: string;
  guest: Guest;
  createdAt: string;
}

export default function SimpleStatisticsPage() {
  const navigate = useNavigate();
  const [isUser, setUser] = useState<string | null>(null);
  const [isUserID, setUserID] = useState<string | null>("");
  const [data, setData] = useState<Project[]>([]);
  
  // Tab state - MỚI
  const [activeTab, setActiveTab] = useState<'guests' | 'money'>('guests');
  
  // State cho orders - MỚI
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("userInvitation");
    !storedUser && navigate("/");
    setUser(storedUser);
  }, []);
  
  const [guests, setGuest] = useState<Guest[]>([]);
  
  // States cho filter
  const [selectedProject, setSelectedProject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  
  useEffect(() => {
    isUserID && getDataProject();
  }, [isUserID]);
  
  useEffect(() => {
    isUser && getDataUser();
  }, [isUser]);
  
  const getDataProject = async () => {
    if (isUser == "") return;
    const url = `${import.meta.env.VITE_API_URL}/api/Project/user/${isUserID}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      const data = await response.json();
      setData(data);
      console.log(data[0].projectID);
      await GetGuest(data[0].projectID);
      await GetOrders(data[0].projectID); // MỚI - Lấy orders
    } catch (error) {
      console.error(error);
    }
  };
  
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
  
  const GetGuest = async (projectid: string) => {
    if (isUser == "") return;
    const url = `${import.meta.env.VITE_API_URL}/api/Guest/project/${projectid}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      const data = await response.json();
      if (data.length > 0) {
        const processedGuests = data.map((x: Guest) => ({
          ...x,
          isView: true
        }));
        const sortedTable = [...processedGuests].sort((a, b) => {
          const maNhomA = Number(a.sort) || 0;
          const maNhomB = Number(b.sort) || 0;
          return maNhomA - maNhomB;
        });
        setGuest(sortedTable);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  // Hàm mới lấy orders
  const GetOrders = async (projectid: string) => {
    if (isUser == "") return;
    const url = `${import.meta.env.VITE_API_URL}/api/Report/GetPaymentByProject?projectid=${projectid}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const groups = useMemo(() => {
    const groupMap = new Map();
    guests.forEach(guest => {
      if (guest.groupID && !groupMap.has(guest.groupID)) {
        groupMap.set(guest.groupID, {
          id: guest.groupID,
          name: guest.groupInfo?.groupName || `Nhóm ${guest.groupID}`
        });
      }
    });
    return Array.from(groupMap.values());
  }, [guests]);
  
  // Filter guests
  const filteredGuests = useMemo(() => {
    return guests.filter(guest => {
      if (selectedProject !== 'all' && guest.projectID !== selectedProject) {
        return false;
      }
      
      if (selectedGroup !== 'all' && guest.groupID !== parseInt(selectedGroup)) {
        return false;
      }
      
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return guest.name.toLowerCase().includes(searchLower) || 
               guest.phone.includes(searchTerm);
      }
      
      return true;
    });
  }, [guests, selectedProject, selectedGroup, searchTerm]);
  
  useEffect(() => {
    if (selectedProject && selectedProject !== 'all') {
      GetGuest(selectedProject);
      GetOrders(selectedProject); // MỚI
    }
  }, [selectedProject]);
  
  // Tính toán thống kê cơ bản
  const totalGuests = filteredGuests.length;
  const totalSubGuests = filteredGuests.reduce((sum, guest) => sum + (guest.subGuests?.length || 0), 0);
  const totalAttendees = totalGuests + totalSubGuests;
  const confirmedGuests = filteredGuests.filter(g => g.isConfirm === 1).length;
  const maleGuests = filteredGuests.filter(g => g.gender === 'Nam').length;
  const femaleGuests = filteredGuests.filter(g => g.gender === 'Nữ').length;
  
  // Thống kê tiền mừng - MỚI
  const filteredOrders = useMemo(() => {
    let filtered = orders.filter(order => order.orderStatus === 'Success');
    
    if (selectedProject !== 'all') {
      filtered = filtered.filter(order => order.guest?.projectID === selectedProject);
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(order =>
        order.guest?.name.toLowerCase().includes(searchLower) ||
        order.guest?.phone.includes(searchTerm) ||
        order.description.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  }, [orders, selectedProject, searchTerm]);
  
  
  
  return (
    <div className="min-h-screen bg-gray-100 p-4 w-full">
      <div className="w-full max-w-full mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">📊 Thống kê dự án cưới</h1>
          <p className="text-gray-600 mt-2">Tổng quan khách mời và tiền mừng</p>
        </div>

        {/* Tabs - MỚI */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('guests')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'guests'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              👥 Thống kê khách mời
            </button>
            <button
              onClick={() => setActiveTab('money')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'money'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              💰 Thống kê tiền mừng
            </button>
          </div>
        </div>

        {/* Bộ lọc dự án */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">🔍 Bộ lọc</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Lọc dự án */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dự án</label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {data?.map(project => (
                  <option key={project.projectID} value={project.projectID}>
                    {project.projectName}
                  </option>
                ))}
              </select>
            </div>

            {/* Tìm kiếm */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
              <input
                type="text"
                placeholder={activeTab === 'guests' ? "Tên khách mời hoặc số điện thoại..." : "Tên khách hoặc ghi chú..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Lọc nhóm/bàn - chỉ hiện ở tab khách mời */}
            {activeTab === 'guests' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nhóm</label>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tất cả nhóm</option>
                  {groups.map(group => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Nội dung tab khách mời */}
        {activeTab === 'guests' && (
          <StatisticalGuest
            data={filteredGuests}
            guestLength={guests.length}
          />
        )}

        {/* Nội dung tab tiền mừng - MỚI */}
        {activeTab === 'money' && (
          <StatisticalMoney
            data={filteredOrders}
          />
        )}
      </div>
    </div>
  );
}