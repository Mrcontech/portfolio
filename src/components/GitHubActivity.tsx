import { useEffect, useRef, useState } from 'react'
import { cells, monthLabels, WEEKS, DAYS, type Cell } from '../data/contributions'
import { SectionHeading } from './primitives'

const CELL = 12
const GAP = 3
const STEP = CELL + GAP // 15px — one week column

const LEVEL_VAR = [
  'var(--gitmap-empty)',
  'var(--gitmap-level-1)',
  'var(--gitmap-level-2)',
  'var(--gitmap-level-3)',
  'var(--gitmap-level-4)',
]

/**
 * Count label colour per level, measured off the reference. The label has to
 * stay readable as the cell darkens: dark ink on the pale level-1 green, near
 * white on the mid greens, and the page background colour on the darkest.
 */
const COUNT_TEXT = [
  '', // level 0 renders no label at all
  'text-foreground/80',
  'text-muted dark:text-foreground/80',
  'text-muted dark:text-foreground/80',
  'text-background',
]

const DAY_LABELS = [
  { label: 'Mon', row: 1 },
  { label: 'Wed', row: 3 },
  { label: 'Fri', row: 5 },
]

const fmt = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

interface Tip {
  x: number
  y: number
  text: string
}

/**
 * Contribution heatmap, rebuilt to match the reference's construction:
 * cells placed by explicit `grid-area: day+1 / week+1` and tagged with
 * data-date / data-count, month labels anchored to the real first week of each
 * month, weekday labels at row*15+6, and a floating tooltip pinned above the
 * hovered cell (`translate(-50%,-100%) translateY(-8px)`).
 */
export function GitHubActivity() {
  const scroller = useRef<HTMLDivElement>(null)
  const [tip, setTip] = useState<Tip | null>(null)

  // Land scrolled fully right, showing the most recent weeks — as the reference does.
  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollLeft = el.scrollWidth - el.clientWidth
  }, [])

  const show = (e: React.MouseEvent<HTMLDivElement>, c: Cell) => {
    const r = e.currentTarget.getBoundingClientRect()
    const count = c[3]
    setTip({
      x: r.left + r.width / 2,
      y: r.top,
      text: `${count === 0 ? 'No contributions' : `${count} contribution${count === 1 ? '' : 's'}`} on ${fmt(c[4])}`,
    })
  }

  return (
    <section id="github" className="mt-12 sm:mt-16 mb-8 w-full relative pb-6 scroll-mt-24">
      <SectionHeading>GitHub Activity</SectionHeading>

      <div
        ref={scroller}
        className="w-full overflow-x-auto py-3 px-1.5 sm:px-2 rounded-xl border border-black/10 dark:border-white/10 bg-neutral-100/40 dark:bg-neutral-900/30 scroll-smooth touch-pan-x"
      >
        <div className="w-max pb-1">
          <div className="relative select-none" style={{ paddingLeft: 30, paddingTop: 20 }}>
            {/* month ruler — anchored to each month's real first week */}
            <div className="absolute -top-1" style={{ left: 30 }}>
              {monthLabels.map((m, i) => (
                <span
                  key={`${m.label}-${i}`}
                  className="absolute text-[11px] sm:text-[12px] text-neutral-400 dark:text-neutral-500 font-medium leading-none"
                  style={{ left: m.week * STEP }}
                >
                  {m.label}
                </span>
              ))}
            </div>

            {/* weekday labels */}
            <div className="absolute left-0" style={{ top: 20, width: 30 }}>
              {DAY_LABELS.map(({ label, row }) => (
                <span
                  key={label}
                  className="absolute text-[11px] sm:text-[12px] text-neutral-400 dark:text-neutral-500 font-medium leading-none"
                  style={{ top: row * STEP + 6 }}
                >
                  {label}
                </span>
              ))}
            </div>

            <div
              className="grid"
              style={{
                gridTemplateRows: `repeat(${DAYS}, ${CELL}px)`,
                gridTemplateColumns: `repeat(${WEEKS}, ${CELL}px)`,
                gap: GAP,
              }}
            >
              {cells.map((c) => {
                const count = c[3]
                return (
                  <div
                    key={c[4]}
                    data-date={c[4]}
                    data-count={count}
                    className="rounded-[2.5px] transition-transform duration-100 hover:scale-125 hover:z-10 flex items-center justify-center"
                    style={{ gridArea: `${c[1] + 1} / ${c[0] + 1}`, backgroundColor: LEVEL_VAR[c[2]] }}
                    onMouseEnter={(e) => show(e, c)}
                    onMouseLeave={() => setTip(null)}
                  >
                    {count > 0 && (
                      <span
                        className={`font-mono leading-none pointer-events-none font-bold ${COUNT_TEXT[c[2]]}`}
                        style={{ fontSize: String(count).length > 1 ? '7px' : '8px' }}
                      >
                        {count}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* floating tooltip */}
      <div
        className="pointer-events-none fixed z-50 transition-opacity duration-150"
        style={{
          left: tip?.x ?? -9999,
          top: tip?.y ?? -9999,
          opacity: tip ? 1 : 0,
          transform: 'translate(-50%, -100%) translateY(-8px)',
        }}
      >
        <div className="relative rounded-md bg-neutral-900 px-2.5 py-1 text-[11px] text-white dark:bg-white dark:text-neutral-900 shadow-lg whitespace-nowrap border border-white/10 dark:border-black/10 font-figtree">
          {tip?.text}
        </div>
      </div>
    </section>
  )
}
