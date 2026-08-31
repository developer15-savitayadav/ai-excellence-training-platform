import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import Button from '../../Components/ui/Button';
import ProgressBar from '../../Components/ui/ProgressBar';
import Badge from '../../Components/ui/Badge';
import StarRating from '../../Components/ui/StarRating';
import Avatar from '../../Components/ui/Avatar';

/* ─────────────────────────── STATIC DATA (Phase 1) ─────────────────────────── */

const STATIC_USER = {
    id: 1,
    name: 'Alex Morgan',
    email: 'alex@cortex.academy',
    avatar: null,
};

const STATIC_INSTRUCTOR = {
    id: 1,
    name: 'Dr. Elena Vasquez',
    avatar: null,
    bio: 'Dr. Vasquez is a leading researcher in applied machine learning with over 12 years of experience building production AI systems. She previously led the ML platform team at DeepScale and has published 30+ papers in top-tier venues including NeurIPS, ICML, and ACL. Her teaching philosophy centers on hands-on, project-based learning that bridges the gap between theory and real-world deployment.',
    rating: 4.8,
    courseCount: 12,
    studentCount: 8400,
    specialties: ['Deep Learning', 'NLP', 'MLOps'],
};

const STATIC_SECTIONS = [
    {
        id: 's1',
        title: 'Foundations of Neural Networks',
        lessons: [
            {
                id: 'l1',
                title: 'Introduction to Neural Architecture',
                type: 'video',
                duration: '18:42',
                durationSec: 1122,
                description:
                    'An introductory overview of neural network architecture, covering perceptrons, layers, weights, and the biological inspiration behind artificial neural networks.',
                content: null,
                objectives: [
                    'Understand the biological inspiration for neural networks',
                    'Identify key components: neurons, layers, weights, biases',
                    'Describe the forward pass at a high level',
                ],
            },
            {
                id: 'l2',
                title: 'Activation Functions Deep Dive',
                type: 'article',
                duration: '12 min read',
                durationSec: 720,
                description:
                    'A comprehensive article examining the most important activation functions used in modern deep learning.',
                content: `
<h2 class="font-display text-xl font-semibold text-body mb-4">Activation Functions Deep Dive</h2>

<p class="text-body/70 leading-relaxed mb-6">Activation functions introduce <strong class="text-body">non-linearity</strong> into neural networks, enabling them to learn complex patterns. Without them, a neural network would collapse into a simple linear model regardless of how many layers it has.</p>

<h3 class="font-display text-lg font-semibold text-body mb-3">Sigmoid</h3>
<p class="text-body/70 leading-relaxed mb-6">The sigmoid function σ(x) = 1/(1+e⁻ˣ) maps any input to the range (0, 1). While historically popular, it suffers from vanishing gradients for large |x| values, making deep network training difficult. It's still useful for binary output layers.</p>

<h3 class="font-display text-lg font-semibold text-body mb-3">ReLU</h3>
<p class="text-body/70 leading-relaxed mb-6">Rectified Linear Unit: f(x) = max(0, x). The de facto default for hidden layers. Computationally efficient and mitigates vanishing gradients for positive values. The "dying ReLU" problem occurs when neurons permanently output zero.</p>

<h3 class="font-display text-lg font-semibold text-body mb-3">GELU</h3>
<p class="text-body/70 leading-relaxed mb-6">Gaussian Error Linear Unit: f(x) = x · Φ(x). Used in Transformer architectures like GPT and BERT. It smooths the ReLU transition and has a probabilistic interpretation, yielding better training dynamics in large models.</p>

<h3 class="font-display text-lg font-semibold text-body mb-3">Swish / SiLU</h3>
<p class="text-body/70 leading-relaxed mb-6">f(x) = x · σ(x). Discovered by Google Brain through automated search. Smooth and non-monotonic, it often slightly outperforms ReLU in deeper networks. Used in EfficientNet and modern architectures.</p>

<h3 class="font-display text-lg font-semibold text-body mb-3">Softmax</h3>
<p class="text-body/70 leading-relaxed">Converts a vector of logits into a probability distribution. Essential for multi-class classification output layers. Each output is in (0,1) and all outputs sum to 1.</p>
`,
                objectives: [
                    'Explain why activation functions are necessary',
                    'Compare Sigmoid, ReLU, GELU, Swish, and Softmax',
                    'Choose appropriate activation functions for different scenarios',
                ],
            },
            {
                id: 'l3',
                title: 'Backpropagation & Gradient Descent',
                type: 'video',
                duration: '24:15',
                durationSec: 1455,
                description:
                    'Master the core algorithm that makes neural network training possible: backpropagation combined with stochastic gradient descent.',
                content: null,
                objectives: [
                    'Understand the chain rule in the context of neural networks',
                    'Trace gradient flow through multiple layers',
                    'Differentiate between batch, mini-batch, and stochastic gradient descent',
                ],
            },
            {
                id: 'l4',
                title: 'Loss Functions & Optimization',
                type: 'article',
                duration: '10 min read',
                durationSec: 600,
                description:
                    'Explore the landscape of loss functions and modern optimizers that drive convergence in deep learning.',
                content: `
<h2 class="font-display text-xl font-semibold text-body mb-4">Loss Functions & Optimization</h2>

<p class="text-body/70 leading-relaxed mb-6">The loss function quantifies how wrong the model's predictions are compared to ground truth. The optimizer's job is to minimize this loss by adjusting model parameters.</p>

<h3 class="font-display text-lg font-semibold text-body mb-3">Common Loss Functions</h3>
<ul class="list-disc list-inside text-body/70 space-y-2 mb-6">
    <li><strong class="text-body">Cross-Entropy Loss:</strong> Standard for classification. Measures divergence between predicted probability distribution and true labels.</li>
    <li><strong class="text-body">MSE Loss:</strong> Mean Squared Error for regression tasks. Heavily penalizes large errors due to squaring.</li>
    <li><strong class="text-body">Huber Loss:</strong> Combines MSE and MAE. Less sensitive to outliers than MSE while maintaining differentiability.</li>
    <li><strong class="text-body">Contrastive Loss:</strong> Used in similarity learning. Pulls similar pairs together and pushes dissimilar pairs apart in embedding space.</li>
</ul>

<h3 class="font-display text-lg font-semibold text-body mb-3">Modern Optimizers</h3>
<p class="text-body/70 leading-relaxed">SGD with momentum was long the standard, but adaptive methods like <strong class="text-body">Adam</strong> and <strong class="text-body">AdamW</strong> have become dominant. AdamW decouples weight decay from the gradient update, leading to better generalization. For large language models, <strong class="text-body">LAMB</strong> and <strong class="text-body">LARS</strong> enable large-batch training without losing accuracy.</p>
`,
                objectives: [
                    'Select the right loss function for your task',
                    'Understand how Adam and AdamW differ from vanilla SGD',
                    'Configure learning rate schedules effectively',
                ],
            },
            {
                id: 'l5',
                title: 'Build Your First Neural Network',
                type: 'assignment',
                duration: '45 min',
                durationSec: 2700,
                description:
                    'Hands-on assignment: build a fully-connected neural network from scratch using PyTorch to classify MNIST digits. You will implement the forward pass, define a loss function, and write a training loop.',
                content: null,
                objectives: [
                    'Implement a feedforward neural network in PyTorch',
                    'Write a complete training loop with loss tracking',
                    'Achieve >95% accuracy on the MNIST test set',
                ],
            },
        ],
    },
    {
        id: 's2',
        title: 'Convolutional Neural Networks',
        lessons: [
            {
                id: 'l6',
                title: 'Introduction to CNNs',
                type: 'video',
                duration: '21:30',
                durationSec: 1290,
                description:
                    'Learn how convolutional layers extract spatial features from images using learned filters and how pooling reduces dimensionality.',
                content: null,
                objectives: [
                    'Understand convolution operations and feature maps',
                    'Explain padding, stride, and kernel size',
                    'Describe pooling and its role in translation invariance',
                ],
            },
            {
                id: 'l7',
                title: 'Classic Architectures: LeNet to ResNet',
                type: 'article',
                duration: '15 min read',
                durationSec: 900,
                description:
                    'A historical and technical survey of landmark CNN architectures that shaped modern computer vision.',
                content: `
<h2 class="font-display text-xl font-semibold text-body mb-4">Classic Architectures: LeNet to ResNet</h2>

<p class="text-body/70 leading-relaxed mb-6">The evolution of CNN architectures tells the story of deep learning itself. Each breakthrough addressed specific limitations of its predecessors.</p>

<h3 class="font-display text-lg font-semibold text-body mb-3">LeNet-5 (1998)</h3>
<p class="text-body/70 leading-relaxed mb-6">Yann LeCun's pioneering work for handwritten digit recognition. Two convolutional layers followed by three fully connected layers. Proved that learned feature extraction could replace hand-crafted features.</p>

<h3 class="font-display text-lg font-semibold text-body mb-3">AlexNet (2012)</h3>
<p class="text-body/70 leading-relaxed mb-6">The architecture that ignited the deep learning revolution. Won ImageNet by a massive margin. Key innovations: ReLU activations, dropout regularization, GPU training, and data augmentation.</p>

<h3 class="font-display text-lg font-semibold text-body mb-3">VGGNet (2014)</h3>
<p class="text-body/70 leading-relaxed mb-6">Showed that depth matters. Used uniform 3×3 convolutions throughout. Simple, elegant, but computationally expensive. VGG-16 and VGG-19 remain popular as feature extractors for transfer learning.</p>

<h3 class="font-display text-lg font-semibold text-body mb-3">ResNet (2015)</h3>
<p class="text-body/70 leading-relaxed">Introduced skip connections (residual learning) to solve the degradation problem in very deep networks. Enabled training of 152+ layer networks. The identity shortcut is one of the most impactful ideas in deep learning.</p>
`,
                objectives: [
                    'Trace the evolution from LeNet to modern architectures',
                    'Explain why skip connections solve the degradation problem',
                    'Identify architectural patterns used in practice today',
                ],
            },
            {
                id: 'l8',
                title: 'Transfer Learning & Fine-Tuning',
                type: 'video',
                duration: '19:05',
                durationSec: 1145,
                description:
                    'Learn how to leverage pre-trained models to solve new vision tasks with minimal data and compute.',
                content: null,
                objectives: [
                    'Understand the intuition behind transfer learning',
                    'Implement feature extraction with pre-trained models',
                    'Fine-tune specific layers while freezing others',
                ],
            },
            {
                id: 'l9',
                title: 'Image Classification Challenge',
                type: 'assignment',
                duration: '60 min',
                durationSec: 3600,
                description:
                    'Fine-tune a pre-trained ResNet-50 on a custom image dataset. You will implement data augmentation, learning rate scheduling, and evaluate your model using multiple metrics.',
                content: null,
                objectives: [
                    'Fine-tune ResNet-50 on a custom dataset',
                    'Apply data augmentation strategies',
                    'Achieve >90% accuracy with less than 1000 training images',
                ],
            },
        ],
    },
    {
        id: 's3',
        title: 'Transformers & Attention',
        lessons: [
            {
                id: 'l10',
                title: 'The Attention Mechanism',
                type: 'video',
                duration: '26:10',
                durationSec: 1570,
                description:
                    'Deep dive into self-attention, multi-head attention, and the transformer architecture that revolutionized NLP and beyond.',
                content: null,
                objectives: [
                    'Understand scaled dot-product attention',
                    'Explain multi-head attention and its benefits',
                    'Trace data flow through a transformer block',
                ],
            },
            {
                id: 'l11',
                title: 'Positional Encoding & Embeddings',
                type: 'article',
                duration: '8 min read',
                durationSec: 480,
                description:
                    'How transformers learn sequence order without recurrence, using sinusoidal and learned positional encodings.',
                content: `
<h2 class="font-display text-xl font-semibold text-body mb-4">Positional Encoding & Embeddings</h2>

<p class="text-body/70 leading-relaxed mb-6">Unlike RNNs, transformers process all tokens simultaneously. This means they have no inherent notion of order. Positional encodings inject sequence position information into the model.</p>

<h3 class="font-display text-lg font-semibold text-body mb-3">Sinusoidal Encoding</h3>
<p class="text-body/70 leading-relaxed mb-6">The original transformer used fixed sinusoidal functions of different frequencies. Each dimension corresponds to a different frequency, creating a unique "fingerprint" for each position. The model can learn to attend to relative positions through linear combinations.</p>

<h3 class="font-display text-lg font-semibold text-body mb-3">Learned Embeddings</h3>
<p class="text-body/70 leading-relaxed">Many modern models simply learn position embeddings as trainable parameters. GPT-2 and BERT both use this approach. While less mathematically elegant, it works well in practice and is simpler to implement. The trade-off is a fixed maximum sequence length.</p>
`,
                objectives: [
                    'Explain why transformers need positional information',
                    'Compare sinusoidal and learned positional encodings',
                    'Understand RoPE (Rotary Position Embedding) at a high level',
                ],
            },
            {
                id: 'l12',
                title: 'Building a GPT from Scratch',
                type: 'quiz',
                duration: '15 questions',
                durationSec: 900,
                description:
                    'Test your understanding of transformer architectures, attention mechanisms, and language model training with this comprehensive quiz.',
                content: null,
                objectives: [
                    'Demonstrate mastery of transformer internals',
                    'Apply knowledge to practical architecture decisions',
                    'Identify common pitfalls in transformer-based systems',
                ],
            },
            {
                id: 'l13',
                title: 'Fine-Tuning Large Language Models',
                type: 'video',
                duration: '22:50',
                durationSec: 1370,
                description:
                    'Practical guide to fine-tuning LLMs using LoRA, QLoRA, and prompt tuning techniques for efficient adaptation.',
                content: null,
                objectives: [
                    'Implement LoRA for parameter-efficient fine-tuning',
                    'Compare full fine-tuning vs adapter methods',
                    'Evaluate fine-tuned models effectively',
                ],
            },
            {
                id: 'l14',
                title: 'Capstone: Transformer Project',
                type: 'assignment',
                duration: '90 min',
                durationSec: 5400,
                description:
                    'Build a complete transformer-based text classifier. You will implement the attention mechanism, train on a real dataset, and deploy with an API endpoint.',
                content: null,
                objectives: [
                    'Implement multi-head self-attention from scratch',
                    'Train a transformer classifier on a real-world dataset',
                    'Deploy the model behind a REST API',
                ],
            },
        ],
    },
];

