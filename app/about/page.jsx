'use client';

import React, { useEffect, useState } from 'react';
import Footer from "../components/usable/footer";
import Navbar from "../components/usable/navbar";

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reusable icon components for services
  const serviceIcons = [
    // Leaf icon
    <svg key="1" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.921 7.5c-.5-1-1.5-2-3-2.5-1.5-.5-3-.3-4 0-1-.3-2.5-.5-4 0-1.5.5-2.5 1.5-3 2.5-.5 1-.3 2.5 0 4-.3 1-.5 2.5 0 4 .5 1.5 1.5 2.5 3 3 1.5.5 3 .3 4 0 1 .3 2.5.5 4 0 1.5-.5 2.5-1.5 3-3 .5-1.5.3-3 0-4 .3-1.5.5-3 0-4z" />
    </svg>,
    // Droplet icon
    <svg key="2" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0z" />
    </svg>,
    // Sprout icon
    <svg key="3" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c-1.5 2-4 4-4 7s1 5 4 7c3-2 4-4 4-7s-2.5-5-4-7zm0 15c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
    </svg>,
    // Flower icon
    <svg key="4" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm9 7h-6v13h-6V9H3V7h6V4h2v3h6v2z" />
    </svg>,
    // Leaf alt
    <svg key="5" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31.84 2.41 2 2.83V23h2v-3.17c1.16-.42 2-1.52 2-2.83 0-1.66-1.34-3-3-3zm13.71-9.71L12 2.71 6.29 8.29C4.02 10.56 4.02 14.41 6.29 16.67L12 22.39l5.71-5.71c2.27-2.26 2.27-6.11 0-8.38z" />
    </svg>,
    // Heart icon
    <svg key="6" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>,
    // Sun icon
    <svg key="7" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2v6m0 4v6M4.22 4.22l4.24 4.24m3.08 3.08l4.24 4.24M2 12h6m4 0h6m-15.78 7.78l4.24-4.24m3.08-3.08l4.24-4.24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>,
    // Seed icon
    <svg key="8" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    </svg>,
    // Eco icon
    <svg key="9" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c-1.1.9-2 2-2 3.12C7.04 4.05 5.5 5 4 5c-1.66 0-3 1.34-3 3 0 1.13.6 2.1 1.48 2.66-.04.5-.48.95-1.08 1.08C.42 12.5 0 13.6 0 14.8c0 2.86 2.24 5.2 5 5.2 1.33 0 2.53-.5 3.43-1.32C9.33 21.39 10.59 22 12 22c1.41 0 2.67-.61 3.57-1.57.9.82 2.1 1.32 3.43 1.32 2.76 0 5-2.34 5-5.2 0-1.2-.42-2.3-1.1-3.16-.6-.13-1.04-.58-1.08-1.08C22.4 9.1 23 8.13 23 7c0-1.66-1.34-3-3-3-1.5 0-3 .95-4 2.12 0-1.12-.9-2.22-2-3.12z" />
    </svg>,
  ];

  const services = [
    {
      title: 'Pure Cultivation',
      desc: 'Grown in pristine freshwater environments using regenerative organic practices, ensuring maximum nutrient density and environmental sustainability.'
    },
    {
      title: 'Advanced Processing',
      desc: 'Cold-dried and processed with zero synthetic additives, preserving the complete amino acid and mineral profile for optimal bioavailability.'
    },
    {
      title: 'Scientific Validation',
      desc: 'Laboratory tested for potency, purity, and safety. Backed by peer-reviewed research and certified by international wellness standards.'
    },
    {
      title: 'Sustainable Farming',
      desc: 'Carbon-negative production methods that regenerate water systems. Every purchase supports farming communities and environmental restoration.'
    },
    {
      title: 'Direct Delivery',
      desc: 'Farm-fresh shipments directly to your home with temperature-controlled packaging, ensuring maximum potency from harvest to doorstep.'
    },
    {
      title: 'Expert Support',
      desc: 'Personalized wellness consultations, nutrition guidance, and continuous support from our team of certified health practitioners and researchers.'
    },
  ];

  const teamMembers = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Founder & CEO',
      bio: 'Ph.D. in Nutritional Biology with 15+ years in biotech wellness.',
      initials: 'RK'
    },
    {
      name: 'Priya Sharma',
      role: 'Managing Director - Operations',
      bio: 'Former VP at leading organic brands. Expert in sustainable supply chains.',
      initials: 'PS'
    },
    {
      name: 'Aditya Singh',
      role: 'Managing Director - Research',
      bio: 'Leading researcher in spirulina bioavailability and health outcomes.',
      initials: 'AS'
    },
    {
      name: 'Maya Patel',
      role: 'Head of Marketing',
      bio: 'Brand strategist passionate about making wellness accessible.',
      initials: 'MP'
    },
  ];

  return (
    <div className="w-full overflow-hidden scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
      <Navbar />
      {/* ============================================
          HERO SECTION - DARKER GRADIENT
          ============================================ */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden flex-col gap-6"
        style={{
          background: 'linear-gradient(135deg, #1a3a32 0%, #2d5a52 35%, #1e4d6b 70%, #0f2e3d 100%)'
        }}>
        
        {/* Soft gradient glow orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-40" 
          style={{ background: 'radial-gradient(circle, rgba(255, 140, 80, 0.3) 0%, rgba(255, 140, 80, 0) 70%)' }} />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(100, 200, 200, 0.25) 0%, rgba(100, 200, 200, 0) 70%)' }} />

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white" 
            style={{ fontFamily: "'Georgia', serif", fontWeight: '700', letterSpacing: '-2px' }}>
            Spiruboost
          </h1>
          
          <p className="text-xl sm:text-2xl text-emerald-50 mb-6 leading-relaxed max-w-2xl mx-auto" 
            style={{ fontFamily: "'Georgia', serif", fontWeight: '500' }}>
            Fueling a Healthier Tomorrow
          </p>

          <p className="text-base sm:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed mb-2"
            style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '400' }}>
            Pure nutrition meets cutting-edge science. We're revolutionizing wellness by delivering nature's most nutrient-dense superfood directly from our regenerative farms to your home. Experience the transformative power of premium spirulina, scientifically formulated and ethically sourced for your optimal vitality.
          </p>

          {/* Glowing underline */}
          <div className="w-32 h-1 mx-auto mt-6 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.6), transparent)',
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.4), inset 0 0 10px rgba(34, 197, 94, 0.3)',
              filter: 'blur(0.5px)'
            }} />
        </div>
      </section>

      {/* ============================================
          BRAND STORY SECTION
          ============================================ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(to bottom, #f8f6f3, #ffffff)' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div>
            <h2 className="text-5xl sm:text-6xl font-bold mb-8 leading-tight text-black"
              style={{ fontFamily: "'Georgia', serif", fontWeight: '700', letterSpacing: '-1px' }}>
              Our Story
            </h2>

            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed"
                style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
                In 2018, our founders witnessed a crisis: millions struggling with fatigue, weak immunity, and declining health despite pursuing wellness trends that simply didn't work.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed"
                style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
                They discovered spirulina—nature's most nutrient-dense superfood—but realized mainstream products lacked purity and potency. That's when Spiruboost was born.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed"
                style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
                Today, over 50,000 people trust Spiruboost as their daily wellness companion, experiencing renewed energy and genuine vitality.
              </p>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative group hidden md:block">
            <div className="h-96 rounded-3xl overflow-hidden backdrop-blur-md border border-emerald-200/40 relative"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(100, 200, 200, 0.08) 100%)',
              }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)' }}>
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <p className="text-lg font-bold text-emerald-700">Pure Spirulina</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full filter blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle, rgba(34, 197, 94, 0.8) 0%, transparent 70%)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          OUR PURPOSE SECTION - MISSION & VISION
          ============================================ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(135deg, #e8f5ed 0%, #f0f9f8 50%, #e0f7fa 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-black"
              style={{ fontFamily: "'Georgia', serif", fontWeight: '700', letterSpacing: '-1px' }}>
              Our Purpose
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
              We believe in making premium, life-changing nutrition accessible to everyone, rooted in transparency, sustainability, and scientific excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Mission Card */}
            <div className="group relative rounded-3xl overflow-hidden border border-emerald-200/40 backdrop-blur-xl hover:border-emerald-400/50 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.12) 0%, rgba(34, 197, 94, 0.05) 100%)',
                boxShadow: '0 8px 32px rgba(34, 197, 94, 0.08)'
              }}>
              <div className="relative z-10 p-8 sm:p-10">
                <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-black pb-4"
                  style={{ fontFamily: "'Georgia', serif", fontWeight: '700', borderBottom: '2px solid rgba(34, 197, 94, 0.5)' }}>
                  Our Mission
                </h3>
                <div className="space-y-4">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed"
                    style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
                    To deliver the world's purest spirulina with scientific integrity, transparent ethics, and unwavering commitment to making premium wellness accessible to all.
                  </p>
                  <ul className="space-y-3 mt-6">
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-emerald-600 font-bold mt-1">✓</span>
                      <span style={{ fontFamily: "'Segoe UI', sans-serif" }}>100% pure spirulina with zero synthetic additives</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-emerald-600 font-bold mt-1">✓</span>
                      <span style={{ fontFamily: "'Segoe UI', sans-serif" }}>Lab-verified potency and bioavailability standards</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-emerald-600 font-bold mt-1">✓</span>
                      <span style={{ fontFamily: "'Segoe UI', sans-serif" }}>Regenerative farming for environmental healing</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-emerald-600 font-bold mt-1">✓</span>
                      <span style={{ fontFamily: "'Segoe UI', sans-serif" }}>Fair-trade community partnerships globally</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl"
                style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, transparent 100%)' }} />
            </div>

            {/* Vision Card */}
            <div className="group relative rounded-3xl overflow-hidden border border-cyan-200/40 backdrop-blur-xl hover:border-cyan-400/50 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(100, 200, 200, 0.12) 0%, rgba(100, 200, 200, 0.05) 100%)',
                boxShadow: '0 8px 32px rgba(100, 200, 200, 0.08)'
              }}>
              <div className="relative z-10 p-8 sm:p-10">
                <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-black pb-4"
                  style={{ fontFamily: "'Georgia', serif", fontWeight: '700', borderBottom: '2px solid rgba(100, 200, 200, 0.5)' }}>
                  Our Vision
                </h3>
                <div className="space-y-4">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed"
                    style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
                    A world where optimal health is the norm—where every person has access to nature's most powerful nutrients and the knowledge to thrive.
                  </p>
                  <ul className="space-y-3 mt-6">
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-cyan-600 font-bold mt-1">✓</span>
                      <span style={{ fontFamily: "'Segoe UI', sans-serif" }}>Global wellness revolution powered by nature</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-cyan-600 font-bold mt-1">✓</span>
                      <span style={{ fontFamily: "'Segoe UI', sans-serif" }}>Science-backed nutrition for every lifestyle</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-cyan-600 font-bold mt-1">✓</span>
                      <span style={{ fontFamily: "'Segoe UI', sans-serif" }}>Sustainable farming communities worldwide</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-cyan-600 font-bold mt-1">✓</span>
                      <span style={{ fontFamily: "'Segoe UI', sans-serif" }}>Million+ lives transformed through pure nutrition</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl"
                style={{ background: 'linear-gradient(135deg, rgba(100, 200, 200, 0.3) 0%, transparent 100%)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          WHAT WE OFFER SECTION - GRID WITH CIRCULAR ICONS
          ============================================ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(to bottom, #ffffff, #f5f3f0)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-black"
              style={{ fontFamily: "'Georgia', serif", fontWeight: '700', letterSpacing: '-1px' }}>
              What We Offer
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto"
              style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
              Comprehensive wellness solutions backed by science and nature
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {services.map((service, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                {/* Circular Icon Container */}
                <div className="w-28 h-28 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(100, 200, 200, 0.15) 100%)',
                    color: '#059669',
                    boxShadow: '0 8px 24px rgba(34, 197, 94, 0.15)',
                  }}>
                  {serviceIcons[idx]}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{ background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)' }} />
                </div>

                {/* Title and Description */}
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-black"
                  style={{ fontFamily: "'Georgia', serif", fontWeight: '700' }}>
                  {service.title}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed"
                  style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '400' }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FARM-TO-HOME PROCESS SECTION
          ============================================ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        style={{
          background: 'linear-gradient(135deg, #e8f5ed 0%, #f0f9f8 50%, #e0f7fa 100%)'
        }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-black"
              style={{ fontFamily: "'Georgia', serif", fontWeight: '700', letterSpacing: '-1px' }}>
              Farm to Your Door
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto"
              style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
              Transparent, sustainable, and direct from nature to you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: '01',
                title: 'Organic Cultivation',
                desc: 'Grown in pristine freshwater farms using regenerative agriculture practices.',
              },
              {
                step: '02',
                title: 'Pure Processing',
                desc: 'Cold-dried and processed with zero synthetic methods to preserve nutrients.',
              },
              {
                step: '03',
                title: 'Direct Delivery',
                desc: 'Shipped fresh straight to your home with temperature control.',
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="relative inline-block mb-8">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white group hover:scale-110 transition-transform"
                    style={{
                      background: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 50%, #3b82f6 100%)',
                      boxShadow: '0 12px 35px rgba(34, 197, 94, 0.35)'
                    }}>
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black"
                  style={{ fontFamily: "'Georgia', serif" }}>
                  {item.title}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed"
                  style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button className="relative px-10 py-4 font-bold text-lg rounded-full overflow-hidden group transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                color: 'white',
                boxShadow: '0 12px 35px rgba(220, 38, 38, 0.35)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #000000 0%, #1f2937 100%)';
                e.target.style.color = '#dc2626';
                e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)';
                e.target.style.color = 'white';
                e.target.style.boxShadow = '0 12px 35px rgba(220, 38, 38, 0.35)';
              }}>
              <span className="relative flex items-center gap-2">
                Explore Our Farms
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================
          LEADERSHIP SECTION
          ============================================ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(to bottom, #f8f6f3, #ffffff)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-black"
              style={{ fontFamily: "'Georgia', serif", fontWeight: '700', letterSpacing: '-1px' }}>
              Our Leadership
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto"
              style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
              Experienced visionaries driving innovation in wellness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden border border-gray-300/40 hover:border-gray-400/70 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(245, 243, 240, 0.7) 100%)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
                }}>
                
                {/* Image Placeholder - Full image area */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-emerald-100 via-cyan-100 to-blue-100 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold text-white group-hover:scale-110 transition-transform"
                    style={{
                      background: 'linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)',
                      boxShadow: '0 12px 30px rgba(34, 197, 94, 0.3)'
                    }}>
                    {member.initials}
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative p-6 z-10">
                  <h3 className="text-lg font-bold text-black mb-1"
                    style={{ fontFamily: "'Georgia', serif" }}>
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold mb-3 text-emerald-600">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed"
                    style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA SECTION
          ============================================ */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f2e3d 0%, #1a3a32 50%, #2d5a52 100%)'
        }}>
        
        {/* Decorative gradient orbs */}
        <div className="absolute top-10 left-10 w-80 h-80 rounded-full filter blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(255, 140, 80, 0.4) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full filter blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(100, 200, 200, 0.3) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
            style={{ fontFamily: "'Georgia', serif", fontWeight: '700', letterSpacing: '-1px' }}>
            Ready to Transform Your Health?
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-200 mb-12 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '400' }}>
            Join thousands of people who've experienced the Spiruboost difference. Pure nutrition, real results, backed by science.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center flex-wrap">
            <button className="relative px-10 py-4 font-bold text-lg rounded-full overflow-hidden group transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                color: 'white',
                boxShadow: '0 12px 35px rgba(220, 38, 38, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #000000 0%, #1f2937 100%)';
                e.target.style.color = '#dc2626';
                e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)';
                e.target.style.color = 'white';
                e.target.style.boxShadow = '0 12px 35px rgba(220, 38, 38, 0.4)';
              }}>
              <span className="relative flex items-center gap-2">
                Explore Products
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            <button className="relative px-10 py-4 font-bold text-lg rounded-full overflow-hidden group transition-all duration-300"
              style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid #dc2626',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)';
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'white';
              }}>
              <span className="relative flex items-center gap-2">
                Contact Us
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
