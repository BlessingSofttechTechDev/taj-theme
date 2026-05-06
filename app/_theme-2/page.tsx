"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Link from "next/link";

/* ───────────────────────── helpers ───────────────────────── */

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ───────────────────── data ───────────────────── */

const accommodations = [
  {
    number: "01",
    title: "Palace Chambers",
    keys: "38",
    description:
      "Rooms carved from the heart of the palace block — where carved stone meets ancient silence, and every window frames a different chapter of the forest.",
    tags: ["45 sqmt", "Suite 93 sqmt", "G+3 Palace", "Jungle Views"],
  },
  {
    number: "02",
    title: "Courtyard Villas",
    keys: "20",
    description:
      "Two-storey villas with enclosed courtyards — private worlds where cicadas sing and jasmine climbs the walls after dusk.",
    tags: ["500 sqft", "Private Courtyard", "G+1", "Daybed"],
  },
  {
    number: "03",
    title: "Plunge Pool Villas",
    keys: "16",
    description:
      "Villas that reach into the wilderness — each with a plunge pool that mirrors the sky by day and the stars by night.",
    tags: ["500 sqft", "Plunge Pool", "Private Deck", "G+1"],
  },
  {
    number: "04",
    title: "Presidential Suites",
    keys: "08",
    description:
      "810 sqft of untamed luxury — a living sanctuary suspended between the forest canopy and the ancient fort walls on the horizon.",
    tags: ["810 sqft", "Plunge Pool", "Living Room", "Balcony"],
  },
];

const experiences = [
  {
    title: "The Tiger Hour",
    time: "05:30 - 09:30",
    description:
      "Before the forest wakes, we venture out. Expert naturalists guide you through Ranthambhore as the first light unveils the hunting grounds of India's most elusive predator.",
  },
  {
    title: "Jiva Forest Spa",
    time: "All Day",
    description:
      "A subterranean sanctuary where ancient Ayurvedic rituals meet contemporary wellness. Couple suites, relaxation chambers, and treatments rooted in 5,000 years of tradition.",
  },
  {
    title: "Table in the Wild",
    time: "19:00 - 23:00",
    description:
      "Dinner under a canopy of banyan branches, lit by a hundred lanterns. From curated tasting menus to royal Rajasthani feasts, every meal is a story.",
  },
  {
    title: "Under a Billion Stars",
    time: "21:00 - Late",
    description:
      "Climb the machaan, lie back on the star gazing deck, and let the Rajasthani night sky remind you how small and how free we all are.",
  },
];

const venues = [
  { name: "Function Lawn", value: "24,362", unit: "sqft" },
  { name: "Grand Ballroom", value: "5,846", unit: "sqft" },
  { name: "Event Lawn", value: "5,704", unit: "sqft" },
  { name: "Banquet Hall", value: "2,254", unit: "sqft" },
];

/* ───────────────────── main page ───────────────────── */

