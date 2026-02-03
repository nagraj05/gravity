import Feed from "@/components/gravity-components/feed";
import LeftSidebar from "@/components/gravity-components/left-sidebar";
import RightSidebar from "@/components/gravity-components/right-sidebar";

export default function Home() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-6 space-y-4">
              <LeftSidebar />
            </div>
          </aside>

          <main className="col-span-1 lg:col-span-6">
            <div className="max-w-2xl mx-auto">
              <Feed />
            </div>
          </main>

          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-6 space-y-4">
              <RightSidebar />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
