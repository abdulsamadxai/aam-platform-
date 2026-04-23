import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "navy" | "sand" | "teal";
}

export function Logo({ className, variant = "navy" }: LogoProps) {
  const colorClass = {
    navy: "text-[#0A1628]",
    sand: "text-[#F5F2EB]",
    teal: "text-[#00A499]",
  }[variant];

  return (
    <div className={cn("flex items-center gap-6 lg:gap-8 group select-none", className)}>
      {/*
        SVG viewBox: 0 0 480 100
        Shape layout (matching the official logo exactly):
          - A1: solid triangle, peak at (50,0), base (0,100)-(100,100)
          - A2: solid triangle, peak at (170,0), base (120,100)-(220,100)
          - M:  two-peak shape with a central V-notch that goes ~50% down
                Left peak (250,0), valley (330,50), right peak (410,0)
                base left (230,100), base right (430,100)
      */}
      <div className="flex items-end h-10 lg:h-13 shrink-0">
        <svg
          viewBox="0 0 480 100"
          className="h-full w-auto"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="AAM"
          role="img"
        >
          {/* First 'A' — solid isosceles triangle */}
          <polygon
            points="50,0 100,100 0,100"
            className={cn(colorClass)}
          />

          {/* Second 'A' — solid isosceles triangle */}
          <polygon
            points="170,0 220,100 120,100"
            className={cn(colorClass)}
          />

          {/*
            'M' — two triangular peaks with a V-notch in the middle.
            The notch drops to y=50 (half height), matching the logo image.
            Outline: start bottom-left (230,100), up to left peak (260,0),
            down to valley (330,50), up to right peak (400,0),
            down to bottom-right (430,100), close.
          */}
          <polygon
            points="230,100 260,0 330,50 400,0 430,100"
            className={cn(colorClass)}
          />
        </svg>
      </div>

      {/* Text block */}
      <div
        className={cn(
          "flex flex-col leading-[1.25] tracking-[0.06em] font-sans justify-center",
          colorClass
        )}
      >
        <span className="text-[14px] lg:text-[17px] font-light">Architects</span>
        <span className="text-[14px] lg:text-[17px] font-light">Association</span>
        <span className="text-[14px] lg:text-[17px] font-light">Maldives</span>
      </div>
    </div>
  );
}