export default function Theme2() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroBlur = useTransform(scrollYProgress, [0, 1], [0, 8]);

  const navOpaque = scrollY > 100;

  return (
    <div className="bg-[#0a0f0a] text-[#e8dfc6] font-[family-name:var(--font-body)] overflow-x-hidden">
      {/* ─── NAVIGATION ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          navOpaque
            ? "bg-[#0a0f0a]/85 backdrop-blur-xl border-b border-[#C4841D]/15"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className="flex items-center gap-3 text-[#C4841D]/60 text-xs tracking-[0.2em] uppercase hover:text-[#C4841D] transition-colors duration-500"
            >
              <span className="w-6 h-[1px] bg-[#C4841D]/40" />
              Back
            </Link>

            <div className="flex items-center gap-8">
              <span className="hidden md:block text-[#C4841D] text-[10px] tracking-[0.4em] uppercase">
                Est. 2026
              </span>
              <div className="flex flex-col items-center">
                <span className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-light tracking-[0.15em] uppercase text-[#e8dfc6]">
                  Ranthambhore
                </span>
                <span className="text-[8px] tracking-[0.5em] uppercase text-[#C4841D]/60 mt-0.5">
                  A Taj Wilderness
                </span>
              </div>
              <span className="hidden md:block text-[#C4841D] text-[10px] tracking-[0.4em] uppercase">
                Rajasthan
              </span>
            </div>

            <a
              href="#inquiry"
              className="group flex items-center gap-2 text-[#C4841D] text-xs tracking-[0.2em] uppercase hover:text-[#e8dfc6] transition-colors duration-500"
            >
              Reserve
              <span className="w-6 h-[1px] bg-[#C4841D]/40 group-hover:bg-[#e8dfc6] transition-colors duration-500" />
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* layered atmospheric background */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          {/* base */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0a] via-[#0d1b0a] to-[#0a0f0a]" />

          {/* atmospheric fog layers */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(196, 132, 29, 0.15), transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 30% 60%, rgba(45, 80, 22, 0.4), transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 70% 80%, rgba(13, 27, 10, 0.8), transparent 70%)",
            }}
          />

          {/* forest silhouette pattern */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 180 Q25 120 30 180 M45 180 Q55 100 65 180 M80 180 Q90 140 100 180 M115 180 Q125 110 135 180 M150 180 Q165 130 180 180' stroke='%23C4841D' fill='none' stroke-width='0.8'/%3E%3C/svg%3E")`,
              backgroundSize: "400px 400px",
            }}
          />

          {/* grain */}
          <div
            className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity, filter: `blur(${heroBlur.get()}px)` }}
          className="relative z-10 h-full flex items-end pb-24 md:pb-32"
        >
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 1.2 }}
                  className="flex items-center gap-4 mb-8"
                >
                  <span className="w-12 h-[1px] bg-[#C4841D]" />
                  <span className="text-[#C4841D] text-[10px] tracking-[0.4em] uppercase">
                    Sawai Madhopur, Rajasthan
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="font-[family-name:var(--font-display)] text-6xl md:text-8xl lg:text-[140px] font-extralight leading-[0.85] tracking-tight"
                >
                  <span className="block text-[#e8dfc6]">Into</span>
                  <span className="block text-[#e8dfc6]">
                    the <span className="italic text-[#C4841D]">Wild.</span>
                  </span>
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="md:col-span-4 md:pb-8"
              >
                <p className="text-[#e8dfc6]/50 text-sm leading-relaxed max-w-xs">
                  At the edge of India&apos;s most storied tiger reserve,
                  a sanctuary rises where kings once hunted. Now, only the
                  tigers remain — and they invite you to stay.
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <a
                    href="#story"
                    className="text-[#C4841D] text-xs tracking-[0.3em] uppercase border-b border-[#C4841D] pb-1 hover:text-[#e8dfc6] hover:border-[#e8dfc6] transition-colors duration-500"
                  >
                    Enter the Forest
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[#C4841D]/50 text-[9px] tracking-[0.4em] uppercase">
            Descend
          </span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-[1px] h-10 bg-gradient-to-b from-[#C4841D]/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ─── STORY ─── */}
      <Section id="story" className="py-32 md:py-48 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0a] via-[#0d1b0a] to-[#0a0f0a]" />

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-5">
              <div className="sticky top-32">
                <p className="text-[#C4841D]/70 text-[10px] tracking-[0.4em] uppercase mb-6">
                  Chapter One
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-extralight leading-[1] text-[#e8dfc6]">
                  The Forest
                  <br />
                  <span className="italic text-[#C4841D]">Remembers.</span>
                </h2>
                <div className="mt-10 w-16 h-[1px] bg-[#C4841D]" />
              </div>
            </div>

            <div className="md:col-span-7 space-y-10 text-[#e8dfc6]/60 text-lg leading-[1.9] font-light">
              <p className="text-2xl md:text-3xl text-[#e8dfc6] font-[family-name:var(--font-display)] italic leading-snug">
                &ldquo;Before India&apos;s independence, the Ranthambhore forest
                was the exclusive hunting ground of the Maharajahs of Jaipur.&rdquo;
              </p>
              <p>
                For centuries, this wilderness belonged only to kings. Ancient
                monuments stood watch over the jungle floor while royal parties
                crossed the forest on elephants, their torches reflecting off
                the stone walls of forgotten temples.
              </p>
              <p>
                Then the forest took it all back. The temples became moss. The
                hunting trails disappeared beneath the undergrowth. And in the
                1980s, under Project Tiger, the striped rulers returned to
                reclaim their kingdom.
              </p>
              <p>
                This is the land we have the privilege to call our own. A place
                where every stone carries a story, and every dawn carries the
                possibility of meeting a tiger.
              </p>

              {/* stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-[#C4841D]/10">
                {[
                  { n: "86", l: "Keys" },
                  { n: "8.18", l: "Acres" },
                  { n: "1980", l: "Project Tiger" },
                  { n: "∞", l: "Stories" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="font-[family-name:var(--font-display)] text-4xl text-[#C4841D] font-extralight">
                      {s.n}
                    </p>
                    <p className="text-[#e8dfc6]/40 text-[10px] tracking-[0.2em] uppercase mt-2">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── ACCOMMODATIONS ─── */}
      <Section id="accommodations" className="py-32 md:py-48 relative bg-[#070b07]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 50 Q15 20 20 50 M25 50 Q32 10 39 50 M44 50 Q50 25 56 50' stroke='%23C4841D' fill='none' stroke-width='0.6'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="max-w-xl mb-20 md:mb-28">
            <p className="text-[#C4841D]/70 text-[10px] tracking-[0.4em] uppercase mb-6">
              Chapter Two &middot; The Refuge
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-extralight leading-[0.95] text-[#e8dfc6]">
              Where You
              <br />
              Will <span className="italic text-[#C4841D]">Rest.</span>
            </h2>
          </div>

          <div className="space-y-0">
            {accommodations.map((room, i) => (
              <motion.div
                key={room.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group border-t border-[#C4841D]/10 py-10 md:py-14 hover:border-[#C4841D]/30 transition-colors duration-700 last:border-b"
              >
                <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                  <div className="md:col-span-1">
                    <span className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[#C4841D]/40 font-extralight">
                      {room.number}
                    </span>
                  </div>

                  <div className="md:col-span-4">
                    <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-extralight text-[#e8dfc6] group-hover:text-[#C4841D] transition-colors duration-700 leading-[1]">
                      {room.title}
                    </h3>
                    <p className="text-[#C4841D]/70 text-xs tracking-[0.3em] uppercase mt-4">
                      {room.keys} Keys
                    </p>
                  </div>

                  <div className="md:col-span-5">
                    <p className="text-[#e8dfc6]/50 leading-[1.9] font-light">
                      {room.description}
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6">
                      {room.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[#e8dfc6]/30 text-[10px] tracking-[0.2em] uppercase"
                        >
                          — {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2 md:text-right">
                    <a
                      href="#inquiry"
                      className="inline-flex items-center gap-2 text-[#C4841D] text-[10px] tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      Discover
                      <span className="w-6 h-[1px] bg-[#C4841D] group-hover:w-10 transition-all duration-500" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── EXPERIENCES ─── */}
      <Section id="experiences" className="py-32 md:py-48 relative bg-[#0a0f0a]">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            background:
              "radial-gradient(ellipse at 20% 30%, rgba(196, 132, 29, 0.2), transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(45, 80, 22, 0.3), transparent 50%)",
          }}
        />

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-8 mb-20 md:mb-28">
            <div className="md:col-span-5">
              <p className="text-[#C4841D]/70 text-[10px] tracking-[0.4em] uppercase mb-6">
                Chapter Three &middot; The Experience
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-extralight leading-[0.95] text-[#e8dfc6]">
                Hours Carved
                <br />
                From <span className="italic text-[#C4841D]">Silence.</span>
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex items-end">
              <p className="text-[#e8dfc6]/50 text-lg leading-[1.9] font-light">
                The wilderness moves at its own pace. Our experiences follow
                its rhythm — unhurried, unscripted, unforgettable. From the
                tiger&apos;s hour at dawn to the depth of a starlit night.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group"
              >
                <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-[#C4841D]/15 group-hover:border-[#C4841D]/40 transition-colors duration-700">
                  <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extralight text-[#e8dfc6] group-hover:text-[#C4841D] transition-colors duration-700">
                    {exp.title}
                  </h3>
                  <span className="text-[#C4841D]/60 text-[10px] tracking-[0.3em] uppercase shrink-0 ml-4">
                    {exp.time}
                  </span>
                </div>
                <p className="text-[#e8dfc6]/50 leading-[1.9] font-light">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* activities ticker */}
          <div className="mt-24 py-6 border-y border-[#C4841D]/10 overflow-hidden">
            <div className="flex items-center gap-8 md:gap-12 whitespace-nowrap text-[#e8dfc6]/30 text-[10px] tracking-[0.4em] uppercase justify-center flex-wrap">
              {[
                "Adventure Climbing",
                "Bonfire Nights",
                "Herb Garden Walks",
                "BBQ Evenings",
                "Machaan Decks",
                "Kids Club",
                "Gymnasium",
                "Pool Deck",
              ].map((a, i) => (
                <span key={a} className="flex items-center gap-8 md:gap-12">
                  {a}
                  {i < 7 && <span className="w-1 h-1 bg-[#C4841D]/40 rotate-45" />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── WEDDINGS ─── */}
      <Section id="events" className="py-32 md:py-48 relative bg-[#070b07] overflow-hidden">
        {/* dramatic atmospheric background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 40%, rgba(196, 132, 29, 0.12), transparent 50%)",
          }}
        />

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6">
              <p className="text-[#C4841D]/70 text-[10px] tracking-[0.4em] uppercase mb-6">
                Chapter Four &middot; Celebrations
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-extralight leading-[0.95] text-[#e8dfc6] mb-10">
                Weddings Under
                <br />
                <span className="italic text-[#C4841D]">Ancient Skies.</span>
              </h2>
              <p className="text-[#e8dfc6]/50 text-lg leading-[1.9] font-light max-w-lg">
                Over 30,000 square feet of celebration space, backed by a forest
                older than memory and a palace built for kings. Exchange vows
                where legends are made.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-14">
                {venues.map((v) => (
                  <div
                    key={v.name}
                    className="border-l border-[#C4841D]/30 pl-5 py-3 hover:border-[#C4841D] transition-colors duration-500"
                  >
                    <p className="font-[family-name:var(--font-display)] text-4xl text-[#e8dfc6] font-extralight">
                      {v.value}
                      <span className="text-sm text-[#C4841D]/60 ml-1">{v.unit}</span>
                    </p>
                    <p className="text-[#e8dfc6]/50 text-xs tracking-[0.2em] uppercase mt-1">
                      {v.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-6 md:col-start-7 relative">
              <div className="relative aspect-[4/5] overflow-hidden border border-[#C4841D]/20">
                {/* layered moody texture */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b0a] via-[#0a0f0a] to-[#070b07]" />
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(196, 132, 29, 0.25), transparent 70%)",
                  }}
                />
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10 Q40 35 20 55 M40 10 Q40 35 60 55 M40 10 Q20 25 10 45 M40 10 Q60 25 70 45' stroke='%23C4841D' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: "80px 80px",
                  }}
                />
                <div
                  className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                <div className="absolute inset-0 flex flex-col justify-between p-10 md:p-14">
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-[#C4841D]" />
                    <span className="text-[#C4841D] text-[9px] tracking-[0.4em] uppercase">
                      Celebration Venues
                    </span>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-3xl md:text-5xl text-[#e8dfc6] italic leading-[1.1]">
                      &ldquo;A place where kings once rode, and love stories now
                      begin.&rdquo;
                    </p>
                    <div className="mt-8 w-16 h-[1px] bg-[#C4841D]" />
                    <p className="mt-4 text-[#C4841D]/60 text-[10px] tracking-[0.3em] uppercase">
                      The Palace Block &middot; Ranthambhore
                    </p>
                  </div>
                </div>
              </div>

              {/* floating accent */}
              <div className="absolute -top-6 -left-6 w-20 h-20 border border-[#C4841D]/30 hidden md:block" />
              <div className="absolute -bottom-6 -right-6 w-20 h-20 border border-[#C4841D]/30 hidden md:block" />
            </div>
          </div>
        </div>
      </Section>

      {/* ─── GALLERY ─── */}
      <Section id="gallery" className="py-32 md:py-48 relative bg-[#0a0f0a]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between mb-16 md:mb-20">
            <div>
              <p className="text-[#C4841D]/70 text-[10px] tracking-[0.4em] uppercase mb-4">
                Chapter Five &middot; The Gallery
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-extralight leading-[0.95] text-[#e8dfc6]">
                Fragments of
                <br />
                <span className="italic text-[#C4841D]">Wilderness.</span>
              </h2>
            </div>
            <p className="text-[#e8dfc6]/40 text-xs tracking-[0.3em] uppercase hidden md:block">
              08 Views
            </p>
          </div>

          {/* asymmetric gallery grid */}
          <div className="grid grid-cols-12 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[180px]">
            {[
              { span: "col-span-12 md:col-span-8 row-span-2", label: "The Palace at Dawn", type: "ember" },
              { span: "col-span-6 md:col-span-4 row-span-1", label: "Plunge Pool Villa", type: "deep" },
              { span: "col-span-6 md:col-span-4 row-span-1", label: "Jungle Path", type: "forest" },
              { span: "col-span-12 md:col-span-6 row-span-2", label: "Banquet Lawn Panorama", type: "ember" },
              { span: "col-span-6 md:col-span-3 row-span-1", label: "Tiger Portrait", type: "deep" },
              { span: "col-span-6 md:col-span-3 row-span-1", label: "Spa Sanctuary", type: "forest" },
              { span: "col-span-6 md:col-span-3 row-span-1", label: "Courtyard", type: "ember" },
              { span: "col-span-6 md:col-span-3 row-span-1", label: "Star Deck", type: "deep" },
            ].map((item, i) => {
              const bgs = {
                ember:
                  "bg-gradient-to-br from-[#1a1008] via-[#0d1b0a] to-[#070b07]",
                deep: "bg-gradient-to-br from-[#0d1b0a] via-[#070b07] to-[#050905]",
                forest:
                  "bg-gradient-to-br from-[#0a1a0a] via-[#0d1b0a] to-[#0a0f0a]",
              };
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, delay: i * 0.06 }}
                  className={`${item.span} relative overflow-hidden border border-[#C4841D]/10 group cursor-pointer`}
                >
                  <div className={`absolute inset-0 ${bgs[item.type as keyof typeof bgs]}`} />
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5 Q20 15 10 25 M20 5 Q20 15 30 25' stroke='%23C4841D' fill='none' stroke-width='0.4'/%3E%3C/svg%3E")`,
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-[0.2] mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b07]/90 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                      <p className="text-[#C4841D] text-[9px] tracking-[0.3em] uppercase">
                        0{i + 1}
                      </p>
                      <p className="text-[#e8dfc6] font-[family-name:var(--font-display)] text-xl mt-1">
                        {item.label}
                      </p>
                    </div>
                  </div>

                  {/* hover accent */}
                  <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#C4841D]/0 group-hover:border-[#C4841D]/60 transition-all duration-700" />
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10 text-[#e8dfc6]/25 text-xs tracking-[0.3em] uppercase">
            Placeholder gallery &middot; Final imagery pending
          </div>
        </div>
      </Section>

      {/* ─── INQUIRY ─── */}
      <Section id="inquiry" className="py-32 md:py-48 relative bg-[#070b07] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(196, 132, 29, 0.08), transparent 60%)",
          }}
        />

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
              <p className="text-[#C4841D]/70 text-[10px] tracking-[0.4em] uppercase mb-6">
                Chapter Six &middot; The Invitation
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-extralight leading-[0.95] text-[#e8dfc6] mb-8">
                Come Back
                <br />
                <span className="italic text-[#C4841D]">Wild.</span>
              </h2>
              <p className="text-[#e8dfc6]/50 text-lg leading-[1.9] font-light mb-12">
                The forest is waiting. Our concierge will craft an experience
                that matches the rhythm of your soul — whether that&apos;s a
                quiet retreat, a royal celebration, or a week of tiger tracking.
              </p>

              <div className="space-y-5 text-sm">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-[1px] bg-[#C4841D]" />
                  <a href="mailto:reservations@tajranthambhore.com" className="text-[#e8dfc6]/70 hover:text-[#C4841D] transition-colors">
                    reservations@tajranthambhore.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-10 h-[1px] bg-[#C4841D]" />
                  <span className="text-[#e8dfc6]/70">+91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-10 h-[1px] bg-[#C4841D]" />
                  <span className="text-[#e8dfc6]/70">
                    Sawai Madhopur, Rajasthan
                  </span>
                </div>
              </div>
            </div>

            <form className="md:col-span-6 md:col-start-7 space-y-6">
              {[
                { label: "Full Name", type: "text" },
                { label: "Email Address", type: "email" },
                { label: "Phone Number", type: "tel" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-[#C4841D]/60 text-[10px] tracking-[0.3em] uppercase mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    className="w-full bg-transparent border-b border-[#C4841D]/20 py-3 text-[#e8dfc6] text-sm focus:border-[#C4841D] focus:outline-none transition-colors duration-500"
                  />
                </div>
              ))}

              <div>
                <label className="block text-[#C4841D]/60 text-[10px] tracking-[0.3em] uppercase mb-2">
                  Interest
                </label>
                <select className="w-full bg-transparent border-b border-[#C4841D]/20 py-3 text-[#e8dfc6]/50 text-sm focus:border-[#C4841D] focus:outline-none transition-colors duration-500 appearance-none">
                  <option className="bg-[#070b07]">Luxury Stay</option>
                  <option className="bg-[#070b07]">Destination Wedding</option>
                  <option className="bg-[#070b07]">Corporate Event</option>
                  <option className="bg-[#070b07]">Safari Package</option>
                </select>
              </div>

              <div>
                <label className="block text-[#C4841D]/60 text-[10px] tracking-[0.3em] uppercase mb-2">
                  Message
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-transparent border-b border-[#C4841D]/20 py-3 text-[#e8dfc6] text-sm focus:border-[#C4841D] focus:outline-none transition-colors duration-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="group mt-10 flex items-center gap-4 text-[#C4841D] text-xs tracking-[0.4em] uppercase hover:text-[#e8dfc6] transition-colors duration-500"
              >
                Send the Invitation
                <span className="w-12 h-[1px] bg-[#C4841D] group-hover:w-20 group-hover:bg-[#e8dfc6] transition-all duration-700" />
              </button>
            </form>
          </div>
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#050905] border-t border-[#C4841D]/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <h3 className="font-[family-name:var(--font-display)] text-3xl font-extralight text-[#e8dfc6] mb-2 tracking-[0.1em] uppercase">
                Ranthambhore
              </h3>
              <p className="text-[#C4841D]/60 text-[9px] tracking-[0.5em] uppercase mb-6">
                A Taj Wilderness
              </p>
              <p className="text-[#e8dfc6]/40 text-sm leading-[1.9] max-w-xs font-light">
                At the edge of India&apos;s most storied tiger reserve.
                Sawai Madhopur, Rajasthan.
              </p>
            </div>

            <div className="md:col-span-3 md:col-start-7">
              <p className="text-[#C4841D]/50 text-[10px] tracking-[0.3em] uppercase mb-6">
                Navigate
              </p>
              <ul className="space-y-3 text-[#e8dfc6]/50 text-sm font-light">
                {["Story", "Accommodations", "Experiences", "Events", "Gallery"].map((l) => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase()}`} className="hover:text-[#C4841D] transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <p className="text-[#C4841D]/50 text-[10px] tracking-[0.3em] uppercase mb-6">
                Connect
              </p>
              <ul className="space-y-3 text-[#e8dfc6]/50 text-sm font-light">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-6 border-t border-[#C4841D]/10 flex flex-col md:flex-row items-center justify-between gap-3 text-[#e8dfc6]/20 text-[10px] tracking-[0.2em] uppercase">
            <p>&copy; 2026 Taj Ranthambhore Resort</p>
            <p>Theme 02 &middot; Into the Wild</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
