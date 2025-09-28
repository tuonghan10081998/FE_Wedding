import React, { useState,useEffect } from 'react';
import { Send, Users, Check, Clock, X, Plus, Mail, Phone, User, Search, QrCode } from 'lucide-react';
import type { Guest } from '~/layoutEven/layoutEven';
import { ToastContainer, toast } from "react-toastify";
interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data:Guest[]
  project:string
}
const InvitationSender:React.FC<InvitationModalProps> = ({
    isOpen,
    onClose,
    data,
    project
}) => {
  const [guests, setGuests] = useState<Guest[]>([ ]);

  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
 
  useEffect(() => {
    data && setGuests(data)
  },[data])
  const [sendingProgress, setSendingProgress] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [filterGender, setFilterGender] = useState<string>('all');

  const handleSelectGuest = (guestId: string) => {
    setSelectedGuests(prev => 
      prev.includes(guestId) 
        ? prev.filter(id => id !== guestId)
        : [...prev, guestId]
    );
  };
useEffect(() => {
  data && setGuests(data)
}, [data])

// Thêm useEffect mới này để auto-select pending guests khi modal mở
useEffect(() => {
  if (isOpen && guests.length > 0) {
    const pendingGuestIds = guests
      .filter(guest => guest.status === 'pending' && guest.isActive !== false)
      .map(guest => guest.guestID);
    
    setSelectedGuests(pendingGuestIds);
  }
}, [isOpen, guests]); // Trigger khi modal mở hoặc danh sách guests thay đổi

// Nếu bạn muốn reset selection khi đóng modal, thêm:
useEffect(() => {
  if (!isOpen) {
    setSelectedGuests([]);
    setSearchTerm('');
    setFilterGroup('all');
    setShowSearchDropdown(false);
  }
}, [isOpen]);
  const handleSelectAll = () => {
    const pendingGuests = guests.filter(g => g.status === 'pending' && g.isActive !== false).map(g => g.guestID);
    setSelectedGuests(selectedGuests.length === pendingGuests.length ? [] : pendingGuests);
  };

  
  const handleSendInvitations = async () => {
    setSendingProgress(true);
    
    const dataSave =  await PostSeant(project); 
    if (dataSave.status === 201 || dataSave.status === 200) {
        setSendingProgress(false);
        toast.success("Gửi thiệp thành công");
        setGuests(prev =>
            prev.map(x => ({
                ...x,
                status: "sent"
            }))
         );
    }
     
  };
const PostSeant = async (projectId: string) => {
    
  const url = `${import.meta.env.VITE_API_URL}/api/Invitation/SendInvitaion?ProjectID=${projectId}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "accept": "*/*"   // giống như Swagger gửi
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  
  const data = await response.json(); // sẽ nhận true/false
  return response;
};
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'sent': return 'Đã gửi';
      case 'pending': return 'Chờ gửi';
      case 'failed': return 'Gửi lỗi';
      default: return 'Không xác định';
    }
  };

  const getGenderColor = (gender: string) => {
    return gender === 'Nam' ? 'text-blue-600' : 'text-pink-600';
  };

  // Get unique groups for filter
  const uniqueGroups = Array.from(new Set(guests.map(g => g.groupInfo?.groupName).filter(Boolean)));

  // Filter guests based on search term and filters
  const filteredGuests = guests.filter(guest => {
    const matchesSearch = !searchTerm || 
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone.includes(searchTerm) ||
      guest.mail?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGroup = filterGroup === 'all' || guest.groupInfo?.groupName === filterGroup;
    const isActiveGuest = guest.isActive !== false;
    
    return matchesSearch && matchesGroup && isActiveGuest;
  }).sort((a, b) => (a.sort || 0) - (b.sort || 0));

  // Create search suggestions
  const searchSuggestions = guests.filter(guest => 
    searchTerm && guest.isActive !== false && (
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone.includes(searchTerm) ||
      guest.mail?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ).slice(0, 5);

  const handleSearchSelect = (guest: Guest) => {
    setSearchTerm(guest.name);
    setShowSearchDropdown(false);
    if (!selectedGuests.includes(guest.guestID) && guest.status === 'pending') {
      setSelectedGuests(prev => [...prev, guest.guestID]);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchDropdown(value.length > 0 && searchSuggestions.length > 0);
  };

  const pendingCount = guests.filter(g => g.status === 'pending' && g.isActive !== false).length;
  const sentCount = guests.filter(g => g.status === 'sent' && g.isActive !== false).length;
  const activeGuestCount = guests.filter(g => g.isActive !== false).length;
  if (!isOpen) return null;
return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative w-full h-full bg-white overflow-auto">
      {/* Nút Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-50"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Toàn bộ nội dung cũ của bạn */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 w-full h-full overflow-auto">
        <div className="container mx-auto px-4 py-4">
          {/* --- PHẦN CODE CỦA BẠN BÊ NGUYÊN VÀO ĐÂY --- */}
          {/* Header */}
          <div className="">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Gửi Thiệp Mời
          </h1>
          <p className="text-gray-600">Quản lý và gửi thiệp mời cho danh sách khách mời của bạn</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col gap-4">
            {/* Search and Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="md:col-span-2 relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm khách mời</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm theo tên, số điện thoại hoặc email..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setShowSearchDropdown(searchTerm.length > 0 && searchSuggestions.length > 0)}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  
                  {/* Search Dropdown */}
                  {showSearchDropdown && searchSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {searchSuggestions.map((guest) => (
                        <div
                          key={guest.guestID}
                          onClick={() => handleSearchSelect(guest)}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">{guest.name}</div>
                              <div className="text-sm text-gray-500">{guest.phone} • {guest.mail}</div>
                              {guest.groupInfo?.groupName && (
                                <div className="text-xs text-gray-400">{guest.groupInfo.groupName}</div>
                              )}
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(guest.status)}`}>
                              {getStatusText(guest.status)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Group Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nhóm khách</label>
                <select
                  value={filterGroup}
                  onChange={(e) => setFilterGroup(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tất cả nhóm</option>
                  {uniqueGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-3">
                <button
                  onClick={handleSelectAll}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  {selectedGuests.length === pendingCount ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                </button>
                
               
              </div>
              
              {selectedGuests.length > 0 && (
                <button
                  onClick={handleSendInvitations}
                  disabled={sendingProgress}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  {sendingProgress ? 'Đang gửi...' : `Gửi thiệp (${selectedGuests.length})`}
                </button>
              )}
            </div>

            {/* Filter Results Info */}
            {(searchTerm || filterGroup !== 'all') && (
              <div className="flex items-center justify-between text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <span>Hiển thị {filteredGuests.length} trong số {activeGuestCount} khách mời</span>
                </div>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterGroup('all');
                    setShowSearchDropdown(false);
                  }}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Guest List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Danh sách khách mời</h2>
          </div>
          
          <div className="divide-y divide-gray-200 max-h-[700px] overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-2">
            {filteredGuests.map((guest) => (
              <div
                key={guest.guestID}
                className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${
                  selectedGuests.includes(guest.guestID) ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedGuests.includes(guest.guestID)}
                      onChange={() => handleSelectGuest(guest.guestID)}
                      disabled={guest.status === 'sent'}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <h3 className="font-semibold text-gray-800">{guest.name}</h3>
                        <span className={`text-sm font-medium ${getGenderColor(guest.gender)}`}>
                          ({guest.gender})
                        </span>
                        {guest.groupInfo?.groupName && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {guest.groupInfo.groupName}
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span className="truncate">{guest.mail}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {guest.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(guest.status)}`}>
                      {getStatusText(guest.status)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
 {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Tổng khách mời</p>
                <p className="text-2xl font-bold text-gray-800">{activeGuestCount}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Chờ gửi</p>
                <p className="text-2xl font-bold text-gray-800">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Đã gửi</p>
                <p className="text-2xl font-bold text-gray-800">{sentCount}</p>
              </div>
              <Check className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>
        {/* Progress Indicator */}
        {sendingProgress && (
          <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full mx-4">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Đang gửi thiệp mời...</h3>
                <p className="text-gray-600">Vui lòng đợi trong giây lát</p>
                <div className="mt-4 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((selectedGuests.length - selectedGuests.filter(id => guests.find(g => g.guestID === id)?.status === 'pending').length) / selectedGuests.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredGuests.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {searchTerm || filterGroup !== 'all' || filterGender !== 'all' 
                ? 'Không tìm thấy khách mời phù hợp' 
                : 'Chưa có khách mời nào'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterGroup !== 'all' || filterGender !== 'all' 
                ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm' 
                : 'Hãy thêm khách mời đầu tiên để bắt đầu'}
            </p>
            {searchTerm || filterGroup !== 'all' || filterGender !== 'all' ? (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterGroup('all');
                  setFilterGender('all');
                  setShowSearchDropdown(false);
                }}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Xóa bộ lọc
              </button>
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 mx-auto"
              >
                <Plus className="h-5 w-5" />
                Thêm khách mời đầu tiên
              </button>
            )}
          </div>
        )}
      </div>

          {/* Toàn bộ phần Search, Guest List, Stats Cards, Progress, Empty state... */}
          {/* (bạn giữ nguyên như code hiện tại, chỉ copy nguyên khối dán vào đây) */}
        </div>
      </div>
    </div>
  </div>
);

};

export default InvitationSender;