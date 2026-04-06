"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import API from "../../lib/api"

const logoSrc = "/Spiruboost_Logo.png"

const emptyAddress = {
  id: "",
  label: "Home",
  country: "India",
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  saveInfo: false,
}

const countries = [
  "India",
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Singapore",
  "UAE",
]

const splitName = (fullName = "") => {
  const trimmed = String(fullName).trim()
  if (!trimmed) {
    return { firstName: "", lastName: "" }
  }

  const parts = trimmed.split(/\s+/)
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" ") || "",
  }
}

const mapProfileAddressToUi = (address = {}, fallbackUser = null, index = 0) => {
  const nameParts = splitName(fallbackUser?.name || "")
  return {
    id: address._id || `addr-${index}`,
    label: address.label || "Home",
    country: address.country || "India",
    firstName: address.firstName || nameParts.firstName || "",
    lastName: address.lastName || nameParts.lastName || "",
    address1: address.address1 || "",
    address2: address.address2 || "",
    landmark: address.landmark || "",
    city: address.city || "",
    state: address.state || "",
    pincode: address.pincode || "",
    saveInfo: false,
    isDefault: !!address.isDefault,
  }
}

const mapUiAddressToPayload = (address = {}) => ({
  label: address.label || "Home",
  firstName: address.firstName || "",
  lastName: address.lastName || "",
  address1: address.address1 || "",
  address2: address.address2 || "",
  landmark: address.landmark || "",
  city: address.city || "",
  state: address.state || "",
  pincode: address.pincode || "",
  country: address.country || "India",
  isDefault: !!address.isDefault,
})

const formatAddressLine = (address) => {
  return [
    address.address1,
    address.address2,
    address.landmark,
    address.city,
    address.state,
    address.pincode,
  ]
    .filter(Boolean)
    .join(", ")
}

const formatEstimatedDeliveryDate = (value) => {
  const date = new Date(value || Date.now())
  date.setDate(date.getDate() + 5)
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

const Header = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <svg className="h-5 w-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <img src={logoSrc} alt="Spiruboost" className="h-8 w-auto object-contain" />
        </Link>

        <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
          <span>100% Secure Payment</span>
          <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
      </div>
    </header>
  )
}

