export interface Pick {
  id: number;
  tipster: string;
  sport: string;
  match: string;
  time: string;
  odds: string;
  rank: string;
  analysis: string;
  betType: string;
  record: { wins: number; losses: number };
  purchases: number;
  avatar: string;
}

export interface UserBet {
  id: number;
  date: string;
  sport: string;
  match: string;
  status: "won" | "lost" | "pending";
  result: string;
  odds: string;
}

export interface TipsterPick {
  id: number;
  event: string;
  sport: string;
  odds: string;
  status: "won" | "lost" | "pending";
  date: string;
  analysis: string;
  suggestedBet: string;
  originalOdds: string;
  purchases: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  isPremium: boolean;
  role: "user" | "tipster";
  bio: string;
  avatar: string | null;
  stats: {
    picks: number;
    won: number;
    lost: number;
    pending: number;
    winrate: number;
  };
  picks: { id: number; match: string; result: "won" | "lost" | "pending" }[];
}

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  isLoggedIn: boolean;
  logout: () => void;
  updateCredits: (amount: number) => void;
  updateUser: (updatedUser: Partial<User>) => void;
};
