'use client';

import { useState } from 'react';
import { useMockData } from '../hooks/useMockData.js';
import { X } from 'lucide-react';

export default function Refunds() {
  const { refunds, orders, updateRefund, addRefund } = useMockData();
  const [showInitiateModal, setShowInitiateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [newRefundStatus, setNewRefundStatus] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newRefundData, setNewRefundData] = useState({
    orderId: '',
    reason: '',
  });
  const [searchOrderInput, setSearchOrderInput] = useState('');

  const refundStatuses = ['Pending', 'In Progress', 'Completed', 'Failed'];

  const filteredRefunds = refunds.filter(refund => {
    const matchesSearch = refund.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      refund.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || refund.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const failedDeliveryOrders = orders.filter(order => 
    order.status === 'Shipped' && !refunds.some(r => r.orderId === order.id)
  );

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchOrderInput.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchOrderInput.toLowerCase()) ||
      order.id.match(searchOrderInput.toLowerCase());
    return matchesSearch && !refunds.some(r => r.orderId === order.id);
  });

  const handleInitiateRefund = () => {
    if (!newRefundData.orderId || !newRefundData.reason) {
      alert('Please select an order and reason');
      return;
    }

    const order = orders.find(o => o.id === newRefundData.orderId);
    if (!order) return;

    addRefund({
      id: `REF${Date.now()}`,
      orderId: newRefundData.orderId,
      customer: order.customer,
      amount: order.amount,
      reason: newRefundData.reason,
      status: 'Pending',
      initiatedDate: new Date().toISOString().split('T')[0],
      completedDate: null,
    });

    setNewRefundData({ orderId: '', reason: '' });
    setShowInitiateModal(false);
  };

  const handleStatusChange = (refundId, status) => {
    updateRefund(refundId, { status });
    setShowStatusModal(false);
    setSelectedRefund(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRefundAmount = refunds.reduce((sum, refund) => sum + refund.amount, 0);
  const completedRefunds = refunds.filter(r => r.status === 'Completed').length;
  const pendingRefunds = refunds.filter(r => r.status === 'Pending').length;

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Refunds Management</h1>
          <button
            onClick={() => setShowInitiateModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors font-medium text-sm"
          >
            Initiate Refund
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs sm:text-sm text-muted-foreground">Total Refunds</p>
            <p className="text-xl sm:text-2xl font-bold text-foreground mt-2">₹{totalRefundAmount.toLocaleString()}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs sm:text-sm text-muted-foreground">Completed Refunds</p>
            <p className="text-xl sm:text-2xl font-bold text-green-600 mt-2">{completedRefunds}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs sm:text-sm text-muted-foreground">Pending Refunds</p>
            <p className="text-xl sm:text-2xl font-bold text-yellow-600 mt-2">{pendingRefunds}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs sm:text-sm text-muted-foreground">In Progress</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-2">{refunds.filter(r => r.status === 'In Progress').length}</p>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by Order ID or Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Refunds</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {/* Refunds Table */}
        <div className="bg-card border border-border rounded-lg shadow-sm overflow-x-auto mb-6">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-foreground">Refund ID</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-foreground">Order ID</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-foreground hidden sm:table-cell">Customer</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-foreground">Amount</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-foreground hidden md:table-cell">Reason</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-foreground hidden lg:table-cell">Initiated</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRefunds.map((refund) => (
                <tr key={refund.id} className="border-b border-border hover:bg-muted transition-colors">
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-foreground font-medium text-xs sm:text-sm">{refund.id}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-foreground text-xs sm:text-sm">{refund.orderId}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-foreground hidden sm:table-cell text-xs sm:text-sm">{refund.customer}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-foreground font-semibold text-xs sm:text-sm">₹{refund.amount.toLocaleString()}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-foreground text-xs hidden md:table-cell">{refund.reason}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6">
                    <button
                      onClick={() => {
                        setSelectedRefund(refund);
                        setNewRefundStatus(refund.status);
                        setShowStatusModal(true);
                      }}
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(refund.status)}`}
                    >
                      {refund.status}
                    </button>
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-foreground hidden lg:table-cell">{refund.initiatedDate}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6">
                    <button
                      onClick={() => {
                        setSelectedRefund(refund);
                        setNewRefundStatus(refund.status);
                        setShowStatusModal(true);
                      }}
                      className="text-primary hover:opacity-80 font-semibold text-xs transition-opacity whitespace-nowrap"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Failed Deliveries Section */}
        {failedDeliveryOrders.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-orange-900 mb-4">Orders with Failed Delivery (Auto-Refund Eligible)</h2>
            <div className="space-y-2">
              {failedDeliveryOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-white border border-orange-100 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">{order.id} - {order.customer}</p>
                    <p className="text-sm text-muted-foreground">Amount: ₹{order.amount.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => {
                      setNewRefundData({
                        orderId: order.id,
                        reason: 'Failed delivery',
                      });
                      setShowInitiateModal(true);
                    }}
                    className="text-primary hover:opacity-80 font-semibold text-sm transition-opacity"
                  >
                    Auto-Refund
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Initiate Refund Modal */}
        {showInitiateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg w-full max-w-md max-h-screen overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Initiate Refund</h2>
                <button
                  onClick={() => {
                    setShowInitiateModal(false);
                    setSearchOrderInput('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Search Order</label>
                  <input
                    type="text"
                    placeholder="Type order ID or number..."
                    value={searchOrderInput}
                    onChange={(e) => setSearchOrderInput(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Order</label>
                  <select
                    value={newRefundData.orderId}
                    onChange={(e) => setNewRefundData({ ...newRefundData, orderId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 max-h-48"
                  >
                    <option value="">Choose an order...</option>
                    {(searchOrderInput ? filteredOrders : orders.filter(o => !refunds.some(r => r.orderId === o.id))).map((order) => (
                      <option key={order.id} value={order.id}>
                        {order.id} - {order.customer} (₹{order.amount})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Refund Reason</label>
                  <select
                    value={newRefundData.reason}
                    onChange={(e) => setNewRefundData({ ...newRefundData, reason: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select reason...</option>
                    <option value="Customer requested">Customer requested</option>
                    <option value="Failed delivery">Failed delivery</option>
                    <option value="Product defect">Product defect</option>
                    <option value="Wrong item shipped">Wrong item shipped</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowInitiateModal(false);
                    setSearchOrderInput('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInitiateRefund}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Initiate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Status Update Modal */}
        {showStatusModal && selectedRefund && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Update Refund Status</h2>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-700 mb-4">Refund: {selectedRefund.id}</p>

              <div className="space-y-2 mb-6">
                {refundStatuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(selectedRefund.id, status)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                      newRefundStatus === status
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
