import { Link } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';
import Button from '../../Components/ui/Button';
import Badge from '../../Components/ui/Badge';
import Card from '../../Components/ui/Card';
import StarRating from '../../Components/ui/StarRating';

function EyeBrow({ children, color = 'violet' }) {
    return (
        <p className={`font-mono text-xs uppercase tracking-[0.08em] text-${color} mb-3`}>
            {children}
        </p>
    );
}

const INSTRUCTOR = {
    slug: 'dr-sarah-mitchell',
    name: 'Dr. Sarah Mitchell',
    title: 'Head of Curriculum & Lead Instructor',
    specialization: 'Deep Learning & Neural Architecture',
    bio: 'Dr. Sarah Mitchell is a former MIT professor with over 15 years of experience in deep learning research and education. She has published more than 40 papers in top-tier conferences and journals, including NeurIPS, ICML, and JMLR. Her research focuses on neural architecture search, efficient deep learning, and interpretable AI models. At AI Excellence Academy, Sarah leads the curriculum design and teaches the most popular courses on deep learning fundamentals and advanced neural networks. Her teaching philosophy centers on hands-on learning — every concept is reinforced through practical coding exercises and real-world projects.',
    stats: {
        students: '4,200+',
        courses: '8',
        rating: '4.9',
        reviews: '892',
    },
    gradient: 'from-violet to-lime',
};

const COURSES = [
    {
        slug: 'deep-learning-fundamentals',
        title: 'Deep Learning Fundamentals',
        lessons: 24,
        duration: '18h 30m',
        rating: 4.9,
        students: 2100,
        gradient: 'from-violet via-violet/60 to-ink',
    },
    {
        slug: 'neural-architecture-design',
        title: 'Neural Architecture Design',
        lessons: 18,
        duration: '14h 15m',
        rating: 4.8,
        students: 1400,
        gradient: 'from-lime/80 via-lime/40 to-ink',
    },
    {
        slug: 'advanced-cnn-computer-vision',
        title: 'Advanced CNNs for Computer Vision',
        lessons: 20,
        duration: '16h 45m',
        rating: 4.9,
        students: 1200,
        gradient: 'from-success via-success/50 to-ink',
    },
    {
        slug: 'generative-deep-learning',
        title: 'Generative Deep Learning',
        lessons: 22,
        duration: '20h 00m',
        rating: 4.7,
        students: 980,
        gradient: 'from-violet/60 via-lime/30 to-ink',
    },
];

const REVIEWS = [
    {
        name: 'Maria Gonzalez',
        role: 'ML Engineer at Stripe',
        rating: 5,
        text: 'Dr. Mitchell\'s deep learning course is the best I\'ve taken anywhere. The way she explains backpropagation and gradient descent made everything click for me.',
    },
    {
        name: 'James Park',
        role: 'Data Scientist at Spotify',
        rating: 5,
        text: 'Incredibly thorough and well-paced. The coding exercises are challenging but rewarding. I went from understanding theory to building production models.',
    },
    {
        name: 'Anika Sharma',
        role: 'AI Researcher at DeepMind',
        rating: 4,
        text: 'Sarah\'s research background shines through in her teaching. She doesn\'t just teach the how — she explains the why, which is crucial for deep understanding.',
    },
];

