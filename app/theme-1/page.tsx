"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Link from "next/link";
import Image from "next/image";

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
    <div className="flex items-center gap-4 my-2">
      <div className="h-[1px] w-16 bg-gradient-to-r from-gold/40 to-transparent" />
      <svg width="12" height="12" viewBox="0 0 12 12" className="text-gold/60">
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

/* ───────────────────── data ───────────────────── */

const groupStats = [
  { number: "30+", label: "Years of Group Legacy" },
  { number: "1", label: "Flagship Resort" },
  { number: "86", label: "Luxury Keys" },
  { number: "8.18", label: "Acres at Ranthambhore" },
];

const verticals = [
  {
    title: "Heritage Resorts",
    desc: "Palatial properties that translate Rajasthan's royal architecture and craft traditions into modern luxury hospitality.",
  },
  {
    title: "Wildlife Retreats",
    desc: "Immersive sanctuaries on the edge of India's protected forests, designed around guided safaris and naturalist-led experiences.",
  },
  {
    title: "Destination Weddings",
    desc: "30,000+ sqft of grand lawns, ballrooms, and ceremonial venues built for once-in-a-lifetime celebrations.",
  },
  {
    title: "Convention & MICE",
    desc: "Climate-controlled ballrooms and pre-function colonnades engineered for high-stakes corporate gatherings.",
  },
];

const portfolio = [
  {
    name: "Taj Ranthambhore Resort & Spa",
    location: "Sawai Madhopur, Rajasthan",
    category: "Heritage · Wildlife Luxury",
    meta: "86 Keys · 8.18 Acres",
    status: "Flagship · Operational",
    desc: "An 8.18-acre palatial sanctuary at the edge of India's most celebrated tiger reserve. Operated in association with Taj Hotels & IHCL.",
    featured: true,
  },
  {
    name: "Property in Development",
    location: "Rajasthan",
    category: "Heritage Convention",
    meta: "Undisclosed",
    status: "In Development",
    desc: "A heritage-style convention resort in pre-construction. Details to be announced.",
    featured: false,
  },
  {
    name: "Property in Planning",
    location: "Pan-India",
    category: "Boutique Wilderness",
    meta: "Undisclosed",
    status: "Planning",
    desc: "A boutique wilderness retreat in advanced site evaluation across central India.",
    featured: false,
  },
];

const leadership = [
  {
    name: "Mr. Abhishek Pal Singh",
    role: "Chairman",
    image: "/director-abhishek.jpg",
    bio: [
      "Mr. Abhishek Pal Singh is the driving force of the Effaro group, steering the business through every chapter of its journey. He belongs to a family with a 30-year successful legacy in commodities and construction, and after completing his graduation from the University of Mumbai, he carried that entrepreneurial discipline into hospitality — proving his mettle as a visionary hotelier.",
      "A forward-looking personality, Mr. Abhishek travels extensively across the globe — from the boutique resorts of South-East Asia to the heritage palaces of Europe — keeping the group abreast of the latest trends in design, guest experience, and operational excellence.",
      "Mr. Abhishek Singh has been the catalyst of change in luxury hospitality in Rajasthan. His viewing approach has set new benchmarks and created unique landmarks for Effaro. Under his guidance, the group has pioneered new standards of heritage-led design, locally-rooted guest experiences, and uncompromising service.",
    ],
  },
  {
    name: "Mr. Vibhishek Singh",
    role: "Managing Director",
    image: "/director-vibhishek.jpg",
    bio: [
      "Mr. Vibhishek Singh, the managing director of the Effaro group, is a commerce graduate from the University of Mumbai. He is the power behind the aggressive thinking of the group that makes the idea of realising hospitality dreams possible. Vibhishek Singh is a dynamic personality who believes in empowering the communities surrounding Effaro's properties — bringing about a paradigm shift in their life and lifestyle.",
      "He is a proven marketing brain who has not only strengthened the group's market position in the hospitality industry but also set new trends across the heritage-luxury domain. He represents the new wave of thinking that has helped Effaro establish itself as one of the most distinctive hospitality names emerging from Rajasthan.",
      "With his constant efforts and out-of-the-box thinking, Mr. Vibhishek Singh has diversified the company's presence by adding heritage stays, wildlife retreats, and convention-grade resorts as new feathers to the group's hospitality portfolio.",
    ],
  },
];

