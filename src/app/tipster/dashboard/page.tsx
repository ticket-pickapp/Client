"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import TipsterDashboardPanel from "@/components/TipsterDashboardPanel";
import TipsterSidebar from "@/components/TipsterSidebar";


const TipsterDashboardPage = () => {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <TipsterSidebar />
        <main className="flex-1">
          <TipsterDashboardPanel />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default TipsterDashboardPage;
