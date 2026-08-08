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
import { experience } from './data/site'
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
