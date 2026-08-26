import { footer } from '../data/site'
import { HatchBand, DotField } from './patterns'

/**
 * Footer, laid out after the sahilcodex reference:
 *
 *   optional pull-quote  ->  hatch band  ->  centred sign-off  ->  hatch band
 *   ->  masked dot field
 *
 * Everything is centred and full-bleed, which is why the hatch bands and dot
 * field live outside the content column.
 *
 * The reference's own credit line and quote are deliberately NOT carried over:
 * that text credits their site to them. The sign-off below reads from
 * `footer` in src/data/site.ts, and the quote block stays hidden until you put
 * your own line in `footer.quote`.
 */
export function Footer() {
  const hasQuote = footer.quote.text.trim().length > 0

  return (
    <footer className="w-full relative">
      {hasQuote && (
        <div className="flex justify-center">
          <div className="w-[92vw] sm:w-[50vw] flex flex-col items-center text-center py-14 sm:py-16">
            <span
              aria-hidden="true"
              className="font-serif text-5xl leading-none text-neutral-300 dark:text-neutral-700 select-none"
            >
              &rdquo;
            </span>

            <blockquote className="font-serif italic text-xl sm:text-2xl leading-snug text-neutral-800 dark:text-neutral-200 mt-5 max-w-[38ch]">
              {footer.quote.text}
            </blockquote>

            {footer.quote.author && (
              <div className="flex items-center gap-4 mt-6">
                <span className="h-px w-10 bg-neutral-300 dark:bg-neutral-700" />
                <cite className="not-italic text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {footer.quote.author}
                </cite>
                <span className="h-px w-10 bg-neutral-300 dark:bg-neutral-700" />
              </div>
            )}
          </div>
        </div>
      )}

      <HatchBand />

      <div className="flex justify-center">
        <div className="w-[92vw] sm:w-[50vw] flex flex-col items-center text-center py-10 sm:py-12">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            {footer.roleLabel}{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline-offset-4 hover:underline hover:text-[#3b82f6] dark:hover:text-[#6aace0] transition-colors"
              href={footer.orgHref}
            >
              {footer.name}
            </a>
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {footer.copyright}. {footer.madeWith}
          </p>
        </div>
      </div>

      <HatchBand />

      <DotField className="min-h-20 sm:min-h-28" />
    </footer>
  )
}
