'use client';

import { useState, useEffect } from 'react';
import Footer from "../components/usable/footer";
import Navbar from "../components/usable/navbar";

export default function OurFarmsPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Process steps data
  const processSteps = [
    {
      number: '01',
      title: 'Sourcing',
      description: 'We source only the finest spirulina from pristine mineral-rich waters under controlled environmental conditions.',
    },
    {
      number: '02',
      title: 'Refinement',
      description: 'Through advanced filtration and purification processes, we ensure every batch meets our highest standards.',
    },
    {
      number: '03',
      title: 'Craftsmanship',
      description: 'Gentle, low-temperature processing preserves heat-sensitive nutrients while maintaining product integrity.',
    },
    {
      number: '04',
      title: 'Quality Control',
      description: 'Each batch undergoes rigorous laboratory analysis for purity, potency, and absence of contaminants.',
    },
  ];

  // Plant overview images
  const plantImages = [
    { id: 1, src: '/images/farm-1.jpg', alt: 'Farm view 1' },
    { id: 2, src: '/images/farm-2.jpg', alt: 'Farm view 2' },
    { id: 3, src: '/images/farm-3.jpg', alt: 'Farm view 3' },
  ];

  // Quality control features
  const qualityFeatures = [
    {
      title: 'No Chemicals',
      description: 'Our spirulina is grown without synthetic pesticides or harmful chemicals.',
    },
    {
      title: 'Lab Tested',
      description: 'Rigorous testing ensures purity and potency in every batch.',
    },
    {
      title: 'Controlled Environment',
      description: 'Precision-controlled conditions optimize nutrient content.',
    },
    {
      title: 'High Nutrient Retention',
      description: 'Advanced processing preserves vital nutrients.',
    },
  ];

  const handlePrevImage = () => {
    setImageIndex((prev) => (prev === 0 ? plantImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setImageIndex((prev) => (prev === plantImages.length - 1 ? 0 : prev + 1));
  };

  const handleImageClick = () => {
    setSelectedImage(plantImages[imageIndex]);
  };

  return (
    <div className="w-full bg-white overflow-hidden">
      <Navbar />
      {/* ============ HERO SECTION ============ */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-gray-800 via-gray-900 to-black">
          <div className="absolute inset-0 bg-cover bg-center" style={{
            backgroundImage: 'url(/images/hero-farm.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
          }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fadeInUp">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            From Farm to Formula
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 font-light max-w-2xl mx-auto leading-relaxed">
            Discover the journey of premium spirulina cultivation, refined through cutting-edge technology and rigorous quality standards
          </p>
          <button className="px-8 py-3 bg-transparent text-white font-medium transition-all duration-300 transform hover:scale-105 hover:bg-red-600 hover:text-white" style={{
            border: 'none',
            textDecoration: 'underline',
            textDecorationColor: 'rgba(255,255,255,0.35)',
            textDecorationThickness: '1px',
            textUnderlineOffset: '4px',
          }}>
            <span className="pointer-events-none">Explore Our Story</span>
          </button>
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl opacity-20 animate-pulse" />
      </section>

      {/* quality/features section moved to bottom (placeholder removed) */}

      {/* ============ PLANT OVERVIEW SECTION ============ */}
      <section className="relative w-full py-20 sm:py-24 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f0ff 50%, #fff0e8 100%)',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="animate-fadeInLeft">
              <h2 className="text-4xl sm:text-5xl font-light mb-6 text-black" style={{ fontFamily: 'Georgia, serif' }}>
                A Sanctuary of Technical Excellence
              </h2>
              <p className="text-gray-800 text-lg mb-8 leading-relaxed font-light">
                Our cultivation facilities represent the pinnacle of agricultural innovation, combining traditional wisdom with cutting-edge biotechnology to produce spirulina of unparalleled quality and nutrient density.
              </p>

              {/* Stats - styled like the provided image */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-start sm:gap-12 gap-6">
                <div className="flex items-start gap-4">
                  <div className="text-5xl sm:text-6xl font-extralight text-black leading-none">45k</div>
                  <div className="flex flex-col justify-center">
                    <span className="text-xs tracking-widest text-gray-600 uppercase">Square meters</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-5xl sm:text-6xl font-extralight text-black leading-none">0.02</div>
                  <div className="flex flex-col justify-center">
                    <span className="text-xs tracking-widest text-gray-600 uppercase">Precision tolerance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image with Navigation */}
            <div className="animate-fadeInRight">
              <div className="relative bg-gray-900 rounded-sm overflow-hidden shadow-2xl group">
                {/* Image Placeholder */}
                <div
                  className="w-full aspect-[4/3] bg-gray-800 relative cursor-pointer overflow-hidden"
                  onClick={handleImageClick}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🌾</div>
                      <p className="text-gray-400 text-sm">Image Placeholder {imageIndex + 1}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-sm">Click to view fullscreen</p>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows - Thin and Minimal */}
              <div className="flex items-center justify-center gap-8 mt-6">
                <button
                  onClick={handlePrevImage}
                  className="text-black text-2xl hover:text-gray-600 transition-colors duration-300 transform hover:scale-110"
                  aria-label="Previous image"
                >
                  ←
                </button>
                <span className="text-sm text-gray-600">
                  {imageIndex + 1} / {plantImages.length}
                </span>
                <button
                  onClick={handleNextImage}
                  className="text-black text-2xl hover:text-gray-600 transition-colors duration-300 transform hover:scale-110"
                  aria-label="Next image"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CERTIFICATION TRANSITION SECTION ============ */}
      <section className="w-full py-12 sm:py-16 bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-8 sm:gap-6">
            <span className="text-sm sm:text-base font-semibold text-gray-800">ISO:2008 Certified</span>
            <span className="text-sm sm:text-base font-semibold text-gray-800">ISO:2008 Certified</span>
            <span className="text-sm sm:text-base font-semibold text-gray-800">ISO:2008 Certified</span>
            <span className="text-sm sm:text-base font-semibold text-gray-800">ISO:2008 Certified</span>
          </div>
        </div>
      </section>

      {/* ============ INTERACTIVE PROCESS SECTION ============ */}
      <section className="relative w-full py-20 sm:py-28 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f5e9 50%, #fff3e0 100%)',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center animate-fadeIn">
            <p className="text-gray-600 text-sm sm:text-base font-medium mb-2 tracking-widest">OUR METHODOLOGY</p>
            <h2 className="text-4xl sm:text-5xl font-light text-black" style={{ fontFamily: 'Georgia, serif' }}>
              The Journey of Precision
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column - Steps */}
            <div className="space-y-8 animate-fadeInLeft">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`cursor-pointer transition-all duration-300 pb-6 border-b border-gray-300 hover:border-gray-500 group ${
                    activeStep === index ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`text-3xl sm:text-4xl font-light transition-colors duration-300 ${
                      activeStep === index ? 'text-gray-900' : 'text-gray-400'
                    }`} style={{ fontFamily: 'Georgia, serif' }}>
                      {step.number}
                    </span>
                    <div className="flex-1">
                      <h3 className={`text-xl sm:text-2xl font-medium mb-2 transition-colors duration-300 ${
                        activeStep === index ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {step.title}
                      </h3>
                      {activeStep === index && (
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed animate-fadeIn">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Video Placeholder */}
            <div className="animate-fadeInRight sticky top-24">
              <div className="relative rounded-sm overflow-hidden shadow-2xl group">
                <div className="w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="text-6xl mb-4 opacity-70">▶</div>
                    <p className="text-gray-400 text-sm">Video Placeholder</p>
                    <p className="text-gray-500 text-xs mt-2">{processSteps[activeStep].title}</p>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ============ FULLSCREEN IMAGE MODAL ============ */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-4xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white text-3xl hover:text-gray-400 transition-colors duration-300"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Image */}
            <div className="bg-gray-800 rounded-sm overflow-hidden">
              <div className="w-full aspect-video bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <p className="text-gray-400">Image Placeholder</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handlePrevImage}
                className="text-white text-2xl hover:text-gray-300 transition-colors duration-300"
                aria-label="Previous"
              >
                ←
              </button>
              <span className="text-white">
                {imageIndex + 1} / {plantImages.length}
              </span>
              <button
                onClick={handleNextImage}
                className="text-white text-2xl hover:text-gray-300 transition-colors duration-300"
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ ANIMATIONS ============ */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeUpAnimation {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out;
        }

        @keyframes cardSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-card {
          animation: cardSlideUp 0.6s ease-out forwards;
          opacity: 0;
          will-change: transform, opacity;
        }

        .feature-icon {
          background: rgba(96,165,250,0.08);
          border-radius: 9999px;
        }

        .wave-wrapper {
          transform: translateZ(0);
        }

        .wave-svg {
          display: block;
        }

        .quality-cta {
          position: relative;
          overflow: hidden;
        }

        .quality-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: left 0.5s ease;
          z-index: -1;
        }

        .quality-cta:hover::before {
          left: 100%;
        }

        :global(html), :global(body) {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
      <Footer />
    </div>
  );
}
