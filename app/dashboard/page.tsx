"use client";

import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import useOpportunities from "@/app/utils/useOpportunities";
import type { Opportunity } from "@/app/utils/useOpportunities";
import styles from "./dashboard.module.css";

const Dashboard: React.FC = () => {
  // const { opportunities } = useOpportunities();

  const opportunities: Opportunity[] = [
    {
      _id: "1",
      opportunity_name: "Software Developer",
      expiry_timestamp: "2021-07-01T00:00:00.000Z",
      company_id: "1",
      description: "Software Developer",
      start_timestamp: "2021-07-01T00:00:00.000Z",
      image: "https://via.placeholder.com/150",
      location: {
        address: "123 Main St",
      },
    },
    {
      _id: "2",
      opportunity_name: "Software Developer",
      expiry_timestamp: "2021-07-01T00:00:00.000Z",
      company_id: "1",
      description: "Software Developer",
      start_timestamp: "2021-07-01T00:00:00.000Z",
      image: "https://via.placeholder.com/150",
      location: {
        address: "123 Main St",
      },
    },
    {
      _id: "3",
      opportunity_name: "Software Developer",
      expiry_timestamp: "2021-07-01T00:00:00.000Z",
      company_id: "1",
      description: "Software Developer",
      start_timestamp: "2021-07-01T00:00:00.000Z",
      image: "https://via.placeholder.com/150",
      location: {
        address: "123 Main St",
      },
    },
    {
      _id: "4",
      opportunity_name: "Software Developer",
      expiry_timestamp: "2021-07-01T00:00:00.000Z",
      company_id: "1",
      description: "Software Developer",
      start_timestamp: "2021-07-01T00:00:00.000Z",
      image: "https://via.placeholder.com/150",
      location: {
        address: "123 Main St",
      },
    },
  ];

  return (
    <div>
      <div className="container title">
        <h1>Dashboard</h1>
        <p>Check out the opportunities below and apply anytime!</p>
      </div>

      <div className={`container ${styles.grid}`}>
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity._id} opportunity={opportunity} />
        ))}
      </div>
    </div>
  );
};

const OpportunityCard: React.FC<{ opportunity: Opportunity }> = ({
  opportunity,
}) => {
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

  const getTimeLeft = (expiry_timestamp: string) => {
    const expiryDate = new Date(expiry_timestamp);
    const currentDate = new Date();
    const timeLeft = expiryDate.getTime() - currentDate.getTime();
    const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  return (
    <Card
      className="py-0"
      style={{
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
      }}
    >
      <img
        src={opportunity.image}
        alt={opportunity.opportunity_name}
        style={{ background: "red", height: "100%" }}
      />
      <CardDescription className="py-6">
        <Badge variant="outline">
          {getTimeLeft(opportunity.expiry_timestamp)} days left
        </Badge>
        <CardTitle className="text-2xl">
          {opportunity.opportunity_name}
        </CardTitle>
        <div className="flex" style={{ alignItems: "center" }}>
          {locationIcon}
          {opportunity.location.address}
        </div>
        <p style={{ marginTop: 10 }}>{opportunity.description}</p>
      </CardDescription>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Button variant="outline">View</Button>
      </div>
    </Card>
  );
};

export default Dashboard;
