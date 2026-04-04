<<<<<<< HEAD
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/usable/navbar";
import Footer from "../components/usable/footer";
import CartSidebar from "../components/usable/cart";
import { Button } from "../components/ui/button";
=======
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Navbar from "../components/usable/navbar"
import Footer from "../components/usable/footer"
import CartSidebar from "../components/usable/cart"
import { Button } from "../components/ui/button"
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
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
<<<<<<< HEAD
} from "lucide-react";
import API from "../../lib/api";

const splitList = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || "").trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\n|•|·|;|\|/g)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const normalizeFaqs = (value) => {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === "string") {
        return { question: "", answer: item.trim() };
      }

      return {
        question: String(item?.question || "").trim(),
        answer: String(item?.answer || "").trim(),
      };
    })
    .filter((item) => item.question || item.answer);
};

const normalizeProduct = (data = {}) => {
  const images = []

  if (Array.isArray(data.images)) {
    images.push(...data.images.filter(Boolean))
  }

  if (data.image) images.push(data.image)
  if (data.mainImage) images.push(data.mainImage)

  const benefits = splitList(data.benefits || data.keyBenefits)
  const howToUse = Array.isArray(data.howToUse) ? data.howToUse : splitList(data.howToUse)

  return {
    id: data._id || data.id || "",
    _id: data._id || data.id || "",
    sku: data.sku || "",
    name: data.name || data.title || "Spiruboost Product",
    price: Number(data.price || data.salePrice || 0),
    mrp: Number(
      data.mrp ||
        data.compareAtPrice ||
        data.originalPrice ||
        Math.round(Number(data.price || data.salePrice || 0) * 1.25)
    ),
    overview: data.overview || data.shortDescription || "",
    benefits,
    keyBenefits: data.keyBenefits || benefits.join(" • "),
    description: data.description || "",
    howToUse,
    faq: normalizeFaqs(data.faq),
    image: images[0] || "https://via.placeholder.com/600x600?text=Product",
    images,
    countInStock:
      Number.isFinite(Number(data.countInStock))
        ? Number(data.countInStock)
        : Number.isFinite(Number(data.stock))
          ? Number(data.stock)
          : 0,
    quantitySold: Number(data.quantitySold ?? data.soldCount ?? 0),
    category: data.category || "human",
    status: data.status || (data.isActive === false ? "inactive" : "active"),
    isActive: data.isActive !== false,
    rating: Number(data.rating || 4.8),
    reviewsCount: Number(data.reviewsCount || data.totalReviews || 124),
  }
};

