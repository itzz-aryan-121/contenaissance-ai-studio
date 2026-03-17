import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface WebsiteGatewayProps {
  onComplete: () => void;
}

export default function WebsiteGateway({ onComplete }: WebsiteGatewayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("");
  const fullText = "www.contenaissance.com";

  useEffect(() => {
    const container = containerRef.current;
    
    // Typing effect logic
    let charIndex = 0;
    let typeInterval: ReturnType<typeof setInterval>;
    
    // Initial delay before typing starts
    const startTimeout = setTimeout(() => {
      typeInterval = setInterval(() => {
        if (charIndex <= fullText.length) {
          setDisplayText(fullText.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          // Typing finished, start exit animation
          setTimeout(() => {
            gsap.to(container, {
              scale: 0.2, // Shrink significantly
              x: "-40vw", // Move towards left
              y: "-40vh", // Move towards top
              opacity: 0,
              duration: 1.5,
              ease: "power3.inOut",
              onComplete: onComplete
            });
          }, 500);
        }
      }, 120); // Slower typing speed (120ms)
    }, 500);

    return () => {
      clearTimeout(startTimeout);
      if (typeInterval) clearInterval(typeInterval);
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] text-white"
    >
      <div ref={textRef} className="font-mono text-2xl md:text-4xl lg:text-6xl font-bold tracking-tighter text-gold-500">
        {displayText}
        <span className="animate-pulse">_</span>
      </div>
    </div>
  );
}
