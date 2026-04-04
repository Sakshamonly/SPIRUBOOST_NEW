'use client';

import { useState } from 'react';
import { useMockData } from '../hooks/useMockData.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, X } from 'lucide-react';


export default function Overview() {
  const { orders, products, analyticsData } = useMockData();
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [showOutOfStockModal, setShowOutOfStockModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const totalOrders = orders.length;
  const activeOrders = orders.filter(o => ['Processing', 'Shipped', 'Booked'].includes(o.status)).length;
  const totalRevenue = orders.filter(o => o.status === 'Delivered').reduce((sum, o) => sum + o.amount, 0);
  const lowStockProducts = products.filter(p => p.stock < 10 && p.stock > 0);
  const outOfStockProducts = products.filter(p => p.stock === 0);

  const monthlyData = analyticsData.monthly;
  const orderStatusData = [
    { name: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length },
    { name: 'Cancelled', value: orders.filter(o => o.status === 'Cancelled').length },
    { name: 'Processing', value: orders.filter(o => o.status === 'Processing').length },
  ];

  const COLORS = ['#10b981', '#ef4444', '#f59e0b'];

  const handleExportClick = (format) => {
    const exportColumns = ['ID', 'Customer', 'Amount', 'Status', 'Payment Status', 'Date'];
    const exportData = orders.map(o => ({
      'ID': o.id,
      'Customer': o.customer,
      'Amount': `₹${o.amount}`,
      'Status': o.status,
      'Payment Status': o.paymentStatus,
      'Date': o.date,
    }));
    handleExport(exportData, exportColumns, 'overview-orders', 'Orders Report', format);
    setShowExportMenu(false);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Booked': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8 scroll-smooth bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">📊 Business Overview</h1>
            <p className="text-gray-600">Real-time insights into your store performance</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <Download size={18} />
              📥 Export
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => handleExportClick('csv')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-b font-medium"
                >
                  📄 Export as CSV
                </button>
                <button
                  onClick={() => handleExportClick('pdf')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 font-medium"
                >
                  📄 Export as PDF
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-6 border-2 border-blue-200 hover:shadow-lg hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-bold uppercase tracking-wide mb-2">📦 Orders</p>
                <p className="text-3xl font-bold text-blue-900">{totalOrders}</p>
                <p className="text-blue-600 text-xs mt-2 font-semibold">Lifetime orders</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>

          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl shadow-md p-6 border-2 border-green-200 hover:shadow-lg hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-bold uppercase tracking-wide mb-2">🚀 Active</p>
                <p className="text-3xl font-bold text-green-900">{activeOrders}</p>
                <p className="text-green-600 text-xs mt-2 font-semibold">In progress</p>
              </div>
              <div className="text-4xl">⚡</div>
            </div>
          </div>

          <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl shadow-md p-6 border-2 border-purple-200 hover:shadow-lg hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-bold uppercase tracking-wide mb-2">💰 Revenue</p>
                <p className="text-3xl font-bold text-purple-900">₹{totalRevenue.toLocaleString()}</p>
                <p className="text-purple-600 text-xs mt-2 font-semibold">Delivered</p>
              </div>
              <div className="text-4xl">💵</div>
            </div>
          </div>

          <div 
            onClick={() => setShowLowStockModal(true)}
            className="bg-linear-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-md p-6 border-2 border-yellow-200 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-700 text-sm font-bold uppercase tracking-wide mb-2">⚠️ Low Stock</p>
                <p className="text-3xl font-bold text-yellow-900">{lowStockProducts.length}</p>
                <p className="text-yellow-600 text-xs mt-2 font-semibold">Click to view</p>
              </div>
              <div className="text-4xl">📉</div>
            </div>
          </div>

          <div 
            onClick={() => setShowOutOfStockModal(true)}
            className="bg-linear-to-br from-red-50 to-red-100 rounded-xl shadow-md p-6 border-2 border-red-200 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 text-sm font-bold uppercase tracking-wide mb-2">❌ Out Stock</p>
                <p className="text-3xl font-bold text-red-900">{outOfStockProducts.length}</p>
                <p className="text-red-600 text-xs mt-2 font-semibold">Click to view</p>
              </div>
              <div className="text-4xl">📛</div>
            </div>
          </div>
        </div>

        {/* Enhanced Chart Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📈 Monthly Sales Trend</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #3b82f6',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#3b82f6" 
                name="Sales (₹)" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Enhanced Recent Orders Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">🎁 Recent Orders</h3>
            <span className="text-sm text-gray-600 font-semibold">Latest {Math.min(6, orders.length)} orders</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {orders.slice(0, 6).map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:scale-105 transition-all border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1 font-semibold">Order ID</p>
                    <p className="text-lg font-bold text-gray-900">{order.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-3 mb-4 border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">Customer</p>
                      <p className="font-semibold text-gray-900">{order.customer}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{order.items} items</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Email</p>
                    <p className="font-medium text-gray-700 text-sm">{order.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Date</p>
                    <p className="font-medium text-gray-900">{order.date}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Total</p>
                    <p className="text-2xl font-bold text-green-600">₹{order.amount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 font-semibold">Payment</p>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      order.paymentStatus === 'Prepaid' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showLowStockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-96 overflow-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Low Stock Items</h2>
              <button
                onClick={() => setShowLowStockModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {lowStockProducts.length > 0 ? (
                <div className="space-y-4">
                  {lowStockProducts.map(product => (
                    <div key={product.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-600">{product.stock}</p>
                        <p className="text-xs text-gray-600">units left</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600">No low stock items</p>
              )}
            </div>
          </div>
        </div>
      )}

      {showOutOfStockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-96 overflow-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Out of Stock Items</h2>
              <button
                onClick={() => setShowOutOfStockModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {outOfStockProducts.length > 0 ? (
                <div className="space-y-4">
                  {outOfStockProducts.map(product => (
                    <div key={product.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">{product.stock}</p>
                        <p className="text-xs text-gray-600">out of stock</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600">No out of stock items</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
