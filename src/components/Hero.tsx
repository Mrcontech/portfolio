import { profile, bio, type BioSegment } from '../data/site'
import { BrandIcon, VerifiedBadge } from '../icons'
import { GridIntersections } from './primitives'
import { ConnectLinks } from './ConnectLinks'
import { Annotation } from './Annotation'

function BioPart({ seg }: { seg: BioSegment }) {
  switch (seg.kind) {
    case 'text':
      return <>{seg.value}</>
    case 'strong':
      return <span className="text-neutral-950 dark:text-white">{seg.value}</span>
    case 'annotated':
      return (
        <span className="text-neutral-950 dark:text-white">
          <Annotation>{seg.value}</Annotation>
        </span>
      )
    case 'tech':
      return (
        <span className="inline-flex items-center gap-1 font-figtree font-normal text-neutral-950 dark:text-white translate-y-[1.5px]">
          <BrandIcon name={seg.icon} className="w-[14px] h-[14px] inline-block" />
          <span>{seg.value}</span>
        </span>
      )
  }
}

export function Hero() {
  return (
    <div className="flex flex-col mt-0 sm:mt-8 items-start w-[92vw] sm:w-[50vw] z-20">
      {/* decorative leaves — static on the reference (animate-leaf-sway is a dead class) */}
      <div className="w-[13vw] absolute top-[15%] right-0 bg-transparent z-0 hidden sm:block origin-top-right dark:opacity-90">
        <img
          alt="Decorative leaf"
          loading="lazy"
          width={300}
          height={300}
          decoding="async"
          style={{ color: 'transparent', transform: 'rotateX(180deg)' }}
          src="/logo/leaf.svg"
        />
      </div>
      <div className="w-[13vw] absolute left-0 bottom-[10%] bg-transparent z-0 hidden sm:block origin-bottom-left dark:opacity-90">
        <img
          alt="Decorative leaf"
          loading="lazy"
          width={200}
          height={200}
          decoding="async"
          style={{ color: 'transparent', transform: 'rotateY(180deg)' }}
          src="/logo/leaf.svg"
        />
      </div>


      {/* identity row */}
      <div className="flex items-center gap-3.5 sm:gap-6 mt-0 sm:mt-12 w-full relative pt-4 sm:pt-10 pb-4 sm:pb-6">
        <div className="grid-line-h top-0" />
        <GridIntersections edge="top" />

        <div className="relative p-[4px] sm:p-[5px] rounded-[12px] border-[1.5px] border-black/10 dark:border-white/10 shrink-0 bg-neutral-50 dark:bg-zinc-900">
          <div className="relative w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] rounded-[8px] overflow-hidden border border-black/10 dark:border-white/20 bg-white dark:bg-zinc-950">
            <img
              alt={profile.avatarAlt}
              decoding="async"
              className="object-cover scale-[1.08] translate-y-[2px]"
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
              src={profile.avatar}
            />
          </div>
        </div>

        <div className="flex-1 flex justify-between items-start min-w-0">
          <div className="flex flex-col min-w-0 pr-1">
            <h1 className="text-[22px] sm:text-4xl font-serif font-normal leading-[1.25] text-neutral-900 dark:text-neutral-100">
              <span>{profile.greeting}</span>{' '}
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <span>{profile.name}</span>
                {profile.verified && (
                  <VerifiedBadge className="size-[17px] sm:size-[21px] text-[#1d9bf0] select-none shrink-0 inline-block translate-y-[1px]" />
                )}
              </span>
            </h1>
            <div className="text-base sm:text-xl mt-0.5 sm:mt-1">
              <span className="font-serif font-medium">{profile.tagline}</span>
            </div>
          </div>

          <div className="shrink-0 -translate-y-1 sm:-translate-y-2 ml-1">
            <button
              className="relative group cursor-pointer transition-all duration-300 active:scale-95 outline-none"
              aria-label="Open command palette"
              onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
            >
              <div className="absolute -inset-[4px] border border-black/5 dark:border-white/5 rounded-[8px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
              <div className="relative flex items-center gap-1.5 px-3 py-1 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#09090b] dark:hover:bg-[#121214] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-[5px] text-[11px] font-medium transition-all duration-300 border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80 font-mono">
                <span className="leading-none mt-[0.5px]">⌘</span>
                <span className="leading-none mt-[0.5px]">K</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* intro paragraph */}
      <div className="mt-4 w-full">
        <div className="font-figtree not-italic font-normal text-[rgb(140,140,140)] text-[16px] leading-[27px]">
          {bio.map((seg, i) => (
            <BioPart key={i} seg={seg} />
          ))}
        </div>

        <div className="mt-3">
          <a target="_blank" rel="noopener noreferrer" className="group inline-block" href={profile.ctaHref}>
            <span className="border border-neutral-200/80 dark:border-neutral-800/80 text-sm py-1.5 px-3 rounded-lg cursor-pointer inline-flex items-center gap-1.5 transition-all duration-300 ease-out bg-neutral-100/40 hover:bg-neutral-200/40 dark:bg-neutral-900/30 dark:hover:bg-neutral-800/30 group-hover:shadow-md group-hover:-translate-y-0.5 group-hover:scale-[1.03]">
              {profile.ctaLabel}
              <span className="inline-block transition-all duration-300 animate-[spin_4s_linear_infinite] group-hover:animate-[spin_0.7s_linear_infinite]">
                ✿
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* socials, as the bordered tile grid */}
      <div className="mt-8 mb-4 w-full">
        <h2 className="text-[14px] text-zinc-500 dark:text-zinc-400 mb-2.5">
          Here are my <span className="font-medium text-zinc-800 dark:text-zinc-200">socials</span>
        </h2>
        <ConnectLinks />
      </div>
    </div>
  )
}
