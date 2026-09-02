"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Orientation = "horizontal" | "vertical";
type LabelPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";
type PercentagePosition = "top" | "bottom";

export type ComparisonSliderProps = {
  beforeImage: string;
  beforeVideo?: string;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  initialPosition?: number;
  value?: number;
  orientation?: Orientation;
  enableInertia?: boolean;
  dragOnHover?: boolean;
  autoAnimate?: boolean;
  dividerWidth?: number;
  showHandle?: boolean;
  handleSize?: number;
  handleIcon?: ReactNode;
  dividerColor?: string;
  handleColor?: string;
  dividerExtent?: number;
  onPositionChange?: (position: number) => void;
  className?: string;
  imageClassName?: string;
  handleClassName?: string;
  showLabels?: boolean;
  labelText?: { before: string; after: string };
  labelPosition?: LabelPosition;
  labelClassName?: string;
  beforeLabelClassName?: string;
  afterLabelClassName?: string;
  showPercentage?: boolean;
  percentagePosition?: PercentagePosition;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  ariaLabel?: string;
  reducedMotion?: boolean;
  scrollDriven?: boolean;
};

function clamp(value: number) {
  return Math.min(100, Math.max(0, value));
}

function DefaultHandleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 4 2 8l4 4M10 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ComparisonSlider({
  beforeImage,
  beforeVideo,
  videoRef,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  initialPosition = 50,
  value,
  orientation = "horizontal",
  enableInertia = true,
  dragOnHover = false,
  autoAnimate = false,
  dividerWidth = 3,
  showHandle = true,
  handleSize = 48,
  handleIcon,
  dividerColor = "white",
  handleColor = "white",
  dividerExtent = 1,
  onPositionChange,
  className,
  imageClassName,
  handleClassName,
  showLabels = false,
  labelText = { before: "Before", after: "After" },
  labelPosition = "top-left",
  labelClassName,
  beforeLabelClassName,
  afterLabelClassName,
  showPercentage = false,
  percentagePosition = "top",
  onDragStart,
  onDragEnd,
  ariaLabel = "Image comparison slider",
  reducedMotion = false,
  scrollDriven = false,
}: ComparisonSliderProps) {
  const id = useId();
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastT = useRef(0);
  const raf = useRef<number>(0);
  const positionRef = useRef(clamp(initialPosition));
  const initialPosRef = useRef(clamp(initialPosition));
  const [position, setPosition] = useState(clamp(initialPosition));
  const [prefersReduced, setPrefersReduced] = useState(reducedMotion);

  const isVertical = orientation === "vertical";

  useEffect(() => {
    if (reducedMotion) {
      setPrefersReduced(true);
      return;
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const onChange = () => setPrefersReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [reducedMotion]);

  const commit = useCallback(
    (val: number) => {
      const clamped = clamp(val);
      setPosition(clamped);
      positionRef.current = clamped;
      onPositionChange?.(clamped);
    },
    [onPositionChange],
  );

  useEffect(() => {
    if (value !== undefined) {
      commit(value);
    }
  }, [value, commit]);

  const positionFromEvent = useCallback(
    (clientX: number, clientY: number) => {
      const el = frameRef.current;
      if (!el) return position;
      const rect = el.getBoundingClientRect();
      if (isVertical) {
        return clamp(((clientY - rect.top) / rect.height) * 100);
      }
      return clamp(((clientX - rect.left) / rect.width) * 100);
    },
    [isVertical, position],
  );

  const stopInertia = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
  }, []);

  const runInertia = useCallback(() => {
    if (!enableInertia || prefersReduced) return;
    const step = () => {
      velocity.current *= 0.92;
      if (Math.abs(velocity.current) < 0.08) return;
      commit(positionRef.current + velocity.current);
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, [commit, enableInertia, prefersReduced]);

  const startDrag = useCallback(
    (clientX: number, clientY: number) => {
      dragging.current = true;
      lastX.current = isVertical ? clientY : clientX;
      lastT.current = performance.now();
      velocity.current = 0;
      stopInertia();
      commit(positionFromEvent(clientX, clientY));
      onDragStart?.();
    },
    [commit, isVertical, onDragStart, positionFromEvent, stopInertia],
  );

  const moveDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (!dragging.current && !dragOnHover) return;
      const now = performance.now();
      const axis = isVertical ? clientY : clientX;
      const dt = Math.max(now - lastT.current, 1);
      velocity.current = ((axis - lastX.current) / dt) * 8;
      lastX.current = axis;
      lastT.current = now;
      commit(positionFromEvent(clientX, clientY));
    },
    [commit, dragOnHover, isVertical, positionFromEvent],
  );

  const endDrag = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    onDragEnd?.();
    runInertia();
  }, [onDragEnd, runInertia]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => moveDrag(e.clientX, e.clientY);
    const onUp = () => endDrag();
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [endDrag, moveDrag]);

  useEffect(() => {
    if (!autoAnimate || prefersReduced || scrollDriven) return;
    let frame = 0;
    let dir = 1;
    let value = positionRef.current;
    const tick = () => {
      if (dragging.current) {
        value = positionRef.current;
        frame = requestAnimationFrame(tick);
        return;
      }
      value += dir * 0.12;
      if (value > 72) dir = -1;
      if (value < 28) dir = 1;
      commit(value);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoAnimate, prefersReduced, scrollDriven, commit]);

  // Scroll-driven mode: animate based on viewport scroll, starting when element first appears
  useEffect(() => {
    if (!scrollDriven) return;
    const el = frameRef.current;
    if (!el) return;

    const startPos = initialPosRef.current;
    let animationInitialCenter: number | null = null;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const vh = window.innerHeight;

      // Capture the reference point the first time element is visible in viewport
      if (animationInitialCenter === null && elCenter > 0 && elCenter < vh) {
        animationInitialCenter = elCenter;
      }

      if (animationInitialCenter === null) return;

      const scrollTo = vh * 0.15;
      const scrollRange = animationInitialCenter - scrollTo;
      const scrolled = animationInitialCenter - elCenter;
      const t = clamp((scrolled / Math.max(1, scrollRange)) * 100);
      const progress = clamp(startPos + (t / 100) * (100 - startPos));
      commit(progress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // handle case where element is already visible on load
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDriven, commit]);

  const afterClip = isVertical
    ? `inset(${position}% 0 0 0)`
    : `inset(0 0 0 ${position}%)`;
  const beforeClip = isVertical
    ? `inset(0 0 ${100 - position}% 0)`
    : `inset(0 ${100 - position}% 0 0)`;

  const extent = Math.min(1, Math.max(0.2, dividerExtent));
  const inset = ((1 - extent) / 2) * 100;

  const labelIsTop = labelPosition.startsWith("top");

  return (
    <div
      ref={frameRef}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-orientation={orientation}
      tabIndex={scrollDriven ? -1 : 0}
      className={cn("relative overflow-visible select-none touch-none", scrollDriven && "pointer-events-none", className)}
      onPointerDown={(e) => {
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
        startDrag(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (dragOnHover && !dragging.current) {
          commit(positionFromEvent(e.clientX, e.clientY));
        }
      }}
      onKeyDown={(e) => {
        const step = e.shiftKey ? 8 : 3;
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          commit(position - step);
        }
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          commit(position + step);
        }
        if (e.key === "Home") {
          e.preventDefault();
          commit(0);
        }
        if (e.key === "End") {
          e.preventDefault();
          commit(100);
        }
      }}
    >
      {beforeVideo ? (
        <video
          key={beforeVideo}
          ref={videoRef}
          src={beforeVideo}
          playsInline
          muted
          preload="auto"
          crossOrigin="anonymous"
          className={cn(
            "h-full w-full object-cover object-top",
            imageClassName,
          )}
          style={{ clipPath: beforeClip }}
        />
      ) : (
        <img
          src={beforeImage}
          alt={beforeAlt}
          draggable={false}
          className={cn(
            "h-full w-full object-cover object-top",
            imageClassName,
          )}
          style={{ clipPath: beforeClip }}
        />
      )}
      <img
        src={afterImage}
        alt={afterAlt}
        draggable={false}
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-top",
          imageClassName,
        )}
        style={{ clipPath: afterClip }}
      />

      {(dividerWidth > 0 || showHandle) && (
        <div
          className="pointer-events-none absolute inset-0 z-20 overflow-visible"
          aria-hidden
        >
          <div
            className="absolute flex items-center justify-center overflow-visible"
            style={
              isVertical
                ? {
                    left: `${inset}%`,
                    width: `${extent * 100}%`,
                    top: `${position}%`,
                    height: 140,
                    marginTop: -70,
                  }
                : {
                    top: `${inset}%`,
                    height: `${extent * 100}%`,
                    left: `${position}%`,
                    width: 140,
                    marginLeft: -70,
                  }
            }
          >
            {/* Wide radial glow — extends far beyond the container so no hard edges */}
            <span
              className="pointer-events-none absolute"
              style={
                isVertical
                  ? {
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 600,
                      height: 80,
                      background:
                        "radial-gradient(ellipse at center, rgba(255,246,220,0.55) 0%, rgba(196,164,106,0.22) 35%, transparent 70%)",
                      animation: "slider-bloom 3.8s ease-in-out infinite",
                    }
                  : {
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 80,
                      height: 600,
                      background:
                        "radial-gradient(ellipse at center, rgba(255,246,220,0.55) 0%, rgba(196,164,106,0.22) 35%, transparent 70%)",
                      animation: "slider-bloom 3.8s ease-in-out infinite",
                    }
              }
            />
            <span
              className="pointer-events-none absolute rounded-full"
              style={
                isVertical
                  ? {
                      left: 0,
                      right: 0,
                      top: "50%",
                      height: Math.max(dividerWidth, 2),
                      marginTop: -Math.max(dividerWidth, 2) / 2,
                      background: `linear-gradient(to right, transparent, ${dividerColor} 18%, #fffaf0 50%, ${dividerColor} 82%, transparent)`,
                      filter:
                        "drop-shadow(0 0 6px #fff6dc) drop-shadow(0 0 16px #C4A46A) drop-shadow(0 0 32px rgba(196,164,106,0.55))",
                    }
                  : {
                      top: 0,
                      bottom: 0,
                      left: "50%",
                      width: Math.max(dividerWidth, 2),
                      marginLeft: -Math.max(dividerWidth, 2) / 2,
                      background: `linear-gradient(to bottom, transparent, ${dividerColor} 18%, #fffaf0 50%, ${dividerColor} 82%, transparent)`,
                      filter:
                        "drop-shadow(0 0 6px #fff6dc) drop-shadow(0 0 16px #C4A46A) drop-shadow(0 0 32px rgba(196,164,106,0.55))",
                    }
              }
            />
          {showHandle && (
            <div
              className={cn(
                "relative z-10 flex items-center justify-center rounded-full",
                !handleClassName &&
                  "shadow-[0_0_0_1px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.28)]",
                handleClassName,
              )}
              style={{
                width: handleSize,
                height: handleSize,
                ...(handleClassName
                  ? {}
                  : {
                      background: handleColor,
                      color:
                        handleColor === "white" || handleColor === "#fff"
                          ? "#111"
                          : "#fff",
                    }),
              }}
            >
              {handleIcon ?? <DefaultHandleIcon />}
            </div>
          )}
          </div>
        </div>
      )}

      {showLabels && (
        <>
          <span
            className={cn(
              "pointer-events-none absolute z-30 whitespace-nowrap text-[10px] tracking-[0.18em] text-gold/80 uppercase",
              labelIsTop ? "top-3" : "bottom-3",
              labelClassName,
              beforeLabelClassName,
            )}
            style={{ left: 12, right: "auto" }}
          >
            {labelText.before}
          </span>
          <span
            className={cn(
              "pointer-events-none absolute z-30 whitespace-nowrap text-[10px] tracking-[0.18em] text-gold/80 uppercase",
              labelIsTop ? "top-3" : "bottom-3",
              labelClassName,
              afterLabelClassName,
            )}
            style={{ right: 12, left: "auto" }}
          >
            {labelText.after}
          </span>
        </>
      )}

      {showPercentage && (
        <span
          id={id}
          className={cn(
            "pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-2 py-0.5 text-[11px] tabular-nums text-white",
            percentagePosition === "top" ? "top-4" : "bottom-4",
          )}
        >
          {Math.round(position)}%
        </span>
      )}
    </div>
  );
}
