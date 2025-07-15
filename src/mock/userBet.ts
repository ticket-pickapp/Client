import { UserBet } from "../types/types";

export const userBets: UserBet[] = [
  {
    id: 1,
    date: "2024-01-15",
    sport: "Fútbol",
    match: "Real Madrid vs Barcelona",
    status: "won",
    result: "2-1",
    odds: "2.15",
  },
  {
    id: 2,
    date: "2024-01-14",
    sport: "Baloncesto",
    match: "Lakers vs Warriors",
    status: "lost",
    result: "98-105",
    odds: "1.85",
  },
  {
    id: 3,
    date: "2024-01-13",
    sport: "Tenis",
    match: "Djokovic vs Alcaraz",
    status: "pending",
    result: "-",
    odds: "1.95",
  },
  {
    id: 4,
    date: "2024-01-12",
    sport: "Fútbol",
    match: "Manchester City vs Arsenal",
    status: "won",
    result: "3-1",
    odds: "1.75",
  },
  {
    id: 5,
    date: "2024-01-11",
    sport: "Baloncesto",
    match: "Celtics vs Heat",
    status: "lost",
    result: "89-92",
    odds: "2.10",
  },
];
