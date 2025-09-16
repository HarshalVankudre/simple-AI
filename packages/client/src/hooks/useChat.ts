import { useState } from "react";
import { sendMessageToApi } from "@/lib/api";

export const useChat = () => {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async (prompt: string, conversationID: string) => {
    setIsLoading(true);
    setError(null); // Clear previous errors

    const response = await sendMessageToApi({ prompt, conversationID });

    if (response.error) {
      setError(response.error);
      setMessage(""); // Clear any previous success message
    } else {
      setMessage(response.message || "");
      setError(null);
    }

    setIsLoading(false);
  };

  return {
    message,
    error,
    isLoading,
    handleSendMessage,
    setError, // Expose setError to be used in the component
  };
};