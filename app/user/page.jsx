'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, MapPin, ShoppingBag, Package, LogOut, Menu, X } from 'lucide-react';
import Navbar from '../components/usable/navbar';
import Footer from '../components/usable/footer';

export default function UserPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // User profile data
  const userProfile = {
    name: 'Saksham Pandey',
    phone: '8433054072',
    email: 'sakshampandey234@gmail.com',
    memberStatus: 'Platinum Elite',
    points: 12450,
    membershipDate: 'Valid since Jan 2024'
  };

  // Orders data
  const orders = [
    {
      id: 'ORD001',
      product: 'Spiruboost Capsules',
      status: 'Delivered',
      date: 'Oct 14, 2023',
      price: '₹499.00'
    },
    {
      id: 'ORD002',
      product: 'Aura Noise Cancelling Suite',
      status: 'In Transit',
      date: 'Dec 28, 2023',
      price: '₹599.00'
    }
  ];

  // Saved addresses
  const addresses = [
    {
      label: 'Primary',
      type: 'Home',
      address: '123 Main Street, Apt 456, City, State 12345',
      isDefault: true
    },
    {
      label: 'Secondary',
      type: 'Office',
      address: 'The Heights Loft, 42 Park Ave, Williamsburg, NY 10211',
      isDefault: false
    }
  ];

  const TabButton = ({ tabName, label }) => (
    <button
      onClick={() => {
        setActiveTab(tabName);
        setIsMobileMenuOpen(false);
      }}
      className={`px-6 py-3 font-semibold transition-all duration-300 whitespace-nowrap ${
        activeTab === tabName
          ? 'text-white bg-gradient-to-r from-emerald-600 to-cyan-600 border-b-2 border-white'
          : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* Profile Avatar */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/20 flex items-center justify-center border-4 border-white shadow-lg">
                <User className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{userProfile.name}</h1>
              <p className="text-emerald-100 mb-4">{userProfile.email}</p>
              <div className="inline-block bg-white/20 px-4 py-2 rounded-full">
                <p className="text-sm font-semibold">{userProfile.memberStatus}</p>
              </div>
            </div>

            {/* Membership Status Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center w-full sm:w-auto">
              <p className="text-white/80 text-sm mb-2">Loyalty Points</p>
              <p className="text-4xl font-bold mb-2">{userProfile.points.toLocaleString()}</p>
              <p className="text-white/60 text-xs">{userProfile.membershipDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation - Mobile Hamburger */}
          <div className="md:hidden px-4 py-4 border-b border-gray-200">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2 text-gray-700 font-semibold"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              Menu
            </button>

            {isMobileMenuOpen && (
              <div className="mt-4 flex flex-col gap-2">
                <TabButton tabName="profile" label="Profile" />
                <TabButton tabName="orders" label="Orders" />
                <TabButton tabName="addresses" label="Saved Addresses" />
              </div>
            )}
          </div>

          {/* Tab Navigation - Desktop */}
          <div className="hidden md:flex border-b border-gray-200 bg-white">
            <TabButton tabName="profile" label="Profile Settings" />
            <TabButton tabName="orders" label="Order History" />
            <TabButton tabName="addresses" label="Saved Addresses" />
          </div>

          {/* Tab Content */}
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Profile Information</h2>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                  {/* Profile Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <div className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                        {userProfile.name}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <div className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                        {userProfile.email}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Mobile Number
                      </label>
                      <div className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                        +91 {userProfile.phone}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Membership Status</label>
                      <div className="px-4 py-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-900 font-semibold">
                        {userProfile.memberStatus}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-300">
                      Edit Profile
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg transition-all duration-300">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Order History</h2>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{order.product}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div>Order ID: <span className="font-semibold text-gray-900">{order.id}</span></div>
                            <div>Date: <span className="font-semibold text-gray-900">{order.date}</span></div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </div>
                          <div className="text-lg font-bold text-gray-900">{order.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-300">
                    + Add Address
                  </button>
                </div>

                <div className="space-y-4">
                  {addresses.map((addr, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-gray-900">{addr.label} - {addr.type}</h3>
                            <p className="text-gray-600 text-sm mt-1">{addr.address}</p>
                          </div>
                        </div>
                        {addr.isDefault && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
                          Edit
                        </button>
                        {!addr.isDefault && (
                          <>
                            <span className="text-gray-300">•</span>
                            <button className="text-red-600 hover:text-red-700 font-semibold text-sm">
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
