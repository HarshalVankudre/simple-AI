import {getLastResponseId, saveResponseId} from "../repositories/conversation.repository.ts";
import {OpenAI} from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

type ChatResponse = {
    id: string;
    message: string;
}
export const chatService = {
   async sendMessage(prompt: string, conversationID: string) : Promise<ChatResponse> {
         const response = await client.responses.create({
            input: prompt,
            model: "gpt-4.1-nano",
            temperature: 0.7,
            max_output_tokens: 1024,
            previous_response_id: getLastResponseId(conversationID)
        }
    );
    saveResponseId(conversationID, response.id)
       return {
        id: response.id,
        message: response.output_text
       };
    }
    //scsdsd
};