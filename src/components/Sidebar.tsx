import { NavLink } from 'react-router-dom';
import { useFeatureList } from '@/hooks/useFeatureGate';

const getIcon = (id: string) => {
  switch (id) {
    case 'home':
      return (
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.0836 1.16211L2.18359 9.04811V19.1621H17.8216V9.03211L10.0836 1.16211ZM8.32059 17.4971V12.5781H11.6796V17.4971H8.32059ZM16.1566 17.4971H13.3446V10.9131H6.65559V17.4971H3.84459V9.73611L10.0846 3.52211L16.1566 9.72711V17.4971Z" fill="currentColor"/>
        </svg>
      );
    case 'emailer':
      return (
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 4.162H2C1.45 4.162 1.005 4.612 1.005 5.162L1 15.162C1 15.712 1.45 16.162 2 16.162H18C18.55 16.162 19 15.712 19 15.162V5.162C19 4.612 18.55 4.162 18 4.162ZM18 7.162L10 11.662L2 7.162V5.162L10 9.662L18 5.162V7.162Z" fill="currentColor"/>
        </svg>
      );
    default:
      return (
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10.162" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      );
  }
};

export default function Sidebar() {
  const features = useFeatureList();

  return (
    <nav className="flex flex-col py-0 px-0 bg-primary min-h-screen">
      {features.map((f, index) => (
        <div key={f.id}>
          <NavLink
            to={f.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-2 py-4 text-xs transition-all duration-200 relative ${
                isActive 
                  ? 'text-white bg-primary-dark' 
                  : 'text-white opacity-80 hover:opacity-100 hover:bg-primary-dark'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="w-6 h-6 flex-shrink-0">{getIcon(f.id)}</div>
                <span className="font-light text-center leading-tight">{f.label}</span>
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.00270912 2.4164L1.42586 0.993247L5.44587 5.03429L4.98676 5.57518L1.42586 9.00677L0.00270912 7.58362L2.58633 5L0.00270912 2.4164Z" fill="#00A758"/>
                    </svg>
                  </div>
                )}
              </>
            )}
          </NavLink>
          {index < features.length - 1 && (
            <div className="border-b border-primary-600 opacity-30 mx-3"></div>
          )}
        </div>
      ))}
    </nav>
  );
}
