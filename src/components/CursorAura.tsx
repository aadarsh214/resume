import { useEffect, useMemo, useRef } from 'react';

export default function CursorAura() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const pointerType: 'fine' | 'coarse' = useMemo(() => {
    if (typeof window === 'undefined') return 'fine';
    return matchMedia('(pointer: fine)').matches ? 'fine' : 'coarse';
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (auraRef.current) auraRef.current.style.opacity = '1';
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      target.current.x = t.clientX;
      target.current.y = t.clientY;
      if (auraRef.current) auraRef.current.style.opacity = '1';
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.2);
      current.current.y = lerp(current.current.y, target.current.y, 0.2);

      const x = current.current.x;
      const y = current.current.y;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (auraRef.current) {
        // Slight lag and scale for premium feel
        const ax = lerp(x, target.current.x, 0.1);
        const ay = lerp(y, target.current.y, 0.1);
        auraRef.current.style.transform = `translate3d(${ax}px, ${ay}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    if (pointerType === 'fine') {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    } else {
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      // Initialize position near center on mobile
      target.current.x = window.innerWidth / 2;
      target.current.y = window.innerHeight / 2;
      current.current.x = target.current.x;
      current.current.y = target.current.y;
      if (auraRef.current) auraRef.current.style.opacity = '1';
      if (dotRef.current) dotRef.current.style.opacity = '1';
    }
    // Initialize at screen center once before starting the loop
    target.current.x = window.innerWidth / 2;
    target.current.y = window.innerHeight / 2;
    current.current.x = target.current.x;
    current.current.y = target.current.y;
    if (auraRef.current) auraRef.current.style.opacity = '1';
    if (dotRef.current) dotRef.current.style.opacity = '1';
    rafRef.current = requestAnimationFrame(animate);

    const onLeave = () => {
      if (auraRef.current) auraRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };
    const onEnter = () => {
      if (auraRef.current) auraRef.current.style.opacity = '1';
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };
    if (pointerType === 'fine') {
      window.addEventListener('mouseleave', onLeave);
      window.addEventListener('mouseenter', onEnter);
    }

    return () => {
      if (pointerType === 'fine') {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseleave', onLeave);
        window.removeEventListener('mouseenter', onEnter);
      } else {
        window.removeEventListener('touchmove', onTouchMove);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pointerType]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {/* Big gradient aura */}
      <div
        ref={auraRef}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-300 will-change-transform"
        style={{
          width: '640px',
          height: '640px',
          background: 'radial-gradient(35% 35% at 50% 50%, rgba(122,165,255,0.38) 0%, rgba(108,98,255,0.32) 35%, rgba(122,0,255,0.28) 60%, rgba(0,0,0,0) 74%)',
          filter: 'blur(40px) saturate(120%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Small core dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-300 will-change-transform"
        style={{
          width: '12px',
          height: '12px',
          background: 'linear-gradient(90deg, #7aa5ff, #6c62ff, #7a00ff)',
          boxShadow: '0 0 10px rgba(122,165,255,0.55), 0 0 18px rgba(122,0,255,0.4)',
        }}
      />
    </div>
  );
}
