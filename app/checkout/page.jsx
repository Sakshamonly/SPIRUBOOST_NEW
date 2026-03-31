"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

// ============================================================================
// HEADER COMPONENT
// ============================================================================
const Header = () => {
  return (
    <header className="flex justify-center items-center py-6 border-b border-gray-200 mb-8 bg-white">
      <Link href="/" className="no-underline">
        <img src="/placeholder.svg?height=40&width=120" alt="Company Logo" className="h-10 w-auto" />
      </Link>
    </header>
  )
}

// ============================================================================
// CONTACT INFO COMPONENT
// ============================================================================
const ContactInfo = ({ contactType, setContactType, contactValue, setContactValue }) => {
  const handleContactTypeChange = (e) => {
    setContactType(e.target.value)
    setContactValue("")
  }

  const handleContactValueChange = (e) => {
    const value = e.target.value
    if (contactType === "mobile") {
      setContactValue(value.replace(/\D/g, "").slice(0, 10))
    } else {
      setContactValue(value)
    }
  }

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const isInputValid = () => {
    if (contactType === "mobile") {
      return contactValue.length === 10
    } else {
      return isValidEmail(contactValue)
    }
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Contact Information</h2>
      <div className="space-y-4 mb-6">
        <label
          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-300 ${
            contactType === "mobile" ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          <input
            type="radio"
            name="contactType"
            value="mobile"
            checked={contactType === "mobile"}
            onChange={handleContactTypeChange}
            className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2"
          />
          <span className="ml-3 text-gray-900 font-medium">Mobile</span>
        </label>
        <label
          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-300 ${
            contactType === "email" ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          <input
            type="radio"
            name="contactType"
            value="email"
            checked={contactType === "email"}
            onChange={handleContactTypeChange}
            className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2"
          />
          <span className="ml-3 text-gray-900 font-medium">Email</span>
        </label>
      </div>
      <div className="mb-6">
        <label htmlFor="contactInput" className="block mb-3 font-medium text-gray-900">
          {contactType === "mobile" ? "Mobile Number" : "Email Address"}
        </label>
        <input
          type={contactType === "mobile" ? "tel" : "email"}
          id="contactInput"
          className="w-full p-4 border-2 border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
          placeholder={contactType === "mobile" ? "e.g., 9876543210" : "e.g., example@email.com"}
          value={contactValue}
          onChange={handleContactValueChange}
          required
        />
        {!isInputValid() && contactValue.length > 0 && (
          <p className="text-red-500 text-sm mt-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {contactType === "mobile"
              ? "Please enter a 10-digit mobile number."
              : "Please enter a valid email address."}
          </p>
        )}
      </div>
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
        >
          Log in
        </button>
      </p>
    </div>
  )
}

// ============================================================================
// DELIVERY ADDRESS COMPONENT
// ============================================================================
const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "India",
  "Brazil",
  "Mexico",
  "South Africa",
  "Argentina",
  "Italy",
  "Spain",
  "Netherlands",
  "Sweden",
  "Switzerland",
  "New Zealand",
  "Singapore",
  "Pakistan",
  "Bangladesh",
  "Nigeria",
  "Egypt",
  "Indonesia",
  "Philippines",
  "Vietnam",
  "Thailand",
  "Malaysia",
  "South Korea",
  "Russia",
  "Turkey",
  "Saudi Arabia",
  "UAE",
  "Colombia",
  "Peru",
  "Chile",
  "Venezuela",
  "Ukraine",
  "Poland",
  "Belgium",
  "Austria",
  "Portugal",
  "Greece",
  "Ireland",
  "Norway",
  "Denmark",
  "Finland",
  "Czech Republic",
  "Hungary",
  "Romania",
  "Bulgaria",
  "Croatia",
  "Serbia",
  "Slovakia",
  "Slovenia",
  "Lithuania",
  "Latvia",
  "Estonia",
  "Iceland",
  "Luxembourg",
  "Malta",
  "Cyprus",
  "Albania",
  "Bosnia and Herzegovina",
  "North Macedonia",
  "Montenegro",
  "Kosovo",
  "Moldova",
  "Belarus",
  "Georgia",
  "Armenia",
  "Azerbaijan",
  "Kazakhstan",
  "Uzbekistan",
  "Kyrgyzstan",
  "Tajikistan",
  "Turkmenistan",
  "Afghanistan",
  "Iran",
  "Iraq",
  "Syria",
  "Lebanon",
  "Jordan",
  "Israel",
  "Palestine",
  "Yemen",
  "Oman",
  "Qatar",
  "Bahrain",
  "Kuwait",
  "Sri Lanka",
  "Nepal",
  "Bhutan",
  "Myanmar",
  "Laos",
  "Cambodia",
  "East Timor",
  "Papua New Guinea",
  "Fiji",
  "Solomon Islands",
  "Vanuatu",
  "Samoa",
  "Tonga",
  "Kiribati",
  "Tuvalu",
  "Nauru",
  "Marshall Islands",
  "Micronesia",
  "Palau",
  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Congo (Brazzaville)",
  "Congo (Kinshasa)",
  "Cote d'Ivoire",
  "Djibouti",
  "Equatorial Guinea",
  "Eritrea",
  "Eswatini",
  "Ethiopia",
  "Gabon",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Rwanda",
  "Sao Tome and Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Sudan",
  "Sudan",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Zambia",
  "Zimbabwe",
]

