<?php

namespace Database\Seeders;

use App\Models\Bundle;
use Illuminate\Database\Seeder;

class BundleSeeder extends Seeder
{
    public function run(): void
    {
        $bundles = [
            [
                'tag' => 'FRESHER COMBO',
                'name' => 'Python Foundation + Advanced Diploma in AI & ML',
                'description' => 'Start with Python fundamentals and fast-track into our flagship AI & ML diploma — bundled savings available.',
                'courses_text' => 'Python Foundation + Advanced Diploma in AI & ML',
                'note' => 'Bundled savings — contact us for pricing',
                'accent' => 'lime',
                'sort_order' => 1,
            ],
            [
                'tag' => 'MARKETER COMBO',
                'name' => 'Generative AI & Prompt Engineering + Digital Marketing with AI',
                'description' => 'Master prompt engineering and apply it directly to AI-powered marketing — bundled savings available.',
                'courses_text' => 'Generative AI + Digital Marketing with AI',
                'note' => 'Bundled savings — contact us for pricing',
                'accent' => 'violet',
                'sort_order' => 2,
            ],
        ];

        foreach ($bundles as $bundle) {
            Bundle::updateOrCreate(['tag' => $bundle['tag']], $bundle);
        }
    }
}
