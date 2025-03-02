import ClientOpportunity from "@/app/components/ClientOpportunity";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Wrapping the async logic outside the component
const OpportunityPage: React.FC<PageProps> = async ({ params }) => {
  const { id } = await params;
  return (
    <div className="container mx-auto px-4">
      <div className="mb-4">
        <Link href="/dashboard">← Back to All Opportunities</Link>
      </div>
      <ClientOpportunity id={id} /> {/* ✅ Render Client Component */}
    </div>
  );
};

export default OpportunityPage;
