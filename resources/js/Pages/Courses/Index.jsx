import { useState, useMemo } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';

const CATEGORIES = [
  { id: 'ai-fundamentals', name: 'AI Fundamentals', icon: '🧠' },
  { id: 'machine-learning', name: 'Machine Learning', icon: '⚡' },
  { id: 'deep-learning', name: 'Deep Learning', icon: '🔬' },
  { id: 'nlp', name: 'NLP & Language Models', icon: '💬' },
  { id: 'computer-vision', name: 'Computer Vision', icon: '👁' },
  { id: 'data-science', name: 'Data Science', icon: '📊' },
  { id: 'mlops', name: 'MLOps', icon: '🔧' },
];

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const PRICES = ['Free', 'Under $50', 'Under $100', 'Any'];
const RATINGS = ['4+ stars', '3+ stars', 'Any'];
const DURATIONS = ['Under 5 hours', '5-20 hours', '20+ hours'];

const COURSES = [
  { id: 1, title: 'Deep Learning Fundamentals', slug: 'deep-learning-fundamentals', instructor: 'Dr. Sarah Mitchell', rating: 4.8, reviewCount: 1247, price: 49.99, duration: '18h 30m', lessons: 24, level: 'Intermediate', category: 'deep-learning', enrolled: 12450, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80' },
  { id: 2, title: 'Natural Language Processing Masterclass', slug: 'nlp-masterclass', instructor: 'Prof. James Wright', rating: 4.9, reviewCount: 892, price: 59.99, duration: '24h 15m', lessons: 32, level: 'Advanced', category: 'nlp', enrolled: 8930, image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80' },
  { id: 3, title: 'Machine Learning Foundations', slug: 'machine-learning-foundations', instructor: 'Alex Rivera', rating: 4.7, reviewCount: 1563, price: 39.99, duration: '16h 45m', lessons: 28, level: 'Beginner', category: 'machine-learning', enrolled: 18920, image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80' },
  { id: 4, title: 'Production ML Systems', slug: 'production-ml-systems', instructor: 'Elena Volkov', rating: 4.8, reviewCount: 734, price: 79.99, duration: '22h 45m', lessons: 36, level: 'Advanced', category: 'mlops', enrolled: 6780, image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=900&q=80' },
  { id: 5, title: 'Computer Vision with PyTorch', slug: 'computer-vision-pytorch', instructor: 'Dr. Michael Chen', rating: 4.6, reviewCount: 567, price: 54.99, duration: '20h 10m', lessons: 22, level: 'Intermediate', category: 'computer-vision', enrolled: 5430, image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=900&q=80' },
  { id: 6, title: 'Data Science Bootcamp', slug: 'data-science-bootcamp', instructor: 'Priya Patel', rating: 4.7, reviewCount: 2103, price: 44.99, duration: '32h 20m', lessons: 45, level: 'Beginner', category: 'data-science', enrolled: 24560, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80' },
  { id: 7, title: 'AI Fundamentals: From Theory to Practice', slug: 'ai-fundamentals', instructor: 'Dr. Sarah Mitchell', rating: 4.9, reviewCount: 3421, price: 0, duration: '8h 15m', lessons: 12, level: 'Beginner', category: 'ai-fundamentals', enrolled: 45670, image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80' },
  { id: 8, title: 'Reinforcement Learning in Action', slug: 'reinforcement-learning', instructor: 'Dr. Marcus Thompson', rating: 4.5, reviewCount: 312, price: 64.99, duration: '19h 50m', lessons: 26, level: 'Advanced', category: 'machine-learning', enrolled: 3210, image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=900&q=80' },
  { id: 9, title: 'Transformers & Large Language Models', slug: 'transformers-llm', instructor: 'Prof. James Wright', rating: 4.8, reviewCount: 678, price: 89.99, duration: '28h 30m', lessons: 38, level: 'Advanced', category: 'nlp', enrolled: 7890, image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80' },
  { id: 10, title: 'Deep Learning for Time Series', slug: 'deep-learning-time-series', instructor: 'Alex Rivera', rating: 4.4, reviewCount: 234, price: 49.99, duration: '14h 20m', lessons: 18, level: 'Intermediate', category: 'deep-learning', enrolled: 2340, image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=900&q=80' },
  { id: 11, title: 'MLOps Engineering', slug: 'mlops-engineering', instructor: 'Elena Volkov', rating: 4.6, reviewCount: 445, price: 0, duration: '6h 45m', lessons: 8, level: 'Beginner', category: 'mlops', enrolled: 8920, image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=900&q=80' },
  { id: 12, title: 'Advanced Computer Vision', slug: 'advanced-computer-vision', instructor: 'Dr. Michael Chen', rating: 4.7, reviewCount: 189, price: 69.99, duration: '21h 15m', lessons: 28, level: 'Advanced', category: 'computer-vision', enrolled: 1890, image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80' },
];

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rated', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

const COURSES_PER_PAGE = 9;

export default function CoursesIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('Any');
  const [selectedRating, setSelectedRating] = useState('Any');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedLevel('');
    setSelectedPrice('Any');
    setSelectedRating('Any');
    setSelectedDuration('');
    setCurrentPage(1);
  };

  const filteredCourses = useMemo(() => {
    let result = [...COURSES];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q)
      );
    }
    if (selectedCategories.length > 0) {
      result = result.filter((c) => selectedCategories.includes(c.category));
    }
    if (selectedLevel) {
      result = result.filter((c) => c.level === selectedLevel);
    }
    if (selectedPrice !== 'Any') {
      if (selectedPrice === 'Free') result = result.filter((c) => c.price === 0);
      else if (selectedPrice === 'Under $50') result = result.filter((c) => c.price > 0 && c.price < 50);
      else if (selectedPrice === 'Under $100') result = result.filter((c) => c.price > 0 && c.price < 100);
    }
    if (selectedRating !== 'Any') {
      const min = selectedRating === '4+ stars' ? 4 : 3;
      result = result.filter((c) => c.rating >= min);
    }
    if (selectedDuration) {
      const h = (d) => parseFloat(d);
      if (selectedDuration === 'Under 5 hours') result = result.filter((c) => h(c.duration) < 5);
      else if (selectedDuration === '5-20 hours') result = result.filter((c) => h(c.duration) >= 5 && h(c.duration) <= 20);
      else if (selectedDuration === '20+ hours') result = result.filter((c) => h(c.duration) > 20);
    }
    switch (sortBy) {
      case 'rated': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => b.id - a.id); break;
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'popular': default: result.sort((a, b) => b.enrolled - a.enrolled); break;
    }
    return result;
  }, [searchQuery, selectedCategories, selectedLevel, selectedPrice, selectedRating, selectedDuration, sortBy]);

  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );

  const hasActiveFilters =
    searchQuery || selectedCategories.length > 0 || selectedLevel ||
    selectedPrice !== 'Any' || selectedRating !== 'Any' || selectedDuration;

  const FilterSidebar = () => (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-black">Filters</h3>
        {hasActiveFilters && (
          <button onClick={clearAllFilters} className="text-xs font-semibold text-[#982cdc] hover:text-[#eec369] transition-colors">
            Clear All
          </button>
        )}
      </div>

      <div>
        <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/40 mb-3">Category</h4>
        <div className="space-y-2.5">
          {CATEGORIES.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                className="h-4 w-4 rounded border-black/20 text-[#982cdc] focus:ring-[#982cdc]/30 accent-[#982cdc]"
              />
              <span className="text-sm text-black/60 group-hover:text-black transition-colors">
                {cat.icon} {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {[
        { label: 'Level', values: LEVELS, type: 'radio', state: selectedLevel, set: (v) => setSelectedLevel(selectedLevel === v ? '' : v) },
        { label: 'Price', values: PRICES, type: 'radio', state: selectedPrice, set: setSelectedPrice },
        { label: 'Rating', values: RATINGS, type: 'radio', state: selectedRating, set: setSelectedRating },
        { label: 'Duration', values: DURATIONS, type: 'radio', state: selectedDuration, set: (v) => setSelectedDuration(selectedDuration === v ? '' : v) },
      ].map((section) => (
        <div key={section.label}>
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/40 mb-3">{section.label}</h4>
          <div className="space-y-2.5">
            {section.values.map((val) => (
              <label key={val} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name={section.label}
                  value={val}
                  checked={section.state === val}
                  onChange={() => section.set(val)}
                  className="h-4 w-4 border-black/20 text-[#982cdc] focus:ring-[#982cdc]/30 accent-[#982cdc]"
                />
                <span className="text-sm text-black/60 group-hover:text-black transition-colors">{val}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={clearAllFilters}
        className="w-full rounded-full border border-black/10 bg-white py-2.5 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <PublicLayout>
      <section className="min-h-screen bg-[#f5f5f2]">
        <div className="max-w-[1050px] mx-auto px-5 py-28">
          <div className="text-center mb-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#982cdc] mb-3">
              COURSES_
            </p>
            <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.04em] text-black">
              Explore Our Courses
            </h1>
            <p className="text-black/60 text-[clamp(15px,1.2vw,18px)] mt-3 max-w-2xl mx-auto">
              Master AI with world-class instructors and hands-on projects
            </p>
          </div>

          <div className="mb-8 mx-auto max-w-[600px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses by title or instructor..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full rounded-full border border-black/10 bg-white pl-11 pr-4 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-[#982cdc]/40 focus:ring-4 focus:ring-[#982cdc]/[0.08] transition-all"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black/30" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
          </div>

          <div className="lg:hidden mb-6">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="w-full rounded-full border border-black/10 bg-white py-3 text-sm font-semibold text-black"
            >
              {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {mobileFiltersOpen && (
            <div className="lg:hidden bg-white border border-black/5 rounded-2xl p-6 mb-6 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
              <FilterSidebar />
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-60 shrink-0">
              <div className="sticky top-24 bg-white border border-black/5 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
                <FilterSidebar />
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-black/60">
                  <span className="font-semibold text-[#982cdc]">{filteredCourses.length}</span> courses found
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black focus:outline-none focus:border-[#982cdc]/40 focus:ring-2 focus:ring-[#982cdc]/10 transition-all"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {paginatedCourses.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedCourses.map((course) => (
                      <Link
                        key={course.id}
                        href={`/courses/${course.slug}`}
                        className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_8px_30px_rgba(0,0,0,.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,.08)]"
                      >
                        <div className="relative h-[185px] overflow-hidden">
                          <img
                            src={course.image}
                            alt={course.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/60 to-transparent" />
                          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-black backdrop-blur">
                            {course.level}
                          </span>
                          {course.price === 0 && (
                            <span className="absolute top-3 right-3 rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-2.5 py-1 text-[10px] font-bold text-white">
                              Free
                            </span>
                          )}
                        </div>

                        <div className="p-5">
                          <h3 className="text-base font-semibold tracking-[-0.02em] text-black leading-tight mb-2 group-hover:text-[#982cdc] transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-[13px] text-black/50 mb-3">{course.instructor}</p>

                          <div className="flex items-center gap-1.5 mb-3">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(course.rating) ? 'text-[#eec369]' : 'text-black/10'} fill-current`} viewBox="0 0 20 20">
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs font-semibold text-black">{course.rating}</span>
                            <span className="text-[11px] text-black/40">({course.reviewCount.toLocaleString()})</span>
                          </div>

                          <div className="flex items-center gap-3 text-[11px] text-black/40 mb-4">
                            <span>{course.duration}</span>
                            <span className="h-3 w-px bg-black/10" />
                            <span>{course.lessons} lessons</span>
                          </div>

                          <div className="flex items-center justify-between border-t border-black/5 pt-4">
                            <span className="text-lg font-bold text-black">
                              {course.price === 0 ? 'Free' : `$${course.price}`}
                            </span>
                            <span className="rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-4 py-1.5 text-[11px] font-semibold text-white shadow-[0_4px_12px_rgba(152,44,220,.2)] transition-all duration-300 group-hover:shadow-[0_6px_18px_rgba(152,44,220,.3)]">
                              {course.price === 0 ? 'Enroll Free' : 'View Course'}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`h-10 w-10 rounded-full text-sm font-semibold transition-all duration-200 ${
                            currentPage === page
                              ? 'bg-black text-white shadow-[0_4px_12px_rgba(0,0,0,.2)]'
                              : 'bg-white text-black/60 border border-black/5 hover:border-black/15 hover:text-black'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-black/5">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-black mb-2">No courses found</h3>
                  <p className="text-black/50 mb-6">Try adjusting your filters or search query</p>
                  <button
                    onClick={clearAllFilters}
                    className="rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-6 py-2.5 text-sm font-semibold text-white"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
