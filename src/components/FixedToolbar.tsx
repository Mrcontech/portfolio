import { useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { useClickSound } from '../hooks/useClickSound'
import { SpotifyPanel } from './SpotifyPanel'
import { BookingModal } from './BookingModal'

/** shadcn "outline" button, size-9 — class string verbatim from the reference. */
const toolbarButton =
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-9"

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" /><path d="m19.07 4.93-1.41 1.41" /><path d="M20 12h2" />
    <path d="m17.66 17.66 1.41 1.41" /><path d="M12 20v2" /><path d="m6.34 17.66-1.41 1.41" />
    <path d="M2 12h2" /><path d="m4.93 4.93 1.41 1.41" />
  </svg>
)

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
)

const CalendarCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v4" /><path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
    <path d="m9 16 2 2 4-4" />
  </svg>
)

/** Spotify wordless mark (simple-icons). */
const SpotifyIcon = ({ className = '' }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0m5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02m1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2m.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3" />
  </svg>
)

/** Opens the playlist modal. Tints Spotify green while it's open. */
function MusicButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      data-music-toggle
      className={`${toolbarButton} cursor-pointer`}
      onClick={onToggle}
      aria-expanded={open}
      aria-label={open ? 'Close music player' : 'Open music player'}
    >
      <SpotifyIcon
        className={`size-[18px] transition-colors duration-300 ${open ? 'text-[#1DB954]' : ''}`}
      />
      <span className="sr-only">Toggle music player</span>
    </button>
  )
}

/** Fixed bottom-right control stack: theme toggle, booking link, music. */
export function FixedToolbar() {
  const { theme, toggle } = useTheme()
  const playClick = useClickSound()
  const [musicOpen, setMusicOpen] = useState(false)
  // once opened, keep the iframe mounted so playback survives closing the panel
  const [musicMounted, setMusicMounted] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  const toggleMusic = () => {
    setMusicMounted(true)
    setMusicOpen((o) => !o)
  }

  return (
    <>
      <SpotifyPanel open={musicOpen} mounted={musicMounted} onClose={() => setMusicOpen(false)} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <div className="fixed bottom-4 right-4 flex flex-col items-center gap-2 z-[200]">
        <button
          className={toolbarButton}
          onClick={() => {
            playClick()
            toggle()
          }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
          <span className="sr-only">Toggle theme</span>
        </button>

        <button
          className={toolbarButton}
          onClick={() => setBookingOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={bookingOpen}
          aria-label="Book a call"
        >
          <CalendarCheckIcon />
        </button>

        <MusicButton open={musicOpen} onToggle={toggleMusic} />
      </div>
    </>
  )
}
