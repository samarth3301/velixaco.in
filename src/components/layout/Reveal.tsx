"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
}

export const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
        }
      });
    }, { threshold: 0.1 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={cn("reveal-item", className)} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
