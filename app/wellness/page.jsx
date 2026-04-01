'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Footer from "../components/usable/footer";
import Navbar from "../components/usable/navbar";

export default function SpiruboostWellness() {
  const [openModal, setOpenModal] = useState(null);

  const benefits = [
    {
      id: 1,
      title: 'Enhanced Energy & Stamina',
      description: 'Spirulina is packed with B vitamins and iron, essential nutrients that support energy production at the cellular level. Regular consumption helps combat fatigue and provides sustained energy throughout the day without the crash associated with caffeine.',
      details: [
        'Rich in B-complex vitamins for energy metabolism',
        'High iron content supports oxygen transport',
        'Natural energy boost without stimulants',
        'Ideal for athletes and active individuals',
        'Sustainable energy release throughout the day'
      ]
    },
    {
      id: 2,
      title: 'Immune System Boost',
      description: 'With powerful antioxidants and polysaccharides, spirulina strengthens your immune system. It activates natural killer cells and macrophages, helping your body fight off infections and maintain optimal health.',
      details: [
        'Contains phycocyanin - a powerful antioxidant',
        'Activates natural killer cells for defense',
        'Rich in beta-carotene for immune support',
        'Supports lymphocyte production',
        'Helps reduce inflammation in the body'
      ]
    },
    {
      id: 3,
      title: 'Muscle Growth & Recovery',
      description: 'Spirulina contains all 9 essential amino acids with up to 70% protein content. It\'s perfect for muscle building, post-workout recovery, and maintaining lean muscle mass, making it ideal for athletes and fitness enthusiasts.',
      details: [
        '70% complete protein content by dry weight',
        'Contains all 9 essential amino acids',
        'Supports muscle protein synthesis',
        'Accelerates post-workout recovery',
        'Perfect for plant-based athletes'
      ]
    },
    {
      id: 4,
      title: 'Mental Clarity & Focus',
      description: 'The amino acid phenylalanine in spirulina helps produce neurotransmitters like dopamine, enhancing mental focus, concentration, and cognitive performance. Perfect for students and professionals needing sharp minds.',
      details: [
        'Enhances dopamine production naturally',
        'Supports neurotransmitter synthesis',
        'Improves blood flow to the brain',
        'Reduces mental fatigue',
        'Boosts concentration and memory'
      ]
    },
    {
      id: 5,
      title: 'Detoxification & Cleansing',
      description: 'Spirulina\'s chlorophyll and unique compounds bind to heavy metals and toxins in your body, naturally supporting your body\'s detoxification processes and promoting overall wellness and vitality.',
      details: [
        'Chlorophyll supports natural detox',
        'Binds to heavy metals safely',
        'Supports liver function',
        'Aids in cellular cleansing',
        'Promotes healthy digestion'
      ]
    },
    {
      id: 6,
      title: 'Skin Health & Beauty',
      description: 'Rich in beta-carotene, fatty acids, and antioxidants, spirulina nourishes skin from within. It promotes collagen production, reduces inflammation, and gives you a natural, radiant glow while fighting signs of aging.',
      details: [
        'High in beta-carotene for skin health',
        'Supports collagen production',
        'Reduces skin inflammation',
        'Protects from oxidative stress',
        'Promotes natural skin radiance'
      ]
    },
    {
      id: 7,
      title: 'Weight Management Support',
      description: 'High in protein and nutrients but low in calories, spirulina helps you feel fuller longer while providing essential nutrition. It supports healthy metabolism and sustainable weight management goals.',
      details: [
        'High protein, low calorie content',
        'Promotes satiety and fullness',
        'Supports healthy metabolism',
        'Reduces cravings naturally',
        'Aids sustainable weight loss'
      ]
    },
    {
      id: 8,
      title: 'Cardiovascular Health',
      description: 'Spirulina helps maintain healthy cholesterol levels, supports blood pressure regulation, and improves blood flow. Its potassium content and bioactive compounds support heart health and circulation.',
      details: [
        'Helps maintain healthy cholesterol',
        'Supports blood pressure regulation',
        'Improves arterial flexibility',
        'Rich in potassium and magnesium',
        'Supports overall cardiovascular function'
      ]
    },
    {
      id: 9,
      title: 'Anti-Inflammatory Support',
      description: 'With phycocyanin and other bioactive compounds, spirulina naturally reduces inflammation throughout the body. This supports joint health, reduces muscle soreness, and promotes overall wellness and comfort.',
      details: [
        'Contains powerful phycocyanin',
        'Reduces systemic inflammation',
        'Supports joint health and comfort',
        'Eases muscle soreness',
        'Promotes faster recovery'
      ]
    }
    ,
    {
      id: 10,
      title: 'Gut Health & Digestion',
      description: 'Spirulina supports a healthy gut microbiome and improves digestion through its fiber and phytonutrients.',
      details: [
        'Prebiotic-like effects for microbiome balance',
        'Supports healthy digestion and nutrient absorption',
        'Reduces bloating and discomfort',
        'Promotes regularity and gut transit',
        'Supports intestinal barrier function'
      ]
    },
    {
      id: 11,
      title: 'Sleep & Recovery',
      description: 'Nutrients in spirulina can support natural sleep cycles and recovery by reducing stress and inflammation.',
      details: [
        'Supports natural melatonin pathways',
        'Reduces oxidative stress for better rest',
        'Promotes tissue repair overnight',
        'Balances electrolytes for recovery',
        'Improves sleep quality over time'
      ]
    },
    {
      id: 12,
      title: 'Weight Management',
      description: 'A low-calorie, nutrient-dense option that supports satiety and healthy metabolism.',
      details: [
        'High protein supports fullness',
        'Supports metabolic function',
        'Reduces cravings and snacking',
        'Helps maintain lean mass',
        'Supports long-term healthy weight goals'
      ]
    },
    {
      id: 13,
      title: 'Eye & Vision Support',
      description: 'With high beta-carotene and antioxidants, spirulina helps protect visual health and supports retinal function.',
      details: [
        'High beta-carotene content for eye health',
        'Protects retinal cells from oxidative stress',
        'Supports long-term visual acuity',
        'Helps reduce eye fatigue',
        'Contributes to overall ocular nutrition'
      ]
    }
  ];

  const composition = [
    'Protein: 60-70% (complete with all 9 essential amino acids)',
    'Chlorophyll: Natural pigment for detoxification',
    'Beta-carotene: 10 times more than carrots',
    'B Vitamins: B1, B2, B3, B5, B6, B7, B9, B12',
    'Iron: Highly bioavailable form for energy',
    'Calcium: Essential for bone health',
    'Magnesium: Supports muscle and nerve function',
    'Antioxidants: SOD, catalase, peroxidase'
  ];

  const equivalence = [
    {
      amount: '10g of Spirulina',
      equals: 'Protein equivalent to 100g chicken breast',
      icon: '🍗'
    },
    {
      amount: '1 tablespoon',
      equals: 'More beta-carotene than 2 carrots',
      icon: '🥕'
    },
    {
      amount: '5g daily',
      equals: 'Iron content of 2 spinach servings',
      icon: '🥬'
    },
    {
      amount: '1 teaspoon',
      equals: 'B12 equivalent to 1 glass of milk',
      icon: '🥛'
    },
    {
      amount: '15g serving',
      equals: 'Chlorophyll of 250g spirulina-equivalent greens',
      icon: '🌿'
    },
    {
      amount: '20g daily',
      equals: 'Antioxidants of 8 oranges',
      icon: '🍊'
    }
  ];

  const useCategories = [
    {
      icon: '📚',
      title: 'Students',
      description: 'Enhance focus, memory, and mental clarity for better academic performance and exam preparation.'
    },
    {
      icon: '💼',
      title: 'Professionals',
      description: 'Combat fatigue, improve productivity, and maintain energy throughout long work hours.'
    },
    {
      icon: '🏋️',
      title: 'Athletes',
      description: 'Build muscle, accelerate recovery, and enhance athletic performance naturally.'
    },
    {
      icon: '👩‍🍳',
      title: 'Health Conscious',
      description: 'Achieve optimal nutrition, support weight management, and promote overall wellness.'
    },
    {
      icon: '🧘',
      title: 'Fitness Enthusiasts',
      description: 'Complement your workout routine with complete nutrition and faster recovery support.'
    },
    {
      icon: '👵',
      title: 'Seniors',
      description: 'Support bone health, maintain vitality, and enjoy active, vibrant aging.'
    }
  ];

  const dailyRoutine = [
    {
      time: '🌅 Morning',
      benefit: 'Energy Boost',
      description: 'Start your day with sustained energy. Spirulina provides natural B vitamins and iron for morning vitality without the jitters.',
      color: 'from-amber-50 to-orange-50'
    },
    {
      time: '☀️ Afternoon',
      benefit: 'Mental Focus',
      description: 'Mid-day slump? Combat afternoon fatigue with improved concentration and mental clarity for peak productivity.',
      color: 'from-cyan-50 to-blue-50'
    },
    {
      time: '💪 Post-Workout',
      benefit: 'Muscle Recovery',
      description: 'Complete amino acids support muscle repair and recovery. Reduce soreness and accelerate adaptation.',
      color: 'from-purple-50 to-pink-50'
    },
    {
      time: '🌙 Evening',
      benefit: 'Wellness Support',
      description: 'End your day supporting overall health and regeneration for better sleep and recovery overnight.',
      color: 'from-slate-50 to-teal-50'
    }
  ];

  const ModalContent = ({ benefit }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Modal Header with Gradient */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1a3a32 0%, #2d5a52 35%, #1e4d6b 70%, #0f2e3d 100%)'
          }}
          className="px-8 py-12 text-white text-center relative"
        >
          <button
            onClick={() => setOpenModal(null)}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-3xl md:text-4xl font-bold text-balance">{benefit.title}</h2>
        </div>

        {/* Modal Content */}
        <div className="p-8 space-y-8">
          <p className="text-lg text-slate-700 leading-relaxed font-serif">
            {benefit.description}
          </p>

          {/* Key Benefits */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-slate-900 border-b-2 border-emerald-500 pb-3">Key Benefits</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {benefit.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-emerald-50 transition-colors">
                  <span className="text-emerald-600 font-bold text-lg mt-0">✓</span>
                  <span className="text-slate-700 text-sm">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Simplified modal: keep key benefits only + close */}
          <div className="pt-2">
            <button
              onClick={() => setOpenModal(null)}
              className="w-full px-6 py-3 bg-white/10 border border-slate-200 text-slate-900 font-semibold rounded-lg hover:shadow-md transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="smooth-scroll overflow-x-hidden bg-white">
      <Navbar />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@300;400;600&display=swap');
        :root{--heading-font: 'Poppins', sans-serif; --body-font: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial}
        h1,h2,h3,h4,.text-3xl,.text-4xl,.text-5xl,.text-6xl{font-family:var(--heading-font)}
        body,p,li,a,span{font-family:var(--body-font)}
        .features-title{font-weight:800;letter-spacing:0.6px;color:#06b6d4}
        .feature-icon{width:88px;height:88px;display:inline-flex;align-items:center;justify-content:center;border-radius:9999px;background:#ffffff;border:1px solid #eef2f7;box-shadow:0 10px 30px rgba(14,30,37,0.06)}
        .feature-readmore{color:#0ea5a4;font-weight:600}
        .text-balance{line-height:1.05}
        .smooth-scroll{scroll-behavior:smooth}
      `}</style>
      <style>{`.smooth-scroll{scroll-behavior:smooth} .text-balance{line-height:1.05}`}</style>
      {/* ===== HERO SECTION - Nature's Blueprint (gradient background) ===== */}
      <section
        className="relative w-full h-[75vh] md:h-[85vh] lg:h-[95vh] overflow-hidden pt-20"
        style={{ background: 'linear-gradient(135deg, #1a3a32 0%, #2d5a52 35%, #1e4d6b 70%, #0f2e3d 100%)' }}
      >
        <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
          <div className="w-full text-center text-white mx-auto">
            <p className="text-sm font-semibold tracking-widest text-teal-200 uppercase mb-2">Spirulina Nature Superfood</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-white">Nature's <span className="text-teal-300">Blueprint</span></h1>
            <p className="text-lg md:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed mb-8 drop-shadow-lg">Precision-engineered bio-algae synthesized for maximum cellular absorption — the ultimate synthesis of ancient vitality and modern science.</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => {
                const molecularSection = document.querySelector('[data-section="molecular"]');
                if (molecularSection) {
                  molecularSection.scrollIntoView({ behavior: 'smooth' });
                }
              }} className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full shadow-lg transition-all">Get Started</button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-28 md:h-36">
            <path d="M0,0 C300,100 900,0 1200,80 L1200,120 L0,120 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ===== ABOUT SPIRULINA - The Molecular Forest Within ===== */}
      <section className="py-20 md:py-28 bg-white" data-section="molecular">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Centered Heading */}
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 animate-slide-up">
              The Molecular Forest Within
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* Two Column Layout: Left = details + integrated composition bullets, Right = Who can use it (paragraphs) */}
          <div className="grid gap-12 lg:grid-cols-2 items-stretch">
            {/* Left: What is Spirulina + integrated composition bullets */}
            <div className="animate-slide-in-left space-y-6 h-full flex flex-col justify-start">
              <p className="text-sm font-bold tracking-widest text-emerald-600 uppercase">Origin & Essence</p>
              <h3 className="text-3xl font-bold text-slate-900">What is Spirulina?</h3>
              <p className="text-slate-700 leading-relaxed text-lg">
                Spirulina is a biomass of cyanobacteria (blue-green algae) traditionally harvested from nutrient-rich alkaline lakes. This microalgae packs a dense spectrum of phytonutrients that are easily absorbed by the body — providing an efficient source of complete plant protein, vitamins, and minerals. Used across cultures for centuries, spirulina offers a modern, scientifically-supported solution for nutritional gaps. It supports energy, immunity, detoxification, and cellular resilience in a compact, sustainable form. Key composition highlights are shown below for clarity.
              </p>

              <ul className="mt-4 grid gap-2 list-none">
                {composition.map((line, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 text-teal-500 font-bold">✓</span>
                    <span className="text-slate-700">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Who can use it? (paragraphs, not cards) */}
            <div className="animate-slide-in-right space-y-4 h-full flex flex-col justify-start">
              <h3 className="text-3xl font-bold text-slate-900">Who can use it?</h3>
              <p className="text-slate-700 leading-relaxed text-lg">Spirulina is versatile and suited for many lifestyles. Below are common user groups and how spirulina supports them.</p>
              {useCategories.map((cat, idx) => (
                <p key={idx} className="text-slate-700"> <strong className="text-slate-900">{cat.title}:</strong> {cat.description}</p>
              ))}
              <p className="text-slate-700 italic">In short: whether you&apos;re training for performance, balancing a busy schedule, building a family-friendly nutrition routine, or supporting graceful aging — spirulina adapts to your needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE SPIRULINA - Features & Benefits (matches reference design) ===== */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold features-title mb-4">FEATURES & BENEFITS</h2>
          <p className="text-slate-600 max-w-3xl mx-auto mb-12">Small, concentrated nutritional advantages that make Spirulina perfect for modern wellness — quick to add, easy to use, and powerful in effect.</p>

          <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {benefits.slice(0, 6).map((b, i) => (
              <div key={b.id} className="text-center animate-slide-up">
                <div className="mx-auto feature-icon mb-6">
                  <span className="text-3xl">🌿</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{b.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{b.description.split('.').slice(0,1).join('.') + '.'}</p>
                <a onClick={() => setOpenModal(b)} className="cursor-pointer feature-readmore">Read More</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EQUIVALENCE SECTION - The Superfood Paradox ===== */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slide-up">
              The Superfood Paradox
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              See how a small serving of Spirulina compares to conventional nutritional sources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equivalence.map((item, idx) => (
              <div
                key={idx}
                style={{
                  animationDelay: `${idx * 100}ms`
                }}
                className="animate-slide-up"
              >
                <div className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm p-8 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-emerald-400/50 hover:shadow-xl hover:-translate-y-1 text-center h-full flex flex-col justify-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.amount}</h3>
                  <p className="text-slate-200 font-medium">{item.equals}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO CAN USE IT section removed per user request; 'Who can use it?' content is included earlier in About */}

      {/* ===== FINAL CTA SECTION - Upgrade Your Biological Inventory ===== */}
  <section className="py-20 md:py-28 px-4 md:px-8" style={{ background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f5e9 50%, #fff3e0 100%)' }}>
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 text-balance leading-tight">
            Upgrade Your Biological Inventory
          </h2>
          <p className="text-xl text-slate-700 text-balance leading-relaxed max-w-2xl mx-auto">
            Join thousands of wellness enthusiasts experiencing the transformative power of Spirulina. Start your journey to optimal health today.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row pt-8">
            <a href="/products" className="inline-block px-8 py-4 text-slate-900 font-bold transition-all duration-300 hover:bg-slate-900 hover:text-white border-2 border-transparent hover:border-slate-900">
              Explore Products
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {openModal && <ModalContent benefit={openModal} />}
      <Footer />
    </div>
  );
}
