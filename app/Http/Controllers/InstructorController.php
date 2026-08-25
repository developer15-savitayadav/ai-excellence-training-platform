<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class InstructorController extends Controller
{
    public function index()
    {
        return Inertia::render('Instructors/Index', [
            'instructors' => [
                [
                    'id' => 'inst_001',
                    'slug' => 'dr-sarah-mitchell',
                    'name' => 'Dr. Sarah Mitchell',
                    'specialization' => 'Deep Learning & Generative AI',
                    'bio' => 'Former Google Brain researcher with 12+ years in deep learning. Published 40+ papers in top conferences.',
                    'rating' => 4.9,
                    'courseCount' => 6,
                    'studentCount' => 54200,
                    'avatar' => '/avatars/sarah-mitchell.jpg',
                ],
                [
                    'id' => 'inst_002',
                    'slug' => 'prof-james-chen',
                    'name' => 'Prof. James Chen',
                    'specialization' => 'NLP & Transformer Architectures',
                    'bio' => 'Professor of Computer Science at Carnegie Mellon. Published 60+ papers in NLP and computational linguistics.',
                    'rating' => 4.8,
                    'courseCount' => 5,
                    'studentCount' => 41800,
                    'avatar' => '/avatars/james-chen.jpg',
                ],
                [
                    'id' => 'inst_003',
                    'slug' => 'dr-anika-patel',
                    'name' => 'Dr. Anika Patel',
                    'specialization' => 'MLOps & ML Engineering',
                    'bio' => 'Former ML Platform lead at Meta. Expert in building scalable training infrastructure and production ML systems.',
                    'rating' => 4.9,
                    'courseCount' => 4,
                    'studentCount' => 38500,
                    'avatar' => '/avatars/anika-patel.jpg',
                ],
                [
                    'id' => 'inst_004',
                    'slug' => 'dr-luis-morales',
                    'name' => 'Dr. Luis Morales',
                    'specialization' => 'Computer Vision & Image Processing',
                    'bio' => 'Former Research Scientist at Tesla Autopilot. PhD in Computer Vision from UC Berkeley. Expert in real-time visual AI systems.',
                    'rating' => 4.8,
                    'courseCount' => 4,
                    'studentCount' => 29600,
                    'avatar' => '/avatars/luis-morales.jpg',
                ],
                [
                    'id' => 'inst_005',
                    'slug' => 'dr-lisa-wang',
                    'name' => 'Dr. Lisa Wang',
                    'specialization' => 'AI Ethics & Governance',
                    'bio' => 'Former AI Ethics lead at Microsoft. PhD in Philosophy from Oxford. Bridges technical AI with responsible development practices.',
                    'rating' => 4.7,
                    'courseCount' => 3,
                    'studentCount' => 18900,
                    'avatar' => '/avatars/lisa-wang.jpg',
                ],
                [
                    'id' => 'inst_006',
                    'slug' => 'prof-amara-okafor',
                    'name' => 'Prof. Amara Okafor',
                    'specialization' => 'Reinforcement Learning & Robotics',
                    'bio' => 'Professor at University of Toronto. Researcher at Vector Institute. Expert in multi-agent RL and sim-to-real transfer learning.',
                    'rating' => 4.8,
                    'courseCount' => 3,
                    'studentCount' => 22100,
                    'avatar' => '/avatars/amara-okafor.jpg',
                ],
            ],
        ]);
    }

    public function show($slug)
    {
        $instructors = $this->getInstructorIndex();
        $instructor = $instructors[$slug] ?? $instructors['dr-sarah-mitchell'];

        return Inertia::render('Instructors/Show', [
            'instructor' => $instructor,
            'courses' => [
                [
                    'id' => 'course_001',
                    'slug' => 'deep-learning-fundamentals',
                    'title' => 'Deep Learning Fundamentals',
                    'description' => 'Master neural networks, CNNs, RNNs, and transformers from scratch.',
                    'price' => 79.99,
                    'originalPrice' => 149.99,
                    'rating' => 4.9,
                    'reviewCount' => 2847,
                    'enrollmentCount' => 18420,
                    'duration' => 24,
                    'lessonCount' => 64,
                    'image' => '/images/courses/deep-learning.jpg',
                    'level' => 'Intermediate',
                ],
                [
                    'id' => 'course_005',
                    'slug' => 'generative-ai-masterclass',
                    'title' => 'Generative AI Masterclass',
                    'description' => 'LLMs, diffusion models, GANs, and creative AI applications.',
                    'price' => 109.99,
                    'originalPrice' => 219.99,
                    'rating' => 4.9,
                    'reviewCount' => 2156,
                    'enrollmentCount' => 15680,
                    'duration' => 36,
                    'lessonCount' => 82,
                    'image' => '/images/courses/generative-ai.jpg',
                    'level' => 'Advanced',
                ],
                [
                    'id' => 'course_012',
                    'slug' => 'rag-and-llm-applications',
                    'title' => 'RAG and LLM Applications',
                    'description' => 'Build production RAG systems and fine-tune LLMs.',
                    'price' => 119.99,
                    'originalPrice' => 229.99,
                    'rating' => 4.9,
                    'reviewCount' => 1678,
                    'enrollmentCount' => 10450,
                    'duration' => 34,
                    'lessonCount' => 72,
                    'image' => '/images/courses/rag-llm.jpg',
                    'level' => 'Advanced',
                ],
            ],
            'reviews' => [
                ['id' => 'rev_001', 'author' => 'Marcus Williams', 'avatar' => '/avatars/marcus.jpg', 'rating' => 5, 'date' => '2024-10-28', 'content' => 'Dr. Mitchell is the best instructor I have ever had. Her deep learning course gave me the foundation to land my dream job.', 'helpful' => 142],
                ['id' => 'rev_002', 'author' => 'Elena Rodriguez', 'avatar' => '/avatars/elena.jpg', 'rating' => 5, 'date' => '2024-10-15', 'content' => 'Clear explanations of complex topics. The generative AI course was a masterpiece of curriculum design.', 'helpful' => 98],
                ['id' => 'rev_003', 'author' => 'Raj Patel', 'avatar' => '/avatars/raj.jpg', 'rating' => 5, 'date' => '2024-09-30', 'content' => 'Incredible depth and practical focus. The projects are exactly what you need for a strong portfolio.', 'helpful' => 67],
                ['id' => 'rev_004', 'author' => 'Sophie Laurent', 'avatar' => '/avatars/sophie.jpg', 'rating' => 4, 'date' => '2024-09-22', 'content' => 'Excellent RAG course. Would love to see more advanced topics in future updates, but overall outstanding.', 'helpful' => 54],
                ['id' => 'rev_005', 'author' => 'David Kim', 'avatar' => '/avatars/david.jpg', 'rating' => 5, 'date' => '2024-09-10', 'content' => 'I switched from web dev to ML thanks to these courses. The learning path is perfectly structured.', 'helpful' => 89],
                ['id' => 'rev_006', 'author' => 'Yuki Tanaka', 'avatar' => '/avatars/yuki.jpg', 'rating' => 5, 'date' => '2024-08-28', 'content' => 'Dr. Mitchell has a gift for making cutting-edge research accessible. Every lesson is a gem.', 'helpful' => 113],
            ],
        ]);
    }

    private function getInstructorIndex()
    {
        $instructors = [
            'dr-sarah-mitchell' => [
                'id' => 'inst_001',
                'slug' => 'dr-sarah-mitchell',
                'name' => 'Dr. Sarah Mitchell',
                'specialization' => 'Deep Learning & Generative AI',
                'title' => 'AI Research Lead',
                'bio' => 'Former Google Brain researcher with 12+ years in deep learning. Published 40+ papers in top conferences including NeurIPS, ICML, and ICLR. Passionate about making AI education accessible to everyone. Led the development of several open-source ML libraries used by thousands of researchers worldwide.',
                'rating' => 4.9,
                'courseCount' => 6,
                'studentCount' => 54200,
                'avatar' => '/avatars/sarah-mitchell.jpg',
                'expertise' => ['Deep Learning', 'Generative AI', 'Neural Architecture Search', 'PyTorch', 'TensorFlow'],
                'education' => [
                    ['degree' => 'PhD Computer Science', 'institution' => 'MIT', 'year' => 2012],
                    ['degree' => 'MS Artificial Intelligence', 'institution' => 'Stanford University', 'year' => 2008],
                ],
                'social' => [
                    'linkedin' => 'https://linkedin.com/in/sarah-mitchell',
                    'twitter' => 'https://twitter.com/sarah_ml',
                    'github' => 'https://github.com/sarah-mitchell',
                ],
            ],
        ];
        return $instructors;
    }
}
