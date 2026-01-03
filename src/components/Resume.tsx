import { experience, personal } from '../data/content'

export default function Resume() {
  return (
    <section className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Resume – {personal.name}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-300">
          Snapshot of skills, experience and projects for recruiters, hiring managers and founders who want a quick view of what I work on.
        </p>

        <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)]">
          <div>
            <h2 className="text-lg font-semibold text-white">Experience</h2>
            <ol className="mt-4 space-y-4">
              {experience.map((item) => (
                <li
                  key={item.company + item.role}
                  className="border border-white/10 rounded-xl p-4 bg-black/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.logo}
                        alt={`${item.company} logo`}
                        className="h-9 w-9 rounded-lg object-contain bg-white/5 border border-white/10"
                        loading="lazy"
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-white leading-tight">
                          {item.role} <span className="text-zinc-400">| {item.company}</span>
                        </h3>
                        <p className="text-xs text-zinc-400">{item.period}</p>
                      </div>
                    </div>
                  </div>
                  {item.bullets?.length ? (
                    <ul className="mt-3 space-y-1 text-xs text-zinc-300 list-disc list-inside">
                      {item.bullets.slice(0, 4).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">Profile summary</h2>
            <p className="mt-2 text-sm text-zinc-300">
              Full-stack software engineer and AI builder focused on shipping modern web products. I tend to work end-to-end on frontend, backend and integrations, with an emphasis on performance, UX and clear problem framing.
            </p>
            <h2 className="mt-6 text-lg font-semibold text-white">Key skills</h2>
            <ul className="mt-2 space-y-1 text-sm text-zinc-300 list-disc list-inside">
              <li>Frontend with React, TypeScript and modern CSS systems.</li>
              <li>APIs and backend services for SaaS products and tools.</li>
              <li>AI and automation workflows wired into real products.</li>
              <li>Designing interfaces and flows that feel polished and fast.</li>
            </ul>
            <h2 className="mt-6 text-lg font-semibold text-white">Availability</h2>
            <p className="mt-2 text-sm text-zinc-300">
              Open to roles and projects where I can own meaningful parts of the product and collaborate directly with technical or founding teams.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
