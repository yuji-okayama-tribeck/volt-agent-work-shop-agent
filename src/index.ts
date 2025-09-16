import "dotenv/config";
import { VoltAgent, VoltOpsClient, Agent, Memory } from "@voltagent/core";
import { LibSQLMemoryAdapter } from "@voltagent/libsql";
import { createPinoLogger } from "@voltagent/logger";
import { openai } from "@ai-sdk/openai";
import { honoServer } from "@voltagent/server-hono";
import { getQiitaUserInfo, getQiitaUserItems } from "./tools";

// Create a logger instance
const logger = createPinoLogger({
  name: "qiitaAgent",
  level: "info",
});

// Configure persistent memory (LibSQL / SQLite)
const memory = new Memory({
  storage: new LibSQLMemoryAdapter({
    url: "file:./.voltagent/memory.db",
    logger: logger.child({ component: "libsql" }),
  }),
});

const qiitaAgent = new Agent({
  name: "qiita-agent",
  instructions: `ユーザーからQiitaユーザーIDを受け取ったら、Qiitaユーザーの情報と投稿記事一覧を取得してください。`,
  model: openai("gpt-4o-mini"),
  tools: [getQiitaUserInfo, getQiitaUserItems],
  memory,
});

new VoltAgent({
  agents: {
    qiitaAgent,
  },
  server: honoServer(),
  logger,
  voltOpsClient: new VoltOpsClient({
    publicKey: process.env.VOLTAGENT_PUBLIC_KEY || "",
    secretKey: process.env.VOLTAGENT_SECRET_KEY || "",
  }),
});
