import { experience, personal, socials } from '../data/content';

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
          </div>
          <div>
            <ol className="space-y-4">
              {experience.map((item) => (
                <li key={item.role + item.company} className="border border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">{item.role} · {item.company}</h3>
                    <span className="text-xs text-zinc-400">{item.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-300">{item.description}</p>
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
      </div>
    </section>
  );
}
