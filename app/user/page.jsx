"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Edit, Save, X, User, Mail, Phone, Calendar, MapPin, Home, Building2, Landmark, Hash, Plus, Package, Clock, CheckCircle, Truck, DollarSign, ShoppingBag, Star, Edit3, Trash2 } from "lucide-react"
import Navbar from "@/app/components/usable/navbar"
import Footer from "@/app/components/usable/footer"

// Add smooth scrolling style
if (typeof window !== 'undefined') {
  document.documentElement.style.scrollBehavior = 'smooth'
}

export default function UserDashboard() {
  const router = useRouter()

  // Mock Data
  const initialAddresses = [
    {
      id: "addr1",
      addressLine1: "S1-1512, Socrate 15th Floor",
      addressLine2: "Supertech Czar Suits",
      landmark: "Omnicron 1",
      city: "Greater Noida",
      state: "Uttar Pradesh",
      zip: "201310",
    },
    {
      id: "addr2",
      addressLine1: "B-502, Bandra Heights",
      addressLine2: "Linking Road",
      landmark: "Behind Oberoi Mall",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400050",
    },
    {
      id: "addr3",
      addressLine1: "House No. 45, Block C",
      addressLine2: "Indirapuram, Meerut Road",
      landmark: "Near DLF Commercial",
      city: "Ghaziabad",
      state: "Uttar Pradesh",
      zip: "201014",
    },
  ]

  const initialUserData = {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    mobile: "+91 98765 43210",
    defaultAddressId: "addr1",
  }

  const mockOrders = [
    {
      id: "ORD001",
      date: "15-03-2026",
      items: ["Tulsi Green Tea (2)", "Ayurvedic Turmeric Oil (1)"],
      status: "Delivered",
      total: "₹1,250",
      address: {
        addressLine1: "Flat 301, Green Park Apartments",
        addressLine2: "MG Road, Sector 14",
        landmark: "Near Metro Station",
        city: "Gurgaon",
        state: "Haryana",
        zip: "122001",
      },
    },
    {
      id: "ORD002",
      date: "20-02-2026",
      items: ["Immunity Booster Ashwagandha Capsules (1)"],
      status: "Shipped",
      total: "₹599",
      address: {
        addressLine1: "B-502, Bandra Heights",
        addressLine2: "Linking Road",
        landmark: "Behind Oberoi Mall",
        city: "Mumbai",
        state: "Maharashtra",
        zip: "400050",
      },
    },
    {
      id: "ORD003",
      date: "05-02-2026",
      items: ["Neem & Honey Face Mask (3)", "Brahmi Hair Growth Serum (1)"],
      status: "Processing",
      total: "₹899",
      address: {
        addressLine1: "House No. 45, Block C",
        addressLine2: "Indirapuram, Meerut Road",
        landmark: "Near DLF Commercial",
        city: "Ghaziabad",
        state: "Uttar Pradesh",
        zip: "201014",
      },
    },
  ]

  // State Management
  const [userData, setUserData] = useState(initialUserData)
  const [allAddresses, setAllAddresses] = useState(initialAddresses)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editableDetails, setEditableDetails] = useState({
    name: initialUserData.name,
  })
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [addressFormData, setAddressFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    zip: "",
  })

  // Handlers
  const handleUpdateUserDetails = () => {
    setUserData((prevData) => ({
      ...prevData,
      name: editableDetails.name,
    }))
    setIsEditingProfile(false)
  }

  const handleCancelEditProfile = () => {
    setEditableDetails({
      name: userData.name,
    })
    setIsEditingProfile(false)
  }

  const handleAddressChange = (newDefaultId) => {
    setUserData((prevData) => ({
      ...prevData,
      defaultAddressId: newDefaultId,
    }))
  }

  const handleOpenAddressModal = (address = null) => {
    if (address) {
      setEditingAddress(address)
      setAddressFormData({
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        zip: address.zip,
      })
    } else {
      setEditingAddress(null)
      setAddressFormData({
        addressLine1: "",
        addressLine2: "",
        landmark: "",
        city: "",
        state: "",
        zip: "",
      })
    }
    setIsAddressModalOpen(true)
  }

  const handleCloseAddressModal = () => {
    setIsAddressModalOpen(false)
    setEditingAddress(null)
  }

  const handleSaveAddress = () => {
    if (!addressFormData.addressLine1 || !addressFormData.addressLine2 || !addressFormData.city || !addressFormData.state || !addressFormData.zip) {
      alert("Please fill in all required fields")
      return
    }

    if (editingAddress) {
      setAllAddresses((prevAddresses) =>
        prevAddresses.map((addr) =>
          addr.id === editingAddress.id ? { ...addr, ...addressFormData } : addr
        )
      )
    } else {
      const newAddress = {
        id: `addr${Date.now()}`,
        ...addressFormData,
      }
      setAllAddresses((prevAddresses) => [...prevAddresses, newAddress])
    }
    handleCloseAddressModal()
  }

  const handleDeleteAddress = (addressId) => {
    setAllAddresses((prevAddresses) => prevAddresses.filter((addr) => addr.id !== addressId))
    if (userData.defaultAddressId === addressId) {
      setUserData((prevData) => ({
        ...prevData,
        defaultAddressId: allAddresses.length > 1 ? allAddresses[0].id : null,
      }))
    }
  }

  const handleOrderClick = (order) => {
    setSelectedOrder(order)
    setIsOrderModalOpen(true)
  }

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false)
    setSelectedOrder(null)
  }

  const handleLogout = () => {
    router.replace("/login")
  }

  const userDetails = useMemo(() => {
    const currentDefaultAddress = allAddresses.find((addr) => addr.id === userData.defaultAddressId)
    const defaultAddressText = currentDefaultAddress
      ? `${currentDefaultAddress.addressLine1}${currentDefaultAddress.addressLine2 ? `, ${currentDefaultAddress.addressLine2}` : ""}${currentDefaultAddress.landmark ? `, ${currentDefaultAddress.landmark}` : ""}, ${currentDefaultAddress.city}, ${currentDefaultAddress.state} ${currentDefaultAddress.zip}`
      : "N/A"

    return [
      { label: "Name", value: userData.name },
      { label: "Email", value: userData.email },
      { label: "Mobile", value: userData.mobile },
      { label: "Default Address", value: defaultAddressText, isSelectable: true },
    ]
  }, [userData, allAddresses])

  const defaultAddress = allAddresses.find((addr) => addr.id === userData.defaultAddressId)
  const otherAddresses = allAddresses.filter((addr) => addr.id !== userData.defaultAddressId)

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "shipped":
        return <Truck className="h-5 w-5 text-blue-600" />
      case "processing":
        return <Clock className="h-5 w-5 text-orange-600" />
      default:
        return <Package className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-700 bg-green-100 border-green-200"
      case "shipped":
        return "text-blue-700 bg-blue-100 border-blue-200"
      case "processing":
        return "text-orange-700 bg-orange-100 border-orange-200"
      default:
        return "text-gray-700 bg-gray-100 border-gray-200"
    }
  }

  const getCardGradient = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "from-green-50 to-emerald-50 border-green-200"
      case "shipped":
        return "from-blue-50 to-sky-50 border-blue-200"
      case "processing":
        return "from-orange-50 to-yellow-50 border-orange-200"
      default:
        return "from-gray-50 to-slate-50 border-gray-200"
    }
  }

  const getIcon = (label) => {
    switch (label) {
      case "Name":
        return <User className="h-5 w-5 text-purple-600" />
      case "Email":
        return <Mail className="h-5 w-5 text-blue-600" />
      case "Mobile":
        return <Phone className="h-5 w-5 text-green-600" />
      case "Default Address":
        return <MapPin className="h-5 w-5 text-orange-600" />
      default:
        return <User className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-800" style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif", scrollBehavior: 'smooth' }}>
      <Navbar />

      {/* Header Section */}
      <div className="text-white py-12 md:py-16 mt-20 transition-all duration-500" style={{ background: 'linear-gradient(135deg, #1a3a32 0%, #2d5a52 35%, #1e4d6b 70%, #0f2e3d 100%)' }}>
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif", fontWeight: '700' }}>
              Welcome {userData.name}
            </h1>
            <p className="text-gray-200 text-lg">
              Know about youself, your orders and manage your delivery addresses all in one place.
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-6xl py-8 md:py-12 px-4 space-y-8">
        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* User Details Section */}
          <section className="w-full bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Header */}
            <div className="px-6 md:px-8 py-5 border-b border-gray-100" style={{ background: '#f8f9fa' }}>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#e3f2fd' }}>
                    <User className="h-5 w-5" style={{ color: '#1976d2' }} />
                  </div>
                  <h2 className="text-xl font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '700', color: '#000000' }}>Profile Details</h2>
                </div>
                {!isEditingProfile ? (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-sm hover:bg-blue-50"
                    style={{ color: '#1976d2' }}
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleUpdateUserDetails}
                      className="px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-md"
                      style={{ color: '#388e3c', background: '#e8f5e9' }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#c8e6c9'
                        e.target.style.transform = 'translateY(-1px)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#e8f5e9'
                        e.target.style.transform = 'translateY(0)'
                      }}
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancelEditProfile}
                      className="px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1 transition-all duration-300 hover:bg-gray-100 hover:shadow-sm"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-4">
              {userDetails.map((detail, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:shadow-sm">
                  <div className="shrink-0">
                    {getIcon(detail.label)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="text-sm font-medium text-gray-600 block mb-1" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                      {detail.label}
                    </label>
                    {isEditingProfile && detail.label === "Name" ? (
                      <input
                        type="text"
                        value={editableDetails.name}
                        onChange={(e) => setEditableDetails({ ...editableDetails, name: e.target.value })}
                        className="w-full text-sm text-gray-900 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md px-3 py-2 outline-none transition-all"
                        placeholder="Enter your name"
                      />
                    ) : detail.label === "Default Address" && isEditingProfile ? (
                      <select
                        value={userData.defaultAddressId || ""}
                        onChange={(e) => handleAddressChange(e.target.value)}
                        className="w-full text-sm text-gray-900 border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-md px-3 py-2 outline-none transition-all bg-white cursor-pointer"
                      >
                        <option value="">Select a default address</option>
                        {allAddresses.map((addr) => (
                          <option key={addr.id} value={addr.id}>
                            {addr.addressLine1} {addr.addressLine2 ? `, ${addr.addressLine2}` : ""}, {addr.city}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="text-sm text-gray-900 font-medium">
                        {detail.value}
                        {(detail.label === "Email" || detail.label === "Mobile") && isEditingProfile && (
                          <span className="text-xs text-gray-500 block mt-1">
                            This field cannot be edited here
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 md:px-8 py-6 bg-white border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full px-6 py-3 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 hover:shadow-lg active:scale-95"
                style={{ 
                  color: '#ffffff', 
                  background: '#d32f2f',
                  fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
                  fontSize: '15px',
                  letterSpacing: '0.3px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#000000'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#d32f2f'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          </section>

          {/* Saved Addresses Section */}
          <section className="w-full bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Header */}
            <div className="px-6 md:px-8 py-5 border-b border-gray-100" style={{ background: '#f8f9fa' }}>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#e3f2fd' }}>
                    <Home className="h-5 w-5" style={{ color: '#1976d2' }} />
                  </div>
                  <h2 className="text-xl font-bold" style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '700', color: '#000000' }}>Delivery Addresses</h2>
                </div>
                <button
                  onClick={() => handleOpenAddressModal()}
                  className="px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all duration-300 text-white hover:shadow-md"
                  style={{ background: '#0288d1' }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#01579b'
                    e.target.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#0288d1'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  <Plus className="h-4 w-4" />
                  Add New
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {allAddresses.length === 0 ? (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No addresses saved yet</p>
                  <button
                    onClick={() => handleOpenAddressModal()}
                    className="px-6 py-2 rounded-lg text-white font-medium transition-all"
                    style={{ background: '#0288d1' }}
                    onMouseEnter={(e) => e.target.style.background = '#01579b'}
                    onMouseLeave={(e) => e.target.style.background = '#0288d1'}
                  >
                    <Plus className="h-4 w-4 inline mr-2" />
                    Add Your First Address
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {defaultAddress && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                        <Home className="h-4 w-4 mr-2" style={{ color: '#388e3c' }} />
                        Default Address
                      </h3>
                      <div className="relative group p-5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white transition-all duration-300">
                        {defaultAddress && (
                          <div className="absolute -top-2 -right-2 text-xs font-bold px-3 py-1 rounded-full text-white flex items-center" style={{ background: '#388e3c' }}>
                            <Star className="h-3 w-3 mr-1" />
                            Default
                          </div>
                        )}
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <MapPin className="h-4 w-4" style={{ color: '#1976d2' }} />
                                <span className="font-semibold text-gray-900">
                                  {defaultAddress.addressLine1}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 space-y-1 ml-6">
                                {defaultAddress.addressLine2 && (
                                  <p>{defaultAddress.addressLine2}</p>
                                )}
                                {defaultAddress.landmark && (
                                  <p className="font-medium">📍 {defaultAddress.landmark}</p>
                                )}
                                <p className="font-medium text-gray-700">
                                  {defaultAddress.city}, {defaultAddress.state} {defaultAddress.zip}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <button
                              onClick={() => handleOpenAddressModal(defaultAddress)}
                              className="h-8 w-8 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ color: '#1976d2', background: '#e3f2fd' }}
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {otherAddresses.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                        <MapPin className="h-4 w-4 mr-2" style={{ color: '#1976d2' }} />
                        Other Addresses
                      </h3>
                      <div className="space-y-3">
                        {otherAddresses.map((address) => (
                          <div key={address.id} className="relative group p-5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white transition-all duration-300 hover:shadow-md hover:border-gray-300">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3 flex-1">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <MapPin className="h-4 w-4" style={{ color: '#1976d2' }} />
                                    <span className="font-semibold text-gray-900">
                                      {address.addressLine1}
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-600 space-y-1 ml-6">
                                    {address.addressLine2 && (
                                      <p>{address.addressLine2}</p>
                                    )}
                                    {address.landmark && (
                                      <p className="font-medium">📍 {address.landmark}</p>
                                    )}
                                    <p className="font-medium text-gray-700">
                                      {address.city}, {address.state} {address.zip}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-2 ml-4">
                                <button
                                  onClick={() => handleOpenAddressModal(address)}
                                  className="h-8 w-8 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-sm"
                                  style={{ color: '#1976d2', background: '#e3f2fd' }}
                                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                >
                                  <Edit3 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteAddress(address.id)}
                                  className="h-8 w-8 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-sm"
                                  style={{ color: '#d32f2f', background: '#ffebee' }}
                                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>

      </main>

      {/* Address Form Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg p-0 rounded-2xl shadow-lg border border-gray-200 overflow-hidden m-auto">
            {/* Header */}
            <div className="px-6 md:px-8 py-5 border-b border-gray-100 bg-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#e3f2fd' }}>
                  <MapPin className="h-5 w-5" style={{ color: '#1976d2' }} />
                </div>
                <div>
                  <h2 className="text-lg font-bold" style={{ color: '#000000' }}>
                    {editingAddress ? "Edit Address" : "Add New Address"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {editingAddress ? "Update your delivery address" : "Add a new delivery location"}
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSaveAddress()
              }}
              className="p-6 md:p-8 space-y-5 max-h-96 overflow-y-auto"
            >
              {/* Address Line 1 */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <Home className="h-4 w-4" style={{ color: '#1976d2' }} />
                  <span>House/Building Number *</span>
                </label>
                <input
                  placeholder="e.g., 123, Green Apartments, Block A"
                  value={addressFormData.addressLine1}
                  onChange={(e) => setAddressFormData({ ...addressFormData, addressLine1: e.target.value })}
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 text-sm outline-none transition-all"
                  required
                />
              </div>

              {/* Address Line 2 */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <Building2 className="h-4 w-4" style={{ color: '#388e3c' }} />
                  <span>Street/Area *</span>
                </label>
                <input
                  placeholder="e.g., MG Road, Sector 14"
                  value={addressFormData.addressLine2}
                  onChange={(e) => setAddressFormData({ ...addressFormData, addressLine2: e.target.value })}
                  className="w-full border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-lg p-3 text-sm outline-none transition-all"
                  required
                />
              </div>

              {/* Landmark */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <Landmark className="h-4 w-4" style={{ color: '#f57c00' }} />
                  <span>Landmark (Optional)</span>
                </label>
                <input
                  placeholder="e.g., Near Metro Station, Behind Mall"
                  value={addressFormData.landmark}
                  onChange={(e) => setAddressFormData({ ...addressFormData, landmark: e.target.value })}
                  className="w-full border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-lg p-3 text-sm outline-none transition-all"
                />
              </div>

              {/* City and State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <MapPin className="h-4 w-4" style={{ color: '#1976d2' }} />
                    <span>City *</span>
                  </label>
                  <input
                    placeholder="e.g., New Delhi"
                    value={addressFormData.city}
                    onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 text-sm outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <MapPin className="h-4 w-4" style={{ color: '#d32f2f' }} />
                    <span>State *</span>
                  </label>
                  <input
                    placeholder="e.g., Delhi"
                    value={addressFormData.state}
                    onChange={(e) => setAddressFormData({ ...addressFormData, state: e.target.value })}
                    className="w-full border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg p-3 text-sm outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* ZIP Code */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <Hash className="h-4 w-4" style={{ color: '#7b1fa2' }} />
                  <span>PIN Code *</span>
                </label>
                <input
                  placeholder="e.g., 110001"
                  value={addressFormData.zip}
                  onChange={(e) => setAddressFormData({ ...addressFormData, zip: e.target.value })}
                  className="w-full border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg p-3 text-sm outline-none transition-all"
                  required
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseAddressModal}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2 transition-all duration-300 font-medium hover:shadow-sm"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-white rounded-lg shadow-sm flex items-center gap-2 transition-all duration-300 font-medium hover:shadow-md"
                  style={{ background: '#0288d1' }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#01579b'
                    e.target.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#0288d1'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  <Save className="h-4 w-4" />
                  {editingAddress ? "Save Changes" : "Add Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}