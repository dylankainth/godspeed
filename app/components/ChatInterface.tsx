"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/components/ui/card";

import { useSession } from "next-auth/react";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

export default function ChatInterface() {
  const { data: session } = useSession();

  const [userChatState, setUserChatState] = useState({});

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your volunteering matcher AI. I'd love to get to know you better so I can alert you to the perfect volunteer opportunities as they happen",
      role: "assistant",
      timestamp: new Date(),
    },
    {
      id: "2",
      content: "Firstly, have you volunteered before?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {
    setUserChatState({
      user_id: "abc123",
      name: "Alice",
      interests: ["AI", "Music", "Startups"],
      projects: [
        {
          name: "AI Music Generator",
          description: "Creating an AI that composes music.",
        },
      ],
      volunteer_profile: {
        dob: "1995-06-15",
        right_to_volunteer: true,
        skills: ["Machine Learning", "Music Production", "Teaching"],
        dbs_check: true,
        health_safety: "No known health issues.",
        cv_url: "https://example.com/alice_cv.pdf",
        volunteering_experience: [
          {
            title: "AI for Good Volunteer",
            description: "Helping non-profits implement AI for impact.",
            organization: "AI for Social Good",
            date: "2022-06-01",
            duration: "6 months",
          },
          {
            title: "Music Therapy Assistant",
            description: "Using music to help patients in hospitals.",
            organization: "Healing Through Music",
            date: "2023-01-10",
            duration: "1 year",
          },
        ],
      },
      conversation_history: [
        {
          question: "What are you working on?",
          response: "I'm building an AI music generator.",
        },
        {
          question: "That’s awesome! What inspired you to start this?",
          response: "I love both AI and music, so I wanted to combine them.",
        },
        {
          question:
            "What’s your date of birth? (We need this to check eligibility.)",
          response: "1995-06-15",
        },
        {
          question: "Do you have the right to volunteer in your country?",
          response: "Yes, I do.",
        },
        {
          question:
            "What skills or interests do you have that might be useful in volunteering?",
          response: "Machine Learning, Music Production, Teaching",
        },
        {
          question:
            "Do you have an up-to-date DBS check or a criminal record check?",
          response: "Yes, I have a valid DBS check.",
        },
        {
          question:
            "Do you have any health conditions we should consider for safety purposes?",
          response: "No known health issues.",
        },
        {
          question: "Would you like to upload your CV? (Optional)",
          response: "Yes, here's the link: https://example.com/alice_cv.pdf",
        },
        {
          question:
            "What volunteering experience do you have? (Title, description, organization, date, duration)",
          response:
            "AI for Good Volunteer at AI for Social Good (6 months), Music Therapy Assistant at Healing Through Music (1 year).",
        },
      ],
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // make a request to the /api/getOnloadingChat endpoint
    const result = await fetch("/api/getOnloadingChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    })
      .then((response) => response.json())
      .then((data) => {
        // add data.message to the messages array

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.message,
          role: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Card className="w-full">
      <CardHeader className="border-b p-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-medium">AI Assistant</p>
            <p className="text-sm text-muted-foreground">Always here to help</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4 h-[400px] overflow-y-auto mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start gap-2 max-w-[80%] ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Avatar className="h-8 w-8">
                  {message.role === "assistant" ? (
                    <>
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="AI"
                      />
                      <AvatarFallback>AI</AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage
                        src={session?.user?.image || undefined}
                        alt={session?.user?.name || "User"}
                      ></AvatarImage>

                      <AvatarFallback>U</AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs opacity-50 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center space-x-2"
        >
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
