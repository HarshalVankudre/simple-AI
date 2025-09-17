import { getLastResponseId, saveResponseId } from "../repositories/conversation.repository.ts";
import { llm } from "../src/openaiClient.ts";
import { v4 as uuidv4 } from "uuid";

type ChatResponse = {
  id: string;
  message: string;
};

export const chatService = {
  async sendMessage(prompt: string, conversationID: string): Promise<ChatResponse> {
    const response = await llm.invoke(prompt);
    const responseId = uuidv4();
    await saveResponseId(conversationID, responseId);

    return {
      id: responseId,
      message: response.content.toString(),
    };
  },
};