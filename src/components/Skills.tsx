import { useState } from 'react'
import clsx from 'clsx'
import { skills } from '../data/site'
import { BrandIcon } from '../icons'
import { GridIntersections, SectionHeading } from './primitives'

/**
 * Icon-only chips that expand to reveal their label on hover. The reference
 * drives this with an inline max-width/margin-left/opacity transition rather
 * than classes, so those inline styles are reproduced exactly.
 */
export function Skills() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="skills" className="mt-2 mb-0 w-full relative pb-12 scroll-mt-24">
      <SectionHeading>Skills</SectionHeading>

      {/* Single wrapping track. The reference hard-splits into two rows, but that
          only works for its exact chip count — with a different number the last
          chip orphans onto a line of its own. Natural wrapping stays balanced. */}
      {[skills].map((row, ri) => (
        <div key={ri} className={clsx('flex flex-wrap gap-2', ri === 0 ? 'mt-4' : 'mt-2')}>
          {row.map((s) => {
            const on = hovered === s.name
            return (
              <div
                key={s.name}
                onMouseEnter={() => setHovered(s.name)}
                onMouseLeave={() => setHovered(null)}
                className={clsx(
                  'flex items-center h-10 rounded-[8px] border border-dashed border-neutral-300/80 dark:border-neutral-800/80 cursor-default px-3',
                  'transition-colors duration-200 relative',
                  'bg-neutral-100/40 dark:bg-neutral-900/40 z-0',
                )}
              >
                <BrandIcon
                  name={s.icon}
                  className={clsx(
                    'w-4 h-4 shrink-0 transition-transform duration-200',
                    s.colorClass,
                    on ? 'scale-110' : 'scale-100',
                  )}
                />
                <span
                  style={{
                    maxWidth: on ? '200px' : '0px',
                    marginLeft: on ? '8px' : '0px',
                    opacity: on ? 1 : 0,
                    transition:
                      'max-width 250ms cubic-bezier(0.4, 0, 0.2, 1), margin-left 250ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                  }}
                  className="text-xs font-normal text-neutral-700 dark:text-neutral-300"
                >
                  {s.name}
                </span>
              </div>
            )
          })}
        </div>
      ))}

      {/* closing rule is a direct child of the section on the reference */}
      <div className="grid-line-h bottom-0" />
      <GridIntersections edge="bottom" />
    </section>
  )
}
