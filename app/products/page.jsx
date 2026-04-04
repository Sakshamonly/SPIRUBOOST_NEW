"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { ProductCard } from "../components/usable/product-card";
import CartSidebar from "../components/usable/cart";
import Footer from "../components/usable/footer";
import Navbar from "../components/usable/navbar";
import API from "../../lib/api";

export default function ProductsPage() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const normalizeCategory = (category, name = "") => {
    const raw = String(category || "").toLowerCase();
    const title = String(name || "").toLowerCase();

    if (
      raw.includes("animal") ||
      raw.includes("feed") ||
      raw.includes("poultry") ||
      raw.includes("livestock") ||
      title.includes("animal") ||
      title.includes("feed") ||
      title.includes("poultry") ||
      title.includes("livestock") ||
      title.includes("pet")
    ) {
      return "animal";
    }

    return "human";
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/products");
      const fetchedProducts = Array.isArray(response.data) ? response.data : [];

      const normalizedProducts = fetchedProducts.map((product, index) => ({
        id: product._id || product.id || index + 1,
        _id: product._id || product.id || index + 1,
        name: product.name || "Unnamed Product",
        sku: product.sku || `SKU-${index + 1}`,
        price: Number(product.price) || 0,
        image:
          product.image ||
          (Array.isArray(product.images) && product.images[0]) ||
          "https://via.placeholder.com/600x600?text=Product",
        images: Array.isArray(product.images) ? product.images.filter(Boolean) : [],
        category: normalizeCategory(product.category, product.name),
        description: product.description || "",
        overview: product.overview || "",
        keyBenefits: product.keyBenefits || "",
        howToUse: Array.isArray(product.howToUse) ? product.howToUse : [],
        faq: Array.isArray(product.faq) ? product.faq : [],
        countInStock:
          typeof product.countInStock === "number"
            ? product.countInStock
            : Number(product.stock || 0),
        quantitySold: Number(product.quantitySold || 0),
        status: product.status || (product.isActive === false ? "inactive" : "active"),
        isActive: product.isActive !== false,
      }));

      setProducts(normalizedProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(err?.response?.data?.message || "Unable to load products right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const humanProducts = products.filter((product) => product.category === "human");
  const animalProducts = products.filter((product) => product.category === "animal");
  const allProducts = products;

  const filteredProducts = useMemo(() => {
    let filtered =
      selectedCategory === "all"
        ? [...allProducts]
        : allProducts.filter((p) => p.category === selectedCategory);

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "newest":
      default:
        return filtered;
    }
  }, [allProducts, selectedCategory, sortBy]);

  const handleAddToCart = (productId) => {
    const selectedProduct = products.find(
      (product) => String(product.id) === String(productId)
    );

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
    const nextQuantity = stockLimit > 0 ? Math.min(currentQuantity + 1, stockLimit) : currentQuantity + 1;

    if (existingItem && currentQuantity >= nextQuantity) {
      setIsCartOpen(true);
      return;
    }

    let updatedCart = [];

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        String(item.id) === String(selectedProduct.id)
          ? { ...item, quantity: nextQuantity }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        { ...selectedProduct, quantity: stockLimit > 0 ? Math.min(1, stockLimit) : 1 },
      ];
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    localStorage.removeItem("buyNowItem");
    localStorage.removeItem("checkoutItem");
    setIsCartOpen(true);
  };

  const handleBuyNow = (productId) => {
    const selectedProduct = products.find(
      (product) => String(product.id) === String(productId)
    );

    if (!selectedProduct) return;

    localStorage.setItem(
      "buyNowItem",
      JSON.stringify({
        ...selectedProduct,
        quantity: 1,
      })
    );

    router.push("/checkout");
  };

  const handleProductClick = (productId) => {
    router.push(`/product_ind?id=${productId}`);
  };

  return (
    <>
      <Navbar />

      <section
        className="relative min-h-[40vh] flex items-center justify-center text-center px-4 pt-20"
        style={{
          background:
            "linear-gradient(135deg, #1a3a32 0%, #2d5a52 35%, #1e4d6b 70%, #0f2e3d 100%)",
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto py-20">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4 leading-tight"
            style={{
              fontFamily:
                "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto",
              fontWeight: 800,
            }}
          >
            Our Products
          </h1>
          <p
            className="text-lg sm:text-xl text-emerald-100 max-w-3xl mx-auto"
            style={{
              fontFamily:
                "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto",
              fontWeight: 500,
            }}
          >
            Browse our Spiruboost collection - premium nutrition for everyday vitality.
          </p>
        </div>
      </section>

      <div className="min-h-screen bg-linear-to-br from-[#fcfcfb] via-[#f3fbf4] to-[#eef9ee]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 max-w-7xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-300">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Filter by:</span>
              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-all"
                >
                  <span className="text-sm font-medium">
                    {selectedCategory === "all"
                      ? "All Products"
                      : selectedCategory === "human"
                      ? "Human Wellness"
                      : "Animal Wellness"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showFilterMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showFilterMenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        setSelectedCategory("all");
                        setShowFilterMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b border-gray-200"
                    >
                      All Products ({allProducts.length})
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory("human");
                        setShowFilterMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b border-gray-200"
                    >
                      Human Wellness ({humanProducts.length})
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory("animal");
                        setShowFilterMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Animal Wellness ({animalProducts.length})
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-all appearance-none pr-8"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            <button
              onClick={fetchProducts}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition"
            >
              Refresh
            </button>
          </div>

          {loading && (
            <div className="text-center py-20 text-gray-600">
              Loading products...
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-20 text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-20 text-gray-600">
              No products found.
            </div>
          )}

          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
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
          )}
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />
    </>
  );
}
