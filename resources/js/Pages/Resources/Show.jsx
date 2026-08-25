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

const POST = {
    slug: 'understanding-transformer-architecture',
    title: 'Understanding Transformer Architecture',
    category: 'AI Fundamentals',
    author: 'Dr. Sarah Mitchell',
    authorRole: 'Head of Curriculum',
    date: 'January 15, 2024',
    readTime: '8 min read',
};

const RELATED_POSTS = [
    {
        slug: 'transfer-learning-practical-guide',
        title: 'Transfer Learning: A Practical Guide',
        category: 'AI Fundamentals',
    },
    {
        slug: 'building-first-neural-network',
        title: 'Building Your First Neural Network',
        category: 'Machine Learning',
    },
    {
        slug: 'deploy-ml-models-production',
        title: '5 Steps to Deploy ML Models in Production',
        category: 'Tutorials',
    },
];

const CATEGORIES = [
    { name: 'AI Fundamentals', count: 12 },
    { name: 'Machine Learning', count: 18 },
    { name: 'Tutorials', count: 14 },
    { name: 'Industry Insights', count: 9 },
];

export default function ResourcesShow() {
    return (
        <PublicLayout>
            <article className="pt-[120px] pb-[120px] max-lg:pb-[72px]">
                <div className="max-w-[1240px] mx-auto px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-muted mb-8">
                        <Link href="/" className="hover:text-body transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/resources" className="hover:text-body transition-colors">Resources</Link>
                        <span>/</span>
                        <span className="text-body">{POST.category}</span>
                        <span>/</span>
                        <span className="text-body truncate max-w-[200px]">{POST.title}</span>
                    </nav>

                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                        {/* Main Content */}
                        <div className="flex-1 max-w-3xl">
                            {/* Hero */}
                            <Badge variant="violet" className="mb-4">{POST.category}</Badge>
                            <h1 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-tight text-body">
                                {POST.title}
                            </h1>
                            <div className="flex items-center gap-3 mt-5 text-sm text-muted">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet to-lime flex items-center justify-center text-xs font-bold text-black/80">
                                        SM
                                    </div>
                                    <div>
                                        <span className="text-body font-medium">{POST.author}</span>
                                        <span className="text-muted ml-1">· {POST.authorRole}</span>
                                    </div>
                                </div>
                                <span className="h-3 w-px bg-black/[0.12]" />
                                <span>{POST.date}</span>
                                <span className="h-3 w-px bg-black/[0.12]" />
                                <span>{POST.readTime}</span>
                            </div>

                            {/* Featured Image */}
                            <div className="mt-8 h-72 md:h-96 rounded-2xl bg-gradient-to-br from-violet via-violet/60 to-ink flex items-center justify-center border border-black/[0.08]">
                                <div className="text-center">
                                    <div className="text-5xl mb-3">🧠</div>
                                    <div className="font-mono text-sm text-muted">Transformer Architecture</div>
                                </div>
                            </div>

                            {/* Article Body */}
                            <div className="mt-10 space-y-6 text-body/80 text-[1.0625rem] leading-[1.8]">
                                <p>
                                    The Transformer architecture, introduced in the seminal 2017 paper
                                    &quot;Attention Is All You Need&quot; by Vaswani et al., fundamentally changed
                                    the landscape of natural language processing and has since become the
                                    backbone of virtually every state-of-the-art AI model. Unlike its
                                    predecessors — RNNs and LSTMs — the Transformer processes entire sequences
                                    in parallel through a mechanism called self-attention, enabling dramatic
                                    improvements in both training speed and model performance.
                                </p>

                                <p>
                                    At its core, the Transformer relies on the self-attention mechanism to weigh
                                    the importance of different words in an input sequence relative to each
                                    other. When processing the word &quot;bank&quot; in &quot;river bank,&quot; the model
                                    attends to &quot;river&quot; to resolve the ambiguity — much like how humans use
                                    context. The architecture stacks multiple attention heads, each learning
                                    different relationship patterns, and feeds the results through feed-forward
                                    neural networks with residual connections and layer normalization.
                                </p>

                                <h3 className="font-display text-xl font-semibold text-body pt-4">
                                    Key Components
                                </h3>

                                <p>
                                    The encoder-decoder structure of the original Transformer has evolved into
                                    several variants: encoder-only models like BERT excel at understanding
                                    tasks (classification, named entity recognition), decoder-only models like
                                    GPT shine at text generation, and encoder-decoder models like T5 handle
                                    sequence-to-sequence tasks. Modern large language models (LLMs) predominantly
                                    use the decoder-only architecture with scaled-up parameters, longer context
                                    windows, and training on massive text corpora.
                                </p>

                                <p>
                                    Understanding the Transformer is essential for anyone working in modern AI.
                                    Whether you&apos;re fine-tuning a pre-trained model, designing a new architecture,
                                    or simply trying to understand why LLMs behave the way they do, the
                                    principles of self-attention, positional encoding, and multi-head attention
                                    form the foundation of your knowledge. As the field evolves with innovations
                                    like sparse attention, mixture of experts, and retrieval-augmented generation,
                                    the core Transformer principles remain the starting point for every advance.
                                </p>
                            </div>

                            {/* Social Share */}
                            <div className="mt-10 pt-8 border-t border-black/[0.08]">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-muted font-medium">Share this article:</span>
                                    <div className="flex gap-2">
                                        {['Twitter', 'LinkedIn', 'Reddit'].map((platform) => (
                                            <button
                                                key={platform}
                                                className="h-9 px-4 rounded-full border border-black/[0.12] bg-black/[0.04] text-xs font-medium text-muted transition-all hover:border-lime/30 hover:text-body"
                                            >
                                                {platform}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Back Link */}
                            <div className="mt-8">
                                <Link
                                    href="/resources"
                                    className="inline-flex items-center text-sm text-violet font-semibold hover:text-lime transition-colors"
                                >
                                    ← Back to Resources
                                </Link>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="w-full lg:w-80 shrink-0 space-y-8">
                            {/* Related Posts */}
                            <div className="bg-panel border border-black/[0.08] rounded-2xl p-6">
                                <h3 className="font-display text-lg font-semibold text-body mb-4">
                                    Related Articles
                                </h3>
                                <div className="space-y-4">
                                    {RELATED_POSTS.map((rp) => (
                                        <Link
                                            key={rp.slug}
                                            href={`/resources/${rp.slug}`}
                                            className="block group"
                                        >
                                            <Badge variant="muted" className="text-[10px] mb-1.5">{rp.category}</Badge>
                                            <div className="text-sm font-medium text-body group-hover:text-lime transition-colors leading-snug">
                                                {rp.title}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="bg-panel border border-black/[0.08] rounded-2xl p-6">
                                <h3 className="font-display text-lg font-semibold text-body mb-4">
                                    Categories
                                </h3>
                                <div className="space-y-3">
                                    {CATEGORIES.map((cat) => (
                                        <Link
                                            key={cat.name}
                                            href="/resources"
                                            className="flex items-center justify-between text-sm group"
                                        >
                                            <span className="text-body/80 group-hover:text-lime transition-colors">{cat.name}</span>
                                            <span className="font-mono text-xs text-muted">{cat.count}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="bg-gradient-to-br from-violet/20 to-lime/10 border border-black/[0.08] rounded-2xl p-6 text-center">
                                <h4 className="font-display text-lg font-semibold text-body">
                                    Ready to go deeper?
                                </h4>
                                <p className="text-sm text-muted mt-2">
                                    Explore our full courses on AI Fundamentals.
                                </p>
                                <Button href="/courses" size="sm" className="mt-4 w-full">
                                    Browse Courses
                                </Button>
                            </div>
                        </aside>
                    </div>
                </div>
            </article>
        </PublicLayout>
    );
}
