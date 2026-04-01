
'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SpiruboostLanding() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const styles = `
    html {
      scroll-behavior: smooth;
    }
    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto;
      }
    }
  `;

  const features = [
    {
      title: 'Pure & Natural',
      description: 'Sourced from pristine water sources, our spirulina is 100% organic and free from harmful chemicals.',
      image: 'linear-gradient(135deg, #2d5f5f 0%, #1a4d4d 100%)',
    },
    {
      title: 'High Nutrition',
      description: 'Packed with 70% protein, vitamins, and essential amino acids for optimal health.',
      image: 'linear-gradient(135deg, #3a7f7f 0%, #2d5f5f 100%)',
    },
    {
      title: 'Farm Fresh',
      description: 'Harvested at peak freshness and processed within hours to retain maximum nutrients.',
      image: 'linear-gradient(135deg, #4a9f9f 0%, #3a7f7f 100%)',
    },
    {
      title: 'Scientifically Backed',
      description: 'Clinically proven benefits supported by multiple peer-reviewed scientific studies.',
      image: 'linear-gradient(135deg, #5abfbf 0%, #4a9f9f 100%)',
    },
  ];

  const products = [
    { name: 'Organic Powder', benefit: 'Pure energy & nutrition', price: '$29.99' },
    { name: 'Spirulina Tablets', benefit: 'Convenient daily supplement', price: '$34.99' },
    { name: 'Premium Blend', benefit: 'Enhanced with superfoods', price: '$39.99' },
  ];

  const platforms = ['Amazon', 'Flipkart', 'Meesho', 'Website'];

  const handleScrollPlatforms = (direction) => {
    const scroll = direction === 'left' ? -200 : 200;
    setScrollPosition(scrollPosition + scroll);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.65) 0%, rgba(26, 77, 77, 0.6) 50%, rgba(15, 79, 60, 0.65) 100%), url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GS5qZJ68g6Bg1UfLwfnK7CAfFBsBj4.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        ></div>

        {/* Hero Content Container */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8 py-20">
          <div className="flex items-center justify-center text-center">
            {/* Center Content */}
            <div className="text-white space-y-6 max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-balance">
                Fuel Your Body with Pure Spirulina
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-100 leading-relaxed text-balance">
                Discover the power of nature&apos;s most nutrient-dense superfood. Boost your energy, immunity, and vitality with our premium organic spirulina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Spiruboost Section */}
      <section 
        className="py-16 md:py-24 px-4"
        style={{
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f0ff 50%, #fff0e8 100%)',
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-900">Why Choose Spiruboost?</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Clean Feature List */}
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
                    <span className={`text-3xl md:text-4xl font-bold transition-colors duration-500 ${
                      activeFeature === idx ? 'text-teal-600' : 'text-gray-300'
                    }`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg md:text-xl mb-2 transition-colors duration-500 ${
                        activeFeature === idx ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {feature.title}
                      </h3>
                      {activeFeature === idx && (
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Column - Text Section */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 transition-all duration-500 mb-4">
                  {features[activeFeature].title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-all duration-500 mb-4">
                  {features[activeFeature].description}
                </p>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg transition-all duration-500">
                  Our commitment to quality extends beyond sourcing. We implement rigorous testing protocols and maintain partnerships with leading health institutions to ensure every batch meets the highest standards of purity and potency.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-300">
                <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
                  Experience the transformative power of nature&apos;s most complete superfood. Whether you&apos;re an athlete seeking peak performance or someone on a wellness journey, Spiruboost adapts to your lifestyle and supports your unique health goals.
                </p>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  Thousands of customers worldwide have already joined the spirulina revolution. From increased energy levels to improved digestion and mental clarity, the benefits speak for themselves across diverse age groups and health backgrounds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section with Blog */}
      <section className="py-16 md:py-24 px-4 bg-black">
        <div className="container mx-auto max-w-6xl">
          {/* CTA Content */}
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 text-balance">
              Start Your Wellness Journey Today
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 md:mb-12 text-balance">
              Join thousands of satisfied customers who&apos;ve transformed their health with Spiruboost
            </p>
            <button className="px-8 md:px-12 py-3 md:py-4 text-white font-bold text-base md:text-lg transition-all duration-300 hover:text-red-500">
              Learn More
            </button>
          </div>

          {/* Blog Section */}
          <div 
            className="rounded-3xl p-8 md:p-12"
            style={{
              background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f0ff 50%, #e8f5e9 100%)',
            }}
          >
            <div className="mb-8 md:mb-12">
              <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-2">Featured</p>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Must Read Articles</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
              {/* Blog Card 1 */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-300 to-green-500 rounded-full flex items-center justify-center text-3xl mb-6">
                  🌱
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  The Power of Spirulina: Nature&apos;s Superfood
                </h4>
                <p className="text-gray-600 text-base mb-6 leading-relaxed">
                  Discover how spirulina can boost your energy levels and improve overall health with our comprehensive guide to nature&apos;s nutrient powerhouse.
                </p>
                <div className="flex items-center justify-between text-gray-500 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Dr. Sarah Mitchell</span>
                    <span className="mx-2">•</span>
                    <span>March 28, 2026</span>
                  </div>
                  <span className="text-lg">→</span>
                </div>
              </div>

              {/* Blog Card 2 */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-green-400 rounded-full flex items-center justify-center text-3xl mb-6">
                  🌾
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  Sustainable Farming Practices at Spiruboost
                </h4>
                <p className="text-gray-600 text-base mb-6 leading-relaxed">
                  Learn how we&apos;re committed to eco-friendly production methods and environmental sustainability in every batch we produce.
                </p>
                <div className="flex items-center justify-between text-gray-500 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">John Patterson</span>
                    <span className="mx-2">•</span>
                    <span>March 25, 2026</span>
                  </div>
                  <span className="text-lg">→</span>
                </div>
              </div>
            </div>

            {/* Explore All Blogs Button */}
            <div className="flex justify-center mt-8">
              <button className="px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold text-base md:text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Explore All Blogs
              </button>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

