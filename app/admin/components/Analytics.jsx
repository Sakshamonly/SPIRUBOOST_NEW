'use client';

import { useState } from 'react';
import { useMockData } from '../hooks/useMockData.js';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, DollarSign, TrendingDown } from 'lucide-react';

export default function Analytics() {
  const { orders, products, analyticsData } = useMockData();
  const [timeframe, setTimeframe] = useState('day');

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const postpaidOrdersRevenue = orders
    .filter(o => o.paymentStatus === 'Postpaid')
    .reduce((sum, o) => sum + o.amount, 0);
  const prepaidOrdersRevenue = orders
    .filter(o => o.paymentStatus === 'Prepaid')
    .reduce((sum, o) => sum + o.amount, 0);
  
  const chartData = timeframe === 'day' ? analyticsData.daily : timeframe === 'week' ? analyticsData.weekly : analyticsData.monthly;

  const topProducts = products
    .sort((a, b) => b.quantitySold - a.quantitySold)
    .slice(0, 5);

  const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <div className="bg-linear-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && <p className="text-xs text-green-600 font-semibold mt-1">↑ {trend}% from last period</p>}
        </div>
        <div className={`p-4 rounded-lg ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto bg-linear-to-b from-gray-50 to-white">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📊 Analytics Dashboard</h1>
          <p className="text-gray-600">Track your business performance and growth metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={DollarSign}
            label="Total Revenue"
            value={`₹${totalRevenue.toLocaleString()}`}
            color="bg-green-100 text-green-600"
            trend="12"
          />
          <StatCard
            icon={TrendingUp}
            label="Prepaid Orders Revenue"
            value={`₹${prepaidOrdersRevenue.toLocaleString()}`}
            color="bg-yellow-100 text-yellow-600"
            trend="10"
          />
          <StatCard
            icon={TrendingUp}
            label="Postpaid Orders Revenue"
            value={`₹${postpaidOrdersRevenue.toLocaleString()}`}
            color="bg-blue-100 text-blue-600"
            trend="8"
          />
          <StatCard
            icon={Package}
            label="Top Product Sold"
            value={topProducts[0]?.name || 'N/A'}
            color="bg-purple-100 text-purple-600"
            trend="15"
          />
        </div>

        {/* Timeframe Selector */}
        <div className="mb-8 flex gap-3">
          <button
            onClick={() => setTimeframe('day')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              timeframe === 'day'
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400'
            }`}
          >
            📅 Daily
          </button>
          <button
            onClick={() => setTimeframe('week')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              timeframe === 'week'
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400'
            }`}
          >
            📊 Weekly
          </button>
          <button
            onClick={() => setTimeframe('month')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              timeframe === 'month'
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400'
            }`}
          >
            📈 Monthly
          </button>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Trend Chart */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
            <h2 className="text-xl font-bold text-gray-900 mb-4">💰 Sales Trend <span className="text-sm font-normal text-gray-600">({timeframe === 'day' ? 'Daily' : timeframe === 'week' ? 'Weekly' : 'Monthly'})</span></h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '2px solid #3b82f6', borderRadius: '8px' }} />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} name="Sales (₹)" dot={{ fill: '#3b82f6', r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Orders Chart */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📦 Order Count <span className="text-sm font-normal text-gray-600">({timeframe === 'day' ? 'Daily' : timeframe === 'week' ? 'Weekly' : 'Monthly'})</span></h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '2px solid #10b981', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="orders" fill="#10b981" name="Orders" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-6">⭐ Top Selling Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="bg-linear-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-2xl font-bold rounded-full w-8 h-8 flex items-center justify-center ${
                    index === 0 ? 'bg-yellow-400 text-white' : 
                    index === 1 ? 'bg-gray-400 text-white' : 
                    index === 2 ? 'bg-orange-400 text-white' : 
                    'bg-blue-100 text-blue-600'
                  }`}>#{index + 1}</span>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">Sold: {product.quantitySold}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">{product.name}</h3>
                <p className="text-lg font-bold text-blue-600">₹{product.price.toFixed(0)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
