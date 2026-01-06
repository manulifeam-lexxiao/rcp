export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-neutral-border shadow-sm">
      <div className="container-custom h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#00A758"/>
              <text x="20" y="26" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">M</text>
            </svg>
            <h1 className="text-xl font-demibold text-primary">MFCentral</h1>
          </div>
        </div>
        <nav className="flex gap-8">
          <a href="#" className="nav-link">首页</a>
          <a href="#" className="nav-link">服务</a>
          <a href="#" className="nav-link">资源</a>
          <a href="#" className="nav-link">帮助</a>
        </nav>
      </div>
    </header>
  );
}
