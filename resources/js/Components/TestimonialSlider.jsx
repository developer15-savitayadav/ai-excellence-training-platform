import { useState, useEffect } from "react";
import RevealDiv from "./RevealDiv";
function EyeBrow({ children, color = "violet" }) {
    return (
        <div className="relative z-10 mx-auto w-full max-w-[950px] text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-xs font-medium text-black/70 backdrop-blur-sm uppercase">
                <span
                    className={`w-1.5 h-1.5 rounded-full animate-pulse ${color === "lime" ? "bg-[#eec369]" : "bg-[#982cdc]"}`}
                />
                {children}
            </div>
        </div>
    );
}
const TESTIMONIALS = [
    {
        name: "Priya Sharma",
        role: "AI & Automation Analyst at Uber",
        img: "/assets/images/teacher.png",
        quote: "This Academy not only provided me with the technical knowledge required for my role as an Analyst & Automation at Uber but also instilled in me the confidence to tackle real-world challenges. Their dedicated faculty made the learning experience enriching and rewarding.",
    },
    {
        name: "Rohit Verma",
        role: "Data Analyst at TCS",
        img: "/assets/images/job-seekers.png",
        quote: "I came in with zero coding background. The Python Foundation and Advanced Diploma gave me the skills and confidence to land a data analyst role within two months of completing the program. The mock interviews were a game-changer.",
    },
    {
        name: "Anjali Gupta",
        role: "Digital Marketing Lead at Webchutney",
        img: "/assets/images/teacher.png",
        quote: "The Digital Marketing with AI program was hands down the best investment I made. Running a live campaign with a real budget set this course apart from everything else in Lucknow. I had a portfolio ready before I even graduated.",
    },
    {
        name: "Vikas Patel",
        role: "Freelance AI Consultant",
        img: "/assets/images/job-seekers.png",
        quote: "After the Generative AI & Prompt Engineering course, I started freelancing on Upwork within weeks. The practical approach to prompt engineering and automation workflows gave me a real edge. Already earning back my investment.",
    },
];

export default function TestimonialSlider() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const slides = Math.ceil(TESTIMONIALS.length / 2);

    const goTo = (i) => setCurrent(((i % slides) + slides) % slides);
    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => setCurrent((c) => (c + 1) % slides), 5000);
        return () => clearInterval(timer);
    }, [paused, slides]);

    const handlePointerDown = (e) => {
        e.currentTarget._startX = e.clientX;
        e.currentTarget.setPointerCapture(e.pointerId);
    };
    const handlePointerUp = (e) => {
        const dx = e.clientX - (e.currentTarget._startX ?? 0);
        if (Math.abs(dx) > 60) dx < 0 ? next() : prev();
    };

    const pairs = [];
    for (let i = 0; i < TESTIMONIALS.length; i += 2) {
        pairs.push(TESTIMONIALS.slice(i, i + 2));
    }

    return (
        <section id="alumni" className="bg-ink py-20 sm:py-24">
            <div className="mx-auto max-w-[1240px] px-6">
                <RevealDiv>
                    <div className="text-center mb-14">
                        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-violet mb-2">
                                                     <EyeBrow>
                            TESTIMONIALS

                         </EyeBrow>
                        </p>
                        <h2 className="font-display text-[clamp(2rem,4vw,2.7rem)] font-bold tracking-[-0.04em] text-black">
                            Alumni&apos;s Testimonies
                        </h2>
                    </div>
                </RevealDiv>

                <div
                    className="relative"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <div
                        className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
                        onPointerDown={handlePointerDown}
                        onPointerUp={handlePointerUp}
                    >
                        <div
                            className="flex transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                            style={{ transform: `translateX(-${current * 100}%)` }}
                        >
                            {pairs.map((pair, si) => (
                                <div key={si} className="w-full shrink-0 px-1 sm:px-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {pair.map((t, i) => (
                                            <div key={i} className="flex min-h-[274px] overflow-hidden rounded-[20px] bg-white border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,.04)] hover:shadow-[0_16px_48px_rgba(152,44,220,.1)] hover:-translate-y-0.5 transition-all duration-400">
                                                <div className="w-[42%] shrink-0 overflow-hidden rounded-l-[20px]">
                                                    <img
                                                        src={t.img}
                                                        alt={t.name}
                                                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-center px-6 py-7 flex-1">
                                                    <h3 className="text-[15px] font-bold text-black">
                                                        {t.name}
                                                    </h3>
                                                    <p className="text-[13px] text-muted mt-0.5">
                                                        {t.role}
                                                    </p>
                                                    <div className="mt-4 w-8 h-[2px] bg-gradient-to-r from-violet to-lime rounded-full" />
                                                    <p className="mt-4 text-[13px] leading-[1.7] text-black/55">
                                                        {t.quote}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={prev}
                        aria-label="Previous"
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-4 z-10 h-10 w-10 rounded-full bg-white border border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,.08)] flex items-center justify-center text-black/50 hover:text-black hover:shadow-[0_4px_16px_rgba(0,0,0,.12)] transition-all duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                    </button>
                    <button
                        onClick={next}
                        aria-label="Next"
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-4 z-10 h-10 w-10 rounded-full bg-white border border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,.08)] flex items-center justify-center text-black/50 hover:text-black hover:shadow-[0_4px_16px_rgba(0,0,0,.12)] transition-all duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                    </button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-8">
                    {Array.from({ length: slides }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Slide ${i + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                i === current
                                    ? "w-7 bg-violet"
                                    : "w-2 bg-black/15 hover:bg-black/25"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}