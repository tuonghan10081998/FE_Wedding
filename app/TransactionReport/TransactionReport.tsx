import React, { useState, useMemo,useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, User } from 'lucide-react';
import DateRangeWithPresets from "~/Invitationpage/DateRangeWithPresets";
import moment from "moment";
import '../PlanEditor/admin.css'
import '../layoutEven/layoutEven.css'
// Type Definitions
interface Transaction {
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
  planId: string | null;
  plan: {
    planID: string;
    planName: string;
    price: number;
    maxLayOut: number;
    maxGuests: number;
    maxTable: number;
    sendInvitation: number;
    isExport: number;
  } | null;
  userId: string;
  user: {
    userID: string;
    userName: string;
    password: string;
    mail: string;
    phone: string;
    avatar: string;
    role: string;
    planID: string | null;
    plan: {
      planID: string;
      planName: string;
      price: number;
      maxLayOut: number;
      maxGuests: number;
      maxTable: number;
      sendInvitation: number;
      isExport: number;
    } | null;
    isActive: number;
    refreshToken: string;
    refreshTokenExpiry: string;
    codeResetPass: number;
    isConfirmMail: number;
    projects: {
      [key: string]: any;
    }[];
  } | null;
  guestId: string | null;
  guest: {
    [key: string]: any;
  } | null;
  createdAt: string;
}
interface Statistics {
  total: number;
  avgTransaction: number;
  uniqueUsers: number;
  successRate: number;
  byDate: Record<string, number>;
  byPackage: Record<string, number>;
}

interface ChartDataItem {
  date?: string;
  name?: string;
  amount?: number;
  value?: number;
  [key: string]: string | number | undefined;
}

type TabType = 'overview' | 'details';

// Sample Data


const TransactionReport: React.FC = () => {
  const [transactionData,settransactionData] = useState<Transaction[]>([]);

  const [activeTab, setActiveTab] = useState<TabType>('details');
  const [dateRange, setDateRange] = useState({
    from: "2000-01-01", // Ngày đầu tháng
    to: "2100-12-31", // Ngày cuối tháng
  });
  const statistics = useMemo<Statistics>(() => {
   
    const total = transactionData.reduce((sum, t) => sum + t.amount, 0);
    console.log(total)
    const avgTransaction = total / transactionData.length;
    const uniqueUsers = new Set(transactionData.map(t => t.userId)).size;
    const successRate = (transactionData.filter(t => t.orderStatus === 'Success').length / transactionData.length) * 100;

    const byDate = transactionData.reduce<Record<string, number>>((acc, t) => {
      const date = new Date(t.createdAt).toLocaleDateString('vi-VN');
      acc[date] = (acc[date] || 0) + t.amount;
      return acc;
    }, {});

    const byPackage = transactionData.reduce<Record<string, number>>((acc, t) => {
      const pkg = t.description;
      acc[pkg] = (acc[pkg] || 0) + t.amount;
      return acc;
    }, {});

    return {
      total,
      avgTransaction,
      uniqueUsers,
      successRate,
      byDate,
      byPackage
    };
  }, [transactionData]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };
   const getData = async () => {
    var url = "";
    if(dateRange.from ==="2000-01-01")
      url= `${import.meta.env.VITE_API_URL}/api/Report/GetPaymentAllPackage`
    else
      url = `${import.meta.env.VITE_API_URL}/api/Report/GetPaymentByTime?fromdate=${moment(dateRange.from,"DD/MM/YYYY").format("YYYY-MM-DD")}&todate=${moment(dateRange.to,"DD/MM/YYYY").format("YYYY-MM-DD")}`
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      settransactionData(data)
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    dateRange && getData()
  },[dateRange])
  const dateChartData: ChartDataItem[] = Object.entries(statistics.byDate).map(([date, amount]) => ({
    date,
    amount
  }));

  const packageChartData: ChartDataItem[] = Object.entries(statistics.byPackage).map(([name, amount]) => ({
    name,
    value: amount
  }));

  const COLORS: string[] = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className=" bg-gradient-to-br from-slate-50 to-slate-100 p-2 main-admin">


      <div className="mx-auto">
        {/* Header */}
        <div className="mb-3">
          <p className="text-slate-600">Tổng quan và phân tích chi tiết các giao dịch</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mb-3">
            <div className="md:w-1/4 ">
              <div className="mb-1">
                  Chọn ngày
              </div>
             <DateRangeWithPresets 
            onDateChange={(range) => {
              if (range === "all") {
                setDateRange({ from: "2000-01-01", to: "2100-12-31" });
              } else {
                setDateRange({ from: range.from, to: range.to });
              }
            }}
            checkALLNgay={false}
          />
            </div>
            
           
          </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-slate-600 text-sm font-medium mb-1">Tổng Doanh Thu</h3>
            <p className="text-2xl font-bold text-slate-800">{formatCurrency(statistics.total)}</p>
          </div>

         

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <User className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-slate-600 text-sm font-medium mb-1">Số Người Dùng</h3>
            <p className="text-2xl font-bold text-slate-800">{statistics.uniqueUsers}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-slate-600 text-sm font-medium mb-1">Tổng Giao Dịch</h3>
            <p className="text-2xl font-bold text-slate-800">{transactionData.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b border-slate-200">
            <div className="flex space-x-4 px-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'details'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Chi Tiết Giao Dịch
              </button>
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Tổng Quan
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Line Chart */}
                  <div className="bg-slate-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Doanh Thu Theo Ngày</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={dateChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip
                          formatter={(value: number) => formatCurrency(value)}
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                        />
                        <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Pie Chart */}
                  <div className="bg-slate-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Phân Bổ Theo Gói</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={packageChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(props: any) => {
                            const { name, percent } = props;
                            return `${name}: ${(percent * 100).toFixed(0)}%`;
                          }}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {packageChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">So Sánh Doanh Thu Gói</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={packageChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                      />
                      <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Ngày giao dịch</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Gói dịch vụ</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Tên khách hàng</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Số điện thoại</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Mô Tả</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Ngân Hàng</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Số Tiền</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Trạng Thái</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {transactionData.map((transaction: Transaction) => (
                      <tr key={transaction.orderId} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                         <td className="px-4 py-4 text-sm text-slate-600">
                          {new Date(transaction.createdAt).toLocaleString('vi-VN')}
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-800 font-medium">{transaction.plan?.planName}</td>
                        <td className="px-4 py-4 text-sm text-slate-800 font-medium">{transaction.user?.userName}</td>
                        <td className="px-4 py-4 text-sm text-slate-800 font-medium">{transaction.user?.phone}</td>
                        <td className="px-4 py-4 text-sm text-slate-800 font-medium">{transaction.description}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {transaction.bankCode}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm font-semibold text-slate-800">
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            {transaction.orderStatus}
                          </span>
                        </td>
                      
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionReport;