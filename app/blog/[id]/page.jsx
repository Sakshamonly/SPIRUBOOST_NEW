"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Share2, Heart } from "lucide-react";
import { useParams } from "next/navigation";

const BlogDetail = () => {
  const params = useParams();
  const postId = parseInt(params.id);
  const [isLiked, setIsLiked] = useState(false);

  // Add smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // Blog posts data (same as in main blog page)
  const blogPosts = [
    {
      id: 1,
      title: "The Power of Spirulina: Nature's Superfood",
      excerpt: "Discover how spirulina can boost your energy levels and improve overall health with our comprehensive guide.",
      content: `Spirulina is one of the most nutrient-dense foods on the planet. Rich in protein, vitamins, and minerals, it has been used for centuries in traditional medicine.

      Spirulina is a blue-green algae that contains up to 70% protein, making it one of the most protein-rich foods available. It's also packed with:
      
      • Vitamin B12 - Essential for energy production and nervous system health
      • Iron - Crucial for oxygen transport and energy metabolism
      • Chlorophyll - A powerful antioxidant and natural detoxifier
      • Phycocyanin - A unique blue pigment with anti-inflammatory properties
      
      Research has shown that regular spirulina consumption can help improve energy levels, support immune function, and enhance overall wellness. Athletes and fitness enthusiasts have long used spirulina as a natural supplement to boost performance and recovery.
      
      Whether you're looking to improve your health, increase your energy, or simply add more nutrients to your diet, spirulina is an excellent choice. Our premium spirulina capsules are made from the highest quality algae and are easy to incorporate into your daily routine.`,
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
      content: `Our farms use cutting-edge sustainable agriculture techniques to ensure the highest quality products while protecting our planet.
      
      At Spiruboost, we believe that the health of our products is directly connected to the health of our planet. That's why we've implemented a comprehensive sustainability program across all of our farms.
      
      Our Commitment to Sustainability:
      
      • Organic Farming Methods - We use no synthetic pesticides or fertilizers
      • Water Conservation - Advanced irrigation systems reduce water usage by 40%
      • Soil Health - Crop rotation and composting maintain soil quality
      • Carbon Neutral Operations - All facilities run on renewable energy
      • Community Support - We work directly with local farming communities
      
      By choosing Spiruboost products, you're not just investing in your health—you're supporting sustainable farming practices that protect our environment for future generations.`,
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
      content: `Moringa is packed with antioxidants, anti-inflammatory compounds, and essential nutrients that support overall wellness.
      
      Known as the "Miracle Tree" in many parts of the world, moringa has been used in traditional medicine for thousands of years. Modern science is now validating what traditional healers have always known.
      
      Health Benefits of Moringa:
      
      • Anti-inflammatory Properties - Reduces inflammation throughout the body
      • High in Antioxidants - Protects cells from damage and aging
      • Supports Blood Sugar Control - Helps maintain healthy glucose levels
      • Rich in Essential Nutrients - Contains vitamins, minerals, and amino acids
      • Boosts Energy Naturally - Provides sustained energy without caffeine crashes
      
      Our Natural Moringa Leaf Powder is harvested from the finest moringa trees and carefully processed to preserve all the beneficial nutrients. Simply mix a teaspoon into your morning smoothie or tea to experience the benefits.`,
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
      content: `Starting a wellness journey doesn't have to be complicated. With the right guidance and high-quality products, anyone can achieve their health goals.
      
      Your 30-Day Wellness Challenge:
      
      Week 1: Foundation
      • Start with one superfood supplement daily
      • Focus on hydration - drink 8 glasses of water daily
      • Add one serving of vegetables to each meal
      
      Week 2: Building Momentum
      • Increase to two supplements as recommended
      • Introduce morning exercise - even 15 minutes helps
      • Keep a food journal to track your eating habits
      
      Week 3: Deepening Your Commitment
      • Add more whole foods to your diet
      • Establish a consistent sleep schedule
      • Practice mindfulness or meditation
      
      Week 4: Sustaining Your Progress
      • Evaluate your changes and progress
      • Set new wellness goals for the next month
      • Build a community for support and motivation
      
      Remember, wellness is a journey, not a destination. Small, consistent changes lead to lasting results.`,
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
      content: `Shilajit has been used in Ayurvedic medicine for thousands of years. Modern research is now validating what ancient practitioners knew.
      
      What is Shilajit?
      
      Shilajit is a sticky, tar-like resin found in high-altitude mountain ranges. It forms from the slow decomposition of plant matter and contains over 80 essential minerals and elements.
      
      Why Shilajit is Powerful:
      
      • Fulvic Acid Content - Enhances nutrient absorption and cellular energy
      • Adaptogenic Properties - Helps body adapt to stress
      • Energy and Stamina - Increases mitochondrial function
      • Cognitive Support - Enhances mental clarity and focus
      • Anti-Aging Benefits - Rich in antioxidants that fight aging
      
      Our premium Shilajit Resin is sourced from the pure Himalayan mountains and tested for purity and potency. A small amount daily can provide significant wellness benefits.`,
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
      content: `Natural hair care is becoming increasingly popular. Learn why traditional remedies are making a comeback in modern beauty routines.
      
      The Problem with Conventional Hair Products:
      
      Most commercial hair products contain harsh chemicals that damage hair over time. Sulfates, parabens, and silicones may give temporary benefits but harm your hair's natural structure.
      
      Why Natural Oils Work Better:
      
      • Deep Nourishment - Natural oils penetrate to nourish the hair shaft
      • Moisture Balance - Restore natural moisture without harsh chemicals
      • Scalp Health - Promote healthy scalp and reduce dandruff
      • Growth Support - Ancient ingredients that promote hair growth
      • Shine and Strength - Visible results in 2-3 weeks
      
      Our Spiruvita Hair Oil contains a blend of:
      • Coconut Oil - Deep conditioning and moisture
      • Brahmi Oil - Traditional Ayurvedic hair treatment
      • Neem Oil - Natural antifungal and antibacterial properties
      • Essential Oils - For scalp health and fragrance
      
      Use 2-3 times per week for best results. Your hair will thank you!`,
      author: "Michelle Brown",
      date: "March 12, 2026",
      category: "beauty",
      image: "✨",
      readTime: "5 min read",
      featured: false,
    },
  ];

  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-blue-600 font-bold hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <div className="fixed top-20 left-0 right-0 bg-white border-b border-gray-200 z-20 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="font-light text-gray-900 hover:text-gray-600 flex items-center gap-2 text-sm transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-light tracking-widest text-gray-500 uppercase">
              {post.category}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 font-light">
            <span>{post.author}</span>
            <span className="text-gray-300">•</span>
            <span>{post.date}</span>
            <span className="text-gray-300">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-7xl mb-16 text-center">{post.image}</div>

          <div className="prose prose-lg max-w-none text-gray-900">
            {post.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.trim() === "") return null;
              if (paragraph.startsWith("•")) {
                const bullets = post.content
                  .split("\n\n")
                  .filter((p) => p.trim().startsWith("•"));
                if (index === 0 || !post.content.split("\n\n")[index - 1]?.trim().startsWith("•")) {
                  return (
                    <ul key={index} className="list-none space-y-4 my-12">
                      {bullets.map((bullet, bIndex) => (
                        <li key={bIndex} className="flex gap-4 text-gray-700 font-light">
                          <span className="text-gray-400 text-xl shrink-0">•</span>
                          <span>{bullet.replace("•", "").trim()}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return null;
              } else if (!paragraph.trim().startsWith("•")) {
                return (
                  <p key={index} className="text-gray-700 leading-relaxed font-light text-lg mb-8">
                    {paragraph.trim()}
                  </p>
                );
              }
            })}
          </div>

          {/* Article Footer */}
          <div className="mt-20 pt-12 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 px-6 py-3 font-light tracking-wide transition-all duration-300 border border-gray-300 ${
                    isLiked
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                  {isLiked ? "Liked" : "Like"}
                </button>

                <button className="flex items-center gap-2 px-6 py-3 font-light tracking-wide text-gray-900 border border-gray-300 hover:bg-gray-50 transition-all duration-300">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              <div className="text-sm text-gray-600 font-light">
                Updated: {post.date}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <p className="text-xs font-light tracking-widest text-gray-500 uppercase mb-6">Related Articles</p>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                More to explore
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {relatedPosts.map((relPost) => (
                <Link
                  key={relPost.id}
                  href={`/blog/${relPost.id}`}
                  className="group cursor-pointer"
                >
                  <div className="mb-6 overflow-hidden">
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-500">
                      {relPost.image}
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-light text-gray-900 mb-4 group-hover:text-gray-600 transition-colors duration-300">
                    {relPost.title}
                  </h3>
                  <p className="text-gray-600 font-light text-sm mb-4">
                    {relPost.readTime}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-white py-20 md:py-28 border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-light tracking-widest text-gray-500 uppercase mb-6">Discover our products</p>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-12">
            Ready to transform your health?
          </h2>
          <Link
            href="/products"
            className="inline-block px-8 py-4 bg-gray-900 text-white font-light tracking-wide hover:bg-gray-800 transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
