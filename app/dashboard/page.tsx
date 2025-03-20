// app/dashboard/page.tsx
import { GameDashboard } from "@/components/game/GameDashboard";

export default function DashboardPage() {
  return (
    <main className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Your Color Trading Dashboard
      </h2>
      <GameDashboard />
    </main>
  );
}
