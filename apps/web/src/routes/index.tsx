import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import {
  useRef,
  useEffect,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react"

export const Route = createFileRoute("/")({
  component: LandingPage,
})

/* ═══════════════════════════════════════════════════════════════
   SCROLL-REVEAL PRIMITIVES
   ═══════════════════════════════════════════════════════════════ */

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return { ref, visible }
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CSS-ONLY CUTTING BOARD PATTERNS
   Pure CSS representations of real exotic-wood cutting boards.
   No images required.
   ═══════════════════════════════════════════════════════════════ */

const GRAIN: CSSProperties = {
  backgroundImage: `repeating-linear-gradient(
    92deg,
    transparent,
    transparent 3px,
    rgba(0,0,0,0.04) 3px,
    rgba(0,0,0,0.04) 4px
  )`,
}

const SHEEN: CSSProperties = {
  background:
    "linear-gradient(155deg, rgba(255,255,255,0.1) 0%, transparent 45%, rgba(0,0,0,0.12) 100%)",
}

const BEVEL: CSSProperties = {
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -2px 0 rgba(0,0,0,0.2), inset 1px 0 0 rgba(255,255,255,0.05), inset -1px 0 0 rgba(0,0,0,0.1)",
}

function BoardPattern({
  pattern,
  className,
  style,
}: {
  pattern: "heritage" | "exotic" | "candy-cane" | "end-grain"
  className?: string
  style?: CSSProperties
}) {
  const bg: Record<string, CSSProperties> = {
    heritage: {
      background: `repeating-linear-gradient(90deg,
        #d4a76a 0px, #d4a76a 28px,
        #f0d9b5 28px, #f0d9b5 56px,
        #5c4033 56px, #5c4033 84px,
        #f0d9b5 84px, #f0d9b5 112px,
        #8b6914 112px, #8b6914 140px
      )`,
    },
    exotic: {
      background: `repeating-linear-gradient(90deg,
        #6a2c70 0px, #6a2c70 20px,
        #f0d9b5 20px, #f0d9b5 44px,
        #3c2415 44px, #3c2415 64px,
        #d35400 64px, #d35400 84px,
        #f0d9b5 84px, #f0d9b5 108px,
        #3c2415 108px, #3c2415 128px
      )`,
    },
    "candy-cane": {
      background: `repeating-linear-gradient(90deg,
        #8b1a1a 0px, #8b1a1a 32px,
        #f5e6c8 32px, #f5e6c8 64px
      )`,
    },
    "end-grain": {
      backgroundColor: "#d4a76a",
      backgroundImage: `repeating-conic-gradient(
        #5c4033 0% 25%, #f0d9b5 0% 50%
      )`,
      backgroundSize: "32px 32px",
    },
  }

  return (
    <div
      className={cn("relative overflow-hidden rounded-lg", className)}
      style={{ ...bg[pattern], ...style }}
    >
      <div className="absolute inset-0" style={GRAIN} />
      <div className="absolute inset-0" style={SHEEN} />
    </div>
  )
}

/* Hero board — the large dramatic visual */
function HeroBoard({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {/* Warm ambient glow */}
      <div
        className="absolute -inset-8 rounded-3xl blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200,149,108,0.5) 0%, transparent 70%)",
        }}
      />

      {/* Main board */}
      <div
        className="animate-float relative w-72 sm:w-80 lg:w-[22rem] aspect-[3/4] rounded-xl overflow-hidden"
        style={{
          background: `repeating-linear-gradient(90deg,
            #6a2c70 0px, #6a2c70 18px,
            #f0d9b5 18px, #f0d9b5 40px,
            #3c2415 40px, #3c2415 58px,
            #d35400 58px, #d35400 76px,
            #f0d9b5 76px, #f0d9b5 98px,
            #5c4033 98px, #5c4033 116px,
            #f0d9b5 116px, #f0d9b5 138px,
            #8b1a1a 138px, #8b1a1a 156px,
            #f0d9b5 156px, #f0d9b5 178px
          )`,
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3)",
        }}
      >
        <div className="absolute inset-0" style={GRAIN} />
        <div className="absolute inset-0" style={SHEEN} />
        <div className="absolute inset-0 rounded-xl" style={BEVEL} />
      </div>

      {/* Small floating accent board */}
      <div
        className="absolute -bottom-6 -left-10 w-28 h-20 rounded-lg overflow-hidden opacity-80"
        style={{
          transform: "rotate(8deg)",
          background: `repeating-linear-gradient(90deg,
            #8b1a1a 0px, #8b1a1a 14px,
            #f5e6c8 14px, #f5e6c8 28px
          )`,
          boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
          animation: "float 6s ease-in-out 1s infinite",
        }}
      >
        <div className="absolute inset-0" style={GRAIN} />
      </div>

      {/* End-grain accent */}
      <div
        className="absolute -top-4 -right-8 size-20 rounded-lg overflow-hidden opacity-60"
        style={{
          transform: "rotate(-12deg)",
          backgroundColor: "#d4a76a",
          backgroundImage: `repeating-conic-gradient(#5c4033 0% 25%, #f0d9b5 0% 50%)`,
          backgroundSize: "12px 12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          animation: "float 6s ease-in-out 2s infinite",
        }}
      >
        <div className="absolute inset-0" style={GRAIN} />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PAGE LAYOUT
   ═══════════════════════════════════════════════════════════════ */

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#110e0a] text-[#f5e6d0] overflow-x-hidden selection:bg-[#c8956c]/30 selection:text-[#f5e6d0]">
      <Navbar />
      <Hero />
      <CollectionSection />
      <CraftSection />
      <WoodSpeciesSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  )
}

