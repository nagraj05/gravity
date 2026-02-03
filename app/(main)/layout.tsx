import Header from "@/components/gravity-components/Header";
import BottomNav from "@/components/gravity-components/bottom-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-16 lg:pb-0">
      {/* <Header /> */}
      {children}
      <BottomNav />
    </div>
  );
}
