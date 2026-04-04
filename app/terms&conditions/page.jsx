'use client';

import { useState, useEffect } from 'react';
import Footer from "../components/usable/footer";
import Navbar from "../components/usable/navbar";

export default function TermsAndConditionsPage() {
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
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Terms & Conditions
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Important terms governing your use of SpiruBoost
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

        

          {/* Terms & Conditions Items */}
          <div className="space-y-8">
            {/* 1. Right to Refuse or Cancel Orders */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                1) Right to Refuse or Cancel Orders
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <p>We reserve the right to refuse, limit, or cancel any order at our sole discretion, including suspected fraudulent transactions, bulk reselling attempts, pricing errors, or serviceability issues.</p>
              </div>
            </div>

            {/* 2. Product Suitability Clause */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                2) Product Suitability Clause
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <p>Customers are responsible for ensuring the product is suitable for their personal dietary, lifestyle, or medical needs.</p>
              </div>
            </div>

            {/* 3. Results Disclaimer */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                3) Results Disclaimer
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <p>Individual wellness outcomes may vary based on age, diet, lifestyle, consistency of usage, and biological response. We do not guarantee identical results for every user.</p>
              </div>
            </div>

            {/* 4. Address & Delivery Responsibility */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                4) Address & Delivery Responsibility
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <p className="mb-4">Customers must provide accurate delivery information.</p>
                <p className="mb-4">SpiruBoost shall not be responsible for failed delivery, delays, or losses caused by:</p>
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
                    <span>repeated delivery refusal</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>incorrect PIN code</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 5. COD Abuse Protection */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                5) COD Abuse Protection
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <p>Repeated refusal of COD orders may lead to restriction or permanent suspension of COD access for the customer account, address, or phone number.</p>
              </div>
            </div>

            {/* 6. Resale Restriction */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                6) Resale Restriction
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <p className="mb-4">Products purchased from our website are intended for personal use only unless expressly authorized.</p>
                <p>Unauthorized resale, marketplace listing, or repackaging under our brand name is prohibited.</p>
              </div>
            </div>

            {/* 7. Website Misuse */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                7) Website Misuse
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <p className="mb-4">Any attempt to:</p>
                <ul className="space-y-2 ml-4 mb-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>scrape product data</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>copy website content</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>abuse coupon systems</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>use bots</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>disrupt checkout</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>create fake reviews</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>misuse referral systems</span>
                  </li>
                </ul>
                <p>may result in legal action and permanent restriction.</p>
              </div>
            </div>

            {/* 8. Force Majeure */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                8) Force Majeure
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <p className="mb-4">We are not liable for delays caused by events beyond reasonable control, including:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>natural disasters</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>transport strikes</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>internet outages</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>government restrictions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>pandemics</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>courier failures</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 9. Arbitration / Legal Protection */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                9) Arbitration / Legal Protection
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <p className="mb-4">In case of disputes, parties shall first attempt amicable resolution.</p>
                <p className="mb-4">Failing that, disputes shall be subject to: arbitration in Gautam Buddha Nagar, Uttar Pradesh under Indian law </p>
                 
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}