/* ── Navbar ──────────────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { label: "Collection", href: "#collection" },
    { label: "Our Craft", href: "#our-craft" },
    { label: "Wood Species", href: "#wood-species" },
    { label: "Custom Orders", href: "#custom-orders" },
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#110e0a]/90 backdrop-blur-xl border-b border-[#3d332a]/50 py-3.5"
          : "bg-transparent py-5",
      )}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div
            className="relative size-8 rounded-sm overflow-hidden transition-transform duration-300 group-hover:rotate-3"
            style={{
              background: `repeating-linear-gradient(90deg,
                #d4a76a 0px, #d4a76a 4px,
                #f0d9b5 4px, #f0d9b5 8px,
                #5c4033 8px, #5c4033 12px,
                #f0d9b5 12px, #f0d9b5 16px
              )`,
            }}
          >
            <div className="absolute inset-0" style={GRAIN} />
          </div>
          <span className="font-display text-xl tracking-wide text-[#f5e6d0]">
            KAIZEN BOARDS
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13px] text-[#b8a089] hover:text-[#e8c49a] transition-colors duration-300 tracking-wide"
            >
              {l.label}
            </a>
          ))}
          <Button className="bg-[#c8956c] text-[#1a1410] hover:bg-[#e8c49a] border-none rounded-none px-5 h-9 text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-300 hover:shadow-[0_4px_20px_rgba(200,149,108,0.25)]">
            Shop Now
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "block w-6 h-px bg-[#f5e6d0] transition-all duration-300",
              mobileOpen && "rotate-45 translate-y-[4px]",
            )}
          />
          <span
            className={cn(
              "block w-6 h-px bg-[#f5e6d0] transition-all duration-300",
              mobileOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block w-6 h-px bg-[#f5e6d0] transition-all duration-300",
              mobileOpen && "-rotate-45 -translate-y-[4px]",
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500",
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-6 py-6 space-y-4 bg-[#110e0a]/95 backdrop-blur-xl border-t border-[#3d332a]/30">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-[#b8a089] hover:text-[#e8c49a] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button className="w-full bg-[#c8956c] text-[#1a1410] hover:bg-[#e8c49a] border-none rounded-none h-10 text-xs tracking-[0.15em] uppercase font-semibold mt-2">
            Shop Now
          </Button>
        </div>
      </div>
    </nav>
  )
}

/* ── Hero ────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 50%, rgba(200,149,108,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 50% 80% at 20% 80%, rgba(92,64,51,0.08) 0%, transparent 50%),
            #110e0a
          `,
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,230,208,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,230,208,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 w-full grid lg:grid-cols-2 gap-16 lg:gap-20 items-center pt-32 pb-20 lg:pt-0 lg:pb-0">
        {/* Text side */}
        <div className="space-y-8 max-w-xl">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8956c] font-semibold font-sans">
              Handcrafted from exotic hardwoods
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.08] tracking-tight">
              Crafted by Hand.
              <br />
              <span className="italic text-[#c8956c]">Perfected</span> by
              Nature.
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="text-lg leading-relaxed text-[#a89580] max-w-md font-sans">
              Each Kaizen board is built from the world&apos;s finest
              hardwoods — maple, walnut, purpleheart, bloodwood, and
              wenge — into functional works of art for your kitchen.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button className="bg-[#c8956c] text-[#1a1410] hover:bg-[#e8c49a] border-none rounded-none px-8 h-12 text-[13px] tracking-[0.15em] uppercase font-semibold transition-all duration-300 hover:shadow-[0_8px_30px_rgba(200,149,108,0.3)]">
                Explore Collection
              </Button>
              <Button
                variant="ghost"
                className="text-[#b8a089] hover:text-[#f5e6d0] hover:bg-transparent h-12 px-6 text-[13px] tracking-[0.15em] uppercase group/arrow"
              >
                Our Story
                <span className="inline-block transition-transform duration-300 group-hover/arrow:translate-x-1.5 ml-2">
                  →
                </span>
              </Button>
            </div>
          </Reveal>

          {/* Trust badges */}
          <Reveal delay={420}>
            <div className="flex flex-wrap gap-x-8 gap-y-2 pt-4 border-t border-[#2a231c]">
              {[
                "Food-Safe Finish",
                "Heirloom Quality",
                "Free Shipping",
              ].map((badge) => (
                <span
                  key={badge}
                  className="text-[11px] tracking-wider uppercase text-[#6a5d50] font-sans flex items-center gap-2"
                >
                  <span className="size-1 rounded-full bg-[#c8956c]/60" />
                  {badge}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Visual side */}
        <Reveal
          delay={300}
          className="relative flex justify-center lg:justify-end"
        >
          <HeroBoard />
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#c8956c]/40" />
        <div className="size-1.5 rounded-full bg-[#c8956c]/40 animate-pulse" />
      </div>
    </section>
  )
}

