import features from '@/data/features.json';

type FeatureConfig = { id: string; label: string; path: string; enabled: boolean };

export function FeatureGate({
  featureId,
  children,
}: {
  featureId: string;
  children: React.ReactNode;
}) {
  const f = (features as FeatureConfig[]).find((x) => x.id === featureId);
  if (!f || !f.enabled) return <div className="text-gray-500">Feature disabled.</div>;
  return <>{children}</>;
}