const FLATTENED_LESSONS = STATIC_SECTIONS.flatMap((s) => s.lessons);

const STATIC_QUIZ = {
    id: 'q1',
    title: 'Building a GPT from Scratch',
    timeLimit: 900,
    questions: [
        {
            id: 'qq1',
            text: 'What is the primary advantage of multi-head attention over single-head attention?',
            options: [
                'It uses less memory',
                'It allows the model to attend to information from different representation subspaces at different positions',
                'It reduces the number of parameters',
                'It eliminates the need for positional encoding',
            ],
            correctIndex: 1,
            explanation:
                'Multi-head attention runs several attention operations in parallel, each with different learned projections. This lets the model capture different types of relationships (syntactic, semantic, positional) simultaneously.',
        },
        {
            id: 'qq2',
            text: 'In the transformer architecture, what is the purpose of the Layer Normalization step?',
            options: [
                'To increase the dimensionality of representations',
                'To speed up training by normalizing activations across the feature dimension',
                'To randomly drop connections between layers',
                'To add noise for regularization',
            ],
            correctIndex: 1,
            explanation:
                'Layer Normalization normalizes the inputs to each sub-layer across the feature dimension, stabilizing training. It helps with gradient flow and allows higher learning rates, which is critical for training deep transformers.',
        },
        {
            id: 'qq3',
            text: 'What does the "scaling" in "scaled dot-product attention" refer to?',
            options: [
                'Scaling the output to sum to 1',
                'Dividing the dot product by √dₖ to prevent large values from saturating softmax',
                'Scaling the query and key vectors to unit length',
                'Scaling the attention output by the number of heads',
            ],
            correctIndex: 1,
            explanation:
                'Dividing by √dₖ keeps the dot product magnities reasonable. Without scaling, large dimensionality causes dot products to grow, pushing softmax into regions with extremely small gradients.',
        },
        {
            id: 'qq4',
            text: 'Which masking technique is used in the decoder of a GPT-style transformer during training?',
            options: [
                'Spatial masking (like in vision)',
                'Padding mask only',
                'Causal (look-ahead) mask that prevents attending to future tokens',
                'Dropout mask applied to attention weights',
            ],
            correctIndex: 2,
            explanation:
                'The causal mask ensures each position can only attend to itself and previous positions. This is essential for autoregressive language modeling where the model should never "peek" at future tokens during training.',
        },
        {
            id: 'qq5',
            text: 'What is the computational complexity of standard self-attention with respect to sequence length n?',
            options: [
                'O(n)',
                'O(n log n)',
                'O(n²)',
                'O(n³)',
            ],
            correctIndex: 2,
            explanation:
                'Self-attention computes attention scores between every pair of positions, resulting in an n×n matrix. This quadratic complexity is a key bottleneck that has motivated research into efficient attention variants like linear attention and sparse attention patterns.',
        },
    ],
};

