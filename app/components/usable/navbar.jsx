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
    { label: "Blog", href: "/blog" },
    { label: "Farms", href: "/farm" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  const mobileNavLinks = [
    { label: "Wellness", href: "/wellness" },
    { label: "Products", href: "/products" },
    { label: "Blog", href: "/blog" },
    { label: "Farms", href: "/farm" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Account", href: "/login" },
  ]

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 z-40 w-full bg-gradient-to-r from-orange-50/70 via-green-50/70 to-orange-100/70 shadow-lg border-b border-orange-100/50 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Layout - hidden on mobile and tablet */}
          <div className="hidden lg:flex items-center h-20 px-2 relative w-full">
            {/* Left - Logo */}
            <div className="shrink-0 flex items-center" style={{ minWidth: '200px' }}>
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300">
                <Image
                  src="/logo.png"
                  alt="Spiruboost Logo"
                  width={250}
                  height={180}
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </Link>
            </div>

            {/* Center - Navigation Links */}
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-gray-800 hover:text-gray-950 px-2 py-2 text-sm font-bold tracking-wide transition-all duration-300 relative group whitespace-nowrap"
                    style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif" }}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right - Icons */}
            <div className="shrink-0 flex items-center gap-4" style={{ minWidth: '200px' }}>
              <button
                onClick={toggleSearch}
                className="p-3 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-110"
                aria-label="Search"
              >
                <Search className="h-5 w-5 stroke-2" />
              </button>
              <button
                onClick={toggleCart}
                className="p-3 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-110"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5 stroke-2" />
              </button>
              <Link
                href="/login"
                className="p-3 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-110"
                aria-label="Login"
              >
                <User className="h-5 w-5 stroke-2" />
              </Link>
            </div>
          </div>

          {/* Tablet Layout (768px - 1023px) */}
          <div className="hidden md:flex lg:hidden items-center justify-between h-20 w-full px-2">
            {/* Left - Hamburger */}
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-gray-900 transition-all duration-300 z-10"
              aria-label="Menu"
            >
              <HamburgerIcon isOpen={isMenuOpen} />
            </button>

            {/* Center - Logo */}
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
              <Image
                src="/logo.png"
                alt="Spiruboost Logo"
                width={180}
                height={130}
                className="object-contain drop-shadow-lg"
                priority
              />
            </Link>

            {/* Right - Icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSearch}
                className="p-2 text-gray-700 hover:text-gray-900 transition-all duration-300"
                aria-label="Search"
              >
                <Search className="h-5 w-5 stroke-2" />
              </button>
              <button
                onClick={toggleCart}
                className="p-2 text-gray-700 hover:text-gray-900 transition-all duration-300"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5 stroke-2" />
              </button>
            </div>
          </div>

          {/* Mobile Layout (below 768px) */}
          <div className="md:hidden flex items-center justify-between h-20 w-full px-2">
            {/* Left - Hamburger */}
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-gray-900 transition-all duration-300 z-10"
              aria-label="Menu"
            >
              <HamburgerIcon isOpen={isMenuOpen} />
            </button>

            {/* Center - Logo */}
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
              <Image
                src="/logo.png"
                alt="Spiruboost Logo"
                width={150}
                height={100}
                className="object-contain drop-shadow-lg"
                priority
              />
            </Link>

            {/* Right - Icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={toggleSearch}
                className="p-2 text-gray-700 hover:text-gray-900 transition-all duration-300"
                aria-label="Search"
              >
                <Search className="h-5 w-5 stroke-2" />
              </button>
              <button
                onClick={toggleCart}
                className="p-2 text-gray-700 hover:text-gray-900 transition-all duration-300"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5 stroke-2" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile & Tablet Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-50 ${isMenuOpen ? "visible" : "invisible"}`}>
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${isMenuOpen ? "opacity-50" : "opacity-0"}`}
          onClick={toggleMenu}
        ></div>

        {/* Mobile Menu Sidebar */}
        <div
          className={`absolute left-0 top-0 h-full w-64 sm:w-80 bg-gradient-to-b from-orange-50 via-green-50 to-orange-100 shadow-2xl transform transition-transform duration-300 overflow-hidden border-r border-orange-100 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="h-full flex flex-col">
            {/* Fixed Header */}
            <div className="shrink-0 p-6 border-b border-orange-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl sm:text-3xl font-black text-gray-800" style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif" }}>Menu</h2>
                <button
                  onClick={toggleMenu}
                  className="p-2 hover:bg-orange-200/50 rounded-xl transition-all duration-200"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 stroke-2 text-gray-700" />
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
                      className="block p-3 text-lg font-bold text-gray-700 hover:text-gray-900 hover:bg-white/40 rounded-lg transition-all duration-200"
                      style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif" }}
                    >
                      {link.label}
                    </Link>
                    {index < mobileNavLinks.length - 1 && <div className="w-full h-px bg-orange-200/50 my-2"></div>}
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
