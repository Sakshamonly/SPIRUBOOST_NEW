"use client";
<<<<<<< HEAD

import React, { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    setIsLoggedIn(Boolean(token && user));
  }, []);

  const handleMyAccountClick = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      router.push("/user");
    } else {
      router.push("/login");
    }
  };

  const handleTrackOrderClick = (e) => {
    e.preventDefault();

    const destination = "/user?tab=orders";

    if (isLoggedIn) {
      router.push(destination);
      return;
    }

    sessionStorage.setItem("redirectAfterLogin", destination);
    router.push("/login");
  };

  return (
    <footer className="bg-linear-to-br from-slate-800 to-slate-900 text-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <h3 className="mb-6 inline-block border-b-2 border-blue-500 pb-2 text-xl font-bold text-white">
=======
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-linear-to-br from-slate-800 to-slate-900 text-gray-200">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Explore Section (Left) */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6 relative inline-block pb-2 border-b-2 border-blue-500">
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
<<<<<<< HEAD
                <Link
                  href="/"
                  className="inline-block text-gray-300 transition duration-300 hover:translate-x-1 hover:text-blue-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="inline-block text-gray-300 transition duration-300 hover:translate-x-1 hover:text-blue-400"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="inline-block text-gray-300 transition duration-300 hover:translate-x-1 hover:text-blue-400"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/animal"
                  className="inline-block text-gray-300 transition duration-300 hover:translate-x-1 hover:text-blue-400"
                >
                  Animal Wellness
                </Link>
              </li>
              <li>
                <Link
                  href="/farm"
                  className="inline-block text-gray-300 transition duration-300 hover:translate-x-1 hover:text-blue-400"
                >
                  Our Farm
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="inline-block text-gray-300 transition duration-300 hover:translate-x-1 hover:text-blue-400"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/wellness"
                  className="inline-block text-gray-300 transition duration-300 hover:translate-x-1 hover:text-blue-400"
                >
                  Wellness
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-block text-gray-300 transition duration-300 hover:translate-x-1 hover:text-blue-400"
                >
                  Contact
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleMyAccountClick}
                  className="inline-block text-left text-gray-300 transition duration-300 hover:translate-x-1 hover:text-blue-400"
                >
                  My Account
                </button>
=======
                <a href="/about" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  About US
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Our Training Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  FAQs
                </a>
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
              </li>
            </ul>
          </div>

<<<<<<< HEAD
          <div>
            <h3 className="mb-6 inline-block border-b-2 border-blue-500 pb-2 text-xl font-bold text-white">
              Policies & Terms
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
              <Link href="/shipping" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/Return" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
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
                <button
                  type="button"
                  onClick={handleTrackOrderClick}
                  className="inline-block text-left text-gray-300 transition duration-300 hover:translate-x-1 hover:text-blue-400"
                >
                  Track Your Order
                </button>
=======
          {/* Shipping Terms Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6 relative inline-block pb-2 border-b-2 border-blue-500">
              Shipping Terms
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Return and Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:translate-x-1 inline-block">
                  Track Your Order
                </a>
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
              </li>
            </ul>
          </div>

<<<<<<< HEAD
          <div>
            <h3 className="mb-6 inline-block border-b-2 border-blue-500 pb-2 text-xl font-bold text-white">
              Contact Us
            </h3>
            <div className="space-y-4 text-sm">
              <div className="leading-relaxed text-gray-300">
                <p className="mb-2 font-semibold text-white">Address:</p>
                <p>GF-39, The Hub</p>
                <p>Runway Suits, Gaur Yamuna City</p>
                <p>YEIDA Sec-19, Greater Noida,</p>
                <p>Uttar Pradesh 203201</p>
              </div>

              <div className="border-t border-slate-700 pt-4">
                <div className="group mb-3 flex cursor-pointer items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-400 transition duration-300 group-hover:text-blue-300" />
                  <a
                    href="mailto:aarogyanutracecuticals@gmail.com"
                    className="text-xs text-gray-300 transition duration-300 hover:text-blue-400"
                  >
                    aarogyanutracecuticals@gmail.com
                  </a>
                </div>
                <div className="group flex cursor-pointer items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-400 transition duration-300 group-hover:text-blue-300" />
                  <a
                    href="tel:+919258888127"
                    className="text-xs text-gray-300 transition duration-300 hover:text-blue-400"
                  >
=======
          {/* Contact Us Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6 relative inline-block pb-2 border-b-2 border-blue-500">
              Contact Us
            </h3>
            <div className="space-y-4 text-sm">
              <div className="text-gray-300 leading-relaxed">
                <p className="font-semibold text-white mb-2">Address:</p>
                <p>2nd Floor, Flat No. A/203,</p>
                <p>Dev Prayag Residency, Opp.</p>
                <p>Shraddhadip Society, Causeway</p>
                <p>Singapor Road, Singapor, Surat,</p>
                <p>Gujarat, 395004</p>
              </div>
              
              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2 mb-3 group cursor-pointer">
                  <Mail className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition duration-300" />
                  <a href="mailto:info@spiruswastha.com" className="text-gray-300 hover:text-blue-400 transition duration-300 text-xs">
                    info@spiruswastha.com
                  </a>
                </div>
                <div className="flex items-center gap-2 group cursor-pointer">
                  <Phone className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition duration-300" />
                  <a href="tel:+919258888127" className="text-gray-300 hover:text-blue-400 transition duration-300 text-xs">
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
                    +91 92588 88127
                  </a>
                </div>
              </div>

<<<<<<< HEAD
              <div className="border-t border-slate-700 pt-4">
                <p className="mb-3 text-xs font-semibold text-white">Follow Us</p>
                <div className="flex gap-6">
=======
              {/* Social Media Icons */}
              <div className="pt-4 border-t border-slate-700">
                <p className="text-white text-xs font-semibold mb-3">Follow Us</p>
                <div className="flex gap-3">
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
<<<<<<< HEAD
                    className="transition duration-300 transform hover:scale-125"
                    aria-label="Facebook"
                  >
                    <svg className="h-8 w-8 text-blue-500 hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>

=======
                    className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition duration-300 text-gray-300 hover:text-white transform hover:scale-110"
                    aria-label="Facebook"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
<<<<<<< HEAD
                    className="transition duration-300 transform hover:scale-125"
                    aria-label="Instagram"
                  >
                    <svg className="h-8 w-8 text-pink-500 hover:text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
=======
                    className="w-10 h-10 bg-slate-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition duration-300 text-gray-300 hover:text-white transform hover:scale-110"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.015-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <div className="border-t border-slate-700 pt-8">
          <div className="text-center">
            <p className="mt-6 text-sm text-gray-400">
              © 2025 Spiruboost. All rights reserved. | Swastha for Life with Spirulina &amp; Superfood Goodness
=======
        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          {/* Bottom Links and Copyright */}
          <div className="text-center">
            
            <p className="text-sm text-gray-400 mt-6">
              © 2025 Spiruboost. All rights reserved. | Swastha for Life with Spirulina & Superfood Goodness
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
