"use client"

import { useState, useEffect } from "react"
import { X, Search } from "lucide-react"
import Link from "next/link"

export default function SearchOverlay({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const allProducts = [
    {
      id: 1,
      name: "Spirulina Powder",
      image: "/placeholder.svg?height=48&width=48",
      href: "/product/spirulina-powder",
    },
    {
      id: 2,
      name: "Spirulina Tablets",
      image: "/placeholder.svg?height=48&width=48",
      href: "/product/spirulina-tablets",
    },
    {
      id: 3,
      name: "Spirulina Smoothie Mix",
      image: "/placeholder.svg?height=48&width=48",
      href: "/product/smoothie-mix",
    },
    {
      id: 4,
      name: "Spirulina Energy Bars",
      image: "/placeholder.svg?height=48&width=48",
      href: "/product/energy-bars",
    },
    { id: 5, name: "Spirulina Capsules", image: "/placeholder.svg?height=48&width=48", href: "/product/capsules" },
    {
      id: 6,
      name: "Organic Spirulina Bulk",
      image: "/placeholder.svg?height=48&width=48",
      href: "/product/bulk-spirulina",
    },
  ]

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = allProducts.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchTerm])

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("")
      setSearchResults([])
    }
  }, [isOpen])

  return (
    <div
      className={`font-sans fixed inset-0 z-50 bg-white/95 backdrop-blur-md transition-opacity duration-300 flex flex-col items-center pt-20 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
      >
        <X className="h-8 w-8 stroke-1" />
      </button>

      <div className="w-full max-w-2xl px-4">
        <div className="relative flex items-center border-b-2 border-gray-300 focus-within:border-green-600 transition-colors duration-200">
          <Search className="absolute left-3 h-6 w-6 text-gray-500 stroke-1" />
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full py-4 pl-12 pr-4 text-xl focus:outline-none bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        {searchTerm.length > 0 && searchResults.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No products found for "{searchTerm}".</p>
        )}

        {searchResults.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
            {searchResults.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                onClick={onClose}
                className="flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <span className="text-lg font-medium text-gray-800">{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
