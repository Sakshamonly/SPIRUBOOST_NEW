"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, X, Download, RefreshCw, Trash2, Edit2 } from "lucide-react";
import API from "../../../lib/api";

const emptyFormData = () => ({
  name: "",
  sku: "",
  price: "",
  stock: "",
  category: "animal",
  status: "active",
  overview: "",
  keyBenefits: "",
  description: "",
  howToUse: [],
  faq: [],
  images: ["", "", "", "", ""],
  imageFiles: [null, null, null, null, null],
  quantitySold: 0,
});

const normalizeHowToUse = (value) => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") return item.step || item.text || "";
      return "";
    })
    .filter(Boolean);
};

const normalizeFaq = (value) => {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    if (typeof item === "string") {
      return { question: "", answer: item };
    }
    return {
      question: item?.question || "",
      answer: item?.answer || "",
    };
  });
};

const normalizeProduct = (product) => {
  const stock = Number(product?.stock ?? product?.countInStock ?? 0);

  return {
    id: product?._id || product?.id,
    name: product?.name || "",
    sku: product?.sku || "",
    price: Number(product?.price ?? 0),
    stock,
    category: product?.category || "animal",
    status: product?.status || (product?.isActive === false ? "inactive" : "active"),
    overview: product?.overview || "",
    keyBenefits: product?.keyBenefits || "",
    description: product?.description || "",
    howToUse: normalizeHowToUse(product?.howToUse),
    faq: normalizeFaq(product?.faq),
    images: Array.isArray(product?.images) ? product.images.filter(Boolean) : [],
    image: product?.image || "",
    quantitySold: Number(product?.quantitySold ?? 0),
    createdAt: product?.createdAt || null,
  };
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

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [formData, setFormData] = useState(emptyFormData());

  const categories = ["animal", "human"];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await API.get("/products/admin/all/list");
      const list = Array.isArray(response.data)
        ? response.data
        : response.data?.products || response.data?.data || [];
      setProducts(list.map(normalizeProduct));
    } catch (err) {
      console.warn("Failed to fetch products");
      setError(err?.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetFormData = () => {
    setFormData(emptyFormData());
  };

  const totalSKU = products.length;
  const activeSKU = products.filter((p) => p.status === "active").length;
  const lowStockSKU = products.filter((p) => p.stock < 10 && p.stock > 0).length;
  const outOfStockSKU = products.filter((p) => p.stock === 0).length;

  const filteredProducts = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query);
      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;
      const matchesStatus =
        statusFilter === "All" || product.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, categoryFilter, statusFilter]);

  const handleImageChange = (index, file) => {
    const previewUrl = URL.createObjectURL(file);
    const newImages = [...formData.images];
    const newFiles = [...formData.imageFiles];

    newImages[index] = previewUrl;
    newFiles[index] = file;

    setFormData({
      ...formData,
      images: newImages,
      imageFiles: newFiles,
    });
  };

  const buildProductFormData = (data) => {
    const fd = new FormData();

    fd.append("name", data.name.trim());
    fd.append("sku", data.sku.trim());
    fd.append("price", String(data.price || 0));
    fd.append("stock", String(data.stock || 0));
    fd.append("countInStock", String(data.stock || 0));
    fd.append("category", data.category);
    fd.append("status", data.status);
    fd.append("overview", data.overview || "");
    fd.append("keyBenefits", data.keyBenefits || "");
    fd.append("description", data.description || "");
    fd.append("howToUse", JSON.stringify(data.howToUse.filter(Boolean)));
    fd.append("faq", JSON.stringify(data.faq.filter((item) => item.question || item.answer)));
    fd.append(
      "existingImages",
      JSON.stringify(
        data.images.filter((_, index) => !data.imageFiles[index] && data.images[index])
      )
    );
    fd.append("quantitySold", String(data.quantitySold || 0));

    data.imageFiles.forEach((file) => {
      if (file) fd.append("images", file);
    });

    return fd;
  };

  const openAddModal = () => {
    resetFormData();
    setSelectedProduct(null);
    setShowAddModal(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name || "",
      sku: product.sku || "",
      price: String(product.price ?? ""),
      stock: String(product.stock ?? ""),
      category: product.category || "animal",
      status: product.status || "active",
      overview: product.overview || "",
      keyBenefits: product.keyBenefits || "",
      description: product.description || "",
      howToUse: Array.isArray(product.howToUse) ? product.howToUse : [],
      faq: Array.isArray(product.faq) ? product.faq : [],
      images: Array.isArray(product.images)
        ? [...product.images, "", "", "", ""].slice(0, 5)
        : product.image
        ? [product.image, "", "", "", ""]
        : ["", "", "", "", ""],
      imageFiles: [null, null, null, null, null],
      quantitySold: Number(product.quantitySold || 0),
    });
    setShowEditModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteConfirm(false);
    setSelectedProduct(null);
    setDeletingProduct(null);
    resetFormData();
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      setError("");
      await API.post("/products", buildProductFormData(formData), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      closeModals();
      await fetchProducts();
    } catch (err) {
      console.warn("Add product failed", err);
      setError(err?.response?.data?.message || "Failed to add product");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    if (!selectedProduct?.id) return;
    try {
      setActionLoading(true);
      setError("");
      await API.put(`/products/${selectedProduct.id}`, buildProductFormData(formData), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      closeModals();
      await fetchProducts();
    } catch (err) {
      console.warn("Edit product failed", err);
      setError(err?.response?.data?.message || "Failed to update product");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deletingProduct) return;
    try {
      setActionLoading(true);
      setError("");
      await API.delete(`/products/${deletingProduct}`);
      closeModals();
      await fetchProducts();
    } catch (err) {
      console.warn("Delete product failed");
      setError(err?.response?.data?.message || "Failed to delete product");
    } finally {
      setActionLoading(false);
    }
  };

  const toggleProductStatus = async (product) => {
    try {
      setActionLoading(true);
      setError("");
      const nextStatus = product.status === "active" ? "inactive" : "active";
      await API.put(`/products/${product.id}`, { status: nextStatus });
      await fetchProducts();
    } catch (err) {
      console.warn("Toggle product status failed");
      setError(err?.response?.data?.message || "Failed to update product status");
    } finally {
      setActionLoading(false);
    }
  };

  const handleExportClick = (format) => {
    const rows = [
      ["SKU", "Name", "Category", "Price", "Stock", "Status"],
      ...filteredProducts.map((p) => [
        p.sku,
        p.name,
        p.category,
        `₹${p.price}`,
        p.stock,
        p.status,
      ]),
    ];

    if (format === "csv") {
      downloadCsv(rows, "products-list.csv");
    } else {
      window.print();
    }
    setShowExportMenu(false);
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 scroll-smooth">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
        <div className="flex gap-3">
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={18} />
            Add Product
          </button>
          <button
            onClick={fetchProducts}
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
                  onClick={() => handleExportClick("csv")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-b"
                >
                  Export as CSV
                </button>
                <button
                  onClick={() => handleExportClick("pdf")}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm mb-2">Total SKU</p>
          <p className="text-3xl font-bold text-gray-900">{loading ? "..." : totalSKU}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm mb-2">Active SKU</p>
          <p className="text-3xl font-bold text-gray-900">{loading ? "..." : activeSKU}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm mb-2">Low Stock</p>
          <p className="text-3xl font-bold text-gray-900">{loading ? "..." : lowStockSKU}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm mb-2">Out of Stock</p>
          <p className="text-3xl font-bold text-gray-900">{loading ? "..." : outOfStockSKU}</p>
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
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
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {product.sku || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ₹{Number(product.price || 0).toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold">
                      <span
                        className={`${
                          product.stock === 0
                            ? "text-red-600"
                            : product.stock < 10
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => toggleProductStatus(product)}
                        disabled={actionLoading}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition disabled:opacity-50 ${getStatusColor(
                          product.status
                        )}`}
                      >
                        {product.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200 transition flex items-center gap-1"
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeletingProduct(product.id);
                            setShowDeleteConfirm(true);
                          }}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200 transition flex items-center gap-1"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">
                {showAddModal ? "Add New Product" : "Edit Product"}
              </h2>
              <button
                onClick={closeModals}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form
              onSubmit={showAddModal ? handleAddProduct : handleEditProduct}
              className="p-6 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SKU ID *
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) =>
                      setFormData({ ...formData, sku: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Overview
                </label>
                <textarea
                  value={formData.overview}
                  onChange={(e) =>
                    setFormData({ ...formData, overview: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  rows="3"
                  placeholder="Brief overview of the product..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Key Benefits
                </label>
                <textarea
                  value={formData.keyBenefits}
                  onChange={(e) =>
                    setFormData({ ...formData, keyBenefits: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  rows="3"
                  placeholder="Main benefits of the product..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stock *
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="animal">Animal</option>
                    <option value="human">Human</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  rows="4"
                  placeholder="Detailed product description..."
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    How to Use (Steps)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        howToUse: [...formData.howToUse, ""],
                      })
                    }
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
                          setFormData({ ...formData, howToUse: newSteps });
                        }}
                        placeholder={`Step ${index + 1}`}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            howToUse: formData.howToUse.filter((_, i) => i !== index),
                          })
                        }
                        className="px-3 py-2 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200 transition"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    FAQ (Frequently Asked Questions)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        faq: [...formData.faq, { question: "", answer: "" }],
                      })
                    }
                    className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold hover:bg-green-200 transition"
                  >
                    + Add FAQ
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.faq.map((item, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-semibold text-gray-700">
                          FAQ {index + 1}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              faq: formData.faq.filter((_, i) => i !== index),
                            })
                          }
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
                          setFormData({ ...formData, faq: newFaq });
                        }}
                        placeholder="Question"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-2"
                      />
                      <textarea
                        value={item.answer}
                        onChange={(e) => {
                          const newFaq = [...formData.faq];
                          newFaq[index].answer = e.target.value;
                          setFormData({ ...formData, faq: newFaq });
                        }}
                        placeholder="Answer"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        rows="2"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Product Images (Upload JPEG/PNG)
                </label>
                <div className="space-y-3">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="space-y-2">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          handleImageChange(index, file);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />

                      {formData.images[index] ? (
                        <div className="relative w-28 h-28">
                          <img
                            src={formData.images[index]}
                            alt={`Product ${index + 1}`}
                            className="w-28 h-28 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = [...formData.images];
                              const newFiles = [...formData.imageFiles];
                              newImages[index] = "";
                              newFiles[index] = null;
                              setFormData({
                                ...formData,
                                images: newImages,
                                imageFiles: newFiles,
                              });
                            }}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={closeModals}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                >
                  {actionLoading
                    ? "Saving..."
                    : showAddModal
                    ? "Add Product"
                    : "Save Changes"}
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
              <h2 className="text-lg font-bold text-gray-900">
                Confirm Deletion
              </h2>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={closeModals}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProduct}
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
