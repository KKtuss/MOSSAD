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
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium hover:bg-black/90 transition-colors"
              title="pump.fun"
            >
              P
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium hover:bg-black/90 transition-colors"
              title="X/Twitter"
            >
              X
            </a>
            <a
              href="https://dexscreener.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium hover:bg-black/90 transition-colors"
              title="DexScreener"
            >
              D
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
                Fast, familiar, frictionless
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                No more high fees or long waits. Apps on MOSSAD feel instant,
                cost pennies, and work with the wallets and tools you already
                know and love.
              </p>
            </div>
          </div>
          <div className="dotted-pattern flex items-center justify-center p-12">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
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

      {/* Rolling Text */}
      <section className="py-12 overflow-hidden bg-white">
        <div className="flex animate-scroll">
          <div className="flex whitespace-nowrap">
            <span className="inline-block px-4 text-sm font-mono">
              EVM Addresses
            </span>
            <span className="inline-block px-4 text-sm font-mono">Wallets</span>
            <span className="inline-block px-4 text-sm font-mono">Security</span>
            <span className="inline-block px-4 text-sm font-mono">
              Smart Contracts
            </span>
            <span className="inline-block px-4 text-sm font-mono">Research</span>
            <span className="inline-block px-4 text-sm font-mono">
              Tools & Services
            </span>
          </div>
          <div className="flex whitespace-nowrap">
            <span className="inline-block px-4 text-sm font-mono">
              EVM Addresses
            </span>
            <span className="inline-block px-4 text-sm font-mono">Wallets</span>
            <span className="inline-block px-4 text-sm font-mono">Security</span>
            <span className="inline-block px-4 text-sm font-mono">
              Smart Contracts
            </span>
            <span className="inline-block px-4 text-sm font-mono">Research</span>
            <span className="inline-block px-4 text-sm font-mono">
              Tools & Services
            </span>
          </div>
        </div>
      </section>

      {/* Node Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl font-bold leading-tight mb-8">
              Run a node.
              <br />
              Join the network.
            </h2>
          </div>
          <div className="flex flex-col justify-center space-y-6 text-sm font-mono text-gray-600">
            <div>/ MOSSAD DB</div>
            <div>/ HUNDREDS OF VALIDATORS</div>
            <div>/ SCALABLE DECENTRALIZATION</div>
          </div>
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

      {/* Newsletter */}
      <section className="py-20 px-6 border-t border-gray-300">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Subscribe to the Newsletter
            </h3>
            <p className="text-gray-600 mb-6">
              Stay up to date with the latest news, announcements and events.
            </p>
            <button className="px-6 py-3 border border-black text-sm font-medium hover:bg-black hover:text-white transition-colors">
              SUBSCRIBE TO MOSSAD MEMO
            </button>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div className="space-y-3">
              <a href="#" className="block hover:opacity-70">
                HOME
              </a>
              <a href="#" className="block hover:opacity-70">
                EVENTS
              </a>
              <a href="#" className="block hover:opacity-70">
                MOSSAD MEDIA
              </a>
              <a href="#" className="block hover:opacity-70">
                ANNOUNCEMENTS
              </a>
              <a href="#" className="block hover:opacity-70">
                BLOG POSTS
              </a>
              <a href="#" className="block hover:opacity-70">
                INSTITUTIONS
              </a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block hover:opacity-70">
                BUILD
              </a>
              <a href="#" className="block hover:opacity-70">
                DOCUMENTATION
              </a>
              <a href="#" className="block hover:opacity-70">
                INFRA DIRECTORY
              </a>
              <a href="#" className="block hover:opacity-70">
                BLOCK EXPLORER
              </a>
              <a href="#" className="block hover:opacity-70">
                GMOSSADS
              </a>
              <a href="#" className="block hover:opacity-70">
                RESEARCH FORUM
              </a>
            </div>
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
            <div className="flex gap-4">
              <a
                href="#"
                className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs"
              >
                X
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs"
              >
                D
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs"
              >
                Y
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs"
              >
                L
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}


