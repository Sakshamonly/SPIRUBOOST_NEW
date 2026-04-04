'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from "../components/usable/footer";
import Navbar from "../components/usable/navbar";

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false);
<<<<<<< HEAD
  const [selectedMember, setSelectedMember] = useState(null);
=======
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reusable icon components for services
  const serviceIcons = [
<<<<<<< HEAD
    // In-House Cultivation - Spirulina/Algae icon
    <svg key="1" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 2.5.87 4.8 2.32 6.6.88-1.54 2.4-2.77 4.18-3.29-.5-.82-.8-1.78-.8-2.81 0-3.31 2.69-6 6-6s6 2.69 6 6c0 1.03-.3 1.99-.8 2.81 1.78.52 3.3 1.75 4.18 3.29C21.13 16.8 22 14.5 22 12c0-5.52-4.48-10-10-10zm0 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
    </svg>,
    // Precision Harvesting - Scythe/Harvest icon
    <svg key="2" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54h3.54l4.96-6.35c.59-.76.59-1.82 0-2.58L13.5 4h-3.54l2.75 3.54c.29.39.29.91 0 1.3l-3.96 5.45z"/>
    </svg>,
    // Gentle Processing - Snowflake (cooling) icon
    <svg key="3" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.79 13.12l-1.07-1.07-1.41 1.41 1.07 1.07c.59.59.59 1.54 0 2.12-.59.59-1.54.59-2.12 0l-1.07-1.07-1.41 1.41 1.07 1.07c1.37 1.37 3.58 1.37 4.95 0 1.37-1.37 1.37-3.58 0-4.95zM13.5.5c-.83 0-1.5.67-1.5 1.5v5.5H6V2c0-.83-.67-1.5-1.5-1.5S3 1.17 3 2v5.5c0 .83.67 1.5 1.5 1.5h6V17c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H20c.83 0 1.5-.67 1.5-1.5V2c0-.83-.67-1.5-1.5-1.5z"/>
    </svg>,
    // Quality Validation - Checkmark/Shield icon
    <svg key="4" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm6.78 11.07l-6.63 6.29-4.02-3.83 1.41-1.41L12.57 16l5.20-4.98 1.41 1.41z"/>
    </svg>,
    // Farm-to-Formulation - Connected/Link icon
    <svg key="5" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 19.5c0 .83.67 1.5 1.5 1.5S13 20.33 13 19.5v-4h-3v4zm3-9H7v3h6v-3zm0-3H7v3h6V7.5zM5 7.5C5 6.67 4.33 6 3.5 6S2 6.67 2 7.5 2.67 9 3.5 9 5 8.33 5 7.5zm0 6c0-.83-.67-1.5-1.5-1.5S2 12.67 2 13.5 2.67 15 3.5 15 5 14.33 5 13.5zm6-8.5H7v3h4V4.5zm0 11H7v3h4v-3zm6-5.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm-3-4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5z"/>
    </svg>,
    // Consistent Daily Wellness - Heart icon
    <svg key="6" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
    </svg>,
  ];

  const services = [
    {
<<<<<<< HEAD
      title: 'In-House Cultivation',
      desc: 'Our spirulina is grown in controlled freshwater systems under carefully monitored conditions to ensure purity, stable growth, and maximum nutrient density.'
    },
    {
      title: 'Precision Harvesting',
      desc: 'Each batch is harvested at the peak of its growth cycle, preserving chlorophyll, protein, antioxidants, and essential micronutrients at their highest potency.'
    },
    {
      title: 'Gentle Processing',
      desc: 'Low-temperature drying and clean processing methods help retain bioactive compounds without compromising freshness or bioavailability.'
    },
    {
      title: 'Quality Validation',
      desc: 'Every production cycle undergoes strict in-house and laboratory quality checks for purity, heavy metals, microbial safety, and nutrient consistency.'
    },
    {
      title: 'Farm-to-Formulation',
      desc: 'By managing cultivation, harvesting, and formulation under one ecosystem, we ensure freshness, traceability, and complete control from source to supplement.'
    },
    {
      title: 'Consistent Daily Wellness',
      desc: 'The result is a science-backed spirulina supplement designed for reliable daily energy, immunity support, and long-term preventive health.'
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
    },
  ];

  const teamMembers = [
    {
<<<<<<< HEAD
      name: 'Mr. Utkarsh Bhardwaj',
      role: 'Co-Founder, Growth & Innovation',
      bio: 'Entrepreneur focused on improving healthcare accessibility and enhancing daily lifestyle through innovation.',
      description: 'Utkarsh Bhardwaj is an entrepreneur driven by a vision to transform healthcare and enhance everyday living. With a strong focus on innovation and problem-solving, he aims to bridge gaps in healthcare accessibility while promoting healthier lifestyles. At Spiruboost, he contributes to building impactful solutions that align with modern healthcare needs.',
      image: '/utkarsh.jpg',
    },
    {
      name: 'Dr. Parag Sharma',
      role: 'Co-Founder, Medical Vision',
      bio: 'Consultant Physician & Critical Care Expert with extensive experience in hospital leadership and community healthcare development.',
      description: 'Dr. Parag Sharma is a highly experienced Consultant Physician and Critical Care Expert with a strong background in clinical practice and healthcare leadership. As the Founder & CMD of Aarogya Group of Hospitals and Director at Parth Healthcare Pvt. Ltd., he has been instrumental in delivering quality healthcare services across the Hapur region. With multiple medical qualifications including MBBS and MD (Medicine), he combines clinical excellence with a vision for holistic healthcare. His active involvement in organizations like IMA, API, and various social initiatives reflects his commitment to community health and well-being.',
      image: '/parag.jpeg',
    },
    {
      name: 'Mr. Anurag Sharma',
      role: 'Co-Founder, Strategy & Operations',
      bio: '10+ years in hospital management, focused on strategy, operations, and healthcare system improvement.',
      description: 'Anurag Sharma brings over a decade of experience in hospital management and healthcare operations. With a deep understanding of the healthcare ecosystem, he specializes in optimizing processes, improving patient care systems, and driving operational efficiency. At Spiruboost, he leads strategic planning and execution, ensuring scalable growth and impactful healthcare solutions.',
      image: '/anurag.jpeg',
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
    },
  ];

  return (
    <div className="w-full overflow-hidden scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
      <Navbar />
      {/* ============================================
          HERO SECTION - DARKER GRADIENT
          ============================================ */}
<<<<<<< HEAD
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
            Built to Redefine <span style={{ color: '#e5aa0f' }}>Preventive</span> Wellness
          </h1>

          <p className="text-base sm:text-xl lg:text-2xl text-emerald-50 mb-4 sm:mb-6 leading-relaxed max-w-2xl mx-auto"
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
            style={{ fontFamily: "'Georgia', serif", fontWeight: '500' }}>
            Fueling a Healthier Tomorrow
          </p>

<<<<<<< HEAD
          <p className="text-sm sm:text-base lg:text-lg text-gray-100 max-w-5xl mx-auto leading-relaxed mb-2"
            style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '400' }}>
            <span>Spiru</span><span style={{ color: '#fde957' }}>Boost</span> began with a shared mission to solve one of modern life’s biggest health challenges—the growing gap between daily nutrition and true wellness.
          </p>

          {/* Glowing underline */}
          <div className="w-24 sm:w-32 h-1 mx-auto mt-4 sm:mt-6 rounded-full"
