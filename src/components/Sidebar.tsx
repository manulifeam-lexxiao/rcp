import { NavLink } from 'react-router-dom';
import { useFeatureList } from '@/hooks/useFeatureGate';

export default function Sidebar() {
  const features = useFeatureList();

  return (
    <nav className="flex flex-col py-4 px-2 space-y-1">
      {features.map((f) => (
        <NavLink
          key={f.id}
          to={f.path}
          className={({ isActive }) =>
            `block rounded px-3 py-3 text-sm truncate transition-all duration-200 ${
              isActive 
                ? 'bg-white text-primary border-l-4 border-success font-demibold' 
                : 'text-primary hover:bg-neutral-light'
            }`
          }
        >
          <span className="group-hover:inline hidden">{f.label}</span>
          <span className="group-hover:hidden inline font-demibold">{f.label.charAt(0)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
