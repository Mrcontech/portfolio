import { brandIcons, socialIcons, type IconDef } from './paths'
import { extraIcons } from './extras'

/** simple-icons style brand mark (solid fill, role="img"). */
export function BrandIcon({ name, className }: { name: string; className?: string }) {
  const def: IconDef | undefined = brandIcons[name] ?? extraIcons[name]
  if (!def) return null
  if (def.stroke) {
    return (
      <svg
        role="img"
        viewBox={def.viewBox}
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        {def.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    )
  }
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      role="img"
      viewBox={def.viewBox}
      className={className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      {def.paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}

export function SocialIcon({ name, className }: { name: string; className?: string }) {
  const def: IconDef | undefined = socialIcons[name]
  if (name === 'email') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )
  }
  if (name === 'resume') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    )
  }
  if (!def) return null
  return (
    <svg viewBox={def.viewBox} className={className}>
      {def.paths.map((d, i) =>
        def.stroke ? (
          <path key={i} d={d} stroke="currentColor" strokeWidth="2" fill="none" />
        ) : (
          <path key={i} d={d} fill="currentColor" />
        ),
      )}
    </svg>
  )
}

/* ---------------------------------------------------------------- lucide ---- */

const lucide = (className: string, children: React.ReactNode) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
)

export const ChevronDown = ({ className = '' }: { className?: string }) =>
  lucide(`lucide lucide-chevron-down ${className}`, <path d="m6 9 6 6 6-6" />)

export const ArrowUpRight = ({ className = '' }: { className?: string }) =>
  lucide(
    `lucide lucide-arrow-up-right ${className}`,
    <>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </>,
  )

export const ArrowRight = ({ className = '' }: { className?: string }) =>
  lucide(
    `lucide lucide-arrow-right ${className}`,
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>,
  )

export const Eye = ({ className = '' }: { className?: string }) =>
  lucide(
    `lucide lucide-eye ${className}`,
    <>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </>,
  )

/** lucide badge-check — stroke-width 1 on the original. */
export const BadgeCheck = ({ className = '' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-badge-check ${className}`}
    aria-hidden="true"
  >
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

/** Twitter/X verified badge — solid, brand blue. */
export const VerifiedBadge = ({ className = '' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className={className}
    aria-label="Verified"
  >
    <path
      fill="currentColor"
      d="M24 12a4.454 4.454 0 0 0-2.564-3.91 4.437 4.437 0 0 0-.948-4.578 4.436 4.436 0 0 0-4.577-.948A4.44 4.44 0 0 0 12 0a4.423 4.423 0 0 0-3.9 2.564 4.434 4.434 0 0 0-2.43-.178 4.425 4.425 0 0 0-2.158 1.126 4.42 4.42 0 0 0-1.12 2.156 4.42 4.42 0 0 0 .183 2.421A4.456 4.456 0 0 0 0 12a4.465 4.465 0 0 0 2.576 3.91 4.433 4.433 0 0 0 .936 4.577 4.459 4.459 0 0 0 4.577.95A4.454 4.454 0 0 0 12 24a4.439 4.439 0 0 0 3.91-2.563 4.26 4.26 0 0 0 5.526-5.526A4.453 4.453 0 0 0 24 12Zm-13.709 4.917-4.38-4.378 1.652-1.663 2.646 2.646L15.83 7.4l1.72 1.591-7.258 7.926Z"
    />
  </svg>
)
