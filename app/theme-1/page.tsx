"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Link from "next/link";

/* ───────────────────────── helpers ───────────────────────── */

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const handler = () => setY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return y;
}

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
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-2">
      <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold/40" />
      <svg width="12" height="12" viewBox="0 0 12 12" className="text-gold/60">
        <path
          d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z"
          fill="currentColor"
        />
      </svg>
      <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold/40" />
    </div>
  );
}

function ArchFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 400 40"
        className="absolute -top-8 left-1/2 -translate-x-1/2 w-64 text-gold/20"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 L0,20 Q200,-20 400,20 L400,40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      {children}
    </div>
  );
}

/* ───────────────────── accommodation data ───────────────────── */

const accommodations = [
  {
    title: "Palace Rooms",
    subtitle: "38 Keys",
    description:
      "Regal chambers within the main palace block, adorned with traditional Rajasthani motifs, handcrafted furniture, and views of the manicured central gardens.",
    details: ["45 sqmt Standard Rooms", "93 sqmt Suite Rooms", "G+3 Palace Block", "All Day Dining Access"],
    gradient: "from-[#2a1f0f] to-[#1a1510]",
  },
  {
    title: "Garden Villas",
    subtitle: "20 Keys",
    description:
      "Private two-storey villas nestled among curated gardens, each with a secluded courtyard, daybed, and ensuite bathrooms with bathtub and rainfall shower.",
    details: ["500 sqft per Room", "Private Courtyard", "Ground + First Floor", "King Bed & Daybed"],
    gradient: "from-[#1a2010] to-[#151810]",
  },
  {
    title: "Pool Villas",
    subtitle: "16 Keys",
    description:
      "Exclusive villas with private plunge pools and landscaped courtyards, offering an intimate sanctuary surrounded by the wilderness of Ranthambhore.",
    details: ["500 sqft per Room", "Private Plunge Pool", "Landscaped Courtyard", "Premium Amenities"],
    gradient: "from-[#10182a] to-[#0f1520]",
  },
  {
    title: "Presidential Suites",
    subtitle: "8 Keys",
    description:
      "The pinnacle of luxury — expansive 810 sqft suites with separate living rooms, private plunge pools, powder rooms, and panoramic balconies overlooking the resort.",
    details: ["810 sqft Suite Room", "Private Plunge Pool", "Living Room & Powder Room", "27ft Wide Balcony"],
    gradient: "from-[#2a1020] to-[#1a0f18]",
  },
];

