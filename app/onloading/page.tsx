import ChatInterface from "@/app/components/ChatInterface";
import ChatInterface2 from "@/app/components/ChatInterface2";

export default async function def() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">AI Assistant</h1>

        <ChatInterface2 />
      </div>
    </div>
  );
}
