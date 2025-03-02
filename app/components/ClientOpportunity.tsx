"use client";

import useOpportunity from "@/app/utils/useOpportunity";
import { useRouter } from "next/navigation";

export default function ClientOpportunity({ id }: { id: string }) {
  const { opportunity, error } = useOpportunity(id);

  const router = useRouter();

  const handleApply = () => {
      router.push("/applied");
  };

  if (error) return <p>Error: {error}</p>;
  if (!opportunity) return <p className="text-center">Loading...</p>;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl container mx-auto max-w-4xl border border-gray-200">
      {/* Header */}
      <div className="pb-6 border-b border-gray-300">
        <h2 className="text-3xl font-bold text-gray-900">
          {opportunity.opportunity_name}
        </h2>
      </div>

      {/* Content Layout with Image as a Column */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Details Section */}
        <div className="md:col-span-2">
          <div className="mb-5">
            <p className="text-lg font-semibold text-gray-800">Description:</p>
            <p className="text-gray-700 leading-relaxed">
              {opportunity.description}
            </p>
          </div>
          <div className="mb-5">
            <p className="text-lg font-semibold text-gray-800">Location:</p>
            <p className="text-gray-700">{opportunity.location.address}</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-lg font-semibold text-gray-800">Start Date:</p>
              <p className="text-gray-700">
                {new Date(opportunity.start_timestamp).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">End Date:</p>
              <p className="text-gray-700">
                {new Date(opportunity.expiry_timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src={opportunity.image || "https://via.placeholder.com/600x300"}
            alt={opportunity.description}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-8 text-center">
        <button 
         onClick={handleApply}
        className="bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
          Apply Now
        </button>
      </div>
    </div>
  );
}