const experiences = [
  {
    title: "Tiger Safari",
    description:
      "Venture into the legendary Ranthambhore Tiger Reserve with expert naturalists. Witness royal Bengal tigers, leopards, and over 300 species of birds in their natural habitat.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
  {
    title: "Jiva Spa & Wellness",
    description:
      "Surrender to ancient Indian wellness traditions in our subterranean spa sanctuary. Couple treatment rooms, relaxation chambers, and a world-class gymnasium.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
  {
    title: "Royal Dining",
    description:
      "From the all-day dining pavilion to the specialty restaurant and alfresco terrace, savour cuisines that celebrate Rajasthani heritage and global gastronomy.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
  {
    title: "Starlit Evenings",
    description:
      "Bonfire nights under the Rajasthani sky, machaan star-gazing decks, herb garden walks, and BBQ evenings — curated experiences that awaken the senses.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
];

const stats = [
  { number: "86", label: "Luxury Keys" },
  { number: "8.18", label: "Acres" },
  { number: "24,362", label: "Sqft Function Lawn" },
  { number: "5,846", label: "Sqft Grand Ballroom" },
];

/* ───────────────────────── main page ───────────────────────── */

export default function Theme1() {
  const scrollY = useScrollY();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const navOpaque = scrollY > 80;

  return (
    <div className="bg-ivory text-charcoal font-[family-name:var(--font-body)] overflow-x-hidden">
      {/* ─── NAVIGATION ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          navOpaque
            ? "bg-ivory/95 backdrop-blur-md shadow-[0_1px_0_0_#D4C5A940]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className={`text-xs tracking-[0.15em] uppercase transition-colors duration-500 ${
                navOpaque ? "text-charcoal/60" : "text-ivory/60"
              }`}
            >
              &larr; Themes
            </Link>

            <div className="flex flex-col items-center">
              <span
                className={`font-[family-name:var(--font-display)] text-2xl md:text-3xl font-light tracking-wide transition-colors duration-500 ${
                  navOpaque ? "text-gold-dark" : "text-ivory"
                }`}
              >
                Taj Ranthambhore
              </span>
              <span
                className={`text-[9px] tracking-[0.4em] uppercase transition-colors duration-500 ${
                  navOpaque ? "text-gold/60" : "text-ivory/50"
                }`}
              >
                Resort &amp; Spa
              </span>
            </div>

            <a
              href="#inquiry"
              className={`text-xs tracking-[0.15em] uppercase border px-4 py-2 transition-all duration-500 hover:bg-gold hover:text-ivory hover:border-gold ${
                navOpaque
                  ? "border-gold/40 text-gold"
                  : "border-ivory/30 text-ivory"
              }`}
            >
              Inquire
            </a>
          </div>
        </div>

        {/* ornamental bottom border */}
        {navOpaque && (
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0 bg-gradient-to-b from-charcoal via-[#2a1f10] to-[#1a1510]"
        >
          {/* decorative arch pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 10 Q60 50 30 80 M60 10 Q60 50 90 80' stroke='%23D4C5A9' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: "120px 120px",
            }}
          />
          {/* radial light */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#8B691415_0%,_transparent_70%)]" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroTextY }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          {/* top ornament */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <svg
              width="200"
              height="30"
              viewBox="0 0 200 30"
              className="text-gold/30"
            >
              <path
                d="M0,15 L70,15 M130,15 L200,15"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <path
                d="M85,2 Q100,15 115,2 M85,28 Q100,15 115,28"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
              />
              <circle cx="100" cy="15" r="2" fill="currentColor" />
            </svg>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gold/70 tracking-[0.4em] uppercase text-xs md:text-sm mb-6"
          >
            Ranthambhore, Rajasthan
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-display)] text-ivory"
          >
            <span className="block text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95]">
              Where Royalty
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] mt-2">
              Meets the{" "}
              <span className="text-gold italic font-normal">Wild</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-ivory/50 text-base md:text-lg max-w-xl mt-8 leading-relaxed"
          >
            A palatial sanctuary at the edge of India&apos;s most celebrated
            tiger reserve, where Rajasthani grandeur embraces untamed wilderness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex gap-6 mt-12"
          >
            <a
              href="#accommodations"
              className="group px-8 py-3.5 bg-gold text-ivory text-sm tracking-[0.2em] uppercase hover:bg-gold-dark transition-all duration-500 relative overflow-hidden"
            >
              <span className="relative z-10">Explore Rooms</span>
            </a>
            <a
              href="#story"
              className="px-8 py-3.5 border border-ivory/20 text-ivory/80 text-sm tracking-[0.2em] uppercase hover:border-gold/60 hover:text-gold transition-all duration-500"
            >
              Our Story
            </a>
          </motion.div>

          {/* bottom ornament */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12"
          >
            <div className="flex flex-col items-center gap-2 text-ivory/30">
              <span className="text-[10px] tracking-[0.3em] uppercase">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-[1px] h-8 bg-gradient-to-b from-gold/40 to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STORY / INTRODUCTION ─── */}
      <Section id="story" className="py-28 md:py-40 bg-ivory relative">
        {/* decorative corner */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-[0.06]">
          <svg viewBox="0 0 100 100" className="text-gold">
            <path
              d="M0,0 L100,0 L100,10 L10,10 L10,100 L0,100 Z"
              fill="currentColor"
            />
            <path d="M20,0 L20,80 L100,80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">
                The Legacy
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl text-charcoal font-light leading-[1.1] mb-8">
                A Forest Steeped{" "}
                <span className="italic text-gold">in History</span>
              </h2>
              <GoldDivider />
              <div className="space-y-6 mt-8 text-charcoal/70 leading-relaxed">
                <p>
                  The Ranthambhore forest, named after the legendary
                  Ranthambhore Fort perched in the heart of the jungle, bears
                  witness to centuries of imperial grandeur. Before India&apos;s
                  independence, this vast wilderness served as the exclusive
                  hunting ground for the royal Maharajahs of Jaipur.
                </p>
                <p>
                  Today, where kings once rode on elephants, tigers roam free.
                  The forest has reclaimed its ancient monuments, and the same
                  wilderness that inspired awe in emperors now offers an
                  unparalleled setting for a resort that seamlessly blends regal
                  Rajasthani architecture with the raw beauty of nature.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-12">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-gold font-light">
                      {stat.number}
                    </p>
                    <p className="text-charcoal/50 text-xs tracking-[0.15em] uppercase mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* ornamental arch frame */}
              <div className="absolute -inset-4 border border-gold/10" />
              <div className="absolute -inset-8 border border-gold/5" />
              <div className="aspect-[3/4] bg-gradient-to-br from-[#2a1f10] via-[#3a2a18] to-[#1a1510] relative overflow-hidden">
                {/* placeholder pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q30 25 15 40 M30 5 Q30 25 45 40' stroke='%23D4C5A9' fill='none' stroke-width='0.5'/%3E%3Ccircle cx='30' cy='5' r='1.5' fill='%23D4C5A9'/%3E%3C/svg%3E")`,
                    backgroundSize: "60px 60px",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1510] via-transparent to-transparent" />

                <div className="absolute bottom-8 left-8 right-8 text-ivory/80">
                  <p className="font-[family-name:var(--font-display)] text-2xl italic">
                    &quot;Majestic courtyards adorned with intricately carved
                    jharokhas, elegant domes, and sweeping verandas that open up
                    to panoramic views of the forest.&quot;
                  </p>
                  <div className="h-[1px] w-16 bg-gold/30 mt-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── ACCOMMODATIONS ─── */}
      <Section
        id="accommodations"
        className="py-28 md:py-40 bg-charcoal text-ivory relative"
      >
        {/* background pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='80' height='80' fill='none' stroke='%23D4C5A9' stroke-width='0.3'/%3E%3Cline x1='0' y1='0' x2='80' y2='80' stroke='%23D4C5A9' stroke-width='0.2'/%3E%3Cline x1='80' y1='0' x2='0' y2='80' stroke='%23D4C5A9' stroke-width='0.2'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="text-gold/70 tracking-[0.3em] uppercase text-xs mb-4">
              Accommodations
            </p>
            <ArchFrame>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light">
                Your Royal{" "}
                <span className="italic text-gold">Retreat</span>
              </h2>
            </ArchFrame>
            <p className="text-ivory/50 max-w-2xl mx-auto mt-6 leading-relaxed">
              From palatial chambers in the main palace block to secluded villas
              with private plunge pools — 86 keys of uncompromising luxury.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {accommodations.map((room, i) => (
              <motion.div
                key={room.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative"
              >
                <div
                  className={`bg-gradient-to-br ${room.gradient} border border-gold/10 hover:border-gold/30 transition-all duration-700 p-8 md:p-10 min-h-[360px] flex flex-col justify-between`}
                >
                  {/* room number ornament */}
                  <div className="absolute top-6 right-6 font-[family-name:var(--font-display)] text-6xl text-gold/5 font-light">
                    0{i + 1}
                  </div>

                  <div>
                    <p className="text-gold/60 text-xs tracking-[0.2em] uppercase mb-3">
                      {room.subtitle}
                    </p>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-ivory font-light mb-4 group-hover:text-gold transition-colors duration-500">
                      {room.title}
                    </h3>
                    <p className="text-ivory/50 leading-relaxed text-sm">
                      {room.description}
                    </p>
                  </div>

                  <div className="mt-8">
                    <div className="h-[1px] bg-gold/10 mb-6" />
                    <div className="grid grid-cols-2 gap-3">
                      {room.details.map((detail) => (
                        <div
                          key={detail}
                          className="flex items-center gap-2 text-ivory/40 text-xs"
                        >
                          <div className="w-1 h-1 bg-gold/40 rotate-45 shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── EXPERIENCES ─── */}
      <Section id="experiences" className="py-28 md:py-40 bg-cream relative">
        {/* decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">
              Curated Experiences
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl text-charcoal font-light">
              Awaken Your{" "}
              <span className="italic text-gold">Senses</span>
            </h2>
            <p className="text-charcoal/50 max-w-2xl mx-auto mt-6 leading-relaxed">
              From the thrill of a tiger safari to the serenity of a spa ritual,
              every moment is thoughtfully crafted.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group bg-ivory border border-gold/10 hover:border-gold/30 p-8 md:p-10 transition-all duration-700 hover:shadow-[0_8px_40px_-12px_rgba(139,105,20,0.15)]"
              >
                <div className="flex items-start gap-6">
                  <div className="shrink-0 w-12 h-12 border border-gold/20 flex items-center justify-center group-hover:bg-gold/5 transition-colors duration-500">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      className="text-gold"
                    >
                      <path
                        d="M10 1L12.5 7.5L19 10L12.5 12.5L10 19L7.5 12.5L1 10L7.5 7.5Z"
                        fill="currentColor"
                        opacity="0.6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl text-charcoal mb-3 group-hover:text-gold-dark transition-colors duration-500">
                      {exp.title}
                    </h3>
                    <p className="text-charcoal/60 leading-relaxed text-sm">
                      {exp.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-gold text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <span>Discover</span>
                      <span>&rarr;</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* additional activities strip */}
          <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 text-charcoal/40 text-xs tracking-[0.2em] uppercase">
            {[
              "Adventure Climbing",
              "Herb Garden",
              "BBQ Nights",
              "Kids Club",
              "Pool Deck",
              "Bar & Lounge",
            ].map((activity) => (
              <span key={activity} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gold/40 rotate-45" />
                {activity}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── WEDDINGS & EVENTS ─── */}
      <Section id="events" className="py-28 md:py-40 bg-charcoal text-ivory relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#8B691410_0%,_transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              <p className="text-gold/70 tracking-[0.3em] uppercase text-xs mb-4">
                Celebrations
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-8">
                Grand Occasions,{" "}
                <span className="italic text-gold">Timeless Memories</span>
              </h2>
              <GoldDivider />
              <p className="text-ivory/50 leading-relaxed mt-8">
                Imagine exchanging vows under the Rajasthani sky, with the
                silhouette of ancient fort walls as your backdrop. Our venues
                transform every celebration into a royal affair — from intimate
                gatherings to grand destination weddings.
              </p>

              <div className="space-y-6 mt-12">
                {[
                  {
                    name: "The Grand Function Lawn",
                    size: "24,362 sqft",
                    desc: "An expansive open-air venue framed by palatial architecture",
                  },
                  {
                    name: "The Royal Ballroom",
                    size: "5,846 sqft",
                    desc: "Climate-controlled elegance for indoor celebrations",
                  },
                  {
                    name: "The Event Lawn",
                    size: "5,704 sqft",
                    desc: "Intimate garden setting for pre-wedding & private events",
                  },
                  {
                    name: "The Banquet Collonade",
                    size: "2,254 sqft",
                    desc: "Pre-function space with traditional arched walkways",
                  },
                ].map((venue) => (
                  <div
                    key={venue.name}
                    className="border-l-2 border-gold/20 pl-6 hover:border-gold/60 transition-colors duration-500"
                  >
                    <div className="flex items-baseline justify-between">
                      <h4 className="font-[family-name:var(--font-display)] text-xl text-ivory">
                        {venue.name}
                      </h4>
                      <span className="text-gold/60 text-xs tracking-wider">
                        {venue.size}
                      </span>
                    </div>
                    <p className="text-ivory/40 text-sm mt-1">{venue.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-[#2a1f10] via-[#1a1510] to-[#0f0d08] relative overflow-hidden border border-gold/10">
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 Q50 40 20 70 M50 0 Q50 40 80 70' stroke='%23D4C5A9' fill='none' stroke-width='0.4'/%3E%3Ccircle cx='50' cy='0' r='2' fill='%23D4C5A9'/%3E%3Cpath d='M0 50 Q40 50 70 20 M0 50 Q40 50 70 80' stroke='%23D4C5A9' fill='none' stroke-width='0.4'/%3E%3C/svg%3E")`,
                    backgroundSize: "100px 100px",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    className="text-gold/20 mb-8"
                  >
                    <path
                      d="M30 5 Q30 25 10 40 M30 5 Q30 25 50 40 M10 40 L50 40"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="1"
                    />
                    <circle cx="30" cy="5" r="3" fill="currentColor" />
                  </svg>
                  <p className="font-[family-name:var(--font-accent)] text-xl md:text-2xl text-ivory/60 italic leading-relaxed">
                    &quot;A resort that seamlessly blends the regal grandeur of
                    Rajasthani architecture with the wild, unspoiled beauty of
                    Ranthambhore&quot;
                  </p>
                  <div className="mt-8 h-[1px] w-24 bg-gold/20" />
                </div>
              </div>
              {/* floating stat */}
              <div className="absolute -bottom-6 -left-6 bg-gold p-6 text-ivory">
                <p className="font-[family-name:var(--font-display)] text-3xl font-light">
                  30,000+
                </p>
                <p className="text-ivory/70 text-xs tracking-wider uppercase mt-1">
                  Sqft of Event Space
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── GALLERY ─── */}
      <Section id="gallery" className="py-28 md:py-40 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">
              Visual Journey
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl text-charcoal font-light">
              A Glimpse of{" "}
              <span className="italic text-gold">Paradise</span>
            </h2>
          </div>

          {/* masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { span: "col-span-2 row-span-2", aspect: "aspect-square", label: "Palace Entrance" },
              { span: "", aspect: "aspect-square", label: "Pool Deck" },
              { span: "", aspect: "aspect-square", label: "Rajasthani Arch" },
              { span: "", aspect: "aspect-[4/3]", label: "Tiger Safari" },
              { span: "", aspect: "aspect-[4/3]", label: "Spa Sanctuary" },
              { span: "col-span-2", aspect: "aspect-[21/9]", label: "Function Lawn Panorama" },
              { span: "", aspect: "aspect-square", label: "Villa Courtyard" },
              { span: "", aspect: "aspect-square", label: "Alfresco Dining" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`${item.span} group cursor-pointer overflow-hidden relative`}
              >
                <div
                  className={`${item.aspect} bg-gradient-to-br from-sandstone/40 to-gold-light/20 relative`}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5 Q20 15 10 25 M20 5 Q20 15 30 25' stroke='%238B6914' fill='none' stroke-width='0.3'/%3E%3C/svg%3E")`,
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-all duration-700 flex items-center justify-center">
                    <span className="text-ivory text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      {item.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 text-charcoal/40 text-xs">
            Placeholder grid — final imagery from resort renders &amp; photography will replace these
          </div>
        </div>
      </Section>

      {/* ─── INQUIRY CTA ─── */}
      <Section
        id="inquiry"
        className="py-28 md:py-40 bg-gradient-to-b from-[#1a1510] to-charcoal text-ivory relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#8B691410_0%,_transparent_60%)]" />

        <div className="relative max-w-3xl mx-auto px-6 md:px-12 text-center">
          {/* arch ornament */}
          <svg
            width="120"
            height="60"
            viewBox="0 0 120 60"
            className="text-gold/20 mx-auto mb-12"
          >
            <path
              d="M0,60 L0,30 Q60,-10 120,30 L120,60"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <path
              d="M10,60 L10,35 Q60,0 110,35 L110,60"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
            />
            <circle cx="60" cy="12" r="2" fill="currentColor" />
          </svg>

          <p className="text-gold/70 tracking-[0.3em] uppercase text-xs mb-6">
            Begin Your Journey
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6">
            Reserve Your{" "}
            <span className="italic text-gold">Royal Escape</span>
          </h2>
          <p className="text-ivory/50 max-w-lg mx-auto mb-12 leading-relaxed">
            Whether planning a weekend retreat, a destination wedding, or a
            corporate gathering, our concierge team is ready to craft your
            perfect experience.
          </p>

          <form className="max-w-xl mx-auto space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-ivory/5 border border-gold/20 px-5 py-3.5 text-ivory text-sm placeholder:text-ivory/30 focus:border-gold/60 focus:outline-none transition-colors duration-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-ivory/5 border border-gold/20 px-5 py-3.5 text-ivory text-sm placeholder:text-ivory/30 focus:border-gold/60 focus:outline-none transition-colors duration-500"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full bg-ivory/5 border border-gold/20 px-5 py-3.5 text-ivory text-sm placeholder:text-ivory/30 focus:border-gold/60 focus:outline-none transition-colors duration-500"
              />
              <select className="w-full bg-ivory/5 border border-gold/20 px-5 py-3.5 text-ivory/30 text-sm focus:border-gold/60 focus:outline-none transition-colors duration-500 appearance-none">
                <option value="">Interest</option>
                <option value="stay">Luxury Stay</option>
                <option value="wedding">Destination Wedding</option>
                <option value="event">Corporate Event</option>
                <option value="safari">Safari Package</option>
              </select>
            </div>
            <textarea
              rows={4}
              placeholder="Tell us about your plans..."
              className="w-full bg-ivory/5 border border-gold/20 px-5 py-3.5 text-ivory text-sm placeholder:text-ivory/30 focus:border-gold/60 focus:outline-none transition-colors duration-500 resize-none"
            />
            <button
              type="submit"
              className="w-full bg-gold text-ivory py-4 text-sm tracking-[0.3em] uppercase hover:bg-gold-dark transition-all duration-500"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-charcoal text-ivory border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <h3 className="font-[family-name:var(--font-display)] text-3xl font-light mb-2">
                Taj Ranthambhore
              </h3>
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold/50 mb-6">
                Resort &amp; Spa
              </p>
              <p className="text-ivory/40 text-sm leading-relaxed max-w-sm">
                Near Ranthambhore Tiger Reserve, Sawai Madhopur, Rajasthan,
                India. A Taj Hotels &amp; IHCL property.
              </p>
            </div>

            <div>
              <p className="text-gold/60 text-xs tracking-[0.2em] uppercase mb-6">
                Quick Links
              </p>
              <ul className="space-y-3 text-ivory/40 text-sm">
                {[
                  "Accommodations",
                  "Experiences",
                  "Weddings",
                  "Gallery",
                  "Contact",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="hover:text-gold transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-gold/60 text-xs tracking-[0.2em] uppercase mb-6">
                Contact
              </p>
              <div className="space-y-3 text-ivory/40 text-sm">
                <p>reservations@tajranthambhore.com</p>
                <p>+91 XXXXX XXXXX</p>
                <div className="flex gap-4 mt-6">
                  {["Instagram", "Facebook", "Twitter"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-ivory/30 hover:text-gold text-xs tracking-wider uppercase transition-colors duration-300"
                    >
                      {social.slice(0, 2)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gold/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-ivory/20 text-xs">
              &copy; 2026 Taj Ranthambhore Resort. All rights reserved.
            </p>
            <p className="text-ivory/20 text-xs">
              Design Concept — Theme 1: Royal Heritage
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
