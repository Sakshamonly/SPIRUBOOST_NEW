"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { ProductCard } from "../components/usable/product-card"
import CartSidebar from "../components/usable/cart"
import Footer from "../components/usable/footer"
import Navbar from "../components/usable/navbar"
import { ChevronDown } from "lucide-react"

export default function ProductsPage() {
  const router = useRouter()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  // Human Wellness Products
  const humanProducts = [
    { id: 1, name: 'Spiruboost Capsules', price: 499, image: 'https://5.imimg.com/data5/SELLER/Default/2022/10/WM/SG/QK/91285886/13-spirulina-1000x1000.jpg', category: 'human' },
    { id: 2, name: 'Spiruboost Tablets', price: 799, image: 'https://source.unsplash.com/800x600/?spirulina,tablet&sig=2', category: 'human' },
    { id: 3, name: 'Spiruboost Powder', price: 299, image: 'https://source.unsplash.com/800x600/?spirulina,powder&sig=3', category: 'human' },
    { id: 4, name: 'Spiruboost Gummies', price: 399, image: 'https://source.unsplash.com/800x600/?gummies,health&sig=4', category: 'human' },
    { id: 5, name: 'Spiruboost Liquid', price: 599, image: 'https://source.unsplash.com/800x600/?liquid,wellness&sig=5', category: 'human' },
    { id: 6, name: 'Spiruboost Mini', price: 149, image: 'https://source.unsplash.com/800x600/?supplement,mini&sig=6', category: 'human' },
    { id: 7, name: 'Spiruboost Plus', price: 999, image: 'https://source.unsplash.com/800x600/?superfood,boost&sig=7', category: 'human' },
    { id: 8, name: 'Spiruboost Max', price: 1299, image: 'https://source.unsplash.com/800x600/?nutrition,max&sig=8', category: 'human' },
    { id: 9, name: 'Spiruboost Starter Pack', price: 1499, image: 'https://source.unsplash.com/800x600/?package,starter&sig=9', category: 'human' },
    { id: 10, name: 'Spiruboost Family Pack', price: 2499, image: 'https://source.unsplash.com/800x600/?family,wellness&sig=10', category: 'human' },
  ]

  // Animal Wellness Products
  const animalProducts = [
    { id: 11, name: 'Spiruboost Animal Feed', price: 599, image: 'https://source.unsplash.com/800x600/?animal,feed&sig=11', category: 'animal' },
    { id: 12, name: 'Spiruboost Poultry Boost', price: 699, image: 'https://source.unsplash.com/800x600/?poultry,nutrition&sig=12', category: 'animal' },
    { id: 13, name: 'Spiruboost Livestock Supplement', price: 899, image: 'https://source.unsplash.com/800x600/?livestock&sig=13', category: 'animal' },
    { id: 14, name: 'Spiruboost Pet Formula', price: 499, image: 'https://source.unsplash.com/800x600/?pet,wellness&sig=14', category: 'animal' },
    { id: 15, name: 'Spiruboost Aqua Feed', price: 799, image: 'https://source.unsplash.com/800x600/?aquatic,feed&sig=15', category: 'animal' },
  ]

  const allProducts = [...humanProducts, ...animalProducts]

  // Filter products
  const getFilteredProducts = () => {
    let filtered = selectedCategory === 'all' ? allProducts : allProducts.filter(p => p.category === selectedCategory)
    
    // Sort products
    switch(sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price)
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price)
      case 'name':
        return filtered.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return filtered
    }
  }

  const filteredProducts = getFilteredProducts()

  const handleAddToCart = (productId) => {
    console.log(`Added product ${productId} to cart`)
    setIsCartOpen(true)
  }

  const handleBuyNow = (productId) => {
    console.log(`Buying product ${productId} now`)
    router.push('/checkout')
  }

  const handleProductClick = (productId) => {
    router.push('/product_ind')
  }

  const handleCloseCart = () => setIsCartOpen(false)

  return (
    <>
      <Navbar />
      <section
        className="relative min-h-[40vh] flex items-center justify-center text-center px-4 pt-20"
        style={{ background: 'linear-gradient(135deg, #1a3a32 0%, #2d5a52 35%, #1e4d6b 70%, #0f2e3d 100%)' }}
      >
        <div className="relative z-10 max-w-4xl mx-auto py-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4 leading-tight" style={{ fontFamily: "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto", fontWeight: 800 }}>
            Our Products
          </h1>
          <p className="text-lg sm:text-xl text-emerald-100 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto", fontWeight: 500 }}>
            Browse our Spiruboost collection — premium nutrition for everyday vitality.
          </p>
        </div>
      </section>

      <div className="min-h-screen bg-linear-to-br from-[#fcfcfb] via-[#f3fbf4] to-[#eef9ee]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 max-w-7xl">
          {/* Filter and Sort Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-300">
            {/* Left - Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Filter by:</span>
              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-all"
                >
                  <span className="text-sm font-medium">
                    {selectedCategory === 'all' ? 'All Products' : selectedCategory === 'human' ? 'Human Wellness' : 'Animal Wellness'}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilterMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {showFilterMenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        setSelectedCategory('all')
                        setShowFilterMenu(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b border-gray-200"
                    >
                      All Products ({allProducts.length})
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory('human')
                        setShowFilterMenu(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b border-gray-200"
                    >
                      Human Wellness ({humanProducts.length})
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory('animal')
                        setShowFilterMenu(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Animal Wellness ({animalProducts.length})
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right - Sort */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Sort by:</span>
              <div className="relative">
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-all"
                >
                  <span className="text-sm font-medium">
                    {sortBy === 'newest' && 'Newest'}
                    {sortBy === 'price-low' && 'Price: Low to High'}
                    {sortBy === 'price-high' && 'Price: High to Low'}
                    {sortBy === 'name' && 'Name: A to Z'}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
                </button>

                {showSortMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        setSortBy('newest')
                        setShowSortMenu(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b border-gray-200"
                    >
                      Newest
                    </button>
                    <button
                      onClick={() => {
                        setSortBy('price-low')
                        setShowSortMenu(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b border-gray-200"
                    >
                      Price: Low to High
                    </button>
                    <button
                      onClick={() => {
                        setSortBy('price-high')
                        setShowSortMenu(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b border-gray-200"
                    >
                      Price: High to Low
                    </button>
                    <button
                      onClick={() => {
                        setSortBy('name')
                        setShowSortMenu(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Name: A to Z
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6 text-sm text-gray-600">
            Showing {filteredProducts.length} products
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onProductClick={handleProductClick}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 font-light italic text-lg sm:text-xl tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                No products found in this category
              </p>
            </div>
          )}
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={handleCloseCart} />
      <Footer />
    </>
  )
}

