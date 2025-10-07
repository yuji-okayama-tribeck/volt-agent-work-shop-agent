# コードスタイルと規約

## TypeScript設定
- **ターゲット**: ES2022
- **モジュール**: ES2022 (ESM)
- **strict mode**: 有効
- **型チェック**: 厳密

## コード品質ツール
- **リンター/フォーマッター**: Biome
- **設定**: `.biomejs/biome`設定に従う
- **自動修正**: `npm run lint:fix`で実行

## ファイル構造規約
- `src/tools/`: カスタムツール定義
- `src/workflows/`: ワークフロー定義
- `src/index.ts`: メインエージェント設定

## ツール作成規約
```typescript
import { createTool } from '@voltagent/core';
import { z } from 'zod';

export const toolName = createTool({
  name: "toolName",
  description: "ツールの説明",
  parameters: z.object({
    param: z.string().describe("パラメータ説明"),
  }),
  execute: async ({ param }) => {
    // 実装ロジック
    return result;
  },
});
```

## エージェント設定規約
```typescript
const agent = new Agent({
  name: "agent-name",
  instructions: `指示文`,
  model: openai("gpt-4o-mini"),
  tools: [tool1, tool2],
  memory,
});
```

## コメント規約
- 日本語コメント推奨
- ツール名、説明、パラメータに日本語を使用
- 機能説明は簡潔に記述