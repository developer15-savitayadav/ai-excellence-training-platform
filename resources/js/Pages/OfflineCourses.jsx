import { useState } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '../Layouts/PublicLayout';

const BATCHES = [
  {
    id: 1,
    title: 'AI & Machine Learning Bootcamp',
    slug: 'ai-ml-bootcamp',
    instructor: 'Dr. Sarah Mitchell',
    rating: 4.9,
    reviewCount: 312,
    price: 14999,
    originalPrice: 24999,
    duration: '3 months',
    schedule: 'Mon–Fri, 10 AM – 1 PM',
    batchSize: '20 students',
    level: 'Beginner to Intermediate',
    category: 'ai-fundamentals',
    nextStart: 'Sep 2, 2026',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80',
    features: ['25 workstations with GPU access', 'Live project deployment', '1-on-1 mentorship sessions', 'Placement assistance', 'Lab access 10 AM – 7 PM daily', 'Certificate of completion'],
  },
  {
    id: 2,
    title: 'Deep Learning & Computer Vision',
    slug: 'deep-learning-cv',
    instructor: 'Prof. James Wright',
    rating: 4.8,
    reviewCount: 198,
    price: 19999,
    originalPrice: 32999,
    duration: '4 months',
    schedule: 'Mon–Fri, 2 PM – 5 PM',
    batchSize: '20 students',
    level: 'Intermediate to Advanced',
    category: 'deep-learning',
    nextStart: 'Sep 16, 2026',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=900&q=80',
    features: ['NVIDIA GPU lab access', 'Real-world dataset projects', 'TensorFlow & PyTorch', 'Model deployment training', 'Research paper workshops', 'Industry guest lectures'],
  },
  {
    id: 3,
    title: 'NLP & Large Language Models',
    slug: 'nlp-llm-bootcamp',
    instructor: 'Alex Rivera',
    rating: 4.7,
    reviewCount: 156,
    price: 17999,
    originalPrice: 29999,
    duration: '3 months',
    schedule: 'Mon–Fri, 10 AM – 1 PM',
    batchSize: '20 students',
    level: 'Intermediate',
    category: 'nlp',
    nextStart: 'Oct 7, 2026',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
    features: ['Transformer architecture deep-dive', 'Fine-tuning pre-trained models', 'RAG pipeline building', 'Prompt engineering workshop', 'Capstone project', 'Portfolio development'],
  },
  {
    id: 4,
    title: 'Data Science & Analytics',
    slug: 'data-science-analytics',
    instructor: 'Priya Patel',
    rating: 4.8,
    reviewCount: 245,
    price: 12999,
    originalPrice: 21999,
    duration: '3 months',
    schedule: 'Mon–Fri, 2 PM – 5 PM',
    batchSize: '25 students',
    level: 'Beginner',
    category: 'data-science',
    nextStart: 'Sep 9, 2026',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    features: ['Python & Pandas mastery', 'SQL for data analysis', 'Data visualization with Plotly', 'Statistical modeling', 'Business case studies', 'Industry-recognized certification'],
  },
  {
    id: 5,
    title: 'MLOps & AI Engineering',
    slug: 'mlops-engineering',
    instructor: 'Elena Volkov',
    rating: 4.6,
    reviewCount: 89,
    price: 21999,
    originalPrice: 34999,
    duration: '4 months',
    schedule: 'Mon–Fri, 10 AM – 1 PM',
    batchSize: '15 students',
    level: 'Advanced',
    category: 'mlops',
    nextStart: 'Oct 21, 2026',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=900&q=80',
    features: ['CI/CD for ML pipelines', 'Docker & Kubernetes', 'Model monitoring & drift', 'Cloud deployment (AWS/GCP)', 'Infrastructure as Code', 'Real production systems'],
  },
  {
    id: 6,
    title: 'AI for Business & Marketing',
    slug: 'ai-business-marketing',
    instructor: 'Dr. Marcus Thompson',
    rating: 4.7,
    reviewCount: 178,
    price: 9999,
    originalPrice: 16999,
    duration: '2 months',
    schedule: 'Sat–Sun, 10 AM – 1 PM',
    batchSize: '25 students',
    level: 'Beginner',
    category: 'ai-fundamentals',
    nextStart: 'Sep 23, 2026',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=900&q=80',
    features: ['No coding required', 'AI tools for marketers', 'Content generation strategies', 'Analytics & automation', 'Case studies from industry', 'Weekend-friendly schedule'],
  },
];

