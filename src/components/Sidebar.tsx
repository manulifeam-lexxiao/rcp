import { NavLink } from 'react-router-dom';
import { useFeatureList } from '@/hooks/useFeatureGate';

export default function Sidebar() {
  const features = useFeatureList(); // 从 features.json 读取启用的菜单

  return (
    <nav className="flex flex-col py-4 px-2 space-y-2">
      {features.map((f) => (
        <NavLink
          key={f.id}
          to={f.path}
          className={({ isActive }) =>
            `block rounded px-3 py-2 text-sm truncate ${
              isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
            }`
          }
        >
          <span className="group-hover:inline hidden">{f.label}</span>
          <span className="group-hover:hidden inline">{f.label.charAt(0)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
