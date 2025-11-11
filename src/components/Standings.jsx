import React, { useState } from "react";
import { FaFutbol, FaBasketballBall } from "react-icons/fa";
import { GiCricketBat, GiTennisRacket } from "react-icons/gi";

function Standings() {
  const ICON_CLASS = "text-teal-400 text-xl";

  // Icon mapping by sport name
  const sportIcons = {
    Football: <FaFutbol className={ICON_CLASS} />,
    Cricket: <GiCricketBat className={ICON_CLASS} />,
    Basketball: <FaBasketballBall className={ICON_CLASS} />,
    Tennis: <GiTennisRacket className={ICON_CLASS} />,
  };

  // --- Sample data (replace with your real `sports` array) ---
  const sports = [
    {
      name: "Football",
      leagues: [
        {
          key: "epl",
          name: "Premier League",
          teams: [
            { name: "Manchester City", pts: 90 },
            { name: "Arsenal", pts: 88 },
            { name: "Liverpool", pts: 82 },
            { name: "Aston Villa", pts: 68 },
            { name: "Tottenham Hotspur", pts: 66 },
            { name: "Chelsea", pts: 63 },
            { name: "Newcastle United", pts: 61 },
            { name: "Manchester United", pts: 60 },
            { name: "West Ham United", pts: 55 },
            { name: "Brighton & Hove Albion", pts: 52 },
            { name: "Crystal Palace", pts: 49 },
            { name: "Fulham", pts: 47 },
            { name: "Brentford", pts: 46 },
            { name: "Wolverhampton Wanderers", pts: 44 },
            { name: "Nottingham Forest", pts: 40 },
            { name: "Everton", pts: 38 },
            { name: "Luton Town", pts: 35 },
            { name: "Burnley", pts: 32 },
            { name: "Sheffield United", pts: 30 },
            { name: "Bournemouth", pts: 29 },
          ],
        },
        {
          key: "la",
          name: "La Liga",
          teams: [
            { name: "Real Madrid", pts: 90 },
            { name: "Barcelona", pts: 85 },
            { name: "Girona", pts: 78 },
            { name: "Atletico Madrid", pts: 75 },
            { name: "Athletic Bilbao", pts: 68 },
            { name: "Real Sociedad", pts: 64 },
            { name: "Real Betis", pts: 60 },
            { name: "Valencia", pts: 58 },
            { name: "Villarreal", pts: 56 },
            { name: "Osasuna", pts: 52 },
            { name: "Rayo Vallecano", pts: 48 },
            { name: "Celta Vigo", pts: 46 },
            { name: "Las Palmas", pts: 45 },
            { name: "Getafe", pts: 43 },
            { name: "Mallorca", pts: 41 },
            { name: "Alaves", pts: 38 },
            { name: "Cadiz", pts: 36 },
            { name: "Granada", pts: 33 },
            { name: "Sevilla", pts: 32 },
            { name: "Almeria", pts: 28 },
          ],
        },
      ],
    },
    {
      name: "Cricket",
      leagues: [
        {
          key: "ipl",
          name: "Indian Premier League",
          teams: [
            { name: "Chennai Super Kings", pts: 20 },
            { name: "Mumbai Indians", pts: 18 },
            { name: "Kolkata Knight Riders", pts: 17 },
            { name: "Royal Challengers Bengaluru", pts: 16 },
            { name: "Rajasthan Royals", pts: 15 },
            { name: "Delhi Capitals", pts: 14 },
            { name: "Sunrisers Hyderabad", pts: 13 },
            { name: "Lucknow Super Giants", pts: 12 },
            { name: "Gujarat Titans", pts: 11 },
            { name: "Punjab Kings", pts: 10 },
          ],
        },
      ],
    },
  ];
  // ----------------------------------------------------------

  // Safe state initializers
  const [selectedSport, setSelectedSport] = useState(sports?.[0]?.name ?? "");
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Derived data with safe fallbacks
  const sportData = sports?.find((s) => s.name === selectedSport) ?? null;
  const leagues = sportData?.leagues ?? [];
  const leagueData = selectedLeague
    ? leagues.find((l) => l.key === selectedLeague) ?? null
    : null;
  const teams = leagueData?.teams ?? [];

  // NEW: total teams for selected sport (sum across leagues)
  const totalTeams =
    sportData?.leagues?.reduce((acc, l) => acc + (l.teams?.length ?? 0), 0) ??
    0;

  if (!sports || sports.length === 0) {
    return (
      <section className="mx-auto mt-8 max-w-7xl px-4 text-white">
        <h2 className="text-xl font-bold md:text-2xl">Standings</h2>
        <p className="mt-4 text-sm text-white/70">
          No sports data available. Please provide a `sports` array.
        </p>
      </section>
    );
  }

  return (
    <section id="standings" className="mx-auto mt-8 max-w-7xl px-4 text-white">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold md:text-2xl">Standings</h2>
          {/* NEW: display total teams for selected sport */}
          <p className="mt-1 text-sm text-white/70">
            {selectedSport ? (
              <>
                <span className="font-medium">{selectedSport}</span> —{" "}
                <span>{totalTeams} teams</span>
              </>
            ) : (
              "Select a sport"
            )}
          </p>
        </div>

        <div className="flex gap-2">
          {sports.map((s) => (
            <button
              key={s.name}
              onClick={() => {
                setSelectedSport(s.name);
                setSelectedLeague(null);
                setShowModal(false);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                selectedSport === s.name
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-slate-800 text-white/80"
              }`}
              aria-pressed={selectedSport === s.name}
            >
              <span className="hidden sm:inline">{sportIcons[s.name]}</span>
              <span className="truncate max-w-[70px] sm:max-w-none">
                {s.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Leagues grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {leagues.map((l) => (
          <article
            key={l.key}
            className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-4 sm:p-5 shadow-lg transition hover:border-emerald-500/30"
            role="region"
            aria-labelledby={`league-${l.key}`}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/8 text-xl">
                {sportIcons[selectedSport]}
              </div>
              <div className="min-w-0">
                <h3
                  id={`league-${l.key}`}
                  className="font-semibold text-sm sm:text-base truncate"
                >
                  {l.name}
                </h3>
                <p className="text-xs text-white/70">{l.teams.length} teams</p>
              </div>
            </div>

            <ul className="mt-3 space-y-1 text-sm text-white/70">
              {l.teams.slice(0, 3).map((t) => (
                <li key={t.name} className="flex justify-between items-center">
                  <span className="truncate">• {t.name}</span>
                  <span className="ml-2 text-white/80 text-xs sm:text-sm">
                    {t.pts} pts
                  </span>
                </li>
              ))}

              {l.teams.length > 3 && (
                <li className="text-xs text-white/60">
                  + {l.teams.length - 3} more
                </li>
              )}
            </ul>

            <button
              onClick={() => {
                setSelectedLeague(l.key);
                setShowModal(true);
              }}
              className="mt-4 w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              View standings
            </button>
          </article>
        ))}
      </div>

      {/* Modal / Centered dialog */}
      {showModal && leagueData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Centered card */}
          <div
            className="w-full max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-4 sm:p-6 shadow-lg
                        max-h-[92vh] overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/8">
                  {sportIcons[selectedSport]}
                </div>
                <div className="min-w-0">
                  <h3
                    id="modal-title"
                    className="text-lg font-semibold truncate"
                  >
                    {leagueData.name} Standings
                  </h3>
                  <p className="text-xs text-white/70">
                    {leagueData.teams.length} teams
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-xl leading-none px-3 py-1 rounded-lg bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto max-h-[64vh] pr-2">
              <ol className="space-y-3 text-sm">
                {teams
                  .slice()
                  .sort((a, b) => b.pts - a.pts)
                  .map((team, idx) => (
                    <li
                      key={team.name}
                      className="flex items-center justify-between rounded-lg bg-white/3 p-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 text-center font-medium">
                          {idx + 1}
                        </div>
                        <div className="font-medium truncate">{team.name}</div>
                      </div>
                      <div className="text-sm text-white/80">
                        {team.pts} pts
                      </div>
                    </li>
                  ))}
              </ol>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl bg-white/5 px-4 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Standings;
