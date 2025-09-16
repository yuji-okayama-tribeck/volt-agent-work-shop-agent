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


export const getQiitaUserItems = createTool({
  name: "getQiitaUserItems",
  description: "QiitaユーザーIDを指定して、そのユーザーの投稿記事一覧を取得します。最大5件まで取得可能です。記事のタイトル、URL、いいね数、ストック数、閲覧数、タグ、作成日を返します。",
  parameters: z.object({
    userId: z.string().describe("記事一覧を取得したいQiitaユーザーのID"),
  }),
  execute: async ({ userId }) => {
    const accessToken = process.env.QIITA_API_KEY;
    const response = await fetch(`https://qiita.com/api/v2/users/${userId}/items?per_page=5`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    data.forEach((item: any) => {
      delete item.rendered_body;
      delete item.body;
    });

    return data;
  },
});
