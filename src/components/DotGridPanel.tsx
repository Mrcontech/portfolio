import { useRef, useState } from 'react'

/**
 * Decorative 120px dot-grid strip that closes the footer.
 *
 * Two stacked layers, both `radial-gradient(circle, currentColor 1px,
 * transparent 1px)` at 16px spacing — spec read off the reference's inline
 * styles:
 *   base    → opacity .2, masked with a top-to-bottom linear fade
 *   pointer → opacity 0 until hovered, masked with a 250px radial circle that
 *             tracks the cursor (parked at -1000px,-1000px when idle)
 */
export function DotGridPanel() {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: -1000, y: -1000 })
  const [on, setOn] = useState(false)

  const dots = 'radial-gradient(circle, currentColor 1px, transparent 1px)'

  return (
    <div className="w-[calc(100%+32px)] -mx-4 h-[120px] relative mt-4">
      <div
        ref={ref}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto z-0"
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect()
          if (!r) return
          setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
          setOn(true)
        }}
        onMouseLeave={() => {
          setOn(false)
          setPos({ x: -1000, y: -1000 })
        }}
      >
        <div
          className="absolute inset-0 w-full h-full text-zinc-400 dark:text-zinc-500 opacity-20 dark:opacity-[0.1] pointer-events-none transition-opacity duration-500"
          style={{
            backgroundImage: dots,
            backgroundSize: '16px 16px',
            backgroundPosition: 'center',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0 w-full h-full text-zinc-500 dark:text-zinc-400 pointer-events-none transition-opacity duration-700 ease-in-out"
          style={{
            backgroundImage: dots,
            backgroundSize: '16px 16px',
            backgroundPosition: 'center',
            opacity: on ? 1 : 0,
            maskImage: `radial-gradient(250px circle at ${pos.x}px ${pos.y}px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(250px circle at ${pos.x}px ${pos.y}px, black, transparent)`,
          }}
        />
      </div>
    </div>
  )
}
