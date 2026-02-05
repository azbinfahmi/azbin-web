import Head from "next/head";
import { useMemo, useState } from "react";

import teamData from "@/features/futsal/data/team.json";
import type { Team, Match } from "@/features/futsal/types";
import PlayerSpotlight from "@/features/futsal/components/PlayerSpotlight";
import TeamChant from "@/features/futsal/components/TeamChant";

const TEAM = teamData as Team;

export default function FutsalPage(){
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [expandedMatch, setExpandedMatch] = useState<number | null>(null);

  const squadStats = useMemo(() => computeTeamStats(TEAM.matches), []);
  
  function jumpToPlayer(playerId: string) {
    const idx = TEAM.players.findIndex((p) => p.id === playerId);
    if (idx === -1) return;

    setSpotlightIndex(idx);

    document
      .getElementById("playerSpotlightCard")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <Head>
        <title>{TEAM.name}</title>
      </Head>

      <header className="nav">
        <div className="nav-inner">
          <div className="brand">
            <img
              className="brandLogo"
              src="/futsal/images/sr-badge.png"
              alt="SR badge"
            />
            <div className="brandText">
              <div className="brandName">{TEAM.name}</div>
              <div className="brandSub">Futsal Team</div>
            </div>
          </div>
        </div>
      </header>

      <main className="wrap">
        {/* HERO */}
        <section className="hero">
          <div className="card">
            <div className="card-pad">
              <h1 className="title">{TEAM.name}</h1>
              <p className="sub">
                #RakyatJagaRakyat #KitaBelumMenang #PantangMundurKecualiOperasi
              </p>
              <TeamChant />
            </div>
          </div>

          {/* STATS */}
          <aside className="hero-right">
            <div className="card">
              <div className="card-pad">
                <h2>Squad Stats</h2>

                <div className="stat-grid">
                  <Stat label="Wins" value={squadStats.wins} />
                  <Stat label="Losses" value={squadStats.losses} />
                  <Stat label="Goals" value={squadStats.goalsFor} />
                  <Stat label="Matches" value={squadStats.totalMatches} />
                </div>

                <div className="divider" />
                  <div className="mini">
                    <strong>Coach</strong>
                    <div
                      className="tag"
                      role="button"
                      tabIndex={0}
                      style={{ cursor: "pointer" }}
                      onClick={() => jumpToPlayer(TEAM.coach)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          jumpToPlayer(TEAM.coach);
                        }
                      }}
                    >
                      {TEAM.coach}
                    </div>
                  </div>
              </div>
            </div>
            <PlayerSpotlight
              players={TEAM.players}
              matches={TEAM.matches}
              index={spotlightIndex}
              onChangeIndex={setSpotlightIndex}
            />

          </aside>
        </section>

        {/* MATCHES */}
        <section className="section">
          <div className="card">
            <div className="card-pad">
              <h2>Recent Matches</h2>

              <div className="list">
                {TEAM.matches.map((match, i) => (
                <MatchRow
                  key={`${match.team}-${match.date}`}
                  match={match}
                  open={expandedMatch === i}
                  onToggle={() =>
                    setExpandedMatch(expandedMatch === i ? null : i)
                  }
                  onSelectPlayer={(playerId) => {
                    const idx = TEAM.players.findIndex(p => p.id === playerId);
                    if (idx !== -1) {
                      setSpotlightIndex(idx);

                      document
                        .getElementById("playerSpotlightCard")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                />
              ))}

              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/* ================= helpers ================= */

function computeTeamStats(matches: Match[]) {
  let wins = 0;
  let losses = 0;
  let goalsFor = 0;

  for (const m of matches) {
    goalsFor += m.ourGoals;

    if (m.ourGoals > m.theirGoals) wins++;
    else if (m.ourGoals < m.theirGoals) losses++;
  }

  return {
    wins,
    losses,
    goalsFor,
    totalMatches: matches.length,
  };
}

/* ================= components ================= */

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat">
      <div className="num">{value}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}

function MatchRow({match,open,onToggle,onSelectPlayer}: {
  match: Match;
  open: boolean;
  onToggle: () => void;
  onSelectPlayer: (playerId: string) => void;}) {
  const result = match.ourGoals > match.theirGoals ? "win" : match.ourGoals < match.theirGoals ? "loss" : "draw";
  return (
    <>
      <div className={`match ${open ? "open" : ""}`} onClick={onToggle}>
        <div>
          <strong>vs {match.team}</strong>
          <div className="small">{match.date}</div>
        </div>

        <div className="match-right">
          <div className={`result ${result}`}>
            {match.ourGoals}–{match.theirGoals}
          </div>
          <div className="match-caret">▾</div>
        </div>
      </div>

      {open && match.participants && (
        <div className="match-expand">
          <strong>Participants</strong>
          <div className="participants">
            {match.participants.map((p) => {
              const isSquad = TEAM.players.some(pl => pl.id === p.id);

              return (
                <span
                  key={p.id}
                  className={`participant ${isSquad ? "squad" : "guest"}`}
                  onClick={() => {
                    if (isSquad) onSelectPlayer(p.id);
                  }}
                >
                  <span className="name">
                    {p.id}
                    {!isSquad && " (Guest)"}
                  </span>
                  <span className="rate">
                    {p.rating?.toFixed(1) ?? "—"}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
