"use client";
import { useRouter } from "next/navigation";
import useOpportunities from "@/app/utils/useOpportunities";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import type { Opportunity } from "@/app/utils/useOpportunities";
import styles from "../dashboard/dashboard.module.css";
import { motion } from "framer-motion";
const Dashboard: React.FC = () => {
  const { opportunities, error } = useOpportunities();

  if (error) return <p>Error: {error}</p>;
  if (!opportunities) return <p className="text-center">Loading...</p>;

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
  const router = useRouter();
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

  const isClosingSoon = getTimeLeft(opportunity.expiry_timestamp) < 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }} // Only animate once, triggers at 20% visibility
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="py-0">
        <div
          className="grid md:grid-cols-[200px_2fr_auto] gap-4 md:items-stretch" // Default grid layout
          style={{ overflow: "hidden" }}
        >
          <div className="w-full md:w-[200px] h-full">
            <img
              src={opportunity.image}
              alt={opportunity.opportunity_name}
              className="w-full h-full object-cover bg-red-500 rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>
          <CardDescription className="py-6 flex flex-col gap-2 ml-3 sm:ml-0">
            <div className="flex gap-2">
              <Badge
                variant="outline"
                style={{
                  backgroundColor: isClosingSoon ? "red" : "transparent",
                  color: isClosingSoon ? "white" : "var(--aqua-dark)",
                }}
              >
                {getTimeLeft(opportunity.expiry_timestamp)} days left
              </Badge>
              {opportunity.score && (
                <Badge variant="outline">
                  {Math.round((opportunity.score ?? 0) * 100)}% match
                </Badge>
              )}
            </div>
            <CardTitle className="text-2xl flex items-center justify-between">
              {opportunity.opportunity_name}

              {opportunity.tags && opportunity.tags.length > 0 && (
                <div className="ml-2 flex gap-3 p-2">
                  {opportunity.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardTitle>
            <div className="flex gap-2" style={{ alignItems: "center" }}>
              <img
                src={opportunity.company.logo}
                alt={opportunity.company.name}
                className="w-14 h-14 object-cover rounded-full"
              />
              {opportunity.company.name || "Unknown Company"}
            </div>
            <div className="flex" style={{ alignItems: "center" }}>
              {locationIcon}
              {opportunity.location.address}
            </div>
            <p style={{ marginTop: 10 }}>
              {opportunity.description.substring(0, 250)}...
            </p>
          </CardDescription>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <div className="flex justify-center items-center p-4">
              <Button
                variant="outline"
                onClick={() => router.push(`/opportunity/${opportunity._id}`)}
              >
                View
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Dashboard;
