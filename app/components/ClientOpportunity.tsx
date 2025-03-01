"use client";

import useOpportunity from "@/app/utils/useOpportunity";

export default function ClientOpportunity({ id }: { id: string }) {
  const { opportunity, error } = useOpportunity(id);

  if (error) return <p>Error: {error}</p>;
  if (!opportunity) return <p className="text-center">Loading...</p>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl container mx-auto max-w-4xl">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">
        {opportunity.opportunity_name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-lg font-medium text-gray-700">Description:</p>
            <p className="text-gray-600 text-base">{opportunity.description}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">Location:</p>
            <p className="text-gray-600 text-base">
              {opportunity.location.address}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-lg font-medium text-gray-700">Start Date:</p>
            <p className="text-gray-600 text-base">
              {new Date(opportunity.start_timestamp).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">End Date:</p>
            <p className="text-gray-600 text-base">
              {new Date(opportunity.expiry_timestamp).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <button
          className="px-6 py-2 rounded-lg shadow-md hover:bg-[#06B6B0] focus:outline-none focus:ring-2 focus:ring-[#07BEB8] focus:ring-opacity-50"
          style={{ backgroundColor: "#07BEB8", color: "white" }}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
