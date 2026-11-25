import { ChildrenDirectory } from "@/app/components/children/children-directory";
import { Sidebar } from "@/app/components/feed/sidebar";
import { children } from "@/app/data/children";

export default function ChildrenPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <Sidebar activeSection="children" />
      <main className="min-w-0 flex-1 md:h-screen md:overflow-y-auto">
        <div className="mx-auto w-full max-w-[880px] px-4 pt-6 pb-20 md:px-10 md:pt-[34px]">
          <ChildrenDirectory items={children} />
        </div>
      </main>
    </div>
  );
}
