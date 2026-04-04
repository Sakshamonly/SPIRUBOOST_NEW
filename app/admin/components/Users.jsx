'use client';

import { useEffect, useMemo, useState } from 'react';
import { X, Star, RefreshCw, Users as UsersIcon, Shield, Mail, Phone, CalendarDays, ShoppingBag } from 'lucide-react';
import API from '../../../lib/api';

const formatDate = (value) => {
  if (!value) return 'N/A';
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');

      const [usersResponse, ordersResponse] = await Promise.all([
        API.get('/users/admin/all'),
        API.get('/orders/admin/all'),
      ]);

      setUsers(usersResponse.data || []);
      setOrders(ordersResponse.data || []);
    } catch (err) {
      console.warn('Failed to fetch users');
      setError(err?.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const usersWithStats = useMemo(() => {
    return (users || []).map((user) => {
      const userOrders = orders.filter(
        (order) => String(order.user?._id || order.user) === String(user._id)
      );

      const totalSpent = userOrders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);
      const deliveredOrders = userOrders.filter(
        (order) => String(order.orderStatus || '').toLowerCase() === 'delivered'
      ).length;
      const cancelledOrders = userOrders.filter(
        (order) => String(order.orderStatus || '').toLowerCase() === 'cancelled'
      ).length;

      return {
        id: user._id,
        name: user.name || 'N/A',
        email: user.email || 'N/A',
        phone: user.mobile || 'N/A',
        joinDate: formatDate(user.createdAt),
        status: user.isEmailVerified ? 'active' : 'blocked',
        isAdmin: !!user.isAdmin,
        ordersCount: userOrders.length,
        totalSpent,
        deliveredOrders,
        cancelledOrders,
        ordersList: userOrders
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      };
    });
  }, [users, orders]);

  const totalUsers = usersWithStats.length;
  const activeUsers = usersWithStats.filter((u) => u.status === 'active').length;
  const blockedUsers = usersWithStats.filter((u) => u.status === 'blocked').length;

  const filteredUsers = usersWithStats.filter((user) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phone.toLowerCase().includes(query);
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const StatCard = ({ label, value, color, icon: Icon }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-2">{label}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`h-12 w-12 rounded-full flex items-center justify-center bg-gray-50 ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-4 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Users Management</h1>
            <p className="text-sm text-gray-500 mt-1">
              Live users and order activity from the backend
            </p>
          </div>

          <button
            onClick={() => {
              setRefreshing(true);
              fetchUsers();
            }}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition"
          >
            <RefreshCw size={18} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <StatCard label="Total Users" value={loading ? '...' : totalUsers} color="text-blue-600" icon={UsersIcon} />
          <StatCard label="Active Users" value={loading ? '...' : activeUsers} color="text-green-600" icon={Shield} />
          <StatCard label="Blocked Users" value={loading ? '...' : blockedUsers} color="text-red-600" icon={Shield} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900">Name</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900 hidden sm:table-cell">Email</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900 hidden md:table-cell">Phone</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900 hidden lg:table-cell">Orders</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900 hidden lg:table-cell">Total Spent</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-900 font-medium text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span>{user.name}</span>
                        {user.isAdmin && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                            Admin
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-600 hidden sm:table-cell text-xs sm:text-sm">
                      {user.email}
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-600 hidden md:table-cell text-xs sm:text-sm">
                      {user.phone}
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-900 font-semibold hidden lg:table-cell text-xs sm:text-sm">
                      {user.ordersCount}
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-900 font-semibold hidden lg:table-cell text-xs sm:text-sm">
                      ₹{Number(user.totalSpent || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.status === 'active' ? 'Active' : 'Blocked'}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="text-blue-600 hover:opacity-80 font-semibold text-xs transition-opacity whitespace-nowrap"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showUserDetails && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase">Name</p>
                    <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">{selectedUser.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase">Status</p>
                    <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">
                      <span className={`px-3 py-1 rounded-full text-sm ${selectedUser.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {selectedUser.status === 'active' ? 'Active' : 'Blocked'}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email
                    </p>
                    <p className="text-base font-medium text-gray-900 mt-1 break-all">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase flex items-center gap-2">
                      <Phone className="h-4 w-4" /> Phone
                    </p>
                    <p className="text-base font-medium text-gray-900 mt-1">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" /> Join Date
                    </p>
                    <p className="text-base font-medium text-gray-900 mt-1">{selectedUser.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase flex items-center gap-2">
                      <Shield className="h-4 w-4" /> Role
                    </p>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {selectedUser.isAdmin ? 'Admin' : 'Customer'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-xs text-blue-600 font-semibold uppercase mb-1">Total Orders</p>
                    <p className="text-2xl font-bold text-blue-800">{selectedUser.ordersCount}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-xs text-green-600 font-semibold uppercase mb-1">Delivered Orders</p>
                    <p className="text-2xl font-bold text-green-800">{selectedUser.deliveredOrders}</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-xs text-red-600 font-semibold uppercase mb-1">Cancelled Orders</p>
                    <p className="text-2xl font-bold text-red-800">{selectedUser.cancelledOrders}</p>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-xs sm:text-sm text-purple-700 font-semibold">Total Amount Spent</p>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-900">
                    ₹{Number(selectedUser.totalSpent || 0).toLocaleString('en-IN')}
                  </p>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Order History
                </h3>

                <div className="space-y-3">
                  {selectedUser.ordersList.length > 0 ? (
                    selectedUser.ordersList.map((order) => (
                      <div
                        key={order._id}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <p className="font-bold text-gray-900 text-sm sm:text-base break-all">
                              Order: {order._id}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">
                              Amount: <span className="font-bold text-gray-900">₹{Number(order.totalPrice || 0).toLocaleString('en-IN')}</span>
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              Date: <span className="font-bold text-gray-900">{formatDate(order.createdAt)}</span>
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              String(order.orderStatus || '').toLowerCase() === 'delivered'
                                ? 'bg-green-100 text-green-800'
                                : String(order.orderStatus || '').toLowerCase() === 'processing'
                                ? 'bg-blue-100 text-blue-800'
                                : String(order.orderStatus || '').toLowerCase() === 'shipped'
                                ? 'bg-purple-100 text-purple-800'
                                : String(order.orderStatus || '').toLowerCase() === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {order.orderStatus || 'Pending'}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-8 text-center">
                      <p className="text-gray-600 font-semibold">No orders yet</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowUserDetails(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-900 font-medium text-sm"
                  >
                    Close
                  </button>
                </div>

                <p className="mt-4 text-xs text-gray-500">
                  Block/unblock is not shown here because the backend does not expose a persisted user-block API yet.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
