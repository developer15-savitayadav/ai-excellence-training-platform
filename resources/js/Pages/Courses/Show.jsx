import { useState } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';
import Button from '../../Components/ui/Button';
import Card from '../../Components/ui/Card';
import Badge from '../../Components/ui/Badge';
import StarRating from '../../Components/ui/StarRating';
import Avatar from '../../Components/ui/Avatar';
import Accordion from '../../Components/ui/Accordion';

const COURSE = {
  id: 1,
  title: 'Deep Learning Fundamentals',
  slug: 'deep-learning-fundamentals',
  description: 'Master the core concepts of deep learning, from neural networks to advanced architectures. Build real-world projects using TensorFlow and PyTorch.',
  longDescription: 'This comprehensive course takes you from the fundamentals of neural networks to building sophisticated deep learning models. You will learn to implement CNNs, RNNs, and Transformers, work with real datasets, and deploy models to production. Dr. Sarah Mitchell brings 15 years of research experience to guide you through both theory and hands-on practice.',
  instructor: {
    name: 'Dr. Sarah Mitchell',
    avatar: null,
    headline: 'AI Research Lead at DeepMind | Stanford PhD',
    bio: 'Dr. Sarah Mitchell is a leading researcher in deep learning with over 50 published papers in top-tier conferences. She earned her PhD from Stanford University and has spent 15 years working at the intersection of research and industry at Google Brain and DeepMind.\n\nHer work on attention mechanisms and neural architecture search has been cited over 10,000 times. She is passionate about making complex AI concepts accessible to learners worldwide and believes in learning by building.',
    courses: 8,
    students: 52400,
    rating: 4.8,
  },
  category: 'Deep Learning',
  level: 'Intermediate',
  price: 49.99,
  originalPrice: 79.99,
  rating: 4.8,
  reviewCount: 1247,
  enrolled: 12450,
  duration: '18h 30m',
  lessons: 24,
  lastUpdated: 'March 2024',
  language: 'English',
  includes: [
    { icon: '🎬', text: '24 video lessons' },
    { icon: '⏱', text: '18.5 hours of content' },
    { icon: '📄', text: '12 articles & resources' },
    { icon: '❓', text: '6 quizzes' },
    { icon: '📝', text: '4 hands-on projects' },
    { icon: '🎓', text: 'Certificate of completion' },
    { icon: '♾', text: 'Full lifetime access' },
    { icon: '📱', text: 'Access on mobile and desktop' },
  ],
};

const CURRICULUM = [
  {
    id: 1,
    title: 'Foundations of Neural Networks',
    lessons: [
      { id: 1, title: 'Introduction to Deep Learning', type: 'video', duration: '22m', preview: true },
      { id: 2, title: 'The Neuron and Perceptron', type: 'video', duration: '35m', preview: true },
      { id: 3, title: 'Activation Functions Explained', type: 'article', duration: '12m', preview: false },
      { id: 4, title: 'Forward and Backpropagation', type: 'video', duration: '45m', preview: false },
      { id: 5, title: 'Quiz: Neural Network Basics', type: 'quiz', duration: '15m', preview: false },
      { id: 6, title: 'Build Your First Neural Network', type: 'assignment', duration: '60m', preview: false },
    ],
  },
  {
    id: 2,
    title: 'Convolutional Neural Networks',
    lessons: [
      { id: 7, title: 'Introduction to CNNs', type: 'video', duration: '28m', preview: false },
      { id: 8, title: 'Convolution and Pooling Layers', type: 'video', duration: '42m', preview: true },
      { id: 9, title: 'Classic Architectures: LeNet to ResNet', type: 'article', duration: '18m', preview: false },
      { id: 10, title: 'Image Classification Project', type: 'assignment', duration: '90m', preview: false },
      { id: 11, title: 'Transfer Learning Techniques', type: 'video', duration: '38m', preview: false },
      { id: 12, title: 'Quiz: CNNs', type: 'quiz', duration: '15m', preview: false },
    ],
  },
  {
    id: 3,
    title: 'Recurrent Networks & Transformers',
    lessons: [
      { id: 13, title: 'Sequential Data and RNNs', type: 'video', duration: '40m', preview: false },
      { id: 14, title: 'LSTM and GRU Architectures', type: 'video', duration: '38m', preview: false },
      { id: 15, title: 'Attention Is All You Need', type: 'article', duration: '15m', preview: false },
      { id: 16, title: 'Building a Transformer from Scratch', type: 'video', duration: '55m', preview: false },
      { id: 17, title: 'Pre-trained Models and Fine-tuning', type: 'video', duration: '45m', preview: false },
      { id: 18, title: 'Text Generation Project', type: 'assignment', duration: '120m', preview: false },
      { id: 19, title: 'Quiz: Transformers', type: 'quiz', duration: '20m', preview: false },
      { id: 20, title: 'Final Course Quiz', type: 'quiz', duration: '30m', preview: false },
    ],
  },
];