const DeliveryAddress = ({ address, setAddress, showSaveOption = true }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Delivery Address</h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="country" className="block mb-3 font-medium text-gray-900">
            Country
          </label>
          <input
            list="countries"
            id="country"
            name="country"
            className="w-full p-4 border-2 border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
            value={address.country}
            onChange={handleChange}
            placeholder="Type to search or select a country"
            required
          />
          <datalist id="countries">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block mb-3 font-medium text-gray-900">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full p-4 border-2 border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
              value={address.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-3 font-medium text-gray-900">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full p-4 border-2 border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
              value={address.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="address1" className="block mb-3 font-medium text-gray-900">
            Address Line 1
          </label>
          <input
            type="text"
            id="address1"
            name="address1"
            className="w-full p-4 border-2 border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
            value={address.address1}
            onChange={handleChange}
            placeholder="House No., Building Name"
            required
          />
        </div>

        <div>
          <label htmlFor="address2" className="block mb-3 font-medium text-gray-900">
            Address Line 2
          </label>
          <input
            type="text"
            id="address2"
            name="address2"
            className="w-full p-4 border-2 border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
            value={address.address2}
            onChange={handleChange}
            placeholder="Street Name, Area"
          />
        </div>

        <div>
          <label htmlFor="landmark" className="block mb-3 font-medium text-gray-600">
            Landmark (Optional)
          </label>
          <input
            type="text"
            id="landmark"
            name="landmark"
            className="w-full p-4 border-2 border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
            value={address.landmark}
            onChange={handleChange}
            placeholder="e.g., Near City Hospital"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="city" className="block mb-3 font-medium text-gray-900">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full p-4 border-2 border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
              value={address.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block mb-3 font-medium text-gray-900">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="w-full p-4 border-2 border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
              value={address.state}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="pincode" className="block mb-3 font-medium text-gray-900">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              className="w-full p-4 border-2 border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
              value={address.pincode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {showSaveOption && (
          <div className="flex items-center pt-4">
            <input
              type="checkbox"
              id="saveInfo"
              name="saveInfo"
              checked={address.saveInfo}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="saveInfo" className="ml-3 text-gray-600">
              Save this information for next time
            </label>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// SHIPPING METHOD COMPONENT
// ============================================================================
const ShippingMethod = ({ isAddressFilled }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Shipping Method</h2>
      {isAddressFilled ? (
        <div className="p-6 border-2 border-green-200 bg-green-50 rounded-lg flex justify-between items-center">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold text-gray-900">Standard Shipping</span>
          </div>
          <span className="text-green-600 font-bold text-lg">FREE</span>
        </div>
      ) : (
        <div className="p-6 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-gray-500 font-medium">Enter address to get shipping charges</p>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// PAYMENT METHOD COMPONENT
// ============================================================================
const PaymentMethod = ({ selectedPayment, setSelectedPayment }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Payment Method</h2>
      <p className="text-gray-600 mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        All transactions are secure and encrypted
      </p>
      <div className="space-y-4">
        <label
          className={`flex items-start p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-300 ${
            selectedPayment === "razorpay" ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="razorpay"
            checked={selectedPayment === "razorpay"}
            onChange={() => setSelectedPayment("razorpay")}
            className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 mt-1"
          />
          <div className="ml-4">
            <span className="font-semibold text-gray-900 block mb-2">Razorpay</span>
            <p className="text-gray-600 text-sm">UPI, Cards, Wallets, Netbanking</p>
          </div>
        </label>
        <label
          className={`flex items-start p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-300 ${
            selectedPayment === "cod" ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={selectedPayment === "cod"}
            onChange={() => setSelectedPayment("cod")}
            className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 mt-1"
          />
          <div className="ml-4 w-full">
            <div className="flex items-center mb-2">
              <span className="font-semibold text-gray-900">Cash on Delivery (COD)</span>
              {selectedPayment === "cod" && <span className="text-red-500 ml-1 text-lg font-bold">*</span>}
            </div>
            <p className="text-gray-600 text-sm mb-2">Pay when you receive your order</p>
            {selectedPayment === "cod" && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-sm font-medium flex items-center">
                  <span className="text-red-500 mr-1">*</span>
                  ₹25 handling charges (non-refundable)
                </p>
              </div>
            )}
          </div>
        </label>
      </div>
    </div>
  )
}

// ============================================================================
// BILLING ADDRESS COMPONENT
// ============================================================================
const BillingAddress = ({ billingOption, setBillingOption, billingAddress, setBillingAddress }) => {
  const handleBillingOptionChange = (e) => {
    setBillingOption(e.target.value)
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Billing Address</h2>
      <div className="space-y-4 mb-6">
        <label
          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-300 ${
            billingOption === "same" ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          <input
            type="radio"
            name="billingOption"
            value="same"
            checked={billingOption === "same"}
            onChange={handleBillingOptionChange}
            className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2"
          />
          <span className="ml-3 text-gray-900 font-medium">Use same as shipping address</span>
        </label>
        <label
          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-300 ${
            billingOption === "different" ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          <input
            type="radio"
            name="billingOption"
            value="different"
            checked={billingOption === "different"}
            onChange={handleBillingOptionChange}
            className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2"
          />
          <span className="ml-3 text-gray-900 font-medium">Use a different address</span>
        </label>
      </div>
      {billingOption === "different" && (
        <div className="pt-6 border-t border-gray-200">
          <DeliveryAddress address={billingAddress} setAddress={setBillingAddress} showSaveOption={false} />
        </div>
      )}
    </div>
  )
}

// ============================================================================
// ORDER SUMMARY COMPONENT
// ============================================================================
const OrderSummary = ({ products, setProducts, selectedPayment }) => {
  const [isSticky, setIsSticky] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const orderSummary = document.getElementById("order-summary")
      const footer = document.querySelector("footer") || document.body

      if (orderSummary) {
        const rect = orderSummary.getBoundingClientRect()
        const footerRect = footer.getBoundingClientRect()
        const windowHeight = window.innerHeight

        if (rect.bottom >= windowHeight - 20 || footerRect.top <= windowHeight) {
          setIsSticky(false)
        } else {
          setIsSticky(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const updateQuantity = (id, delta) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: Math.max(1, product.quantity + delta) } : product,
      ),
    )
  }

  const calculateSubtotal = () => {
    return products.reduce((sum, product) => sum + product.price * product.quantity, 0)
  }

  const subtotal = calculateSubtotal()
  const gst = subtotal * 0.18
  const shipping = 0
  const codCharges = selectedPayment === "cod" ? 25 : 0
  const total = subtotal + gst + shipping + codCharges

  return (
    <div
      id="order-summary"
      className={`bg-white p-8 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 ${
        isSticky ? "sticky top-8" : "relative"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Order Summary</h2>

      <div className="space-y-6 mb-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg border border-gray-200"
            />
            <div className="flex-grow w-full">
              <h3 className="font-semibold text-gray-900 mb-1 break-words">{product.name}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(product.id, -1)}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200 flex items-center justify-center font-bold"
                  >
                    −
                  </button>
                  <span className="font-semibold text-gray-900 min-w-[2rem] text-center">{product.quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, 1)}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="font-bold text-gray-900 sm:ml-4 sm:mt-0 mt-2 block sm:inline">
                  ₹{(product.price * product.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <label htmlFor="discountCode" className="block mb-3 font-medium text-gray-900">
          Discount Code
        </label>
        <div className="flex flex-row gap-2">
          <input
            type="text"
            id="discountCode"
            className="flex-grow p-2 text-sm border-2 border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
            placeholder="Enter discount code"
          />
          <button
            type="button"
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors duration-200"
            style={{ minWidth: "64px" }}
          >
            Apply
          </button>
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t-2 border-gray-200">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>GST (18%):</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping:</span>
          <span className="text-green-600 font-semibold">FREE</span>
        </div>
        {selectedPayment === "cod" && (
          <div className="flex justify-between text-gray-600">
            <span>COD Handling Charges:</span>
            <span className="text-amber-600 font-medium">₹{codCharges.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between items-center pt-4 border-t-2 border-gray-300">
          <span className="text-xl font-bold text-gray-900">Total:</span>
          <span className="text-2xl font-bold text-gray-900">₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// PLACE ORDER BUTTON COMPONENT
// ============================================================================
const PlaceOrderButton = ({ selectedPayment }) => {
  const buttonText = selectedPayment === "razorpay" ? "Pay Now" : "Complete Order"

  return (
    <div className="mt-8">
      <button
        type="submit"
        className="w-full py-4 px-8 bg-blue-600 hover:bg-black text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl"
      >
        {buttonText}
      </button>
      <p className="text-center text-gray-500 text-sm mt-4">
        By placing your order, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  )
}

// ============================================================================
// MOBILE ORDER SUMMARY COLLAPSED VIEW
// ============================================================================
const MobileOrderSummaryCollapsible = ({ products, setProducts, selectedPayment, isExpanded, setIsExpanded }) => {
  const updateQuantity = (id, delta) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: Math.max(1, product.quantity + delta) } : product,
      ),
    )
  }

  const calculateSubtotal = () => {
    return products.reduce((sum, product) => sum + product.price * product.quantity, 0)
  }

  const subtotal = calculateSubtotal()
  const gst = subtotal * 0.18
  const shipping = 0
  const codCharges = selectedPayment === "cod" ? 25 : 0
  const total = subtotal + gst + shipping + codCharges

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl shadow-sm">
      <div
        className="flex items-center justify-between p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-semibold text-gray-900 text-lg">Order Summary</span>
        <div className="flex items-center space-x-3">
          <span className="font-bold text-xl text-gray-900">₹{total.toFixed(2)}</span>
          <svg
            className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${isExpanded ? "rotate-90" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-200">
          <div className="pt-6">
            <div className="space-y-6 mb-8">
              {products.map((product) => (
                <div key={product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200 flex items-center justify-center font-bold"
                        >
                          −
                        </button>
                        <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200 flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-gray-900">
                        ₹{(product.price * product.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <label htmlFor="discountCodeMobile" className="block mb-3 font-medium text-gray-900">
                Discount Code
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  id="discountCodeMobile"
                  className="flex-grow p-3 border-2 border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  placeholder="Enter discount code"
                />
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors duration-200"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t-2 border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST (18%):</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              {selectedPayment === "cod" && (
                <div className="flex justify-between text-gray-600">
                  <span>COD Handling Charges:</span>
                  <span className="text-amber-600 font-medium">₹{codCharges.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-4 border-t-2 border-gray-300">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-gray-900">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// MAIN CHECKOUT PAGE COMPONENT
// ============================================================================
export default function CheckoutPage() {
  const [contactType, setContactType] = useState("email")
  const [contactValue, setContactValue] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState({
    country: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    saveInfo: false,
  })
  const [selectedPayment, setSelectedPayment] = useState("razorpay")
  const [billingOption, setBillingOption] = useState("same")
  const [billingAddress, setBillingAddress] = useState({
    country: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  })
  const [isOrderSummaryExpanded, setIsOrderSummaryExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Spirulina Tablets",
      price: 799.0,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Spirulina Capsules",
      price: 999.0,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
  ])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const isAddressFilledForShipping =
    deliveryAddress.country.trim() !== "" &&
    deliveryAddress.firstName.trim() !== "" &&
    deliveryAddress.lastName.trim() !== "" &&
    deliveryAddress.address1.trim() !== "" &&
    deliveryAddress.city.trim() !== "" &&
    deliveryAddress.state.trim() !== "" &&
    deliveryAddress.pincode.trim() !== ""

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Order submitted! (Check console for form data)")
    console.log({
      contactType,
      contactValue,
      deliveryAddress,
      selectedPayment,
      billingOption,
      billingAddress: billingOption === "same" ? deliveryAddress : billingAddress,
      products,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {isMobile && (
          <MobileOrderSummaryCollapsible
            products={products}
            setProducts={setProducts}
            selectedPayment={selectedPayment}
            isExpanded={isOrderSummaryExpanded}
            setIsExpanded={setIsOrderSummaryExpanded}
          />
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <ContactInfo
              contactType={contactType}
              setContactType={setContactType}
              contactValue={contactValue}
              setContactValue={setContactValue}
            />
            <DeliveryAddress address={deliveryAddress} setAddress={setDeliveryAddress} />
            <ShippingMethod isAddressFilled={isAddressFilledForShipping} />
            <PaymentMethod selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} />
            <BillingAddress
              billingOption={billingOption}
              setBillingOption={setBillingOption}
              billingAddress={billingAddress}
              setBillingAddress={setBillingAddress}
            />
            {!isMobile && <PlaceOrderButton selectedPayment={selectedPayment} />}
          </div>

          <div className="hidden lg:block">
            <OrderSummary products={products} setProducts={setProducts} selectedPayment={selectedPayment} />
          </div>
        </form>

        {isMobile && (
          <div className="mt-8">
            <PlaceOrderButton selectedPayment={selectedPayment} />
          </div>
        )}
      </div>
    </div>
  )
}
