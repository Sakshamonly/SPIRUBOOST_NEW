'use client';

import { useState, useEffect } from 'react';
import Footer from "../components/usable/footer";
import Navbar from "../components/usable/navbar";

export default function ReturnPage() {
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
            Return & Refund Policy
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif" }}>
            Returns, Refunds & Quality Assurance
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Last Updated */}
          <div className="mb-8" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#a0826d' }}>
            <p className="text-sm">Last Updated: 5-04-2026</p>
          </div>

          {/* Introduction Section */}
          <div className="mb-16 pb-12">
            <div className="space-y-4 leading-relaxed" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
              <p>
                At SpiruBoost, product safety, hygiene, and quality integrity are our highest priorities. As our products fall under the health supplement and nutraceutical category, all returns and refunds are governed by strict hygiene and verification standards.
              </p>
            </div>
          </div>

          {/* Return & Refund Policy Items */}
          <div className="space-y-8">
            {/* 1. Eligibility */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                1. Eligibility
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p className="mb-4">All purchases are non-returnable once delivered, except in the following situations:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>wrong product delivered</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>damaged package received</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>missing items</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>manufacturing defect</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>expired or near-expiry product</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>tampered seal on delivery</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>transit damage</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>verified quality issue</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2. Non-Returnable Cases */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                2. Non-Returnable Cases
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p className="mb-4">Returns, replacements, or refunds will not be accepted in the following cases:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>opened bottle, strip, or broken seal</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>partial consumption</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>taste, smell, or texture preference issues</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>customer changed mind</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>delayed usage dissatisfaction</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>results not matching personal expectations</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>doctor advised discontinuation after purchase</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>wrong order placed by customer</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>refusal after successful delivery</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>subscription renewal after dispatch</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 3. Proof Requirement */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                3. Proof Requirement
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p className="mb-4">To raise any claim related to damage, shortage, tampering, or wrong shipment, customers must provide:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>clear unboxing video from sealed package opening</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>images of outer courier package</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>shipping label</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>damaged product photos</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>invoice screenshot</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>issue description</span>
                  </li>
                </ul>
                <p className="mt-4 pt-4 border-t border-gray-300">Claims without proper proof may not be eligible for approval.</p>
              </div>
            </div>

            {/* 4. Resolution Process */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                4. Resolution Process
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p className="mb-4">For all valid claims, replacement will be the default resolution.</p>
                <p className="mb-4">Refunds will only be considered if:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>replacement stock is unavailable</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>duplicate wrong shipment occurred</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>order cannot be serviced again</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>issue is verified as irreversible</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 5. Refund Processing */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                5. Refund Processing
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p className="mb-4">Approved refunds are processed within 5–7 business days after verification.</p>
                <p className="mb-4">For COD orders, refunds may be processed through:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>UPI</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>bank transfer</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>store credit</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 6. Store Credit */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                6. Store Credit
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p>Where applicable, SpiruBoost may offer store credit instead of direct refund. Store credit may be used for future purchases on the website.</p>
              </div>
            </div>

            {/* 7. Delivery Failure */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                7. Delivery Failure
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p className="mb-4">No refund, replacement, or reshipment obligation applies where delivery fails due to:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>wrong address</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>unreachable phone number</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>repeated failed delivery attempts</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>customer refusal</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>COD refusal</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>incorrect PIN code</span>
                  </li>
                </ul>
                <p className="mt-4 pt-4 border-t border-gray-300">Repeated COD refusal may lead to prepaid-only access for future orders.</p>
              </div>
            </div>

            {/* 8. Subscription Orders */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                8. Subscription Orders
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p>Subscription renewals are non-refundable once billed, processed, or dispatched. Customers must pause or cancel before the renewal date.</p>
              </div>
            </div>

            {/* 9. Abuse Prevention */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                9. Abuse Prevention
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p className="mb-4">SpiruBoost reserves the right to reject any claim in cases involving:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>repeated abuse claims</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>suspicious refund patterns</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>unverifiable evidence</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>reseller misuse</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>product tampering</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>repeated "not received" fraud</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>false or misleading claims</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 10. Claim Window */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                10. Claim Window
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p>All issues must be reported within 48 hours of delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
