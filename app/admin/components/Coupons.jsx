'use client';

import { useState } from 'react';
import { useMockData } from '../hooks/useMockData.js';
import { Plus, X, Download, Trash2 } from 'lucide-react';


export default function Coupons() {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useMockData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [deletingCoupon, setDeletingCoupon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [clauseInput, setClauseInput] = useState('');

  const [formData, setFormData] = useState({
    code: '',
    type: 'percent',
    value: '',
    minOrder: '',
    maxDiscount: '',
    expiry: '',
    status: 'active',
    category: 'general',
    clauses: [],
  });

  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter(c => c.status === 'active').length;
  const expiredCoupons = coupons.filter(c => {
    const expiryDate = new Date(c.expiry);
    return expiryDate < new Date();
  }).length;
  const usedCoupons = coupons.reduce((sum, c) => sum + (c.usageCount || 0), 0);

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (formData.code && formData.value && formData.minOrder !== '' && formData.maxDiscount !== '' && formData.expiry) {
      addCoupon({
        code: formData.code.toUpperCase(),
        type: formData.type,
        value: parseInt(formData.value),
        minOrder: parseInt(formData.minOrder),
        maxDiscount: parseInt(formData.maxDiscount),
        expiry: formData.expiry,
        status: formData.status,
        category: formData.category,
        usageCount: 0,
        clauses: formData.clauses,
      });
      setFormData({
        code: '',
        type: 'percent',
        value: '',
        minOrder: '',
        maxDiscount: '',
        expiry: '',
        status: 'active',
        category: 'general',
        clauses: [],
      });
      setClauseInput('');
      setShowAddModal(false);
    }
  };

  const handleEditCoupon = (e) => {
    e.preventDefault();
    if (selectedCoupon && formData.code && formData.value && formData.minOrder !== '' && formData.maxDiscount !== '' && formData.expiry) {
      updateCoupon(selectedCoupon.id, {
        code: formData.code.toUpperCase(),
        type: formData.type,
        value: parseInt(formData.value),
        minOrder: parseInt(formData.minOrder),
        maxDiscount: parseInt(formData.maxDiscount),
        expiry: formData.expiry,
        status: formData.status,
        category: formData.category,
        clauses: formData.clauses,
      });
      setShowEditModal(false);
      setSelectedProduct(null);
      setFormData({
        code: '',
        type: 'percent',
        value: '',
        minOrder: '',
        maxDiscount: '',
        expiry: '',
        status: 'active',
        category: 'general',
        clauses: [],
      });
      setClauseInput('');
    }
  };

  const handleDeleteCoupon = () => {
    if (deletingCoupon) {
      deleteCoupon(deletingCoupon);
      setShowDeleteConfirm(false);
      setDeletingCoupon(null);
    }
  };

  const openEditModal = (coupon) => {
    setSelectedCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value.toString(),
      minOrder: coupon.minOrder.toString(),
      maxDiscount: coupon.maxDiscount.toString(),
      expiry: coupon.expiry,
      status: coupon.status,
      category: coupon.category || 'general',
      clauses: coupon.clauses || [],
    });
    setShowEditModal(true);
  };

  const addClause = () => {
    if (clauseInput.trim()) {
      setFormData({
        ...formData,
        clauses: [...formData.clauses, clauseInput.trim()],
      });
      setClauseInput('');
    }
  };

  const removeClause = (index) => {
    setFormData({
      ...formData,
      clauses: formData.clauses.filter((_, i) => i !== index),
    });
  };

  const handleExportClick = (format) => {
    const exportColumns = ['Code', 'Category', 'Type', 'Value', 'Min Order', 'Max Discount', 'Used', 'Expiry', 'Status'];
    const exportData = filteredCoupons.map(c => ({
      'Code': c.code,
      'Category': getCategoryLabel(c.category),
      'Type': c.type === 'percent' ? 'Percentage' : 'Flat',
      'Value': c.value,
      'Min Order': `₹${c.minOrder}`,
      'Max Discount': `₹${c.maxDiscount}`,
      'Used': c.usageCount || 0,
      'Expiry': c.expiry,
      'Status': c.status,
    }));
    handleExport(exportData, exportColumns, 'coupons-list', 'Coupons Report', format);
    setShowExportMenu(false);
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-4 sm:p-8 scroll-smooth bg-linear-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">🎟️ Coupons & Discounts</h1>
            <p className="text-sm sm:text-base text-gray-600">Manage your promotional codes and discount campaigns</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                setFormData({
                  code: '',
                  type: 'percent',
                  value: '',
                  minOrder: '',
                  maxDiscount: '',
                  expiry: '',
                  status: 'active',
                  category: 'general',
                  clauses: [],
                });
                setClauseInput('');
                setShowAddModal(true);
              }}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              <Plus size={18} />
              ➕ Create
            </button>
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg w-full sm:w-auto text-sm sm:text-base"
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
                    📄 CSV
                  </button>
                  <button
                    onClick={() => handleExportClick('pdf')}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 font-medium"
                  >
                    📄 PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-6 border-2 border-blue-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-bold uppercase tracking-wide mb-2">📌 Total</p>
                <p className="text-3xl font-bold text-blue-900">{totalCoupons}</p>
              </div>
              <div className="text-4xl">🏷️</div>
            </div>
          </div>

          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl shadow-md p-6 border-2 border-green-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-bold uppercase tracking-wide mb-2">✅ Active</p>
                <p className="text-3xl font-bold text-green-900">{activeCoupons}</p>
              </div>
              <div className="text-4xl">💚</div>
            </div>
          </div>

          <div className="bg-linear-to-br from-red-50 to-red-100 rounded-xl shadow-md p-6 border-2 border-red-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 text-sm font-bold uppercase tracking-wide mb-2">⏰ Expired</p>
                <p className="text-3xl font-bold text-red-900">{expiredCoupons}</p>
              </div>
              <div className="text-4xl">📆</div>
            </div>
          </div>

          <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl shadow-md p-6 border-2 border-purple-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-bold uppercase tracking-wide mb-2">🎯 Used</p>
                <p className="text-3xl font-bold text-purple-900">{usedCoupons}</p>
              </div>
              <div className="text-4xl">✨</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 border border-gray-200">
          <input
            type="text"
            placeholder="🔍 Search by coupon code..."
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
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Used</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900 hidden xl:table-cell">Expiry</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Status</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredCoupons.map(coupon => {
                const isExpired = new Date(coupon.expiry) < new Date();
                const getCategoryColor = (category) => {
                  switch(category) {
                    case 'general': return 'bg-blue-100 text-blue-800';
                    case 'first-order': return 'bg-green-100 text-green-800';
                    case 'cart-based': return 'bg-purple-100 text-purple-800';
                    case 'referral': return 'bg-orange-100 text-orange-800';
                    default: return 'bg-gray-100 text-gray-800';
                  }
                };
                const getCategoryLabel = (category) => {
                  switch(category) {
                    case 'general': return 'General';
                    case 'first-order': return 'First Order';
                    case 'cart-based': return 'Cart Based';
                    case 'referral': return 'Referral';
                    default: return 'General';
                  }
                };
                return (
                  <tr key={coupon.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold text-gray-900">{coupon.code}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm hidden sm:table-cell">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(coupon.category || 'general')}`}>
                        {getCategoryLabel(coupon.category || 'general')}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm hidden md:table-cell">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {coupon.type === 'percent' ? 'Percentage' : 'Flat'}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-900">
                      {coupon.type === 'percent' ? `${coupon.value}%` : `₹${coupon.value}`}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 hidden lg:table-cell">₹{coupon.minOrder}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 hidden lg:table-cell">₹{coupon.maxDiscount}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 text-xs">{coupon.usageCount || 0}x</span>
                        <span className="text-xs text-gray-600 mt-0.5">
                          ~₹{((coupon.usageCount || 0) * Math.min(coupon.value, coupon.maxDiscount)).toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 hidden xl:table-cell">
                      <span className={isExpired ? 'text-red-600 font-semibold' : ''}>
                        {coupon.expiry}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                      <button
                        onClick={() => {
                          updateCoupon(coupon.id, { status: coupon.status === 'active' ? 'inactive' : 'active' });
                        }}
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold transition ${getStatusColor(coupon.status)}`}
                      >
                        {coupon.status}
                      </button>
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
              })}
            </tbody>
          </table>
        </div>
      </div>

      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {showAddModal ? 'Create Coupon' : 'Edit Coupon'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setSelectedCoupon(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
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
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="percent">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Value {formData.type === 'percent' ? '(%)' : '(₹)'}
                  </label>
                  <input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({...formData, value: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Min Order Value (₹)</label>
                  <input
                    type="number"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({...formData, minOrder: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Max Discount (₹)</label>
                  <input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({...formData, maxDiscount: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiry}
                    onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Terms & Conditions</label>
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
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setSelectedCoupon(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {showAddModal ? 'Create Coupon' : 'Save Changes'}
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
              <p className="text-gray-700 mb-6">Are you sure you want to delete this coupon? This action cannot be undone.</p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeletingCoupon(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCoupon}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
