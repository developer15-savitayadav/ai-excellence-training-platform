import { useState } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';
import Button from '../../Components/ui/Button';
import Badge from '../../Components/ui/Badge';

function EyeBrow({ children, color = 'violet' }) {
    return (
        <p className={`font-mono text-xs uppercase tracking-[0.08em] text-${color} mb-3`}>
            {children}
        </p>
    );
}

const CATEGORIES = ['All', 'AI Fundamentals', 'Machine Learning', 'Tutorials', 'Industry Insights'];

const POSTS = [
    {
        slug: 'understanding-transformer-architecture',
        title: 'Understanding Transformer Architecture',
        excerpt: 'A deep dive into the architecture that powers GPT, BERT, and modern language models. Learn how self-attention mechanisms revolutionized NLP.',
        category: 'AI Fundamentals',
        author: 'Dr. Sarah Mitchell',
        date: 'Jan 15, 2024',
        readTime: '8 min read',
        gradient: 'from-violet via-violet/60 to-ink',
    },
    {
        slug: 'deploy-ml-models-production',
        title: '5 Steps to Deploy ML Models in Production',
        excerpt: 'Moving from Jupyter notebooks to production-ready ML systems. A practical guide covering model serving, monitoring, and scaling strategies.',
        category: 'Tutorials',
        author: 'Alex Rivera',
        date: 'Jan 12, 2024',
        readTime: '12 min read',
        gradient: 'from-lime/80 via-lime/40 to-ink',
    },
    {
        slug: 'state-of-ai-2024',
        title: 'The State of AI in 2024',
        excerpt: 'From multimodal models to AI agents, a comprehensive overview of where the AI industry stands and where it\'s headed next.',
        category: 'Industry Insights',
        author: 'Maya Rodriguez',
        date: 'Jan 10, 2024',
        readTime: '10 min read',
        gradient: 'from-success via-success/50 to-ink',
    },
    {
        slug: 'building-first-neural-network',
        title: 'Building Your First Neural Network',
        excerpt: 'A beginner-friendly tutorial walking you through building, training, and evaluating a neural network from scratch using Python and NumPy.',
        category: 'Machine Learning',
        author: 'Dr. James Chen',
        date: 'Jan 8, 2024',
        readTime: '15 min read',
        gradient: 'from-violet/60 via-success/30 to-ink',
    },
    {
        slug: 'transfer-learning-practical-guide',
        title: 'Transfer Learning: A Practical Guide',
        excerpt: 'How to leverage pre-trained models to solve new problems with limited data. Covers fine-tuning strategies, domain adaptation, and best practices.',
        category: 'AI Fundamentals',
        author: 'Dr. Sarah Mitchell',
        date: 'Jan 5, 2024',
        readTime: '11 min read',
        gradient: 'from-lime/60 via-violet/30 to-ink',
    },
    {
        slug: 'ai-transforming-healthcare',
        title: 'How AI is Transforming Healthcare',
        excerpt: 'From drug discovery to medical imaging, explore the real-world applications of AI that are revolutionizing patient care and medical research.',
        category: 'Industry Insights',
        author: 'Priya Sharma',
        date: 'Jan 3, 2024',
        readTime: '9 min read',
        gradient: 'from-success/60 via-lime/30 to-ink',
    },
];

export default function ResourcesIndex() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPosts =
        activeCategory === 'All'
            ? POSTS
            : POSTS.filter((p) => p.category === activeCategory);

    return (
        <PublicLayout>
            {/* Hero */}
            <section className="relative overflow-hidden pt-[120px] pb-[60px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 h-[500px] w-[700px] rounded-full bg-violet/15 blur-[120px] pointer-events-none" />
                <div className="relative z-10 mx-auto max-w-[1240px] px-6 text-center">
                    <EyeBrow>RESOURCES_</EyeBrow>
                    <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight text-body">
                        Learning Resources &amp; Blob
                    </h2>
                    <p className="text-muted text-lg mt-4 max-w-xl mx-auto">
                        In-depth articles, tutorials, and insights from our expert instructors and the AI community.
                    </p>
                </div>
            </section>

            {/* Filter Tabs */}
            <section className="max-w-[1240px] mx-auto px-6 py-8">
                <div className="flex flex-wrap gap-2 justify-center">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                                activeCategory === cat
                                    ? 'bg-lime text-black'
                                    : 'border border-black/[0.12] text-muted hover:border-black/20 hover:text-body'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Posts Grid */}
            <section className="max-w-[1240px] mx-auto px-6 pb-[120px] max-lg:pb-[72px]">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/resources/${post.slug}`}
                            className="group bg-panel border border-black/[0.08] rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-[2px] hover:border-black/[0.18]"
                        >
                            <div className={`h-48 bg-gradient-to-br ${post.gradient} relative`}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-16 w-16 rounded-full bg-black/[0.1] backdrop-blur-sm flex items-center justify-center">
                                        <span className="text-xl">📄</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <Badge variant="violet" className="mb-3">{post.category}</Badge>
                                <h3 className="font-display text-lg font-semibold text-body group-hover:text-lime transition-colors leading-snug">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-muted mt-2 leading-relaxed line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-black/[0.06] text-xs text-muted">
                                    <span>{post.author}</span>
                                    <span className="h-3 w-px bg-black/[0.12]" />
                                    <span>{post.date}</span>
                                    <span className="h-3 w-px bg-black/[0.12]" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