const SummaryAccordion = ({
  products,
  isOpen,
  setIsOpen,
  subtotal,
  discount,
  handlingFee,
  total,
}) => {
  const totalItems = products.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
      >
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-1 rounded-2xl bg-gray-100 p-2.5 text-gray-700">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5.4 5M7 13l-1.2 6h12.4M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-gray-900">Order Summary</p>
            {discount > 0 && (
              <p className="mt-1 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                ₹{discount.toFixed(2)} saved so far
              </p>
            )}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-sm text-gray-500">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </p>
          <div className="mt-1 flex items-center justify-end gap-2">
            <span className="text-lg font-bold text-gray-900">₹{total.toFixed(2)}</span>
            <svg
              className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-2 sm:px-5">
          <div className="space-y-3 rounded-2xl bg-gray-50 p-3 sm:p-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-start gap-3 rounded-2xl bg-white p-3">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-16 w-16 rounded-xl border border-gray-200 object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 font-semibold text-gray-900">{product.name}</p>
                  <p className="mt-1 text-sm text-gray-500">Qty: {product.quantity}</p>
                  <p className="text-sm text-emerald-700">Estimated delivery in 5 days</p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="font-bold text-gray-900">₹{(product.price * product.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-3 px-1">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Total discount</span>
              <span className="font-semibold text-emerald-700">-₹{discount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Handling fee</span>
              <span>₹{handlingFee.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-base font-bold text-gray-900">
              <span>To Pay</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

const AddressCard = ({ selectedAddress, contactValue, contactType, onChange }) => {
  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-5">
        <div className="flex min-w-0 gap-3">
          <div className="mt-1 rounded-2xl bg-gray-100 p-2.5 text-gray-700">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-gray-900">
              Deliver To {selectedAddress.firstName} {selectedAddress.lastName}
            </p>
            <p className="mt-1 text-sm leading-6 text-gray-700">{formatAddressLine(selectedAddress)}</p>
            <p className="mt-2 text-sm text-gray-500">
              {contactType === "mobile" ? contactValue : "Not added"}{" "}
              <span className="mx-1 text-gray-300">|</span>
              {contactType === "email" ? contactValue : "Email from account"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onChange}
          className="shrink-0 rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:border-gray-800 hover:bg-gray-50"
        >
          Change
        </button>
      </div>

      <div className="flex items-center gap-2 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 sm:px-5">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 17H6a2 2 0 01-2-2V7a2 2 0 012-2h6m4 0h2a2 2 0 012 2v8a2 2 0 01-2 2h-3m-4 0l-3 3m0 0l-3-3m3 3V10"
          />
        </svg>
        Estimated Delivery In 5 Days
      </div>
    </section>
  )
}

const OffersSection = ({
  couponCode,
  setCouponCode,
  appliedCoupon,
  discount,
  onApplyCoupon,
  isApplyingCoupon,
  availableCoupons,
  isLoadingCoupons,
}) => {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="mb-4 text-sm font-bold tracking-wide text-gray-500">OFFERS & REWARDS</h3>

      <div className="rounded-2xl border border-gray-200 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-gray-100 p-2.5 text-gray-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 14l6-6m-5.5.5h.01m5 5h.01M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-900">
              {appliedCoupon ? `Saved ₹${discount.toFixed(2)} with "${appliedCoupon}"` : "Apply discount code"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {appliedCoupon ? "Coupon applied successfully" : "Enter a valid coupon code to save more"}
            </p>

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon"
                className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-800"
              />
              <button
                type="button"
                onClick={() => onApplyCoupon()}
                disabled={isApplyingCoupon || !couponCode.trim()}
                className="rounded-xl border border-gray-900 px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isApplyingCoupon ? "Applying..." : appliedCoupon ? "Applied" : "Apply"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-3 text-xs font-bold tracking-wide text-gray-500">AVAILABLE COUPONS</p>

        {isLoadingCoupons ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-4 text-sm text-gray-500">
            Loading coupons...
          </div>
        ) : availableCoupons.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-4 text-sm text-gray-500">
            No valid coupons available.
          </div>
        ) : (
          <div className="grid gap-2">
            {availableCoupons.map((coupon) => (
              <button
                key={coupon._id || coupon.id || coupon.code}
                type="button"
                onClick={() => onApplyCoupon(coupon.code)}
                className="rounded-2xl border border-gray-200 bg-white p-3 text-left transition hover:border-gray-900 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">{coupon.code}</p>
                    <p className="text-xs text-gray-500">
                      {coupon.category} • {coupon.type === "percent" ? `${coupon.value}%` : `₹${coupon.value}`} off
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Select
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

const PaymentSection = ({ total, isSubmitting }) => {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="mb-4 text-sm font-bold tracking-wide text-gray-500">PAYMENT OPTIONS</h3>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-white p-2.5 text-blue-700 shadow-sm">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 9V7a5 5 0 00-10 0v2m-1 0h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2z"
              />
            </svg>
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-900">Razorpay Secure Prepaid</p>
            <p className="mt-1 text-sm text-gray-500">UPI, cards, wallets and netbanking</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 w-full rounded-2xl bg-gray-900 px-5 py-4 text-base font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
        </button>
      </div>
    </section>
  )
}

const AddressModal = ({
  isOpen,
  onClose,
  addresses,
  selectedAddressId,
  onSelectAddress,
  onOpenNewAddress,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="w-full max-w-xl rounded-[28px] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-lg font-bold text-gray-900">Select delivery address</h3>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="max-h-[65vh] space-y-3 overflow-y-auto px-5 py-5">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <button
                key={address.id}
                type="button"
                onClick={() => onSelectAddress(address.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selectedAddressId === address.id
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {address.label} • {address.firstName} {address.lastName}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{formatAddressLine(address)}</p>
                  </div>
                  {selectedAddressId === address.id && (
                    <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">Selected</span>
                  )}
                </div>
              </button>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
              No saved addresses found
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 px-5 py-4">
          <button
            type="button"
            onClick={onOpenNewAddress}
            className="w-full rounded-2xl border border-gray-900 px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
          >
            Add New Address
          </button>
        </div>
      </div>
    </div>
  )
}

const NewAddressModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSave,
  isSaving,
}) => {
  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="w-full max-w-2xl rounded-[28px] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-lg font-bold text-gray-900">Add new address</h3>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-2">
          <input
            name="label"
            value={formData.label}
            onChange={handleChange}
            placeholder="Label (Home / Office)"
            className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-800"
          />
          <input
            name="country"
            list="address-country-list"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-800"
          />
          <datalist id="address-country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>

          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-800"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-800"
          />
          <input
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            placeholder="House / Flat / Building"
            className="sm:col-span-2 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-800"
          />
          <input
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            placeholder="Street / Area"
            className="sm:col-span-2 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-800"
          />
          <input
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            placeholder="Landmark"
            className="sm:col-span-2 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-800"
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-800"
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-800"
          />
          <input
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="sm:col-span-2 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-800"
          />
        </div>

        <div className="flex gap-3 border-t border-gray-100 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="flex-1 rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Address"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  const router = useRouter()

  const [contactType, setContactType] = useState("email")
  const [contactValue, setContactValue] = useState("")
  const [products, setProducts] = useState([])
  const [savedAddresses, setSavedAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState(emptyAddress)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false)
  const [newAddressForm, setNewAddressForm] = useState(emptyAddress)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState("")
  const [discountAmount, setDiscountAmount] = useState(0)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSavingAddress, setIsSavingAddress] = useState(false)
  const [availableCoupons, setAvailableCoupons] = useState([])
  const [isLoadingCoupons, setIsLoadingCoupons] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successOrder, setSuccessOrder] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      sessionStorage.setItem("redirectAfterLogin", "/checkout")
      router.replace("/login")
      return
    }

    const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem") || "null")
    const checkoutItem = JSON.parse(localStorage.getItem("checkoutItem") || "null")
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")

    if (buyNowItem) {
      setProducts([
        {
          id: buyNowItem.id || buyNowItem._id,
          productId: buyNowItem._id || buyNowItem.id,
          name: buyNowItem.name,
          price: Number(buyNowItem.price) || 0,
          quantity: buyNowItem.quantity || 1,
          image: buyNowItem.image || "/placeholder.svg",
        },
      ])
      return
    }

    if (cartItems.length > 0) {
      setProducts(
        cartItems.map((item) => ({
          id: item.id || item._id,
          productId: item._id || item.id,
          name: item.name,
          price: Number(item.price) || 0,
          quantity: item.quantity || 1,
          image: item.image || "/placeholder.svg",
        }))
      )
      return
    }

    if (checkoutItem) {
      setProducts([
        {
          id: checkoutItem.id || checkoutItem._id,
          productId: checkoutItem._id || checkoutItem.id,
          name: checkoutItem.name,
          price: Number(checkoutItem.price) || 0,
          quantity: checkoutItem.quantity || 1,
          image: checkoutItem.image || "/placeholder.svg",
        },
      ])
    }
  }, [router])

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem("user") || "null")
        const token = localStorage.getItem("token")

        if (savedUser?.mobile) {
          setContactType("mobile")
          setContactValue(String(savedUser.mobile).replace(/\D/g, "").slice(0, 10))
        } else if (savedUser?.email) {
          setContactType("email")
          setContactValue(savedUser.email)
        }

        if (!token) return

        const response = await API.get("/users/profile")
        const profile = response.data

        if (profile?.mobile) {
          setContactType("mobile")
          setContactValue(String(profile.mobile).replace(/\D/g, "").slice(0, 10))
        } else if (profile?.email) {
          setContactType("email")
          setContactValue(profile.email)
        }

        const mappedAddresses = (profile.addresses || []).map((address, index) =>
          mapProfileAddressToUi(address, profile, index)
        )

        setSavedAddresses(mappedAddresses)

        const defaultAddress =
          mappedAddresses.find((address) => address.isDefault) || mappedAddresses[0]

        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id)
          setDeliveryAddress(defaultAddress)
        } else if (profile?.name) {
          const nameParts = splitName(profile.name)
          setDeliveryAddress((prev) => ({
            ...prev,
            firstName: nameParts.firstName,
            lastName: nameParts.lastName,
          }))
          setNewAddressForm((prev) => ({
            ...prev,
            firstName: nameParts.firstName,
            lastName: nameParts.lastName,
          }))
        }
      } catch (error) {
        console.error("Failed to fetch checkout profile:", error)
      }
    }

    loadProfile()
  }, [])

  const selectedAddress = useMemo(() => {
    return savedAddresses.find((address) => address.id === selectedAddressId) || deliveryAddress
  }, [savedAddresses, selectedAddressId, deliveryAddress])

  const subtotal = useMemo(() => {
    return products.reduce((sum, product) => sum + product.price * product.quantity, 0)
  }, [products])

  const handlingFee = 0
  const total = Math.max(subtotal - discountAmount + handlingFee, 0)

  useEffect(() => {
    const loadAvailableCoupons = async () => {
      if (!subtotal) return

      try {
        setIsLoadingCoupons(true)
        const response = await API.get("/coupons/available", {
          params: { subtotal },
        })

        setAvailableCoupons(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        console.error("Failed to load coupons:", error)
        setAvailableCoupons([])
      } finally {
        setIsLoadingCoupons(false)
      }
    }

    loadAvailableCoupons()
  }, [subtotal])

  const updateAddressesOnServer = async (nextAddresses) => {
    const payloadAddresses = nextAddresses.map(mapUiAddressToPayload)
    await API.put("/users/profile", {
      addresses: payloadAddresses,
    })
  }

  const handleApplyCoupon = async (codeOverride = "") => {
    const codeToCheck = String(codeOverride || couponCode).trim()
    if (!codeToCheck) return

    try {
      setIsApplyingCoupon(true)
      const response = await API.post("/coupons/validate", {
        code: codeToCheck,
        subtotal,
      })

      const discount = Number(response.data?.discount || 0)
      const code = response.data?.code || codeToCheck.toUpperCase()

      setAppliedCoupon(code)
      setDiscountAmount(discount)
      setCouponCode(code)
    } catch (error) {
      console.error("Coupon apply failed:", error)
      setAppliedCoupon("")
      setDiscountAmount(0)
      alert(error?.response?.data?.message || "Invalid coupon code")
    } finally {
      setIsApplyingCoupon(false)
    }
  }

  const handleSelectAddress = (addressId) => {
    const address = savedAddresses.find((item) => item.id === addressId)
    if (!address) return

    setSelectedAddressId(addressId)
    setDeliveryAddress(address)
    setIsAddressModalOpen(false)
  }

  const handleSaveNewAddress = async () => {
    if (
      !newAddressForm.firstName.trim() ||
      !newAddressForm.lastName.trim() ||
      !newAddressForm.address1.trim() ||
      !newAddressForm.city.trim() ||
      !newAddressForm.state.trim() ||
      !newAddressForm.pincode.trim()
    ) {
      alert("Please fill all required address fields.")
      return
    }

    try {
      setIsSavingAddress(true)

      const nextAddress = {
        ...newAddressForm,
        id: `addr-${Date.now()}`,
        isDefault: savedAddresses.length === 0,
      }

      const nextAddresses = savedAddresses.map((address) => ({
        ...address,
        isDefault: false,
      }))

      const finalAddresses = [...nextAddresses, { ...nextAddress, isDefault: true }]

      await updateAddressesOnServer(finalAddresses)

      setSavedAddresses(finalAddresses)
      setSelectedAddressId(nextAddress.id)
      setDeliveryAddress({ ...nextAddress, isDefault: true })
      setIsNewAddressModalOpen(false)
      setIsAddressModalOpen(false)
      setNewAddressForm(emptyAddress)
    } catch (error) {
      console.error("Saving address failed:", error)
      alert(error?.response?.data?.message || "Unable to save new address")
    } finally {
      setIsSavingAddress(false)
    }
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true)
        return
      }

      const script = document.createElement("script")
      script.id = "razorpay-script"
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const buildOrderPayload = () => ({
    products: products.map((product) => ({
      productId: product.productId || product.id,
      quantity: product.quantity,
      price: product.price,
    })),
    shippingAddress: {
      contactType,
      contactValue,
      country: selectedAddress.country,
      firstName: selectedAddress.firstName,
      lastName: selectedAddress.lastName,
      address1: selectedAddress.address1,
      address2: selectedAddress.address2,
      landmark: selectedAddress.landmark,
      city: selectedAddress.city,
      state: selectedAddress.state,
      pincode: selectedAddress.pincode,
    },
    billingAddress: {
      country: selectedAddress.country,
      firstName: selectedAddress.firstName,
      lastName: selectedAddress.lastName,
      address1: selectedAddress.address1,
      address2: selectedAddress.address2,
      landmark: selectedAddress.landmark,
      city: selectedAddress.city,
      state: selectedAddress.state,
      pincode: selectedAddress.pincode,
    },
    paymentMethod: "razorpay",
    subtotal,
    discount: discountAmount,
    couponCode: appliedCoupon || null,
    shippingCharges: 0,
    codCharges: 0,
    totalPrice: total,
  })

  const clearCheckoutStorage = () => {
    localStorage.removeItem("buyNowItem")
    localStorage.removeItem("checkoutItem")
    localStorage.removeItem("cartItems")
  }

  const validateCheckout = () => {
    if (products.length === 0) {
      alert("No products found in checkout.")
      return false
    }

    if (!contactValue.trim()) {
      alert("Please add contact details.")
      return false
    }

    if (
      !selectedAddress.firstName ||
      !selectedAddress.lastName ||
      !selectedAddress.address1 ||
      !selectedAddress.city ||
      !selectedAddress.state ||
      !selectedAddress.pincode
    ) {
      alert("Please select or add a delivery address.")
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateCheckout()) return

    try {
      setIsSubmitting(true)

      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        alert("Razorpay failed to load. Please try again.")
        return
      }

      const orderPayload = buildOrderPayload()

      const razorpayResponse = await API.post("/payment/create-order", {
        amount: Math.round(orderPayload.totalPrice * 100),
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      })

      const razorpayOrder = razorpayResponse.data?.order || razorpayResponse.data
      const user = JSON.parse(localStorage.getItem("user") || "null")

      const options = {
        key: razorpayResponse.data?.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency || "INR",
        name: "Spiruboost",
        description: "Secure prepaid checkout",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            await API.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })

            const orderResponse = await API.post("/orders", {
              ...orderPayload,
              paymentMethod: "razorpay",
              paymentResult: {
                id: response.razorpay_payment_id,
                status: "paid",
                update_time: new Date().toISOString(),
                email_address: user?.email || "",
              },
            })

            const placedOrder = orderResponse.data?.order || orderResponse.data
            clearCheckoutStorage()
            setSuccessOrder(placedOrder)
            setShowSuccessModal(true)
          } catch (error) {
            console.error("Payment verification/order save failed:", error)
            alert(error?.response?.data?.message || "Payment succeeded but order confirmation failed.")
          }
        },
        prefill: {
          name: `${selectedAddress.firstName} ${selectedAddress.lastName}`.trim(),
          email: contactType === "email" ? contactValue : user?.email || "",
          contact: contactType === "mobile" ? contactValue : user?.mobile || "",
        },
        theme: {
          color: "#111827",
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Checkout error:", error)
      alert(error?.response?.data?.message || "Something went wrong during checkout.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-5 sm:px-6 sm:py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="px-1">
            <h2 className="text-sm font-bold tracking-wide text-gray-500">DELIVERY DETAILS</h2>
          </div>

          <SummaryAccordion
            products={products}
            isOpen={isSummaryOpen}
            setIsOpen={setIsSummaryOpen}
            subtotal={subtotal}
            discount={discountAmount}
            handlingFee={handlingFee}
            total={total}
          />

          <AddressCard
            selectedAddress={selectedAddress}
            contactValue={contactValue}
            contactType={contactType}
            onChange={() => setIsAddressModalOpen(true)}
          />

          <OffersSection
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            appliedCoupon={appliedCoupon}
            discount={discountAmount}
            onApplyCoupon={handleApplyCoupon}
            isApplyingCoupon={isApplyingCoupon}
            availableCoupons={availableCoupons}
            isLoadingCoupons={isLoadingCoupons}
          />

          <PaymentSection total={total} isSubmitting={isSubmitting} />
        </form>
      </main>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        addresses={savedAddresses}
        selectedAddressId={selectedAddressId}
        onSelectAddress={handleSelectAddress}
        onOpenNewAddress={() => {
          setIsNewAddressModalOpen(true)
        }}
      />

      <NewAddressModal
        isOpen={isNewAddressModalOpen}
        onClose={() => setIsNewAddressModalOpen(false)}
        formData={newAddressForm}
        setFormData={setNewAddressForm}
        onSave={handleSaveNewAddress}
        isSaving={isSavingAddress}
      />

      {showSuccessModal && successOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-5 flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-50" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-white shadow-lg">
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900">Order Placed Successfully</h2>
              <p className="mt-2 text-sm text-gray-600">
                Your payment was successful and your order is now confirmed.
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
              <p><strong>Order ID:</strong> {successOrder.orderNumber || successOrder._id}</p>
              <p>
                <strong>Name:</strong>{" "}
                {`${successOrder?.shippingAddress?.firstName || ""} ${successOrder?.shippingAddress?.lastName || ""}`.trim()}
              </p>
              <p><strong>Address:</strong> {formatAddressLine(successOrder?.shippingAddress || {})}</p>
              <p>
                <strong>Mobile:</strong>{" "}
                {successOrder?.shippingAddress?.contactType === "mobile"
                  ? successOrder?.shippingAddress?.contactValue
                  : successOrder?.user?.mobile || "N/A"}
              </p>
              <p><strong>Estimated Delivery:</strong> {formatEstimatedDeliveryDate(successOrder?.createdAt)}</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false)
                  router.push("/user?tab=orders")
                }}
                className="flex-1 rounded-2xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
              >
                View My Orders
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false)
                  router.push("/")
                }}
                className="flex-1 rounded-2xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
