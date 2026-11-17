import { useEffect, useRef } from "react";

const TYPES = [
    "fade", "fade-up", "fade-down", "fade-left", "fade-right",
    "zoom-in", "zoom-out", "flip-up", "flip-left",
    "rotate-in", "blur-in", "slide-mask",
];

/**
 * Props:
 *  type      : upar wali list me se koi ek (default "fade-up")
 *  delay     : ms (default 0)
 *  duration  : ms (default 800)
 *  stagger   : ms, children ko ek ke baad ek animate karta hai (optional)
 *  once      : true = sirf ek baar, false = har baar scroll par repeat
 *  threshold : 0 to 1, kitna dikhne par start ho (default 0.15)
 *  as        : html tag (default "div")
 *  loop      : "float" | "pulse" | "spin" | "wiggle" (optional)
 */
export default function Animate({
    children,
    type = "fade-up",
    delay = 0,
    duration = 800,
    stagger = 0,
    once = true,
    threshold = 0.15,
    as: Tag = "div",
    loop,
    className = "",
    ...rest
}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const targets = stagger
            ? Array.from(el.children)
            : [el];

        if (stagger) {
            targets.forEach((child, i) => {
                child.classList.add("anim", `anim-${type}`);
                child.style.setProperty("--anim-delay", `${delay + i * stagger}ms`);
                child.style.setProperty("--anim-duration", `${duration}ms`);
            });
        }

        let doneTimer;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    targets.forEach((t) => t.classList.add("is-inview"));
                    const total = delay + (stagger ? stagger * targets.length : 0) + duration + 100;
                    doneTimer = setTimeout(
                        () => targets.forEach((t) => t.classList.add("is-done")),
                        total,
                    );
                    if (once) observer.disconnect();
                } else if (!once) {
                    clearTimeout(doneTimer);
                    targets.forEach((t) => t.classList.remove("is-inview", "is-done"));
                }
            },
            { threshold },
        );

        observer.observe(el);
        return () => {
            clearTimeout(doneTimer);
            observer.disconnect();
        };
    }, [type, delay, duration, stagger, once, threshold]);

    const base = stagger ? "" : `anim anim-${type}`;
    const loopClass = loop ? `loop-${loop}` : "";

    return (
        <Tag
            ref={ref}
            className={`${base} ${loopClass} ${className}`.trim()}
            style={
                stagger
                    ? undefined
                    : { "--anim-delay": `${delay}ms`, "--anim-duration": `${duration}ms` }
            }
            {...rest}
        >
            {children}
        </Tag>
    );
}
