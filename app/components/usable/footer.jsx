"use client";
import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribe:', { name, email });
    setName('');
    setEmail('');
  };

  return (
    <footer className="bg-linear-to-br from-slate-800 to-slate-900 text-gray-200">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-3">Spiruboost</h3>
            <p className="text-gray-400 text-sm mb-8">Inspired by nature. Backed by science.</p>

            {/* Contact Us */}
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <a href="mailto:aarogyanutraceuticals@gmail.com" className="text-gray-300 hover:text-white transition">
                  aarogyanutraceuticals@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <a href="tel:+919258888127" className="text-gray-300 hover:text-white transition">
                  +91 92588 88127
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <div className="text-gray-300">
                  <p>GF-39, The Hub</p>
                  <p>Runway Suits, Gaur Yamuna City YEIDA Sec-19</p>
                  <p>Greater Noida, Uttar Pradesh 203201</p>
                </div>
              </div>
            </div>

           
          </div>

          {/* Center Column: Explore and Support */}
          <div className="text-center">
            {/* Explore Section */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6">Explore</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/" className="text-gray-300 hover:text-white transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-300 hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/products" className="text-gray-300 hover:text-white transition">
                    Shop All Products
                  </a>
                </li>
                <li>
                  <a href="/animal" className="text-gray-300 hover:text-white transition">
                    Animal Wellness
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Section Below Explore */}
            <div className="mt-8">
              <h4 className="text-white font-semibold text-lg mb-6">Support</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="text-right">
            <h4 className="text-white font-semibold text-lg mb-6">Follow Us</h4>
            <div className="flex gap-4 justify-end">
              <a
                href="#"
                className="w-12 h-12 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition duration-200 text-gray-300 hover:text-white"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a
                href="#"
                className="w-12 h-12 bg-slate-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition duration-200 text-gray-300 hover:text-white"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.015-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-slate-700 hover:bg-blue-700 rounded-full flex items-center justify-center transition duration-200 text-gray-300 hover:text-white"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          {/* Bottom Links and Copyright */}
          <div className="text-center">
            <div className="mb-4 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition">
                Terms & Conditions
              </a>
              <span className="mx-2 text-gray-500">|</span>
              <a href="#" className="text-gray-300 hover:text-white transition">
                Privacy Policy
              </a>
            </div>
            <p className="text-sm text-gray-400">
              © 2025 Spiruboost. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
