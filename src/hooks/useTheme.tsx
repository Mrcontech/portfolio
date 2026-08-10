import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'light' | 'dark'

/** Dark is the starting theme; the choice persists under this key. */
export const DEFAULT_THEME: Theme = 'dark'
const STORAGE_KEY = 'theme'

interface ThemeCtx {
  theme: Theme
  toggle: () => void
  setTheme: (t: Theme) => void
}

const Ctx = createContext<ThemeCtx>({ theme: DEFAULT_THEME, toggle: () => {}, setTheme: () => {} })

export const useTheme = () => useContext(Ctx)

function apply(theme: Theme) {
  const el = document.documentElement
  el.classList.remove('light', 'dark')
  el.classList.add(theme)
  el.style.colorScheme = theme
}

/**
 * Swap themes behind a View Transition so the incoming theme wipes down over
 * the old one (see `ripple-down` in index.css).
 *
 * The state update has to be flushed INSIDE the callback: the browser snapshots
 * the page before it runs and again after it settles, and animates between
 * those two frames. A plain setState here would resolve after the snapshot and
 * the wipe would show no change at all.
 *
 * Unsupported browsers (Firefox, older Safari) just get the instant swap.
 */
function withViewTransition(mutate: () => void) {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void | Promise<void>) => { finished: Promise<void> }
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (typeof doc.startViewTransition !== 'function' || reduced) {
    mutate()
    return
  }
  doc.startViewTransition(() => {
    flushSync(mutate)
  })
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof localStorage === 'undefined') return DEFAULT_THEME
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : DEFAULT_THEME
  })

  useEffect(() => {
    apply(theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
  }, [theme])

  const setTheme = useCallback(
    (t: Theme) => withViewTransition(() => setThemeState(t)),
    [],
  )
  const toggle = useCallback(
    () => withViewTransition(() => setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))),
    [],
  )

  return <Ctx.Provider value={{ theme, toggle, setTheme }}>{children}</Ctx.Provider>
}