=======
          <p className="text-base sm:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed mb-2"
            style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '400' }}>
            Pure nutrition meets cutting-edge science. We're revolutionizing wellness by delivering nature's most nutrient-dense superfood directly from our regenerative farms to your home. Experience the transformative power of premium spirulina, scientifically formulated and ethically sourced for your optimal vitality.
          </p>

          {/* Glowing underline */}
          <div className="w-32 h-1 mx-auto mt-6 rounded-full"
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
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
<<<<<<< HEAD

=======
          
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
          {/* Text Content */}
          <div>
            <h2 className="text-5xl sm:text-6xl font-bold mb-8 leading-tight text-black"
              style={{ fontFamily: "'Georgia', serif", fontWeight: '700', letterSpacing: '-1px' }}>
              Our Story
            </h2>

            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed"
                style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
<<<<<<< HEAD
                SpiruBoost was born from a shared vision that combines medical science, entrepreneurial purpose, and operational excellence. Dr. Parag Sharma (MBBS, MD – Medicine), through years of clinical experience, witnessed how modern lifestyles, poor nutrition, and low immunity were silently affecting long-term health.
=======
                In 2018, our founders witnessed a crisis: millions struggling with fatigue, weak immunity, and declining health despite pursuing wellness trends that simply didn't work.
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
              </p>

              <p className="text-lg text-gray-700 leading-relaxed"
                style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
<<<<<<< HEAD
                Together with Utkarsh Bhardwaj, a young entrepreneur driven to solve one of his generation’s biggest health challenges, the mission evolved into creating a clean, science-backed preventive wellness solution powered by spirulina. Bringing structure and consistency to this vision, Mr. Anurag Sharma leads the administrative and strategic operations, ensuring quality, trust, and execution at every level.

=======
                They discovered spirulina—nature's most nutrient-dense superfood—but realized mainstream products lacked purity and potency. That's when Spiruboost was born.
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
              </p>

              <p className="text-lg text-gray-700 leading-relaxed"
                style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
