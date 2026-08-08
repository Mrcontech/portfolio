import { useState } from 'react'
import clsx from 'clsx'
import { experience } from '../data/site'
import { ChevronDown } from '../icons'
import { GridIntersections, RowDivider, SectionHeading } from './primitives'

export function Experience() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="experience" className="mt-16 mb-2 w-full relative pb-2 scroll-mt-24">
      <SectionHeading>Experience</SectionHeading>

      <div className="space-y-6 pb-4">
        {experience.map((item, i) => (
          <div key={item.company}>
            {i > 0 && <RowDivider />}
            <div className="py-2 transition-all duration-300">
              <div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer select-none"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-[6px] bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center overflow-hidden shrink-0 border border-neutral-200/40 dark:border-neutral-800/80 shadow-sm">
                    <img
                      alt={item.company}
                      loading="lazy"
                      width={40}
                      height={40}
                      decoding="async"
                      className={clsx('w-full h-full object-cover', item.logoClass)}
                      style={{ color: 'transparent' }}
                      src={item.logo}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold dark:text-white text-black text-sm sm:text-base flex items-center gap-1.5 leading-snug">
                      {item.company}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-normal mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-14 sm:pl-0">
                  <div className="sm:text-right shrink-0">
                    <p className="text-xs text-neutral-400 dark:text-neutral-400 font-normal">
                      {item.period}
                    </p>
                  </div>
                  <div className="shrink-0 p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors rounded-lg">
                    <ChevronDown
                      className={clsx(
                        'w-4 h-4 transition-transform duration-350 text-neutral-400',
                        open === i && 'rotate-180',
                      )}
                    />
                  </div>
                </div>
              </div>

              <div
                className={clsx(
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  open === i ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0',
                )}
              >
                <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800/80">
                  <ul className="space-y-3 pl-1">
                    {item.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start text-neutral-600 dark:text-neutral-300 transition-colors duration-200"
                      >
                        <span className="flex-shrink-0 w-[4px] h-[4px] bg-[#4682B4] dark:bg-[#6aace0] mt-[7px] mr-3.5 rounded-[1px]" />
                        <span className="text-xs sm:text-sm leading-relaxed font-medium">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full relative py-1 mt-2">
        <div className="grid-line-h bottom-0" />
        <GridIntersections edge="bottom" />
      </div>
    </section>
  )
}
