'use client';

import { useState, useEffect } from 'react';
import Footer from "../components/usable/footer";
import Navbar from "../components/usable/navbar";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif" }}>
            How we collect, use, and protect your personal information
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title and Last Updated */}
          <div className="mb-8">
            <p className="text-sm md:text-base" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#666666' }}>
              Last Updated: April 2026
            </p>
          </div>

          {/* Intro Text */}
          <p className="mb-8 text-base md:text-lg" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
            At SpiruBoost, your privacy and trust are important to us. This Privacy Policy explains how we collect, use, store, protect, and share your personal information when you visit our website, place an order, subscribe, or interact with our services.
          </p>

          <p className="mb-8 text-base md:text-lg" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
            By using our website, you consent to the practices described in this policy.
          </p>

         
          {/* Privacy Policy Items */}
          <div className="space-y-8">
            {/* 1. Information We Collect */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                1) Information We Collect
              </h3>
              <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                We may collect the following information:
              </p>
              <ul className="space-y-3 ml-4 md:ml-6" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Full name</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Phone number</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Email address</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Billing and shipping address</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>PIN code</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>WhatsApp number</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Products viewed and purchased</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Payment and transaction details</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>IP address</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Browser and device details</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Cookies and website usage behavior</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Abandoned cart activity</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Support conversations and feedback</span>
                </li>
              </ul>
            </div>

            {/* 2. Purpose of Collection */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                2) Purpose of Collection
              </h3>
              <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                Your data may be used for:
              </p>
              <ul className="space-y-3 ml-4 md:ml-6" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Order confirmation and fulfillment</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Payment verification</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Delivery coordination</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Customer support</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Return and refund handling</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Subscription renewals</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Abandoned cart recovery</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Product recommendations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Marketing and promotional communication</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Website performance analytics</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Fraud prevention</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>COD misuse detection</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Legal and compliance requirements</span>
                </li>
              </ul>
            </div>

            {/* 3. Marketing Consent */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                3) Marketing Consent
              </h3>
              <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                By submitting your contact details, you agree to receive:
              </p>
              <ul className="space-y-3 ml-4 md:ml-6 mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Order updates</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Delivery notifications</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Product education</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Offers and discounts</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Abandoned cart reminders</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Subscription reminders</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>WhatsApp and email campaigns</span>
                </li>
              </ul>
              <p className="text-sm md:text-base" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#666666', lineHeight: '1.8', fontStyle: 'italic' }}>
                You may opt out anytime through unsubscribe links or by contacting our support team.
              </p>
            </div>

            {/* 4. Cookies & Tracking */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                4) Cookies & Tracking
              </h3>
              <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                We use cookies, pixels, analytics tools, and session tracking technologies to:
              </p>
              <ul className="space-y-3 ml-4 md:ml-6 mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Improve user experience</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Understand customer behavior</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Run remarketing campaigns</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Optimize conversions</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Recover abandoned carts</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Improve website speed and usability</span>
                </li>
              </ul>
              <p className="text-sm md:text-base" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#666666', lineHeight: '1.8', fontStyle: 'italic' }}>
                Users may disable cookies from browser settings, though some website features may not function properly.
              </p>
            </div>

            {/* 5. Payment Security */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                5) Payment Security
              </h3>
              <ul className="space-y-3 ml-4 md:ml-6" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Payments are securely processed through trusted third-party gateways such as Razorpay, UPI partners, Shopify Payments, and COD systems.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>We do not store complete debit card, credit card, CVV, UPI PIN, or bank password information on our servers.</span>
                </li>
              </ul>
            </div>

            {/* 6. Data Sharing */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                6) Data Sharing
              </h3>
              <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                We may share limited required information with:
              </p>
              <ul className="space-y-3 ml-4 md:ml-6 mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Courier and logistics partners</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Payment processors</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Analytics tools</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Marketing platforms</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Customer support systems</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Fraud prevention services</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Legal authorities when required by law</span>
                </li>
              </ul>
              <p className="text-sm md:text-base" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#666666', lineHeight: '1.8', fontStyle: 'italic' }}>
                We never sell personal customer data to third parties.
              </p>
            </div>

            {/* 7. Data Retention */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                7) Data Retention
              </h3>
              <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                We retain customer information only for as long as necessary for:
              </p>
              <ul className="space-y-3 ml-4 md:ml-6 mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Order records</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Taxation and accounting</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Legal compliance</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Fraud prevention</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Dispute resolution</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Subscription continuity</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Internal analytics</span>
                </li>
              </ul>
              <p className="text-sm md:text-base" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#666666', lineHeight: '1.8', fontStyle: 'italic' }}>
                After reasonable retention periods, data may be securely deleted, anonymized, or archived.
              </p>
            </div>

            {/* 8. Customer Rights */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                8) Customer Rights
              </h3>
              <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                Customers may request:
              </p>
              <ul className="space-y-3 ml-4 md:ml-6 mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Access to their data</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Correction of inaccurate information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Deletion of personal data</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Withdrawal of marketing consent</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Grievance resolution</span>
                </li>
              </ul>
              <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                All such requests may be sent to:
              </p>
              <p style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <a href="mailto:support@spiruboost.com" className="text-blue-600 hover:text-blue-700 transition duration-300">support@spiruboost.com</a>
              </p>
            </div>

            {/* 9. Security Measures */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                9) Security Measures
              </h3>
              <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                We use commercially reasonable safeguards including:
              </p>
              <ul className="space-y-3 ml-4 md:ml-6" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>SSL encryption</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Secure Shopify infrastructure</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Restricted admin access</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Secure payment gateways</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>OTP / authentication controls</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Secure cloud backups</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Role-based internal access permissions</span>
                </li>
              </ul>
            </div>

            {/* 10. Fraud & Abuse Protection */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                10) Fraud & Abuse Protection
              </h3>
              <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                SpiruBoost reserves the right to retain and use transaction, IP, address, and device data for:
              </p>
              <ul className="space-y-3 ml-4 md:ml-6" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>COD fraud prevention</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Fake order detection</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Chargeback defense</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Repeated refund abuse</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Reseller misuse</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Coupon abuse</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>Suspicious activity investigation</span>
                </li>
              </ul>
            </div>

            {/* 11. Policy Updates */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                11) Policy Updates
              </h3>
              <p style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                This Privacy Policy may be updated periodically to reflect legal, technical, or operational changes. The latest version published on the website will apply.
              </p>
            </div>

            {/* 12. Contact */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                12) Contact
              </h3>
              <p className="mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                For privacy-related concerns, contact:
              </p>
              <ul className="space-y-3 ml-4 md:ml-6" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555', lineHeight: '1.8' }}>
                <li className="flex gap-3">
                  <span className="text-blue-500 shrink-0 font-bold">•</span>
                  <span>SpiruBoost Support Team</span>
                </li>
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

      <Footer />
    </div>
  );
}
