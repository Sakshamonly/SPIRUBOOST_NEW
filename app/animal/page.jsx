'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Navbar from '../components/usable/navbar';
import Footer from '../components/usable/footer';

export default function AnimalWellnessPage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  // ============================================
  // HERO SECTION
  // ============================================
  const HeroSection = () => (
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
          Animal <span style={{ color: '#e5aa0f' }}>Wellness</span>
        </h1>

        <p className="text-base sm:text-xl lg:text-2xl text-emerald-50 mb-4 sm:mb-6 leading-relaxed max-w-2xl mx-auto"
          style={{ fontFamily: "'Georgia', serif", fontWeight: '500' }}>
          Premium Nutrition for Healthier Livestock
        </p>

        <p className="text-sm sm:text-base lg:text-lg text-gray-100 max-w-5xl mx-auto leading-relaxed mb-2"
          style={{ fontFamily: "'Segoe UI', sans-serif", fontWeight: '400' }}>
          Spirulina supplementation that improves growth, boosts immunity, and enhances productivity across all poultry operations.
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
  );

  // HARVEST SECTION (Split Layout)
  // ============================================
  const HarvestSection = () => (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f0ff 50%, #fff0e8 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative h-96 lg:h-full min-h-96 rounded-3xl overflow-hidden">
            <Image
              src="/contact.png"
              alt="Animal wellness and spirulina nutrition"
              fill
              className="object-cover"
            />
          </div>

          {/* Content side */}
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold text-teal-700 uppercase tracking-wide mb-2">
                THE HARVEST
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Sourced from Mineral-Rich Waters.
              </h2>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Our spirulina is cultivated in pristine, mineral-rich environments under optimal conditions. We employ rigorous quality control standards to ensure every batch delivers the maximum nutritional profile and bioavailability.
            </p>

            <p className="text-base text-gray-600 leading-relaxed">
              The harvesting and processing techniques preserve all vital compounds while maintaining purity. This commitment to quality ensures your livestock receive nature's best nutrition in every serving.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  // ============================================
  // PERFORMANCE METRICS SECTION
  // ============================================
  const MetricsSection = () => {
    const metrics = [
      { label: 'Egg Production Increase', value: '8–15%', color: '#1a3a32' },
      { label: 'Weight Gain Improvement', value: '10–18%', color: '#2d5a52' },
      { label: 'Feed Conversion Ratio', value: '5–10%', color: '#1e4d6b' },
      { label: 'Mortality Reduction', value: '20–30%', color: '#0f2e3d' },
    ];

    return (
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to bottom, #f5f5f5, #f0f0f0)' }}>
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-teal-700 uppercase tracking-wide mb-2">
              Proven Results
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Performance Impact at a Glance
            </h2>
            <p className="text-lg text-gray-700 mt-4">Real-world improvements livestock farmers achieve with Spiruboost</p>
          </div>

          {/* Metrics grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
                style={{
                  borderBottom: `4px solid ${metric.color}`
                }}
              >
                <div className="text-5xl font-bold mb-3" style={{ color: metric.color }}>
                  {metric.value}
                </div>
                <p className="text-gray-700 font-semibold text-sm">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // ============================================
  // WHY CHOOSE SPIRUBOOST SECTION
  // ============================================
  const BenefitsSection = () => {
    const benefits = [
      {
        title: 'Boosts Egg Production',
        description: '8–15% increase in laying rates within 4–6 weeks of supplementation.',
      },
      {
        title: 'Accelerates Growth',
        description: '10–18% higher weight gain in broilers and layers.',
      },
      {
        title: 'Strengthens Immunity',
        description: 'Enhanced antibody production and disease resistance.',
      },
      {
        title: 'Enhances Yolk Color',
        description: 'Deep golden hue—premium quality indicators.',
      },
      {
        title: 'Improves Gut Health',
        description: 'Natural compounds support digestive balance and health.',
      },
      {
        title: 'Better Feed Conversion',
        description: '5–10% improvement in FCR for optimal efficiency.',
      },
      {
        title: 'Reduces Mortality',
        description: 'Stronger flocks with 20–30% lower mortality rates.',
      },
      {
        title: 'Superior Meat Quality',
        description: 'Enhanced flavor profile and nutritional value.',
      },
    ];

    return (
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Spiruboost?
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8" />
          </div>

          {/* Benefits grid - Glassmorphism */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 text-center backdrop-blur-sm"
                style={{
                  background: 'rgba(26, 58, 50, 0.08)',
                  border: '1px solid rgba(26, 58, 50, 0.15)',
                  boxShadow: '0 8px 32px rgba(26, 58, 50, 0.05)',
                }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <div className="w-8 h-0.5 bg-linear-to-r from-transparent via-teal-600 to-transparent mx-auto mb-4" />
                <p className="text-gray-700 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // ============================================
  // TAILORED FOR EVERY TYPE SECTION
  // ============================================
  const ApplicationSection = () => {
    const applications = [
      { name: 'Chicken', benefit: 'Overall health and peak laying performance' },
      { name: 'Broiler', benefit: 'Rapid growth and superior meat quality' },
      { name: 'Breeder', benefit: 'Enhanced reproductive performance and vigor' },
      { name: 'Layer', benefit: 'Premium egg production and quality metrics' },
    ];

    return (
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f5e9 50%, #fff3e0 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Content side */}
            <div className="space-y-8">
              <div>
                <p className="text-sm font-semibold text-teal-700 uppercase tracking-wide mb-2">
                  Application Guide
                </p>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                  Tailored for Every Type.
                </h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you raise chickens, broilers, breeders, or layers, Spiruboost is formulated to deliver optimal results. Our dosage recommendations ensure maximum efficacy while maintaining cost efficiency across all poultry operations.
              </p>

              <p className="text-base text-gray-600 leading-relaxed">
                Each animal type has unique nutritional needs, and our specialized formulation addresses them all with precision and care.
              </p>
            </div>

            {/* Application types - Simple text format */}
            <div className="space-y-6">
              {applications.map((app, idx) => (
                <div
                  key={idx}
                  className="group p-6 rounded-2xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                  style={{ background: 'rgba(13, 148, 136, 0.05)' }}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-start gap-4">
                    <h3 className="text-2xl font-bold text-gray-900">{app.name}</h3>
                    <span className="text-2xl text-gray-400 mt-1">|</span>
                    <p className="text-gray-700 leading-relaxed mt-1">{app.benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // ============================================
  // QUALITY ASSURANCE SECTION
  // ============================================
  const QualitySection = () => {
    const qualities = [
      { label: '100% Natural', description: 'Pure spirulina without additives' },
      { label: 'Lab Tested', description: 'Verified for purity and potency' },
      { label: 'Sustainable', description: 'Environmentally responsible sourcing' },
      { label: 'Premium Grade', description: 'Superior quality standards' },
    ];

    return (
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-teal-700 uppercase tracking-wide mb-2">
              Quality Standards
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Trusted Quality & Transparency
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Every batch of Spiruboost meets rigorous quality standards and certifications.
            </p>
          </div>

          {/* Quality badges */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {qualities.map((quality, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-center hover:-translate-y-2"
              >
                <span className="text-4xl font-bold text-teal-700 mb-3">✓</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{quality.label}</h3>
                <p className="text-sm text-gray-600">{quality.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // ============================================
  // FINAL CTA SECTION
  // ============================================
  const CTASection = () => (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f5e9 50%, #fff3e0 100%)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Ready to Transform Your Livestock?
        </h2>
        <p className="text-xl text-gray-700 mb-12 leading-relaxed">
          Join hundreds of farmers who are achieving superior results with Spiruboost premium spirulina supplementation.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-700 text-white font-bold rounded-lg hover:bg-teal-800 transition-all duration-300 transform hover:scale-105">
            Explore Products
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-teal-700 text-teal-700 font-bold rounded-lg hover:bg-teal-50 transition-all duration-300">
            Request Sample
          </button>
        </div>
      </div>
    </section>
  );

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <main className="scroll-smooth">
      <Navbar />
      <HeroSection />
      <HarvestSection />
      <MetricsSection />
      <BenefitsSection />
      <ApplicationSection />
      <QualitySection />
      <CTASection />
      <Footer />
    </main>
  );
}
