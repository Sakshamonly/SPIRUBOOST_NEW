"use client"

import {
  BarChart3,
  Package,
  Zap,
  Users,
  BarChart2,
  RefreshCw,
  Ticket,
  MessageSquare,
  LogOut,
  Home,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function Sidebar({ activeSection, setActiveSection }) {
  const router = useRouter()

  const menuItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "orders", label: "Orders", icon: Package },
    { id: "products", label: "Products", icon: Zap },
    { id: "coupons", label: "Coupons", icon: Ticket },
    { id: "users", label: "Users", icon: Users },
    { id: "reviews", label: "Reviews", icon: MessageSquare },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "refunds", label: "Refunds", icon: RefreshCw },
  ]

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("rememberMe")
    router.replace("/login")
  }

  return (
    <aside className="w-full sm:w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col">
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
        <h1 className="text-xl font-bold text-gray-900">Spiruboost</h1>
      </div>

      <nav className="mt-6 px-3 space-y-2 flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="font-medium text-sm sm:text-base">
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>

      <div className="p-3 border-t border-gray-200 space-y-2">
        <button
          onClick={() => router.push("/")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Back to Website</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}
