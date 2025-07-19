"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import TipsterDashboardPanel from "@/components/TipsterDashboardPanel";

const TipsterDashboardPage = () => {
  return (
    <ProtectedRoute>
      <TipsterDashboardPanel />
    </ProtectedRoute>
  );
};

export default TipsterDashboardPage;
