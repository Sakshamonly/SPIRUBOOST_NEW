"use client"

import { useEffect, useMemo, useState } from "react"
import { X, Search, Loader2 } from "lucide-react"
import Link from "next/link"
import API from "../../../lib/api"
import { resolveMediaUrl } from "../../../lib/resolve-media"

const normalizeProduct = (product, index) => ({
  id: product?._id || product?.id || `product-${index}`,
  name: product?.name || "Product",
  image: resolveMediaUrl(
    product?.image || (Array.isArray(product?.images) ? product.images[0] : ""),
    "/placeholder.svg"
  ),
  href: `/product_ind?id=${product?._id || product?.id || ""}`,
  category: product?.category || "",
})

export default function SearchOverlay({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    if (!isOpen || hasLoaded) return

    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await API.get("/products")
        const list = Array.isArray(response?.data) ? response.data : []
        setProducts(list.map(normalizeProduct))
        setHasLoaded(true)
      } catch (error) {
        console.error("Search products load failed:", error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [hasLoaded, isOpen])

  const searchResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (term.length < 1) return []

    return products
      .filter((product) => product.name.toLowerCase().includes(term))
      .slice(0, 8)
  }, [products, searchTerm])

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("")
    }
  }, [isOpen])

  return (
    <div
      className={`font-sans fixed inset-0 z-50 bg-white/95 backdrop-blur-md transition-opacity duration-300 flex flex-col items-center pt-20 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
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

        {loading && (
          <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading products...</span>
          </div>
        )}

        {!loading && searchTerm.length > 0 && searchResults.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No products found for "{searchTerm}".</p>
        )}

        {!loading && searchResults.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
            {searchResults.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                onClick={onClose}
                className="flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-md bg-gray-100"
                />
                <div className="min-w-0">
                  <span className="block text-lg font-medium text-gray-800 truncate">{product.name}</span>
                  {product.category && (
                    <span className="block text-sm text-gray-500 capitalize">{product.category}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
