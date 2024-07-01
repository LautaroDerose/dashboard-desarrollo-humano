const STATUS_ON_DECK = { id: 1, name: "On Deck", color: "#63B3ED" };
const STATUS_IN_PROGRESS = { id: 2, name: "In Progress", color: "#ECC94B"};
const STATUS_TESTING = { id: 3, name: "Testing", color: "#F687B3" };
const STATUS_DEPLOYED = { id: 4, name: "Deployed", color: "#68D391" };
export const STATUSES = [
  STATUS_ON_DECK,
  STATUS_IN_PROGRESS,
  STATUS_TESTING,
  STATUS_DEPLOYED,
];

export const nasvLinks = [
  {
    id: 1,
    label: "Dashboard",
    href: "/dashboard"
  },
  {
    id: 2,
    label: "Asignaciones",
    href: "/dashboard/assignments"
  },
  {
    id: 3,
    label: "Personas",
    href: "/dashboard/recipients"
  },
  {
    id: 4,
    label: "Beneficios",
    href: "/dashboard/benefits"
  },
  {
    id: 5,
    label: "Estadisticas",
    href: "#"
  },
  {
    id: 6,
    label: "Informes",
    href: "#"
  },
]
  