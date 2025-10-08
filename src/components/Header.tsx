import { useEffect, useMemo, useState } from 'react';
import { Home, Grid3x3, Image } from 'lucide-react';
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
    { icon: Grid3x3, label: 'Work', path: '/work' },
    { icon: Image, label: 'Skill Wall', path: '/skill-wall' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sm:fixed sm:top-0 sm:left-0 sm:right-0 z-50 px-3 sm:px-4 py-3 sm:py-4">
      <div className="flex max-w-7xl mx-auto items-center justify-between gap-3">
        <div className="hidden sm:block text-xs sm:text-sm font-mono text-zinc-300">Asia/Kolkata</div>

        <nav className="flex items-center gap-1 rounded-full px-2 py-2 backdrop-blur-md border border-white/10 bg-black/30 mx-auto sm:mx-0 overflow-x-auto whitespace-nowrap scrollbar-none">
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
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://cal.com/aadarsh-gupta"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs sm:text-sm text-white hover:border-white/30 hover:bg-white/15 transition-colors"
          >
            Book a call
          </a>
          <span className="text-xs sm:text-sm font-mono text-zinc-300">{now}</span>
        </div>
      </div>
    </header>
  );
}
