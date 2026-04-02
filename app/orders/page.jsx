'use client'

import { useState } from 'react'
import { X, Package, Calendar, MapPin, DollarSign, ShoppingBag, Truck, CheckCircle, Clock } from 'lucide-react'
import Navbar from '../components/usable/navbar'
import Footer from '../components/usable/footer'

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  // Mock orders data
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-5 w-5" style={{ color: '#388e3c' }} />
      case "Shipped":
        return <Truck className="h-5 w-5" style={{ color: '#1976d2' }} />
      case "Processing":
        return <Clock className="h-5 w-5" style={{ color: '#f57c00' }} />
      default:
        return <Package className="h-5 w-5" style={{ color: '#6b7280' }} />
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        * {
          font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
        }
      `}</style>

      <Navbar />

      {/* Gap between navbar and hero section */}
      <div style={{ height: '80px', background: '#f9fafb' }} />

      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1a3a32 0%, #2d5a52 35%, #1e4d6b 70%, #0f2e3d 100%)',
          padding: '60px 20px',
          textAlign: 'center',
          color: 'white'
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0 0 10px 0' }}>
          Your Orders
        </h1>
        <p style={{ fontSize: '1.1rem', margin: '0', opacity: 0.9 }}>
          Track and manage all your wellness purchases
        </p>
      </div>

      {/* Orders Section */}
      <div style={{ flex: 1, padding: '40px 20px', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <section style={{ width: '100%', background: 'white', border: '1px solid #e5e7eb', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'all 300ms ease' }}>
            {/* Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff3e0' }}>
                  <Package style={{ width: '20px', height: '20px', color: '#f57c00' }} />
                </div>
                <div>
                  <h2 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', fontWeight: 'bold', color: '#000000', fontFamily: "'Segoe UI', sans-serif" }}>Your Orders</h2>
                  <p style={{ margin: '0', fontSize: '0.875rem', color: '#6b7280' }}>{mockOrders.length} orders found</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '24px 32px' }}>
              {mockOrders.length === 0 ? (
                <div style={{ textAlign: 'center', paddingTop: '48px', paddingBottom: '48px' }}>
                  <Package style={{ width: '64px', height: '64px', color: '#d1d5db', margin: '0 auto 16px' }} />
                  <p style={{ color: '#6b7280', fontSize: '1.125rem', marginBottom: '8px' }}>No orders yet</p>
                  <p style={{ color: '#9ca3af' }}>Start shopping to see your orders here</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      style={{
                        background: 'white',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 300ms ease',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        transform: 'scale(1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)'
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)'
                        e.currentTarget.style.borderColor = '#d1d5db'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
                        e.currentTarget.style.borderColor = '#e5e7eb'
                      }}
                      onClick={() => handleOrderClick(order)}
                    >
                      {/* Order Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {getStatusIcon(order.status)}
                          <span style={{ fontWeight: 'bold', color: '#111827', fontSize: '1rem' }}>#{order.id}</span>
                        </div>
                        <div style={{
                          padding: '6px 12px',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          border: '1px solid',
                          background: order.status === 'Delivered' ? '#e8f5e9' : order.status === 'Shipped' ? '#e3f2fd' : '#fff3e0',
                          color: order.status === 'Delivered' ? '#388e3c' : order.status === 'Shipped' ? '#1976d2' : '#f57c00',
                          borderColor: order.status === 'Delivered' ? '#c8e6c9' : order.status === 'Shipped' ? '#bbdefb' : '#ffe0b2'
                        }}>
                          {order.status}
                        </div>
                      </div>

                      {/* Order Details */}
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '0.875rem', color: '#4b5563' }}>
                          <Calendar style={{ width: '16px', height: '16px' }} />
                          <span>{order.date}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', color: '#4b5563' }}>
                          <MapPin style={{ width: '16px', height: '16px', marginTop: '2px', flexShrink: 0 }} />
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                            {order.address.addressLine1}, {order.address.city}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div style={{ marginBottom: '16px' }}>
                        <p style={{ margin: '0 0 8px 0', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Items:</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {order.items.slice(0, 2).map((item, index) => (
                            <p key={index} style={{ margin: '0', fontSize: '0.875rem', color: '#4b5563', paddingLeft: '8px' }}>
                              • {item}
                            </p>
                          ))}
                          {order.items.length > 2 && (
                            <p style={{ margin: '0', fontSize: '0.875rem', color: '#6b7280', fontStyle: 'italic' }}>
                              +{order.items.length - 2} more items
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Total */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Total</span>
                        <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827' }}>{order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Order Details Modal */}
      {isOrderModalOpen && selectedOrder && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}
        onClick={handleCloseOrderModal}
        >
          <div style={{
            background: 'white',
            borderRadius: '1.5rem',
            boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '512px'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6', background: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff3e0' }}>
                  <Package style={{ width: '20px', height: '20px', color: '#f57c00' }} />
                </div>
                <div>
                  <h2 style={{ margin: '0', fontSize: '1.125rem', fontWeight: 'bold', color: '#000000' }}>Order #{selectedOrder.id}</h2>
                  <p style={{ margin: '0', fontSize: '0.875rem', color: '#6b7280' }}>Complete order information and status</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '24px 32px', maxHeight: '384px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Status Section */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Calendar style={{ width: '20px', height: '20px', color: '#6b7280' }} />
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Order Date</p>
                    <p style={{ margin: '0', color: '#111827', fontWeight: '600' }}>{selectedOrder.date}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {getStatusIcon(selectedOrder.status)}
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    background: selectedOrder.status === 'Delivered' ? '#e8f5e9' : selectedOrder.status === 'Shipped' ? '#e3f2fd' : '#fff3e0',
                    color: selectedOrder.status === 'Delivered' ? '#388e3c' : selectedOrder.status === 'Shipped' ? '#1976d2' : '#f57c00',
                    border: selectedOrder.status === 'Delivered' ? '1px solid #c8e6c9' : selectedOrder.status === 'Shipped' ? '1px solid #bbdefb' : '1px solid #ffe0b2'
                  }}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* Items Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingBag style={{ width: '20px', height: '20px', color: '#1976d2' }} />
                  <h3 style={{ margin: '0', fontWeight: '600', color: '#111827' }}>Order Items</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', background: '#e3f2fd' }}>
                        <Package style={{ width: '16px', height: '16px', color: '#1976d2' }} />
                      </div>
                      <span style={{ color: '#374151', fontWeight: '500', fontSize: '0.875rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ height: '1px', background: '#e0e0e0' }} />

              {/* Shipping Address Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin style={{ width: '20px', height: '20px', color: '#388e3c' }} />
                  <h3 style={{ margin: '0', fontWeight: '600', color: '#111827' }}>Delivery Address</h3>
                </div>
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white' }}>
                  <p style={{ margin: '0', color: '#1f2937', lineHeight: '1.5', fontSize: '0.875rem' }}>
                    {selectedOrder.address.addressLine1}
                    {selectedOrder.address.addressLine2 ? `, ${selectedOrder.address.addressLine2}` : ""}
                    {selectedOrder.address.landmark ? `, ${selectedOrder.address.landmark}` : ""}, {selectedOrder.address.city}, {selectedOrder.address.state} {selectedOrder.address.zip}
                  </p>
                </div>
              </div>

              <div style={{ height: '1px', background: '#e0e0e0' }} />

              {/* Total Section */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <DollarSign style={{ width: '20px', height: '20px', color: '#388e3c' }} />
                  <span style={{ fontWeight: '600', color: '#374151' }}>Order Total</span>
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#388e3c' }}>{selectedOrder.total}</span>
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #f3f4f6', background: 'white', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleCloseOrderModal}
                style={{
                  padding: '10px 24px',
                  color: 'white',
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: 'none',
                  transition: 'all 300ms ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  background: '#0288d1'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#01579b'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#0288d1'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                <X style={{ width: '16px', height: '16px' }} />
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
