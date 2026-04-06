/**
 * Reusable Product Card Component
 * 
 * Usage:
 * import { ProductCard } from "@/components/usable/product-card"
 * 
 * <ProductCard
 *   product={{ id: 1, name: "Product Name", price: 500, image: "url" }}
 *   onAddToCart={(productId) => { ... }}
 *   onBuyNow={(productId) => { ... }}
 *   onProductClick={(productId) => { ... }}
 * />
 */

"use client"

import { resolveMediaUrl } from "../../../lib/resolve-media"

export function ProductCard({ product, onAddToCart, onBuyNow, onProductClick }) {
  const stockCount = Number(product?.countInStock ?? product?.stock ?? 0)
  const isOutOfStock = stockCount <= 0
  const roundedRating = Math.round(Number(product?.rating || 0))
  const reviewsCount = Number(product?.reviewsCount || 0)
  const productImage = resolveMediaUrl(product?.image, "https://via.placeholder.com/600x600?text=Product")

  return (
    <div 
      className="h-full flex flex-col bg-linear-to-br from-green-50 via-white to-green-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group cursor-pointer"
      onClick={() => onProductClick(product.id)}
    >
      {/* Image - Clickable */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-200">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 bg-white/80 backdrop-blur-sm flex-1 flex flex-col">
        <h3
          className="text-base font-bold text-gray-800 mb-2 cursor-pointer hover:text-blue-600 transition-colors duration-200 line-clamp-2 uppercase tracking-wide"
          onClick={(e) => {
            e.stopPropagation()
            onProductClick(product.id)
          }}
          style={{ fontFamily: "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto", fontWeight: 700 }}
        >
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-gray-400 line-through text-sm font-medium">
            ₹{Math.round(product.price * 1.11).toLocaleString('en-IN')}
          </span>
          <span className="text-green-600 font-bold text-lg">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-0">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={index < roundedRating ? "text-yellow-400" : "text-gray-300"}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-gray-500 text-sm font-medium">
            {reviewsCount > 0 ? `${reviewsCount} Reviews` : "No Reviews"}
          </span>
        </div>
      </div>

      {/* Button Container - Sticks to Bottom with No Margin */}
      {isOutOfStock ? (
        <div className="w-full flex h-14 sm:h-16 overflow-hidden shadow-lg bg-gray-400 text-white">
          <div
            className="flex-1 flex items-center justify-center gap-2 sm:gap-3 font-bold text-sm sm:text-base md:text-lg"
            style={{ fontFamily: "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto", fontWeight: 700 }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 4V3c0-.6.4-1 1-1h1c.6 0 1 .4 1 1v1h5V3c0-.6.4-1 1-1h1c.6 0 1 .4 1 1v1h2c1.1 0 2 .9 2 2v2H5V6c0-1.1.9-2 2-2h0zm13 8H4v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V12zm0 10H6v-8h14v8z"/>
            </svg>
            <span>Out of Stock</span>
          </div>
          <div
            className="flex-1 flex items-center justify-center font-bold text-sm sm:text-base md:text-lg bg-gray-500"
            style={{ fontFamily: "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto", fontWeight: 700 }}
          >
            <span>UNAVAILABLE</span>
          </div>
        </div>
      ) : (
        <div className="w-full flex h-14 sm:h-16 overflow-hidden shadow-lg">
          {/* Add to Cart Button - Left Side with Cart Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart(product.id)
            }}
            className="flex-1 bg-gray-700 hover:bg-red-600 text-white font-bold text-sm sm:text-base md:text-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 sm:gap-3 rounded-none"
            style={{ fontFamily: "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto", fontWeight: 700 }}
            title="Add to Cart"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 4V3c0-.6.4-1 1-1h1c.6 0 1 .4 1 1v1h5V3c0-.6.4-1 1-1h1c.6 0 1 .4 1 1v1h2c1.1 0 2 .9 2 2v2H5V6c0-1.1.9-2 2-2h0zm13 8H4v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V12zm0 10H6v-8h14v8z"/>
            </svg>
            <span className="hidden sm:inline">Add to Cart</span>
          </button>

          {/* Buy Now Button - Right Side */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onBuyNow(product.id)
            }}
            className="flex-1 bg-green-600 hover:bg-red-600 text-white font-bold text-sm sm:text-base md:text-lg transition-all duration-300 active:scale-95 flex items-center justify-center rounded-none"
            style={{ fontFamily: "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto", fontWeight: 700 }}
            title="Buy Now"
          >
            <span>BUY NOW</span>
          </button>
        </div>
      )}
    </div>
  )
}