function ProductInfo({ product, onAddToCart, onAddToWishlist, onBuyNow }) {
  const [quantity, setQuantity] = useState(1);
  const benefits = useMemo(
    () => splitList(product?.benefits || product?.keyBenefits),
    [product?.benefits, product?.keyBenefits]
  );

  if (!product) return null;

  return (
    <div className="w-full md:w-1/2 space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        {product.name || "Spiruboost Product"}
      </h1>
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174

      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[1, 2, 3, 4].map((star) => (
            <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
          <Star className="w-5 h-5 text-gray-300" />
        </div>
<<<<<<< HEAD
        <span className="text-base text-gray-600 ml-2">
          {Number(product.rating || 4.8).toFixed(1)} ({product.reviewsCount || 124} reviews)
        </span>
      </div>

      {product.overview && (
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg">
          <p className="text-sm font-semibold text-emerald-700 mb-1">Overview</p>
          <p className="text-gray-700 leading-relaxed">{product.overview}</p>
        </div>
      )}

      <p className="text-gray-700 text-lg leading-relaxed">
        {product.description ||
          "This product is packed with premium nutrition and carefully processed to preserve maximum value."}
      </p>

      {benefits.length > 0 && (
        <div className="bg-blue-50 p-6 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Key Benefits</h3>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                <span className="text-base text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="text-3xl font-bold text-gray-900">₹{Number(product.price || 0).toLocaleString("en-IN")}</div>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${
            Number(product.countInStock || 0) > 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {Number(product.countInStock || 0) > 0
            ? `In Stock (${product.countInStock})`
            : "Out of Stock"}
        </div>
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <span className="text-gray-900 font-medium">Quantity:</span>
        <div className="flex items-center border text-gray-900 rounded-lg w-fit">
<<<<<<< HEAD
          <button
            onClick={() => setQuantity((p) => (p > 1 ? p - 1 : 1))}
            className="p-2 hover:bg-gray-100 transition-colors"
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 border-x border-gray-800 min-w-[60px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((p) => p + 1)}
            className="p-2 hover:bg-gray-100 transition-colors"
            disabled={
              Number(product.countInStock || 0) <= 0 ||
              quantity >= Number(product.countInStock || 0)
            }
          >
=======
          <button onClick={decreaseQuantity} className="p-2 hover:bg-gray-100 transition-colors" disabled={quantity <= 1}>
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 border-x border-gray-800 min-w-[60px] text-center">{quantity}</span>
          <button onClick={increaseQuantity} className="p-2 hover:bg-gray-100 transition-colors">
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
<<<<<<< HEAD
        <div className="flex gap-3 md:hidden w-full">
          <Button
            onClick={() => onAddToCart(product, quantity)}
            className="flex items-center justify-center gap-2 h-12 px-4 text-base font-medium bg-white text-black border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 flex-1 rounded"
            disabled={Number(product.countInStock || 0) <= 0}
=======
        {/* Mobile View */}
        <div className="flex gap-3 md:hidden w-full">
          <Button
            onClick={() => onAddToCart(productId, quantity)}
            className="flex items-center justify-center gap-2 h-12 px-4 text-base font-medium bg-white text-black border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 flex-1 rounded"
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </Button>
          <Button
<<<<<<< HEAD
            onClick={() => onAddToWishlist(product)}
=======
            onClick={() => onAddToWishlist(productId)}
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
            className="h-12 w-12 border border-gray-300 bg-white hover:bg-black hover:border-black transition-all duration-200 flex items-center justify-center rounded"
          >
            <Heart className="w-5 h-5 text-black hover:text-white" />
          </Button>
        </div>

        <Button
<<<<<<< HEAD
          onClick={() => onBuyNow(product, quantity)}
          className="md:hidden h-12 text-base font-medium bg-gray-200 text-black border border-black hover:bg-black hover:text-white transition-all duration-200 w-full rounded"
          disabled={product.countInStock <= 0}
=======
          onClick={() => onBuyNow(productId, quantity)}
          className="md:hidden h-12 text-base font-medium bg-gray-200 text-black border border-black hover:bg-black hover:text-white transition-all duration-200 w-full rounded"
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
        >
          Order Now
        </Button>

<<<<<<< HEAD
        <div className="hidden md:flex gap-4 w-full">
          <Button
            onClick={() => onAddToCart(product, quantity)}
            className="flex items-center justify-center gap-2 h-12 px-6 text-base font-medium bg-white text-black border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 flex-1 rounded"
            disabled={Number(product.countInStock || 0) <= 0}
=======
        {/* Desktop View */}
        <div className="hidden md:flex gap-4 w-full">
          <Button
            onClick={() => onAddToCart(productId, quantity)}
            className="flex items-center justify-center gap-2 h-12 px-6 text-base font-medium bg-white text-black border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 flex-1 rounded"
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </Button>

          <Button
<<<<<<< HEAD
            onClick={() => onBuyNow(product, quantity)}
            className="h-12 text-base font-medium bg-white text-black border border-black hover:bg-black hover:text-white transition-all duration-200 flex-1 rounded"
            disabled={Number(product.countInStock || 0) <= 0}
=======
            onClick={() => onBuyNow(productId, quantity)}
            className="h-12 text-base font-medium bg-white text-black border border-black hover:bg-black hover:text-white transition-all duration-200 flex-1 rounded"
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
          >
            Order Now
          </Button>
        </div>
      </div>
    </div>
<<<<<<< HEAD
  );
}

function ProductImageGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const productImages =
    product?.images?.length > 0
      ? product.images
      : product?.image
      ? [product.image]
      : ["/placeholder.svg"];
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174

  return (
    <div className="w-full md:w-1/2 space-y-4">
      <div
        className="bg-gray-200 rounded-2xl cursor-pointer hover:bg-gray-300 transition-colors overflow-hidden h-[350px] md:h-[500px]"
        onClick={() => setIsFullscreen(true)}
      >
<<<<<<< HEAD
        <img
          src={productImages[selectedImage] || "/placeholder.svg"}
          alt={product?.name || "Product image"}
          className="w-full h-full object-cover"
        />
=======
        <img src={productImages[selectedImage] || "/placeholder.svg"} alt="Spiruboost Capsule - Main product view" className="w-full h-full object-cover" />
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
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
<<<<<<< HEAD
            <img
              src={image || "/placeholder.svg"}
              alt={`Product view ${index + 1}`}
              className="w-full h-full object-cover"
            />
=======
            <img src={image || "/placeholder.svg"} alt={`Product view ${index + 1}`} className="w-full h-full object-cover" />
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
          </div>
        ))}
      </div>

      {isFullscreen && (
<<<<<<< HEAD
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 overflow-auto"
          onClick={() => {
            setIsFullscreen(false);
            setZoomLevel(1);
          }}
        >
=======
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 overflow-auto" onClick={handleCloseFullscreen}>
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
<<<<<<< HEAD
                alt={product?.name || "Product fullscreen"}
                className="max-w-none transition-transform duration-200 max-h-[90vh] w-auto"
                style={{ transform: `scale(${zoomLevel})` }}
              />

              <div className="absolute top-4 left-4 flex gap-2">
                <button
                  className="text-white bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomLevel((p) => Math.min(p + 0.5, 3));
                  }}
                  disabled={zoomLevel >= 3}
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  className="text-white bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomLevel((p) => Math.max(p - 0.5, 0.5));
                  }}
                  disabled={zoomLevel <= 0.5}
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
              </div>

              <button
                className="absolute top-4 right-4 text-white bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition-colors"
                onClick={() => {
                  setIsFullscreen(false);
                  setZoomLevel(1);
                }}
              >
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
<<<<<<< HEAD
  );
}

