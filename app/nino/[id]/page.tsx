import { notFound } from "next/navigation";
import { ChildProfile } from "@/app/components/children/child-profile";
import { TemporaryChildProfile } from "@/app/components/children/temporary-child-profile";
import { isTemporaryChildId } from "@/app/lib/child-form";
import { Sidebar } from "@/app/components/feed/sidebar";
import { children } from "@/app/data/children";

export function generateStaticParams() {
  return children.map((child) => ({ id: child.id }));
}

export default async function ChildPage({ params }: PageProps<"/nino/[id]">) {
  const { id } = await params;
  const child = children.find((child) => child.id === id);

  if (!child && !isTemporaryChildId(id)) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <Sidebar activeSection="children" />
      <main className="min-w-0 flex-1 md:h-screen md:overflow-y-auto">
        <div className="mx-auto w-full max-w-[820px] px-4 pt-6 pb-20 md:px-10 md:pt-[34px]">
          {child ? <ChildProfile child={child} /> : <TemporaryChildProfile id={id} />}
        </div>
      </main>
    </div>
  );
}
