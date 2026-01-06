import { Routes, Route, Navigate } from 'react-router-dom';
import { PortalLayout } from '@/layout/PortalLayout';
import Home from '@/pages/Home';
import Emailer from '@/pages/Emailer';
import { FeatureGate } from '@/components/FeatureGate';

export default function App() {
  return (
    <PortalLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={
            <FeatureGate featureId="home">
              <Home />
            </FeatureGate>
          }
        />
        <Route
          path="/emailer"
          element={
            <FeatureGate featureId="emailer">
              <Emailer />
            </FeatureGate>
          }
        />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </PortalLayout>
  );
}
