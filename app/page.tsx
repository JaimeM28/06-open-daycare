import { FeedHeader } from "@/app/components/feed/feed-header";
import { PostComposer } from "@/app/components/feed/post-composer";
import { PostCard, type FeedPost } from "@/app/components/feed/post-card";
import { Sidebar } from "@/app/components/feed/sidebar";

const posts: FeedPost[] = [
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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <Sidebar />
      <main className="min-w-0 flex-1 md:h-screen md:overflow-y-auto">
        <div className="mx-auto w-full max-w-[760px] px-4 pt-6 pb-20 md:px-10 md:pt-[34px]">
          <FeedHeader />
          <PostComposer />
          <section aria-labelledby="today-heading">
            <div className="mb-[14px] flex items-center gap-[14px]">
              <h2
                id="today-heading"
                className="text-[12.5px] font-extrabold tracking-[0.8px] text-[#8A7C6D]"
              >
                PUBLICADO HOY
              </h2>
              <span aria-hidden="true" className="h-px flex-1 bg-[#E7DAC8]" />
            </div>
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
