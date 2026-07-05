"use client";

import { useEffect } from "react";
import { X, ArrowRight, FileText } from "lucide-react";
import Image from "next/image";
import { useBuyModal } from "./BuyModalContext";

const KEYFRAMES = `
@keyframes bm-fadeIn  { from{opacity:0}              to{opacity:1} }
@keyframes bm-slideUp { from{opacity:0;transform:translateY(32px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
`;

const OPTIONS = [
    {
        id: "amazon",
        logo: "/images/amazon-round.png",
        label: "Buy on Amazon",
        sub: "Paperback & Hardcover",
        color: "#FF9900",
        bg: "rgba(255,153,0,0.10)",
        border: "rgba(255,153,0,0.28)",
        href: "https://www.amazon.in/How-Raise-Genius-Child-Unlocking/dp/939245427X",
    },
    {
        id: "flipkart",
        logo: "/images/flipkart1.png",
        label: "Buy on Flipkart",
        sub: "Fast delivery across India",
        color: "#2874f0",
        bg: "rgba(40,116,240,0.10)",
        border: "rgba(40,116,240,0.28)",
        href: "https://www.flipkart.com",
    },
    {
        id: "kindle",
        logo: "/images/kindle-round1.png",
        label: "Read on Kindle",
        sub: "Instant digital access",
        color: "#00A8E1",
        bg: "rgba(0,168,225,0.10)",
        border: "rgba(0,168,225,0.28)",
        href: "https://www.amazon.in/How-Raise-Genius-Child-Unlocking-ebook/dp/B0XXXXXXXX",
    },
    {
        id: "sample",
        logo: null,
        label: "Read Sample",
        sub: "Free preview — no sign-in needed",
        color: "#10b981",
        bg: "rgba(16,185,129,0.10)",
        border: "rgba(16,185,129,0.28)",
        href: "https://read.amazon.com/sample/B0H1F7LTV6?clientId=share",
    },
];

export default function BuyModal() {
    const { isOpen, close } = useBuyModal();

    /* Close on Escape key */
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [isOpen, close]);

    /* Lock body scroll while open */
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            <style>{KEYFRAMES}</style>

            {/* ── Backdrop — clicking it closes the modal ── */}
            <div
                className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-sm cursor-pointer"
                style={{ animation: "bm-fadeIn .2s ease both" }}
                onClick={close}
                aria-hidden="true"
            />

            {/* ── Modal panel ── */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Get your copy"
                className="fixed inset-0 z-[510] flex items-center justify-center p-4 pointer-events-none"
            >
                <div
                    className="relative w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden pointer-events-auto"
                    style={{
                        background: "var(--card)",
                        borderColor: "color-mix(in oklch,var(--brand-gold) 22%,transparent)",
                        animation: "bm-slideUp .28s cubic-bezier(0.34,1.56,0.64,1) both",
                    }}
                >

                    {/* Close button */}
                    <button
                        onClick={close}
                        aria-label="Close"
                        className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150 z-10"
                    >
                        <X size={16} />
                    </button>

                    {/* Header */}
                    <div className="px-7 pt-6 pb-4 text-center">
                        <div className="inline-flex items-center justify-center mb-3">
                            <Image
                                src="/images/book-cover.png"
                                alt="How to Raise a Genius Child"
                                width={64}
                                height={84}
                                className="object-contain rounded-lg shadow-md"
                                style={{
                                    filter: "drop-shadow(0 4px 12px color-mix(in oklch,var(--brand-ember) 40%,transparent))",
                                }}
                                priority
                            />
                        </div>
                        <h2 className="text-xl font-black tracking-tight text-foreground mb-1">
                            Get Your Copy
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Choose how you&apos;d like to read <em>How to Raise a Genius Child</em>
                        </p>
                    </div>

                    {/* Options */}
                    <div className="px-6 pb-7 flex flex-col gap-3">
                        {OPTIONS.map((opt) => (
                            <a
                                key={opt.id}
                                href={opt.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 rounded-2xl border p-3.5 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg group"
                                style={{
                                    background: opt.bg,
                                    borderColor: opt.border,
                                }}
                            >
                                {/* Logo bubble */}
                                <div
                                    className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110 overflow-hidden bg-white"
                                    style={{ border: `1.5px solid ${opt.border}` }}
                                >
                                    {opt.logo ? (
                                        <Image
                                            src={opt.logo}
                                            alt={opt.label}
                                            width={44}
                                            height={44}
                                            className="object-contain w-full h-full"
                                        />
                                    ) : (
                                        <FileText size={24} style={{ color: opt.color }} />
                                    )}
                                </div>

                                {/* Text */}
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-sm text-foreground leading-tight">{opt.label}</div>
                                    <div className="text-xs mt-0.5 text-muted-foreground">{opt.sub}</div>
                                </div>

                                {/* Arrow */}
                                <ArrowRight
                                    size={16}
                                    className="flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200"
                                    style={{ color: opt.color }}
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
