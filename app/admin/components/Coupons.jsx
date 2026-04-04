"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, X, Download, RefreshCw } from "lucide-react";
import API from "../../../lib/api";

const emptyFormData = () => ({
  code: "",
  category: "general",
  type: "percent",
  value: "",
  minOrderValue: "",
  maxDiscount: "",
  expiresAt: "",
  isActive: true,
  clauses: [],
});

const normalizeCoupon = (coupon) => ({
  id: coupon?._id || coupon?.id,
  code: coupon?.code || "",
  category: coupon?.category || "general",
  type: coupon?.type || "percent",
  value: Number(coupon?.value ?? 0),
  minOrderValue: Number(coupon?.minOrderValue ?? 0),
  maxDiscount: Number(coupon?.maxDiscount ?? 0),
  expiresAt: coupon?.expiresAt ? String(coupon.expiresAt).slice(0, 10) : "",
  isActive: Boolean(coupon?.isActive ?? true),
  usageCount: Number(coupon?.usageCount ?? 0),
  totalDiscountGiven: Number(coupon?.totalDiscountGiven ?? 0),
  clauses: Array.isArray(coupon?.clauses) ? coupon.clauses : [],
});

const categoryLabel = (category) => {
  switch (category) {
    case "first-order":
      return "First Order";
    case "cart-based":
      return "Cart Based";
    case "referral":
      return "Referral";
    default:
      return "General";
  }
};

