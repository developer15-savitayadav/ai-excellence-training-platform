<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ResourceController extends Controller
{
    public function index()
    {
        return Inertia::render('Resources/Index', [
            'posts' => [
                [
                    'id' => 'post_001',
                    'slug' => 'future-of-transformers-in-2025',
                    'title' => 'The Future of Transformers in 2025',
                    'excerpt' => 'Exploring the latest breakthroughs in transformer architecture and what they mean for the AI industry in the coming year.',
                    'content' => 'Transformers have fundamentally reshaped the landscape of artificial intelligence since their introduction in 2017. As we move through 2025, several key developments are pushing the boundaries of what these architectures can achieve. The rise of Mixture of Experts (MoE) models has dramatically improved efficiency, allowing models with trillions of parameters to be deployed without proportional increases in compute cost. State-space models like Mamba are challenging the transformer paradigm with linear-time sequence processing. Meanwhile, multimodal transformers are unifying vision, language, and audio understanding into single coherent architectures. This article explores these trends and their implications for practitioners and researchers.',
                    'category' => 'Research',
                    'author' => ['name' => 'Dr. Sarah Mitchell', 'avatar' => '/avatars/sarah-mitchell.jpg'],
                    'publishedAt' => '2024-11-10',
                    'readTime' => 8,
                    'image' => '/images/blog/transformers-2025.jpg',
                ],
                [
                    'id' => 'post_002',
                    'slug' => 'building-production-rag-systems',
                    'title' => 'Building Production RAG Systems: Lessons Learned',
                    'excerpt' => 'A practical guide to deploying Retrieval-Augmented Generation systems at scale, covering common pitfalls and proven solutions.',
                    'content' => 'Retrieval-Augmented Generation has emerged as the dominant pattern for building production LLM applications. However, deploying RAG at scale presents unique challenges that go beyond simple prototype implementations. This guide covers vector database selection, chunking strategies, embedding model optimization, re-ranking techniques, and evaluation metrics that matter. Drawing from our experience deploying RAG systems for Fortune 500 companies, we share battle-tested patterns for handling multilingual content, real-time index updates, and hallucination detection.',
                    'category' => 'Tutorials',
                    'author' => ['name' => 'Prof. James Chen', 'avatar' => '/avatars/james-chen.jpg'],
                    'publishedAt' => '2024-11-05',
                    'readTime' => 12,
                    'image' => '/images/blog/production-rag.jpg',
                ],
                [
                    'id' => 'post_003',
                    'slug' => 'mlops-best-practices-2024',
                    'title' => 'MLOps Best Practices: From Prototype to Production',
                    'excerpt' => 'Comprehensive guide to ML operations including CI/CD pipelines, model monitoring, and automated retraining strategies.',
                    'content' => 'The gap between a working ML prototype and a reliable production system is enormous. This comprehensive guide distills the best practices we have developed across hundreds of ML deployments. We cover model versioning with MLflow, automated testing pipelines for ML models, feature store architectures, A/B testing for model comparisons, drift detection and automated retraining triggers, and cost optimization strategies. Each section includes concrete examples using modern MLOps tools and real deployment scenarios.',
                    'category' => 'Engineering',
                    'author' => ['name' => 'Dr. Anika Patel', 'avatar' => '/avatars/anika-patel.jpg'],
                    'publishedAt' => '2024-10-28',
                    'readTime' => 15,
                    'image' => '/images/blog/mlops-practices.jpg',
                ],
                [
                    'id' => 'post_004',
                    'slug' => 'ethical-ai-implementation-guide',
                    'title' => 'Ethical AI Implementation: A Practical Framework',
                    'excerpt' => 'How to embed fairness, transparency, and accountability into your AI development lifecycle.',
                    'content' => 'Responsible AI development is no longer optional. With regulations like the EU AI Act taking effect, organizations need concrete frameworks for implementing ethical AI practices. This article presents a practical framework covering bias detection and mitigation techniques, explainability methods for different model types, privacy-preserving ML approaches including federated learning and differential privacy, documentation standards for model cards and datasheets, and governance structures for AI projects. Each component includes actionable checklists and tool recommendations.',
                    'category' => 'Ethics',
                    'author' => ['name' => 'Dr. Lisa Wang', 'avatar' => '/avatars/lisa-wang.jpg'],
                    'publishedAt' => '2024-10-20',
                    'readTime' => 10,
                    'image' => '/images/blog/ethical-ai.jpg',
                ],
                [
                    'id' => 'post_005',
                    'slug' => 'computer-vision-automotive-industry',
                    'title' => 'Computer Vision in the Automotive Industry',
                    'excerpt' => 'How modern CV techniques are transforming autonomous driving, quality control, and smart manufacturing.',
                    'content' => 'The automotive industry is undergoing a revolution driven by computer vision technologies. From autonomous driving systems processing millions of sensor inputs per second to quality control on manufacturing lines detecting defects invisible to the human eye, CV is reshaping every aspect of the industry. This deep dive covers the latest in multi-modal sensor fusion, real-time object detection for autonomous vehicles, synthetic data generation for training, edge deployment optimization, and regulatory considerations for safety-critical AI systems.',
                    'category' => 'Industry',
                    'author' => ['name' => 'Dr. Luis Morales', 'avatar' => '/avatars/luis-morales.jpg'],
                    'publishedAt' => '2024-10-15',
                    'readTime' => 11,
                    'image' => '/images/blog/cv-automotive.jpg',
                ],
                [
                    'id' => 'post_006',
                    'slug' => 'reinforcement-learning-robotics-2024',
                    'title' => 'Reinforcement Learning for Robotics: State of the Art',
                    'excerpt' => 'Breaking down the latest advances in sim-to-real transfer and multi-agent robotic systems.',
                    'content' => 'Reinforcement learning has moved from Atari games to controlling real-world robots with remarkable speed. This survey covers the state of the art in sim-to-real transfer learning, where agents trained in simulation are deployed on physical robots. We examine domain randomization techniques, reward shaping strategies for continuous control, multi-agent coordination for swarm robotics, safe RL approaches for human-robot interaction, and the computational requirements for training robotic policies at scale. Includes case studies from manufacturing, healthcare, and space exploration.',
                    'category' => 'Research',
                    'author' => ['name' => 'Prof. Amara Okafor', 'avatar' => '/avatars/amara-okafor.jpg'],
                    'publishedAt' => '2024-10-08',
                    'readTime' => 14,
                    'image' => '/images/blog/rl-robotics.jpg',
                ],
            ],
            'categories' => [
                ['id' => 'cat_001', 'name' => 'All', 'count' => 48],
                ['id' => 'cat_002', 'name' => 'Research', 'count' => 14],
                ['id' => 'cat_003', 'name' => 'Tutorials', 'count' => 16],
                ['id' => 'cat_004', 'name' => 'Engineering', 'count' => 12],
                ['id' => 'cat_005', 'name' => 'Ethics', 'count' => 4],
                ['id' => 'cat_006', 'name' => 'Industry', 'count' => 8],
                ['id' => 'cat_007', 'name' => 'Career', 'count' => 6],
            ],
        ]);
    }

    public function show($slug)
    {
        $posts = $this->getPostIndex();
        $post = $posts[$slug] ?? $posts['future-of-transformers-in-2025'];

        return Inertia::render('Resources/Show', [
            'post' => $post,
            'relatedPosts' => [
                [
                    'id' => 'post_002',
                    'slug' => 'building-production-rag-systems',
                    'title' => 'Building Production RAG Systems: Lessons Learned',
                    'excerpt' => 'A practical guide to deploying RAG systems at scale.',
                    'category' => 'Tutorials',
                    'author' => ['name' => 'Prof. James Chen', 'avatar' => '/avatars/james-chen.jpg'],
                    'publishedAt' => '2024-11-05',
                    'readTime' => 12,
                    'image' => '/images/blog/production-rag.jpg',
                ],
                [
                    'id' => 'post_005',
                    'slug' => 'computer-vision-automotive-industry',
                    'title' => 'Computer Vision in the Automotive Industry',
                    'excerpt' => 'How modern CV techniques are transforming autonomous driving.',
                    'category' => 'Industry',
                    'author' => ['name' => 'Dr. Luis Morales', 'avatar' => '/avatars/luis-morales.jpg'],
                    'publishedAt' => '2024-10-15',
                    'readTime' => 11,
                    'image' => '/images/blog/cv-automotive.jpg',
                ],
                [
                    'id' => 'post_006',
                    'slug' => 'reinforcement-learning-robotics-2024',
                    'title' => 'Reinforcement Learning for Robotics: State of the Art',
                    'excerpt' => 'Breaking down the latest advances in sim-to-real transfer.',
                    'category' => 'Research',
                    'author' => ['name' => 'Prof. Amara Okafor', 'avatar' => '/avatars/amara-okafor.jpg'],
                    'publishedAt' => '2024-10-08',
                    'readTime' => 14,
                    'image' => '/images/blog/rl-robotics.jpg',
                ],
            ],
        ]);
    }

    private function getPostIndex()
    {
        return [
            'future-of-transformers-in-2025' => [
                'id' => 'post_001',
                'slug' => 'future-of-transformers-in-2025',
                'title' => 'The Future of Transformers in 2025',
                'excerpt' => 'Exploring the latest breakthroughs in transformer architecture and what they mean for the AI industry.',
                'content' => "Transformers have fundamentally reshaped the landscape of artificial intelligence since their introduction in the seminal 'Attention Is All You Need' paper in 2017. As we move through 2025, several key developments are pushing the boundaries of what these architectures can achieve.\n\n## Mixture of Experts at Scale\n\nThe rise of Mixture of Experts (MoE) models has dramatically improved efficiency. Models like Mixtral and Grok-1 demonstrate that sparse architectures can match or exceed dense model performance while using a fraction of the compute during inference. By activating only a subset of parameters for each input, MoE models achieve the representation capacity of much larger models without the proportional compute cost.\n\n## Beyond Transformers\n\nState-space models like Mamba and RWKV are challenging the transformer paradigm with linear-time sequence processing. While transformers have quadratic complexity with respect to sequence length, these alternatives offer constant or linear complexity, enabling efficient processing of extremely long sequences. Early results suggest these models can match transformer performance on many benchmarks while being significantly more efficient.\n\n## Multimodal Unification\n\nThe most exciting trend is the convergence of vision, language, and audio understanding into unified multimodal architectures. Models like GPT-4V, Gemini, and open-source alternatives demonstrate that single architectures can handle diverse modalities with remarkable proficiency. This unification is driving toward true multimodal reasoning rather than simple modality-specific processing.\n\n## Implications for Practitioners\n\nFor practitioners, these trends mean paying attention to architecture efficiency, not just raw parameter count. The best models of 2025 will be those that maximize performance per compute dollar, not just those with the most parameters.",
                'category' => 'Research',
                'author' => ['name' => 'Dr. Sarah Mitchell', 'avatar' => '/avatars/sarah-mitchell.jpg'],
                'publishedAt' => '2024-11-10',
                'readTime' => 8,
                'image' => '/images/blog/transformers-2025.jpg',
                'tags' => ['transformers', 'architecture', 'MoE', 'multimodal', 'research'],
            ],
            'building-production-rag-systems' => [
                'id' => 'post_002',
                'slug' => 'building-production-rag-systems',
                'title' => 'Building Production RAG Systems: Lessons Learned',
                'excerpt' => 'A practical guide to deploying Retrieval-Augmented Generation systems at scale.',
                'content' => "Retrieval-Augmented Generation has emerged as the dominant pattern for building production LLM applications. However, deploying RAG at scale presents unique challenges.\n\n## Vector Database Selection\n\nChoosing the right vector database depends on your scale, latency requirements, and budget. Pinecone offers managed simplicity, Weaviate provides flexibility with hybrid search, Milvus excels at massive scale, and pgvector integrates with existing PostgreSQL infrastructure.\n\n## Chunking Strategies\n\nHow you chunk your documents dramatically affects retrieval quality. Fixed-size chunking is simple but naive. Semantic chunking using embedding similarity groups related content together. Hierarchical chunking creates parent-child relationships that enable context-aware retrieval.\n\n## Evaluation That Matters\n\nBeyond simple retrieval accuracy, measure end-to-end answer quality using metrics like faithfulness (does the answer follow from retrieved context?), relevance (is the retrieved context useful?), and completeness (does the answer address all aspects of the query?).",
                'category' => 'Tutorials',
                'author' => ['name' => 'Prof. James Chen', 'avatar' => '/avatars/james-chen.jpg'],
                'publishedAt' => '2024-11-05',
                'readTime' => 12,
                'image' => '/images/blog/production-rag.jpg',
                'tags' => ['rag', 'llm', 'vector database', 'production', 'deployment'],
            ],
        ];
    }
}
