import { Pick } from "../types/types";

export const picks: Pick[] = [
  {
    id: 1,
    tipster: "ProFootball_ES",
    sport: "Fútbol",
    match: "Real Madrid vs Barcelona",
    time: "21:00",
    odds: "2.15",
    rank: "Gold",
    analysis:
      "El Real Madrid llega en mejor forma física y con ventaja de jugar en casa. Barcelona tiene 3 bajas importantes en defensa.",
    betType: "1X2 - Victoria Local",
    record: { wins: 47, losses: 8 },
    purchases: 234,
    avatar: "RF",
  },
  {
    id: 2,
    tipster: "BasketPro_Analytics",
    sport: "Baloncesto",
    match: "Lakers vs Warriors",
    time: "02:30",
    odds: "1.85",
    rank: "Platinum",
    analysis:
      "Los Lakers han ganado los últimos 4 enfrentamientos directos. Warriors sin Curry confirmado.",
    betType: "Handicap -4.5",
    record: { wins: 62, losses: 12 },
    purchases: 189,
    avatar: "BA",
  },
  {
    id: 3,
    tipster: "TennisExpert_Pro",
    sport: "Tenis",
    match: "Djokovic vs Alcaraz",
    time: "15:30",
    odds: "1.95",
    rank: "Gold",
    analysis:
      "Djokovic domina en superficie dura. Alcaraz viene de una lesión menor en el tobillo.",
    betType: "Ganador del Partido",
    record: { wins: 38, losses: 7 },
    purchases: 156,
    avatar: "TE",
  },
];
