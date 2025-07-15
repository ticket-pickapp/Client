import { TipsterPick } from "../types/types";

export const tipsterPicks: TipsterPick[] = [
  {
    id: 1,
    event: "Real Madrid vs Barcelona",
    sport: "Fútbol",
    odds: "2.15",
    status: "won",
    date: "2024-01-15",
    analysis:
      "El Real Madrid llega en excelente forma tras ganar los últimos 5 partidos. Barcelona tiene 3 bajas importantes en defensa y su rendimiento como visitante ha sido irregular esta temporada.",
    suggestedBet: "1X2 - Victoria Local",
    originalOdds: "2.15",
    purchases: 234,
  },
  {
    id: 2,
    event: "Lakers vs Warriors",
    sport: "Baloncesto",
    odds: "1.85",
    status: "lost",
    date: "2024-01-14",
    analysis:
      "Los Lakers venían de una buena racha, pero la ausencia de Anthony Davis fue determinante. Warriors aprovechó su ventaja de local y el buen momento de Curry.",
    suggestedBet: "Handicap -4.5 Lakers",
    originalOdds: "1.85",
    purchases: 189,
  },
  {
    id: 3,
    event: "Djokovic vs Alcaraz",
    sport: "Tenis",
    odds: "1.95",
    status: "pending",
    date: "2024-01-16",
    analysis:
      "Djokovic domina históricamente en superficie dura. Alcaraz viene recuperándose de una lesión menor, pero su nivel sigue siendo alto. Partido muy equilibrado.",
    suggestedBet: "Ganador del Partido - Djokovic",
    originalOdds: "1.95",
    purchases: 156,
  },
  {
    id: 4,
    event: "Manchester City vs Arsenal",
    sport: "Fútbol",
    odds: "1.75",
    status: "won",
    date: "2024-01-12",
    analysis:
      "City en casa es prácticamente imbatible. Arsenal sin varios titulares y con problemas defensivos. La diferencia de calidad debería notarse.",
    suggestedBet: "1X2 - Victoria Local",
    originalOdds: "1.75",
    purchases: 298,
  },
  {
    id: 5,
    event: "Celtics vs Heat",
    sport: "Baloncesto",
    odds: "2.10",
    status: "won",
    date: "2024-01-11",
    analysis:
      "Boston en el TD Garden es muy fuerte. Heat viene de un calendario muy exigente y varios jugadores con molestias. Ventaja clara para los locales.",
    suggestedBet: "Handicap -6.5 Celtics",
    originalOdds: "2.10",
    purchases: 167,
  },
];
