import { useEffect, useState } from 'react';
import { Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    // Work should scroll to the Projects section on the current page
    { name: 'Work', onClick: () => {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } },
    { name: 'Skill Wall', path: '/skill-wall' },
  ] as const;

  return (
    <header
      className={`fixed top-3.5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full ${
        isScrolled
          ? 'h-14 bg-[#1B1B1B]/40 backdrop-blur-xl border border-white/10 scale-95 w-[90%] max-w-2xl'
          : 'h-14 bg-[#1B1B1B] w-[95%] max-w-3xl'
      }`}
    >
      <div className="mx-auto h-full px-6">
        <nav className="flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <Command className="w-5 h-5 text-indigo-400" />
            <span className="hidden md:inline-block font-bold text-base">aadarsh.pro</span>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 md:gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={(item as any).path ?? '#'}
                onClick={(e) => {
                  e.preventDefault();
                  if ('path' in item && item.path) {
                    navigate(item.path);
                  } else if ('onClick' in item && item.onClick) {
                    item.onClick();
                  }
                }}
                className="text-xs md:text-sm text-zinc-300 hover:text-white transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
            <a
              href="https://cal.com/aadarsh-gupta"
              target="_blank"
              rel="noreferrer"
              className="button-gradient rounded-full px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-white border border-white/10 bg-white/10 hover:bg-white/15 transition-colors"
            >
              Book a call
            </a>
          </div>

          {/* Mobile Navigation hamburger hidden since links are visible */}
          <div className="hidden md:hidden" />
        </nav>
      </div>

      {/* Mobile Sheet (disabled since inline links are visible on mobile) */}
      {false && isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-[#1B1B1B] border-l border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Command className="w-5 h-5 text-indigo-400" />
                <span className="font-bold text-base">aadarsh.pro</span>
              </div>
              <button
                type="button"
                className="rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-300 hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={(item as any).path ?? '#'}
                  className="text-lg text-zinc-300 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    if ('path' in item && item.path) {
                      navigate(item.path);
                    } else if ('onClick' in item && item.onClick) {
                      item.onClick();
                    }
                  }}
                >
                  {item.name}
                </a>
              ))}
              <a
                className="button-gradient mt-4 inline-block rounded-full px-4 py-2 text-white border border-white/10 bg-white/10 hover:bg-white/15"
                href="https://cal.com/aadarsh-gupta"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book a call
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
