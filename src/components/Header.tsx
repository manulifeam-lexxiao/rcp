export default function Header() {
  return (
    <header className="h-20 bg-white border-b border-neutral-border shadow-sm">
      <div className="h-full flex items-center pl-0">
        <div className="flex items-center gap-3">
          {/* 绿色方框和房屋图标 */}
          <div className="bg-success h-20 w-[85px] flex items-center justify-center text-white">
            <svg
              width="28"
              height="29"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.0836 1.16211L2.18359 9.04811V19.1621H17.8216V9.03211L10.0836 1.16211ZM8.32059 17.4971V12.5781H11.6796V17.4971H8.32059ZM16.1566 17.4971H13.3446V10.9131H6.65559V17.4971H3.84459V9.73611L10.0846 3.52211L16.1566 9.72711V17.4971Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Manulife Logo */}
          <div className="flex items-center gap-4 pl-3">
            <img src="/logo_manulife.svg" alt="Manulife" width="120" height="22" />
            <div>
              <div className="text-primary leading-tight" style={{ fontFamily: 'ManulifeJHSans-Demibold, Arial, sans-serif', fontSize: '27px' }}>
                Retirement ChengDu Portal
              </div>
            </div>
          </div>
        </div>

        <div className="ml-auto pr-8 flex items-center gap-6">
          <button
            className="p-2 hover:bg-neutral-light rounded transition-colors"
            aria-label="Search"
          >
            #
          </button>
        </div>
      </div>
    </header>
  );
}
