import clsx from 'clsx'

/**
 * Section-separator patterns adapted from sahilcodex.vercel.app.
 *
 * These sit ALONGSIDE the existing dashed `grid-line-*` / `grid-intersection`
 * system rather than replacing it: that system is consumed by six files and
 * swapping it out is a much wider change than adding these.
 *
 * Both were recovered from the reference's inline utility strings, not guessed.
 */

/**
 * Full-bleed 24px hatch band. Escapes whatever column it is dropped into via
 * `left-1/2 w-screen -translate-x-1/2`, so it spans the viewport even inside
 * our 50vw content column.
 *
 * The stripes are a 315deg repeating gradient on a 10px tile drawn in a `::before`
 * at `-z-10`. The reference writes its dark variant as `theme(colors.neutral.900)`,
 * which is Tailwind v3 syntax and does not resolve under v4, so the literal
 * value is inlined here instead.
 */
export function HatchBand({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        'relative left-1/2 flex h-6 w-screen shrink-0 -translate-x-1/2',
        'border-y border-neutral-200/90 dark:border-neutral-800',
        'before:absolute before:inset-0 before:-z-10',
        'before:bg-[repeating-linear-gradient(315deg,transparent_0,rgb(229_229_229_/_0.6)_0,rgb(229_229_229_/_0.6)_1px,transparent_1px,transparent_50%)]',
        'before:bg-[size:10px_10px]',
        'dark:before:bg-[repeating-linear-gradient(315deg,transparent_0,#171717_0,#171717_1px,transparent_1px,transparent_50%)]',
        'dark:opacity-60',
        className,
      )}
    />
  )
}

/**
 * Masked dot field, 10px pitch. `--pattern-foreground` carries the dot colour so
 * the light/dark swap is a single token change, exactly as the reference does it.
 * The circular mask plus the two axis masks fade the field out at its edges so it
 * never collides hard with the surrounding rules.
 */
export function DotField({
  className,
  children,
}: {
  /** Height is intentionally NOT set here: pass it in. Baking `min-h-*` into
   *  the base made callers unable to shrink the band, since an override in
   *  `className` carries the same specificity and loses on source order. */
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={clsx(
        'flex w-full items-center justify-center',
        'bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]',
        'bg-size-[10px_10px] bg-center',
        'mask-y-from-90% mask-x-from-95% mask-circle',
        '[--pattern-foreground:color-mix(in_oklab,var(--color-zinc-400)_60%,transparent)]',
        'dark:[--pattern-foreground:color-mix(in_oklab,var(--color-zinc-600)_60%,transparent)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
