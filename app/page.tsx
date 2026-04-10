import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-charcoal text-ivory font-[family-name:var(--font-body)]">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <p className="text-gold tracking-[0.3em] uppercase text-sm mb-4">
            Taj Ranthambhore Resort
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-light mb-6">
            Website Design
            <br />
            <span className="text-gold">Themes</span>
          </h1>
          <p className="text-gold-light/70 text-lg max-w-2xl mx-auto">
            Three distinct design directions for the resort website. Select a
            theme to preview the full landing page experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Link href="/theme-1" className="group block">
            <div className="relative overflow-hidden border border-gold/20 hover:border-gold/60 transition-all duration-700 bg-gradient-to-b from-[#1a1510] to-charcoal">
              <div className="aspect-[3/4] flex flex-col justify-end p-8">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#8B691420_0%,_transparent_60%)]" />
                <div className="absolute top-8 left-8 right-8">
                  <div className="w-12 h-[1px] bg-gold/40 mb-4" />
                  <p className="text-gold/60 text-xs tracking-[0.2em] uppercase">
                    Theme 01
                  </p>
                </div>
                <div className="relative z-10">
                  <h2 className="font-[family-name:var(--font-display)] text-3xl text-ivory mb-2 group-hover:text-gold transition-colors duration-500">
                    Royal Heritage
                  </h2>
                  <p className="text-gold-light/50 text-sm leading-relaxed">
                    Palatial, ornate, gold-heavy. Rajasthani palace grandeur
                    with intricate arch motifs and regal typography.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-gold text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span>Explore</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-500">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/theme-2" className="group block">
            <div className="relative overflow-hidden border border-forest/20 hover:border-forest/60 transition-all duration-700 bg-gradient-to-b from-[#0D1B0A] to-charcoal">
              <div className="aspect-[3/4] flex flex-col justify-end p-8">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#2D501620_0%,_transparent_60%)]" />
                <div className="absolute top-8 left-8 right-8">
                  <div className="w-12 h-[1px] bg-forest/40 mb-4" />
                  <p className="text-forest/60 text-xs tracking-[0.2em] uppercase">
                    Theme 02
                  </p>
                </div>
                <div className="relative z-10">
                  <h2 className="font-[family-name:var(--font-display)] text-3xl text-ivory mb-2 group-hover:text-sage transition-colors duration-500">
                    Into the Wild
                  </h2>
                  <p className="text-sage/50 text-sm leading-relaxed">
                    Dark, moody, nature-first. Cinematic jungle atmosphere with
                    deep greens and amber wildlife tones.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sage text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span>Explore</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-500">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/theme-3" className="group block">
            <div className="relative overflow-hidden border border-sandstone/20 hover:border-sandstone/60 transition-all duration-700 bg-gradient-to-b from-[#1A1815] to-charcoal">
              <div className="aspect-[3/4] flex flex-col justify-end p-8">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#D4C5A920_0%,_transparent_60%)]" />
                <div className="absolute top-8 left-8 right-8">
                  <div className="w-12 h-[1px] bg-sandstone/40 mb-4" />
                  <p className="text-sandstone/60 text-xs tracking-[0.2em] uppercase">
                    Theme 03
                  </p>
                </div>
                <div className="relative z-10">
                  <h2 className="font-[family-name:var(--font-display)] text-3xl text-ivory mb-2 group-hover:text-sandstone transition-colors duration-500">
                    Modern Elegance
                  </h2>
                  <p className="text-sandstone/50 text-sm leading-relaxed">
                    Clean, minimal, contemporary luxury. Warm ivory canvas with
                    muted gold accents and refined whitespace.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sandstone text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span>Explore</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-500">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center mt-16 text-gold-light/30 text-xs tracking-widest uppercase">
          Taj Ranthambhore Resort &middot; Website Design Presentation
        </div>
      </div>
    </div>
  );
}
