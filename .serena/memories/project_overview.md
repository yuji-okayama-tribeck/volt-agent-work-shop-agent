# VoltAgent Qiitaエージェント プロジェクト概要

## プロジェクトの目的
このプロジェクトは、QiitaユーザーIDを受け取り、そのユーザーの基本情報と投稿記事一覧を取得するAIエージェントアプリケーションです。VoltAgentフレームワークを使用して構築されています。

## 主な機能
1. **Qiitaユーザー情報取得**: 指定されたユーザーIDの基本情報を取得
2. **Qiita記事一覧取得**: 指定されたユーザーの投稿記事一覧（最大5件）を取得
3. **JSON形式での統一出力**: userInfoとuserItemsを含む構造化されたレスポンス

## 技術スタック
- **フレームワーク**: VoltAgent (AIエージェントフレームワーク)
- **言語**: TypeScript
- **ランタイム**: Node.js 22+
- **AIモデル**: OpenAI GPT-4o-mini
- **開発ツール**: tsx (開発時), TypeScript Compiler (本番ビルド)
- **リンター/フォーマッター**: Biome
- **API**: Qiita REST API v2
- **認証**: Qiita API Key (Bearer Token)

## 依存関係
### プロダクション依存関係
- `@voltagent/core`: VoltAgentのコア機能
- `@voltagent/server-hono`: Honoベースのサーバー機能
- `@ai-sdk/openai`: OpenAI統合
- `ai`: AI SDK
- `zod`: スキーマバリデーション
- `dotenv`: 環境変数管理

### 開発依存関係
- `@biomejs/biome`: コード品質管理
- `tsx`: TypeScript実行環境
- `typescript`: TypeScriptコンパイラ