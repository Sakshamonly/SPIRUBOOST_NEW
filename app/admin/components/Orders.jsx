"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, X, RefreshCw } from "lucide-react";
import API from "../../../lib/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancellingOrder, setCancellingOrder] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const statuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Delivery Failed",
  ];

  const paymentStatuses = ["Prepaid", "COD", "Refund Pending", "Refunded", "Refund Failed"];

  const mapOrderForTable = (order) => {
    const customerName =
      order?.user?.name ||
      order?.shippingAddress?.firstName ||
      "Customer";

    const customerEmail =
      order?.user?.email ||
      order?.shippingAddress?.contactValue ||
      "N/A";

    let paymentStatus = order?.paymentMethod === "cod" ? "COD" : "Prepaid";
    if (order?.refundStatus === "pending") paymentStatus = "Refund Pending";
    if (order?.refundStatus === "processed") paymentStatus = "Refunded";
    if (order?.refundStatus === "failed") paymentStatus = "Refund Failed";

    return {
      raw: order,
      id: order._id,
      displayId: order.orderNumber || order._id,
      customer: customerName,
      email: customerEmail,
      amount: Number(order.totalPrice || 0),
      status: order.orderStatus || "Pending",
      paymentStatus,
      date: order.createdAt
        ? new Date(order.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "",
    };
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await API.get("/orders/admin/all");
      const mapped = (response.data || []).map(mapOrderForTable);
      setOrders(mapped);
    } catch (err) {
      console.warn("Failed to fetch admin orders");
      setError(err?.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        order.displayId.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All" || order.paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, searchTerm, statusFilter, paymentFilter]);

  const totalOrders = orders.length;
  const activeOrders = orders.filter((o) =>
    ["Pending", "Processing", "Shipped"].includes(o.status)
  ).length;
  const prepaidOrders = orders.filter((o) => o.paymentStatus === "Prepaid").length;
  const codOrders = orders.filter((o) => o.paymentStatus === "COD").length;
  const cancelledOrders = orders.filter((o) => o.status === "Cancelled").length;

  const updateOrderStatus = async (orderId, status) => {
    try {
      setActionLoading(true);
      await API.put(`/orders/${orderId}/status`, {
        orderStatus: status,
        cancelReason: status === "Cancelled" ? "Cancelled by admin" : "",
      });
      setShowStatusModal(false);
      setSelectedOrder(null);
      await fetchOrders();
    } catch (err) {
      console.warn("Update status failed");
      alert(err?.response?.data?.message || "Failed to update order status");
    } finally {
      setActionLoading(false);
    }
  };

  const confirmCancelOrder = async () => {
    if (!cancellingOrder) return;

    try {
      setActionLoading(true);
      await API.put(`/orders/${cancellingOrder}/cancel`, {
        cancelReason: "Cancelled by admin",
      });
      setShowCancelConfirm(false);
      setCancellingOrder(null);
      await fetchOrders();
    } catch (err) {
      console.warn("Cancel order failed");
      alert(err?.response?.data?.message || "Failed to cancel order");
    } finally {
      setActionLoading(false);
    }
  };

  const exportCSV = () => {
    const rows = [
      ["ID", "Customer", "Email", "Amount", "Status", "Payment Status", "Date"],
      ...filteredOrders.map((o) => [
        o.displayId,
        o.customer,
        o.email,
        o.amount,
        o.status,
        o.paymentStatus,
        o.date,
      ]),
    ];

    const csvContent = rows
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `orders-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const exportPDF = () => {
    window.print();
    setShowExportMenu(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Delivery Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentColor = (status) => {
    switch (status) {
      case "Prepaid":
        return "bg-green-100 text-green-800";
      case "COD":
        return "bg-blue-100 text-blue-800";
      case "Refund Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Refunded":
        return "bg-emerald-100 text-emerald-800";
      case "Refund Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 scroll-smooth">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>

        <div className="flex gap-3">
          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              <Download size={18} />
              Export
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={exportCSV}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-b"
                >
                  Export as CSV
                </button>
                <button
                  onClick={exportPDF}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Export as PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm mb-2">Total Orders</p>
          <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm mb-2">Active Orders</p>
          <p className="text-3xl font-bold text-gray-900">{activeOrders}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm mb-2">Prepaid Orders</p>
          <p className="text-3xl font-bold text-gray-900">{prepaidOrders}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
          <p className="text-gray-600 text-sm mb-2">COD Orders</p>
          <p className="text-3xl font-bold text-gray-900">{codOrders}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm mb-2">Cancelled</p>
          <p className="text-3xl font-bold text-gray-900">{cancelledOrders}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by Order ID, Customer, or Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Order Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Payment Status
            </label>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Payment</option>
              {paymentStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Order Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                    Loading orders...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {order.displayId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="font-semibold text-gray-800">
                        {order.customer}
                      </div>
                      <div className="text-xs text-gray-500">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentColor(order.paymentStatus)}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setNewStatus(order.status);
                            setShowStatusModal(true);
                          }}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200 transition"
                        >
                          Update Status
                        </button>

                        {order.status !== "Cancelled" && (
                          <button
                            onClick={() => {
                              setCancellingOrder(order.id);
                              setShowCancelConfirm(true);
                            }}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200 transition"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showStatusModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Update Order Status
              </h2>
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Order ID: <span className="font-semibold">{selectedOrder.id}</span>
              </p>

              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select New Status
              </label>

              <div className="space-y-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setNewStatus(status)}
                    className={`w-full text-left px-4 py-2 rounded-lg border-2 transition ${
                      newStatus === status
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => updateOrderStatus(selectedOrder.id, newStatus)}
                  disabled={actionLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {actionLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold text-gray-900">
                Confirm Cancellation
              </h2>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Are you sure you want to cancel this order?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCancelConfirm(false);
                    setCancellingOrder(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  No, Keep Order
                </button>
                <button
                  onClick={confirmCancelOrder}
                  disabled={actionLoading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  {actionLoading ? "Cancelling..." : "Yes, Cancel"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
