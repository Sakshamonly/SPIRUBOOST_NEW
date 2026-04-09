'use client';

import { useState, useEffect } from 'react';
import Footer from "../components/usable/footer";
import Navbar from "../components/usable/navbar";
import API from "../../lib/api";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: '',
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await API.post("/contact", formData)
      setSubmitted(true);

      setTimeout(() => {
        setFormData({
          name: '',
          mobile: '',
          email: '',
          message: '',
          consent: false,
        });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      alert(error?.response?.data?.message || "Unable to send message right now.")
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  // SVG Wave Background
  const WaveHero = () => (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      style={{ pointerEvents: 'none' }}
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
        </linearGradient>
      </defs>
      <path
        d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,176C672,160,768,128,864,122.7C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        fill="url(#waveGradient)"
      />
      <path
        d="M0,160L48,165.3C96,171,192,181,288,186.7C384,192,480,192,576,197.3C672,203,768,213,864,197.3C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        fill="rgba(255,255,255,0.1)"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section with Wave Design */}
      <div
        className="relative w-full pt-40 pb-10 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a3a32 0%, #2d5a52 35%, #1e4d6b 70%, #0f2e3d 100%)',
        }}
      >
        <WaveHero />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Get In Touch
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Have a question about Spiruboost or ready to improve your poultry farm?
            <br />
            We're here to help and excited to connect with you.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
  <div className="bg-linear-to-b from-white via-gray-50 to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Side - Form */}
            <div className="space-y-8">
              {/* Form Header */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Let's Talk!
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  Share your details with us and we'll get back to you promptly with tailored solutions for your poultry farming needs.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Mobile - One Line */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="IND (+91)"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us your inquiry..."
                    rows="4"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                {/* Checkbox */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="w-5 h-5 mt-0.5 text-blue-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    required
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                    I agree to receive communications and updates from Spiruboost about products and services.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-red-500 hover:bg-black text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="w-4 h-4 animate-spin mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>

                {/* Success Message */}
                {submitted && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg animate-slideIn">
                    <p className="text-green-800 font-medium">
                      ✓ Message sent successfully! We'll contact you soon.
                    </p>
                  </div>
                )}
              </form>

              {/* Form Footer */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  We typically respond within 24 hours. Thank you for reaching out to Spiruboost!
                </p>
              </div>
            </div>

            {/* Right Side - Image & Contact Details */}
            <div className="space-y-8">
              {/* Image Placeholder - Square */}
              <div className="relative group w-full mx-auto">
                <div className="absolute inset-0 bg-linear-to-r from-blue-100 to-indigo-100 rounded-xl blur opacity-75 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative w-full aspect-square bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-500">
                  <img
                    src="/contact.png"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="w-full space-y-4">
                <div className="w-full bg-linear-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <svg
                        className="w-6 h-6 text-[#1a3a32]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <a
                        href="mailto:support@spiruboost.com"
                        className="text-sm font-semibold text-gray-900 hover:text-blue-700 transition-colors"
                      >
                        support@spiruboost.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 pt-4 border-t border-gray-200">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <svg
                        className="w-6 h-6 text-[#1a3a32]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">Phone</p>
                      <a
                        href="tel:+918006000127"
                        className="text-sm font-semibold text-gray-900 hover:text-blue-700 transition-colors"
                      >
                        +91 8006000127
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-4 border-t border-gray-200">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-6 h-6 text-[#1a3a32]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">Address</p>
                      <p className="text-sm font-semibold text-gray-900 leading-relaxed">
                      GF-39, The Hub,<br />
                      Runway Suits, Gaur Yamuna City,<br />
                      YEIDA Sec-19, Greater Noida,<br />
                      Uttar Pradesh 203201</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
      <Footer />
    </div>
  );
}
