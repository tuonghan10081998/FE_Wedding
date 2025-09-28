import React, { useState, useMemo,useEffect } from 'react';
import type { Guest,Project } from '~/layoutEven/layoutEven';
import { useNavigate, useParams } from "react-router-dom";

export default function SimpleStatisticsPage() {
   const navigate = useNavigate();
   const [isUser, setUser] = useState<string | null>(null);
   const [isUserID, setUserID] = useState<string | null>("");
   const [data,setData] = useState<Project[]>([])
   useEffect(() => {
    const storedUser = localStorage.getItem("userInvitation");
        !storedUser && navigate("/");
        setUser(storedUser);
    }, []);
    const [guests,setGuest] = useState<Guest[]>([]) 
    // States cho filter
    const [selectedProject, setSelectedProject] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('all');
    
    useEffect(()=> {
        isUserID && getDataProject()
    },[isUserID])
    useEffect(() => {
        isUser && getDataUser()
    },[isUser])
    const getDataProject = async () => {
        if (isUser == "") return;
        const url = `${import.meta.env.VITE_API_URL}/api/Project/user/${isUserID}`;
        try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Response status: ${response.status}`);

        const data = await response.json();

        setData(data)
        console.log(data[0].projectID)
         await GetGuest(data[0].projectID)
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
        var dataUser = data.find((x:any) => x.mail === isUser)
        setUserID(dataUser.userID)
        
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
                // Xử lý guests chính
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
      
      // Filter by group
      if (selectedGroup !== 'all' && guest.groupID !== parseInt(selectedGroup)) {
        return false;
      }
      
      // Filter by search term (name or phone)
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return guest.name.toLowerCase().includes(searchLower) || 
               guest.phone.includes(searchTerm);
      }
      
      return true;
    });
  }, [guests, selectedProject, selectedGroup, searchTerm]);
  useEffect(() => {
    selectedProject && GetGuest(selectedProject)
  },[selectedProject])
  // Tính toán thống kê cơ bản
  const totalGuests = filteredGuests.length;
  const totalSubGuests = filteredGuests.reduce((sum, guest) => sum + (guest.subGuests?.length || 0), 0);
  const totalAttendees = totalGuests + totalSubGuests;
  const confirmedGuests = filteredGuests.filter(g => g.isConfirm === 1).length;
  const maleGuests = filteredGuests.filter(g => g.gender === 'Nam').length;
  const femaleGuests = filteredGuests.filter(g => g.gender === 'Nữ').length;
  
  return (
    <div className="min-h-screen bg-gray-100 p-4 w-full">
      <div className="w-full max-w-full mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">📊 Thống kê khách mời</h1>
          <p className="text-gray-600 mt-2">Tổng quan dự án cưới</p>
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
                placeholder="Tên khách mời hoặc số điện thoại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Lọc nhóm/bàn */}
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
          </div>
        </div>

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
            <p className="text-sm text-gray-600 mt-1">Hiển thị {filteredGuests.length} / {guests.length} khách mời</p>
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredGuests.map((guest, index) => (
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
                      ) : (
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                          ⏳ Chờ xác nhận
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Hiển thị khi không có kết quả */}
          {filteredGuests.length === 0 && (
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
    </div>
  );
}