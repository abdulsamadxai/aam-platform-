import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  image?: string;
  className?: string;
}

export function PageHeader({
  title,
  description,
  image = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
  className
}: PageHeaderProps) {
  return (
    <section className={cn("relative min-h-[40vh] flex flex-col items-center justify-center pt-32 pb-16 overflow-hidden bg-black", className)}>
      {/* Architecture Background - HD Grayscale */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-40 grayscale"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="absolute inset-0 z-10 bg-black/60" />

      <div className="container relative z-20 px-6 text-center">
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase text-white">
            {title}
          </h1>
          {description && (
            <p className="text-white/40 text-sm md:text-base font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}


