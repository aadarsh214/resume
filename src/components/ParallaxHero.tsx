import { useEffect, useMemo, useRef, useState } from 'react';

function useMouseParallax(enabled: boolean) {
  const targetRef = useRef({ x: 0, y: 0 }); // normalized -1..1
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const nx = (e.clientX - cx) / cx; // -1 .. 1
      const ny = (e.clientY - cy) / cy; // -1 .. 1
      targetRef.current = { x: Math.max(-1, Math.min(1, nx)), y: Math.max(-1, Math.min(1, ny)) };
    };

    const animate = () => {
      const target = targetRef.current;
      const cur = currentRef.current;
      // Smooth follow with slight lag
      const nx = lerp(cur.x, target.x, 0.15);
      const ny = lerp(cur.y, target.y, 0.15);
      currentRef.current = { x: nx, y: ny };
      setPos({ x: nx, y: ny });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    const reset = () => {
      targetRef.current = { x: 0, y: 0 };
    };
    window.addEventListener('mouseleave', reset);

    return () => {
      window.removeEventListener('mousemove', handleMove as any);
      window.removeEventListener('mouseleave', reset as any);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  return pos;
}

function Layer({ text, pos, sensitivity, max = 30, style }: { text: React.ReactNode; pos: { x: number; y: number }; sensitivity: number; max?: number; style?: React.CSSProperties }) {
  const tx = pos.x * max * sensitivity;
  const ty = pos.y * max * sensitivity;
  const rot = pos.x * 4 * sensitivity; // subtle rotation
  const sc = 1 + Math.abs(pos.x + pos.y) * 0.02 * sensitivity;
  const transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg) scale(${sc})`;
  return (
    <div
      className="select-none will-change-transform"
      style={{ transform, transition: 'transform 120ms cubic-bezier(0.22, 1, 0.36, 1)', ...style }}
    >
      {text}
    </div>
  );
}

export default function ParallaxHero() {
  const isPointerFine = useMemo(() => matchMedia && matchMedia('(pointer: fine)').matches, []);
  const pos = useMouseParallax(isPointerFine);

  const gradientText: React.CSSProperties = {
    backgroundImage: 'linear-gradient(90deg, #ff00ff, #ff0080, #c800ff)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    textShadow: '0 0 20px rgba(255, 0, 255, 0.25), 0 0 40px rgba(200, 0, 255, 0.20)'
  };

  return (
    <div className="relative overflow-hidden">
      <div className="h-[28vh] sm:h-[32vh] md:h-[36vh] lg:h-[40vh] grid place-items-center">
        <div className="text-center leading-tight">
          <Layer
            text={<span className="block text-4xl sm:text-5xl md:text-6xl opacity-50 font-extrabold tracking-tight" style={gradientText as any}>Developer</span>}
            pos={pos}
            sensitivity={0.3}
          />
          <Layer
            text={<span className="block text-5xl sm:text-6xl md:text-7xl opacity-80 font-extrabold tracking-tight" style={gradientText as any}>Builder</span>}
            pos={pos}
            sensitivity={0.6}
          />
          <Layer
            text={<span className="block text-xl sm:text-2xl md:text-3xl text-white font-semibold" style={{ textShadow: '0 0 10px rgba(255, 0, 200, 0.25)' }}>I build my own tech</span>}
            pos={pos}
            sensitivity={1}
          />
        </div>
      </div>
    </div>
  );
}
