"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "./components/Sidebar"
import Overview from "./components/Overview"
import Orders from "./components/Orders"
import Products from "./components/Products"
import Coupons from "./components/Coupons"
import Users from "./components/Users"
import Reviews from "./components/Reviews"
import Analytics from "./components/Analytics"
import Refunds from "./components/Refunds"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("overview")
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user") || "{}")

    if (!token || (!user?.isAdmin && user?.role !== "admin")) {
      router.replace("/login")
      return
    }

    setCheckingAuth(false)
  }, [router])

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <Overview />
      case "orders":
        return <Orders />
      case "products":
        return <Products />
      case "coupons":
        return <Coupons />
      case "users":
        return <Users />
      case "reviews":
        return <Reviews />
      case "analytics":
        return <Analytics />
      case "refunds":
        return <Refunds />
      default:
        return <Overview />
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 font-medium">Checking admin access...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background flex-col sm:flex-row">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-1 overflow-auto scroll-smooth">
        {renderSection()}
      </main>
    </div>
  )
}
