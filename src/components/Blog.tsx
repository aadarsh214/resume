export default function Blog() {
  return (
    <section className="pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Articles by Aadarsh Gupta
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-300">
          Short, practical notes on resumes, AI and software engineering. This section will collect write-ups and breakdowns of projects over time.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h2 className="text-lg font-semibold text-white">How I approach building new products</h2>
            <p className="mt-2 text-sm text-zinc-300">
              A simple way I scope, design and ship new tools or dashboards so they are useful quickly and easier to evolve later.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h2 className="text-lg font-semibold text-white">Notes on making resumes clearer for engineers</h2>
            <p className="mt-2 text-sm text-zinc-300">
              Practical patterns I see in strong engineering resumes and a few ways to make experience easier to scan.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
