import { skillDescriptions, skills } from '../data/content';

export default function SkillWall() {
  return (
    <section className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold text-white">Skill Wall</h2>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((s) => (
            <div
              key={s}
              className="text-center border border-white/10 rounded-lg px-4 py-6 text-zinc-300 hover:text-white hover:bg-white/5 hover:border-white/25 transition-colors"
            >
              {s}
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-white/10 rounded-lg p-5 hover:border-white/25 transition-colors bg-black/20">
            <h3 className="text-white font-semibold">Frontend</h3>
            <p className="mt-2 text-sm text-zinc-300">{skillDescriptions.frontend}</p>
          </div>
          <div className="border border-white/10 rounded-lg p-5 hover:border-white/25 transition-colors bg-black/20">
            <h3 className="text-white font-semibold">Backend</h3>
            <p className="mt-2 text-sm text-zinc-300">{skillDescriptions.backend}</p>
          </div>
          <div className="border border-white/10 rounded-lg p-5 hover:border-white/25 transition-colors bg-black/20">
            <h3 className="text-white font-semibold">DevOps</h3>
            <p className="mt-2 text-sm text-zinc-300">{skillDescriptions.devops}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
