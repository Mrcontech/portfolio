import { connect } from '../data/site'
import { SocialIcon, ArrowUpRight } from '../icons'

const iconTileClasses: Record<string, string> = {
  resume: 'bg-[#f97316] text-white',
  send: 'bg-[#229ED9] text-white',
  github: 'bg-[#181717] text-white',
  linkedin: 'bg-[#0A66C2] text-white',
  twitter: 'bg-black text-white dark:bg-white dark:text-black',
  email: 'bg-white text-[#EA4335]',
}

function GmailMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[19px]" fill="none">
      <path d="M3.5 7.25v10.2c0 .72.58 1.3 1.3 1.3H7V10.1L3.5 7.25Z" fill="#4285F4" />
      <path d="M17 10.1v8.65h2.2c.72 0 1.3-.58 1.3-1.3V7.25L17 10.1Z" fill="#34A853" />
      <path d="M17 10.1 12 13.9 7 10.1V6.65l5 3.78 5-3.78v3.45Z" fill="#EA4335" />
      <path d="M20.5 7.25V6.6c0-1.62-1.85-2.55-3.15-1.57L17 5.3v4.8l3.5-2.85Z" fill="#FBBC04" />
      <path d="M3.5 7.25V6.6c0-1.62 1.85-2.55 3.15-1.57L7 5.3v4.8L3.5 7.25Z" fill="#C5221F" />
    </svg>
  )
}

function BrandedIcon({ name }: { name: string }) {
  return (
    <span
      className={`relative flex size-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105 ${
        iconTileClasses[name] ?? 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'
      }`}
    >
      {name === 'email' ? <GmailMark /> : <SocialIcon name={name} className="size-[18px]" />}
      <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 dark:ring-white/15" />
    </span>
  )
}

/**
 * Tile grid of contact links, adapted from the reference's connect grid.
 *
 * Two columns on small screens, three from md up. The row rules come from
 * `.connect-grid` in index.css, which paints them on the row-leading tiles at
 * 300vw so they run past the content column.
 *
 * Rendered as a <ul>/<li> because the divider CSS keys off `li:nth-child`, and
 * a list is the honest markup for a set of links anyway.
 */
export function ConnectLinks() {
  return (
    <ul className="connect-grid grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3">
      {connect.links.map((l) => (
        <li key={l.label}>
          <div className="group relative flex cursor-pointer items-center gap-4 p-4 pr-2 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/30">
            <BrandedIcon name={l.icon} />

            <h3 className="ml-0 flex-1 truncate text-sm font-medium text-neutral-700 transition-colors group-hover:text-neutral-900 md:ml-3 dark:text-neutral-300 dark:group-hover:text-neutral-100">
              <a
                href={l.href}
                target={l.download ? undefined : '_blank'}
                rel="noopener noreferrer"
                {...(l.download ? { download: '' } : {})}
              >
                <span className="absolute inset-0" aria-hidden="true" />
                {l.label}
              </a>
            </h3>

            <ArrowUpRight className="text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </li>
      ))}
    </ul>
  )
}
