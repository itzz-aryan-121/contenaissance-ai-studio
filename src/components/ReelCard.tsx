import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

interface ReelCardProps {
  title: string;
  video: string;
  index: number;
}

export default function ReelCard({ title, video, index }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().catch(() => {
        // Handle autoplay block if necessary
        console.log("Autoplay with sound blocked by browser");
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      viewport={{ once: true }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl transition-all duration-500 hover:shadow-gold-500/20"
    >
      <video
        ref={videoRef}
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      
      {/* Sound Indicator */}
      <div className="absolute top-4 right-4 z-20 rounded-full bg-black/40 p-2 backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {isMuted ? <VolumeX size={14} className="text-white/60" /> : <Volume2 size={14} className="text-gold-400 animate-pulse" />}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-500/80">Project {index + 1}</p>
        <h3 className="mt-1 text-2xl font-medium tracking-tight text-white">{title || "Untitled"}</h3>
        <div className="mt-4 h-[1px] w-0 bg-gold-500 transition-all duration-700 group-hover:w-full" />
      </div>
    </motion.div>
  );
}