const STATIC_RESOURCES = [
    { id: 'r1', name: 'Neural Networks Cheat Sheet.pdf', type: 'pdf', size: '2.4 MB' },
    { id: 'r2', name: 'CNN Architecture Reference.py', type: 'code', size: '12 KB' },
    { id: 'r3', name: 'Transformer Implementation Guide.pdf', type: 'pdf', size: '5.1 MB' },
    { id: 'r4', name: 'Training Hyperparameters Template.json', type: 'code', size: '3 KB' },
];

const STATIC_NOTES = [
    {
        id: 'n1',
        content: 'Remember: ReLU can cause dying neurons — consider LeakyReLU for sparse data.',
        timestamp: '2026-08-18T14:30:00Z',
    },
    {
        id: 'n2',
        content: 'The √dₖ scaling in attention is crucial — without it gradients vanish in deep transformers.',
        timestamp: '2026-08-19T09:15:00Z',
    },
];

const LESSON_TYPE_ICON = { video: '🎬', article: '📄', quiz: '❓', assignment: '📝' };

/* ─────────────────────────── HELPER ─────────────────────────── */

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
}

function getResourceIcon(type) {
    if (type === 'pdf') return '📄';
    if (type === 'code') return '💻';
    return '📁';
}

/* ─────────────────────────── COMPONENTS ─────────────────────────── */

