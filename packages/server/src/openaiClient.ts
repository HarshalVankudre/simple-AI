import { OpenAI } from "openai";
import { ChatOpenAI } from "@langchain/openai";

export const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const llm = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY,
    streaming: true,
});