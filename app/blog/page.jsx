"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import Navbar from "../components/usable/navbar";
import Footer from "../components/usable/footer";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Add smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Power of Spirulina: Nature's Superfood",
      excerpt: "Discover how spirulina can boost your energy levels and improve overall health with our comprehensive guide.",
      author: "Dr. Sarah Mitchell",
      date: "March 28, 2026",
      category: "nutrition",
      image: "🌱",
      readTime: "5 min read",
      featured: true,
    },
    {
      id: 2,
      title: "Sustainable Farming Practices at Spiruboost",
      excerpt: "Learn how we're committed to eco-friendly production methods and environmental sustainability.",
      author: "John Patterson",
      date: "March 25, 2026",
      category: "farming",
      image: "🌾",
      readTime: "7 min read",
      featured: true,
    },
    {
      id: 3,
      title: "Moringa: The Miracle Tree and Its Benefits",
      excerpt: "Explore the incredible health benefits of moringa and why it's becoming a global wellness trend.",
      author: "Dr. Emily Rodriguez",
      date: "March 20, 2026",
      category: "wellness",
      image: "🍃",
      readTime: "6 min read",
      featured: false,
    },
    {
      id: 4,
      title: "How to Start Your Wellness Journey",
      excerpt: "A beginner's guide to incorporating superfoods into your daily diet for maximum health benefits.",
      author: "Lisa Chen",
      date: "March 18, 2026",
      category: "wellness",
      image: "💪",
      readTime: "8 min read",
      featured: false,
    },
    {
      id: 5,
      title: "Shilajit: The Ancient Ayurvedic Secret",
      excerpt: "Uncover the mysteries of this powerful resin and its proven health benefits backed by modern science.",
      author: "Dr. Raj Kumar",
      date: "March 15, 2026",
      category: "nutrition",
      image: "⚫",
      readTime: "6 min read",
      featured: false,
    },
    {
      id: 6,
      title: "Hair Care Secrets: Natural Solutions for Healthy Hair",
      excerpt: "Discover how our natural hair oils can transform your hair health without harsh chemicals.",
      author: "Michelle Brown",
      date: "March 12, 2026",
      category: "beauty",
      image: "✨",
      readTime: "5 min read",
      featured: false,
    },
  ];

  // Filter posts
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with Gradient Background */}
      <section 
        className="relative min-h-[70vh] md:min-h-[80vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{
          background: 'linear-gradient(135deg, #1a3a32 0%, #2d5a52 35%, #1e4d6b 70%, #0f2e3d 100%)'
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-tight">
            Stories & <span className="text-teal-300">Insights</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
            Discover articles about nutrition, wellness, sustainable farming, and natural beauty
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg focus:outline-none focus:border-white/60 transition-colors duration-300 text-white placeholder-white/60 font-light"
              />
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {[
              { name: "all", label: "All" },
              { name: "nutrition", label: "Nutrition" },
              { name: "wellness", label: "Wellness" },
              { name: "farming", label: "Farming" },
              { name: "beauty", label: "Beauty" },
            ].map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`text-xs sm:text-sm font-light tracking-wide transition-all duration-300 pb-2 px-2 ${
                  selectedCategory === category.name
                    ? "text-white border-b-2 border-teal-300"
                    : "text-white/70 hover:text-white border-b-2 border-transparent"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section with Off-White Gradient Background */}
      <section className="relative z-10 pt-16 md:pt-24 pb-24 bg-linear-to-br from-white/95 via-blue-50/40 to-green-50/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Posts */}
          {selectedCategory === "all" && (
            <div className="mb-32 md:mb-40">
              <div className="mb-16 md:mb-20">
                <p className="text-xs font-semibold tracking-widest text-teal-700 uppercase mb-4 md:mb-6">Featured</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                  Must Read Articles
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
                {featuredPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="mb-6 md:mb-8 overflow-hidden rounded-lg">
                      <div className="text-6xl md:text-7xl lg:text-8xl group-hover:scale-105 transition-transform duration-500">
                        {post.image}
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 group-hover:text-teal-700 transition-colors duration-300 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-700 font-light text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600">
                        <span className="font-semibold">{post.author}</span>
                        <span className="text-gray-400">•</span>
                        <span className="font-light">{post.date}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-teal-700 transition-all duration-300 group-hover:translate-x-2" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Posts Grid */}
          <div>
            {selectedCategory !== "all" && (
              <div className="mb-16 md:mb-20">
                <p className="text-xs font-semibold tracking-widest text-teal-700 uppercase mb-4 md:mb-6">
                  {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-12 md:mb-16">
                  {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Articles
                </h2>
              </div>
            )}

            {filteredPosts.length === 0 ? (
              <div className="text-center py-24 md:py-32">
                <p className="text-gray-700 font-light text-lg md:text-xl">No articles found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="group cursor-pointer flex flex-col h-full bg-white rounded-lg p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="mb-6 md:mb-8 overflow-hidden rounded">
                      <div className="text-5xl md:text-6xl group-hover:scale-110 transition-transform duration-500">
                        {post.image}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="mb-3 md:mb-4">
                        <p className="text-xs font-semibold tracking-widest text-teal-700 uppercase">
                          {post.category}
                        </p>
                      </div>
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-teal-700 transition-colors duration-300 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-700 font-light text-sm md:text-base leading-relaxed mb-6 md:mb-8 flex-1">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-gray-200">
                      <span className="text-xs text-gray-600 font-light">{post.readTime}</span>
                      <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-teal-700 transition-all duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-linear-to-br from-white via-blue-50/30 to-green-50/30 border-t border-gray-200/50 py-16 md:py-24 lg:py-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest text-teal-700 uppercase mb-4 md:mb-8">Subscribe</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 md:mb-12">
            Get updates delivered to your inbox
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 md:px-6 py-3 md:py-4 bg-white border-2 border-gray-300 focus:outline-none focus:border-teal-700 transition-colors duration-300 text-gray-900 placeholder-gray-400 font-light rounded-lg"
            />
            <button className="px-6 md:px-8 py-3 md:py-4 bg-teal-700 text-white font-semibold hover:bg-teal-800 transition-colors duration-300 whitespace-nowrap rounded-lg">
              Subscribe
            </button>
          </div>

          <p className="text-xs text-gray-600 font-light mt-4 md:mt-6">
            No spam, unsubscribe anytime
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
