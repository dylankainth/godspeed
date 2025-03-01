/* import { Metadata } from "next";
import { notFound } from "next/navigation";
import useOpportunity from "@/app/utils/useOpportunity";

interface PageProps {
  params: {
    id: string;
  };
}

 export const getOpportunity = async (id: string) => {
  console.log(id);
  try {
    const res = await fetch(`/api/getOpportunity?id=${id}`);
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching opportunity: ", error);
    return null;
  }
}; 

const OpportunityPage: React.FC<PageProps> = async ({ params }) => {
  const opportunity = useOpportunity(params.id);
  console.log(opportunity);
  if (!opportunity) {
    return <div>Opportunity Not Found</div>;
  }
  return (
    <div>
      <p>{opportunity.opportunity}</p>
    </div>
  );
};

export default OpportunityPage; */
import { notFound } from "next/navigation";
import ClientOpportunity from "@/app/components/ClientOpportunity";

interface PageProps {
  params: { id: string };
}

// Wrapping the async logic outside the component
const OpportunityPage: React.FC<PageProps> = ({ params }) => {
  // You can perform async operations outside of the JSX
  // or utilize server-side functionality like `getServerSideProps` (Next.js)

  return (
    <div>
      <h1>Opportunity Details</h1>
      <ClientOpportunity id={params.id} /> {/* ✅ Render Client Component */}
    </div>
  );
};

export default OpportunityPage;
