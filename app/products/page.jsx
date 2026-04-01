"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { ProductCard } from "../components/usable/product-card"
import CartSidebar from "../components/usable/cart"
import Footer from "../components/usable/footer"
import Navbar from "../components/usable/navbar"

export default function ProductsPage() {
  const router = useRouter()
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Predefined product data (explicit names, prices and image URLs)
  const productsData = [
    { id: 1, name: 'Spiruboost Capsules', price: 499, image: 'https://5.imimg.com/data5/SELLER/Default/2022/10/WM/SG/QK/91285886/13-spirulina-1000x1000.jpg' },
    { id: 2, name: 'Spiruboost Tablets', price: 799, image: 'https://source.unsplash.com/800x600/?spirulina,tablet&sig=2' },
    { id: 3, name: 'Spiruboost Powder', price: 299, image: 'https://source.unsplash.com/800x600/?spirulina,powder&sig=3' },
    { id: 4, name: 'Spiruboost Gummies', price: 399, image: 'https://source.unsplash.com/800x600/?gummies,health&sig=4' },
    { id: 5, name: 'Spiruboost Liquid', price: 599, image: 'https://source.unsplash.com/800x600/?liquid,wellness&sig=5' },
    { id: 6, name: 'Spiruboost Mini', price: 149, image: 'https://source.unsplash.com/800x600/?supplement,mini&sig=6' },
    { id: 7, name: 'Spiruboost Plus', price: 999, image: 'https://source.unsplash.com/800x600/?superfood,boost&sig=7' },
    { id: 8, name: 'Spiruboost Max', price: 1299, image: 'https://source.unsplash.com/800x600/?nutrition,max&sig=8' },
    { id: 9, name: 'Spiruboost Starter Pack', price: 1499, image: 'https://source.unsplash.com/800x600/?package,starter&sig=9' },
    { id: 10, name: 'Spiruboost Family Pack', price: 2499, image: 'https://source.unsplash.com/800x600/?family,wellness&sig=10' },
    { id: 11, name: 'Spiruboost Travel Pack', price: 199, image: 'https://source.unsplash.com/800x600/?travel,pack&sig=11' },
    { id: 12, name: 'Spiruboost Premium', price: 1999, image: 'https://source.unsplash.com/800x600/?premium,spirulina&sig=12' },
  ]

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {productsData.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onProductClick={handleProductClick}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-400 font-light italic text-lg sm:text-xl tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
              More Products Coming Soon
            </p>
          </div>
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={handleCloseCart} />
      <Footer />
    </>
  )
}

