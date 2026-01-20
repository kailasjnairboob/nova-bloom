import { Navbar } from "@/components/layout/Navbar";
import { DashboardPreview } from "@/components/sections/DashboardPreview";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <DashboardPreview />
      </main>
    </div>
  );
};

export default Dashboard;
