"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────── helpers ─────────────────── */

function useScrolledPast(threshold: number) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    let frame = 0;
    const handler = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setPast(window.scrollY > threshold);
      });
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      window.removeEventListener("scroll", handler);
      cancelAnimationFrame(frame);
    };
  }, [threshold]);
  return past;
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

function GoldDivider({ center = false }: { center?: boolean }) {
  return (
    <div
      className={`flex items-center gap-4 my-2 ${
        center ? "justify-center" : ""
      }`}
    >
      <div className="h-[1px] w-16 bg-gradient-to-r from-gold/40 to-transparent" />
      <svg width="12" height="12" viewBox="0 0 12 12" className="text-gold/60" aria-hidden="true">
        <path
          d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z"
          fill="currentColor"
        />
      </svg>
      <div className="h-[1px] w-16 bg-gradient-to-l from-gold/40 to-transparent" />
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
        aria-hidden="true"
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

/* ─────────────────── data ─────────────────── */

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Vision & Values", href: "#values" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Leadership", href: "#leadership" },
  { label: "Our Group", href: "#group" },
  { label: "Media", href: "#media" },
  { label: "Contact", href: "#contact" },
];

const groupStats = [
  { number: "88", label: "Keys Under Development" },
  { number: "05", label: "Cities Across Rajasthan" },
  { number: "01", label: "Flagship · Taj Partnership" },
  { number: "06", label: "Guiding Values" },
];

const values = [
  {
    title: "Guest-first thinking",
    desc: "Every decision should improve comfort, service quality, and the emotional experience of the guest.",
  },
  {
    title: "Sense of place",
    desc: "Each development should reflect its location, culture, landscape, and local story rather than feel generic.",
  },
  {
    title: "Design with purpose",
    desc: "Architecture, interiors, and landscape should be beautiful, efficient, and commercially sensible.",
  },
  {
    title: "Partnership-led growth",
    desc: "AHPL grows through strong alignment with hospitality brands, consultants, operators, and local stakeholders.",
  },
  {
    title: "Long-term stewardship",
    desc: "Assets are built for durability, operational efficiency, and long-term value creation.",
  },
  {
    title: "Responsible development",
    desc: "We respect local ecology, community, and heritage while creating employment and economic value.",
  },
];

const portfolio = {
  flagship: {
    name: "Taj Ranthambore",
    location: "Sawai Madhopur, Rajasthan",
    category: "Heritage · Wildlife Luxury",
    meta: "88 Keys · Taj-Branded",
    status: "Under Construction",
    desc: "An 88-key Taj-branded resort under construction near one of India's most iconic wildlife destinations — envisioned as a refined destination stay that combines nature, comfort, and timeless hospitality.",
    image: "/effaro/aerial-render.jpg",
  },
  upcoming: [
    {
      city: "Udaipur",
      character: "Lake-City Quarter",
      tag: "Upcoming Destination 01",
      desc: "A converted land parcel in Rajasthan's storied lake city — earmarked for a leisure-led hospitality development.",
      image: "/effaro/palace-block.jpg",
    },
    {
      city: "Jawai",
      character: "Wilderness Frontier",
      tag: "Upcoming Destination 02",
      desc: "A converted parcel on the edge of leopard country — a future wilderness retreat in advanced site evaluation.",
      image: "/effaro/ranthambhore-landscape.jpg",
    },
    {
      city: "Pushkar",
      character: "Sacred Heart of Rajasthan",
      tag: "Upcoming Destination 03",
      desc: "A converted parcel near the ghats and fairgrounds — earmarked for a culture- and pilgrimage-led destination stay.",
      image: "/effaro/garden-pavilion.jpg",
    },
    {
      city: "Jaipur",
      character: "Capital Estate I",
      tag: "Upcoming Destination 04",
      desc: "A converted parcel in the Pink City — the first of two Jaipur land holdings being readied for hospitality development.",
      image: "/effaro/palace-courtyard.jpg",
    },
    {
      city: "Jaipur",
      character: "Capital Estate II",
      tag: "Upcoming Destination 05",
      desc: "The second Jaipur parcel — held in reserve for a future destination project as the platform expands.",
      image: "/effaro/twilight-villas.jpg",
    },
  ],
};

const leadership = [
  {
    name: "Mr. Abhishek Singh",
    role: "Chairman",
    image: "/director-abhishek.jpg",
    initials: "AS",
    bio: [
      "Mr. Abhishek Singh is one of the driving forces behind AHPL, steering the platform's hospitality ambition with a long-term, asset-backed mindset. He brings deep entrepreneurial discipline drawn from a family ecosystem with three decades of experience across commodities, real estate development and project execution.",
      "A forward-looking operator, Mr. Abhishek travels widely — from heritage hotels in Europe to boutique resorts across South-East Asia — keeping AHPL aligned with global standards in design, guest experience and operational excellence.",
      "Under his guidance, AHPL is shaping a new generation of destination-led hospitality assets across Rajasthan, beginning with the Taj-branded resort in Ranthambore.",
    ],
  },
  {
    name: "Mr. Vibhishek Singh",
    role: "Chairman",
    image: "/director-vibhishek.jpg",
    initials: "VS",
    bio: [
      "Mr. Vibhishek Singh anchors AHPL's market-facing strategy and stakeholder relationships. He is a commerce graduate from the University of Mumbai and brings a sharp marketing mind to every conversation around brand, partnership and community.",
      "He believes in empowering the regions where AHPL operates — designing developments that bring measurable change to the lives and livelihoods of communities surrounding each property.",
      "His thinking has helped position AHPL as a credible, modern hospitality platform — capable of partnering with global brands while staying rooted in Rajasthan's character.",
    ],
  },
  {
    name: "Mr. Raunak Singh",
    role: "Director",
    image: null,
    initials: "RS",
    bio: [
      "Mr. Raunak Singh joins the AHPL board with a focus on execution rigour and the next generation of platform growth. He plays a central role in evaluating sites, partners and operating frameworks across the AHPL pipeline.",
      "His remit cuts across project planning, brand alignment and the disciplined development of AHPL's converted land parcels into a portfolio of destination-led hospitality assets.",
      "Together with the chairmen, he is helping shape AHPL into a hospitality business that is asset-backed, guest-first and institutionally scalable.",
    ],
  },
];

/* ─────────────────── page ─────────────────── */

export default function Home() {
  const navOpaque = useScrolledPast(80);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="bg-ivory text-charcoal font-[family-name:var(--font-body)] overflow-x-hidden">
      {/* ─── NAV ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          navOpaque
            ? "bg-ivory/95 backdrop-blur-md shadow-[0_1px_0_0_#D4C5A940]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex flex-col leading-tight">
              <span
                className={`font-[family-name:var(--font-display)] text-2xl tracking-[0.25em] transition-colors duration-500 ${
                  navOpaque ? "text-gold-dark" : "text-ivory"
                }`}
              >
                AHPL
              </span>
              <span
                className={`text-[8px] tracking-[0.4em] uppercase transition-colors duration-500 mt-0.5 ${
                  navOpaque ? "text-gold/70" : "text-ivory/55"
                }`}
              >
                Hospitality
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.slice(0, -1).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-[11px] tracking-[0.2em] uppercase transition-colors duration-500 ${
                    navOpaque
                      ? "text-charcoal/60 hover:text-gold-dark"
                      : "text-ivory/70 hover:text-gold"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="#contact"
              className={`text-[11px] tracking-[0.2em] uppercase border px-4 py-2.5 transition-all duration-500 hover:bg-gold hover:text-ivory hover:border-gold ${
                navOpaque
                  ? "border-gold/40 text-gold"
                  : "border-ivory/30 text-ivory"
              }`}
            >
              Contact
            </a>
          </div>
        </div>
        {navOpaque && (
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative h-screen min-h-[720px] overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image
            src="/effaro/hero-palace.jpg"
            alt="AHPL flagship — Taj Ranthambore arrival court"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          {/* Layered overlays for legibility against bright facade */}
          <div className="absolute inset-0 bg-charcoal/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,21,16,0.35)_0%,_rgba(26,21,16,0.85)_85%)]" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroTextY }}
          className="relative z-10 h-full flex flex-col px-6 pt-28 md:pt-24 pb-10"
        >
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              className="mb-6 md:mb-8"
            >
              <p className="font-[family-name:var(--font-display)] text-ivory text-5xl md:text-6xl tracking-[0.3em] font-light text-shadow-mark">
                AHPL
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="h-[1px] w-10 bg-gold-soft/60" aria-hidden="true" />
              <span className="text-gold-soft tracking-[0.45em] uppercase text-[10px] md:text-xs font-medium">
                You belong here
              </span>
              <span className="h-[1px] w-10 bg-gold-soft/60" aria-hidden="true" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-display)] text-ivory max-w-5xl text-shadow-hero"
            >
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-light leading-[1.05] tracking-tight">
                Shaping India&apos;s next
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-light leading-[1.05] tracking-tight mt-1.5">
                generation of{" "}
                <span className="italic font-normal text-gold-soft text-shadow-glow-gold">
                  hospitality
                </span>
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-light leading-[1.05] tracking-tight mt-1.5">
                destinations.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-ivory/80 text-sm md:text-base max-w-2xl mt-7 md:mt-9 leading-relaxed font-light text-shadow-body"
            >
              AHPL is building a portfolio of thoughtfully designed hospitality
              assets across Rajasthan — beginning with a Taj-branded resort in
              Ranthambore and a pipeline of converted land parcels across five
              cities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 md:gap-5 mt-9 md:mt-11"
            >
              <a
                href="#portfolio"
                className="group px-8 py-3.5 bg-gold-mid text-charcoal text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-gold-soft transition-all duration-500 inline-flex items-center gap-3"
              >
                <span>Explore Portfolio</span>
                <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
              <a
                href="#about"
                className="px-8 py-3.5 border border-ivory/30 text-ivory text-[11px] tracking-[0.3em] uppercase hover:border-gold-soft hover:text-gold-soft transition-all duration-500"
              >
                About AHPL
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="shrink-0 mt-10 md:mt-12"
          >
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-12 border-t border-gold-soft/20 pt-6 md:pt-8">
              {groupStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-[family-name:var(--font-display)] text-2xl md:text-4xl text-gold-soft font-light">
                    {stat.number}
                  </p>
                  <p className="text-ivory/55 text-[9px] md:text-xs tracking-[0.3em] uppercase mt-1.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── ANNOUNCEMENT BAR ─── */}
      <div className="bg-charcoal text-ivory border-y border-gold/15">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] tracking-[0.25em] uppercase">
          <div className="flex items-center gap-3 text-gold-soft">
            <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full bg-gold-soft animate-pulse" />
            <span>Now Building</span>
            <span className="text-ivory/55">&middot;</span>
            <span className="text-ivory/80">Taj Ranthambore</span>
            <span aria-hidden="true" className="text-ivory/30 hidden md:inline">|</span>
            <span className="text-ivory/45 hidden md:inline">88 Keys &middot; Wildlife Luxury</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="#portfolio"
              className="text-ivory/55 hover:text-gold-soft transition-colors hidden md:inline-flex items-center gap-2"
            >
              See in Portfolio
            </a>
            <a
              href="#contact"
              className="text-gold-soft hover:text-ivory transition-colors flex items-center gap-2 border-b border-gold-soft/40 pb-0.5"
            >
              Make an Early Enquiry
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <Section id="about" className="py-28 md:py-40 bg-ivory relative overflow-hidden">
        <div className="absolute top-12 right-12 w-40 h-40 opacity-[0.05] hidden md:block" aria-hidden="true">
          <svg viewBox="0 0 100 100" className="text-gold">
            <path
              d="M50,5 Q90,30 90,70 L50,95 L10,70 Q10,30 50,5 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
            />
            <path
              d="M50,15 Q80,35 80,68 L50,85 L20,68 Q20,35 50,15 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header strip */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end mb-16 md:mb-20">
            <div className="md:col-span-5">
              <p className="text-gold tracking-[0.35em] uppercase text-xs mb-5 flex items-center gap-3">
                <span className="h-[1px] w-8 bg-gold/50" />
                <span>About AHPL</span>
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-[58px] text-charcoal font-light leading-[1.05] tracking-tight">
                A hospitality platform{" "}
                <span className="italic text-gold-dark">rooted</span> in
                Rajasthan.
              </h2>
            </div>
            <div className="md:col-span-7 md:pl-8 md:border-l md:border-gold/15">
              <p className="text-charcoal/70 text-base md:text-lg leading-relaxed font-light">
                AHPL is a Rajasthan-based hospitality development company
                creating destination-led hotels and resorts across high-potential
                travel markets. With its flagship Taj Ranthambore resort under
                construction and converted land parcels across five cities, we
                are focused on building a premium hospitality portfolio rooted
                in design, guest experience and long-term asset value.
              </p>
            </div>
          </div>

          {/* Body — balanced two column */}
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            {/* LEFT — Image montage */}
            <div className="md:col-span-5 space-y-6">
              <div className="relative">
                <div className="absolute -inset-3 border border-gold/20" />
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/effaro/palace-courtyard.jpg"
                    alt="Taj Ranthambore — palace courtyard render"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src="/effaro/ranthambhore-landscape.jpg"
                    alt="Ranthambore landscape"
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src="/effaro/twilight-villas.jpg"
                    alt="Garden villas at twilight"
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Caption strip */}
              <div className="flex items-start gap-3 pt-3 text-[10px] tracking-[0.3em] uppercase text-charcoal/55">
                <span className="text-gold mt-0.5">/</span>
                <span>
                  Renders &mdash; Taj Ranthambore <br />
                  Sawai Madhopur, Rajasthan
                </span>
              </div>
            </div>

            {/* RIGHT — Story + signature */}
            <div className="md:col-span-7 flex flex-col">
              <div className="space-y-6 text-charcoal/75 leading-relaxed font-light">
                <p>
                  AHPL was created with a clear ambition: to build a hospitality
                  platform that reflects the richness of Rajasthan while meeting
                  the expectations of the modern luxury traveller. The approach
                  combines land ownership, development capability, brand
                  partnerships and a long-term asset-management mindset.
                </p>
                <p>
                  Our first flagship is a Taj-branded resort in Ranthambore —
                  one of India&apos;s most sought-after wildlife and leisure
                  destinations — currently under construction and envisioned as
                  a destination stay that brings together nature, comfort,
                  design and the cultural depth of Rajasthan.
                </p>
                <p>
                  Beyond Ranthambore, AHPL has assembled converted land parcels
                  across five cities in Rajasthan, giving the company a strong
                  foundation to create a future portfolio of hospitality assets
                  in carefully selected leisure and destination markets.
                </p>
              </div>

              {/* Metadata grid */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 py-8 border-y border-gold/15">
                {[
                  { k: "Headquartered", v: "Rajasthan" },
                  { k: "Flagship Brand", v: "Taj" },
                  { k: "Keys Underway", v: "88" },
                  { k: "Land Pipeline", v: "5 Cities" },
                ].map((item) => (
                  <div key={item.k}>
                    <p className="text-[9px] tracking-[0.3em] uppercase text-charcoal/45 mb-2">
                      {item.k}
                    </p>
                    <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-gold-dark font-light">
                      {item.v}
                    </p>
                  </div>
                ))}
              </div>

              {/* Signature block */}
              <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-charcoal/45 mb-2">
                    Led by
                  </p>
                  <p className="font-[family-name:var(--font-display)] text-lg md:text-xl text-charcoal font-light">
                    Mr. Abhishek Singh &middot; Mr. Vibhishek Singh &middot;{" "}
                    Mr. Raunak Singh
                  </p>
                </div>
                <a
                  href="#leadership"
                  className="shrink-0 group inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-gold hover:text-gold-dark border-b border-gold/40 pb-1 transition-colors"
                >
                  <span>Meet the Board</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-500">
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Promise strip — full width */}
          <div className="mt-20 md:mt-28 border-t border-gold/15 pt-10 md:pt-14 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-2 flex md:flex-col items-start gap-3">
              <svg
                viewBox="0 0 60 80"
                className="w-10 h-12 text-gold/50"
                aria-hidden="true"
              >
                <path
                  d="M5,75 L5,30 Q5,5 30,5 Q55,5 55,30 L55,75"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M12,75 L12,32 Q12,12 30,12 Q48,12 48,32 L48,75"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <path
                  d="M30,12 L30,5"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <circle cx="30" cy="3" r="1.5" fill="currentColor" />
              </svg>
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold/70">
                Our Promise
              </p>
            </div>
            <div className="md:col-span-7">
              <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl lg:text-4xl text-charcoal font-light leading-snug italic">
                &ldquo;Asset-backed, guest-first and institutionally scalable
                &mdash; a hospitality business built for the long term.&rdquo;
              </p>
            </div>
            <div className="md:col-span-3 text-right">
              <p className="text-[11px] tracking-[0.3em] uppercase text-charcoal/55">
                You belong here.
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70 mt-1">
                AHPL Hospitality
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── VISION & MISSION ─── */}
      <Section className="py-24 md:py-32 bg-charcoal text-ivory relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='80' height='80' fill='none' stroke='%23D4C5A9' stroke-width='0.3'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12 md:gap-20">
          {/* Vision — narrative */}
          <div className="md:col-span-7">
            <p className="text-gold-soft/80 tracking-[0.3em] uppercase text-xs mb-4 flex items-center gap-3">
              <span className="h-[1px] w-8 bg-gold-soft/40" aria-hidden="true" />
              <span>Vision</span>
            </p>
            <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-[52px] font-light leading-[1.1] tracking-tight">
              To become one of India&apos;s most{" "}
              <span className="italic text-gold-soft">trusted</span> hospitality
              development platforms.
            </h3>
            <GoldDivider />
            <p className="mt-6 text-ivory/70 leading-relaxed font-light max-w-xl">
              Creating landmark destinations that combine regional character,
              premium guest experience and long-term value — built once,
              stewarded for generations.
            </p>
          </div>

          {/* Mission — manifesto */}
          <div className="md:col-span-5 md:border-l md:border-gold/20 md:pl-12">
            <p className="text-gold-soft/80 tracking-[0.3em] uppercase text-xs mb-4 flex items-center gap-3">
              <span className="h-[1px] w-8 bg-gold-soft/40" aria-hidden="true" />
              <span>Mission</span>
            </p>
            <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-light italic text-ivory/90 leading-snug mb-10">
              To develop and manage{" "}
              <span className="text-gold-soft not-italic">high-quality</span>{" "}
              hospitality assets across India.
            </p>
            <ol className="space-y-5">
              {[
                {
                  n: "01",
                  k: "Site Selection",
                  v: "Locations chosen for cultural depth, accessibility and long-term demand.",
                },
                {
                  n: "02",
                  k: "Brand Partnerships",
                  v: "Aligning with the world's most respected hospitality names.",
                },
                {
                  n: "03",
                  k: "Disciplined Execution",
                  v: "On-time, on-spec delivery across every project we underwrite.",
                },
                {
                  n: "04",
                  k: "Sense of Belonging",
                  v: "Every guest experience designed to feel personal, considered and lasting.",
                },
              ].map((m) => (
                <li key={m.n} className="grid grid-cols-[44px_1fr] gap-4 items-start">
                  <span className="font-[family-name:var(--font-display)] text-gold-soft text-lg font-light pt-0.5">
                    {m.n}
                  </span>
                  <div>
                    <p className="text-ivory text-sm tracking-[0.15em] uppercase font-medium">
                      {m.k}
                    </p>
                    <p className="text-ivory/55 text-sm mt-1.5 leading-relaxed font-light">
                      {m.v}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ─── VALUES ─── */}
      <Section id="values" className="py-28 md:py-40 bg-cream relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">
              Our Values
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl text-charcoal font-light">
              Six principles that{" "}
              <span className="italic text-gold">guide us</span>
            </h2>
            <div className="flex justify-center mt-6">
              <GoldDivider center />
            </div>
            <p className="text-charcoal/55 max-w-2xl mx-auto mt-6 leading-relaxed">
              The values that shape every site we evaluate, every partnership we
              form, and every guest experience we design.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const isFeature = i === 0;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: (i % 3) * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`group p-8 md:p-10 transition-all duration-700 ${
                    isFeature
                      ? "bg-charcoal text-ivory border border-gold-soft/30 lg:col-span-2 lg:row-span-1 relative overflow-hidden"
                      : "bg-ivory border border-gold/15 hover:border-gold/40 hover:shadow-[0_8px_40px_-12px_rgba(139,105,20,0.18)]"
                  }`}
                >
                  {isFeature && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-[0.05] pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,80 L0,40 Q40,0 80,40 L80,80' fill='none' stroke='%23E5BE6A' stroke-width='0.4'/%3E%3C/svg%3E")`,
                      }}
                    />
                  )}
                  <div className="relative flex items-start gap-5">
                    <div
                      className={`shrink-0 w-11 h-11 border flex items-center justify-center transition-colors duration-500 ${
                        isFeature
                          ? "border-gold-soft/40 bg-gold-soft/5"
                          : "border-gold/25 group-hover:bg-gold/5"
                      }`}
                    >
                      <span
                        className={`font-[family-name:var(--font-display)] text-base ${
                          isFeature ? "text-gold-soft" : "text-gold"
                        }`}
                      >
                        0{i + 1}
                      </span>
                    </div>
                    <div className={isFeature ? "max-w-2xl" : ""}>
                      {isFeature && (
                        <p className="text-gold-soft/70 text-[10px] tracking-[0.4em] uppercase mb-3">
                          Defining Value
                        </p>
                      )}
                      <h3
                        className={`font-[family-name:var(--font-display)] mb-3 transition-colors duration-500 ${
                          isFeature
                            ? "text-3xl md:text-4xl text-ivory font-light"
                            : "text-xl md:text-2xl text-charcoal group-hover:text-gold-dark"
                        }`}
                      >
                        {v.title}
                      </h3>
                      <p
                        className={`leading-relaxed font-light ${
                          isFeature
                            ? "text-ivory/70 text-base md:text-lg"
                            : "text-charcoal/65 text-sm"
                        }`}
                      >
                        {v.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ─── PORTFOLIO ─── */}
      <Section
        id="portfolio"
        className="py-28 md:py-40 bg-charcoal text-ivory relative"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='80' height='80' fill='none' stroke='%23D4C5A9' stroke-width='0.3'/%3E%3Cline x1='0' y1='0' x2='80' y2='80' stroke='%23D4C5A9' stroke-width='0.2'/%3E%3Cline x1='80' y1='0' x2='0' y2='80' stroke='%23D4C5A9' stroke-width='0.2'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="text-gold/80 tracking-[0.3em] uppercase text-xs mb-4">
              The AHPL Portfolio
            </p>
            <ArchFrame>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light">
                One flagship.{" "}
                <span className="italic text-gold">Five</span> destinations
                ahead.
              </h2>
            </ArchFrame>
            <p className="text-ivory/55 max-w-2xl mx-auto mt-6 leading-relaxed">
              Our flagship Taj-branded resort in Ranthambore is under
              construction. A pipeline of converted land parcels across five
              Rajasthan cities is being readied for the next chapter.
            </p>
          </div>

          {/* Flagship */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <article className="block">
              <div className="grid md:grid-cols-5 gap-0 bg-gradient-to-br from-[#2a1f10] to-[#1a1510] border border-gold/25 overflow-hidden">
                <div className="md:col-span-2 aspect-[4/3] md:aspect-auto relative overflow-hidden">
                  <Image
                    src={portfolio.flagship.image}
                    alt={portfolio.flagship.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/15 to-charcoal/35" />
                  <div className="absolute top-6 left-6">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-gold-soft bg-charcoal/70 backdrop-blur px-3 py-1.5 border border-gold-soft/30">
                      {portfolio.flagship.status}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-[family-name:var(--font-display)] text-3xl italic text-ivory">
                      Flagship
                    </p>
                  </div>
                </div>

                <div className="md:col-span-3 p-10 md:p-14 flex flex-col justify-between">
                  <div>
                    <p className="text-gold-soft text-xs tracking-[0.3em] uppercase mb-3">
                      {portfolio.flagship.category}
                    </p>
                    <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-ivory font-light mb-3">
                      {portfolio.flagship.name}
                    </h3>
                    <p className="text-ivory/45 text-sm tracking-[0.15em] uppercase mb-6">
                      {portfolio.flagship.location} &middot;{" "}
                      {portfolio.flagship.meta}
                    </p>
                    <p className="text-ivory/65 leading-relaxed">
                      {portfolio.flagship.desc}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center gap-3 text-gold-soft text-xs tracking-[0.3em] uppercase">
                    <span>Dedicated property page coming soon</span>
                  </div>
                </div>
              </div>
            </article>
          </motion.div>

          {/* Upcoming Destinations */}
          <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-gold/70 tracking-[0.3em] uppercase text-[11px] mb-2">
                Pipeline
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-light text-ivory">
                Upcoming Hospitality Destinations
              </h3>
            </div>
            <p className="text-ivory/45 text-[11px] tracking-[0.25em] uppercase">
              Land Converted &middot; Across Rajasthan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.upcoming.map((p, i) => (
              <motion.article
                key={p.tag}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="border border-gold/20 hover:border-gold/40 bg-charcoal/40 transition-all duration-700 overflow-hidden group"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <Image
                    src={p.image}
                    alt={`${p.city} — upcoming destination`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-45 group-hover:opacity-60 transition-opacity duration-700"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/65 to-charcoal/30" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                    <p className="text-gold-soft/80 text-[10px] tracking-[0.4em] uppercase mb-3">
                      {p.tag}
                    </p>
                    <p className="font-[family-name:var(--font-display)] text-4xl md:text-5xl italic text-ivory">
                      {p.city}
                    </p>
                    <p className="text-ivory/55 text-[11px] tracking-[0.3em] uppercase mt-3 font-light">
                      {p.character}
                    </p>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-gold-soft/80 border border-gold-soft/25 px-2.5 py-1">
                    Land Converted
                  </span>
                  <p className="text-ivory/60 text-sm leading-relaxed mt-5 font-light">
                    {p.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── LEADERSHIP ─── */}
      <Section id="leadership" className="py-28 md:py-40 bg-ivory relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">
              Board of Directors
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl text-charcoal font-light">
              The leadership behind{" "}
              <span className="italic text-gold">AHPL</span>
            </h2>
            <div className="flex justify-center mt-6">
              <GoldDivider center />
            </div>
            <p className="text-charcoal/55 max-w-2xl mx-auto mt-6 leading-relaxed">
              Three directors, one platform — building AHPL into a hospitality
              business that is asset-backed, guest-first and institutionally
              scalable.
            </p>
          </div>

          <div className="space-y-24">
            {leadership.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`grid md:grid-cols-5 gap-12 md:gap-16 items-center ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="md:col-span-2">
                  <div className="relative">
                    <div className="absolute -inset-3 border border-gold/25" />
                    <div className="relative aspect-[4/5] overflow-hidden">
                      {person.image ? (
                        <Image
                          src={person.image}
                          alt={`Portrait of ${person.name}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="relative w-full h-full bg-charcoal">
                          <Image
                            src="/effaro/private-courtyard.jpg"
                            alt=""
                            aria-hidden="true"
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover opacity-30 grayscale"
                          />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/60 to-charcoal/85"
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                            <span className="font-[family-name:var(--font-display)] text-gold-soft text-6xl md:text-7xl font-light italic">
                              {person.initials}
                            </span>
                            <span
                              aria-hidden="true"
                              className="mt-5 mb-3 h-[1px] w-12 bg-gold-soft/40"
                            />
                            <p className="text-[10px] tracking-[0.4em] uppercase text-ivory/60">
                              Portrait
                            </p>
                            <p className="text-[10px] tracking-[0.4em] uppercase text-ivory/45 mt-1">
                              Forthcoming
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-ivory px-4 py-1">
                      <p className="text-gold text-[10px] tracking-[0.3em] uppercase">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3 space-y-5 text-charcoal/75 leading-relaxed">
                  <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl text-charcoal font-light">
                    {person.name}
                  </h3>
                  <GoldDivider />
                  {person.bio.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-charcoal/45 text-[11px] tracking-[0.25em] uppercase mt-24">
            Management team details will be added as the hospitality portfolio
            expands.
          </p>
        </div>
      </Section>

      {/* ─── OUR GROUP ─── */}
      <Section id="group" className="relative bg-charcoal text-ivory overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[480px] md:min-h-[640px]">
            <Image
              src="/effaro/twilight-villas.jpg"
              alt="AHPL group ecosystem"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 via-transparent to-charcoal/30" />
          </div>
          <div className="px-6 md:px-16 py-20 md:py-32 flex flex-col justify-center">
            <p className="text-gold/80 tracking-[0.3em] uppercase text-xs mb-4">
              Our Group
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]">
              Built on a wider{" "}
              <span className="italic text-gold">promoter-led</span> ecosystem.
            </h2>
            <GoldDivider />
            <p className="mt-6 text-ivory/70 text-base md:text-lg leading-relaxed max-w-xl">
              AHPL is part of a wider promoter-led business ecosystem with
              experience in real estate development, land aggregation, project
              execution and asset creation. The hospitality platform is being
              built to operate with focused governance, professional partners
              and brand-led growth.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { v: "30+", l: "Years Promoter Legacy" },
                { v: "5", l: "Cities of Land Pipeline" },
                { v: "1", l: "Flagship Brand Partner" },
              ].map((m) => (
                <div key={m.l} className="border-l-2 border-gold/40 pl-4">
                  <dt className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-light text-gold">
                    {m.v}
                  </dt>
                  <dd className="mt-1 text-[10px] tracking-[0.3em] uppercase text-ivory/55">
                    {m.l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* ─── MEDIA ─── */}
      <Section id="media" className="py-28 md:py-40 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <div>
              <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">
                Media
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl text-charcoal font-light">
                Press &amp; <span className="italic text-gold">media</span>
              </h2>
            </div>
            <a
              href="mailto:rst@uniquegroup.in"
              className="text-[11px] tracking-[0.3em] uppercase text-charcoal/70 hover:text-gold border-b border-gold/40 hover:border-gold pb-1 transition-colors"
            >
              PR Contact &rarr;
            </a>
          </div>

          <div className="border border-gold/20 bg-cream/40 px-8 md:px-16 py-16 md:py-24 text-center">
            <p className="text-gold/80 tracking-[0.4em] uppercase text-[10px] mb-6">
              Coming Soon
            </p>
            <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl text-charcoal font-light leading-tight max-w-3xl mx-auto">
              Press releases, coverage and our media kit will be added as AHPL
              shares its story with the world.
            </h3>
            <div className="flex justify-center mt-8">
              <GoldDivider center />
            </div>
            <div className="mt-10 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
              {[
                {
                  k: "Press Releases",
                  v: "Issued through AHPL communications.",
                },
                { k: "Coverage", v: "National and trade media features." },
                {
                  k: "Media Kit",
                  v: "Approved logo pack, leadership photos and renders.",
                },
              ].map((m) => (
                <div
                  key={m.k}
                  className="border-l-2 border-gold/30 pl-4 py-2"
                >
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gold/80">
                    {m.k}
                  </p>
                  <p className="text-charcoal/65 text-sm mt-2 leading-relaxed">
                    {m.v}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-12 text-[11px] tracking-[0.25em] uppercase text-charcoal/55">
              Media enquiries:{" "}
              <a
                href="mailto:rst@uniquegroup.in"
                className="text-gold hover:text-gold-dark transition-colors"
              >
                rst@uniquegroup.in
              </a>
            </p>
          </div>
        </div>
      </Section>

      {/* ─── CONTACT ─── */}
      <Section
        id="contact"
        className="relative py-28 md:py-40 bg-charcoal text-ivory overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/effaro/ranthambhore-landscape.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/85" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <p className="text-gold/80 tracking-[0.3em] uppercase text-xs mb-4">
              Contact AHPL
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light">
              Begin a{" "}
              <span className="italic text-gold">conversation</span>
            </h2>
            <div className="flex justify-center mt-6">
              <GoldDivider center />
            </div>
            <p className="text-ivory/60 max-w-2xl mx-auto mt-6 leading-relaxed">
              Reach out about Taj Ranthambore, future hospitality destinations,
              partnership opportunities or media. Our team responds within two
              working days.
            </p>
          </div>

          <form
            className="grid md:grid-cols-2 gap-6 border border-gold/25 bg-charcoal/60 backdrop-blur p-8 md:p-12"
            action="mailto:rst@uniquegroup.in"
            method="post"
            encType="text/plain"
          >
            {[
              { name: "name", label: "Full Name", type: "text", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone", type: "tel", required: false },
              {
                name: "interest",
                label: "Reason for Enquiry",
                type: "text",
                required: false,
              },
            ].map((f) => (
              <div key={f.name} className="block">
                <label
                  htmlFor={`enq-${f.name}`}
                  className="block text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2"
                >
                  {f.label}
                  {f.required && (
                    <span aria-hidden="true" className="text-gold-soft ml-1">*</span>
                  )}
                </label>
                <input
                  id={`enq-${f.name}`}
                  name={f.name}
                  type={f.type}
                  required={f.required}
                  aria-required={f.required}
                  className="w-full bg-transparent border-b border-ivory/20 focus:border-gold-soft py-3 text-ivory placeholder-ivory/30 outline-none focus-visible:border-gold-soft transition-colors"
                />
              </div>
            ))}
            <div className="block md:col-span-2">
              <label
                htmlFor="enq-message"
                className="block text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2"
              >
                Tell us more
              </label>
              <textarea
                id="enq-message"
                name="message"
                rows={4}
                className="w-full bg-transparent border-b border-ivory/20 focus:border-gold-soft py-3 text-ivory placeholder-ivory/30 outline-none focus-visible:border-gold-soft resize-none transition-colors"
              />
            </div>
            <div className="md:col-span-2 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
              <p className="text-[11px] tracking-[0.2em] uppercase text-ivory/40">
                Direct media:{" "}
                <a
                  href="mailto:rst@uniquegroup.in"
                  className="hover:text-gold-soft transition-colors"
                >
                  rst@uniquegroup.in
                </a>
              </p>
              <button
                type="submit"
                className="px-8 py-3.5 bg-gold-mid text-charcoal text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-gold-soft transition-colors"
              >
                Send Enquiry
              </button>
            </div>
          </form>

          <div className="mt-14 grid md:grid-cols-3 gap-8 text-center">
            {[
              { k: "General", v: "info@ahpl.in", note: "Domain pending" },
              {
                k: "Reservations",
                v: "reservations@ahpl.in",
                note: "Activates with booking flow",
              },
              {
                k: "Careers",
                v: "careers@ahpl.in",
                note: "Recruitment phase 2",
              },
            ].map((c) => (
              <div key={c.k}>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70">
                  {c.k}
                </p>
                <p className="font-[family-name:var(--font-display)] text-xl text-ivory mt-2">
                  {c.v}
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-ivory/35 mt-2">
                  {c.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#0F0E0C] text-ivory/70 border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="flex flex-col leading-tight">
              <span className="font-[family-name:var(--font-display)] text-3xl text-ivory tracking-[0.25em]">
                AHPL
              </span>
              <span className="text-[9px] tracking-[0.4em] uppercase text-gold/60 mt-1.5">
                Hospitality
              </span>
            </div>
            <p className="mt-6 text-sm text-ivory/55 max-w-xs leading-relaxed">
              A Rajasthan-based hospitality development platform — building
              destination-led hotels and resorts across India.
            </p>
            <p className="mt-4 text-[11px] tracking-[0.3em] uppercase text-gold/70">
              You belong here.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 border border-gold/25 flex items-center justify-center hover:bg-gold/10 hover:border-gold/50 transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-gold"
                >
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 border border-gold/25 flex items-center justify-center hover:bg-gold/10 hover:border-gold/50 transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-gold"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.69 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v7.44h-4.56V15.4c0-1.7-.03-3.88-2.36-3.88-2.36 0-2.72 1.85-2.72 3.76V22H7.91V8z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-5">
              Explore
            </p>
            <ul className="space-y-3">
              {navLinks.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    className="text-sm text-ivory/65 hover:text-gold transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-5">
              Corporate Office
            </p>
            <p className="text-sm text-ivory/65 leading-relaxed">
              AHPL Hospitality
              <br />
              Rajasthan, India
              <br />
              <span className="text-ivory/35">Address &amp; phone forthcoming</span>
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-5">
              Get in Touch
            </p>
            <p className="text-sm text-ivory/65 leading-relaxed">
              <a
                href="mailto:rst@uniquegroup.in"
                className="hover:text-gold transition-colors"
              >
                rst@uniquegroup.in
              </a>
              <br />
              <span className="text-ivory/40 text-xs">PR &amp; Media</span>
            </p>
          </div>
        </div>

        <div className="border-t border-gold/15">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] tracking-[0.3em] uppercase text-ivory/40">
            <span>
              &copy; {new Date().getFullYear()} AHPL. All rights reserved.
            </span>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <a href="#" className="hover:text-gold-soft transition-colors">
                Privacy
              </a>
              <span aria-hidden="true" className="opacity-40">/</span>
              <a href="#" className="hover:text-gold-soft transition-colors">
                Terms
              </a>
              <span aria-hidden="true" className="opacity-40">/</span>
              <a href="#" className="hover:text-gold-soft transition-colors">
                Cookies
              </a>
              <span aria-hidden="true" className="opacity-40">/</span>
              <a href="#" className="hover:text-gold-soft transition-colors">
                Disclaimer
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
