import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-neutral-light">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="h-full w-[85px]">
          <Sidebar />
        </div>
        <main className="flex-1 p-10 overflow-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