function ProductDescription({ product }) {
  const paragraphs = useMemo(() => {
    return String(product?.description || "")
      .split(/\n+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }, [product?.description]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      <div className="space-y-6 md:space-y-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Product Description
          </h2>
          {product?.overview && (
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
              {product.overview}
            </p>
          )}
          <div className="prose prose-gray max-w-none">
            {paragraphs.length > 0 ? (
              paragraphs.map((para, index) => (
                <p key={index} className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                  {para}
                </p>
              ))
            ) : (
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                This product has been added to the live catalog.
              </p>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Quantity sold: {product?.quantitySold || 0}
          </p>
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
        </div>

        <div className="my-6 md:my-8">
          <hr className="border-blue-200 border-2" />
        </div>
      </div>
    </div>
<<<<<<< HEAD
  );
}

function HowToUse({ steps }) {
  const fallbackSteps = [
    { number: 1, title: "Take with Water", description: "Use as directed with water" },
    { number: 2, title: "Best Time", description: "Take at a consistent time each day" },
    { number: 3, title: "Daily Routine", description: "Be consistent for best results" },
  ];

  const parsedSteps = (steps && steps.length > 0 ? steps : fallbackSteps).map((step, index) => {
    if (typeof step === "string") {
      return {
        number: index + 1,
        title: `Step ${index + 1}`,
        description: step,
      };
    }

    return {
      number: index + 1,
      title: step.title || `Step ${index + 1}`,
      description: step.description || String(step || ""),
    };
  });
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      <div className="space-y-6 md:space-y-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">How to Use</h2>
<<<<<<< HEAD
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {parsedSteps.map((step) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                {step.number}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-700 text-base md:text-lg">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
=======

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

>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
        <div className="my-6 md:my-8">
          <hr className="border-blue-200 border-2" />
        </div>
      </div>
    </div>
<<<<<<< HEAD
  );
}

function FAQSection({ faqs }) {
  const [openFAQ, setOpenFAQ] = useState(null);

  const fallbackFaqs = [
    {
      question: "What is this product?",
      answer: "It is a live catalog product synced from the backend.",
    },
    {
      question: "How do I use it?",
      answer: "Follow the instructions shown in the How to Use section.",
    },
  ];

  const parsedFaqs = (faqs && faqs.length > 0 ? faqs : fallbackFaqs).map((faq) => ({
    question: faq.question || "Question",
    answer: faq.answer || "",
  }));
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      <div className="space-y-6 md:space-y-8">
<<<<<<< HEAD
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {parsedFaqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full text-left flex items-center justify-between gap-4 py-2 hover:text-blue-600 transition-colors"
              >
                <h3 className="text-base md:text-lg font-medium text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
=======
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button onClick={() => toggleFAQ(index)} className="w-full text-left flex items-center justify-between gap-4 py-2 hover:text-blue-600 transition-colors">
                <h3 className="text-base md:text-lg font-medium text-gray-900 pr-4">{faq.question}</h3>
                {openFAQ === index ? <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />}
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
              </button>

              {openFAQ === index && (
                <div className="mt-3 pr-8">
<<<<<<< HEAD
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </p>
=======
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">{faq.answer}</p>
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
<<<<<<< HEAD
  );
}

function ProductDetail({ product, onAddToCart, onAddToWishlist, onBuyNow }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
      <div className="mb-4 md:mb-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <ProductImageGallery product={product} />
        <ProductInfo
          product={product}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          onBuyNow={onBuyNow}
        />
      </div>

      <div className="mt-8 md:mt-12 mb-6 md:mb-8">
        <hr className="border-blue-200 border-2" />
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      setError("Product not found.");
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        try {
          const response = await API.get(`/products/${productId}`);
          const data = response.data?.product || response.data;
          setProduct(normalizeProduct(data));
        } catch (primaryError) {
          const listResponse = await API.get("/products");
          const products = Array.isArray(listResponse.data) ? listResponse.data : [];
          const matchedProduct = products.find(
            (item) => String(item._id || item.id) === String(productId)
          );

          if (!matchedProduct) {
            throw primaryError;
          }

          setProduct(normalizeProduct(matchedProduct));
        }
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = (selectedProduct, quantity = 1) => {
    if (!selectedProduct) return;

    const existingCart =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("cartItems") || "[]")
        : [];

    const existingItem = existingCart.find(
      (item) => String(item.id) === String(selectedProduct.id)
    );
    const stockLimit = Number(selectedProduct.countInStock || 0);
    const currentQuantity = Number(existingItem?.quantity || 0);
    const nextQuantity = stockLimit > 0 ? Math.min(currentQuantity + quantity, stockLimit) : currentQuantity + quantity;

    if (existingItem && currentQuantity >= nextQuantity) {
      setIsCartOpen(true);
      return;
    }

    const updatedCart = existingItem
      ? existingCart.map((item) =>
          String(item.id) === String(selectedProduct.id)
            ? { ...item, quantity: nextQuantity }
            : item
        )
      : [
          ...existingCart,
          {
            ...selectedProduct,
            quantity: stockLimit > 0 ? Math.min(quantity, stockLimit) : quantity,
          },
        ];

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    localStorage.removeItem("buyNowItem");
    localStorage.removeItem("checkoutItem");
    setIsCartOpen(true);
  };

  const handleAddToWishlist = (selectedProduct) => {
    if (!selectedProduct) return;

    const existingWishlist =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("wishlistItems") || "[]")
        : [];

    const alreadyExists = existingWishlist.find(
      (item) => String(item.id) === String(selectedProduct.id)
    );

    if (!alreadyExists) {
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify([...existingWishlist, selectedProduct])
      );
    }
  };

  const handleBuyNow = (selectedProduct, quantity = 1) => {
    if (!selectedProduct) return;

    localStorage.setItem(
      "buyNowItem",
      JSON.stringify({
        ...selectedProduct,
        quantity,
      })
    );

    router.push("/checkout");
  };
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
<<<<<<< HEAD
        {loading && (
          <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">
            Loading product...
          </div>
        )}

        {!loading && error && (
          <div className="max-w-7xl mx-auto px-4 py-16 text-center text-red-500">
            {error}
          </div>
        )}

        {!loading && !error && product && (
          <>
            <ProductDetail
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              onBuyNow={handleBuyNow}
            />
            <ProductDescription product={product} />
            <HowToUse steps={product.howToUse} />
            <FAQSection faqs={product.faq} />
          </>
        )}
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />
    </>
  );
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
}
