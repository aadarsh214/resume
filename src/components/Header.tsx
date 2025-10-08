import { useEffect, useMemo, useState } from 'react';
import { Home, User, Grid3x3, Image } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const [now, setNow] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  const formatter = useMemo(() =>
    new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }), []);

  useEffect(() => {
    const tick = () => setNow(formatter.format(new Date()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [formatter]);

  const navItems = [
    { icon: Home, label: '', path: '/' },
    { icon: User, label: 'About', path: '/about' },
    { icon: Grid3x3, label: 'Work', path: '/work' },
    { icon: Image, label: 'Skill Wall', path: '/skill-wall' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="text-xs sm:text-sm font-mono text-zinc-300">Asia/Kolkata</div>

        <nav className="flex items-center gap-1 rounded-full px-1.5 sm:px-2 py-1.5 sm:py-2 backdrop-blur-md overflow-x-auto whitespace-nowrap scrollbar-none max-w-[75vw] sm:max-w-none border border-white/10 bg-black/30">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`group relative overflow-hidden flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors ${
                isActive(item.path)
                  ? 'text-white border border-white/30 bg-white/5'
                  : 'text-zinc-300 hover:text-white border border-white/10 hover:bg-white/5'
              }`}
              aria-current={isActive(item.path) ? 'page' : undefined}
            >
              <item.icon size={16} className="sm:size-[18px]" />
              {item.label && (
                <span className="text-xs sm:text-sm">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="text-xs sm:text-sm font-mono text-zinc-300">{now}</div>
      </div>
    </header>
  );
}
