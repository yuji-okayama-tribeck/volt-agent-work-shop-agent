# コードベース構造

## ディレクトリ構成
```
volt-agent-work-shop-agent/
├── src/
│   ├── index.ts              # メインエージェント設定とサーバー起動
│   ├── tools/                # カスタムツール定義
│   │   ├── index.ts          # ツールのエクスポート
│   │   ├── qiita.ts          # Qiita API関連ツール
│   │   └── weather.ts        # 天気予報ツール（サンプル）
│   └── workflows/            # ワークフロー定義
│       └── index.ts          # 経費承認ワークフロー（サンプル）
├── .voltagent/               # エージェントメモリストレージ
├── dist/                     # コンパイル済み出力
├── node_modules/             # 依存パッケージ
├── .env                      # 環境変数
├── .env.example              # 環境変数テンプレート
├── package.json              # プロジェクト設定と依存関係
├── tsconfig.json             # TypeScript設定
└── Dockerfile                # Docker設定
```

## 主要ファイルの役割

### src/index.ts
- メインエージェント (`mainAgent`) の定義
- Honoサーバーの設定
- VoltOpsクライアント設定
- エージェントの起動とメモリ管理

### src/tools/qiita.ts
- `getQiitaUserInfo`: Qiitaユーザー情報取得ツール
- `getQiitaUserItems`: Qiitaユーザー記事一覧取得ツール
- 両ツールともQiita API v2を使用

### 環境変数
- `OPENAI_API_KEY`: OpenAI APIキー（必須）
- `QIITA_API_KEY`: Qiita APIキー（必須）
- `VOLTAGENT_PUBLIC_KEY`: VoltOps監視用（任意）
- `VOLTAGENT_SECRET_KEY`: VoltOps監視用（任意）