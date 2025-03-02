"use client";

import useOpportunity from "@/app/utils/useOpportunity";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";

export default function ClientOpportunity({ id }: { id: string }) {
  const { opportunity, error } = useOpportunity(id);

  const router = useRouter();

  const handleApply = () => {
    router.push("/applied");
  };

  if (error) return <p>Error: {error}</p>;
  if (!opportunity) return <p className="text-center">Loading...</p>;

  const locationIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );

  const calStartIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 448 512"
      fill="currentColor"
    >
      <path d="M400 64h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm-6 400H54a6 6 0 0 1 -6-6V160h352v298a6 6 0 0 1 -6 6zm-52.8-200.7L198.8 404.5c-4.7 4.7-12.3 4.6-17-.1l-75.1-75.7c-4.7-4.7-4.6-12.3 .1-17l22.7-22.5c4.7-4.7 12.3-4.6 17 .1l44.1 44.5 111.1-110.2c4.7-4.7 12.3-4.6 17 .1l22.5 22.7c4.7 4.7 4.6 12.3-.1 17z" />
    </svg>
  );

  const calEndIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 448 512"
      fill="currentColor"
    >
      <path d="M124 328c-6.6 0-12-5.4-12-12v-24c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H124zm324-216v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z" />
    </svg>
  );
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl container mx-o max-w-4xl border border-black-300">
      {/* Header */}
      <div className="pb-6 border-b border-gray-300">
        <h2 className="text-3xl font-bold mt-1">
          {opportunity.opportunity_name}
        </h2>
      </div>

      {/* Content Layout with Image as a Column */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Details Section */}
        <div className="md:col-span-2">
          <div className="mb-5">
            <p className="text-lg font-semibold">Description:</p>
            <p className="leading-relaxed">{opportunity.description}</p>
          </div>
          <div className="mb-5">
            <p className="text-lg font-semibold flex gap-1">
              {locationIcon} Location:
            </p>
            <p>{opportunity.location.address}</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-lg font-semibold flex gap-1">
                {calStartIcon}Start Date:
              </p>
              <p>
                {new Date(opportunity.start_timestamp).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold flex gap-1 ">
                {calEndIcon}End Date:
              </p>
              <p>
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
        <Button
          onClick={handleApply}
          style={{
            display: "inline-block",
            marginTop: 30,
            width: "min-content",
          }}
          variant="outline"
        >
          Apply now →
        </Button>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handleApply}
          className="bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
