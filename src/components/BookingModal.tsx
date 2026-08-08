import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { booking } from '../data/site'
import { ArrowRight } from '../icons'

/**
 * Date picker that hands off to Cal.com.
 *
 * Pick a day here, then continue to Cal.com with `month` and `date` pre-filled,
 * so the visitor lands straight on that day's time slots instead of Cal's
 * default month view. Actual availability lives on Cal.com, so this is a
 * jumping-off point, not a source of truth: any day you've blocked there will
 * simply show no slots.
 */

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const today = useMemo(() => {
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return t
  }, [])

  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [picked, setPicked] = useState<Date | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  // reset to this month each time it opens
  useEffect(() => {
    if (open) {
      setPicked(null)
      setCursor(new Date(today.getFullYear(), today.getMonth(), 1))
    }
  }, [open, today])

  const grid = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1)
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate()
    const lead = first.getDay() // 0 = Sunday
    const out: (Date | null)[] = Array(lead).fill(null)
    for (let d = 1; d <= daysInMonth; d++) {
      out.push(new Date(cursor.getFullYear(), cursor.getMonth(), d))
    }
    while (out.length % 7 !== 0) out.push(null)
    return out
  }, [cursor])

  const atCurrentMonth =
    cursor.getFullYear() === today.getFullYear() && cursor.getMonth() === today.getMonth()

  const confirmHref = picked
    ? `${booking.calUrl}?month=${iso(picked).slice(0, 7)}&date=${iso(picked)}`
    : booking.calUrl

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[260]" role="dialog" aria-modal="true" aria-label="Book a call">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 animate-[fade-in_150ms_ease-out]" />

      {/* centring done entirely in this transform: Tailwind v4 writes
          -translate-x-1/2 to the separate `translate` property, which would
          stack with a transform here and double-shift the card. */}
      <div
        className="absolute left-1/2 top-1/2 w-[340px] max-w-[calc(100vw-2rem)]"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-background shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-black/5 dark:border-white/5">
            <div>
              <div className="text-sm font-medium">{booking.title}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{booking.subtitle}</div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-lg leading-none"
            >
              ×
            </button>
          </div>

          <div className="px-4 py-3">
            {/* month nav */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
                disabled={atCurrentMonth}
                aria-label="Previous month"
                className="size-7 rounded-md border border-black/10 dark:border-white/10 flex items-center justify-center text-sm transition-colors enabled:hover:bg-accent enabled:cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ‹
              </button>
              <div className="text-sm font-medium">
                {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
              </div>
              <button
                onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
                aria-label="Next month"
                className="size-7 rounded-md border border-black/10 dark:border-white/10 flex items-center justify-center text-sm transition-colors hover:bg-accent cursor-pointer"
              >
                ›
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-1">
              {DAY_LABELS.map((d) => (
                <div key={d} className="text-[10px] text-muted-foreground text-center py-1">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {grid.map((d, i) => {
                if (!d) return <div key={i} />
                const past = d < today
                const isPicked = picked && iso(d) === iso(picked)
                const isToday = iso(d) === iso(today)
                return (
                  <button
                    key={i}
                    disabled={past}
                    onClick={() => setPicked(d)}
                    aria-pressed={!!isPicked}
                    className={clsx(
                      'h-8 rounded-md text-xs transition-colors',
                      past && 'opacity-25 cursor-not-allowed',
                      !past && 'cursor-pointer hover:bg-accent',
                      isPicked && 'bg-foreground text-background hover:bg-foreground',
                      !isPicked && isToday && 'border border-black/20 dark:border-white/25',
                    )}
                  >
                    {d.getDate()}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="px-4 pb-4 pt-1">
            <a
              href={confirmHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => picked && onClose()}
              aria-disabled={!picked}
              tabIndex={picked ? 0 : -1}
              className={clsx(
                'group w-full h-9 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2 transition-all',
                picked
                  ? 'bg-foreground text-background hover:opacity-90 cursor-pointer'
                  : 'bg-muted text-muted-foreground pointer-events-none',
              )}
            >
              {picked
                ? `Continue to ${MONTHS[picked.getMonth()].slice(0, 3)} ${picked.getDate()}`
                : 'Pick a date'}
              {picked && <ArrowRight className="w-4 transition-transform group-hover:translate-x-0.5" />}
            </a>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              {booking.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
