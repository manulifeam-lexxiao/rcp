import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-light">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* 使用 group 控制 hover 展开 */}
        <div className="group relative">
          <div className="h-full bg-white shadow-sm border-r border-neutral-border w-16 group-hover:w-64 transition-all duration-200">
            <Sidebar />
          </div>
        </div>
        <main className="flex-1 p-10 overflow-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
