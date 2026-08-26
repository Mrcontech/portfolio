import { useEffect, useState } from 'react'

const navItems = [
  { index: '01', label: 'Experience', mobileLabel: 'Work', href: '#experience', id: 'experience' },
  { index: '02', label: 'Projects', mobileLabel: 'Builds', href: '#projects', id: 'projects' },
  { index: '03', label: 'Connect', mobileLabel: 'Hello', href: '#connect', id: 'connect' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('top')

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 28)
      if (window.scrollY < 160) setActive('top')
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-24% 0px -58% 0px', threshold: [0, 0.15, 0.4] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div aria-hidden="true" className="h-14 sm:h-16" />
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[180] h-14 px-0 sm:h-16 sm:px-4">
        <nav
          aria-label="Primary navigation"
          data-scrolled={scrolled}
          className={`pointer-events-auto mx-auto flex items-center justify-between overflow-hidden transition-[max-width,height,margin,border-radius,background-color,box-shadow,border-color,padding] duration-500 ease-[var(--expo-out)] ${
            scrolled
              ? 'mt-2 h-12 max-w-[44rem] rounded-full border border-border/80 bg-background/82 px-2 shadow-[0_16px_48px_rgba(0,0,0,0.13)] backdrop-blur-xl sm:mt-3 sm:px-3 dark:shadow-[0_16px_48px_rgba(0,0,0,0.42)]'
              : 'h-14 max-w-none rounded-none border-b border-border/70 bg-background/92 px-3 sm:h-16 sm:px-8'
          }`}
        >
          <a
            href="#top"
            onClick={() => setActive('top')}
            aria-label="Back to top"
            className="group flex shrink-0 items-center gap-2 rounded-full py-1 pr-2 text-foreground sm:gap-2.5"
          >
            <span className="relative grid size-7 place-items-center rounded-full border border-foreground/20 bg-foreground text-[9px] font-semibold tracking-[-0.04em] text-background transition-transform duration-300 group-hover:rotate-[-8deg]">
              OE
              <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full border-2 border-background bg-[#8fdf9b]" />
            </span>
            <span className="hidden font-serif text-lg leading-none tracking-[-0.02em] min-[360px]:inline sm:text-xl">
              Mrcontech
            </span>
          </a>

          <div className="relative flex h-9 items-stretch overflow-hidden rounded-full border border-border/70 bg-foreground/[0.035] p-0.5 dark:bg-white/[0.045]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3 right-3 top-1/2 h-px -translate-y-1/2 bg-border/70"
            />
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setActive(item.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`group relative z-10 flex items-center gap-1.5 rounded-full px-2 transition-all duration-300 sm:gap-2 sm:px-3 ${
                    isActive
                      ? 'bg-foreground text-background shadow-sm'
                      : 'text-muted-foreground hover:bg-background hover:text-foreground'
                  }`}
                >
                  <span
                    className={`grid size-4 place-items-center rounded-full font-mono text-[7px] leading-none transition-colors ${
                      isActive
                        ? 'bg-background/15 text-background'
                        : 'border border-border bg-background text-muted-foreground'
                    }`}
                  >
                    {item.index}
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.12em] sm:hidden">
                    {item.mobileLabel}
                  </span>
                  <span className="hidden text-[10px] font-semibold uppercase tracking-[0.13em] sm:inline">
                    {item.label}
                  </span>
                </a>
              )
            })}
          </div>
        </nav>
      </header>
    </>
  )
}
