import React, { useMemo, useState } from "react";
import { FaFutbol, FaBasketballBall, FaBars, FaTimes } from "react-icons/fa";
import { GiCricketBat, GiTennisRacket } from "react-icons/gi";

// ---------- Sample Data ----------
const sampleImage = "https://source.unsplash.com/1600x900/?cricket,stadium";

const liveScores = [
  {
    id: 1,
    league: "Premier League",
    home: "MCI",
    away: "LIV",
    score: "2 - 1",
    minute: "73'",
  },
  {
    id: 2,
    league: "NBA",
    home: "LAL",
    away: "BOS",
    score: "89 - 94",
    minute: "Q4 03:12",
  },
  {
    id: 3,
    league: "IPL",
    home: "MI",
    away: "CSK",
    score: "164/6 — 161/8",
    minute: "19.5 ov",
  },
  {
    id: 4,
    league: "LaLiga",
    home: "FCB",
    away: "RMA",
    score: "1 - 1",
    minute: "HT",
  },
];

const leagues = [
  {
    key: "football",
    name: "Football",
    comps: ["Premier League", "LaLiga", "Serie A", "ISL"],
    Icon: FaFutbol,
  },
  {
    key: "cricket",
    name: "Cricket",
    comps: ["IPL", "BPL", "BBL", "CWC"],
    Icon: GiCricketBat,
  },
  {
    key: "basketball",
    name: "Basketball",
    comps: ["NBA", "EuroLeague", "WNBA"],
    Icon: FaBasketballBall,
  },
  {
    key: "tennis",
    name: "Tennis",
    comps: ["ATP", "WTA", "Grand Slams"],
    Icon: GiTennisRacket,
  },
];

const teams = [
  { name: "Mumbai Meteors", tag: "MMB", sport: "Cricket" },
  { name: "Thane Titans", tag: "TNT", sport: "Football" },
  { name: "Vashi Vipers", tag: "VVP", sport: "Basketball" },
  { name: "Dadar Dragons", tag: "DDG", sport: "Cricket" },
  { name: "Kolkata Knights", tag: "KKT", sport: "Football" },
  { name: "Bengaluru Blaze", tag: "BLZ", sport: "Basketball" },
  { name: "Chennai Chargers", tag: "CCG", sport: "Cricket" },
  { name: "Pune Panthers", tag: "PNP", sport: "Football" },
];

// ---------- Helpers ----------
function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
      {children}
    </span>
  );
}

function LogoMark({ size = 36 }) {
  return (
    <div
      className="grid place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-indigo-600 text-white shadow-lg shadow-emerald-500/20"
      style={{ width: size, height: size }}
    >
      <span className="font-black">SS</span>
    </div>
  );
}

