import React from 'react'

export type Project = {
  title: string
  desc: string
  /** If true, render as video using media as src; otherwise render as image */
  isVideo: boolean
  media: string
  /** Optional poster for videos */
  poster?: string
  href: string
}

export const projects: Project[] = [
  { title: 'Monitize.club', desc: 'Create , Share and Earn Platform', isVideo: true,  media: 'https://cdn.dribbble.com/userupload/16497156/file/original-16d9d3209c75d186b1fd3c32fc17a6d0.mp4', poster: 'https://cdn.dribbble.com/userupload/7388513/file/original-e38518d0a4fbbb06dcde27e6dfc48ddc.jpg?resize=1024x768&vertical=center', href: 'https://monitize.club' },
  { title: 'Crypto UI',  desc: 'Design system components set',      isVideo: false, media: 'https://cdn.dribbble.com/userupload/7388513/file/original-e38518d0a4fbbb06dcde27e6dfc48ddc.jpg?resize=1024x768&vertical=center', href: 'https://crypto-ui-three.vercel.app/' },
  { title: 'Pulse',    desc: 'Healthcare app patient flow',       isVideo: false, media: 'https://cdn.dribbble.com/userupload/32863428/file/original-d758492cd5a8a566d2d4b3196b230ee1.png?resize=1024x768&vertical=center', href: 'https://cligenerator.store' },
  { title: 'Voyagr',   desc: 'Travel planner interactions',       isVideo: false, media: 'https://cdn.dribbble.com/userupload/3741889/file/original-80a2ff8e519d4523e8f3c410173585b5.png?resize=1024x768&vertical=center',  href: 'https://agencc.vercel.app' },
  { title: 'Kinetic',  desc: 'Motion landing visuals',            isVideo: true,  media: 'https://cdn.dribbble.com/userupload/17145843/file/original-38460505171667483589246c81f22d41.mp4', poster: 'https://cdn.dribbble.com/userupload/45095286/file/96cdbd9b7b37f57e8559f8d4e573c676.png?resize=1024x768&vertical=center', href: 'https://echocrm-ui.vercel.app/' },
  { title: 'Echo CRM', desc: 'Sales pipeline screens',            isVideo: false, media: 'https://cdn.dribbble.com/userupload/45095286/file/96cdbd9b7b37f57e8559f8d4e573c676.png?resize=1024x768&vertical=center', href: 'https://echo-crm.vercel.app' },
  { title: 'Orbit',    desc: 'Onboarding walkthrough',            isVideo: false, media: 'https://cdn.dribbble.com/userupload/45074842/file/2d5bf4d27e532e0d2b4a3eb90ff6ca83.png?resize=1024x768&vertical=center', href: 'https://orbit-gray.vercel.app/' },
]

