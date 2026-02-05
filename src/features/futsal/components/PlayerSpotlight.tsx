import { useMemo, useState } from "react";
import type { Player, Match } from "@/features/futsal/types";

type Props = {
  players: Player[];
  matches: Match[];
  index: number;
  onChangeIndex: (i: number) => void;
};


export default function PlayerSpotlight({ players, matches, index, onChangeIndex }: Props) {
  const [globalVersion, setGlobalVersion] = useState("2026");
  const [overrides, setOverrides] = useState<Map<string, string>>(new Map());

  const player = players[index];
  const versionKey = resolveVersion(player, globalVersion, overrides);
  const version = player.versions[versionKey];
  const stats = version.stats;

  const appearances = useMemo(
    () => computeAppearances(players, matches),
    [players, matches]
  );

  const avgRatings = useMemo(
    () => computeAverageRatings(matches),
    [matches]
  );

  const isGK =
    Array.isArray(player.role)
      ? player.role.includes("GK")
      : player.role === "GK";

  return (
    <div className="card" id="playerSpotlightCard">
      <div className="card-pad">
        <div className="spot-top">
          <h2 style={{ margin: 0 }}>Player Stats</h2>

          <select
            className="spot-version spot-version--global"
            value={globalVersion}
            onChange={(e) => setGlobalVersion(e.target.value)}
          >
            {getAllVersions(players).map((v) => (
              <option key={v} value={v}>
                {v.toUpperCase()}
              </option>
            ))}
          </select>

          <div className="spot-nav">
            <button
              className="pill spot-btn"
              onClick={() =>
                onChangeIndex((index - 1 + players.length) % players.length)
              }
            >
              ⬅
            </button>

            <button
              className="pill spot-btn"
              onClick={() =>
                onChangeIndex((index + 1) % players.length)
              }
            >
              ➡
            </button>

          </div>
        </div>

        <div className="divider" />

        <div className="spot-body">
          <div className="spot-left">
            <div className="spot-face">
              <img src={version.image} alt={player.name} />
              <div className="spot-ovr">{calculateOVR(stats)}</div>
            </div>

            <div className="spot-name">{player.name}</div>
            <div className="spot-role">
              {Array.isArray(player.role) ? player.role.join(" / ") : player.role}
            </div>

            <select
              className="spot-version spot-version--player"
              value={overrides.get(player.id) ?? versionKey}
              onChange={(e) =>
                setOverrides(new Map(overrides).set(player.id, e.target.value))
              }
            >
              {Object.keys(player.versions).map((v) => (
                <option key={v} value={v}>
                  {v.toUpperCase()}
                </option>
              ))}
            </select>

            <div className="spot-subver">Version: {versionKey.toUpperCase()}</div>
          </div>

          <div className="spot-right">
            {isGK ? (
              <>
                <Stat label="REFLEX" value={stats.reflex ?? 0} />
                <Stat label="HANDLING" value={stats.handling ?? 0} />
                <Stat label="POSITIONING" value={stats.positioning ?? 0} />
                <Stat label="PHYSICAL" value={stats.physical ?? 0} />
              </>
            ) : (
              <>
                <Stat label="PACE" value={stats.pace ?? 0} />
                <Stat label="SHOT" value={stats.shot ?? 0} />
                <Stat label="PASS" value={stats.pass ?? 0} />
                <Stat label="DRIBBLING" value={stats.dribbling ?? 0} />
                <Stat label="PHYSICAL" value={stats.physical ?? 0} />
                <Stat label="ACCUARACY" value={stats.accuaracy ?? 0} />
              </>
            )}

            <div className="spot-apps">
              Apps: {appearances.get(player.id) ?? 0}
            </div>

            <div className="spot-apps">
              Overall Rating: {avgRatings.get(player.id) ?? "—"} /10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= helpers ================= */

function Stat({ label, value }: { label: string; value: number }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="spot-row">
      <div className="spot-label">{label}</div>
      <div className="spot-bar">
        <div className="spot-fill" style={{ width: `${v}%` }} />
      </div>
      <div className="spot-val">{v}</div>
    </div>
  );
}

function resolveVersion(
  player: Player,
  global: string,
  overrides: Map<string, string>
) {
  const want = overrides.get(player.id) || global;
  if (player.versions[want]) return want;
  if (player.versions["2026"]) return "2026";
  return Object.keys(player.versions)[0];
}

function getAllVersions(players: Player[]) {
  return Array.from(
    new Set(players.flatMap((p) => Object.keys(p.versions)))
  ).sort();
}

function calculateOVR(stats: any) {
  const skill = Math.min(5, stats.skillmove ?? 0) * 20;
  if (stats.reflex != null) {
    return Math.round(
      stats.reflex * 0.4 +
        stats.handling * 0.3 +
        stats.positioning * 0.2 +
        stats.physical * 0.1
    );
  }
  return Math.round(
    stats.pace * 0.16 +
      stats.shot * 0.16 +
      stats.pass * 0.16 +
      stats.dribbling * 0.16 +
      stats.physical * 0.16 +
      stats.accuaracy * 0.1 +
      skill * 0.1
  );
}

function computeAppearances(players: Player[], matches: Match[]) {
  const map = new Map<string, number>();
  players.forEach((p) => map.set(p.id, 0));
  matches.forEach((m) =>
    m.participants?.forEach((p) =>
      map.set(p.id, (map.get(p.id) ?? 0) + 1)
    )
  );
  return map;
}

function computeAverageRatings(matches: Match[]) {
  const acc = new Map<string, { sum: number; count: number }>();
  matches.forEach((m) =>
    m.participants?.forEach((p) => {
      if (p.rating == null) return;
      const v = acc.get(p.id) ?? { sum: 0, count: 0 };
      v.sum += p.rating;
      v.count += 1;
      acc.set(p.id, v);
    })
  );
  return new Map(
    [...acc.entries()].map(([id, v]) => [id, +(v.sum / v.count).toFixed(1)])
  );
}