const accommodations = [
  {
    title: "Palace Rooms",
    subtitle: "38 Keys",
    description:
      "Regal chambers within the main palace block, adorned with traditional Rajasthani motifs, handcrafted furniture, and views of the manicured central gardens.",
    details: [
      "45 sqmt Standard Rooms",
      "93 sqmt Suite Rooms",
      "G+3 Palace Block",
      "All Day Dining Access",
    ],
    image: "/imagery/aerial.jpg",
  },
  {
    title: "Garden Villas",
    subtitle: "20 Keys",
    description:
      "Private two-storey villas nestled among curated gardens, each with a secluded courtyard, daybed, and ensuite bathrooms with bathtub and rainfall shower.",
    details: [
      "500 sqft per Room",
      "Private Courtyard",
      "Ground + First Floor",
      "King Bed & Daybed",
    ],
    image: "/imagery/garden-villa.jpg",
  },
  {
    title: "Pool Villas",
    subtitle: "16 Keys",
    description:
      "Exclusive villas with private plunge pools and landscaped courtyards, offering an intimate sanctuary surrounded by the wilderness of Ranthambhore.",
    details: [
      "500 sqft per Room",
      "Private Plunge Pool",
      "Landscaped Courtyard",
      "Premium Amenities",
    ],
    image: "/imagery/spa-block.jpg",
  },
  {
    title: "Presidential Suites",
    subtitle: "8 Keys",
    description:
      "The pinnacle of luxury — expansive 810 sqft suites with separate living rooms, private plunge pools, powder rooms, and panoramic balconies overlooking the resort.",
    details: [
      "810 sqft Suite Room",
      "Private Plunge Pool",
      "Living Room & Powder Room",
      "27ft Wide Balcony",
    ],
    image: "/imagery/villa-block.jpg",
  },
];

const galleryImages = [
  { src: "/imagery/hero-wedding.jpg", label: "Wilderness Wedding", span: "col-span-2 row-span-2", aspect: "aspect-square" },
  { src: "/imagery/fort-tiger.jpg", label: "Ranthambhore Fort", span: "", aspect: "aspect-square" },
  { src: "/imagery/heritage-mood.jpg", label: "Rajasthani Heritage", span: "", aspect: "aspect-square" },
  { src: "/imagery/spa-block.jpg", label: "Spa Block", span: "", aspect: "aspect-[4/3]" },
  { src: "/imagery/celebrations.jpg", label: "Venues to Celebrate", span: "", aspect: "aspect-[4/3]" },
  { src: "/imagery/aerial.jpg", label: "Resort Aerial", span: "col-span-2", aspect: "aspect-[21/9]" },
  { src: "/imagery/formal-garden.jpg", label: "Formal Garden", span: "", aspect: "aspect-square" },
  { src: "/imagery/outdoor-venues.jpg", label: "Outdoor Venues", span: "", aspect: "aspect-square" },
];

/* ─────────────── reusable Effaro mark ─────────────── */

