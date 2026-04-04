"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, User, X } from "lucide-react";
import CartSidebar from "./cart";
import SearchOverlay from "./search";
import Image from "next/image";

const HamburgerIcon = ({ isOpen }) => (
  <div className="flex h-6 w-6 flex-col items-center justify-center space-y-1">
    <div
      className={`h-0.5 bg-current transition-all duration-300 ${
        isOpen ? "w-6 translate-y-1.5 rotate-45" : "w-6"
      }`}
    ></div>
    <div className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? "opacity-0" : "w-4"}`}></div>
    <div
      className={`h-0.5 bg-current transition-all duration-300 ${
        isOpen ? "-translate-y-1.5 -rotate-45 w-6" : "w-6"
      }`}
    ></div>
  </div>
);

export default function Navbar() {
  const router = useRouter();
  const dropdownRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

  const syncAuthState = () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setIsLoggedIn(true);
        setUserData(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        setIsLoggedIn(false);
        setUserData(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  useEffect(() => {
    syncAuthState();

    const handleStorageChange = () => {
      syncAuthState();
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAccountDropdownOpen(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    sessionStorage.removeItem("redirectAfterLogin");

    setIsLoggedIn(false);
    setUserData(null);
    setIsAccountDropdownOpen(false);
    setIsMenuOpen(false);
    router.push("/");
  };

  const handleMyProfile = () => {
    setIsAccountDropdownOpen(false);
    setIsMenuOpen(false);

    if (!isLoggedIn) {
      sessionStorage.setItem("redirectAfterLogin", "/user");
      router.push("/login");
      return;
    }

    router.push("/user");
  };

  const handleMyOrders = () => {
    setIsAccountDropdownOpen(false);
    setIsMenuOpen(false);

    if (!isLoggedIn) {
      sessionStorage.setItem("redirectAfterLogin", "/user");
      router.push("/login");
      return;
    }

    router.push("/user");
  };

  const handleAdminDashboard = () => {
    setIsAccountDropdownOpen(false);
    setIsMenuOpen(false);

    if (!isLoggedIn) {
      sessionStorage.setItem("redirectAfterLogin", "/admin");
      router.push("/login");
      return;
    }

    router.push("/admin");
  };

  const handleAccountClick = () => {
    if (!isLoggedIn) {
      sessionStorage.setItem("redirectAfterLogin", "/user");
      router.push("/login");
      return;
    }

    toggleAccountDropdown();
  };

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Wellness", href: "/wellness" },
    { label: "Blog", href: "/blog" },
    { label: "Farms", href: "/farm" },
    { label: "Contact", href: "/contact" },
  ];

  const mobileNavLinks = [
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Wellness", href: "/wellness" },
    { label: "Blog", href: "/blog" },
    { label: "Farms", href: "/farm" },
    { label: "Contact", href: "/contact" },
  ];

  const displayName = userData?.name || "Account";
  const isAdmin = userData?.isAdmin || userData?.role === "admin";
  const accountLabel = isAdmin ? `Admin • ${displayName}` : displayName;

  return (
    <>
      <nav className="fixed top-0 z-40 w-full border-b border-orange-100/50 bg-gradient-to-r from-orange-50/70 via-green-50/70 to-orange-100/70 shadow-lg backdrop-blur-md">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-20 w-full items-center px-2 lg:flex hidden">
            <div className="flex shrink-0 items-center justify-center" style={{ minWidth: "250px" }}>
              <Link href="/" className="flex h-full items-center justify-center transition-opacity duration-300 hover:opacity-80">
              <Image
                src="/Spiruboost_Logo.png"
                alt="Spiruboost Logo"
                width={150}
                height={150}
                className="object-contain drop-shadow-lg"
                priority
              />
              </Link>
            </div>

            <div className="flex flex-1 items-center justify-center">
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="relative whitespace-nowrap px-2 py-2 text-sm font-bold tracking-wide text-gray-800 transition-all duration-300 hover:text-gray-950 group"
                    style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif" }}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-4" style={{ minWidth: "220px" }}>
              <button
                onClick={toggleSearch}
                className="p-3 text-gray-700 transition-all duration-300 hover:scale-110 hover:text-gray-900"
                aria-label="Search"
              >
                <Search className="h-5 w-5 stroke-2" />
              </button>

              <button
                onClick={toggleCart}
                className="p-3 text-gray-700 transition-all duration-300 hover:scale-110 hover:text-gray-900"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5 stroke-2" />
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={handleAccountClick}
                  className="flex items-center gap-2 rounded-2xl px-3 py-2 text-gray-700 transition-all duration-300 hover:bg-white/60 hover:text-gray-900"
                  aria-label="Account"
                >
                  <User className="h-5 w-5 stroke-2" />
                  <span className="hidden max-w-[140px] truncate text-sm font-semibold lg:inline">
                    {isLoggedIn ? accountLabel : "Account"}
                  </span>
                </button>

                {isAccountDropdownOpen && (
                  <div
                    className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-gray-100 bg-white py-1 shadow-2xl backdrop-blur-sm"
                    style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)" }}
                  >
                    {isAdmin && (
                      <button
                        onClick={handleAdminDashboard}
                        className="mx-1 block w-full rounded-lg px-5 py-3 text-left text-sm font-semibold text-gray-800 transition-all duration-200 hover:bg-gray-50"
                        style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif", background: "none", border: "none", cursor: "pointer" }}
                      >
                        ⚙️ Admin Dashboard
                      </button>
                    )}

                    <button
                      onClick={handleMyProfile}
                      className="mx-1 block w-full rounded-lg px-5 py-3 text-left text-sm font-semibold text-gray-800 transition-all duration-200 hover:bg-gray-50"
                      style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif", background: "none", border: "none", cursor: "pointer" }}
                    >
                      👤 My Profile
                    </button>

                    <button
                      onClick={handleMyOrders}
                      className="mx-1 block w-full rounded-lg px-5 py-3 text-left text-sm font-semibold text-gray-800 transition-all duration-200 hover:bg-gray-50"
                      style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif", background: "none", border: "none", cursor: "pointer" }}
                    >
                      📦 My Orders
                    </button>

                    <button
                      className="mx-1 block w-full rounded-lg px-5 py-3 text-left text-sm font-semibold text-gray-800 transition-all duration-200 hover:bg-gray-50"
                      style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif", background: "none", border: "none", cursor: "pointer" }}
                      onClick={handleSignOut}
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hidden h-20 w-full items-center justify-between px-2 md:flex lg:hidden">
            <button
              onClick={toggleMenu}
              className="z-10 p-2 text-gray-700 transition-all duration-300 hover:text-gray-900"
              aria-label="Menu"
            >
              <HamburgerIcon isOpen={isMenuOpen} />
            </button>

            <Link href="/" className="flex items-center transition-opacity duration-300 hover:opacity-80">
              <Image
                src="/Spiruboost_Logo.png"
                alt="Spiruboost Logo"
                width={150}
                height={54}
                className="h-auto w-auto max-h-12 object-contain drop-shadow-lg"
                style={{ width: "150px", height: "auto" }}
                priority
              />
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleSearch}
                className="p-2 text-gray-700 transition-all duration-300 hover:text-gray-900"
                aria-label="Search"
              >
                <Search className="h-5 w-5 stroke-2" />
              </button>
              <button
                onClick={toggleCart}
                className="p-2 text-gray-700 transition-all duration-300 hover:text-gray-900"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5 stroke-2" />
              </button>
            </div>
          </div>

          <div className="flex h-20 w-full items-center justify-center px-2 md:hidden relative">
            <button
              onClick={toggleMenu}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 p-2 text-gray-700 transition-all duration-300 hover:text-gray-900"
              aria-label="Menu"
            >
              <HamburgerIcon isOpen={isMenuOpen} />
            </button>

            <Link href="/" className="absolute top-1/2 flex -translate-y-1/2 items-center justify-center transition-opacity duration-300 hover:opacity-80">
              <Image
                src="/Spiruboost_Logo.png"
                alt="Spiruboost Logo"
                width={150}
                height={54}
                className="h-auto w-auto max-h-12 object-contain drop-shadow-lg"
                style={{ width: "150px", height: "auto" }}
                priority
              />
            </Link>

            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
              <button
                onClick={toggleSearch}
                className="p-2 text-gray-700 transition-all duration-300 hover:text-gray-900"
                aria-label="Search"
              >
                <Search className="h-5 w-5 stroke-2" />
              </button>
              <button
                onClick={toggleCart}
                className="p-2 text-gray-700 transition-all duration-300 hover:text-gray-900"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5 stroke-2" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-50 lg:hidden ${isMenuOpen ? "visible" : "invisible"}`}>
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isMenuOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={toggleMenu}
        ></div>

        <div
          className={`absolute left-0 top-0 h-full w-64 overflow-hidden border-r border-orange-100 bg-gradient-to-b from-orange-50 via-green-50 to-orange-100 shadow-2xl transform transition-transform duration-300 sm:w-80 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="shrink-0 border-b border-orange-200 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2
                  className="text-2xl font-black text-gray-800 sm:text-3xl"
                  style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif" }}
                >
                  Menu
                </h2>
                <button
                  onClick={toggleMenu}
                  className="rounded-xl p-2 transition-all duration-200 hover:bg-orange-200/50"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 stroke-2 text-gray-700" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-2">
                {mobileNavLinks.map((link, index) => (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      onClick={toggleMenu}
                      className="block rounded-lg p-3 text-lg font-bold text-gray-700 transition-all duration-200 hover:bg-white/40 hover:text-gray-900"
                      style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif" }}
                    >
                      {link.label}
                    </Link>
                    {index < mobileNavLinks.length - 1 && <div className="my-2 h-px w-full bg-orange-200/50"></div>}
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-orange-200 pt-6">
                <h3
                  className="mb-3 text-lg font-bold text-gray-800"
                  style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif" }}
                >
                  Account
                </h3>

                {isLoggedIn && (
                  <div className="mb-4 rounded-2xl border border-orange-200 bg-white/60 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {isAdmin ? "Admin" : "User"}
                    </p>
                    <p className="mt-1 truncate text-base font-bold text-gray-900">
                      {accountLabel}
                    </p>
                  </div>
                )}

                {!isLoggedIn ? (
                  <button
                    onClick={() => {
                      toggleMenu();
                      router.push("/login");
                    }}
                    className="mb-2 block w-full rounded-lg p-3 text-left text-lg font-semibold text-gray-700 transition-all duration-200 hover:bg-white/40 hover:text-gray-900"
                    style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif", background: "none", border: "none", cursor: "pointer" }}
                  >
                    👤 Login
                  </button>
                ) : (
                  <>
                    {isAdmin && (
                      <button
                        onClick={() => {
                          toggleMenu();
                          handleAdminDashboard();
                        }}
                        className="mb-2 block w-full rounded-lg p-3 text-left text-lg font-semibold text-gray-700 transition-all duration-200 hover:bg-white/40 hover:text-gray-900"
                        style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif", background: "none", border: "none", cursor: "pointer" }}
                      >
                        ⚙️ Admin Dashboard
                      </button>
                    )}

                    <button
                      onClick={() => {
                        toggleMenu();
                        handleMyProfile();
                      }}
                      className="mb-2 block w-full rounded-lg p-3 text-left text-lg font-semibold text-gray-700 transition-all duration-200 hover:bg-white/40 hover:text-gray-900"
                      style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif", background: "none", border: "none", cursor: "pointer" }}
                    >
                      👤 My Profile
                    </button>

                    <button
                      onClick={() => {
                        toggleMenu();
                        handleMyOrders();
                      }}
                      className="mb-2 block w-full rounded-lg p-3 text-left text-lg font-semibold text-gray-700 transition-all duration-200 hover:bg-white/40 hover:text-gray-900"
                      style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif", background: "none", border: "none", cursor: "pointer" }}
                    >
                      📦 My Orders
                    </button>

                    <button
                      className="block w-full rounded-lg p-3 text-left text-lg font-semibold text-gray-700 transition-all duration-200 hover:bg-white/40 hover:text-gray-900"
                      style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif", background: "none", border: "none", cursor: "pointer" }}
                      onClick={() => {
                        toggleMenu();
                        handleSignOut();
                      }}
                    >
                      🚪 Sign Out
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />
      <SearchOverlay isOpen={isSearchOpen} onClose={toggleSearch} />
    </>
  );
}
