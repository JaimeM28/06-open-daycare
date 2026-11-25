export const avatarColors = {
  blue: "bg-[#A9D9E8] text-[#1F7A93]",
  pink: "bg-[#F4B8CC] text-[#C44A7A]",
  green: "bg-[#B9DEC4] text-[#3E8B62]",
  yellow: "bg-[#F4DC8E] text-[#9A7B1E]",
  purple: "bg-[#C9B6E8] text-[#7B5FC0]",
  parentPurple: "bg-[#C9B6E8] text-white",
  parentBlue: "bg-[#A9C7E8] text-white",
};

export type Parent = {
  id: string;
  name: string;
  initial: string;
  avatarColor: keyof typeof avatarColors;
  relationship: "Mamá" | "Papá";
  status: "active" | "pending";
};

export type Child = {
  id: string;
  name: string;
  age: number;
  initial: string;
  avatarColor: keyof typeof avatarColors;
  birthDate: string;
  classroom: string;
  enrollmentDate: string;
  allergyLabel: string | null;
  notes: string;
  parents: Parent[];
};

// Datos de demostración; las edades y fechas reproducen el contexto de las plantillas.
export const children: Child[] = [
  {
    id: "mateo-fernandez",
    name: "Mateo Fernández",
    age: 3,
    initial: "M",
    avatarColor: "blue",
    birthDate: "12 mar 2022",
    classroom: "Soles",
    enrollmentDate: "feb 2025",
    allergyLabel: "MANÍ",
    notes: "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    parents: [
      { id: "lucia-fernandez", name: "Lucía Fernández", initial: "L", avatarColor: "parentPurple", relationship: "Mamá", status: "active" },
      { id: "diego-fernandez", name: "Diego Fernández", initial: "D", avatarColor: "parentBlue", relationship: "Papá", status: "pending" },
    ],
  },
  {
    id: "sofia-mendez",
    name: "Sofía Méndez",
    age: 2,
    initial: "S",
    avatarColor: "pink",
    birthDate: "8 sep 2022",
    classroom: "Soles",
    enrollmentDate: "mar 2025",
    allergyLabel: null,
    notes: "Trae su manta para la siesta. Disfruta escuchar cuentos antes de dormir.",
    parents: [
      { id: "ana-mendez", name: "Ana Méndez", initial: "A", avatarColor: "parentPurple", relationship: "Mamá", status: "active" },
    ],
  },
  {
    id: "benjamin-ruiz",
    name: "Benjamín Ruiz",
    age: 3,
    initial: "B",
    avatarColor: "green",
    birthDate: "21 ene 2022",
    classroom: "Soles",
    enrollmentDate: "feb 2025",
    allergyLabel: null,
    notes: "Le gustan los bloques y las actividades al aire libre. Trae una muda en la mochila.",
    parents: [
      { id: "elena-ruiz", name: "Elena Ruiz", initial: "E", avatarColor: "parentPurple", relationship: "Mamá", status: "active" },
      { id: "pablo-ruiz", name: "Pablo Ruiz", initial: "P", avatarColor: "parentBlue", relationship: "Papá", status: "active" },
    ],
  },
  {
    id: "valentina-soto",
    name: "Valentina Soto",
    age: 2,
    initial: "V",
    avatarColor: "yellow",
    birthDate: "4 nov 2022",
    classroom: "Soles",
    enrollmentDate: "abr 2025",
    allergyLabel: null,
    notes: "Está conociendo las rutinas de la sala. Le gusta participar en las canciones de bienvenida.",
    parents: [],
  },
  {
    id: "tomas-diaz",
    name: "Tomás Díaz",
    age: 3,
    initial: "T",
    avatarColor: "purple",
    birthDate: "16 may 2022",
    classroom: "Soles",
    enrollmentDate: "feb 2025",
    allergyLabel: "LACTOSA",
    notes: "Intolerancia a la lactosa. Trae su colación identificada desde casa.",
    parents: [
      { id: "marina-diaz", name: "Marina Díaz", initial: "M", avatarColor: "parentPurple", relationship: "Mamá", status: "active" },
    ],
  },
  {
    id: "emma-castro",
    name: "Emma Castro",
    age: 2,
    initial: "E",
    avatarColor: "pink",
    birthDate: "29 ago 2022",
    classroom: "Soles",
    enrollmentDate: "mar 2025",
    allergyLabel: null,
    notes: "Disfruta pintar y jugar con masa. Lleva un delantal en la mochila.",
    parents: [
      { id: "julia-castro", name: "Julia Castro", initial: "J", avatarColor: "parentPurple", relationship: "Mamá", status: "active" },
    ],
  },
  {
    id: "lucas-romero",
    name: "Lucas Romero",
    age: 3,
    initial: "L",
    avatarColor: "blue",
    birthDate: "7 abr 2022",
    classroom: "Soles",
    enrollmentDate: "feb 2025",
    allergyLabel: null,
    notes: "Le gusta armar rompecabezas. Trae una botellita de agua con su nombre.",
    parents: [
      { id: "martin-romero", name: "Martín Romero", initial: "M", avatarColor: "parentBlue", relationship: "Papá", status: "active" },
    ],
  },
  {
    id: "olivia-vega",
    name: "Olivia Vega",
    age: 2,
    initial: "O",
    avatarColor: "green",
    birthDate: "18 dic 2022",
    classroom: "Soles",
    enrollmentDate: "abr 2025",
    allergyLabel: null,
    notes: "Disfruta los juegos con música. Su muñeco de apego está en la mochila para la siesta.",
    parents: [
      { id: "carla-vega", name: "Carla Vega", initial: "C", avatarColor: "parentPurple", relationship: "Mamá", status: "active" },
    ],
  },
];
