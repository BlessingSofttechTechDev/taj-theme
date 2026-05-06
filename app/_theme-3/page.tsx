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
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────── data ───────────────────── */

const accommodations = [
  {
    num: "I",
    title: "Palace Rooms",
    meta: "38 Keys · 45 sqmt",
    description:
      "Refined rooms within the palace block, each a study in restrained luxury with contemporary interiors and subtle Rajasthani details.",
  },
  {
    num: "II",
    title: "Garden Villas",
    meta: "20 Keys · 500 sqft",
    description:
      "Two-storey standalone villas with private courtyards, thoughtful spatial flow, and curated views of the resort gardens.",
  },
  {
    num: "III",
    title: "Pool Villas",
    meta: "16 Keys · 500 sqft",
    description:
      "Villas with dedicated plunge pools, landscaped private decks, and a quiet rhythm that belongs entirely to you.",
  },
  {
    num: "IV",
    title: "Presidential Suites",
    meta: "08 Keys · 810 sqft",
    description:
      "The most expansive residences — living rooms, dining areas, plunge pools, and broad balconies framed by the wilderness.",
  },
];

const experiences = [
  {
    index: "01",
    title: "Safari Excursions",
    description:
      "Guided by seasoned naturalists through the Ranthambhore Tiger Reserve. Morning and afternoon drives, tailored to your pace.",
  },
  {
    index: "02",
    title: "Jiva Spa & Wellness",
    description:
      "A sanctuary of Indian wellness traditions — couple treatment rooms, a subterranean relaxation chamber, and an extensive gymnasium.",
  },
  {
    index: "03",
    title: "Culinary Journeys",
    description:
      "All-day dining, an alfresco terrace, and a specialty restaurant — each menu developed in collaboration with regional artisans.",
  },
  {
    index: "04",
    title: "Evenings & Activities",
    description:
      "Bonfires beneath open skies, star-gazing decks, herb garden tours, adventure climbing, and curated evening programming.",
  },
];

const venues = [
  { name: "Function Lawn", size: "24,362 sqft" },
  { name: "Grand Ballroom", size: "5,846 sqft" },
  { name: "Event Lawn", size: "5,704 sqft" },
  { name: "Banquet Collonade", size: "2,254 sqft" },
];

/* ───────────────────── main page ───────────────────── */

