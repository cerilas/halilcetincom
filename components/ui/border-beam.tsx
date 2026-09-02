import { cn } from "@/lib/utils";

export function BorderBeam({
  className,
  size = 140,
  duration = 8,
  colorFrom = "#C4A46A",
  colorTo = "transparent",
}: {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className,
      )}
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          padding: 1,
          background: `conic-gradient(from var(--beam-angle), ${colorFrom}, ${colorTo}, ${colorFrom})`,
          animation: `spin-beam ${duration}s linear infinite`,
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
        }}
      />
      <style>{`
        @property --beam-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin-beam {
          to { --beam-angle: 360deg; }
        }
      `}</style>
      <span className="sr-only" style={{ width: size }} />
    </div>
  );
}
