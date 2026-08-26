<?php

namespace Database\Seeders;

use App\Models\PaymentOption;
use Illuminate\Database\Seeder;

class PaymentOptionSeeder extends Seeder
{
    public function run(): void
    {
        $options = [
            [
                'title' => 'No-cost EMI',
                'description' => 'Pay monthly on all Professional and Career programs — no lump sum required.',
                'accent' => 'lime',
                'sort_order' => 1,
            ],
            [
                'title' => 'Women in Tech Scholarship',
                'description' => 'Limited seats every year dedicated to women entering the AI workforce.',
                'accent' => 'violet',
                'sort_order' => 2,
            ],
            [
                'title' => 'Merit Scholarship',
                'description' => 'Based on our free entrance test — reward the best students can earn.',
                'accent' => 'lime',
                'sort_order' => 3,
            ],
            [
                'title' => 'Early-bird & Group Benefits',
                'description' => 'Early-bird, group and full-payment discounts — ask your counsellor.',
                'accent' => 'violet',
                'sort_order' => 4,
            ],
            [
                'title' => 'Referral Rewards',
                'description' => 'Earn rewards when someone you refer enrols in any program.',
                'accent' => 'lime',
                'sort_order' => 5,
            ],
            [
                'title' => 'Upgrade Credit',
                'description' => 'Full short-course fee adjusted against a long program if you upgrade within 60 days.',
                'accent' => 'violet',
                'sort_order' => 6,
            ],
        ];

        foreach ($options as $option) {
            PaymentOption::updateOrCreate(
                ['title' => $option['title']],
                $option
            );
        }
    }
}