/* ───── Top Header Bar ───── */
function TopHeaderBar({ course, progressPct, onToggleSidebar }) {
    return (
        <header className="h-14 bg-surface border-b border-black/[0.08] flex items-center px-4 flex-shrink-0 z-30">
            <div className="flex items-center gap-3 min-w-0 flex-1">
                <button
                    onClick={onToggleSidebar}
                    className="lg:hidden p-1.5 rounded-lg hover:bg-black/[0.06] text-muted mr-1"
                    aria-label="Toggle sidebar"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <Link
                    href="/dashboard"
                    className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-black/[0.06] text-muted shrink-0"
                    aria-label="Back to dashboard"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <span className="font-display font-semibold text-sm text-body truncate hidden sm:inline">
                    {course.title}
                </span>
            </div>

            <div className="hidden md:flex items-center gap-3 mx-auto">
                <ProgressBar value={progressPct} className="w-48" height="sm" />
                <span className="font-mono text-xs text-muted whitespace-nowrap">{Math.round(progressPct)}% Complete</span>
            </div>

            <div className="flex items-center justify-end flex-1">
                <Link
                    href="/dashboard"
                    className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-black/[0.06] text-muted"
                    aria-label="Close"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </Link>
            </div>
        </header>
    );
}

/* ───── Sidebar Curriculum Tree ───── */
function Sidebar({
    sections,
    currentLessonId,
    completedLessons,
    onSelectLesson,
    collapsed,
    onToggleCollapse,
    mobileOpen,
    onCloseMobile,
}) {
    const [expandedSections, setExpandedSections] = useState(() => new Set(sections.map((s) => s.id)));

    function toggleSection(id) {
        setExpandedSections((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }

    const totalLessons = FLATTENED_LESSONS.length;
    const completedCount = completedLessons.size;

    /* Mobile overlay wrapper */
    const sidebarContent = (
        <div
            className={cn(
                'bg-surface h-full flex flex-col transition-all duration-200',
                collapsed ? 'w-16' : 'w-80'
            )}
        >
            {!collapsed && (
                <>
                    {/* Course progress */}
                    <div className="p-4 border-b border-black/[0.08]">
                        <h2 className="font-display font-semibold text-sm text-body mb-2 truncate">{course.title}</h2>
                        <ProgressBar value={(completedCount / totalLessons) * 100} height="sm" />
                        <p className="font-mono text-xs text-muted mt-1.5">
                            {completedCount}/{totalLessons} lessons
                        </p>
                    </div>

                    {/* Curriculum tree */}
                    <div className="flex-1 overflow-y-auto py-2">
                        {sections.map((section) => (
                            <div key={section.id} className="mb-1">
                                <button
                                    onClick={() => toggleSection(section.id)}
                                    className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-black/[0.04] text-left"
                                >
                                    <svg
                                        className={cn(
                                            'w-3.5 h-3.5 text-muted transition-transform shrink-0',
                                            expandedSections.has(section.id) && 'rotate-90'
                                        )}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    <span className="font-display font-medium text-xs text-body truncate flex-1">
                                        {section.title}
                                    </span>
                                    <span className="font-mono text-[10px] text-muted shrink-0">
                                        {section.lessons.length}
                                    </span>
                                </button>

                                {expandedSections.has(section.id) && (
                                    <div>
                                        {section.lessons.map((lesson) => {
                                            const isActive = lesson.id === currentLessonId;
                                            const isDone = completedLessons.has(lesson.id);
                                            return (
                                                <button
                                                    key={lesson.id}
                                                    onClick={() => {
                                                        onSelectLesson(lesson.id);
                                                        if (mobileOpen) onCloseMobile();
                                                    }}
                                                    className={cn(
                                                        'w-full flex items-center gap-2.5 pl-8 pr-4 py-2 text-left transition-colors',
                                                        isActive
                                                            ? 'bg-lime/10 border-l-2 border-lime'
                                                            : 'border-l-2 border-transparent hover:bg-black/[0.04]'
                                                    )}
                                                >
                                                    <span className="text-sm shrink-0">{LESSON_TYPE_ICON[lesson.type]}</span>
                                                    <span
                                                        className={cn(
                                                            'text-xs truncate flex-1',
                                                            isActive ? 'text-body font-medium' : 'text-muted'
                                                        )}
                                                    >
                                                        {lesson.title}
                                                    </span>
                                                    {isDone ? (
                                                        <span className="text-success text-xs shrink-0">✓</span>
                                                    ) : (
                                                        <span className="font-mono text-[10px] text-muted shrink-0">
                                                            {lesson.duration}
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}

            {collapsed && (
                <div className="flex flex-col items-center gap-3 pt-4">
                    <button
                        onClick={onToggleCollapse}
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-black/[0.06] text-muted"
                        aria-label="Expand sidebar"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    {FLATTENED_LESSONS.map((lesson) => (
                        <button
                            key={lesson.id}
                            onClick={() => onSelectLesson(lesson.id)}
                            title={lesson.title}
                            className={cn(
                                'w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-colors',
                                lesson.id === currentLessonId
                                    ? 'bg-lime/15 text-lime'
                                    : completedLessons.has(lesson.id)
                                    ? 'text-success'
                                    : 'text-muted hover:bg-black/[0.06]'
                            )}
                        >
                            {completedLessons.has(lesson.id) ? '✓' : LESSON_TYPE_ICON[lesson.type]}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex flex-shrink-0 border-r border-black/[0.08] overflow-hidden">
                {sidebarContent}
            </aside>

            {/* Mobile sidebar overlay */}
            {mobileOpen && (
                <div className="lg:hidden fixed inset-0 z-40 flex">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onCloseMobile}
                    />
                    <div className="relative z-10 w-80 max-w-[85vw] shadow-2xl">
                        <div className="absolute top-2 right-2 z-20">
                            <button
                                onClick={onCloseMobile}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-black/[0.06] text-muted hover:text-body"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {sidebarContent}
                    </div>
                </div>
            )}
        </>
    );
}

/* ───── Video Lesson ───── */
function VideoLesson({ lesson, isComplete, onToggleComplete, onPrev, onNext, hasPrev, hasNext }) {
    const [playing, setPlaying] = useState(false);

    return (
        <div className="w-full">
            <div className="aspect-video bg-black rounded-xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet/25 via-black/40 to-lime/15 flex items-center justify-center">
                    <button
                        onClick={() => setPlaying(!playing)}
                        className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all hover:scale-105"
                    >
                        {playing ? (
                            <svg className="w-8 h-8 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <rect x="6" y="5" width="4" height="14" rx="1" />
                                <rect x="14" y="5" width="4" height="14" rx="1" />
                            </svg>
                        ) : (
                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Controls bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent pt-8 pb-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setPlaying(!playing)} className="text-white/80 hover:text-white">
                            {playing ? (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <rect x="6" y="5" width="4" height="14" rx="1" />
                                    <rect x="14" y="5" width="4" height="14" rx="1" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>
                        <div className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer">
                            <div className="h-full bg-lime rounded-full" style={{ width: '35%' }} />
                        </div>
                        <span className="font-mono text-[10px] text-white/60">6:32 / {lesson.duration}</span>
                        <button className="text-white/60 hover:text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 12h.01" />
                            </svg>
                        </button>
                        <button className="text-white/60 hover:text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h2 className="font-display font-semibold text-lg text-body">{lesson.title}</h2>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant={isComplete ? 'secondary' : 'primary'} size="sm" onClick={onToggleComplete}>
                        {isComplete ? '✓ Completed' : 'Mark as Complete'}
                    </Button>
                </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
                <Button variant="ghost" size="sm" disabled={!hasPrev} onClick={onPrev}>
                    ← Previous
                </Button>
                <Button variant="ghost" size="sm" disabled={!hasNext} onClick={onNext}>
                    Next →
                </Button>
            </div>
        </div>
    );
}

/* ───── Article Lesson ───── */
function ArticleLesson({ lesson, isComplete, onToggleComplete, onPrev, onNext, hasPrev, hasNext }) {
    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <Badge variant="violet" className="mb-4">Article</Badge>
            <h2 className="font-display font-bold text-2xl text-body mb-2">{lesson.title}</h2>
            <p className="text-muted text-sm mb-8">{lesson.duration}</p>

            <div
                className="prose-invert max-w-none text-body/80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
            />

            <div className="mt-10 pt-6 border-t border-black/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <Button variant={isComplete ? 'secondary' : 'primary'} size="sm" onClick={onToggleComplete}>
                    {isComplete ? '✓ Completed' : 'Mark as Complete'}
                </Button>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" disabled={!hasPrev} onClick={onPrev}>
                        ← Previous
                    </Button>
                    <Button variant="ghost" size="sm" disabled={!hasNext} onClick={onNext}>
                        Next →
                    </Button>
                </div>
            </div>
        </div>
    );
}

/* ───── Quiz Runner ───── */
function QuizRunner({ quiz, onComplete }) {
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [results, setResults] = useState(null);
    const [timeLeft, setTimeLeft] = useState(quiz.timeLimit);

    useEffect(() => {
        if (submitted) return;
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }
        const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearInterval(timer);
    }, [submitted, timeLeft]);

    const questions = quiz.questions;
    const question = questions[currentQ];

    function selectAnswer(idx) {
        if (submitted) return;
        setAnswers((prev) => ({ ...prev, [currentQ]: idx }));
    }

    function handleSubmit() {
        let correct = 0;
        const detail = questions.map((q, i) => {
            const chosen = answers[i];
            const isCorrect = chosen === q.correctIndex;
            if (isCorrect) correct++;
            return { ...q, chosenIndex: chosen, isCorrect };
        });
        setResults({ score: correct, total: questions.length, details });
        setSubmitted(true);
        if (correct >= Math.ceil(questions.length * 0.6)) {
            onComplete?.();
        }
    }

    const answeredCount = Object.keys(answers).length;
    const allAnswered = answeredCount === questions.length;

    if (submitted && results) {
        const pct = Math.round((results.score / results.total) * 100);
        const passed = pct >= 60;

        return (
            <div className="max-w-3xl mx-auto py-8 px-4">
                {/* Score header */}
                <div className={cn(
                    'rounded-xl p-6 mb-8 border',
                    passed ? 'bg-success/10 border-success/20' : 'bg-danger/10 border-danger/20'
                )}>
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            'w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-2xl',
                            passed ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
                        )}>
                            {pct}%
                        </div>
                        <div>
                            <h3 className="font-display font-semibold text-lg text-body">
                                {passed ? 'Congratulations!' : 'Keep Practicing'}
                            </h3>
                            <p className="text-sm text-muted">
                                {results.score}/{results.total} correct · {passed ? 'Passed' : 'Failed — 60% required'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Question review */}
                <h4 className="font-display font-semibold text-body mb-4">Review Answers</h4>
                <div className="space-y-6">
                    {results.details.map((q, i) => (
                        <div key={q.id} className={cn(
                            'rounded-xl border p-5',
                            q.isCorrect ? 'border-success/20 bg-success/5' : 'border-danger/20 bg-danger/5'
                        )}>
                            <div className="flex items-start gap-3">
                                <span className={cn(
                                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5',
                                    q.isCorrect ? 'bg-success text-black' : 'bg-danger text-white'
                                )}>
                                    {q.isCorrect ? '✓' : '✗'}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-body mb-2">{q.text}</p>
                                    <div className="space-y-1">
                                        {q.options.map((opt, j) => {
                                            const isCorrect = j === q.correctIndex;
                                            const isChosen = j === q.chosenIndex;
                                            return (
                                                <div
                                                    key={j}
                                                    className={cn(
                                                        'text-xs px-3 py-1.5 rounded-lg',
                                                        isCorrect
                                                            ? 'bg-success/15 text-success'
                                                            : isChosen && !isCorrect
                                                            ? 'bg-danger/15 text-danger line-through'
                                                            : 'text-muted'
                                                    )}
                                                >
                                                    {String.fromCharCode(65 + j)}. {opt}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <p className="text-xs text-muted mt-2 leading-relaxed">{q.explanation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            {/* Quiz header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Badge variant="danger">Quiz</Badge>
                    <h3 className="font-display font-semibold text-lg text-body mt-2">{quiz.title}</h3>
                    <p className="text-xs text-muted mt-0.5">
                        Question {currentQ + 1} of {questions.length}
                    </p>
                </div>
                <div className="text-right">
                    <p className="font-mono text-sm text-body">
                        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                    </p>
                    <p className="text-[10px] text-muted">time remaining</p>
                </div>
            </div>

            {/* Question dots */}
            <div className="flex items-center gap-1.5 mb-8">
                {questions.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentQ(i)}
                        className={cn(
                            'w-8 h-8 rounded-full text-xs font-mono font-medium transition-all',
                            i === currentQ
                                ? 'bg-lime text-black scale-110'
                                : answers[i] !== undefined
                                ? 'bg-violet/20 text-violet'
                                : 'bg-black/[0.06] text-muted hover:bg-black/[0.1]'
                        )}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Question */}
            <div className="bg-panel rounded-xl p-6 mb-6">
                <p className="font-body text-body font-medium leading-relaxed mb-6">{question.text}</p>
                <div className="space-y-3">
                    {question.options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => selectAnswer(i)}
                            className={cn(
                                'w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all',
                                answers[currentQ] === i
                                    ? 'border-lime bg-lime/10 text-body'
                                    : 'border-black/[0.08] hover:border-black/20 hover:bg-black/[0.04] text-muted hover:text-body'
                            )}
                        >
                            <span className={cn(
                                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border',
                                answers[currentQ] === i
                                    ? 'border-lime bg-lime/20 text-lime'
                                    : 'border-black/16 text-muted'
                            )}>
                                {String.fromCharCode(65 + i)}
                            </span>
                            <span className="text-sm">{opt}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    size="sm"
                    disabled={currentQ === 0}
                    onClick={() => setCurrentQ((q) => q - 1)}
                >
                    ← Previous
                </Button>
                {currentQ < questions.length - 1 ? (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentQ((q) => q + 1)}
                    >
                        Next →
                    </Button>
                ) : (
                    <Button
                        variant="primary"
                        size="sm"
                        disabled={!allAnswered}
                        onClick={handleSubmit}
                    >
                        Submit Quiz ({answeredCount}/{questions.length})
                    </Button>
                )}
            </div>
        </div>
    );
}

/* ───── Assignment Lesson ───── */
function AssignmentLesson({ lesson, isComplete, onToggleComplete, onPrev, onNext, hasPrev, hasNext }) {
    const [submitted, setSubmitted] = useState(false);
    const [textAnswer, setTextAnswer] = useState('');
    const [dragOver, setDragOver] = useState(false);

    function handleSubmit() {
        if (submitted) return;
        setSubmitted(true);
        onToggleComplete();
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <Badge variant="muted" className="mb-4">Assignment</Badge>
            <h2 className="font-display font-bold text-2xl text-body mb-2">{lesson.title}</h2>
            <p className="text-muted text-sm mb-6">{lesson.description}</p>

            {lesson.objectives && (
                <div className="bg-panel rounded-xl p-5 mb-6">
                    <h4 className="font-display font-semibold text-sm text-body mb-3">Learning Objectives</h4>
                    <ul className="space-y-2">
                        {lesson.objectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted">
                                <span className="text-lime mt-0.5">→</span>
                                {obj}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {submitted ? (
                <div className="bg-violet/10 border border-violet/20 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-violet/20 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="font-display font-semibold text-body mb-1">Pending Review</h3>
                    <p className="text-sm text-muted">Your submission has been received. The instructor will review it shortly.</p>
                </div>
            ) : (
                <>
                    {/* File upload */}
                    <div
                        className={cn(
                            'border-2 border-dashed rounded-xl p-8 text-center transition-colors mb-6',
                            dragOver
                                ? 'border-lime bg-lime/5'
                                : 'border-black/[0.12] hover:border-black/20'
                        )}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
                    >
                        <svg className="w-8 h-8 text-muted mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-muted mb-1">Drag and drop files here, or click to browse</p>
                        <p className="text-[10px] text-muted/60">PDF, ZIP, Python files up to 50MB</p>
                    </div>

                    {/* Text submission */}
                    <textarea
                        value={textAnswer}
                        onChange={(e) => setTextAnswer(e.target.value)}
                        placeholder="Or paste your solution / explanation here..."
                        rows={6}
                        className="w-full bg-panel border border-black/[0.08] rounded-xl p-4 text-sm text-body placeholder:text-muted/50 focus:outline-none focus:border-lime/40 resize-y mb-6"
                    />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" disabled={!hasPrev} onClick={onPrev}>← Previous</Button>
                            <Button variant="ghost" size="sm" disabled={!hasNext} onClick={onNext}>Next →</Button>
                        </div>
                        <Button variant="primary" size="sm" onClick={handleSubmit}>
                            Submit Assignment
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

/* ───── Tab Bar & Tab Panels ───── */
const TABS = ['Overview', 'Notes', 'Resources', 'Instructor'];

function TabPanel({ activeTab, lesson, notes, onAddNote, onDeleteNote, instructor }) {
    if (activeTab === 'Overview') {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="font-display font-semibold text-body mb-2">About this lesson</h3>
                    <p className="text-sm text-muted leading-relaxed">{lesson.description}</p>
                </div>
                {lesson.objectives && (
                    <div>
                        <h3 className="font-display font-semibold text-body mb-3">Key Takeaways</h3>
                        <ul className="space-y-2">
                            {lesson.objectives.map((obj, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                                    <span className="w-5 h-5 rounded-full bg-lime/15 text-lime flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                                        {i + 1}
                                    </span>
                                    {obj}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }

    if (activeTab === 'Notes') {
        return (
            <div>
                <h3 className="font-display font-semibold text-body mb-4">My Notes</h3>
                <NotesPanel notes={notes} onAdd={onAddNote} onDelete={onDeleteNote} />
            </div>
        );
    }

    if (activeTab === 'Resources') {
        return (
            <div>
                <h3 className="font-display font-semibold text-body mb-4">Resources</h3>
                <div className="space-y-2">
                    {STATIC_RESOURCES.map((res) => (
                        <div key={res.id} className="flex items-center gap-3 p-3 rounded-xl bg-panel hover:bg-black/[0.04] transition-colors">
                            <span className="text-lg">{getResourceIcon(res.type)}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-body truncate">{res.name}</p>
                                <p className="font-mono text-[10px] text-muted">{res.size}</p>
                            </div>
                            <button className="px-3 py-1.5 rounded-lg bg-black/[0.06] text-xs text-muted hover:text-body hover:bg-black/[0.1] transition-colors">
                                Download
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (activeTab === 'Instructor') {
        return (
            <div>
                <h3 className="font-display font-semibold text-body mb-4">Instructor</h3>
                <div className="bg-panel rounded-xl p-5">
                    <div className="flex items-center gap-4 mb-4">
                        <Avatar name={instructor.name} size="lg" />
                        <div>
                            <h4 className="font-display font-semibold text-body">{instructor.name}</h4>
                            <StarRating rating={instructor.rating} showValue size="sm" />
                        </div>
                    </div>
                    <p className="text-sm text-muted leading-relaxed mb-4">{instructor.bio}</p>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="text-center">
                            <p className="font-mono font-bold text-body">{instructor.courseCount}</p>
                            <p className="text-[10px] text-muted">Courses</p>
                        </div>
                        <div className="text-center">
                            <p className="font-mono font-bold text-body">{(instructor.studentCount / 1000).toFixed(1)}k</p>
                            <p className="text-[10px] text-muted">Students</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {instructor.specialties.map((s) => (
                            <Badge key={s} variant="violet">{s}</Badge>
                        ))}
                    </div>
                    <Button variant="secondary" size="sm" className="w-full">
                        Message Instructor
                    </Button>
                </div>
            </div>
        );
    }

    return null;
}

function NotesPanel({ notes, onAdd, onDelete }) {
    const [newNote, setNewNote] = useState('');

    function handleSave() {
        if (!newNote.trim()) return;
        onAdd(newNote.trim());
        setNewNote('');
    }

    return (
        <div className="space-y-4">
            <div>
                <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Write a note about this lesson..."
                    rows={3}
                    className="w-full bg-panel border border-black/[0.08] rounded-xl p-3 text-sm text-body placeholder:text-muted/50 focus:outline-none focus:border-lime/40 resize-y"
                />
                <Button variant="primary" size="sm" className="mt-2" onClick={handleSave}>
                    Save Note
                </Button>
            </div>

            <div className="space-y-2">
                {notes.length === 0 && (
                    <p className="text-sm text-muted text-center py-4">No notes yet. Add one above.</p>
                )}
                {notes.map((note) => (
                    <div key={note.id} className="bg-panel rounded-xl p-3.5 group">
                        <p className="text-sm text-body/80 leading-relaxed mb-2">{note.content}</p>
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-muted">
                                {new Date(note.timestamp).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </span>
                            <button
                                onClick={() => onDelete(note.id)}
                                className="text-xs text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ───── Right Panel ───── */
function RightPanel({ sections, currentLessonId, completedLessons }) {
    const currentSection = sections.find((s) =>
        s.lessons.some((l) => l.id === currentLessonId)
    );

    if (!currentSection) return null;

    return (
        <aside className="hidden xl:block w-80 flex-shrink-0 border-l border-black/[0.08] overflow-y-auto bg-surface">
            <div className="p-4">
                <h4 className="font-display font-semibold text-xs text-muted uppercase tracking-wider mb-3">
                    {currentSection.title}
                </h4>
                <div className="space-y-1">
                    {currentSection.lessons.map((lesson) => {
                        const isActive = lesson.id === currentLessonId;
                        const isDone = completedLessons.has(lesson.id);
                        return (
                            <div
                                key={lesson.id}
                                className={cn(
                                    'flex items-center gap-2.5 p-2.5 rounded-lg transition-colors',
                                    isActive ? 'bg-lime/10' : ''
                                )}
                            >
                                <span className={cn(
                                    'w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0',
                                    isDone ? 'bg-success/20 text-success' : 'bg-black/[0.06] text-muted'
                                )}>
                                    {isDone ? '✓' : LESSON_TYPE_ICON[lesson.type]}
                                </span>
                                <span className={cn(
                                    'text-xs truncate',
                                    isActive ? 'text-body font-medium' : 'text-muted'
                                )}>
                                    {lesson.title}
                                </span>
                                <span className="font-mono text-[10px] text-muted ml-auto shrink-0">
                                    {lesson.duration}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}

/* ───── Keyboard Shortcuts Help ───── */
function ShortcutsHelp() {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="w-7 h-7 rounded-full bg-black/[0.06] text-muted hover:text-body flex items-center justify-center text-xs font-mono"
                title="Keyboard shortcuts"
            >
                ?
            </button>
            {open && (
                <div className="absolute bottom-full right-0 mb-2 bg-panel border border-black/[0.08] rounded-xl p-4 w-56 shadow-xl z-50">
                    <h5 className="font-display font-semibold text-xs text-body mb-3">Keyboard Shortcuts</h5>
                    <div className="space-y-2">
                        {[
                            ['Space', 'Play / Pause'],
                            ['←', 'Previous lesson'],
                            ['→', 'Next lesson'],
                        ].map(([key, desc]) => (
                            <div key={key} className="flex items-center justify-between">
                                <span className="text-xs text-muted">{desc}</span>
                                <kbd className="px-2 py-0.5 bg-black/[0.06] rounded text-[10px] font-mono text-muted">{key}</kbd>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN PLAYER COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */

export default function Player() {
    const { props } = usePage();
    const course = props.course ?? { title: 'AI Excellence Academy — Deep Learning Mastery' };
    const sections = props.sections ?? STATIC_SECTIONS;
    const allLessons = useMemo(() => sections.flatMap((s) => s.lessons), [sections]);
    const initialLessonId = props.currentLesson?.id ?? allLessons[0]?.id;
    const instructor = STATIC_INSTRUCTOR;

    /* ── State ── */
    const [currentLessonId, setCurrentLessonId] = useState(initialLessonId);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('Overview');
    const [completedLessons, setCompletedLessons] = useState(() => {
        try {
            const stored = localStorage.getItem('cortex_completed_lessons');
            return stored ? new Set(JSON.parse(stored)) : new Set();
        } catch {
            return new Set();
        }
    });
    const [notes, setNotes] = useState(() => {
        try {
            const stored = localStorage.getItem('cortex_notes');
            return stored ? JSON.parse(stored) : STATIC_NOTES;
        } catch {
            return STATIC_NOTES;
        }
    });
    const contentRef = useRef(null);

    const currentLesson = useMemo(
        () => allLessons.find((l) => l.id === currentLessonId) ?? allLessons[0],
        [allLessons, currentLessonId]
    );
    const currentIndex = useMemo(
        () => allLessons.findIndex((l) => l.id === currentLessonId),
        [allLessons, currentLessonId]
    );

    /* ── Persistence ── */
    useEffect(() => {
        try {
            localStorage.setItem('cortex_completed_lessons', JSON.stringify([...completedLessons]));
        } catch { /* noop */ }
    }, [completedLessons]);

    useEffect(() => {
        try {
            localStorage.setItem('cortex_notes', JSON.stringify(notes));
        } catch { /* noop */ }
    }, [notes]);

    /* ── Progress ── */
    const progressPct = useMemo(
        () => (allLessons.length > 0 ? (completedLessons.size / allLessons.length) * 100 : 0),
        [completedLessons, allLessons]
    );

    /* ── Handlers ── */
    function handleSelectLesson(id) {
        setCurrentLessonId(id);
        setActiveTab('Overview');
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleToggleComplete() {
        setCompletedLessons((prev) => {
            const next = new Set(prev);
            if (next.has(currentLessonId)) next.delete(currentLessonId);
            else next.add(currentLessonId);
            return next;
        });
    }

    function handlePrev() {
        if (currentIndex > 0) handleSelectLesson(allLessons[currentIndex - 1].id);
    }

    function handleNext() {
        if (currentIndex < allLessons.length - 1) handleSelectLesson(allLessons[currentIndex + 1].id);
    }

    function handleAddNote(content) {
        setNotes((prev) => [
            { id: `n_${Date.now()}`, content, timestamp: new Date().toISOString() },
            ...prev,
        ]);
    }

    function handleDeleteNote(id) {
        setNotes((prev) => prev.filter((n) => n.id !== id));
    }

    /* ── Keyboard shortcuts ── */
    useEffect(() => {
        function onKey(e) {
            if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
            if (e.code === 'ArrowLeft') handlePrev();
            if (e.code === 'ArrowRight') handleNext();
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    });

    /* ── Render content by type ── */
    function renderLessonContent() {
        const isComplete = completedLessons.has(currentLessonId);

        switch (currentLesson.type) {
            case 'video':
                return (
                    <VideoLesson
                        lesson={currentLesson}
                        isComplete={isComplete}
                        onToggleComplete={handleToggleComplete}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        hasPrev={currentIndex > 0}
                        hasNext={currentIndex < allLessons.length - 1}
                    />
                );
            case 'article':
                return (
                    <ArticleLesson
                        lesson={currentLesson}
                        isComplete={isComplete}
                        onToggleComplete={handleToggleComplete}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        hasPrev={currentIndex > 0}
                        hasNext={currentIndex < allLessons.length - 1}
                    />
                );
            case 'quiz':
                return (
                    <QuizRunner
                        quiz={STATIC_QUIZ}
                        onComplete={handleToggleComplete}
                    />
                );
            case 'assignment':
                return (
                    <AssignmentLesson
                        lesson={currentLesson}
                        isComplete={isComplete}
                        onToggleComplete={handleToggleComplete}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        hasPrev={currentIndex > 0}
                        hasNext={currentIndex < allLessons.length - 1}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <div className="h-screen flex flex-col bg-ink overflow-hidden select-none">
            {/* Top header */}
            <TopHeaderBar
                course={course}
                progressPct={progressPct}
                onToggleSidebar={() => setSidebarOpen(true)}
            />

            {/* Main area */}
            <div className="flex-1 flex min-h-0">
                {/* Left sidebar */}
                <Sidebar
                    sections={sections}
                    currentLessonId={currentLessonId}
                    completedLessons={completedLessons}
                    onSelectLesson={handleSelectLesson}
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                    mobileOpen={sidebarOpen}
                    onCloseMobile={() => setSidebarOpen(false)}
                />

                {/* Center content */}
                <main ref={contentRef} className="flex-1 overflow-y-auto min-w-0">
                    {renderLessonContent()}

                    {/* Tabbed interface below content */}
                    {currentLesson.type !== 'quiz' && (
                        <div className="border-t border-black/[0.08] mt-8">
                            <div className="max-w-3xl mx-auto px-4">
                                {/* Tab bar */}
                                <div className="flex items-center gap-1 pt-4 overflow-x-auto">
                                    {TABS.map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={cn(
                                                'px-4 py-2.5 text-xs font-medium rounded-t-lg transition-colors whitespace-nowrap',
                                                activeTab === tab
                                                    ? 'bg-panel text-lime border-b-2 border-lime'
                                                    : 'text-muted hover:text-body hover:bg-black/[0.04]'
                                            )}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                    <div className="ml-auto">
                                        <ShortcutsHelp />
                                    </div>
                                </div>

                                {/* Tab content */}
                                <div className="py-6">
                                    <TabPanel
                                        activeTab={activeTab}
                                        lesson={currentLesson}
                                        notes={notes}
                                        onAddNote={handleAddNote}
                                        onDeleteNote={handleDeleteNote}
                                        instructor={instructor}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                {/* Right panel */}
                <RightPanel
                    sections={sections}
                    currentLessonId={currentLessonId}
                    completedLessons={completedLessons}
                />
            </div>
        </div>
    );
}
