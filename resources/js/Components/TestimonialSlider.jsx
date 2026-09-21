 import { useState, useEffect } from "react";
import RevealDiv from "./RevealDiv";

function EyeBrow({ children, color = "violet" }) {
    return (
        <div className="relative z-10 mx-auto w-full max-w-[950px] text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase text-black/70 backdrop-blur-sm">
                <span
                    className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                        color === "lime"
                            ? "bg-[#eec369]"
                            : "bg-[#982cdc]"
                    }`}
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
        quote:
            "This Academy not only provided me with the technical knowledge required for my role as an Analyst & Automation at Uber but also instilled in me the confidence to tackle real-world challenges. Their dedicated faculty made the learning experience enriching and rewarding.",
    },
    {
        name: "Rohit Verma",
        role: "Data Analyst at TCS",
        img: "/assets/images/job-seekers.png",
        quote:
            "I came in with zero coding background. The Python Foundation and Advanced Diploma gave me the skills and confidence to land a data analyst role within two months of completing the program. The mock interviews were a game-changer.",
    },
    {
        name: "Anjali Gupta",
        role: "Digital Marketing Lead at Webchutney",
        img: "/assets/images/teacher.png",
        quote:
            "The Digital Marketing with AI program was hands down the best investment I made. Running a live campaign with a real budget set this course apart from everything else in Lucknow. I had a portfolio ready before I even graduated.",
    },
    {
        name: "Vikas Patel",
        role: "Freelance AI Consultant",
        img: "/assets/images/job-seekers.png",
        quote:
            "After the Generative AI & Prompt Engineering course, I started freelancing on Upwork within weeks. The practical approach to prompt engineering and automation workflows gave me a real edge. Already earning back my investment.",
    },
];

export default function TestimonialSlider() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    /*
     * Mobile + Tablet:
     * 1 testimonial per slide
     *
     * Desktop:
     * 2 testimonials per slide
     */
    const [isTabletOrMobile, setIsTabletOrMobile] =
        useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsTabletOrMobile(window.innerWidth < 1024);
        };

        checkScreenSize();

        window.addEventListener(
            "resize",
            checkScreenSize
        );

        return () => {
            window.removeEventListener(
                "resize",
                checkScreenSize
            );
        };
    }, []);

    /*
     * Number of cards shown in each slide
     *
     * < 1024px = 1 card
     * >= 1024px = 2 cards
     */
    const itemsPerSlide = isTabletOrMobile ? 1 : 2;

    const slides = Math.ceil(
        TESTIMONIALS.length / itemsPerSlide
    );

    /*
     * Keep current slide valid when screen size changes
     */
    useEffect(() => {
        setCurrent((currentSlide) =>
            Math.min(
                currentSlide,
                Math.max(slides - 1, 0)
            )
        );
    }, [slides]);

    /*
     * Go to specific slide
     */
    const goTo = (i) => {
        setCurrent(
            ((i % slides) + slides) % slides
        );
    };

    /*
     * Next slide
     */
    const next = () => {
        goTo(current + 1);
    };

    /*
     * Previous slide
     */
    const prev = () => {
        goTo(current - 1);
    };

    /*
     * Auto slide
     */
    useEffect(() => {
        if (paused || slides <= 1) return;

        const timer = setInterval(() => {
            setCurrent(
                (c) => (c + 1) % slides
            );
        }, 5000);

        return () => clearInterval(timer);
    }, [paused, slides]);

    /*
     * Swipe / drag support
     */
    const handlePointerDown = (e) => {
        e.currentTarget._startX = e.clientX;

        e.currentTarget.setPointerCapture(
            e.pointerId
        );
    };

    const handlePointerUp = (e) => {
        const dx =
            e.clientX -
            (e.currentTarget._startX ?? 0);

        if (Math.abs(dx) > 60) {
            if (dx < 0) {
                next();
            } else {
                prev();
            }
        }
    };

    /*
     * Create slide groups
     *
     * Mobile / Tablet:
     *
     * Slide 1 = Priya
     * Slide 2 = Rohit
     * Slide 3 = Anjali
     * Slide 4 = Vikas
     *
     * Desktop:
     *
     * Slide 1 = Priya + Rohit
     * Slide 2 = Anjali + Vikas
     */
    const pairs = [];

    for (
        let i = 0;
        i < TESTIMONIALS.length;
        i += itemsPerSlide
    ) {
        pairs.push(
            TESTIMONIALS.slice(
                i,
                i + itemsPerSlide
            )
        );
    }

    return (
        <section
            id="alumni"
            className="bg-ink py-16 sm:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">

                {/* Section Heading */}
                <RevealDiv>
                    <div className="mb-10 text-center sm:mb-14">
                        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-violet">
                            <EyeBrow>
                                TESTIMONIALS
                            </EyeBrow>
                        </p>

                        <h2 className="font-display text-[clamp(2rem,4vw,2.7rem)] font-bold tracking-[-0.04em] text-black">
                            Alumni&apos;s Testimonies
                        </h2>
                    </div>
                </RevealDiv>

                {/* Slider */}
                <div
                    className="relative"
                    onMouseEnter={() =>
                        setPaused(true)
                    }
                    onMouseLeave={() =>
                        setPaused(false)
                    }
                >
                    {/* Slider Viewport */}
                    <div
                        className="cursor-grab select-none overflow-hidden active:cursor-grabbing"
                        onPointerDown={
                            handlePointerDown
                        }
                        onPointerUp={
                            handlePointerUp
                        }
                    >
                        {/* Slider Track */}
                        <div
                            className="flex transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                            style={{
                                transform: `translateX(-${
                                    current * 100
                                }%)`,
                            }}
                        >
                            {pairs.map(
                                (pair, slideIndex) => (
                                    <div
                                        key={
                                            slideIndex
                                        }
                                        className="w-full shrink-0 px-0 sm:px-2"
                                    >
                                        {/*
                                          Desktop:
                                          2 cards in one row

                                          Tablet/Mobile:
                                          pair contains only
                                          1 card, so only
                                          1 card appears
                                        */}
                                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                                            {pair.map(
                                                (
                                                    t,
                                                    i
                                                ) => (
                                                    <div
                                                        key={
                                                            i
                                                        }
                                                        className="flex min-h-[274px] flex-col overflow-hidden rounded-[20px] border border-black/[0.04] bg-white shadow-[0_8px_30px_rgba(0,0,0,.04)] transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(152,44,220,.1)] md:flex-row"
                                                    >
                                                        {/* Image */}
                                                        <div className="h-[220px] w-full shrink-0 overflow-hidden md:h-auto md:w-[42%] md:rounded-l-[20px]">
                                                            <img
                                                                src={
                                                                    t.img
                                                                }
                                                                alt={
                                                                    t.name
                                                                }
                                                                className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105 md:object-center"
                                                            />
                                                        </div>

                                                        {/* Content */}
                                                        <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-6 sm:px-6 sm:py-7">
                                                            <h3 className="text-[15px] font-bold text-black">
                                                                {
                                                                    t.name
                                                                }
                                                            </h3>

                                                            <p className="mt-0.5 text-[13px] text-muted">
                                                                {
                                                                    t.role
                                                                }
                                                            </p>

                                                            <div className="mt-4 h-[2px] w-8 rounded-full bg-gradient-to-r from-violet to-lime" />

                                                            <p className="mt-4 text-[13px] leading-[1.7] text-black/55">
                                                                {
                                                                    t.quote
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Previous Button */}
                    <button
                        onClick={prev}
                        aria-label="Previous"
                        className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-x-1 -translate-y-1/2 items-center justify-center rounded-full border border-black/[0.08] bg-white text-black/50 shadow-[0_2px_12px_rgba(0,0,0,.08)] transition-all duration-200 hover:text-black hover:shadow-[0_4px_16px_rgba(0,0,0,.12)] sm:h-10 sm:w-10 sm:-translate-x-4"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={next}
                        aria-label="Next"
                        className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 translate-x-1 items-center justify-center rounded-full border border-black/[0.08] bg-white text-black/50 shadow-[0_2px_12px_rgba(0,0,0,.08)] transition-all duration-200 hover:text-black hover:shadow-[0_4px_16px_rgba(0,0,0,.12)] sm:h-10 sm:w-10 sm:translate-x-4"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </button>
                </div>

                {/* Dots */}
                <div className="mt-7 flex items-center justify-center gap-2 sm:mt-8">
                    {Array.from({
                        length: slides,
                    }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() =>
                                goTo(i)
                            }
                            aria-label={`Slide ${
                                i + 1
                            }`}
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
