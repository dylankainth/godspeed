"use client";

import { useState, useEffect } from "react";

export interface Opportunity {
  _id: string;
  opportunity_name: string;
  expiry_timestamp: string;
  company_id: string;
  description: string;
  start_timestamp: string;
  image: string;
  location: {
    address: string;
  };
  score? : number;
}

const useOpportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch("/api/getOpportunityBoard");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOpportunities(data);
      } catch (error) {
        setError(error as any);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  return { opportunities, loading, error };
};

export default useOpportunities;
