import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useTheme } from '../hooks/useTheme'

interface Command {
  id: string
  label: string
  group: 'Sections' | 'General' | 'Theme'
  /** single letter, fired as shift + <key> */
  shortcut: string
  run: (ctx: { setTheme: (t: 'light' | 'dark') => void }) => void
}

const scrollTo = (id: string) => () => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const COMMANDS: Command[] = [
  { id: 'experience', label: 'Experience', group: 'Sections', shortcut: 'E', run: scrollTo('experience') },
  { id: 'skills', label: 'Skills', group: 'Sections', shortcut: 'S', run: scrollTo('skills') },
  { id: 'projects', label: 'Projects', group: 'Sections', shortcut: 'P', run: scrollTo('projects') },
  { id: 'github', label: 'GitHub', group: 'Sections', shortcut: 'G', run: scrollTo('github') },
  { id: 'connect', label: 'Connect', group: 'Sections', shortcut: 'N', run: scrollTo('connect') },
  {
    id: 'copy-link',
    label: 'Copy Link',
    group: 'General',
    shortcut: 'C',
    run: () => navigator.clipboard?.writeText(window.location.href).catch(() => {}),
  },
  { id: 'light', label: 'Light Mode', group: 'Theme', shortcut: 'T', run: ({ setTheme }) => setTheme('light') },
  { id: 'dark', label: 'Dark Mode', group: 'Theme', shortcut: 'D', run: ({ setTheme }) => setTheme('dark') },
  {
    id: 'system',
    label: 'System',
    group: 'Theme',
    shortcut: 'Y',
    run: ({ setTheme }) =>
      setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  },
]

const GROUP_ORDER: Command['group'][] = ['Sections', 'General', 'Theme']

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="size-4 shrink-0 opacity-50">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
)

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const { setTheme } = useTheme()

  const ctx = useMemo(() => ({ setTheme }), [setTheme])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? COMMANDS.filter((c) => c.label.toLowerCase().includes(q)) : COMMANDS
  }, [query])

  const grouped = useMemo(
    () =>
      GROUP_ORDER.map((g) => ({ group: g, items: filtered.filter((c) => c.group === g) })).filter(
        (g) => g.items.length > 0,
      ),
    [filtered],
  )

  const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped])

  const run = useCallback(
    (cmd: Command) => {
      setOpen(false)
      setQuery('')
      // let the dialog unmount before scrolling so focus doesn't fight it
      requestAnimationFrame(() => cmd.run(ctx))
    },
    [ctx],
  )

  // ⌘K / Ctrl+K to toggle; shift + <letter> to fire a command directly
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
        return
      }
      if (open) return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const cmd = COMMANDS.find((c) => c.shortcut === e.key.toUpperCase())
        if (cmd) {
          e.preventDefault()
          cmd.run(ctx)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, ctx])

  useEffect(() => {
    if (open) {
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  // expose an opener for the ⌘K chip in the hero
  useEffect(() => {
    const openIt = () => setOpen(true)
    window.addEventListener('open-command-palette', openIt)
    return () => window.removeEventListener('open-command-palette', openIt)
  }, [])

  // lock body scroll while open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      setQuery('')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (flat.length ? (i + 1) % flat.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const cmd = flat[active]
      if (cmd) run(cmd)
    }
  }

  return (
    <div className="fixed inset-0 z-[300]" role="dialog" aria-modal="true" aria-label="Command Palette">
      <div
        className="fixed inset-0 bg-black/50 animate-[fade-in_150ms_ease-out]"
        onClick={() => {
          setOpen(false)
          setQuery('')
        }}
      />
      <div
        className="bg-background fixed top-1/2 left-1/2 z-50 w-full max-w-[358px] -translate-x-1/2 -translate-y-1/2 rounded-xl border shadow-lg overflow-hidden"
        onKeyDown={onListKey}
      >
        <div className="flex items-center gap-2 border-b px-3">
          <SearchIcon />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for actions..."
            className="placeholder:text-muted-foreground flex h-11 w-full bg-transparent py-3 text-sm outline-none disabled:opacity-50"
          />
        </div>

        <div className="max-h-[380px] overflow-y-auto overflow-x-hidden p-1">
          {grouped.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">No results found.</div>
          )}
          {grouped.map(({ group, items }) => (
            <div key={group} className="overflow-hidden p-1">
              <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">{group}</div>
              {items.map((cmd) => {
                const i = flat.indexOf(cmd)
                return (
                  <div
                    key={cmd.id}
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => run(cmd)}
                    className={clsx(
                      'relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none',
                      i === active ? 'bg-accent text-accent-foreground' : 'text-foreground',
                    )}
                  >
                    <span className="flex-1">{cmd.label}</span>
                    <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium select-none">
                      shift + {cmd.shortcut}
                    </kbd>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
