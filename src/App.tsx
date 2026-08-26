import { useEffect } from 'react'
import Lenis from 'lenis'
import { Hero } from './components/Hero'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { GitHubActivity } from './components/GitHubActivity'
import { Footer } from './components/Footer'
import { GradualBlur } from './components/GradualBlur'
import { FixedToolbar } from './components/FixedToolbar'
import { CommandPalette } from './components/CommandPalette'
import { Connect } from './components/Connect'
import { DotField } from './components/patterns'
import { Navbar } from './components/Navbar'
import { experience, connect } from './data/site'
import { useScrollProgress } from './hooks/useScrollProgress'

export default function App() {
  const progress = useScrollProgress()

  // Lenis smooth scroll — the reference ships it (html carries the `lenis` class)
  useEffect(() => {
    const lenis = new Lenis()
    let id = 0
    const raf = (time: number) => {
      lenis.raf(time)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <div id="top" />
      <Navbar />

      {/* Full-document edge rails measured from SahilCodex. On mobile the
          lines sit 8px inside the viewport; from sm up they become 24px
          gutters whose inner borders align with our 50vw content column. */}
      <div
        data-page-edge-rail="left"
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-2 border-r border-neutral-200 sm:left-[25vw] sm:w-6 sm:-translate-x-full dark:border-neutral-800 dark:opacity-60"
      />
      <div
        data-page-edge-rail="right"
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-2 border-l border-neutral-200 sm:right-[25vw] sm:w-6 sm:translate-x-full dark:border-neutral-800 dark:opacity-60"
      />

      {/* SahilCodex mobile geometry: 12px outer padding around an 84px dotted
          field, followed immediately by the hero section. */}
      <div className="w-full py-3 sm:py-0">
        <DotField className="min-h-20 px-[5px] sm:min-h-0 sm:px-0 sm:py-3">
          <div className="px-10 py-6 sm:p-0">
            <p className="text-xl sm:text-base font-normal tracking-tight leading-[18px] sm:leading-5 opacity-50 select-none text-center whitespace-pre-line">
              {connect.availability}
            </p>
          </div>
        </DotField>
      </div>

      {/* full-height dashed rules framing the content column */}
      <div className="absolute top-0 bottom-0 left-[calc(25vw-24px)] grid-line-v hidden sm:block" />
      <div className="absolute top-0 bottom-0 right-[calc(25vw-24px)] grid-line-v hidden sm:block" />

      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center w-full">
          <Hero />
          <div className="flex flex-col items-start w-[92vw] sm:w-[50vw] z-20">
            {/* hides itself until real roles are added to src/data/site.ts */}
            {experience.length > 0 && <Experience />}
            <Skills />
            <Projects />
            <GitHubActivity />
          </div>

          {/* full-bleed closing band: sits outside the 50vw column so its
              hatch rules can span the viewport */}
          <div className="w-[92vw] sm:w-[50vw] z-20">
            <Connect />
          </div>
        </div>
      </div>

      <Footer />

      {/* bottom scroll-progress bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 h-0.5 origin-left bg-gradient-to-r from-[#a6c9a9] to-[#8da7ff]"
        style={{ transform: `scaleX(${progress})` }}
      />

      {/* progressive blur strip along the bottom edge (desktop) */}
      <GradualBlur />

      {/* mobile bottom fade */}
      <div
        aria-hidden="true"
        className="sm:hidden pointer-events-none fixed inset-x-0 bottom-0 z-[100] h-6 bg-gradient-to-t from-background via-background/40 to-transparent"
      />

      {/* theme / booking / audio controls */}
      <FixedToolbar />

      {/* ⌘K command palette */}
      <CommandPalette />
    </>
  )
}