const REVIEWS = [
  { id: 1, name: 'Marcus Johnson', rating: 5, date: 'Feb 2024', comment: 'Absolutely outstanding course. Dr. Mitchell explains complex concepts with incredible clarity. The hands-on projects solidified my understanding. Best deep learning course I have taken.' },
  { id: 2, name: 'Priya Patel', rating: 5, date: 'Jan 2024', comment: 'This course transformed my career. I went from basic Python to building production deep learning models in 3 months. The transformer section alone is worth the price.' },
  { id: 3, name: 'David Kim', rating: 4, date: 'Jan 2024', comment: 'Very thorough and well-structured. The CNN project was particularly rewarding. Minor pacing issues in the middle sections but overall excellent content.' },
  { id: 4, name: 'Elena Volkov', rating: 5, date: 'Dec 2023', comment: 'The best investment I made in my AI education. The projects are real-world relevant and the instructor is incredibly knowledgeable. Highly recommend.' },
  { id: 5, name: 'Thomas Mueller', rating: 4, date: 'Dec 2023', comment: 'Great course with solid fundamentals. I would have liked more advanced optimization topics but the transformer section more than makes up for it.' },
  { id: 6, name: 'Anika Sharma', rating: 5, date: 'Nov 2023', comment: 'Dr. Mitchell is an exceptional teacher. She bridges the gap between academic research and practical implementation beautifully. Must-take for aspiring ML engineers.' },
];

const RELATED_COURSES = [
  { id: 2, title: 'Transformers & Large Language Models', instructor: 'Prof. James Wright', rating: 4.8, price: 89.99, duration: '28h 30m', gradient: 'from-violet via-lime/40 to-ink' },
  { id: 3, title: 'Computer Vision with PyTorch', instructor: 'Dr. Michael Chen', rating: 4.6, price: 54.99, duration: '20h 10m', gradient: 'from-lime/60 via-violet/30 to-ink' },
  { id: 4, title: 'Deep Learning for Time Series', instructor: 'Alex Rivera', rating: 4.4, price: 49.99, duration: '14h 20m', gradient: 'from-lime/70 via-violet/30 to-ink' },
];

const FAQ_ITEMS = [
  { id: 1, question: 'What are the prerequisites for this course?', answer: 'Basic Python programming and high school level math (algebra). Familiarity with NumPy is helpful but not required. We cover all necessary math concepts in the first module.' },
  { id: 2, question: 'Will I receive a certificate?', answer: 'Yes, you will receive a blockchain-verified certificate of completion that you can share on LinkedIn and with employers. The certificate includes a unique verification URL.' },
  { id: 3, question: 'How long do I have access to the course?', answer: 'You get full lifetime access to all course materials including future updates. New content is added quarterly and you automatically get access to new lessons.' },
  { id: 4, question: 'Can I get a refund if I am not satisfied?', answer: 'Absolutely. We offer a 30-day money-back guarantee, no questions asked. If the course is not what you expected, simply contact support for a full refund.' },
];

