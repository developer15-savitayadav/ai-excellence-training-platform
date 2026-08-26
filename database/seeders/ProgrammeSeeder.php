<?php

namespace Database\Seeders;

use App\Models\Programme;
use Illuminate\Database\Seeder;

class ProgrammeSeeder extends Seeder
{
    public function run(): void
    {
        $programmes = [
            [
                'slug' => 'college',
                'tag' => 'FOR COLLEGES',
                'title' => 'College Partnerships — AKTU Summer & Winter Training',
                'description' => 'We partner directly with Training & Placement cells to deliver compliant, high-quality industrial training on your campus or at ours.',
                'points' => [
                    'Tracks: AI/ML, Python, Data Science, Digital Marketing with AI',
                    'Batches of 50–200 students',
                    'Training letters, project reports, viva support and stamped certificates included',
                    'Faculty seats and referral arrangements available for partner institutions',
                ],
                'cta_label' => 'Request a Partnership Proposal',
                'cta_href' => '/contact',
                'accent' => 'lime',
                'sort_order' => 1,
            ],
            [
                'slug' => 'faculty',
                'tag' => 'FOR FACULTY',
                'title' => 'Faculty Development Programmes',
                'description' => 'A 5-day intensive AI programme designed for college teachers who need to bring AI into their classrooms and research. Hands-on, practical and tailored to your department.',
                'points' => null,
                'cta_label' => 'Contact Us',
                'cta_href' => '/contact',
                'accent' => 'violet',
                'sort_order' => 2,
            ],
            [
                'slug' => 'corporate',
                'tag' => 'FOR CORPORATES',
                'title' => 'Corporate Training',
                'description' => 'AI adoption programmes for businesses, banks, hospitals, agencies and professional firms. From half-day leadership sessions to multi-week team upskilling — scoped to your workflows, delivered at your premises or ours.',
                'points' => null,
                'cta_label' => 'Talk to Our Corporate Team',
                'cta_href' => '/contact',
                'accent' => 'lime',
                'sort_order' => 3,
            ],
            [
                'slug' => 'school',
                'tag' => 'FOR SCHOOLS',
                'title' => 'School Workshops — AI Literacy for Classes 9–12',
                'description' => 'Two-day, age-appropriate AI literacy workshops that teach students to use AI responsibly for learning, creativity and careers.',
                'points' => null,
                'cta_label' => 'See Upcoming Workshops',
                'cta_href' => '/contact',
                'accent' => 'violet',
                'sort_order' => 4,
            ],
            [
                'slug' => 'weekend',
                'tag' => 'OPEN TO ALL',
                'title' => 'Weekend AI Workshops',
                'description' => 'One-day paid seminars on practical AI topics. A great way to experience our teaching before you commit to a course.',
                'points' => null,
                'cta_label' => 'See Upcoming Workshops',
                'cta_href' => '/contact',
                'accent' => 'lime',
                'sort_order' => 5,
            ],
        ];

        foreach ($programmes as $programme) {
            Programme::updateOrCreate(['slug' => $programme['slug']], $programme);
        }
    }
}