const CATEGORIES = [
  { id: 'ai-fundamentals', name: 'AI Fundamentals', icon: '🧠' },
  { id: 'deep-learning', name: 'Deep Learning', icon: '🔬' },
  { id: 'nlp', name: 'NLP & LLMs', icon: '💬' },
  { id: 'data-science', name: 'Data Science', icon: '📊' },
  { id: 'mlops', name: 'MLOps', icon: '🔧' },
];

const WHY_US = [
  { icon: '🎯', title: 'Small Batches', desc: '20–25 students max for personal attention' },
  { icon: '💻', title: '25 GPU Workstations', desc: 'Dedicated lab with high-speed internet' },
  { icon: '🕐', title: '10 AM – 7 PM Lab', desc: 'Practice any time during lab hours' },
  { icon: '🤝', title: '1-on-1 Mentorship', desc: 'Weekly sessions with your instructor' },
  { icon: '📈', title: 'Placement Support', desc: 'Dedicated coordinator, published results' },
  { icon: '💳', title: 'No-Cost EMI', desc: 'Flexible payment options available' },
];

export default function OfflineCourses() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBatches = BATCHES.filter((batch) => {
    if (selectedCategory && batch.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!batch.title.toLowerCase().includes(q) && !batch.instructor.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <PublicLayout>
      <section className="min-h-screen bg-[#f5f5f2]">
        {/* Hero */}
        <div className="relative overflow-hidden pt-[140px] pb-[80px] max-lg:pt-[120px] max-lg:pb-[60px]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 left-[10%] w-[440px] h-[260px] rounded-full bg-[#982cdc]/[0.07] blur-[110px]" />
            <div className="absolute -bottom-28 right-[6%] w-[400px] h-[240px] rounded-full bg-[#eec369]/[0.05] blur-[110px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1240px] px-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#982cdc]/[0.08] border border-[#982cdc]/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#982cdc] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#982cdc]" />
              </span>
              <span className="font-mono text-xs text-[#982cdc] uppercase tracking-wider">Gomti Nagar, Lucknow</span>
            </span>

            <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-[-0.03em] text-black leading-[1.08]">
              Offline AI Courses
            </h1>
            <p className="text-black/60 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
              Learn AI in person at our Gomti Nagar campus. Hands-on training with GPU workstations, small batches, and dedicated mentorship.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a href="#batches" className="rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(152,44,220,.25)] transition-all hover:shadow-[0_8px_24px_rgba(152,44,220,.35)]">
                View Batches
              </a>
              <a href="/contact" className="rounded-full border border-black/10 bg-white px-7 py-3 text-sm font-semibold text-black transition-all hover:bg-black hover:text-white">
                Visit Campus
              </a>
            </div>
          </div>
        </div>

        {/* Why Us */}
        <div className="mx-auto max-w-[1240px] px-6 py-16">
          <div className="text-center mb-12">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />WHY OFFLINE_</p>
            <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] font-bold text-black">
              Why Learn With Us Offline
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
{WHY_US.map((item) => (
    <div
        key={item.title}
        className="bg-white border border-black/5 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,.03)] hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,.06)] transition-all duration-300"
    >
        <img
            src={item.image}
            alt={item.title}
            className="w-10 h-10 mb-3 object-contain"
        />

        <h3 className="font-bold text-black mb-1">
            {item.title}
        </h3>

        <p className="text-sm text-black/50">
            {item.desc}
        </p>
    </div>
))}
          </div>
        </div>

        {/* Batches */}
        <div id="batches" className="mx-auto max-w-[1240px] px-6 py-16">
          <div className="text-center mb-12">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />BATCHES_</p>
            <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] font-bold text-black">
              Upcoming Batches
            </h2>
            <p className="text-black/50 mt-3 max-w-xl mx-auto">
              Limited seats. Enroll early to secure your spot.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search courses or instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-black/10 bg-white pl-11 pr-4 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-[#982cdc]/40 focus:ring-4 focus:ring-[#982cdc]/[0.08] transition-all"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black/30" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('')}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${!selectedCategory ? 'bg-black text-white' : 'bg-white text-black/60 border border-black/10 hover:border-black/20'}`}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${selectedCategory === cat.id ? 'bg-black text-white' : 'bg-white text-black/60 border border-black/10 hover:border-black/20'}`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Batch Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBatches.map((batch) => (
              <div key={batch.id} className="group bg-white border border-black/5 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,.08)]">
                <div className="relative h-[185px] overflow-hidden">
                  <img src={batch.image} alt={batch.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/60 to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-black backdrop-blur">
                    {batch.level}
                  </span>
                  <span className="absolute top-3 right-3 rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-2.5 py-1 text-[10px] font-bold text-white">
                    Starts {batch.nextStart}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-black leading-tight mb-1.5 group-hover:text-[#982cdc] transition-colors">
                    {batch.title}
                  </h3>
                  <p className="text-[13px] text-black/50 mb-3">{batch.instructor}</p>

                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(batch.rating) ? 'text-[#eec369]' : 'text-black/10'} fill-current`} viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-black">{batch.rating}</span>
                    <span className="text-[11px] text-black/40">({batch.reviewCount})</span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-black/40 mb-3">
                    <span>{batch.duration}</span>
                    <span className="h-3 w-px bg-black/10" />
                    <span>{batch.schedule}</span>
                  </div>

                  <div className="text-[11px] text-black/40 mb-4">
                    Batch: {batch.batchSize}
                  </div>

                  <ul className="space-y-1.5 mb-4">
                    {batch.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-black/50">
                        <span className="text-[#982cdc]">✓</span>{f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between border-t border-black/5 pt-4">
                    <div>
                      <span className="text-lg font-bold text-black">₹{batch.price.toLocaleString('en-IN')}</span>
                      <span className="ml-2 text-sm text-black/30 line-through">₹{batch.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <a href="/contact" className="rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-4 py-1.5 text-[11px] font-semibold text-white shadow-[0_4px_12px_rgba(152,44,220,.2)] transition-all duration-300 hover:shadow-[0_6px_18px_rgba(152,44,220,.3)]">
                      Enroll Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBatches.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-black/5">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-lg font-bold text-black mb-1">No batches found</h3>
              <p className="text-black/50 text-sm">Try a different filter or search term</p>
            </div>
          )}
        </div>

        {/* Campus Info */}
        <div className="mx-auto max-w-[1240px] px-6 py-16">
          <div className="bg-white border border-black/5 rounded-2xl p-8 lg:p-12 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />VISIT US_</p>
                <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-black mb-4">
                  Our Campus in Gomti Nagar
                </h2>
                <p className="text-black/60 leading-relaxed mb-6">
                  Drop in any weekday for a campus tour. We'll show you the workstations, lab, and counselling lounge. No appointment needed.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📍</span>
                    <span className="text-black/70">Gomti Nagar, Lucknow, India</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🕐</span>
                    <span className="text-black/70">Mon–Fri, 10:00 AM – 7:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📞</span>
                    <a href="tel:+915551234567" className="text-[#982cdc] hover:text-[#eec369] transition-colors">+91 555 123 4567</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">✉️</span>
                    <a href="mailto:hello@aiexcellence.ai" className="text-[#982cdc] hover:text-[#eec369] transition-colors">hello@aiexcellence.ai</a>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#982cdc]/[0.06] rounded-3xl blur-2xl" />
                <div className="relative bg-[#f5f5f2] border border-black/5 rounded-2xl p-6">
                  <p className="text-sm font-bold text-black mb-4">Campus Facilities</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: '25', label: 'Workstations' },
                      { value: '10–7', label: 'Lab Hours' },
                      { value: 'High-speed', label: 'Internet' },
                      { value: 'Dedicated', label: 'Counselling' },
                    ].map((f) => (
                      <div key={f.label} className="bg-white border border-black/5 rounded-xl p-4 text-center">
                        <div className="text-xl font-bold text-[#982cdc]">{f.value}</div>
                        <div className="text-[11px] text-black/40 mt-1">{f.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto max-w-[1240px] px-6 pb-20">
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-black mb-3">
              Ready to Start?
            </h2>
            <p className="text-black/50 max-w-lg mx-auto mb-8">
              Enroll in an upcoming batch or visit our campus to learn more.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/register" className="rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(152,44,220,.25)] transition-all hover:shadow-[0_8px_24px_rgba(152,44,220,.35)]">
                Register Now
              </a>
              <a href="/contact" className="rounded-full border border-black/10 bg-white px-7 py-3 text-sm font-semibold text-black transition-all hover:bg-black hover:text-white">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
