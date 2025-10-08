import { projects } from '../data/content';

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <path d="M15 3h6v6"/>
      <path d="M10 14 21 3"/>
    </svg>
  );
}

export default function Work() {
  return (
    <section className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold text-white">Featured Work</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <a
              key={p.title}
              className="border border-white/10 rounded-xl p-5 hover:border-white/25 transition-colors bg-black/20 hover:bg-white/5 cursor-pointer block"
              href={p.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <ExternalIcon />
              </div>
              <p className="mt-2 text-sm text-zinc-300">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs rounded-full border border-white/10 text-zinc-300 hover:border-white/25 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
