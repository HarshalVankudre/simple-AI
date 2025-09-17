import { DataSource } from "typeorm";
import { SqlDatabase } from "langchain/sql_db";
import { createSqlAgent, SqlToolkit } from "langchain/agents/toolkits/sql";
import { AgentExecutor } from "langchain/agents";
import { llm } from "../src/openaiClient.ts";

let executor: AgentExecutor;
const queryCache = new Map<string, string>();

async function initializeAgent(datasource: DataSource) {
  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
  });
  const toolkit = new SqlToolkit(db, llm);
  executor = createSqlAgent(llm, toolkit);
  console.log("SQL Agent initialized.");
}

export const sqlService = {
  async getResponse(prompt: string, datasource: DataSource) {
    if (queryCache.has(prompt)) {
      return queryCache.get(prompt);
    }

    if (!executor) {
      await initializeAgent(datasource);
    }
    const result = await executor.invoke({
      input: prompt,
    });

    // @ts-ignore
    queryCache.set(prompt, result.output);
    // @ts-ignore
    return result.output;
  },
};