// ---------- Headers (responsive) ----------
function HeaderA({ onSignIn = () => {} }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/6 bg-slate-900/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <LogoMark />
          <span className="text-lg font-bold text-white">ScoreSphere</span>
        </div>

        {/* desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm text-white/90">
          <a className="hover:text-white" href="#leagues">
            Leagues
          </a>
          <a className="hover:text-white" href="#teams">
            Teams
          </a>
          <a className="hover:text-white" href="#live">
            Live
          </a>
          <a className="hover:text-white" href="#cta">
            Get App
          </a>
        </nav>

        {/* mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setOpen((s) => !s)}
            className="rounded-md p-2 text-white/90 hover:bg-white/5"
            aria-label="menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <button
          onClick={onSignIn}
          className="hidden rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600 md:inline-block"
        >
          Sign in
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/6 bg-slate-900/80 px-4 py-3">
          <nav className="flex flex-col gap-3 text-white/90">
            <a href="#leagues" className="py-2">
              Leagues
            </a>
            <a href="#teams" className="py-2">
              Teams
            </a>
            <a href="#live" className="py-2">
              Live
            </a>
            <a href="#cta" className="py-2">
              Get App
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function HeaderB() {
  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-indigo-700 via-teal-600 to-emerald-600">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <LogoMark />
          <span className="text-lg font-extrabold tracking-wide">
            ScoreSphere
          </span>
        </div>
        <div className="flex items-center gap-3">
          <input
            placeholder="Search matches, teams..."
            className="hidden w-48 rounded-full bg-white/20 px-3 py-1.5 text-sm placeholder-white/70 outline-none backdrop-blur md:block"
          />
          <button className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium hover:bg-white/25">
            Dashboard
          </button>
        </div>
      </div>
    </header>
  );
}

// ---------- Footers ----------
function FooterA() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="text-xl font-bold">ScoreSphere</span>
          </div>
          <p className="mt-3 text-sm text-white/70">
            Real‑time scores, fixtures, and stats across your favorite leagues.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Leagues</h4>
          <ul className="mt-2 space-y-1 text-sm text-white/70">
            <li>Premier League</li>
            <li>IPL</li>
            <li>NBA</li>
            <li>LaLiga</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Company</h4>
          <ul className="mt-2 space-y-1 text-sm text-white/70">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Get the App</h4>
          <div className="mt-2 flex gap-2">
            <button className="rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20">
              App Store
            </button>
            <button className="rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20">
              Play Store
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-4 text-xs text-white/50">
        © {new Date().getFullYear()} ScoreSphere
      </div>
    </footer>
  );
}

function FooterB() {
  return (
    <footer className="mt-20 bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-700 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="flex items-center gap-3">
          <LogoMark />
          <span className="text-xl font-extrabold">ScoreSphere</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <a href="#leagues" className="hover:underline">
            Leagues
          </a>
          <a href="#teams" className="hover:underline">
            Teams
          </a>
          <a href="#live" className="hover:underline">
            Live
          </a>
          <a href="#cta" className="hover:underline">
            Subscribe
          </a>
        </div>
      </div>
      <div className="mt-4 text-center text-xs text-white/80">
        Built with ♥ for sports fans everywhere.
      </div>
    </footer>
  );
}

// ---------- UI Blocks (responsive tweaks) ----------
const CRICKET_IMAGES = [
  "https://source.unsplash.com/1200x800/?cricket,stadium",
  "https://source.unsplash.com/1200x800/?cricket,bat",
  "https://source.unsplash.com/1200x800/?cricket,ball",
  "https://source.unsplash.com/1200x800/?cricket,india",
];

function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <img
          src={sampleImage}
          alt="Sports stadium"
          className="h-[48vh] md:h-[62vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-slate-950" />
      </div>
      <div className="relative mx-auto flex h-[48vh] md:h-[62vh] max-w-7xl flex-col items-start justify-center px-4 text-white">
        <Badge>LIVE SCORES • MULTI‑SPORT</Badge>
        <h1 className="mt-4 text-2xl font-extrabold leading-tight md:text-6xl md:leading-tight">
          Follow Every Play, Point, and Run
        </h1>
        <p className="mt-3 max-w-full text-sm md:text-base text-white/80">
          One hub for all your favorite leagues — crisp scoreboards, fixtures,
          standings, and player stats.
        </p>
        <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
          <a
            href="#cta"
            className="w-full rounded-xl bg-emerald-500 px-5 py-3 text-center font-semibold text-white shadow hover:bg-emerald-600 sm:w-auto"
          >
            Get Started
          </a>
          <a
            href="#live"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-center font-semibold text-white backdrop-blur hover:bg-white/20 sm:w-auto"
          >
            See Live Now
          </a>
        </div>
      </div>
    </section>
  );
}

function LiveTicker() {
  const [filter, setFilter] = useState("All");
  const leaguesInTicker = Array.from(new Set(liveScores.map((m) => m.league)));
  const filtered =
    filter === "All"
      ? liveScores
      : liveScores.filter((m) => m.league === filter);

  return (
    <section id="live" className="mx-auto mt-6 max-w-7xl px-4">
      <div className="rounded-2xl border border-white/10 bg-slate-900 p-4 text-white shadow-lg">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">Live Now</h3>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-white/70 hidden sm:inline">Filter:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md bg-white/10 px-2 py-1 outline-none border border-white/10 hover:bg-white/15 text-xs"
            >
              <option>All</option>
              {leaguesInTicker.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="rounded-xl bg-white/5 p-3 transition hover:scale-[1.01] hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs text-white/70">{m.league}</div>
                <div className="text-xs text-white/70">{m.minute}</div>
              </div>
              <div className="mt-2 flex items-center justify-between text-white">
                <span className="font-bold text-sm">{m.home}</span>
                <span className="rounded-md bg-amber-500/90 px-2 py-1 text-sm font-bold shadow">
                  {m.score}
                </span>
                <span className="font-bold text-sm">{m.away}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leagues() {
  return (
    <section id="leagues" className="mx-auto mt-10 max-w-7xl px-4 text-white">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-bold md:text-3xl">Leagues</h2>
        <a
          href="#"
          className="text-sm text-emerald-400 hover:underline hidden sm:inline"
        >
          Browse all
        </a>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {leagues.map((l) => (
          <article
            key={l.key}
            className="group rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-4 shadow transition hover:border-emerald-500/30"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-xl">
                {l.Icon ? <l.Icon className="text-teal-400" /> : null}
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">{l.name}</h3>
                <p className="text-xs text-white/70">
                  {l.comps.length} competitions
                </p>
              </div>
            </div>
            <ul className="mt-3 space-y-1 text-xs text-white/70">
              {l.comps.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
            <button className="mt-4 w-full rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700">
              View standings
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function TeamAvatar({ tag }) {
  const bg = useMemo(() => {
    const shades = [
      "from-emerald-500 to-emerald-700",
      "from-indigo-500 to-indigo-700",
      "from-teal-500 to-teal-700",
      "from-fuchsia-500 to-fuchsia-700",
      "from-amber-500 to-amber-700",
      "from-rose-500 to-rose-700",
      "from-cyan-500 to-cyan-700",
      "from-lime-500 to-lime-700",
    ];
    const idx =
      [...tag].reduce((a, c) => a + c.charCodeAt(0), 0) % shades.length;
    return shades[idx];
  }, [tag]);

  return (
    <div
      className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${bg} text-white font-extrabold shadow`}
    >
      {tag}
    </div>
  );
}

function Teams() {
  return (
    <section id="teams" className="mx-auto mt-10 max-w-7xl px-4 text-white">
      <h2 className="text-xl font-bold md:text-3xl">Teams</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {teams.map((t) => (
          <div
            key={t.tag}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900 p-3 shadow"
          >
            <TeamAvatar tag={t.tag} />
            <div className="min-w-0">
              <div className="font-semibold text-sm truncate">{t.name}</div>
              <div className="text-xs text-white/60">{t.sport}</div>
            </div>
            <div className="ml-auto">
              <button className="rounded-lg bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CricketGallery() {
  return (
    <section className="mx-auto mt-10 max-w-7xl px-4 text-white">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-bold md:text-3xl">Cricket Gallery</h2>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CRICKET_IMAGES.map((src, i) => (
          <figure
            key={i}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
          >
            <img
              src={src}
              alt={`Cricket scene ${i + 1}`}
              className="h-36 w-full object-cover transition group-hover:scale-105"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="mx-auto mt-12 max-w-7xl px-4 text-white">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-700 via-fuchsia-700 to-amber-600 p-6 shadow-2xl">
        <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="text-2xl font-extrabold sm:text-4xl">
              Stay Updated <br />{" "}
              <span className="text-amber-300">Never miss a match.</span>
            </h3>
            <p className="mt-3 text-sm md:text-base text-white/90 max-w-md">
              Be the first to know every time your favorite team scores, wins,
              or breaks a record — delivered straight to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex w-full flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/70 outline-none backdrop-blur transition focus:border-white/40"
              />
              <button className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 shadow hover:bg-amber-100 sm:w-auto">
                Notify me
              </button>
            </form>
            <label className="mt-2 inline-flex items-center gap-2 text-xs text-white/70">
              <input type="checkbox" className="accent-fuchsia-500" /> Also send
              SMS alerts
            </label>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md shadow-lg border border-white/10">
              <div className="grid grid-cols-3 gap-3 text-center text-xs sm:text-sm">
                <div className="rounded-xl bg-slate-900/80 p-3">
                  <div className="text-2xl font-black text-amber-400">50+</div>
                  Leagues
                </div>
                <div className="rounded-xl bg-slate-900/80 p-3">
                  <div className="text-2xl font-black text-amber-400">1k+</div>
                  Teams
                </div>
                <div className="rounded-xl bg-slate-900/80 p-3">
                  <div className="text-2xl font-black text-amber-400">Live</div>
                  Updates
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Page Shell ----------
export default function SportsScoringWebsite() {
  const [header, setHeader] = useState("A");
  const [footer, setFooter] = useState("A");

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white">
      {/* Variant Switcher */}
      <div className="fixed bottom-4 right-4 z-50 rounded-2xl border border-white/10 bg-slate-900/90 p-2 text-white shadow-xl backdrop-blur md:p-3">
        <div className="text-xs mb-1 text-white/70">Variants</div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-xs">Header</span>
            <button
              onClick={() => setHeader("A")}
              className={`rounded-md px-2 py-1 text-xs ${
                header === "A"
                  ? "bg-emerald-600"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              A
            </button>
            <button
              onClick={() => setHeader("B")}
              className={`rounded-md px-2 py-1 text-xs ${
                header === "B"
                  ? "bg-emerald-600"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              B
            </button>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs">Footer</span>
            <button
              onClick={() => setFooter("A")}
              className={`rounded-md px-2 py-1 text-xs ${
                footer === "A"
                  ? "bg-indigo-600"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFooter("B")}
              className={`rounded-md px-2 py-1 text-xs ${
                footer === "B"
                  ? "bg-indigo-600"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              B
            </button>
          </div>
        </div>
      </div>

      {header === "A" ? <HeaderA /> : <HeaderB />}
      <main>
        <Hero />
        <LiveTicker />
        <Leagues />
        <CricketGallery />
        <Teams />
        <CTA />
      </main>

      {footer === "A" ? <FooterA /> : <FooterB />}
    </div>
  );
}