<<<<<<< HEAD
                Today, SpiruBoost stands as more than a wellness product—it is a movement to help people reclaim energy, strengthen immunity, and make better health a sustainable part of everyday life.
=======
                Today, over 50,000 people trust Spiruboost as their daily wellness companion, experiencing renewed energy and genuine vitality.
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
              </p>
            </div>
          </div>

<<<<<<< HEAD

=======
          {/* Visual Element */}
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
          <div className="relative group hidden md:block">
            <div className="h-96 rounded-3xl overflow-hidden backdrop-blur-md border border-emerald-200/40 relative"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(100, 200, 200, 0.08) 100%)',
              }}>
<<<<<<< HEAD
              <img
                src="/about_story.png"
                alt="Pure Spirulina"
                className="w-full h-full object-cover"
              />
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full filter blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle, rgba(34, 197, 94, 0.8) 0%, transparent 70%)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
<<<<<<< HEAD
                OUR PURPOSE SECTION - MISSION & VISION
                ============================================ */}
=======
          OUR PURPOSE SECTION - MISSION & VISION
          ============================================ */}
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
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
<<<<<<< HEAD
              We believe exceptional wellness begins with exceptional cultivation. By growing and harvesting spirulina in-house, we maintain complete control over purity, freshness, and nutrient integrity from farm to final product.
=======
              We believe in making premium, life-changing nutrition accessible to everyone, rooted in transparency, sustainability, and scientific excellence.
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
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
<<<<<<< HEAD
                    To cultivate and harvest premium spirulina through controlled in-house farming systems that preserve its natural potency, purity, and bioavailability while ensuring complete transparency at every stage.
=======
                    To deliver the world's purest spirulina with scientific integrity, transparent ethics, and unwavering commitment to making premium wellness accessible to all.
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
                  </p>
                  <ul className="space-y-3 mt-6">
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-emerald-600 font-bold mt-1">✓</span>
<<<<<<< HEAD
                      <span style={{ fontFamily: "'Segoe UI', sans-serif" }}>In-house cultivation for full quality control</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-emerald-600 font-bold mt-1">✓</span>
                      <span style={{ fontFamily: "'Segoe UI', sans-serif" }}>Precision harvesting at peak nutrient density</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-emerald-600 font-bold mt-1">✓</span>
                      <span style={{ fontFamily: "'Segoe UI', sans-serif" }}>Clean water ecosystem and monitored growth cycles</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-emerald-600 font-bold mt-1">✓</span>
                      <span style={{ fontFamily: "'Segoe UI', sans-serif" }}>Fresh processing to preserve active nutrition</span>
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
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
<<<<<<< HEAD
                    To set a new benchmark in spirulina excellence by building a fully integrated farm-to-formulation ecosystem where every batch reflects purity, consistency, and scientific quality.
=======
                    A world where optimal health is the norm—where every person has access to nature's most powerful nutrients and the knowledge to thrive.
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
                  </p>
                  <ul className="space-y-3 mt-6">
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-cyan-600 font-bold mt-1">✓</span>
<<<<<<< HEAD
                      <span style={{ fontFamily: "'Segoe UI', sans-serif" }}>Traceable nutrition from cultivation to consumer</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-cyan-600 font-bold mt-1">✓</span>
                      <span style={{ fontFamily: "'Segoe UI', sans-serif" }}> Better freshness through direct processing</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-cyan-600 font-bold mt-1">✓</span>
                      <span style={{ fontFamily: "'Segoe UI', sans-serif" }}>Sustainable farming with zero compromise</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-cyan-600 font-bold mt-1">✓</span>
                      <span style={{ fontFamily: "'Segoe UI', sans-serif" }}>India’s most trusted in-house spirulina ecosystem</span>
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
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
<<<<<<< HEAD
              The SpiruBoost Advantage
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto"
              style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
              From in-house cultivation to final formulation, every stage is controlled for unmatched purity, consistency, and nutrient integrity.
=======
              What We Offer
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto"
              style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
              Comprehensive wellness solutions backed by science and nature
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
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
<<<<<<< HEAD
            <p className="text-lg text-gray-700 max-w-3xl mx-auto"
              style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
              Protected cultivation, precision processing, and freshness delivered with complete traceability.
