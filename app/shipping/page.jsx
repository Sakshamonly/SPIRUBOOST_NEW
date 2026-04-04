'use client';

import { useState, useEffect } from 'react';
import Footer from "../components/usable/footer";
import Navbar from "../components/usable/navbar";

export default function ShippingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen scroll-smooth" style={{ scrollBehavior: 'smooth', background: 'linear-gradient(135deg, #faf9f7 0%, #f5f3f0 25%, #f0ebe7 50%, #eef0f5 75%, #f0f5fa 100%)' }}>
      <Navbar />

      {/* Hero Section with Wave Design */}
      <div
        className="relative w-full pt-40 pb-10 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a3a32 0%, #2d5a52 35%, #1e4d6b 70%, #0f2e3d 100%)',
        }}
      >
        

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif" }}>
            Shipping Information
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif" }}>
            Everything you need to know about our shipping and delivery
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Shipping Policy Content */}
          <div className="mb-16 pb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
              Shipping Policy
            </h2>
            
            <ul className="space-y-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
              <li className="flex gap-3">
                <span className="text-gray-400 shrink-0">•</span>
                <span>Once your order is processed, you'll receive a confirmation email. It may be delayed due to Technical Issues.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400 shrink-0">•</span>
                <span>During checkout, enter your address and choose the shipping option, then click "<span className="text-blue-600 font-semibold">Continue to shipping.</span>"</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400 shrink-0">•</span>
                <span>Please Mentioned Your Address Correctly.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400 shrink-0">•</span>
                <span>Local delivery is available within Surat City. If unavailable, your address does not qualify for local delivery.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400 shrink-0">•</span>
                <span>Free shipping is available on all orders above <span className="font-bold">500 Rupees.</span></span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400 shrink-0">•</span>
                <span>Delivery notifications will include real-time tracking information.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400 shrink-0">•</span>
                <span>Orders will be delivered within 5-7 business days after processing.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400 shrink-0">•</span>
                <span>You can track your order on the track menu.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400 shrink-0">•</span>
                <span><a href="/orders" className="text-blue-600 hover:text-blue-700 transition duration-300">Track Your Order</a></span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
