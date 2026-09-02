import { useEffect, useRef, useState } from "react";
import { Link } from "@inertiajs/react";

/* ═══════════════ PLACEMENT DATA — swap with your real graduates ═══════════════ */
const placements = [
    {
        title: "Placement 1",
        description:
            "Build intelligent products and turn your AI knowledge into career opportunities.",
        image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=85",
    },
    {
        title: "Placement 2",
        description:
            "Work on practical AI projects that demonstrate your ability to solve real problems.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=85",
    },
    {
        title: "Placement 3",
        description:
            "Ship production-ready ML pipelines and gain the confidence to lead technical teams.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85",
    },
    {
        title: "Placement 4",
        description:
            "Translate AI research into business impact with roles across product and strategy.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85",
    },
];


/* ═══════════════ PLACEMENT SNAPSHOT — true scroll-hijack pin ═══════════════ */
export default function PlacementSnapshot() {
    const wrapperRef = useRef(null); // reserves the section's natural space in the document
    const sectionRef = useRef(null); // becomes position:fixed while pinned
    const trackRef = useRef(null); // horizontally translating card row

    const [wrapperHeight, setWrapperHeight] = useState(0);
    const [dwellDistance, setDwellDistance] = useState(0); // px the track must travel
    const [progress, setProgress] = useState(0); // 0 -> 1
    const [pinned, setPinned] = useState(false);

    const progressRef = useRef(0);
    const pinnedRef = useRef(false);
    useEffect(() => {
        progressRef.current = progress;
    }, [progress]);
    useEffect(() => {
        pinnedRef.current = pinned;
    }, [pinned]);

    // measure the section's natural height + how far the track must travel
    useEffect(() => {
        const measure = () => {
            if (!sectionRef.current || !trackRef.current) return;
            setWrapperHeight(sectionRef.current.offsetHeight);
            const trackWidth = trackRef.current.scrollWidth;
            const viewportWidth = sectionRef.current.offsetWidth;
            setDwellDistance(Math.max(0, trackWidth - viewportWidth));
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    // watch normal scroll position to know when to engage the pin
    useEffect(() => {
        const checkTrigger = () => {
            const wrapper = wrapperRef.current;
            if (!wrapper || pinnedRef.current) return;
            const rect = wrapper.getBoundingClientRect();

            // scrolling down into the section: engage forward animation
            if (rect.top <= 0 && progressRef.current < 1) {
                window.scrollTo({ top: window.scrollY + rect.top, behavior: "auto" });
                setPinned(true);
            }
            // scrolling back up into an already-completed section: engage reverse animation
            else if (rect.top >= 0 && rect.top < wrapper.offsetHeight && progressRef.current >= 1) {
                window.scrollTo({ top: window.scrollY + rect.top, behavior: "auto" });
                setPinned(true);
            }
        };
        window.addEventListener("scroll", checkTrigger, { passive: true });
        return () => window.removeEventListener("scroll", checkTrigger);
    }, []);

    // while pinned, capture wheel/touch input to drive horizontal progress instead of page scroll
    useEffect(() => {
        if (!pinned || dwellDistance === 0) return;

        const applyDelta = (deltaY) => {
            const next = Math.min(1, Math.max(0, progressRef.current + deltaY / dwellDistance));
            progressRef.current = next;
            setProgress(next);
            if ((next >= 1 && deltaY > 0) || (next <= 0 && deltaY < 0)) {
                setPinned(false);
            }
        };

        const onWheel = (e) => {
            const atMax = progressRef.current >= 1 && e.deltaY > 0;
            const atMin = progressRef.current <= 0 && e.deltaY < 0;
            if (atMax || atMin) return; // let native scroll take back over
            e.preventDefault();
            applyDelta(e.deltaY);
        };

        let touchStartY = null;
        const onTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };
        const onTouchMove = (e) => {
            if (touchStartY === null) return;
            const currentY = e.touches[0].clientY;
            const deltaY = touchStartY - currentY;
            touchStartY = currentY;
            const atMax = progressRef.current >= 1 && deltaY > 0;
            const atMin = progressRef.current <= 0 && deltaY < 0;
            if (atMax || atMin) return;
            e.preventDefault();
            applyDelta(deltaY);
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
        };
    }, [pinned, dwellDistance]);

    return (
        <div ref={wrapperRef} style={{ height: wrapperHeight ? `${wrapperHeight}px` : "auto" }}>
            <section
                ref={sectionRef}
                className={`w-full border-t border-black/5 bg-[#f5f5f2] ${
                    pinned ? "fixed top-0 left-0 z-30" : "relative"
                }`}
            >
                <div className="mx-auto max-w-[1050px] px-5 pt-20">
                    <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#982cdc] mb-3">
                        YOUR NEXT STEP
                    </p>

                    <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-[-0.04em] text-black">
                        Placement Snapshot
                    </h2>

                    <p className="mt-3 text-[clamp(15px,1.1vw,17px)] text-black/50 max-w-2xl">
                        See where our graduates are making an impact in the AI
                        industry
                    </p>
                </div>

                <div className="mt-10 pb-20 w-screen overflow-hidden">
                    <div
                        ref={trackRef}
                        className="flex flex-nowrap gap-6 will-change-transform px-5"
                        style={{
                            transform: `translateX(${-progress * dwellDistance}px)`,
                        }}
                    >
                        {placements.map((placement) => (
                            <div
                                key={placement.image}
                                className="group shrink-0 basis-[clamp(320px,46vw,620px)]"
                            >
                                <div className="relative h-[300px] overflow-hidden rounded-xl">
                                    <img
                                        src={placement.image}
                                        alt={placement.title}
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                                            <span className="w-1.5 h-1.5 rounded-full bg-lime  animate-pulse" />
                                            Placed
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="text-[clamp(18px,1.4vw,22px)] font-bold text-black">
                                            {placement.title}
                                        </h3>
                                        <p className="mt-2 max-w-[460px] text-[clamp(14px,1vw,16px)] leading-[1.6] text-black/50">
                                            {placement.description}
                                        </p>
                                    </div>

                                    <Link
                                        href="/placements"
                                        className="mt-1 shrink-0 rounded-full bg-black px-6 py-2.5 text-[clamp(13px,1vw,15px)] font-semibold text-white transition hover:bg-[linear-gradient(60deg,#982cdc,#eec369)] hover:shadow-[0_8px_25px_rgba(152,44,220,.25)]"
                                    >
                                        Explore →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}