=======
            <p className="text-lg text-gray-700 max-w-2xl mx-auto"
              style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
              Transparent, sustainable, and direct from nature to you
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: '01',
<<<<<<< HEAD
                title: 'Protected Net Cultivation',
                desc: 'Our spirulina is cultivated in closed, net-protected freshwater systems, designed to minimize exposure to airborne particles, dust, and external contaminants while maintaining a stable growth environment for superior purity.',
              },
              {
                step: '02',
                title: 'Precision Harvesting & Processing',
                desc: 'Each batch is harvested at the ideal growth stage and gently processed to preserve chlorophyll, protein, antioxidants, and essential micronutrients in their most bioavailable form.',
              },
              {
                step: '03',
                title: ' Freshness to Final Delivery',
                desc: 'From cultivation to final packaging, every stage remains within our controlled ecosystem, ensuring consistent quality, freshness, and nutrient integrity when it reaches your doorstep.',
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
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
<<<<<<< HEAD
            <Link href="/farm">
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
                  Explore Our Cultivation Process 
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
            </Link>
=======
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
          </div>
        </div>
      </section>

<<<<<<< HEAD
     
          <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
          style={{ background: 'linear-gradient(to bottom, #f8f6f3, #ffffff)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
=======
      {/* ============================================
          LEADERSHIP SECTION
          ============================================ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(to bottom, #f8f6f3, #ffffff)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-black"
              style={{ fontFamily: "'Georgia', serif", fontWeight: '700', letterSpacing: '-1px' }}>
              Our Leadership
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto"
              style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
              Experienced visionaries driving innovation in wellness
            </p>
<<<<<<< HEAD
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.slice(0, 3).map((member, idx) => (
              <div
              key={idx}
              onClick={() => setSelectedMember(member)}
              className="group relative rounded-2xl overflow-hidden border border-gray-300/40 hover:border-gray-400/70 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(245, 243, 240, 0.7) 100%)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
              }}>

              {/* Image Placeholder - Full image area */}
              <div className="relative h-56 overflow-hidden bg-linear-to-br from-emerald-100 via-cyan-100 to-blue-100 flex items-center justify-center">
                <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover object-center"
                style={{ width: '100%', height: '100%' }}
                />
              </div>

              {/* Content Section */}
=======
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.slice(0, 3).map((member, idx) => (
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
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
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
<<<<<<< HEAD

=======
        
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
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
<<<<<<< HEAD

=======
          
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
          <p className="text-lg sm:text-xl text-gray-200 mb-12 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '400' }}>
            Join thousands of people who've experienced the Spiruboost difference. Pure nutrition, real results, backed by science.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center flex-wrap">
            <Link href="/products" className="relative px-10 py-4 font-bold text-lg rounded-full overflow-hidden group transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                color: 'white',
                boxShadow: '0 12px 35px rgba(220, 38, 38, 0.4)',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #000000 0%, #1f2937 100%)';
                e.currentTarget.style.color = '#dc2626';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)';
                e.currentTarget.style.color = 'white';
              }}>
              <span className="relative flex items-center gap-2">
                Explore Products
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            <Link href="/contact" className="relative px-10 py-4 font-bold text-lg rounded-full overflow-hidden group transition-all duration-300"
              style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid #dc2626',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'white';
              }}>
              <span className="relative flex items-center gap-2">
                Contact Us
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
<<<<<<< HEAD

      {/* ============================================
          MODAL/POPUP FOR LEADERSHIP DETAILS
          ============================================ */}
      {selectedMember && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedMember(null)}
          style={{ 
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}>
          <div 
            className="bg-white rounded-2xl overflow-hidden max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              style={{ background: 'rgba(255, 255, 255, 0.9)', color: 'black' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Section */}
            <div className="relative h-64 sm:h-80 overflow-hidden bg-linear-to-br from-emerald-100 via-cyan-100 to-blue-100 flex items-center justify-center">
              <img 
                src={selectedMember.image} 
                alt={selectedMember.name}
                className="w-full h-full object-cover object-center"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* Content Section */}
            <div className="p-5 sm:p-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-1"
                style={{ fontFamily: "'Georgia', serif", fontWeight: '700' }}>
                {selectedMember.name}
              </h2>
              
              <p className="text-sm sm:text-base font-semibold text-emerald-600 mb-4"
                style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                {selectedMember.role}
              </p>

              {/* Description (Brief) */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-black mb-3"
                  style={{ fontFamily: "'Georgia', serif" }}>
                  About
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed"
                  style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '500' }}>
                  {selectedMember.description}
                </p>
              </div>

              {/* Close Button at Bottom */}
              <button
                onClick={() => setSelectedMember(null)}
                className="w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-full font-bold text-white text-sm sm:text-base transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                  boxShadow: '0 12px 35px rgba(220, 38, 38, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #000000 0%, #1f2937 100%)';
                  e.currentTarget.style.color = '#dc2626';
                }
                }
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)';
                  e.currentTarget.style.color = 'white';
                }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
=======
      <Footer />
    </div>
  );
}
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
