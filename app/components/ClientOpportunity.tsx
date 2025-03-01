"use client";

import useOpportunity from "@/app/utils/useOpportunity";

export default function ClientOpportunity({ id }: { id: string }) {
  const { opportunity, error } = useOpportunity(id);

  if (error) return <p>Error: {error}</p>;
  if (!opportunity) return <p className="text-center">Loading...</p>;

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg container mx-auto max-w-4xl">
      <div className="pb-4 border-b border-slate-200">
        <h5 className="text-2xl font-semibold text-slate-800">
          {opportunity.opportunity_name}
        </h5>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <p className="text-lg font-medium font-semibold text-gray-800 mb-1">
                Description:
              </p>
              <p className="text-gray-700">{opportunity.description}</p>
            </div>
            <div>
              <p className="text-lg font-medium font-semibold text-gray-800 mb-1">
                Location:
              </p>
              <p className="text-gray-700">{opportunity.location.address}</p>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <p className="text-lg font-medium font-semibold text-gray-800 mb-1">
                Start Date:
              </p>
              <p className="text-gray-700">
                {new Date(opportunity.start_timestamp).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-lg font-medium font-semibold text-gray-800 mb-1">
                End Date:
              </p>
              <p className="text-gray-700">
                {new Date(opportunity.expiry_timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-slate-200 text-center">
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50">
          Apply Now
        </button>
      </div>
    </div>
  );
}
