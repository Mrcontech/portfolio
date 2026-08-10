import { useCallback, useRef } from 'react'

/**
 * Synthesised mechanical-switch click for the theme toggle.
 *
 * Modelled on the reference toggle's sound rather than copying its asset, so
 * nothing extra is hosted and no request is made. Its waveform was analysed to
 * get the character right:
 *
 *   - TWO transients, not one: peaks ~80ms apart. That's a real switch, press
 *     down then release. A single click sounds noticeably cheaper.
 *   - Both centred around ~5.4kHz.
 *   - Each decays below 10% within ~30ms, so they read as taps not beeps.
 *
 * Built from a short filtered-noise burst (the mechanical body) plus a high
 * sine ping (the transient edge), both on a steep exponential decay.
 */

const PRESS_HZ = 5400
const RELEASE_HZ = 5600
const GAP = 0.08 // seconds between press and release
const DECAY = 0.03

export function useClickSound(volume = 0.25) {
  const ctxRef = useRef<AudioContext | null>(null)
  const bufRef = useRef<AudioBuffer | null>(null)

  const play = useCallback(() => {
    try {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!Ctor) return
      const ctx = ctxRef.current ?? new Ctor()
      ctxRef.current = ctx
      // Browsers start the context suspended until a gesture; a click IS one.
      if (ctx.state === 'suspended') void ctx.resume()

      // Short noise burst, generated once and reused.
      if (!bufRef.current) {
        const len = Math.floor(ctx.sampleRate * 0.05)
        const buf = ctx.createBuffer(1, len, ctx.sampleRate)
        const data = buf.getChannelData(0)
        for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
        bufRef.current = buf
      }

      const now = ctx.currentTime

      const transient = (at: number, freq: number, level: number) => {
        // --- filtered noise: the mechanical "body" of the click
        const src = ctx.createBufferSource()
        src.buffer = bufRef.current
        const bp = ctx.createBiquadFilter()
        bp.type = 'bandpass'
        bp.frequency.value = freq
        bp.Q.value = 1.4
        const ng = ctx.createGain()
        ng.gain.setValueAtTime(level * volume, at)
        ng.gain.exponentialRampToValueAtTime(0.0001, at + DECAY)
        src.connect(bp)
        bp.connect(ng)
        ng.connect(ctx.destination)
        src.start(at)
        src.stop(at + DECAY + 0.01)

        // --- sine ping: the sharp leading edge, pitch dropping slightly
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        // set .value as well as scheduling it: setValueAtTime alone leaves
        // .value reading the 440Hz default until the scheduled time arrives,
        // which is misleading to anything inspecting the node.
        osc.frequency.value = freq
        osc.frequency.setValueAtTime(freq, at)
        osc.frequency.exponentialRampToValueAtTime(freq * 0.55, at + DECAY)
        const og = ctx.createGain()
        og.gain.setValueAtTime(level * volume * 0.6, at)
        og.gain.exponentialRampToValueAtTime(0.0001, at + DECAY * 0.8)
        osc.connect(og)
        og.connect(ctx.destination)
        osc.start(at)
        osc.stop(at + DECAY + 0.01)
      }

      transient(now, PRESS_HZ, 1)
      transient(now + GAP, RELEASE_HZ, 0.7) // release is softer than the press
    } catch {
      /* audio unavailable — the toggle still works silently */
    }
  }, [volume])

  return play
}
