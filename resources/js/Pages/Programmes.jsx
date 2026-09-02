import { Link } from "@inertiajs/react";
import PublicLayout from "../Layouts/PublicLayout";
import Button from "../Components/ui/Button";
import FaqSection from "../Components/FAQSection";
import RevealDiv, { useReveal } from "../Components/RevealDiv";

function EyeBrow({ children, color = "violet" }) {
    return (
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${color === "lime" ? "bg-[#eec369]" : "bg-[#982cdc]"}`} />
            {children}
        </p>
    );
}
const TRACKS = [
    { name: "AI/ML", image: "/assets/images/ai-ml.jpg" },
    { name: "Python", image: "/assets/images/python.png" },
    { name: "Data Science", image: "/assets/images/data-science.jpg" },
    {
        name: "Digital Marketing with AI",
        image: "/assets/images/digital-marketing.jpg",
    },
];

export default function Programmes() {
    return (
        <PublicLayout>
            {/* ═══════════════ HERO BANNER ═══════════════ */}
            <section className="relative">
                {/* Background photo with gradient tint */}
                <div className="relative h-[280px] max-lg:h-[320px] overflow-hidden">
                    <img
                        src="/assets/images/college-partnership-hero.avif"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(238,195,105,0.55),rgba(152,44,220,0.55))] mix-blend-multiply" />
                </div>

                {/* Overlapping content card */}
                <div className="relative z-10 mx-auto max-w-[1240px] px-6 -mt-24 max-lg:-mt-20">
                    <div className="bg-[#F5F5F2] rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,.08)] px-8 sm:px-10 py-10 sm:py-12">
                        <div className="grid lg:grid-cols-[80%_20%] gap-8 items-center">
                            <div>
                                <h1 className="font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-bold tracking-[-0.03em] leading-[1.15]">
                                    <span className="bg-[linear-gradient(90deg,#eec369,#982cdc)] bg-clip-text text-transparent">
                                        College Partnerships —
                                    </span>
                                    <br />
                                    <span className="text-black">
                                        AKTU Summer &amp; Winter Training
                                    </span>
                                </h1>

                                <p className="text-muted text-base mt-4 max-w-md leading-relaxed">
                                    We partner directly with Training &amp;
                                    Placement cells to deliver compliant,
                                    high-quality industrial training on your
                                    campus or at ours.
                                </p>

                                <div className="mt-7">
                                    <Link
                                        href="/contact"
                                        className="inline-block rounded-full bg-[linear-gradient(60deg,#eec369,#982cdc)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(152,44,220,.25)] hover:shadow-[0_10px_28px_rgba(152,44,220,.38)] hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        Request a Partnership
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-start justify-center lg:justify-start">
                                <img
                                    src="/assets/images/aktu-seal.png"
                                    alt="AKTU"
                                    className="w-40 h-40 object-contain shrink-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-14" />
            </section>
            {/* ═══════════════ AKTU TRAINING — DETAILS ═══════════════ */}
            <section className="relative">
                <div className="max-w-[1240px] mx-auto px-6 py-16 max-lg:py-12">
                    {/* Tracks row — image-based tabs */}
                    <div className="flex items-center gap-4 pb-8 mb-14 border-b border-black/[0.06]">
                        <span className="font-display text-lg font-bold text-black shrink-0 mr-2">
                            Tracks :
                        </span>
                        <div className="flex-1 grid grid-cols-4 gap-4">
                            {TRACKS.map((track) => (
                                <div
                                    key={track.name}
                                    className="flex items-center justify-center h-14 rounded-2xl bg-black/[0.03] border border-black/[0.06] hover:border-violet/30 hover:bg-violet/5 hover:-translate-y-0.5 transition-all duration-200"
                                > 
                                    <img
                                        src={track.image}
                                        alt={track.name}
                                        className="w-full h-full object-contain shrink-0 rounded-2xl"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* What Includes */}
                    <h2 className="font-display text-xl font-bold text-black mb-6">
                        What Includes:
                    </h2>

                    <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 items-start">
                        {/* Left — colored includes grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2 rounded-2xl bg-violet/20 px-6 py-5 flex items-center justify-center text-center">
                                <span className="font-display font-bold text-sm text-black">
                                    Batches of 50–200 students
                                </span>
                            </div>
                            <div className="rounded-2xl bg-black/[0.05] px-6 py-8 flex items-center justify-center text-center">
                                <span className="font-display font-bold text-sm text-black">
                                    Training Letters
                                </span>
                            </div>
                            <div className="rounded-2xl bg-[#ffd05a] px-6 py-8 flex items-center justify-center text-center">
                                <span className="font-display font-bold text-sm text-black">
                                    Stamped Certificates
                                </span>
                            </div>
                            <div className="rounded-2xl bg-sky-200/70 px-6 py-8 flex items-center justify-center text-center">
                                <span className="font-display font-bold text-sm text-black">
                                    Project Reports
                                </span>
                            </div>
                            <div className="rounded-2xl bg-fuchsia-100 px-6 py-8 flex items-center justify-center text-center">
                                <span className="font-display font-bold text-sm text-black">
                                    Viva Support
                                </span>
                            </div>
                        </div>

                        {/* Right — copy */}
                        <div>
                            <h3 className="font-display text-xl font-bold text-black leading-snug mb-4">
                                Faculty Seats and Referral Arrangements
                                available for partner institutions
                            </h3>
                            <p className="text-muted leading-relaxed text-[15px]">
                                Partner institutions can access dedicated
                                faculty seats and referral arrangements designed
                                to make AI learning more accessible and
                                impactful. Faculty members can participate in
                                specialized AI training, upskill their teaching
                                capabilities, and bring practical AI knowledge
                                into the classroom. Our referral partnerships
                                also enable institutions to connect their
                                students and educators with relevant AI
                                programs, workshops, and career-focused learning
                                opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* ═══════════════ STACKED GROUP: Corporate + School + Weekend ═══════════════ */}
            <div className="relative z-[0] isolate">
                {/* ═══════════════ CORPORATE TRAINING BANNER ═══════════════ */}
                <section className="sticky top-[100px] z-[1]">
                    <div className="max-w-[1240px] mx-auto px-6 pt-10 pb-20 max-lg:pb-14">
                        <div className="relative rounded-[24px] overflow-hidden min-h-[500px] max-lg:min-h-[460px] flex items-center ">
                            {/* Background photo */}
                            <img
                                src="/assets/images/corporate-training-banner.png"
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover object-top"
                            />

                            {/* Dark gradient overlay — solid left, fades toward the right */}
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,15,45,0.92)_0%,rgba(10,15,45,0.82)_35%,rgba(10,15,45,0.25)_65%,rgba(10,15,45,0)_85%)]" />

                            {/* Dot-grid decoration */}
                            <div
                                className="absolute top-8 left-8 w-20 h-16 opacity-40"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle, white 1.5px, transparent 1.5px)",
                                    backgroundSize: "10px 10px",
                                }}
                            />

                            {/* Content */}
                            <div className="relative z-10 px-8 sm:px-12 py-10 max-w-md">
                                <h2 className="font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-bold text-white leading-tight">
                                    Corporate Training
                                </h2>

                                <p className="text-white/75 text-[15px] mt-4 leading-relaxed">
                                    AI adoption programmes for businesses,
                                    banks, hospitals, agencies and professional
                                    firms. From half-day leadership sessions to
                                    multi-week team upskilling — scoped to your
                                    workflows, delivered at your premises or
                                    ours.
                                </p>

                                <div className="mt-7">
                                    <Link
                                        href="/contact"
                                        className="inline-block rounded-full bg-[linear-gradient(60deg,#eec369,#982cdc)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(152,44,220,.3)] hover:shadow-[0_10px_28px_rgba(152,44,220,.4)] hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        Talk to Our Corporate Team
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════ SCHOOL WORKSHOPS ═══════════════ */}
                <section className="sticky top-[100px] z-[2]">
                    <div className="max-w-[1240px] mx-auto px-6 pt-10 pb-20 max-lg:pb-14">
                        {/* School Workshops — photo + copy */}
                        <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,.04)] p-6 min-h-[500px] max-lg:min-h-[460px]">
                            <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 items-center">
                                <div className="rounded-2xl overflow-hidden">
                                    <img
                                        src="/assets/images/school-workshop.png"
                                        alt="School Workshop"
                                        className="w-full h-[350px] object-cover object-top"
                                    />
                                </div>

                                <div>
                                    <h2 className="font-display text-2xl font-bold text-black">
                                        School Workshops
                                    </h2>
                                    <p className="italic text-black/60 font-medium mt-1">
                                        AI Literacy for Classes 9–12
                                    </p>
                                    <p className="text-muted text-[15px] leading-relaxed mt-4">
                                        Two-day, age-appropriate AI literacy
                                        workshops that teach students to use AI
                                        responsibly for learning, creativity and
                                        careers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════ WEEKEND AI WORKSHOPS ═══════════════ */}
                <section className="sticky top-[100px] z-[3]">
                    <div className="max-w-[1240px] mx-auto px-6 pt-10 pb-20 max-lg:pb-14">
                        <div className="bg-black rounded-[20px] px-8 py-14 text-center min-h-[500px] max-lg:min-h-[460px] flex flex-col items-center justify-center">
                            <h2 className="font-display text-2xl font-bold text-white">
                                Weekend AI Workshops
                            </h2>
                            <p className="italic text-white/70 font-medium mt-1">
                                Open to All
                            </p>
                            <p className="text-white/70 text-[15px] leading-relaxed mt-5 max-w-md mx-auto">
                                One-day paid seminars on practical AI topics. A
                                great way to experience our teaching before you
                                commit to a course.
                            </p>
                            <div className="mt-7">
                                <Link
                                    href="/contact"
                                    className="inline-block rounded-full bg-[linear-gradient(60deg,#eec369,#982cdc)] px-7 py-3 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(152,44,220,.3)] hover:shadow-[0_10px_28px_rgba(152,44,220,.4)] hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Talk to Our Corporate Team
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* ═══════════════ FAQ ═══════════════ */}
            <FaqSection />
            {/* ═══════════════ CTA ═══════════════ */}
            <div className="bg-surface relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-violet/[0.12] blur-[140px]" />
                </div>
                <div className="relative z-10 mx-auto max-w-[1240px] px-6 py-20 sm:py-24 text-center">
                    <RevealDiv>
                        <h2 className="font-display text-[clamp(2rem,4vw,2.6rem)] font-bold tracking-[-0.04em] text-white leading-tight">
                            Ready to Start Your AI{" "}
                            <span className="text-[#765bc4]">Journey</span> ?
                        </h2>
                        <p className="mt-3 text-lg text-white">
                            New batch starts every month
                        </p>
                        <div className="mt-8 flex justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(60deg,#eec369,#982cdc)] px-10 py-4 text-sm font-semibold text-white shadow-[0_6px_24px_rgba(152,44,220,.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(152,44,220,.5)]"
                            >
                                Enroll Now
                            </Link>
                        </div>
                    </RevealDiv>
                </div>
            </div>
        </PublicLayout>
    );
}
