"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Navbar from "../components/usable/navbar"
import Footer from "../components/usable/footer"
import CartSidebar from "../components/usable/cart"
import { Button } from "../components/ui/button"
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  ZoomIn,
  ZoomOut,
  X,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

/*
  Combined product detail page.
  All subcomponents are defined below and kept local to avoid extra files.
  Design and behavior preserved; repetitive/duplicate code removed.
*/

function ProductInfo({ productId, onAddToCart, onAddToWishlist, onBuyNow }) {
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => setQuantity((p) => p + 1)
  const decreaseQuantity = () => setQuantity((p) => (p > 1 ? p - 1 : 1))

  return (
    <div className="w-full md:w-1/2 space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Spiruboost Capsule</h1>

      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[1, 2, 3, 4].map((star) => (
            <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
          <Star className="w-5 h-5 text-gray-300" />
        </div>
        <span className="text-base text-gray-600 ml-2">4.8 (124 reviews)</span>
      </div>

      <p className="text-gray-700 text-lg leading-relaxed">
        Spirulina Capsules are packed with high-quality plant protein, iron, antioxidants, and essential
        vitamins. Sourced from pure Spirulina platensis, these capsules are carefully processed to preserve
        maximum nutrition.
      </p>

      <div className="bg-blue-50 p-6 rounded-lg space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Key Benefits</h3>
        <ul className="space-y-3">
          {[
            "Boosts Immunity & Stamina",
            "Rich in Protein (60-70%) & B12",
            "Detoxifies body naturally",
            "100% Vegan & Free from additives",
            "Supports skin glow & hair health",
          ].map((benefit, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
              <span className="text-base text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="text-3xl font-bold text-gray-900">₹799</div>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium w-fit">In Stock</div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <span className="text-gray-900 font-medium">Quantity:</span>
        <div className="flex items-center border text-gray-900 rounded-lg w-fit">
          <button onClick={decreaseQuantity} className="p-2 hover:bg-gray-100 transition-colors" disabled={quantity <= 1}>
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 border-x border-gray-800 min-w-[60px] text-center">{quantity}</span>
          <button onClick={increaseQuantity} className="p-2 hover:bg-gray-100 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {/* Mobile View */}
        <div className="flex gap-3 md:hidden w-full">
          <Button
            onClick={() => onAddToCart(productId, quantity)}
            className="flex items-center justify-center gap-2 h-12 px-4 text-base font-medium bg-white text-black border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 flex-1 rounded"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </Button>
          <Button
            onClick={() => onAddToWishlist(productId)}
            className="h-12 w-12 border border-gray-300 bg-white hover:bg-black hover:border-black transition-all duration-200 flex items-center justify-center rounded"
          >
            <Heart className="w-5 h-5 text-black hover:text-white" />
          </Button>
        </div>

        <Button
          onClick={() => onBuyNow(productId, quantity)}
          className="md:hidden h-12 text-base font-medium bg-gray-200 text-black border border-black hover:bg-black hover:text-white transition-all duration-200 w-full rounded"
        >
          Order Now
        </Button>

        {/* Desktop View */}
        <div className="hidden md:flex gap-4 w-full">
          <Button
            onClick={() => onAddToCart(productId, quantity)}
            className="flex items-center justify-center gap-2 h-12 px-6 text-base font-medium bg-white text-black border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 flex-1 rounded"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </Button>

          <Button
            onClick={() => onBuyNow(productId, quantity)}
            className="h-12 text-base font-medium bg-white text-black border border-black hover:bg-black hover:text-white transition-all duration-200 flex-1 rounded"
          >
            Order Now
          </Button>
        </div>
      </div>
    </div>
  )
}

function ProductImageGallery({ productId }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  const productImages = [
    "/spirulina-supplement-bottle-main-view.png",
    "/spirulina-supplement-bottle-side-view.png",
    "/spirulina-supplement-bottle-back-label.png",
    "/spirulina-supplement-bottle-ingredients.png",
    "/spirulina-supplement-bottle-nutrition-facts.png",
  ]

  const handleZoomIn = (e) => {
    e.stopPropagation()
    setZoomLevel((p) => Math.min(p + 0.5, 3))
  }

  const handleZoomOut = (e) => {
    e.stopPropagation()
    setZoomLevel((p) => Math.max(p - 0.5, 0.5))
  }

  const handleCloseFullscreen = () => {
    setIsFullscreen(false)
    setZoomLevel(1)
  }

  return (
    <div className="w-full md:w-1/2 space-y-4">
      <div
        className="bg-gray-200 rounded-2xl cursor-pointer hover:bg-gray-300 transition-colors overflow-hidden h-[350px] md:h-[500px]"
        onClick={() => setIsFullscreen(true)}
      >
        <img src={productImages[selectedImage] || "/placeholder.svg"} alt="Spiruboost Capsule - Main product view" className="w-full h-full object-cover" />
      </div>

      <div className="flex gap-2">
        {productImages.map((image, index) => (
          <div
            key={index}
            className={`flex-1 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors border-2 overflow-hidden h-20 md:h-24 ${
              selectedImage === index ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <img src={image || "/placeholder.svg"} alt={`Product view ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 overflow-auto" onClick={handleCloseFullscreen}>
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt="Spiruboost Capsule - Fullscreen view"
                className="max-w-none transition-transform duration-200 max-h-[90vh] w-auto"
                style={{ transform: `scale(${zoomLevel})`, cursor: zoomLevel > 1 ? "grab" : "default" }}
              />

              <div className="absolute top-4 left-4 flex gap-2">
                <button className="text-white bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition-colors" onClick={handleZoomIn} disabled={zoomLevel >= 3}>
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button className="text-white bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition-colors" onClick={handleZoomOut} disabled={zoomLevel <= 0.5}>
                  <ZoomOut className="w-5 h-5" />
                </button>
                <div className="text-white bg-black bg-opacity-70 rounded-full px-3 py-2 text-sm">{Math.round(zoomLevel * 100)}%</div>
              </div>

              <button className="absolute top-4 right-4 text-white bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition-colors" onClick={handleCloseFullscreen}>
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ProductDetail({ productId, onAddToCart, onAddToWishlist, onBuyNow }) {
  const handleBackClick = () => window.history.back()

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
      <div className="mb-4 md:mb-8">
        <button onClick={handleBackClick} className="flex items-center gap-2 text-orange-500 hover:text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-lg transition-all duration-200 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <ProductImageGallery productId={productId} />
        <ProductInfo productId={productId} onAddToCart={onAddToCart} onAddToWishlist={onAddToWishlist} onBuyNow={onBuyNow} />
      </div>

      <div className="mt-8 md:mt-12 mb-6 md:mb-8">
        <hr className="border-blue-200 border-2" />
      </div>
    </div>
  )
}

function ProductDescription() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      <div className="space-y-6 md:space-y-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
              Spiruboost Capsules contain premium quality Spirulina platensis, a blue-green algae that has been
              recognized as one of nature's most complete superfoods. Each capsule is carefully formulated to deliver
              maximum nutritional benefits while maintaining the highest quality standards.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
              Our Spirulina is sourced from pristine cultivation environments and processed using advanced techniques
              that preserve its natural potency. Rich in complete proteins, essential amino acids, vitamins B12, iron,
              and powerful antioxidants like phycocyanin, these capsules support overall health and vitality.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Perfect for vegetarians and vegans looking to supplement their diet with high-quality plant-based
              nutrition. Each bottle contains 90 capsules, providing a month's supply when taken as directed.
            </p>
          </div>
        </div>

        <div className="my-6 md:my-8">
          <hr className="border-blue-200 border-2" />
        </div>
      </div>
    </div>
  )
}

function HowToUse() {
  const steps = [
    { number: 1, title: "Take with Water", description: "Take 2-3 capsules with a full glass of water" },
    { number: 2, title: "Best Time", description: "Consume 30 minutes before meals for optimal absorption" },
    { number: 3, title: "Daily Routine", description: "Take consistently at the same time each day" },
    { number: 4, title: "Stay Hydrated", description: "Drink plenty of water throughout the day" },
    { number: 5, title: "Monitor Progress", description: "Track your energy levels and overall well-being" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      <div className="space-y-6 md:space-y-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">How to Use</h2>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step) => (
              <div key={step.number} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                  {step.number}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-700 text-base md:text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-6 md:my-8">
          <hr className="border-blue-200 border-2" />
        </div>
      </div>
    </div>
  )
}

function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqs = [
    {
      question: "What is Spirulina and why should I take it?",
      answer:
        "Spirulina is a blue-green algae that's considered one of the most nutritionally complete superfoods. It's rich in protein, vitamins, minerals, and antioxidants that support overall health, boost immunity, and increase energy levels.",
    },
    {
      question: "How many capsules should I take daily?",
      answer:
        "We recommend taking 2-3 capsules daily, preferably 30 minutes before meals. Start with 1-2 capsules to allow your body to adjust, then gradually increase to the recommended dosage.",
    },
    {
      question: "Are there any side effects?",
      answer:
        "Spirulina is generally safe for most people. Some may experience mild digestive discomfort initially. If you have autoimmune conditions or are taking medications, consult your healthcare provider before use.",
    },
    {
      question: "Is this product suitable for vegetarians and vegans?",
      answer: "Yes, our Spiruboost Capsules are 100% plant-based and suitable for both vegetarians and vegans. They contain no animal-derived ingredients or additives.",
    },
    {
      question: "How long does one bottle last?",
      answer: "Each bottle contains 90 capsules. When taking the recommended 2-3 capsules daily, one bottle will last approximately 30-45 days.",
    },
  ]

  const toggleFAQ = (index) => setOpenFAQ(openFAQ === index ? null : index)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      <div className="space-y-6 md:space-y-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button onClick={() => toggleFAQ(index)} className="w-full text-left flex items-center justify-between gap-4 py-2 hover:text-blue-600 transition-colors">
                <h3 className="text-base md:text-lg font-medium text-gray-900 pr-4">{faq.question}</h3>
                {openFAQ === index ? <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />}
              </button>

              {openFAQ === index && (
                <div className="mt-3 pr-8">
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params?.productId

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)

  const handleAddToCart = (id, quantity = 1) => {
    console.log(`Added product ${id} to cart with quantity ${quantity}`)
    setIsCartOpen(true)
  }

  const handleAddToWishlist = (id) => {
    console.log(`Added product ${id} to wishlist`)
    setIsWishlistOpen(true)
  }

  const handleBuyNow = (id, quantity = 1) => {
    console.log(`Buying product ${id} now with quantity ${quantity}`)
    router.push('/checkout')
  }

  const handleCloseCart = () => setIsCartOpen(false)
  const handleCloseWishlist = () => setIsWishlistOpen(false)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"

    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in")
          entry.target.classList.remove("opacity-0", "translate-y-8")
        } else {
          entry.target.classList.remove("animate-fade-in")
          entry.target.classList.add("opacity-0", "translate-y-8")
        }
      })
    }, observerOptions)

    const sections = Array.from(document.querySelectorAll(".scroll-animate"))
    sections.forEach((s) => observer.observe(s))

    return () => sections.forEach((s) => observer.unobserve(s))
  }, [])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <style jsx global>{`
          .scroll-animate {
            opacity: 0;
            transform: translateY(32px);
            transition: all 0.6s ease-out;
          }
          .animate-fade-in {
            opacity: 1;
            transform: translateY(0);
          }
          @media (max-width: 768px) {
            .scroll-animate { transform: translateY(16px); transition: all 0.5s ease-out; }
            * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
            img { image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges; }
          }
        `}</style>

        <div className="scroll-animate">
          <ProductDetail productId={productId} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} onBuyNow={handleBuyNow} />
        </div>

        <div className="scroll-animate">
          <ProductDescription />
        </div>

        <div className="scroll-animate">
          <HowToUse />
        </div>

        <div className="scroll-animate">
          <FAQSection />
        </div>
      </div>

      {/* <Footer /> */}

      <CartSidebar isOpen={isCartOpen} onClose={handleCloseCart} />
      <Footer />
    </>
  )
}