const RATING_BREAKDOWN = [
  { stars: 5, percentage: 72 },
  { stars: 4, percentage: 18 },
  { stars: 3, percentage: 7 },
  { stars: 2, percentage: 2 },
  { stars: 1, percentage: 1 },
];

const TYPE_ICONS = { video: '🎬', article: '📄', quiz: '❓', assignment: '📝' };

export default function CourseShow() {
  const [isEnrolled] = useState(false);
  const [expandedSections, setExpandedSections] = useState([1]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const totalLessons = CURRICULUM.reduce((sum, s) => sum + s.lessons.length, 0);

  const toggleSection = (id) => {
    setExpandedSections((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  return (
    <PublicLayout>
      <section className="min-h-screen bg-ink">
        {/* Hero */}
        <div className="relative bg-surface border-b border-black/[0.06]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="relative max-w-[1240px] mx-auto px-6 py-12 lg:py-16">
            <nav className="flex items-center gap-2 text-sm text-muted mb-8">
              <Link href="/" className="hover:text-body transition-colors">Home</Link>
              <span>/</span>
              <Link href="/courses" className="hover:text-body transition-colors">Courses</Link>
              <span>/</span>
              <Link href="/courses?category=deep-learning" className="hover:text-body transition-colors">{COURSE.category}</Link>
              <span>/</span>
              <span className="text-body">{COURSE.title}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left */}
              <div className="flex-1">
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="lime">{COURSE.level}</Badge>
                  <Badge variant="violet">{COURSE.category}</Badge>
                </div>
                <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-body leading-tight mb-4">
                  {COURSE.title}
                </h1>
                <p className="text-muted text-lg mb-6 max-w-2xl">{COURSE.description}</p>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <StarRating rating={COURSE.rating} size="sm" showValue />
                    <span className="text-sm text-muted">({COURSE.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                  <span className="text-sm text-muted">{COURSE.enrolled.toLocaleString()} students enrolled</span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <Avatar src={COURSE.instructor.avatar} name={COURSE.instructor.name} size="lg" />
                  <div>
                    <p className="font-display font-semibold text-body">{COURSE.instructor.name}</p>
                    <p className="text-sm text-muted">{COURSE.instructor.headline}</p>
                  </div>
                </div>

                <p className="text-sm text-muted font-mono">Last updated: {COURSE.lastUpdated}</p>
              </div>

              {/* Right - Enroll Card */}
              <div className="lg:w-[380px] shrink-0">
                <div className="lg:sticky lg:top-24 bg-panel border border-black/[0.08] rounded-2xl p-6">
                  <div className="mb-6">
                    <span className="font-mono text-3xl font-bold text-body">${COURSE.price}</span>
                    {COURSE.originalPrice && (
                      <span className="ml-2 text-lg text-muted line-through font-mono">${COURSE.originalPrice}</span>
                    )}
                    {COURSE.originalPrice && (
                      <Badge variant="danger" className="ml-2">{Math.round((1 - COURSE.price / COURSE.originalPrice) * 100)}% OFF</Badge>
                    )}
                  </div>

                  {isEnrolled ? (
                    <Button href="/learn/deep-learning-fundamentals" className="w-full mb-6">
                      Continue Learning
                    </Button>
                  ) : (
                    <Button className="w-full mb-6">Enroll Now</Button>
                  )}

                  <div className="space-y-3 mb-6">
                    {COURSE.includes.map((item) => (
                      <div key={item.text} className="flex items-center gap-3 text-sm text-muted">
                        <span>{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-black/[0.08]">
                    <p className="text-xs text-muted text-center">30-day money-back guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1240px] mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              {/* Curriculum */}
              <div className="mb-16">
                <h2 className="font-display text-2xl font-semibold text-body mb-2">Course Curriculum</h2>
                <p className="text-sm text-muted font-mono mb-6">
                  {totalLessons} lessons · {COURSE.duration} total
                </p>

                <div className="space-y-3">
                  {CURRICULUM.map((section) => (
                    <div key={section.id} className="bg-panel border border-black/[0.08] rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-black/[0.02] transition-colors"
                      >
                        <div>
                          <h3 className="font-display font-semibold text-body">{section.title}</h3>
                          <p className="text-xs text-muted font-mono mt-1">
                            {section.lessons.length} lessons · {section.lessons.reduce((sum, l) => {
                              const mins = parseInt(l.duration);
                              return sum + mins;
                            }, 0)}m
                          </p>
                        </div>
                        <span className={`text-muted transition-transform duration-200 ${expandedSections.includes(section.id) ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>

                      {expandedSections.includes(section.id) && (
                        <div className="border-t border-black/[0.08]">
                          {section.lessons.map((lesson) => (
                            <div key={lesson.id} className="flex items-center justify-between px-5 py-4 border-b border-black/[0.04] last:border-0">
                              <div className="flex items-center gap-3">
                                <span className="text-base">{TYPE_ICONS[lesson.type]}</span>
                                <span className="text-sm text-body">{lesson.title}</span>
                                {lesson.preview && (
                                  <Badge variant="muted" className="text-[10px]">Preview</Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-muted font-mono">{lesson.duration}</span>
                                {lesson.preview && (
                                  <Button size="sm" variant="ghost" className="h-8 px-3 text-xs">
                                    Preview
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div className="mb-16">
                <h2 className="font-display text-2xl font-semibold text-body mb-6">Your Instructor</h2>
                <Card>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <Avatar src={COURSE.instructor.avatar} name={COURSE.instructor.name} size="lg" className="shrink-0" />
                    <div>
                      <h3 className="font-display text-xl font-semibold text-body">{COURSE.instructor.name}</h3>
                      <p className="text-sm text-violet mb-4">{COURSE.instructor.headline}</p>
                      <div className="flex flex-wrap gap-6 mb-4 text-sm font-mono">
                        <span><span className="text-body font-semibold">{COURSE.instructor.courses}</span> <span className="text-muted">courses</span></span>
                        <span><span className="text-body font-semibold">{(COURSE.instructor.students / 1000).toFixed(1)}k</span> <span className="text-muted">students</span></span>
                        <span><span className="text-body font-semibold">{COURSE.instructor.rating}</span> <span className="text-muted">rating</span></span>
                      </div>
                      {COURSE.instructor.bio.split('\n\n').map((p, i) => (
                        <p key={i} className="text-sm text-muted leading-relaxed mb-3">{p}</p>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Reviews */}
              <div className="mb-16">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-semibold text-body">Student Reviews</h2>
                  <Button variant="secondary" size="sm" onClick={() => setShowReviewForm(!showReviewForm)}>
                    Write a Review
                  </Button>
                </div>

                {showReviewForm && (
                  <Card className="mb-6">
                    <h3 className="font-display font-semibold text-body mb-4">Your Review</h3>
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className={`text-2xl ${star <= reviewRating ? 'text-amber-400' : 'text-muted'}`}
                        >
                          {star <= reviewRating ? '★' : '☆'}
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share your experience with this course..."
                      className="w-full bg-ink border border-black/[0.08] rounded-xl p-4 text-sm text-body placeholder-muted focus:outline-none focus:border-violet focus:ring-1 focus:ring-violet/30 min-h-[120px] resize-none"
                    />
                    <div className="flex justify-end gap-3 mt-4">
                      <Button variant="ghost" size="sm" onClick={() => { setShowReviewForm(false); setReviewRating(0); setReviewText(''); }}>
                        Cancel
                      </Button>
                      <Button size="sm">Submit Review</Button>
                    </div>
                  </Card>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="md:col-span-1 text-center">
                    <div className="font-mono text-4xl font-bold text-body">{COURSE.rating}</div>
                    <StarRating rating={COURSE.rating} className="justify-center my-2" />
                    <p className="text-xs text-muted">{COURSE.reviewCount.toLocaleString()} reviews</p>
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    {RATING_BREAKDOWN.map((item) => (
                      <div key={item.stars} className="flex items-center gap-3">
                        <span className="text-sm text-muted font-mono w-12">{item.stars} ★</span>
                        <div className="flex-1 h-2 bg-black/[0.08] rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${item.percentage}%` }} />
                        </div>
                        <span className="text-xs text-muted font-mono w-10 text-right">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {REVIEWS.map((review) => (
                    <Card key={review.id} hover={false}>
                      <div className="flex items-start gap-4">
                        <Avatar name={review.name} size="sm" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="font-display font-semibold text-body text-sm">{review.name}</span>
                              <span className="text-xs text-muted ml-2">{review.date}</span>
                            </div>
                            <StarRating rating={review.rating} size="sm" />
                          </div>
                          <p className="text-sm text-muted leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="mb-16">
                <h2 className="font-display text-2xl font-semibold text-body mb-6">Frequently Asked Questions</h2>
                <Accordion items={FAQ_ITEMS} />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block w-80 shrink-0">
              <div className="sticky top-24 space-y-6">
                <Card>
                  <h3 className="font-display font-semibold text-body mb-3">What you'll learn</h3>
                  <ul className="space-y-2 text-sm text-muted">
                    <li className="flex items-start gap-2"><span className="text-lime mt-0.5">✓</span>Build deep learning models from scratch</li>
                    <li className="flex items-start gap-2"><span className="text-lime mt-0.5">✓</span>Master CNNs, RNNs, and Transformers</li>
                    <li className="flex items-start gap-2"><span className="text-lime mt-0.5">✓</span>Deploy models to production</li>
                    <li className="flex items-start gap-2"><span className="text-lime mt-0.5">✓</span>Work with real-world datasets</li>
                  </ul>
                </Card>
                <Card>
                  <h3 className="font-display font-semibold text-body mb-3">Skills you'll gain</h3>
                  <div className="flex flex-wrap gap-2">
                    {['TensorFlow', 'PyTorch', 'Neural Networks', 'CNNs', 'Transformers', 'GPU Training'].map((skill) => (
                      <Badge key={skill} variant="violet">{skill}</Badge>
                    ))}
                  </div>
                </Card>
              </div>
            </aside>
          </div>

          {/* Related Courses */}
          <div className="mt-16 pt-16 border-t border-black/[0.08]">
            <h2 className="font-display text-2xl font-semibold text-body mb-6">Related Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {RELATED_COURSES.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group bg-panel border border-black/[0.08] rounded-2xl overflow-hidden transition-all duration-[220ms] hover:-translate-y-[2px] hover:border-black/[0.18]"
                >
                  <div className={`h-40 bg-gradient-to-br ${course.gradient}`} />
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-body mb-2">{course.title}</h3>
                    <p className="text-sm text-muted mb-3">{course.instructor}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <StarRating rating={course.rating} size="sm" showValue />
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-black/[0.08]">
                      <span className="font-mono font-semibold text-body">${course.price}</span>
                      <span className="text-xs text-muted font-mono">{course.duration}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Mobile Enroll Bar */}
        <div className="md:hidden fixed bottom-0 inset-x-0 bg-panel border-t border-black/[0.08] px-6 py-4 z-50">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xl font-bold text-body">${COURSE.price}</span>
              {COURSE.originalPrice && (
                <span className="ml-2 text-sm text-muted line-through font-mono">${COURSE.originalPrice}</span>
              )}
            </div>
            <Button size="sm">
              {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
