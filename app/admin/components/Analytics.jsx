"use client";

import { useEffect, useMemo, useState } from "react";
import { TrendingUp, Package, DollarSign, RefreshCw } from "lucide-react";
import API from "../../../lib/api";

const chartWidth = 900;
const chartHeight = 300;
const padding = { top: 24, right: 24, bottom: 44, left: 54 };

const toNumber = (value) => Number(value || 0);

const SimpleLineChart = ({ data, color = "#3b82f6" }) => {
  if (!data.length) {
    return <div className="h-[300px] flex items-center justify-center text-gray-500">No data</div>;
  }

  const values = data.map((item) => toNumber(item.sales));
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;
  const stepX = data.length > 1 ? plotWidth / (data.length - 1) : plotWidth;

  const points = data.map((item, index) => {
    const value = toNumber(item.sales);
    const x = padding.left + index * stepX;
    const y =
      padding.top +
      (max === min ? plotHeight / 2 : plotHeight - ((value - min) / (max - min)) * plotHeight);
    return { x, y, label: item.date, value };
  });

  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-[300px]">
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
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
      />
      {points.map((point, index) => (
        <g key={`${point.label}-${index}`}>
          <circle cx={point.x} cy={point.y} r="5" fill={color} />
          <text x={point.x} y={chartHeight - 14} textAnchor="middle" fontSize="12" fill="#6b7280">
            {point.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

const SimpleBarChart = ({ data, fill = "#10b981" }) => {
  if (!data.length) {
    return <div className="h-[300px] flex items-center justify-center text-gray-500">No data</div>;
  }

  const values = data.map((item) => toNumber(item.value));
  const max = Math.max(...values, 1);
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;
  const barWidth = plotWidth / data.length * 0.6;
  const gap = plotWidth / data.length * 0.4;

  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-[300px]">
      {[0, 1, 2, 3, 4].map((tick) => {
        const y = padding.top + (plotHeight / 4) * tick;
        return (
          <g key={tick}>
            <line x1={padding.left} x2={chartWidth - padding.right} y1={y} y2={y} stroke="#e5e7eb" strokeDasharray="4 4" />
            <text x={padding.left - 10} y={y + 4} textAnchor="end" fontSize="12" fill="#6b7280">
              {Math.round(max - (max / 4) * tick)}
            </text>
          </g>
        );
      })}

      {data.map((item, index) => {
        const value = toNumber(item.value);
        const height = max === 0 ? 0 : (value / max) * plotHeight;
        const x = padding.left + index * (barWidth + gap) + gap / 2;
        const y = padding.top + (plotHeight - height);
        return (
          <g key={item.name}>
            <rect x={x} y={y} width={barWidth} height={height} rx="8" fill={fill} />
            <text x={x + barWidth / 2} y={chartHeight - 14} textAnchor="middle" fontSize="12" fill="#6b7280">
              {item.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

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

export default function Analytics() {
  const [orders, setOrders] = useState([]);
  const [timeframe, setTimeframe] = useState("day");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await API.get("/orders/admin/all");
      const list = Array.isArray(response.data)
        ? response.data
        : response.data?.orders || response.data?.data || [];
      setOrders(list);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const normalizedOrders = useMemo(() => {
    return (orders || []).map((order) => ({
      id: order._id,
      amount: Number(order.totalPrice || 0),
      isPaid: order.isPaid !== false,
      paymentStatus:
        order.paymentMethod === "cod" || order.paymentMethod === "COD"
          ? "Postpaid"
          : "Prepaid",
      status: order.orderStatus || "Pending",
      createdAt: order.createdAt ? new Date(order.createdAt) : new Date(),
      products: order.products || [],
    }));
  }, [orders]);

  const paidOrders = useMemo(
    () => normalizedOrders.filter((order) => order.isPaid),
    [normalizedOrders]
  );

  const totalRevenue = useMemo(
    () => paidOrders.reduce((sum, order) => sum + order.amount, 0),
    [paidOrders]
  );

  const postpaidOrdersRevenue = useMemo(
    () =>
      paidOrders
        .filter((o) => o.paymentStatus === "Postpaid")
        .reduce((sum, o) => sum + o.amount, 0),
    [paidOrders]
  );

  const prepaidOrdersRevenue = useMemo(
    () =>
      paidOrders
        .filter((o) => o.paymentStatus === "Prepaid")
        .reduce((sum, o) => sum + o.amount, 0),
    [paidOrders]
  );

  const topProducts = useMemo(() => {
    const productMap = new Map();

    paidOrders.forEach((order) => {
      order.products.forEach((item) => {
        const key = String(item.productId?._id || item.productId || item.name || "unknown");
        const name = item.productId?.name || item.name || "Product";
        const price = Number(item.price || item.productId?.price || 0);
        const qty = Number(item.quantity || 1);

        if (!productMap.has(key)) {
          productMap.set(key, { id: key, name, price, quantitySold: 0 });
        }

        const current = productMap.get(key);
        current.quantitySold += qty;
        current.price = price || current.price;
      });
    });

    return Array.from(productMap.values())
      .sort((a, b) => b.quantitySold - a.quantitySold)
      .slice(0, 5);
  }, [paidOrders]);

  const chartData = useMemo(() => {
    const buckets = new Map();

    const getBucketKey = (date, tf) => {
      const d = new Date(date);
      if (tf === "day") return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
      if (tf === "week") {
        const year = d.getFullYear();
        const month = d.getMonth();
        const week = Math.ceil(d.getDate() / 7);
        return `${new Date(year, month, 1).toLocaleDateString("en-IN", { month: "short" })} W${week}`;
      }
      return d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
    };

    paidOrders.forEach((order) => {
      const key = getBucketKey(order.createdAt, timeframe);
      if (!buckets.has(key)) {
        buckets.set(key, { date: key, sales: 0, orders: 0 });
      }
      const current = buckets.get(key);
      current.sales += order.amount;
      current.orders += 1;
    });

    return Array.from(buckets.values());
  }, [paidOrders, timeframe]);

  const orderStatusData = useMemo(
    () => [
      { name: "Delivered", value: paidOrders.filter((o) => o.status === "Delivered").length },
      { name: "Cancelled", value: paidOrders.filter((o) => o.status === "Cancelled").length },
      { name: "Processing", value: paidOrders.filter((o) => o.status === "Processing").length },
    ],
    [paidOrders]
  );

  const topProductName = topProducts[0]?.name || "N/A";

  return (
    <div className="flex-1 overflow-auto bg-linear-to-b from-gray-50 to-white">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your business performance and growth metrics</p>
          </div>

          <button
            onClick={fetchAnalytics}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold transition"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={DollarSign}
            label="Total Revenue"
            value={loading ? "..." : `₹${totalRevenue.toLocaleString("en-IN")}`}
            color="bg-green-100 text-green-600"
            trend="12"
          />
          <StatCard
            icon={TrendingUp}
            label="Prepaid Revenue"
            value={loading ? "..." : `₹${prepaidOrdersRevenue.toLocaleString("en-IN")}`}
            color="bg-yellow-100 text-yellow-600"
            trend="10"
          />
          <StatCard
            icon={TrendingUp}
            label="Postpaid Revenue"
            value={loading ? "..." : `₹${postpaidOrdersRevenue.toLocaleString("en-IN")}`}
            color="bg-blue-100 text-blue-600"
            trend="8"
          />
          <StatCard
            icon={Package}
            label="Top Product Sold"
            value={loading ? "..." : topProductName}
            color="bg-purple-100 text-purple-600"
            trend="15"
          />
        </div>

        <div className="mb-8 flex gap-3 flex-wrap">
          <button
            onClick={() => setTimeframe("day")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              timeframe === "day"
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeframe("week")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              timeframe === "week"
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeframe("month")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              timeframe === "month"
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400"
            }`}
          >
            Monthly
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Sales Trend{" "}
              <span className="text-sm font-normal text-gray-600">
                ({timeframe === "day" ? "Daily" : timeframe === "week" ? "Weekly" : "Monthly"})
              </span>
            </h2>
            <SimpleLineChart data={chartData} color="#3b82f6" />
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Order Count{" "}
              <span className="text-sm font-normal text-gray-600">
                ({timeframe === "day" ? "Daily" : timeframe === "week" ? "Weekly" : "Monthly"})
              </span>
            </h2>
            <SimpleBarChart data={chartData.map((item) => ({ name: item.date, value: item.orders }))} fill="#10b981" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Status Breakdown</h2>
          <SimpleBarChart data={orderStatusData} fill="#6366f1" />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Selling Products</h2>

          {loading ? (
            <p className="text-gray-500">Loading top products...</p>
          ) : topProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-linear-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-300 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-2xl font-bold rounded-full w-8 h-8 flex items-center justify-center ${
                        index === 0
                          ? "bg-yellow-400 text-white"
                          : index === 1
                          ? "bg-gray-400 text-white"
                          : index === 2
                          ? "bg-orange-400 text-white"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      #{index + 1}
                    </span>
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      Sold: {product.quantitySold}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm">{product.name}</h3>
                  <p className="text-lg font-bold text-blue-600">
                    ₹{Number(product.price || 0).toFixed(0)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No product sales data available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
