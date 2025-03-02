"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { signIn } from "@/auth";
import Vara from "vara";
import React, { useEffect, useRef, useState } from "react";

const LoginForm: React.FC = ({ ...props }) => {
  const initialized = useRef(false);

  const handleSignIn = async () => {
    await signIn("google");
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      const vara = [
        new Vara(
          "#handwritten-1",
          "https://cdn.jsdelivr.net/npm/vara@1.4.0/fonts/Satisfy/SatisfySL.json",
          [
            {
              text: "Welcome!",
              id: "handwritten-1",
              x: 5,
              y: 5,
            },
          ],
          {
            strokeWidth: 2,
            color: "var(--aqua-dark)",
            duration: 3000,
            fontSize: 50,
            autoAnimation: false,
          }
        ),
      ];

      vara.forEach((v, index) => {
        v.ready(() => {
          const id = `handwritten-${index + 1}`;
          v.draw(id);
        });
      });
    }

    return () => {};
  }, []);

  return (
    <div>
      <div className="container">
        <p id="handwritten-1" style={{ height: 50 }} />
        <div style={{ height: 20 }} />
        <p>Thank you for expressing interest in our volunteering platform.</p>
        <div style={{ height: 20 }} />
        <p>In order to sign up, we will ask you to:</p>
        <ol>
          <li>1. Sign in with Google below</li>
          <li>
            2. Complete a short AI interview so we can better match you with
            opportunities
          </li>
        </ol>
        <div style={{ height: 20 }} />
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSignIn}>
              <div className="flex flex-col gap-6">
                <Button variant="outline" type="submit" className="w-full">
                  Login with Google
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