function EffaroMark({
  variant = "light",
  size = 40,
}: {
  variant?: "light" | "dark";
  size?: number;
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        variant === "light" ? "text-ivory" : "text-charcoal"
      }`}
    >
      <Image
        src="/effaro-logo.svg"
        alt="Effaro"
        width={size}
        height={size}
        className="shrink-0"
        priority
      />
    </div>
  );
}

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
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/effaro-logo.svg"
                alt="Effaro"
                width={42}
                height={42}
                className="shrink-0"
                priority
              />
              <div className="flex flex-col leading-tight">
                <span
                  className={`font-[family-name:var(--font-display)] text-lg font-light tracking-wide transition-colors duration-500 ${
                    navOpaque ? "text-gold-dark" : "text-ivory"
                  }`}
                >
                  Effaro
                </span>
                <span
                  className={`text-[8px] tracking-[0.4em] uppercase transition-colors duration-500 ${
                    navOpaque ? "text-gold/60" : "text-ivory/50"
                  }`}
                >
                  Hospitality Group
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-10">
              {[
                { label: "Who We Are", href: "#about" },
                { label: "Portfolio", href: "#portfolio" },
                { label: "Leadership", href: "#leadership" },
                { label: "Flagship", href: "#flagship" },
                { label: "Gallery", href: "#gallery" },
                { label: "Contact", href: "#inquiry" },
              ].map((link) => (
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

        {navOpaque && (
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0"
        >
          <Image
            src="/imagery/hero-wedding.jpg"
            alt="Taj Ranthambhore wilderness setting at sunset"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/55 to-charcoal/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(26,21,16,0.55)_75%)]" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroTextY }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <Image
              src="/effaro-logo.svg"
              alt="Effaro"
              width={80}
              height={80}
              className="opacity-90"
              priority
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gold/70 tracking-[0.4em] uppercase text-xs md:text-sm mb-6"
          >
            Effaro Hospitality &middot; A House of Heritage Luxury
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-display)] text-ivory"
          >
            <span className="block text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95]">
              Setting the benchmark
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] mt-2">
              in heritage{" "}
              <span className="text-gold italic font-normal">hospitality</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-ivory/60 text-base md:text-lg max-w-2xl mt-8 leading-relaxed"
          >
            Effaro is a Rajasthan-rooted hospitality group building a portfolio of
            heritage resorts, wildlife retreats, and convention-grade properties.
            Our flagship — the Taj Ranthambhore Resort & Spa — opens at the edge
            of India&apos;s most celebrated tiger reserve.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6 mt-12"
          >
            <a
              href="#portfolio"
              className="group px-8 py-3.5 bg-gold text-ivory text-sm tracking-[0.2em] uppercase hover:bg-gold-dark transition-all duration-500"
            >
              The Portfolio
            </a>
            <a
              href="#about"
              className="px-8 py-3.5 border border-ivory/20 text-ivory/80 text-sm tracking-[0.2em] uppercase hover:border-gold/60 hover:text-gold transition-all duration-500"
            >
              Who We Are
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="absolute bottom-12 left-0 right-0 px-6"
          >
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 border-t border-gold/10 pt-8">
              {groupStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-[family-name:var(--font-display)] text-2xl md:text-4xl text-gold font-light">
                    {stat.number}
                  </p>
                  <p className="text-ivory/40 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── WHO WE ARE ─── */}
      <Section id="about" className="py-28 md:py-40 bg-ivory relative">
        <div className="absolute top-0 left-0 w-32 h-32 opacity-[0.06]">
          <svg viewBox="0 0 100 100" className="text-gold">
            <path
              d="M0,0 L100,0 L100,10 L10,10 L10,100 L0,100 Z"
              fill="currentColor"
            />
            <path
              d="M20,0 L20,80 L100,80"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
            <div className="md:col-span-5">
              <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">
                Who We Are
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl text-charcoal font-light leading-[1.1] mb-8">
                A house built on{" "}
                <span className="italic text-gold">heritage,</span> shaped for
                modern luxury
              </h2>
              <GoldDivider />

              <div className="mt-10 relative">
                <div className="absolute -inset-3 border border-gold/15" />
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/imagery/heritage-mood.jpg"
                    alt="Rajasthani heritage architecture inspiration"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-6 text-charcoal/70 leading-relaxed">
              <p>
                Effaro is a Rajasthan-rooted hospitality group, born out of three
                decades of family enterprise across commodities, construction,
                and real estate. Today, we channel that operational discipline
                into building hotels and resorts that honour the region&apos;s
                living heritage — its architecture, craft, hospitality, and
                wilderness.
              </p>
              <p>
                Our properties are not luxury for luxury&apos;s sake. Each
                Effaro resort is conceived as a translation of place — an answer
                to the question of what royal Rajasthan, jungle India, or a
                fortified hill town would feel like if rebuilt with today&apos;s
                guest in mind.
              </p>
              <p>
                Our flagship, the Taj Ranthambhore Resort & Spa, is operated in
                association with Taj Hotels & IHCL — a partnership that anchors
                Effaro&apos;s service standards to one of the most respected
                hospitality names in the world.
              </p>

              <div className="pt-8 grid grid-cols-2 gap-x-8 gap-y-6">
                {[
                  { k: "Founded in", v: "Rajasthan" },
                  { k: "Group Legacy", v: "30+ Years" },
                  { k: "Flagship Partner", v: "Taj · IHCL" },
                  { k: "Headquartered", v: "Jaipur" },
                ].map((item) => (
                  <div key={item.k} className="border-l-2 border-gold/30 pl-4">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-charcoal/40">
                      {item.k}
                    </p>
                    <p className="font-[family-name:var(--font-display)] text-xl text-gold-dark mt-1">
                      {item.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── WHAT WE DO ─── */}
      <Section id="verticals" className="py-28 md:py-40 bg-cream relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">
              What We Do
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl text-charcoal font-light">
              Four pillars of{" "}
              <span className="italic text-gold">hospitality</span>
            </h2>
            <p className="text-charcoal/50 max-w-2xl mx-auto mt-6 leading-relaxed">
              Our portfolio is being built across four interrelated pillars —
              each grounded in the cultural, ecological, and architectural
              identity of its place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {verticals.map((v, i) => (
              <motion.div
                key={v.title}
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
                    <span className="font-[family-name:var(--font-display)] text-gold text-lg">
                      0{i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl text-charcoal mb-3 group-hover:text-gold-dark transition-colors duration-500">
                      {v.title}
                    </h3>
                    <p className="text-charcoal/60 leading-relaxed text-sm">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── PORTFOLIO / THE COLLECTION ─── */}
      <Section
        id="portfolio"
        className="py-28 md:py-40 bg-charcoal text-ivory relative"
      >
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='80' height='80' fill='none' stroke='%23D4C5A9' stroke-width='0.3'/%3E%3Cline x1='0' y1='0' x2='80' y2='80' stroke='%23D4C5A9' stroke-width='0.2'/%3E%3Cline x1='80' y1='0' x2='0' y2='80' stroke='%23D4C5A9' stroke-width='0.2'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="text-gold/70 tracking-[0.3em] uppercase text-xs mb-4">
              The Effaro Collection
            </p>
            <ArchFrame>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light">
                Our growing{" "}
                <span className="italic text-gold">portfolio</span>
              </h2>
            </ArchFrame>
            <p className="text-ivory/50 max-w-2xl mx-auto mt-6 leading-relaxed">
              One operating flagship, with further heritage and wilderness
              properties under planning across India.
            </p>
          </div>

          {/* Featured property */}
          {portfolio
            .filter((p) => p.featured)
            .map((p) => (
              <motion.a
                key={p.name}
                href="#flagship"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group block mb-8"
              >
                <div className="grid md:grid-cols-5 gap-0 bg-gradient-to-br from-[#2a1f10] to-[#1a1510] border border-gold/20 hover:border-gold/40 transition-all duration-700 overflow-hidden">
                  <div className="md:col-span-2 aspect-[4/3] md:aspect-auto relative overflow-hidden">
                    <Image
                      src="/imagery/fort-tiger.jpg"
                      alt="Ranthambhore fort and tiger — context for the resort"
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-charcoal/40" />
                    <div className="absolute top-6 left-6">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-gold bg-charcoal/70 backdrop-blur px-3 py-1.5 border border-gold/30">
                        {p.status}
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
                      <p className="text-gold/70 text-xs tracking-[0.3em] uppercase mb-3">
                        {p.category}
                      </p>
                      <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-ivory font-light mb-3 group-hover:text-gold transition-colors duration-500">
                        {p.name}
                      </h3>
                      <p className="text-ivory/40 text-sm tracking-[0.15em] uppercase mb-6">
                        {p.location} &middot; {p.meta}
                      </p>
                      <p className="text-ivory/60 leading-relaxed">{p.desc}</p>
                    </div>
                    <div className="mt-10 flex items-center gap-3 text-gold text-xs tracking-[0.3em] uppercase">
                      <span>Explore the Flagship</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-500">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}

          {/* Pipeline properties */}
          <div className="grid md:grid-cols-2 gap-6">
            {portfolio
              .filter((p) => !p.featured)
              .map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="border border-gold/15 hover:border-gold/30 p-8 md:p-10 bg-charcoal/40 transition-all duration-700"
                >
                  <span className="text-[10px] tracking-[0.3em] uppercase text-gold/60 border border-gold/20 px-2.5 py-1">
                    {p.status}
                  </span>
                  <h4 className="font-[family-name:var(--font-display)] text-2xl text-ivory font-light mt-6 mb-2">
                    {p.name}
                  </h4>
                  <p className="text-ivory/40 text-xs tracking-[0.2em] uppercase mb-4">
                    {p.location} &middot; {p.category}
                  </p>
                  <p className="text-ivory/50 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </motion.div>
              ))}
          </div>
        </div>
      </Section>

      {/* ─── LEADERSHIP ─── */}
      <Section id="leadership" className="py-28 md:py-40 bg-ivory relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">
              Leadership
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl text-charcoal font-light">
              The minds behind{" "}
              <span className="italic text-gold">Effaro</span>
            </h2>
            <p className="text-charcoal/50 max-w-2xl mx-auto mt-6 leading-relaxed">
              Two generations of operating discipline, brought to bear on
              hospitality.
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
                    <div className="absolute -inset-4 border border-gold/15" />
                    <div className="absolute -inset-8 border border-gold/5" />
                    <div className="aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-[#2a1f10] via-[#3a2a18] to-[#1a1510]">
                      {person.image ? (
                        <Image
                          src={person.image}
                          alt={person.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover"
                        />
                      ) : (
                        <>
                          <div
                            className="absolute inset-0 opacity-15"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q30 25 15 40 M30 5 Q30 25 45 40' stroke='%23D4C5A9' fill='none' stroke-width='0.5'/%3E%3Ccircle cx='30' cy='5' r='1.5' fill='%23D4C5A9'/%3E%3C/svg%3E")`,
                              backgroundSize: "60px 60px",
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-[family-name:var(--font-display)] text-7xl text-gold/30 italic">
                              {person.name
                                .replace("Mr. ", "")
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                        </>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <p className="text-gold tracking-[0.3em] uppercase text-xs mb-3">
                    {person.role}
                  </p>
                  <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl text-charcoal font-light leading-tight mb-6">
                    {person.name}
                  </h3>
                  <GoldDivider />
                  <div className="space-y-5 text-charcoal/70 leading-relaxed mt-8">
                    {person.bio.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── FLAGSHIP DEEP-DIVE ─── */}
      <Section
        id="flagship"
        className="py-28 md:py-40 bg-charcoal text-ivory relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#8B691415_0%,_transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="text-gold/70 tracking-[0.3em] uppercase text-xs mb-4">
              The Flagship
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light">
              Taj Ranthambhore{" "}
              <span className="italic text-gold">Resort & Spa</span>
            </h2>
            <p className="text-ivory/50 max-w-2xl mx-auto mt-6 leading-relaxed">
              An 8.18-acre palatial sanctuary on the edge of the Ranthambhore
              Tiger Reserve. Operated in association with Taj Hotels & IHCL.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
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
                <div className="border border-gold/10 hover:border-gold/30 transition-all duration-700 overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                    <div className="absolute top-6 right-6 font-[family-name:var(--font-display)] text-5xl text-ivory/30 font-light">
                      0{i + 1}
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-gold/90 text-xs tracking-[0.25em] uppercase mb-2">
                        {room.subtitle}
                      </p>
                      <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-ivory font-light group-hover:text-gold transition-colors duration-500">
                        {room.title}
                      </h3>
                    </div>
                  </div>

                  <div className="bg-charcoal/80 p-6 md:p-8">
                    <p className="text-ivory/55 leading-relaxed text-sm">
                      {room.description}
                    </p>
                    <div className="h-[1px] bg-gold/10 my-5" />
                    <div className="grid grid-cols-2 gap-3">
                      {room.details.map((detail) => (
                        <div
                          key={detail}
                          className="flex items-center gap-2 text-ivory/45 text-xs"
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

          {/* event/activity strip */}
          <div className="mt-16 pt-10 border-t border-gold/10">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-ivory/40 text-xs tracking-[0.2em] uppercase">
              {[
                "Tiger Safari",
                "Jiva Spa",
                "Royal Ballroom",
                "Function Lawn",
                "Pool Deck",
                "Bonfire Nights",
                "Herb Garden",
                "All-Day Dining",
              ].map((activity) => (
                <span key={activity} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-gold/40 rotate-45" />
                  {activity}
                </span>
              ))}
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
              A glimpse of{" "}
              <span className="italic text-gold">paradise</span>
            </h2>
            <p className="text-charcoal/50 max-w-2xl mx-auto mt-6 leading-relaxed">
              Architectural and landscape concept renders from the Taj
              Ranthambhore design studios.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`${item.span} group cursor-pointer overflow-hidden relative`}
              >
                <div className={`${item.aspect} relative overflow-hidden`}>
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/55 transition-all duration-700 flex items-end p-5">
                    <span className="text-ivory text-xs tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
                      {item.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
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
            Talk to Effaro
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6">
            For reservations,{" "}
            <span className="italic text-gold">partnerships</span> and press
          </h2>
          <p className="text-ivory/50 max-w-lg mx-auto mb-12 leading-relaxed">
            Whether planning a stay at our flagship, exploring a partnership
            opportunity, or commissioning a story — our team is ready to help.
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
              <select
                defaultValue=""
                className="w-full bg-ivory/5 border border-gold/20 px-5 py-3.5 text-ivory/60 text-sm focus:border-gold/60 focus:outline-none transition-colors duration-500 appearance-none"
              >
                <option value="" disabled>
                  Nature of Inquiry
                </option>
                <option value="stay">Reservation — Taj Ranthambhore</option>
                <option value="wedding">Destination Wedding</option>
                <option value="event">Corporate / MICE Event</option>
                <option value="partnership">Partnership / Investment</option>
                <option value="press">Press / Media</option>
              </select>
            </div>
            <textarea
              rows={4}
              placeholder="Tell us a little about your inquiry..."
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
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/effaro-logo.svg"
                  alt="Effaro"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col leading-tight">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-light">
                    Effaro
                  </span>
                  <span className="text-[9px] tracking-[0.4em] uppercase text-gold/50">
                    Hospitality Group
                  </span>
                </div>
              </div>
              <p className="text-ivory/40 text-sm leading-relaxed max-w-sm">
                A Rajasthan-rooted hospitality group building heritage resorts,
                wildlife retreats, and convention-grade properties. Flagship —
                Taj Ranthambhore Resort & Spa, operated in association with Taj
                Hotels & IHCL.
              </p>
            </div>

            <div>
              <p className="text-gold/60 text-xs tracking-[0.2em] uppercase mb-6">
                The Group
              </p>
              <ul className="space-y-3 text-ivory/40 text-sm">
                {[
                  { label: "Who We Are", href: "#about" },
                  { label: "Portfolio", href: "#portfolio" },
                  { label: "Leadership", href: "#leadership" },
                  { label: "Flagship", href: "#flagship" },
                  { label: "Gallery", href: "#gallery" },
                  { label: "Contact", href: "#inquiry" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-gold transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-gold/60 text-xs tracking-[0.2em] uppercase mb-6">
                Reach Us
              </p>
              <div className="space-y-3 text-ivory/40 text-sm">
                <p>contact@effaro.in</p>
                <p>reservations@tajranthambhore.com</p>
                <p>+91 XXXXX XXXXX</p>
                <p className="pt-2">Headquartered in Jaipur, Rajasthan</p>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gold/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-ivory/20 text-xs">
              &copy; 2026 Effaro Hospitality Group. All rights reserved.
            </p>
            <p className="text-ivory/20 text-xs">
              Theme 01 &middot; Royal Heritage
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
