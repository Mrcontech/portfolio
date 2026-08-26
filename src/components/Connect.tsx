import { connect } from '../data/site'
import { ArrowRight } from '../icons'
import { HatchBand } from './patterns'

/**
 * Closing call-to-action band.
 *
 * Structure follows the reference's contact section: full-bleed hatch band,
 * centred eyebrow / heading / body, then a pair of actions, closed by a second
 * hatch band. The copy is our own (see `connect` in src/data/site.ts).
 */
export function Connect() {
  return (
    <section id="connect" className="w-full relative mt-16 scroll-mt-24">
      <HatchBand />

      <div className="flex flex-col items-center text-center py-14 sm:py-20 px-4">
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
          {connect.eyebrow}
        </span>

        <h2 className="font-serif font-normal text-3xl sm:text-4xl text-neutral-800 dark:text-neutral-200 mt-3">
          {connect.heading}
        </h2>

        <p className="font-figtree text-[15px] leading-[26px] text-[rgb(140,140,140)] max-w-[46ch] mt-4">
          {connect.body}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-7">
          <a target="_blank" rel="noopener noreferrer" href={connect.primary.href} className="group">
            <button className="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap text-sm font-medium h-9 px-4 rounded-md bg-foreground text-background transition-all duration-300 hover:opacity-90">
              {connect.primary.label}
              <ArrowRight className="w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </a>

          <a target="_blank" rel="noopener noreferrer" href={connect.secondary.href}>
            <button className="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap text-sm font-medium h-9 px-4 rounded-md border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/40 hover:bg-neutral-200/40 dark:bg-neutral-900/30 dark:hover:bg-neutral-800/30 transition-all duration-300">
              {connect.secondary.label}
            </button>
          </a>
        </div>
      </div>

      <HatchBand />
    </section>
  )
}
