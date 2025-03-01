import { Metadata } from "next";
interface PageProps {
  params: {
    id: string;
  };
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const res = await fetch(`/api/opportunity/getOpportunity?id = ${params.id}`);
  if (!res.ok) {
    return {
      title: "Opportunity Not Found",
    };
  }
  const opportunity: any = await res.json();
  return opportunity;
}
const OpportunityPage: React.FC<PageProps> = async ({ params }) => {
  const res = await fetch(`/api/opportunity/getOpportunity?id=${params.id}`);
  if (!res.ok) {
    notFound();
  }
  const opportunity: any = await res.json();
  return (
    <div>
      <h1>Opportunity Page</h1>
      <p>{opportunity}</p>
    </div>
  );
};

export default OpportunityPage;
