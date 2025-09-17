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

const mainAgent = new Agent({
  name: "main-agent", // エージェント名
  instructions: `
  ユーザーからQiitaユーザーIDを受け取った場合は、そのユーザーの情報と投稿記事一覧を取得し、まとめて返してください。
  取得した情報は以下のJSONフォーマットで返してください。

  ## JSONフォーマット
  {
    "userInfo": { ... },  // Qiitaユーザーの情報
    "userItems": [ ... ]  // Qiitaユーザーの投稿記事一覧
  }

  # 厳守事項
  - サブエージェントやツールを呼び出す際に、確認や同意のプロンプトは一切表示しない
  - 余計な説明文は一切含めない
  - JSONの外側にテキストを含めない
  `, // エージェントへの指示（プロンプト）
  model: openai("gpt-4o-mini"), // 使用するAIモデル
  tools: [getQiitaUserInfo, getQiitaUserItems], // エージェントが使用できるツール,
  // memory, // 永続化されたメモリ
});

new VoltAgent({
  agents: {
    mainAgent,
  },
  server: honoServer(),
  logger,
  voltOpsClient: new VoltOpsClient({
    publicKey: process.env.VOLTAGENT_PUBLIC_KEY || "",
    secretKey: process.env.VOLTAGENT_SECRET_KEY || "",
  }),
});
