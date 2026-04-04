"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, X, RefreshCw } from "lucide-react";
import API from "../../../lib/api";

const chartWidth = 900;
const chartHeight = 320;
const padding = { top: 24, right: 24, bottom: 44, left: 54 };

const toNumber = (value) => Number(value || 0);

const SimpleLineChart = ({ data, lineKey = "sales", labelKey = "date", color = "#3b82f6" }) => {
  if (!data.length) {
    return <div className="h-[320px] flex items-center justify-center text-gray-500">No chart data available</div>;
  }

  const values = data.map((item) => toNumber(item[lineKey]));
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;
  const stepX = data.length > 1 ? plotWidth / (data.length - 1) : plotWidth;

  const points = data
    .map((item, index) => {
      const value = toNumber(item[lineKey]);
      const x = padding.left + index * stepX;
      const y =
        padding.top +
        (max === min ? plotHeight / 2 : plotHeight - ((value - min) / (max - min)) * plotHeight);
      return { x, y, value, label: item[labelKey] };
    });

  const linePath = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-[320px]">
        <defs>
          <linearGradient id="overviewLineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity="0.35" />
            <stop offset="95%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3, 4].map((tick) => {
          const y = padding.top + (plotHeight / 4) * tick;
          return (
            <g key={tick}>
              <line x1={padding.left} x2={chartWidth - padding.right} y1={y} y2={y} stroke="#e5e7eb" strokeDasharray="4 4" />
              <text x={padding.left - 10} y={y + 4} textAnchor="end" fontSize="12" fill="#6b7280">
                {Math.round(max - ((max - min) / 4) * tick)}
              </text>
            </g>
          );
        })}

        <polyline
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={linePath}
        />

        <polygon
          fill="url(#overviewLineFill)"
          points={`${padding.left},${chartHeight - padding.bottom} ${linePath} ${chartWidth - padding.right},${chartHeight - padding.bottom}`}
        />

        {points.map((point, index) => (
          <g key={`${point.label}-${index}`}>
            <circle cx={point.x} cy={point.y} r="5" fill={color} />
            <text
              x={point.x}
              y={chartHeight - 14}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default function Overview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    activeOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
  });
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [showOutOfStockModal, setShowOutOfStockModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOverviewData = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsResponse, productsResponse, ordersResponse] = await Promise.all([
        API.get("/users/admin/dashboard-stats"),
        API.get("/products/admin/all/list"),
        API.get("/orders/admin/all"),
      ]);

      setStats({
        totalUsers: Number(statsResponse.data?.totalUsers || 0),
        totalOrders: Number(statsResponse.data?.totalOrders || 0),
        activeOrders: Number(statsResponse.data?.activeOrders || 0),
        totalRevenue: Number(statsResponse.data?.totalRevenue || 0),
        recentOrders: statsResponse.data?.recentOrders || [],
      });

      const list = Array.isArray(productsResponse.data)
        ? productsResponse.data
        : productsResponse.data?.products || productsResponse.data?.data || [];
      setProducts(list);

      const orderList = Array.isArray(ordersResponse.data)
        ? ordersResponse.data
        : ordersResponse.data?.orders || ordersResponse.data?.data || [];
      setOrders(orderList);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load overview data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const lowStockProducts = useMemo(() => {
    return products.filter(
      (product) =>
        Number(product.stock ?? product.countInStock ?? 0) < 10 &&
        Number(product.stock ?? product.countInStock ?? 0) > 0
    );
  }, [products]);

  const outOfStockProducts = useMemo(() => {
    return products.filter(
      (product) => Number(product.stock ?? product.countInStock ?? 0) === 0
    );
  }, [products]);

  const recentOrders = useMemo(() => {
    const sourceOrders = stats.recentOrders?.length ? stats.recentOrders : orders;

    return sourceOrders.map((order) => {
      const itemCount = (order.products || []).reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
      );

      let paymentStatus = order.paymentMethod === "cod" ? "COD" : "Prepaid";
      if (order.refundStatus === "pending") paymentStatus = "Refund Pending";
      if (order.refundStatus === "processed") paymentStatus = "Refunded";
      if (order.refundStatus === "failed") paymentStatus = "Refund Failed";

      return {
        id: order._id,
        customer: order.user?.name || "Customer",
        email: order.user?.email || "N/A",
        amount: Number(order.totalPrice || 0),
        status: order.orderStatus || "Pending",
        paymentStatus,
        items: itemCount,
        date: order.createdAt
          ? new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "",
        monthKey: order.createdAt
          ? new Date(order.createdAt).toLocaleDateString("en-IN", {
              month: "short",
              year: "2-digit",
            })
          : "Unknown",
      };
    });
  }, [stats.recentOrders, orders]);

  const monthlyData = useMemo(() => {
    const map = new Map();

    const sourceOrders = (orders.length ? orders : recentOrders).filter(
      (order) => order.isPaid !== false
    );

    sourceOrders.forEach((order) => {
      const createdAt = order.createdAt || order.created_at || null;
      const monthKey = createdAt
        ? new Date(createdAt).toLocaleDateString("en-IN", {
            month: "short",
            year: "2-digit",
          })
        : order.monthKey || "Unknown";

      if (!map.has(monthKey)) {
        map.set(monthKey, { date: monthKey, sales: 0, orders: 0 });
      }

      const entry = map.get(monthKey);
      entry.sales += Number(order.amount || 0);
      entry.orders += 1;
    });

    return Array.from(map.values()).reverse();
  }, [orders, recentOrders]);

  const exportCSV = () => {
    const rows = [
      ["Order ID", "Customer", "Email", "Amount", "Status", "Payment Status", "Date"],
      ...recentOrders.map((order) => [
        order.id,
        order.customer,
        order.email,
        order.amount,
        order.status,
        order.paymentStatus,
        order.date,
      ]),
    ];

    const csvContent = rows
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `overview-orders-${Date.now()}.csv`;
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
      case "Delivery Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStockValue = (product) => Number(product.stock ?? product.countInStock ?? 0);
  const getProductSku = (product) => product.sku || product._id || "N/A";

  return (
    <div className="p-8 scroll-smooth bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Business Overview</h1>
            <p className="text-gray-600">Real-time insights into your store performance</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={fetchOverviewData}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <RefreshCw size={18} />
              Refresh
            </button>

            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <Download size={18} />
                Export
              </button>
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={exportCSV}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-b font-medium"
                  >
                    Export as CSV
                  </button>
                  <button
                    onClick={exportPDF}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 font-medium"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-6 border-2 border-blue-200">
            <p className="text-blue-700 text-sm font-bold uppercase tracking-wide mb-2">Orders</p>
            <p className="text-3xl font-bold text-blue-900">{loading ? "..." : stats.totalOrders}</p>
          </div>
          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl shadow-md p-6 border-2 border-green-200">
            <p className="text-green-700 text-sm font-bold uppercase tracking-wide mb-2">Active</p>
            <p className="text-3xl font-bold text-green-900">{loading ? "..." : stats.activeOrders}</p>
          </div>
          <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl shadow-md p-6 border-2 border-purple-200">
            <p className="text-purple-700 text-sm font-bold uppercase tracking-wide mb-2">Revenue</p>
            <p className="text-3xl font-bold text-purple-900">
              ₹{loading ? "..." : stats.totalRevenue.toLocaleString("en-IN")}
            </p>
          </div>
          <div
            onClick={() => setShowLowStockModal(true)}
            className="bg-linear-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-md p-6 border-2 border-yellow-200 cursor-pointer"
          >
            <p className="text-yellow-700 text-sm font-bold uppercase tracking-wide mb-2">Low Stock</p>
            <p className="text-3xl font-bold text-yellow-900">{loading ? "..." : lowStockProducts.length}</p>
          </div>
          <div
            onClick={() => setShowOutOfStockModal(true)}
            className="bg-linear-to-br from-red-50 to-red-100 rounded-xl shadow-md p-6 border-2 border-red-200 cursor-pointer"
          >
            <p className="text-red-700 text-sm font-bold uppercase tracking-wide mb-2">Out Stock</p>
            <p className="text-3xl font-bold text-red-900">{loading ? "..." : outOfStockProducts.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Monthly Sales Trend</h3>
          <SimpleLineChart data={monthlyData} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Recent Orders</h3>
            <span className="text-sm text-gray-600 font-semibold">
              Latest {Math.min(6, recentOrders.length)} orders
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentOrders.slice(0, 6).map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1 font-semibold">Order ID</p>
                    <p className="text-sm font-bold text-gray-900 break-all">{order.id}</p>
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
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {order.items} items
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Email</p>
                    <p className="font-medium text-gray-700 text-sm break-all">{order.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Date</p>
                    <p className="font-medium text-gray-900">{order.date}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Total</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 font-semibold">Payment</p>
                    <span className="text-xs font-bold px-2 py-1 rounded bg-green-100 text-green-700">
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
              <button onClick={() => setShowLowStockModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              {lowStockProducts.length > 0 ? (
                <div className="space-y-4">
                  {lowStockProducts.map((product) => (
                    <div key={product._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{getProductSku(product)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-600">{getStockValue(product)}</p>
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
              <button onClick={() => setShowOutOfStockModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              {outOfStockProducts.length > 0 ? (
                <div className="space-y-4">
                  {outOfStockProducts.map((product) => (
                    <div key={product._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{getProductSku(product)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">{getStockValue(product)}</p>
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
