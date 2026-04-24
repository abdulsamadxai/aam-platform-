import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    image?: string;
    className?: string;
}

export function PageHeader({
    title,
    subtitle,
    description,
    image = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
    className
}: PageHeaderProps) {
    const subtitleText = subtitle ?? description;
    return (
        <section className={cn("relative min-h-[50vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-black", className)}>
            {/* Architecture Background - HD Grayscale */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-40 grayscale"
                style={{
                    backgroundImage: `url('${image}')`,
                    backgroundAttachment: 'fixed'
                }}
            />
            {/* Strict B&W Overlay */}
            <div className="absolute inset-0 z-10 bg-black/60" />

            <div className="container relative z-20 px-6 text-center">
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase text-white">
                        {title}
                    </h1>
                    {subtitleText && (
                        <p className="text-white/40 text-base md:text-lg font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
                            {subtitleText}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
