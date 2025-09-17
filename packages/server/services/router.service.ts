import { ChatOpenAI } from "@langchain/openai";
import { sqlService } from "./sql.service";
import AppDataSource from "../src/database";
import { llm } from "../src/openaiClient.ts";

const tools = [
  {
    type: "function",
    function: {
      name: "database_query",
      description: "Use this for any questions about the database.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "The user's question about the database",
          },
        },
        required: ["query"],
      },
    },
  },
];

export const routerService = {
  async route(prompt: string, conversationID: string) {
    const response = await llm.invoke(prompt, {
      tools: tools,
    });

    const toolCall = response.tool_calls?.[0];

    if (toolCall && toolCall.name === "database_query" && toolCall.args.query) {
      const sqlResponse = await sqlService.getResponse(
        toolCall.args.query,
        AppDataSource
      );
      return { id: conversationID, message: sqlResponse };
    }

    // Return null to indicate that this is not a database query
    return null;
  },
};