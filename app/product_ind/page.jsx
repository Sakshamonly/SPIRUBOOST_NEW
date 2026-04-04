"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/usable/navbar";
import Footer from "../components/usable/footer";
import CartSidebar from "../components/usable/cart";
import { Button } from "../components/ui/button";
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

      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[1, 2, 3, 4].map((star) => (
            <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
          <Star className="w-5 h-5 text-gray-300" />
        </div>
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
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <span className="text-gray-900 font-medium">Quantity:</span>
        <div className="flex items-center border text-gray-900 rounded-lg w-fit">
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
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-3 md:hidden w-full">
          <Button
            onClick={() => onAddToCart(product, quantity)}
            className="flex items-center justify-center gap-2 h-12 px-4 text-base font-medium bg-white text-black border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 flex-1 rounded"
            disabled={Number(product.countInStock || 0) <= 0}
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </Button>
          <Button
            onClick={() => onAddToWishlist(product)}
            className="h-12 w-12 border border-gray-300 bg-white hover:bg-black hover:border-black transition-all duration-200 flex items-center justify-center rounded"
          >
            <Heart className="w-5 h-5 text-black hover:text-white" />
          </Button>
        </div>

        <Button
          onClick={() => onBuyNow(product, quantity)}
          className="md:hidden h-12 text-base font-medium bg-gray-200 text-black border border-black hover:bg-black hover:text-white transition-all duration-200 w-full rounded"
          disabled={product.countInStock <= 0}
        >
          Order Now
        </Button>

        <div className="hidden md:flex gap-4 w-full">
          <Button
            onClick={() => onAddToCart(product, quantity)}
            className="flex items-center justify-center gap-2 h-12 px-6 text-base font-medium bg-white text-black border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 flex-1 rounded"
            disabled={Number(product.countInStock || 0) <= 0}
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </Button>

          <Button
            onClick={() => onBuyNow(product, quantity)}
            className="h-12 text-base font-medium bg-white text-black border border-black hover:bg-black hover:text-white transition-all duration-200 flex-1 rounded"
            disabled={Number(product.countInStock || 0) <= 0}
          >
            Order Now
          </Button>
        </div>
      </div>
    </div>
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

  return (
    <div className="w-full md:w-1/2 space-y-4">
      <div
        className="bg-gray-200 rounded-2xl cursor-pointer hover:bg-gray-300 transition-colors overflow-hidden h-[350px] md:h-[500px]"
        onClick={() => setIsFullscreen(true)}
      >
        <img
          src={productImages[selectedImage] || "/placeholder.svg"}
          alt={product?.name || "Product image"}
          className="w-full h-full object-cover"
        />
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
            <img
              src={image || "/placeholder.svg"}
              alt={`Product view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 overflow-auto"
          onClick={() => {
            setIsFullscreen(false);
            setZoomLevel(1);
          }}
        >
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
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
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
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
        </div>

        <div className="my-6 md:my-8">
          <hr className="border-blue-200 border-2" />
        </div>
      </div>
    </div>
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      <div className="space-y-6 md:space-y-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">How to Use</h2>
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
        <div className="my-6 md:my-8">
          <hr className="border-blue-200 border-2" />
        </div>
      </div>
    </div>
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      <div className="space-y-6 md:space-y-8">
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
              </button>

              {openFAQ === index && (
                <div className="mt-3 pr-8">
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
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
}
