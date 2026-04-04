'use client';

import { useState } from 'react';
import { useMockData } from '../hooks/useMockData.js';
import { Plus, Trash2, Edit2, X, Download } from 'lucide-react';

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useMockData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    stock: '',
    category: 'animal',
    status: 'active',
    overview: '',
    keyBenefits: '',
    description: '',
    howToUse: [],
    faq: [],
    images: [],
    quantitySold: 0,
  });

  const categories = ['animal', 'human'];
  const totalSKU = products.length;
  const activeSKU = products.filter(p => p.status === 'active').length;
  const lowStockSKU = products.filter(p => p.stock < 10 && p.stock > 0).length;
  const outOfStockSKU = products.filter(p => p.stock === 0).length;

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (formData.name && formData.sku && formData.price && formData.stock) {
      addProduct({
        name: formData.name,
        sku: formData.sku,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category,
        status: formData.status,
        overview: formData.overview,
        keyBenefits: formData.keyBenefits,
        description: formData.description,
        howToUse: formData.howToUse,
        faq: formData.faq,
        images: formData.images,
        quantitySold: 0,
      });
      resetFormData();
      setShowAddModal(false);
    }
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    if (selectedProduct && formData.name && formData.sku && formData.price && formData.stock) {
      updateProduct(selectedProduct.id, {
        name: formData.name,
        sku: formData.sku,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category,
        status: formData.status,
        overview: formData.overview,
        keyBenefits: formData.keyBenefits,
        description: formData.description,
        howToUse: formData.howToUse,
        faq: formData.faq,
        images: formData.images,
      });
      setShowEditModal(false);
      setSelectedProduct(null);
      resetFormData();
    }
  };

  const handleDeleteProduct = () => {
    if (deletingProduct) {
      deleteProduct(deletingProduct);
      setShowDeleteConfirm(false);
      setDeletingProduct(null);
    }
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      sku: '',
      price: '',
      stock: '',
      category: 'animal',
      status: 'active',
      overview: '',
      keyBenefits: '',
      description: '',
      howToUse: [],
      faq: [],
      images: [],
      quantitySold: 0,
    });
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      status: product.status,
      overview: product.overview || '',
      keyBenefits: product.keyBenefits || '',
      description: product.description || '',
      howToUse: product.howToUse || [],
      faq: product.faq || [],
      images: product.images || [],
      quantitySold: product.quantitySold || 0,
    });
    setShowEditModal(true);
  };

  const handleExportClick = (format) => {
    const exportColumns = ['SKU', 'Name', 'Category', 'Price', 'Stock', 'Status'];
    const exportData = filteredProducts.map(p => ({
      'SKU': p.sku,
      'Name': p.name,
      'Category': p.category,
      'Price': `₹${p.price}`,
      'Stock': p.stock,
      'Status': p.status,
    }));
    handleExport(exportData, exportColumns, 'products-list', 'Products Report', format);
    setShowExportMenu(false);
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 scroll-smooth">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
        <div className="flex gap-3">
          <button
            onClick={() => {
              resetFormData();
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={18} />
            Add Product
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
                  onClick={() => handleExportClick('csv')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-b"
                >
                  Export as CSV
                </button>
                <button
                  onClick={() => handleExportClick('pdf')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Export as PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm mb-2">Total SKU</p>
          <p className="text-3xl font-bold text-gray-900">{totalSKU}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm mb-2">Active SKU</p>
          <p className="text-3xl font-bold text-gray-900">{activeSKU}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm mb-2">Low Stock</p>
          <p className="text-3xl font-bold text-gray-900">{lowStockSKU}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm mb-2">Out of Stock</p>
          <p className="text-3xl font-bold text-gray-900">{outOfStockSKU}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by SKU or Product Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">SKU</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Product Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.sku}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{product.price}</td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    <span className={`${product.stock === 0 ? 'text-red-600' : product.stock < 10 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => {
                        updateProduct(product.id, { status: product.status === 'active' ? 'inactive' : 'active' });
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${getStatusColor(product.status)}`}
                    >
                      {product.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeletingProduct(product.id);
                          setShowDeleteConfirm(true);
                        }}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">
                {showAddModal ? 'Add New Product' : 'Edit Product'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setSelectedProduct(null);
                  resetFormData();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={showAddModal ? handleAddProduct : handleEditProduct} className="p-6 space-y-6">
              {/* SKU and Product Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">SKU ID *</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({...formData, sku: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Product Overview */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Overview</label>
                <textarea
                  value={formData.overview}
                  onChange={(e) => setFormData({...formData, overview: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  rows="3"
                  placeholder="Brief overview of the product..."
                />
              </div>

              {/* Key Benefits */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Key Benefits</label>
                <textarea
                  value={formData.keyBenefits}
                  onChange={(e) => setFormData({...formData, keyBenefits: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  rows="3"
                  placeholder="Main benefits of the product..."
                />
              </div>

              {/* Price and Stock Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stock *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="animal">Animal</option>
                    <option value="human">Human</option>
                  </select>
                </div>
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  rows="4"
                  placeholder="Detailed product description..."
                />
              </div>

              {/* How to Use Section */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-semibold text-gray-700">How to Use (Steps)</label>
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      howToUse: [...formData.howToUse, '']
                    })}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold hover:bg-green-200 transition"
                  >
                    + Add Step
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.howToUse.map((step, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={step}
                        onChange={(e) => {
                          const newSteps = [...formData.howToUse];
                          newSteps[index] = e.target.value;
                          setFormData({...formData, howToUse: newSteps});
                        }}
                        placeholder={`Step ${index + 1}`}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          howToUse: formData.howToUse.filter((_, i) => i !== index)
                        })}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200 transition"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-semibold text-gray-700">FAQ (Frequently Asked Questions)</label>
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      faq: [...formData.faq, { question: '', answer: '' }]
                    })}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold hover:bg-green-200 transition"
                  >
                    + Add FAQ
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.faq.map((item, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-semibold text-gray-700">FAQ {index + 1}</p>
                        <button
                          type="button"
                          onClick={() => setFormData({
                            ...formData,
                            faq: formData.faq.filter((_, i) => i !== index)
                          })}
                          className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200 transition"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        value={item.question}
                        onChange={(e) => {
                          const newFaq = [...formData.faq];
                          newFaq[index].question = e.target.value;
                          setFormData({...formData, faq: newFaq});
                        }}
                        placeholder="Question"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-2"
                      />
                      <textarea
                        value={item.answer}
                        onChange={(e) => {
                          const newFaq = [...formData.faq];
                          newFaq[index].answer = e.target.value;
                          setFormData({...formData, faq: newFaq});
                        }}
                        placeholder="Answer"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        rows="2"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Images Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Product Images (Up to 5)</label>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="relative">
                      <label className="flex items-center justify-center w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const newImages = [...formData.images];
                                newImages[index] = event.target?.result;
                                setFormData({...formData, images: newImages});
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                        <div className="text-center p-4">
                          {formData.images[index] ? (
                            <div className="relative w-full h-full">
                              <img
                                src={formData.images[index]}
                                alt={`Product ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  const newImages = [...formData.images];
                                  newImages[index] = null;
                                  setFormData({...formData, images: newImages});
                                }}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <div className="text-gray-400">
                              <p className="text-sm font-medium">Image {index + 1}</p>
                              <p className="text-xs">Click to upload</p>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status and Action Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              {/* Form Actions */}
              <div className="flex gap-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setSelectedProduct(null);
                    resetFormData();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  {showAddModal ? 'Add Product' : 'Save Changes'}
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
              <p className="text-gray-700 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeletingProduct(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProduct}
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
