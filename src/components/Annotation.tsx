import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Hand-drawn underline, matching the rough-notation annotation on the
 * reference. Measured off the live original rather than eyeballed:
 *
 *   - TWO strokes, drawn there-and-back (left to right, then right to left),
 *     which is what gives it the sketched double-pass look.
 *   - stroke #8c8c8c, stroke-width 2, no fill, full opacity on both passes.
 *   - The line sits AT the text's bottom edge and occupies only ~4px of
 *     vertical travel across the whole phrase, i.e. a very shallow wobble.
 *
 * Control points below are the reference's own, normalised to fractions of the
 * phrase width so they scale to any label.
 */

// x as a fraction of width, y in px relative to the text's bottom edge.
const PASS_A = { x0: 0.0, y0: 0.0, x1: 0.321, y1: 2.27, x2: 0.601, y2: 5.43, x3: 1.0, y3: 3.07 }
const PASS_B = { x0: 0.978, y0: 1.84, x1: 0.668, y1: -0.53, x2: 0.301, y2: -2.1, x3: 0.002, y3: -0.53 }

export function Annotation({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [w, setW] = useState(0)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setW(el.getBoundingClientRect().width)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.6 })
    io.observe(el)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  // Vertical band the strokes live in: a few px above and below the baseline.
  const TOP = -3
  const H = 12
  const y = (v: number) => v - TOP

  const path = (p: typeof PASS_A) =>
    `M${(p.x0 * w).toFixed(2)},${y(p.y0).toFixed(2)} ` +
    `C${(p.x1 * w).toFixed(2)},${y(p.y1).toFixed(2)} ` +
    `${(p.x2 * w).toFixed(2)},${y(p.y2).toFixed(2)} ` +
    `${(p.x3 * w).toFixed(2)},${y(p.y3).toFixed(2)}`

  const len = Math.max(w * 1.02, 1)

  return (
    <span ref={ref} className="relative inline-block bg-transparent">
      {children}
      {w > 0 && (
        <svg
          className="rough-annotation"
          width={w}
          height={H}
          viewBox={`0 0 ${w} ${H}`}
          style={{ position: 'absolute', left: 0, top: '100%', marginTop: TOP, overflow: 'visible', pointerEvents: 'none' }}
          aria-hidden="true"
        >
          {[PASS_A, PASS_B].map((p, i) => (
            <path
              key={i}
              d={path(p)}
              fill="none"
              stroke="#8c8c8c"
              strokeWidth="2"
              style={{
                strokeDasharray: len,
                strokeDashoffset: shown ? 0 : len,
                transition: `stroke-dashoffset 600ms ease-out ${i * 180}ms`,
              }}
            />
          ))}
        </svg>
      )}
    </span>
  )
}
