import ClientOpportunity from "@/app/components/ClientOpportunity";

interface PageProps {
  params: { id: string };
}

// Wrapping the async logic outside the component
const OpportunityPage: React.FC<PageProps> = ({ params }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mt-3 mb-2 text-center">
        {" "}
        Opportunity Details{" "}
      </h1>
      <ClientOpportunity id={params.id} /> {/* ✅ Render Client Component */}
    </div>
  );
};

export default OpportunityPage;
