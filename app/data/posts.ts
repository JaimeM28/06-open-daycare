export const postCategories = {
  food: { label: "Comida", className: "bg-[#F7E7A6] text-[#9A7B1E]", selectedClassName: "peer-checked:bg-[#9A7B1E] peer-checked:text-white" },
  nap: { label: "Siesta", className: "bg-[#E7DCF6] text-[#7B5FC0]", selectedClassName: "peer-checked:bg-[#7B5FC0] peer-checked:text-white" },
  activity: { label: "Actividad", className: "bg-[#C7E7F1] text-[#2E89A6]", selectedClassName: "peer-checked:bg-[#2E89A6] peer-checked:text-white" },
  achievement: { label: "Logro", className: "bg-[#CFEBD8] text-[#3E9B6C]", selectedClassName: "peer-checked:bg-[#3E9B6C] peer-checked:text-white" },
  mood: { label: "Ánimo", className: "bg-[#F9D2DE] text-[#C56486]", selectedClassName: "peer-checked:bg-[#C56486] peer-checked:text-white" },
  photo: { label: "Foto", className: "bg-[#FBD8CC] text-[#D9684A]", selectedClassName: "peer-checked:bg-[#D9684A] peer-checked:text-white" },
  announcement: { label: "Anuncio", className: "bg-[#CCD8F4] text-[#4E72C8]", selectedClassName: "peer-checked:bg-[#4E72C8] peer-checked:text-white" },
};

export type PostType = keyof typeof postCategories;

export type FeedPost = {
  id: string;
  type: PostType;
  name: string;
  time: string;
  recipient: string;
  text: string;
  reactionCount: number;
  commentCount: number;
  hasPhoto: boolean;
};

export const originalPosts: FeedPost[] = [
  {
    id: "mateo-achievement",
    type: "achievement",
    name: "Mateo",
    time: "14:20",
    recipient: "familia de Mateo",
    text: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    reactionCount: 3,
    commentCount: 1,
    hasPhoto: false,
  },
  {
    id: "mateo-activity",
    type: "activity",
    name: "Mateo",
    time: "09:40",
    recipient: "familia de Mateo",
    text: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    reactionCount: 5,
    commentCount: 2,
    hasPhoto: true,
  },
  {
    id: "class-announcement",
    type: "announcement",
    name: "Anuncio general",
    time: "07:50",
    recipient: "toda la sala",
    text: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    reactionCount: 8,
    commentCount: 0,
    hasPhoto: false,
  },
];
