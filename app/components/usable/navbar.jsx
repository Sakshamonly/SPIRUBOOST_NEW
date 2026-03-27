"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Heart, Package, User, X } from "lucide-react"
import CartSidebar from "./cart"
import SearchOverlay from "./search"
import Image from "next/image"

// Custom Hamburger Icon Component
const HamburgerIcon = ({ isOpen }) => (
  <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
    <div
      className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5 w-6" : "w-6"}`}
    ></div>
    <div className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? "opacity-0" : "w-4"}`}></div>
    <div
      className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5 w-6" : "w-6"}`}
    ></div>
  </div>
)

export default function navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleCart = () => setIsCartOpen(!isCartOpen)
  const toggleWishlist = () => setIsWishlistOpen(!isWishlistOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  const navLinks = [
    { label: "Wellness", href: "/wellness" },
    { label: "Products", href: "/products" },
    { label: "Farms", href: "/farm" },
    { label: "About", href: "/about" },
    { label: "Tracking", href: "/tracking" },
    { label: "Contact", href: "/contact" },
  ]

  const mobileNavLinks = [
    { label: "Wellness", href: "/wellness" },
    { label: "Products", href: "/products" },
    { label: "Farms", href: "/farm" },
    { label: "About", href: "/about" },
    { label: "Tracking", href: "/tracking" },
    { label: "Contact", href: "/contact" },
    { label: "Account", href: "/login" },
  ]

  return (
    <>
      {/* Main Navbar */}
      <nav className="sticky top-0 z-40 w-full bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-xl">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center h-20 px-2 relative w-full">
            {/* Left - Logo */}
            <div className="flex-shrink-0 flex items-center absolute left-0 top-1/2 -translate-y-1/2" style={{ minWidth: 260 }}>
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo.png"
                  alt="Spiruboost Logo"
                  width={300}
                  height={200}
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </Link>
            </div>

            {/* Center - Navigation Links */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-baseline space-x-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-bold tracking-wide transition-all duration-300 hover:scale-105 relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right - Icons */}
            <div className="flex-shrink-0 flex items-center absolute right-0 top-1/2 -translate-y-1/2" style={{ minWidth: 260 }}>
              <button
                onClick={toggleSearch}
                className="p-3 text-gray-600 hover:text-gray-800 transition-all duration-300"
              >
                <Search className="h-6 w-6 stroke-1.5" />
              </button>
              <button
                onClick={toggleCart}
                className="p-3 text-gray-600 hover:text-gray-800 transition-all duration-300"
              >
                <ShoppingCart className="h-6 w-6 stroke-1.5" />
              </button>
              <Link
                href="/login"
                className="p-3 text-gray-600 hover:text-gray-800 transition-all duration-300"
              >
                <User className="h-6 w-6 stroke-1.5" />
              </Link>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex items-center justify-between h-20 w-full max-w-none pl-0 pr-0 relative">
            {/* Left - Hamburger */}
            <button
              onClick={toggleMenu}
              className="p-3 text-gray-600 hover:text-gray-800 transition-all duration-300 z-10"
            >
              <HamburgerIcon isOpen={isMenuOpen} />
            </button>

            {/* Center - Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Spiruboost Logo"
                  width={200}
                  height={150}
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </Link>
            </div>

            {/* Right - Icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={toggleSearch}
                className="p-2 text-gray-600 hover:text-gray-800 transition-all duration-300"
              >
                <Search className="h-7 w-7 stroke-1.5" />
              </button>
              <button
                onClick={toggleCart}
                className="p-0.5 text-gray-600 hover:text-gray-800 transition-all duration-300"
              >
                <ShoppingCart className="h-7 w-7 stroke-1.5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 z-50 ${isMenuOpen ? "visible" : "invisible"}`}>
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${isMenuOpen ? "opacity-50" : "opacity-0"}`}
          onClick={toggleMenu}
        ></div>

        {/* Mobile Menu Sidebar */}
        <div
          className={`absolute left-0 top-0 h-full w-80 bg-white/90 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 overflow-hidden border-r border-white/20 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="h-full flex flex-col">
            {/* Fixed Header */}
            <div className="shrink-0 p-6 border-b border-white/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold bg-linear-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">Menu</h2>
                <button
                  onClick={toggleMenu}
                  className="p-2 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all duration-200"
                >
                  <X className="h-6 w-6 stroke-1.5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Navigation Links */}
              <div className="space-y-2">
                {mobileNavLinks.map((link, index) => (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      onClick={toggleMenu}
                      className="block p-3 text-lg font-bold tracking-wide text-gray-600 hover:text-gray-800 transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                    {index < mobileNavLinks.length - 1 && <div className="w-full h-px bg-white/30 my-2"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart, Wishlist, and Search Overlays */}
      <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />
      <SearchOverlay isOpen={isSearchOpen} onClose={toggleSearch} />
    </>
  )
}
