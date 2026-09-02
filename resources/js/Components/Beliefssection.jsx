import { useEffect, useRef, useState, useLayoutEffect } from "react";
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
/* ═══════════════ CARD DATA — swap bg/image/copy for your own ═══════════════ */
const CARDS = [
    {
        id: "trainer",
        number: "01",
        title: "The trainer matters more than the syllabus.",
        description:
            "We invest in exceptional trainers because a great teacher is the reason students learn, finish, and recommend us.",
        bg: "linear-gradient(60deg, #c2e9fb, #a1c4fd, #a1c4fd)",
        text: "#1149a3",
        iconBg: "rgba(0,0,0,0.08)",
        iconPath:
            "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342",
    },
    {
        id: "projects",
        number: "02",
        title: "Projects beat theory.",
        description:
            "Every competitor can teach you what a neural network is. We make sure you have built one, deployed it, and can explain it in an interview.",
        bg: null,
        image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
        text: "#FFFFFF",
        iconBg: "rgba(255,255,255,0.16)",
        iconPath: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5",
    },
    {
        id: "honesty",
        number: "03",
        title: "Honesty compounds.",
        description:
            'We will never advertise a "100% placement guarantee." We will publish our actual placement numbers, batch by batch, and let those speak.',
        bg: "linear-gradient(60deg, #fe0094, #9b4fbf, #5975b4)",
        text: "#fff",
        iconBg: "rgba(0,0,0,0.06)",
        iconPath:
            "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
    },
];

const FINAL_GAP = 20; // px gap between cards once fully separated
const STACK_OFFSET = 28; // px offset between cards while stacked at the start

/* ═══════════════ WHAT WE BELIEVE — stacked-to-separated scroll reveal ═══════════════ */
export default function BeliefsSection() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const tickingRef = useRef(false);

    const [progress, setProgress] = useState(0);
    const [trackWidth, setTrackWidth] = useState(0);

    // measure the row width so we can compute absolute pixel positions
    useLayoutEffect(() => {
        const measure = () => {
            if (trackRef.current) setTrackWidth(trackRef.current.offsetWidth);
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    // scroll-linked progress, throttled with requestAnimationFrame for smoothness
    useEffect(() => {
        const computeProgress = () => {
            const el = sectionRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;
            const total = el.offsetHeight - vh; // scrollable distance while pinned
            const scrolled = -rect.top;
            const p = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
            setProgress(p);
            tickingRef.current = false;
        };
        const onScroll = () => {
            if (!tickingRef.current) {
                tickingRef.current = true;
                requestAnimationFrame(computeProgress);
            }
        };
        computeProgress();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    // ease-in-out
    const eased =
        progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    const radius = 16 + eased * 8;
const textOpacity = 1;
const textShift = 0;

    const cardWidth =
        trackWidth > 0 ? (trackWidth - FINAL_GAP * (CARDS.length - 1)) / CARDS.length : 0;

    return (
        <section ref={sectionRef} className="relative bg-white" style={{ height: "160vh" }}>
            <div className="sticky top-0 h-screen overflow-hidden">
                <div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center px-6">
                    <div className="text-center mb-10">
                        <EyeBrow>
                             What we believe
                        </EyeBrow>
                         
                        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold text-neutral-900">
                            Our Principles
                        </h2>
                    </div>

                    {/* track: relative container the cards are absolutely placed within */}
                    <div ref={trackRef} className="relative w-full h-[62vh] max-h-[560px]">
                        {CARDS.map((card, i) => {
                            // stacked starting position: cards nearly overlap, offset only by a sliver
                            const startX = i * STACK_OFFSET;
                            // final separated position: equal thirds with a gap
                            const endX = i * (cardWidth + FINAL_GAP);
                            const x = startX + (endX - startX) * eased;

                            return (
                                <div
                                    key={card.id}
                                    className="absolute top-0 h-full overflow-hidden flex flex-col justify-end p-8"
                                    style={{
                                        left: 0,
                                        width: cardWidth > 0 ? `${cardWidth}px` : `${100 / CARDS.length}%`,
                                        transform: `translateX(${x}px)`,
                                        borderRadius: `${radius}px`,
                                        background: card.bg || "#111",
                                        zIndex: CARDS.length - i,
                                        boxShadow:
                                            eased < 1
                                                ? "0 12px 30px -10px rgba(0,0,0,0.25)"
                                                : "none",
                                    }}
                                >
                                    {card.image && (
                                        <>
                                            <img
                                                src={card.image}
                                                alt=""
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                        </>
                                    )}

                                    <div
                                        className="absolute top-6 left-6 w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ background: card.iconBg }}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            strokeWidth={1.5}
                                            stroke={card.text}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d={card.iconPath}
                                            />
                                        </svg>
                                    </div>

                                    <div
                                        className="relative"
                                        style={{
                                            opacity: textOpacity,
                                            transform: `translateY(${textShift}px)`,
                                        }}
                                    >
                                        <span
                                            className="block font-mono text-xs mb-3 opacity-60"
                                            style={{ color: card.text }}
                                        >
                                            {card.number}
                                        </span>
                                        <h3
                                            className="text-xl font-semibold mb-2 leading-snug"
                                            style={{ color: card.text }}
                                        >
                                            {card.title}
                                        </h3>
                                        <p
                                            className="text-sm leading-relaxed max-w-[85%]"
                                            style={{ color: card.text, opacity: 0.85 }}
                                        >
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}