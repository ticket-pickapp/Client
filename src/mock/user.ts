export const mockUsers = [
  {
    id: "1",
    name: "Juan Perez",
    email: "usuario@prueba.com",
    credits: 120,
    isPremium: true,
    role: "user",
    bio: "Apostador apasionado por el fútbol y el tenis.",
    avatar: null, // Puedes poner una url o null para inicial
    stats: {
      picks: 34,
      won: 18,
      lost: 12,
      pending: 4,
      winrate: 60,
    },
    picks: [
      { id: 1, match: "Real Madrid vs Barcelona", result: "won" },
      { id: 2, match: "River vs Boca", result: "lost" },
    ],
  },
  {
    id: "2",
    name: "Tipster Profesional",
    email: "tipster@prueba.com",
    credits: 300,
    isPremium: true,
    role: "tipster",
    bio: "Tipster profesional con experiencia en ligas europeas.",
    avatar: null,
    stats: {
      picks: 120,
      won: 80,
      lost: 30,
      pending: 10,
      winrate: 72,
    },
    picks: [
      { id: 3, match: "Chelsea vs Arsenal", result: "won" },
      { id: 4, match: "PSG vs Marsella", result: "pending" },
    ],
  },
];

export function getUserById(id: string) {
  return mockUsers.find((u) => u.id === id);
}