export default function Theme3() {
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
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const navOpaque = scrollY > 60;

  return (
    <div className="bg-[#FDFBF7] text-[#1a1a1a] font-[family-name:var(--font-body)] overflow-x-hidden">
      {/* ─── NAVIGATION ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          navOpaque
            ? "bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#1a1a1a]/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-24">
            <Link
              href="/"
              className={`text-[11px] tracking-[0.2em] uppercase transition-colors duration-500 ${
                navOpaque ? "text-[#1a1a1a]/50 hover:text-[#1a1a1a]" : "text-[#1a1a1a]/70 hover:text-[#1a1a1a]"
              }`}
            >
              ← All Themes
            </Link>

            <div className="hidden md:flex items-center gap-10">
              {["Rooms", "Experiences", "Events", "Gallery"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors duration-500"
                >
                  {link}
                </a>
              ))}
            </div>

            <a
              href="#inquiry"
              className="text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a] border-b border-[#1a1a1a]/40 pb-1 hover:border-[#1a1a1a] transition-all duration-500"
            >
              Book a Stay
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-24">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start min-h-[80vh]">
            {/* Left content */}
            <motion.div
              style={{ y: heroY, opacity: heroOpacity }}
              className="md:col-span-7 lg:col-span-7"
            >
              <Reveal delay={0.2}>
                <div className="flex items-center gap-4 mb-12">
                  <span className="text-[#1a1a1a]/40 text-[11px] tracking-[0.3em] uppercase">
                    A Taj Hotels Property
                  </span>
                  <span className="w-12 h-[1px] bg-[#1a1a1a]/30" />
                  <span className="text-[#8A6D3B] text-[11px] tracking-[0.3em] uppercase">
                    Ranthambhore
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl lg:text-[120px] font-light leading-[0.95] tracking-tight text-[#1a1a1a]">
                  A quiet
                  <br />
                  <span className="italic text-[#8A6D3B]">luxury</span>,
                  <br />
                  steeped in
                  <br />
                  <span className="italic text-[#8A6D3B]">heritage</span>.
                </h1>
              </Reveal>

              <Reveal delay={0.7}>
                <div className="mt-14 flex flex-wrap items-center gap-8">
                  <a
                    href="#story"
                    className="group flex items-center gap-3 text-[#1a1a1a] text-[11px] tracking-[0.25em] uppercase"
                  >
                    <span className="w-10 h-10 border border-[#1a1a1a]/30 rounded-full flex items-center justify-center group-hover:border-[#1a1a1a] group-hover:bg-[#1a1a1a] group-hover:text-[#FDFBF7] transition-all duration-500">
                      →
                    </span>
                    Discover the Resort
                  </a>
                  <span className="text-[#1a1a1a]/30 text-[11px] tracking-[0.25em] uppercase">
                    Est. 2026
                  </span>
                </div>
              </Reveal>
            </motion.div>

            {/* Right visual card */}
            <motion.div
              style={{ scale: heroScale, opacity: heroOpacity }}
              className="md:col-span-5 lg:col-span-5 md:sticky md:top-32"
            >
              <Reveal delay={0.5}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  {/* soft gradient backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E8DCC4] via-[#D4C5A9] to-[#C9B893]" />
                  <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 5 Q40 25 20 45 M40 5 Q40 25 60 45 M20 45 L60 45 L50 75 L30 75 Z' stroke='%238A6D3B' fill='none' stroke-width='0.4'/%3E%3C/svg%3E")`,
                      backgroundSize: "80px 80px",
                    }}
                  />
                  {/* subtle grain */}
                  <div
                    className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-baseline justify-between">
                      <p className="font-[family-name:var(--font-display)] text-2xl text-[#1a1a1a]">
                        86 Keys
                      </p>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-[#1a1a1a]/60">
                        8.18 Acres
                      </p>
                    </div>
                    <div className="h-[1px] bg-[#1a1a1a]/20 my-4" />
                    <p className="text-[#1a1a1a]/70 text-xs leading-relaxed">
                      Adjacent to the Ranthambhore Tiger Reserve, Sawai Madhopur
                    </p>
                  </div>
                </div>

                {/* small caption below */}
                <div className="mt-6 flex items-start justify-between text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a]/40">
                  <span>Fig. 01</span>
                  <span>The Palace Block, East Elevation</span>
                </div>
              </Reveal>
            </motion.div>
          </div>
        </div>

        {/* bottom marquee */}
        <div className="border-t border-[#1a1a1a]/10 py-6 overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center gap-10 md:gap-16 whitespace-nowrap text-[11px] tracking-[0.25em] uppercase text-[#1a1a1a]/50 justify-between flex-wrap">
            <span>● A Taj Property</span>
            <span>● 86 Luxury Keys</span>
            <span>● 30,000 sqft of Events</span>
            <span>● Adjacent Tiger Reserve</span>
            <span className="text-[#8A6D3B]">● Opening 2026</span>
          </div>
        </div>
      </section>

      {/* ─── STORY ─── */}
      <Section id="story" className="py-32 md:py-48 bg-[#FDFBF7]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4">
              <p className="text-[#8A6D3B] text-[11px] tracking-[0.3em] uppercase mb-6">
                § 01 &nbsp;·&nbsp; The Context
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1] text-[#1a1a1a] sticky top-32">
                A forest
                <br />
                older than
                <br />
                <span className="italic text-[#8A6D3B]">memory</span>.
              </h2>
            </div>

            <div className="md:col-span-7 md:col-start-6 space-y-8 text-[#1a1a1a]/70 text-base md:text-lg leading-[1.9] font-light">
              <p className="text-xl md:text-2xl text-[#1a1a1a] font-[family-name:var(--font-display)] italic leading-snug border-l-2 border-[#8A6D3B] pl-6">
                The Ranthambhore forest takes its name from the legendary fort
                perched within it — a witness to centuries of imperial
                grandeur.
              </p>
              <p>
                Before India&apos;s independence, this wilderness served as the
                exclusive hunting grounds for the Maharajahs of Jaipur. Over the
                centuries, the forest reclaimed its ancient monuments, and
                today, it is the tigers who reign.
              </p>
              <p>
                Our resort rises at the edge of this landscape — a conversation
                between palatial Rajasthani architecture and the raw,
                unscripted wilderness that surrounds it. Domes and arches meet
                native species. Ornate jharokhas frame distant fort walls.
              </p>

              <div className="pt-10 grid grid-cols-3 gap-6 border-t border-[#1a1a1a]/10">
                {[
                  { k: "1980", v: "Project Tiger" },
                  { k: "8.18", v: "Acres" },
                  { k: "86", v: "Keys" },
                ].map((s) => (
                  <div key={s.v}>
                    <p className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[#1a1a1a] font-light">
                      {s.k}
                    </p>
                    <p className="text-[#1a1a1a]/50 text-[10px] tracking-[0.2em] uppercase mt-2">
                      {s.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── ACCOMMODATIONS ─── */}
      <Section id="rooms" className="py-32 md:py-48 bg-[#F5EFE4]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-8 mb-20 md:mb-24">
            <div className="md:col-span-6">
              <p className="text-[#8A6D3B] text-[11px] tracking-[0.3em] uppercase mb-6">
                § 02 &nbsp;·&nbsp; The Accommodations
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-light leading-[0.95] text-[#1a1a1a]">
                Four ways
                <br />
                to <span className="italic text-[#8A6D3B]">stay</span>.
              </h2>
            </div>
            <div className="md:col-span-5 md:col-start-8 md:pt-14">
              <p className="text-[#1a1a1a]/60 text-base leading-[1.9] font-light">
                Each of our 86 keys is a distinct architectural conversation
                with the landscape — from the grandeur of palace chambers to
                the intimacy of pool villas.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-px">
            {accommodations.map((room, i) => (
              <motion.div
                key={room.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative"
              >
                <div className="py-12 md:py-16 border-t border-[#1a1a1a]/15">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <p className="font-[family-name:var(--font-display)] text-sm text-[#8A6D3B] tracking-[0.2em] mb-3">
                        {room.num}
                      </p>
                      <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-light text-[#1a1a1a] group-hover:text-[#8A6D3B] transition-colors duration-700 leading-[1.05]">
                        {room.title}
                      </h3>
                    </div>
                    <span className="text-[#1a1a1a]/40 text-[10px] tracking-[0.2em] uppercase text-right shrink-0 ml-4">
                      {room.meta}
                    </span>
                  </div>

                  <p className="text-[#1a1a1a]/60 leading-[1.9] font-light max-w-md">
                    {room.description}
                  </p>

                  {/* visual card */}
                  <div className="relative mt-10 aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#E8DCC4] to-[#D4C5A9] group">
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q30 20 15 35 M30 5 Q30 20 45 35' stroke='%238A6D3B' fill='none' stroke-width='0.4'/%3E%3C/svg%3E")`,
                        backgroundSize: "60px 60px",
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      }}
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[#1a1a1a]/70 text-[10px] tracking-[0.2em] uppercase">
                      <span>Fig. 0{i + 2}</span>
                      <span>{room.title}</span>
                    </div>
                  </div>

                  <a
                    href="#inquiry"
                    className="mt-8 inline-flex items-center gap-3 text-[#1a1a1a] text-[11px] tracking-[0.25em] uppercase border-b border-[#1a1a1a]/30 pb-1 hover:border-[#1a1a1a] transition-all duration-500"
                  >
                    View Details
                    <span>→</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── EXPERIENCES ─── */}
      <Section id="experiences" className="py-32 md:py-48 bg-[#FDFBF7]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-8 mb-20">
            <div className="md:col-span-8">
              <p className="text-[#8A6D3B] text-[11px] tracking-[0.3em] uppercase mb-6">
                § 03 &nbsp;·&nbsp; The Experiences
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-light leading-[0.95] text-[#1a1a1a]">
                Days shaped by
                <br />
                <span className="italic text-[#8A6D3B]">the forest</span>.
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-0 border-t border-[#1a1a1a]/15">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  delay: (i % 2) * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group py-10 md:py-14 border-b border-[#1a1a1a]/15 md:[&:nth-child(2)]:border-t-0 md:[&:nth-child(1)]:border-t-0"
              >
                <div className="flex items-baseline gap-6 mb-5">
                  <span className="font-[family-name:var(--font-display)] text-2xl text-[#8A6D3B] font-light">
                    {exp.index}
                  </span>
                  <span className="h-[1px] w-10 bg-[#1a1a1a]/20" />
                  <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-light text-[#1a1a1a] group-hover:text-[#8A6D3B] transition-colors duration-500">
                    {exp.title}
                  </h3>
                </div>
                <p className="text-[#1a1a1a]/60 leading-[1.9] font-light pl-16">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── EVENTS ─── */}
      <Section id="events" className="py-32 md:py-48 bg-[#1a1a1a] text-[#FDFBF7]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <p className="text-[#D4AF7A] text-[11px] tracking-[0.3em] uppercase mb-6">
                § 04 &nbsp;·&nbsp; Weddings &amp; Events
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-light leading-[0.95] text-[#FDFBF7] mb-10">
                Grand stages,
                <br />
                <span className="italic text-[#D4AF7A]">quiet luxury</span>.
              </h2>
              <p className="text-[#FDFBF7]/60 text-base leading-[1.9] font-light max-w-md">
                Over 30,000 square feet of event space, each venue considered
                with the care of an architectural commission. Whether 20 guests
                or 2,000, the resort adapts to the occasion with restraint and
                precision.
              </p>

              <a
                href="#inquiry"
                className="mt-12 inline-flex items-center gap-3 text-[#D4AF7A] text-[11px] tracking-[0.25em] uppercase border-b border-[#D4AF7A]/40 pb-1 hover:border-[#D4AF7A] transition-all duration-500"
              >
                Plan Your Event
                <span>→</span>
              </a>
            </div>

            <div className="md:col-span-6 md:col-start-7 space-y-0">
              {venues.map((v, i) => (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-baseline justify-between py-8 md:py-10 border-b border-[#FDFBF7]/15 hover:border-[#D4AF7A]/50 transition-colors duration-700 first:border-t"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="text-[#D4AF7A]/50 text-[10px] tracking-[0.2em] uppercase">
                      0{i + 1}
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-light text-[#FDFBF7] group-hover:text-[#D4AF7A] transition-colors duration-500">
                      {v.name}
                    </h3>
                  </div>
                  <span className="text-[#FDFBF7]/50 text-sm tracking-wider">
                    {v.size}
                  </span>
                </motion.div>
              ))}

              <div className="mt-12 flex items-end justify-between pt-6">
                <p className="text-[#FDFBF7]/40 text-[11px] tracking-[0.3em] uppercase">
                  Total Event Area
                </p>
                <p className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-[#D4AF7A] font-light">
                  38,166<span className="text-sm text-[#FDFBF7]/50 ml-2">sqft</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── GALLERY ─── */}
      <Section id="gallery" className="py-32 md:py-48 bg-[#FDFBF7]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-6">
              <p className="text-[#8A6D3B] text-[11px] tracking-[0.3em] uppercase mb-6">
                § 05 &nbsp;·&nbsp; The Gallery
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-light leading-[0.95] text-[#1a1a1a]">
                A visual
                <br />
                <span className="italic text-[#8A6D3B]">index</span>.
              </h2>
            </div>
          </div>

          {/* editorial grid layout */}
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {[
              { span: "col-span-12 md:col-span-8", aspect: "aspect-[16/9]", label: "Palace Elevation", tone: "warm" },
              { span: "col-span-6 md:col-span-4", aspect: "aspect-[4/5]", label: "Plunge Villa", tone: "sage" },
              { span: "col-span-6 md:col-span-4", aspect: "aspect-square", label: "Courtyard", tone: "sage" },
              { span: "col-span-6 md:col-span-4", aspect: "aspect-square", label: "Spa Lobby", tone: "warm" },
              { span: "col-span-12 md:col-span-4", aspect: "aspect-square", label: "Alfresco", tone: "cream" },
              { span: "col-span-6 md:col-span-6", aspect: "aspect-[3/2]", label: "Function Lawn", tone: "cream" },
              { span: "col-span-6 md:col-span-6", aspect: "aspect-[3/2]", label: "Star Deck", tone: "warm" },
            ].map((item, i) => {
              const tones = {
                warm: "bg-gradient-to-br from-[#E8DCC4] via-[#D4C5A9] to-[#C9B893]",
                sage: "bg-gradient-to-br from-[#D8DBC8] via-[#C4CAB3] to-[#B0B89C]",
                cream: "bg-gradient-to-br from-[#F0E8D4] via-[#E5DBC0] to-[#D8CBA8]",
              };
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.06 }}
                  className={`${item.span} group overflow-hidden relative`}
                >
                  <div className={`${item.aspect} relative ${tones[item.tone as keyof typeof tones]}`}>
                    <div
                      className="absolute inset-0 opacity-[0.12]"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5 Q20 15 10 25 M20 5 Q20 15 30 25' stroke='%238A6D3B' fill='none' stroke-width='0.4'/%3E%3C/svg%3E")`,
                        backgroundSize: "40px 40px",
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      }}
                    />

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[#1a1a1a]/60 text-[10px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <span>Fig. {String(i + 1).padStart(2, "0")}</span>
                      <span>{item.label}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 text-[#1a1a1a]/30 text-[10px] tracking-[0.3em] uppercase text-center">
            Placeholder swatches · Final imagery pending
          </div>
        </div>
      </Section>

      {/* ─── INQUIRY ─── */}
      <Section id="inquiry" className="py-32 md:py-48 bg-[#F5EFE4]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="text-[#8A6D3B] text-[11px] tracking-[0.3em] uppercase mb-6">
                § 06 &nbsp;·&nbsp; The Inquiry
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-light leading-[0.95] text-[#1a1a1a] mb-10">
                Begin
                <br />
                the <span className="italic text-[#8A6D3B]">conversation</span>.
              </h2>
              <p className="text-[#1a1a1a]/60 text-base leading-[1.9] font-light max-w-sm">
                Our concierge team responds to every inquiry personally. Share
                a few details and we&apos;ll craft a proposal tailored to your
                visit.
              </p>

              <div className="mt-14 space-y-5 text-sm">
                <div>
                  <p className="text-[#1a1a1a]/40 text-[10px] tracking-[0.2em] uppercase mb-1">
                    Email
                  </p>
                  <p className="text-[#1a1a1a]">
                    reservations@tajranthambhore.com
                  </p>
                </div>
                <div>
                  <p className="text-[#1a1a1a]/40 text-[10px] tracking-[0.2em] uppercase mb-1">
                    Telephone
                  </p>
                  <p className="text-[#1a1a1a]">+91 XXXXX XXXXX</p>
                </div>
                <div>
                  <p className="text-[#1a1a1a]/40 text-[10px] tracking-[0.2em] uppercase mb-1">
                    Location
                  </p>
                  <p className="text-[#1a1a1a]">
                    Sawai Madhopur, Rajasthan, India
                  </p>
                </div>
              </div>
            </div>

            <form className="md:col-span-6 md:col-start-7 space-y-8">
              {[
                { label: "Full Name", type: "text" },
                { label: "Email Address", type: "email" },
                { label: "Phone Number", type: "tel" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-[#1a1a1a]/50 text-[10px] tracking-[0.25em] uppercase mb-3">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-[#1a1a1a] text-base focus:border-[#1a1a1a] focus:outline-none transition-colors duration-500"
                  />
                </div>
              ))}

              <div>
                <label className="block text-[#1a1a1a]/50 text-[10px] tracking-[0.25em] uppercase mb-3">
                  Nature of Inquiry
                </label>
                <select className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-[#1a1a1a] text-base focus:border-[#1a1a1a] focus:outline-none transition-colors duration-500 appearance-none cursor-pointer">
                  <option>Luxury Stay</option>
                  <option>Destination Wedding</option>
                  <option>Corporate Retreat</option>
                  <option>Safari Package</option>
                </select>
              </div>

              <div>
                <label className="block text-[#1a1a1a]/50 text-[10px] tracking-[0.25em] uppercase mb-3">
                  Your Message
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-[#1a1a1a] text-base focus:border-[#1a1a1a] focus:outline-none transition-colors duration-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="group mt-8 flex items-center gap-4 text-[#1a1a1a] text-[11px] tracking-[0.3em] uppercase"
              >
                <span className="w-12 h-12 border border-[#1a1a1a]/30 rounded-full flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:text-[#FDFBF7] group-hover:border-[#1a1a1a] transition-all duration-500">
                  →
                </span>
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#FDFBF7] border-t border-[#1a1a1a]/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <h3 className="font-[family-name:var(--font-display)] text-4xl font-light text-[#1a1a1a] mb-2">
                Taj Ranthambhore
              </h3>
              <p className="text-[#8A6D3B] text-[10px] tracking-[0.4em] uppercase mb-6">
                Resort · Opening 2026
              </p>
              <p className="text-[#1a1a1a]/50 text-sm leading-[1.9] max-w-xs font-light">
                A palatial wilderness retreat at the edge of India&apos;s most
                celebrated tiger reserve.
              </p>
            </div>

            <div className="md:col-span-3 md:col-start-7">
              <p className="text-[#1a1a1a]/40 text-[10px] tracking-[0.25em] uppercase mb-6">
                Explore
              </p>
              <ul className="space-y-3 text-[#1a1a1a]/70 text-sm font-light">
                {["Story", "Rooms", "Experiences", "Events", "Gallery"].map(
                  (l) => (
                    <li key={l}>
                      <a
                        href={`#${l.toLowerCase()}`}
                        className="hover:text-[#8A6D3B] transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="md:col-span-3">
              <p className="text-[#1a1a1a]/40 text-[10px] tracking-[0.25em] uppercase mb-6">
                Connect
              </p>
              <ul className="space-y-3 text-[#1a1a1a]/70 text-sm font-light">
                <li>Instagram</li>
                <li>LinkedIn</li>
                <li>Newsletter</li>
              </ul>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-[#1a1a1a]/10 flex flex-col md:flex-row items-center justify-between gap-3 text-[#1a1a1a]/30 text-[10px] tracking-[0.2em] uppercase">
            <p>© 2026 Taj Ranthambhore Resort · IHCL</p>
            <p>Theme 03 · Modern Elegance</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
