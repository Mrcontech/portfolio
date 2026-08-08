import type { ReactNode } from 'react'
import clsx from 'clsx'

/* -------------------------------------------------------------------------
   Dashed grid system. The page is framed by two full-height vertical rules at
   calc(25vw-24px) and every section band is capped by horizontal rules with
   3px dots at the four intersections.
------------------------------------------------------------------------- */

export function GridIntersections({
  edge,
  half = false,
}: {
  edge: 'top' | 'bottom'
  half?: boolean
}) {
  const y = half
    ? 'top-1/2 -translate-y-1/2'
    : edge === 'top'
      ? 'top-0 -translate-y-1/2'
      : 'bottom-0 translate-y-1/2'
  return (
    <>
      <div className={clsx('grid-intersection -left-6 -translate-x-1/2 hidden sm:block', y)} />
      <div className={clsx('grid-intersection -right-6 translate-x-1/2 hidden sm:block', y)} />
    </>
  )
}

/** Section header band: rule above, serif title, rule below. */
export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="w-full relative py-3 mb-6">
      <div className="grid-line-h top-0" />
      <GridIntersections edge="top" />
      <header className="font-serif font-normal text-2xl sm:text-3xl text-neutral-800 dark:text-neutral-200">
        {children}
      </header>
      <div className="grid-line-h bottom-0" />
      <GridIntersections edge="bottom" />
    </div>
  )
}

/** Thin dashed divider used between experience rows. */
export function RowDivider() {
  return (
    <div className="w-full relative my-3 py-1">
      <div className="grid-line-h top-1/2 -translate-y-1/2" />
      <GridIntersections edge="top" half />
    </div>
  )
}

/* -------------------------------------------------------------------------
   Shiny chip — the layered social / nav button. Five stacked gradient spans
   over a translucent base; class strings taken verbatim from the reference.
------------------------------------------------------------------------- */

export function ShinyChip({ children }: { children: ReactNode }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-[4px] overflow-hidden transition-colors duration-200 group-active:duration-[50ms] bg-white/90 dark:bg-[#0c0c0e] group-hover:dark:bg-[#121214] border border-black/5 dark:border-white/5 group-hover:border-black/10 dark:group-hover:border-white/10"
      >
        <span className="absolute inset-0 rounded-[4px] transition duration-200 bg-black/[0.02] dark:bg-transparent group-hover:bg-transparent dark:group-hover:bg-white/[0.02] group-active:bg-black/[0.04] dark:group-active:bg-white/[0.04] group-active:duration-[50ms]" />
        <span
          className="absolute inset-0 transition duration-200 group-active:opacity-0 group-active:duration-[50ms] opacity-[0.16] dark:opacity-[0.04]"
          style={{ background: 'linear-gradient(rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)' }}
        />
        <span
          className="absolute inset-0 transition duration-200 group-active:duration-[50ms] opacity-[0.04] dark:opacity-[0.1]"
          style={{
            background:
              'radial-gradient(65.62% 65.62% at 50% 100%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)',
          }}
        />
        <span
          className="absolute inset-0 transition duration-200 group-active:opacity-0 group-active:duration-[50ms] opacity-[0.4] dark:opacity-[0.04]"
          style={{
            background:
              'linear-gradient(99deg, rgba(255, 255, 255, 0) 27.7%, rgba(255, 255, 255, 0.12) 60.19%, rgba(255, 255, 255, 0) 86.06%)',
          }}
        />
      </span>
      <span className="relative">{children}</span>
    </>
  )
}

export const shinyChipClass =
  'group relative block rounded-[4px] text-center text-[13px] font-medium tracking-tight transition-[transform] duration-200 active:scale-[0.99] active:duration-[50ms] text-neutral-900 dark:text-neutral-300 px-2.5 sm:px-3 py-1.5 !text-[12px]'

/* -------------------------------------------------------------------------
   Rainbow button — animated conic-ish gradient border with a blurred bloom
   underneath. Long class string transcribed verbatim from the reference.
------------------------------------------------------------------------- */

export const rainbowButtonClass =
  "relative cursor-pointer group transition-all motion-safe:hover:animate-rainbow motion-safe:focus-visible:animate-rainbow inline-flex items-center justify-center gap-2 shrink-0 outline-none focus-visible:ring-[3px] aria-invalid:border-destructive font-medium whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 border border-input border-b-transparent bg-[linear-gradient(#ffffff,#ffffff),linear-gradient(#ffffff_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] bg-[length:200%] text-accent-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 motion-safe:hover:before:animate-rainbow motion-safe:focus-visible:before:animate-rainbow before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:[filter:blur(0.75rem)] dark:bg-[linear-gradient(#0a0a0a,#0a0a0a),linear-gradient(#0a0a0a_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] h-8 px-3 rounded-md text-xs group"

export const badgeClass =
  'inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none overflow-hidden rounded-lg border-0 bg-neutral-100/70 dark:bg-neutral-900/60 text-neutral-800 dark:text-neutral-200 px-2.5 py-1 text-xs font-normal transition-colors hover:bg-neutral-200/70 dark:hover:bg-neutral-800/60'
