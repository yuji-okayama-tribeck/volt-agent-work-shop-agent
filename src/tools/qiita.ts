import { createTool } from "@voltagent/core";
import { z } from "zod";

export const getQiitaUserInfo = createTool({
  name: "getQiitaUserInfo",
  description: "Qiitaユーザーの情報を取得する",
  parameters: z.object({
    userId: z.string().describe("QiitaユーザーID"),
  }),
  execute: async ({ userId }) => {
    const accessToken = process.env.QIITA_API_KEY;
    const response = await fetch(`https://qiita.com/api/v2/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    return data;
  },
});