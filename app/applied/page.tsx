"use client";

import Link from "next/link";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import { Button } from "../components/ui/button";

const fireConfetti = () => {
  const count = 100;
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio: any, opts: any) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

const AppliedPage: React.FC = () => {
  useEffect(() => {
    fireConfetti();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Godspeed!</h1>
        <p className="text-lg text-gray-800">You have successfully applied.</p>
        <Link
          href="/dashboard"
          /* className="mt-6 inline-block bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
          style={{ background: "#07BEB8", color: "white" }} */
        >
          <Button
            style={{
              display: "inline-block",
              marginTop: 30,
              width: "min-content",
            }}
            variant="outline"
          >
            Back to Dashboard →
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AppliedPage;