export default function ProjectsCarousel() {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null)
  const isDraggingRef = React.useRef(false)
  const dragStartXRef = React.useRef(0)
  const scrollStartRef = React.useRef(0)
  const movedRef = React.useRef(false)

  const isMobile = React.useMemo(() => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (isMobile) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel as any)
  }, [isMobile])

  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    let inView = false
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false
      },
      { root: null, threshold: 0.25 }
    )
    io.observe(el)

    let lastY = window.scrollY
    let accum = 0
    let lastTime = 0
    const threshold = 80
    const minInterval = 350

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        if (!inView) return
        const now = Date.now()
        const dy = window.scrollY - lastY
        lastY = window.scrollY
        accum += dy
        if (Math.abs(accum) >= threshold && now - lastTime > minInterval) {
          const dir: 1 | -1 = accum > 0 ? 1 : -1
          const card = el.querySelector('[data-card="1"]') as HTMLElement | null
          const gap = 24
          const width = (card?.offsetWidth ?? 280) + gap
          el.scrollBy({ left: dir * width, behavior: 'smooth' })
          lastTime = now
          accum = 0
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  const scrollByCards = (dir: 1 | -1, count = 1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector('[data-card="1"]') as HTMLElement | null
    const gap = 24
    const width = (card?.offsetWidth ?? 280) + gap
    el.scrollBy({ left: dir * width * count, behavior: 'smooth' })
  }

  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const videos = Array.from(el.querySelectorAll('video')) as HTMLVideoElement[]
    if (videos.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const vid = entry.target as HTMLVideoElement
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const p = vid.play()
            if (p && typeof p.catch === 'function') p.catch(() => {})
          } else {
            vid.pause()
          }
        }
      },
      { root: el, threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    videos.forEach((v) => io.observe(v))
    return () => io.disconnect()
  }, [])

  return (
    <section id="projects" aria-label="Projects" className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400">Selected work</p>
            <h2 className="mt-1 text-2xl font-semibold">Projects</h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => scrollByCards(-1, 1)} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10 transition" aria-label="Scroll left">◄</button>
            <button onClick={() => scrollByCards(1, 1)} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10 transition" aria-label="Scroll right">►</button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          onPointerDownCapture={(e) => {
            if (isMobile) return
            const el = scrollerRef.current
            if (!el) return
            // If the initial pointer down is on a link/button, don't start drag logic
            const target = e.target as HTMLElement
            if (target.closest('a,button')) return
            isDraggingRef.current = true
            movedRef.current = false
            dragStartXRef.current = e.clientX
            scrollStartRef.current = el.scrollLeft
          }}
          onPointerDown={(e) => {
            if (isMobile) return
            const el = scrollerRef.current
            if (!el) return
            const target = e.target as HTMLElement
            // Don't capture pointer when the press started on an interactive element
            if (target.closest('a,button')) return
            el.setPointerCapture(e.pointerId)
          }}
          onPointerMove={(e) => {
            if (isMobile) return
            const el = scrollerRef.current
            if (!el || !isDraggingRef.current) return
            const dx = e.clientX - dragStartXRef.current
            if (Math.abs(dx) > 3) movedRef.current = true
            el.scrollLeft = scrollStartRef.current - dx
          }}
          onPointerUp={(e) => {
            if (isMobile) return
            const el = scrollerRef.current
            if (!el) return
            isDraggingRef.current = false
            el.releasePointerCapture(e.pointerId)
          }}
          onPointerCancel={() => { isDraggingRef.current = false }}
          onPointerLeave={() => { isDraggingRef.current = false }}
          onClickCapture={(e) => {
            if (isMobile) return
            const target = e.target as HTMLElement
            const isInteractive = !!target.closest('a,button')
            // Only cancel clicks that were part of a drag gesture and not on interactive elements
            if (movedRef.current && !isInteractive) {
              e.preventDefault()
              e.stopPropagation()
            }
            // Reset moved flag on any click
            movedRef.current = false
          }}
          onDragStart={(e) => e.preventDefault()}
          className={`relative mx-auto overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-proximity [overscroll-behavior-x:contain] ${!isMobile ? 'cursor-grab active:cursor-grabbing' : ''} select-none` }
          style={{
            maskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)',
            maxWidth: `${280 * 4 + 24 * 3}px` ,
            touchAction: 'pan-x pan-y',
          }}
        >
          <div className="grid grid-rows-1 grid-flow-col auto-cols-[280px] gap-6 pr-6">
            {projects.map((p, i) => (
              <ProjectCard key={`${p.title}-${i}`} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const onCardClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // If user clicked the inner anchor/button, let it handle navigation
    const target = e.target as HTMLElement
    if (target.closest('a,button')) return
    // Open project link in new tab
    window.open(project.href, '_blank', 'noopener,noreferrer')
  }

  const onCardKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      window.open(project.href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div
      data-card="1"
      className="group relative h-[220px] w-[280px] overflow-hidden rounded-xl border border-white/10 bg-white/5 snap-start cursor-pointer"
      onClick={onCardClick}
      tabIndex={0}
      role="link"
      onKeyDown={onCardKeyDown}
    >
      {project.isVideo ? (
        <video
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={project.media}
          poster={project.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      ) : (
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={project.media}
          alt={project.title}
          loading="lazy"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
        <div className="max-w-[220px]">
          <h3 className="text-sm font-semibold leading-tight">{project.title}</h3>
          <p className="mt-1 line-clamp-2 text-xs text-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {project.desc}
          </p>
        </div>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title}`}
          className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
