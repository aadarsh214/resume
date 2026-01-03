import { personal, socials } from '../data/content'

export default function Contact() {
  return (
    <section className="pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Contact {personal.name}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-300">
          Use these channels to reach out about roles, freelance projects, collaborations or questions about my work.
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h2 className="text-lg font-semibold text-white">Primary contact</h2>
            <p className="mt-2 text-sm text-zinc-300">
              Email works best for structured requests. Share context about the team, problem, timeline and how I can help.
            </p>
            <a
              href="mailto:aadarshgupta7828@gmail.com"
              className="mt-3 inline-flex rounded-full px-5 py-2.5 text-sm font-medium text-white border border-white/10 bg-white/10 hover:bg-white/15 transition-colors"
            >
              Email me
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h2 className="text-lg font-semibold text-white">Profiles</h2>
            <p className="mt-2 text-sm text-zinc-300">
              You can also reach me via these profiles if you prefer.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 px-4 py-1.5 text-xs text-zinc-200 hover:border-white/25 hover:text-white transition-colors"
                >
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
