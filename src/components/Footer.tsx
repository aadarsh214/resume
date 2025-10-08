import { socials } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-400">© {year} Aadarsh Gupta. All rights reserved.</p>
        <div className="flex items-center gap-6">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm text-zinc-300 hover:text-white transition-colors">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
