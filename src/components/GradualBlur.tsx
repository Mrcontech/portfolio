/**
 * Progressive ("gradual") blur strip pinned to the bottom of the viewport.
 *
 * Five stacked backdrop-filter layers, each blurrier than the last and each
 * masked to a band that slides further down the strip — so content dissolves
 * smoothly toward the bottom edge instead of hitting a hard blur line.
 *
 * Values transcribed verbatim from the reference's inline styles:
 *   fixed, 5rem tall, full width, z-index 101, desktop only (hidden sm:block)
 *   blur ramp: 0.250 → 0.375 → 0.500 → 0.625 → 0.750 rem
 */

const LAYERS = [
  { blur: '0.250rem', mask: 'linear-gradient(to bottom, transparent 0%, black 20%, black 40%, transparent 60%)' },
  { blur: '0.375rem', mask: 'linear-gradient(to bottom, transparent 20%, black 40%, black 60%, transparent 80%)' },
  { blur: '0.500rem', mask: 'linear-gradient(to bottom, transparent 40%, black 60%, black 80%, transparent 100%)' },
  { blur: '0.625rem', mask: 'linear-gradient(to bottom, transparent 60%, black 80%, black 100%)' },
  { blur: '0.750rem', mask: 'linear-gradient(to bottom, transparent 80%, black 100%)' },
]

export function GradualBlur() {
  return (
    <div className="hidden sm:block">
      <div
        className="gradual-blur gradual-blur-page"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          opacity: 1,
          zIndex: 101,
          height: '5rem',
          width: '100%',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <div className="gradual-blur-inner" style={{ position: 'relative', width: '100%', height: '100%' }}>
          {LAYERS.map((l, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                maskImage: l.mask,
                WebkitMaskImage: l.mask,
                backdropFilter: `blur(${l.blur})`,
                WebkitBackdropFilter: `blur(${l.blur})`,
                opacity: 1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
