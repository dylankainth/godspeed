"use client"; // 👈 Mark this as a Client Component

import useOpportunity from "@/app/utils/useOpportunity";

export default function ClientOpportunity({ id }: { id: string }) {
  const { opportunity, error } = useOpportunity(id);
  console.log("opportunity:", opportunity);

  if (error) return <p>Error: {error}</p>;
  if (!opportunity) return <p>Loading...</p>;

  return (
    <div>
      <h1>{opportunity.opportunity_name}</h1>
      <p>
        <strong>Description:</strong> {opportunity.description}
      </p>
      <p>
        <strong>Start Date:</strong>{" "}
        {new Date(opportunity.start_timestamp).toLocaleDateString()}
      </p>
      <p>
        <strong>End Date:</strong>{" "}
        {new Date(opportunity.expiry_timestamp).toLocaleDateString()}
      </p>
      <p>
        <strong>Location:</strong> {opportunity.location.address}
      </p>
    </div>
  );
}
