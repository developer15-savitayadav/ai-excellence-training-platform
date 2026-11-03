<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Instructor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class InstructorSeeder extends Seeder
{
    public function run(): void
    {
        $instructors = [
            [
                'name' => 'Dr. Sarah Mitchell',
                'specialization' => 'Deep Learning & Generative AI',
                'title' => 'AI Research Lead',
                'bio' => 'Former Google Brain researcher with 12+ years in deep learning. Published 40+ papers in top conferences including NeurIPS, ICML and ICLR.',
                'rating' => 4.90,
                'student_count' => 420,
                'years_experience' => 12,
                'avatar' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
            ],
            [
                'name' => 'Prof. James Chen',
                'specialization' => 'NLP & Transformer Architectures',
                'title' => 'Professor of Computer Science',
                'bio' => 'Professor of Computer Science with 60+ published papers in NLP and computational linguistics.',
                'rating' => 4.80,
                'student_count' => 318,
                'years_experience' => 15,
                'avatar' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
            ],
            [
                'name' => 'Dr. Anika Patel',
                'specialization' => 'MLOps & ML Engineering',
                'title' => 'ML Platform Lead',
                'bio' => 'Former ML Platform lead at Meta. Expert in scalable training infrastructure and production ML systems.',
                'rating' => 4.90,
                'student_count' => 265,
                'years_experience' => 10,
                'avatar' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
            ],
            [
                'name' => 'Dr. Luis Morales',
                'specialization' => 'Computer Vision & Image Processing',
                'title' => 'Computer Vision Scientist',
                'bio' => 'PhD in Computer Vision. Expert in real-time visual AI systems and applied deep learning.',
                'rating' => 4.80,
                'student_count' => 198,
                'years_experience' => 9,
                'avatar' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
            ],
            [
                'name' => 'Dr. Lisa Wang',
                'specialization' => 'AI Ethics & Governance',
                'title' => 'Responsible AI Advisor',
                'bio' => 'PhD in Philosophy and responsible AI practitioner. Bridges technical AI with governance and fairness.',
                'rating' => 4.70,
                'student_count' => 142,
                'years_experience' => 8,
                'avatar' => 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80',
            ],
            [
                'name' => 'Prof. Amara Okafor',
                'specialization' => 'Reinforcement Learning & Robotics',
                'title' => 'Research Professor',
                'bio' => 'Researcher in multi-agent reinforcement learning and sim-to-real transfer learning.',
                'rating' => 4.80,
                'student_count' => 176,
                'years_experience' => 11,
                'avatar' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
            ],
        ];

        foreach ($instructors as $item) {
            Instructor::updateOrCreate(
                ['slug' => Str::slug($item['name'])],
                [...$item, 'status' => 'active', 'email' => null],
            );
        }

        $instructorIds = Instructor::pluck('id')->values();
        $categories = [
            'ai-tools-mastery' => 'AI Productivity',
            'python-programming-foundation' => 'Programming',
            'generative-ai-prompt-engineering' => 'Generative AI',
            'ai-for-business' => 'AI for Business',
            'summer-winter-training' => 'Industrial Training',
            'digital-marketing-ai' => 'AI Marketing',
            'python-data-analytics' => 'Data Analytics',
            'applied-machine-learning' => 'Machine Learning',
            'advanced-diploma-ai-ml' => 'AI & Machine Learning',
            'ai-digital-marketing-specialist' => 'AI Marketing',
            'data-science-ai-career-track' => 'Data Science',
        ];

        Course::query()->orderBy('sort_order')->get()->each(function (Course $course, int $i) use ($instructorIds, $categories) {
            $course->forceFill([
                'instructor_id' => $course->instructor_id ?: $instructorIds[$i % max(1, $instructorIds->count())],
                'category' => $course->category ?: ($categories[$course->slug] ?? 'AI'),
                'status' => $course->status ?: 'published',
                'rating' => $course->rating ?: (4.60 + (($i % 4) * 0.1)),
                'review_count' => $course->review_count ?: (40 + ($i * 17)),
                'lesson_count' => $course->lesson_count ?: (20 + ($i * 4)),
                'description' => $course->description ?: $course->tagline,
            ])->save();
        });
    }
}
