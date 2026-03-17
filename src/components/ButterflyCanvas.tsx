import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ButterflyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const birdRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const bird = birdRef.current;
    if (!container || !bird) return;

    const isMobile = window.innerWidth < 768;
    
    // 1. Independent "live" hovering animation (runs continuously, independent of scroll)
    const hoverAnim = gsap.to(bird, {
      y: 20,
      rotation: 4,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 2. Scroll-based flight path
    // We assume the bird naturally faces Left. We start it on the top-right, flying left.
    gsap.set(container, {
      x: window.innerWidth * 0.8,
      y: window.innerHeight * 0.1,
      scale: isMobile ? 0.7 : 1,
      rotation: -10, // Tilted slightly downwards to the left
      scaleX: 1, // Facing left
      transformOrigin: "center center"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2, // Smooth 2-second scrubbing delay to make it feel weighty and alive
      }
    });

    // Swoop down to the Left
    tl.to(container, {
      x: window.innerWidth * 0.1,
      y: window.innerHeight * 0.35,
      rotation: 5,
      duration: 2,
      ease: "sine.inOut"
    })
    // Quick flip to face Right (as it turns around)
    .to(container, {
      scaleX: -1,
      rotation: 15, // Bank into the turn
      duration: 0.3,
      ease: "power1.inOut"
    })
    // Swoop down to the Right (flies closer to the camera, getting bigger)
    .to(container, {
      x: window.innerWidth * 0.85,
      y: window.innerHeight * 0.65,
      rotation: 10,
      scale: isMobile ? 1 : 1.5, // Increase size for 3D depth effect
      duration: 2,
      ease: "sine.inOut"
    })
    // Quick flip to face Left again
    .to(container, {
      scaleX: 1,
      rotation: -15, // Bank into the turn
      duration: 0.3,
      ease: "power1.inOut"
    })
    // Final swoop to the Center-Bottom
    .to(container, {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.9,
      rotation: 0,
      scale: isMobile ? 0.8 : 1.1,
      duration: 2,
      ease: "power2.out"
    });

    return () => {
      hoverAnim.kill();
      if (tl) tl.kill();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* We use a container for scroll movement, and the img inside for continuous flapping/hovering */}
      <div ref={containerRef} className="absolute left-0 top-0 w-max h-max">
        <img 
          ref={birdRef} 
          src="/bird.gif" 
          alt="Flying Bird" 
          className="w-48 md:w-72 lg:w-96 h-auto object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
        />
      </div>
    </div>
  );
}
