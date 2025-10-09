import { toolsLogos } from '../data/content';

export default function SkillWall() {
  return (
    <section className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold text-white">Skill Wall</h2>

        <h3 className="mt-6 text-lg font-semibold text-white">Tools & Platforms</h3>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {toolsLogos.map((tool) => (
            <div key={tool.label} className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-colors">
              <div className="aspect-[16/10] grid place-items-center p-2">
                <img src={tool.src} alt={tool.label} className="max-h-full max-w-full object-contain" loading="lazy" />
              </div>
              <div className="px-3 py-2 text-center text-xs text-zinc-300 group-hover:text-white">{tool.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
