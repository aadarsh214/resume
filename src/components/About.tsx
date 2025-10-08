import { experience, personal, socials } from '../data/content';
import ProjectsCarousel from './ProjectsCarousel';

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <path d="M15 3h6v6"/>
      <path d="M10 14 21 3"/>
    </svg>
  );
}

function SocialLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
    >
      <span>{label}</span>
      <ExternalIcon />
    </a>
  );
}

export default function About() {
  return (
    <section className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-6">

        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white">
          {personal.name}
        </h1>
        <p className="mt-4 subtitle-premium font-clash-medium">{personal.title}</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-zinc-300 leading-relaxed">
              {personal.intro}
            </p>
            {/* Mini experiences on left */}
            <div className="mt-6 space-y-4">
              {experience
                .filter((e) => e.company === 'Hitkarini Sabha Trust' || e.company.startsWith('Outlier'))
                .map((item) => (
                  <div key={item.company + item.role} className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
                    <img
                      src={item.logo}
                      alt={`${item.company} logo`}
                      className="h-9 w-9 rounded-lg object-contain bg-white/5 border border-white/10"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="text-white text-sm font-semibold leading-tight">
                        {item.role}
                      </h3>
                      <p className="text-xs text-zinc-400">{item.company} · {item.period}</p>
                      {item.site ? (
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white"
                        >
                          <span>{new URL(item.site).hostname}</span>
                          <ExternalIcon />
                        </a>
                      ) : null}
                      {item.bullets?.length ? (
                        <ul className="mt-2 space-y-1 list-disc list-inside text-xs text-zinc-300">
                          {item.bullets.slice(0, 2).map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold text-lg">Work Experience</h2>
              <button
                type="button"
                aria-label="Next"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <ol className="mt-4 space-y-4">
              {experience
                .filter((e) => !(e.company === 'Hitkarini Sabha Trust' || e.company.startsWith('Outlier')))
                .map((item) => (
                <li
                  key={item.role + item.company}
                  className="group border border-white/10 rounded-xl p-4 bg-black/20 hover:bg-white/5 hover:border-white/25 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.logo}
                        alt={`${item.company} logo`}
                        className="h-10 w-10 rounded-lg object-contain bg-white/5 border border-white/10"
                        loading="lazy"
                      />
                      <div>
                        <h3 className="text-white font-semibold leading-tight">
                          {item.role} <span className="text-zinc-400">| {item.company}</span>
                        </h3>
                        <span className="text-xs text-zinc-400">{item.period}</span>
                        {item.site ? (
                          <div>
                            <a
                              href={item.site}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-1 inline-flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white"
                            >
                              <span>{new URL(item.site).hostname}</span>
                              <ExternalIcon />
                            </a>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {item.bullets?.length ? (
                    <ul className="mt-3 space-y-2 list-disc list-inside text-sm text-zinc-300">
                      {item.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-6">
          {socials.map((s) => (
            <SocialLink key={s.label} {...s} />
          ))}
        </div>

        {/* Projects carousel section */}
        <div className="mt-8">
          <ProjectsCarousel />
        </div>
      </div>
    </section>
  );
}

