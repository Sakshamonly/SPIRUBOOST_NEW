"use client";
import React from 'react';
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const handleNavClick = (e, href) => {
    // Smooth scroll handling for internal links
    if (href.startsWith('/')) {
      e.preventDefault();
      window.location.href = href;
    }
  };

  return (
    <footer className="bg-linear-to-br from-slate-800 to-slate-900 text-gray-200">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Explore Section (Left) */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6 relative inline-block pb-2 border-b-2 border-blue-500">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  About
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/animal" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Animal Wellness
                </Link>
              </li>
              <li>
                <Link href="/farm" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Our Farm
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/wellness" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Wellness
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Shipping Terms Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6 relative inline-block pb-2 border-b-2 border-blue-500">
              Policies & Terms
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms&conditions" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6 relative inline-block pb-2 border-b-2 border-blue-500">
              Contact Us
            </h3>
            <div className="space-y-4 text-sm">
              <div className="text-gray-300 leading-relaxed">
                <p className="font-semibold text-white mb-2">Address:</p>
                <p>GF-39, The Hub</p>
                <p>Runway Suits, Gaur Yamuna City</p>
                <p>YEIDA Sec-19, Greater Noida,</p>
                <p>Uttar Pradesh 203201</p>
              </div>
              
              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2 mb-3 group cursor-pointer">
                  <Mail className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition duration-300" />
                  <a href="mailto:aarogyanutracecuticals@gmail.com" className="text-gray-300 hover:text-blue-400 transition duration-300 text-xs">
                    aarogyanutracecuticals@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2 group cursor-pointer">
                  <Phone className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition duration-300" />
                  <a href="tel:+919258888127" className="text-gray-300 hover:text-blue-400 transition duration-300 text-xs">
                    +91 92588 88127
                  </a>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="pt-4 border-t border-slate-700">
                <p className="text-white text-xs font-semibold mb-3">Follow Us</p>
                <div className="flex gap-6">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition duration-300 transform hover:scale-125"
                    aria-label="Facebook"
                  >
                    <svg className="w-8 h-8 text-blue-500 hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition duration-300 transform hover:scale-125"
                    aria-label="Instagram"
                  >
                    <svg className="w-8 h-8 text-pink-500 hover:text-pink-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          {/* Bottom Links and Copyright */}
          <div className="text-center">
            
            <p className="text-sm text-gray-400 mt-6">
              © 2025 Spiruboost. All rights reserved. | Swastha for Life with Spirulina & Superfood Goodness
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
