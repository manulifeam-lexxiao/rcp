import features from '@/data/features.json';

type FeatureConfig = { id: string; label: string; path: string; enabled: boolean };

export function useFeatureList(): FeatureConfig[] {
  return (features as FeatureConfig[]).filter((f) => f.enabled);
}
