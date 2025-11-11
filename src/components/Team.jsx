// src/components/Teams.jsx
import React, { useEffect, useRef, useState } from "react";

/* -------------------------
   Sample teams (unique names)
   ------------------------- */
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

/* -------------------------
   TeamAvatar - small badge
   ------------------------- */
function TeamAvatar({ tag, size = 48, className = "" }) {
  // deterministic gradient choice by tag
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
  const idx = [...tag].reduce((s, c) => s + c.charCodeAt(0), 0) % shades.length;
  const bg = shades[idx];

  return (
    <div
      className={`grid place-items-center rounded-xl bg-gradient-to-br ${bg} text-white font-extrabold ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="leading-none">{tag}</span>
    </div>
  );
}

/* ---------------------------------------------------
   Deterministic 10-player generator (different names)
   --------------------------------------------------- */
function getPlayersForTeam(tag) {
  const firstPools = [
    [
      "Ravi",
      "Amit",
      "Sahil",
      "Harsh",
      "Nikhil",
      "Rahul",
      "Aditya",
      "Karan",
      "Vikram",
      "Sameer",
      "Viresh",
    ],
    [
      "Arjun",
      "Manish",
      "Anil",
      "Rohit",
      "Yash",
      "Dev",
      "Pranav",
      "Ishan",
      "Suyash",
      "Kiran",
      "prathamesh",
    ],
    [
      "Aakash",
      "Deep",
      "Gaurav",
      "Tejas",
      "Naman",
      "Ritesh",
      "Siddharth",
      "Kunal",
      "Anuj",
      "Rakesh",
      "aarif",
    ],
  ];
  const roles = [
    "Captain",
    "Batsman",
    "Batsman",
    "Batsman",
    "Batsman",
    "All-rounder",
    "Bowler",
    "Bowler",
    "Bowler",
    "Bowler",
    "Bowler",
  ];

  const sum = [...tag].reduce((s, c) => s + c.charCodeAt(0), 0);
  const poolIdx = sum % firstPools.length;
  const firstNames = firstPools[poolIdx];
  const offset = sum % 26;

  return Array.from({ length: 11 }).map((_, i) => {
    const fname = firstNames[(i + offset) % firstNames.length];
    const surnameChar = String.fromCharCode(65 + ((i + offset) % 26));
    const name = `${fname} ${surnameChar}`;
    return {
      name,
      role: roles[i % roles.length],
      number: i + 1,
      initials: name
        .split(" ")
        .map((s) => s[0])
        .slice(0, 2)
        .join(""),
    };
  });
}

/* -------------------------
   TeamModal (mobile bottom sheet)
   ------------------------- */
function TeamModal({ open, onClose, team }) {
  const sheetRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !team) return null;
  const players = getPlayersForTeam(team.tag);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet / Dialog */}
      <div
        ref={sheetRef}
        className="relative z-10 w-full sm:w-full md:max-w-xl rounded-t-2xl sm:rounded-2xl border border-white/10
                   bg-gradient-to-b from-slate-900/95 to-slate-950/95 shadow-xl
                   max-h-[92vh] sm:max-h-[80vh] overflow-hidden
                   animate-[slideUp_240ms_ease-out]"
      >
        {/* drag handle hint (mobile) */}
        <div className="sm:hidden mx-auto mt-2 h-1.5 w-10 rounded-full bg-white/15" />

        {/* Sticky header */}
        <div
          className="sticky top-0 z-10 flex items-start sm:items-center justify-between gap-3
                        bg-transparent px-4 sm:px-6 pt-4 pb-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            <TeamAvatar tag={team.tag} size={48} className="rounded-xl" />
            <div className="min-w-0">
              <h3
                id="team-modal-title"
                className="text-base sm:text-lg font-semibold text-white truncate"
              >
                {team.name}
              </h3>
              <p className="text-xs text-white/60">{team.sport}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="shrink-0 rounded-lg bg-white/8 px-3 py-1.5 text-sm text-white/90 hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            aria-label="Close"
          >
            Close
          </button>
        </div>

        {/* Divider */}
        <hr className="border-white/10" />

        {/* Scroll area */}
        <div className="overflow-y-auto max-h-[76vh] sm:max-h-[60vh] px-4 sm:px-6 py-4">
          <h4 className="mb-3 text-sm font-semibold text-white/90">Players</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {players.map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 shrink-0 rounded-full bg-white/10 grid place-items-center font-semibold text-xs text-white">
                    {p.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate">{p.name}</div>
                    <div className="text-xs text-white/60">{p.role}</div>
                  </div>
                </div>
                <div className="text-xs text-white/60">#{p.number}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* tiny keyframes for slide-up */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(12px); opacity: 0.98; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* -------------------------
   TeamCard component
   ------------------------- */
function TeamCard({ team, onView }) {
  return (
    <button
      onClick={() => onView(team)}
      className="group flex w-full items-center gap-3 sm:gap-4 rounded-2xl border border-white/10
                 bg-gradient-to-b from-slate-900 to-slate-950 p-3.5 sm:p-4 text-left shadow
                 hover:border-emerald-500/30 hover:translate-y-[-2px] active:scale-[0.995]
                 transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
      aria-haspopup="dialog"
    >
      <TeamAvatar tag={team.tag} size={52} />
      <div className="min-w-0">
        <div className="font-semibold text-[15px] sm:text-base truncate">
          {team.name}
        </div>
        <div className="text-xs text-white/60">{team.sport}</div>
      </div>
      <div className="ml-auto hidden items-center gap-2 sm:flex text-white/60">
        <span className="text-xs">View</span>
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M9 18l6-6-6-6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
}

/* -------------------------
   Main Teams component
   ------------------------- */
export default function Teams() {
  const [activeTeam, setActiveTeam] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const lastFocusRef = useRef(null);

  function openTeam(team) {
    lastFocusRef.current = document.activeElement;
    setActiveTeam(team);
    setModalOpen(true);
    document.body.style.overflow = "hidden"; // lock scroll
  }

  function closeModal() {
    setModalOpen(false);
    setActiveTeam(null);
    document.body.style.overflow = ""; // restore scroll
    // return focus to last trigger (basic a11y)
    if (lastFocusRef.current && lastFocusRef.current.focus) {
      lastFocusRef.current.focus();
    }
  }

  return (
    <section id="teams" className="mx-auto mt-10 max-w-7xl px-4 text-white">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-bold md:text-3xl">Teams</h2>
      </div>

      {/* Grid: mobile 1 col, sm:2, lg:4 */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {teams.map((t) => (
          <div key={t.tag}>
            <TeamCard team={t} onView={openTeam} />
          </div>
        ))}
      </div>

      <TeamModal open={modalOpen} onClose={closeModal} team={activeTeam} />
    </section>
  );
}
