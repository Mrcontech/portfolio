import { useState } from 'react'
import clsx from 'clsx'
import { projectTabs, seeMore, type Project } from '../data/site'
import { ArrowUpRight, BadgeCheck } from '../icons'
import {
  GridIntersections,
  SectionHeading,
  badgeClass,
  rainbowButtonClass,
} from './primitives'

function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="flex flex-col justify-between gap-2">
      <div className="flex flex-col gap-2">
        <div className="relative w-full aspect-video group">
          <img
            alt={`${p.title} screenshot`}
            loading="lazy"
            decoding="async"
            className="rounded-xl object-cover border border-neutral-200/50 dark:border-neutral-800/80 transition-opacity duration-300 opacity-100"
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              color: 'transparent',
            }}
            src={p.image}
          />
          {p.video && (
            <video
              src={p.video}
              loop
              muted
              playsInline
              preload="none"
              className="rounded-xl object-cover border border-neutral-200/50 dark:border-neutral-800/80 w-full h-full absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            />
          )}
        </div>

        <div className="flex flex-col max-sm:flex-wrap">
          <div className="flex justify-between items-center">
            <div className="block font-semibold text-lg line-clamp-1 truncate">{p.title}</div>
            <div className="text-nowrap text-xs">{p.date}</div>
          </div>
          <div>
            <div className="text-xs font-normal flex items-center gap-1">
              <BadgeCheck className="text-green-500" />
              {p.status}
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground whitespace-pre-line">{p.description}</div>

        <div className="flex gap-1 flex-wrap">
          {p.tags.map((t) => (
            <span key={t} className={badgeClass}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2 max-sm:flex-wrap">
        {p.links.map((l) => (
          <a key={l.label} target="_blank" rel="noopener noreferrer" href={l.href}>
            {l.variant === 'rainbow' ? (
              <button className={rainbowButtonClass}>
                {l.label}
                <span className="relative inline-block size-4 overflow-hidden">
                  <ArrowUpRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover:-translate-y-4" />
                  <ArrowUpRight className="size-4 absolute top-0 left-0 -translate-x-4 translate-y-4 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
                </span>
              </button>
            ) : (
              <button className="relative cursor-pointer group inline-flex items-center justify-center gap-2 shrink-0 font-medium whitespace-nowrap h-8 px-3 rounded-md text-xs bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 transition-colors">
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                  <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.3v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
                </svg>
                {l.label}
              </button>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}

export function Projects() {
  const [active, setActive] = useState(projectTabs[0].id)
  const tab = projectTabs.find((t) => t.id === active) ?? projectTabs[0]

  return (
    <div id="projects" className="flex justify-center my-5 w-full scroll-mt-24">
      <div className="z-50 w-full relative mt-0 pb-12">
        <SectionHeading>Projects</SectionHeading>

        <div className="flex flex-col mt-2 items-start w-full">
          <div className="flex flex-col gap-2 w-full">
            <div className="relative">
              <div
                role="tablist"
                aria-orientation="horizontal"
                className="bg-muted text-muted-foreground inline-flex h-8 w-fit items-center justify-center rounded-full p-[3px] relative mb-3 flex-wrap"
              >
                {projectTabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={active === t.id}
                    data-state={active === t.id ? 'active' : 'inactive'}
                    onClick={() => setActive(t.id)}
                    className={clsx(
                      "cursor-pointer h-[calc(100%-1px)] flex-1 justify-center border-transparent px-2 py-1 text-xs whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 group z-10 border-0 rounded-full flex flex-row items-center gap-2 transition-colors duration-500 delay-200",
                      active === t.id
                        ? 'text-foreground bg-background shadow-sm dark:bg-transparent dark:text-foreground'
                        : 'text-foreground dark:text-muted-foreground bg-transparent',
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div role="tabpanel" className="flex-1 outline-none">
              <div className="flex flex-col gap-3 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 hover:caret-white">
                  {tab.projects.map((p) => (
                    <ProjectCard key={p.title} p={p} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SEE MORE sits inside the content block on the reference: mt-10, h-9 button */}
          <div className="flex justify-center mt-10 w-full">
            <a href={seeMore.href}>
              <button className={clsx(rainbowButtonClass, 'h-9! px-4! text-xs')}>{seeMore.label}</button>
            </a>
          </div>
        </div>

        {/* closing rule is a direct child — no wrapper on the reference */}
        <div className="grid-line-h bottom-0" />
        <GridIntersections edge="bottom" />
      </div>
    </div>
  )
}
