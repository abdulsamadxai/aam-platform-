import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
    variant?: "light" | "dark";
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function Logo({ variant = "light", size = "md", className }: LogoProps) {
    const textColor = variant === "light" ? "text-white" : "text-black";

    const imgSizes = {
        sm: 65,
        md: 90,
        lg: 120
    };

    const textSizes = {
        sm: "text-[16px] leading-[1.1]",
        md: "text-[22px] leading-[1.1]",
        lg: "text-[30px] leading-[1.1]",
    };

    return (
        <div className={cn("inline-flex items-center gap-4", className)}>
            <div className="relative overflow-hidden bg-transparent shrink-0 rounded-sm" style={{ width: imgSizes[size], height: imgSizes[size] }}>
                <Image
                    src="/aam-logo-original.jpg"
                    alt="AAM Official Logo"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Wordmark: Architects / Association / Maldives stacked vertically */}
            <div
                className={cn(
                    "flex flex-col tracking-[0.08em] uppercase font-light",
                    textSizes[size],
                    textColor
                )}
                style={{ fontWeight: 300 }}
            >
                <span>Architects</span>
                <span>Association</span>
                <span>Maldives</span>
            </div>
        </div>
    );
}
