"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import "./glare-button.css";

export type GlareButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  onClick?: () => void;
};

export function GlareButton({
  children,
  className,
  href,
  type = "button",
  glareColor = "#ffffff",
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  onClick,
}: GlareButtonProps) {
  const hex = glareColor.replace("#", "");
  let rgba = glareColor;
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const vars = {
    "--gh-angle": `${glareAngle}deg`,
    "--gh-duration": `${transitionDuration}ms`,
    "--gh-size": `${glareSize}%`,
    "--gh-rgba": rgba,
    "--gh-br": "9999px", // Fully rounded by default, tailwind rounded-full
  } as React.CSSProperties;

  const baseClasses = cn(
    "glare-btn px-8 py-4 rounded-full font-medium tracking-widest uppercase text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} style={vars} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses}
      style={vars}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
