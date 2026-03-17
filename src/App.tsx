import { useMemo, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Play, ArrowRight, Sparkles, Cpu, Film, Zap, MousePointer2, Layers, Eye, Globe } from 'lucide-react';
import SmoothScroll from './components/SmoothScroll';
import GrainOverlay from './components/GrainOverlay';
import ReelCard from './components/ReelCard';
import ButterflyCanvas from './components/ButterflyCanvas';

gsap.registerPlugin(ScrollTrigger);

const LOGO_URL = "/favicon.png";

export default function App() {
  const baseReels = useMemo(() => [
    {
      title: "Storytelling",
      video: "https://res.cloudinary.com/dbpx7aobb/video/upload/v1773651791/09_tbp1q7.mp4"
    },
    {
      title: "AI Model",
      video: "https://res.cloudinary.com/dbpx7aobb/video/upload/v1772686554/3d_wm31gf.mp4"
    },
    {
      title: "Cinematic Flow",
      video: "https://res.cloudinary.com/dbpx7aobb/video/upload/v1772686226/reels_l0xg2y.mp4"
    },
    {
      title: "Neural Core",
      video: "https://res.cloudinary.com/dbpx7aobb/video/upload/v1773651787/05_ucknoc.mp4"
    },
    {
      title: "AI Model",
      video: "https://res.cloudinary.com/dbpx7aobb/video/upload/v1773651789/01_mrmw5v.mp4"
    },
    {
      title: "Visionary",
      video: "https://res.cloudinary.com/dbpx7aobb/video/upload/v1772686226/reels_l0xg2y.mp4"
    },
  ], []);

  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const zoomSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.from(".hero-content > *", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5
      });

      gsap.to(".hero-video", {
        scale: 1.5,
        opacity: 0.1,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Horizontal Scroll Animation
      const horizontalScrollLength = horizontalContainerRef.current?.scrollWidth || 0;
      gsap.to(horizontalContainerRef.current, {
        x: -(horizontalScrollLength - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          start: "top top",
          end: () => `+=${horizontalScrollLength}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Zoom/Fade Animation for the big text section
      gsap.from(".zoom-text", {
        scale: 0.5,
        opacity: 0,
        scrollTrigger: {
          trigger: zoomSectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        }
      });

      gsap.to(".gold-glow", {
        opacity: 0.6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#050505] text-white selection:bg-gold-500 selection:text-black font-sans overflow-x-hidden">
        <GrainOverlay />
        <ButterflyCanvas />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 md:px-12 md:py-8 bg-black/10 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-4">
            <img 
              src={LOGO_URL} 
              alt="Contenaissance Logo" 
              className="h-10 md:h-16 w-auto object-contain brightness-110"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const span = document.createElement('span');
                  span.className = 'font-mono text-lg font-bold tracking-tighter uppercase text-gold-500';
                  span.innerText = 'Contenaissance';
                  parent.appendChild(span);
                }
              }}
            />
          </div>
          <div className="hidden items-center gap-10 lg:flex">
            {['Work', 'AI Lab', 'Process', 'Contact'].map((item) => (
              <a key={item} href="#" className="group relative text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 transition-colors hover:text-gold-400">
                {item}
                <span className="absolute -bottom-2 left-0 h-[1px] w-0 bg-gold-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <button className="group relative overflow-hidden rounded-full border border-gold-500/30 px-6 py-2.5 md:px-8 md:py-3 text-[10px] font-bold uppercase tracking-widest transition-all hover:border-gold-500">
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">Inquire</span>
            <div className="absolute inset-0 z-0 translate-y-full bg-gold-500 transition-transform duration-300 group-hover:translate-y-0" />
          </button>
        </nav>

        {/* Hero Section */}
        <section ref={heroRef} className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-20">
          <div className="hero-video absolute inset-0 z-0">
            <video
              src="https://res.cloudinary.com/dbpx7aobb/video/upload/v1773651791/09_tbp1q7.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-30 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505]" />
          </div>

          <div className="hero-content relative z-10 px-6 text-center md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-gold-500/20 bg-gold-500/5 px-5 py-2 text-[9px] font-bold uppercase tracking-[0.3em] text-gold-400 backdrop-blur-sm"
            >
              <Sparkles size={12} className="animate-pulse" />
              Ritz GenAI Storytelling Studios
            </motion.div>
            
            <h1 ref={textRef} className="max-w-6xl text-5xl font-medium leading-[0.85] tracking-tighter sm:text-7xl md:text-8xl lg:text-[10rem]">
              CRAFTING THE <br />
              <span className="font-serif italic text-gold-500/90">FUTURE</span> OF AI
            </h1>
            
            <p className="mx-auto mt-10 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base md:text-lg">
              We bridge the gap between human intuition and artificial intelligence to create cinematic experiences that resonate across the digital landscape.
            </p>
            
            <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <button className="group flex items-center gap-4 rounded-full bg-gold-500 px-10 py-5 text-[11px] font-bold uppercase tracking-widest text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] active:scale-95">
                View Showreel
                <Play size={16} fill="currentColor" />
              </button>
              <button className="flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-10 py-5 text-[11px] font-bold uppercase tracking-widest backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20">
                Our AI Core
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-500">Scroll</span>
            <div className="h-16 w-[1px] bg-gradient-to-b from-gold-500 to-transparent" />
          </div>
        </section>

        {/* Horizontal Scroll Section - AI Lab Showcase */}
        <section ref={horizontalSectionRef} className="relative h-screen overflow-hidden bg-[#0a0a0a]">
          <div ref={horizontalContainerRef} className="flex h-full w-fit items-center gap-20 px-24">
            <div className="flex w-[600px] flex-col justify-center">
              <h2 className="text-6xl font-medium tracking-tighter sm:text-8xl">THE AI <br /><span className="text-gold-500">LAB</span></h2>
              <p className="mt-8 text-zinc-500">Exploring the boundaries of neural synthesis and cinematic orchestration.</p>
            </div>
            
            {[
              { icon: <Layers size={40} />, title: "Neural Layers", desc: "Multi-layered synthesis for depth and realism." },
              { icon: <Eye size={40} />, title: "Visionary Core", desc: "AI that understands cinematic composition." },
              { icon: <Globe size={40} />, title: "Global Reach", desc: "Storytelling that transcends cultural barriers." },
              { icon: <Cpu size={40} />, title: "Quantum Flow", desc: "Real-time rendering at cinematic quality." }
            ].map((item, i) => (
              <div key={i} className="flex w-[400px] flex-shrink-0 flex-col rounded-3xl border border-white/5 bg-zinc-900/40 p-12 transition-all hover:border-gold-500/30">
                <div className="mb-10 text-gold-500">{item.icon}</div>
                <h3 className="mb-6 text-3xl font-medium tracking-tight">{item.title}</h3>
                <p className="text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Zoom/Fade Text Section */}
        <section ref={zoomSectionRef} className="flex min-h-screen flex-col items-center justify-center px-6 py-40 text-center">
          <div className="zoom-text">
            <h2 className="max-w-5xl text-6xl font-medium leading-[0.9] tracking-tighter sm:text-8xl md:text-[12rem]">
              BEYOND <br />
              <span className="font-serif italic text-gold-500">IMAGINATION</span>
            </h2>
            <p className="mx-auto mt-16 max-w-xl text-lg text-zinc-500">
              We don't just follow trends. We define the new standard of digital excellence through rigorous AI research and artistic mastery.
            </p>
          </div>
        </section>

        {/* AI Features Grid */}
        <section className="py-32 px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { icon: <Cpu className="text-gold-500" />, title: "Neural Rendering", desc: "Next-gen visual synthesis powered by custom trained models for photorealistic results." },
              { icon: <Film className="text-gold-500" />, title: "AI Cinematography", desc: "Automated camera paths and lighting orchestration for perfect cinematic compositions." },
              { icon: <Zap className="text-gold-500" />, title: "Rapid Iteration", desc: "From concept to cinematic 4K in a fraction of traditional production timelines." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/20 p-12 transition-all hover:border-gold-500/20 hover:bg-zinc-900/40"
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gold-500/5 blur-2xl transition-all group-hover:bg-gold-500/10" />
                <div className="mb-8 inline-block rounded-2xl bg-zinc-800/50 p-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-gold-500/10">
                  {feature.icon}
                </div>
                <h3 className="mb-5 text-2xl font-medium tracking-tight text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Reels Section */}
        <section className="py-32 px-6 md:px-12 lg:px-24">
          <div className="mb-24 flex flex-col items-end justify-between gap-10 lg:flex-row">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-[1px] w-12 bg-gold-500" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold-500">Portfolio</span>
              </div>
              <h2 className="text-5xl font-medium tracking-tighter sm:text-7xl lg:text-8xl">SELECTED REELS</h2>
              <p className="mt-8 text-base leading-relaxed text-zinc-500 md:text-lg">A collection of our latest AI-enhanced productions, pushing the boundaries of what's possible in digital storytelling and visual excellence.</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-zinc-500">
                <MousePointer2 size={20} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">Hover for sound</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {baseReels.map((reel, index) => (
              <ReelCard 
                index={index}
  
                title={reel.title} 
                video={reel.video} 
              />
            ))}
          </div>
        </section>

        {/* AI Philosophy Section */}
        <section className="relative overflow-hidden py-48 px-6 md:px-12">
          <div className="gold-glow absolute top-1/2 left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[150px] pointer-events-none" />
          
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h2 className="text-5xl font-medium tracking-tighter sm:text-7xl lg:text-9xl leading-[0.9]">
              WE DON'T JUST USE AI. <br />
              <span className="font-serif italic text-gold-500/80">WE CO-CREATE WITH IT.</span>
            </h2>
            <p className="mt-14 text-lg leading-relaxed text-zinc-400 md:text-xl md:px-20">
              Our philosophy is simple: AI is the brush, but the human spirit is the artist. We leverage neural networks to handle the complexity, allowing our creators to focus on the soul of the story.
            </p>
            <div className="mt-20 flex justify-center">
              <button className="group relative flex h-48 w-48 items-center justify-center rounded-full border border-gold-500/20 transition-all duration-500 hover:border-gold-500">
                <div className="absolute inset-0 rounded-full bg-gold-500/0 transition-all duration-500 group-hover:bg-gold-500/5 group-hover:blur-2xl" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] group-hover:scale-110 transition-transform">Start Project</span>
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-zinc-950/30 py-24 px-6 md:px-12 lg:px-24">
          <div className="flex flex-col justify-between gap-16 lg:flex-row">
            <div className="max-w-md">
              <div className="mb-10 flex items-center gap-4">
                <img 
                  src={LOGO_URL} 
                  alt="Contenaissance Logo" 
                  className="h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-base leading-relaxed text-zinc-500">
                The intersection of cinematic excellence and artificial intelligence. We create the future of visual media through neural innovation.
              </p>
              <div className="mt-10 flex gap-6">
                {['IG', 'VM', 'LI', 'TW'].map(social => (
                  <a key={social} href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[10px] font-bold transition-all hover:border-gold-500 hover:text-gold-500">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-16 sm:grid-cols-3 md:gap-24">
              <div>
                <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.4em] text-gold-500">Studio</h4>
                <ul className="space-y-5 text-sm text-zinc-500">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Our Process</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">AI Lab</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.4em] text-gold-500">Services</h4>
                <ul className="space-y-5 text-sm text-zinc-500">
                  <li><a href="#" className="hover:text-white transition-colors">Cinematics</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Neural FX</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Storytelling</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Consulting</a></li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.4em] text-gold-500">Contact</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  hello@contenaissance.com <br />
                  +1 (555) 0123 4567
                </p>
                <div className="mt-8 flex border-b border-white/10 pb-3">
                  <input type="email" placeholder="Join our newsletter" className="w-full bg-transparent text-xs outline-none placeholder:text-zinc-700" />
                  <button className="text-gold-500 hover:scale-110 transition-transform"><ArrowRight size={16} /></button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-24 flex flex-col justify-between border-t border-white/5 pt-12 text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-700 sm:flex-row">
            <p>© 2026 Contenaissance AI Studio. All rights reserved.</p>
            <div className="mt-6 flex gap-10 sm:mt-0">
              <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}

