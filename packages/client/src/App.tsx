import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@/hooks/useChat";
import * as React from "react";
import { useDbStatus } from "./hooks/useDbStatus";

function App() {
  const [prompt, setPrompt] = useState<string>("");
  const [conversationID, setConversationID] = useState<string>(uuidv4());
  const { message, error, isLoading, handleSendMessage, setError } = useChat();
  const dbStatus = useDbStatus();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSendMessage(prompt, conversationID);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    if (error) {
      setError(null);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
        <div className="grid w-full gap-1.5">
          <p>{dbStatus}</p>
          <Label htmlFor="prompt">Your Prompt</Label>
          <Textarea
            id="prompt"
            placeholder="Enter your prompt"
            value={prompt}
            onChange={handlePromptChange}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="grid w-full gap-1.5">
          <Label htmlFor="conversationId">Conversation ID</Label>
          <Textarea
            id="conversationId"
            placeholder="Conversation ID"
            value={conversationID}
            onChange={(e) => setConversationID(e.target.value)}
          />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </Button>

        <div className="p-4 border rounded-md min-h-[12rem]">
          <p className="whitespace-pre-wrap">{message}</p>
        </div>
      </form>
    </main>
  );
}

export default App;