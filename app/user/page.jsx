"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  LogOut,
  Edit,
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Plus,
  Star,
  Edit3,
  Trash2,
  Loader2,
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  RotateCcw,
  ExternalLink,
} from "lucide-react"
import Navbar from "@/app/components/usable/navbar"
import Footer from "@/app/components/usable/footer"
import API from "../../lib/api"

function UserDashboardContent() {

  const router = useRouter()
  const searchParams = useSearchParams()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [cancellingOrderId, setCancellingOrderId] = useState("")
  const [trackingOrderId, setTrackingOrderId] = useState("")
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("profile")

  const [allAddresses, setAllAddresses] = useState([])
  const [orders, setOrders] = useState([])
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    mobile: "",
    defaultAddressId: "",
    isAdmin: false,
    memberSince: "",
  })

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editableDetails, setEditableDetails] = useState({
    name: "",
  })

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [addressFormData, setAddressFormData] = useState({
    label: "Home",
    country: "India",
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    zip: "",
  })

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  useEffect(() => {
    const requestedTab = searchParams.get("tab")
    if (["profile", "orders", "addresses"].includes(requestedTab)) {
      setActiveTab(requestedTab)
    }
  }, [searchParams])

  useEffect(() => {
    fetchProfile()
  }, [])

  const syncLocalUser = (data) => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        role: data.role,
        isAdmin: data.isAdmin,
        isEmailVerified: data.isEmailVerified,
      })
    )
  }

  const mapAddressFromApi = (addr, index = 0) => ({
    id: addr._id || `addr-${index}`,
    label: addr.label || "Home",
    country: addr.country || "India",
    firstName: addr.firstName || "",
    lastName: addr.lastName || "",
    addressLine1: addr.address1 || "",
    addressLine2: addr.address2 || "",
    landmark: addr.landmark || "",
    city: addr.city || "",
    state: addr.state || "",
    zip: addr.pincode || "",
    isDefault: !!addr.isDefault,
  })

  const mapAddressToApi = (addr) => ({
    label: addr.label || "Home",
    country: addr.country || "India",
    firstName: addr.firstName || "",
    lastName: addr.lastName || "",
    address1: addr.addressLine1 || "",
    address2: addr.addressLine2 || "",
    landmark: addr.landmark || "",
    city: addr.city || "",
    state: addr.state || "",
    pincode: addr.zip || "",
    isDefault: !!addr.isDefault,
  })

  const formatAddressText = (addr) => {
    return [
      addr.addressLine1,
      addr.addressLine2,
      addr.landmark,
      addr.city,
      addr.state,
      addr.zip,
      addr.country,
    ]
      .filter(Boolean)
      .join(", ")
  }

  const canCancelOrder = (order) => {
    const status = String(order.orderStatus || "").toLowerCase()
    return status === "pending" || status === "processing"
  }

  const formatOrderItems = (products = []) => {
    return products.map((item) => {
      const productName = item?.productId?.name || "Product"
      const qty = item?.quantity || 1
      return `${productName} (${qty})`
    })
  }

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError("")

      const token = localStorage.getItem("token")
      if (!token) {
        router.replace("/login")
        return
      }

      const response = await API.get("/users/profile")
      const data = response.data

      const mappedAddresses = (data.addresses || []).map((addr, index) =>
        mapAddressFromApi(addr, index)
      )

      const defaultAddress =
        mappedAddresses.find((addr) => addr.isDefault) || mappedAddresses[0]

      const mappedOrders = (data.orders || []).map((order) => ({
        ...order,
        id: order._id,
        date: order.createdAt
          ? new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "",
        items: formatOrderItems(order.products || []),
        totalFormatted: `₹${Number(order.totalPrice || 0).toFixed(2)}`,
      }))

      setAllAddresses(mappedAddresses)
      setOrders(mappedOrders)
      setUserData({
        id: data.id || data._id || "",
        name: data.name || "",
        email: data.email || "",
        mobile: data.mobile || "",
        defaultAddressId: defaultAddress?.id || "",
        isAdmin: data.isAdmin || false,
        memberSince: data.createdAt
          ? new Date(data.createdAt).toLocaleDateString("en-IN", {
              month: "short",
              year: "numeric",
            })
          : "",
      })

      setEditableDetails({
        name: data.name || "",
      })

      syncLocalUser(data)
    } catch (err) {
      console.error("Failed to fetch profile:", err)
      setError(err?.response?.data?.message || "Unable to load profile")
    } finally {
      setLoading(false)
    }
  }

  const syncProfileToBackend = async (nextName, nextAddresses) => {
    const payloadAddresses = nextAddresses.map(mapAddressToApi)

    await API.put("/users/profile", {
      name: nextName,
      mobile: userData.mobile,
      addresses: payloadAddresses,
    })
  }

  const handleUpdateUserDetails = async () => {
    try {
      setSaving(true)
      setError("")

      await syncProfileToBackend(editableDetails.name, allAddresses)

      setUserData((prev) => ({
        ...prev,
        name: editableDetails.name,
      }))

      const savedUser = JSON.parse(localStorage.getItem("user") || "{}")
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...savedUser,
          name: editableDetails.name,
        })
      )

      setIsEditingProfile(false)
    } catch (err) {
      console.error("Profile update failed:", err)
      setError(err?.response?.data?.message || "Unable to update profile")
    } finally {
      setSaving(false)
    }
  }

  const handleCancelEditProfile = () => {
    setEditableDetails({
      name: userData.name,
    })
    setIsEditingProfile(false)
  }

  const handleAddressChange = async (newDefaultId) => {
    try {
      setSaving(true)

      const updatedAddresses = allAddresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === newDefaultId,
      }))

      await syncProfileToBackend(userData.name, updatedAddresses)

      setAllAddresses(updatedAddresses)
      setUserData((prev) => ({
        ...prev,
        defaultAddressId: newDefaultId,
      }))
    } catch (err) {
      console.error("Default address update failed:", err)
      setError(err?.response?.data?.message || "Unable to update address")
    } finally {
      setSaving(false)
    }
  }

  const handleOpenAddressModal = (address = null) => {
    if (address) {
      setEditingAddress(address)
      setAddressFormData({
        label: address.label || "Home",
        country: address.country || "India",
        firstName: address.firstName || "",
        lastName: address.lastName || "",
        addressLine1: address.addressLine1 || "",
        addressLine2: address.addressLine2 || "",
        landmark: address.landmark || "",
        city: address.city || "",
        state: address.state || "",
        zip: address.zip || "",
      })
    } else {
      setEditingAddress(null)
      setAddressFormData({
        label: "Home",
        country: "India",
        firstName: "",
        lastName: "",
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

  const handleSaveAddress = async () => {
    if (
      !addressFormData.firstName ||
      !addressFormData.lastName ||
      !addressFormData.addressLine1 ||
      !addressFormData.city ||
      !addressFormData.state ||
      !addressFormData.zip
    ) {
      alert("Please fill in all required fields")
      return
    }

    try {
      setSaving(true)

      let updatedAddresses = []

      if (editingAddress) {
        updatedAddresses = allAddresses.map((addr) =>
          addr.id === editingAddress.id ? { ...addr, ...addressFormData } : addr
        )
      } else {
        const newAddress = {
          id: `addr-${Date.now()}`,
          ...addressFormData,
          isDefault: allAddresses.length === 0,
        }
        updatedAddresses = [...allAddresses, newAddress]
      }

      await syncProfileToBackend(userData.name, updatedAddresses)

      setAllAddresses(updatedAddresses)

      if (!userData.defaultAddressId && updatedAddresses[0]) {
        setUserData((prev) => ({
          ...prev,
          defaultAddressId: updatedAddresses[0].id,
        }))
      }

      handleCloseAddressModal()
    } catch (err) {
      console.error("Save address failed:", err)
      setError(err?.response?.data?.message || "Unable to save address")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAddress = async (addressId) => {
    try {
      setSaving(true)

      const filteredAddresses = allAddresses.filter((addr) => addr.id !== addressId)
      let updatedAddresses = filteredAddresses

      if (filteredAddresses.length > 0 && !filteredAddresses.some((addr) => addr.isDefault)) {
        updatedAddresses = filteredAddresses.map((addr, index) => ({
          ...addr,
          isDefault: index === 0,
        }))
      }

      await syncProfileToBackend(userData.name, updatedAddresses)

      setAllAddresses(updatedAddresses)
      setUserData((prev) => ({
        ...prev,
        defaultAddressId: updatedAddresses.find((addr) => addr.isDefault)?.id || "",
      }))
    } catch (err) {
      console.error("Delete address failed:", err)
      setError(err?.response?.data?.message || "Unable to delete address")
    } finally {
      setSaving(false)
    }
  }

  const handleCancelOrder = async (orderId) => {
    const confirmed = window.confirm("Are you sure you want to cancel this order?")
    if (!confirmed) return

    try {
      setCancellingOrderId(orderId)
      await API.put(`/orders/${orderId}/cancel`, {
        cancelReason: "Cancelled by user",
      })
      await fetchProfile()
    } catch (err) {
      console.error("Cancel order failed:", err)
      alert(err?.response?.data?.message || "Unable to cancel order")
    } finally {
      setCancellingOrderId("")
    }
  }

  const handleTrackShipment = async (orderId, trackingUrl) => {
    try {
      setTrackingOrderId(orderId)

      const response = await API.get(`/shipping/track/${orderId}`)
      const latestTrackingUrl =
        response?.data?.order?.trackingUrl ||
        response?.data?.tracking?.tracking_data?.track_url ||
        response?.data?.tracking?.tracking_data?.track_url_secure ||
        trackingUrl

      await fetchProfile()

      if (latestTrackingUrl) {
        window.open(latestTrackingUrl, "_blank", "noopener,noreferrer")
      } else {
        alert("Tracking is available but direct tracking URL is not ready yet.")
      }
    } catch (err) {
      console.error("Track shipment failed:", err)
      alert(err?.response?.data?.message || "Tracking is not available yet")
    } finally {
      setTrackingOrderId("")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("rememberMe")
    router.replace("/login")
  }

  const userDetails = useMemo(() => {
    const currentDefaultAddress = allAddresses.find((addr) => addr.id === userData.defaultAddressId)
    const defaultAddressText = currentDefaultAddress ? formatAddressText(currentDefaultAddress) : "N/A"

    return [
      { label: "Name", value: userData.name },
      { label: "Email", value: userData.email },
      { label: "Mobile", value: userData.mobile },
      { label: "Default Address", value: defaultAddressText },
    ]
  }, [userData, allAddresses])

  const defaultAddress = allAddresses.find((addr) => addr.id === userData.defaultAddressId)
  const otherAddresses = allAddresses.filter((addr) => addr.id !== userData.defaultAddressId)

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

  const getStatusIcon = (status) => {
    switch (String(status).toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "shipped":
        return <Truck className="h-5 w-5 text-blue-600" />
      case "processing":
        return <Clock className="h-5 w-5 text-orange-600" />
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "delivery failed":
        return <RotateCcw className="h-5 w-5 text-red-600" />
      default:
        return <Package className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (String(status).toLowerCase()) {
      case "delivered":
        return "text-green-700 bg-green-100 border-green-200"
      case "shipped":
        return "text-blue-700 bg-blue-100 border-blue-200"
      case "processing":
        return "text-orange-700 bg-orange-100 border-orange-200"
      case "cancelled":
        return "text-red-700 bg-red-100 border-red-200"
      case "delivery failed":
        return "text-red-700 bg-red-100 border-red-200"
      default:
        return "text-gray-700 bg-gray-100 border-gray-200"
    }
  }

  const getRefundBadge = (refundStatus) => {
    switch (String(refundStatus || "").toLowerCase()) {
      case "processed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "failed":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getShipmentBadge = (shipmentStatus) => {
    switch (String(shipmentStatus || "").toLowerCase()) {
      case "created":
        return "bg-blue-100 text-blue-700"
      case "awb_assigned":
        return "bg-indigo-100 text-indigo-700"
      case "pickup_scheduled":
        return "bg-cyan-100 text-cyan-700"
      case "in_transit":
        return "bg-orange-100 text-orange-700"
      case "delivered":
        return "bg-green-100 text-green-700"
      case "failed":
        return "bg-red-100 text-red-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        <div className="pt-40 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-white text-gray-800"
      style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif" }}
    >
      <Navbar />

      <div
        className="text-white py-12 md:py-16 mt-20 transition-all duration-500"
        style={{ background: "linear-gradient(135deg, #1a3a32 0%, #2d5a52 35%, #1e4d6b 70%, #0f2e3d 100%)" }}
      >
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome {userData.name}</h1>
            <p className="text-gray-200 text-lg">
              Know about yourself, your orders and manage your delivery addresses all in one place.
            </p>
            {userData.memberSince && (
              <p className="text-gray-300 text-sm mt-2">Member since {userData.memberSince}</p>
            )}
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-6xl py-8 md:py-12 px-4 space-y-8">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "profile" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "orders" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            My Orders
          </button>
          <button
            onClick={() => setActiveTab("addresses")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "addresses" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            Addresses
          </button>
        </div>

        {activeTab === "profile" && (
          <section className="w-full bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="px-6 md:px-8 py-5 border-b border-gray-100" style={{ background: "#f8f9fa" }}>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#e3f2fd" }}>
                    <User className="h-5 w-5" style={{ color: "#1976d2" }} />
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: "#000000" }}>
                    Profile Details
                  </h2>
                </div>

                {!isEditingProfile ? (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-sm hover:bg-blue-50"
                    style={{ color: "#1976d2" }}
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleUpdateUserDetails}
                      disabled={saving}
                      className="px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-md disabled:opacity-50"
                      style={{ color: "#388e3c", background: "#e8f5e9" }}
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

            <div className="p-6 md:p-8 space-y-4">
              {userDetails.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:shadow-sm"
                >
                  <div className="shrink-0">{getIcon(detail.label)}</div>
                  <div className="flex-1 min-w-0">
                    <label className="text-sm font-medium text-gray-600 block mb-1">{detail.label}</label>

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
                            {addr.addressLine1}
                            {addr.addressLine2 ? `, ${addr.addressLine2}` : ""}
                            {addr.city ? `, ${addr.city}` : ""}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="text-sm text-gray-900 font-medium">{detail.value || "N/A"}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 md:px-8 py-6 bg-white border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full px-6 py-3 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 hover:shadow-lg active:scale-95"
                style={{ color: "#ffffff", background: "#d32f2f" }}
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          </section>
        )}

        {activeTab === "orders" && (
          <section className="w-full bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="px-6 md:px-8 py-5 border-b border-gray-100" style={{ background: "#f8f9fa" }}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#e3f2fd" }}>
                  <Package className="h-5 w-5" style={{ color: "#1976d2" }} />
                </div>
                <h2 className="text-xl font-bold" style={{ color: "#000000" }}>
                  My Orders
                </h2>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No orders found yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => {
                    const shouldShowCourierBlock = Boolean(order.awbCode || order.trackingUrl)
                    const shouldShowTrackButton = Boolean(
                      order.trackingUrl ||
                        order.awbCode ||
                        order.shipmentStatus === "in_transit" ||
                        order.shipmentStatus === "awb_assigned" ||
                        order.shipmentStatus === "pickup_scheduled"
                    )

                    return (
                      <div
                        key={order.id}
                        className="rounded-xl border border-gray-200 bg-gray-50 p-5 hover:bg-white hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              {getStatusIcon(order.orderStatus)}
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.orderStatus)}`}
                              >
                                {order.orderStatus}
                              </span>

                              {order.isPaid && (
                                <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-green-100 text-green-700 border-green-200">
                                  Paid
                                </span>
                              )}

                              {order.refundStatus && order.refundStatus !== "not_requested" && (
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRefundBadge(order.refundStatus)}`}>
                                  Refund: {order.refundStatus}
                                </span>
                              )}

                              {order.shipmentStatus && order.shipmentStatus !== "not_created" && (
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getShipmentBadge(order.shipmentStatus)}`}>
                                  Shipment: {order.shipmentStatus}
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-gray-500 mb-1">
                              Order ID: <span className="font-semibold text-gray-800">{order.id}</span>
                            </p>
                            <p className="text-sm text-gray-500 mb-3">
                              Date: <span className="font-semibold text-gray-800">{order.date}</span>
                            </p>

                            <div className="space-y-1 mb-4">
                              {order.items.map((item, index) => (
                                <p key={index} className="text-sm text-gray-700">
                                  {item}
                                </p>
                              ))}
                            </div>

                            {shouldShowCourierBlock && (
                              <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm">
                                {order.courierCompany && (
                                  <p className="text-gray-700">
                                    Courier: <span className="font-semibold">{order.courierCompany}</span>
                                  </p>
                                )}
                                {order.awbCode && (
                                  <p className="text-gray-700 mt-1">
                                    AWB: <span className="font-semibold">{order.awbCode}</span>
                                  </p>
                                )}
                                {order.trackingUrl && (
                                  <p className="text-gray-700 mt-1 break-all">
                                    Tracking: <span className="font-semibold">{order.trackingUrl}</span>
                                  </p>
                                )}
                              </div>
                            )}

                            {(order.cancelReason || order.refundFailureReason || Number(order.refundAmount || 0) > 0) && (
                              <div className="space-y-1 text-sm">
                                {order.cancelReason && (
                                  <p className="text-gray-600">
                                    Cancel reason: <span className="font-medium">{order.cancelReason}</span>
                                  </p>
                                )}
                                {Number(order.refundAmount || 0) > 0 && (
                                  <p className="text-gray-600">
                                    Refund amount: <span className="font-medium">₹{Number(order.refundAmount).toFixed(2)}</span>
                                  </p>
                                )}
                                {order.refundFailureReason && (
                                  <p className="text-red-600">
                                    Refund issue: <span className="font-medium">{order.refundFailureReason}</span>
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="md:text-right md:min-w-[190px]">
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="text-xl font-bold text-gray-900">{order.totalFormatted}</p>

                            <div className="mt-4 flex flex-col gap-2">
                              {shouldShowTrackButton && (
                                <button
                                  type="button"
                                  onClick={() => handleTrackShipment(order.id, order.trackingUrl)}
                                  disabled={trackingOrderId === order.id}
                                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                  {trackingOrderId === order.id ? "Checking..." : "Track Shipment"}
                                </button>
                              )}

                              {canCancelOrder(order) && (
                                <button
                                  type="button"
                                  onClick={() => handleCancelOrder(order.id)}
                                  disabled={cancellingOrderId === order.id}
                                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                                >
                                  {cancellingOrderId === order.id ? "Cancelling..." : "Cancel Order"}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "addresses" && (
          <section className="w-full bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="px-6 md:px-8 py-5 border-b border-gray-100" style={{ background: "#f8f9fa" }}>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#e3f2fd" }}>
                    <Home className="h-5 w-5" style={{ color: "#1976d2" }} />
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: "#000000" }}>
                    Delivery Addresses
                  </h2>
                </div>

                <button
                  onClick={() => handleOpenAddressModal()}
                  className="px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all duration-300 text-white hover:shadow-md"
                  style={{ background: "#0288d1" }}
                >
                  <Plus className="h-4 w-4" />
                  Add New
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {allAddresses.length === 0 ? (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No addresses saved yet</p>
                  <button
                    onClick={() => handleOpenAddressModal()}
                    className="px-6 py-2 rounded-lg text-white font-medium transition-all"
                    style={{ background: "#0288d1" }}
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
                        <Home className="h-4 w-4 mr-2" style={{ color: "#388e3c" }} />
                        Default Address
                      </h3>

                      <div className="relative group p-5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white transition-all duration-300">
                        <div
                          className="absolute -top-2 -right-2 text-xs font-bold px-3 py-1 rounded-full text-white flex items-center"
                          style={{ background: "#388e3c" }}
                        >
                          <Star className="h-3 w-3 mr-1" />
                          Default
                        </div>

                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <MapPin className="h-4 w-4" style={{ color: "#1976d2" }} />
                                <span className="font-semibold text-gray-900">
                                  {defaultAddress.firstName} {defaultAddress.lastName}
                                </span>
                              </div>

                              <div className="text-sm text-gray-600 space-y-1 ml-6">
                                <p>{formatAddressText(defaultAddress)}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-2 ml-4">
                            <button
                              onClick={() => handleOpenAddressModal(defaultAddress)}
                              className="h-8 w-8 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ color: "#1976d2", background: "#e3f2fd" }}
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
                        <MapPin className="h-4 w-4 mr-2" style={{ color: "#1976d2" }} />
                        Other Addresses
                      </h3>

                      <div className="space-y-3">
                        {otherAddresses.map((address) => (
                          <div
                            key={address.id}
                            className="relative group p-5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white transition-all duration-300 hover:shadow-md hover:border-gray-300"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3 flex-1">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <MapPin className="h-4 w-4" style={{ color: "#1976d2" }} />
                                    <span className="font-semibold text-gray-900">
                                      {address.firstName} {address.lastName}
                                    </span>
                                  </div>

                                  <div className="text-sm text-gray-600 space-y-1 ml-6">
                                    <p>{formatAddressText(address)}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex space-x-2 ml-4">
                                <button
                                  onClick={() => handleAddressChange(address.id)}
                                  className="rounded-lg bg-green-100 px-3 py-2 text-xs font-semibold text-green-700"
                                >
                                  Make Default
                                </button>

                                <button
                                  onClick={() => handleOpenAddressModal(address)}
                                  className="h-8 w-8 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-sm"
                                  style={{ color: "#1976d2", background: "#e3f2fd" }}
                                >
                                  <Edit3 className="h-4 w-4" />
                                </button>

                                <button
                                  onClick={() => handleDeleteAddress(address.id)}
                                  className="h-8 w-8 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-sm"
                                  style={{ color: "#d32f2f", background: "#ffebee" }}
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
        )}
      </main>

      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl p-0 rounded-2xl shadow-lg border border-gray-200 overflow-hidden m-auto">
            <div className="px-6 md:px-8 py-5 border-b border-gray-100 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-black">
                  {editingAddress ? "Edit Address" : "Add New Address"}
                </h2>
                <button onClick={handleCloseAddressModal}>
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSaveAddress()
              }}
              className="p-6 md:p-8 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Label"
                  value={addressFormData.label}
                  onChange={(e) => setAddressFormData({ ...addressFormData, label: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none"
                />
                <input
                  placeholder="Country"
                  value={addressFormData.country}
                  onChange={(e) => setAddressFormData({ ...addressFormData, country: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none"
                />
                <input
                  placeholder="First Name"
                  value={addressFormData.firstName}
                  onChange={(e) => setAddressFormData({ ...addressFormData, firstName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none"
                />
                <input
                  placeholder="Last Name"
                  value={addressFormData.lastName}
                  onChange={(e) => setAddressFormData({ ...addressFormData, lastName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none"
                />
                <input
                  placeholder="Address Line 1"
                  value={addressFormData.addressLine1}
                  onChange={(e) => setAddressFormData({ ...addressFormData, addressLine1: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none md:col-span-2"
                />
                <input
                  placeholder="Address Line 2"
                  value={addressFormData.addressLine2}
                  onChange={(e) => setAddressFormData({ ...addressFormData, addressLine2: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none md:col-span-2"
                />
                <input
                  placeholder="Landmark"
                  value={addressFormData.landmark}
                  onChange={(e) => setAddressFormData({ ...addressFormData, landmark: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none md:col-span-2"
                />
                <input
                  placeholder="City"
                  value={addressFormData.city}
                  onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none"
                />
                <input
                  placeholder="State"
                  value={addressFormData.state}
                  onChange={(e) => setAddressFormData({ ...addressFormData, state: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none"
                />
                <input
                  placeholder="Pincode"
                  value={addressFormData.zip}
                  onChange={(e) => setAddressFormData({ ...addressFormData, zip: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none md:col-span-2"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseAddressModal}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingAddress ? "Save Changes" : "Add Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
export default function UserDashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white text-gray-800">
          <Navbar />
          <div className="pt-40 flex items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
          </div>
        </div>
      }
    >
      <UserDashboardContent />
    </Suspense>
  )
}

