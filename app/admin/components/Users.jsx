'use client';

import { useState } from 'react';
import { useMockData } from '../hooks/useMockData';
import { X, Star } from 'lucide-react';

export default function Users() {
  const { users, orders, blockUnblockUser } = useMockData();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const blockedUsers = users.filter(u => u.status === 'blocked').length;

  const StatCard = ({ label, value, color }) => (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getUserOrders = (userId) => {
    return orders.filter(order => order.email === selectedUser.email);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleBlockUnblock = (userId) => {
    blockUnblockUser(userId);
    if (selectedUser && selectedUser.id === userId) {
      const updatedUser = users.find(u => u.id === userId);
      setSelectedUser(updatedUser);
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Users Management</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <StatCard
            label="Total Users"
            value={totalUsers}
            color="text-blue-600"
          />
          <StatCard
            label="Active Users"
            value={activeUsers}
            color="text-green-600"
          />
          <StatCard
            label="Blocked Users"
            value={blockedUsers}
            color="text-red-600"
          />
        </div>

        {/* Filter and Search */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="bg-card border border-border rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-foreground">Name</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-foreground hidden sm:table-cell">Email</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-foreground hidden md:table-cell">Phone</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-foreground hidden lg:table-cell">Orders</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-foreground hidden lg:table-cell">Total Spent</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted transition-colors">
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-foreground font-medium text-xs sm:text-sm">{user.name}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-foreground hidden sm:table-cell text-xs sm:text-sm">{user.email}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-foreground hidden md:table-cell text-xs sm:text-sm">{user.phone}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-foreground font-semibold hidden lg:table-cell text-xs sm:text-sm">{user.orders}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-foreground font-semibold hidden lg:table-cell text-xs sm:text-sm">₹{user.totalSpent.toLocaleString()}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? 'Active' : 'Blocked'}
                    </span>
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 space-x-2 sm:space-x-3">
                    <button
                      onClick={() => handleViewDetails(user)}
                      className="text-primary hover:opacity-80 font-semibold text-xs transition-opacity whitespace-nowrap"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleBlockUnblock(user.id)}
                      className={`font-semibold text-xs transition-opacity whitespace-nowrap ${
                        user.status === 'active'
                          ? 'text-red-600 hover:text-red-800'
                          : 'text-green-600 hover:text-green-800'
                      }`}
                    >
                      {user.status === 'active' ? 'Block' : 'Unblock'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* User Details Modal */}
        {showUserDetails && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 flex items-center justify-between bg-white border-b border-gray-300 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">User Details</h2>
                <button
                  onClick={() => setShowUserDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 sm:p-6">
                {/* User Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase">Name</p>
                    <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">{selectedUser.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase">Status</p>
                    <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        selectedUser.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedUser.status === 'active' ? 'Active' : 'Blocked'}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase">Email</p>
                    <p className="text-base font-medium text-gray-900 mt-1 break-all">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase">Phone</p>
                    <p className="text-base font-medium text-gray-900 mt-1">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase">Join Date</p>
                    <p className="text-base font-medium text-gray-900 mt-1">{selectedUser.joinDate}</p>
                  </div>
                </div>

                {/* Order Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-xs text-blue-600 font-semibold uppercase mb-1">Total Orders</p>
                    <p className="text-2xl font-bold text-blue-800">{selectedUser.orders}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-xs text-green-600 font-semibold uppercase mb-1">Delivered Orders</p>
                    <p className="text-2xl font-bold text-green-800">
                      {getUserOrders(selectedUser.id).filter(o => o.status === 'Delivered').length}
                    </p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-xs text-red-600 font-semibold uppercase mb-1">Cancelled Orders</p>
                    <p className="text-2xl font-bold text-red-800">
                      {getUserOrders(selectedUser.id).filter(o => o.status === 'Cancelled').length}
                    </p>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-xs sm:text-sm text-purple-700 font-semibold">Total Amount Spent</p>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-900">₹{selectedUser.totalSpent.toLocaleString()}</p>
                </div>

                {/* Order History with Reviews */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">📦 Order History & Reviews</h3>
                <div className="space-y-4 mb-6">
                  {getUserOrders(selectedUser.id).length > 0 ? (
                    getUserOrders(selectedUser.id).map((order) => {
                      const reviewForOrder = selectedUser.reviews?.find(r => r.orderProductName === order.id || r.productName) || null;
                      return (
                        <div key={order.id} className="bg-linear-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-blue-300 transition-all">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Order Details */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="font-bold text-gray-900 text-sm sm:text-base">Order: {order.id}</p>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                  order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                  order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                                  order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600">Amount: <span className="font-bold text-gray-900">₹{order.amount.toLocaleString()}</span></p>
                              <p className="text-xs sm:text-sm text-gray-600">Date: <span className="font-bold text-gray-900">{order.date}</span></p>
                            </div>

                            {/* Review Section */}
                            {reviewForOrder ? (
                              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex flex-col justify-between">
                                <div>
                                  <p className="text-xs sm:text-sm font-bold text-gray-900 mb-2">⭐ Customer Review</p>
                                  <div className="flex gap-1 mb-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        size={14}
                                        className={`${
                                          i < reviewForOrder.rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <p className="text-xs text-gray-700 italic">"{reviewForOrder.text}"</p>
                                </div>
                                <p className="text-xs text-yellow-700 font-semibold mt-2">Product: {reviewForOrder.productName}</p>
                              </div>
                            ) : (
                              <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 flex items-center justify-center">
                                <p className="text-xs sm:text-sm text-gray-600">No review for this order</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-8 text-center">
                      <p className="text-gray-600 font-semibold">No orders yet</p>
                    </div>
                  )}
                </div>

                {/* User Reviews */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Reviews & Ratings</h3>
                {selectedUser.reviews && selectedUser.reviews.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    {selectedUser.reviews.map((review, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-gray-900">{review.productName}</h4>
                            <div className="flex gap-1 mt-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className={`${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-base sm:text-lg font-bold text-yellow-500">{review.rating}/5</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 italic">"{review.text}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-6 text-center">
                    <p className="text-gray-600 text-sm">No reviews yet</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleBlockUnblock(selectedUser.id)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-opacity text-sm ${
                      selectedUser.status === 'active'
                        ? 'bg-red-100 text-red-800 hover:opacity-80'
                        : 'bg-green-100 text-green-800 hover:opacity-80'
                    }`}
                  >
                    {selectedUser.status === 'active' ? 'Block User' : 'Unblock User'}
                  </button>
                  <button
                    onClick={() => setShowUserDetails(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-900 font-medium text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
