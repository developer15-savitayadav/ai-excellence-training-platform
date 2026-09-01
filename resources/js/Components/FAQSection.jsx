import { useState } from "react";
import RevealDiv from "./RevealDiv";

const FAQS = [
    {
        question: "What is your agency's core or niche?",
        answer: "We focus on practical AI training and career-oriented programs designed to help learners build relevant, real-world skills.",
    },
    {
        question: "What kind of results can we see?",
        answer: "Learners can expect hands-on experience, practical knowledge, portfolio-ready work, and improved confidence using modern AI tools.",
    },
    {
        question: "How We Measure Campaign Success",
        answer: "Success is measured through learning progress, practical application, project completion, and learner outcomes.",
    },
    {
        question: "What is client engagement model?",
        answer: "We provide structured learning support with guidance, practical sessions, and career-focused assistance.",
    },
    {
        question: "How will our internal team work?",
        answer: "Our team works through structured modules, practical activities, learner support, and continuous progress tracking.",
    },
    {
        question: "How we keep up with the market?",
        answer: "Course content and practical examples are updated around current AI tools, technologies, and industry requirements.",
    },
];

export default function FaqSection({ faqs }) {
    const [openFaq, setOpenFaq] = useState(null);
    const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);
    const items = faqs && faqs.length ? faqs : FAQS;

    return (
        <section id="faq" className="bg-white py-20 sm:py-24">
            <div className="mx-auto max-w-[1240px] px-6">
                <RevealDiv>
                    <div className="text-center mb-12">
                        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-violet mb-2">
                            FAQ_
                        </p>
                        <h2 className="mx-auto max-w-[500px] font-display text-[clamp(2rem,4vw,2.7rem)] font-bold leading-[1.05] tracking-[-0.04em] text-black">
                            Frequently Asked
                            <br />
                            Questions
                        </h2>
                    </div>
                </RevealDiv>

                <RevealDiv delay={100}>
                    <div className="mx-auto max-w-[640px] space-y-3">
                        {items.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div
                                    key={index}
                                    className={`rounded-[14px] overflow-hidden transition-all duration-300 ${
                                        isOpen
                                            ? "bg-ink border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,.04)]"
                                            : "bg-ink/50 border border-transparent hover:bg-ink hover:border-black/[0.04]"
                                    }`}
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="flex w-full cursor-pointer items-center justify-between px-5 sm:px-6 py-[18px] text-left group"
                                    >
                                        <span className="text-[14px] font-semibold text-black pr-4 group-hover:text-violet transition-colors duration-200">
                                            {faq.question}
                                        </span>
                                        <span
                                            className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[6px] transition-all duration-300 ${
                                                isOpen
                                                    ? "bg-violet text-white rotate-0 shadow-[0_2px_8px_rgba(152,44,220,.3)]"
                                                    : "bg-surface text-white"
                                            }`}
                                        >
                                            <span
                                                className={`text-sm font-bold transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                                            >
                                                +
                                            </span>
                                        </span>
                                    </button>
                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-5 sm:px-6 pb-5 pt-1 text-sm leading-relaxed text-black/50 border-t border-black/[0.06]">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </RevealDiv>
            </div>
        </section>
    );
}