"use client";

import { useState, useEffect } from "react";

interface Opportunity {
  _id: string;
  opportunity_name: string;
  company_id: string;
  description: string;
  start_timestamp: string;
  expiry_timestamp: string;
  image: string;
  location: {
    address: string;
  };
  tags: [string];
}

const useOpportunity = (id: string) => {
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const response = await fetch(`/api/getOpportunity?id=${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOpportunity(data);
      } catch (error) {
        setError(error as any);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunity();
  }, [id]);

  return { opportunity, loading, error };
};

export default useOpportunity;
