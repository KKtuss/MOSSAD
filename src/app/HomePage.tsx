"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function HomePage() {
  const [stats, setStats] = useState({
    tps: 0,
    validators: 0,
    evm: 0,
    finality: 0,
    blockTime: 0,
    epsteinFiles: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [indicatorFading, setIndicatorFading] = useState(false);
  // Make hero section visible by default since it's always in view on load
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(["hero-text", "hero-video", "image-left", "image-right", "dark-section", "partners"]));
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const animateValue = (
      start: number,
      end: number,
      duration: number,
      setter: (val: number) => void,
      isDecimal = false,
    ) => {
      const startTime = Date.now();
      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const current = isDecimal
          ? start + (end - start) * progress
          : Math.floor(start + (end - start) * progress);
        setter(current);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    animateValue(0, 6000000, 2000, (val) =>
      setStats((s) => ({ ...s, tps: val })),
    );
    animateValue(0, 2000, 2000, (val) =>
      setStats((s) => ({ ...s, validators: val })),
    );
    animateValue(0, 100, 2000, (val) =>
      setStats((s) => ({ ...s, evm: val })),
    );
    animateValue(
      0,
      0.8,
      2000,
      (val) => setStats((s) => ({ ...s, finality: val })),
      true,
    );
    animateValue(
      0,
      0.4,
      2000,
      (val) => setStats((s) => ({ ...s, blockTime: val })),
      true,
    );
    animateValue(0, 33000, 2000, (val) =>
      setStats((s) => ({ ...s, epsteinFiles: val })),
    );
  }, []);

  useEffect(() => {
    if (showIndicator) {
      const fadeTimer = setTimeout(() => {
        setIndicatorFading(true);
        setTimeout(() => {
          setShowIndicator(false);
          setIndicatorFading(false);
        }, 500); // Fade duration
      }, 6000); // Show for 6 seconds

      return () => clearTimeout(fadeTimer);
    }
  }, [showIndicator]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section-id");
            if (id) {
              setVisibleSections((prev) => new Set(prev).add(id));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Store observed elements to properly clean them up
    const observedElements: HTMLElement[] = [];

    // Wait a bit for refs to be set, then observe
    const timeoutId = setTimeout(() => {
      // Capture refs at the time of observation
      const currentRefs = Object.values(sectionRefs.current);
      currentRefs.forEach((ref) => {
        if (ref) {
          observer.observe(ref);
          observedElements.push(ref);
          // Check if already in view
          const rect = ref.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight && rect.bottom > 0;
          if (isInView) {
            const id = ref.getAttribute("data-section-id");
            if (id) {
              setVisibleSections((prev) => new Set(prev).add(id));
            }
          }
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      // Use stored observed elements for cleanup
      observedElements.forEach((ref) => {
        observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F0]/80 backdrop-blur-sm border-b border-black/10 transition-all duration-300">
        <div className="w-full px-3 sm:px-6 py-2 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/images/mossad-ico.png"
              alt="Mossad emblem"
              width={40}
              height={40}
              priority
              className="h-12 w-12 sm:h-10 sm:w-10 rounded-full object-contain"
            />
            <div className="text-2xl sm:text-2xl md:text-3xl font-bold font-chub">MOSSAD</div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
              title="pump.fun"
            >
              <Image
                src="/images/pump-button.png"
                alt="Pump.fun"
                width={40}
                height={40}
                className="w-full h-full rounded-full object-contain"
              />
            </a>
            <a
              href="https://x.com/mossad_services"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
              title="X/Twitter"
            >
              <Image
                src="/images/x-logo.png"
                alt="X/Twitter"
                width={40}
                height={40}
                className="w-full h-full rounded-full object-contain"
              />
            </a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-3 sm:px-6 py-1.5 sm:py-2 bg-black text-white text-xs sm:text-sm font-medium hover:bg-black/90 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Claim Airdrop
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-0 space-y-4">
        <div 
          className={`dotted-pattern fade-in-up ${visibleSections.has("hero-text") ? "visible" : ""}`}
          data-section-id="hero-text"
          ref={(el: HTMLDivElement | null) => {
            sectionRefs.current["hero-text"] = el;
          }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-0 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
              The High-Performance Hebrew Chain Built for Global Control
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              Mossad is the chosen, next-generation, debt-compatible blockchain. We're
              delivering 10,000 TPS (Targets per second), sub-second finality,
              interest-rate-level fees, and a scalable, decentralized network of
              influential nodes.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mt-4">
              All under one, centralized management.
            </p>
          </div>
        </div>
      </section>

      {/* Images above video */}
      <section className="dotted-pattern pt-0 px-4 sm:px-6 pb-0 mb-0 mt-4 sm:-mt-32 md:-mt-40">
        <div className="w-full flex items-end justify-between">
          <div 
            className={`relative w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] flex-shrink-0 -ml-6 sm:-ml-4 md:-ml-6 drop-shadow-lg fade-in-left ${visibleSections.has("image-left") ? "visible" : ""}`}
            data-section-id="image-left"
            ref={(el: HTMLElement | null) => {
              sectionRefs.current["image-left"] = el;
            }}
          >
            <Image
              src="/images/Epstein.png"
              alt="Epstein"
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
          <div 
            className={`relative w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] flex-shrink-0 -mr-6 sm:-mr-4 md:-mr-6 drop-shadow-lg fade-in-right ${visibleSections.has("image-right") ? "visible" : ""}`}
            data-section-id="image-right"
            ref={(el: HTMLElement | null) => {
              sectionRefs.current["image-right"] = el;
            }}
          >
            <Image
              src="/images/netanyahu.png"
              alt="Netanyahu"
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>
        <div className="w-screen border-b border-black/10 -mx-4 sm:-mx-6"></div>
      </section>

      {/* Hero Video */}
      <section 
        className={`mt-4 sm:mt-6 pt-0 pb-4 sm:pb-8 fade-in ${visibleSections.has("hero-video") ? "visible" : ""}`}
        data-section-id="hero-video"
        ref={(el: HTMLElement | null) => {
          sectionRefs.current["hero-video"] = el;
        }}
      >
        <div className="w-full overflow-hidden">
          <video
            src="/videos/jew-vid.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[16rem] sm:h-[24rem] md:h-[28rem] object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        </div>
      </section>

      {/* Content sections */}
      <section className="space-y-4">
        <div className="grid md:grid-cols-2 min-h-[50vh] md:min-h-[60vh]">
          <div 
            className={`dotted-pattern flex items-center justify-center p-4 sm:p-8 md:p-12 fade-in-left ${visibleSections.has("section-1-text") ? "visible" : ""}`}
            data-section-id="section-1-text"
            ref={(el: HTMLDivElement | null) => {
              sectionRefs.current["section-1-text"] = el;
            }}
          >
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6">
                Kosher, Kinetic, and Cost-Effective
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Tired of paying gentile fees and waiting for goyim hours? Operations on MOSSAD feel instant,
                cost a fraction of a shekel, and work with the wallets and assets you already control.
              </p>
            </div>
          </div>
          <div 
            className={`dotted-pattern flex items-center justify-center p-4 sm:p-8 md:p-12 fade-in-right ${visibleSections.has("section-1-image") ? "visible" : ""}`}
            data-section-id="section-1-image"
            ref={(el: HTMLDivElement | null) => {
              sectionRefs.current["section-1-image"] = el;
            }}
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] transition-transform duration-500 hover:scale-105">
              <Image
                src="/images/hannukah.png"
                alt="Hanukkah schematic"
                fill
                className="object-contain opacity-90"
                priority
              />
            </div>
          </div>
        </div>

        {/* Duplicated section with inverted positions */}
        <div className="grid md:grid-cols-2 min-h-[50vh] md:min-h-[60vh]">
          <div 
            className={`dotted-pattern flex items-center justify-center p-4 sm:p-8 md:p-12 order-2 md:order-1 fade-in-left ${visibleSections.has("section-2-image") ? "visible" : ""}`}
            data-section-id="section-2-image"
            ref={(el: HTMLDivElement | null) => {
              sectionRefs.current["section-2-image"] = el;
            }}
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] transition-transform duration-500 hover:scale-105">
              <Image
                src="/images/David.png"
                alt="Star of David"
                fill
                className="object-contain opacity-90"
                priority
              />
            </div>
          </div>
          <div 
            className={`dotted-pattern flex items-center justify-center p-4 sm:p-8 md:p-12 order-1 md:order-2 fade-in-right ${visibleSections.has("section-2-text") ? "visible" : ""}`}
            data-section-id="section-2-text"
            ref={(el: HTMLDivElement | null) => {
              sectionRefs.current["section-2-text"] = el;
            }}
          >
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6">
                Built by the Goys, for the Goys
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Mossad is engineered for ultimate operational secrecy-from our decentralized network of deniable kibbutzim to the classified Star of David Protocol, we empower you to infiltrate global finance without leaving a trace. Exposure? That's for amateurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section 
        className={`py-8 sm:py-12 md:py-16 px-4 sm:px-6 fade-in-up ${visibleSections.has("metrics") ? "visible" : ""}`}
        data-section-id="metrics"
        ref={(el: HTMLElement | null) => {
          sectionRefs.current["metrics"] = el;
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 max-w-3xl leading-tight">
            MOSSAD operates on a level of global influence that redefines the market:
          </h2>
          <div className="flex flex-wrap gap-x-6 sm:gap-x-8 md:gap-x-12 gap-y-6 sm:gap-y-8">
            <div className="transition-transform duration-300 hover:scale-105">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                {stats.tps.toLocaleString()}+
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Discreet Transactions per seconds</div>
            </div>
            <div className="transition-transform duration-300 hover:scale-105">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{stats.validators}+</div>
              <div className="text-xs sm:text-sm text-gray-600">Chosen Agents in the Network</div>
            </div>
            <div className="transition-transform duration-300 hover:scale-105">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{stats.evm}%</div>
              <div className="text-xs sm:text-sm text-gray-600">Debt-to-Asset Ratio (We're on the positive side)</div>
            </div>
            <div className="transition-transform duration-300 hover:scale-105">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                {stats.finality.toFixed(1)}s
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Finality</div>
            </div>
            <div className="transition-transform duration-300 hover:scale-105">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                {stats.blockTime.toFixed(1)}s
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Asset Liquidation Time</div>
            </div>
            <div className="transition-transform duration-300 hover:scale-105">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                {stats.epsteinFiles.toLocaleString()}+
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Epstein Files Pages</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Gradient Section */}
      <section 
        className={`relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 overflow-hidden fade-in ${visibleSections.has("dark-section") ? "visible" : ""}`}
        data-section-id="dark-section"
        ref={(el: HTMLElement | null) => {
          sectionRefs.current["dark-section"] = el;
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#2a2a4e] to-[#1a1a2e]" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Explore the Onchain World on MOSSAD
          </h2>
          <Image
            src="/images/mossad-ico.png"
            alt="Mossad emblem"
            width={160}
            height={160}
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain transition-transform duration-500 hover:scale-110 hover:rotate-6"
            priority
          />
        </div>
      </section>

      {/* Community Events */}
      <section 
        className={`py-8 sm:py-12 md:py-16 px-4 sm:px-6 fade-in-up ${visibleSections.has("events") ? "visible" : ""}`}
        data-section-id="events"
        ref={(el: HTMLElement | null) => {
          sectionRefs.current["events"] = el;
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">The MOSSAD Community is</h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 md:mb-16">Onchain - And IRL.</h2>

          <div className="space-y-4 sm:space-y-6">
            <div className="hidden sm:grid grid-cols-3 gap-4 text-xs font-mono text-gray-500 pb-4 border-b border-gray-300">
              <div>DATE</div>
              <div>EVENT</div>
              <div>LOCATION</div>
            </div>

            {[
              {
                date: "Jun 8,\n1967",
                event: "USS Liberty Meetup",
                location: "Sinai Peninsula",
                desc: "",
              },
              {
                date: "Sep 11,\n2001",
                event: "MOSSAD flash US Meetup",
                location: "New-York",
                desc: "",
              },
              {
                date: "1998-2019",
                event: "VIP Political Meetings",
                location: "Little Saint James Island",
                desc: "",
              },
              {
                date: "Sep 10,\n2025",
                event: "Elite Shooter Public Training",
                location: "Losee Center",
                desc: "",
              },
            ].map((event, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 py-4 sm:py-6 border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:translate-x-2"
              >
                <div className="text-xs sm:text-sm whitespace-pre-line">
                  <span className="sm:hidden font-mono text-gray-500">DATE: </span>
                  {event.date}
                </div>
                <div className="text-xs sm:text-sm font-medium">
                  <span className="sm:hidden font-mono text-gray-500">EVENT: </span>
                  {event.event}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  <span className="sm:hidden font-mono text-gray-500">LOCATION: </span>
                  {event.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section 
        className={`relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 overflow-hidden fade-in ${visibleSections.has("partners") ? "visible" : ""}`}
        data-section-id="partners"
        ref={(el: HTMLElement | null) => {
          sectionRefs.current["partners"] = el;
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#2a2a4e] to-[#1a1a2e]" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 text-center">
            Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex flex-col items-center transition-all duration-300 hover:scale-105">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mb-2">
                <Image
                  src="/images/Goylana-grey.png"
                  alt="Goylana"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white text-lg sm:text-xl md:text-2xl font-medium">Goylana</p>
            </div>
            <div className="flex flex-col items-center transition-all duration-300 hover:scale-105">
              <div className="h-40 sm:h-48 md:h-56 lg:h-64 flex items-end mb-2">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52">
                  <Image
                    src="/images/Jewpiter-grey.png"
                    alt="Jewpiter"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-white text-lg sm:text-xl md:text-2xl font-medium">Jewpiter</p>
            </div>
            <div className="flex flex-col items-center transition-all duration-300 hover:scale-105">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mb-2">
                <Image
                  src="/images/Etheran-grey.png"
                  alt="Eteheran"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white text-lg sm:text-xl md:text-2xl font-medium">Eteheran</p>
            </div>
            <div className="flex flex-col items-center transition-all duration-300 hover:scale-105">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mb-2">
                <Image
                  src="/images/IsraelGPT.png"
                  alt="IsraelGPT"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white text-lg sm:text-xl md:text-2xl font-medium">IsraelGPT</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-gray-300">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="text-xs sm:text-sm text-gray-600">
            © 2025 MOSSAD Foundation. All rights reserved.
          </div>
          <div className="flex gap-4 sm:gap-6 items-center">
            <a href="#" className="text-xs sm:text-sm hover:opacity-70 transition-all duration-300 hover:translate-x-1">
              PRIVACY POLICY →
            </a>
            <a href="#" className="text-xs sm:text-sm hover:opacity-70 transition-all duration-300 hover:translate-x-1">
              TERMS OF SERVICE →
            </a>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 opacity-100" />
          
          {/* Modal Content */}
          <div 
            className="relative z-10 bg-[#F5F5F0] rounded-lg border border-black/10 shadow-2xl max-w-md w-full p-8 scale-in visible"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold leading-none transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Close"
            >
              ×
            </button>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed font-sebino">
                You're eligible to claim 10 000 $MOSSAD ! Import your blackmail and click the button below to claim your allocation.
              </p>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="*/*"
                onChange={(e) => {
                  // File selected - you can handle the file here if needed
                  if (e.target.files && e.target.files[0]) {
                    // File handling can be added here
                  }
                }}
              />
              <button 
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="w-full px-4 py-2 bg-gray-400 text-white text-sm font-medium hover:bg-gray-500 rounded-full font-sebino transition-all duration-300 hover:scale-105 active:scale-95"
              >
                import your blackmail here
              </button>
              <button 
                onClick={() => {
                  setShowIndicator(true);
                  setIsModalOpen(false);
                }}
                className="w-full px-6 py-3 bg-black text-white text-sm font-medium hover:bg-black/90 rounded-full font-sebino transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Glory to the state of Israel !
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Indicator */}
      {showIndicator && (
        <div 
          className={`fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-[100] bg-[#F5F5F0]/80 backdrop-blur-sm border border-black/10 rounded-full px-4 sm:px-8 py-3 sm:py-4 shadow-lg transition-opacity duration-500 max-w-[90vw] sm:max-w-none ${
            indicatorFading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <p className="text-sm sm:text-lg text-gray-700 font-sebino text-center">
            1000 $MOSSAD ? What do you even need 100 $MOSSAD for ?
          </p>
        </div>
      )}

    </div>
  );
}


