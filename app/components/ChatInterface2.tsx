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

const questionsToAsk = [
  { question: "Have you volunteered before?", followup: true },
  // {
  //   question: "Do you have accessibility requirements?",
  //   followup: false,
  // },
  // { question: "What is your date of birth?", followup: false },
  // { question: "What are your skills?", followup: true },
  // { question: "What do you do for work?", followup: true },
  { question: "Do you have a DBS check?", followup: false },
];

export default function ChatInterface() {
  const { data: session } = useSession();

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

  const [questionToAskIndex, setQuestionToAskIndex] = useState(0);
  const [followupCount, setFollowupCount] = useState(0); // max 3

  const [userQuestionContext, setUserQuestionContext] = useState("The user wants to volunteer.");
  const [userOverallContext, setUserOverallContext] = useState(
    "The user wants to volunteer."
  );

  useEffect(() => {}, []);

  // when the user submits and answer
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent the form from refreshing the page
    e.preventDefault();
    if (!input.trim()) return;

    // Displays the message that the user just typed in the box on the screen
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // clears user input field
    setInput("");

    // UTILS
    const nextGeneralQuestion = () => {
      // ask a general question
      const userQuestion = questionsToAsk[questionToAskIndex + 1];

      // puts the next general question on the screen as if the assistant is asking it
      const nextAiQuestion: Message = {
        id: (Date.now() + 2).toString(),
        content: userQuestion.question,
        role: "assistant",
        timestamp: new Date(),
      };

      setFollowupCount(0);
      console.log(userQuestion.question);
      setUserQuestionContext(userQuestion.question);
      setQuestionToAskIndex((prev) => prev + 1);
      setMessages((prev) => [...prev, nextAiQuestion]);
      return;
    };
    const displayMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };
    const getAiResponse = async (prompt: string) => {
      // make a request to the /api/getOnloadingChat endpoint
      const result = await fetch("/api/getOnloadingChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: prompt }),
      });

      const data = await result.json();

      const aiResponse = JSON.parse(data.message);

      // appends the ai's question reply context to the string of the user's overall context
      setUserOverallContext(
        (prev) => prev + " " + aiResponse.updatedExistingContext
      );

      return aiResponse;
    };
    // const recordResults = async (userAnswer: string) => {
    //   // make a request to the /api/recordResults endpoint
    //   const result = await fetch("/api/recordResults", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       userAnswer,
    //       userOverallContext,
    //     }),
    //   });

    //   const data = await result.json();

    //   return data;
    // };

    // CHECK if it's a follow up question
    if (questionsToAsk[questionToAskIndex].followup) {
      // it's a follow up question. first check if FU limit is reached; if yes ask the next general question. if not, ask the next follow up question (i.e. just return)
      if (followupCount === 3) {
        setUserQuestionContext("");
        nextGeneralQuestion();
      } else {
        // ask the next follow up question, i.e. get AI response and display it
        const prompt =
          "{ 'existingContext': " +
          userQuestionContext +
          " , 'message': " +
          input +
          " }";
        const aiResponse = await getAiResponse(prompt);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse.output,
          role: "assistant",
          timestamp: new Date(),
        };
        setUserQuestionContext(
          (prev) => prev + " " + aiResponse.updatedExistingContext
        );
        displayMessage(aiMessage);
        setFollowupCount((prev) => prev + 1);
      }
    } else {
      // it's not a follow up question. RECORD RESULTS by asking AI to summarise, then ask the next general question
      const aiResponse = await getAiResponse(
        "{ 'existingContext': " +
        userQuestionContext +
        " , 'message': " +
        input +
        " }"
      )
      setUserOverallContext(
        (prev) => prev + " " + aiResponse.updatedExistingContext
      );


      if (questionToAskIndex === questionsToAsk.length - 1) {
        // if the last question has been asked, end the conversation
        const endMessage: Message = {
          id: (Date.now() + 3).toString(),
          content: "Thank you for your time. Have a great day!",
          role: "assistant",
          timestamp: new Date(),
        };
        displayMessage(endMessage);

        // send to backend for further processing and add to db
        const result = await fetch("/api/recordOnloading", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userOverallContext,
          }),
        });

      } else {
        nextGeneralQuestion();
      }

     
    }
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
            <p className="text-sm text-muted-foreground">
              Data: fu count:{followupCount}, askingIndex:{questionToAskIndex}
              <br />
              OVERALL Context: {userOverallContext}
              <br />
              QUESTION Context: {userQuestionContext}
            </p>
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
