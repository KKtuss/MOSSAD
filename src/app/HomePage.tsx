"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [stats, setStats] = useState({
    tps: 0,
    validators: 0,
    evm: 0,
    finality: 0,
    blockTime: 0,
  });

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

    animateValue(0, 10000, 2000, (val) =>
      setStats((s) => ({ ...s, tps: val })),
    );
    animateValue(0, 200, 2000, (val) =>
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
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F0]/80 backdrop-blur-sm border-b border-black/10">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/mossad-ico.png"
              alt="Mossad emblem"
              width={40}
              height={40}
              priority
              className="h-10 w-10 rounded-full object-contain"
            />
            <div className="text-3xl font-bold font-chub">MOSSAD</div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              title="pump.fun"
            >
              <Image
                src="/images/pump-button.png"
                alt="Pump.fun"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-contain"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              title="X/Twitter"
            >
              <Image
                src="/images/x-logo.png"
                alt="X/Twitter"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-contain"
              />
            </a>
            <button className="px-6 py-2 bg-black text-white text-sm font-medium hover:bg-black/90 rounded-full">
              Claim Airdrop
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 space-y-16">
        <div className="dotted-pattern">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <p className="uppercase tracking-[0.3em] text-xs text-gray-500 font-mono mb-4">
              OPERATIONAL BRIEFING
            </p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              The High-Performance Hebrew-Market-Maker-Machine.
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Mossad is the chosen, next-generation, debt-compatible ledger. We're
              delivering 10,000 TPS (Trades Per Second), sub-second finality,
              interest-rate-level fees, and a scalable, decentralized network of
              influential nodes.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed mt-4">
              All under one, centralized management.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 min-h-[60vh]">
          <div className="dotted-pattern flex items-center justify-center p-12">
            <div className="max-w-xl">
              <h2 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
                Kosher, Kinetic, and Cost-Effective
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Tired of paying gentile fees and waiting for goyim hours? Operations on MOSSAD feel instant,
                cost a fraction of a shekel, and work with the wallets and assets you already control.
              </p>
            </div>
          </div>
          <div className="dotted-pattern flex items-center justify-center p-12">
            <div className="relative w-96 h-96 md:w-[32rem] md:h-[32rem]">
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
        <div className="grid md:grid-cols-2 min-h-[60vh]">
          <div className="dotted-pattern flex items-center justify-center p-12 order-2 md:order-1">
            <div className="relative w-96 h-96 md:w-[32rem] md:h-[32rem]">
              <Image
                src="/images/hannukah.png"
                alt="Hanukkah schematic"
                fill
                className="object-contain opacity-90"
                priority
              />
            </div>
          </div>
          <div className="dotted-pattern flex items-center justify-center p-12 order-1 md:order-2">
            <div className="max-w-xl">
              <h2 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
                Built by the Goys, for the Goys
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Mossad is engineered for ultimate operational security—from our decentralized network of trusted kibbutzim to the all-new Star of David Protocol, unlock the power of global finance without the fear of exposure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Video */}
      <section className="py-20">
        <video
          src="/videos/jew-vid.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[28rem] object-cover"
        />
      </section>

      {/* Performance Metrics */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 max-w-3xl leading-tight">
            MOSSAD unlocks a new era of EVM performance, enabling products the
            EVM has never seen before.
          </h2>
          <div className="flex flex-wrap gap-x-12 gap-y-8 mb-12">
            <div>
              <div className="text-6xl font-bold mb-2">
                {stats.tps.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Transactions per second</div>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">{stats.validators}+</div>
              <div className="text-sm text-gray-600">Validators</div>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">{stats.evm}%</div>
              <div className="text-sm text-gray-600">EVM-Compatible</div>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">
                {stats.finality.toFixed(1)}s
              </div>
              <div className="text-sm text-gray-600">Finality</div>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">
                {stats.blockTime.toFixed(1)}s
              </div>
              <div className="text-sm text-gray-600">Block times</div>
            </div>
          </div>
          <button className="px-6 py-3 border border-black text-sm font-medium hover:bg-black hover:text-white transition-colors">
            LEARN ABOUT MOSSAD'S PERFORMANCE
          </button>
        </div>
      </section>

      {/* Dark Gradient Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#2a2a4e] to-[#1a1a2e]" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <h2 className="text-5xl font-bold text-white">
            Explore the Onchain World on MOSSAD
          </h2>
          <Image
            src="/images/mossad-ico.png"
            alt="Mossad emblem"
            width={160}
            height={160}
            className="w-40 h-40 object-contain"
            priority
          />
        </div>
      </section>

      {/* Community Events */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-4">The MOSSAD Community is</h2>
          <h2 className="text-5xl font-bold mb-16">Onchain — And IRL.</h2>

          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4 text-xs font-mono text-gray-500 pb-4 border-b border-gray-300">
              <div>DATE</div>
              <div>EVENT</div>
              <div>LOCATION</div>
              <div>DESCRIPTION</div>
            </div>

            {[
              {
                date: "Nov 29,\n2025",
                event: "MOSSAD Blitz @ 上海",
                location: "TBD",
                desc: "MOSSAD Blitz 第1场深圳场，充满活力...",
              },
              {
                date: "Nov 29,\n2025",
                event: "MOSSAD Blitz Bangalore",
                location: "Bengaluru, Karnataka",
                desc: "Bangalore - we heard you! MOSSAD Blitz...",
              },
              {
                date: "Dec 03,\n2025",
                event: "Stablecon Salon vol 10",
                location: "New York, New York",
                desc: "Join us for the next edition of the...",
              },
              {
                date: "Dec 06,\n2025",
                event: "MOSSAD Blitz San Francisco: x402 Edition",
                location: "San Francisco, California",
                desc: "Join us for the 18th Edition of MOSSAD...",
              },
              {
                date: "Dec 13,\n2025",
                event: "MOSSAD Blitz Pune",
                location: "Pune, Maharashtra",
                desc: "Ready to ditch the lag and code at...",
              },
            ].map((event, i) => (
              <div
                key={i}
                className="grid grid-cols-4 gap-4 py-6 border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="text-sm whitespace-pre-line">{event.date}</div>
                <div className="text-sm font-medium">{event.event}</div>
                <div className="text-sm text-gray-600">{event.location}</div>
                <div className="text-sm text-gray-600">{event.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-300">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-600">
            © 2025 MOSSAD Foundation. All rights reserved.
          </div>
          <div className="flex gap-6 items-center">
            <a href="#" className="text-sm hover:opacity-70">
              PRIVACY POLICY →
            </a>
            <a href="#" className="text-sm hover:opacity-70">
              TERMS OF SERVICE →
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}


