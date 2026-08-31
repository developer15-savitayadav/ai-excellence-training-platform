import { Link } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';
import Badge from '../../Components/ui/Badge';
import StarRating from '../../Components/ui/StarRating';

function EyeBrow({ children, color = 'violet' }) {
    return (
        <p className={`font-mono text-xs uppercase tracking-[0.08em] text-${color} mb-3`}>
            {children}
        </p>
    );
}

const INSTRUCTORS = [
    {
        slug: 'dr-sarah-mitchell',
        name: 'Dr. Sarah Mitchell',
        specialization: 'Deep Learning & Neural Architecture',
        bio: 'Former MIT professor with 15 years of experience in deep learning research. Published 40+ papers in top-tier conferences and leads curriculum design at AI Excellence Academy.',
        rating: 4.9,
        courseCount: 8,
        studentCount: 4200,
        gradient: 'from-violet to-lime',
    },
    {
        slug: 'dr-james-chen',
        name: 'Dr. James Chen',
        specialization: 'Machine Learning Systems',
        bio: 'PhD in ML from Stanford. Previously at Google Brain, he specializes in building production-grade ML systems and has trained thousands of engineers worldwide.',
        rating: 4.8,
        courseCount: 6,
        studentCount: 3800,
        gradient: 'from-lime to-violet',
    },
    {
        slug: 'alex-rivera',
        name: 'Alex Rivera',
        specialization: 'MLOps & Cloud Infrastructure',
        bio: 'Former ML Platform Lead at a FAANG company. Expert in deploying, monitoring, and scaling ML systems. Author of the popular MLOps bootcamp.',
        rating: 4.9,
        courseCount: 5,
        studentCount: 3100,
        gradient: 'from-success to-lime',
    },
    {
        slug: 'priya-sharma',
        name: 'Priya Sharma',
        specialization: 'Natural Language Processing',
        bio: 'NLP researcher turned educator. Led the development of multilingual models at a leading AI company and brings cutting-edge research directly into her courses.',
        rating: 4.7,
        courseCount: 7,
        studentCount: 2900,
        gradient: 'from-violet/80 to-success',
    },
    {
        slug: 'maya-rodriguez',
        name: 'Maya Rodriguez',
        specialization: 'Computer Vision & Generative AI',
        bio: 'Computer vision expert with extensive experience in generative models. Previously built vision systems for autonomous vehicles and medical imaging applications.',
        rating: 4.8,
        courseCount: 4,
        studentCount: 2400,
        gradient: 'from-lime/80 to-success/60',
    },
    {
        slug: 'dr-omar-hassan',
        name: 'Dr. Omar Hassan',
        specialization: 'Reinforcement Learning & Robotics',
        bio: 'PhD from Carnegie Mellon with a focus on RL for robotics. His work on multi-agent reinforcement learning has been cited over 2,000 times.',
        rating: 4.6,
        courseCount: 3,
        studentCount: 1800,
        gradient: 'from-success to-violet/60',
    },
];

export default function InstructorsIndex() {
    return (
        <PublicLayout>
            {/* Hero */}
            <section className="relative overflow-hidden pt-[120px] pb-[60px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 h-[500px] w-[700px] rounded-full bg-lime/12 blur-[120px] pointer-events-none" />
                <div className="relative z-10 mx-auto max-w-[1240px] px-6 text-center">
                    <EyeBrow>INSTRUCTORS_</EyeBrow>
                    <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight text-body">
                        Meet Our Expert Instructors
                    </h2>
                    <p className="text-muted text-lg mt-4 max-w-xl mx-auto">
                        Learn from world-class practitioners and researchers who are actively shaping the future of AI.
                    </p>
                </div>
            </section>

            {/* Instructors Grid */}
            <section className="max-w-[1240px] mx-auto px-6 pb-[120px] max-lg:pb-[72px]">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {INSTRUCTORS.map((instructor) => (
                        <Link
                            key={instructor.slug}
                            href={`/instructors/${instructor.slug}`}
                            className="group bg-panel border border-black/[0.08] rounded-2xl p-7 transition-all duration-200 hover:-translate-y-[2px] hover:border-black/[0.18]"
                        >
                            <div className={`mx-auto mb-5 h-24 w-24 rounded-full bg-gradient-to-br ${instructor.gradient} flex items-center justify-center`}>
                                <span className="text-2xl font-display font-bold text-black/80">
                                    {instructor.name.split(' ').filter((_, i, arr) => i === 0 || i === arr.length - 1).map((n) => n[0]).join('')}
                                </span>
                            </div>
                            <h3 className="font-display text-lg font-semibold text-body group-hover:text-lime transition-colors text-center">
                                {instructor.name}
                            </h3>
                            <p className="text-sm text-lime text-center mt-1">{instructor.specialization}</p>
                            <p className="text-sm text-muted mt-3 leading-relaxed text-center line-clamp-3">
                                {instructor.bio}
                            </p>
                            <div className="flex items-center justify-center gap-2 mt-4">
                                <StarRating rating={instructor.rating} size="sm" showValue />
                            </div>
                            <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-black/[0.06] text-xs text-muted font-mono">
                                <span>{instructor.courseCount} courses</span>
                                <span className="h-3 w-px bg-black/[0.12]" />
                                <span>{instructor.studentCount.toLocaleString()} students</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
