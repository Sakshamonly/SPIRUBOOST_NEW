'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from './components/usable/navbar';
import Footer from './components/usable/footer';
import CartSidebar from './components/usable/cart';
import { ProductCard } from './components/usable/product-card';
import Link from 'next/link';
import API from '../lib/api';

export default function SpiruboostLanding() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const styles = `
    html {
      scroll-behavior: smooth;
    }
    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto;
      }
    }
    .hero-bg {
      background-attachment: fixed;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    @media (max-width: 1024px) {
      .hero-bg {
        background-attachment: scroll;
      }
    }
    @media (max-width: 768px) {
      .hero-bg {
        background-size: cover;
        background-position: center;
        min-height: 100vh;
      }
    }
    .cta-hero-bg {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 700ms ease, transform 700ms ease;
      will-change: opacity, transform;
      background-attachment: fixed;
    }
    .cta-hero-bg.in-view {
      opacity: 1;
      transform: translateY(0);
    }
    @media (max-width: 1024px) {
      .cta-hero-bg {
        background-attachment: scroll;
      }
    }
  `;

  const features = [
    {
      title: 'Daily Nutrition Gap',
      description:
        'Modern lifestyles and fast-paced eating habits often leave essential nutrients missing from our daily diet. Even regular meals may not provide the complete balance of proteins, vitamins, minerals, and antioxidants the body needs for long-term wellness.',
    },
    {
      title: 'Hidden Malnutrition',
      description:
        'Across the world, millions of people consume enough calories but still suffer from hidden malnutrition due to nutrient-poor food choices and processed diets. This silent deficiency affects energy, immunity, focus, and overall health.',
    },
    {
      title: 'Spirulina as a Solution',
      description:
        'SpiruBoost uses nutrient-dense spirulina to help bridge these daily nutritional gaps. Rich in plant protein, antioxidants, phytonutrients, and essential micronutrients, it offers a simple way to support everyday wellness.',
    },
    {
      title: 'Better Health for All',
      description:
        'Our mission is to make better daily nutrition simple, accessible, and effective for everyone. We aim to support healthier lifestyles by helping people build strong wellness habits with trusted spirulina-based nutrition.',
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Power of Spirulina: Nature's Superfood",
      excerpt:
        'Discover how spirulina can boost your energy levels and improve overall health with our comprehensive guide.',
      author: 'Dr. Sarah Mitchell',
      date: 'March 28, 2026',
      image: '🌱',
    },
    {
      id: 2,
      title: 'Sustainable Farming Practices at Spiruboost',
      excerpt:
        "Learn how we're committed to eco-friendly production methods and environmental sustainability.",
      author: 'John Patterson',
      date: 'March 25, 2026',
      image: '🌾',
    },
  ];

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoadingProducts(true);
        const response = await API.get('/products');
        const products = Array.isArray(response.data) ? response.data : [];

        const normalized = products
          .filter((product) => product && (product.isActive !== false))
          .slice(0, 3)
          .map((product, index) => ({
            id: product._id || product.id || index + 1,
            name: product.name || 'Product',
            price: Number(product.price || 0),
            countInStock: Number(product.countInStock ?? product.stock ?? 0),
            image:
              product.image ||
              (Array.isArray(product.images) && product.images[0]) ||
              'https://via.placeholder.com/600x600?text=Product',
          }));

        setFeaturedProducts(normalized);
      } catch (error) {
        console.error('Failed to load featured products:', error);
        setFeaturedProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (productId) => {
    const selectedProduct = featuredProducts.find((p) => String(p.id) === String(productId));
    if (!selectedProduct) return;

    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = existingCart.find((item) => String(item.id) === String(selectedProduct.id));
    const stockLimit = Number(selectedProduct.countInStock || 0);
    const currentQuantity = Number(existingItem?.quantity || 0);
    const nextQuantity = stockLimit > 0 ? Math.min(currentQuantity + 1, stockLimit) : currentQuantity + 1;

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
      : [...existingCart, { ...selectedProduct, quantity: stockLimit > 0 ? Math.min(1, stockLimit) : 1 }];

    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    localStorage.removeItem('buyNowItem');
    localStorage.removeItem('checkoutItem');
    setIsCartOpen(true);
  };

  const handleBuyNow = (productId) => {
    const selectedProduct = featuredProducts.find((p) => String(p.id) === String(productId));
    if (!selectedProduct) return;

    localStorage.setItem(
      'buyNowItem',
      JSON.stringify({
        ...selectedProduct,
        quantity: 1,
      })
    );

    window.location.href = '/checkout';
  };

  const handleProductClick = (productId) => {
    window.location.href = `/product_ind?id=${productId}`;
  };

  const handleScrollPlatforms = (direction) => {
    const scroll = direction === 'left' ? -200 : 200;
    setScrollPosition(scrollPosition + scroll);
  };

  const ctaRef = useRef(null);
  const [ctaInView, setCtaInView] = useState(false);

  useEffect(() => {
    if (!ctaRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setCtaInView(entry.isIntersecting);
      },
      { threshold: 0.45 }
    );
    obs.observe(ctaRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-900">
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
          <div
            className="absolute inset-0 hero-bg w-full h-full"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.65) 0%, rgba(26, 77, 77, 0.6) 50%, rgba(15, 79, 60, 0.65) 100%), url('/home_hero.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'scroll',
              top: 0,
              left: 0,
            }}
          ></div>

          <div className="relative z-10 container mx-auto px-4 lg:px-8 py-20">
            <div className="flex items-center justify-center text-center">
              <div className="text-white space-y-6 max-w-5xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                  Closing the daily nutrition <span style={{ color: '#fde957' }}>with Spirulina</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-100 leading-relaxed text-balance">
                  Modern diets often miss essential nutrients despite regular meals. <br /> Spiru
                  <span style={{ color: '#fde957' }}>Boost</span> was created to help bridge this hidden nutrition gap with{' '}
                  <span style={{ color: '#e5aa0f' }}>premium spirulina</span> for daily energy, immunity, and overall wellness.
                </p>

                <div className="flex items-center justify-center gap-6 md:gap-8 pt-6 md:pt-8 flex-wrap">
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src="/revive.png"
                      alt="Revive"
                      className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
                    />
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <img
                      src="/Restore.png"
                      alt="Restore"
                      className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
                    />
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <img
                      src="/Recharge.png"
                      alt="Recharge"
                      className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="py-16 md:py-24 px-4"
          style={{
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f0ff 50%, #fff0e8 100%)',
          }}
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-900">
              Why We Exist
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6 md:space-y-8">
                {features.map((feature, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveFeature(idx)}
                    className={`w-full text-left pb-6 md:pb-8 border-b border-gray-300 transition-all duration-500 ${
                      activeFeature === idx ? 'opacity-100' : 'opacity-75 hover:opacity-90'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`text-3xl md:text-4xl font-bold transition-colors duration-500 ${
                          activeFeature === idx ? 'text-teal-600' : 'text-gray-300'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <h3
                          className={`font-bold text-lg md:text-xl mb-2 transition-colors duration-500 ${
                            activeFeature === idx ? 'text-gray-900' : 'text-gray-600'
                          }`}
                        >
                          {feature.title}
                        </h3>
                        <p
                          className={`text-gray-700 text-sm md:text-base leading-relaxed transition-all duration-500 lg:hidden ${
                            activeFeature === idx ? 'block' : 'hidden'
                          }`}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="hidden lg:block space-y-6 md:space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 transition-all duration-500 mb-4">
                    {features[activeFeature].title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-all duration-500 mb-4">
                    {features[activeFeature].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={ctaRef} className="relative py-16 md:py-24 px-4">
          <div
            className={`absolute inset-0 cta-hero-bg ${ctaInView ? 'in-view' : ''}`}
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.65) 0%, rgba(26, 77, 77, 0.6) 50%, rgba(15, 79, 60, 0.65) 100%), url('/home_hero.png')`,
            }}
          />

          <div className="relative z-10 container mx-auto max-w-6xl text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              Ready to Transform Your Health?
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto">
              Join thousands of satisfied customers who&apos;ve experienced the incredible benefits of Spiruboost
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-2">Our Collection</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                Featured Products
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the power of nature with our premium spirulina products
              </p>
            </div>

            {loadingProducts ? (
              <div className="text-center py-10 text-gray-600">Loading products...</div>
            ) : featuredProducts.length === 0 ? (
              <div className="text-center py-10 text-gray-600">No products available right now.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                {featuredProducts.map((product) => (
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

            <div className="flex justify-center">
              <Link
                href="/products"
                className="inline-block px-8 py-4 text-slate-900 font-bold transition-all duration-300 hover:bg-slate-900 hover:text-white border-2 border-slate-900 hover:border-slate-900 rounded-lg"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>

        <section
          className="py-16 md:py-24 px-4"
          style={{
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f0ff 50%, #e8f5e9 100%)',
          }}
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-2">Featured</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                Must Read Articles
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Explore insights about nutrition, wellness, and sustainable farming
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="group cursor-pointer">
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                    <div className="w-16 h-16 bg-linear-to-br from-teal-300 to-emerald-500 rounded-full flex items-center justify-center text-3xl mb-6">
                      {post.image}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-teal-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-base mb-6 leading-relaxed grow">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-gray-500 text-sm border-t border-gray-200 pt-4 mt-auto">
                      <div>
                        <span className="font-semibold text-gray-700">{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 group-hover:text-teal-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center">
              <Link
                href="/blog"
                className="inline-block px-8 py-4 text-slate-900 font-bold transition-all duration-300 hover:bg-slate-900 hover:text-white border-2 border-slate-900 hover:border-slate-900 rounded-lg"
              >
                Explore All Blogs
              </Link>
            </div>
          </div>
        </section>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />
    </>
  );
}
