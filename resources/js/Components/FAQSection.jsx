import { useState } from "react";
import { MessageCircle, Info, Plus } from "lucide-react";
import DottedDivider from "./DottedDivider";
const FAQ_ITEMS = [
    {
        id: 1,
        question: "What AI experience do I need?",
        answer: "None required for our foundational courses. We offer learning paths for every level, from complete beginners to experienced engineers looking to specialize. Each course page includes a recommended prerequisite section.",
    },
    {
        id: 2,
        question: "Can I get a certificate?",
        answer: "Yes! Every course completion earns a blockchain-verified certificate. These are shareable via a unique verification link and recognized by leading tech employers worldwide.",
    },
    {
        id: 3,
        question: "How long do I have access?",
        answer: "Individual subscribers get lifetime access to all enrolled courses. Free tier users retain access to enrolled courses for 90 days. Teams maintain access as long as their subscription is active.",
    },
    {
        id: 4,
        question: "Are courses self-paced?",
        answer: "Absolutely. All courses are 100% self-paced with lifetime access. New content is added monthly, and you'll automatically get access to updates and new modules.",
    },
    {
        id: 5,
        question: "Can teams enroll together?",
        answer: "Yes, our Team and Pro plans support collaborative learning with shared dashboards, team-based progress tracking, custom learning paths, and dedicated account management.",
    },
];
function FAQAccordionItem({ item, index, isOpen, onToggle }) {
    const num = String(index + 1).padStart(2, "0");

    return (
        <div
            className={`relative border-b border-black/[0.08] transition-colors ${
                isOpen ? "border-l-2 border-l-[#eec369]" : "border-l-2 border-l-transparent"
            }`}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-start justify-between gap-6 accordion-btn text-left group"
            >
                <div className="flex gap-4 sm:gap-6">
                    <span className="font-mono text-xs text-muted pt-1 shrink-0">{num}</span>
                    <span
                        className={`text-sm sm:text-base font-medium leading-relaxed transition-colors ${
                            isOpen ? "text-[#eec369]" : "text-body group-hover:text-[#eec369]"
                        }`}
                    >
                        {item.question}
                    </span>
                </div>
                <span
                    className={`shrink-0 h-8 w-8 rounded-full border border-black/15 flex items-center justify-center transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                    }`}
                >
                    <Plus className="h-3.5 w-3.5 text-muted" strokeWidth={1.5} />
                </span>
            </button>

            {isOpen && (
                <div className="pl-6 sm:pl-[52px] pr-16 pb-6 -mt-2">
                    <p className="text-sm text-muted leading-relaxed">{item.answer}</p>
                </div>
            )}
        </div>
    );
}

function FAQAccordion({ items }) {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="border-t border-black/[0.08]">
            {items.map((item, i) => (
                <FAQAccordionItem
                    key={i}
                    item={item}
                    index={i}
                    isOpen={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
            ))}
        </div>
    );
}

export default function FAQSection() {
    return (
        <section className="bg-ink">
            <DottedDivider />
            <div className="max-w-[1240px] mx-auto px-6 max-lg:py-[72px] section-left-right-border">
                <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
                    {/* Left — sticky text block */}
                    <div className="lg:sticky lg:top-24 lg:self-center flex flex-col justify-between lg:min-h-[420px] py-8 px-6">
                        <div>
                            <MessageCircle className="h-6 w-6 text-muted mb-6" strokeWidth={1.5} />
                            <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.1] text-body">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-muted text-sm mt-5 max-w-xs leading-relaxed">
                                Learn everything necessary to effectively construct projects using TaskForge.
                            </p>
                        </div>

                        <div className="flex items-start gap-2 mt-12 lg:mt-0">
                            <Info className="h-3.5 w-3.5 text-muted mt-0.5 shrink-0" strokeWidth={1.5} />
                            <p className="font-mono text-[11px] text-muted leading-relaxed">
                                FAQ are updated regularly based on real customer feedback.
                            </p>
                        </div>
                    </div>

                    {/* Right — numbered accordion */}
                    <div>
                        <FAQAccordion items={FAQ_ITEMS} />
                    </div>
                </div>
            </div>
            <DottedDivider />
        </section>
         
    );
}