/* ── Collection ──────────────────────────────────────────────── */

const BOARDS = [
  {
    name: "The Heritage Blend",
    description:
      "A timeless combination of North American hardwoods — walnut, maple, and cherry — in a classic striped pattern that pairs with any kitchen.",
    price: "From $89",
    pattern: "heritage" as const,
    tag: "Best Seller",
  },
  {
    name: "The Exotic",
    description:
      "Bold tropical hardwoods from four continents — purpleheart, padauk, wenge, and maple — create a true statement piece.",
    price: "From $129",
    pattern: "exotic" as const,
    tag: "Most Popular",
  },
  {
    name: "The Candy Cane",
    description:
      "Striking South American bloodwood paired with crisp maple. Simple. Bold. Unforgettable on any countertop.",
    price: "From $109",
    pattern: "candy-cane" as const,
    tag: "New Arrival",
  },
]

function CollectionSection() {
  return (
    <section id="collection" className="relative py-28 sm:py-36">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3d332a] to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8956c] font-semibold text-center font-sans">
            The Collection
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-4xl sm:text-5xl text-center mt-4 tracking-tight">
            Signature Boards
          </h2>
        </Reveal>
        <Reveal delay={130}>
          <p className="text-center text-[#a89580] mt-4 max-w-lg mx-auto font-sans">
            Each design tells a story through the natural beauty of exotic
            hardwoods, carefully selected and assembled by hand.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-16">
          {BOARDS.map((board, i) => (
            <Reveal key={board.name} delay={180 + i * 100}>
              <div className="group relative bg-[#18140f] border border-[#2a231c] rounded-xl overflow-hidden transition-all duration-500 hover:border-[#c8956c]/25 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:-translate-y-1">
                {/* Board visual */}
                <div className="relative h-52 sm:h-56 overflow-hidden">
                  <BoardPattern
                    pattern={board.pattern}
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  {/* Vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(17,14,10,0.15) 0%, transparent 30%, transparent 70%, rgba(17,14,10,0.4) 100%)",
                    }}
                  />
                  {/* Tag */}
                  <span className="absolute top-4 left-4 bg-[#110e0a]/80 backdrop-blur-sm text-[#c8956c] text-[10px] tracking-[0.18em] uppercase font-semibold px-3 py-1.5 rounded-full border border-[#c8956c]/15">
                    {board.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl text-[#f5e6d0]">
                      {board.name}
                    </h3>
                    <span className="text-[#c8956c] text-sm font-semibold whitespace-nowrap font-sans">
                      {board.price}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#7d6f60] leading-relaxed font-sans">
                    {board.description}
                  </p>
                  <div className="pt-2">
                    <button className="text-[11px] tracking-[0.18em] uppercase text-[#c8956c] hover:text-[#e8c49a] transition-colors duration-300 group/link flex items-center gap-2 font-semibold font-sans">
                      View Details
                      <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* View all link */}
        <Reveal delay={500}>
          <div className="text-center mt-12">
            <button className="text-sm text-[#b8a089] hover:text-[#e8c49a] transition-colors duration-300 tracking-wider uppercase font-sans group/all inline-flex items-center gap-2">
              View All Boards
              <span className="inline-block transition-transform duration-300 group-hover/all:translate-x-1">
                →
              </span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── The Craft ───────────────────────────────────────────────── */

const STEPS = [
  {
    num: "01",
    title: "Selection",
    desc: "We hand-select each piece of exotic hardwood for grain pattern, color intensity, and structural integrity.",
  },
  {
    num: "02",
    title: "Precision Assembly",
    desc: "Strips are precisely cut to spec, then carefully arranged, glued, and clamped to create stunning geometric patterns.",
  },
  {
    num: "03",
    title: "Hand Finishing",
    desc: "Multiple rounds of hand-sanding from 80 to 400 grit, finished with food-safe mineral oil and beeswax.",
  },
]

function CraftSection() {
  return (
    <section id="our-craft" className="relative py-28 sm:py-36">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3d332a] to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Visual */}
          <Reveal>
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div
                className="absolute -inset-10 rounded-3xl blur-[60px] opacity-20 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(200,149,108,0.4) 0%, transparent 70%)",
                }}
              />
              <BoardPattern
                pattern="end-grain"
                className="w-full aspect-square"
                style={{
                  transform: "rotate(2deg)",
                  boxShadow:
                    "0 30px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3)",
                }}
              />

              {/* Floating detail */}
              <div
                className="absolute -bottom-6 -right-6 w-32 h-24 rounded-lg overflow-hidden"
                style={{
                  transform: "rotate(-6deg)",
                  background: `repeating-linear-gradient(90deg,
                    #d4a76a 0px, #d4a76a 16px,
                    #f0d9b5 16px, #f0d9b5 32px,
                    #5c4033 32px, #5c4033 48px
                  )`,
                  boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
                }}
              >
                <div className="absolute inset-0" style={GRAIN} />
                <div className="absolute inset-0" style={SHEEN} />
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <div>
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8956c] font-semibold font-sans">
                The Craft
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-4xl sm:text-5xl mt-4 tracking-tight leading-[1.1]">
                Every Board Tells
                <br />
                <span className="italic text-[#c8956c]">a Story</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-[#a89580] mt-6 leading-relaxed font-sans">
                From raw timber to finished masterpiece, each Kaizen board
                passes through dozens of meticulous steps. We believe in
                the Japanese philosophy of{" "}
                <em className="text-[#c8956c] not-italic font-medium">
                  kaizen
                </em>{" "}
                — continuous improvement. Every board we make teaches us
                to make the next one even better.
              </p>
            </Reveal>

            <div className="mt-10 space-y-8">
              {STEPS.map((step, i) => (
                <Reveal key={step.num} delay={200 + i * 100}>
                  <div className="flex gap-6 group/step">
                    <span className="font-display text-3xl text-[#c8956c]/20 group-hover/step:text-[#c8956c]/50 transition-colors duration-500 select-none leading-none pt-1">
                      {step.num}
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-[#f5e6d0]">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[#7d6f60] mt-1.5 leading-relaxed font-sans">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Wood Species ────────────────────────────────────────────── */

const WOODS = [
  {
    name: "Hard Maple",
    color: "#f0d9b5",
    origin: "North America",
    desc: "Light, durable, tight grain",
  },
  {
    name: "Black Walnut",
    color: "#5c4033",
    origin: "North America",
    desc: "Rich, dark, timeless warmth",
  },
  {
    name: "Purpleheart",
    color: "#6a2c70",
    origin: "Central America",
    desc: "Vivid purple, extremely hard",
  },
  {
    name: "Bloodwood",
    color: "#8b1a1a",
    origin: "South America",
    desc: "Deep crimson, fine grain",
  },
  {
    name: "Padauk",
    color: "#d35400",
    origin: "West Africa",
    desc: "Vibrant orange-red, bold",
  },
  {
    name: "Wenge",
    color: "#3c2415",
    origin: "Central Africa",
    desc: "Dark chocolate, dramatic",
  },
]

function WoodSpeciesSection() {
  return (
    <section id="wood-species" className="relative py-28 sm:py-36">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3d332a] to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8956c] font-semibold text-center font-sans">
            Materials
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-4xl sm:text-5xl text-center mt-4 tracking-tight">
            The Finest Hardwoods on Earth
          </h2>
        </Reveal>
        <Reveal delay={130}>
          <p className="text-center text-[#a89580] mt-4 max-w-md mx-auto font-sans">
            We source only the highest-quality exotic hardwoods from
            sustainable suppliers around the world.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mt-16">
          {WOODS.map((wood, i) => (
            <Reveal key={wood.name} delay={180 + i * 70}>
              <div className="group text-center space-y-4 cursor-default">
                {/* Color swatch */}
                <div className="relative mx-auto">
                  <div
                    className="relative mx-auto size-[4.5rem] rounded-full transition-all duration-500 group-hover:scale-110"
                    style={{
                      backgroundColor: wood.color,
                      boxShadow: `0 8px 24px ${wood.color}40, 0 0 0 1px ${wood.color}20`,
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full overflow-hidden"
                      style={GRAIN}
                    />
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)",
                      }}
                    />
                  </div>
                  {/* Ring on hover */}
                  <div
                    className="absolute inset-0 mx-auto size-[4.5rem] rounded-full border-2 transition-all duration-500 opacity-0 scale-125 group-hover:opacity-100 group-hover:scale-100"
                    style={{ borderColor: `${wood.color}40` }}
                  />
                </div>

                <div>
                  <h3 className="font-display text-sm text-[#f5e6d0]">
                    {wood.name}
                  </h3>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#6a5d50] mt-0.5 font-sans">
                    {wood.origin}
                  </p>
                  <p className="text-xs text-[#5a4e42] mt-1 font-sans">
                    {wood.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Testimonial ─────────────────────────────────────────────── */

function TestimonialSection() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3d332a] to-transparent" />

      {/* Warm ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,149,108,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <div className="flex justify-center gap-1.5 mb-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 text-[#c8956c]"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <blockquote className="font-display text-[clamp(1.4rem,3.5vw,2.25rem)] leading-snug italic text-[#e8dcc8]">
            &ldquo;This isn&apos;t just a cutting board — it&apos;s the
            centerpiece of our kitchen. The craftsmanship is unlike
            anything I&apos;ve seen. Every guest who walks in asks about
            it.&rdquo;
          </blockquote>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10 space-y-1">
            <p className="text-[#c8956c] font-semibold font-sans text-sm">
              Sarah M.
            </p>
            <p className="text-[11px] text-[#6a5d50] tracking-[0.15em] uppercase font-sans">
              Portland, Oregon
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── CTA Section ─────────────────────────────────────────────── */

function CTASection() {
  return (
    <section id="custom-orders" className="relative py-28 sm:py-36">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3d332a] to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div
          className="relative rounded-2xl overflow-hidden px-6 py-16 sm:px-16 sm:py-24"
          style={{
            background: `
              linear-gradient(145deg, rgba(200,149,108,0.1) 0%, rgba(60,36,21,0.08) 100%),
              #16120e
            `,
            border: "1px solid rgba(200,149,108,0.08)",
          }}
        >
          {/* Decorative board strip along right edge */}
          <div className="absolute top-0 right-0 w-48 h-full opacity-[0.06] pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                background: `repeating-linear-gradient(90deg,
                  #d4a76a 0px, #d4a76a 16px,
                  #f0d9b5 16px, #f0d9b5 32px,
                  #5c4033 32px, #5c4033 48px
                )`,
              }}
            />
          </div>

          {/* Warm corner glow */}
          <div
            className="absolute top-0 left-0 w-80 h-80 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at top left, rgba(200,149,108,0.08) 0%, transparent 60%)",
            }}
          />

          <div className="relative text-center max-w-2xl mx-auto">
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8956c] font-semibold font-sans">
                Made to Order
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-4xl sm:text-5xl mt-4 tracking-tight">
                Find Your Perfect Board
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-[#a89580] mt-5 leading-relaxed font-sans max-w-lg mx-auto">
                Can&apos;t find exactly what you&apos;re looking for? We
                craft custom boards to your exact specifications — choose
                your wood species, pattern style, and dimensions for a
                truly one-of-a-kind piece.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Button className="bg-[#c8956c] text-[#1a1410] hover:bg-[#e8c49a] border-none rounded-none px-8 h-12 text-[13px] tracking-[0.15em] uppercase font-semibold transition-all duration-300 hover:shadow-[0_8px_30px_rgba(200,149,108,0.3)]">
                  Start Custom Order
                </Button>
                <Button
                  variant="outline"
                  className="border-[#3d332a] text-[#b8a089] hover:border-[#c8956c]/40 hover:text-[#e8c49a] hover:bg-transparent rounded-none h-12 px-8 text-[13px] tracking-[0.15em] uppercase"
                >
                  Browse Collection
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ──────────────────────────────────────────────────── */

function Footer() {
  const columns = [
    {
      title: "Shop",
      links: [
        "All Boards",
        "Heritage Collection",
        "Exotic Collection",
        "Custom Orders",
      ],
    },
    {
      title: "Company",
      links: ["Our Story", "The Craft", "Wood Species", "Care Guide"],
    },
    {
      title: "Support",
      links: ["Contact", "Shipping", "Returns", "FAQ"],
    },
  ]

  return (
    <footer className="relative pt-16 pb-12 border-t border-[#2a231c]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div
                className="relative size-7 rounded-sm overflow-hidden"
                style={{
                  background: `repeating-linear-gradient(90deg,
                    #d4a76a 0px, #d4a76a 3.5px,
                    #f0d9b5 3.5px, #f0d9b5 7px,
                    #5c4033 7px, #5c4033 10.5px,
                    #f0d9b5 10.5px, #f0d9b5 14px
                  )`,
                }}
              >
                <div className="absolute inset-0" style={GRAIN} />
              </div>
              <span className="font-display text-lg tracking-wide text-[#f5e6d0]">
                KAIZEN BOARDS
              </span>
            </div>
            <p className="text-sm text-[#5a4e42] mt-4 leading-relaxed font-sans max-w-xs">
              Handcrafted cutting boards from the world&apos;s finest
              exotic hardwoods. Each piece is a functional work of art
              designed to last generations.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#c8956c] font-semibold font-sans">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#7d6f60] hover:text-[#e8c49a] transition-colors duration-300 font-sans"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#221c17] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#4a3f36] font-sans">
            © 2026 Kaizen Boards. All rights reserved.
          </p>
          <p className="text-xs text-[#4a3f36] italic font-display">
            Continuous improvement, one board at a time.
          </p>
        </div>
      </div>
    </footer>
  )
}
