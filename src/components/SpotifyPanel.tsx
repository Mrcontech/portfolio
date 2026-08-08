import { useEffect } from 'react'
import { music } from '../data/site'

/**
 * Spotify playlist modal for the toolbar's music button.
 *
 * The iframe mounts ONLY after the first open, so the page makes zero external
 * requests until you ask for music. Once mounted it stays mounted (hidden when
 * closed) so playback survives closing the modal.
 *
 * Spotify's embed is the licensed way to play tracks on a site: signed-in
 * listeners get full songs, everyone else gets the standard previews. The
 * player is cross-origin, so nothing about its audio is readable by this page.
 */
export function SpotifyPanel({
  open,
  mounted,
  onClose,
}: {
  open: boolean
  mounted: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!mounted) return null

  return (
    <div
      className="fixed inset-0 z-[210]"
      style={{ pointerEvents: open ? 'auto' : 'none', visibility: open ? 'visible' : 'hidden' }}
      role="dialog"
      aria-modal="true"
      aria-label="Music player"
    >
      {/* backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0 }}
      />

      {/* NOTE: centring is done entirely in the inline `transform`. Tailwind v4
          writes `-translate-x-1/2` to the separate `translate` property, which
          would stack with this transform and shift the card twice. */}
      <div
        className="absolute left-1/2 top-1/2 w-[340px] max-w-[calc(100vw-2rem)] transition-all duration-300 ease-out"
        style={{
          opacity: open ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${open ? 1 : 0.96})`,
        }}
      >
        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-background shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-black/5 dark:border-white/5">
            <span className="text-[11px] font-medium text-muted-foreground">{music.label}</span>
            <div className="flex items-center gap-3">
              <a
                href={music.playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
              >
                Open in Spotify
              </a>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer leading-none text-base"
              >
                ×
              </button>
            </div>
          </div>
          <iframe
            title="Spotify playlist"
            src={`https://open.spotify.com/embed/playlist/${music.playlistId}?utm_source=generator&theme=0`}
            width="100%"
            height="380"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ display: 'block', border: 0 }}
          />
        </div>
      </div>
    </div>
  )
}
