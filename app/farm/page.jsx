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
    <div className="w-full bg-white overflow-hidden scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
      <Navbar />
      {/* ============ HERO SECTION ============ */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center pt-20 sm:pt-32 px-4 sm:px-6 lg:px-8 overflow-hidden flex-col gap-4 sm:gap-6"
        style={{
          background: 'linear-gradient(135deg, #1a3a32 0%, #2d5a52 35%, #1e4d6b 70%, #0f2e3d 100%)'
        }}>

        {/* Soft gradient glow orbs */}
        <div className="absolute top-10 sm:top-20 left-1/4 w-48 sm:w-96 h-48 sm:h-96 rounded-full filter blur-3xl opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(255, 140, 80, 0.3) 0%, rgba(255, 140, 80, 0) 70%)' }} />
        <div className="absolute bottom-10 sm:bottom-20 right-1/4 w-48 sm:w-96 h-48 sm:h-96 rounded-full filter blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(100, 200, 200, 0.25) 0%, rgba(100, 200, 200, 0) 70%)' }} />

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-2">
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-white"
            style={{ fontFamily: "'Georgia', serif", fontWeight: '700', letterSpacing: '-2px' }}>
            Farm & <span style={{ color: '#e5aa0f' }}>Cultivation</span>
          </h1>

          <p className="text-base sm:text-xl lg:text-2xl text-emerald-50 mb-4 sm:mb-6 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'Georgia', serif", fontWeight: '500' }}>
            From Farm to Formula
          </p>

          <p className="text-sm sm:text-base lg:text-lg text-gray-100 max-w-5xl mx-auto leading-relaxed mb-2"
            style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '400' }}>
            Discover the journey of premium spirulina cultivation refined through cutting-edge technology and rigorous quality standards.
          </p>

          {/* Glowing underline */}
          <div className="w-24 sm:w-32 h-1 mx-auto mt-4 sm:mt-6 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.6), transparent)',
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.4), inset 0 0 10px rgba(34, 197, 94, 0.3)',
              filter: 'blur(0.5px)'
            }} />
        </div>
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
                  className="w-full aspect-4/3 bg-gray-800 relative cursor-pointer overflow-hidden"
                  onClick={handleImageClick}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center">
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
                <div className="w-full aspect-video bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
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
              <div className="w-full aspect-video bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center">
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
      {/* ============ OUR TEAM SECTION ============ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        style={{
          background: 'linear-gradient(to bottom, #f8f6f3, #fafaf9)'
        }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-black"
              style={{ fontFamily: "'Georgia', serif", fontWeight: '700', letterSpacing: '-1px' }}>
              Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
              Dedicated professionals committed to excellence in cultivation and sustainability
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: 'Raj Kumar', designation: 'Farm Manager', initials: 'RK' },
              { name: 'Priya Singh', designation: 'Operations Lead', initials: 'PS' },
              { name: 'Amit Patel', designation: 'Quality Officer', initials: 'AP' },
              { name: 'Neha Sharma', designation: 'Sustainability Lead', initials: 'NS' },
              { name: 'Vikram Desai', designation: 'Technical Expert', initials: 'VD' }
            ].map((member, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden border border-gray-300/40 hover:border-gray-400/70 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 243, 240, 0.8) 100%)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
                }}>
                
                {/* Image Area */}
                <div className="relative h-48 overflow-hidden bg-linear-to-br from-emerald-100 via-cyan-100 to-blue-100 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white group-hover:scale-110 transition-transform"
                    style={{
                      background: 'linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)',
                      boxShadow: '0 12px 30px rgba(34, 197, 94, 0.3)'
                    }}>
                    {member.initials}
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative p-4 z-10">
                  <h3 className="text-base font-bold text-black mb-1"
                    style={{ fontFamily: "'Georgia', serif" }}>
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-600">
                    {member.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
