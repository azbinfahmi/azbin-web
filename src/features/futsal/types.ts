export type PlayerStats = {
  pace?: number;
  shot?: number;
  pass?: number;
  dribbling?: number;
  physical?: number;
  accuaracy?: number;
  skillmove?: number;

  // GK
  reflex?: number;
  handling?: number;
  positioning?: number;
};

export type PlayerVersion = {
  image?: string;
  stats: PlayerStats;
};

export type Player = {
  id: string;
  name: string;
  role: string | string[];
  activeVersion?: string;
  versions: Record<string, PlayerVersion>;
};


export type MatchParticipant = {
  id: string;
  rating?: number;
};

export type Match = {
  team: string;
  date: string;
  ourGoals: number;
  theirGoals: number;
  participants?: MatchParticipant[];
};

export type Team = {
  name: string;
  coach: string;
  players: Player[];
  matches: Match[];
  nextGame?: {
    team: string;
    date: string;
    court: string;
    participants?: MatchParticipant[];
  };
};
