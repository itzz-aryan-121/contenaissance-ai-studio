import { useEffect, useRef } from 'react';

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let noisePattern: CanvasPattern | null = null;

    const createNoisePattern = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 128;
      offscreen.height = 128;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return null;

      const idata = offCtx.createImageData(128, 128);
      const buffer32 = new Uint32Array(idata.data.buffer);
      for (let i = 0; i < buffer32.length; i++) {
        if (Math.random() < 0.05) {
          buffer32[i] = 0x0a000000 + ((Math.random() * 255) << 24);
        }
      }
      offCtx.putImageData(idata, 0, 0);
      return ctx.createPattern(offscreen, 'repeat');
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      noisePattern = createNoisePattern();
    };

    let frameCount = 0;
    const render = () => {
      // Throttle the grain update to make it look like film grain (e.g., 15 fps)
      frameCount++;
      if (frameCount % 4 === 0 && noisePattern) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = noisePattern;
        ctx.save();
        ctx.translate(Math.random() * 128, Math.random() * 128);
        ctx.fillRect(-128, -128, canvas.width + 128, canvas.height + 128);
        ctx.restore();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
    />
  );
}
