import { notFound } from "next/navigation";
import ClientDashboard from "@/app/components/ClientDashboard";

// Wrapping the async logic outside the component
const OpportunityPage: React.FC = () => {
  return (
    <div>
      <ClientDashboard /> {/* ✅ Render Client Component */}
    </div>
  );
};

export default OpportunityPage;
