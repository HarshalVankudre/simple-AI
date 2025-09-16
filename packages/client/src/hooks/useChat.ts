import { useState } from "react";
import { sendMessageToApi } from "@/lib/api";

export const useChat = () => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async (prompt: string, conversationID: string) => {
    setIsLoading(true);
    const responseMessage = await sendMessageToApi({ prompt, conversationID });
    setMessage(responseMessage);
    setIsLoading(false);
  };

  return {
    message,
    isLoading,
    handleSendMessage,
  };
};