export default function InstructorsShow() {
    return (
        <PublicLayout>
            {/* Hero */}
            <section className="relative overflow-hidden pt-[120px] pb-[80px]">
                <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-violet/15 blur-[120px] pointer-events-none" />
                <div className="absolute top-10 right-0 h-[400px] w-[400px] rounded-full bg-lime/10 blur-[100px] pointer-events-none" />

                <div className="relative z-10 mx-auto max-w-[1240px] px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-muted mb-10">
                        <Link href="/" className="hover:text-body transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/instructors" className="hover:text-body transition-colors">Instructors</Link>
                        <span>/</span>
                        <span className="text-body">{INSTRUCTOR.name}</span>
                    </nav>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* Avatar */}
                        <div className={`h-32 w-32 md:h-40 md:w-40 rounded-full bg-gradient-to-br ${INSTRUCTOR.gradient} flex items-center justify-center shrink-0`}>
                            <span className="text-4xl md:text-5xl font-display font-bold text-black/80">
                                SM
                            </span>
                        </div>

                        {/* Info */}
                        <div className="text-center md:text-left">
                            <h1 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold text-body">
                                {INSTRUCTOR.name}
                            </h1>
                            <p className="text-lime text-lg mt-1">{INSTRUCTOR.title}</p>
                            <p className="text-muted mt-3 max-w-2xl leading-relaxed">
                                {INSTRUCTOR.bio}
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
                                {[
                                    { label: 'Students', value: INSTRUCTOR.stats.students },
                                    { label: 'Courses', value: INSTRUCTOR.stats.courses },
                                    { label: 'Rating', value: INSTRUCTOR.stats.rating },
                                    { label: 'Reviews', value: INSTRUCTOR.stats.reviews },
                                ].map((stat) => (
                                    <div key={stat.label} className="text-center">
                                        <div className="font-mono text-xl font-bold text-body">{stat.value}</div>
                                        <div className="text-xs text-muted mt-0.5">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Social + Actions */}
                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mt-6">
                                <div className="flex gap-2">
                                    {[
                                        { name: 'Twitter', icon: '𝕏' },
                                        { name: 'LinkedIn', icon: 'in' },
                                        { name: 'GitHub', icon: '⌘' },
                                        { name: 'Website', icon: '🌐' },
                                    ].map((s) => (
                                        <a
                                            key={s.name}
                                            href="#"
                                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.12] bg-black/[0.04] text-xs font-semibold text-body transition-all hover:border-lime/30 hover:bg-lime/[0.06]"
                                            title={s.name}
                                        >
                                            {s.icon}
                                        </a>
                                    ))}
                                </div>
                                <Button size="sm" href="/contact">Contact Instructor</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses */}
            <section className="max-w-[1240px] mx-auto px-6 pb-[80px]">
                <EyeBrow color="lime">COURSES_</EyeBrow>
                <h2 className="font-display text-2xl font-semibold text-body mb-8">
                    Courses by {INSTRUCTOR.name.split(' ')[0]} {INSTRUCTOR.name.split(' ').pop()}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {COURSES.map((course) => (
                        <Link
                            key={course.slug}
                            href={`/courses/${course.slug}`}
                            className="group bg-panel border border-black/[0.08] rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-[2px] hover:border-black/[0.18]"
                        >
                            <div className={`h-36 bg-gradient-to-br ${course.gradient} relative`}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-12 w-12 rounded-full bg-black/[0.1] backdrop-blur-sm flex items-center justify-center">
                                        <span className="text-lg">🎓</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-display text-sm font-semibold text-body group-hover:text-lime transition-colors leading-snug">
                                    {course.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <StarRating rating={course.rating} size="sm" showValue />
                                </div>
                                <div className="flex items-center gap-3 mt-3 text-xs text-muted font-mono">
                                    <span>{course.lessons} lessons</span>
                                    <span className="h-3 w-px bg-black/[0.12]" />
                                    <span>{course.duration}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Reviews */}
            <section className="bg-surface/50">
                <div className="max-w-[1240px] mx-auto px-6 py-[80px]">
                    <EyeBrow>REVIEWS_</EyeBrow>
                    <h2 className="font-display text-2xl font-semibold text-body mb-8">
                        What Students Say
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {REVIEWS.map((review, idx) => (
                            <Card key={idx}>
                                <StarRating rating={review.rating} size="sm" />
                                <p className="text-sm text-body/80 mt-4 leading-relaxed">
                                    &ldquo;{review.text}&rdquo;
                                </p>
                                <div className="mt-5 pt-4 border-t border-black/[0.06]">
                                    <div className="font-display text-sm font-semibold text-body">{review.name}</div>
                                    <div className="text-xs text-muted mt-0.5">{review.role}</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-[1240px] mx-auto px-6 py-[80px] text-center">
                <h2 className="font-display text-2xl font-semibold text-body">
                    Ready to learn from the best?
                </h2>
                <p className="text-muted mt-2 max-w-lg mx-auto">
                    Enroll in one of Dr. Mitchell&apos;s courses and start building real AI systems today.
                </p>
                <Button href="/courses" className="mt-6">
                    Browse All Courses
                </Button>
            </section>
        </PublicLayout>
    );
}
