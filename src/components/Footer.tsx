import { footer } from '../data/site'
import { ArrowRight } from '../icons'
import { GridIntersections } from './primitives'
import { DotGridPanel } from './DotGridPanel'

export function Footer() {
  return (
    <div className="flex justify-center">
      <footer className="pb-8 pt-5 flex flex-col justify-between relative w-[95vw] sm:w-[50vw]">
        {/* dashed "string" rule with a gradient stroke */}
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 800 10" className="w-full h-[10px] overflow-visible">
            <defs>
              <linearGradient
                id="footer-string-grad"
                x1="0"
                y1="0"
                x2="800"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="rgba(148, 163, 184, 0.3)" />
                <stop offset="0.5" stopColor="rgba(148, 163, 184, 0.8)" />
                <stop offset="1" stopColor="rgba(148, 163, 184, 0.3)" />
              </linearGradient>
            </defs>
            <g>
              <path
                d="M0,5 Q400,5 800,5"
                stroke="url(#footer-string-grad)"
                strokeWidth="1"
                strokeDasharray="6 6"
                fill="none"
                className="transition-colors"
              />
              <path d="M0,5 Q400,5 800,5" stroke="transparent" strokeWidth="20" fill="none" />
            </g>
          </svg>
        </div>

        <div className="w-32 sm:mask-r-from-90% absolute right-0 max-sm:blur-[2px] max-sm:hidden block origin-right dark:opacity-90">
          <img
            alt="Footer decorative leaf"
            loading="lazy"
            width={128}
            height={128}
            decoding="async"
            className="w-full"
            style={{ color: 'transparent', transform: 'rotateX(180deg)' }}
            src="/logo/leaf.svg"
          />
        </div>

        <div className="flex items-start gap-4 mt-12 pt-8 relative w-full">
          <div className="grid-line-h top-0" />
          <GridIntersections edge="top" />
          <div className="flex flex-col items-start">
            <h1 className="text-2xl">{footer.name}</h1>
            <h2 className="text-muted-foreground">
              {footer.roleLabel}{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#3b82f6] dark:hover:text-[#6aace0] transition-colors"
                href={footer.orgHref}
              >
                {footer.orgLabel}
              </a>{' '}
              {footer.tailBefore}
              <span className="italic">{footer.tailItalic}</span>
              {footer.tailAfter}
            </h2>
          </div>
        </div>

        <section className="w-full relative mt-5">
          <a target="_blank" rel="noopener noreferrer" className="group inline-block" href={footer.ctaHref}>
            <button className="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap text-sm font-medium shrink-0 outline-none relative h-9 px-4 py-2 rounded-md border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/40 hover:bg-neutral-200/40 dark:bg-neutral-900/30 dark:hover:bg-neutral-800/30 transition-all duration-300 group-hover:pr-9">
              {footer.ctaLabel}
              <ArrowRight className="w-4 absolute right-4 translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
            </button>
          </a>
        </section>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-15 pt-6 pb-6 w-full relative">
          <div className="text-left sm:text-right text-sm text-neutral-500 dark:text-neutral-400 sm:ml-auto">
            <div>{footer.madeWith}</div>
            <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">{footer.copyright}</div>
          </div>
          {/* closing dashed rule under the sign-off. Present on the reference
              (grid-line-h bottom-0 on this row) and previously missed. */}
          <div className="grid-line-h bottom-0" />
          <GridIntersections edge="bottom" />
        </div>

        <DotGridPanel />
      </footer>
    </div>
  )
}
