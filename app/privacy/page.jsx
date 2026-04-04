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
          {/* Last Updated */}
          <div className="mb-8" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#a0826d' }}>
            <p className="text-sm">Last Updated: April 5, 2026</p>
          </div>

         
          {/* Privacy Policy Items */}
          <div className="space-y-8">
            {/* 1. Changes to This Privacy Policy */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                1. Changes to This Privacy Policy
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p>
                  We may update this Privacy Policy periodically to reflect changes in our practices, operations, or legal requirements. Updates will be posted on this page with a revised "Last updated" date. Please review this policy regularly to stay informed of any changes.
                </p>
              </div>
            </div>

            {/* 2. How We Collect and Use Your Personal Information */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                2. How We Collect and Use Your Personal Information
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p className="mb-4"><strong>Information We Collect Directly from You:</strong></p>
                <p className="mb-4">When you use our Services, we may collect the following information:</p>
                <ul className="space-y-2 ml-4 mb-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>Contact Details:</strong> Name, address, phone number, and email address.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>Order Information:</strong> Billing address, shipping address, payment details, and order history.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>Account Information:</strong> Username, password, and security details for account access.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>Customer Support Information:</strong> Details you provide when contacting us for assistance.</span>
                  </li>
                </ul>

                <p className="mb-4"><strong>Usage Data:</strong></p>
                <p className="mb-4">We collect information about your interactions with our Site using cookies, pixels, and similar tracking technologies, such as:</p>
                <ul className="space-y-2 ml-4 mb-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Device and browser information.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>IP address and geolocation.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Pages visited, links clicked, and time spent on the Site.</span>
                  </li>
                </ul>

                <p className="mb-4"><strong>Information from Third Parties:</strong></p>
                <p className="mb-4">We may receive data from third-party vendors, including:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Payment processors (e.g., billing details).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Shipping providers (e.g., updated delivery status).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Marketing partners for analytics and advertisement purposes.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 3. How We Use Your Personal Information */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                3. How We Use Your Personal Information
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p className="mb-4">We use your information for the following purposes:</p>
                <ul className="space-y-3 ml-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>Providing Products and Services:</strong> Process payments and fulfill orders, facilitate returns, exchanges, and account management, notify you of order updates.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>Marketing and Advertising:</strong> Send promotional emails, offers, and recommendations tailored to your interests, display personalized ads based on your preferences.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>Improving Services:</strong> Analyze Site performance and user behavior to enhance functionality, resolve technical issues and improve user experience.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>Security and Fraud Prevention:</strong> Detect and prevent fraudulent or malicious activities.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>Compliance with Legal Obligations:</strong> Fulfill legal and regulatory requirements.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 4. Cookies and Tracking Technologies */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                4. Cookies and Tracking Technologies
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p className="mb-4">We use cookies and similar technologies to:</p>
                <ul className="space-y-2 ml-4 mb-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Improve functionality and performance of the Site.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Remember your preferences for a personalized experience.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Conduct analytics to better understand user interactions.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Display interest-based advertisements.</span>
                  </li>
                </ul>
                <p className="mb-4"><strong>Managing Cookies:</strong> You can manage cookies through your browser settings. Blocking cookies may impact the functionality of certain Site features.</p>
                <p>For details about cookies used on Shopify-powered stores, visit Shopify's Cookie Policy</p>
              </div>
            </div>

            {/* 5. How We Share Your Personal Information */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                5. How We Share Your Personal Information
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p className="mb-4">We share your personal information in the following scenarios:</p>
                <ul className="space-y-3 ml-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>Vendors and Service Providers:</strong> Payment processors for secure transactions, shipping partners to deliver your orders, IT service providers for hosting and Site maintenance.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>Business and Marketing Partners:</strong> Share anonymized data for analytics and targeted advertising.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>Legal Compliance:</strong> Disclose information to regulatory authorities when required by law or to protect rights and security.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>With Your Consent:</strong> When you authorize us to share your data with specific third parties.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 6. Your Rights */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                6. Your Rights
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p className="mb-4">Depending on your jurisdiction, you may have the following rights:</p>
                <ul className="space-y-3 ml-4 mb-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>Access and Portability:</strong> Request details about the personal information we collect and receive a copy.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>Correction and Deletion:</strong> Request corrections to inaccurate data or deletion of your personal information.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>Restrict Processing:</strong> Limit how we process your personal information.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>Withdrawal of Consent:</strong> Withdraw previously provided consent for data processing.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span><strong>Managing Communication Preferences:</strong> Opt out of promotional communications by using the "unsubscribe" link in our emails.</span>
                  </li>
                </ul>
                <p>To exercise these rights, contact us at <strong>aarogyanutracecuticals@gmail.com</strong>. Verification of identity may be required before processing your request.</p>
              </div>
            </div>

            {/* 7. Children's Privacy */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                7. Children's Privacy
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p>Our Services are intended for use by individuals aged 18 and above. Minors are not permitted to register or make purchases without parental supervision. If you believe we have collected information from a child, contact us immediately to request deletion.</p>
              </div>
            </div>

            {/* 8. Security and Retention of Information */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                8. Security and Retention of Information
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p className="mb-4">We implement strict measures to protect your personal information, including:</p>
                <ul className="space-y-2 ml-4 mb-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Encryption for secure data transmission.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Access controls to limit data exposure to authorized personnel only.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Regular reviews of our security practices.</span>
                  </li>
                </ul>
                <p>We retain personal information only as long as necessary for the purposes outlined in this policy or as required by law.</p>
              </div>
            </div>

            {/* 9. International Users */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                9. International Users
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p>If you access our Site from outside India, your data may be transferred and processed in India or other countries. We ensure compliance with recognized international data protection standards, such as GDPR, for such transfers.</p>
              </div>
            </div>

            {/* 10. How We Handle Amazon Data */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#2d3436' }}>
                10. How We Handle Amazon Data
              </h3>
              <div style={{ fontFamily: "'Segoe UI', '-apple-system', 'BlinkMacSystemFont', sans-serif", color: '#555555' }}>
                <p className="mb-4">At Spiru Swastha India Pvt. Ltd., we understand the responsibility that comes with managing sensitive information—especially data shared with us through Amazon. We follow strict data handling, protection, and privacy standards to ensure everything is safe, secure, and fully compliant.</p>

                <p className="mb-4"><strong>What We Collect:</strong></p>
                <p className="mb-4">We collect only the minimum information required to process Amazon orders and support our customers. This may include:</p>
                <ul className="space-y-2 ml-4 mb-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Order details</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Customer names</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Delivery addresses</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Contact numbers or email IDs</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Refund/return-related data</span>
                  </li>
                </ul>
                <p className="mb-4">All information collected is as per Amazon's policies and used only for permitted purposes.</p>

                <p className="mb-4"><strong>Why We Use It:</strong></p>
                <p className="mb-4">We use Amazon-provided data strictly for business purposes such as:</p>
                <ul className="space-y-2 ml-4 mb-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Fulfilling and dispatching your Amazon orders</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Processing returns, replacements, and refunds</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Offering customer support related to Amazon orders</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Fulfilling any legal or regulatory requirements</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Running internal analysis to improve our operations</span>
                  </li>
                </ul>
                <p className="mb-4">We never use this data for marketing, advertising, or any activity not permitted by Amazon.</p>

                <p className="mb-4"><strong>Where and How We Store It:</strong></p>
                <p className="mb-4">All Amazon data is stored securely in cloud systems with encryption (AES-256) at rest and in transit. We use private network access, firewalls, and endpoint protections. Access is strictly limited to authorised staff through secure login and multi-factor authentication (MFA).</p>
                <p className="mb-4">Data is retained only for as long as required to complete its intended purpose or in accordance with Amazon's data retention guidelines.</p>

                <p className="mb-4"><strong>When and With Whom We Share It:</strong></p>
                <p className="mb-4">We never sell or misuse your data. Sharing happens only under the following limited situations:</p>
                <ul className="space-y-2 ml-4 mb-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>If legally required by courts or government authorities</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>With trusted logistics or service providers under signed confidentiality agreements</span>
                  </li>
                </ul>
                <p className="mb-4">All third parties are vetted and must follow data protection rules.</p>

                <p className="mb-4"><strong>How We Secure It:</strong></p>
                <p className="mb-4">We take data protection seriously and have implemented multiple security layers:</p>
                <ul className="space-y-2 ml-4 mb-4">
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>Bitdefender GravityZone on all endpoints to prevent unauthorised access or data leaks</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>CrowdStrike Falcon on our servers to detect and respond to any suspicious or malicious activity in real-time</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>USB ports are disabled on sensitive systems, and only authorised websites are accessible</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>All access is role-based and tracked, and regular training is given to staff handling data</span>
                  </li>
                </ul>

                <p className="mb-4"><strong>How We Delete or Dispose of It:</strong></p>
                <p>Once data is no longer needed or after the retention period ends, we delete it securely or anonymise it. Secure deletion follows proper methods to ensure it cannot be recovered.</p>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}