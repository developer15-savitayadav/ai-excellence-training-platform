import { useState } from "react";

/* ── Reusable dotted divider strip with corner edges ── */

function EdgeCorners() {
    return (
        <>
            <span
                className="absolute w-[6px] h-[6px] pointer-events-none"
                style={{
                    top: 0,
                    left: 0,
                    borderTop: "1px solid #c7c7c7",
                    borderLeft: "1px solid #c7c7c7",
                }}
            />
            <span
                className="absolute w-[6px] h-[6px] pointer-events-none"
                style={{
                    top: 0,
                    right: 0,
                    borderTop: "1px solid #c7c7c7",
                    borderRight: "1px solid #c7c7c7",
                }}
            />
            <span
                className="absolute w-[6px] h-[6px] pointer-events-none"
                style={{
                    bottom: 0,
                    left: 0,
                    borderBottom: "1px solid #c7c7c7",
                    borderLeft: "1px solid #c7c7c7",
                }}
            />
            <span
                className="absolute w-[6px] h-[6px] pointer-events-none"
                style={{
                    bottom: 0,
                    right: 0,
                    borderBottom: "1px solid #c7c7c7",
                    borderRight: "1px solid #c7c7c7",
                }}
            />
        </>
    );
}

function DottedDivider({ className = "", height = "h-16 sm:h-20" }) {
    return (
        <div
            className={`relative dotted-border  p-3 ${height} overflow-hidden ${className}`}
        >
            <EdgeCorners />
            <img
                src="/assets/images/dotted.webp"
                alt=""
                className=""
            />
        </div>
    );
}

/* ── Demo page showing the component ── */

export default function ComponentDemo() {
    return (
        <div className="bg-ink dotted-strip">
            <div className="max-w-[1240px] mx-auto">
                <DottedDivider />
            </div>
        </div>
    );
}
