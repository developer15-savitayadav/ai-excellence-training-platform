<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PricingController extends Controller
{
    public function index()
    {
        return Inertia::render('Pricing', [
            'tiers' => [
                [
                    'id' => 'tier_001',
                    'name' => 'Explorer',
                    'description' => 'Perfect for beginners exploring AI and machine learning.',
                    'monthlyPrice' => 29,
                    'annualPrice' => 290,
                    'features' => [
                        ['text' => 'Access to 5 courses', 'included' => true],
                        ['text' => 'Community forum access', 'included' => true],
                        ['text' => 'Basic project reviews', 'included' => true],
                        ['text' => 'Certificate of completion', 'included' => true],
                        ['text' => 'Email support', 'included' => true],
                        ['text' => 'Hands-on labs', 'included' => false],
                        ['text' => '1-on-1 mentor sessions', 'included' => false],
                        ['text' => 'Career coaching', 'included' => false],
                    ],
                    'popular' => false,
                    'color' => 'gray',
                ],
                [
                    'id' => 'tier_002',
                    'name' => 'Professional',
                    'description' => 'For serious learners building AI skills for their career.',
                    'monthlyPrice' => 59,
                    'annualPrice' => 590,
                    'features' => [
                        ['text' => 'Access to all courses', 'included' => true],
                        ['text' => 'Community forum access', 'included' => true],
                        ['text' => 'Hands-on labs & projects', 'included' => true],
                        ['text' => '1-on-1 mentor sessions (2/mo)', 'included' => true],
                        ['text' => 'Priority project reviews', 'included' => true],
                        ['text' => 'Career coaching', 'included' => true],
                        ['text' => 'Job placement assistance', 'included' => true],
                        ['text' => 'Downloadable resources', 'included' => true],
                    ],
                    'popular' => true,
                    'color' => 'blue',
                ],
                [
                    'id' => 'tier_003',
                    'name' => 'Enterprise',
                    'description' => 'For teams and organizations scaling AI capabilities.',
                    'monthlyPrice' => 99,
                    'annualPrice' => 990,
                    'features' => [
                        ['text' => 'Everything in Professional', 'included' => true],
                        ['text' => 'Unlimited mentor sessions', 'included' => true],
                        ['text' => 'Custom learning paths', 'included' => true],
                        ['text' => 'Team analytics dashboard', 'included' => true],
                        ['text' => 'Dedicated account manager', 'included' => true],
                        ['text' => 'SLA guarantee (99.9% uptime)', 'included' => true],
                        ['text' => 'API access', 'included' => true],
                        ['text' => 'On-site training options', 'included' => true],
                    ],
                    'popular' => false,
                    'color' => 'purple',
                ],
                [
                    'id' => 'tier_004',
                    'name' => 'Lifetime',
                    'description' => 'One payment, forever access to everything.',
                    'monthlyPrice' => null,
                    'annualPrice' => 1999,
                    'features' => [
                        ['text' => 'Lifetime access to all courses', 'included' => true],
                        ['text' => 'All future courses included', 'included' => true],
                        ['text' => 'Forever community access', 'included' => true],
                        ['text' => 'Lifetime mentor sessions', 'included' => true],
                        ['text' => 'Priority support', 'included' => true],
                        ['text' => 'Early access to new content', 'included' => true],
                        ['text' => 'Exclusive workshops', 'included' => true],
                        ['text' => 'Alumni network access', 'included' => true],
                    ],
                    'popular' => false,
                    'color' => 'gold',
                ],
            ],
            'faqs' => [
                [
                    'id' => 'faq_001',
                    'question' => 'Can I switch plans at any time?',
                    'answer' => 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you will be charged the prorated difference. When downgrading, the change takes effect at the start of your next billing cycle.',
                ],
                [
                    'id' => 'faq_002',
                    'question' => 'What payment methods do you accept?',
                    'answer' => 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual Enterprise plans. All payments are processed securely through Stripe.',
                ],
                [
                    'id' => 'faq_003',
                    'question' => 'Is there a free trial available?',
                    'answer' => 'Yes, we offer a 7-day free trial on the Professional plan. You get full access to all features during the trial period. No credit card required to start.',
                ],
                [
                    'id' => 'faq_004',
                    'question' => 'Do you offer student discounts?',
                    'answer' => 'Absolutely! We offer a 50% discount for verified students. Simply verify your student status with a valid .edu email or student ID, and the discount will be applied to your chosen plan.',
                ],
                [
                    'id' => 'faq_005',
                    'question' => 'What is your refund policy?',
                    'answer' => 'We offer a 30-day money-back guarantee on all plans. If you are not satisfied with your purchase for any reason, contact us within 30 days for a full refund, no questions asked.',
                ],
            ],
        ]);
    }
}