const categoryColor = (category) => {
  switch (category) {
    case "first-order":
      return "bg-green-100 text-green-800";
    case "cart-based":
      return "bg-purple-100 text-purple-800";
    case "referral":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
};

const getClausesPreview = (clauses) => {
  if (!Array.isArray(clauses) || clauses.length === 0) return "None";
  const visible = clauses.slice(0, 2);
  const remaining = clauses.length - visible.length;
  return remaining > 0 ? `${visible.join(" • ")} +${remaining} more` : visible.join(" • ");
};

const downloadCsv = (rows, filename) => {
  const csvContent = rows
    .map((row) =>
      row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [deletingCoupon, setDeletingCoupon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [clauseInput, setClauseInput] = useState("");
  const [formData, setFormData] = useState(emptyFormData());

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await API.get("/coupons");
      const list = Array.isArray(response.data)
        ? response.data
        : response.data?.coupons || response.data?.data || [];
      setCoupons(list.map(normalizeCoupon));
    } catch (err) {
      if (err?.response?.status === 404) {
        setCoupons([]);
        setError("");
      } else {
        setError(err?.response?.data?.message || "Failed to load coupons");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter((c) => c.isActive).length;
  const expiredCoupons = coupons.filter((c) => c.expiresAt && new Date(c.expiresAt) < new Date()).length;
  const usedCoupons = coupons.reduce((sum, c) => sum + (c.usageCount || 0), 0);
  const totalDiscountGiven = coupons.reduce((sum, c) => sum + Number(c.totalDiscountGiven || 0), 0);

  const filteredCoupons = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    return coupons.filter((coupon) => coupon.code.toLowerCase().includes(query));
  }, [coupons, searchTerm]);

  const resetForm = () => {
    setFormData(emptyFormData());
    setClauseInput("");
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteConfirm(false);
    setSelectedCoupon(null);
    setDeletingCoupon(null);
    resetForm();
  };

  const openAddModal = () => {
    resetForm();
    setSelectedCoupon(null);
    setShowAddModal(true);
  };

  const openEditModal = (coupon) => {
    setSelectedCoupon(coupon);
    setFormData({
      code: coupon.code || "",
      category: coupon.category || "general",
      type: coupon.type || "percent",
      value: String(coupon.value ?? ""),
      minOrderValue: String(coupon.minOrderValue ?? ""),
      maxDiscount: String(coupon.maxDiscount ?? ""),
      expiresAt: coupon.expiresAt || "",
      isActive: Boolean(coupon.isActive),
      clauses: Array.isArray(coupon.clauses) ? coupon.clauses : [],
    });
    setClauseInput("");
    setShowEditModal(true);
  };

  const toPayload = () => ({
    code: formData.code.trim().toUpperCase(),
    category: formData.category,
    type: formData.type,
    value: Number(formData.value || 0),
    minOrderValue: Number(formData.minOrderValue || 0),
    maxDiscount: Number(formData.maxDiscount || 0),
    expiresAt: formData.expiresAt || null,
    isActive: Boolean(formData.isActive),
    clauses: formData.clauses,
    usageCount: selectedCoupon?.usageCount || 0,
    totalDiscountGiven: selectedCoupon?.totalDiscountGiven || 0,
  });

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      setError("");
      await API.post("/coupons", toPayload());
      closeModals();
      await fetchCoupons();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create coupon");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditCoupon = async (e) => {
    e.preventDefault();
    if (!selectedCoupon?.id) return;
    try {
      setActionLoading(true);
      setError("");
      await API.put(`/coupons/${selectedCoupon.id}`, toPayload());
      closeModals();
      await fetchCoupons();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update coupon");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteCoupon = async () => {
    if (!deletingCoupon) return;
    try {
      setActionLoading(true);
      setError("");
      await API.delete(`/coupons/${deletingCoupon}`);
      closeModals();
      await fetchCoupons();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete coupon");
    } finally {
      setActionLoading(false);
    }
  };

  const toggleCouponStatus = async (coupon) => {
    try {
      setActionLoading(true);
      setError("");
      await API.put(`/coupons/${coupon.id}`, {
        ...coupon,
        isActive: !coupon.isActive,
      });
      await fetchCoupons();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update coupon status");
    } finally {
      setActionLoading(false);
    }
  };

  const addClause = () => {
    if (!clauseInput.trim()) return;
    setFormData({
      ...formData,
      clauses: [...formData.clauses, clauseInput.trim()],
    });
    setClauseInput("");
  };

  const removeClause = (index) => {
    setFormData({
      ...formData,
      clauses: formData.clauses.filter((_, i) => i !== index),
    });
  };

  const handleExportClick = (format) => {
    const rows = [
      [
        "Code",
        "Category",
        "Type",
        "Value",
        "Min Order",
        "Max Discount",
        "Expiry",
        "Status",
        "Used",
        "Total Discount Given",
        "Clauses",
      ],
      ...filteredCoupons.map((c) => [
        c.code,
        categoryLabel(c.category),
        c.type === "percent" ? "Percentage" : "Flat",
        c.type === "percent" ? `${c.value}%` : `₹${c.value}`,
        `₹${c.minOrderValue}`,
        `₹${c.maxDiscount}`,
        c.expiresAt,
        c.isActive ? "Active" : "Inactive",
        c.usageCount || 0,
        `₹${Number(c.totalDiscountGiven || 0).toLocaleString("en-IN")}`,
        Array.isArray(c.clauses) && c.clauses.length ? c.clauses.join(" | ") : "None",
      ]),
    ];

    if (format === "csv") downloadCsv(rows, "coupons-list.csv");
    else window.print();
    setShowExportMenu(false);
  };

  return (
    <div className="p-4 sm:p-8 scroll-smooth bg-linear-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
              Coupons & Discounts
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage promo codes stored in MongoDB
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              <Plus size={18} />
              Create
            </button>

            <button
              onClick={fetchCoupons}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              <RefreshCw size={18} />
              Refresh
            </button>

            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg w-full sm:w-auto text-sm sm:text-base"
              >
                <Download size={18} />
                Export
              </button>

              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => handleExportClick("csv")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-b font-medium"
                  >
                    CSV
                  </button>
                  <button
                    onClick={() => handleExportClick("pdf")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 font-medium"
                  >
                    PDF
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-8">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-6 border-2 border-blue-200">
            <p className="text-blue-700 text-sm font-bold uppercase tracking-wide mb-2">Total</p>
            <p className="text-3xl font-bold text-blue-900">{loading ? "..." : totalCoupons}</p>
          </div>

          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl shadow-md p-6 border-2 border-green-200">
            <p className="text-green-700 text-sm font-bold uppercase tracking-wide mb-2">Active</p>
            <p className="text-3xl font-bold text-green-900">{loading ? "..." : activeCoupons}</p>
          </div>

          <div className="bg-linear-to-br from-red-50 to-red-100 rounded-xl shadow-md p-6 border-2 border-red-200">
            <p className="text-red-700 text-sm font-bold uppercase tracking-wide mb-2">Expired</p>
            <p className="text-3xl font-bold text-red-900">{loading ? "..." : expiredCoupons}</p>
          </div>

          <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl shadow-md p-6 border-2 border-purple-200">
            <p className="text-purple-700 text-sm font-bold uppercase tracking-wide mb-2">Used</p>
            <p className="text-3xl font-bold text-purple-900">{loading ? "..." : usedCoupons}</p>
          </div>

          <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl shadow-md p-6 border-2 border-orange-200">
            <p className="text-orange-700 text-sm font-bold uppercase tracking-wide mb-2">
              Discount Given
            </p>
            <p className="text-3xl font-bold text-orange-900">
              ₹{loading ? "..." : totalDiscountGiven.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 border border-gray-200">
          <input
            type="text"
            placeholder="Search by coupon code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Code</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900 hidden sm:table-cell">Category</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900 hidden md:table-cell">Type</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Value</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900 hidden lg:table-cell">Min Order</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900 hidden lg:table-cell">Max Discount</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900 hidden xl:table-cell">Expiry</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900 hidden xl:table-cell">Clauses</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Status</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Used / Discount</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="11" className="px-6 py-10 text-center text-gray-500">
                    Loading coupons...
                  </td>
                </tr>
              ) : filteredCoupons.length === 0 ? (
                <tr>
                  <td colSpan="11" className="px-6 py-10 text-center text-gray-500">
                    No coupons found
                  </td>
                </tr>
              ) : (
                filteredCoupons.map((coupon) => {
                  const isExpired = coupon.expiresAt && new Date(coupon.expiresAt) < new Date();
                  return (
                    <tr key={coupon.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold text-gray-900">
                        {coupon.code}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm hidden sm:table-cell">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColor(coupon.category)}`}
                        >
                          {categoryLabel(coupon.category)}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm hidden md:table-cell">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          {coupon.type === "percent" ? "Percentage" : "Flat"}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-900">
                        {coupon.type === "percent" ? `${coupon.value}%` : `₹${coupon.value}`}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 hidden lg:table-cell">
                        ₹{coupon.minOrderValue}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 hidden lg:table-cell">
                        ₹{coupon.maxDiscount}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 hidden xl:table-cell">
                        <span className={isExpired ? "text-red-600 font-semibold" : ""}>
                          {coupon.expiresAt}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 hidden xl:table-cell">
                        <span
                          className="block max-w-[220px] truncate"
                          title={
                            Array.isArray(coupon.clauses) && coupon.clauses.length
                              ? coupon.clauses.join(" | ")
                              : "No clauses"
                          }
                        >
                          {getClausesPreview(coupon.clauses)}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                        <button
                          onClick={() => toggleCouponStatus(coupon)}
                          disabled={actionLoading}
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold transition disabled:opacity-50 ${
                            coupon.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {coupon.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900 text-xs">
                            {coupon.usageCount || 0}x
                          </span>
                          <span className="text-xs text-gray-600 mt-0.5">
                            ₹{Number(coupon.totalDiscountGiven || 0).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                        <div className="flex gap-1 sm:gap-2">
                          <button
                            onClick={() => openEditModal(coupon)}
                            className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200 transition whitespace-nowrap"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setDeletingCoupon(coupon.id);
                              setShowDeleteConfirm(true);
                            }}
                            className="px-2 sm:px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200 transition whitespace-nowrap"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {showAddModal ? "Create Coupon" : "Edit Coupon"}
              </h2>
              <button onClick={closeModals} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={showAddModal ? handleAddCoupon : handleEditCoupon} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Coupon Code</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="general">General</option>
                    <option value="first-order">First Order</option>
                    <option value="cart-based">Cart Based</option>
                    <option value="referral">Referral</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Discount Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="percent">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Value {formData.type === "percent" ? "(%)" : "(₹)"}
                  </label>
                  <input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Min Order Value (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.minOrderValue}
                    onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Max Discount (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.isActive ? "active" : "inactive"}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "active" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Terms & Conditions
                </label>
                <div className="space-y-2 mb-3">
                  {formData.clauses.map((clause, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">{clause}</p>
                      <button
                        type="button"
                        onClick={() => removeClause(idx)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={clauseInput}
                    onChange={(e) => setClauseInput(e.target.value)}
                    placeholder="Add a clause..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={addClause}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModals}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {actionLoading ? "Saving..." : showAddModal ? "Create Coupon" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold text-gray-900">Confirm Deletion</h2>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this coupon? This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={closeModals}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCoupon}
                  disabled={actionLoading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  {actionLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
