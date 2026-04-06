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
            Shipping Policy
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif" }}>
            At SpiruBoost, every order is processed with care to ensure freshness, safe packaging, and timely delivery across India.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Shipping Policy Content */}
          <div className="mb-16 pb-12">
            
            {/* Sections */}
            <div className="space-y-8">
              {/* Section 1 */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#2d3436' }}>
                  1) Order Processing
                </h3>
                <ul className="space-y-3 ml-4 md:ml-6" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>All confirmed orders are usually processed within 24–48 business hours.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Orders placed on Sundays, public holidays, or after business hours may be processed on the next working day.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>During product launches, sale periods, festive rush, or high-order volumes, dispatch timelines may be slightly extended.</span>
                  </li>
                </ul>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#2d3436' }}>
                  2) Delivery Timelines
                </h3>
                <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  Estimated delivery timelines are as follows:
                </p>
                <ul className="space-y-3 ml-4 md:ml-6 mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span><span className="font-semibold">Metro cities:</span> 2–5 business days</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span><span className="font-semibold">Tier 2 & Tier 3 cities:</span> 4–7 business days</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span><span className="font-semibold">Remote locations:</span> 5–10 business days</span>
                  </li>
                </ul>
                <p className="text-sm md:text-base" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#666666', lineHeight: '1.8', fontStyle: 'italic' }}>
                  These are estimated timelines and may vary based on courier serviceability, local restrictions, weather, and logistics partner delays.
                </p>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#2d3436' }}>
                  3) Shipping Charges
                </h3>
                <ul className="space-y-3 ml-4 md:ml-6 mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Applicable shipping charges, if any, will be displayed during checkout before payment.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span><span className="font-semibold">SpiruBoost may offer:</span></span>
                  </li>
                </ul>
                <ul className="space-y-2 ml-8 md:ml-12 mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">–</span>
                    <span>Free shipping on prepaid orders</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">–</span>
                    <span>Free shipping above selected cart values</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">–</span>
                    <span>Promotional free shipping campaigns</span>
                  </li>
                </ul>
                <p className="text-sm md:text-base" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#666666', lineHeight: '1.8', fontStyle: 'italic' }}>
                  These offers may change without prior notice.
                </p>
              </div>

              {/* Section 4 */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#2d3436' }}>
                  4) Order Tracking
                </h3>
                <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  Once dispatched, customers will receive tracking details through:
                </p>
                <ul className="space-y-3 ml-4 md:ml-6 mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Email</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>SMS</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>WhatsApp</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Order account dashboard</span>
                  </li>
                </ul>
                <p className="text-sm md:text-base" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#666666', lineHeight: '1.8', fontStyle: 'italic' }}>
                  Customers are responsible for tracking shipment progress and being available to receive the order.
                </p>
              </div>

              {/* Section 5 */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#2d3436' }}>
                  5) Address Accuracy
                </h3>
                <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  Customers must provide complete and accurate:
                </p>
                <ul className="space-y-3 ml-4 md:ml-6 mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Name</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Address</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>PIN code</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Phone number</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Landmark details</span>
                  </li>
                </ul>
                <p className="text-sm md:text-base" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#666666', lineHeight: '1.8', fontStyle: 'italic' }}>
                  SpiruBoost is not responsible for delays, losses, or failed deliveries caused by incorrect or incomplete shipping information.
                </p>
              </div>

              {/* Section 6 */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#2d3436' }}>
                  6) Failed Delivery Attempts
                </h3>
                <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  If delivery fails due to:
                </p>
                <ul className="space-y-3 ml-4 md:ml-6 mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Unreachable phone</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Wrong address</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Repeated missed attempts</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Refusal to accept order</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>COD refusal</span>
                  </li>
                </ul>
                <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  The shipment may be returned to origin. In such cases:
                </p>
                <ul className="space-y-3 ml-4 md:ml-6" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Reshipping charges may apply</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Prepaid refund may exclude shipping and handling charges</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>COD access may be restricted for future orders</span>
                  </li>
                </ul>
              </div>

              {/* Section 7 */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#2d3436' }}>
                  7) Delivery Confirmation
                </h3>
                <ul className="space-y-3 ml-4 md:ml-6" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Orders marked as delivered by the courier partner will be considered successfully fulfilled.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Any claim regarding non-receipt must be reported within 24 hours of delivery status update.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Claims raised after this window may not be accepted.</span>
                  </li>
                </ul>
              </div>

              {/* Section 8 */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#2d3436' }}>
                  8) Delays Beyond Control
                </h3>
                <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  SpiruBoost shall not be held liable for delays caused by:
                </p>
                <ul className="space-y-3 ml-4 md:ml-6" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Weather disruptions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Transport strikes</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Natural disasters</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Government restrictions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Internet outages</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Courier operational issues</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Force majeure events</span>
                  </li>
                </ul>
              </div>

              {/* Section 9 */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#2d3436' }}>
                  9) High-Risk / Fraud Orders
                </h3>
                <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  We reserve the right to:
                </p>
                <ul className="space-y-3 ml-4 md:ml-6" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Delay dispatch</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Request prepaid confirmation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Verify address and phone number</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Cancel suspicious orders</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span>Disable COD access</span>
                  </li>
                </ul>
                <p className="text-sm md:text-base mt-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#666666', lineHeight: '1.8', fontStyle: 'italic' }}>
                  For orders flagged as high-risk, abusive, or potentially fraudulent.
                </p>
              </div>

              {/* Section 10 */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#2d3436' }}>
                  10) Contact
                </h3>
                <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  For any shipping-related queries, contact:
                </p>
                <ul className="space-y-3 ml-4 md:ml-6" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span><a href="mailto:support@spiruboost.com" className="text-blue-600 hover:text-blue-700 transition duration-300">support@spiruboost.com</a></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 shrink-0 font-bold">•</span>
                    <span><a href="tel:+918006000127" className="text-blue-600 hover:text-blue-700 transition duration-300">+91-8006000127</a></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
